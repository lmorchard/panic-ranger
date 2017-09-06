webpackJsonp([3],{

/***/ 188:
/*!*************************************!*\
  !*** multi ./src/sketches/roads.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/sketches/roads.js */189);


/***/ }),

/***/ 189:
/*!*******************************!*\
  !*** ./src/sketches/roads.js ***!
  \*******************************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_utils__ = __webpack_require__(/*! ../lib/utils */ 46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plugins_drawStats__ = __webpack_require__(/*! ../plugins/drawStats */ 17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins_memoryStats__ = __webpack_require__(/*! ../plugins/memoryStats */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__plugins_datGui__ = __webpack_require__(/*! ../plugins/datGui */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__plugins_debugCanvas__ = __webpack_require__(/*! ../plugins/debugCanvas */ 45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugins_viewportWebGL__ = __webpack_require__(/*! ../plugins/viewportWebGL */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__plugins_name__ = __webpack_require__(/*! ../plugins/name */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__plugins_health__ = __webpack_require__(/*! ../plugins/health */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__plugins_position__ = __webpack_require__(/*! ../plugins/position */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__plugins_motion__ = __webpack_require__(/*! ../plugins/motion */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__plugins_thruster__ = __webpack_require__(/*! ../plugins/thruster */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__plugins_seeker__ = __webpack_require__(/*! ../plugins/seeker */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__plugins_collision__ = __webpack_require__(/*! ../plugins/collision */ 32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__plugins_bounce__ = __webpack_require__(/*! ../plugins/bounce */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__plugins_repulsor__ = __webpack_require__(/*! ../plugins/repulsor */ 39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__plugins_playerInputSteering__ = __webpack_require__(/*! ../plugins/playerInputSteering */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__plugins_hordeSpawn__ = __webpack_require__(/*! ../plugins/hordeSpawn */ 51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__plugins_spawn__ = __webpack_require__(/*! ../plugins/spawn */ 15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__plugins_roadRunner__ = __webpack_require__(/*! ../plugins/roadRunner */ 73);






















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
    RoadRunner: {
      astarCacheTTL: 2.0
    }
  }
});

var destinations = [];

var placeRepulsor = function placeRepulsor(x, y, horiz, markDestination) {
  var id = world.insert({
    Name: { name: 'repulsor' + y },
    Sprite: { name: 'repulsor', color: 0x114411, size: 100 },
    Position: {
      x: x + (horiz ? 0 : Math.random() * 200 - 100),
      y: y + (!horiz ? 0 : Math.random() * 200 - 100)
    },
    Motion: {},
    Repulsor: { range: 600, force: 300 },
    Road: { type: 'repulsor', range: 800 }
  });
  if (markDestination) {
    destinations.push(id);
  }
};

var x = 0;
var y = 0;
var spacing = 600;
var num = 4;
for (x = -num * spacing; x <= num * spacing; x += spacing) {
  placeRepulsor(x, -(spacing * num), true, true);
  placeRepulsor(x, 0, true, true);
  placeRepulsor(x, spacing * num, true, true);
}
for (y = -(num - 1) * spacing; y <= num * spacing; y += spacing) {
  //placeRepulsor(-(spacing * num), y, false);
  placeRepulsor(0, y, true, false);
  //placeRepulsor((spacing * num), y, false);
}

function spawnSelfDrivingBus() {
  var color = 0xffffff * Math.random();
  var spawnPoint = destinations[Math.floor(Math.random() * destinations.length)];

  var _world$get = world.get('Position', spawnPoint),
      x = _world$get.x,
      y = _world$get.y;

  var destination = void 0;
  do {
    destination = destinations[Math.floor(Math.random() * destinations.length)];
  } while (Object(__WEBPACK_IMPORTED_MODULE_1__lib_utils__["b" /* distance */])({ x: x, y: y }, world.get('Position', destination)) < 3000);

  return world.insert({
    Name: { name: 'bus' + Math.random() },
    Sprite: { name: 'hero', size: 150, color: color },
    Spawn: {
      tombstone: function tombstone(spawn, entityId) {
        return {
          Name: world.get('Name', entityId),
          Sprite: { name: 'hero', size: 150, color: color },
          Position: world.get('Position', entityId),
          Motion: { drotation: Math.PI * 8 },
          Spawn: { ttl: 0.5 }
        };
      }
    },
    Collidable: {},
    // Bounce: { mass: 7000 },
    Position: {
      x: x, y: y,
      rotation: Math.PI * 2 * Math.random()
    },
    Motion: {},
    Thruster: { deltaV: 5000, maxV: 1250 },
    Seeker: {
      thrusterTurnCutoff: Math.PI * 0.01,
      thrusterTurnThrottle: 0.01,
      radPerSec: Math.PI * 4,
      active: false
    },
    Runner: { destination: '' + destination }
  });
}

// Spawn some initial entities
for (var i = 0; i < 50; i++) {
  setTimeout(spawnSelfDrivingBus, 5000 * Math.random());
}

// Spawn new entities when old ones reach their destinations
world.subscribe(__WEBPACK_IMPORTED_MODULE_19__plugins_roadRunner__["MSG_DESTINATION_REACHED"], function (msg, entityId) {
  world.publish(__WEBPACK_IMPORTED_MODULE_18__plugins_spawn__["MSG_DESTROY"], entityId);
  setTimeout(spawnSelfDrivingBus, 1000 * Math.random());
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
vpf.add(vpSystem, 'spriteCount').listen();
vpf.add(vpSystem, 'lastVertexCount').listen();
vpf.add(vpSystem, 'actualBufferSize').listen();
vpf.add(vpSystem, 'calculatedBufferSize').listen();

var rrf = gui.addFolder('RoadRunner');
['debug', 'debugRange', 'debugRoads', 'debugPath'].forEach(function (name) {
  return rrf.add(roadRunnerSystem.options, name);
});
rrf.open();

/***/ })

},[188]);
//# sourceMappingURL=index.js.map