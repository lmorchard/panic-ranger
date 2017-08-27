import { World } from '../lib/core';

import '../plugins/drawStats';
import '../plugins/memoryStats';
import '../plugins/datGui';
import '../plugins/viewportWebGL';
import '../plugins/name';
import '../plugins/position';
import '../plugins/motion';
import { MSG_SPAWN, MSG_DESPAWN } from '../plugins/spawn';

const DEBUG = true;
const MIN_COUNT = 150;
const FIELD_SIZE = 1500;

const debugData = {
  count: 0,
  spawns: 0,
  despawns: 0
};

const world = window.world = new World({
  systems: {
    ViewportWebGL: {
      debug: DEBUG,
      container: '#game',
      WebGL: '#viewport',
      zoom: 0.3
    },
    DrawStats: {},
    MemoryStats: {},
    DatGui: {},
    Motion: {},
    Position: {},
    Spawn: {}
  }
});
world.start();

const colors = [ 0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff, 0xffffff ];

function spawnExplosion() {
  const x = (FIELD_SIZE * 2 * Math.random()) - FIELD_SIZE;
  const y = (FIELD_SIZE * 2 * Math.random()) - FIELD_SIZE;
  const ttl = 0.5 + 2.0 * Math.random();
  const color = colors[Math.floor(Math.random() * colors.length)];

  world.insert({
    Sprite: { name: 'default', color },
    Position: { x, y },
    Spawn: {
      ttl: Math.random(),
      tombstone: {
        Sprite: {
          name: 'explosion',
          size: 100 + Math.random() * 500,
          color, ttl
        },
        Position: { x, y },
        Spawn: { ttl }
      }
    }
  });
}

for (let i = 0; i < MIN_COUNT; i++) {
  spawnExplosion();
}

world.subscribe(MSG_SPAWN, (/*msg, entityId*/) => {
  debugData.spawns++;
});

world.subscribe(MSG_DESPAWN, (/*msg, entityId*/) => {
  debugData.despawns++;
  debugData.count = Object.keys(world.get('Sprite') || {}).length;
  for (let i = 0; i < MIN_COUNT - debugData.count; i++) {
    spawnExplosion();
  }
});

const vpSystem = world.getSystem('ViewportWebGL');
const guiSystem = world.getSystem('DatGui');
const gui = guiSystem.gui;

gui.add(world, 'isPaused');
gui.add(world, 'debug');
gui.add(vpSystem, 'zoom', vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();

['gridEnabled'].forEach(name => gui.add(vpSystem, name).listen());
['count', 'spawns', 'despawns'].forEach(name => gui.add(debugData, name).listen());
