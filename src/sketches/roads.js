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
import { MSG_DESTROY } from '../plugins/spawn';
import { MSG_DESTINATION_REACHED } from '../plugins/roadRunner';

const debug = false;

const world = window.world = new Core.World({
  systems: {
    ViewportWebGL: {
      debug: debug,
      container: '#game',
      zoom: 0.125,
      gridEnabled: false,
      lineWidth: 2.0
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
    RoadRunner: { },
  }
});

let x = 0;
let y = 0;
let id;

const destinations = [];

const placeRepulsor = (x, y) =>
  id = world.insert({
    Name: { name: `repulsor${y}` },
    Sprite: { name: 'repulsor', color: 0x114411, size: 100 },
    Position: { x, y },
    Motion: { },
    // Repulsor: { range: 600, force: 300 },
    Road: { type: 'repulsor', range: 800 }
  });

for (y = 0; y > -3000; y -= 600) {
  placeRepulsor(x, y);
  x += (-300 + Math.random() * 600);
}
destinations.push(id);

x = 0;
for (y = 600; y < 3000; y += 600) {
  placeRepulsor(x, y);
  x += (-300 + Math.random() * 600);
}
destinations.push(id);

y = 0;
for (x = -600; x > -3000; x -= 600) {
  placeRepulsor(x, y);
  y += (-300 + Math.random() * 600);
}
destinations.push(id);

y = 0;
for (x = 600; x < 3000; x += 600) {
  placeRepulsor(x, y);
  y += (-300 + Math.random() * 600);
}
destinations.push(id);

const spawnPoints = destinations.map(id => world.get('Position', id));

function spawnSelfDrivingBus() {
  const color = 0xffffff * Math.random();
  const destination = '' +
    destinations[Math.floor(Math.random() * destinations.length)];
  let {x, y} = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
  x += (400 * Math.random()) - 200;
  y += (400 * Math.random()) - 200;

  return world.insert({
    Name: { name: `bus${Math.random()}` },
    Sprite: { name: 'hero', size: 150, color },
    Spawn: { },
    Collidable: {},
    Bounce: { mass: 7000 },
    Position: {
      x, y,
      rotation: Math.PI * 2 * Math.random()
    },
    Motion: {},
    Thruster: { deltaV: 4000, maxV: 1500 },
    Seeker: { radPerSec: Math.PI * 1.25, active: false },
    Runner: { destination },
  });
}

// Spawn some initial entities
for (let i = 0; i < 10; i++) {
  setTimeout(spawnSelfDrivingBus, 1000 * Math.random());
}

// Spawn new entities when old ones reach their destinations
world.subscribe(MSG_DESTINATION_REACHED, (msg, entityId) => {
  world.publish(MSG_DESTROY, entityId);
  setTimeout(spawnSelfDrivingBus, 1000 * Math.random());
});

world.debug = debug;

world.start();

const vpSystem = world.getSystem('ViewportWebGL');
const roadRunnerSystem = world.getSystem('RoadRunner');
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

const rrf = gui.addFolder('RoadRunner');
['debug', 'debugRange', 'debugRoads', 'debugPath']
  .forEach(name => rrf.add(roadRunnerSystem.options, name));
rrf.open();
