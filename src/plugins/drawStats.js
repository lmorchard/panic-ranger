import * as Core from '../lib/core';

import Stats from 'stats-js';

export class DrawStats extends Core.System {

  initialize() {

    this.drawStats = new Stats();
    this.drawStats.setMode(0);
    this.drawStats.domElement.style.position = 'absolute';
    this.drawStats.domElement.style.left = '0px';
    this.drawStats.domElement.style.top = '0px';
    document.body.appendChild(this.drawStats.domElement);

    this.tickStats = new Stats();
    this.tickStats.setMode(0);
    this.tickStats.domElement.style.position = 'absolute';
    this.tickStats.domElement.style.left = '0px';
    this.tickStats.domElement.style.top = '55px';
    document.body.appendChild(this.tickStats.domElement);

  }

  updateStart() { this.tickStats.begin(); }

  updateEnd() { this.tickStats.end(); }

  drawStart() { this.drawStats.begin(); }

  drawEnd() { this.drawStats.end(); }

}
Core.registerSystem('DrawStats', DrawStats);
