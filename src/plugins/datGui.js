import * as Core from '../lib/core';

import dat from 'dat-gui';

export class DatGui extends Core.System {

  initialize() {
    this.gui = new dat.GUI();
  }

}
Core.registerSystem('DatGui', DatGui);
