/*
 * TODO
 * - hot module reloading code, re-instantiate systems
 * - systems config persists through reloads
 * - invert component/system registry with exports
 */
const TARGET_FPS = 60;
const TARGET_DURATION = 1000 / TARGET_FPS;

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (fn) { setTimeout(fn, (1000/60)); };

// Commonly used temp variables, pre-declared early.
let entityId, system, systemName, componentName,
    timeNow, timeDelta, componentAttrs, matches, idx, item, handler;

export const Messages = {
  ENTITY_INSERT: 'entity_insert',
  ENTITY_DESTROY: 'entity_destroy',
  BEFORE_UPDATE: 'BEFORE_UPDATE',
  AFTER_UPDATE: 'AFTER_UPDATE',
  BEFORE_DRAW: 'BEFORE_DRAW',
  AFTER_DRAW: 'AFTER_DRAW'
};

export class World {
  constructor(options) {
    options = options || {};

    this.isRunning = false;
    this.isPaused = false;
    this.debug = options.debug || false;

    this.systems = {};
    if (options.systems) {
      this.addSystems(options.systems);
    }

    this.store = options.store || {};
    if (!this.store._lastEntityId) {
      this.store._lastEntityId = 0;
    }

    this.subscribers = {};

    this.tickDuration = TARGET_DURATION;
    this.maxTickDelta = TARGET_DURATION * 5;
    this.tickAccumulator = 0;

    this.lastTickTime = 0;
    this.lastDrawTime = 0;

    this.boundTickLoop = () => this.tickLoop();
    this.boundDrawLoop = (timestamp) => this.drawLoop(timestamp);
  }

  start() {
    if (this.isRunning) { return; }
    this.isRunning = true;

    for (const systemName in this.systems) {
      this.systems[systemName].initialize();
    }

    // Game logic separated from display rendering
    // See also: http://www.chandlerprall.com/2012/06/requestanimationframe-is-not-your-logics-friend/
    this.lastTickTime = Date.now();
    this.lastDrawTime = 0;

    setTimeout(this.boundTickLoop, this.tickDuration);
    requestAnimationFrame(this.boundDrawLoop);

    return this;
  }

  stop() {
    this.isRunning = false;
    for (const systemName in this.systems) {
      this.systems[systemName].stop();
    }
    return this;
  }

  pause() {
    this.isPaused = true;
    return this;
  }

  resume() {
    this.isPaused = false;
    return this;
  }

  reset() {
    this.store = { _lastEntityId: 0 };
  }

  // TODO: Use a better pubsub library here. But, pubsub-js seemed to perform
  // badly in a game loop.

  subscribe(msg, handler) {
    if (!this.subscribers[msg]) {
      this.subscribers[msg] = [];
    }
    this.subscribers[msg].push(handler);
    return this;
  }

  unsubscribe(/* msg, handler */) {
    // TODO
    return this;
  }

  publish(msg, data) {
    if (!this.subscribers[msg]) { return; }
    for (idx = 0, handler; handler = this.subscribers[msg][idx]; idx++) {
      handler(msg, data);
    }
    return this;
  }

  addSystems(systemsData) {
    const create = (name, attrs) => {
      const cls = getSystem(name);
      system = new cls(attrs);
      system.setWorld(this);
      this.systems[name] = system;
    };
    if (Array.isArray(systemsData)) {
      systemsData.forEach(item =>
        typeof item === 'string'
          ? create(item)
          : create(item[0], item[1])
      );
    } else {
      Object.keys(systemsData)
        .forEach(name => create(name, systemsData[name]));
    }
  }

  getSystem(systemName) {
    return this.systems[systemName];
  }

  tick(timeDeltaMS) {
    this.publish(Messages.BEFORE_UPDATE);
    timeDelta = timeDeltaMS / 1000;
    for (systemName in this.systems) {
      this.systems[systemName].updateStart(timeDelta);
    }
    for (systemName in this.systems) {
      this.systems[systemName].update(timeDelta);
    }
    for (systemName in this.systems) {
      this.systems[systemName].updateEnd(timeDelta);
    }
    this.publish(Messages.AFTER_UPDATE);
  }

  tickLoop() {
    timeNow = Date.now();
    timeDelta = Math.min(timeNow - this.lastTickTime, this.maxTickDelta);
    this.lastTickTime = timeNow;

    if (!this.isPaused) {
      // Fixed-step game logic loop
      // see: http://gafferongames.com/game-physics/fix-your-timestep/
      this.tickAccumulator += timeDelta;
      while (this.tickAccumulator > this.tickDuration) {
        this.tick(this.tickDuration);
        this.tickAccumulator -= this.tickDuration;
      }
    }

    if (this.isRunning) {
      setTimeout(this.boundTickLoop, this.tickDuration);
    }
  }

  draw(timeDeltaMS) {
    this.publish(Messages.BEFORE_DRAW);
    timeDelta = timeDeltaMS / 1000;
    for (systemName in this.systems) {
      this.systems[systemName].drawStart(timeDelta);
    }
    for (systemName in this.systems) {
      this.systems[systemName].draw(timeDelta);
    }
    for (systemName in this.systems) {
      this.systems[systemName].drawEnd(timeDelta);
    }
    this.publish(Messages.AFTER_DRAW);
  }

  drawLoop(timestamp) {
    if (!this.lastDrawTime) { this.lastDrawTime = timestamp; }
    timeDelta = timestamp - this.lastDrawTime;
    this.lastDrawTime = timestamp;

    if (!this.isPaused) {
      this.draw(timeDelta);
    }

    if (this.isRunning) {
      requestAnimationFrame(this.boundDrawLoop);
    }
  }

  generateEntityId() {
    return ++(this.store._lastEntityId);
  }

  insert(...items) {
    const out = [];
    for (idx = 0; item = items[idx]; idx++) {
      entityId = this.generateEntityId();
      for (componentName in item) {
        componentAttrs = item[componentName];
        this.addComponent(entityId, componentName, componentAttrs);
      }
      this.publish(Messages.ENTITY_INSERT, entityId);
      out.push(entityId);
    }
    return out.length > 1 ? out : out[0];
  }

  destroy(entityId) {
    this.publish(Messages.ENTITY_DESTROY, entityId);
    for (componentName in this.store) {
      if ('_lastEntityId' === componentName) { continue; }
      this.removeComponent(entityId, componentName);
    }
  }

  addComponent(entityId, componentName, componentAttrs) {
    const componentManager = getComponent(componentName);
    const component = componentManager.create(componentAttrs);
    if (!this.store[componentName]) {
      this.store[componentName] = {};
    }
    this.store[componentName][entityId] = component;
  }

  removeComponent(entityId, componentName) {
    if ('_lastEntityId' === componentName) { return; }
    if (entityId in this.store[componentName]) {
      delete this.store[componentName][entityId];
    }
  }

  hasComponent(entityId, componentName) {
    return (componentName in this.store) &&
           (entityId in this.store[componentName]);
  }

  get(componentName, entityId) {
    if (!this.store[componentName]) {
      return null;
    } else if (!entityId) {
      return this.store[componentName];
    } else {
      return this.store[componentName][entityId];
    }
  }

  exportStore() {
    return this.store;
    // return {...this.store};
  }


}

export class Component {

  static defaults() {
    return {};
  }

  static create(attrs) {
    return {...this.defaults(), ...(attrs || {})};
  }

}

export class System {

  constructor(options) {
    this.options = {...this.defaultOptions(), ...(options || {})};
    this.debug = this.options.debug || false;
  }

  defaultOptions() {
    return {};
  }

  setWorld(world) {
    this.world = world;
  }

  matchComponent() { return ''; }

  initialize() { }

  stop() { }

  getMatchingComponents() {
    return this.world.get(this.matchComponent());
  }

  updateStart(/* timeDelta */) { }

  update(timeDelta) {
    matches = this.getMatchingComponents();
    for (entityId in matches) {
      this.updateComponent(timeDelta, entityId, matches[entityId]);
    }
  }

  updateComponent(/* timeDelta, entityId, component */) { }

  updateEnd(/* timeDelta */) { }

  drawStart(/* timeDelta */) { }

  draw(/* timeDelta */) { }

  drawEnd(/* timeDelta */) { }

}

const componentRegistry = {};
const systemRegistry = {};

export function installPlugins (modules) {
  modules.forEach(({components={}, systems={}}) => {
    Object.assign(componentRegistry, components);
    Object.assign(systemRegistry, systems);
  });
}

export function getComponent (componentName) {
  return componentRegistry[componentName];
}

export function getSystem (systemName) {
  return systemRegistry[systemName];
}
