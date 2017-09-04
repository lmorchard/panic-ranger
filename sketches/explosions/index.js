webpackJsonp([4],{

/***/ 183:
/*!******************************************!*\
  !*** multi ./src/sketches/explosions.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/sketches/explosions.js */184);


/***/ }),

/***/ 184:
/*!************************************!*\
  !*** ./src/sketches/explosions.js ***!
  \************************************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plugins_drawStats__ = __webpack_require__(/*! ../plugins/drawStats */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins_memoryStats__ = __webpack_require__(/*! ../plugins/memoryStats */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__plugins_datGui__ = __webpack_require__(/*! ../plugins/datGui */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__plugins_viewportWebGL__ = __webpack_require__(/*! ../plugins/viewportWebGL */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugins_name__ = __webpack_require__(/*! ../plugins/name */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__plugins_position__ = __webpack_require__(/*! ../plugins/position */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__plugins_motion__ = __webpack_require__(/*! ../plugins/motion */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__plugins_spawn__ = __webpack_require__(/*! ../plugins/spawn */ 18);












var DEBUG = true;
var MIN_COUNT = 150;
var FIELD_SIZE = 1500;

var debugData = {
  count: 0,
  spawns: 0,
  despawns: 0
};

var world = window.world = new __WEBPACK_IMPORTED_MODULE_1__lib_core__["World"]({
  systems: {
    ViewportWebGL: {
      debug: DEBUG,
      container: '#game',
      WebGL: '#viewport',
      zoom: 0.3
    },
    DrawStats: {},
    MemoryStats: {},
    DatGui: {},
    Motion: {},
    Position: {},
    Spawn: {}
  }
});
world.start();

var colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff, 0xffffff];

function spawnExplosion() {
  var x = FIELD_SIZE * 2 * Math.random() - FIELD_SIZE;
  var y = FIELD_SIZE * 2 * Math.random() - FIELD_SIZE;
  var ttl = 0.5 + 2.0 * Math.random();
  var color = colors[Math.floor(Math.random() * colors.length)];

  world.insert({
    Sprite: { name: 'default', color: color },
    Position: { x: x, y: y },
    Spawn: {
      ttl: Math.random(),
      tombstone: {
        Sprite: {
          name: 'explosion',
          size: 100 + Math.random() * 500,
          color: color, ttl: ttl
        },
        Position: { x: x, y: y },
        Spawn: { ttl: ttl }
      }
    }
  });
}

for (var i = 0; i < MIN_COUNT; i++) {
  spawnExplosion();
}

world.subscribe(__WEBPACK_IMPORTED_MODULE_9__plugins_spawn__["MSG_SPAWN"], function () /*msg, entityId*/{
  debugData.spawns++;
});

world.subscribe(__WEBPACK_IMPORTED_MODULE_9__plugins_spawn__["MSG_DESPAWN"], function () /*msg, entityId*/{
  debugData.despawns++;
  debugData.count = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(world.get('Sprite') || {}).length;
  for (var _i = 0; _i < MIN_COUNT - debugData.count; _i++) {
    spawnExplosion();
  }
});

var vpSystem = world.getSystem('ViewportWebGL');
var guiSystem = world.getSystem('DatGui');
var gui = guiSystem.gui;

gui.add(world, 'isPaused');
gui.add(world, 'debug');
gui.add(vpSystem, 'zoom', vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();

['gridEnabled'].forEach(function (name) {
  return gui.add(vpSystem, name).listen();
});
['count', 'spawns', 'despawns'].forEach(function (name) {
  return gui.add(debugData, name).listen();
});

/***/ })

},[183]);
//# sourceMappingURL=index.js.map