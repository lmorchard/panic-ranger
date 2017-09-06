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
import '../plugins/steering';
import '../plugins/collision';
import '../plugins/bounce';
import '../plugins/repulsor';
import '../plugins/playerInputSteering';
import { MSG_DESPAWN } from '../plugins/spawn';

const debug = true;

const world = window.world = new Core.World({
  systems: {
    ViewportWebGL: {
      debug: debug,
      container: '#game',
      zoom: 0.2,
      gridEnabled: false,
      followName: 'hero1',
      lineWidth: 2.0
    },
    DebugCanvas: {
      container: '#game',
      viewportSystemName: 'ViewportWebGL',
    },
    DrawStats: {},
    DatGui: {},
    Health: {},
    Motion: {},
    Position: {},
    Thruster: {},
    Steering: {
      behaviors: [
        'avoid',
        'push',
        'seek',
        'flee',
        'wander',
        'evade',
        'pursue'
      ]
    },
    Repulsor: {},
    Collision: {},
    Bounce: {},
    Spawn: {},
  }
});

world.debug = debug;

const pads = [];
[-2000, 2000].forEach((x, idx) => pads.push(
  world.insert({
    Name: { name: `pad${idx}` },
    Sprite: { name: 'default', color: 0x888888, size: 100 },
    Position: { x, y: 0 }
  })
));

function spawnShip() {
  const idx = Math.random();
  const sourceId = pads[Math.floor(pads.length * Math.random())];
  const source = world.get('Position', sourceId);
  let destId;
  do { destId = pads[Math.floor(pads.length * Math.random())]; }
  while (destId === sourceId);
  const dest = world.get('Position', destId);

  ships.push(world.insert({
    Name: {
      name: `ship${idx}`,
      tags: ['ship']
    },
    Spawn: {
      ttl: 10 + Math.random()
    },
    Sprite: {
      name: 'hero',
      size: 100,
      color: 0xffffff * Math.random(),
    },
    Position: {
      x: source.x + (250 * Math.random()),
      y: source.y + (250 * Math.random()),
      rotation: Math.PI * 2 * Math.random()
    },
    Bounce: {
      mass: 100
    },
    Collidable: { },
    Motion: { },
    Thruster: {
      deltaV: 5000,// + 500 * Math.random(),
      maxV: 1000,// + 500 * Math.random()
    },
    Steering: {
      active: true,
      thrusterTurnCutoff: Math.PI * 0.1,
      thrusterTurnThrottle: 0.0,
      radPerSec: Math.PI * 1.5,

      seekFactor: 1.0,
      seekTargetPosition: dest,

      avoidFactor: 1.75,
      avoidTags: ['ship'],
      avoidSensorRange: 500,
    }
  }));
}

const ships = [];
for (let idx = 0; idx < 25; idx++) {
  setTimeout(spawnShip, 5000 * Math.random());
}

world.subscribe(MSG_DESPAWN, () => {
  setTimeout(spawnShip, 1000 * Math.random());
});

world.start();

const vpSystem = world.getSystem('ViewportWebGL');
const guiSystem = world.getSystem('DatGui');
const gui = guiSystem.gui;

const generalf = gui.addFolder('General');
generalf.add(world, 'isPaused');
generalf.add(world, 'debug');
generalf.open();

const vpf = gui.addFolder('Viewport');
const names = [ 'gridEnabled', 'followEnabled', 'cameraX', 'cameraY' ];
names.forEach(name => vpf.add(vpSystem, name).listen());
vpf.add(vpSystem, 'zoom',
  vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();
vpf.add(vpSystem, 'lineWidth', 1.0, 4.0).step(0.5).listen();
vpf.add(vpSystem, 'spriteCount').listen();
vpf.add(vpSystem, 'lastVertexCount').listen();
vpf.add(vpSystem, 'actualBufferSize').listen();
vpf.add(vpSystem, 'calculatedBufferSize').listen();
