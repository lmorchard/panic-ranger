import * as Core from '../lib/core';

import MemoryStats from 'memory-stats';

export class MemoryStatsSystem extends Core.System {

  initialize() {
    this.stats = new MemoryStats();
    this.stats.domElement.style.position = 'fixed';
    this.stats.domElement.style.left = '85px';
    this.stats.domElement.style.top = '0px';
    document.body.appendChild(this.stats.domElement);
  }

  draw() { this.stats.update(); }

}

export const systems = { MemoryStats: MemoryStatsSystem };
