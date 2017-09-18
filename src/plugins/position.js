import { Component, System } from '../lib/core';
import QuadTree from '../lib/QuadTree';

const PI2 = Math.PI * 2;

export class Position extends Component {
  static defaults() {
    return { x: 0, y: 0, rotation: 0 };
  }
}

export const components = { Position };

let entityId, sprite, position, positions;

export class PositionSystem extends System {

  defaultOptions() {
    return {
      debug: false,
      quadtreeMaxAge: 2,
      quadtreeObjectsPerNode: 5,
      quadtreeMaxLevels: 5
    };
  }

  matchComponent() { return 'Position'; }

  initialize() {
    this.bounds = {
      left: 0, top: 0, right: 0, bottom: 0,
      width: 0, height: 0
    };
    this.quadtree = new QuadTree(
      -1000, -1000, 2000, 2000,
      this.options.quadtreeObjectsPerNode,
      this.options.quadtreeMaxLevels
    );
  }

  update(timeDelta) {
    this.updateBounds();
    this.resetQuadtree(timeDelta);
    super.update(timeDelta);
  }

  resetQuadtree() {
    this.quadtree.reset(
      this.bounds.left,
      this.bounds.top,
      this.bounds.width,
      this.bounds.height,
      this.options.quadtreeObjectsPerNode,
      this.options.quadtreeMaxLevels
    );
  }

  updateBounds() {
    this.bounds.left = this.bounds.top = this.bounds.right = this.bounds.bottom = null;
    positions = this.getMatchingComponents();
    for (entityId in positions) {
      position = positions[entityId];
      if (this.bounds.left === null || position.left < this.bounds.left) { this.bounds.left = position.left; }
      if (this.bounds.top === null || position.top < this.bounds.top) { this.bounds.top = position.top; }
      if (this.bounds.right === null || position.right > this.bounds.right) { this.bounds.right = position.right; }
      if (this.bounds.bottom === null || position.bottom > this.bounds.bottom) { this.bounds.bottom = position.bottom; }
    }
    this.bounds.width = this.bounds.right - this.bounds.left;
    this.bounds.height = this.bounds.bottom - this.bounds.top;
  }

  updateComponent(timeDelta, entityId, position) {
    sprite = this.world.get('Sprite', entityId);
    if (!sprite) { return; }

    const halfWidth = sprite.width / 2;
    const halfHeight = sprite.height / 2;

    position.entityId = entityId;
    position.width = sprite.width;
    position.height = sprite.height;
    position.left = position.x - halfWidth;
    position.top = position.y - halfHeight;
    position.right = position.x + halfWidth;
    position.bottom = position.y + halfHeight;

    this.quadtree.insert(position);
  }

  drawDebug(timeDelta, g) {
    if (!this.options.debug) { return; }

    g.lineWidth = 4;
    g.strokeStyle = g.fillStyle = '#882222';
    positions = this.getMatchingComponents();
    for (entityId in positions) {
      position = positions[entityId];
      sprite = this.world.get('Sprite', entityId);
      g.moveTo(position.x, position.y);
      g.arc(position.x, position.y, sprite.width / 2, 0, PI2);
      g.moveTo(position.x - 20, position.y);
      g.lineTo(position.x + 20, position.y);
      g.moveTo(position.x, position.y - 20);
      g.lineTo(position.x, position.y + 20);
    }
    g.stroke();

    g.strokeStyle = g.fillStyle = '#228822';
    this.drawDebugQuadtreeNode(g, this.quadtree);
    g.stroke();

    g.strokeStyle = g.fillStyle = '#ffff33';
    g.moveTo(-20, 0);
    g.lineTo(20, 0);
    g.moveTo(0, -20);
    g.lineTo(0, 20);
    g.moveTo(0, 0);
    g.rect(
      this.bounds.left,
      this.bounds.top,
      this.bounds.width,
      this.bounds.height
    );
    g.stroke();
  }

  drawDebugQuadtreeNode(g, root) {
    if (!root) { return; }

    g.strokeStyle = g.fillStyle = '#883388';
    g.moveTo(root.bounds.left, root.bounds.top);
    g.rect(root.bounds.left, root.bounds.top,
               root.bounds.width, root.bounds.height);

    g.strokeStyle = g.fillStyle = '#112222';
    root.objects.forEach(body => {
      g.moveTo(body.left, body.top);
      g.rect(body.left, body.top, body.width, body.height);
    });

    this.drawDebugQuadtreeNode(g, root.nodes[0]);
    this.drawDebugQuadtreeNode(g, root.nodes[1]);
    this.drawDebugQuadtreeNode(g, root.nodes[2]);
    this.drawDebugQuadtreeNode(g, root.nodes[3]);
  }
}

export const systems = { Position: PositionSystem };
