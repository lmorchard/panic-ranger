import { World, System, registerSystem } from '../lib/core';

import '../plugins/drawStats';
import '../plugins/memoryStats';
import '../plugins/datGui';
import '../plugins/viewportPixi';
import '../plugins/name';
import '../plugins/position';
import '../plugins/motion';
import '../plugins/expiration';

const debug = true;

let matches;

class ExplosionSpawnerSystem extends System {
  defaultOptions() {
    return {
      minCount: 250,
      fieldSize: 1800
    };
  }
  initialize() {
    this.count = 0;
  }
  matchComponent() { return 'Sprite'; }
  update(timeDelta) {
    matches = this.getMatchingComponents() || {};
    this.count = Object.keys(matches).length;
    if (this.count < this.options.minCount) {
      this.spawnExplosion();
    }
  }
  spawnExplosion() {
    const ttl = 1.0 + 2.0 * Math.random();
    const colors = [
      0xff0000,
      0x00ff00,
      0x0000ff,
      0xffff00,
      0x00ffff,
      0xffffff
    ];
    this.world.insert({
      Sprite: {
        name: 'explosion',
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 100 + Math.random() * 500,
        ttl
      },
      Expiration: {
        ttl
      },
      Position: {
        x: (this.options.fieldSize * 2 * Math.random()) - this.options.fieldSize,
        y: (this.options.fieldSize * 2 * Math.random()) - this.options.fieldSize
      }
    });
  }
}

registerSystem('ExplosionSpawner', ExplosionSpawnerSystem);

const world = window.world = new World({
  systems: {
    ViewportPixi: {
      debug: debug,
      container: '#game',
      canvas: '#viewport',
      zoom: 0.3
    },
    DrawStats: {},
    MemoryStats: {},
    DatGui: {},
    Motion: {},
    Position: {},
    Expiration: {},
    ExplosionSpawner: {}
  }
});
world.start();

const vpSystem = world.getSystem('ViewportPixi');
const guiSystem = world.getSystem('DatGui');
const spawnSystem = world.getSystem('ExplosionSpawner');
const gui = guiSystem.gui;

gui.add(world, 'isPaused');
gui.add(world, 'debug');
gui.add(vpSystem, 'zoom', vpSystem.options.zoomMin, vpSystem.options.zoomMax).listen();

const names = [ 'gridEnabled', 'followEnabled', 'cameraX', 'cameraY' ];
names.forEach(function (name) {
  gui.add(vpSystem, name).listen();
});

gui.add(spawnSystem.options, 'minCount').listen();
gui.add(spawnSystem, 'count').listen();
