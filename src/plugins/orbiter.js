import * as Core from '../lib/core';

import './position';

import Vector2D from '../lib/Vector2D';

export class Orbiter extends Core.Component {
  static defaults() {
    return {
      name: null,
      entityId: null,
      angle: 0.0,
      rotate: true,
      radPerSec: Math.PI / 4
    };
  }
}
export const components = { Orbiter: Orbiter };

export class OrbiterSystem extends Core.System {

  matchComponent() { return 'Orbiter'; }

  initialize() {
    this.vOrbited = new Vector2D();
    this.vOrbiter = new Vector2D();
    this.vOld = new Vector2D();
  }

  updateComponent(timeDelta, entityId, orbiter) {

    // Look up the orbited entity ID, if only name given.
    if (orbiter.name && !orbiter.entityId) {
      orbiter.entityId = Core.getComponent('Name')
        .findEntityByName(this.world, orbiter.name);
    }

    const pos = this.world.get('Position', entityId);
    const oPos = this.world.get('Position', orbiter.entityId);

    this.vOrbited.setValues(oPos.x, oPos.y);
    this.vOrbiter.setValues(pos.x, pos.y);

    const angleDelta = timeDelta * orbiter.radPerSec;
    this.vOrbiter.rotateAround(this.vOrbited, angleDelta);

    this.vOld.setValues(pos.x, pos.y);
    pos.x = this.vOrbiter.x;
    pos.y = this.vOrbiter.y;
    if (orbiter.rotate) {
      pos.rotation = this.vOld.angleTo(this.vOrbiter);
    }

  }
}
export const systems = { Orbiter: OrbiterSystem };
