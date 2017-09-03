webpackJsonp([2],{

/***/ 188:
/*!*****************************************!*\
  !*** multi ./src/sketches/repulsors.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/sketches/repulsors.js */189);


/***/ }),

/***/ 189:
/*!***********************************!*\
  !*** ./src/sketches/repulsors.js ***!
  \***********************************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__plugins_drawStats__ = __webpack_require__(/*! ../plugins/drawStats */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plugins_memoryStats__ = __webpack_require__(/*! ../plugins/memoryStats */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins_datGui__ = __webpack_require__(/*! ../plugins/datGui */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__plugins_viewportWebGL__ = __webpack_require__(/*! ../plugins/viewportWebGL */ 35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__plugins_name__ = __webpack_require__(/*! ../plugins/name */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugins_health__ = __webpack_require__(/*! ../plugins/health */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__plugins_position__ = __webpack_require__(/*! ../plugins/position */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__plugins_motion__ = __webpack_require__(/*! ../plugins/motion */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__plugins_thruster__ = __webpack_require__(/*! ../plugins/thruster */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__plugins_seeker__ = __webpack_require__(/*! ../plugins/seeker */ 33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__plugins_collision__ = __webpack_require__(/*! ../plugins/collision */ 41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__plugins_bounce__ = __webpack_require__(/*! ../plugins/bounce */ 39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__plugins_repulsor__ = __webpack_require__(/*! ../plugins/repulsor */ 49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__plugins_playerInputSteering__ = __webpack_require__(/*! ../plugins/playerInputSteering */ 43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__plugins_hordeSpawn__ = __webpack_require__(/*! ../plugins/hordeSpawn */ 48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__plugins_spawn__ = __webpack_require__(/*! ../plugins/spawn */ 22);



















var debug = true;

var world = window.world = new __WEBPACK_IMPORTED_MODULE_0__lib_core__["World"]({
  systems: {
    ViewportWebGL: {
      debug: debug,
      container: '#game',
      followName: 'hero1',
      zoom: 0.3
    },
    DrawStats: {},
    // MemoryStats: {},
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
    HordeSpawn: {
      viewportSystemName: 'ViewportWebGL',
      offscreenTTL: 0.5,
      spawnMargin: 250,
      minCount: 150,
      maxFrameSpawn: 15,
      spawn: function spawn(x, y) {
        var MIN_SIZE = 100;
        var MAX_SIZE = 300;
        var size = (MAX_SIZE - MIN_SIZE) * Math.random() + MIN_SIZE;
        world.insert({
          Sprite: { name: 'mine', size: size, color: 0xff2222 },
          Health: { max: 4 * size * size },
          Spawn: {},
          Collidable: {},
          Bounce: { mass: 4 * size * size },
          Position: { x: x, y: y, rotation: Math.PI * 2 * Math.random() },
          Motion: { dx: 0, dy: 0, drotation: Math.PI * 2 * Math.random() },
          Thruster: { deltaV: 2400 + Math.random() * 100, maxV: 1200 + Math.random() * 200 },
          Seeker: { targetName: 'hero1', radPerSec: 0.5 + Math.random() * 0.2 },
          HordeSpawn: {}
        });
      }
    }
  }
});

world.insert({
  Name: { name: 'hero1' },
  // Health: { max: 4000 },
  Sprite: { name: 'hero', size: 150, color: 0x3333ff },
  Spawn: {},
  Collidable: {},
  Bounce: { damage: 0.0001, mass: 7000 },
  Position: { x: 0, y: 0, rotation: -(Math.PI / 2) },
  Motion: {},
  Thruster: { deltaV: 2800, maxV: 1400, active: false },
  PlayerInputSteering: { radPerSec: Math.PI }
});

var x = 0;
for (var y = 0; y > -15000; y -= 600) {
  world.insert({
    Name: { name: 'repulsor' + y },
    Sprite: { name: 'repulsor', color: 0x228822 },
    Position: { x: x, y: y },
    Motion: {},
    Repulsor: { range: 600, force: 300 }
  });
  x += -300 + Math.random() * 600;
}

world.start();

var vpSystem = world.getSystem('ViewportWebGL');
var spawnSystem = world.getSystem('HordeSpawn');
var guiSystem = world.getSystem('DatGui');
var gui = guiSystem.gui;

gui.add(world, 'isPaused');
gui.add(world, 'debug');
gui.add(vpSystem, 'zoom', vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();
gui.add(vpSystem, 'lineWidth', 1.0, 4.0).step(0.5).listen();

var names = ['gridEnabled', 'followEnabled', 'cameraX', 'cameraY'];
names.forEach(function (name) {
  gui.add(vpSystem, name).listen();
});

var cp = vpSystem.cursorPosition;
gui.add(cp, 'x').listen();
gui.add(cp, 'y').listen();

gui.add(spawnSystem, 'spawnCount').listen();

/***/ })

},[188]);
//# sourceMappingURL=index.js.map