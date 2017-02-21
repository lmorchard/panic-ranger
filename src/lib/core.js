/* global PIXI */
import '../../node_modules/pixi.js/dist/pixi.js';

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
let entityId, system, systemName, systemAttrs, systemCls, componentName,
    timeNow, timeDelta, componentAttrs, matches, idx, item, handler;

export const Messages = {
  ENTITY_INSERT: 'entity_insert',
  ENTITY_DESTROY: 'entity_destroy'
};

export class World {
  constructor(options) {
    options = options || {};

    this.isRunning = false;
    this.isPaused = false;
    this.debug = false;

    this.systems = {};
    if (options.systems) {
      this.addSystems(options.systems);
    }

    this.store = {};

    this.subscribers = {};

    this.tickDuration = TARGET_DURATION;
    this.maxTickDelta = TARGET_DURATION * 5;
    this.tickAccumulator = 0;

    this.lastTickTime = 0;
    this.lastDrawTime = 0;

    this.boundTickLoop = () => this.tickLoop();
    this.boundDrawLoop = (timestamp) => this.drawLoop(timestamp);

    this.reset();
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
    this.store = {};
    this.lastEntityId = 0;
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
    for (systemName in systemsData) {
      systemAttrs = systemsData[systemName];
      systemCls = getSystem(systemName);
      system = new systemCls(systemAttrs);
      system.setWorld(this);
      this.systems[systemName] = system;
    }
  }

  getSystem(systemName) {
    return this.systems[systemName];
  }

  tick(timeDeltaMS) {
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
    return ++(this.lastEntityId);
  }

  insert(...items) {
    const out = [];
    for (idx = 0; item = items[idx]; idx++) {
      entityId = this.generateEntityId();
      for (componentName in item) {
        componentAttrs = item[componentName];
        this.addComponent(entityId, componentName, componentAttrs);
      }
      if (this.world) this.world.publish(Messages.ENTITY_INSERT, entityId);
      out.push(entityId);
    }
    return out.length > 1 ? out : out[0];
  }

  destroy(entityId) {
    if (this.world) this.world.publish(Messages.ENTITY_DESTROY, entityId);
    for (componentName in this.store) {
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

  getDebugGraphics() {
    if (!this.world.debug) {
      if (this.gDebug) { this.gDebug.visible = false; }
      return;
    }
    if (!this.viewportSystem) {
      this.viewportSystem = this.world.getSystem(this.options.viewportSystemName || 'ViewportPixi');
      this.gDebug = new PIXI.Graphics();
      this.viewportSystem.stage.addChild(this.gDebug);
      this.gDebug.position.x = 0;
      this.gDebug.position.y = 0;
    }
    this.gDebug.clear();
    this.gDebug.visible = true;
    return this.gDebug;
  }

  drawEnd(/* timeDelta */) { }

}

const componentRegistry = {};

export function registerComponent(componentName, componentManager) {
  componentRegistry[componentName] = componentManager;
}

export function getComponent(componentName) {
  return componentRegistry[componentName];
}

const systemRegistry = {};

export function registerSystem(systemName, system) {
  systemRegistry[systemName] = system;
}

export function getSystem(systemName) {
  return systemRegistry[systemName];
}
