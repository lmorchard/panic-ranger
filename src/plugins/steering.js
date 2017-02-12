import * as Core from '../lib/core';

import '../plugins/position';
import '../plugins/motion';

import Vector2D from '../lib/Vector2D';

const PI2 = Math.PI * 2;

export class Steering extends Core.Component {
  static defaults() {
    return {
      sensorRange: 350,
      obstacleRepel: [400, 2.1]
    };
  }
}

Core.registerComponent('Steering', Steering);

export class SteeringSystem extends Core.System {

  matchComponent() { return 'Steering'; }

  initialize() {

    this.seekFactor = 1;

    this.pushFactor = 7;

    this.avoidFactor = 10;

    this.avoidSeeAhead = 500;
    this.avoidRayWidthFactor = 1.5;

    this.vTarget = new Vector2D();

    this.vectors = {
      avoid: new Vector2D(),
      push: new Vector2D(),
      seek: new Vector2D(),
      flee: new Vector2D(),
      wander: new Vector2D(),
      evade: new Vector2D(),
      pursue: new Vector2D()
    };

  }

  updateComponent(timeDelta, entityId, steering) {

    this.vTarget.setValues(0, 0);

    for (const key in this.vectors) {
      this.vectors[key].setValues(0, 0);
      this[key](this.vectors[key], timeDelta, entityId, steering);
      this.vTarget.add(this.vectors[key]);
    }

    this.applySteering(timeDelta, entityId, steering);

  }

  avoid(vector, timeDelta, entityId, steering) {

    if (this.debug) { steering.vectors = []; }

    const sprite = this.world.get('Sprite', entityId);
    const position = this.world.get('Position', entityId);

    const result = this.lookForObstacle(entityId, position, sprite, steering);
    if (!result) { return; }

    const range = steering.sensorRange;
    this.world.getSystem('Collision').quadtree.iterate({
      x: position.x - (range / 2),
      y: position.y - (range / 2),
      width: range,
      height: range
    }, (item) => {

      if (entityId === item.entityId) { return; }

      const targetPosition = this.world.get('Position', item.entityId);
      if (!targetPosition) { return; }

      const targetSprite = this.world.get('Sprite', item.entityId);

      const A = 0;
      const B = steering.obstacleRepel[0];
      const n = 0;
      const m = steering.obstacleRepel[1];

      const dx = position.x - targetPosition.x;
      const dy = position.y - targetPosition.y;
      const edgeRange = sprite.size / 2 + targetSprite.size / 2;
      let distance = Math.sqrt(dx*dx + dy*dy) - edgeRange;
      if (distance <= 0) { distance = 0.01; }

      if (distance > steering.sensorRange) { return; }

      const U = (-A / Math.pow(distance, n)) +
              ( B / Math.pow(distance, m));

      vector.x += dx * U;
      vector.y += dy * U;

      if (this.debug) {
        steering.vectors.push([targetPosition.x, targetPosition.y, U]);
      }

    });

  }

  push(/*vector, timeDelta, entityId, steering*/) {

  }

  avoid_ray(vector, timeDelta, entityId, steering) {

    const sprite = this.world.get('Sprite', entityId);
    const position = this.world.get('Position', entityId);

    // Scan ahead for an obstacle, bail if none found.
    const result = this.lookForObstacle(entityId, position, sprite, steering);
    if (!result) { return; }

    const obstacle = result[0];
    const rayX = result[1];
    const rayY = result[2];

    // Opposite right triangle leg is distance from obstacle to avoid collision.
    const oppositeLen = obstacle.sprite.size / 2 +
      sprite.size * this.avoidRayWidthFactor;

    // Hypotenuse length is distance from obstacle.
    const hypotenuseLen = Math.sqrt(
      Math.pow(obstacle.position.x - rayX, 2) +
      Math.pow(obstacle.position.y - rayY, 2)
    );

    // Adjacent length would be avoid tangent, but no need to calculate.

    // Find angle from direct collision to avoidance
    let theta = Math.asin(oppositeLen / hypotenuseLen);

    // HACK: Too close, panic and steer hard away
    if (isNaN(theta)) { theta = Math.PI * 0.66; }

    // Find the absolute angle to the obstacle from entity.
    const obstacleAngle = Math.atan2(
      obstacle.position.y - rayY,
      obstacle.position.x - rayX
    );

    // Calculate nearest target angle for avoidance...
    // Try turning clockwise from obstacle.
    let avoidAngle = (obstacleAngle + theta);
    // Calculate the 'travel' needed from current rotation.
    const travel = Math.min(PI2 - Math.abs(position.rotation - avoidAngle),
                          Math.abs(position.rotation - avoidAngle));
    if (travel > theta) {
      // Clockwise travel exceeds theta, so counterclockwise is shorter.
      avoidAngle = obstacleAngle - theta;
    }

    // Set up the avoidance vector.
    vector.setValues(this.avoidFactor, 0);
    vector.rotate(avoidAngle);

  }

  lookForObstacle(entityId, position, sprite, steering) {
    const rayWidth = sprite.size * this.avoidRayWidthFactor;

    const vRayUnit = new Vector2D();
    vRayUnit.setValues(rayWidth, 0);
    vRayUnit.rotate(position.rotation);

    if (this.debug) { steering.hitCircles = []; }

    let obstacle, rayX, rayY;
    const steps = this.avoidSeeAhead / rayWidth;
    for (let step = 0; step < steps; step++) {
      rayX = position.x + vRayUnit.x * step;
      rayY = position.y + vRayUnit.y * step;
      obstacle = this.searchCircleForObstacle(
        steering, entityId,
        rayX, rayY, rayWidth
      );
      if (obstacle) {
        return [obstacle, rayX, rayY];
      }
    }

    return null;
  }

  searchCircleForObstacle(steering, entityId, x, y, size) {

    if (this.debug) {
      steering.hitCircles.push([x, y, size]);
    }

    const hits = [];

    this.world.getSystem('Collision').quadtree.iterate({
      x: x - (size / 2),
      y: y - (size / 2),
      width: size,
      height: size
    }, (item) => {

      if (entityId === item.entityId) { return; }
      const dx = item.position.x - x;
      const dy = item.position.y - y;
      const range = dx*dx + dy*dy;
      const radii = (size + item.sprite.size) / 2;
      if (range < radii*radii) {
        hits.push([range, item]);
      }

    });

    hits.sort(function (a, b) { return b[0] - a[0]; });
    return hits.length ? hits[0][1] : null;
  }

  seek(vector, timeDelta, entityId, steering) {

    // Look up the entity ID to seek, if only name given.
    if (steering.seekTargetName && !steering.seekTargetEntityId) {
      steering.seekTargetEntityId = Core.getComponent('Name')
        .findEntityByName(this.world, steering.seekTargetName);
    }

    if (!steering.seekTargetEntityId) { return; }

    const position = this.world.get('Position', entityId);
    if (!position) { return; }

    // Accept either a raw x/y coord or entity ID as target
    let targetPosition = steering.targetPosition;
    if (!targetPosition) {
      targetPosition = this.world.get('Position', steering.seekTargetEntityId);
    }
    if (!targetPosition) { return; }

    vector.setValues(targetPosition.x - position.x, targetPosition.y - position.y);
    vector.normalize();
    vector.multiplyScalar(this.seekFactor);

  }

  flee(/*vector, timeDelta, entityId, steering*/) {
  }

  wander(/*vector, timeDelta, entityId, steering*/) {
  }

  evade(/*vector, timeDelta, entityId, steering*/) {
  }

  pursue(/*vector, timeDelta, entityId, steering*/) {
  }

  applySteering(timeDelta, entityId, steering) {

    const motion = this.world.get('Motion', entityId);

    let targetDr = 0;

    if (!this.vTarget.isZero()) {
      const position = this.world.get('Position', entityId);

      // Get the target angle, ensuring a 0..2*Math.PI range.
      let targetAngle = this.vTarget.angle();
      if (targetAngle < 0) { targetAngle += (2 * Math.PI); }

      if (this.debug) { steering.targetAngle = targetAngle; }

      // Pick the direction from current to target angle
      let direction = (targetAngle < position.rotation) ? -1 : 1;

      // If the offset between the angles is more than half a circle, it's
      // shorter to go the other way.
      const offset = Math.abs(targetAngle - position.rotation);
      if (offset > Math.PI) { direction = 0 - direction; }

      // Work out the desired delta-rotation to steer toward target
      targetDr = direction * Math.min(steering.radPerSec, offset / timeDelta);
    }

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

  draw(/*timeDelta*/) {
    if (!this.debug) { return; }

    /*
    const vpSystem = this.world.getSystem('CanvasViewport');
    const ctx = vpSystem.ctx;
    ctx.save();

    vpSystem.centerAndZoom(timeDelta);
    vpSystem.followEntity(timeDelta);

    const matches = this.getMatchingComponents();
    for (const entityId in matches) {
      ctx.save();

      const steering = matches[entityId];
      const position = this.world.get('Position', entityId);
      const sprite = this.world.get('Sprite', entityId);

      this.drawSteeringVsPosition(ctx, steering, position);

      if (steering.hitCircles) {
        for (const [x, y, size] of steering.hitCircles) {
          ctx.strokeStyle = '#d00';
          ctx.beginPath();
          ctx.arc(x, y, size, 0, PI2, false);
          ctx.stroke();
        }
      }

      if (steering.sensorRange) {
          ctx.strokeStyle = 'rgba(0, 64, 64, 0.75)';
          ctx.beginPath();
          ctx.arc(position.x, position.y, steering.sensorRange, 0, PI2, false);
          ctx.stroke();
      }

      if (steering.vectors) {
        for (const [x, y, U] of steering.vectors) {
          ctx.strokeStyle = 'rgba(0, 64, 64, 0.75)';
          ctx.beginPath();
          ctx.moveTo(position.x, position.y);
          ctx.lineWidth = Math.max(1, Math.min(U, sprite.width));
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }

      if (steering.pushing) {
        this.drawAngle(ctx, position, position.rotation, '#d0d');
      }

      ctx.restore();
    }

    ctx.restore();
    */
  }

  drawSteeringVsPosition(ctx, steering, position) {
    this.drawAngle(ctx, position, position.rotation, '#ddd');
    if (steering.targetAngle) {
      this.drawAngle(ctx, position, steering.targetAngle, '#dd0');
    }
  }

  drawAngle(ctx, position, angle, color) {
    const vec = new Vector2D();
    vec.setValues(this.avoidSeeAhead, 0);
    vec.rotate(angle);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(position.x + vec.x, position.y + vec.y);
    ctx.stroke();
  }

}

Core.registerSystem('Steering', SteeringSystem);
