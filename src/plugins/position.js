import { Component, System, registerComponent, registerSystem } from '../lib/core';
import QuadTree from '../lib/QuadTree';

export class Position extends Component {
  static defaults() {
    return { x: 0, y: 0, rotation: 0 };
  }
}

registerComponent('Position', Position);

let entityId, sprite, position, positions;

export class PositionSystem extends System {

  defaultOptions() {
    return {
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

  draw(/* timeDelta */) {
    const g = this.getDebugGraphics();
    if (!g) { return; }

    g.lineStyle(4, 0x882222);
    positions = this.getMatchingComponents();
    for (entityId in positions) {
      position = positions[entityId];
      sprite = this.world.get('Sprite', entityId);
      g.drawCircle(position.x, position.y, sprite.width / 2);
      g.moveTo(position.x - 20, position.y);
      g.lineTo(position.x + 20, position.y);
      g.moveTo(position.x, position.y - 20);
      g.lineTo(position.x, position.y + 20);
    }

    g.lineStyle(4, 0x228822);
    this.drawDebugQuadtreeNode(g, this.quadtree);

    g.lineStyle(4, 0xffff33);
    g.moveTo(-20, 0);
    g.lineTo(20, 0);
    g.moveTo(0, -20);
    g.lineTo(0, 20);
    g.moveTo(0, 0);
    g.drawRect(
      this.bounds.left,
      this.bounds.top,
      this.bounds.width,
      this.bounds.height
    );
  }

  drawDebugQuadtreeNode(g, root) {
    if (!root) { return; }

    g.lineStyle(4, 0x883388);
    g.drawRect(root.bounds.left, root.bounds.top,
               root.bounds.width, root.bounds.height);

    g.lineStyle(4, 0x112222);
    root.objects.forEach(body =>
      g.drawRect(body.left, body.top, body.width, body.height));

    this.drawDebugQuadtreeNode(g, root.nodes[0]);
    this.drawDebugQuadtreeNode(g, root.nodes[1]);
    this.drawDebugQuadtreeNode(g, root.nodes[2]);
    this.drawDebugQuadtreeNode(g, root.nodes[3]);
  }
}

registerSystem('Position', PositionSystem);
