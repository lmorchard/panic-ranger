import dat from 'dat-gui';
import Vector2D from '../lib/Vector2D';

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
    Thruster: { deltaV: 1200, maxV: 500, active: false },
    LateralThruster: {
      deltaV: 4000,
      maxV: 400,
      active: false
    },
    PlayerInputSteering: {
      strafe: false,
      usePointer: true,
      useGamepad: true,
      radPerSec: Math.PI
    }
  });

  spawnField(0, 0, 200, 50, 5, 5, 100);
}

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
