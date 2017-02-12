import * as Core from '../lib/core';

export class Pathfinder extends Core.Component {
  static defaults() {
    return {
      width: 5000,
      height: 5000
    };
  }
}

Core.registerComponent('Pathfinder', Pathfinder);

export class SpaceTree {

  constructor(quadtree, x, y, width, height, level, maxLevel=4) {
    const bounds = quadtree.bounds;

    this.x = x || bounds.x;
    this.y = y || bounds.y;
    this.width = width || bounds.width;
    this.height = height || bounds.height;
    this.right = this.x + this.width;
    this.bottom = this.y + this.height;
    this.level = level || 0;
    this.empty = true;
    this.full = false;
    this.children = [];

    let ct = 0;

    quadtree.iterate({
      x: this.x, y: this.y, right: this.right, bottom: this.bottom
    }, (obj) => {

      const dx = Math.abs(obj.x - this.x) * 2;
      const dy = Math.abs(obj.y - this.y) * 2;
      const dwidth = (obj.right - obj.x) + this.width;
      const dheight = (obj.bottom - obj.y) + this.height;

      if (dx < dwidth && dy < dheight) {
        ct++;
        if (obj.x <= this.x && obj.y <= this.y &&
            obj.right >= this.right && obj.bottom >= this.bottom) {
          this.full = true;
        }
      }
    });

    if (ct === 0) {
      this.empty = true;
      return;
    }

    this.empty = false;
    if (!this.full && this.level < maxLevel) {
      this.split(quadtree);
    }

  }

  split(quadtree) {
    const splitWidth = this.width / 2;
    const splitHeight = this.height / 2;

    this.children[0] = new SpaceTree(quadtree,
        this.x, this.y,
        splitWidth, splitHeight, this.level + 1);

    this.children[1] = new SpaceTree(quadtree,
        this.x + splitWidth, this.y,
        splitWidth, splitHeight, this.level + 1);

    this.children[2] = new SpaceTree(quadtree,
        this.x, this.y + splitHeight,
        splitWidth, splitHeight, this.level + 1);

    this.children[3] = new SpaceTree(quadtree,
        this.x + splitWidth, this.y + splitHeight,
        splitWidth, splitHeight, this.level + 1);
  }

}

export class PathfindingSystem extends Core.System {

  matchComponent() { return 'Pathfinder'; }

  initialize() {
  }

  update(/*timeDelta*/) {
    /*
    let collisionSystem = this.world.getSystem('Collision');
    let quadtree = collisionSystem.quadtree;
    */
  }

  draw(timeDelta) {
    if (!this.debug) { return; }

    const vpSystem = this.world.getSystem('ViewportCanvas');

    const ctx = vpSystem.ctx;
    ctx.save();

    vpSystem.centerAndZoom(timeDelta);
    vpSystem.followEntity(timeDelta);

    // draw

    ctx.restore();
  }

}

Core.registerSystem('Pathfinding', PathfindingSystem);
