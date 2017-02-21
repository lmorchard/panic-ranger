import * as Core from '../lib/core';

import _ from 'lodash';
import Vector2D from '../lib/Vector2D';

import '../plugins/drawStats';
import '../plugins/memoryStats';
import '../plugins/datGui';
import '../plugins/expiration';
import '../plugins/viewportPixi';
import '../plugins/name';
import '../plugins/health';
import '../plugins/position';
import '../plugins/motion';
import '../plugins/thruster';
import '../plugins/seeker';
import '../plugins/steering';
import '../plugins/collision';
import '../plugins/bounce';
import '../plugins/pathfinding';
import '../plugins/playerInputSteering';

const debug = true;

const world = window.world = new Core.World({
  systems: {
    ViewportPixi: {
      debug: debug,
      container: '#game',
      // followName: 'hero1',
      zoom: 0.5
    },
    Expiration: {},
    DrawStats: {},
    MemoryStats: {},
    DatGui: {},
    PlayerInputSteering: {},
    Motion: {},
    Thruster: {},
    Seeker: {},
    Pathfinding: {},
    Steering: {
      debug: true
    },
    Collision: {},
    Bounce: {}
  }
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
    MAX_ASTEROIDS=50, MAX_TRIES=5, MIN_SIZE=40, MAX_SIZE=200, MAX_GRAV=10) {

  const vCenter = new Vector2D(centerY, centerX);
  const vSpawn = new Vector2D(0, 0);
  const vGrav = new Vector2D(0, 0);
  const inField = [];

  for (let idx = 0; idx < MAX_ASTEROIDS; idx++) {
    for (let c = 0; c < MAX_TRIES; c++) {

      const size = _.random(MIN_SIZE, MAX_SIZE);
      const rot = (Math.PI*4) * Math.random();
      vSpawn.setValues(vCenter.x, vCenter.y - _.random(1, radius));
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
      break;

    }
  }
}

spawnField(-450, -450, 200, 25);
spawnField(-450,  450, 200, 25);
spawnField(0, 0, 200, 25);
spawnField(450, -450, 200, 25);
spawnField(450,  450, 200, 25);

const maxEnemies = 7;
const ttl = 20;

function spawnEnemy() {
  setTimeout(() => {
    const x = -1400;
    const y = 1500 * Math.random() - 750;
    world.insert({
      Sprite: { name: 'enemyscout', color: '#f00', size: 40 },
      Collidable: {},
      Bounce: { mass: 2500 },
      Position: { x: x, y: y },
      Thruster: { deltaV: 1200, maxV: 500, active: true },
      // Seeker: { radPerSec: Math.PI, targetName: 'hero1' },
      Steering: { radPerSec: Math.PI * 1, seekTargetName: 'hero1' },
      Motion: {},
      Expiration: { ttl: ttl },
      // Pathfinder: {}
    });
  }, 3 * 1000 * Math.random());
}

for (let idx = 0; idx < maxEnemies; idx++) {
  spawnEnemy();
}

world.subscribe(Core.Messages.ENTITY_DESTROY, function (/*msg, data*/) {
  spawnEnemy();
});

world.insert({
  Name: { name: 'hero1'},
  Sprite: { name: 'hero', color: '#0f0' },
  Collidable: {},
  Bounce: { mass: 700000 },
  Position: { x: 1100, y: 0 },
  Thruster: { deltaV: 1200, maxV: 500, active: false },
  Motion: {},
  PlayerInputSteering: { radPerSec: Math.PI },
  Pathfinder: {}
});

world.start();

const guiSystem = world.getSystem('DatGui');
const gui = guiSystem.gui;

const guiWorld = gui.addFolder('World');
guiWorld.open();
guiWorld.add(world, 'isPaused');
guiWorld.add(world, 'debug');

const vpSystem = world.getSystem('ViewportPixi');
const guiViewport = gui.addFolder('Viewport');
guiViewport.open();
guiViewport.add(vpSystem, 'zoom', vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();
guiViewport.add(vpSystem, 'lineWidth', 1.0, 4.0).step(0.5).listen();

const names = [ 'gridEnabled', 'followEnabled', 'cameraX', 'cameraY' ];
names.forEach(function (name) {
  guiViewport.add(vpSystem, name).listen();
});

const collisionSystem = world.getSystem('Collision');
const guiCollision = gui.addFolder('Collision');
guiCollision.open();
guiCollision.add(collisionSystem, 'debug');

const steeringSystem = world.getSystem('Steering');
const guiSteering = gui.addFolder('Steering');
guiSteering.open();
guiSteering.add(steeringSystem, 'debug');
