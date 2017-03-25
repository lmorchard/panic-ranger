import { Component, System, registerComponent, registerSystem } from '../lib/core';

export class Repulsor extends Component {
    static defaults() {
      return {
        active: true,
        range: 500,
        force: 200
      };
    }
}

registerComponent('Repulsor', Repulsor);

let components, component, entityId, position, repulsor, repulsorPosition,
    neighborSprite, neighborPosition, neighborMotion, repelAngle, repelForce,
    dist;

const queryBounds = {};

export class RepulsorSystem extends System {

  defaultOptions() {
    return {
      positionSystemName: 'Position'
    };
  }

  matchComponent() { return 'Repulsor'; }

  initialize() {
    this.positionSystem = this.world.getSystem(this.options.positionSystemName);
    this.applyRepulsionBound = (neighbor, component) =>
      this.applyRepulsion(neighbor, component);
  }

  updateComponent(timeDelta, entityId, component) {
    if (!component.active) { return; }

    position = this.world.get('Position', entityId);

    queryBounds.left = position.left - component.range;
    queryBounds.right = position.right + component.range;
    queryBounds.top = position.top - component.range;
    queryBounds.bottom = position.bottom + component.range;

    this.positionSystem.quadtree.iterate(queryBounds, this.applyRepulsionBound, entityId);
  }

  applyRepulsion(neighbor, repulsorId) {
    if (entityId === neighbor.entityId) { return; }

    neighborSprite = this.world.get('Sprite', neighbor.entityId);
    if (neighborSprite.name !== 'mine') { return; }

    repulsor = this.world.get('Repulsor', repulsorId);
    repulsorPosition = this.world.get('Position', repulsorId);
    neighborPosition = this.world.get('Position', neighbor.entityId);
    neighborMotion = this.world.get('Motion', neighbor.entityId);

    dist =
      (neighborPosition.x - repulsorPosition.x) *
      (neighborPosition.x - repulsorPosition.x)
      +
      (neighborPosition.y - repulsorPosition.y) *
      (neighborPosition.y - repulsorPosition.y)
    ;

    if (dist > (repulsor.range * repulsor.range)) { return; }
    // if (dist < repulsor.range) { return; }

    repelAngle = Math.atan2(
      repulsorPosition.y - neighborPosition.y,
      repulsorPosition.x - neighborPosition.x
    );

    repelForce = -repulsor.force;

    neighborMotion.dx += repelForce * Math.cos(repelAngle);
    neighborMotion.dy += repelForce * Math.sin(repelAngle);
  }

  draw(/* timeDelta */) {
    const g = this.getDebugGraphics();
    if (!g) { return; }

    g.lineStyle(4, 0x882222);
    components = this.getMatchingComponents();
    for (entityId in components) {
      component = components[entityId];
      position = this.world.get('Position', entityId);
      g.drawCircle(position.x, position.y, component.range);
    }
  }

}

registerSystem('Repulsor', RepulsorSystem);
