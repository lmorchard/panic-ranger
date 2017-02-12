import { World } from '../lib/core';

// import '../plugins/viewportCanvas';
import '../plugins/viewportPixi';
import '../plugins/drawStats';
import '../plugins/memoryStats';
import '../plugins/datGui';
import '../plugins/name';
import '../plugins/position';
import '../plugins/orbiter';
import '../plugins/motion';

const world = new World({
  systems: {
    // ViewportCanvas: {
    ViewportPixi: {
      container: '#game',
      canvas: '#viewport',
      // followName: 'alpha'
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
  Position: {}
}, {
  Name: { name: 'alpha'},
  Position: { x: 250, y: 250 },
  Orbiter: { name: 'sun' }
}, {
  Name: { name: 'beta'},
  Position: { x: -250, y: -250 },
  Orbiter: { name: 'sun' }
}, {
  Name: { name: 'theta'},
  Position: { x: -250, y: 250 },
  Orbiter: { name: 'sun' }
}, {
  Name: { name: 'whatever'},
  Position: { x: 250, y: -250 },
  Orbiter: { name: 'sun' }
}/*, {
  Name: { name: 'delta'},
  Position: {},
  Motion: { dx: move, dy: -move, drotation: -rot}
}, {
  Name: { name: 'gamma'},
  Position: {},
  Motion: { dx: -move, dy: move, drotation: -rot}
}*/);


world.start();
