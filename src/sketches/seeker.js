import * as Core from '../lib/core';

import '../plugins/name';
import '../plugins/position';
import '../plugins/motion';
import '../plugins/thruster';
import '../plugins/orbiter';
import '../plugins/seeker';
import '../plugins/viewportPixi';
import '../plugins/drawStats';
import '../plugins/memoryStats';
import '../plugins/datGui';

const debug = true;

const world = new Core.World({
  systems: {
    ViewportPixi: {
      debug: debug,
      container: '#game',
      followName: 'orbiter1',
      zoom: 0.5
    },
    DrawStats: {},
    MemoryStats: {},
    DatGui: {},
    Motion: {},
    Orbiter: {},
    Thruster: {},
    Seeker: {}
  }
});

world.insert({
  Name: { name: 'sun'},
  Sprite: { name: 'asteroid', size: 300 },
  Position: {},
  Motion: { dx: 0, dy: 0, drotation: Math.PI / 6 }
}, {
  Name: { name: 'orbiter1'},
  Sprite: { name: 'hero', color: '#00f' },
  Position: { x: 250, y: 250 },
  Orbiter: { name: 'sun' }
}, {
  Name: { name: 'chaser1'},
  Sprite: { name: 'enemyscout', color: '#f00' },
  Position: {},
  Motion: {},
  Thruster: { deltaV: 400, maxV: 175 },
  Seeker: { targetName: 'orbiter1', radPerSec: 0.9 }
}, {
  Name: { name: 'chaser2'},
  Sprite: { name: 'enemyscout', color: '#0f0' },
  Position: {},
  Motion: {},
  Thruster: { deltaV: 600, maxV: 400 },
  Seeker: { targetName: 'orbiter1', radPerSec: 2 }
});

world.start();

const vpSystem = world.getSystem('ViewportPixi');
const guiSystem = world.getSystem('DatGui');
const gui = guiSystem.gui;

gui.add(vpSystem, 'zoom', vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();

const names = [ 'debug', 'gridEnabled', 'cameraX', 'cameraY' ];
names.forEach(function (name) {
  gui.add(vpSystem, name).listen();
});
