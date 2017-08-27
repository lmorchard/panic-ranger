webpackJsonp([3],{149:/*!******************************************!*\
  !*** multi ./src/sketches/explosions.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
function(t,o,n){t.exports=n(/*! ./src/sketches/explosions.js */150)},150:/*!************************************!*\
  !*** ./src/sketches/explosions.js ***!
  \************************************/
/*! exports provided:  */
/*! all exports used */
function(t,o,n){"use strict";function e(){var t=2*d*Math.random()-d,o=2*d*Math.random()-d,n=.5+2*Math.random(),e=c[Math.floor(Math.random()*c.length)];p.insert({Sprite:{name:"default",color:e},Position:{x:t,y:o},Spawn:{ttl:Math.random(),tombstone:{Sprite:{name:"explosion",size:100+500*Math.random(),color:e,ttl:n},Position:{x:t,y:o},Spawn:{ttl:n}}}})}Object.defineProperty(o,"__esModule",{value:!0});var a=n(/*! babel-runtime/core-js/object/keys */38),s=n.n(a),r=n(/*! ../lib/core */0),i=(n(/*! ../plugins/drawStats */19),n(/*! ../plugins/memoryStats */20),n(/*! ../plugins/datGui */18),n(/*! ../plugins/viewportWebGL */30),n(/*! ../plugins/name */21),n(/*! ../plugins/position */7),n(/*! ../plugins/motion */8),n(/*! ../plugins/spawn */27)),d=1500,u={count:0,spawns:0,despawns:0},p=window.world=new r.World({systems:{ViewportWebGL:{debug:!0,container:"#game",WebGL:"#viewport",zoom:.3},DrawStats:{},MemoryStats:{},DatGui:{},Motion:{},Position:{},Spawn:{}}});p.start();for(var c=[16711680,65280,255,16776960,65535,16777215],l=0;l<150;l++)e();p.subscribe(i.MSG_SPAWN,function(){u.spawns++}),p.subscribe(i.MSG_DESPAWN,function(){u.despawns++,u.count=s()(p.get("Sprite")||{}).length;for(var t=0;t<150-u.count;t++)e()});var m=p.getSystem("ViewportWebGL"),w=p.getSystem("DatGui"),f=w.gui;f.add(p,"isPaused"),f.add(p,"debug"),f.add(m,"zoom",m.options.zoomMin,m.options.zoomMax).listen(),["gridEnabled"].forEach(function(t){return f.add(m,t).listen()}),["count","spawns","despawns"].forEach(function(t){return f.add(u,t).listen()})}},[149]);
//# sourceMappingURL=index.js.map