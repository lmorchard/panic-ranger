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
    zoom: 0.125,
    gridEnabled: false,
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

    // Spawn new entities when old ones reach their destinations
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
  const placeRepulsor = (x, y, horiz, markDestination) => world.insert({
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
  for (let i = 0; i < 50; i++) {
    setTimeout(spawnSelfDrivingBus, 5000 * Math.random());
  }
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
    Sprite: { name: 'hero', size: 150, color },
    Spawn: {
      tombstone: (spawn, entityId) => ({
        Name: world.get('Name', entityId),
        Sprite: { name: 'hero', size: 150, color },
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
    Thruster: { deltaV: 5000, maxV: 1250 },
    Seeker: {
      thrusterTurnCutoff: Math.PI * 0.01,
      thrusterTurnThrottle: 0.01,
      radPerSec: Math.PI * 4,
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
  ['debug', 'debugRange', 'debugRoads', 'debugPath']
    .forEach(name => rrf.add(roadRunnerSystem.options, name));
  rrf.open();
}

init();
