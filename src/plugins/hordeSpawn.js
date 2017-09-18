import { Component, System } from '../lib/core';

import { MSG_DESTROY } from './spawn';

// Commonly used temp variables, pre-declared early.
let entityId, matches, sprite;

export class HordeSpawn extends Component {
  static defaults() {
    return { age: 0 };
  }
}

export const components = { HordeSpawn: HordeSpawn };

export class HordeSpawnSystem extends System {

  defaultOptions() {
    return {
      viewportSystemName: 'ViewportPixi',
      minCount: 100,
      maxFrameSpawn: 50,
      offscreenTTL: 1.0,
      spawnMargin: 100,
      spawn: () => {}
    };
  }

  initialize() {
    this.spawnCount = 0;
    this.viewportSystem = this.world.getSystem(this.options.viewportSystemName);
  }

  matchComponent() { return 'HordeSpawn'; }

  update(timeDelta) {
    matches = this.getMatchingComponents() || {};
    this.spawnCount = Object.keys(matches).length;
    if (this.spawnCount < this.options.minCount) {
      const cnt = Math.max(
        this.options.maxFrameSpawn,
        this.options.minCount - this.spawnCount
      );
      for (let i = 0; i < cnt; i++) {
        this.spawnOffscreen();
      }
    }
    for (entityId in matches) {
      this.updateComponent(timeDelta, entityId, matches[entityId]);
    }
  }

  updateComponent(timeDelta, entityId, hordespawn) {
    sprite = this.world.get('Sprite', entityId);
    if (sprite.visible) {
      hordespawn.age = 0;
    } else {
      hordespawn.age += timeDelta;
      if (hordespawn.age >= this.options.offscreenTTL) {
        this.world.publish(MSG_DESTROY, entityId);
      }
    }
  }

  spawnOffscreen() {
    const {visibleLeft, visibleRight, visibleTop, visibleBottom} = this.viewportSystem;
    const margin = this.options.spawnMargin;
    const w = (visibleRight + margin) - (visibleLeft - margin);
    const h = (visibleBottom + margin) - (visibleTop - margin);
    const r = Math.random();

    let x, y;

    if (r < 0.5) {
      y = (visibleTop - margin) + (Math.random() * h);
    } else {
      x = (visibleLeft - margin) + (Math.random() * w);
    }

    if (r < 0.25) {
      x = visibleLeft - margin;
    } else if (r < 0.5) {
      x = visibleRight + margin;
    } else if (r < 0.75) {
      y = visibleTop - margin;
    } else {
      y = visibleBottom + margin;
    }

    this.options.spawn(x, y);
  }

}

export const systems = { HordeSpawn: HordeSpawnSystem };
