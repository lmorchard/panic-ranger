import dat from 'dat-gui';

import * as Core from './lib/core';

import './plugins/drawStats';
import './plugins/memoryStats';
import './plugins/debugCanvas';
import './plugins/viewportWebGL';
import './plugins/name';
import './plugins/health';
import './plugins/position';
import './plugins/motion';
import './plugins/thruster';
import './plugins/steering';
import './plugins/collision';
import { MSG_BOUNCE } from './plugins/bounce';
import './plugins/repulsor';
import './plugins/playerInputSteering';
import { MSG_DESPAWN } from './plugins/spawn';

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
    Health: {},
    Position: {},
    Motion: { debug: true },
    Thruster: { debug: true },
    Steering: {
      debug: true,
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
      name: (source.x < 0) ? 'hero' : 'bus',
      size: 100,
      color: 0xffffff * Math.random(),
    },
    Position: {
      x: source.x,
      y: source.y + (1000 - 2000 * Math.random()),
      rotation: ((source.x > 0) ? Math.PI : 0)
    },
    Bounce: {
      mass: 100
    },
    Collidable: { },
    Motion: { },
    Thruster: {
      deltaV: 4000 + 500 * Math.random(),
      maxV: 700 + 500 * Math.random()
    },
    Steering: {
      active: true,
      radPerSec: Math.PI * 1.5,
      thrusterTurnCutoff: Math.PI * 0.1,
      thrusterTurnThrottle: 0.25,

      seekFactor: 1.0,
      seekTargetPosition: dest,

      avoidFactor: 1.0,
      avoidTags: ['ship'],
      avoidRange: 600,
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


const stats = {
  last: Date.now(),
  duration: 0,
  bounces: 0,
};
world.subscribe(MSG_BOUNCE, () => {
  stats.bounces++;
});
setInterval(() => {
  const now = Date.now();
  stats.duration += now - stats.last;
  stats.last = now;
}, 16);

world.start();

const vpSystem = world.getSystem('ViewportWebGL');
const steeringSystem = world.getSystem('Steering');
const motionSystem = world.getSystem('Motion');
const gui = new dat.GUI();

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

const mf = gui.addFolder('Motion');
[ 'debug' ].forEach(name => mf.add(motionSystem.options, name));
mf.open();

const sf = gui.addFolder('Steering');
[ 'debug' ].forEach(name => sf.add(steeringSystem.options, name));
sf.open();

const statsFolder = gui.addFolder('Stats');
[ 'duration', 'bounces' ].forEach(name => statsFolder.add(stats, name).listen());
statsFolder.open();
