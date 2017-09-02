webpackJsonp([7],{

/***/ 184:
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/*
import * as Core from './lib/core';

import './plugins/drawStats';
import './plugins/memoryStats';
import './plugins/datGui';
import './plugins/viewportPixi';
import './plugins/viewportCanvas';
import './plugins/viewportWebGL';
import './plugins/name';
import './plugins/health';
import './plugins/position';
import './plugins/motion';
import './plugins/thruster';
import './plugins/seeker';
import './plugins/collision';
import './plugins/bounce';
import './plugins/repulsor';
import './plugins/playerInputSteering';
import './plugins/hordeSpawn';

const debug = true;

const world = window.world = new Core.World({
  systems: {
    ViewportWebGL: {
      debug: debug,
      container: '#game',
      canvas: '#viewport',
      followName: 'hero1',
      zoom: 0.3
    },
    DrawStats: {},
    MemoryStats: {},
    DatGui: {},
    PlayerInputSteering: {},
    Motion: {},
    Position: {},
    Thruster: {},
    Seeker: {},
    Repulsor: {},
    Collision: {},
    Bounce: {},
    HordeSpawn: {
      viewportSystemName: 'ViewportWebGL',
      offscreenTTL: 0.5,
      spawnMargin: 125,
      minCount: 300,
      spawn: (x, y) => {
        const MIN_SIZE=100;
        const MAX_SIZE=300;
        const size = ((MAX_SIZE - MIN_SIZE) * Math.random()) + MIN_SIZE;
        world.insert({
          Sprite: { name: 'mine', size: size, color: 0xff2222 },
          Health: { max: 4 * size * size },
          Collidable: { },
          Bounce: { mass: 4 * size * size },
          Position: { x: x, y: y, rotation: (Math.PI * 2) * Math.random() },
          Motion: { dx: 0, dy: 0, drotation: (Math.PI * 2) * Math.random() },
          Thruster: { deltaV: 2400 + Math.random() * 100, maxV: 1200 + Math.random() * 200 },
          Seeker: { targetName: 'hero1', radPerSec: 0.5 + Math.random() * 0.2 },
          HordeSpawn: { }
        });
      }
    }
  }
});

world.insert({
  Name: { name: 'hero1'},
  Sprite: { name: 'hero', size: 150, color: 0x0000ff },
  Collidable: {},
  Bounce: { mass: 7000 },
  Position: { x: 0, y: 0, rotation: -(Math.PI / 2) },
  Motion: {},
  Thruster: { deltaV: 2800, maxV: 1400, active: false },
  PlayerInputSteering: { radPerSec: Math.PI }
});

let x = 0;
for (let y = 0; y > -15000; y -= 600) {
  world.insert({
    Name: { name: `repulsor${y}` },
    Sprite: { name: 'repulsor', color: 0x228822 },
    Position: { x, y },
    Motion: { },
    Repulsor: { range: 600, force: 300 }
  });
  x += (-300 + Math.random() * 600);
}

world.start();

const vpSystem = world.getSystem('ViewportWebGL');
const spawnSystem = world.getSystem('HordeSpawn');
const guiSystem = world.getSystem('DatGui');
const gui = guiSystem.gui;

gui.add(world, 'isPaused');
gui.add(world, 'debug');
gui.add(vpSystem, 'zoom', vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();
gui.add(vpSystem, 'lineWidth', 1.0, 4.0).step(0.5).listen();

const names = [ 'gridEnabled', 'followEnabled', 'cameraX', 'cameraY' ];
names.forEach(function (name) {
  gui.add(vpSystem, name).listen();
});

const cp = vpSystem.cursorPosition;
gui.add(cp, 'x').listen();
gui.add(cp, 'y').listen();

gui.add(spawnSystem, 'spawnCount').listen();
*/

/***/ })

},[184]);
//# sourceMappingURL=index.js.map