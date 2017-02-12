import * as Core from '../lib/core';

import './position';
import './motion';

import Vector2D from '../lib/Vector2D';

export class Thruster extends Core.Component {
  static defaults() {
    return {
      active: true,
      stop: false,
      useBrakes: true,
      deltaV: 0,
      maxV: 0
    };
  }
}
Core.registerComponent('Thruster', Thruster);

export class ThrusterSystem extends Core.System {

  matchComponent() { return 'Thruster'; }

  initialize() {
    this.vInertia = new Vector2D();
    this.vThrust = new Vector2D();
    this.vBrakes = new Vector2D();
  }

  updateComponent(timeDelta, entityId, thruster) {

    if (!thruster.active) { return; }

    const pos = this.world.get('Position', entityId);
    const motion = this.world.get('Motion', entityId);
    if (!pos || !motion) { return; }

    // Inertia is current motion
    this.vInertia.setValues(motion.dx, motion.dy);

    // delta-v available for the current tick
    const tickDeltaV = timeDelta * thruster.deltaV;

    if (!thruster.stop) {
      // Create thrust vector per rotation and add to inertia.
      this.vThrust.setValues(tickDeltaV, 0);
      this.vThrust.rotate(pos.rotation);
      this.vInertia.add(this.vThrust);
    }

    if (thruster.useBrakes) {
      // Try to enforce the max_v limit with braking thrust.
      const maxV = thruster.stop ? 0 : thruster.maxV;
      const currV = this.vInertia.magnitude();
      const overV = currV - maxV;
      if (overV > 0) {
        // Braking delta-v is max thruster output or remaining overage,
        // whichever is smallest. Braking vector opposes inertia.
        const brakingDv = Math.min(tickDeltaV, overV);
        this.vBrakes.setValues(this.vInertia.x, this.vInertia.y);
        this.vBrakes.normalize();
        this.vBrakes.multiplyScalar(0-brakingDv);
        this.vInertia.add(this.vBrakes);
      }
      if (thruster.stop && currV === 0) {
        thruster.active = false;
      }
    }

    // Update inertia. Note that we've been careful only to make changes
    // to inertia within the delta-v of the thruster. Other influences
    // on inertia should be preserved.
    motion.dx = this.vInertia.x;
    motion.dy = this.vInertia.y;
  }

}
Core.registerSystem('Thruster', ThrusterSystem);
