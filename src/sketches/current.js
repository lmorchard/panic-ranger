import * as Core from '../lib/core';

import '../plugins/drawStats';
import '../plugins/memoryStats';
import '../plugins/datGui';
import '../plugins/debugCanvas';
import '../plugins/viewportWebGL';
import '../plugins/name';
import '../plugins/health';
import '../plugins/position';
import '../plugins/motion';
import '../plugins/thruster';
import '../plugins/seeker';
import '../plugins/collision';
import '../plugins/bounce';
import '../plugins/repulsor';
import '../plugins/playerInputSteering';
import '../plugins/hordeSpawn';
import '../plugins/spawn';

const debug = true;

const world = window.world = new Core.World({
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
      viewportSystemName: 'ViewportWebGL',
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
  }
});

world.insert({
  Name: { name: 'hero1'},
  Sprite: { name: 'hero', size: 150, color: 0x3333ff },
  Spawn: {},
  Collidable: {},
  Bounce: { damage: 0.0001, mass: 7000 },
  Position: { x: 0, y: 0, rotation: -(Math.PI / 2) },
  Motion: {},
  Thruster: { deltaV: 2800, maxV: 1400, active: false },
  PlayerInputSteering: { radPerSec: Math.PI },
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

world.debug = true;

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
