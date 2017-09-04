/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		8: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".bundle.js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 97);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************!*\
  !*** ./src/lib/core.js ***!
  \*************************/
/*! exports provided: Messages, World, Component, System, registerComponent, getComponent, registerSystem, getSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Messages", function() { return Messages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "World", function() { return World; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "System", function() { return System; });
/* harmony export (immutable) */ __webpack_exports__["registerComponent"] = registerComponent;
/* harmony export (immutable) */ __webpack_exports__["getComponent"] = getComponent;
/* harmony export (immutable) */ __webpack_exports__["registerSystem"] = registerSystem;
/* harmony export (immutable) */ __webpack_exports__["getSystem"] = getSystem;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(/*! babel-runtime/helpers/extends */ 74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);



var TARGET_FPS = 60;
var TARGET_DURATION = 1000 / TARGET_FPS;

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
  setTimeout(fn, 1000 / 60);
};

// Commonly used temp variables, pre-declared early.
var entityId = void 0,
    system = void 0,
    systemName = void 0,
    systemAttrs = void 0,
    systemCls = void 0,
    componentName = void 0,
    timeNow = void 0,
    timeDelta = void 0,
    componentAttrs = void 0,
    matches = void 0,
    idx = void 0,
    item = void 0,
    handler = void 0;

var Messages = {
  ENTITY_INSERT: 'entity_insert',
  ENTITY_DESTROY: 'entity_destroy'
};

var World = function () {
  function World(options) {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, World);

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

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(World, [{
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
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Component);
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Component, null, [{
    key: 'defaults',
    value: function defaults() {
      return {};
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.defaults(), attrs || {});
    }
  }]);

  return Component;
}();

var System = function () {
  function System(options) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, System);

    this.options = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.defaultOptions(), options || {});
    this.debug = this.options.debug || false;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(System, [{
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
      // TODO make this work again someday
      return;
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

/***/ }),
/* 1 */
/*!**************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/classCallCheck.js ***!
  \**************************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 2 */
/*!***********************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/createClass.js ***!
  \***********************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ 103);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 3 */
/*!***********************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/get-prototype-of.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/get-prototype-of */ 106), __esModule: true };

/***/ }),
/* 4 */
/*!*************************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/possibleConstructorReturn.js ***!
  \*************************************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(/*! ../helpers/typeof */ 80);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 5 */
/*!********************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/inherits.js ***!
  \********************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ 124);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(/*! ../core-js/object/create */ 128);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(/*! ../helpers/typeof */ 80);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 6 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_core.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_export.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 12);
var core = __webpack_require__(/*! ./_core */ 6);
var ctx = __webpack_require__(/*! ./_ctx */ 24);
var hide = __webpack_require__(/*! ./_hide */ 15);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 8 */
/*!*********************************!*\
  !*** ./src/plugins/position.js ***!
  \*********************************/
/*! exports provided: Position, PositionSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PositionSystem", function() { return PositionSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_get__ = __webpack_require__(/*! babel-runtime/helpers/get */ 36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_QuadTree__ = __webpack_require__(/*! ../lib/QuadTree */ 134);









var PI2 = Math.PI * 2;

var Position = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Position, _Component);

  function Position() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Position);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Position.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Position)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Position, null, [{
    key: 'defaults',
    value: function defaults() {
      return { x: 0, y: 0, rotation: 0 };
    }
  }]);

  return Position;
}(__WEBPACK_IMPORTED_MODULE_6__lib_core__["Component"]);

Object(__WEBPACK_IMPORTED_MODULE_6__lib_core__["registerComponent"])('Position', Position);

var entityId = void 0,
    sprite = void 0,
    position = void 0,
    positions = void 0;

var PositionSystem = function (_System) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(PositionSystem, _System);

  function PositionSystem() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, PositionSystem);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PositionSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(PositionSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(PositionSystem, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {
        debug: false,
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
      this.quadtree = new __WEBPACK_IMPORTED_MODULE_7__lib_QuadTree__["a" /* default */](-1000, -1000, 2000, 2000, this.options.quadtreeObjectsPerNode, this.options.quadtreeMaxLevels);
    }
  }, {
    key: 'update',
    value: function update(timeDelta) {
      this.updateBounds();
      this.resetQuadtree(timeDelta);
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_get___default()(PositionSystem.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(PositionSystem.prototype), 'update', this).call(this, timeDelta);
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
      for (entityId in positions) {
        position = positions[entityId];
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
    key: 'drawDebug',
    value: function drawDebug(timeDelta, g) {
      if (!this.options.debug) {
        return;
      }

      g.lineWidth = 4;
      g.strokeStyle = g.fillStyle = '#882222';
      positions = this.getMatchingComponents();
      for (entityId in positions) {
        position = positions[entityId];
        sprite = this.world.get('Sprite', entityId);
        g.moveTo(position.x, position.y);
        g.arc(position.x, position.y, sprite.width / 2, 0, PI2);
        g.moveTo(position.x - 20, position.y);
        g.lineTo(position.x + 20, position.y);
        g.moveTo(position.x, position.y - 20);
        g.lineTo(position.x, position.y + 20);
      }
      g.stroke();

      g.strokeStyle = g.fillStyle = '#228822';
      this.drawDebugQuadtreeNode(g, this.quadtree);
      g.stroke();

      g.strokeStyle = g.fillStyle = '#ffff33';
      g.moveTo(-20, 0);
      g.lineTo(20, 0);
      g.moveTo(0, -20);
      g.lineTo(0, 20);
      g.moveTo(0, 0);
      g.rect(this.bounds.left, this.bounds.top, this.bounds.width, this.bounds.height);
      g.stroke();
    }
  }, {
    key: 'drawDebugQuadtreeNode',
    value: function drawDebugQuadtreeNode(g, root) {
      if (!root) {
        return;
      }

      g.strokeStyle = g.fillStyle = '#883388';
      g.moveTo(root.bounds.left, root.bounds.top);
      g.rect(root.bounds.left, root.bounds.top, root.bounds.width, root.bounds.height);

      g.strokeStyle = g.fillStyle = '#112222';
      root.objects.forEach(function (body) {
        g.moveTo(body.left, body.top);
        g.rect(body.left, body.top, body.width, body.height);
      });

      this.drawDebugQuadtreeNode(g, root.nodes[0]);
      this.drawDebugQuadtreeNode(g, root.nodes[1]);
      this.drawDebugQuadtreeNode(g, root.nodes[2]);
      this.drawDebugQuadtreeNode(g, root.nodes[3]);
    }
  }]);

  return PositionSystem;
}(__WEBPACK_IMPORTED_MODULE_6__lib_core__["System"]);

Object(__WEBPACK_IMPORTED_MODULE_6__lib_core__["registerSystem"])('Position', PositionSystem);

/***/ }),
/* 9 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ 60)('wks');
var uid = __webpack_require__(/*! ./_uid */ 48);
var Symbol = __webpack_require__(/*! ./_global */ 12).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 10 */
/*!*******************************!*\
  !*** ./src/plugins/motion.js ***!
  \*******************************/
/*! exports provided: Motion, MotionSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Motion", function() { return Motion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MotionSystem", function() { return MotionSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__position__ = __webpack_require__(/*! ./position */ 8);









var PI2 = Math.PI * 2;

var Motion = function (_Core$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Motion, _Core$Component);

  function Motion() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Motion);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Motion.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Motion)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Motion, null, [{
    key: 'defaults',
    value: function defaults() {
      return { dx: 0, dy: 0, drotation: 0 };
    }
  }]);

  return Motion;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["Component"]);
__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerComponent"]('Motion', Motion);

var MotionSystem = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(MotionSystem, _Core$System);

  function MotionSystem() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, MotionSystem);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (MotionSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(MotionSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(MotionSystem, [{
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
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["System"]);
__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerSystem"]('Motion', MotionSystem);

/***/ }),
/* 11 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dp.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 16);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 76);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 54);
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 13) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 12 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_global.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 13 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_descriptors.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 25)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 14 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-iobject.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 55);
var defined = __webpack_require__(/*! ./_defined */ 57);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 15 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_hide.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 11);
var createDesc = __webpack_require__(/*! ./_property-desc */ 41);
module.exports = __webpack_require__(/*! ./_descriptors */ 13) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 16 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_an-object.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 17);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 17 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-object.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 18 */
/*!******************************!*\
  !*** ./src/plugins/spawn.js ***!
  \******************************/
/*! exports provided: MSG_SPAWN, MSG_DESTROY, MSG_DESPAWN, MSG_CAPTURE_CAMERA, Spawn, SpawnSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_SPAWN", function() { return MSG_SPAWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_DESTROY", function() { return MSG_DESTROY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_DESPAWN", function() { return MSG_DESPAWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_CAPTURE_CAMERA", function() { return MSG_CAPTURE_CAMERA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Spawn", function() { return Spawn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpawnSystem", function() { return SpawnSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);







var MSG_SPAWN = 'spawnSpawn';
var MSG_DESTROY = 'spawnDestroy';
var MSG_DESPAWN = 'spawnDespawn';
var MSG_CAPTURE_CAMERA = 'spawnCaptureCamera';

var spawn = void 0;

var Spawn = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Spawn, _Component);

  function Spawn() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Spawn);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Spawn.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Spawn)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Spawn, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        ttl: null,
        age: 0,
        destroy: false,
        tombstone: null
      };
    }
  }]);

  return Spawn;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["Component"]);

Object(__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerComponent"])('Spawn', Spawn);

var SpawnSystem = function (_System) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(SpawnSystem, _System);

  function SpawnSystem() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, SpawnSystem);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (SpawnSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(SpawnSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(SpawnSystem, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {};
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this3 = this;

      this.world.subscribe(MSG_DESTROY, function (msg, entityId) {
        spawn = _this3.world.get('Spawn', entityId);
        if (spawn) {
          spawn.destroy = true;
        }
      });
    }
  }, {
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Spawn';
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(timeDelta, entityId, spawn) {
      if (!spawn.spawned) {
        spawn.spawned = true;
        this.world.publish(MSG_SPAWN, entityId);
        if (spawn.captureCamera) {
          this.world.publish(MSG_CAPTURE_CAMERA, entityId);
        }
      }
      if (spawn.ttl !== null) {
        spawn.age += timeDelta;
        if (spawn.age >= spawn.ttl) {
          spawn.destroy = true;
        }
      }
      if (spawn.destroy) {
        if (spawn.tombstone !== null) {
          var toInsert = typeof spawn.tombstone === 'function' ? spawn.tombstone(spawn, entityId) : spawn.tombstone;
          this.world.insert(toInsert);
        }
        this.world.publish(MSG_DESPAWN, entityId);
        this.world.destroy(entityId);
      }
    }
  }]);

  return SpawnSystem;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["System"]);

Object(__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerSystem"])('Spawn', SpawnSystem);

/***/ }),
/* 19 */
/*!*******************************!*\
  !*** ./src/plugins/datGui.js ***!
  \*******************************/
/*! exports provided: DatGui */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatGui", function() { return DatGui; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_dat_gui__ = __webpack_require__(/*! dat-gui */ 135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_dat_gui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_dat_gui__);









var DatGui = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(DatGui, _Core$System);

  function DatGui() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, DatGui);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (DatGui.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(DatGui)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(DatGui, [{
    key: 'initialize',
    value: function initialize() {
      this.gui = new __WEBPACK_IMPORTED_MODULE_6_dat_gui___default.a.GUI();
    }
  }]);

  return DatGui;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["System"]);
__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerSystem"]('DatGui', DatGui);

/***/ }),
/* 20 */
/*!**********************************!*\
  !*** ./src/plugins/drawStats.js ***!
  \**********************************/
/*! exports provided: DrawStats */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawStats", function() { return DrawStats; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_stats_js__ = __webpack_require__(/*! stats-js */ 138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_stats_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_stats_js__);









var DrawStats = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(DrawStats, _Core$System);

  function DrawStats() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, DrawStats);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (DrawStats.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(DrawStats)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(DrawStats, [{
    key: 'initialize',
    value: function initialize() {

      this.drawStats = new __WEBPACK_IMPORTED_MODULE_6_stats_js___default.a();
      this.drawStats.setMode(0);
      this.drawStats.domElement.style.position = 'absolute';
      this.drawStats.domElement.style.left = '0px';
      this.drawStats.domElement.style.top = '0px';
      document.body.appendChild(this.drawStats.domElement);

      this.tickStats = new __WEBPACK_IMPORTED_MODULE_6_stats_js___default.a();
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
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["System"]);
__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerSystem"]('DrawStats', DrawStats);

/***/ }),
/* 21 */
/*!***********************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/keys.js ***!
  \***********************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/keys */ 140), __esModule: true };

/***/ }),
/* 22 */
/*!************************************!*\
  !*** ./src/plugins/memoryStats.js ***!
  \************************************/
/*! exports provided: MemoryStatsSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemoryStatsSystem", function() { return MemoryStatsSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_memory_stats__ = __webpack_require__(/*! memory-stats */ 142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_memory_stats___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_memory_stats__);









var MemoryStatsSystem = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(MemoryStatsSystem, _Core$System);

  function MemoryStatsSystem() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, MemoryStatsSystem);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (MemoryStatsSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(MemoryStatsSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(MemoryStatsSystem, [{
    key: 'initialize',
    value: function initialize() {
      this.stats = new __WEBPACK_IMPORTED_MODULE_6_memory_stats___default.a();
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
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["System"]);
__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerSystem"]('MemoryStats', MemoryStatsSystem);

/***/ }),
/* 23 */
/*!*****************************!*\
  !*** ./src/plugins/name.js ***!
  \*****************************/
/*! exports provided: Name */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Name", function() { return Name; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);







var Name = function (_Core$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Name, _Core$Component);

  function Name() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Name);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Name.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Name)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Name, null, [{
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
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["Component"]);

__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerComponent"]('Name', Name);

/***/ }),
/* 24 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ctx.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 75);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 25 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_fails.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 26 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-keys.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 78);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 61);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 27 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_has.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 28 */
/*!*******************************!*\
  !*** ./src/plugins/health.js ***!
  \*******************************/
/*! exports provided: MSG_DAMAGE, MSG_HEAL, Health, HealthSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_DAMAGE", function() { return MSG_DAMAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_HEAL", function() { return MSG_HEAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Health", function() { return Health; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HealthSystem", function() { return HealthSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_get__ = __webpack_require__(/*! babel-runtime/helpers/get */ 36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__spawn__ = __webpack_require__(/*! ./spawn */ 18);









var MSG_DAMAGE = 'healthDamage';
var MSG_HEAL = 'healthHeal';

var health = void 0;

var Health = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Health, _Component);

  function Health() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Health);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Health.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Health)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Health, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        max: 1000,
        current: null,
        show_bar: true
      };
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      var c = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_get___default()(Health.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Health), 'create', this).call(this, attrs);
      c.current = c.max;
      return c;
    }
  }]);

  return Health;
}(__WEBPACK_IMPORTED_MODULE_6__lib_core__["Component"]);

Object(__WEBPACK_IMPORTED_MODULE_6__lib_core__["registerComponent"])('Health', Health);

var HealthSystem = function (_System) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(HealthSystem, _System);

  function HealthSystem() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, HealthSystem);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (HealthSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(HealthSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(HealthSystem, [{
    key: 'initialize',
    value: function initialize() {
      var _this3 = this;

      this.world.subscribe(MSG_DAMAGE, function (msg, data) {
        health = _this3.world.get('Health', data.to);
        if (health) {
          health.current -= data.amount;
        }
      }).subscribe(MSG_HEAL, function (msg, data) {
        health = _this3.world.get('Health', data.to);
        if (health) {
          health.current += data.amount;
        }
      });
    }
  }, {
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Health';
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(timeDelta, entityId, health) {
      if (health.current === null) {
        health.current = health.max;
      }
      if (health.current < 0) {
        this.world.publish(__WEBPACK_IMPORTED_MODULE_7__spawn__["MSG_DESTROY"], entityId);
      }
    }
  }]);

  return HealthSystem;
}(__WEBPACK_IMPORTED_MODULE_6__lib_core__["System"]);

Object(__WEBPACK_IMPORTED_MODULE_6__lib_core__["registerSystem"])('Health', HealthSystem);

/***/ }),
/* 29 */
/*!*******************************!*\
  !*** ./src/plugins/seeker.js ***!
  \*******************************/
/*! exports provided: Seeker, SeekerSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Seeker", function() { return Seeker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeekerSystem", function() { return SeekerSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugins_position__ = __webpack_require__(/*! ../plugins/position */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__plugins_motion__ = __webpack_require__(/*! ../plugins/motion */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__ = __webpack_require__(/*! ../lib/Vector2D */ 37);












var Seeker = function (_Core$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Seeker, _Core$Component);

  function Seeker() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Seeker);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Seeker.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Seeker)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Seeker, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        active: true,
        targetName: null,
        targetEntityId: null,
        targetPosition: null,
        thrusterTurnCutoff: null,
        thrusterTurnThrottle: 0.25,
        acquisitionDelay: 0,
        radPerSec: Math.PI
      };
    }
  }]);

  return Seeker;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["Component"]);

__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerComponent"]('Seeker', Seeker);

var SeekerSystem = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(SeekerSystem, _Core$System);

  function SeekerSystem() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, SeekerSystem);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (SeekerSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(SeekerSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(SeekerSystem, [{
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Seeker';
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.vSeeker = new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */]();
      this.vTarget = new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */]();
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(timeDelta, entityId, seeker) {
      var position = this.world.get('Position', entityId);
      var motion = this.world.get('Motion', entityId);
      if (!position || !motion) {
        return;
      }

      if (!seeker.active) {
        motion.drotation = 0;
        return;
      }

      // Look up the orbited entity ID, if only name given.
      if (seeker.targetName && !seeker.targetEntityId) {
        seeker.targetEntityId = __WEBPACK_IMPORTED_MODULE_5__lib_core__["getComponent"]('Name').findEntityByName(this.world, seeker.targetName);
      }

      // Process a delay before the seeker 'acquires' the target and
      // starts steering. Makes missiles look interesting.
      if (seeker.acquisitionDelay > 0) {
        seeker.acquisitionDelay -= timeDelta;
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

      // Throttle back for sharp turns if necessary
      if (seeker.thrusterTurnCutoff !== null) {
        var thruster = this.world.get('Thruster', entityId);
        thruster.active = true;
        thruster.throttle = offset > seeker.thrusterTurnCutoff ? seeker.thrusterTurnThrottle : 1.0;
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
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["System"]);

__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerSystem"]('Seeker', SeekerSystem);

/***/ }),
/* 30 */
/*!*********************************!*\
  !*** ./src/plugins/thruster.js ***!
  \*********************************/
/*! exports provided: Thruster, ThrusterSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Thruster", function() { return Thruster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThrusterSystem", function() { return ThrusterSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__position__ = __webpack_require__(/*! ./position */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__motion__ = __webpack_require__(/*! ./motion */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__ = __webpack_require__(/*! ../lib/Vector2D */ 37);












var Thruster = function (_Core$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Thruster, _Core$Component);

  function Thruster() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Thruster);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Thruster.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Thruster)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Thruster, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        active: true,
        stop: false,
        useBrakes: true,
        throttle: 1.0,
        deltaV: 0,
        maxV: 0
      };
    }
  }]);

  return Thruster;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["Component"]);
__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerComponent"]('Thruster', Thruster);

var ThrusterSystem = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(ThrusterSystem, _Core$System);

  function ThrusterSystem() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, ThrusterSystem);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ThrusterSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(ThrusterSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(ThrusterSystem, [{
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Thruster';
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.vInertia = new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */]();
      this.vThrust = new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */]();
      this.vBrakes = new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */]();
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
        var maxV = thruster.stop ? 0 : thruster.throttle * thruster.maxV;
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
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["System"]);
__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerSystem"]('Thruster', ThrusterSystem);

/***/ }),
/* 31 */
/*!**************************************!*\
  !*** ./src/plugins/viewportWebGL.js ***!
  \**************************************/
/*! exports provided: ViewportWebGL, WebGLSprite */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewportWebGL", function() { return ViewportWebGL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebGLSprite", function() { return WebGLSprite; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_get__ = __webpack_require__(/*! babel-runtime/helpers/get */ 36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ 168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys__ = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_values__ = __webpack_require__(/*! babel-runtime/core-js/object/values */ 174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_values___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_values__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_assign__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);












var PI2 = Math.PI * 2;

// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
var TYPE_SIZES = {
  0x1406: 1, // FLOAT
  0x8B50: 2, // FLOAT_VEC2
  0x8B51: 3, // FLOAT_VEC3
  0x8B52: 4 // FLOAT_VEC4
};

var entityId = void 0,
    position = void 0,
    sprites = void 0,
    sprite = void 0,
    sceneSprite = void 0;

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

var ViewportWebGL = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits___default()(ViewportWebGL, _Core$System);

  function ViewportWebGL() {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, ViewportWebGL);

    return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ViewportWebGL.__proto__ || __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default()(ViewportWebGL)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(ViewportWebGL, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {
        lineWidth: 2,
        zoom: 1.0,
        zoomMin: 0.1,
        zoomMax: 10.0,
        zoomWheelFactor: 0.05,
        visibleMargin: 250,
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

      this.spriteCount = 0;
      this.lastVertexCount = 0;
      this.actualBufferSize = 0;
      this.calculatedBufferSize = 0;

      this.container = document.querySelector(this.options.container);
      this.canvas = document.createElement('canvas');
      this.container.appendChild(this.canvas);

      this.initWebGL(this.canvas);

      this.scene = {};

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
      this.setCursor(ev.clientX, ev.clientY, true);
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
    value: function update(timeDelta) {
      this.updateMetrics();

      this.setCursor(this.cursorRawX, this.cursorRawY);
      // FIXME: Should be able to skip doing this unless
      // this.cursorChanged === true, but for some reason that's not working
      this.world.publish('mouseMove', this.cursorPosition);

      sprites = this.world.get('Sprite') || {};

      // Delete any stage items not found in sprites, unless they're particles
      // with "_" prefix
      for (entityId in this.scene) {
        if (entityId.charAt(0) !== '_' && !(entityId in sprites)) {
          delete this.scene[entityId];
        }
      }

      this.updateBackdrop(timeDelta);

      // Create items for any sprites not found in stage
      for (entityId in sprites) {
        sprite = sprites[entityId];
        position = this.world.get('Position', entityId);

        if (!(entityId in this.scene)) {
          this.scene[entityId] = {
            position: [0.0, 0.0],
            shapes: WebGLSprite.init(sprite, entityId, timeDelta, this.world)
          };
        }

        sprite.visible = position.right > this.visibleLeft - this.options.visibleMargin && position.left < this.visibleRight + this.options.visibleMargin && position.bottom > this.visibleTop - this.options.visibleMargin && position.top < this.visibleBottom + this.options.visibleMargin;

        sceneSprite = this.scene[entityId];
        sceneSprite.visible = sprite.visible;
        sceneSprite.position[0] = position.x;
        sceneSprite.position[1] = position.y;
        sceneSprite.rotation = position.rotation;
        sceneSprite.scale = sprite.size;
        sceneSprite.color = [
        // TODO: this math is terrible
        sprite.color / 256 / 256 % 256 / 256, sprite.color / 256 % 256 / 256, sprite.color % 256 / 256, 1.0];
        WebGLSprite.update(sceneSprite, sprite, entityId, timeDelta, this.world);
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.followEntity();

      this.canvas.width = this.container.offsetWidth;
      this.canvas.height = this.container.offsetHeight;

      // gl.uniform1f(uniforms.uTime, currDrawTime);
      this.setUniforms({
        uLineWidth: [0.001 * this.lineWidth],
        uCameraZoom: [this.zoom],
        uCameraOrigin: [this.cameraX, this.cameraY],
        uViewportSize: [this.canvas.clientWidth, this.canvas.clientHeight]
      });

      // Re-allocate larger buffer if current is too small for the scene.
      var bufferSize = this.calculateBufferSizeForScene();
      this.actualBufferSize = this.buffer.length;
      this.calculatedBufferSize = bufferSize;
      if (bufferSize > this.buffer.length) {
        this.buffer = new Float32Array(Math.max(bufferSize * 1.5, this.buffer.length * 2));
      }

      var vertexCount = this.fillBufferFromScene();
      this.lastVertexCount = vertexCount;
      this.gl.bufferData(this.gl.ARRAY_BUFFER, this.buffer, this.gl.STATIC_DRAW);
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

      this.gl.clearColor(0, 0, 0, 0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, vertexCount);
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
        this.followEntityId = __WEBPACK_IMPORTED_MODULE_10__lib_core__["getComponent"]('Name').findEntityByName(this.world, this.options.followName);
      }
      if (this.followEntityId) {
        // Adjust the viewport center offset to the entity position
        var _position = this.world.get('Position', this.followEntityId);
        if (_position) {
          this.cameraX = _position.x;
          this.cameraY = _position.y;
          this.setCursor(this.cursorRawX, this.cursorRawY);
        }
      }
    }
  }, {
    key: 'updateBackdrop',
    value: function updateBackdrop() {
      if (!this.gridEnabled) {
        delete this.scene._backdrop;
        return;
      }

      if (!this.scene._backdrop) {
        this.scene._backdrop = {
          visible: true,
          position: [0.0, 0.0],
          color: [1.0, 1.0, 1.0, 0.5],
          scale: 1,
          rotation: Math.PI / 2,
          shapes: []
        };
      }

      var sceneSprite = this.scene._backdrop;

      var gridSize = this.options.gridSize;
      var gridOffsetX = this.visibleLeft % gridSize;
      var gridOffsetY = this.visibleTop % gridSize;

      sceneSprite.position[0] = this.visibleLeft;
      sceneSprite.position[1] = this.visibleTop;
      sceneSprite.shapes.length = 0;

      for (var x = -gridOffsetX; x < this.visibleWidth; x += gridSize) {
        sceneSprite.shapes.push([[x, 0], [x, this.visibleHeight + gridSize]]);
      }
      for (var y = -gridOffsetY; y < this.visibleHeight; y += gridSize) {
        sceneSprite.shapes.push([[0, y], [this.visibleWidth + gridSize, y]]);
      }
    }
  }, {
    key: 'initWebGL',
    value: function initWebGL(canvas) {
      var gl = this.gl = canvas.getContext('webgl', {
        antialias: true,
        preserveDrawingBuffer: true,
        premultipliedAlpha: false
      });

      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.enable(gl.BLEND);
      gl.disable(gl.DEPTH_TEST);

      var program = this.createProgram(this.createShader(gl.VERTEX_SHADER, SHADER_VERTEX), this.createShader(gl.FRAGMENT_SHADER, SHADER_FRAGMENT));
      gl.useProgram(program);

      // Set up for data buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());

      // First pass through attributes to count total vertex size and index by name
      var numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
      var attribs = {};
      var vertexSize = 0;
      for (var i = 0; i < numAttribs; i++) {
        var info = gl.getActiveAttrib(program, i);
        var size = TYPE_SIZES[info.type];
        vertexSize += size;
        attribs[info.name] = i;
      }

      // Second pass through attributes to set up attribute pointers into the buffer
      var pos = 0;
      for (var _i = 0; _i < numAttribs; _i++) {
        var _info = gl.getActiveAttrib(program, _i);
        var _size = TYPE_SIZES[_info.type];
        gl.vertexAttribPointer(_i, _size, gl.FLOAT, false, vertexSize * 4, pos * 4);
        gl.enableVertexAttribArray(_i);
        pos += _size;
      }

      // Index uniform locations by name
      var uniforms = {};
      var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (var _i2 = 0; _i2 < numUniforms; _i2++) {
        var _info2 = gl.getActiveUniform(program, _i2);
        uniforms[_info2.name] = gl.getUniformLocation(program, _info2.name);
      }

      var buffer = new Float32Array(200000);

      __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_assign___default()(this, { gl: gl, uniforms: uniforms, attribs: attribs, vertexSize: vertexSize, buffer: buffer });
    }
  }, {
    key: 'createShader',
    value: function createShader(type, source) {
      var shader = this.gl.createShader(type);
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);
      var success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
      if (success) {
        return shader;
      }

      // console.log('shader', type, 'failed to compile', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
    }
  }, {
    key: 'createProgram',
    value: function createProgram(vertexShader, fragmentShader) {
      var program = this.gl.createProgram();
      this.gl.attachShader(program, vertexShader);
      this.gl.attachShader(program, fragmentShader);
      this.gl.linkProgram(program);
      var success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
      if (success) {
        return program;
      }

      // console.log(this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
    }
  }, {
    key: 'calculateBufferSizeForScene',
    value: function calculateBufferSizeForScene() {
      var _this3 = this;

      var objects = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_values___default()(this.scene);
      this.spriteCount = objects.length;
      return objects.reduce(function (acc, item) {
        return acc + item.shapes.reduce(function (acc, shape) {
          return acc + (shape.length - 0.5) * _this3.vertexSize * 4;
        }, 0);
      }, 0);
    }
  }, {
    key: 'fillBufferFromScene',
    value: function fillBufferFromScene() {
      var _this4 = this;

      var vertexCount = 0;
      var bufferPos = 0;
      var visible = void 0,
          shape = void 0,
          position = void 0,
          scale = void 0,
          rotation = void 0,
          deltaPosition = void 0,
          deltaScale = void 0,
          deltaRotation = void 0,
          color = void 0,
          lineIdx = void 0,
          shapesIdx = void 0,
          shapes = void 0;

      var bufferVertex = function bufferVertex(shapeIdx, lineIdx) {
        vertexCount++;
        _this4.buffer[bufferPos++] = lineIdx;
        _this4.buffer[bufferPos++] = shape[shapeIdx - 1][0];
        _this4.buffer[bufferPos++] = shape[shapeIdx - 1][1];
        _this4.buffer[bufferPos++] = shape[shapeIdx][0];
        _this4.buffer[bufferPos++] = shape[shapeIdx][1];
        _this4.buffer[bufferPos++] = position[0];
        _this4.buffer[bufferPos++] = position[1];
        _this4.buffer[bufferPos++] = scale;
        _this4.buffer[bufferPos++] = rotation;
        _this4.buffer[bufferPos++] = deltaPosition[0];
        _this4.buffer[bufferPos++] = deltaPosition[1];
        _this4.buffer[bufferPos++] = deltaScale;
        _this4.buffer[bufferPos++] = deltaRotation;
        _this4.buffer[bufferPos++] = color[0];
        _this4.buffer[bufferPos++] = color[1];
        _this4.buffer[bufferPos++] = color[2];
        _this4.buffer[bufferPos++] = color[3];
      };

      var sceneKeys = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default()(this.scene).sort();
      for (var sceneKeysIdx = 0; sceneKeysIdx < sceneKeys.length; sceneKeysIdx++) {
        var _scene$sceneKeys$scen = this.scene[sceneKeys[sceneKeysIdx]];
        visible = _scene$sceneKeys$scen.visible;
        shapes = _scene$sceneKeys$scen.shapes;
        var _scene$sceneKeys$scen2 = _scene$sceneKeys$scen.position;
        position = _scene$sceneKeys$scen2 === undefined ? [0.0, 0.0] : _scene$sceneKeys$scen2;
        var _scene$sceneKeys$scen3 = _scene$sceneKeys$scen.scale;
        scale = _scene$sceneKeys$scen3 === undefined ? 0 : _scene$sceneKeys$scen3;
        var _scene$sceneKeys$scen4 = _scene$sceneKeys$scen.rotation;
        rotation = _scene$sceneKeys$scen4 === undefined ? 0 : _scene$sceneKeys$scen4;
        var _scene$sceneKeys$scen5 = _scene$sceneKeys$scen.deltaPosition;
        deltaPosition = _scene$sceneKeys$scen5 === undefined ? [0.0, 0.0] : _scene$sceneKeys$scen5;
        var _scene$sceneKeys$scen6 = _scene$sceneKeys$scen.deltaScale;
        deltaScale = _scene$sceneKeys$scen6 === undefined ? 0.0 : _scene$sceneKeys$scen6;
        var _scene$sceneKeys$scen7 = _scene$sceneKeys$scen.deltaRotation;
        deltaRotation = _scene$sceneKeys$scen7 === undefined ? 0.0 : _scene$sceneKeys$scen7;
        var _scene$sceneKeys$scen8 = _scene$sceneKeys$scen.color;
        color = _scene$sceneKeys$scen8 === undefined ? [1, 1, 1, 1] : _scene$sceneKeys$scen8;

        if (!visible) {
          continue;
        }
        for (shapesIdx = 0; shapesIdx < shapes.length; shapesIdx++) {
          shape = shapes[shapesIdx];
          bufferVertex(1, 0);
          for (lineIdx = 1; lineIdx < shape.length; lineIdx += 1) {
            bufferVertex(lineIdx, 0);
            bufferVertex(lineIdx, 1);
            bufferVertex(lineIdx, 2);
            bufferVertex(lineIdx, 3);
          }
          bufferVertex(shape.length - 1, 3);
        }
      }

      return vertexCount;
    }
  }, {
    key: 'setUniforms',
    value: function setUniforms(data) {
      var _this5 = this;

      __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default()(data).forEach(function (key) {
        var _gl$;

        return (_gl$ = _this5.gl['uniform' + data[key].length + 'f']).call.apply(_gl$, [_this5.gl, _this5.uniforms[key]].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(data[key])));
      });
    }
  }]);

  return ViewportWebGL;
}(__WEBPACK_IMPORTED_MODULE_10__lib_core__["System"]);

__WEBPACK_IMPORTED_MODULE_10__lib_core__["registerSystem"]('ViewportWebGL', ViewportWebGL);

var WebGLSprite = function (_Core$Component) {
  __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits___default()(WebGLSprite, _Core$Component);

  function WebGLSprite() {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, WebGLSprite);

    return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn___default()(this, (WebGLSprite.__proto__ || __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default()(WebGLSprite)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(WebGLSprite, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        name: null,
        color: 0xffffff,
        size: 100,
        width: null,
        height: null,
        drawn: false,
        visible: false
      };
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      var c = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_get___default()(WebGLSprite.__proto__ || __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default()(WebGLSprite), 'create', this).call(this, attrs);
      if (!c.width) {
        c.width = c.size;
      }
      if (!c.height) {
        c.height = c.size;
      }
      return c;
    }
  }, {
    key: 'register',
    value: function register(name, handler) {
      if (!WebGLSprite.registry) {
        WebGLSprite.registry = {};
      }
      WebGLSprite.registry[name] = handler;
    }
  }, {
    key: 'getHandler',
    value: function getHandler(name) {
      return name in WebGLSprite.registry ? WebGLSprite.registry[name] : WebGLSprite.registry.default;
    }
  }, {
    key: 'init',
    value: function init(sprite, entityId, timeDelta, world) {
      return WebGLSprite.getHandler(sprite.name).init(sprite, entityId, timeDelta, world);
    }
  }, {
    key: 'update',
    value: function update(sceneSprite, sprite, entityId, timeDelta, world) {
      var handler = WebGLSprite.getHandler(sprite.name);
      return 'update' in handler ? handler.update(sceneSprite, sprite, entityId, timeDelta, world) : false;
    }
  }]);

  return WebGLSprite;
}(__WEBPACK_IMPORTED_MODULE_10__lib_core__["Component"]);

__WEBPACK_IMPORTED_MODULE_10__lib_core__["registerComponent"]('Sprite', WebGLSprite);

var defaultShape = [[-0.5, 0], [0.5, 0], [0, 0], [0, -0.5], [0, 0.5], [0, 0]];
for (var idx = 0; idx < 8; idx++) {
  var rot = idx * (PI2 / 8);
  defaultShape.push([0.5 * Math.cos(rot), 0.5 * Math.sin(rot)]);
}
defaultShape.push([0.5, 0]);

WebGLSprite.register('default', {
  init: function init() {
    return defaultShape;
  }
});

var heroShapes = [[[0.0, 0.5], [0.125, 0.4167], [0.25, 0.0], [0.375, -0.1667], [0.25, -0.5], [0.125, -0.5], [0.0625, -0.25], [-0.0625, -0.25], [-0.125, -0.5], [-0.25, -0.5], [-0.375, -0.1667], [-0.25, 0.0], [-0.125, 0.4167], [0.0, 0.5]]];
WebGLSprite.register('hero', {
  init: function init() {
    return heroShapes;
  }
});

var repulsorSides = 8;
var repulsorPoints = [];
for (var _idx = 0; _idx < repulsorSides; _idx++) {
  var _rot = _idx * (PI2 / repulsorSides);
  repulsorPoints.push([Math.cos(_rot), Math.sin(_rot)]);
}
repulsorPoints.push(repulsorPoints[0]);

var repulsorShapes = [repulsorPoints.map(function (p) {
  return [p[0] * 1, p[1] * 1];
}), repulsorPoints.map(function (p) {
  return [p[0] * 2, p[1] * 2];
}), repulsorPoints.map(function (p) {
  return [p[0] * 3, p[1] * 3];
}), [[-0.50, 0.0], [-0.375, -0.50], [-0.25, -0.50], [-0.0625, 0.25], [0.0625, 0.25], [0.25, -0.50], [0.375, -0.50], [0.50, 0.0], [0.375, 0.50], [0.25, 0.50], [0.0625, -0.25], [-0.0625, -0.25], [-0.25, 0.50], [-0.375, 0.50], [-0.50, 0.0]]];
WebGLSprite.register('repulsor', {
  init: function init() {
    return repulsorShapes;
  }
});

WebGLSprite.register('asteroid', {
  init: function init(sprite) {
    var NUM_POINTS = 7 + Math.floor(8 * Math.random());
    var MAX_RADIUS = 0.50;
    var MIN_RADIUS = 0.35;
    var ROTATION = PI2 / NUM_POINTS;

    sprite.shape = [];
    for (var _idx2 = 0; _idx2 < NUM_POINTS; _idx2++) {
      var _rot2 = _idx2 * ROTATION;
      var dist = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
      sprite.shape.push([dist * Math.cos(_rot2), dist * Math.sin(_rot2)]);
    }

    sprite.shape.push(sprite.shape[0]);
    return [sprite.shape];
  }
});

WebGLSprite.register('mine', {
  init: function init(sprite) {
    var NUM_POINTS = 10 + Math.floor(10 * Math.random());
    if (NUM_POINTS % 2 !== 0) {
      NUM_POINTS++;
    }
    var ROTATION = PI2 / NUM_POINTS;
    var MAX_RADIUS = 0.6;
    var MIN_RADIUS = 0.1;

    var even = false;

    sprite.legs = [];
    for (var _idx3 = 0; _idx3 < NUM_POINTS; _idx3++) {
      var dist = even ? 0.1 : Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
      var _rot3 = _idx3 * ROTATION;
      sprite.legs.push([dist * Math.cos(_rot3), dist * Math.sin(_rot3)]);
      even = !even;
    }
    sprite.legs.push([sprite.legs[0][0], sprite.legs[0][1]]);
    sprite.shape = sprite.legs;
    sprite.drawn = true;

    return [sprite.shape];
  },
  update: function update() /* sceneSprite, sprite, entityId, timeDelta, world */{
    /*
    if (sprite.drawn && Math.random() < 0.15) {
      sceneSprite.shape = sprite.legs.map(p => [
        p[0] * (0.9 + 0.5 * Math.random()),
        p[1] * (0.9 + 0.5 * Math.random())
      ]);
    }
    */
  }
});

var SHADER_VERTEX = '\n// see also: http://m1el.github.io/woscope-how/\nprecision mediump float;\n#define EPS 1E-6\n#define PI 3.141592653589793\n#define PI_2 6.283185307179586\n#define PI_H 1.5707963267948966\n#define PI_Q 0.7853981633974483\n\nuniform float uTime;\nuniform float uLineWidth;\nuniform float uCameraZoom;\nuniform float uCameraRotation;\nuniform vec2 uCameraOrigin;\nuniform vec2 uViewportSize;\n\nattribute float aIdx;\nattribute vec4 aLine;\nattribute vec4 aTransform;\nattribute vec4 aDeltaTransform;\nattribute vec4 aColor;\n\nvarying vec4 uvl;\nvarying vec4 vColor;\nvarying float vLen;\n\nvoid main () {\n  float c, s;\n\n  mat3 mViewportToClipSpace = mat3(\n    2.0 / uViewportSize.x, 0, 0,\n    0, -2.0 / uViewportSize.y, 0,\n    0, 0, 0\n  );\n\n  c = cos(uCameraRotation);\n  s = sin(uCameraRotation);\n  mat3 mCameraRotation = mat3(\n    c, -s, 0.0,\n    s, c, 0.0,\n    0.0, 0.0, 1.0\n  );\n\n  mat3 mCameraOrigin = mat3(\n    1.0, 0.0, 0.0,\n    0.0, 1.0, 0.0,\n    -uCameraOrigin.x, -uCameraOrigin.y, 1.0\n  );\n\n  mat3 mCameraZoom = mat3(\n    uCameraZoom, 0.0, 0.0,\n    0.0, uCameraZoom, 0.0,\n    0.0, 0.0, 1.0\n  );\n\n  c = cos(-aTransform.w + PI_H + (aDeltaTransform.w * uTime));\n  s = sin(-aTransform.w + PI_H + (aDeltaTransform.w * uTime));\n  mat3 mRotation = mat3(\n    c, -s, 0.0,\n    s, c, 0.0,\n    0.0, 0.0, 1.0\n  );\n\n  mat3 mPosition = mat3(\n    1.0, 0.0, 0.0,\n    0.0, 1.0, 0.0,\n    aTransform.x + (aDeltaTransform.x * uTime), aTransform.y + (aDeltaTransform.y * uTime), 1.0\n  );\n\n  mat3 mScale = mat3(\n    aTransform.z + (aDeltaTransform.z * uTime), 0.0, 0.0,\n    0.0, aTransform.z + (aDeltaTransform.z * uTime), 0.0,\n    0.0, 0.0, 1.0\n  );\n\n  // TODO: Move some of these matrices into JS?\n  mat3 mAll = mViewportToClipSpace\n    * mCameraZoom * mCameraRotation * mCameraOrigin\n    * mPosition * mScale * mRotation;\n\n  vec2 tStart = (mAll * vec3(aLine.xy, 1)).xy;\n  vec2 tEnd = (mAll * vec3(aLine.zw, 1)).xy;\n\n  float tang;\n  vec2 current;\n  float idx = aIdx;\n  if (idx >= 2.0) {\n    current = tEnd;\n    tang = 1.0;\n  } else {\n    current = tStart;\n    tang = -1.0;\n  }\n\n  float side = (mod(idx, 2.0)-0.5)*2.0;\n  vec2 dir = tEnd-tStart;\n\n  vColor = aColor;\n\n  uvl.xy = vec2(tang, side);\n  uvl.w = floor(aIdx / 4.0 + 0.5);\n  uvl.z = length(dir);\n  if (uvl.z > EPS) {\n    dir = dir / uvl.z;\n  } else {\n    // If the segment is too short draw a square;\n    dir = vec2(1.0, 0.0);\n  }\n  vec2 norm = vec2(-dir.y, dir.x);\n  gl_Position = vec4((current+(tang*dir+norm*side)*uLineWidth),0.0,1.0);\n}\n';

var SHADER_FRAGMENT = '\nprecision mediump float;\nvarying vec4 vColor;\n\nvoid main (void)\n{\n    gl_FragColor = vColor;\n}\n';

/***/ }),
/* 32 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-object.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 57);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 33 */
/*!*******************************!*\
  !*** ./src/plugins/bounce.js ***!
  \*******************************/
/*! exports provided: BounceComponent, BounceSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BounceComponent", function() { return BounceComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BounceSystem", function() { return BounceSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__position__ = __webpack_require__(/*! ./position */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__motion__ = __webpack_require__(/*! ./motion */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__health__ = __webpack_require__(/*! ./health */ 28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_Vector2D__ = __webpack_require__(/*! ../lib/Vector2D */ 37);













var BounceComponent = function (_Core$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(BounceComponent, _Core$Component);

  function BounceComponent() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, BounceComponent);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (BounceComponent.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(BounceComponent)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(BounceComponent, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        mass: 1000.0
      };
    }
  }]);

  return BounceComponent;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["Component"]);

__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerComponent"]('Bounce', BounceComponent);

var BounceSystem = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(BounceSystem, _Core$System);

  function BounceSystem() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, BounceSystem);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (BounceSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(BounceSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(BounceSystem, [{
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Bounce';
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.dn = new __WEBPACK_IMPORTED_MODULE_9__lib_Vector2D__["a" /* default */]();
      this.dt = new __WEBPACK_IMPORTED_MODULE_9__lib_Vector2D__["a" /* default */]();
      this.mt = new __WEBPACK_IMPORTED_MODULE_9__lib_Vector2D__["a" /* default */]();
      this.v1 = new __WEBPACK_IMPORTED_MODULE_9__lib_Vector2D__["a" /* default */]();
      this.v2 = new __WEBPACK_IMPORTED_MODULE_9__lib_Vector2D__["a" /* default */]();
      this.v1n = new __WEBPACK_IMPORTED_MODULE_9__lib_Vector2D__["a" /* default */]();
      this.v1t = new __WEBPACK_IMPORTED_MODULE_9__lib_Vector2D__["a" /* default */]();
      this.v2n = new __WEBPACK_IMPORTED_MODULE_9__lib_Vector2D__["a" /* default */]();
      this.v2t = new __WEBPACK_IMPORTED_MODULE_9__lib_Vector2D__["a" /* default */]();
    }
  }, {
    key: 'update',
    value: function update(timeDelta) {
      var entities = this.world;
      var matches = this.getMatchingComponents();

      var pairs = {};
      for (var aEntityId in matches) {

        // const bounce = matches[aEntityId];
        var aCollidable = entities.get('Collidable', aEntityId);

        for (var bEntityId in aCollidable.inCollisionWith) {
          var pair = [aEntityId, bEntityId];
          pair.sort();
          pairs[pair.join(':')] = pair;
        }

        // TODO: Process world boundary edge bounce?
      }

      for (var key in pairs) {
        var _aEntityId = pairs[key][0];
        var aBouncer = entities.get('Bounce', _aEntityId);
        if (!aBouncer) {
          continue;
        }

        var _bEntityId = pairs[key][1];
        var bBouncer = entities.get('Bounce', _bEntityId);
        if (!bBouncer) {
          continue;
        }

        this.resolveElasticCollision(timeDelta, _aEntityId, aBouncer, _bEntityId, bBouncer);
      }
    }

    // See also:
    // http://en.m.wikipedia.org/wiki/Elastic_collision
    // http://en.m.wikipedia.org/wiki/Dot_product
    // https://github.com/Edifear/volleyball/blob/master/collision.html
    // https://github.com/DominikWidomski/Processing/blob/master/sketch_canvas_red_particles/particles.pde#L47

  }, {
    key: 'resolveElasticCollision',
    value: function resolveElasticCollision(timeDelta, aEntityId, aBouncer, bEntityId, bBouncer) {

      var entities = this.world;

      var aPosition = entities.get('Position', aEntityId);
      var aSprite = entities.get('Sprite', aEntityId);
      var aMotion = entities.get('Motion', aEntityId);

      var bPosition = entities.get('Position', bEntityId);
      var bSprite = entities.get('Sprite', bEntityId);
      var bMotion = entities.get('Motion', bEntityId);

      // First, back both entities off to try to prevent sticking
      /*
      aPosition.x -= aMotion.dx * timeDelta;
      aPosition.y -= aMotion.dy * timeDelta;
      bPosition.x -= bMotion.dx * timeDelta;
      bPosition.y -= bMotion.dy * timeDelta;
      const radii, dx, dy;
      while (true) {
        aPosition.x -= aMotion.dx * timeDelta;
        aPosition.y -= aMotion.dy * timeDelta;
        bPosition.x -= bMotion.dx * timeDelta;
        bPosition.y -= bMotion.dy * timeDelta;
          radii = (aSprite.size + bSprite.size) / 2;
        dx = aPosition.x - bPosition.x;
        dy = aPosition.y - bPosition.y;
        if (dx*dx + dy*dy > radii*radii) { break; }
      }
      */

      // Vector between entities
      this.dn.setValues(aPosition.x - bPosition.x, aPosition.y - bPosition.y);

      // Distance between entities
      var delta = this.dn.magnitude();

      // Normal vector of the collision plane
      this.dn.normalize();

      // Tangential vector of the collision plane
      this.dt.setValues(this.dn.y, -this.dn.x);

      // HACK: avoid divide by zero
      if (delta === 0) {
        bPosition.x += 0.01;
      }

      // Get total mass for entities
      var m1 = aBouncer.mass;
      var m2 = bBouncer.mass;
      var M = m1 + m2;

      // Minimum translation vector to push entities apart
      this.mt.setValues(this.dn.x * (aSprite.width + bSprite.width - delta) * 1.1, this.dn.y * (aSprite.height + bSprite.height - delta) * 1.1);

      // Velocity vectors of entities before collision
      this.v1.setValues(aMotion ? aMotion.dx : 0, aMotion ? aMotion.dy : 0);
      this.v2.setValues(bMotion ? bMotion.dx : 0, bMotion ? bMotion.dy : 0);

      // split the velocity vector of the first entity into a normal
      // and a tangential component in respect of the collision plane
      this.v1n.setValues(this.dn.x * this.v1.dot(this.dn), this.dn.y * this.v1.dot(this.dn));
      this.v1t.setValues(this.dt.x * this.v1.dot(this.dt), this.dt.y * this.v1.dot(this.dt));

      // split the velocity vector of the second entity into a normal
      // and a tangential component in respect of the collision plane
      this.v2n.setValues(this.dn.x * this.v2.dot(this.dn), this.dn.y * this.v2.dot(this.dn));
      this.v2t.setValues(this.dt.x * this.v2.dot(this.dt), this.dt.y * this.v2.dot(this.dt));

      // calculate new velocity vectors of the entities, the tangential
      // component stays the same, the normal component changes analog to
      // the 1-Dimensional case

      if (aMotion) {
        var aFactor = (m1 - m2) / M * this.v1n.magnitude() + 2 * m2 / M * this.v2n.magnitude();
        aMotion.dx = this.v1t.x + this.dn.x * aFactor;
        aMotion.dy = this.v1t.y + this.dn.y * aFactor;
        this.processDamage(aEntityId, bEntityId, aMotion, aBouncer, m1);
      }

      if (bMotion) {
        var bFactor = (m2 - m1) / M * this.v2n.magnitude() + 2 * m1 / M * this.v1n.magnitude();
        bMotion.dx = this.v2t.x - this.dn.x * bFactor;
        bMotion.dy = this.v2t.y - this.dn.y * bFactor;
        this.processDamage(bEntityId, aEntityId, bMotion, bBouncer, m1);
      }
    }
  }, {
    key: 'processDamage',
    value: function processDamage(eid, c_eid, v_motion, bouncer, m1) {
      if (!bouncer.damage) {
        return;
      }

      // Convert a fraction of the rebound velocity into damage by mass
      var dmg = Math.sqrt(v_motion.dx * v_motion.dx + v_motion.dy * v_motion.dy) * bouncer.damage * m1;

      this.world.publish(__WEBPACK_IMPORTED_MODULE_8__health__["MSG_DAMAGE"], {
        to: eid,
        from: c_eid,
        amount: dmg / 2
      });

      this.world.publish(__WEBPACK_IMPORTED_MODULE_8__health__["MSG_DAMAGE"], {
        to: c_eid,
        from: eid,
        amount: dmg / 2
      });
    }
  }]);

  return BounceSystem;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["System"]);

__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerSystem"]('Bounce', BounceSystem);

/***/ }),
/* 34 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.string.iterator.js ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ 110)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 64)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 35 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iterators.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 36 */
/*!***************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/get.js ***!
  \***************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(/*! ../core-js/object/get-prototype-of */ 3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(/*! ../core-js/object/get-own-property-descriptor */ 131);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
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

/***/ }),
/* 37 */
/*!*****************************!*\
  !*** ./src/lib/Vector2D.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Vector2D;
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

/***/ }),
/* 38 */
/*!**********************************!*\
  !*** ./src/plugins/collision.js ***!
  \**********************************/
/*! exports provided: Collidable, CollisionSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collidable", function() { return Collidable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollisionSystem", function() { return CollisionSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);







var Collidable = function (_Core$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Collidable, _Core$Component);

  function Collidable() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Collidable);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Collidable.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Collidable)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Collidable, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        inCollision: false,
        inCollisionWith: {}
      };
    }
  }]);

  return Collidable;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["Component"]);

__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerComponent"]('Collidable', Collidable);

var match = void 0,
    matches = void 0,
    entityId = void 0,
    entityId2 = void 0,
    position = void 0,
    aCollidable = void 0,
    bCollidable = void 0,
    dx = void 0,
    dy = void 0,
    radii = void 0;

var CollisionSystem = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(CollisionSystem, _Core$System);

  function CollisionSystem() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, CollisionSystem);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (CollisionSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(CollisionSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(CollisionSystem, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {
        positionSystemName: 'Position'
      };
    }
  }, {
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Collidable';
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this3 = this;

      this.positionSystem = this.world.getSystem(this.options.positionSystemName);
      this.width = this.options.width;
      this.height = this.options.height;
      this.retrieveBounds = {};
      this.checkCollisionBound = function (neighbor, component) {
        return _this3.checkCollision(neighbor, component);
      };
    }
  }, {
    key: 'update',
    value: function update() /* timeDelta */{
      matches = this.getMatchingComponents();
      for (entityId in matches) {
        match = matches[entityId];
        match.inCollision = false;
        for (entityId2 in match.inCollisionWith) {
          delete match.inCollisionWith[entityId2];
        }
      }
      for (entityId in matches) {
        position = this.world.get('Position', entityId);
        if (position) {
          this.positionSystem.quadtree.iterate(position, this.checkCollisionBound, position);
        }
      }
    }
  }, {
    key: 'checkCollision',
    value: function checkCollision(bPosition, aPosition) {
      if (aPosition.entityId === bPosition.entityId) {
        return;
      }

      aCollidable = this.world.get('Collidable', aPosition.entityId);
      bCollidable = this.world.get('Collidable', bPosition.entityId);

      if (!aCollidable || !bCollidable) {
        return;
      }

      dx = aPosition.x - bPosition.x;
      dy = aPosition.y - bPosition.y;

      // TODO: Pluggable shape intersection detection here?

      // Check collision circle via distance
      radii = (aPosition.width + bPosition.width) / 2;
      if (dx * dx + dy * dy > radii * radii) {
        return;
      }

      aCollidable.inCollision = true;
      aCollidable.inCollisionWith[bPosition.entityId] = 1;

      bCollidable.inCollision = true;
      bCollidable.inCollisionWith[aPosition.entityId] = 1;
    }
  }, {
    key: 'draw',
    value: function draw() /* timeDelta */{
      var g = this.getDebugGraphics();
      if (!g) {
        return;
      }

      g.lineStyle(4, 0x999999);
      var collidables = this.world.get('Collidable');
      for (var _entityId in collidables) {
        var collidable = collidables[_entityId];
        var _position = this.world.get('Position', _entityId);

        if (collidable.inCollision) {
          g.drawCircle(_position.x, _position.y, 40);
        }
      }
    }
  }]);

  return CollisionSystem;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["System"]);

__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerSystem"]('Collision', CollisionSystem);

/***/ }),
/* 39 */
/*!********************************************!*\
  !*** ./src/plugins/playerInputSteering.js ***!
  \********************************************/
/*! exports provided: PlayerInputSteering, PlayerInputSteeringSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerInputSteering", function() { return PlayerInputSteering; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerInputSteeringSystem", function() { return PlayerInputSteeringSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_get__ = __webpack_require__(/*! babel-runtime/helpers/get */ 36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);









var PlayerInputSteering = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(PlayerInputSteering, _Component);

  function PlayerInputSteering() {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, PlayerInputSteering);

    return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PlayerInputSteering.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(PlayerInputSteering)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(PlayerInputSteering, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        active: true,
        radPerSec: Math.PI * 2
      };
    }
  }]);

  return PlayerInputSteering;
}(__WEBPACK_IMPORTED_MODULE_7__lib_core__["Component"]);

Object(__WEBPACK_IMPORTED_MODULE_7__lib_core__["registerComponent"])('PlayerInputSteering', PlayerInputSteering);

var PI2 = Math.PI * 2;

var PlayerInputSteeringSystem = function (_System) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(PlayerInputSteeringSystem, _System);

  function PlayerInputSteeringSystem() {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, PlayerInputSteeringSystem);

    return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PlayerInputSteeringSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(PlayerInputSteeringSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(PlayerInputSteeringSystem, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {
        gamepadDeadzone: 0.2
      };
    }
  }, {
    key: 'matchComponent',
    value: function matchComponent() {
      return 'PlayerInputSteering';
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this3 = this;

      this.gamepad = { active: false };
      this.pointer = { active: false, x: 0, y: 0 };
      this.keys = { active: false };
      this.touch = { active: false, x: 0, y: 0 };

      this.world.subscribe('mouseDown', function (msg, cursorPosition) {
        return _this3.setPointer(true, cursorPosition);
      }).subscribe('mouseUp', function (msg, cursorPosition) {
        return _this3.setPointer(false, cursorPosition);
      }).subscribe('mouseMove', function (msg, cursorPosition) {
        return _this3.setPointer(_this3.pointer.active, cursorPosition);
      });

      var windowEvents = {
        keydown: this.handleKeyDown,
        keyup: this.handleKeyUp
      };
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(windowEvents).forEach(function (k) {
        return window.addEventListener(k, windowEvents[k].bind(_this3));
      });
    }
  }, {
    key: 'setPointer',
    value: function setPointer(active, position) {
      this.pointer.active = active;
      this.pointer.x = position.x;
      this.pointer.y = position.y;
    }
  }, {
    key: 'update',
    value: function update(timeDelta) {
      this.updateGamepads(timeDelta);
      this.updateKeyboard(timeDelta);
      __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_get___default()(PlayerInputSteeringSystem.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(PlayerInputSteeringSystem.prototype), 'update', this).call(this, timeDelta);
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(timeDelta, entityId, steering) {
      var thruster = this.world.get('Thruster', entityId);
      var motion = this.world.get('Motion', entityId);

      thruster.active = true;
      thruster.stop = false;

      if (this.keys.active) {
        return this.updateComponentFromKeyboard(timeDelta, entityId, steering);
      }

      if (this.pointer.active) {
        return this.updateComponentFromPointer(timeDelta, entityId, steering);
      }

      if (this.gamepad.active) {
        return this.updateComponentFromGamepad(timeDelta, entityId, steering);
      }

      thruster.stop = true;
      motion.drotation = 0;
    }
  }, {
    key: 'updateComponentFromPointer',
    value: function updateComponentFromPointer(timeDelta, entityId, steering) {
      var position = this.world.get('Position', entityId);
      this.updateMotionFromTargetAngle(timeDelta, entityId, steering, Math.atan2(this.pointer.y - position.y, this.pointer.x - position.x));
    }
  }, {
    key: 'updateComponentFromGamepad',
    value: function updateComponentFromGamepad(timeDelta, entityId, steering) {
      this.updateMotionFromTargetAngle(timeDelta, entityId, steering, Math.atan2(this.gamepad.axis1, this.gamepad.axis0));
    }
  }, {
    key: 'updateComponentFromKeyboard',
    value: function updateComponentFromKeyboard(timeDelta, entityId, steering) {
      var thruster = this.world.get('Thruster', entityId);
      var motion = this.world.get('Motion', entityId);

      var dleft = this.keys[65] || this.keys[37] || this.gamepad.button13;
      var dright = this.keys[68] || this.keys[39] || this.gamepad.button14;
      var dup = this.keys[87] || this.keys[38] || this.gamepad.button11;
      // const ddown  = (this.keys[83] || this.keys[40] || this.gamepad.button12);

      if (dup) {
        thruster.active = true;
      } else {
        thruster.stop = true;
      }

      var direction = dleft ? -1 : dright ? 1 : 0;
      var targetDr = direction * steering.radPerSec;
      motion.drotation = targetDr;
    }
  }, {
    key: 'updateGamepads',
    value: function updateGamepads() {
      var _this4 = this;

      var gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

      // TODO: specify which gamepad, i.e. for multiplayer
      for (var i = 0; i < gamepads.length; i++) {
        var gp = gamepads[i];
        if (!gp || !gp.connected) continue;
        gp.buttons.forEach(function (val, idx) {
          return _this4.gamepad['button' + idx] = val.pressed;
        });
        gp.axes.forEach(function (val, idx) {
          return _this4.gamepad['axis' + idx] = val;
        });
        break; // stop after the first gamepad
      }

      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(this.gamepad).forEach(function (k) {
        if (!_this4.gamepad[k]) {
          delete _this4.gamepad[k];
        }
      });

      var axisX = this.gamepad.axis0;
      var axisY = this.gamepad.axis1;
      this.gamepad.active = (Math.abs(axisX) > 0 || Math.abs(axisY) > 0) && Math.sqrt(axisX * axisX + axisY * axisY) > this.options.gamepadDeadzone;
    }
  }, {
    key: 'updateKeyboard',
    value: function updateKeyboard() {
      var dleft = this.keys[65] || this.keys[37] || this.gamepad.button13;
      var dright = this.keys[68] || this.keys[39] || this.gamepad.button14;
      var dup = this.keys[87] || this.keys[38] || this.gamepad.button11;
      var ddown = this.keys[83] || this.keys[40] || this.gamepad.button12;

      this.keys.active = dleft || dright || dup || ddown;
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(ev) {
      this.keys[ev.keyCode] = true;
      ev.preventDefault();
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(ev) {
      delete this.keys[ev.keyCode];
      ev.preventDefault();
    }
  }, {
    key: 'updateMotionFromTargetAngle',
    value: function updateMotionFromTargetAngle(timeDelta, entityId, steering, targetAngleRaw) {
      var position = this.world.get('Position', entityId);
      var motion = this.world.get('Motion', entityId);

      var targetAngle = targetAngleRaw < 0 ? targetAngleRaw + PI2 : targetAngleRaw;

      // Pick the direction from current to target angle
      var direction = targetAngle < position.rotation ? -1 : 1;

      // If the offset between the angles is more than half a circle, go
      // the other way because it'll be shorter.
      var offset = Math.abs(targetAngle - position.rotation);
      if (offset > Math.PI) {
        direction = 0 - direction;
      }

      // Work out the desired delta-rotation to steer toward target
      var targetDr = direction * Math.min(steering.radPerSec, offset / timeDelta);

      // Calculate the delta-rotation impulse required to meet the goal,
      // but constrain to the capability of the steering thrusters
      var impulseDr = targetDr - motion.drotation;
      if (Math.abs(impulseDr) > steering.radPerSec) {
        if (impulseDr > 0) {
          impulseDr = steering.radPerSec;
        } else if (impulseDr < 0) {
          impulseDr = 0 - steering.radPerSec;
        }
      }

      motion.drotation += impulseDr;
    }
  }]);

  return PlayerInputSteeringSystem;
}(__WEBPACK_IMPORTED_MODULE_7__lib_core__["System"]);

Object(__WEBPACK_IMPORTED_MODULE_7__lib_core__["registerSystem"])('PlayerInputSteering', PlayerInputSteeringSystem);

/***/ }),
/* 40 */
/*!*************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/assign.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/assign */ 98), __esModule: true };

/***/ }),
/* 41 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_property-desc.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 42 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-pie.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 43 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/web.dom.iterable.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./es6.array.iterator */ 114);
var global = __webpack_require__(/*! ./_global */ 12);
var hide = __webpack_require__(/*! ./_hide */ 15);
var Iterators = __webpack_require__(/*! ./_iterators */ 35);
var TO_STRING_TAG = __webpack_require__(/*! ./_wks */ 9)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 44 */
/*!***********************************!*\
  !*** ./src/plugins/hordeSpawn.js ***!
  \***********************************/
/*! exports provided: HordeSpawn, HordeSpawnSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HordeSpawn", function() { return HordeSpawn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HordeSpawnSystem", function() { return HordeSpawnSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__spawn__ = __webpack_require__(/*! ./spawn */ 18);










// Commonly used temp variables, pre-declared early.
var entityId = void 0,
    matches = void 0,
    sprite = void 0;

var HordeSpawn = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(HordeSpawn, _Component);

  function HordeSpawn() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, HordeSpawn);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (HordeSpawn.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(HordeSpawn)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(HordeSpawn, null, [{
    key: 'defaults',
    value: function defaults() {
      return { age: 0 };
    }
  }]);

  return HordeSpawn;
}(__WEBPACK_IMPORTED_MODULE_6__lib_core__["Component"]);

Object(__WEBPACK_IMPORTED_MODULE_6__lib_core__["registerComponent"])('HordeSpawn', HordeSpawn);

var HordeSpawnSystem = function (_System) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(HordeSpawnSystem, _System);

  function HordeSpawnSystem() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, HordeSpawnSystem);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (HordeSpawnSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(HordeSpawnSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(HordeSpawnSystem, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {
        viewportSystemName: 'ViewportPixi',
        minCount: 100,
        maxFrameSpawn: 50,
        offscreenTTL: 1.0,
        spawnMargin: 100,
        spawn: function spawn() {}
      };
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.spawnCount = 0;
      this.viewportSystem = this.world.getSystem(this.options.viewportSystemName);
    }
  }, {
    key: 'matchComponent',
    value: function matchComponent() {
      return 'HordeSpawn';
    }
  }, {
    key: 'update',
    value: function update(timeDelta) {
      matches = this.getMatchingComponents() || {};
      this.spawnCount = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(matches).length;
      if (this.spawnCount < this.options.minCount) {
        var cnt = Math.max(this.options.maxFrameSpawn, this.options.minCount - this.spawnCount);
        for (var i = 0; i < cnt; i++) {
          this.spawnOffscreen();
        }
      }
      for (entityId in matches) {
        this.updateComponent(timeDelta, entityId, matches[entityId]);
      }
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(timeDelta, entityId, hordespawn) {
      sprite = this.world.get('Sprite', entityId);
      if (sprite.visible) {
        hordespawn.age = 0;
      } else {
        hordespawn.age += timeDelta;
        if (hordespawn.age >= this.options.offscreenTTL) {
          this.world.publish(__WEBPACK_IMPORTED_MODULE_7__spawn__["MSG_DESTROY"], entityId);
        }
      }
    }
  }, {
    key: 'spawnOffscreen',
    value: function spawnOffscreen() {
      var _viewportSystem = this.viewportSystem,
          visibleLeft = _viewportSystem.visibleLeft,
          visibleRight = _viewportSystem.visibleRight,
          visibleTop = _viewportSystem.visibleTop,
          visibleBottom = _viewportSystem.visibleBottom;

      var margin = this.options.spawnMargin;
      var w = visibleRight + margin - (visibleLeft - margin);
      var h = visibleBottom + margin - (visibleTop - margin);
      var r = Math.random();

      var x = void 0,
          y = void 0;

      if (r < 0.5) {
        y = visibleTop - margin + Math.random() * h;
      } else {
        x = visibleLeft - margin + Math.random() * w;
      }

      if (r < 0.25) {
        x = visibleLeft - margin;
      } else if (r < 0.5) {
        x = visibleRight + margin;
      } else if (r < 0.75) {
        y = visibleTop - margin;
      } else {
        y = visibleBottom + margin;
      }

      this.options.spawn(x, y);
    }
  }]);

  return HordeSpawnSystem;
}(__WEBPACK_IMPORTED_MODULE_6__lib_core__["System"]);

Object(__WEBPACK_IMPORTED_MODULE_6__lib_core__["registerSystem"])('HordeSpawn', HordeSpawnSystem);

/***/ }),
/* 45 */
/*!*********************************!*\
  !*** ./src/plugins/repulsor.js ***!
  \*********************************/
/*! exports provided: Repulsor, RepulsorSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Repulsor", function() { return Repulsor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RepulsorSystem", function() { return RepulsorSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);







var PI2 = Math.PI * 2;

var Repulsor = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Repulsor, _Component);

  function Repulsor() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Repulsor);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Repulsor.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Repulsor)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Repulsor, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        active: true,
        range: 500,
        force: 200
      };
    }
  }]);

  return Repulsor;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["Component"]);

Object(__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerComponent"])('Repulsor', Repulsor);

var components = void 0,
    component = void 0,
    entityId = void 0,
    position = void 0,
    repulsor = void 0,
    repulsorPosition = void 0,
    neighborSprite = void 0,
    neighborPosition = void 0,
    neighborMotion = void 0,
    repelAngle = void 0,
    repelForce = void 0,
    dist = void 0;

var queryBounds = {};

var RepulsorSystem = function (_System) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(RepulsorSystem, _System);

  function RepulsorSystem() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, RepulsorSystem);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (RepulsorSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(RepulsorSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(RepulsorSystem, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {
        debug: false,
        positionSystemName: 'Position'
      };
    }
  }, {
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Repulsor';
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this3 = this;

      this.positionSystem = this.world.getSystem(this.options.positionSystemName);
      this.applyRepulsionBound = function (neighbor, component) {
        return _this3.applyRepulsion(neighbor, component);
      };
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(timeDelta, entityId, component) {
      if (!component.active) {
        return;
      }

      position = this.world.get('Position', entityId);

      queryBounds.left = position.left - component.range;
      queryBounds.right = position.right + component.range;
      queryBounds.top = position.top - component.range;
      queryBounds.bottom = position.bottom + component.range;

      this.positionSystem.quadtree.iterate(queryBounds, this.applyRepulsionBound, entityId);
    }
  }, {
    key: 'applyRepulsion',
    value: function applyRepulsion(neighbor, repulsorId) {
      if (entityId === neighbor.entityId) {
        return;
      }

      neighborSprite = this.world.get('Sprite', neighbor.entityId);
      if (neighborSprite.name !== 'mine') {
        return;
      }

      repulsor = this.world.get('Repulsor', repulsorId);
      repulsorPosition = this.world.get('Position', repulsorId);
      neighborPosition = this.world.get('Position', neighbor.entityId);
      neighborMotion = this.world.get('Motion', neighbor.entityId);

      dist = (neighborPosition.x - repulsorPosition.x) * (neighborPosition.x - repulsorPosition.x) + (neighborPosition.y - repulsorPosition.y) * (neighborPosition.y - repulsorPosition.y);

      if (dist > repulsor.range * repulsor.range) {
        return;
      }
      // if (dist < repulsor.range) { return; }

      repelAngle = Math.atan2(repulsorPosition.y - neighborPosition.y, repulsorPosition.x - neighborPosition.x);

      repelForce = -repulsor.force;

      neighborMotion.dx += repelForce * Math.cos(repelAngle);
      neighborMotion.dy += repelForce * Math.sin(repelAngle);
    }
  }, {
    key: 'drawDebug',
    value: function drawDebug(timeDelta, g) {
      if (!this.options.debug) {
        return;
      }

      g.lineWidth = 4;
      g.strokeStyle = '#882222';
      components = this.getMatchingComponents();
      for (entityId in components) {
        component = components[entityId];
        position = this.world.get('Position', entityId);
        g.arc(position.x, position.y, component.range, 0, PI2);
      }
    }
  }]);

  return RepulsorSystem;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["System"]);

Object(__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerSystem"])('Repulsor', RepulsorSystem);

/***/ }),
/* 46 */
/*!**************************!*\
  !*** ./src/lib/utils.js ***!
  \**************************/
/*! exports provided: lerp, distance, cacheCall, timeStart, timeEnd */
/*! exports used: cacheCall, distance, lerp, timeEnd, timeStart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = lerp;
/* harmony export (immutable) */ __webpack_exports__["b"] = distance;
/* harmony export (immutable) */ __webpack_exports__["a"] = cacheCall;
/* harmony export (immutable) */ __webpack_exports__["e"] = timeStart;
/* harmony export (immutable) */ __webpack_exports__["d"] = timeEnd;
// Linear interpolation from v0 to v1 over t[0..1]
function lerp(v0, v1, t) {
  return (1 - t) * v0 + t * v1;
}

function distance(aPosition, bPosition) {
  return Math.sqrt(Math.pow(bPosition.x - aPosition.x, 2) + Math.pow(bPosition.y - aPosition.y, 2));
}

var cachedResults = {};

var cachedValue = void 0;

function cacheCall(ttl, key, self, fn) {
  var now = Date.now();
  if (key in cachedResults) {
    cachedValue = cachedResults[key];
    if (now - cachedValue.time < ttl) {
      return cachedValue.result;
    }
  }

  for (var _len = arguments.length, args = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    args[_key - 4] = arguments[_key];
  }

  cachedValue = {
    time: now,
    result: self[fn].apply(self, args)
  };
  cachedResults[key] = cachedValue;
  return cachedValue.result;
}

var times = {};

function timeStart(name) {
  var now = performance.now();
  if (!times[name]) {
    times[name] = { acc: 0, count: 0, lastConsole: now };
  }
  times[name].last = now;
}

function timeEnd(name) {
  var throttle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

  var now = performance.now();
  if (!times[name]) {
    return;
  }

  var time = times[name];
  var duration = now - time.last;

  if (time.count > 1000) {
    time.acc = 0;
    time.count = 0;
  }

  time.last = now;
  time.acc += duration;
  time.count++;

  if (now - time.lastConsole > throttle) {
    time.lastConsole = now;
    // eslint-disable-next-line no-console
    console.log(name, time.count, Math.floor(duration * 1000), Math.floor(time.acc / time.count * 1000));
  }
}

/***/ }),
/* 47 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-length.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 58);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 48 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_uid.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 49 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-create.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ 16);
var dPs = __webpack_require__(/*! ./_object-dps */ 112);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 61);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 59)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 77)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 113).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 50 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-to-string-tag.js ***!
  \********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 11).f;
var has = __webpack_require__(/*! ./_has */ 27);
var TAG = __webpack_require__(/*! ./_wks */ 9)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 51 */
/*!************************************!*\
  !*** ./src/plugins/debugCanvas.js ***!
  \************************************/
/*! exports provided: DebugCanvas */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DebugCanvas", function() { return DebugCanvas; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);








var DebugCanvas = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(DebugCanvas, _Core$System);

  function DebugCanvas() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, DebugCanvas);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (DebugCanvas.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(DebugCanvas)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(DebugCanvas, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {
        debugText: false
      };
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.viewportSystem = this.world.getSystem(this.options.viewportSystemName);
      this.container = document.querySelector(this.options.container);

      this.debugT = document.createElement('textarea');
      document.body.appendChild(this.debugT);
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(this.debugT.style, {
        width: '400px', height: '300px',
        display: 'block', position: 'absolute',
        zIndex: 1000, bottom: '0px', right: '0px',
        color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.7)'
      });

      this.canvas = document.createElement('canvas');
      this.container.appendChild(this.canvas);

      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(this.canvas.style, {
        zIndex: -1999,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)'
      });

      this.ctx = this.canvas.getContext('2d');

      var width = this.container.offsetWidth;
      var height = this.container.offsetHeight;
      this.canvas.width = width;
      this.canvas.height = height;

      this.debug = true;
    }
  }, {
    key: 'update',
    value: function update() {
      this.debugT.style.display = this.options.debugText ? 'block' : 'none';
    }
  }, {
    key: 'drawStart',
    value: function drawStart() {
      if (!this.world.debug) {
        if ('none' !== this.canvas.style.display) {
          this.canvas.style.display = 'none';
        }
        return;
      }

      if ('block' !== this.canvas.style.display) {
        this.canvas.style.display = 'block';
      }

      this.canvas.width = this.container.offsetWidth;
      this.canvas.height = this.container.offsetHeight;

      this.ctx.resetTransform();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.scale(this.viewportSystem.zoom, this.viewportSystem.zoom);
      this.ctx.translate(0 - this.viewportSystem.cameraX, 0 - this.viewportSystem.cameraY);
    }
  }, {
    key: 'draw',
    value: function draw(timeDelta) {
      if (!this.world.debug) {
        return;
      }

      for (var systemName in this.world.systems) {
        if ('drawDebug' in this.world.systems[systemName]) {
          this.world.systems[systemName].drawDebug(timeDelta, this.ctx);
        }
      }
    }
  }, {
    key: 'drawEnd',
    value: function drawEnd() {
      if (!this.world.debug) {
        return;
      }

      this.ctx.restore();
    }
  }]);

  return DebugCanvas;
}(__WEBPACK_IMPORTED_MODULE_6__lib_core__["System"]);

__WEBPACK_IMPORTED_MODULE_6__lib_core__["registerSystem"]('DebugCanvas', DebugCanvas);

/***/ }),
/* 52 */
/*!***********************************!*\
  !*** ./src/plugins/roadRunner.js ***!
  \***********************************/
/*! exports provided: MSG_DESTINATION_REACHED, Road, Runner, RoadRunnerSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_DESTINATION_REACHED", function() { return MSG_DESTINATION_REACHED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Road", function() { return Road; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Runner", function() { return Runner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoadRunnerSystem", function() { return RoadRunnerSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__ = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__ = __webpack_require__(/*! babel-runtime/core-js/map */ 145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set__ = __webpack_require__(/*! babel-runtime/core-js/set */ 156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray__ = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ 162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__lib_utils__ = __webpack_require__(/*! ../lib/utils */ 46);













var MSG_DESTINATION_REACHED = 'roadRunnerDestinationReached';

var INFINITY = 1000000000;

var Road = function (_Core$Component) {
  __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits___default()(Road, _Core$Component);

  function Road() {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, Road);

    return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Road.__proto__ || __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default()(Road)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(Road, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        type: 'main',
        range: 1000,
        neighbors: {}
      };
    }
  }]);

  return Road;
}(__WEBPACK_IMPORTED_MODULE_10__lib_core__["Component"]);

__WEBPACK_IMPORTED_MODULE_10__lib_core__["registerComponent"]('Road', Road);

var Runner = function (_Core$Component2) {
  __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits___default()(Runner, _Core$Component2);

  function Runner() {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, Runner);

    return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Runner.__proto__ || __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default()(Runner)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(Runner, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        target: 'main',
        range: 1000
      };
    }
  }]);

  return Runner;
}(__WEBPACK_IMPORTED_MODULE_10__lib_core__["Component"]);

__WEBPACK_IMPORTED_MODULE_10__lib_core__["registerComponent"]('Runner', Runner);

var RoadRunnerSystem = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits___default()(RoadRunnerSystem, _Core$System);

  function RoadRunnerSystem() {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, RoadRunnerSystem);

    return __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn___default()(this, (RoadRunnerSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default()(RoadRunnerSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(RoadRunnerSystem, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {
        debug: true,
        debugPerformance: false,
        debugRange: false,
        debugRoads: true,
        debugRunners: true,
        debugPath: true,
        debugSample: 0.01,
        positionSystemName: 'Position',
        floydWarshallTTL: 500,
        astarCacheTTL: 1000,
        pathfindingStrategy: 'floydWarshall'
      };
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.positionSystem = this.world.getSystem(this.options.positionSystemName);
      this.mapNeighbor = this.mapNeighbor.bind(this);
      this.findNearest = this.findNearest.bind(this);
      this.floydWarshallInit();
    }
  }, {
    key: 'update',
    value: function update(timeDelta) {
      this.options.debugPerformance && Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["e" /* timeStart */])('update');
      this.updateRoads(timeDelta);
      this.updateRunners(timeDelta);
      this.options.debugPerformance && Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["d" /* timeEnd */])('update');
    }
  }, {
    key: 'updateRoads',
    value: function updateRoads() /* timeDelta */{
      var roads = this.world.get('Road');
      for (var entityId in roads) {
        var road = roads[entityId];
        var position = this.world.get('Position', entityId);
        var range = road.range;
        road.neighbors = {};
        this.positionSystem.quadtree.iterate({
          left: position.left - range,
          top: position.top - range,
          right: position.right + range,
          bottom: position.bottom + range
        }, this.mapNeighbor, [range, road, position]);
      }
      if (this.options.pathfindingStrategy === 'floydWarshall') {
        this.floydWarshallUpdate();
      }
    }
  }, {
    key: 'updateRunners',
    value: function updateRunners() /* timeDelta */{
      var runners = this.world.get('Runner');
      for (var entityId in runners) {
        // Find throttle & seeker for steering, otherwise bail out.
        var thruster = this.world.get('Thruster', entityId);
        var seeker = this.world.get('Seeker', entityId);
        if (!seeker || !thruster) {
          continue;
        }

        // If we don't have a destination, bail out.
        var runner = runners[entityId];
        if (!runner.destination) {
          continue;
        }

        // Find nearby path elements
        var position = this.world.get('Position', entityId);
        var range = runner.range;
        runner.nearestDist = null;
        runner.nearest = null;
        this.positionSystem.quadtree.iterate({
          left: position.left - range,
          top: position.top - range,
          right: position.right + range,
          bottom: position.bottom + range
        }, this.findNearest, [range, runner, position]);
        if (!runner.nearest) {
          continue;
        }

        // Update our path from nearest path element to destination
        runner.path = null;
        switch (this.options.pathfindingStrategy) {
          case 'floydWarshall':
            this.options.debugPerformance && Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["e" /* timeStart */])('floydWarshall');
            runner.path = this.floydWarshallPath(runner.nearest, runner.destination);
            this.options.debugPerformance && Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["d" /* timeEnd */])('floydWarshall');
            break;
          case 'cachedAstar':
            this.options.debugPerformance && Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["e" /* timeStart */])('cachedAstar');
            runner.path = Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["a" /* cacheCall */])(this.options.astarCacheTTL, 'astar:' + runner.nearest + ':' + runner.destination, this, 'astar', runner.nearest, runner.destination);
            this.options.debugPerformance && Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["d" /* timeEnd */])('cachedAstar');
            break;
          case 'astar':
          default:
            this.options.debugPerformance && Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["e" /* timeStart */])('astar');
            runner.path = this.astar(runner.nearest, runner.destination);
            this.options.debugPerformance && Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["d" /* timeEnd */])('astar');
        }
        if (runner.path === null) {
          continue;
        }

        // If we have a next step in the path, seek it.
        var nextId = runner.path[1];
        if (nextId) {
          thruster.throttle = 1.0;
          seeker.active = true;
          seeker.targetEntityId = nextId;
          continue;
        }

        // We're down to the last step in the path, time for a landing.
        var destinationPosition = this.world.get('Position', runner.destination);
        var distanceToDestination = Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["b" /* distance */])(position, destinationPosition);
        if (distanceToDestination > 100) {
          // Close but not yet at the destination, so throttle back to help
          // prevent just orbiting it.
          thruster.throttle = 0.25;
          seeker.active = true;
          seeker.targetEntityId = runner.destination;
        } else {
          // Close enough to the destination, so stop seeking and call it.
          seeker.active = false;
          seeker.targetEntityId = null;
          this.world.publish(MSG_DESTINATION_REACHED, entityId);
        }
      }
    }
  }, {
    key: 'mapNeighbor',
    value: function mapNeighbor(neighborPosition, _ref) {
      var _ref2 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray___default()(_ref, 3),
          range = _ref2[0],
          road = _ref2[1],
          position = _ref2[2];

      var neighborId = neighborPosition.entityId;
      if (position.entityId === neighborId) {
        return;
      }

      var neighborRoad = this.world.get('Road', neighborId);
      if (!neighborRoad) {
        return;
      }

      var dist = Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["b" /* distance */])(position, neighborPosition);
      if (dist > range) {
        return;
      }

      road.neighbors[neighborId] = dist;
    }
  }, {
    key: 'findNearest',
    value: function findNearest(neighborPosition, _ref3) {
      var _ref4 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray___default()(_ref3, 3),
          range = _ref4[0],
          runner = _ref4[1],
          position = _ref4[2];

      var neighborId = neighborPosition.entityId;
      if (position.entityId === neighborId) {
        return;
      }

      var neighborRoad = this.world.get('Road', neighborId);
      if (!neighborRoad) {
        return;
      }

      var dist = Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["b" /* distance */])(position, neighborPosition);
      if (dist > range) {
        return;
      }
      if (runner.nearestDist !== null && dist > runner.nearestDist) {
        return;
      }

      runner.nearest = neighborId;
      runner.nearestDist = dist;
    }

    // https://en.wikipedia.org/wiki/A-star#Pseudocode

  }, {
    key: 'astar',
    value: function astar(startId, goalId) {
      var roads = this.world.get('Road');

      // The set of nodes already evaluated
      var closedSet = new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default.a();

      // The set of currently discovered nodes that are not evaluated yet.
      // Initially, only the start node is known.
      var openSet = new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default.a([startId]);

      // For each node, which node it can most efficiently be reached from.
      // If a node can be reached from many nodes, cameFrom will eventually contain the
      // most efficient previous step.
      var cameFrom = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a();

      // For each node, the cost of getting from the start node to that node.
      var gScore = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a();

      // The cost of going from start to start is zero.
      gScore.set(startId, 0);

      // For each node, the total cost of getting from the start node to the goal
      // by passing by that node. That value is partly known, partly heuristic.
      var fScore = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a();

      // For the first node, that value is completely heuristic.
      fScore.set(startId, this.astarHeuristicCostEstimate(startId, goalId));

      while (openSet.size > 0) {
        // Find the node in openSet having the lowest fScore[] value
        var currentId = null;
        var currentCost = INFINITY;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default()(openSet), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var itemCost = fScore.has(key) ? fScore.get(key) : INFINITY;
            if (itemCost < currentCost) {
              currentCost = itemCost;
              currentId = key;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (currentId === goalId) {
          return this.astarReconstructPath(cameFrom, currentId);
        }

        openSet.delete(currentId);
        closedSet.add(currentId);

        var neighbors = roads[currentId].neighbors || {};
        for (var neighborId in neighbors) {
          if (closedSet.has(neighborId)) {
            // Ignore the neighbor which is already evaluated.
            continue;
          }

          if (!closedSet.has(neighborId)) {
            // Discover a new node
            openSet.add(neighborId);
          }

          // The distance from start to a neighbor
          var tentative_gScore = gScore.get(currentId) + neighbors[neighborId];
          var neighbor_gScore = gScore.has(neighborId) ? gScore.get(neighborId) : INFINITY;
          if (tentative_gScore >= neighbor_gScore) {
            // This is not a better path.
            continue;
          }

          // This path is the best until now. Record it!
          cameFrom.set(neighborId, currentId);
          gScore.set(neighborId, tentative_gScore);
          fScore.set(neighborId, gScore.get(neighborId) + this.astarHeuristicCostEstimate(neighborId, goalId));
        }
      }

      return null;
    }
  }, {
    key: 'astarHeuristicCostEstimate',
    value: function astarHeuristicCostEstimate(startId, goalId) {
      return Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["b" /* distance */])(this.world.get('Position', startId), this.world.get('Position', goalId));
    }
  }, {
    key: 'astarReconstructPath',
    value: function astarReconstructPath(cameFrom, startId) {
      var pathId = startId;
      var totalPath = [pathId];
      while (cameFrom.has(pathId)) {
        pathId = cameFrom.get(pathId);
        totalPath.unshift(pathId);
      }
      return totalPath;
    }

    // https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm#Path_reconstruction

  }, {
    key: 'floydWarshallInit',
    value: function floydWarshallInit() {
      this.floydWarshallLastUpdate = Date.now();
      this.floydWarshallNext = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a();
    }
  }, {
    key: 'floydWarshallUpdate',
    value: function floydWarshallUpdate() {
      var now = Date.now();
      var age = now - this.floydWarshallLastUpdate;
      if (age < this.options.floydWarshallTTL) {
        return;
      }
      this.floydWarshallLastUpdate = now;

      this.options.debugPerformance && Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["e" /* timeStart */])('floydWarshallUpdate');

      var roads = this.world.get('Road');
      var roadIds = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(roads);
      var roadIdxById = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a(roadIds.map(function (id, idx) {
        return [id, idx];
      }));
      var roadCnt = roadIds.length;

      var i = void 0,
          k = void 0,
          j = void 0,
          dik = void 0,
          dij = void 0,
          dkj = void 0,
          roadId = void 0,
          road = void 0,
          neighborIds = void 0,
          neighborsCnt = void 0,
          neighborId = void 0;

      // For the sake of efficiency, we're going to use array indices into
      // roadIds in place of the entity IDs throughout the rest of this algo.
      // Turns out number-indexed arrays are orders of magnitude faster than
      // string-indexed Maps.

      var fwDist = [];
      var fwNext = [];

      for (i = 0; i < roadCnt; i++) {
        fwDist[i] = [];
        fwNext[i] = [];
        roadId = roadIds[i];
        road = roads[roadId];
        neighborIds = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(road.neighbors);
        neighborsCnt = neighborIds.length;
        for (k = 0; k < neighborsCnt; k++) {
          neighborId = neighborIds[k];
          j = roadIdxById.get(neighborId);
          fwDist[i][j] = road.neighbors[neighborId];
          fwNext[i][j] = neighborId;
        }
      }

      for (k = 0; k < roadCnt; k++) {
        for (i = 0; i < roadCnt; i++) {
          if (k === i) {
            continue;
          }
          for (j = 0; j < roadCnt; j++) {
            dik = fwDist[i][k] || INFINITY;
            dij = fwDist[i][j] || INFINITY;
            dkj = fwDist[k][j] || INFINITY;
            if (dij > dik + dkj) {
              fwDist[i][j] = dik + dkj;
              fwNext[i][j] = fwNext[i][k];
            }
          }
        }
      }

      this.floydWarshallNext.clear();
      for (k = 0; k < roadCnt; k++) {
        for (i = 0; i < roadCnt; i++) {
          this.floydWarshallNext.set(roadIds[k] + ':' + roadIds[i], fwNext[k][i]);
        }
      }

      this.options.debugPerformance && Object(__WEBPACK_IMPORTED_MODULE_11__lib_utils__["d" /* timeEnd */])('floydWarshallUpdate');
    }
  }, {
    key: 'floydWarshallPath',
    value: function floydWarshallPath(u, v) {
      if (!this.floydWarshallNext.has(u + ':' + v)) {
        return null;
      }
      var path = [u];
      while (u !== v) {
        u = this.floydWarshallNext.get(u + ':' + v);
        path.push(u);
      }
      return path;
    }
  }, {
    key: 'drawDebug',
    value: function drawDebug(timeDelta, g) {
      var _this4 = this;

      if (!this.options.debug) {
        return;
      }

      var roads = this.world.get('Road');
      for (var entityId in roads) {
        var road = roads[entityId];
        var position = this.world.get('Position', entityId);
        if (!road.debugColor) {
          road.debugColor = randColor();
        }

        if (this.options.debugRange) {
          g.beginPath();
          g.setLineDash([5, 15]);
          g.moveTo(position.x + road.range, position.y);
          g.arc(position.x, position.y, road.range, 0, Math.PI * 2);
          g.lineWidth = 4;
          g.strokeStyle = road.debugColor;
          g.stroke();
        }

        if (this.options.debugRoads) {
          g.font = '128px monospace';
          g.strokeStyle = road.debugColor;
          g.fillStyle = road.debugColor;
          g.fillText('#' + entityId, position.x + 96, position.y + 96);

          for (var neighborId in road.neighbors) {
            var neighborPosition = this.world.get('Position', neighborId);
            g.beginPath();
            g.setLineDash([15, 5]);
            g.moveTo(position.x + Math.random() * 10, position.y + Math.random() * 10);
            g.lineTo(neighborPosition.x + Math.random() * 10, neighborPosition.y + Math.random() * 10);
            g.lineWidth = 4;
            g.strokeStyle = road.debugColor;
            g.stroke();
          }
        }
      }

      if (this.options.debugRunners) {
        var runners = this.world.get('Runner');

        var _loop = function _loop(_entityId) {
          var runner = runners[_entityId];
          if (!runner.debugColor) {
            runner.debugColor = randColor();
          }

          if (_this4.options.debugPath && runner.path) {
            var circleSize = 220 + 10 * Math.random();
            [runner.nearest, runner.destination].forEach(function (entityId) {
              if (entityId) {
                var _position = _this4.world.get('Position', entityId);
                g.beginPath();
                g.setLineDash([15, 15]);
                g.moveTo(_position.x + circleSize, _position.y);
                g.arc(_position.x, _position.y, circleSize, 0, Math.PI * 2);
                g.lineWidth = 4;
                g.strokeStyle = runner.debugColor;
                g.stroke();
              }
            });

            var last = runner.path[0];
            for (var idx = 1; idx < runner.path.length; idx++) {
              var current = runner.path[idx];

              var lastPosition = _this4.world.get('Position', last);
              var currentPosition = _this4.world.get('Position', current);

              g.beginPath();
              g.setLineDash([5, 5]);
              g.moveTo(lastPosition.x + Math.random() * 10, lastPosition.y + Math.random() * 10);
              g.lineTo(currentPosition.x + Math.random() * 10, currentPosition.y + Math.random() * 10);
              g.lineWidth = 48;
              g.strokeStyle = runner.debugColor;
              g.stroke();

              last = current;
            }
          }
        };

        for (var _entityId in runners) {
          _loop(_entityId);
        }
      }
    }
  }]);

  return RoadRunnerSystem;
}(__WEBPACK_IMPORTED_MODULE_10__lib_core__["System"]);

__WEBPACK_IMPORTED_MODULE_10__lib_core__["registerSystem"]('RoadRunner', RoadRunnerSystem);

var digits = '0123456789abcdef';
var randDigit = function randDigit() {
  return digits.charAt(Math.floor(Math.random() * digits.length));
};
var randColor = function randColor() {
  return '#' + randDigit() + randDigit() + randDigit() + randDigit() + randDigit() + randDigit();
};

/***/ }),
/* 53 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_for-of.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 24);
var call = __webpack_require__(/*! ./_iter-call */ 90);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 91);
var anObject = __webpack_require__(/*! ./_an-object */ 16);
var toLength = __webpack_require__(/*! ./_to-length */ 47);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 71);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 54 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-primitive.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 17);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 55 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iobject.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 56);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 56 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_cof.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 57 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_defined.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 58 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-integer.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 59 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_shared-key.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 60)('keys');
var uid = __webpack_require__(/*! ./_uid */ 48);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 60 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_shared.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 12);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 61 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_enum-bug-keys.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 62 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gops.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 63 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-sap.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ 7);
var core = __webpack_require__(/*! ./_core */ 6);
var fails = __webpack_require__(/*! ./_fails */ 25);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 64 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-define.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 65);
var $export = __webpack_require__(/*! ./_export */ 7);
var redefine = __webpack_require__(/*! ./_redefine */ 81);
var hide = __webpack_require__(/*! ./_hide */ 15);
var has = __webpack_require__(/*! ./_has */ 27);
var Iterators = __webpack_require__(/*! ./_iterators */ 35);
var $iterCreate = __webpack_require__(/*! ./_iter-create */ 111);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 50);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 79);
var ITERATOR = __webpack_require__(/*! ./_wks */ 9)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 65 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_library.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 66 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 9);


/***/ }),
/* 67 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_meta.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ 48)('meta');
var isObject = __webpack_require__(/*! ./_is-object */ 17);
var has = __webpack_require__(/*! ./_has */ 27);
var setDesc = __webpack_require__(/*! ./_object-dp */ 11).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 25)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 68 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks-define.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 12);
var core = __webpack_require__(/*! ./_core */ 6);
var LIBRARY = __webpack_require__(/*! ./_library */ 65);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 66);
var defineProperty = __webpack_require__(/*! ./_object-dp */ 11).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 69 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopd.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ 42);
var createDesc = __webpack_require__(/*! ./_property-desc */ 41);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 14);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 54);
var has = __webpack_require__(/*! ./_has */ 27);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 76);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 13) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 70 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.to-string.js ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {



/***/ }),
/* 71 */
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/core.get-iterator-method.js ***!
  \**************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ 72);
var ITERATOR = __webpack_require__(/*! ./_wks */ 9)('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ 35);
module.exports = __webpack_require__(/*! ./_core */ 6).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 72 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_classof.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ 56);
var TAG = __webpack_require__(/*! ./_wks */ 9)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 73 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_validate-collection.js ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 17);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 74 */
/*!*******************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/extends.js ***!
  \*******************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(/*! ../core-js/object/assign */ 40);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
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

/***/ }),
/* 75 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_a-function.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 76 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ie8-dom-define.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 13) && !__webpack_require__(/*! ./_fails */ 25)(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 77)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 77 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_dom-create.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 17);
var document = __webpack_require__(/*! ./_global */ 12).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 78 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-keys-internal.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ 27);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 14);
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 101)(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 59)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 79 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gpo.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ 27);
var toObject = __webpack_require__(/*! ./_to-object */ 32);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 59)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 80 */
/*!******************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/typeof.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ 108);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(/*! ../core-js/symbol */ 116);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 81 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_redefine.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_hide */ 15);


/***/ }),
/* 82 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-step.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 83 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-array.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 56);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 84 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopn.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 78);
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 61).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 85 */
/*!********************************!*\
  !*** ./src/plugins/orbiter.js ***!
  \********************************/
/*! exports provided: Orbiter, OrbiterSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Orbiter", function() { return Orbiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrbiterSystem", function() { return OrbiterSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__position__ = __webpack_require__(/*! ./position */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_Vector2D__ = __webpack_require__(/*! ../lib/Vector2D */ 37);











var Orbiter = function (_Core$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Orbiter, _Core$Component);

  function Orbiter() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Orbiter);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Orbiter.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Orbiter)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Orbiter, null, [{
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
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["Component"]);
__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerComponent"]('Orbiter', Orbiter);

var OrbiterSystem = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(OrbiterSystem, _Core$System);

  function OrbiterSystem() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, OrbiterSystem);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (OrbiterSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(OrbiterSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(OrbiterSystem, [{
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Orbiter';
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.vOrbited = new __WEBPACK_IMPORTED_MODULE_7__lib_Vector2D__["a" /* default */]();
      this.vOrbiter = new __WEBPACK_IMPORTED_MODULE_7__lib_Vector2D__["a" /* default */]();
      this.vOld = new __WEBPACK_IMPORTED_MODULE_7__lib_Vector2D__["a" /* default */]();
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(timeDelta, entityId, orbiter) {

      // Look up the orbited entity ID, if only name given.
      if (orbiter.name && !orbiter.entityId) {
        orbiter.entityId = __WEBPACK_IMPORTED_MODULE_5__lib_core__["getComponent"]('Name').findEntityByName(this.world, orbiter.name);
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
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["System"]);
__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerSystem"]('Orbiter', OrbiterSystem);

/***/ }),
/* 86 */
/*!************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/get-iterator.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/get-iterator */ 143), __esModule: true };

/***/ }),
/* 87 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_collection-strong.js ***!
  \********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ 11).f;
var create = __webpack_require__(/*! ./_object-create */ 49);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 88);
var ctx = __webpack_require__(/*! ./_ctx */ 24);
var anInstance = __webpack_require__(/*! ./_an-instance */ 89);
var forOf = __webpack_require__(/*! ./_for-of */ 53);
var $iterDefine = __webpack_require__(/*! ./_iter-define */ 64);
var step = __webpack_require__(/*! ./_iter-step */ 82);
var setSpecies = __webpack_require__(/*! ./_set-species */ 148);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 13);
var fastKey = __webpack_require__(/*! ./_meta */ 67).fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ 73);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 88 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_redefine-all.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(/*! ./_hide */ 15);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 89 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_an-instance.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 90 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-call.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ 16);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 91 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-array-iter.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ 35);
var ITERATOR = __webpack_require__(/*! ./_wks */ 9)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 92 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_collection.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 12);
var $export = __webpack_require__(/*! ./_export */ 7);
var meta = __webpack_require__(/*! ./_meta */ 67);
var fails = __webpack_require__(/*! ./_fails */ 25);
var hide = __webpack_require__(/*! ./_hide */ 15);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 88);
var forOf = __webpack_require__(/*! ./_for-of */ 53);
var anInstance = __webpack_require__(/*! ./_an-instance */ 89);
var isObject = __webpack_require__(/*! ./_is-object */ 17);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 50);
var dP = __webpack_require__(/*! ./_object-dp */ 11).f;
var each = __webpack_require__(/*! ./_array-methods */ 149)(0);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 13);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 93 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_collection-to-json.js ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ 72);
var from = __webpack_require__(/*! ./_array-from-iterable */ 153);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 94 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-collection-of.js ***!
  \********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 7);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 95 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-collection-from.js ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 7);
var aFunction = __webpack_require__(/*! ./_a-function */ 75);
var ctx = __webpack_require__(/*! ./_ctx */ 24);
var forOf = __webpack_require__(/*! ./_for-of */ 53);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 96 */
/*!***************************************!*\
  !*** ./src/plugins/viewportCanvas.js ***!
  \***************************************/
/*! exports provided: CanvasSprite, ViewportCanvas, registerSprite, getSprite */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasSprite", function() { return CanvasSprite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewportCanvas", function() { return ViewportCanvas; });
/* harmony export (immutable) */ __webpack_exports__["registerSprite"] = registerSprite;
/* harmony export (immutable) */ __webpack_exports__["getSprite"] = getSprite;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(/*! babel-runtime/helpers/extends */ 74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get__ = __webpack_require__(/*! babel-runtime/helpers/get */ 36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);










var CanvasSprite = function (_Core$Component) {
  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default()(CanvasSprite, _Core$Component);

  function CanvasSprite() {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, CanvasSprite);

    return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (CanvasSprite.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(CanvasSprite)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(CanvasSprite, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        name: null,
        color: '#fff',
        size: 100,
        width: null,
        height: null
      };
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      var c = __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(CanvasSprite.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(CanvasSprite), 'create', this).call(this, attrs);
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
}(__WEBPACK_IMPORTED_MODULE_8__lib_core__["Component"]);
__WEBPACK_IMPORTED_MODULE_8__lib_core__["registerComponent"]('Sprite', CanvasSprite);

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

var ViewportCanvas = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default()(ViewportCanvas, _Core$System);

  function ViewportCanvas() {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, ViewportCanvas);

    return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ViewportCanvas.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(ViewportCanvas)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(ViewportCanvas, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {
        lineWidth: 1.5,
        zoom: 1.0,
        zoomMin: 0.1,
        zoomMax: 10.0,
        zoomWheelFactor: 0.025,
        gridEnabled: true,
        gridSize: 500,
        gridColor: '#111',
        followEnabled: true,
        followName: null,
        followEntityId: null
      };
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this3 = this;

      this.container = document.querySelector(this.options.container);
      this.canvas = document.createElement('canvas');
      this.container.appendChild(this.canvas);

      this.ctx = this.canvas.getContext('2d');

      var events = {
        'resize': function resize(ev) {
          _this3.updateMetrics(ev);
        },
        'orientationchange': function orientationchange(ev) {
          _this3.updateMetrics(ev);
        },
        'mousedown': function mousedown(ev) {
          _this3.onMouseDown(ev);
        },
        'mousemove': function mousemove(ev) {
          _this3.onMouseMove(ev);
        },
        'mouseup': function mouseup(ev) {
          _this3.onMouseUp(ev);
        }
        //'wheel': (ev) => { this.onMouseWheel(ev); }
      };

      for (var name in events) {
        this.canvas.addEventListener(name, events[name], false);
      }

      // See also: http://phrogz.net/JS/wheeldelta.html
      var boundOnMouseWheel = function boundOnMouseWheel(ev) {
        return _this3.onMouseWheel(ev);
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
    }
  }, {
    key: 'draw',
    value: function draw(timeDelta) {
      this.updateMetrics();
      this.ctx.save();

      this.clear();
      this.centerAndZoom(timeDelta);
      this.followEntity(timeDelta);

      if (this.gridEnabled) {
        this.drawBackdrop(timeDelta);
      }

      this.drawScene(timeDelta);

      if (this.world.debug) {
        this.drawDebugCursor();
      }

      this.ctx.restore();
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
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(ev) {
      this.setCursor(ev.clientX, ev.clientY);
      this.world.publish('mouseUp', this.cursorPosition);
    }
  }, {
    key: 'update',
    value: function update() /* timeDelta */{
      // Use the cursorChanged flag set by setCursor to limit mouseMove messages
      // to one per game loop tick
      if (this.cursorChanged) {
        this.cursorChanged = false;
        this.world.publish('mouseMove', this.cursorPosition);
      }
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

      if (newX !== this.cursorPosition.x || newY !== this.cursorPosition.y) {
        this.cursorChanged = true;
        this.cursorPosition.x = newX;
        this.cursorPosition.y = newY;
      }
    }
  }, {
    key: 'updateMetrics',
    value: function updateMetrics() {
      var width = this.container.offsetWidth;
      var height = this.container.offsetHeight;

      this.canvas.width = width;
      this.canvas.height = height;

      this.visibleWidth = width / this.zoom;
      this.visibleHeight = height / this.zoom;

      this.visibleLeft = 0 - this.visibleWidth / 2 + this.cameraX;
      this.visibleTop = 0 - this.visibleHeight / 2 + this.cameraY;
      this.visibleRight = this.visibleLeft + this.visibleWidth;
      this.visibleBottom = this.visibleTop + this.visibleHeight;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: 'centerAndZoom',
    value: function centerAndZoom() {
      this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.scale(this.zoom, this.zoom);
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
        this.followEntityId = __WEBPACK_IMPORTED_MODULE_8__lib_core__["getComponent"]('Name').findEntityByName(this.world, this.options.followName);
      }
      if (this.followEntityId) {
        // Adjust the viewport center offset to the entity position
        var position = this.world.get('Position', this.followEntityId);
        if (position) {
          this.cameraX = position.x;
          this.cameraY = position.y;
          this.setCursor(this.cursorRawX, this.cursorRawY);
          this.ctx.translate(0 - this.cameraX, 0 - this.cameraY);
        }
      }
    }
  }, {
    key: 'drawDebugCursor',
    value: function drawDebugCursor() {
      var ctx = this.ctx;
      ctx.save();
      ctx.strokeStyle = '#f0f';
      ctx.lineWidth = this.lineWidth / this.zoom;
      ctx.translate(this.cursorPosition.x, this.cursorPosition.y);
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.lineTo(20, 0);
      ctx.moveTo(0, -20);
      ctx.lineTo(0, 20);
      ctx.strokeRect(-10, -10, 20, 20);
      ctx.stroke();
      ctx.restore();
    }
  }, {
    key: 'drawBackdrop',
    value: function drawBackdrop() {
      var gridSize = this.options.gridSize;
      var gridOffsetX = this.visibleLeft % gridSize;
      var gridOffsetY = this.visibleTop % gridSize;

      var ctx = this.ctx;

      ctx.save();
      ctx.beginPath();

      ctx.strokeStyle = this.options.gridColor;
      ctx.lineWidth = this.lineWidth / this.zoom;

      for (var x = this.visibleLeft - gridOffsetX; x < this.visibleRight; x += gridSize) {
        ctx.moveTo(x, this.visibleTop);
        ctx.lineTo(x, this.visibleBottom);
      }

      for (var y = this.visibleTop - gridOffsetY; y < this.visibleBottom; y += gridSize) {
        ctx.moveTo(this.visibleLeft, y);
        ctx.lineTo(this.visibleRight, y);
      }

      ctx.stroke();
      ctx.restore();
    }
  }, {
    key: 'drawScene',
    value: function drawScene(timeDelta) {
      var positions = this.world.get('Position');
      for (var entityId in positions) {
        this.drawSprite(timeDelta, entityId, positions[entityId]);
      }
    }
  }, {
    key: 'drawSprite',
    value: function drawSprite(timeDelta, entityId, position) {

      var sprite = this.world.get('Sprite', entityId);
      if (!sprite) {
        sprite = CanvasSprite.defaults();
      }

      var spriteFn = getSprite(sprite.name);
      if (!spriteFn) {
        spriteFn = getSprite('default');
      }

      var ctx = this.ctx;

      ctx.save();

      ctx.translate(position.x, position.y);

      ctx.rotate(position.rotation + Math.PI / 2);
      ctx.scale(sprite.size / 100, sprite.size / 100);

      // HACK: Try to keep line width consistent regardless of zoom, to sort of
      // simulate a vector display
      ctx.lineWidth = this.lineWidth / this.zoom / (sprite.size / 100);

      ctx.strokeStyle = sprite.color;
      spriteFn(ctx, timeDelta, sprite, entityId);

      ctx.restore();
    }
  }]);

  return ViewportCanvas;
}(__WEBPACK_IMPORTED_MODULE_8__lib_core__["System"]);

__WEBPACK_IMPORTED_MODULE_8__lib_core__["registerSystem"]('ViewportCanvas', ViewportCanvas);

var spriteRegistry = {};
function registerSprite(name, sprite) {
  spriteRegistry[name] = sprite;
}
function getSprite(name) {
  return spriteRegistry[name];
}

var PI2 = Math.PI * 2;

registerSprite('default', function (ctx /*, timeDelta, sprite, entityId*/) {
  ctx.beginPath();
  ctx.arc(0, 0, 50, 0, PI2, true);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -50);
  ctx.moveTo(0, 0);
  ctx.stroke();
});

registerSprite('sun', function (ctx /*, timeDelta, sprite, entityId*/) {
  ctx.beginPath();
  ctx.arc(0, 0, 50, 0, PI2, true);
  ctx.stroke();
});

registerSprite('enemyscout', function (ctx /*, timeDelta, sprite, entityId*/) {
  ctx.beginPath();
  ctx.moveTo(0, -50);
  ctx.lineTo(-45, 50);
  ctx.lineTo(-12.5, 12.5);
  ctx.lineTo(0, 25);
  ctx.lineTo(12.5, 12.5);
  ctx.lineTo(45, 50);
  ctx.lineTo(0, -50);
  ctx.moveTo(0, -50);
  ctx.stroke();
});

registerSprite('hero', function (ctx /*, timeDelta, sprite, entityId*/) {
  ctx.rotate(Math.PI);
  ctx.beginPath();
  ctx.moveTo(-12.5, -50);
  ctx.lineTo(-25, -50);
  ctx.lineTo(-50, 0);
  ctx.arc(0, 0, 50, Math.PI, 0, true);
  ctx.lineTo(25, -50);
  ctx.lineTo(12.5, -50);
  ctx.lineTo(25, 0);
  ctx.arc(0, 0, 25, 0, Math.PI, true);
  ctx.lineTo(-12.5, -50);
  ctx.stroke();
});

registerSprite('asteroid', function (ctx, timeDelta, sprite /*, entityId*/) {
  var idx = void 0;

  if (!sprite.points) {
    var NUM_POINTS = 7 + Math.floor(8 * Math.random());
    var MAX_RADIUS = 50;
    var MIN_RADIUS = 35;
    var ROTATION = PI2 / NUM_POINTS;

    sprite.points = [];
    for (idx = 0; idx < NUM_POINTS; idx++) {
      var rot = idx * ROTATION;
      var dist = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
      sprite.points.push([dist * Math.cos(rot), dist * Math.sin(rot)]);
    }
  }

  ctx.beginPath();
  ctx.moveTo(sprite.points[0][0], sprite.points[0][1]);
  for (idx = 0; idx < sprite.points.length; idx++) {
    ctx.lineTo(sprite.points[idx][0], sprite.points[idx][1]);
  }
  ctx.lineTo(sprite.points[0][0], sprite.points[0][1]);
  ctx.stroke();
});

registerSprite('explosion', function (ctx, timeDelta, sprite /*, entityId*/) {
  var p = void 0,
      idx = void 0;

  if (!sprite.initialized) {

    sprite.initialized = true;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(sprite, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
      ttl: 2.0,
      radius: 100,
      maxParticles: 25,
      maxParticleSize: 4,
      maxVelocity: 300,
      color: '#f00',
      age: 0,
      stop: false
    }, sprite));

    sprite.particles = [];

    for (idx = 0; idx < sprite.maxParticles; idx++) {
      sprite.particles.push({ free: true });
    }
  }

  for (idx = 0; idx < sprite.particles.length; idx++) {
    p = sprite.particles[idx];

    if (!sprite.stop && p.free) {

      p.velocity = sprite.maxVelocity * Math.random();
      p.angle = Math.PI * 2 * Math.random();
      p.dx = 0 - p.velocity * Math.sin(p.angle);
      p.dy = p.velocity * Math.cos(p.angle);
      p.distance = p.x = p.y = 0;
      p.maxDistance = sprite.radius * Math.random();
      p.size = sprite.maxParticleSize;
      p.free = false;
    } else if (!p.free) {

      p.x += p.dx * timeDelta;
      p.y += p.dy * timeDelta;

      p.distance += p.velocity * timeDelta;
      if (p.distance >= p.maxDistance) {
        p.distance = p.maxDistance;
        p.free = true;
      }
    }
  }

  sprite.age += timeDelta;

  if (sprite.age >= sprite.ttl) {
    sprite.stop = true;
  }

  var alpha = Math.max(0, 1 - sprite.age / sprite.ttl);

  ctx.save();
  ctx.strokeStyle = sprite.color;
  ctx.fillStyle = sprite.color;

  for (idx = 0; idx < sprite.particles.length; idx++) {
    p = sprite.particles[idx];
    if (p.free) {
      continue;
    }

    ctx.globalAlpha = (1 - p.distance / p.maxDistance) * alpha;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineWidth = p.size;
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }

  ctx.restore();
});

/***/ }),
/* 97 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./src/lib/core.js ./src/plugins/bounce.js ./src/plugins/collision.js ./src/plugins/datGui.js ./src/plugins/debugCanvas.js ./src/plugins/drawStats.js ./src/plugins/expiration.js ./src/plugins/health.js ./src/plugins/hordeSpawn.js ./src/plugins/memoryStats.js ./src/plugins/motion.js ./src/plugins/name.js ./src/plugins/orbiter.js ./src/plugins/playerInputSteering.js ./src/plugins/position.js ./src/plugins/repulsor.js ./src/plugins/roadRunner.js ./src/plugins/seeker.js ./src/plugins/spawn.js ./src/plugins/steering.js ./src/plugins/thruster.js ./src/plugins/viewportCanvas.js ./src/plugins/viewportPixi.js ./src/plugins/viewportWebGL.js ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/lib/core.js */0);
__webpack_require__(/*! ./src/plugins/bounce.js */33);
__webpack_require__(/*! ./src/plugins/collision.js */38);
__webpack_require__(/*! ./src/plugins/datGui.js */19);
__webpack_require__(/*! ./src/plugins/debugCanvas.js */51);
__webpack_require__(/*! ./src/plugins/drawStats.js */20);
__webpack_require__(/*! ./src/plugins/expiration.js */139);
__webpack_require__(/*! ./src/plugins/health.js */28);
__webpack_require__(/*! ./src/plugins/hordeSpawn.js */44);
__webpack_require__(/*! ./src/plugins/memoryStats.js */22);
__webpack_require__(/*! ./src/plugins/motion.js */10);
__webpack_require__(/*! ./src/plugins/name.js */23);
__webpack_require__(/*! ./src/plugins/orbiter.js */85);
__webpack_require__(/*! ./src/plugins/playerInputSteering.js */39);
__webpack_require__(/*! ./src/plugins/position.js */8);
__webpack_require__(/*! ./src/plugins/repulsor.js */45);
__webpack_require__(/*! ./src/plugins/roadRunner.js */52);
__webpack_require__(/*! ./src/plugins/seeker.js */29);
__webpack_require__(/*! ./src/plugins/spawn.js */18);
__webpack_require__(/*! ./src/plugins/steering.js */166);
__webpack_require__(/*! ./src/plugins/thruster.js */30);
__webpack_require__(/*! ./src/plugins/viewportCanvas.js */96);
__webpack_require__(/*! ./src/plugins/viewportPixi.js */167);
module.exports = __webpack_require__(/*! ./src/plugins/viewportWebGL.js */31);


/***/ }),
/* 98 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/assign.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.assign */ 99);
module.exports = __webpack_require__(/*! ../../modules/_core */ 6).Object.assign;


/***/ }),
/* 99 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.assign.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ 7);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ 100) });


/***/ }),
/* 100 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-assign.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ 26);
var gOPS = __webpack_require__(/*! ./_object-gops */ 62);
var pIE = __webpack_require__(/*! ./_object-pie */ 42);
var toObject = __webpack_require__(/*! ./_to-object */ 32);
var IObject = __webpack_require__(/*! ./_iobject */ 55);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ 25)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 101 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_array-includes.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 14);
var toLength = __webpack_require__(/*! ./_to-length */ 47);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 102);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 102 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-absolute-index.js ***!
  \********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 58);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 103 */
/*!**********************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/define-property.js ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/define-property */ 104), __esModule: true };

/***/ }),
/* 104 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/define-property.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.define-property */ 105);
var $Object = __webpack_require__(/*! ../../modules/_core */ 6).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 105 */
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.define-property.js ***!
  \****************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 7);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 13), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ 11).f });


/***/ }),
/* 106 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/get-prototype-of.js ***!
  \********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.get-prototype-of */ 107);
module.exports = __webpack_require__(/*! ../../modules/_core */ 6).Object.getPrototypeOf;


/***/ }),
/* 107 */
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.get-prototype-of.js ***!
  \*****************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ 32);
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 79);

__webpack_require__(/*! ./_object-sap */ 63)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 108 */
/*!***************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/symbol/iterator.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol/iterator */ 109), __esModule: true };

/***/ }),
/* 109 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/fn/symbol/iterator.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ 34);
__webpack_require__(/*! ../../modules/web.dom.iterable */ 43);
module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ 66).f('iterator');


/***/ }),
/* 110 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_string-at.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 58);
var defined = __webpack_require__(/*! ./_defined */ 57);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 111 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-create.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ 49);
var descriptor = __webpack_require__(/*! ./_property-desc */ 41);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 50);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 15)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 9)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 112 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dps.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 11);
var anObject = __webpack_require__(/*! ./_an-object */ 16);
var getKeys = __webpack_require__(/*! ./_object-keys */ 26);

module.exports = __webpack_require__(/*! ./_descriptors */ 13) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 113 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_html.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ 12).document;
module.exports = document && document.documentElement;


/***/ }),
/* 114 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.array.iterator.js ***!
  \********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 115);
var step = __webpack_require__(/*! ./_iter-step */ 82);
var Iterators = __webpack_require__(/*! ./_iterators */ 35);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 14);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 64)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 115 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_add-to-unscopables.js ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 116 */
/*!******************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/symbol.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol */ 117), __esModule: true };

/***/ }),
/* 117 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/fn/symbol/index.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.symbol */ 118);
__webpack_require__(/*! ../../modules/es6.object.to-string */ 70);
__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ 122);
__webpack_require__(/*! ../../modules/es7.symbol.observable */ 123);
module.exports = __webpack_require__(/*! ../../modules/_core */ 6).Symbol;


/***/ }),
/* 118 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.symbol.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ 12);
var has = __webpack_require__(/*! ./_has */ 27);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 13);
var $export = __webpack_require__(/*! ./_export */ 7);
var redefine = __webpack_require__(/*! ./_redefine */ 81);
var META = __webpack_require__(/*! ./_meta */ 67).KEY;
var $fails = __webpack_require__(/*! ./_fails */ 25);
var shared = __webpack_require__(/*! ./_shared */ 60);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 50);
var uid = __webpack_require__(/*! ./_uid */ 48);
var wks = __webpack_require__(/*! ./_wks */ 9);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 66);
var wksDefine = __webpack_require__(/*! ./_wks-define */ 68);
var keyOf = __webpack_require__(/*! ./_keyof */ 119);
var enumKeys = __webpack_require__(/*! ./_enum-keys */ 120);
var isArray = __webpack_require__(/*! ./_is-array */ 83);
var anObject = __webpack_require__(/*! ./_an-object */ 16);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 14);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 54);
var createDesc = __webpack_require__(/*! ./_property-desc */ 41);
var _create = __webpack_require__(/*! ./_object-create */ 49);
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ 121);
var $GOPD = __webpack_require__(/*! ./_object-gopd */ 69);
var $DP = __webpack_require__(/*! ./_object-dp */ 11);
var $keys = __webpack_require__(/*! ./_object-keys */ 26);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ 84).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 42).f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ 62).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ 65)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key) {
    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 15)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 119 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_keyof.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ 26);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 14);
module.exports = function (object, el) {
  var O = toIObject(object);
  var keys = getKeys(O);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) if (O[key = keys[index++]] === el) return key;
};


/***/ }),
/* 120 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_enum-keys.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 26);
var gOPS = __webpack_require__(/*! ./_object-gops */ 62);
var pIE = __webpack_require__(/*! ./_object-pie */ 42);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 121 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopn-ext.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 14);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 84).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 122 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.symbol.async-iterator.js ***!
  \***************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 68)('asyncIterator');


/***/ }),
/* 123 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.symbol.observable.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 68)('observable');


/***/ }),
/* 124 */
/*!***********************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/set-prototype-of.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ 125), __esModule: true };

/***/ }),
/* 125 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/set-prototype-of.js ***!
  \********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.set-prototype-of */ 126);
module.exports = __webpack_require__(/*! ../../modules/_core */ 6).Object.setPrototypeOf;


/***/ }),
/* 126 */
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.set-prototype-of.js ***!
  \*****************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ 7);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 127).set });


/***/ }),
/* 127 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-proto.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ 17);
var anObject = __webpack_require__(/*! ./_an-object */ 16);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ 24)(Function.call, __webpack_require__(/*! ./_object-gopd */ 69).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 128 */
/*!*************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/create.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/create */ 129), __esModule: true };

/***/ }),
/* 129 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/create.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.create */ 130);
var $Object = __webpack_require__(/*! ../../modules/_core */ 6).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 130 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.create.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 7);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ 49) });


/***/ }),
/* 131 */
/*!**********************************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/get-own-property-descriptor.js ***!
  \**********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/get-own-property-descriptor */ 132), __esModule: true };

/***/ }),
/* 132 */
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/get-own-property-descriptor.js ***!
  \*******************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.get-own-property-descriptor */ 133);
var $Object = __webpack_require__(/*! ../../modules/_core */ 6).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 133 */
/*!****************************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js ***!
  \****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ 14);
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 69).f;

__webpack_require__(/*! ./_object-sap */ 63)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 134 */
/*!*****************************!*\
  !*** ./src/lib/QuadTree.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = QuadTree;
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
};

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

/***/ }),
/* 135 */
/*!***************************************!*\
  !*** ./node_modules/dat-gui/index.js ***!
  \***************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./vendor/dat.gui */ 136)
module.exports.color = __webpack_require__(/*! ./vendor/dat.color */ 137)

/***/ }),
/* 136 */
/*!************************************************!*\
  !*** ./node_modules/dat-gui/vendor/dat.gui.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

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

    dom.bind(window, 'resize', function() { _this.onResize() });
    dom.bind(this.__ul, 'webkitTransitionEnd', function() { _this.onResize(); });
    dom.bind(this.__ul, 'transitionend', function() { _this.onResize() });
    dom.bind(this.__ul, 'oTransitionEnd', function() { _this.onResize() });
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
        }
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
      })

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

          this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px'

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
    elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'
    elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
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

/***/ }),
/* 137 */
/*!**************************************************!*\
  !*** ./node_modules/dat-gui/vendor/dat.color.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

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

/***/ }),
/* 138 */
/*!**************************************************!*\
  !*** ./node_modules/stats-js/build/stats.min.js ***!
  \**************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){var l=Date.now(),m=l,g=0,n=Infinity,o=0,h=0,p=Infinity,q=0,r=0,s=0,f=document.createElement("div");f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
"block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{REVISION:12,domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
a+"px",m=b,r=0);return b},update:function(){l=this.end()}}};"object"===typeof module&&(module.exports=Stats);


/***/ }),
/* 139 */
/*!***********************************!*\
  !*** ./src/plugins/expiration.js ***!
  \***********************************/
/*! exports provided: Expiration, ExpirationSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Expiration", function() { return Expiration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpirationSystem", function() { return ExpirationSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);







var Expiration = function (_Core$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Expiration, _Core$Component);

  function Expiration() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Expiration);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Expiration.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Expiration)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Expiration, null, [{
    key: 'defaults',
    value: function defaults() {
      return { ttl: 0, age: 0 };
    }
  }]);

  return Expiration;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["Component"]);
__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerComponent"]('Expiration', Expiration);

var ExpirationSystem = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(ExpirationSystem, _Core$System);

  function ExpirationSystem() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, ExpirationSystem);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ExpirationSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(ExpirationSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(ExpirationSystem, [{
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Expiration';
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(timeDelta, entityId, expiration) {
      expiration.age += timeDelta;
      if (expiration.age >= expiration.ttl) {
        this.world.destroy(entityId);
      }
    }
  }]);

  return ExpirationSystem;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["System"]);
__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerSystem"]('Expiration', ExpirationSystem);

/***/ }),
/* 140 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/keys.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.keys */ 141);
module.exports = __webpack_require__(/*! ../../modules/_core */ 6).Object.keys;


/***/ }),
/* 141 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.keys.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ 32);
var $keys = __webpack_require__(/*! ./_object-keys */ 26);

__webpack_require__(/*! ./_object-sap */ 63)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 142 */
/*!***************************************************!*\
  !*** ./node_modules/memory-stats/memory-stats.js ***!
  \***************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

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

	}

	// polyfill usedJSHeapSize
	if (window.performance && !performance.memory){
		performance.memory = { usedJSHeapSize : 0 };
	}

	// support of the API?
	if( performance.memory.totalJSHeapSize === 0 ){
		console.warn('totalJSHeapSize === 0... performance.memory is only available in Chrome .')
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
			lastTime	= Date.now()

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
			};
		}

	}

};

module.exports = MemoryStats;


/***/ }),
/* 143 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/fn/get-iterator.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/web.dom.iterable */ 43);
__webpack_require__(/*! ../modules/es6.string.iterator */ 34);
module.exports = __webpack_require__(/*! ../modules/core.get-iterator */ 144);


/***/ }),
/* 144 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/core.get-iterator.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 16);
var get = __webpack_require__(/*! ./core.get-iterator-method */ 71);
module.exports = __webpack_require__(/*! ./_core */ 6).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 145 */
/*!***************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/map.js ***!
  \***************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/map */ 146), __esModule: true };

/***/ }),
/* 146 */
/*!************************************************!*\
  !*** ./node_modules/core-js/library/fn/map.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ 70);
__webpack_require__(/*! ../modules/es6.string.iterator */ 34);
__webpack_require__(/*! ../modules/web.dom.iterable */ 43);
__webpack_require__(/*! ../modules/es6.map */ 147);
__webpack_require__(/*! ../modules/es7.map.to-json */ 152);
__webpack_require__(/*! ../modules/es7.map.of */ 154);
__webpack_require__(/*! ../modules/es7.map.from */ 155);
module.exports = __webpack_require__(/*! ../modules/_core */ 6).Map;


/***/ }),
/* 147 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.map.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 87);
var validate = __webpack_require__(/*! ./_validate-collection */ 73);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ 92)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 148 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-species.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 12);
var core = __webpack_require__(/*! ./_core */ 6);
var dP = __webpack_require__(/*! ./_object-dp */ 11);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 13);
var SPECIES = __webpack_require__(/*! ./_wks */ 9)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 149 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_array-methods.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ 24);
var IObject = __webpack_require__(/*! ./_iobject */ 55);
var toObject = __webpack_require__(/*! ./_to-object */ 32);
var toLength = __webpack_require__(/*! ./_to-length */ 47);
var asc = __webpack_require__(/*! ./_array-species-create */ 150);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 150 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_array-species-create.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 151);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 151 */
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_array-species-constructor.js ***!
  \****************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 17);
var isArray = __webpack_require__(/*! ./_is-array */ 83);
var SPECIES = __webpack_require__(/*! ./_wks */ 9)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 152 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.map.to-json.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 7);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 93)('Map') });


/***/ }),
/* 153 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_array-from-iterable.js ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ 53);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 154 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.map.of.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(/*! ./_set-collection-of */ 94)('Map');


/***/ }),
/* 155 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.map.from.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(/*! ./_set-collection-from */ 95)('Map');


/***/ }),
/* 156 */
/*!***************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/set.js ***!
  \***************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/set */ 157), __esModule: true };

/***/ }),
/* 157 */
/*!************************************************!*\
  !*** ./node_modules/core-js/library/fn/set.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ 70);
__webpack_require__(/*! ../modules/es6.string.iterator */ 34);
__webpack_require__(/*! ../modules/web.dom.iterable */ 43);
__webpack_require__(/*! ../modules/es6.set */ 158);
__webpack_require__(/*! ../modules/es7.set.to-json */ 159);
__webpack_require__(/*! ../modules/es7.set.of */ 160);
__webpack_require__(/*! ../modules/es7.set.from */ 161);
module.exports = __webpack_require__(/*! ../modules/_core */ 6).Set;


/***/ }),
/* 158 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.set.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 87);
var validate = __webpack_require__(/*! ./_validate-collection */ 73);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ 92)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 159 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.set.to-json.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 7);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 93)('Set') });


/***/ }),
/* 160 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.set.of.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(/*! ./_set-collection-of */ 94)('Set');


/***/ }),
/* 161 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.set.from.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(/*! ./_set-collection-from */ 95)('Set');


/***/ }),
/* 162 */
/*!*************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/slicedToArray.js ***!
  \*************************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(/*! ../core-js/is-iterable */ 163);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(/*! ../core-js/get-iterator */ 86);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 163 */
/*!***********************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/is-iterable.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/is-iterable */ 164), __esModule: true };

/***/ }),
/* 164 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/fn/is-iterable.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/web.dom.iterable */ 43);
__webpack_require__(/*! ../modules/es6.string.iterator */ 34);
module.exports = __webpack_require__(/*! ../modules/core.is-iterable */ 165);


/***/ }),
/* 165 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/core.is-iterable.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ 72);
var ITERATOR = __webpack_require__(/*! ./_wks */ 9)('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ 35);
module.exports = __webpack_require__(/*! ./_core */ 6).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 166 */
/*!*********************************!*\
  !*** ./src/plugins/steering.js ***!
  \*********************************/
/*! exports provided: Steering, SteeringSystem */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Steering", function() { return Steering; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SteeringSystem", function() { return SteeringSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugins_position__ = __webpack_require__(/*! ../plugins/position */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__plugins_motion__ = __webpack_require__(/*! ../plugins/motion */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__ = __webpack_require__(/*! ../lib/Vector2D */ 37);












var PI2 = Math.PI * 2;

var Steering = function (_Core$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Steering, _Core$Component);

  function Steering() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Steering);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Steering.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Steering)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Steering, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        sensorRange: 350,
        obstacleRepel: [400, 2.1]
      };
    }
  }]);

  return Steering;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["Component"]);

__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerComponent"]('Steering', Steering);

var SteeringSystem = function (_Core$System) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(SteeringSystem, _Core$System);

  function SteeringSystem() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, SteeringSystem);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (SteeringSystem.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(SteeringSystem)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(SteeringSystem, [{
    key: 'matchComponent',
    value: function matchComponent() {
      return 'Steering';
    }
  }, {
    key: 'initialize',
    value: function initialize() {

      this.seekFactor = 1;

      this.pushFactor = 7;

      this.avoidFactor = 10;

      this.avoidSeeAhead = 500;
      this.avoidRayWidthFactor = 1.5;

      this.vTarget = new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */]();

      this.vectors = {
        avoid: new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */](),
        push: new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */](),
        seek: new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */](),
        flee: new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */](),
        wander: new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */](),
        evade: new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */](),
        pursue: new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */]()
      };
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(timeDelta, entityId, steering) {

      this.vTarget.setValues(0, 0);

      for (var key in this.vectors) {
        this.vectors[key].setValues(0, 0);
        this[key](this.vectors[key], timeDelta, entityId, steering);
        this.vTarget.add(this.vectors[key]);
      }

      this.applySteering(timeDelta, entityId, steering);
    }
  }, {
    key: 'avoid',
    value: function avoid(vector, timeDelta, entityId, steering) {
      var _this3 = this;

      if (this.debug) {
        steering.vectors = [];
      }

      var sprite = this.world.get('Sprite', entityId);
      var position = this.world.get('Position', entityId);

      var result = this.lookForObstacle(entityId, position, sprite, steering);
      if (!result) {
        return;
      }

      var range = steering.sensorRange;
      this.world.getSystem('Collision').quadtree.iterate({
        x: position.x - range / 2,
        y: position.y - range / 2,
        width: range,
        height: range
      }, function (item) {

        if (entityId === item.entityId) {
          return;
        }

        var targetPosition = _this3.world.get('Position', item.entityId);
        if (!targetPosition) {
          return;
        }

        var targetSprite = _this3.world.get('Sprite', item.entityId);

        var A = 0;
        var B = steering.obstacleRepel[0];
        var n = 0;
        var m = steering.obstacleRepel[1];

        var dx = position.x - targetPosition.x;
        var dy = position.y - targetPosition.y;
        var edgeRange = sprite.size / 2 + targetSprite.size / 2;
        var distance = Math.sqrt(dx * dx + dy * dy) - edgeRange;
        if (distance <= 0) {
          distance = 0.01;
        }

        if (distance > steering.sensorRange) {
          return;
        }

        var U = -A / Math.pow(distance, n) + B / Math.pow(distance, m);

        vector.x += dx * U;
        vector.y += dy * U;

        if (_this3.debug) {
          steering.vectors.push([targetPosition.x, targetPosition.y, U]);
        }
      });
    }
  }, {
    key: 'push',
    value: function push() /*vector, timeDelta, entityId, steering*/{}
  }, {
    key: 'avoid_ray',
    value: function avoid_ray(vector, timeDelta, entityId, steering) {

      var sprite = this.world.get('Sprite', entityId);
      var position = this.world.get('Position', entityId);

      // Scan ahead for an obstacle, bail if none found.
      var result = this.lookForObstacle(entityId, position, sprite, steering);
      if (!result) {
        return;
      }

      var obstacle = result[0];
      var rayX = result[1];
      var rayY = result[2];

      // Opposite right triangle leg is distance from obstacle to avoid collision.
      var oppositeLen = obstacle.sprite.size / 2 + sprite.size * this.avoidRayWidthFactor;

      // Hypotenuse length is distance from obstacle.
      var hypotenuseLen = Math.sqrt(Math.pow(obstacle.position.x - rayX, 2) + Math.pow(obstacle.position.y - rayY, 2));

      // Adjacent length would be avoid tangent, but no need to calculate.

      // Find angle from direct collision to avoidance
      var theta = Math.asin(oppositeLen / hypotenuseLen);

      // HACK: Too close, panic and steer hard away
      if (isNaN(theta)) {
        theta = Math.PI * 0.66;
      }

      // Find the absolute angle to the obstacle from entity.
      var obstacleAngle = Math.atan2(obstacle.position.y - rayY, obstacle.position.x - rayX);

      // Calculate nearest target angle for avoidance...
      // Try turning clockwise from obstacle.
      var avoidAngle = obstacleAngle + theta;
      // Calculate the 'travel' needed from current rotation.
      var travel = Math.min(PI2 - Math.abs(position.rotation - avoidAngle), Math.abs(position.rotation - avoidAngle));
      if (travel > theta) {
        // Clockwise travel exceeds theta, so counterclockwise is shorter.
        avoidAngle = obstacleAngle - theta;
      }

      // Set up the avoidance vector.
      vector.setValues(this.avoidFactor, 0);
      vector.rotate(avoidAngle);
    }
  }, {
    key: 'lookForObstacle',
    value: function lookForObstacle(entityId, position, sprite, steering) {
      var rayWidth = sprite.size * this.avoidRayWidthFactor;

      var vRayUnit = new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */]();
      vRayUnit.setValues(rayWidth, 0);
      vRayUnit.rotate(position.rotation);

      if (this.debug) {
        steering.hitCircles = [];
      }

      var obstacle = void 0,
          rayX = void 0,
          rayY = void 0;
      var steps = this.avoidSeeAhead / rayWidth;
      for (var step = 0; step < steps; step++) {
        rayX = position.x + vRayUnit.x * step;
        rayY = position.y + vRayUnit.y * step;
        obstacle = this.searchCircleForObstacle(steering, entityId, rayX, rayY, rayWidth);
        if (obstacle) {
          return [obstacle, rayX, rayY];
        }
      }

      return null;
    }
  }, {
    key: 'searchCircleForObstacle',
    value: function searchCircleForObstacle(steering, entityId, x, y, size) {

      if (this.debug) {
        steering.hitCircles.push([x, y, size]);
      }

      var hits = [];

      this.world.getSystem('Collision').quadtree.iterate({
        x: x - size / 2,
        y: y - size / 2,
        width: size,
        height: size
      }, function (item) {

        if (entityId === item.entityId) {
          return;
        }
        var dx = item.position.x - x;
        var dy = item.position.y - y;
        var range = dx * dx + dy * dy;
        var radii = (size + item.sprite.size) / 2;
        if (range < radii * radii) {
          hits.push([range, item]);
        }
      });

      hits.sort(function (a, b) {
        return b[0] - a[0];
      });
      return hits.length ? hits[0][1] : null;
    }
  }, {
    key: 'seek',
    value: function seek(vector, timeDelta, entityId, steering) {

      // Look up the entity ID to seek, if only name given.
      if (steering.seekTargetName && !steering.seekTargetEntityId) {
        steering.seekTargetEntityId = __WEBPACK_IMPORTED_MODULE_5__lib_core__["getComponent"]('Name').findEntityByName(this.world, steering.seekTargetName);
      }

      if (!steering.seekTargetEntityId) {
        return;
      }

      var position = this.world.get('Position', entityId);
      if (!position) {
        return;
      }

      // Accept either a raw x/y coord or entity ID as target
      var targetPosition = steering.targetPosition;
      if (!targetPosition) {
        targetPosition = this.world.get('Position', steering.seekTargetEntityId);
      }
      if (!targetPosition) {
        return;
      }

      vector.setValues(targetPosition.x - position.x, targetPosition.y - position.y);
      vector.normalize();
      vector.multiplyScalar(this.seekFactor);
    }
  }, {
    key: 'flee',
    value: function flee() /*vector, timeDelta, entityId, steering*/{}
  }, {
    key: 'wander',
    value: function wander() /*vector, timeDelta, entityId, steering*/{}
  }, {
    key: 'evade',
    value: function evade() /*vector, timeDelta, entityId, steering*/{}
  }, {
    key: 'pursue',
    value: function pursue() /*vector, timeDelta, entityId, steering*/{}
  }, {
    key: 'applySteering',
    value: function applySteering(timeDelta, entityId, steering) {

      var motion = this.world.get('Motion', entityId);

      var targetDr = 0;

      if (!this.vTarget.isZero()) {
        var position = this.world.get('Position', entityId);

        // Get the target angle, ensuring a 0..2*Math.PI range.
        var targetAngle = this.vTarget.angle();
        if (targetAngle < 0) {
          targetAngle += 2 * Math.PI;
        }

        if (this.debug) {
          steering.targetAngle = targetAngle;
        }

        // Pick the direction from current to target angle
        var direction = targetAngle < position.rotation ? -1 : 1;

        // If the offset between the angles is more than half a circle, it's
        // shorter to go the other way.
        var offset = Math.abs(targetAngle - position.rotation);
        if (offset > Math.PI) {
          direction = 0 - direction;
        }

        // Work out the desired delta-rotation to steer toward target
        targetDr = direction * Math.min(steering.radPerSec, offset / timeDelta);
      }

      // Calculate the delta-rotation impulse required to meet the goal,
      // but constrain to the capability of the steering thrusters
      var impulseDr = targetDr - motion.drotation;
      if (Math.abs(impulseDr) > steering.radPerSec) {
        if (impulseDr > 0) {
          impulseDr = steering.radPerSec;
        } else if (impulseDr < 0) {
          impulseDr = 0 - steering.radPerSec;
        }
      }

      motion.drotation += impulseDr;
    }
  }, {
    key: 'draw',
    value: function draw() /*timeDelta*/{
      if (!this.debug) {
        return;
      }

      /*
      const vpSystem = this.world.getSystem('CanvasViewport');
      const ctx = vpSystem.ctx;
      ctx.save();
        vpSystem.centerAndZoom(timeDelta);
      vpSystem.followEntity(timeDelta);
        const matches = this.getMatchingComponents();
      for (const entityId in matches) {
        ctx.save();
          const steering = matches[entityId];
        const position = this.world.get('Position', entityId);
        const sprite = this.world.get('Sprite', entityId);
          this.drawSteeringVsPosition(ctx, steering, position);
          if (steering.hitCircles) {
          for (const [x, y, size] of steering.hitCircles) {
            ctx.strokeStyle = '#d00';
            ctx.beginPath();
            ctx.arc(x, y, size, 0, PI2, false);
            ctx.stroke();
          }
        }
          if (steering.sensorRange) {
            ctx.strokeStyle = 'rgba(0, 64, 64, 0.75)';
            ctx.beginPath();
            ctx.arc(position.x, position.y, steering.sensorRange, 0, PI2, false);
            ctx.stroke();
        }
          if (steering.vectors) {
          for (const [x, y, U] of steering.vectors) {
            ctx.strokeStyle = 'rgba(0, 64, 64, 0.75)';
            ctx.beginPath();
            ctx.moveTo(position.x, position.y);
            ctx.lineWidth = Math.max(1, Math.min(U, sprite.width));
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        }
          if (steering.pushing) {
          this.drawAngle(ctx, position, position.rotation, '#d0d');
        }
          ctx.restore();
      }
        ctx.restore();
      */
    }
  }, {
    key: 'drawSteeringVsPosition',
    value: function drawSteeringVsPosition(ctx, steering, position) {
      this.drawAngle(ctx, position, position.rotation, '#ddd');
      if (steering.targetAngle) {
        this.drawAngle(ctx, position, steering.targetAngle, '#dd0');
      }
    }
  }, {
    key: 'drawAngle',
    value: function drawAngle(ctx, position, angle, color) {
      var vec = new __WEBPACK_IMPORTED_MODULE_8__lib_Vector2D__["a" /* default */]();
      vec.setValues(this.avoidSeeAhead, 0);
      vec.rotate(angle);
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(position.x + vec.x, position.y + vec.y);
      ctx.stroke();
    }
  }]);

  return SteeringSystem;
}(__WEBPACK_IMPORTED_MODULE_5__lib_core__["System"]);

__WEBPACK_IMPORTED_MODULE_5__lib_core__["registerSystem"]('Steering', SteeringSystem);

/***/ }),
/* 167 */
/*!*************************************!*\
  !*** ./src/plugins/viewportPixi.js ***!
  \*************************************/
/*! exports provided: ViewportPixi, CanvasSprite, registerSprite, getSprite */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewportPixi", function() { return ViewportPixi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasSprite", function() { return CanvasSprite; });
/* harmony export (immutable) */ __webpack_exports__["registerSprite"] = registerSprite;
/* harmony export (immutable) */ __webpack_exports__["getSprite"] = getSprite;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_get__ = __webpack_require__(/*! babel-runtime/helpers/get */ 36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys__ = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__ = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_utils__ = __webpack_require__(/*! ../lib/utils */ 46);








/* global PIXI */



// import filters from 'pixi-filters';
// import extraFilters from 'pixi-extra-filters';

var PI2 = Math.PI * 2;

var idx = void 0,
    p = void 0,
    entityId = void 0,
    position = void 0,
    sprite = void 0;

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
  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default()(ViewportPixi, _Core$System);

  function ViewportPixi() {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, ViewportPixi);

    return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ViewportPixi.__proto__ || __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default()(ViewportPixi)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default()(ViewportPixi, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {
        lineWidth: 5,
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

      this.stage.filters = [
        // new PIXI.filters.VoidFilter(),
        // new PIXI.filters.BlurFilter(1, 1, 5)
      ];

      this.healthBarGraphics = new PIXI.Graphics();
      this.stage.addChild(this.healthBarGraphics);

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

      var sprites = this.world.get('Sprite') || {};

      for (entityId in sprites) {
        position = this.world.get('Position', entityId);
        sprite = sprites[entityId];
        sprite.visible = position.right > this.visibleLeft && position.left < this.visibleRight && position.bottom > this.visibleTop && position.top < this.visibleBottom;
      }

      var toRemove = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default()(this.graphics).filter(function (key) {
        return !(key in sprites);
      });
      toRemove.forEach(function (entityId) {
        _this3.stage.removeChild(_this3.graphics[entityId]);
        delete _this3.graphics[entityId];
      });

      var toAdd = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_keys___default()(sprites).filter(function (key) {
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

      for (var _entityId in this.graphics) {
        this.drawSprite(this.graphics[_entityId], _entityId, timeDelta);
      }

      this.stage.setTransform(this.container.offsetWidth / 2 - this.cameraX * this.zoom, this.container.offsetHeight / 2 - this.cameraY * this.zoom, this.zoom, this.zoom);

      this.renderer.resize(this.container.offsetWidth, this.container.offsetHeight);

      this.renderer.render(this.stage);
    }
  }, {
    key: 'drawSprite',
    value: function drawSprite(ctx, entityId, timeDelta) {
      var sprite = this.world.get('Sprite', entityId);
      if (!sprite) {
        return;
      }

      var position = this.world.get('Position', entityId);

      var spriteFn = getSprite(sprite.name);
      if (!spriteFn) {
        spriteFn = getSprite('default');
      }

      ctx.position.x = Math.floor(position.x);
      ctx.position.y = Math.floor(position.y);
      ctx.rotation = position.rotation + Math.PI / 2;
      ctx.scale.x = ctx.scale.y = sprite.size / 100;
      ctx.lineStyle(this.lineWidth / (sprite.size / 100), sprite.color);
      spriteFn(ctx, sprite, entityId, timeDelta, this.world);

      /*
      const health = this.world.get('Health', entityId);
      if (health) {
      const perc = (health.current / health.max);
      ctx.lineStyle(1.0, 0x333333);
      ctx.moveTo(-50, -57);
      ctx.drawRect(-50, -57, 100, 5);
      ctx.moveTo(-50, -57);
      ctx.beginFill(0x00ff00, 1.0);
      ctx.drawRect(-50, -57, 100 * perc, 5);
      ctx.endFill();
      }
      */

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
        this.followEntityId = __WEBPACK_IMPORTED_MODULE_8__lib_core__["getComponent"]('Name').findEntityByName(this.world, this.options.followName);
      }
      if (this.followEntityId) {
        // Adjust the viewport center offset to the entity position
        var _position = this.world.get('Position', this.followEntityId);
        if (_position) {
          this.cameraX = _position.x;
          this.cameraY = _position.y;
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
      ctx.lineStyle(5, this.options.gridColor);
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
}(__WEBPACK_IMPORTED_MODULE_8__lib_core__["System"]);

__WEBPACK_IMPORTED_MODULE_8__lib_core__["registerSystem"]('ViewportPixi', ViewportPixi);

var CanvasSprite = function (_Core$Component) {
  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default()(CanvasSprite, _Core$Component);

  function CanvasSprite() {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, CanvasSprite);

    return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn___default()(this, (CanvasSprite.__proto__ || __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default()(CanvasSprite)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default()(CanvasSprite, null, [{
    key: 'defaults',
    value: function defaults() {
      return {
        name: null,
        color: 0xffffff,
        size: 100,
        width: null,
        height: null,
        drawn: false,
        visible: false
      };
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      var c = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_get___default()(CanvasSprite.__proto__ || __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default()(CanvasSprite), 'create', this).call(this, attrs);
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
}(__WEBPACK_IMPORTED_MODULE_8__lib_core__["Component"]);

__WEBPACK_IMPORTED_MODULE_8__lib_core__["registerComponent"]('Sprite', CanvasSprite);

var spriteRegistry = {};
function registerSprite(name, sprite) {
  spriteRegistry[name] = sprite;
}
function getSprite(name) {
  return spriteRegistry[name];
}

var defaultShape = [-50, 0, 50, 0, 0, 0, 0, -50, 0, 50, 0, 0];
for (var _idx = 0; _idx < 8; _idx++) {
  var rot = _idx * (PI2 / 8);
  defaultShape.push(50 * Math.cos(rot));
  defaultShape.push(50 * Math.sin(rot));
}
defaultShape.push(50);
defaultShape.push(0);

registerSprite('default', function (g, sprite /*, entityId*/) {
  if (sprite.drawn) {
    return;
  }
  g.drawPolygon(defaultShape);
});

registerSprite('sun', function (ctx, sprite /*, entityId*/) {
  if (sprite.drawn) {
    return;
  }

  ctx.arc(0, 0, 50, 0, PI2, true);
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

var repulsorShape = [-50, 0, -37.5, -50, -25, -50, -6.25, 25, 6.25, 25, 25, -50, 37.5, -50, 50, 0, 37.5, 50, 25, 50, 6.25, -25, -6.25, -25, -25, 50, -37.5, 50, -50, 0];
var repulsorSides = 8;
var repulsorPoints = [];
for (var _idx2 = 0; _idx2 < repulsorSides; _idx2++) {
  var _rot = _idx2 * (PI2 / repulsorSides);
  repulsorPoints.push(Math.cos(_rot));
  repulsorPoints.push(Math.sin(_rot));
}
repulsorPoints.push(repulsorPoints[0]);
repulsorPoints.push(repulsorPoints[1]);

registerSprite('repulsor', function (g, sprite, entityId, timeDelta, world) {
  if (!sprite.drawn) {
    var t = 0; // Math.floor(Math.random() * 15) * 100;
    sprite.rings = [{ t: t, startR: 0, endR: 500, startO: 1.0, endO: 0.0, endT: 1500 }, { t: t + 250, startR: 0, endR: 500, startO: 1.0, endO: 0.0, endT: 1500 }, { t: t + 500, startR: 0, endR: 500, startO: 1.0, endO: 0.0, endT: 1500 }];
  }

  var repulsor = world.get('Repulsor', entityId);
  if (repulsor) {
    sprite.rings.forEach(function (ring) {
      return ring.endR = repulsor.range;
    });
  }

  g.clear();
  g.lineStyle(5 / (sprite.size / 100), 0x228822);
  g.drawPolygon(repulsorShape);

  var dt = Math.floor(timeDelta * 1000);
  sprite.rings.forEach(function (ring) {
    ring.t += dt;
    if (ring.t >= ring.endT) {
      ring.t = 0;
    }

    if (!sprite.visible) {
      return;
    }

    var r = Object(__WEBPACK_IMPORTED_MODULE_9__lib_utils__["c" /* lerp */])(ring.startR, ring.endR, ring.t / ring.endT);
    var a = Object(__WEBPACK_IMPORTED_MODULE_9__lib_utils__["c" /* lerp */])(ring.startO, ring.endO, ring.t / ring.endT);

    g.lineStyle(5 / (sprite.size / 100), 0x228822, a);
    g.moveTo(-r, 0);
    g.drawPolygon(repulsorPoints.map(function (p) {
      return r * p;
    }));
  });
});

var heroShape = [-50, 0, -37.5, -37.5, 0, -50, 37.5, -37.5, 50, 0, 37.5, 50, 25, 50, 12.5, 12.5, 5, 25, -5, 25, -12.5, 12.5, -25, 50, -37.5, 50, -50, 0];

registerSprite('hero', function (g, sprite /*, entityId*/) {
  if (sprite.drawn) {
    return;
  }
  g.drawPolygon(heroShape);
});

registerSprite('asteroid', function (g, sprite /*, entityId*/) {
  if (sprite.drawn) {
    return;
  }

  var NUM_POINTS = 10 + Math.floor(8 * Math.random());
  var MAX_RADIUS = 50;
  var MIN_RADIUS = 35;
  var ROTATION = PI2 / NUM_POINTS;

  var idx = void 0;
  var points = [];

  for (idx = 0; idx < NUM_POINTS; idx++) {
    var _rot2 = idx * ROTATION;
    var dist = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
    points.push(dist * Math.cos(_rot2));
    points.push(dist * Math.sin(_rot2));
  }
  points.push(points[0]);
  points.push(points[1]);

  g.drawPolygon(points);
});

registerSprite('mine', function (g, sprite /*, entityId, timeDelta, world*/) {
  if (!sprite.drawn) {
    var NUM_POINTS = 10 + Math.floor(10 * Math.random());
    if (NUM_POINTS % 2 !== 0) {
      NUM_POINTS++;
    }
    var ROTATION = PI2 / NUM_POINTS;
    var MAX_RADIUS = 60;
    var MIN_RADIUS = 10;

    var even = false;

    sprite.legs = [];
    for (var _idx3 = 0; _idx3 < NUM_POINTS; _idx3++) {
      var dist = even ? 10 : Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
      var _rot3 = _idx3 * ROTATION;
      sprite.legs.push(dist * Math.cos(_rot3));
      sprite.legs.push(dist * Math.sin(_rot3));
      even = !even;
    }
    sprite.legs.push(sprite.legs[0]);
    sprite.legs.push(sprite.legs[1]);
  }

  if (sprite.drawn && Math.random() > 0.15) {
    return;
  }

  g.clear();
  g.lineStyle(5 / (sprite.size / 100), 0xFF2222);
  g.drawPolygon(sprite.legs.map(function (p) {
    return p * (0.9 + 0.5 * Math.random());
  }));
});

registerSprite('explosion', function (g, sprite, entityId, timeDelta) {

  if (!sprite.drawn) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(sprite, {
      ttl: 2.0,
      radius: 100,
      maxParticles: 25,
      maxParticleSize: 4,
      maxVelocity: 300,
      age: 0,
      alpha: 0,
      stop: false,
      particles: []
    }, sprite);
    for (idx = 0; idx < sprite.maxParticles; idx++) {
      sprite.particles.push({ free: true });
    }
  }

  for (idx = 0; idx < sprite.particles.length; idx++) {
    p = sprite.particles[idx];

    if (!sprite.stop && p.free) {

      p.velocity = sprite.maxVelocity * Math.random();
      p.angle = Math.PI * 2 * Math.random();
      p.dx = 0 - p.velocity * Math.sin(p.angle);
      p.dy = p.velocity * Math.cos(p.angle);
      p.distance = p.x = p.y = 0;
      p.maxDistance = sprite.radius * Math.random();
      p.size = sprite.maxParticleSize;
      p.free = false;
    } else if (!p.free) {

      p.x += p.dx * timeDelta;
      p.y += p.dy * timeDelta;

      p.distance += p.velocity * timeDelta;
      if (p.distance >= p.maxDistance) {
        p.distance = p.maxDistance;
        p.free = true;
      }
    }
  }

  sprite.age += timeDelta;

  if (sprite.age >= sprite.ttl) {
    sprite.stop = true;
  }

  sprite.alpha = Math.max(0, 1 - sprite.age / sprite.ttl);

  g.clear();

  for (idx = 0; idx < sprite.particles.length; idx++) {
    p = sprite.particles[idx];
    if (p.free) {
      continue;
    }

    g.lineStyle(5 / (sprite.size / 100), sprite.color, (1 - p.distance / p.maxDistance) * sprite.alpha);
    g.moveTo(0, 0);
    g.lineTo(p.x, p.y);
  }
});

/***/ }),
/* 168 */
/*!*****************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/toConsumableArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(/*! ../core-js/array/from */ 169);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 169 */
/*!**********************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/array/from.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/array/from */ 170), __esModule: true };

/***/ }),
/* 170 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/fn/array/from.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ 34);
__webpack_require__(/*! ../../modules/es6.array.from */ 171);
module.exports = __webpack_require__(/*! ../../modules/_core */ 6).Array.from;


/***/ }),
/* 171 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.array.from.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ 24);
var $export = __webpack_require__(/*! ./_export */ 7);
var toObject = __webpack_require__(/*! ./_to-object */ 32);
var call = __webpack_require__(/*! ./_iter-call */ 90);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 91);
var toLength = __webpack_require__(/*! ./_to-length */ 47);
var createProperty = __webpack_require__(/*! ./_create-property */ 172);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 71);

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 173)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 172 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_create-property.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ 11);
var createDesc = __webpack_require__(/*! ./_property-desc */ 41);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 173 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-detect.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ 9)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 174 */
/*!*************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/values.js ***!
  \*************************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/values */ 175), __esModule: true };

/***/ }),
/* 175 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/values.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es7.object.values */ 176);
module.exports = __webpack_require__(/*! ../../modules/_core */ 6).Object.values;


/***/ }),
/* 176 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.object.values.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 7);
var $values = __webpack_require__(/*! ./_object-to-array */ 177)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 177 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-to-array.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ 26);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 14);
var isEnum = __webpack_require__(/*! ./_object-pie */ 42).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ })
/******/ ]);
//# sourceMappingURL=core.js.map