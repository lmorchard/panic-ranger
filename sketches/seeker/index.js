webpackJsonp([1],{158:/*!**************************************!*\
  !*** multi ./src/sketches/seeker.js ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
function(e,t,r){e.exports=r(/*! ./src/sketches/seeker.js */159)},159:/*!********************************!*\
  !*** ./src/sketches/seeker.js ***!
  \********************************/
/*! exports provided:  */
/*! all exports used */
function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(/*! ../lib/core */0),a=(r(/*! ../plugins/name */21),r(/*! ../plugins/position */7),r(/*! ../plugins/motion */8),r(/*! ../plugins/thruster */29),r(/*! ../plugins/orbiter */73),r(/*! ../plugins/seeker */28),r(/*! ../plugins/viewportCanvas */76),r(/*! ../plugins/drawStats */19),r(/*! ../plugins/memoryStats */20),r(/*! ../plugins/datGui */18),new o.World({systems:{ViewportCanvas:{debug:!0,container:"#game",followName:"orbiter1",zoom:.5},DrawStats:{},MemoryStats:{},DatGui:{},Motion:{},Orbiter:{},Thruster:{},Seeker:{}}}));a.insert({Name:{name:"sun"},Sprite:{name:"asteroid",size:300},Position:{x:0,y:0},Motion:{dx:0,dy:0,drotation:Math.PI/6}}),a.insert({Name:{name:"orbiter1"},Sprite:{name:"hero",size:100},Position:{x:250,y:250},Motion:{},Orbiter:{name:"sun"}}),a.insert({Name:{name:"chaser1"},Sprite:{name:"enemyscout"},Position:{},Motion:{},Thruster:{deltaV:400,maxV:175},Seeker:{targetName:"orbiter1",radPerSec:.9}}),a.insert({Name:{name:"chaser2"},Sprite:{name:"enemyscout"},Position:{},Motion:{},Thruster:{deltaV:600,maxV:400},Seeker:{targetName:"orbiter1",radPerSec:2}}),a.start();var i=a.getSystem("ViewportCanvas"),n=a.getSystem("DatGui"),s=n.gui;s.add(i,"zoom",i.options.zoomMin,i.options.zoomMax).listen(),["debug","gridEnabled","cameraX","cameraY"].forEach(function(e){s.add(i,e).listen()})}},[158]);
//# sourceMappingURL=index.js.map