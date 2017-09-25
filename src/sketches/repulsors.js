import dat from 'dat-gui';

let World, installPlugins, world, plugins, gui;

const systems = {
  ViewportWebGL: {
    debug: true,
    container: '#game',
    followName: 'hero1',
    zoom: 0.3
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
  HordeSpawn: {
    viewportSystemName: 'ViewportWebGL',
    offscreenTTL: 0.5,
    spawnMargin: 250,
    minCount: 150,
    maxFrameSpawn: 15,
    spawn: (x, y) => {
      const MIN_SIZE=100;
      const MAX_SIZE=300;
      const size = ((MAX_SIZE - MIN_SIZE) * Math.random()) + MIN_SIZE;
      world.insert({
        Sprite: { name: 'mine', size: size, color: 0xff2222 },
        Health: { max: 4 * size * size },
        Spawn: { },
        Collidable: { },
        Bounce: { mass: 4 * size * size },
        Position: { x: x, y: y, rotation: (Math.PI * 2) * Math.random() },
        Motion: { dx: 0, dy: 0, drotation: (Math.PI * 2) * Math.random() },
        Thruster: { deltaV: 2400 + Math.random() * 100, maxV: 1200 + Math.random() * 200 },
        Seeker: { targetName: 'hero1', radPerSec: 0.5 + Math.random() * 0.2 },
        HordeSpawn: { }
      });
    }
  }
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
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('build world error', e);
  }
}

function populateWorld () {
  world.insert({
    Name: { name: 'hero1'},
    // Health: { max: 4000 },
    Sprite: { name: 'hero', size: 150, color: 0x3333ff },
    Spawn: {},
    Collidable: {},
    Bounce: { damage: 0.0001, mass: 7000 },
    Position: { x: 0, y: 0, rotation: -(Math.PI / 2) },
    Motion: {},
    Thruster: { deltaV: 2800, maxV: 1400, active: false },
    PlayerInputSteering: { radPerSec: Math.PI },
  });

  let x = 0;
  for (let y = 0; y > -15000; y -= 600) {
    world.insert({
      Name: { name: `repulsor${y}` },
      Sprite: { name: 'repulsor', color: 0x228822 },
      Position: { x, y },
      Motion: { },
      Repulsor: { range: 600, force: 300 }
    });
    x += (-300 + Math.random() * 600);
  }
}

function setupGui () {
  if (gui) { gui.destroy(); }
  gui = new dat.GUI();

  const vpSystem = world.getSystem('ViewportWebGL');
  const spawnSystem = world.getSystem('HordeSpawn');

  gui.add(world, 'isPaused');
  gui.add(world, 'debug');
  gui.add(vpSystem, 'zoom',
    vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();
  gui.add(vpSystem, 'lineWidth', 1.0, 4.0).step(0.5).listen();

  const names = [ 'gridEnabled', 'followEnabled', 'cameraX', 'cameraY' ];
  names.forEach(function (name) {
    gui.add(vpSystem, name).listen();
  });

  const cp = vpSystem.cursorPosition;
  gui.add(cp, 'x').listen();
  gui.add(cp, 'y').listen();

  gui.add(spawnSystem, 'spawnCount').listen();
}

init();
