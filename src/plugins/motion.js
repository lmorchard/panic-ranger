import * as Core from '../lib/core';

import './position';

const PI2 = Math.PI * 2;

export class Motion extends Core.Component {
  static defaults() {
    return { dx: 0, dy: 0, drotation: 0 };
  }
}
Core.registerComponent('Motion', Motion);

export class MotionSystem extends Core.System {
  defaultOptions() {
    return {
      debug: false
    };
  }
  matchComponent() {
    return 'Motion';
  }
  updateComponent(timeDelta, entityId, motion) {
    const pos = this.world.get('Position', entityId);
    pos.x += motion.dx * timeDelta;
    pos.y += motion.dy * timeDelta;

    // Update the rotation, ensuring a 0..2*Math.PI range.
    pos.rotation = (pos.rotation + (motion.drotation * timeDelta)) % PI2;
    if (pos.rotation < 0) {
      pos.rotation += PI2;
    }
  }
  drawDebug(timeDelta, g) {
    if (!this.options.debug) { return; }

    g.save();
    const vectorFactor = 0.3;
    const motions = this.world.get('Motion');
    for (const entityId in motions) {
      const motion = motions[entityId];
      const position = this.world.get('Position', entityId);
      g.beginPath();
      g.setLineDash([32, 32]);
      g.moveTo(position.x, position.y);
      g.lineTo(
        vectorFactor * motion.dx + position.x,
        vectorFactor * motion.dy + position.y
      );
      g.lineWidth = 32;
      g.strokeStyle = '#333333';
      g.stroke();
    }
    g.restore();
  }
}
Core.registerSystem('Motion', MotionSystem);
