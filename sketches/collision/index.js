webpackJsonp([5],{145:/*!*****************************************!*\
  !*** multi ./src/sketches/collision.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
function(e,t,o){e.exports=o(/*! ./src/sketches/collision.js */146)},146:/*!***********************************!*\
  !*** ./src/sketches/collision.js ***!
  \***********************************/
/*! exports provided:  */
/*! all exports used */
function(e,t,o){"use strict";function a(e,t,o,a,i,n,r,s,l){d.insert({Sprite:{name:"asteroid",size:o},Health:{max:l},Collidable:{},Bounce:{mass:s},Position:{x:e,y:t},Motion:{dx:i,dy:n,drotation:r}})}function i(e,t){for(var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:300,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:150,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:5,d=arguments.length>5&&void 0!==arguments[5]?arguments[5]:20,s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:300,l=arguments.length>7&&void 0!==arguments[7]?arguments[7]:10,h=new r.a(t,e),u=new r.a(0,0),m=new r.a(0,0),c=[],g=0;g<i;g++)for(var y=0;y<n;y++){var M=(s-d)*Math.random()+d,v=4*Math.PI*Math.random();u.setValues(h.x,h.y-((o-1)*Math.random()+1)),u.rotateAround(h,v);for(var w=!0,x=0;x<c.length;x++){var p=c[x];if(!(2*Math.abs(u.x-p.x)>=1.025*(M+p.width))&&!(2*Math.abs(u.y-p.y)>=1.025*(M+p.height))){w=!1;break}}w&&(c.push({x:u.x,y:u.y,width:M,height:M}),m.setValues(0,Math.random()*l),m.rotate(v),a(u.x,u.y,M,M,m.x,m.y,.25*Math.PI*Math.random(),4*M*M,4*M*M))}}Object.defineProperty(t,"__esModule",{value:!0});var n=o(/*! ../lib/core */0),r=o(/*! ../lib/Vector2D */17),d=(o(/*! ../plugins/drawStats */19),o(/*! ../plugins/memoryStats */20),o(/*! ../plugins/datGui */18),o(/*! ../plugins/viewportWebGL */30),o(/*! ../plugins/name */21),o(/*! ../plugins/health */26),o(/*! ../plugins/position */7),o(/*! ../plugins/motion */8),o(/*! ../plugins/thruster */29),o(/*! ../plugins/seeker */28),o(/*! ../plugins/collision */37),o(/*! ../plugins/bounce */35),o(/*! ../plugins/playerInputSteering */39),window.world=new n.World({systems:{ViewportWebGL:{debug:!0,container:"#game",followName:"hero1",lineWidth:1.5,zoom:.5},DrawStats:{},MemoryStats:{},DatGui:{},PlayerInputSteering:{},Motion:{},Position:{},Thruster:{},Seeker:{},Collision:{},Bounce:{}}}));d.insert({Name:{name:"hero1"},Sprite:{name:"hero",size:100,color:3355647},Collidable:{},Bounce:{mass:7e3},Position:{x:0,y:0},Motion:{},Thruster:{deltaV:1200,maxV:500,active:!1},PlayerInputSteering:{radPerSec:Math.PI}});i(-470,-470,440,200),i(470,470,440,200),i(470,-470,440,200),i(-470,470,440,200),d.start();var s=d.getSystem("ViewportWebGL"),l=d.getSystem("DatGui"),h=l.gui;h.add(d,"isPaused"),h.add(d,"debug"),h.add(s,"zoom",s.options.zoomMin,s.options.zoomMax).listen(),h.add(s,"lineWidth",1,4).step(.5).listen(),["gridEnabled","followEnabled","cameraX","cameraY"].forEach(function(e){h.add(s,e).listen()});var u=s.cursorPosition;h.add(u,"x").listen(),h.add(u,"y").listen()}},[145]);
//# sourceMappingURL=index.js.map