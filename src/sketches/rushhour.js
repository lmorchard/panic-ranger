import dat from 'dat-gui';
import { distance } from '../lib/utils';
import { Name } from '../plugins/name';
import { MSG_DESTROY } from '../plugins/spawn';
import { MSG_DESTINATION_REACHED } from '../plugins/roadRunner';

let World, installPlugins, world, plugins, gui;

const systems = {
  ViewportWebGL: {
    debug: true,
    container: '#game',
    zoom: 0.15,
    gridEnabled: false,
    followName: 'hero1',
    lineWidth: 2.0
  },
  DebugCanvas: {
    container: '#game',
    viewportSystemName: 'ViewportWebGL',
  },
  DrawStats: {},
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
  RoadRunner: {
    astarCacheTTL: 2.0
  },
  HordeSpawn: {
    viewportSystemName: 'ViewportWebGL',
    offscreenTTL: 0.5,
    spawnMargin: 250,
    minCount: 100,
    maxFrameSpawn: 15,
    spawn: (x, y) => {
      const MIN_SIZE=200;
      const MAX_SIZE=500;
      const size = ((MAX_SIZE - MIN_SIZE) * Math.random()) + MIN_SIZE;
      const repulsor = Object.keys(world.get('Repulsor'))
        .map(key => [Math.random(), key])
        .sort((a, b) => a[0] - b[0])[0][1];
      world.insert({
        Sprite: { name: 'mine', size: size, color: 0xff2222 },
        Health: { max: 4 * size * size },
        Spawn: { },
        Collidable: { },
        Bounce: { mass: 4 * size * size },
        Position: { x: x, y: y, rotation: (Math.PI * 2) * Math.random() },
        Motion: { dx: 0, dy: 0, drotation: (Math.PI * 2) * Math.random() },
        Thruster: { deltaV: 2400 + Math.random() * 100, maxV: 1200 + Math.random() * 200 },
        Seeker: { targetEntityId: repulsor, radPerSec: 0.5 + Math.random() * 0.2 },
        HordeSpawn: { }
      });
    }
  },
};

function init () {
  buildWorld();
  populateWorld();
  if (module.hot) {
    module.hot.accept(plugins.id, buildWorld);
    module.hot.accept('../lib/core', buildWorld);
  }
}

function buildWorld () {
  try {
    let store;
    if (world) {
      world.stop();
      store = world.exportStore();
    }

    ({ World, installPlugins } = require('../lib/core'));
    plugins = require.context('../plugins', false, /^(?!.*test).*\.js$/);
    installPlugins(plugins.keys().map(key => plugins(key)));

    world = window.world = new World({ debug: true, systems, store });
    world.start();
    setupGui(world);

    (world => world.subscribe(MSG_DESTINATION_REACHED, (msg, entityId) => {
      world.publish(MSG_DESTROY, entityId);
      setTimeout(spawnSelfDrivingBus, 1000 * Math.random());
    }))(world);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('build world error', e);
  }
}

function populateWorld () {
  let x = 0;
  let y = 0;
  const spacing = 600;
  const num = 4;
  for (x = -num * spacing; x <= num * spacing; x += spacing) {
    placeRepulsor(x, -(spacing * num), true, true);
    placeRepulsor(x, 0, true, true);
    placeRepulsor(x, (spacing * num), true, true);
  }
  for (y = -(num-1) * spacing; y <= num * spacing; y += spacing) {
    //placeRepulsor(-(spacing * num), y, false);
    placeRepulsor(0, y, true, false);
    //placeRepulsor((spacing * num), y, false);
  }

  // Spawn some initial entities
  for (let i = 0; i < 25; i++) {
    setTimeout(spawnSelfDrivingBus, 5000 * Math.random());
  }

  false && world.insert({
    Name: { name: 'hero1'},
    // Health: { max: 4000 },
    Sprite: { name: 'hero', size: 100, color: 0x3333ff },
    Spawn: {},
    Collidable: {},
    Bounce: { damage: 0.0001, mass: 7000 },
    Position: { x: 0, y: 0, rotation: -(Math.PI / 2) },
    Motion: {},
    Thruster: { deltaV: 500, maxV: 250, active: false },
    PlayerInputSteering: { radPerSec: Math.PI },
  });
}

function placeRepulsor (x, y, horiz, markDestination) {
  world.insert({
    Name: {
      name: `repulsor${y}`,
      tags: [ markDestination ? 'destination' : 'road' ]
    },
    Sprite: { name: 'repulsor', color: 0x114411, size: 100 },
    Position: {
      x: x + (horiz ? 0 : Math.random() * 200 - 100),
      y: y + (!horiz ? 0 : Math.random() * 200 - 100)
    },
    Motion: { },
    Repulsor: { range: 600, force: 300 },
    Road: { type: 'repulsor', range: 800 }
  });
}

function spawnSelfDrivingBus() {
  const destinations = Object.keys(Name.findEntitiesByTags(world, ['destination']));
  const color = 0xffffff * Math.random();
  const spawnPoint = destinations[Math.floor(Math.random() * destinations.length)];

  const {x, y} = world.get('Position', spawnPoint);

  let destination;
  do {
    destination = destinations[Math.floor(Math.random() * destinations.length)];
  } while (distance({x, y}, world.get('Position', destination)) < 3000);

  return world.insert({
    Name: { name: `bus${Math.random()}` },
    Sprite: { name: 'bus', size: 150, color },
    Spawn: {
      tombstone: (spawn, entityId) => ({
        Name: world.get('Name', entityId),
        Sprite: { name: 'hero', size: 200, color },
        Position: world.get('Position', entityId),
        Motion: { drotation: Math.PI * 8 },
        Spawn: { ttl: 0.5 }
      })
    },
    Collidable: {},
    // Bounce: { mass: 7000 },
    Position: {
      x, y,
      rotation: Math.PI * 2 * Math.random()
    },
    Motion: {},
    Thruster: { deltaV: 5000, maxV: 1000 },
    Seeker: {
      thrusterTurnCutoff: Math.PI * 0.0001,
      thrusterTurnThrottle: 0.01,
      radPerSec: Math.PI * 2,
      active: false
    },
    Runner: { destination: '' + destination },
  });
}

function setupGui () {
  if (gui) { gui.destroy(); }
  gui = new dat.GUI();

  const vpSystem = world.getSystem('ViewportWebGL');
  const roadRunnerSystem = world.getSystem('RoadRunner');

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

  const rrf = gui.addFolder('RoadRunner');
  ['debug', 'debugPerformance',  'debugRange', 'debugRoads', 'debugPath']
    .forEach(name => rrf.add(roadRunnerSystem.options, name));
  rrf.add(roadRunnerSystem.options, 'debugSample', 0.01, 0.5).step(0.01);
  rrf.add(roadRunnerSystem.options, 'pathfindingStrategy',
    ['astar', 'cachedAstar', 'floydWarshall']);
  rrf.open();
}

init();
