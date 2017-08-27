import * as Core from '../lib/core';

import Vector2D from '../lib/Vector2D';

import '../plugins/drawStats';
import '../plugins/memoryStats';
import '../plugins/datGui';
import '../plugins/viewportWebGL';
import '../plugins/name';
import '../plugins/health';
import '../plugins/position';
import '../plugins/motion';
import '../plugins/thruster';
import '../plugins/seeker';
import '../plugins/collision';
import '../plugins/bounce';
import '../plugins/playerInputSteering';

const debug = true;

const world = window.world = new Core.World({
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
  Name: { name: 'hero1'},
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
    Sprite: { name: 'asteroid', size: width},
    Health: { max: health },
    Collidable: {},
    Bounce: { mass: mass },
    Position: { x: x, y: y },
    Motion: { dx: dx, dy: dy, drotation: dr }
  });
}

function spawnField(centerX, centerY, radius=300,
    MAX_ASTEROIDS=150, MAX_TRIES=5, MIN_SIZE=20, MAX_SIZE=300, MAX_GRAV=10) {

  const vCenter = new Vector2D(centerY, centerX);
  const vSpawn = new Vector2D(0, 0);
  const vGrav = new Vector2D(0, 0);
  const inField = [];

  for (let idx = 0; idx < MAX_ASTEROIDS; idx++) {
    for (let c = 0; c < MAX_TRIES; c++) {

      const size = ((MAX_SIZE - MIN_SIZE) * Math.random()) + MIN_SIZE;
      const rot = (Math.PI*4) * Math.random();
      vSpawn.setValues(vCenter.x, vCenter.y - (((radius - 1) * Math.random()) + 1));
      vSpawn.rotateAround(vCenter, rot);

      let isClear = true;
      for (let fldIdx = 0; fldIdx < inField.length; fldIdx++) {
        const item = inField[fldIdx];
        if (Math.abs(vSpawn.x - item.x) * 2 >= (size + item.width) * 1.025) { continue; }
        if (Math.abs(vSpawn.y - item.y) * 2 >= (size + item.height) * 1.025) { continue; }
        isClear = false;
        break;
      }
      if (!isClear) { continue; }

      inField.push({ x: vSpawn.x, y: vSpawn.y, width: size, height: size });

      vGrav.setValues(0, Math.random() * MAX_GRAV);
      vGrav.rotate(rot);

      spawnAsteroid(
        vSpawn.x, vSpawn.y,
        size, size,
        vGrav.x, vGrav.y,
        (Math.PI * 0.25) * Math.random(),
        4 * size * size,
        4 * size * size
      );

    }
  }
}

const pos = 470;
const size = 440;
const num = 200;

spawnField(-pos, -pos, size, num);
spawnField(pos, pos, size, num);
spawnField(pos, -pos, size, num);
spawnField(-pos, pos, size, num);

world.start();

const vpSystem = world.getSystem('ViewportWebGL');
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
