webpackJsonp([2],{

/***/ 198:
/*!*************************************!*\
  !*** multi ./src/sketches/roads.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/sketches/roads.js */199);


/***/ }),

/***/ 199:
/*!*******************************!*\
  !*** ./src/sketches/roads.js ***!
  \*******************************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__plugins_drawStats__ = __webpack_require__(/*! ../plugins/drawStats */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plugins_memoryStats__ = __webpack_require__(/*! ../plugins/memoryStats */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins_datGui__ = __webpack_require__(/*! ../plugins/datGui */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__plugins_debugCanvas__ = __webpack_require__(/*! ../plugins/debugCanvas */ 68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__plugins_viewportWebGL__ = __webpack_require__(/*! ../plugins/viewportWebGL */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugins_name__ = __webpack_require__(/*! ../plugins/name */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__plugins_health__ = __webpack_require__(/*! ../plugins/health */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__plugins_position__ = __webpack_require__(/*! ../plugins/position */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__plugins_motion__ = __webpack_require__(/*! ../plugins/motion */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__plugins_thruster__ = __webpack_require__(/*! ../plugins/thruster */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__plugins_seeker__ = __webpack_require__(/*! ../plugins/seeker */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__plugins_collision__ = __webpack_require__(/*! ../plugins/collision */ 38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__plugins_bounce__ = __webpack_require__(/*! ../plugins/bounce */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__plugins_repulsor__ = __webpack_require__(/*! ../plugins/repulsor */ 49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__plugins_playerInputSteering__ = __webpack_require__(/*! ../plugins/playerInputSteering */ 39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__plugins_hordeSpawn__ = __webpack_require__(/*! ../plugins/hordeSpawn */ 48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__plugins_spawn__ = __webpack_require__(/*! ../plugins/spawn */ 27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__plugins_roadRunner__ = __webpack_require__(/*! ../plugins/roadRunner */ 69);





















var debug = true;

var world = window.world = new __WEBPACK_IMPORTED_MODULE_0__lib_core__["World"]({
  systems: {
    ViewportWebGL: {
      debug: debug,
      container: '#game',
      followName: 'hero1',
      zoom: 0.3,
      lineWidth: 2.5
    },
    DebugCanvas: {
      container: '#game',
      viewportSystemName: 'ViewportWebGL'
    },
    DrawStats: {},
    DatGui: {},
    PlayerInputSteering: {},
    Health: {},
    Motion: {},
    Position: {},
    Thruster: {},
    Seeker: {},
    Repulsor: {},
    Collision: {},
    Bounce: {},
    Spawn: {},
    RoadRunner: {}
  }
});

var x = 0;
var y = 0;
var id = void 0;

var destinations = [];

var placeRepulsor = function placeRepulsor(x, y) {
  return id = world.insert({
    Name: { name: 'repulsor' + y },
    Sprite: { name: 'repulsor', color: 0x228822, size: 100 },
    Position: { x: x, y: y },
    Motion: {},
    Repulsor: { range: 600, force: 300 },
    Road: { type: 'repulsor', range: 800 }
  });
};

for (y = 0; y > -3000; y -= 600) {
  placeRepulsor(x, y);
  x += -300 + Math.random() * 600;
}
destinations.push(id);

x = 0;
for (y = 600; y < 3000; y += 600) {
  placeRepulsor(x, y);
  x += -300 + Math.random() * 600;
}
destinations.push(id);

y = 0;
for (x = -600; x > -3000; x -= 600) {
  placeRepulsor(x, y);
  y += -300 + Math.random() * 600;
}
destinations.push(id);

y = 0;
for (x = 600; x < 3000; x += 600) {
  placeRepulsor(x, y);
  y += -300 + Math.random() * 600;
}
destinations.push(id);

world.insert({
  Name: { name: 'hero1' },
  Sprite: { name: 'hero', size: 150, color: 0x3333ff },
  Spawn: {},
  Collidable: {},
  Bounce: { damage: 0.0001, mass: 7000 },
  Position: { x: 0, y: 0, rotation: -(Math.PI / 2) },
  Motion: {},
  Thruster: { deltaV: 2800, maxV: 1400, active: false },
  PlayerInputSteering: { radPerSec: Math.PI },
  Runner: { destination: '' + destinations[0] }
});

world.debug = true;

world.start();

var vpSystem = world.getSystem('ViewportWebGL');
var roadRunnerSystem = world.getSystem('RoadRunner');
var guiSystem = world.getSystem('DatGui');
var gui = guiSystem.gui;

var generalf = gui.addFolder('General');
generalf.add(world, 'isPaused');
generalf.add(world, 'debug');

var vpf = gui.addFolder('Viewport');
var names = ['gridEnabled', 'followEnabled', 'cameraX', 'cameraY'];
names.forEach(function (name) {
  return vpf.add(vpSystem, name).listen();
});
vpf.add(vpSystem, 'zoom', vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();
vpf.add(vpSystem, 'lineWidth', 1.0, 4.0).step(0.5).listen();

var rrf = gui.addFolder('RoadRunner');
['debug', 'debugRange', 'debugRoads', 'debugText', 'debugPath'].forEach(function (name) {
  return rrf.add(roadRunnerSystem.options, name);
});
rrf.open();

/***/ })

},[198]);
//# sourceMappingURL=index.js.map