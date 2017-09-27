import * as Core from '../lib/core';

import Vector2D from '../lib/Vector2D';

const HALF_PI = Math.PI / 2;

export class LateralThruster extends Core.Component {
  static defaults() {
    return {
      active: true,
      throttle: 0.0,
      stop: false,
      useBrakes: true,
      deltaV: 0,
      maxV: 0
    };
  }
}
export const components = { LateralThruster };

export class LateralThrusterSystem extends Core.System {

  defaultOptions() {
    return {
      debug: false
    };
  }

  matchComponent() { return 'LateralThruster'; }

  initialize() {
    this.vInertia = new Vector2D();
    this.vThrust = new Vector2D();
    this.vBrakes = new Vector2D();
  }

  updateComponent(timeDelta, entityId, lateralThruster) {

    if (!lateralThruster.active) { return; }

    const pos = this.world.get('Position', entityId);
    const motion = this.world.get('Motion', entityId);
    if (!pos || !motion) { return; }

    // Inertia is current motion
    this.vInertia.setValues(motion.dx, motion.dy);

    // delta-v available for the current tick
    const tickDeltaV = timeDelta * lateralThruster.deltaV;

    if (!lateralThruster.stop) {
      // Create thrust vector per rotation & throttle direction, add to inertia.
      this.vThrust.setValues(tickDeltaV, 0);
      this.vThrust.rotate(pos.rotation +
        Math.sign(lateralThruster.throttle) * HALF_PI);
      this.vInertia.add(this.vThrust);
    }

    if (lateralThruster.useBrakes) {
      // Try to enforce the max_v limit with braking thrust.
      const maxV = lateralThruster.stop ? 0 :
        Math.abs(lateralThruster.throttle * lateralThruster.maxV);
      const currV = this.vInertia.magnitude();
      const overV = currV - maxV;
      if (overV > 0) {
        const brakingDv = Math.min(tickDeltaV, overV);
        this.vBrakes.setValues(this.vInertia.x, this.vInertia.y);
        this.vBrakes.normalize();
        this.vBrakes.multiplyScalar(0-brakingDv);
        this.vInertia.add(this.vBrakes);
      }
      if (lateralThruster.stop && currV === 0) {
        lateralThruster.active = false;
      }
    }

    // Update inertia. Note that we've been careful only to make changes
    // to inertia within the delta-v of the lateralThruster. Other influences
    // on inertia should be preserved.
    motion.dx = this.vInertia.x;
    motion.dy = this.vInertia.y;
  }
}
export const systems = { LateralThruster: LateralThrusterSystem };

