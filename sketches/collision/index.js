webpackJsonp([6],{

/***/ 185:
/*!*****************************************!*\
  !*** multi ./src/sketches/collision.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/sketches/collision.js */186);


/***/ }),

/***/ 186:
/*!***********************************!*\
  !*** ./src/sketches/collision.js ***!
  \***********************************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_Vector2D__ = __webpack_require__(/*! ../lib/Vector2D */ 28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plugins_drawStats__ = __webpack_require__(/*! ../plugins/drawStats */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins_memoryStats__ = __webpack_require__(/*! ../plugins/memoryStats */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__plugins_datGui__ = __webpack_require__(/*! ../plugins/datGui */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__plugins_viewportWebGL__ = __webpack_require__(/*! ../plugins/viewportWebGL */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugins_name__ = __webpack_require__(/*! ../plugins/name */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__plugins_health__ = __webpack_require__(/*! ../plugins/health */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__plugins_position__ = __webpack_require__(/*! ../plugins/position */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__plugins_motion__ = __webpack_require__(/*! ../plugins/motion */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__plugins_thruster__ = __webpack_require__(/*! ../plugins/thruster */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__plugins_seeker__ = __webpack_require__(/*! ../plugins/seeker */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__plugins_collision__ = __webpack_require__(/*! ../plugins/collision */ 37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__plugins_bounce__ = __webpack_require__(/*! ../plugins/bounce */ 33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__plugins_playerInputSteering__ = __webpack_require__(/*! ../plugins/playerInputSteering */ 38);


















var debug = true;

var world = window.world = new __WEBPACK_IMPORTED_MODULE_0__lib_core__["World"]({
  systems: {
    ViewportWebGL: {
      debug: debug,
      container: '#game',
      followName: 'hero1',
      lineWidth: 1.5,
      zoom: 0.5
    },
    DrawStats: {},
    MemoryStats: {},
    DatGui: {},
    PlayerInputSteering: {},
    Motion: {},
    Position: {},
    Thruster: {},
    Seeker: {},
    Collision: {},
    Bounce: {}
  }
});

world.insert({
  Name: { name: 'hero1' },
  Sprite: { name: 'hero', size: 100, color: 0x3333ff },
  Collidable: {},
  Bounce: { mass: 7000 },
  Position: { x: 0, y: 0 },
  Motion: {},
  Thruster: { deltaV: 1200, maxV: 500, active: false },
  PlayerInputSteering: { radPerSec: Math.PI }
});

function spawnAsteroid(x, y, width, height, dx, dy, dr, mass, health) {
  world.insert({
    Sprite: { name: 'asteroid', size: width },
    Health: { max: health },
    Collidable: {},
    Bounce: { mass: mass },
    Position: { x: x, y: y },
    Motion: { dx: dx, dy: dy, drotation: dr }
  });
}

function spawnField(centerX, centerY) {
  var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
  var MAX_ASTEROIDS = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 150;
  var MAX_TRIES = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 5;
  var MIN_SIZE = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 20;
  var MAX_SIZE = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 300;
  var MAX_GRAV = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 10;


  var vCenter = new __WEBPACK_IMPORTED_MODULE_1__lib_Vector2D__["a" /* default */](centerY, centerX);
  var vSpawn = new __WEBPACK_IMPORTED_MODULE_1__lib_Vector2D__["a" /* default */](0, 0);
  var vGrav = new __WEBPACK_IMPORTED_MODULE_1__lib_Vector2D__["a" /* default */](0, 0);
  var inField = [];

  for (var idx = 0; idx < MAX_ASTEROIDS; idx++) {
    for (var c = 0; c < MAX_TRIES; c++) {

      var _size = (MAX_SIZE - MIN_SIZE) * Math.random() + MIN_SIZE;
      var rot = Math.PI * 4 * Math.random();
      vSpawn.setValues(vCenter.x, vCenter.y - ((radius - 1) * Math.random() + 1));
      vSpawn.rotateAround(vCenter, rot);

      var isClear = true;
      for (var fldIdx = 0; fldIdx < inField.length; fldIdx++) {
        var item = inField[fldIdx];
        if (Math.abs(vSpawn.x - item.x) * 2 >= (_size + item.width) * 1.025) {
          continue;
        }
        if (Math.abs(vSpawn.y - item.y) * 2 >= (_size + item.height) * 1.025) {
          continue;
        }
        isClear = false;
        break;
      }
      if (!isClear) {
        continue;
      }

      inField.push({ x: vSpawn.x, y: vSpawn.y, width: _size, height: _size });

      vGrav.setValues(0, Math.random() * MAX_GRAV);
      vGrav.rotate(rot);

      spawnAsteroid(vSpawn.x, vSpawn.y, _size, _size, vGrav.x, vGrav.y, Math.PI * 0.25 * Math.random(), 4 * _size * _size, 4 * _size * _size);
    }
  }
}

var pos = 470;
var size = 440;
var num = 200;

spawnField(-pos, -pos, size, num);
spawnField(pos, pos, size, num);
spawnField(pos, -pos, size, num);
spawnField(-pos, pos, size, num);

world.start();

var vpSystem = world.getSystem('ViewportWebGL');
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

/***/ })

},[185]);
//# sourceMappingURL=index.js.map