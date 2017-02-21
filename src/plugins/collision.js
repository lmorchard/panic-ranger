import * as Core from '../lib/core';

export class Collidable extends Core.Component {
  static defaults() {
    return {
      inCollision: false,
      inCollisionWith: {}
    };
  }
}

Core.registerComponent('Collidable', Collidable);

let match, matches, entityId, entityId2, position, aCollidable, bCollidable, dx, dy, radii;

export class CollisionSystem extends Core.System {

  defaultOptions() {
    return {
      positionSystemName: 'Position',
      viewportSystemName: 'ViewportPixi'
    };
  }

  matchComponent() { return 'Collidable'; }

  initialize() {
    this.positionSystem = this.world.getSystem(this.options.positionSystemName);
    this.width = this.options.width;
    this.height = this.options.height;
    this.retrieveBounds = {};
    this.checkCollisionBound = (neighbor, component) =>
      this.checkCollision(neighbor, component);
  }

  update(/* timeDelta */) {
    matches = this.getMatchingComponents();
    for (entityId in matches) {
      match = matches[entityId];
      match.inCollision = false;
      for (entityId2 in match.inCollisionWith) {
        delete match.inCollisionWith[entityId2];
      }
    }
    for (entityId in matches) {
      position = this.world.get('Position', entityId);
      if (position) {
        this.positionSystem.quadtree.iterate(position, this.checkCollisionBound, position);
      }
    }
  }

  checkCollision(bPosition, aPosition) {
    if (aPosition.entityId === bPosition.entityId) { return; }

    aCollidable = this.world.get('Collidable', aPosition.entityId);
    bCollidable = this.world.get('Collidable', bPosition.entityId);

    dx = aPosition.x - bPosition.x;
    dy = aPosition.y - bPosition.y;

    // TODO: Pluggable shape intersection detection here?

    // Check collision circle via distance
    radii = (aPosition.width + bPosition.width) / 2;
    if (dx*dx + dy*dy > radii*radii) { return; }

    aCollidable.inCollision = true;
    aCollidable.inCollisionWith[bPosition.entityId] = 1;

    bCollidable.inCollision = true;
    bCollidable.inCollisionWith[aPosition.entityId] = 1;
  }

  draw(/* timeDelta */) {
    const g = this.getDebugGraphics();
    if (!g) { return; }

    g.lineStyle(4, 0x999999);
    const collidables = this.world.get('Collidable');
    for (const entityId in collidables) {
      const collidable = collidables[entityId];
      const position = this.world.get('Position', entityId);

      if (collidable.inCollision) {
        g.drawCircle(position.x, position.y, 40);
      }
    }

  }
}

Core.registerSystem('Collision', CollisionSystem);
