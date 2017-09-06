import * as Core from '../lib/core';
import { squareDistance/* , distance, cacheCall, timeStart, timeEnd*/ } from '../lib/utils';

import '../plugins/position';
import '../plugins/motion';

import Vector2D from '../lib/Vector2D';

export class Steering extends Core.Component {
  static defaults() {
    return {
      active: false,
      thrusterTurnCutoff: null,
      thrusterTurnThrottle: 0.25,
      acquisitionDelay: 0,
      radPerSec: Math.PI,

      avoidFactor: 1.0,
      avoidTags: [],
      avoidSensorRange: 1000,
      avoidObstacleRepel: [10, 2.0],

      // TODO: prioritized list of things to seek - e.g. path from pathfinder
      // ordered by current distance
      seekFactor: 1.0,
      seekTargetName: null,
      seekTargetEntityId: null,
      seekTargetPosition: null,
    };
  }
}

Core.registerComponent('Steering', Steering);

export class SteeringSystem extends Core.System {

  defaultOptions() {
    return {
      debug: false,
      positionSystemName: 'Position',
      behaviors: [ 'avoid', 'push', 'seek', 'flee', 'wander', 'evade', 'pursue' ]
    };
  }

  matchComponent() { return 'Steering'; }

  initialize() {
    this.positionSystem = this.world.getSystem(this.options.positionSystemName);

    this.vectors = {};
    this.options.behaviors.concat(['target'])
      .forEach(name => this.vectors[name] = new Vector2D());
  }

  updateComponent(timeDelta, entityId, steering) {
    const position = this.world.get('Position', entityId);
    const motion = this.world.get('Motion', entityId);
    if (!position || !motion) { return; }

    if (!steering.active) {
      motion.drotation = 0;
      return;
    }

    this.vectors.target.setValues(0, 0);
    for (let idx = 0; idx < this.options.behaviors.length; idx++) {
      const behavior = this.options.behaviors[idx];
      const factor = steering[`${behavior}Factor`] || 0;
      if (factor === 0) { continue; }
      const vector = this.vectors[behavior];
      vector.setValues(0, 0);
      this[behavior](vector, timeDelta, entityId, steering, position, motion);
      vector.multiplyScalar(factor);
      this.vectors.target.add(vector);
    }

    this.applySteering(timeDelta, entityId, steering, position, motion);
  }

  avoid(vector, timeDelta, entityId, steering, position/*, motion */) {
    // const sprite = this.world.get('Sprite', entityId);

    const range = steering.avoidSensorRange;
    const sqRange = range * range;

    this.positionSystem.quadtree.iterate({
      left: position.left - range,
      top: position.top - range,
      right: position.right + range,
      bottom: position.bottom + range
    }, (item) => {
      if (entityId === item.entityId) { return; }

      const targetName = this.world.get('Name', item.entityId);
      let shouldAvoid = false;
      for (const tag of targetName.tags) {
        for (const avoidTag of steering.avoidTags) {
          if (tag === avoidTag) { shouldAvoid = true; break; }
        }
        if (shouldAvoid) { break; }
      }
      if (!shouldAvoid) { return; }

      const targetPosition = this.world.get('Position', item.entityId);
      if (!targetPosition) { return; }

      const sqDist = squareDistance(position, targetPosition);
      if (sqDist > sqRange) { return; }

      const magnitude = 10 / sqDist;
      vector.x += (position.x - targetPosition.x) * magnitude;
      vector.y += (position.y - targetPosition.y) * magnitude;
    });

    vector.normalize();
  }

  push(/* vector, timeDelta, entityId, steering, position, motion */) {
  }

  seek(vector, timeDelta, entityId, steering, position/*, motion */) {
    // Look up the orbited entity ID, if only name given.
    if (steering.seekTargetName && !steering.seekTargetEntityId) {
      steering.seekTargetEntityId = Core.getComponent('Name')
        .findEntityByName(this.world, steering.seekTargetName);
    }

    // Process a delay before the steering 'acquires' the target and
    // starts steering. Makes missiles look interesting.
    if (steering.acquisitionDelay > 0) {
      steering.acquisitionDelay -= timeDelta;
      return;
    }

    // Accept either a raw x/y coord or entity ID as target
    let seekTargetPosition = steering.seekTargetPosition;
    if (!seekTargetPosition) {
      seekTargetPosition = this.world.get('Position', steering.seekTargetEntityId);
    }
    if (!seekTargetPosition) { return; }

    vector.setValues(seekTargetPosition.x - position.x, seekTargetPosition.y - position.y);
    vector.normalize();
  }

  flee(/* vector, timeDelta, entityId, steering, position, motion */) {
  }

  wander(/* vector, timeDelta, entityId, steering, position, motion */) {
  }

  evade(/* vector, timeDelta, entityId, steering, position, motion */) {
  }

  pursue(/* vector, timeDelta, entityId, steering, position, motion */) {
  }

  applySteering(timeDelta, entityId, steering, position, motion) {
    const target = this.vectors.target;
    if (target.x === 0 && target.y === 0) { return; }

    // Get the target angle, ensuring a 0..2*Math.PI range.
    let targetAngle = target.angle();
    if (targetAngle < 0) { targetAngle += (2 * Math.PI); }

    // Pick the direction from current to target angle
    let direction = (targetAngle < position.rotation) ? -1 : 1;

    // If the offset between the angles is more than half a circle, go
    // the other way because it'll be shorter.
    const offset = Math.abs(targetAngle - position.rotation);
    if (offset > Math.PI) {
      direction = 0 - direction;
    }

    // Throttle back for sharp turns if necessary
    if (steering.thrusterTurnCutoff !== null) {
      const thruster = this.world.get('Thruster', entityId);
      thruster.active = true;
      thruster.throttle = (offset > steering.thrusterTurnCutoff)
        ? steering.thrusterTurnThrottle : 1.0;
    }

    // Work out the desired delta-rotation to steer toward target
    const targetDr = direction *
      Math.min(steering.radPerSec, offset / timeDelta);

    // Calculate the delta-rotation impulse required to meet the goal,
    // but constrain to the capability of the steering thrusters
    let impulseDr = (targetDr - motion.drotation);
    if (Math.abs(impulseDr) > steering.radPerSec) {
      if (impulseDr > 0) {
        impulseDr = steering.radPerSec;
      } else if (impulseDr < 0) {
        impulseDr = 0 - steering.radPerSec;
      }
    }
    motion.drotation += impulseDr;
  }

  drawDebug(/* timeDelta, g */) {
    if (!this.options.debug) { return; }
  }

}

Core.registerSystem('Steering', SteeringSystem);
