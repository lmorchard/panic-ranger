import * as Core from '../lib/core';

import '../plugins/position';
import '../plugins/motion';

import Vector2D from '../lib/Vector2D';

export class Seeker extends Core.Component {
  static defaults() {
    return {
      active: true,
      targetName: null,
      targetEntityId: null,
      targetPosition: null,
      acquisitionDelay: 0,
      radPerSec: Math.PI
    };
  }
}

Core.registerComponent('Seeker', Seeker);

export class SeekerSystem extends Core.System {

  matchComponent() { return 'Seeker'; }

  initialize() {
    this.vSeeker = new Vector2D();
    this.vTarget = new Vector2D();
  }

  updateComponent(timeDelta, entityId, seeker) {
    const position = this.world.get('Position', entityId);
    const motion = this.world.get('Motion', entityId);
    if (!position || !motion) { return; }

    if (!seeker.active) {
      motion.drotation = 0;
      return;
    }

    // Look up the orbited entity ID, if only name given.
    if (seeker.targetName && !seeker.targetEntityId) {
      seeker.targetEntityId = Core.getComponent('Name')
        .findEntityByName(this.world, seeker.targetName);
    }

    // Process a delay before the seeker 'acquires' the target and
    // starts steering. Makes missiles look interesting.
    if (seeker.acquisitionDelay > 0) {
      seeker.acquisitionDelay -= timeDelta;
      return;
    }

    // Accept either a raw x/y coord or entity ID as target
    let targetPosition = seeker.targetPosition;
    if (!targetPosition) {
      targetPosition = this.world.get('Position', seeker.targetEntityId);
    }
    if (!targetPosition) { return; }

    // Set up the vectors for angle math...
    this.vSeeker.setValues(position.x, position.y);
    this.vTarget.setValues(targetPosition.x, targetPosition.y);

    // Get the target angle, ensuring a 0..2*Math.PI range.
    let targetAngle = this.vSeeker.angleTo(this.vTarget);
    if (targetAngle < 0) {
      targetAngle += (2 * Math.PI);
    }

    // Pick the direction from current to target angle
    let direction = (targetAngle < position.rotation) ? -1 : 1;

    // If the offset between the angles is more than half a circle, go
    // the other way because it'll be shorter.
    const offset = Math.abs(targetAngle - position.rotation);
    if (offset > Math.PI) {
      direction = 0 - direction;
    }

    // Work out the desired delta-rotation to steer toward target
    const targetDr = direction * Math.min(seeker.radPerSec, offset / timeDelta);

    // Calculate the delta-rotation impulse required to meet the goal,
    // but constrain to the capability of the steering thrusters
    let impulseDr = (targetDr - motion.drotation);
    if (Math.abs(impulseDr) > seeker.radPerSec) {
      if (impulseDr > 0) {
        impulseDr = seeker.radPerSec;
      } else if (impulseDr < 0) {
        impulseDr = 0 - seeker.radPerSec;
      }
    }
    motion.drotation += impulseDr;

  }

}

Core.registerSystem('Seeker', SeekerSystem);
