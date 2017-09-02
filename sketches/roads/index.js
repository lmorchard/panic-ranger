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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__plugins_collision__ = __webpack_require__(/*! ../plugins/collision */ 37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__plugins_bounce__ = __webpack_require__(/*! ../plugins/bounce */ 33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__plugins_repulsor__ = __webpack_require__(/*! ../plugins/repulsor */ 49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__plugins_playerInputSteering__ = __webpack_require__(/*! ../plugins/playerInputSteering */ 38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__plugins_hordeSpawn__ = __webpack_require__(/*! ../plugins/hordeSpawn */ 48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__plugins_spawn__ = __webpack_require__(/*! ../plugins/spawn */ 27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__plugins_roadRunner__ = __webpack_require__(/*! ../plugins/roadRunner */ 69);





















var debug = false;

var world = window.world = new __WEBPACK_IMPORTED_MODULE_0__lib_core__["World"]({
  systems: {
    ViewportWebGL: {
      debug: debug,
      container: '#game',
      zoom: 0.125,
      gridEnabled: false,
      lineWidth: 2.0
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
    Sprite: { name: 'repulsor', color: 0x114411, size: 100 },
    Position: { x: x, y: y },
    Motion: {},
    // Repulsor: { range: 600, force: 300 },
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

var spawnPoints = destinations.map(function (id) {
  return world.get('Position', id);
});

function spawnSelfDrivingBus() {
  var color = 0xffffff * Math.random();
  var destination = '' + destinations[Math.floor(Math.random() * destinations.length)];
  var _spawnPoints$Math$flo = spawnPoints[Math.floor(Math.random() * spawnPoints.length)],
      x = _spawnPoints$Math$flo.x,
      y = _spawnPoints$Math$flo.y;

  x += 400 * Math.random() - 200;
  y += 400 * Math.random() - 200;

  return world.insert({
    Name: { name: 'bus' + Math.random() },
    Sprite: { name: 'hero', size: 150, color: color },
    Spawn: {},
    Collidable: {},
    Bounce: { mass: 7000 },
    Position: {
      x: x, y: y,
      rotation: Math.PI * 2 * Math.random()
    },
    Motion: {},
    Thruster: { deltaV: 4000, maxV: 1500 },
    Seeker: { radPerSec: Math.PI * 1.25, active: false },
    Runner: { destination: destination }
  });
}

// Spawn some initial entities
for (var i = 0; i < 10; i++) {
  setTimeout(spawnSelfDrivingBus, 1000 * Math.random());
}

// Spawn new entities when old ones reach their destinations
world.subscribe(__WEBPACK_IMPORTED_MODULE_18__plugins_roadRunner__["MSG_DESTINATION_REACHED"], function (msg, entityId) {
  world.publish(__WEBPACK_IMPORTED_MODULE_17__plugins_spawn__["MSG_DESTROY"], entityId);
  setTimeout(spawnSelfDrivingBus, 1000 * Math.random());
});

world.subscribe(__WEBPACK_IMPORTED_MODULE_17__plugins_spawn__["MSG_DESPAWN"], function (msg, entityId) {
  return console.log('DESPAWN', world.get('Name', entityId).name);
});
world.subscribe(__WEBPACK_IMPORTED_MODULE_17__plugins_spawn__["MSG_SPAWN"], function (msg, entityId) {
  return console.log('SPAWN', world.get('Name', entityId).name);
});

world.debug = debug;

world.start();

var vpSystem = world.getSystem('ViewportWebGL');
var roadRunnerSystem = world.getSystem('RoadRunner');
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

var rrf = gui.addFolder('RoadRunner');
['debug', 'debugRange', 'debugRoads', 'debugPath'].forEach(function (name) {
  return rrf.add(roadRunnerSystem.options, name);
});
rrf.open();

/***/ })

},[198]);
//# sourceMappingURL=index.js.map