import * as Core from '../lib/core';

import '../plugins/name';
import '../plugins/position';
import '../plugins/motion';
import '../plugins/thruster';
import '../plugins/seeker';
import '../plugins/viewportPixi';
import '../plugins/drawStats';
import '../plugins/memoryStats';
import '../plugins/datGui';
import '../plugins/playerInputSteering';

const debug = true;

const world = new Core.World({
  systems: {
    // ViewportCanvas: {
    ViewportPixi: {
      debug: debug,
      container: '#game',
      canvas: '#viewport',
      followName: 'hero1',
      zoom: 0.5
    },
    DrawStats: {},
    MemoryStats: {},
    DatGui: {},
    Motion: {},
    PlayerInputSteering: {},
    Thruster: {},
    Seeker: {}
  }
});

world.insert({
  Name: { name: 'hero1'},
  Sprite: { name: 'hero', color: '#00f' },
  Position: { x: 250, y: 250 },
  Thruster: { deltaV: 1200, maxV: 500, active: false },
  Motion: {},
  PlayerInputSteering: { radPerSec: Math.PI }
}, {
  Name: { name: 'sun'},
  Sprite: { name: 'asteroid', size: 300 },
  Position: {},
  Motion: { dx: 0, dy: 0, drotation: Math.PI / 6 }
}, {
  Name: { name: 'chaser1'},
  Sprite: { name: 'enemyscout', color: '#f00' },
  Position: {},
  Motion: {},
  Thruster: { deltaV: 400, maxV: 175 },
  Seeker: { targetName: 'hero1', radPerSec: 0.9 }
}, {
  Name: { name: 'chaser2'},
  Sprite: { name: 'enemyscout', color: '#0f0' },
  Position: {},
  Motion: {},
  Thruster: { deltaV: 600, maxV: 400 },
  Seeker: { targetName: 'hero1', radPerSec: 2 }
});

world.start();

const vpSystem = world.getSystem('ViewportPixi');
const guiSystem = world.getSystem('DatGui');
const gui = guiSystem.gui;

gui.add(vpSystem, 'zoom', vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();
gui.add(vpSystem, 'lineWidth', 1.0, 4.0).step(0.5).listen();

const names = [ 'debug', 'gridEnabled', 'followEnabled', 'cameraX', 'cameraY' ];
names.forEach(function (name) {
  gui.add(vpSystem, name).listen();
});

const cp = vpSystem.cursorPosition;
gui.add(cp, 'x').listen();
gui.add(cp, 'y').listen();
