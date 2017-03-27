import * as Core from '../lib/core';

import './position';
import './motion';
import { MSG_DAMAGE } from './health';

import Vector2D from '../lib/Vector2D';

export class BounceComponent extends Core.Component {
  static defaults() {
    return {
      mass: 1000.0
    };
  }
}

Core.registerComponent('Bounce', BounceComponent);

export class BounceSystem extends Core.System {

  matchComponent() { return 'Bounce'; }

  initialize() {
    this.dn = new Vector2D();
    this.dt = new Vector2D();
    this.mt = new Vector2D();
    this.v1 = new Vector2D();
    this.v2 = new Vector2D();
    this.v1n = new Vector2D();
    this.v1t = new Vector2D();
    this.v2n = new Vector2D();
    this.v2t = new Vector2D();
  }

  update(timeDelta) {
    const entities = this.world;
    const matches = this.getMatchingComponents();

    const pairs = {};
    for (const aEntityId in matches) {

      // const bounce = matches[aEntityId];
      const aCollidable = entities.get('Collidable', aEntityId);

      for (const bEntityId in aCollidable.inCollisionWith) {
        const pair = [aEntityId, bEntityId];
        pair.sort();
        pairs[pair.join(':')] = pair;
      }

      // TODO: Process world boundary edge bounce?

    }

    for (const key in pairs) {
      const aEntityId = pairs[key][0];
      const aBouncer = entities.get('Bounce', aEntityId);
      if (!aBouncer) { continue; }

      const bEntityId = pairs[key][1];
      const bBouncer = entities.get('Bounce', bEntityId);
      if (!bBouncer) { continue; }

      this.resolveElasticCollision(timeDelta, aEntityId, aBouncer, bEntityId, bBouncer);
    }

  }

  // See also:
  // http://en.m.wikipedia.org/wiki/Elastic_collision
  // http://en.m.wikipedia.org/wiki/Dot_product
  // https://github.com/Edifear/volleyball/blob/master/collision.html
  // https://github.com/DominikWidomski/Processing/blob/master/sketch_canvas_red_particles/particles.pde#L47
  resolveElasticCollision(timeDelta, aEntityId, aBouncer, bEntityId, bBouncer) {

    const entities = this.world;

    const aPosition = entities.get('Position', aEntityId);
    const aSprite = entities.get('Sprite', aEntityId);
    const aMotion = entities.get('Motion', aEntityId);

    const bPosition = entities.get('Position', bEntityId);
    const bSprite = entities.get('Sprite', bEntityId);
    const bMotion = entities.get('Motion', bEntityId);

    // First, back both entities off to try to prevent sticking
    /*
    aPosition.x -= aMotion.dx * timeDelta;
    aPosition.y -= aMotion.dy * timeDelta;
    bPosition.x -= bMotion.dx * timeDelta;
    bPosition.y -= bMotion.dy * timeDelta;
    const radii, dx, dy;
    while (true) {
      aPosition.x -= aMotion.dx * timeDelta;
      aPosition.y -= aMotion.dy * timeDelta;
      bPosition.x -= bMotion.dx * timeDelta;
      bPosition.y -= bMotion.dy * timeDelta;

      radii = (aSprite.size + bSprite.size) / 2;
      dx = aPosition.x - bPosition.x;
      dy = aPosition.y - bPosition.y;
      if (dx*dx + dy*dy > radii*radii) { break; }
    }
    */

    // Vector between entities
    this.dn.setValues(aPosition.x - bPosition.x, aPosition.y - bPosition.y);

    // Distance between entities
    const delta = this.dn.magnitude();

    // Normal vector of the collision plane
    this.dn.normalize();

    // Tangential vector of the collision plane
    this.dt.setValues(this.dn.y, -this.dn.x);

    // HACK: avoid divide by zero
    if (delta === 0) { bPosition.x += 0.01; }

    // Get total mass for entities
    const m1 = aBouncer.mass;
    const m2 = bBouncer.mass;
    const M = m1 + m2;

    // Minimum translation vector to push entities apart
    this.mt.setValues(
      this.dn.x * (aSprite.width + bSprite.width - delta) * 1.1,
      this.dn.y * (aSprite.height + bSprite.height - delta) * 1.1
    );

    // Velocity vectors of entities before collision
    this.v1.setValues((aMotion) ? aMotion.dx : 0, (aMotion) ? aMotion.dy : 0);
    this.v2.setValues((bMotion) ? bMotion.dx : 0, (bMotion) ? bMotion.dy : 0);

    // split the velocity vector of the first entity into a normal
    // and a tangential component in respect of the collision plane
    this.v1n.setValues(
      this.dn.x * this.v1.dot(this.dn),
      this.dn.y * this.v1.dot(this.dn)
    );
    this.v1t.setValues(
      this.dt.x * this.v1.dot(this.dt),
      this.dt.y * this.v1.dot(this.dt)
    );

    // split the velocity vector of the second entity into a normal
    // and a tangential component in respect of the collision plane
    this.v2n.setValues(
      this.dn.x * this.v2.dot(this.dn),
      this.dn.y * this.v2.dot(this.dn)
    );
    this.v2t.setValues(
      this.dt.x * this.v2.dot(this.dt),
      this.dt.y * this.v2.dot(this.dt)
    );

    // calculate new velocity vectors of the entities, the tangential
    // component stays the same, the normal component changes analog to
    // the 1-Dimensional case

    if (aMotion) {
      const aFactor = (m1 - m2) / M * this.v1n.magnitude() +
                    2 * m2 / M * this.v2n.magnitude();
      aMotion.dx = this.v1t.x + this.dn.x * aFactor;
      aMotion.dy = this.v1t.y + this.dn.y * aFactor;
      this.processDamage(aEntityId, bEntityId, aMotion, aBouncer, m1);
    }

    if (bMotion) {
      const bFactor = (m2 - m1) / M * this.v2n.magnitude() +
                    2 * m1 / M * this.v1n.magnitude();
      bMotion.dx = this.v2t.x - this.dn.x * bFactor;
      bMotion.dy = this.v2t.y - this.dn.y * bFactor;
      this.processDamage(bEntityId, aEntityId, bMotion, bBouncer, m1);
    }

  }

  processDamage(eid, c_eid, v_motion, bouncer, m1) {
    if (!bouncer.damage) { return; }

    // Convert a fraction of the rebound velocity into damage by mass
    const dmg = Math.sqrt(v_motion.dx * v_motion.dx + v_motion.dy * v_motion.dy) *
                bouncer.damage * m1;

    this.world.publish(MSG_DAMAGE, {
      to: eid,
      from: c_eid,
      amount: dmg / 2
    });

    this.world.publish(MSG_DAMAGE, {
      to: c_eid,
      from: eid,
      amount: dmg / 2
    });
  }

}

Core.registerSystem('Bounce', BounceSystem);
