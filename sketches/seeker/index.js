webpackJsonp([1],{

/***/ 200:
/*!**************************************!*\
  !*** multi ./src/sketches/seeker.js ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/sketches/seeker.js */201);


/***/ }),

/***/ 201:
/*!********************************!*\
  !*** ./src/sketches/seeker.js ***!
  \********************************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_core__ = __webpack_require__(/*! ../lib/core */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__plugins_name__ = __webpack_require__(/*! ../plugins/name */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plugins_position__ = __webpack_require__(/*! ../plugins/position */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins_motion__ = __webpack_require__(/*! ../plugins/motion */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__plugins_thruster__ = __webpack_require__(/*! ../plugins/thruster */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__plugins_orbiter__ = __webpack_require__(/*! ../plugins/orbiter */ 85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugins_seeker__ = __webpack_require__(/*! ../plugins/seeker */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__plugins_viewportCanvas__ = __webpack_require__(/*! ../plugins/viewportCanvas */ 99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__plugins_drawStats__ = __webpack_require__(/*! ../plugins/drawStats */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__plugins_memoryStats__ = __webpack_require__(/*! ../plugins/memoryStats */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__plugins_datGui__ = __webpack_require__(/*! ../plugins/datGui */ 18);













var debug = true;

var world = new __WEBPACK_IMPORTED_MODULE_0__lib_core__["World"]({
  systems: {
    ViewportCanvas: {
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
  Position: { x: 0, y: 0 },
  Motion: { dx: 0, dy: 0, drotation: Math.PI / 6 }
});
world.insert({
  Name: { name: 'orbiter1' },
  Sprite: { name: 'hero', size: 100 },
  Position: { x: 250, y: 250 },
  Motion: {},
  Orbiter: { name: 'sun' }
});
world.insert({
  Name: { name: 'chaser1' },
  Sprite: { name: 'enemyscout' },
  Position: {},
  Motion: {},
  Thruster: { deltaV: 400, maxV: 175 },
  Seeker: { targetName: 'orbiter1', radPerSec: 0.9 }
});
world.insert({
  Name: { name: 'chaser2' },
  Sprite: { name: 'enemyscout' },
  Position: {},
  Motion: {},
  Thruster: { deltaV: 600, maxV: 400 },
  Seeker: { targetName: 'orbiter1', radPerSec: 2 }
});

world.start();

var vpSystem = world.getSystem('ViewportCanvas');
var guiSystem = world.getSystem('DatGui');
var gui = guiSystem.gui;

gui.add(vpSystem, 'zoom', vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();

var names = ['debug', 'gridEnabled', 'cameraX', 'cameraY'];
names.forEach(function (name) {
  gui.add(vpSystem, name).listen();
});

/***/ })

},[200]);
//# sourceMappingURL=index.js.map