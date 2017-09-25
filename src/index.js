import dat from 'dat-gui';

import { Name } from './plugins/name';
import { MSG_DESPAWN } from './plugins/spawn';

let World, installPlugins, world, plugins, gui;

const systems = [
  ['ViewportWebGL', {debug: true, zoom: 0.2, followName: 'hero1'}],
  ['DebugCanvas', {container: '#game', viewportSystemName: 'ViewportWebGL'}],
  'DrawStats',
  'Health',
  'Position',
  ['Motion', {debug: true}],
  ['Thruster', {debug: true}],
  ['Steering', {debug: true}],
  'Repulsor',
  'Collision',
  'Bounce',
  'Spawn'
];

function init () {
  buildWorld();
  populateWorld();

  if (module.hot) {
    module.hot.accept(plugins.id, buildWorld);
    module.hot.accept('./lib/core', buildWorld);
  }
}

function buildWorld () {
  try {
    let store;
    if (world) {
      world.stop();
      store = world.exportStore();
    }

    ({ World, installPlugins } = require('./lib/core'));
    plugins = require.context('./plugins', false, /^(?!.*test).*\.js$/);
    installPlugins(plugins.keys().map(key => plugins(key)));

    world = window.world = new World({ debug: true, systems, store });
    world.start();
    setupGui(world);

    (world => world.subscribe(MSG_DESPAWN, () => {
      if (!world.isRunning) { return; }
      setTimeout(spawnShip, 1000 * Math.random());
    }))(world);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('build world error', e);
  }
}

function populateWorld() {
  [-2000, 2000].forEach((x, idx) => world.insert({
    Name: { name: `pad${idx}`, tags: ['pad'] },
    Sprite: { name: 'default', color: 0x888888, size: 100 },
    Position: { x, y: 0 }
  }));
  for (let idx = 0; idx < 25; idx++) { spawnShip(); }
}

function spawnShip() {
  const pads = Object.keys(Name.findEntitiesByTags(world, ['pad']));

  const idx = Math.random();
  const sourceId = pads[Math.floor(pads.length * Math.random())];
  const source = world.get('Position', sourceId);

  let destId;
  do { destId = pads[Math.floor(pads.length * Math.random())]; }
  while (destId === sourceId);
  const dest = world.get('Position', destId);

  world.insert({
    Name: {
      name: `ship${idx}`,
      tags: ['ship']
    },
    Spawn: {
      ttl: 10 * Math.random()
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
  });
}

function setupGui () {
  if (gui) { gui.destroy(); }
  gui = new dat.GUI();

  const generalf = gui.addFolder('General');
  generalf.add(world, 'isPaused');
  generalf.add(world, 'debug');
  generalf.open();

  const vpSystem = world.getSystem('ViewportWebGL');
  const vpf = gui.addFolder('Viewport');
  vpf.add(
    vpSystem, 'zoom',
    vpSystem.options.zoomMin,
    vpSystem.options.zoomMax
  ).listen();
  vpf.add(vpSystem, 'lineWidth', 1.0, 4.0).step(0.5).listen();
  [
    'gridEnabled', 'followEnabled', 'cameraX', 'cameraY',
    'spriteCount', 'lastVertexCount', 'actualBufferSize',
    'calculatedBufferSize'
  ].forEach(name => vpf.add(vpSystem, name).listen());

  const motionSystem = world.getSystem('Motion');
  const mf = gui.addFolder('Motion');
  [ 'debug' ].forEach(name => mf.add(motionSystem.options, name));
  mf.open();

  const steeringSystem = world.getSystem('Steering');
  const sf = gui.addFolder('Steering');
  [ 'debug' ].forEach(name => sf.add(steeringSystem.options, name));
  sf.open();
}

init();
