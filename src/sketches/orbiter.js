import { World } from '../lib/core';

import '../plugins/viewportWebGL';
import '../plugins/drawStats';
import '../plugins/memoryStats';
import '../plugins/datGui';
import '../plugins/name';
import '../plugins/position';
import '../plugins/orbiter';
import '../plugins/motion';

const world = window.world = new World({
  systems: {
    ViewportWebGL: {
      container: '#game',
      zoom: 0.3
    },
    DrawStats: {},
    MemoryStats: {},
    DatGui: {},
    Motion: {},
    Orbiter: {}
  }
});

world.insert({
  Name: { name: 'sun'},
  Sprite: { name: 'default' },
  Position: {}
}, {
  Name: { name: 'alpha'},
  Sprite: { name: 'default' },
  Position: { x: 250, y: 250 },
  Orbiter: { name: 'sun' }
}, {
  Name: { name: 'beta'},
  Sprite: { name: 'default' },
  Position: { x: -250, y: -250 },
  Orbiter: { name: 'sun' }
}, {
  Name: { name: 'theta'},
  Sprite: { name: 'default' },
  Position: { x: -250, y: 250 },
  Orbiter: { name: 'sun' }
}, {
  Name: { name: 'whatever'},
  Sprite: { name: 'default' },
  Position: { x: 250, y: -250 },
  Orbiter: { name: 'sun' }
});

world.start();
