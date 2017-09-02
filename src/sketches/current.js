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
import '../plugins/roadRunner';

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
    RoadRunner: {},
  }
});

let x = 0;
let y = 0;
let id;

const destinations = [];

const placeRepulsor = (x, y) =>
  id = world.insert({
    Name: { name: `repulsor${y}` },
    Sprite: { name: 'repulsor', color: 0x228822, size: 100 },
    Position: { x, y },
    Motion: { },
    Repulsor: { range: 600, force: 300 },
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
  Runner: { destination: ''+destinations[0] },
});

world.debug = true;

world.start();

const vpSystem = world.getSystem('ViewportWebGL');
const roadRunnerSystem = world.getSystem('RoadRunner');
const guiSystem = world.getSystem('DatGui');
const gui = guiSystem.gui;

const generalf = gui.addFolder('General');
generalf.add(world, 'isPaused');
generalf.add(world, 'debug');

const vpf = gui.addFolder('Viewport');
const names = [ 'gridEnabled', 'followEnabled', 'cameraX', 'cameraY' ];
names.forEach(name => vpf.add(vpSystem, name).listen());
vpf.add(vpSystem, 'zoom',
  vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();
vpf.add(vpSystem, 'lineWidth', 1.0, 4.0).step(0.5).listen();

const rrf = gui.addFolder('RoadRunner');
['debug', 'debugRange', 'debugRoads', 'debugText', 'debugPath']
  .forEach(name => rrf.add(roadRunnerSystem.options, name));
rrf.open();
