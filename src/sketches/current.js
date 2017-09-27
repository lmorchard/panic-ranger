import dat from 'dat-gui';

let World, installPlugins, world, plugins, gui;

const systems = [
  ['ViewportWebGL', {
    debug: true,
    zoom: 1.0,
    gridSize: 100,
  }],
  'DrawStats',
  'PlayerInputSteering',
  'Motion',
  'Position',
  'Thruster',
  'LateralThruster',
  'Seeker',
  'Collision',
  'Bounce'
];

function init () {
  buildWorld();
  populateWorld();
  if (module.hot) {
    module.hot.accept(plugins.id, buildWorld);
    module.hot.accept('../lib/core', buildWorld);
  }
}

let heroEntityId;

function populateWorld () {
  heroEntityId = world.insert({
    Name: { name: 'hero1'},
    Sprite: {
      name: 'hero',
      size: 50,
      color: 0x3333ff
    },
    Collidable: {},
    Bounce: { mass: 7000 },
    Position: {
      x: 0,
      y: 200,
      rotation: -Math.PI / 2
    },
    Motion: {},
    // Thruster: { deltaV: 1200, maxV: 500, active: false },
    LateralThruster: {
      deltaV: 5000,
      maxV: 700,
      active: false
    },
    PlayerInputSteering: {
      strafe: true,
      usePointer: false,
      useGamepad: false,
      radPerSec: Math.PI
    }
  });
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
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('build world error', e);
  }
}

function setupGui (world) {
  if (gui) { gui.destroy(); }
  gui = new dat.GUI();

  const generalf = gui.addFolder('General');
  generalf.add(world, 'isPaused');
  generalf.add(world, 'debug');
  generalf.open();

  const vpSystem = world.getSystem('ViewportWebGL');
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

  const monitor = {
    active: true,
    stop: true,
    throttle: 0.0,
    dx: 0.0,
    dy: 0.0
  };
  world.subscribe('AFTER_UPDATE', () => {
    const lateralThruster = world.get('LateralThruster', heroEntityId);
    const motion = world.get('Motion', heroEntityId);
    Object.assign(monitor, lateralThruster);
    Object.assign(monitor, motion);
  });

  const monitorFolder = gui.addFolder('Monitor');
  Object.keys(monitor)
    .forEach(name => monitorFolder.add(monitor, name).listen());
  monitorFolder.open();
}

init();
