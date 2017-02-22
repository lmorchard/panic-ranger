/* global PIXI */
import * as Core from '../lib/core';

const PI2 = Math.PI * 2;

// See also: http://phrogz.net/JS/wheeldelta.html
const wheelDistance = function(evt){
  if (!evt) evt = event;
  const w=evt.wheelDelta, d=evt.detail;
  if (d){
    if (w) return w/d/40*d>0?1:-1; // Opera
    else return -d/3;              // Firefox;         TODO: do not /3 for OS X
  } else return w/120;             // IE/Safari/Chrome TODO: /3 for Chrome OS X
};

export class ViewportPixi extends Core.System {

  defaultOptions() {
    return {
      lineWidth: 2.5,
      zoom: 1.0,
      zoomMin: 0.1,
      zoomMax: 10.0,
      zoomWheelFactor: 0.05,
      gridEnabled: true,
      gridSize: 250,
      gridColor: 0x222222,
      followEnabled: true,
      followName: null,
      followEntityId: null
    };
  }

  initialize() {
    this.container = document.querySelector(this.options.container);
    this.renderer = PIXI.autoDetectRenderer(
      this.container.offsetWidth,
      this.container.offsetHeight,
      { antialias: true }
    );
    this.renderer.autoResize = true;
    this.canvas = this.renderer.view;
    this.container.appendChild(this.canvas);
    this.stage = new PIXI.Container();

    //this.filter = new PIXI.filters.FXAAFilter();
    //this.filter.blur = 1;
    //this.stage.filters = [ this.filter ];

    this.backdrop = new PIXI.Graphics();
    this.stage.addChild(this.backdrop);

    this.graphics = {};

    const events = {
      'resize': (ev) => { this.updateMetrics(ev); },
      'orientationchange': (ev) => { this.updateMetrics(ev); },
      'mousedown': (ev) => { this.onMouseDown(ev); },
      'mousemove': (ev) => { this.onMouseMove(ev); },
      'mouseup': (ev) => { this.onMouseUp(ev); }
    };

    for (const name in events) {
      this.canvas.addEventListener(name, events[name], false);
    }

    // See also: http://phrogz.net/JS/wheeldelta.html
    const boundOnMouseWheel = (ev) => this.onMouseWheel(ev);
    if (window.addEventListener){
      window.addEventListener('mousewheel', boundOnMouseWheel, false); // Chrome/Safari/Opera
      window.addEventListener('DOMMouseScroll', boundOnMouseWheel, false); // Firefox
    } else if (window.attachEvent){
      window.attachEvent('onmousewheel', boundOnMouseWheel); // IE
    }

    this.followEnabled = this.options.followEnabled;
    this.zoom = this.options.zoom;
    this.followEntityId = this.options.followEntityId;
    this.gridEnabled = this.options.gridEnabled;
    this.lineWidth = this.options.lineWidth;

    this.cursorRawX = 0;
    this.cursorRawY = 0;

    this.cursorChanged = false;
    this.cursorPosition = { x: 0, y: 0 };

    this.cameraX = 0;
    this.cameraY = 0;

    this.debugDummySprite = { size: 100 };

    this.updateMetrics();
  }

  onMouseWheel(ev) {
    this.zoom += wheelDistance(ev) * this.options.zoomWheelFactor;
    if (this.zoom < this.options.zoomMin) {
      this.zoom = this.options.zoomMin;
    }
    if (this.zoom > this.options.zoomMax) {
      this.zoom = this.options.zoomMax;
    }
  }

  // TODO: Use a symbol for 'mouse{Down,Move,Up}' message?

  onMouseDown(ev) {
    this.setCursor(ev.clientX, ev.clientY);
    this.world.publish('mouseDown', this.cursorPosition);
  }

  onMouseMove(ev) {
    this.setCursor(ev.clientX, ev.clientY);
    this.world.publish('mouseMove', this.cursorPosition);
  }

  onMouseUp(ev) {
    this.setCursor(ev.clientX, ev.clientY);
    this.world.publish('mouseUp', this.cursorPosition);
  }

  setCursor(x, y) {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;

    this.cursorRawX = x;
    this.cursorRawY = y;

    const newX = ((x - (width / 2)) / this.zoom) + this.cameraX;
    const newY = ((y - (height / 2)) / this.zoom) + this.cameraY;

    this.cursorChanged = false;
    if (newX !== this.cursorPosition.x || newY !== this.cursorPosition.y) {
      this.cursorChanged = true;
      this.cursorPosition.x = newX;
      this.cursorPosition.y = newY;
    }

    return this.cursorPosition;
  }

  updateMetrics() {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;

    this.visibleWidth = width / this.zoom;
    this.visibleHeight = height / this.zoom;

    this.visibleLeft = (0 - this.visibleWidth / 2) + this.cameraX;
    this.visibleTop = (0 - this.visibleHeight / 2) + this.cameraY;
    this.visibleRight = this.visibleLeft + this.visibleWidth;
    this.visibleBottom = this.visibleTop + this.visibleHeight;
  }

  update(/*timeDelta*/) {
    this.updateMetrics();

    this.setCursor(this.cursorRawX, this.cursorRawY);
    // FIXME: Should be able to skip doing this unless
    // this.cursorChanged === true, but for some reason that's not working
    this.world.publish('mouseMove', this.cursorPosition);

    const sprites = this.world.get('Sprite');

    const toRemove = Object.keys(this.graphics).filter(key => !(key in sprites));
    toRemove.forEach(entityId => {
      this.stage.removeChild(this.graphics[entityId]);
      delete this.graphics[entityId];
    });

    const toAdd = Object.keys(sprites).filter(key => !(key in this.graphics));
    toAdd.forEach(entityId => {
      this.stage.addChild(this.graphics[entityId] = new PIXI.Graphics());
    });
  }

  draw(timeDelta) {
    this.followEntity();
    this.drawBackdrop(timeDelta);

    for (const entityId in this.graphics) {
      this.drawSprite(this.graphics[entityId], entityId, timeDelta);
    }

    this.stage.setTransform(
      (this.container.offsetWidth / 2) - (this.cameraX * this.zoom),
      (this.container.offsetHeight / 2) - (this.cameraY * this.zoom),
      this.zoom,
      this.zoom
    );

    this.renderer.resize(
      this.container.offsetWidth,
      this.container.offsetHeight
    );

    this.renderer.render(this.stage);
  }

  drawSprite(ctx, entityId, timeDelta) {
    const sprite = this.world.get('Sprite', entityId);
    const position = this.world.get('Position', entityId);

    let spriteFn = getSprite(sprite.name);
    if (!spriteFn) { spriteFn = getSprite('default'); }

    ctx.position.x = Math.floor(position.x);
    ctx.position.y = Math.floor(position.y);
    ctx.rotation = position.rotation + (Math.PI / 2);
    ctx.scale.x = ctx.scale.y = sprite.size / 100;
    ctx.lineStyle(this.lineWidth / (sprite.size / 100), 0xFFFFFF);
    spriteFn(ctx, sprite, entityId, timeDelta);

    sprite.drawn = true;
    return ctx;
  }

  followEntity() {
    if (!this.followEnabled) {
      this.cameraX = this.cameraY = 0;
      return;
    }
    if (this.options.followName && !this.followEntityId) {
      // Look up named entity, if necessary.
      this.followEntityId = Core.getComponent('Name')
        .findEntityByName(this.world, this.options.followName);
    }
    if (this.followEntityId) {
      // Adjust the viewport center offset to the entity position
      const position = this.world.get('Position', this.followEntityId);
      if (position) {
        this.cameraX = position.x;
        this.cameraY = position.y;
        this.setCursor(this.cursorRawX, this.cursorRawY);
      }
    }
  }

  drawBackdrop(/* timeDelta */) {
    const ctx = this.backdrop;

    if (!this.gridEnabled) {
      ctx.visible = false;
      return;
    }

    const gridSize = this.options.gridSize;
    const gridOffsetX = this.visibleLeft % gridSize;
    const gridOffsetY = this.visibleTop % gridSize;

    ctx.visible = true;
    ctx.clear();
    ctx.lineStyle(1, this.options.gridColor);
    ctx.position.x = this.visibleLeft;
    ctx.position.y = this.visibleTop;

    for (let x = -gridOffsetX; x < this.visibleWidth; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.visibleHeight + gridSize);
    }

    for (let y = -gridOffsetY; y < this.visibleHeight; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.visibleWidth + gridSize, y);
    }
  }

}

Core.registerSystem('ViewportPixi', ViewportPixi);

export class CanvasSprite extends Core.Component {
  static defaults() {
    return {
      name: null,
      color: '#fff',
      size: 100,
      width: null,
      height: null,
      drawn: false
    };
  }
  static create(attrs) {
    const c = super.create(attrs);
    if (!c.width) { c.width = c.size; }
    if (!c.height) { c.height = c.size; }
    return c;
  }
}

Core.registerComponent('Sprite', CanvasSprite);

const spriteRegistry = {};
export function registerSprite(name, sprite) {
  spriteRegistry[name] = sprite;
}
export function getSprite(name) {
  return spriteRegistry[name];
}

registerSprite('default', (ctx, sprite/*, entityId*/) => {
  if (sprite.drawn) { return; }

  ctx.arc(0, 0, 50, 0, PI2);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -50);
  ctx.moveTo(0, 0);
});

registerSprite('sun', (ctx, sprite/*, entityId*/) => {
  if (sprite.drawn) { return; }

  ctx.arc(0, 0, 50, 0, PI2, true);
});

registerSprite('enemyscout', (ctx, sprite/*, entityId*/) => {
  if (sprite.drawn) { return; }

  ctx.moveTo(0, -50);
  ctx.lineTo(-45, 50);
  ctx.lineTo(-12.5, 12.5);
  ctx.lineTo(0, 25);
  ctx.lineTo(12.5, 12.5);
  ctx.lineTo(45, 50);
  ctx.lineTo(0, -50);
  ctx.moveTo(0, -50);
});

registerSprite('enemywing', (g, sprite/*, entityId*/) => {
  if (sprite.drawn) { return; }

  g.lineColor = 0x228822;

  g.moveTo(-50, 0);
  g.lineTo(-37.5, -37.5);
  g.lineTo(0, 50);
  g.lineTo(37.5, -37.5);
  g.lineTo(50, 0);
  g.lineTo(37.5, 50);
  g.lineTo(25, 50);
  g.lineTo(0, 0);
  g.lineTo(-25, 50);
  g.lineTo(-37.5, 50);
  g.lineTo(-50, 0);
});

registerSprite('hero', (g, sprite/*, entityId*/) => {
  if (sprite.drawn) { return; }

  g.moveTo(-50, 0);
  g.lineTo(-37.5, -37.5);
  g.lineTo(0, -50);
  g.lineTo(37.5, -37.5);
  g.lineTo(50, 0);
  g.lineTo(37.5, 50);
  g.lineTo(25, 50);
  g.lineTo(12.5, 12.5);
  g.lineTo(5, 25);
  g.lineTo(-5, 25);
  g.lineTo(-12.5, 12.5);
  g.lineTo(-25, 50);
  g.lineTo(-37.5, 50);
  g.lineTo(-50, 0);
});

registerSprite('asteroid', (ctx, sprite/*, entityId*/) => {
  if (sprite.drawn) { return; }

  const NUM_POINTS = 10 + Math.floor(8 * Math.random());
  const MAX_RADIUS = 50;
  const MIN_RADIUS = 35;
  const ROTATION = PI2 / NUM_POINTS;

  let idx;
  const points = [];

  for (idx = 0; idx < NUM_POINTS; idx++) {
    const rot = idx * ROTATION;
    const dist = (Math.random() * (MAX_RADIUS - MIN_RADIUS)) + MIN_RADIUS;
    points.push(dist * Math.cos(rot));
    points.push(dist * Math.sin(rot));
  }
  points.push(points[0]);
  points.push(points[1]);

  ctx.drawPolygon(points);
});

registerSprite('mine', (g, sprite/*, entityId*/) => {
  if (sprite.drawn && Math.random() > 0.1) { return; }

  if (!sprite.drawn) {
    let NUM_POINTS = 10 + Math.floor(10 * Math.random());
    if (NUM_POINTS % 2 !== 0) { NUM_POINTS++; }

    const MAX_RADIUS = 60;
    const MIN_RADIUS = 10;
    sprite.legs = [];
    let even = false;
    for (let idx = 0; idx < NUM_POINTS; idx++) {
      const dist = even ? 10 : (Math.random() * (MAX_RADIUS - MIN_RADIUS)) + MIN_RADIUS;
      sprite.legs.push(dist);
      even = !even;
    }
  }

  const points = [];
  const ROTATION = PI2 / sprite.legs.length;
  sprite.legs.forEach((dist, idx) => {
    const shakeDist = dist * (0.9 + 0.5 * Math.random());
    const rot = idx * ROTATION;
    points.push(shakeDist * Math.cos(rot));
    points.push(shakeDist * Math.sin(rot));
  });
  points.push(points[0]);
  points.push(points[1]);

  g.clear();
  g.lineStyle(2.5 / (sprite.size / 100), 0xFF2222);
  g.drawPolygon(points);
});
