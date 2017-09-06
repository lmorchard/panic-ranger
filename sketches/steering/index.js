webpackJsonp([0],{

/***/ 194:
/*!****************************************!*\
  !*** multi ./src/sketches/steering.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/sketches/steering.js */195);


/***/ }),

/***/ 195:
/*!**********************************!*\
  !*** ./src/sketches/steering.js ***!
  \**********************************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__plugins_drawStats__ = __webpack_require__(/*! ../plugins/drawStats */ 17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plugins_memoryStats__ = __webpack_require__(/*! ../plugins/memoryStats */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins_datGui__ = __webpack_require__(/*! ../plugins/datGui */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__plugins_debugCanvas__ = __webpack_require__(/*! ../plugins/debugCanvas */ 45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__plugins_viewportWebGL__ = __webpack_require__(/*! ../plugins/viewportWebGL */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugins_name__ = __webpack_require__(/*! ../plugins/name */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__plugins_health__ = __webpack_require__(/*! ../plugins/health */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__plugins_position__ = __webpack_require__(/*! ../plugins/position */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__plugins_motion__ = __webpack_require__(/*! ../plugins/motion */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__plugins_thruster__ = __webpack_require__(/*! ../plugins/thruster */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__plugins_steering__ = __webpack_require__(/*! ../plugins/steering */ 75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__plugins_collision__ = __webpack_require__(/*! ../plugins/collision */ 32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__plugins_bounce__ = __webpack_require__(/*! ../plugins/bounce */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__plugins_repulsor__ = __webpack_require__(/*! ../plugins/repulsor */ 39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__plugins_playerInputSteering__ = __webpack_require__(/*! ../plugins/playerInputSteering */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__plugins_spawn__ = __webpack_require__(/*! ../plugins/spawn */ 15);



















var debug = true;

var world = window.world = new __WEBPACK_IMPORTED_MODULE_0__lib_core__["World"]({
  systems: {
    ViewportWebGL: {
      debug: debug,
      container: '#game',
      zoom: 0.2,
      gridEnabled: false,
      followName: 'hero1',
      lineWidth: 2.0
    },
    DebugCanvas: {
      container: '#game',
      viewportSystemName: 'ViewportWebGL'
    },
    DrawStats: {},
    DatGui: {},
    Health: {},
    Motion: {},
    Position: {},
    Thruster: {},
    Steering: {
      behaviors: ['avoid', 'push', 'seek', 'flee', 'wander', 'evade', 'pursue']
    },
    Repulsor: {},
    Collision: {},
    Bounce: {},
    Spawn: {}
  }
});

world.debug = debug;

var pads = [];
[-2000, 2000].forEach(function (x, idx) {
  return pads.push(world.insert({
    Name: { name: 'pad' + idx },
    Sprite: { name: 'default', color: 0x888888, size: 100 },
    Position: { x: x, y: 0 }
  }));
});

function spawnShip() {
  var idx = Math.random();
  var sourceId = pads[Math.floor(pads.length * Math.random())];
  var source = world.get('Position', sourceId);
  var destId = void 0;
  do {
    destId = pads[Math.floor(pads.length * Math.random())];
  } while (destId === sourceId);
  var dest = world.get('Position', destId);

  ships.push(world.insert({
    Name: {
      name: 'ship' + idx,
      tags: ['ship']
    },
    Spawn: {
      ttl: 10 + Math.random()
    },
    Sprite: {
      name: 'hero',
      size: 100,
      color: 0xffffff * Math.random()
    },
    Position: {
      x: source.x + 250 * Math.random(),
      y: source.y + 250 * Math.random(),
      rotation: Math.PI * 2 * Math.random()
    },
    Bounce: {
      mass: 100
    },
    Collidable: {},
    Motion: {},
    Thruster: {
      deltaV: 5000, // + 500 * Math.random(),
      maxV: 1000 // + 500 * Math.random()
    },
    Steering: {
      active: true,
      thrusterTurnCutoff: Math.PI * 0.1,
      thrusterTurnThrottle: 0.0,
      radPerSec: Math.PI * 1.5,

      seekFactor: 1.0,
      seekTargetPosition: dest,

      avoidFactor: 1.75,
      avoidTags: ['ship'],
      avoidSensorRange: 500
    }
  }));
}

var ships = [];
for (var idx = 0; idx < 25; idx++) {
  setTimeout(spawnShip, 5000 * Math.random());
}

world.subscribe(__WEBPACK_IMPORTED_MODULE_16__plugins_spawn__["MSG_DESPAWN"], function () {
  setTimeout(spawnShip, 1000 * Math.random());
});

world.start();

var vpSystem = world.getSystem('ViewportWebGL');
var guiSystem = world.getSystem('DatGui');
var gui = guiSystem.gui;

var generalf = gui.addFolder('General');
generalf.add(world, 'isPaused');
generalf.add(world, 'debug');
generalf.open();

var vpf = gui.addFolder('Viewport');
var names = ['gridEnabled', 'followEnabled', 'cameraX', 'cameraY'];
names.forEach(function (name) {
  return vpf.add(vpSystem, name).listen();
});
vpf.add(vpSystem, 'zoom', vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();
vpf.add(vpSystem, 'lineWidth', 1.0, 4.0).step(0.5).listen();
vpf.add(vpSystem, 'spriteCount').listen();
vpf.add(vpSystem, 'lastVertexCount').listen();
vpf.add(vpSystem, 'actualBufferSize').listen();
vpf.add(vpSystem, 'calculatedBufferSize').listen();

/***/ })

},[194]);
//# sourceMappingURL=index.js.map