(function () {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/* global PIXI */

var TARGET_FPS = 60;
var TARGET_DURATION = 1000 / TARGET_FPS;

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
  setTimeout(fn, 1000 / 60);
};

// Commonly used temp variables, pre-declared early.
var entityId = void 0;
var system = void 0;
var systemName = void 0;
var systemAttrs = void 0;
var systemCls = void 0;
var componentName = void 0;
var timeNow = void 0;
var timeDelta = void 0;
var componentAttrs = void 0;
var matches = void 0;
var idx = void 0;
var item = void 0;
var handler = void 0;

var Messages = {
  ENTITY_INSERT: 'entity_insert',
  ENTITY_DESTROY: 'entity_destroy'
};

var World = function () {
  function World(options) {
    var _this = this;

    classCallCheck(this, World);

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

    this.boundTickLoop = function () {
      return _this.tickLoop();
    };
    this.boundDrawLoop = function (timestamp) {
      return _this.drawLoop(timestamp);
    };

    this.reset();
  }

  createClass(World, [{
    key: 'start',
    value: function start() {
      if (this.isRunning) {
        return;
      }
      this.isRunning = true;

      for (var _systemName in this.systems) {
        this.systems[_systemName].initialize();
      }

      // Game logic separated from display rendering
      // See also: http://www.chandlerprall.com/2012/06/requestanimationframe-is-not-your-logics-friend/
      this.lastTickTime = Date.now();
      this.lastDrawTime = 0;

      setTimeout(this.boundTickLoop, this.tickDuration);
      requestAnimationFrame(this.boundDrawLoop);

      return this;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.isRunning = false;
      return this;
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.isPaused = true;
      return this;
    }
  }, {
    key: 'resume',
    value: function resume() {
      this.isPaused = false;
      return this;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.store = {};
      this.lastEntityId = 0;
    }

    // TODO: Use a better pubsub library here. But, pubsub-js seemed to perform
    // badly in a game loop.

  }, {
    key: 'subscribe',
    value: function subscribe(msg, handler) {
      if (!this.subscribers[msg]) {
        this.subscribers[msg] = [];
      }
      this.subscribers[msg].push(handler);
      return this;
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe() /* msg, handler */{
      // TODO
      return this;
    }
  }, {
    key: 'publish',
    value: function publish(msg, data) {
      if (!this.subscribers[msg]) {
        return;
      }
      for (idx = 0, handler; handler = this.subscribers[msg][idx]; idx++) {
        handler(msg, data);
      }
      return this;
    }
  }, {
    key: 'addSystems',
    value: function addSystems(systemsData) {
      for (systemName in systemsData) {
        systemAttrs = systemsData[systemName];
        systemCls = getSystem(systemName);
        system = new systemCls(systemAttrs);
        system.setWorld(this);
        this.systems[systemName] = system;
      }
    }
  }, {
    key: 'getSystem',
    value: function getSystem(systemName) {
      return this.systems[systemName];
    }
  }, {
    key: 'tick',
    value: function tick(timeDeltaMS) {
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
  }, {
    key: 'tickLoop',
    value: function tickLoop() {
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
  }, {
    key: 'draw',
    value: function draw(timeDeltaMS) {
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
  }, {
    key: 'drawLoop',
    value: function drawLoop(timestamp) {
      if (!this.lastDrawTime) {
        this.lastDrawTime = timestamp;
      }
      timeDelta = timestamp - this.lastDrawTime;
      this.lastDrawTime = timestamp;

      if (!this.isPaused) {
        this.draw(timeDelta);
      }

      if (this.isRunning) {
        requestAnimationFrame(this.boundDrawLoop);
      }
    }
  }, {
    key: 'generateEntityId',
    value: function generateEntityId() {
      return ++this.lastEntityId;
    }
  }, {
    key: 'insert',
    value: function insert() {
      var out = [];

      for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
        items[_key] = arguments[_key];
      }

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
  }, {
    key: 'destroy',
    value: function destroy(entityId) {
      if (this.world) this.world.publish(Messages.ENTITY_DESTROY, entityId);
      for (componentName in this.store) {
        this.removeComponent(entityId, componentName);
      }
    }
  }, {
    key: 'addComponent',
    value: function addComponent(entityId, componentName, componentAttrs) {
      var componentManager = getComponent(componentName);
      var component = componentManager.create(componentAttrs);
      if (!this.store[componentName]) {
        this.store[componentName] = {};
      }
      this.store[componentName][entityId] = component;
    }
  }, {
    key: 'removeComponent',
    value: function removeComponent(entityId, componentName) {
      if (entityId in this.store[componentName]) {
        delete this.store[componentName][entityId];
      }
    }
  }, {
    key: 'hasComponent',
    value: function hasComponent(entityId, componentName) {
      return componentName in this.store && entityId in this.store[componentName];
    }
  }, {
    key: 'get',
    value: function get(componentName, entityId) {
      if (!this.store[componentName]) {
        return null;
      } else if (!entityId) {
        return this.store[componentName];
      } else {
        return this.store[componentName][entityId];
      }
    }
  }]);
  return World;
}();

var Component = function () {
  function Component() {
    classCallCheck(this, Component);
  }

  createClass(Component, null, [{
    key: 'defaults',
    value: function defaults() {
      return {};
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return _extends({}, this.defaults(), attrs || {});
    }
  }]);
  return Component;
}();

var System = function () {
  function System(options) {
    classCallCheck(this, System);

    this.options = _extends({}, this.defaultOptions(), options || {});
    this.debug = this.options.debug || false;
  }

  createClass(System, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {};
    }
  }, {
    key: 'setWorld',
    value: function setWorld(world) {
      this.world = world;
    }
  }, {
    key: 'matchComponent',
    value: function matchComponent() {
      return '';
    }
  }, {
    key: 'initialize',
    value: function initialize() {}
  }, {
    key: 'getMatchingComponents',
    value: function getMatchingComponents() {
      return this.world.get(this.matchComponent());
    }
  }, {
    key: 'updateStart',
    value: function updateStart() /* timeDelta */{}
  }, {
    key: 'update',
    value: function update(timeDelta) {
      matches = this.getMatchingComponents();
      for (entityId in matches) {
        this.updateComponent(timeDelta, entityId, matches[entityId]);
      }
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent() /* timeDelta, entityId, component */{}
  }, {
    key: 'updateEnd',
    value: function updateEnd() /* timeDelta */{}
  }, {
    key: 'drawStart',
    value: function drawStart() /* timeDelta */{}
  }, {
    key: 'draw',
    value: function draw() /* timeDelta */{}
  }, {
    key: 'getDebugGraphics',
    value: function getDebugGraphics() {
      if (!this.world.debug) {
        if (this.gDebug) {
          this.gDebug.visible = false;
        }
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
  }, {
    key: 'drawEnd',
    value: function drawEnd() /* timeDelta */{}
  }]);
  return System;
}();

var componentRegistry = {};

function registerComponent(componentName, componentManager) {
  componentRegistry[componentName] = componentManager;
}

function getComponent(componentName) {
  return componentRegistry[componentName];
}

var systemRegistry = {};

function registerSystem(systemName, system) {
  systemRegistry[systemName] = system;
}

function getSystem(systemName) {
  return systemRegistry[systemName];
}

var Name = function (_Core$Component) {
  inherits(Name, _Core$Component);

  function Name() {
    classCallCheck(this, Name);
    return possibleConstructorReturn(this, (Name.__proto__ || Object.getPrototypeOf(Name)).apply(this, arguments));
  }

  createClass(Name, null, [{
    key: 'defaults',
    value: function defaults() {
      return { name: 'unnamed' };
    }
  }, {
    key: 'findEntityByName',
    value: function findEntityByName(world, name) {
      var names = world.get('Name');
      for (var nid in names) {
        var nameComponent = names[nid];
        if (nameComponent.name === name) {
          return nid;
        }
      }
    }
  }]);
  return Name;
}(Component);

registerComponent('Name', Name);

/**
 * @author       Timo Hausmann
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2014 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * A QuadTree implementation. The original code was a conversion of the Java code posted to GameDevTuts.
 * However I've tweaked it massively to add node indexing, removed lots of temp. var creation and significantly increased performance as a result.
 * Original version at https://github.com/timohausmann/quadtree-js/
 *
 * @class QuadTree
 * @constructor
 * @param {number} x - The top left coordinate of the quadtree.
 * @param {number} y - The top left coordinate of the quadtree.
 * @param {number} width - The width of the quadtree in pixels.
 * @param {number} height - The height of the quadtree in pixels.
 * @param {number} [maxObjects=10] - The maximum number of objects per node.
 * @param {number} [maxLevels=4] - The maximum number of levels to iterate to.
 * @param {number} [level=0] - Which level is this?
 */
function QuadTree(left, top, width, height, maxObjects, maxLevels, level, root) {

  /**
   * @property {number} maxObjects - The maximum number of objects per node.
   * @default
   */
  this.maxObjects = 10;

  /**
   * @property {number} maxLevels - The maximum number of levels to break down to.
   * @default
   */
  this.maxLevels = 4;

  /**
   * @property {number} level - The current level.
   */
  this.level = 0;

  /**
   * @property {object} bounds - Object that contains the quadtree bounds.
   */
  this.bounds = {};

  /**
   * @property {array} objects - Array of quadtree children.
   */
  this.objects = [];

  /**
   * @property {array} nodes - Array of associated child nodes.
   */
  this.nodes = [];

  /**
   * @property {array} _empty - Internal empty array.
   * @private
   */
  this._empty = [];

  this.root = root || this;
  this.entityMap = {};

  this.reset(left, top, width, height, maxObjects, maxLevels, level);
}

QuadTree.prototype = {

  /**
   * Resets the QuadTree.
   *
   * @method QuadTree#reset
   * @param {number} x - The top left coordinate of the quadtree.
   * @param {number} y - The top left coordinate of the quadtree.
   * @param {number} width - The width of the quadtree in pixels.
   * @param {number} height - The height of the quadtree in pixels.
   * @param {number} [maxObjects=10] - The maximum number of objects per node.
   * @param {number} [maxLevels=4] - The maximum number of levels to iterate to.
   * @param {number} [level=0] - Which level is this?
   */
  reset: function reset(left, top, width, height, maxObjects, maxLevels, level) {

    this.maxObjects = maxObjects || 10;
    this.maxLevels = maxLevels || 4;
    this.level = level || 0;

    this.bounds = {
      width: width,
      height: height,
      subWidth: Math.floor(width / 2),
      subHeight: Math.floor(height / 2),
      left: Math.round(left),
      top: Math.round(top),
      midX: Math.round(left + width / 2),
      midY: Math.round(top + height / 2),
      right: Math.round(left + width),
      bottom: Math.round(top + height)
    };

    this.objects.length = 0;
    this.nodes.length = 0;
  },

  /**
   * Split the node into 4 subnodes
   *
   * @method QuadTree#split
   */
  split: function split() {

    //  top right node
    this.nodes[0] = new QuadTree(this.bounds.left + this.bounds.subWidth, this.bounds.top, this.bounds.subWidth, this.bounds.subHeight, this.maxObjects, this.maxLevels, this.level + 1, this.root);

    //  top left node
    this.nodes[1] = new QuadTree(this.bounds.left, this.bounds.top, this.bounds.subWidth, this.bounds.subHeight, this.maxObjects, this.maxLevels, this.level + 1, this.root);

    //  bottom left node
    this.nodes[2] = new QuadTree(this.bounds.left, this.bounds.top + this.bounds.subHeight, this.bounds.subWidth, this.bounds.subHeight, this.maxObjects, this.maxLevels, this.level + 1, this.root);

    //  bottom right node
    this.nodes[3] = new QuadTree(this.bounds.left + this.bounds.subWidth, this.bounds.top + this.bounds.subHeight, this.bounds.subWidth, this.bounds.subHeight, this.maxObjects, this.maxLevels, this.level + 1, this.root);
  },

  /**
   * Insert the object into the node. If the node exceeds the capacity, it will split and add all objects to their corresponding subnodes.
   *
   * @method QuadTree#insert
   * @param {Phaser.Physics.Arcade.Body|object} body - The Body object to insert into the quadtree. Can be any object so long as it exposes x, y, right and bottom properties.
   */
  insert: function insert(body) {

    var i = 0;
    var index;

    //  if we have subnodes ...
    if (this.nodes[0] != null) {
      index = this.getIndex(body);
      if (index !== -1) {
        this.nodes[index].insert(body);
        return;
      }
    }

    // Check if we already have this item in the quadtree structure.
    var oldNode = this.root.entityMap[body.entityId];
    if (oldNode === this) {
      // If we have the item, and it's this current sub-tree, then just bail.
      return;
    }
    if (oldNode) {
      // If the item is known, but in another sub-tree, then delete it from there.
      var objectIndex = oldNode.objects.indexOf(body);
      if (objectIndex !== -1) {
        oldNode.objects.splice(objectIndex, 1);
      }
    }

    /*
    // TODO: Need the opposite of split() to consolidate subtrees when they
    // lose items.
     this.root.entityMap[body.entityId] = this;
    */

    this.objects.push(body);

    if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
      //  Split if we don't already have subnodes
      if (this.nodes[0] == null) {
        this.split();
      }
      //  Add objects to subnodes
      while (i < this.objects.length) {
        index = this.getIndex(this.objects[i]);
        if (index !== -1) {
          //  this is expensive - see what we can do about it
          this.nodes[index].insert(this.objects.splice(i, 1)[0]);
        } else {
          i++;
        }
      }
    }
  },

  /**
   * Determine which node the object belongs to.
   *
   * @method QuadTree#getIndex
   * @param {Phaser.Rectangle|object} rect - The bounds in which to check.
   * @return {number} index - Index of the subnode (0-3), or -1 if rect cannot completely fit within a subnode and is part of the parent node.
   */
  getIndex: function getIndex(rect) {
    if (rect.left < this.bounds.midX && rect.right < this.bounds.midX) {
      if (rect.top < this.bounds.midY && rect.bottom < this.bounds.midY) {
        //  rect fits within the top-left quadrant of this quadtree
        return 1;
      } else if (rect.top > this.bounds.midY) {
        //  rect fits within the bottom-left quadrant of this quadtree
        return 2;
      }
    } else if (rect.left > this.bounds.midX) {
      //  rect can completely fit within the right quadrants
      if (rect.top < this.bounds.midY && rect.bottom < this.bounds.midY) {
        //  rect fits within the top-right quadrant of this quadtree
        return 0;
      } else if (rect.top > this.bounds.midY) {
        //  rect fits within the bottom-right quadrant of this quadtree
        return 3;
      }
    }
    // rect doesn't fit, i.e. it straddles the internal quadrants
    return -1;
  },

  /**
   * Iterate through all objects that could collide with the given Sprite or Rectangle.
   *
   * @method QuadTree#retrieve
   * @param {Phaser.Sprite|Phaser.Rectangle} source - The source object to check the QuadTree against. Either a Sprite or Rectangle.
   */
  iterate: function iterate(source, iteratorFn, optionalParam) {
    var index = this.getIndex(source);

    for (var i = 0; i < this.objects.length; i++) {
      iteratorFn(this.objects[i], optionalParam);
    }

    if (this.nodes[0]) {
      //  If rect fits into a subnode ..
      if (index !== -1) {
        this.nodes[index].iterate(source, iteratorFn, optionalParam);
      } else {
        //  If rect does not fit into a subnode, check it against all subnodes (unrolled for speed)
        this.nodes[0].iterate(source, iteratorFn, optionalParam);
        this.nodes[1].iterate(source, iteratorFn, optionalParam);
        this.nodes[2].iterate(source, iteratorFn, optionalParam);
        this.nodes[3].iterate(source, iteratorFn, optionalParam);
      }
    }
  },

  /**
   * Clear the quadtree.
   * @method QuadTree#clear
   */
  clear: function clear() {
    this.objects.length = 0;
    var i = this.nodes.length;
    while (i--) {
      this.nodes[i].clear();
      this.nodes.splice(i, 1);
    }
    this.nodes.length = 0;
  }

};

/**
 * Javascript QuadTree
 * @version 1.0
 *
 * @version 1.3, March 11th 2014
 * @author Richard Davey
 * The original code was a conversion of the Java code posted to GameDevTuts. However I've tweaked
 * it massively to add node indexing, removed lots of temp. var creation and significantly
 * increased performance as a result.
 *
 * Original version at https://github.com/timohausmann/quadtree-js/
 */

/**
 * @copyright © 2012 Timo Hausmann
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var Position = function (_Component) {
  inherits(Position, _Component);

  function Position() {
    classCallCheck(this, Position);
    return possibleConstructorReturn(this, (Position.__proto__ || Object.getPrototypeOf(Position)).apply(this, arguments));
  }

  createClass(Position, null, [{
    key: 'defaults',
    value: function defaults() {
      return { x: 0, y: 0, rotation: 0 };
    }
  }]);
  return Position;
}(Component);

registerComponent('Position', Position);

var entityId$1 = void 0;
var sprite = void 0;
var position = void 0;
var positions = void 0;

var PositionSystem = function (_System) {
  inherits(PositionSystem, _System);

  function PositionSystem() {
    classCallCheck(this, PositionSystem);
    return possibleConstructorReturn(this, (PositionSystem.__proto__ || Object.getPrototypeOf(PositionSystem)).apply(this, arguments));
  }

  createClass(PositionSystem, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {
        quadtreeMaxAge: 2,
        quadtreeObjectsPerNode: 5,
        quadtreeMaxLevels: 5
      };
    }
  }, {
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Position';
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.bounds = {
        left: 0, top: 0, right: 0, bottom: 0,
        width: 0, height: 0
      };
      this.quadtree = new QuadTree(-1000, -1000, 2000, 2000, this.options.quadtreeObjectsPerNode, this.options.quadtreeMaxLevels);
    }
  }, {
    key: 'update',
    value: function update(timeDelta) {
      this.updateBounds();
      this.resetQuadtree(timeDelta);
      get$1(PositionSystem.prototype.__proto__ || Object.getPrototypeOf(PositionSystem.prototype), 'update', this).call(this, timeDelta);
    }
  }, {
    key: 'resetQuadtree',
    value: function resetQuadtree() {
      this.quadtree.reset(this.bounds.left, this.bounds.top, this.bounds.width, this.bounds.height, this.options.quadtreeObjectsPerNode, this.options.quadtreeMaxLevels);
    }
  }, {
    key: 'updateBounds',
    value: function updateBounds() {
      this.bounds.left = this.bounds.top = this.bounds.right = this.bounds.bottom = null;
      positions = this.getMatchingComponents();
      for (entityId$1 in positions) {
        position = positions[entityId$1];
        if (this.bounds.left === null || position.left < this.bounds.left) {
          this.bounds.left = position.left;
        }
        if (this.bounds.top === null || position.top < this.bounds.top) {
          this.bounds.top = position.top;
        }
        if (this.bounds.right === null || position.right > this.bounds.right) {
          this.bounds.right = position.right;
        }
        if (this.bounds.bottom === null || position.bottom > this.bounds.bottom) {
          this.bounds.bottom = position.bottom;
        }
      }
      this.bounds.width = this.bounds.right - this.bounds.left;
      this.bounds.height = this.bounds.bottom - this.bounds.top;
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(timeDelta, entityId, position) {
      sprite = this.world.get('Sprite', entityId);
      if (!sprite) {
        return;
      }

      var halfWidth = sprite.width / 2;
      var halfHeight = sprite.height / 2;

      position.entityId = entityId;
      position.width = sprite.width;
      position.height = sprite.height;
      position.left = position.x - halfWidth;
      position.top = position.y - halfHeight;
      position.right = position.x + halfWidth;
      position.bottom = position.y + halfHeight;

      this.quadtree.insert(position);
    }
  }, {
    key: 'draw',
    value: function draw() /* timeDelta */{
      var g = this.getDebugGraphics();
      if (!g) {
        return;
      }

      g.lineStyle(4, 0x882222);
      positions = this.getMatchingComponents();
      for (entityId$1 in positions) {
        position = positions[entityId$1];
        sprite = this.world.get('Sprite', entityId$1);
        g.drawCircle(position.x, position.y, sprite.width / 2);
        g.moveTo(position.x - 20, position.y);
        g.lineTo(position.x + 20, position.y);
        g.moveTo(position.x, position.y - 20);
        g.lineTo(position.x, position.y + 20);
      }

      g.lineStyle(4, 0x228822);
      this.drawDebugQuadtreeNode(g, this.quadtree);

      g.lineStyle(4, 0xffff33);
      g.moveTo(-20, 0);
      g.lineTo(20, 0);
      g.moveTo(0, -20);
      g.lineTo(0, 20);
      g.moveTo(0, 0);
      g.drawRect(this.bounds.left, this.bounds.top, this.bounds.width, this.bounds.height);
    }
  }, {
    key: 'drawDebugQuadtreeNode',
    value: function drawDebugQuadtreeNode(g, root) {
      if (!root) {
        return;
      }

      g.lineStyle(4, 0x883388);
      g.drawRect(root.bounds.left, root.bounds.top, root.bounds.width, root.bounds.height);

      g.lineStyle(4, 0x112222);
      root.objects.forEach(function (body) {
        return g.drawRect(body.left, body.top, body.width, body.height);
      });

      this.drawDebugQuadtreeNode(g, root.nodes[0]);
      this.drawDebugQuadtreeNode(g, root.nodes[1]);
      this.drawDebugQuadtreeNode(g, root.nodes[2]);
      this.drawDebugQuadtreeNode(g, root.nodes[3]);
    }
  }]);
  return PositionSystem;
}(System);

registerSystem('Position', PositionSystem);

var PI2 = Math.PI * 2;

var Motion = function (_Core$Component) {
  inherits(Motion, _Core$Component);

  function Motion() {
    classCallCheck(this, Motion);
    return possibleConstructorReturn(this, (Motion.__proto__ || Object.getPrototypeOf(Motion)).apply(this, arguments));
  }

  createClass(Motion, null, [{
    key: 'defaults',
    value: function defaults() {
      return { dx: 0, dy: 0, drotation: 0 };
    }
  }]);
  return Motion;
}(Component);
registerComponent('Motion', Motion);

var MotionSystem = function (_Core$System) {
  inherits(MotionSystem, _Core$System);

  function MotionSystem() {
    classCallCheck(this, MotionSystem);
    return possibleConstructorReturn(this, (MotionSystem.__proto__ || Object.getPrototypeOf(MotionSystem)).apply(this, arguments));
  }

  createClass(MotionSystem, [{
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Motion';
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(timeDelta, entityId, motion) {
      var pos = this.world.get('Position', entityId);
      pos.x += motion.dx * timeDelta;
      pos.y += motion.dy * timeDelta;

      // Update the rotation, ensuring a 0..2*Math.PI range.
      pos.rotation = (pos.rotation + motion.drotation * timeDelta) % PI2;
      if (pos.rotation < 0) {
        pos.rotation += PI2;
      }
    }
  }]);
  return MotionSystem;
}(System);
registerSystem('Motion', MotionSystem);

/*
  Originally by Vitalii [Nayjest] Stepanenko <gmail@vitaliy.in>
  Tweaky & fixes by Les Orchard <me@lmorchard.com>
*/

function Vector2D(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Vector2D.cloneFrom = function (object) {
  return new Vector2D(object.x, object.y);
};

Vector2D.fromArray = function (array) {
  return new Vector2D(array[0], array[1]);
};

Vector2D.zero = new Vector2D(0, 0);

Vector2D.prototype.add = function (vector) {
  this.x += vector.x;
  this.y += vector.y;
  return this;
};

Vector2D.prototype.addScalar = function (val) {
  this.x += val;
  this.y += val;
  return this;
};

Vector2D.prototype.eq = function (vector) {
  return vector.x === this.x && vector.y === this.y;
};

Vector2D.prototype.subtract = function (vector) {
  this.x -= vector.x;
  this.y -= vector.y;
  return this;
};

Vector2D.prototype.clone = function () {
  return new Vector2D(this.x, this.y);
};

Vector2D.prototype.set = function (vector) {
  this.x = vector.x;
  this.y = vector.y;
  return this;
};

Vector2D.prototype.setValues = function (_at_x, _at_y) {
  this.x = _at_x;
  this.y = _at_y;
  return this;
};

Vector2D.prototype.dist = function (vector) {
  return Math.sqrt((vector.x - this.x) * (vector.x - this.x) + (vector.y - this.y) * (vector.y - this.y));
};

Vector2D.prototype.normalise = function () {
  return this.normalize();
};

Vector2D.prototype.normalize = function () {
  if (!this.isZero()) {
    var m = this.magnitude();
    this.x /= m;
    this.y /= m;
  }
  return this;
};

Vector2D.prototype.isZero = function () {
  return this.x === 0 && this.y === 0;
};

Vector2D.prototype.reverse = function () {
  this.x = -this.x;
  this.y = -this.y;
  return this;
};

Vector2D.prototype.magnitude = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2D.prototype.toArray = function () {
  return [this.x, this.y];
};

Vector2D.prototype.angle = function () {
  return Math.atan2(this.y, this.x);
};

Vector2D.prototype.rotate = function (angle) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  return this.setValues(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
};

Vector2D.prototype.angleTo = function (vector) {
  return Math.atan2(vector.y - this.y, vector.x - this.x);
};

Vector2D.prototype.rotateAround = function (point, angle) {
  return this.subtract(point).rotate(angle).add(point);
};

Vector2D.prototype.multiplyScalar = function (val) {
  this.x *= val;
  this.y *= val;
  return this;
};

Vector2D.prototype.multiply = function (vector) {
  this.x *= vector.x;
  this.y *= vector.y;
  return this;
};

Vector2D.prototype.divide = function (vector) {
  this.x /= vector.x;
  this.y /= vector.y;
  return this;
};

Vector2D.prototype.divideScalar = function (val) {
  this.x /= val;
  this.y /= val;
  return this;
};

Vector2D.prototype.round = function () {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this;
};

Vector2D.prototype.dot = function (vector) {
  return this.x * vector.x + this.y * vector.y;
};

var Thruster = function (_Core$Component) {
  inherits(Thruster, _Core$Component);

  function Thruster() {
    classCallCheck(this, Thruster);
    return possibleConstructorReturn(this, (Thruster.__proto__ || Object.getPrototypeOf(Thruster)).apply(this, arguments));
  }

  createClass(Thruster, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        active: true,
        stop: false,
        useBrakes: true,
        deltaV: 0,
        maxV: 0
      };
    }
  }]);
  return Thruster;
}(Component);
registerComponent('Thruster', Thruster);

var ThrusterSystem = function (_Core$System) {
  inherits(ThrusterSystem, _Core$System);

  function ThrusterSystem() {
    classCallCheck(this, ThrusterSystem);
    return possibleConstructorReturn(this, (ThrusterSystem.__proto__ || Object.getPrototypeOf(ThrusterSystem)).apply(this, arguments));
  }

  createClass(ThrusterSystem, [{
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Thruster';
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.vInertia = new Vector2D();
      this.vThrust = new Vector2D();
      this.vBrakes = new Vector2D();
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(timeDelta, entityId, thruster) {

      if (!thruster.active) {
        return;
      }

      var pos = this.world.get('Position', entityId);
      var motion = this.world.get('Motion', entityId);
      if (!pos || !motion) {
        return;
      }

      // Inertia is current motion
      this.vInertia.setValues(motion.dx, motion.dy);

      // delta-v available for the current tick
      var tickDeltaV = timeDelta * thruster.deltaV;

      if (!thruster.stop) {
        // Create thrust vector per rotation and add to inertia.
        this.vThrust.setValues(tickDeltaV, 0);
        this.vThrust.rotate(pos.rotation);
        this.vInertia.add(this.vThrust);
      }

      if (thruster.useBrakes) {
        // Try to enforce the max_v limit with braking thrust.
        var maxV = thruster.stop ? 0 : thruster.maxV;
        var currV = this.vInertia.magnitude();
        var overV = currV - maxV;
        if (overV > 0) {
          // Braking delta-v is max thruster output or remaining overage,
          // whichever is smallest. Braking vector opposes inertia.
          var brakingDv = Math.min(tickDeltaV, overV);
          this.vBrakes.setValues(this.vInertia.x, this.vInertia.y);
          this.vBrakes.normalize();
          this.vBrakes.multiplyScalar(0 - brakingDv);
          this.vInertia.add(this.vBrakes);
        }
        if (thruster.stop && currV === 0) {
          thruster.active = false;
        }
      }

      // Update inertia. Note that we've been careful only to make changes
      // to inertia within the delta-v of the thruster. Other influences
      // on inertia should be preserved.
      motion.dx = this.vInertia.x;
      motion.dy = this.vInertia.y;
    }
  }]);
  return ThrusterSystem;
}(System);
registerSystem('Thruster', ThrusterSystem);

var Orbiter = function (_Core$Component) {
  inherits(Orbiter, _Core$Component);

  function Orbiter() {
    classCallCheck(this, Orbiter);
    return possibleConstructorReturn(this, (Orbiter.__proto__ || Object.getPrototypeOf(Orbiter)).apply(this, arguments));
  }

  createClass(Orbiter, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        name: null,
        entityId: null,
        angle: 0.0,
        rotate: true,
        radPerSec: Math.PI / 4
      };
    }
  }]);
  return Orbiter;
}(Component);
registerComponent('Orbiter', Orbiter);

var OrbiterSystem = function (_Core$System) {
  inherits(OrbiterSystem, _Core$System);

  function OrbiterSystem() {
    classCallCheck(this, OrbiterSystem);
    return possibleConstructorReturn(this, (OrbiterSystem.__proto__ || Object.getPrototypeOf(OrbiterSystem)).apply(this, arguments));
  }

  createClass(OrbiterSystem, [{
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Orbiter';
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.vOrbited = new Vector2D();
      this.vOrbiter = new Vector2D();
      this.vOld = new Vector2D();
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(timeDelta, entityId, orbiter) {

      // Look up the orbited entity ID, if only name given.
      if (orbiter.name && !orbiter.entityId) {
        orbiter.entityId = getComponent('Name').findEntityByName(this.world, orbiter.name);
      }

      var pos = this.world.get('Position', entityId);
      var oPos = this.world.get('Position', orbiter.entityId);

      this.vOrbited.setValues(oPos.x, oPos.y);
      this.vOrbiter.setValues(pos.x, pos.y);

      var angleDelta = timeDelta * orbiter.radPerSec;
      this.vOrbiter.rotateAround(this.vOrbited, angleDelta);

      this.vOld.setValues(pos.x, pos.y);
      pos.x = this.vOrbiter.x;
      pos.y = this.vOrbiter.y;
      if (orbiter.rotate) {
        pos.rotation = this.vOld.angleTo(this.vOrbiter);
      }
    }
  }]);
  return OrbiterSystem;
}(System);
registerSystem('Orbiter', OrbiterSystem);

var Seeker = function (_Core$Component) {
  inherits(Seeker, _Core$Component);

  function Seeker() {
    classCallCheck(this, Seeker);
    return possibleConstructorReturn(this, (Seeker.__proto__ || Object.getPrototypeOf(Seeker)).apply(this, arguments));
  }

  createClass(Seeker, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        active: true,
        targetName: null,
        targetEntityId: null,
        targetPosition: null,
        acquisitionDelay: 0,
        radPerSec: Math.PI
      };
    }
  }]);
  return Seeker;
}(Component);

registerComponent('Seeker', Seeker);

var SeekerSystem = function (_Core$System) {
  inherits(SeekerSystem, _Core$System);

  function SeekerSystem() {
    classCallCheck(this, SeekerSystem);
    return possibleConstructorReturn(this, (SeekerSystem.__proto__ || Object.getPrototypeOf(SeekerSystem)).apply(this, arguments));
  }

  createClass(SeekerSystem, [{
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Seeker';
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.vSeeker = new Vector2D();
      this.vTarget = new Vector2D();
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(timeDelta, entityId, seeker) {

      if (!seeker.active) {
        return;
      }

      // Look up the orbited entity ID, if only name given.
      if (seeker.targetName && !seeker.targetEntityId) {
        seeker.targetEntityId = getComponent('Name').findEntityByName(this.world, seeker.targetName);
      }

      // Process a delay before the seeker 'acquires' the target and
      // starts steering. Makes missiles look interesting.
      if (seeker.acquisitionDelay > 0) {
        seeker.acquisitionDelay -= timeDelta;
        return;
      }

      var position = this.world.get('Position', entityId);
      var motion = this.world.get('Motion', entityId);
      if (!position || !motion) {
        return;
      }

      // Accept either a raw x/y coord or entity ID as target
      var targetPosition = seeker.targetPosition;
      if (!targetPosition) {
        targetPosition = this.world.get('Position', seeker.targetEntityId);
      }
      if (!targetPosition) {
        return;
      }

      // Set up the vectors for angle math...
      this.vSeeker.setValues(position.x, position.y);
      this.vTarget.setValues(targetPosition.x, targetPosition.y);

      // Get the target angle, ensuring a 0..2*Math.PI range.
      var targetAngle = this.vSeeker.angleTo(this.vTarget);
      if (targetAngle < 0) {
        targetAngle += 2 * Math.PI;
      }

      // Pick the direction from current to target angle
      var direction = targetAngle < position.rotation ? -1 : 1;

      // If the offset between the angles is more than half a circle, go
      // the other way because it'll be shorter.
      var offset = Math.abs(targetAngle - position.rotation);
      if (offset > Math.PI) {
        direction = 0 - direction;
      }

      // Work out the desired delta-rotation to steer toward target
      var targetDr = direction * Math.min(seeker.radPerSec, offset / timeDelta);

      // Calculate the delta-rotation impulse required to meet the goal,
      // but constrain to the capability of the steering thrusters
      var impulseDr = targetDr - motion.drotation;
      if (Math.abs(impulseDr) > seeker.radPerSec) {
        if (impulseDr > 0) {
          impulseDr = seeker.radPerSec;
        } else if (impulseDr < 0) {
          impulseDr = 0 - seeker.radPerSec;
        }
      }
      motion.drotation += impulseDr;
    }
  }]);
  return SeekerSystem;
}(System);

registerSystem('Seeker', SeekerSystem);

/* global PIXI */
var PI2$1 = Math.PI * 2;

// See also: http://phrogz.net/JS/wheeldelta.html
var wheelDistance = function wheelDistance(evt) {
  if (!evt) evt = event;
  var w = evt.wheelDelta,
      d = evt.detail;
  if (d) {
    if (w) return w / d / 40 * d > 0 ? 1 : -1; // Opera
    else return -d / 3; // Firefox;         TODO: do not /3 for OS X
  } else return w / 120; // IE/Safari/Chrome TODO: /3 for Chrome OS X
};

var ViewportPixi = function (_Core$System) {
  inherits(ViewportPixi, _Core$System);

  function ViewportPixi() {
    classCallCheck(this, ViewportPixi);
    return possibleConstructorReturn(this, (ViewportPixi.__proto__ || Object.getPrototypeOf(ViewportPixi)).apply(this, arguments));
  }

  createClass(ViewportPixi, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {
        lineWidth: 2.5,
        zoom: 1.0,
        zoomMin: 0.1,
        zoomMax: 10.0,
        zoomWheelFactor: 0.05,
        gridEnabled: true,
        gridSize: 250,
        gridColor: 0x222222,
        followEnabled: true,
        followName: null,
        followEntityId: null
      };
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.container = document.querySelector(this.options.container);
      this.renderer = PIXI.autoDetectRenderer(this.container.offsetWidth, this.container.offsetHeight, { antialias: true });
      this.renderer.autoResize = true;
      this.canvas = this.renderer.view;
      this.container.appendChild(this.canvas);
      this.stage = new PIXI.Container();

      //this.filter = new PIXI.filters.FXAAFilter();
      //this.filter.blur = 1;
      //this.stage.filters = [ this.filter ];

      this.backdrop = new PIXI.Graphics();
      this.stage.addChild(this.backdrop);

      this.graphics = {};

      var events = {
        'resize': function resize(ev) {
          _this2.updateMetrics(ev);
        },
        'orientationchange': function orientationchange(ev) {
          _this2.updateMetrics(ev);
        },
        'mousedown': function mousedown(ev) {
          _this2.onMouseDown(ev);
        },
        'mousemove': function mousemove(ev) {
          _this2.onMouseMove(ev);
        },
        'mouseup': function mouseup(ev) {
          _this2.onMouseUp(ev);
        }
      };

      for (var name in events) {
        this.canvas.addEventListener(name, events[name], false);
      }

      // See also: http://phrogz.net/JS/wheeldelta.html
      var boundOnMouseWheel = function boundOnMouseWheel(ev) {
        return _this2.onMouseWheel(ev);
      };
      if (window.addEventListener) {
        window.addEventListener('mousewheel', boundOnMouseWheel, false); // Chrome/Safari/Opera
        window.addEventListener('DOMMouseScroll', boundOnMouseWheel, false); // Firefox
      } else if (window.attachEvent) {
        window.attachEvent('onmousewheel', boundOnMouseWheel); // IE
      }

      this.followEnabled = this.options.followEnabled;
      this.zoom = this.options.zoom;
      this.followEntityId = this.options.followEntityId;
      this.gridEnabled = this.options.gridEnabled;
      this.lineWidth = this.options.lineWidth;

      this.cursorRawX = 0;
      this.cursorRawY = 0;

      this.cursorChanged = false;
      this.cursorPosition = { x: 0, y: 0 };

      this.cameraX = 0;
      this.cameraY = 0;

      this.debugDummySprite = { size: 100 };

      this.updateMetrics();
    }
  }, {
    key: 'onMouseWheel',
    value: function onMouseWheel(ev) {
      this.zoom += wheelDistance(ev) * this.options.zoomWheelFactor;
      if (this.zoom < this.options.zoomMin) {
        this.zoom = this.options.zoomMin;
      }
      if (this.zoom > this.options.zoomMax) {
        this.zoom = this.options.zoomMax;
      }
    }

    // TODO: Use a symbol for 'mouse{Down,Move,Up}' message?

  }, {
    key: 'onMouseDown',
    value: function onMouseDown(ev) {
      this.setCursor(ev.clientX, ev.clientY);
      this.world.publish('mouseDown', this.cursorPosition);
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(ev) {
      this.setCursor(ev.clientX, ev.clientY);
      this.world.publish('mouseMove', this.cursorPosition);
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(ev) {
      this.setCursor(ev.clientX, ev.clientY);
      this.world.publish('mouseUp', this.cursorPosition);
    }
  }, {
    key: 'setCursor',
    value: function setCursor(x, y) {
      var width = this.container.offsetWidth;
      var height = this.container.offsetHeight;

      this.cursorRawX = x;
      this.cursorRawY = y;

      var newX = (x - width / 2) / this.zoom + this.cameraX;
      var newY = (y - height / 2) / this.zoom + this.cameraY;

      this.cursorChanged = false;
      if (newX !== this.cursorPosition.x || newY !== this.cursorPosition.y) {
        this.cursorChanged = true;
        this.cursorPosition.x = newX;
        this.cursorPosition.y = newY;
      }

      return this.cursorPosition;
    }
  }, {
    key: 'updateMetrics',
    value: function updateMetrics() {
      var width = this.container.offsetWidth;
      var height = this.container.offsetHeight;

      this.visibleWidth = width / this.zoom;
      this.visibleHeight = height / this.zoom;

      this.visibleLeft = 0 - this.visibleWidth / 2 + this.cameraX;
      this.visibleTop = 0 - this.visibleHeight / 2 + this.cameraY;
      this.visibleRight = this.visibleLeft + this.visibleWidth;
      this.visibleBottom = this.visibleTop + this.visibleHeight;
    }
  }, {
    key: 'update',
    value: function update() /*timeDelta*/{
      var _this3 = this;

      this.updateMetrics();

      this.setCursor(this.cursorRawX, this.cursorRawY);
      // FIXME: Should be able to skip doing this unless
      // this.cursorChanged === true, but for some reason that's not working
      this.world.publish('mouseMove', this.cursorPosition);

      var sprites = this.world.get('Sprite');

      var toRemove = Object.keys(this.graphics).filter(function (key) {
        return !(key in sprites);
      });
      toRemove.forEach(function (entityId) {
        _this3.stage.removeChild(_this3.graphics[entityId]);
        delete _this3.graphics[entityId];
      });

      var toAdd = Object.keys(sprites).filter(function (key) {
        return !(key in _this3.graphics);
      });
      toAdd.forEach(function (entityId) {
        _this3.stage.addChild(_this3.graphics[entityId] = new PIXI.Graphics());
      });
    }
  }, {
    key: 'draw',
    value: function draw(timeDelta) {
      this.followEntity();
      this.drawBackdrop(timeDelta);

      for (var entityId in this.graphics) {
        this.drawSprite(this.graphics[entityId], entityId, timeDelta);
      }

      this.stage.setTransform(this.container.offsetWidth / 2 - this.cameraX * this.zoom, this.container.offsetHeight / 2 - this.cameraY * this.zoom, this.zoom, this.zoom);

      this.renderer.resize(this.container.offsetWidth, this.container.offsetHeight);

      this.renderer.render(this.stage);
    }
  }, {
    key: 'drawSprite',
    value: function drawSprite(ctx, entityId, timeDelta) {
      var sprite = this.world.get('Sprite', entityId);
      var position = this.world.get('Position', entityId);

      var spriteFn = getSprite(sprite.name);
      if (!spriteFn) {
        spriteFn = getSprite('default');
      }

      ctx.position.x = Math.floor(position.x);
      ctx.position.y = Math.floor(position.y);
      ctx.rotation = position.rotation + Math.PI / 2;
      ctx.scale.x = ctx.scale.y = sprite.size / 100;
      ctx.lineStyle(this.lineWidth / (sprite.size / 100), 0xFFFFFF);
      spriteFn(ctx, sprite, entityId, timeDelta);

      sprite.drawn = true;
      return ctx;
    }
  }, {
    key: 'followEntity',
    value: function followEntity() {
      if (!this.followEnabled) {
        this.cameraX = this.cameraY = 0;
        return;
      }
      if (this.options.followName && !this.followEntityId) {
        // Look up named entity, if necessary.
        this.followEntityId = getComponent('Name').findEntityByName(this.world, this.options.followName);
      }
      if (this.followEntityId) {
        // Adjust the viewport center offset to the entity position
        var position = this.world.get('Position', this.followEntityId);
        if (position) {
          this.cameraX = position.x;
          this.cameraY = position.y;
          this.setCursor(this.cursorRawX, this.cursorRawY);
        }
      }
    }
  }, {
    key: 'drawBackdrop',
    value: function drawBackdrop() /* timeDelta */{
      var ctx = this.backdrop;

      if (!this.gridEnabled) {
        ctx.visible = false;
        return;
      }

      var gridSize = this.options.gridSize;
      var gridOffsetX = this.visibleLeft % gridSize;
      var gridOffsetY = this.visibleTop % gridSize;

      ctx.visible = true;
      ctx.clear();
      ctx.lineStyle(1, this.options.gridColor);
      ctx.position.x = this.visibleLeft;
      ctx.position.y = this.visibleTop;

      for (var x = -gridOffsetX; x < this.visibleWidth; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.visibleHeight + gridSize);
      }

      for (var y = -gridOffsetY; y < this.visibleHeight; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(this.visibleWidth + gridSize, y);
      }
    }
  }]);
  return ViewportPixi;
}(System);

registerSystem('ViewportPixi', ViewportPixi);

var CanvasSprite = function (_Core$Component) {
  inherits(CanvasSprite, _Core$Component);

  function CanvasSprite() {
    classCallCheck(this, CanvasSprite);
    return possibleConstructorReturn(this, (CanvasSprite.__proto__ || Object.getPrototypeOf(CanvasSprite)).apply(this, arguments));
  }

  createClass(CanvasSprite, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        name: null,
        color: '#fff',
        size: 100,
        width: null,
        height: null,
        drawn: false
      };
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      var c = get$1(CanvasSprite.__proto__ || Object.getPrototypeOf(CanvasSprite), 'create', this).call(this, attrs);
      if (!c.width) {
        c.width = c.size;
      }
      if (!c.height) {
        c.height = c.size;
      }
      return c;
    }
  }]);
  return CanvasSprite;
}(Component);

registerComponent('Sprite', CanvasSprite);

var spriteRegistry = {};
function registerSprite(name, sprite) {
  spriteRegistry[name] = sprite;
}
function getSprite(name) {
  return spriteRegistry[name];
}

registerSprite('default', function (ctx, sprite /*, entityId*/) {
  if (sprite.drawn) {
    return;
  }

  ctx.arc(0, 0, 50, 0, PI2$1);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -50);
  ctx.moveTo(0, 0);
});

registerSprite('sun', function (ctx, sprite /*, entityId*/) {
  if (sprite.drawn) {
    return;
  }

  ctx.arc(0, 0, 50, 0, PI2$1, true);
});

registerSprite('enemyscout', function (ctx, sprite /*, entityId*/) {
  if (sprite.drawn) {
    return;
  }

  ctx.moveTo(0, -50);
  ctx.lineTo(-45, 50);
  ctx.lineTo(-12.5, 12.5);
  ctx.lineTo(0, 25);
  ctx.lineTo(12.5, 12.5);
  ctx.lineTo(45, 50);
  ctx.lineTo(0, -50);
  ctx.moveTo(0, -50);
});

registerSprite('enemywing', function (g, sprite /*, entityId*/) {
  if (sprite.drawn) {
    return;
  }

  g.lineColor = 0x228822;

  g.moveTo(-50, 0);
  g.lineTo(-37.5, -37.5);
  g.lineTo(0, 50);
  g.lineTo(37.5, -37.5);
  g.lineTo(50, 0);
  g.lineTo(37.5, 50);
  g.lineTo(25, 50);
  g.lineTo(0, 0);
  g.lineTo(-25, 50);
  g.lineTo(-37.5, 50);
  g.lineTo(-50, 0);
});

registerSprite('hero', function (g, sprite /*, entityId*/) {
  if (sprite.drawn) {
    return;
  }

  g.moveTo(-50, 0);
  g.lineTo(-37.5, -37.5);
  g.lineTo(0, -50);
  g.lineTo(37.5, -37.5);
  g.lineTo(50, 0);
  g.lineTo(37.5, 50);
  g.lineTo(25, 50);
  g.lineTo(12.5, 12.5);
  g.lineTo(5, 25);
  g.lineTo(-5, 25);
  g.lineTo(-12.5, 12.5);
  g.lineTo(-25, 50);
  g.lineTo(-37.5, 50);
  g.lineTo(-50, 0);
});

registerSprite('asteroid', function (ctx, sprite /*, entityId*/) {
  if (sprite.drawn) {
    return;
  }

  var NUM_POINTS = 10 + Math.floor(8 * Math.random());
  var MAX_RADIUS = 50;
  var MIN_RADIUS = 35;
  var ROTATION = PI2$1 / NUM_POINTS;

  var idx = void 0;
  var points = [];

  for (idx = 0; idx < NUM_POINTS; idx++) {
    var rot = idx * ROTATION;
    var dist = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
    points.push(dist * Math.cos(rot));
    points.push(dist * Math.sin(rot));
  }
  points.push(points[0]);
  points.push(points[1]);

  ctx.drawPolygon(points);
});

registerSprite('mine', function (g, sprite /*, entityId*/) {
  if (sprite.drawn && Math.random() > 0.1) {
    return;
  }

  if (!sprite.drawn) {
    var NUM_POINTS = 10 + Math.floor(10 * Math.random());
    if (NUM_POINTS % 2 !== 0) {
      NUM_POINTS++;
    }

    var MAX_RADIUS = 60;
    var MIN_RADIUS = 10;
    sprite.legs = [];
    var even = false;
    for (var idx = 0; idx < NUM_POINTS; idx++) {
      var dist = even ? 10 : Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
      sprite.legs.push(dist);
      even = !even;
    }
  }

  var points = [];
  var ROTATION = PI2$1 / sprite.legs.length;
  sprite.legs.forEach(function (dist, idx) {
    var shakeDist = dist * (0.9 + 0.5 * Math.random());
    var rot = idx * ROTATION;
    points.push(shakeDist * Math.cos(rot));
    points.push(shakeDist * Math.sin(rot));
  });
  points.push(points[0]);
  points.push(points[1]);

  g.clear();
  g.lineStyle(2.5 / (sprite.size / 100), 0xFF2222);
  g.drawPolygon(points);
});

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var stats_min = createCommonjsModule(function (module) {
// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){var l=Date.now(),m=l,g=0,n=Infinity,o=0,h=0,p=Infinity,q=0,r=0,s=0,f=document.createElement("div");f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2);},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j);}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
"block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block";}};return{REVISION:12,domElement:f,setMode:t,begin:function(){l=Date.now();},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
a+"px",m=b,r=0);return b},update:function(){l=this.end();}}};"object"===typeof module&&(module.exports=Stats);
});

var DrawStats = function (_Core$System) {
  inherits(DrawStats, _Core$System);

  function DrawStats() {
    classCallCheck(this, DrawStats);
    return possibleConstructorReturn(this, (DrawStats.__proto__ || Object.getPrototypeOf(DrawStats)).apply(this, arguments));
  }

  createClass(DrawStats, [{
    key: 'initialize',
    value: function initialize() {

      this.drawStats = new stats_min();
      this.drawStats.setMode(0);
      this.drawStats.domElement.style.position = 'absolute';
      this.drawStats.domElement.style.left = '0px';
      this.drawStats.domElement.style.top = '0px';
      document.body.appendChild(this.drawStats.domElement);

      this.tickStats = new stats_min();
      this.tickStats.setMode(0);
      this.tickStats.domElement.style.position = 'absolute';
      this.tickStats.domElement.style.left = '0px';
      this.tickStats.domElement.style.top = '55px';
      document.body.appendChild(this.tickStats.domElement);
    }
  }, {
    key: 'updateStart',
    value: function updateStart() {
      this.tickStats.begin();
    }
  }, {
    key: 'updateEnd',
    value: function updateEnd() {
      this.tickStats.end();
    }
  }, {
    key: 'drawStart',
    value: function drawStart() {
      this.drawStats.begin();
    }
  }, {
    key: 'drawEnd',
    value: function drawEnd() {
      this.drawStats.end();
    }
  }]);
  return DrawStats;
}(System);
registerSystem('DrawStats', DrawStats);

/**
 * @author mrdoob / http://mrdoob.com/
 * @author jetienne / http://jetienne.com/
 * @author paulirish / http://paulirish.com/
 */
function MemoryStats(){

	var msMin	= 100;
	var msMax	= 0;

	var container	= document.createElement( 'div' );
	container.id	= 'stats';
	container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

	var msDiv	= document.createElement( 'div' );
	msDiv.id	= 'ms';
	msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;';
	container.appendChild( msDiv );

	var msText	= document.createElement( 'div' );
	msText.id	= 'msText';
	msText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
	msText.innerHTML= 'Memory';
	msDiv.appendChild( msText );

	var msGraph	= document.createElement( 'div' );
	msGraph.id	= 'msGraph';
	msGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0';
	msDiv.appendChild( msGraph );

	while ( msGraph.children.length < 74 ) {

		var bar = document.createElement( 'span' );
		bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#131';
		msGraph.appendChild( bar );

	}

	var updateGraph = function ( dom, height, color ) {

		var child = dom.appendChild( dom.firstChild );
		child.style.height = height + 'px';
		if( color ) child.style.backgroundColor = color;

	};

	// polyfill usedJSHeapSize
	if (window.performance && !performance.memory){
		performance.memory = { usedJSHeapSize : 0 };
	}

	// support of the API?
	if( performance.memory.totalJSHeapSize === 0 ){
		console.warn('totalJSHeapSize === 0... performance.memory is only available in Chrome .');
	}

	// TODO, add a sanity check to see if values are bucketed.
	// If so, reminde user to adopt the --enable-precise-memory-info flag.
	// open -a "/Applications/Google Chrome.app" --args --enable-precise-memory-info

	var lastTime	= Date.now();
	var lastUsedHeap= performance.memory.usedJSHeapSize;
	return {
		domElement: container,

		update: function () {

			// refresh only 30time per second
			if( Date.now() - lastTime < 1000/30 )	return;
			lastTime	= Date.now();

			var delta	= performance.memory.usedJSHeapSize - lastUsedHeap;
			lastUsedHeap	= performance.memory.usedJSHeapSize;
			var color	= delta < 0 ? '#830' : '#131';

			var ms	= performance.memory.usedJSHeapSize;
			msMin	= Math.min( msMin, ms );
			msMax	= Math.max( msMax, ms );
			msText.textContent = "Mem: " + bytesToSize(ms, 2);

			var normValue	= ms / (30*1024*1024);
			var height	= (1-(normValue% 1)) * 30;
			updateGraph( msGraph, height, color);

			function bytesToSize( bytes, nFractDigit ){
				var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
				if (bytes == 0) return 'n/a';
				nFractDigit	= nFractDigit !== undefined ? nFractDigit : 0;
				var precision	= Math.pow(10, nFractDigit);
				var i 		= Math.floor(Math.log(bytes) / Math.log(1024));
				return Math.round(bytes*precision / Math.pow(1024, i))/precision + ' ' + sizes[i];
			}
		}

	}

}

var memoryStats = MemoryStats;

var MemoryStatsSystem = function (_Core$System) {
  inherits(MemoryStatsSystem, _Core$System);

  function MemoryStatsSystem() {
    classCallCheck(this, MemoryStatsSystem);
    return possibleConstructorReturn(this, (MemoryStatsSystem.__proto__ || Object.getPrototypeOf(MemoryStatsSystem)).apply(this, arguments));
  }

  createClass(MemoryStatsSystem, [{
    key: 'initialize',
    value: function initialize() {
      this.stats = new memoryStats();
      this.stats.domElement.style.position = 'fixed';
      this.stats.domElement.style.left = '85px';
      this.stats.domElement.style.top = '0px';
      document.body.appendChild(this.stats.domElement);
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.stats.update();
    }
  }]);
  return MemoryStatsSystem;
}(System);
registerSystem('MemoryStats', MemoryStatsSystem);

var dat_gui = createCommonjsModule(function (module) {
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/** @namespace */
var dat = module.exports = dat || {};

/** @namespace */
dat.gui = dat.gui || {};

/** @namespace */
dat.utils = dat.utils || {};

/** @namespace */
dat.controllers = dat.controllers || {};

/** @namespace */
dat.dom = dat.dom || {};

/** @namespace */
dat.color = dat.color || {};

dat.utils.css = (function () {
  return {
    load: function (url, doc) {
      doc = doc || document;
      var link = doc.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      doc.getElementsByTagName('head')[0].appendChild(link);
    },
    inject: function(css, doc) {
      doc = doc || document;
      var injected = document.createElement('style');
      injected.type = 'text/css';
      injected.innerHTML = css;
      doc.getElementsByTagName('head')[0].appendChild(injected);
    }
  }
})();


dat.utils.common = (function () {
  
  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;

  /**
   * Band-aid methods for things that should be a lot easier in JavaScript.
   * Implementation and structure inspired by underscore.js
   * http://documentcloud.github.com/underscore/
   */

  return { 
    
    BREAK: {},
  
    extend: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (!this.isUndefined(obj[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
      
    },
    
    defaults: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (this.isUndefined(target[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
    
    },
    
    compose: function() {
      var toCall = ARR_SLICE.call(arguments);
            return function() {
              var args = ARR_SLICE.call(arguments);
              for (var i = toCall.length -1; i >= 0; i--) {
                args = [toCall[i].apply(this, args)];
              }
              return args[0];
            }
    },
    
    each: function(obj, itr, scope) {

      
      if (ARR_EACH && obj.forEach === ARR_EACH) { 
        
        obj.forEach(itr, scope);
        
      } else if (obj.length === obj.length + 0) { // Is number but not NaN
        
        for (var key = 0, l = obj.length; key < l; key++)
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
            return;
            
      } else {

        for (var key in obj) 
          if (itr.call(scope, obj[key], key) === this.BREAK)
            return;
            
      }
            
    },
    
    defer: function(fnc) {
      setTimeout(fnc, 0);
    },
    
    toArray: function(obj) {
      if (obj.toArray) return obj.toArray();
      return ARR_SLICE.call(obj);
    },

    isUndefined: function(obj) {
      return obj === undefined;
    },
    
    isNull: function(obj) {
      return obj === null;
    },
    
    isNaN: function(obj) {
      return obj !== obj;
    },
    
    isArray: Array.isArray || function(obj) {
      return obj.constructor === Array;
    },
    
    isObject: function(obj) {
      return obj === Object(obj);
    },
    
    isNumber: function(obj) {
      return obj === obj+0;
    },
    
    isString: function(obj) {
      return obj === obj+'';
    },
    
    isBoolean: function(obj) {
      return obj === false || obj === true;
    },
    
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
  
  };
    
})();


dat.controllers.Controller = (function (common) {

  /**
   * @class An "abstract" class that represents a given property of an object.
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var Controller = function(object, property) {

    this.initialValue = object[property];

    /**
     * Those who extend this class will put their DOM elements in here.
     * @type {DOMElement}
     */
    this.domElement = document.createElement('div');

    /**
     * The object to manipulate
     * @type {Object}
     */
    this.object = object;

    /**
     * The name of the property to manipulate
     * @type {String}
     */
    this.property = property;

    /**
     * The function to be called on change.
     * @type {Function}
     * @ignore
     */
    this.__onChange = undefined;

    /**
     * The function to be called on finishing change.
     * @type {Function}
     * @ignore
     */
    this.__onFinishChange = undefined;

  };

  common.extend(

      Controller.prototype,

      /** @lends dat.controllers.Controller.prototype */
      {

        /**
         * Specify that a function fire every time someone changes the value with
         * this Controller.
         *
         * @param {Function} fnc This function will be called whenever the value
         * is modified via this Controller.
         * @returns {dat.controllers.Controller} this
         */
        onChange: function(fnc) {
          this.__onChange = fnc;
          return this;
        },

        /**
         * Specify that a function fire every time someone "finishes" changing
         * the value wih this Controller. Useful for values that change
         * incrementally like numbers or strings.
         *
         * @param {Function} fnc This function will be called whenever
         * someone "finishes" changing the value via this Controller.
         * @returns {dat.controllers.Controller} this
         */
        onFinishChange: function(fnc) {
          this.__onFinishChange = fnc;
          return this;
        },

        /**
         * Change the value of <code>object[property]</code>
         *
         * @param {Object} newValue The new value of <code>object[property]</code>
         */
        setValue: function(newValue) {
          this.object[this.property] = newValue;
          if (this.__onChange) {
            this.__onChange.call(this, newValue);
          }
          this.updateDisplay();
          return this;
        },

        /**
         * Gets the value of <code>object[property]</code>
         *
         * @returns {Object} The current value of <code>object[property]</code>
         */
        getValue: function() {
          return this.object[this.property];
        },

        /**
         * Refreshes the visual display of a Controller in order to keep sync
         * with the object's current value.
         * @returns {dat.controllers.Controller} this
         */
        updateDisplay: function() {
          return this;
        },

        /**
         * @returns {Boolean} true if the value has deviated from initialValue
         */
        isModified: function() {
          return this.initialValue !== this.getValue()
        }

      }

  );

  return Controller;


})(dat.utils.common);


dat.dom.dom = (function (common) {

  var EVENT_MAP = {
    'HTMLEvents': ['change'],
    'MouseEvents': ['click','mousemove','mousedown','mouseup', 'mouseover'],
    'KeyboardEvents': ['keydown']
  };

  var EVENT_MAP_INV = {};
  common.each(EVENT_MAP, function(v, k) {
    common.each(v, function(e) {
      EVENT_MAP_INV[e] = k;
    });
  });

  var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

  function cssValueToPixels(val) {

    if (val === '0' || common.isUndefined(val)) return 0;

    var match = val.match(CSS_VALUE_PIXELS);

    if (!common.isNull(match)) {
      return parseFloat(match[1]);
    }

    // TODO ...ems? %?

    return 0;

  }

  /**
   * @namespace
   * @member dat.dom
   */
  var dom = {

    /**
     * 
     * @param elem
     * @param selectable
     */
    makeSelectable: function(elem, selectable) {

      if (elem === undefined || elem.style === undefined) return;

      elem.onselectstart = selectable ? function() {
        return false;
      } : function() {
      };

      elem.style.MozUserSelect = selectable ? 'auto' : 'none';
      elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
      elem.unselectable = selectable ? 'on' : 'off';

    },

    /**
     *
     * @param elem
     * @param horizontal
     * @param vertical
     */
    makeFullscreen: function(elem, horizontal, vertical) {

      if (common.isUndefined(horizontal)) horizontal = true;
      if (common.isUndefined(vertical)) vertical = true;

      elem.style.position = 'absolute';

      if (horizontal) {
        elem.style.left = 0;
        elem.style.right = 0;
      }
      if (vertical) {
        elem.style.top = 0;
        elem.style.bottom = 0;
      }

    },

    /**
     *
     * @param elem
     * @param eventType
     * @param params
     */
    fakeEvent: function(elem, eventType, params, aux) {
      params = params || {};
      var className = EVENT_MAP_INV[eventType];
      if (!className) {
        throw new Error('Event type ' + eventType + ' not supported.');
      }
      var evt = document.createEvent(className);
      switch (className) {
        case 'MouseEvents':
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false,
              params.cancelable || true, window, params.clickCount || 1,
              0, //screen X
              0, //screen Y
              clientX, //client X
              clientY, //client Y
              false, false, false, false, 0, null);
          break;
        case 'KeyboardEvents':
          var init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
          common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false,
              params.cancelable, window,
              params.ctrlKey, params.altKey,
              params.shiftKey, params.metaKey,
              params.keyCode, params.charCode);
          break;
        default:
          evt.initEvent(eventType, params.bubbles || false,
              params.cancelable || true);
          break;
      }
      common.defaults(evt, aux);
      elem.dispatchEvent(evt);
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    bind: function(elem, event, func, bool) {
      bool = bool || false;
      if (elem.addEventListener)
        elem.addEventListener(event, func, bool);
      else if (elem.attachEvent)
        elem.attachEvent('on' + event, func);
      return dom;
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    unbind: function(elem, event, func, bool) {
      bool = bool || false;
      if (elem.removeEventListener)
        elem.removeEventListener(event, func, bool);
      else if (elem.detachEvent)
        elem.detachEvent('on' + event, func);
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    addClass: function(elem, className) {
      if (elem.className === undefined) {
        elem.className = className;
      } else if (elem.className !== className) {
        var classes = elem.className.split(/ +/);
        if (classes.indexOf(className) == -1) {
          classes.push(className);
          elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
        }
      }
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    removeClass: function(elem, className) {
      if (className) {
        if (elem.className === undefined) {
          // elem.className = className;
        } else if (elem.className === className) {
          elem.removeAttribute('class');
        } else {
          var classes = elem.className.split(/ +/);
          var index = classes.indexOf(className);
          if (index != -1) {
            classes.splice(index, 1);
            elem.className = classes.join(' ');
          }
        }
      } else {
        elem.className = undefined;
      }
      return dom;
    },

    hasClass: function(elem, className) {
      return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
    },

    /**
     *
     * @param elem
     */
    getWidth: function(elem) {

      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-left-width']) +
          cssValueToPixels(style['border-right-width']) +
          cssValueToPixels(style['padding-left']) +
          cssValueToPixels(style['padding-right']) +
          cssValueToPixels(style['width']);
    },

    /**
     *
     * @param elem
     */
    getHeight: function(elem) {

      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-top-width']) +
          cssValueToPixels(style['border-bottom-width']) +
          cssValueToPixels(style['padding-top']) +
          cssValueToPixels(style['padding-bottom']) +
          cssValueToPixels(style['height']);
    },

    /**
     *
     * @param elem
     */
    getOffset: function(elem) {
      var offset = {left: 0, top:0};
      if (elem.offsetParent) {
        do {
          offset.left += elem.offsetLeft;
          offset.top += elem.offsetTop;
        } while (elem = elem.offsetParent);
      }
      return offset;
    },

    // http://stackoverflow.com/posts/2684561/revisions
    /**
     * 
     * @param elem
     */
    isActive: function(elem) {
      return elem === document.activeElement && ( elem.type || elem.href );
    }

  };

  return dom;

})(dat.utils.common);


dat.controllers.OptionController = (function (Controller, dom, common) {

  /**
   * @class Provides a select input to alter the property of an object, using a
   * list of accepted values.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object|string[]} options A map of labels to acceptable values, or
   * a list of acceptable string values.
   *
   * @member dat.controllers
   */
  var OptionController = function(object, property, options) {

    OptionController.superclass.call(this, object, property);

    var _this = this;

    /**
     * The drop down menu
     * @ignore
     */
    this.__select = document.createElement('select');

    if (common.isArray(options)) {
      var map = {};
      common.each(options, function(element) {
        map[element] = element;
      });
      options = map;
    }

    common.each(options, function(value, key) {

      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);

    });

    // Acknowledge original value
    this.updateDisplay();

    dom.bind(this.__select, 'change', function() {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });

    this.domElement.appendChild(this.__select);

  };

  OptionController.superclass = Controller;

  common.extend(

      OptionController.prototype,
      Controller.prototype,

      {

        setValue: function(v) {
          var toReturn = OptionController.superclass.prototype.setValue.call(this, v);
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          return toReturn;
        },

        updateDisplay: function() {
          this.__select.value = this.getValue();
          return OptionController.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  return OptionController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.controllers.NumberController = (function (Controller, common) {

  /**
   * @class Represents a given property of an object that is a number.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberController = function(object, property, params) {

    NumberController.superclass.call(this, object, property);

    params = params || {};

    this.__min = params.min;
    this.__max = params.max;
    this.__step = params.step;

    if (common.isUndefined(this.__step)) {

      if (this.initialValue == 0) {
        this.__impliedStep = 1; // What are we, psychics?
      } else {
        // Hey Doug, check this out.
        this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue)/Math.LN10))/10;
      }

    } else {

      this.__impliedStep = this.__step;

    }

    this.__precision = numDecimals(this.__impliedStep);


  };

  NumberController.superclass = Controller;

  common.extend(

      NumberController.prototype,
      Controller.prototype,

      /** @lends dat.controllers.NumberController.prototype */
      {

        setValue: function(v) {

          if (this.__min !== undefined && v < this.__min) {
            v = this.__min;
          } else if (this.__max !== undefined && v > this.__max) {
            v = this.__max;
          }

          if (this.__step !== undefined && v % this.__step != 0) {
            v = Math.round(v / this.__step) * this.__step;
          }

          return NumberController.superclass.prototype.setValue.call(this, v);

        },

        /**
         * Specify a minimum value for <code>object[property]</code>.
         *
         * @param {Number} minValue The minimum value for
         * <code>object[property]</code>
         * @returns {dat.controllers.NumberController} this
         */
        min: function(v) {
          this.__min = v;
          return this;
        },

        /**
         * Specify a maximum value for <code>object[property]</code>.
         *
         * @param {Number} maxValue The maximum value for
         * <code>object[property]</code>
         * @returns {dat.controllers.NumberController} this
         */
        max: function(v) {
          this.__max = v;
          return this;
        },

        /**
         * Specify a step value that dat.controllers.NumberController
         * increments by.
         *
         * @param {Number} stepValue The step value for
         * dat.controllers.NumberController
         * @default if minimum and maximum specified increment is 1% of the
         * difference otherwise stepValue is 1
         * @returns {dat.controllers.NumberController} this
         */
        step: function(v) {
          this.__step = v;
          return this;
        }

      }

  );

  function numDecimals(x) {
    x = x.toString();
    if (x.indexOf('.') > -1) {
      return x.length - x.indexOf('.') - 1;
    } else {
      return 0;
    }
  }

  return NumberController;

})(dat.controllers.Controller,
dat.utils.common);


dat.controllers.NumberControllerBox = (function (NumberController, dom, common) {

  /**
   * @class Represents a given property of an object that is a number and
   * provides an input element with which to manipulate it.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberControllerBox = function(object, property, params) {

    this.__truncationSuspended = false;

    NumberControllerBox.superclass.call(this, object, property, params);

    var _this = this;

    /**
     * {Number} Previous mouse y position
     * @ignore
     */
    var prev_y;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    // Makes it so manually specified values are not truncated.

    dom.bind(this.__input, 'change', onChange);
    dom.bind(this.__input, 'blur', onBlur);
    dom.bind(this.__input, 'mousedown', onMouseDown);
    dom.bind(this.__input, 'keydown', function(e) {

      // When pressing entire, you can be as precise as you want.
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
      }

    });

    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!common.isNaN(attempted)) _this.setValue(attempted);
    }

    function onBlur() {
      onChange();
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prev_y = e.clientY;
    }

    function onMouseDrag(e) {

      var diff = prev_y - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);

      prev_y = e.clientY;

    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);

  };

  NumberControllerBox.superclass = NumberController;

  common.extend(

      NumberControllerBox.prototype,
      NumberController.prototype,

      {

        updateDisplay: function() {

          this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
          return NumberControllerBox.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  function roundToDecimal(value, decimals) {
    var tenTo = Math.pow(10, decimals);
    return Math.round(value * tenTo) / tenTo;
  }

  return NumberControllerBox;

})(dat.controllers.NumberController,
dat.dom.dom,
dat.utils.common);


dat.controllers.NumberControllerSlider = (function (NumberController, dom, css, common, styleSheet) {

  /**
   * @class Represents a given property of an object that is a number, contains
   * a minimum and maximum, and provides a slider element with which to
   * manipulate it. It should be noted that the slider element is made up of
   * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
   * <code>&lt;slider&gt;</code> element.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   * 
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Number} minValue Minimum allowed value
   * @param {Number} maxValue Maximum allowed value
   * @param {Number} stepValue Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberControllerSlider = function(object, property, min, max, step) {

    NumberControllerSlider.superclass.call(this, object, property, { min: min, max: max, step: step });

    var _this = this;

    this.__background = document.createElement('div');
    this.__foreground = document.createElement('div');
    


    dom.bind(this.__background, 'mousedown', onMouseDown);
    
    dom.addClass(this.__background, 'slider');
    dom.addClass(this.__foreground, 'slider-fg');

    function onMouseDown(e) {

      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);

      onMouseDrag(e);
    }

    function onMouseDrag(e) {

      e.preventDefault();

      var offset = dom.getOffset(_this.__background);
      var width = dom.getWidth(_this.__background);
      
      _this.setValue(
        map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max)
      );

      return false;

    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.__background.appendChild(this.__foreground);
    this.domElement.appendChild(this.__background);

  };

  NumberControllerSlider.superclass = NumberController;

  /**
   * Injects default stylesheet for slider elements.
   */
  NumberControllerSlider.useDefaultStyles = function() {
    css.inject(styleSheet);
  };

  common.extend(

      NumberControllerSlider.prototype,
      NumberController.prototype,

      {

        updateDisplay: function() {
          var pct = (this.getValue() - this.__min)/(this.__max - this.__min);
          this.__foreground.style.width = pct*100+'%';
          return NumberControllerSlider.superclass.prototype.updateDisplay.call(this);
        }

      }



  );

  function map(v, i1, i2, o1, o2) {
    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
  }

  return NumberControllerSlider;
  
})(dat.controllers.NumberController,
dat.dom.dom,
dat.utils.css,
dat.utils.common,
".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");


dat.controllers.FunctionController = (function (Controller, dom, common) {

  /**
   * @class Provides a GUI interface to fire a specified method, a property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var FunctionController = function(object, property, text) {

    FunctionController.superclass.call(this, object, property);

    var _this = this;

    this.__button = document.createElement('div');
    this.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(this.__button, 'click', function(e) {
      e.preventDefault();
      _this.fire();
      return false;
    });

    dom.addClass(this.__button, 'button');

    this.domElement.appendChild(this.__button);


  };

  FunctionController.superclass = Controller;

  common.extend(

      FunctionController.prototype,
      Controller.prototype,
      {
        
        fire: function() {
          if (this.__onChange) {
            this.__onChange.call(this);
          }
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          this.getValue().call(this.object);
        }
      }

  );

  return FunctionController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.controllers.BooleanController = (function (Controller, dom, common) {

  /**
   * @class Provides a checkbox input to alter the boolean property of an object.
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var BooleanController = function(object, property) {

    BooleanController.superclass.call(this, object, property);

    var _this = this;
    this.__prev = this.getValue();

    this.__checkbox = document.createElement('input');
    this.__checkbox.setAttribute('type', 'checkbox');


    dom.bind(this.__checkbox, 'change', onChange, false);

    this.domElement.appendChild(this.__checkbox);

    // Match original value
    this.updateDisplay();

    function onChange() {
      _this.setValue(!_this.__prev);
    }

  };

  BooleanController.superclass = Controller;

  common.extend(

      BooleanController.prototype,
      Controller.prototype,

      {

        setValue: function(v) {
          var toReturn = BooleanController.superclass.prototype.setValue.call(this, v);
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          this.__prev = this.getValue();
          return toReturn;
        },

        updateDisplay: function() {
          
          if (this.getValue() === true) {
            this.__checkbox.setAttribute('checked', 'checked');
            this.__checkbox.checked = true;    
          } else {
              this.__checkbox.checked = false;
          }

          return BooleanController.superclass.prototype.updateDisplay.call(this);

        }


      }

  );

  return BooleanController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.color.toString = (function (common) {

  return function(color) {

    if (color.a == 1 || common.isUndefined(color.a)) {

      var s = color.hex.toString(16);
      while (s.length < 6) {
        s = '0' + s;
      }

      return '#' + s;

    } else {

      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

    }

  }

})(dat.utils.common);


dat.color.interpret = (function (toString, common) {

  var result, toReturn;

  var interpret = function() {

    toReturn = false;

    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

    common.each(INTERPRETATIONS, function(family) {

      if (family.litmus(original)) {

        common.each(family.conversions, function(conversion, conversionName) {

          result = conversion.read(original);

          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return common.BREAK;

          }

        });

        return common.BREAK;

      }

    });

    return toReturn;

  };

  var INTERPRETATIONS = [

    // Strings
    {

      litmus: common.isString,

      conversions: {

        THREE_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt(
                  '0x' +
                      test[1].toString() + test[1].toString() +
                      test[2].toString() + test[2].toString() +
                      test[3].toString() + test[3].toString())
            };

          },

          write: toString

        },

        SIX_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9]{6})$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt('0x' + test[1].toString())
            };

          },

          write: toString

        },

        CSS_RGB: {

          read: function(original) {

            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3])
            };

          },

          write: toString

        },

        CSS_RGBA: {

          read: function(original) {

            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3]),
              a: parseFloat(test[4])
            };

          },

          write: toString

        }

      }

    },

    // Numbers
    {

      litmus: common.isNumber,

      conversions: {

        HEX: {
          read: function(original) {
            return {
              space: 'HEX',
              hex: original,
              conversionName: 'HEX'
            }
          },

          write: function(color) {
            return color.hex;
          }
        }

      }

    },

    // Arrays
    {

      litmus: common.isArray,

      conversions: {

        RGB_ARRAY: {
          read: function(original) {
            if (original.length != 3) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b];
          }

        },

        RGBA_ARRAY: {
          read: function(original) {
            if (original.length != 4) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2],
              a: original[3]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b, color.a];
          }

        }

      }

    },

    // Objects
    {

      litmus: common.isObject,

      conversions: {

        RGBA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b) &&
                common.isNumber(original.a)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b,
              a: color.a
            }
          }
        },

        RGB_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b
            }
          }
        },

        HSVA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v) &&
                common.isNumber(original.a)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v,
              a: color.a
            }
          }
        },

        HSV_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v
            }
          }

        }

      }

    }


  ];

  return interpret;


})(dat.color.toString,
dat.utils.common);


dat.GUI = dat.gui.GUI = (function (css, saveDialogueContents, styleSheet, controllerFactory, Controller, BooleanController, FunctionController, NumberControllerBox, NumberControllerSlider, OptionController, ColorController, requestAnimationFrame, CenteredDiv, dom, common) {

  css.inject(styleSheet);

  /** Outer-most className for GUI's */
  var CSS_NAMESPACE = 'dg';

  var HIDE_KEY_CODE = 72;

  /** The only value shared between the JS and SCSS. Use caution. */
  var CLOSE_BUTTON_HEIGHT = 20;

  var DEFAULT_DEFAULT_PRESET_NAME = 'Default';

  var SUPPORTS_LOCAL_STORAGE = (function() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  })();

  var SAVE_DIALOGUE;

  /** Have we yet to create an autoPlace GUI? */
  var auto_place_virgin = true;

  /** Fixed position div that auto place GUI's go inside */
  var auto_place_container;

  /** Are we hiding the GUI's ? */
  var hide = false;

  /** GUI's which should be hidden */
  var hideable_guis = [];

  /**
   * A lightweight controller library for JavaScript. It allows you to easily
   * manipulate variables and fire functions on the fly.
   * @class
   *
   * @member dat.gui
   *
   * @param {Object} [params]
   * @param {String} [params.name] The name of this GUI.
   * @param {Object} [params.load] JSON object representing the saved state of
   * this GUI.
   * @param {Boolean} [params.auto=true]
   * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
   * @param {Boolean} [params.closed] If true, starts closed
   */
  var GUI = function(params) {

    var _this = this;

    /**
     * Outermost DOM Element
     * @type DOMElement
     */
    this.domElement = document.createElement('div');
    this.__ul = document.createElement('ul');
    this.domElement.appendChild(this.__ul);

    dom.addClass(this.domElement, CSS_NAMESPACE);

    /**
     * Nested GUI's by name
     * @ignore
     */
    this.__folders = {};

    this.__controllers = [];

    /**
     * List of objects I'm remembering for save, only used in top level GUI
     * @ignore
     */
    this.__rememberedObjects = [];

    /**
     * Maps the index of remembered objects to a map of controllers, only used
     * in top level GUI.
     *
     * @private
     * @ignore
     *
     * @example
     * [
     *  {
     *    propertyName: Controller,
     *    anotherPropertyName: Controller
     *  },
     *  {
     *    propertyName: Controller
     *  }
     * ]
     */
    this.__rememberedObjectIndecesToControllers = [];

    this.__listening = [];

    params = params || {};

    // Default parameters
    params = common.defaults(params, {
      autoPlace: true,
      width: GUI.DEFAULT_WIDTH
    });

    params = common.defaults(params, {
      resizable: params.autoPlace,
      hideable: params.autoPlace
    });


    if (!common.isUndefined(params.load)) {

      // Explicit preset
      if (params.preset) params.load.preset = params.preset;

    } else {

      params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };

    }

    if (common.isUndefined(params.parent) && params.hideable) {
      hideable_guis.push(this);
    }

    // Only root level GUI's are resizable.
    params.resizable = common.isUndefined(params.parent) && params.resizable;


    if (params.autoPlace && common.isUndefined(params.scrollable)) {
      params.scrollable = true;
    }
//    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;

    // Not part of params because I don't want people passing this in via
    // constructor. Should be a 'remembered' value.
    var use_local_storage =
        SUPPORTS_LOCAL_STORAGE &&
            localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';

    Object.defineProperties(this,

        /** @lends dat.gui.GUI.prototype */
        {

          /**
           * The parent <code>GUI</code>
           * @type dat.gui.GUI
           */
          parent: {
            get: function() {
              return params.parent;
            }
          },

          scrollable: {
            get: function() {
              return params.scrollable;
            }
          },

          /**
           * Handles <code>GUI</code>'s element placement for you
           * @type Boolean
           */
          autoPlace: {
            get: function() {
              return params.autoPlace;
            }
          },

          /**
           * The identifier for a set of saved values
           * @type String
           */
          preset: {

            get: function() {
              if (_this.parent) {
                return _this.getRoot().preset;
              } else {
                return params.load.preset;
              }
            },

            set: function(v) {
              if (_this.parent) {
                _this.getRoot().preset = v;
              } else {
                params.load.preset = v;
              }
              setPresetSelectIndex(this);
              _this.revert();
            }

          },

          /**
           * The width of <code>GUI</code> element
           * @type Number
           */
          width: {
            get: function() {
              return params.width;
            },
            set: function(v) {
              params.width = v;
              setWidth(_this, v);
            }
          },

          /**
           * The name of <code>GUI</code>. Used for folders. i.e
           * a folder's name
           * @type String
           */
          name: {
            get: function() {
              return params.name;
            },
            set: function(v) {
              // TODO Check for collisions among sibling folders
              params.name = v;
              if (title_row_name) {
                title_row_name.innerHTML = params.name;
              }
            }
          },

          /**
           * Whether the <code>GUI</code> is collapsed or not
           * @type Boolean
           */
          closed: {
            get: function() {
              return params.closed;
            },
            set: function(v) {
              params.closed = v;
              if (params.closed) {
                dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
              } else {
                dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
              }
              // For browsers that aren't going to respect the CSS transition,
              // Lets just check our height against the window height right off
              // the bat.
              this.onResize();

              if (_this.__closeButton) {
                _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
              }
            }
          },

          /**
           * Contains all presets
           * @type Object
           */
          load: {
            get: function() {
              return params.load;
            }
          },

          /**
           * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
           * <code>remember</code>ing
           * @type Boolean
           */
          useLocalStorage: {

            get: function() {
              return use_local_storage;
            },
            set: function(bool) {
              if (SUPPORTS_LOCAL_STORAGE) {
                use_local_storage = bool;
                if (bool) {
                  dom.bind(window, 'unload', saveToLocalStorage);
                } else {
                  dom.unbind(window, 'unload', saveToLocalStorage);
                }
                localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
              }
            }

          }

        });

    // Are we a root level GUI?
    if (common.isUndefined(params.parent)) {

      params.closed = false;

      dom.addClass(this.domElement, GUI.CLASS_MAIN);
      dom.makeSelectable(this.domElement, false);

      // Are we supposed to be loading locally?
      if (SUPPORTS_LOCAL_STORAGE) {

        if (use_local_storage) {

          _this.useLocalStorage = true;

          var saved_gui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

          if (saved_gui) {
            params.load = JSON.parse(saved_gui);
          }

        }

      }

      this.__closeButton = document.createElement('div');
      this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
      this.domElement.appendChild(this.__closeButton);

      dom.bind(this.__closeButton, 'click', function() {

        _this.closed = !_this.closed;


      });


      // Oh, you're a nested GUI!
    } else {

      if (params.closed === undefined) {
        params.closed = true;
      }

      var title_row_name = document.createTextNode(params.name);
      dom.addClass(title_row_name, 'controller-name');

      var title_row = addRow(_this, title_row_name);

      var on_click_title = function(e) {
        e.preventDefault();
        _this.closed = !_this.closed;
        return false;
      };

      dom.addClass(this.__ul, GUI.CLASS_CLOSED);

      dom.addClass(title_row, 'title');
      dom.bind(title_row, 'click', on_click_title);

      if (!params.closed) {
        this.closed = false;
      }

    }

    if (params.autoPlace) {

      if (common.isUndefined(params.parent)) {

        if (auto_place_virgin) {
          auto_place_container = document.createElement('div');
          dom.addClass(auto_place_container, CSS_NAMESPACE);
          dom.addClass(auto_place_container, GUI.CLASS_AUTO_PLACE_CONTAINER);
          document.body.appendChild(auto_place_container);
          auto_place_virgin = false;
        }

        // Put it in the dom for you.
        auto_place_container.appendChild(this.domElement);

        // Apply the auto styles
        dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);

      }


      // Make it not elastic.
      if (!this.parent) setWidth(_this, params.width);

    }

    dom.bind(window, 'resize', function() { _this.onResize(); });
    dom.bind(this.__ul, 'webkitTransitionEnd', function() { _this.onResize(); });
    dom.bind(this.__ul, 'transitionend', function() { _this.onResize(); });
    dom.bind(this.__ul, 'oTransitionEnd', function() { _this.onResize(); });
    this.onResize();


    if (params.resizable) {
      addResizeHandle(this);
    }

    function saveToLocalStorage() {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }

    var root = _this.getRoot();
    function resetWidth() {
        var root = _this.getRoot();
        root.width += 1;
        common.defer(function() {
          root.width -= 1;
        });
      }

      if (!params.parent) {
        resetWidth();
      }

  };

  GUI.toggleHide = function() {

    hide = !hide;
    common.each(hideable_guis, function(gui) {
      gui.domElement.style.zIndex = hide ? -999 : 999;
      gui.domElement.style.opacity = hide ? 0 : 1;
    });
  };

  GUI.CLASS_AUTO_PLACE = 'a';
  GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
  GUI.CLASS_MAIN = 'main';
  GUI.CLASS_CONTROLLER_ROW = 'cr';
  GUI.CLASS_TOO_TALL = 'taller-than-window';
  GUI.CLASS_CLOSED = 'closed';
  GUI.CLASS_CLOSE_BUTTON = 'close-button';
  GUI.CLASS_DRAG = 'drag';

  GUI.DEFAULT_WIDTH = 245;
  GUI.TEXT_CLOSED = 'Close Controls';
  GUI.TEXT_OPEN = 'Open Controls';

  dom.bind(window, 'keydown', function(e) {

    if (document.activeElement.type !== 'text' &&
        (e.which === HIDE_KEY_CODE || e.keyCode == HIDE_KEY_CODE)) {
      GUI.toggleHide();
    }

  }, false);

  common.extend(

      GUI.prototype,

      /** @lends dat.gui.GUI */
      {

        /**
         * @param object
         * @param property
         * @returns {dat.controllers.Controller} The new controller that was added.
         * @instance
         */
        add: function(object, property) {

          return add(
              this,
              object,
              property,
              {
                factoryArgs: Array.prototype.slice.call(arguments, 2)
              }
          );

        },

        /**
         * @param object
         * @param property
         * @returns {dat.controllers.ColorController} The new controller that was added.
         * @instance
         */
        addColor: function(object, property) {

          return add(
              this,
              object,
              property,
              {
                color: true
              }
          );

        },

        /**
         * @param controller
         * @instance
         */
        remove: function(controller) {

          // TODO listening?
          this.__ul.removeChild(controller.__li);
          this.__controllers.slice(this.__controllers.indexOf(controller), 1);
          var _this = this;
          common.defer(function() {
            _this.onResize();
          });

        },

        destroy: function() {

          if (this.autoPlace) {
            auto_place_container.removeChild(this.domElement);
          }

        },

        /**
         * @param name
         * @returns {dat.gui.GUI} The new folder.
         * @throws {Error} if this GUI already has a folder by the specified
         * name
         * @instance
         */
        addFolder: function(name) {

          // We have to prevent collisions on names in order to have a key
          // by which to remember saved values
          if (this.__folders[name] !== undefined) {
            throw new Error('You already have a folder in this GUI by the' +
                ' name "' + name + '"');
          }

          var new_gui_params = { name: name, parent: this };

          // We need to pass down the autoPlace trait so that we can
          // attach event listeners to open/close folder actions to
          // ensure that a scrollbar appears if the window is too short.
          new_gui_params.autoPlace = this.autoPlace;

          // Do we have saved appearance data for this folder?

          if (this.load && // Anything loaded?
              this.load.folders && // Was my parent a dead-end?
              this.load.folders[name]) { // Did daddy remember me?

            // Start me closed if I was closed
            new_gui_params.closed = this.load.folders[name].closed;

            // Pass down the loaded data
            new_gui_params.load = this.load.folders[name];

          }

          var gui = new GUI(new_gui_params);
          this.__folders[name] = gui;

          var li = addRow(this, gui.domElement);
          dom.addClass(li, 'folder');
          return gui;

        },

        open: function() {
          this.closed = false;
        },

        close: function() {
          this.closed = true;
        },

        onResize: function() {

          var root = this.getRoot();

          if (root.scrollable) {

            var top = dom.getOffset(root.__ul).top;
            var h = 0;

            common.each(root.__ul.childNodes, function(node) {
              if (! (root.autoPlace && node === root.__save_row))
                h += dom.getHeight(node);
            });

            if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
              dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
              root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
            } else {
              dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
              root.__ul.style.height = 'auto';
            }

          }

          if (root.__resize_handle) {
            common.defer(function() {
              root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
            });
          }

          if (root.__closeButton) {
            root.__closeButton.style.width = root.width + 'px';
          }

        },

        /**
         * Mark objects for saving. The order of these objects cannot change as
         * the GUI grows. When remembering new objects, append them to the end
         * of the list.
         *
         * @param {Object...} objects
         * @throws {Error} if not called on a top level GUI.
         * @instance
         */
        remember: function() {

          if (common.isUndefined(SAVE_DIALOGUE)) {
            SAVE_DIALOGUE = new CenteredDiv();
            SAVE_DIALOGUE.domElement.innerHTML = saveDialogueContents;
          }

          if (this.parent) {
            throw new Error("You can only call remember on a top level GUI.");
          }

          var _this = this;

          common.each(Array.prototype.slice.call(arguments), function(object) {
            if (_this.__rememberedObjects.length == 0) {
              addSaveMenu(_this);
            }
            if (_this.__rememberedObjects.indexOf(object) == -1) {
              _this.__rememberedObjects.push(object);
            }
          });

          if (this.autoPlace) {
            // Set save row width
            setWidth(this, this.width);
          }

        },

        /**
         * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
         * @instance
         */
        getRoot: function() {
          var gui = this;
          while (gui.parent) {
            gui = gui.parent;
          }
          return gui;
        },

        /**
         * @returns {Object} a JSON object representing the current state of
         * this GUI as well as its remembered properties.
         * @instance
         */
        getSaveObject: function() {

          var toReturn = this.load;

          toReturn.closed = this.closed;

          // Am I remembering any values?
          if (this.__rememberedObjects.length > 0) {

            toReturn.preset = this.preset;

            if (!toReturn.remembered) {
              toReturn.remembered = {};
            }

            toReturn.remembered[this.preset] = getCurrentPreset(this);

          }

          toReturn.folders = {};
          common.each(this.__folders, function(element, key) {
            toReturn.folders[key] = element.getSaveObject();
          });

          return toReturn;

        },

        save: function() {

          if (!this.load.remembered) {
            this.load.remembered = {};
          }

          this.load.remembered[this.preset] = getCurrentPreset(this);
          markPresetModified(this, false);

        },

        saveAs: function(presetName) {

          if (!this.load.remembered) {

            // Retain default values upon first save
            this.load.remembered = {};
            this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);

          }

          this.load.remembered[presetName] = getCurrentPreset(this);
          this.preset = presetName;
          addPresetOption(this, presetName, true);

        },

        revert: function(gui) {

          common.each(this.__controllers, function(controller) {
            // Make revert work on Default.
            if (!this.getRoot().load.remembered) {
              controller.setValue(controller.initialValue);
            } else {
              recallSavedValue(gui || this.getRoot(), controller);
            }
          }, this);

          common.each(this.__folders, function(folder) {
            folder.revert(folder);
          });

          if (!gui) {
            markPresetModified(this.getRoot(), false);
          }


        },

        listen: function(controller) {

          var init = this.__listening.length == 0;
          this.__listening.push(controller);
          if (init) updateDisplays(this.__listening);

        }

      }

  );

  function add(gui, object, property, params) {

    if (object[property] === undefined) {
      throw new Error("Object " + object + " has no property \"" + property + "\"");
    }

    var controller;

    if (params.color) {

      controller = new ColorController(object, property);

    } else {

      var factoryArgs = [object,property].concat(params.factoryArgs);
      controller = controllerFactory.apply(gui, factoryArgs);

    }

    if (params.before instanceof Controller) {
      params.before = params.before.__li;
    }

    recallSavedValue(gui, controller);

    dom.addClass(controller.domElement, 'c');

    var name = document.createElement('span');
    dom.addClass(name, 'property-name');
    name.innerHTML = controller.property;

    var container = document.createElement('div');
    container.appendChild(name);
    container.appendChild(controller.domElement);

    var li = addRow(gui, container, params.before);

    dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
    dom.addClass(li, typeof controller.getValue());

    augmentController(gui, li, controller);

    gui.__controllers.push(controller);

    return controller;

  }

  /**
   * Add a row to the end of the GUI or before another row.
   *
   * @param gui
   * @param [dom] If specified, inserts the dom content in the new row
   * @param [liBefore] If specified, places the new row before another row
   */
  function addRow(gui, dom, liBefore) {
    var li = document.createElement('li');
    if (dom) li.appendChild(dom);
    if (liBefore) {
      gui.__ul.insertBefore(li, params.before);
    } else {
      gui.__ul.appendChild(li);
    }
    gui.onResize();
    return li;
  }

  function augmentController(gui, li, controller) {

    controller.__li = li;
    controller.__gui = gui;

    common.extend(controller, {

      options: function(options) {

        if (arguments.length > 1) {
          controller.remove();

          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [common.toArray(arguments)]
              }
          );

        }

        if (common.isArray(options) || common.isObject(options)) {
          controller.remove();

          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [options]
              }
          );

        }

      },

      name: function(v) {
        controller.__li.firstElementChild.firstElementChild.innerHTML = v;
        return controller;
      },

      listen: function() {
        controller.__gui.listen(controller);
        return controller;
      },

      remove: function() {
        controller.__gui.remove(controller);
        return controller;
      }

    });

    // All sliders should be accompanied by a box.
    if (controller instanceof NumberControllerSlider) {

      var box = new NumberControllerBox(controller.object, controller.property,
          { min: controller.__min, max: controller.__max, step: controller.__step });

      common.each(['updateDisplay', 'onChange', 'onFinishChange'], function(method) {
        var pc = controller[method];
        var pb = box[method];
        controller[method] = box[method] = function() {
          var args = Array.prototype.slice.call(arguments);
          pc.apply(controller, args);
          return pb.apply(box, args);
        };
      });

      dom.addClass(li, 'has-slider');
      controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);

    }
    else if (controller instanceof NumberControllerBox) {

      var r = function(returned) {

        // Have we defined both boundaries?
        if (common.isNumber(controller.__min) && common.isNumber(controller.__max)) {

          // Well, then lets just replace this with a slider.
          controller.remove();
          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [controller.__min, controller.__max, controller.__step]
              });

        }

        return returned;

      };

      controller.min = common.compose(r, controller.min);
      controller.max = common.compose(r, controller.max);

    }
    else if (controller instanceof BooleanController) {

      dom.bind(li, 'click', function() {
        dom.fakeEvent(controller.__checkbox, 'click');
      });

      dom.bind(controller.__checkbox, 'click', function(e) {
        e.stopPropagation(); // Prevents double-toggle
      });

    }
    else if (controller instanceof FunctionController) {

      dom.bind(li, 'click', function() {
        dom.fakeEvent(controller.__button, 'click');
      });

      dom.bind(li, 'mouseover', function() {
        dom.addClass(controller.__button, 'hover');
      });

      dom.bind(li, 'mouseout', function() {
        dom.removeClass(controller.__button, 'hover');
      });

    }
    else if (controller instanceof ColorController) {

      dom.addClass(li, 'color');
      controller.updateDisplay = common.compose(function(r) {
        li.style.borderLeftColor = controller.__color.toString();
        return r;
      }, controller.updateDisplay);

      controller.updateDisplay();

    }

    controller.setValue = common.compose(function(r) {
      if (gui.getRoot().__preset_select && controller.isModified()) {
        markPresetModified(gui.getRoot(), true);
      }
      return r;
    }, controller.setValue);

  }

  function recallSavedValue(gui, controller) {

    // Find the topmost GUI, that's where remembered objects live.
    var root = gui.getRoot();

    // Does the object we're controlling match anything we've been told to
    // remember?
    var matched_index = root.__rememberedObjects.indexOf(controller.object);

    // Why yes, it does!
    if (matched_index != -1) {

      // Let me fetch a map of controllers for thcommon.isObject.
      var controller_map =
          root.__rememberedObjectIndecesToControllers[matched_index];

      // Ohp, I believe this is the first controller we've created for this
      // object. Lets make the map fresh.
      if (controller_map === undefined) {
        controller_map = {};
        root.__rememberedObjectIndecesToControllers[matched_index] =
            controller_map;
      }

      // Keep track of this controller
      controller_map[controller.property] = controller;

      // Okay, now have we saved any values for this controller?
      if (root.load && root.load.remembered) {

        var preset_map = root.load.remembered;

        // Which preset are we trying to load?
        var preset;

        if (preset_map[gui.preset]) {

          preset = preset_map[gui.preset];

        } else if (preset_map[DEFAULT_DEFAULT_PRESET_NAME]) {

          // Uhh, you can have the default instead?
          preset = preset_map[DEFAULT_DEFAULT_PRESET_NAME];

        } else {

          // Nada.

          return;

        }


        // Did the loaded object remember thcommon.isObject?
        if (preset[matched_index] &&

          // Did we remember this particular property?
            preset[matched_index][controller.property] !== undefined) {

          // We did remember something for this guy ...
          var value = preset[matched_index][controller.property];

          // And that's what it is.
          controller.initialValue = value;
          controller.setValue(value);

        }

      }

    }

  }

  function getLocalStorageHash(gui, key) {
    // TODO how does this deal with multiple GUI's?
    return document.location.href + '.' + key;

  }

  function addSaveMenu(gui) {

    var div = gui.__save_row = document.createElement('li');

    dom.addClass(gui.domElement, 'has-save');

    gui.__ul.insertBefore(div, gui.__ul.firstChild);

    dom.addClass(div, 'save-row');

    var gears = document.createElement('span');
    gears.innerHTML = '&nbsp;';
    dom.addClass(gears, 'button gears');

    // TODO replace with FunctionController
    var button = document.createElement('span');
    button.innerHTML = 'Save';
    dom.addClass(button, 'button');
    dom.addClass(button, 'save');

    var button2 = document.createElement('span');
    button2.innerHTML = 'New';
    dom.addClass(button2, 'button');
    dom.addClass(button2, 'save-as');

    var button3 = document.createElement('span');
    button3.innerHTML = 'Revert';
    dom.addClass(button3, 'button');
    dom.addClass(button3, 'revert');

    var select = gui.__preset_select = document.createElement('select');

    if (gui.load && gui.load.remembered) {

      common.each(gui.load.remembered, function(value, key) {
        addPresetOption(gui, key, key == gui.preset);
      });

    } else {
      addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
    }

    dom.bind(select, 'change', function() {


      for (var index = 0; index < gui.__preset_select.length; index++) {
        gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
      }

      gui.preset = this.value;

    });

    div.appendChild(select);
    div.appendChild(gears);
    div.appendChild(button);
    div.appendChild(button2);
    div.appendChild(button3);

    if (SUPPORTS_LOCAL_STORAGE) {

      var saveLocally = document.getElementById('dg-save-locally');
      var explain = document.getElementById('dg-local-explain');

      saveLocally.style.display = 'block';

      var localStorageCheckBox = document.getElementById('dg-local-storage');

      if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
        localStorageCheckBox.setAttribute('checked', 'checked');
      }

      function showHideExplain() {
        explain.style.display = gui.useLocalStorage ? 'block' : 'none';
      }

      showHideExplain();

      // TODO: Use a boolean controller, fool!
      dom.bind(localStorageCheckBox, 'change', function() {
        gui.useLocalStorage = !gui.useLocalStorage;
        showHideExplain();
      });

    }

    var newConstructorTextArea = document.getElementById('dg-new-constructor');

    dom.bind(newConstructorTextArea, 'keydown', function(e) {
      if (e.metaKey && (e.which === 67 || e.keyCode == 67)) {
        SAVE_DIALOGUE.hide();
      }
    });

    dom.bind(gears, 'click', function() {
      newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
      SAVE_DIALOGUE.show();
      newConstructorTextArea.focus();
      newConstructorTextArea.select();
    });

    dom.bind(button, 'click', function() {
      gui.save();
    });

    dom.bind(button2, 'click', function() {
      var presetName = prompt('Enter a new preset name.');
      if (presetName) gui.saveAs(presetName);
    });

    dom.bind(button3, 'click', function() {
      gui.revert();
    });

//    div.appendChild(button2);

  }

  function addResizeHandle(gui) {

    gui.__resize_handle = document.createElement('div');

    common.extend(gui.__resize_handle.style, {

      width: '6px',
      marginLeft: '-3px',
      height: '200px',
      cursor: 'ew-resize',
      position: 'absolute'
//      border: '1px solid blue'

    });

    var pmouseX;

    dom.bind(gui.__resize_handle, 'mousedown', dragStart);
    dom.bind(gui.__closeButton, 'mousedown', dragStart);

    gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);

    function dragStart(e) {

      e.preventDefault();

      pmouseX = e.clientX;

      dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.bind(window, 'mousemove', drag);
      dom.bind(window, 'mouseup', dragStop);

      return false;

    }

    function drag(e) {

      e.preventDefault();

      gui.width += pmouseX - e.clientX;
      gui.onResize();
      pmouseX = e.clientX;

      return false;

    }

    function dragStop() {

      dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.unbind(window, 'mousemove', drag);
      dom.unbind(window, 'mouseup', dragStop);

    }

  }

  function setWidth(gui, w) {
    gui.domElement.style.width = w + 'px';
    // Auto placed save-rows are position fixed, so we have to
    // set the width manually if we want it to bleed to the edge
    if (gui.__save_row && gui.autoPlace) {
      gui.__save_row.style.width = w + 'px';
    }if (gui.__closeButton) {
      gui.__closeButton.style.width = w + 'px';
    }
  }

  function getCurrentPreset(gui, useInitialValues) {

    var toReturn = {};

    // For each object I'm remembering
    common.each(gui.__rememberedObjects, function(val, index) {

      var saved_values = {};

      // The controllers I've made for thcommon.isObject by property
      var controller_map =
          gui.__rememberedObjectIndecesToControllers[index];

      // Remember each value for each property
      common.each(controller_map, function(controller, property) {
        saved_values[property] = useInitialValues ? controller.initialValue : controller.getValue();
      });

      // Save the values for thcommon.isObject
      toReturn[index] = saved_values;

    });

    return toReturn;

  }

  function addPresetOption(gui, name, setSelected) {
    var opt = document.createElement('option');
    opt.innerHTML = name;
    opt.value = name;
    gui.__preset_select.appendChild(opt);
    if (setSelected) {
      gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
    }
  }

  function setPresetSelectIndex(gui) {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      if (gui.__preset_select[index].value == gui.preset) {
        gui.__preset_select.selectedIndex = index;
      }
    }
  }

  function markPresetModified(gui, modified) {
    var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
//    console.log('mark', modified, opt);
    if (modified) {
      opt.innerHTML = opt.value + "*";
    } else {
      opt.innerHTML = opt.value;
    }
  }

  function updateDisplays(controllerArray) {


    if (controllerArray.length != 0) {

      requestAnimationFrame(function() {
        updateDisplays(controllerArray);
      });

    }

    common.each(controllerArray, function(c) {
      c.updateDisplay();
    });

  }

  return GUI;

})(dat.utils.css,
"<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>",
".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
dat.controllers.factory = (function (OptionController, NumberControllerBox, NumberControllerSlider, StringController, FunctionController, BooleanController, common) {

      return function(object, property) {

        var initialValue = object[property];

        // Providing options?
        if (common.isArray(arguments[2]) || common.isObject(arguments[2])) {
          return new OptionController(object, property, arguments[2]);
        }

        // Providing a map?

        if (common.isNumber(initialValue)) {

          if (common.isNumber(arguments[2]) && common.isNumber(arguments[3])) {

            // Has min and max.
            return new NumberControllerSlider(object, property, arguments[2], arguments[3]);

          } else {

            return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });

          }

        }

        if (common.isString(initialValue)) {
          return new StringController(object, property);
        }

        if (common.isFunction(initialValue)) {
          return new FunctionController(object, property, '');
        }

        if (common.isBoolean(initialValue)) {
          return new BooleanController(object, property);
        }

      }

    })(dat.controllers.OptionController,
dat.controllers.NumberControllerBox,
dat.controllers.NumberControllerSlider,
dat.controllers.StringController = (function (Controller, dom, common) {

  /**
   * @class Provides a text input to alter the string property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var StringController = function(object, property) {

    StringController.superclass.call(this, object, property);

    var _this = this;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    dom.bind(this.__input, 'keyup', onChange);
    dom.bind(this.__input, 'change', onChange);
    dom.bind(this.__input, 'blur', onBlur);
    dom.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    

    function onChange() {
      _this.setValue(_this.__input.value);
    }

    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);

  };

  StringController.superclass = Controller;

  common.extend(

      StringController.prototype,
      Controller.prototype,

      {

        updateDisplay: function() {
          // Stops the caret from moving on account of:
          // keyup -> setValue -> updateDisplay
          if (!dom.isActive(this.__input)) {
            this.__input.value = this.getValue();
          }
          return StringController.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  return StringController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common),
dat.controllers.FunctionController,
dat.controllers.BooleanController,
dat.utils.common),
dat.controllers.Controller,
dat.controllers.BooleanController,
dat.controllers.FunctionController,
dat.controllers.NumberControllerBox,
dat.controllers.NumberControllerSlider,
dat.controllers.OptionController,
dat.controllers.ColorController = (function (Controller, dom, Color, interpret, common) {

  var ColorController = function(object, property) {

    ColorController.superclass.call(this, object, property);

    this.__color = new Color(this.getValue());
    this.__temp = new Color(0);

    var _this = this;

    this.domElement = document.createElement('div');

    dom.makeSelectable(this.domElement, false);

    this.__selector = document.createElement('div');
    this.__selector.className = 'selector';

    this.__saturation_field = document.createElement('div');
    this.__saturation_field.className = 'saturation-field';

    this.__field_knob = document.createElement('div');
    this.__field_knob.className = 'field-knob';
    this.__field_knob_border = '2px solid ';

    this.__hue_knob = document.createElement('div');
    this.__hue_knob.className = 'hue-knob';

    this.__hue_field = document.createElement('div');
    this.__hue_field.className = 'hue-field';

    this.__input = document.createElement('input');
    this.__input.type = 'text';
    this.__input_textShadow = '0 1px 1px ';

    dom.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) { // on enter
        onBlur.call(this);
      }
    });

    dom.bind(this.__input, 'blur', onBlur);

    dom.bind(this.__selector, 'mousedown', function(e) {

      dom
        .addClass(this, 'drag')
        .bind(window, 'mouseup', function(e) {
          dom.removeClass(_this.__selector, 'drag');
        });

    });

    var value_field = document.createElement('div');

    common.extend(this.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });

    common.extend(this.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: this.__field_knob_border + (this.__color.v < .5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    
    common.extend(this.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });

    common.extend(this.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });

    common.extend(value_field.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    
    linearGradient(value_field, 'top', 'rgba(0,0,0,0)', '#000');

    common.extend(this.__hue_field.style, {
      width: '15px',
      height: '100px',
      display: 'inline-block',
      border: '1px solid #555',
      cursor: 'ns-resize'
    });

    hueGradient(this.__hue_field);

    common.extend(this.__input.style, {
      outline: 'none',
//      width: '120px',
      textAlign: 'center',
//      padding: '4px',
//      marginBottom: '6px',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)'
    });

    dom.bind(this.__saturation_field, 'mousedown', fieldDown);
    dom.bind(this.__field_knob, 'mousedown', fieldDown);

    dom.bind(this.__hue_field, 'mousedown', function(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'mouseup', unbindH);
    });

    function fieldDown(e) {
      setSV(e);
      // document.body.style.cursor = 'none';
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'mouseup', unbindSV);
    }

    function unbindSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'mouseup', unbindSV);
      // document.body.style.cursor = 'default';
    }

    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }

    function unbindH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'mouseup', unbindH);
    }

    this.__saturation_field.appendChild(value_field);
    this.__selector.appendChild(this.__field_knob);
    this.__selector.appendChild(this.__saturation_field);
    this.__selector.appendChild(this.__hue_field);
    this.__hue_field.appendChild(this.__hue_knob);

    this.domElement.appendChild(this.__input);
    this.domElement.appendChild(this.__selector);

    this.updateDisplay();

    function setSV(e) {

      e.preventDefault();

      var w = dom.getWidth(_this.__saturation_field);
      var o = dom.getOffset(_this.__saturation_field);
      var s = (e.clientX - o.left + document.body.scrollLeft) / w;
      var v = 1 - (e.clientY - o.top + document.body.scrollTop) / w;

      if (v > 1) v = 1;
      else if (v < 0) v = 0;

      if (s > 1) s = 1;
      else if (s < 0) s = 0;

      _this.__color.v = v;
      _this.__color.s = s;

      _this.setValue(_this.__color.toOriginal());


      return false;

    }

    function setH(e) {

      e.preventDefault();

      var s = dom.getHeight(_this.__hue_field);
      var o = dom.getOffset(_this.__hue_field);
      var h = 1 - (e.clientY - o.top + document.body.scrollTop) / s;

      if (h > 1) h = 1;
      else if (h < 0) h = 0;

      _this.__color.h = h * 360;

      _this.setValue(_this.__color.toOriginal());

      return false;

    }

  };

  ColorController.superclass = Controller;

  common.extend(

      ColorController.prototype,
      Controller.prototype,

      {

        updateDisplay: function() {

          var i = interpret(this.getValue());

          if (i !== false) {

            var mismatch = false;

            // Check for mismatch on the interpreted value.

            common.each(Color.COMPONENTS, function(component) {
              if (!common.isUndefined(i[component]) &&
                  !common.isUndefined(this.__color.__state[component]) &&
                  i[component] !== this.__color.__state[component]) {
                mismatch = true;
                return {}; // break
              }
            }, this);

            // If nothing diverges, we keep our previous values
            // for statefulness, otherwise we recalculate fresh
            if (mismatch) {
              common.extend(this.__color.__state, i);
            }

          }

          common.extend(this.__temp.__state, this.__color.__state);

          this.__temp.a = 1;

          var flip = (this.__color.v < .5 || this.__color.s > .5) ? 255 : 0;
          var _flip = 255 - flip;

          common.extend(this.__field_knob.style, {
            marginLeft: 100 * this.__color.s - 7 + 'px',
            marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
            backgroundColor: this.__temp.toString(),
            border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip +')'
          });

          this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';

          this.__temp.s = 1;
          this.__temp.v = 1;

          linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toString());

          common.extend(this.__input.style, {
            backgroundColor: this.__input.value = this.__color.toString(),
            color: 'rgb(' + flip + ',' + flip + ',' + flip +')',
            textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip +',.7)'
          });

        }

      }

  );
  
  var vendors = ['-moz-','-o-','-webkit-','-ms-',''];
  
  function linearGradient(elem, x, a, b) {
    elem.style.background = '';
    common.each(vendors, function(vendor) {
      elem.style.cssText += 'background: ' + vendor + 'linear-gradient('+x+', '+a+' 0%, ' + b + ' 100%); ';
    });
  }
  
  function hueGradient(elem) {
    elem.style.background = '';
    elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
    elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
    elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
    elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
    elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  }


  return ColorController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.color.Color = (function (interpret, math, toString, common) {

  var Color = function() {

    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw 'Failed to interpret color arguments';
    }

    this.__state.a = this.__state.a || 1;


  };

  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

  common.extend(Color.prototype, {

    toString: function() {
      return toString(this);
    },

    toOriginal: function() {
      return this.__state.conversion.write(this);
    }

  });

  defineRGBComponent(Color.prototype, 'r', 2);
  defineRGBComponent(Color.prototype, 'g', 1);
  defineRGBComponent(Color.prototype, 'b', 0);

  defineHSVComponent(Color.prototype, 'h');
  defineHSVComponent(Color.prototype, 's');
  defineHSVComponent(Color.prototype, 'v');

  Object.defineProperty(Color.prototype, 'a', {

    get: function() {
      return this.__state.a;
    },

    set: function(v) {
      this.__state.a = v;
    }

  });

  Object.defineProperty(Color.prototype, 'hex', {

    get: function() {

      if (!this.__state.space !== 'HEX') {
        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
      }

      return this.__state.hex;

    },

    set: function(v) {

      this.__state.space = 'HEX';
      this.__state.hex = v;

    }

  });

  function defineRGBComponent(target, component, componentHexIndex) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'RGB') {
          return this.__state[component];
        }

        recalculateRGB(this, component, componentHexIndex);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'RGB') {
          recalculateRGB(this, component, componentHexIndex);
          this.__state.space = 'RGB';
        }

        this.__state[component] = v;

      }

    });

  }

  function defineHSVComponent(target, component) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'HSV')
          return this.__state[component];

        recalculateHSV(this);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'HSV') {
          recalculateHSV(this);
          this.__state.space = 'HSV';
        }

        this.__state[component] = v;

      }

    });

  }

  function recalculateRGB(color, component, componentHexIndex) {

    if (color.__state.space === 'HEX') {

      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

    } else if (color.__state.space === 'HSV') {

      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

    } else {

      throw 'Corrupted color state';

    }

  }

  function recalculateHSV(color) {

    var result = math.rgb_to_hsv(color.r, color.g, color.b);

    common.extend(color.__state,
        {
          s: result.s,
          v: result.v
        }
    );

    if (!common.isNaN(result.h)) {
      color.__state.h = result.h;
    } else if (common.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }

  }

  return Color;

})(dat.color.interpret,
dat.color.math = (function () {

  var tmpComponent;

  return {

    hsv_to_rgb: function(h, s, v) {

      var hi = Math.floor(h / 60) % 6;

      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1.0 - s);
      var q = v * (1.0 - (f * s));
      var t = v * (1.0 - ((1.0 - f) * s));
      var c = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
      ][hi];

      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };

    },

    rgb_to_hsv: function(r, g, b) {

      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s;

      if (max != 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }

      if (r == max) {
        h = (g - b) / delta;
      } else if (g == max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }

      return {
        h: h * 360,
        s: s,
        v: max / 255
      };
    },

    rgb_to_hex: function(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },

    component_from_hex: function(hex, componentIndex) {
      return (hex >> (componentIndex * 8)) & 0xFF;
    },

    hex_with_component: function(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
    }

  }

})(),
dat.color.toString,
dat.utils.common),
dat.color.interpret,
dat.utils.common),
dat.utils.requestAnimationFrame = (function () {

  /**
   * requirejs version of Paul Irish's RequestAnimationFrame
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   */

  return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback, element) {

        window.setTimeout(callback, 1000 / 60);

      };
})(),
dat.dom.CenteredDiv = (function (dom, common) {


  var CenteredDiv = function() {

    this.backgroundElement = document.createElement('div');
    common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear'
    });

    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';

    this.domElement = document.createElement('div');
    common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear'
    });


    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);

    var _this = this;
    dom.bind(this.backgroundElement, 'click', function() {
      _this.hide();
    });


  };

  CenteredDiv.prototype.show = function() {

    var _this = this;
    


    this.backgroundElement.style.display = 'block';

    this.domElement.style.display = 'block';
    this.domElement.style.opacity = 0;
//    this.domElement.style.top = '52%';
    this.domElement.style.webkitTransform = 'scale(1.1)';

    this.layout();

    common.defer(function() {
      _this.backgroundElement.style.opacity = 1;
      _this.domElement.style.opacity = 1;
      _this.domElement.style.webkitTransform = 'scale(1)';
    });

  };

  CenteredDiv.prototype.hide = function() {

    var _this = this;

    var hide = function() {

      _this.domElement.style.display = 'none';
      _this.backgroundElement.style.display = 'none';

      dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
      dom.unbind(_this.domElement, 'transitionend', hide);
      dom.unbind(_this.domElement, 'oTransitionEnd', hide);

    };

    dom.bind(this.domElement, 'webkitTransitionEnd', hide);
    dom.bind(this.domElement, 'transitionend', hide);
    dom.bind(this.domElement, 'oTransitionEnd', hide);

    this.backgroundElement.style.opacity = 0;
//    this.domElement.style.top = '48%';
    this.domElement.style.opacity = 0;
    this.domElement.style.webkitTransform = 'scale(1.1)';

  };

  CenteredDiv.prototype.layout = function() {
    this.domElement.style.left = window.innerWidth/2 - dom.getWidth(this.domElement) / 2 + 'px';
    this.domElement.style.top = window.innerHeight/2 - dom.getHeight(this.domElement) / 2 + 'px';
  };
  
  function lockScroll(e) {
    console.log(e);
  }

  return CenteredDiv;

})(dat.dom.dom,
dat.utils.common),
dat.dom.dom,
dat.utils.common);
});

var dat_color = createCommonjsModule(function (module) {
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/** @namespace */
var dat = module.exports = dat || {};

/** @namespace */
dat.color = dat.color || {};

/** @namespace */
dat.utils = dat.utils || {};

dat.utils.common = (function () {
  
  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;

  /**
   * Band-aid methods for things that should be a lot easier in JavaScript.
   * Implementation and structure inspired by underscore.js
   * http://documentcloud.github.com/underscore/
   */

  return { 
    
    BREAK: {},
  
    extend: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (!this.isUndefined(obj[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
      
    },
    
    defaults: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (this.isUndefined(target[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
    
    },
    
    compose: function() {
      var toCall = ARR_SLICE.call(arguments);
            return function() {
              var args = ARR_SLICE.call(arguments);
              for (var i = toCall.length -1; i >= 0; i--) {
                args = [toCall[i].apply(this, args)];
              }
              return args[0];
            }
    },
    
    each: function(obj, itr, scope) {

      
      if (ARR_EACH && obj.forEach === ARR_EACH) { 
        
        obj.forEach(itr, scope);
        
      } else if (obj.length === obj.length + 0) { // Is number but not NaN
        
        for (var key = 0, l = obj.length; key < l; key++)
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
            return;
            
      } else {

        for (var key in obj) 
          if (itr.call(scope, obj[key], key) === this.BREAK)
            return;
            
      }
            
    },
    
    defer: function(fnc) {
      setTimeout(fnc, 0);
    },
    
    toArray: function(obj) {
      if (obj.toArray) return obj.toArray();
      return ARR_SLICE.call(obj);
    },

    isUndefined: function(obj) {
      return obj === undefined;
    },
    
    isNull: function(obj) {
      return obj === null;
    },
    
    isNaN: function(obj) {
      return obj !== obj;
    },
    
    isArray: Array.isArray || function(obj) {
      return obj.constructor === Array;
    },
    
    isObject: function(obj) {
      return obj === Object(obj);
    },
    
    isNumber: function(obj) {
      return obj === obj+0;
    },
    
    isString: function(obj) {
      return obj === obj+'';
    },
    
    isBoolean: function(obj) {
      return obj === false || obj === true;
    },
    
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
  
  };
    
})();


dat.color.toString = (function (common) {

  return function(color) {

    if (color.a == 1 || common.isUndefined(color.a)) {

      var s = color.hex.toString(16);
      while (s.length < 6) {
        s = '0' + s;
      }

      return '#' + s;

    } else {

      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

    }

  }

})(dat.utils.common);


dat.Color = dat.color.Color = (function (interpret, math, toString, common) {

  var Color = function() {

    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw 'Failed to interpret color arguments';
    }

    this.__state.a = this.__state.a || 1;


  };

  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

  common.extend(Color.prototype, {

    toString: function() {
      return toString(this);
    },

    toOriginal: function() {
      return this.__state.conversion.write(this);
    }

  });

  defineRGBComponent(Color.prototype, 'r', 2);
  defineRGBComponent(Color.prototype, 'g', 1);
  defineRGBComponent(Color.prototype, 'b', 0);

  defineHSVComponent(Color.prototype, 'h');
  defineHSVComponent(Color.prototype, 's');
  defineHSVComponent(Color.prototype, 'v');

  Object.defineProperty(Color.prototype, 'a', {

    get: function() {
      return this.__state.a;
    },

    set: function(v) {
      this.__state.a = v;
    }

  });

  Object.defineProperty(Color.prototype, 'hex', {

    get: function() {

      if (!this.__state.space !== 'HEX') {
        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
      }

      return this.__state.hex;

    },

    set: function(v) {

      this.__state.space = 'HEX';
      this.__state.hex = v;

    }

  });

  function defineRGBComponent(target, component, componentHexIndex) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'RGB') {
          return this.__state[component];
        }

        recalculateRGB(this, component, componentHexIndex);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'RGB') {
          recalculateRGB(this, component, componentHexIndex);
          this.__state.space = 'RGB';
        }

        this.__state[component] = v;

      }

    });

  }

  function defineHSVComponent(target, component) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'HSV')
          return this.__state[component];

        recalculateHSV(this);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'HSV') {
          recalculateHSV(this);
          this.__state.space = 'HSV';
        }

        this.__state[component] = v;

      }

    });

  }

  function recalculateRGB(color, component, componentHexIndex) {

    if (color.__state.space === 'HEX') {

      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

    } else if (color.__state.space === 'HSV') {

      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

    } else {

      throw 'Corrupted color state';

    }

  }

  function recalculateHSV(color) {

    var result = math.rgb_to_hsv(color.r, color.g, color.b);

    common.extend(color.__state,
        {
          s: result.s,
          v: result.v
        }
    );

    if (!common.isNaN(result.h)) {
      color.__state.h = result.h;
    } else if (common.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }

  }

  return Color;

})(dat.color.interpret = (function (toString, common) {

  var result, toReturn;

  var interpret = function() {

    toReturn = false;

    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

    common.each(INTERPRETATIONS, function(family) {

      if (family.litmus(original)) {

        common.each(family.conversions, function(conversion, conversionName) {

          result = conversion.read(original);

          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return common.BREAK;

          }

        });

        return common.BREAK;

      }

    });

    return toReturn;

  };

  var INTERPRETATIONS = [

    // Strings
    {

      litmus: common.isString,

      conversions: {

        THREE_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt(
                  '0x' +
                      test[1].toString() + test[1].toString() +
                      test[2].toString() + test[2].toString() +
                      test[3].toString() + test[3].toString())
            };

          },

          write: toString

        },

        SIX_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9]{6})$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt('0x' + test[1].toString())
            };

          },

          write: toString

        },

        CSS_RGB: {

          read: function(original) {

            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3])
            };

          },

          write: toString

        },

        CSS_RGBA: {

          read: function(original) {

            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3]),
              a: parseFloat(test[4])
            };

          },

          write: toString

        }

      }

    },

    // Numbers
    {

      litmus: common.isNumber,

      conversions: {

        HEX: {
          read: function(original) {
            return {
              space: 'HEX',
              hex: original,
              conversionName: 'HEX'
            }
          },

          write: function(color) {
            return color.hex;
          }
        }

      }

    },

    // Arrays
    {

      litmus: common.isArray,

      conversions: {

        RGB_ARRAY: {
          read: function(original) {
            if (original.length != 3) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b];
          }

        },

        RGBA_ARRAY: {
          read: function(original) {
            if (original.length != 4) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2],
              a: original[3]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b, color.a];
          }

        }

      }

    },

    // Objects
    {

      litmus: common.isObject,

      conversions: {

        RGBA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b) &&
                common.isNumber(original.a)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b,
              a: color.a
            }
          }
        },

        RGB_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b
            }
          }
        },

        HSVA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v) &&
                common.isNumber(original.a)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v,
              a: color.a
            }
          }
        },

        HSV_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v
            }
          }

        }

      }

    }


  ];

  return interpret;


})(dat.color.toString,
dat.utils.common),
dat.color.math = (function () {

  var tmpComponent;

  return {

    hsv_to_rgb: function(h, s, v) {

      var hi = Math.floor(h / 60) % 6;

      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1.0 - s);
      var q = v * (1.0 - (f * s));
      var t = v * (1.0 - ((1.0 - f) * s));
      var c = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
      ][hi];

      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };

    },

    rgb_to_hsv: function(r, g, b) {

      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s;

      if (max != 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }

      if (r == max) {
        h = (g - b) / delta;
      } else if (g == max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }

      return {
        h: h * 360,
        s: s,
        v: max / 255
      };
    },

    rgb_to_hex: function(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },

    component_from_hex: function(hex, componentIndex) {
      return (hex >> (componentIndex * 8)) & 0xFF;
    },

    hex_with_component: function(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
    }

  }

})(),
dat.color.toString,
dat.utils.common);
});

var index = dat_gui;
var color = dat_color;

index.color = color;

var DatGui = function (_Core$System) {
  inherits(DatGui, _Core$System);

  function DatGui() {
    classCallCheck(this, DatGui);
    return possibleConstructorReturn(this, (DatGui.__proto__ || Object.getPrototypeOf(DatGui)).apply(this, arguments));
  }

  createClass(DatGui, [{
    key: 'initialize',
    value: function initialize() {
      this.gui = new index.GUI();
    }
  }]);
  return DatGui;
}(System);
registerSystem('DatGui', DatGui);

var debug = true;

var world = new World({
  systems: {
    ViewportPixi: {
      debug: debug,
      container: '#game',
      followName: 'orbiter1',
      zoom: 0.5
    },
    DrawStats: {},
    MemoryStats: {},
    DatGui: {},
    Motion: {},
    Orbiter: {},
    Thruster: {},
    Seeker: {}
  }
});

world.insert({
  Name: { name: 'sun' },
  Sprite: { name: 'asteroid', size: 300 },
  Position: {},
  Motion: { dx: 0, dy: 0, drotation: Math.PI / 6 }
}, {
  Name: { name: 'orbiter1' },
  Sprite: { name: 'hero', color: '#00f' },
  Position: { x: 250, y: 250 },
  Orbiter: { name: 'sun' }
}, {
  Name: { name: 'chaser1' },
  Sprite: { name: 'enemyscout', color: '#f00' },
  Position: {},
  Motion: {},
  Thruster: { deltaV: 400, maxV: 175 },
  Seeker: { targetName: 'orbiter1', radPerSec: 0.9 }
}, {
  Name: { name: 'chaser2' },
  Sprite: { name: 'enemyscout', color: '#0f0' },
  Position: {},
  Motion: {},
  Thruster: { deltaV: 600, maxV: 400 },
  Seeker: { targetName: 'orbiter1', radPerSec: 2 }
});

world.start();

var vpSystem = world.getSystem('ViewportPixi');
var guiSystem = world.getSystem('DatGui');
var gui = guiSystem.gui;

gui.add(vpSystem, 'zoom', vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();

var names = ['debug', 'gridEnabled', 'cameraX', 'cameraY'];
names.forEach(function (name) {
  gui.add(vpSystem, name).listen();
});

}());
