/* global PIXI */
import * as Core from '../lib/core';
import '../../node_modules/pixi.js/dist/pixi.js';
import '../../node_modules/pixi-filters/bin/filters.js';
import '../../node_modules/pixi-extra-filters/bin/pixi-extra-filters.js';

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
      gridSize: 500,
      gridColor: '#111',
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

    this.sprites = {};

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

    if (newX !== this.cursorPosition.x || newY !== this.cursorPosition.y) {
      this.cursorChanged = true;
      this.cursorPosition.x = newX;
      this.cursorPosition.y = newY;
    }
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
    const positions = this.world.get('Position');

    const toRemove = Object.keys(this.sprites).filter(key => !(key in positions));
    toRemove.forEach(entityId => {
      this.stage.removeChild(this.sprites[entityId]);
      delete this.sprites[entityId];
    });

    const toAdd = Object.keys(positions).filter(key => !(key in this.sprites));
    toAdd.forEach(entityId => {
      this.stage.addChild(this.sprites[entityId] = this.spawnSprite(entityId));
    });

    for (const entityId in this.sprites) {
      const position = positions[entityId];
      const sprite = this.sprites[entityId];
      sprite.position.x = position.x;
      sprite.position.y = position.y;
      sprite.rotation = position.rotation + (Math.PI / 2);
    }
  }

  draw(/*timeDelta*/) {
    if (!this.followEnabled) {
      this.cameraX = this.cameraY = 0;
    } else {
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

  spawnSprite(entityId) {
    let sprite = this.world.get('Sprite', entityId);
    if (!sprite) { sprite = CanvasSprite.defaults(); }

    let spriteFn = getSprite(sprite.name);
    if (!spriteFn) { spriteFn = getSprite('default'); }

    const ctx = new PIXI.Graphics();
    ctx.scale.x = ctx.scale.y = sprite.size / 100;
    ctx.lineStyle(this.lineWidth / (sprite.size / 100), 0xFFFFFF);
    spriteFn(ctx, sprite, entityId);
    return ctx;
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
      height: null
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

registerSprite('default', (ctx/*, sprite, entityId*/) => {
  ctx.arc(0, 0, 50, 0, PI2);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -50);
  ctx.moveTo(0, 0);
});

registerSprite('sun', (ctx/*, sprite, entityId*/) => {
  ctx.arc(0, 0, 50, 0, PI2, true);
});

registerSprite('enemyscout', (ctx/*, sprite, entityId*/) => {
  ctx.moveTo(0, -50);
  ctx.lineTo(-45, 50);
  ctx.lineTo(-12.5, 12.5);
  ctx.lineTo(0, 25);
  ctx.lineTo(12.5, 12.5);
  ctx.lineTo(45, 50);
  ctx.lineTo(0, -50);
  ctx.moveTo(0, -50);
});

registerSprite('hero', (ctx/*, sprite, entityId*/) => {
  ctx.moveTo(-12.5, -50);
  ctx.lineTo(-25, -50);
  ctx.lineTo(-50, 0);
  ctx.arc(0, 0, 50, Math.PI, 0, true);
  ctx.lineTo(25, -50);
  ctx.lineTo(12.5, -50);
  ctx.lineTo(25, 0);
  ctx.arc(0, 0, 25, 0, Math.PI, true);
  ctx.lineTo(-12.5, -50);
});

registerSprite('asteroid', (ctx/*, sprite, entityId*/) => {
  const NUM_POINTS = 10 + Math.floor(8 * Math.random());
  const MAX_RADIUS = 50;
  const MIN_RADIUS = 35;
  const ROTATION = PI2 / NUM_POINTS;

  let idx;
  const points = [];

  for (idx = 0; idx < NUM_POINTS; idx++) {
    const rot = idx * ROTATION;
    const dist = (Math.random() * (MAX_RADIUS - MIN_RADIUS)) + MIN_RADIUS;
    points.push([dist * Math.cos(rot), dist * Math.sin(rot)]);
  }

  ctx.moveTo(points[0][0], points[0][1]);
  for (idx = 1; idx < points.length; idx++) {
    ctx.lineTo(points[idx][0], points[idx][1]);
  }
  ctx.lineTo(points[0][0], points[0][1]);
});
