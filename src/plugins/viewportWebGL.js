import * as Core from '../lib/core';

const PI2 = Math.PI * 2;

// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
const TYPE_SIZES = {
  0x1406: 1, // FLOAT
  0x8B50: 2, // FLOAT_VEC2
  0x8B51: 3, // FLOAT_VEC3
  0x8B52: 4  // FLOAT_VEC4
};

let entityId, position, sprites, sprite, sceneSprite;

// See also: http://phrogz.net/JS/wheeldelta.html
const wheelDistance = function(evt){
  if (!evt) evt = event;
  const w=evt.wheelDelta, d=evt.detail;
  if (d){
    if (w) return w/d/40*d>0?1:-1; // Opera
    else return -d/3;              // Firefox;         TODO: do not /3 for OS X
  } else return w/120;             // IE/Safari/Chrome TODO: /3 for Chrome OS X
};

export class ViewportWebGL extends Core.System {

  defaultOptions() {
    return {
      lineWidth: 2,
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
    this.canvas = document.createElement('canvas');
    this.container.appendChild(this.canvas);

    this.initWebGL(this.canvas);

    this.scene = {};

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
    this.setCursor(ev.clientX, ev.clientY, true);
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

  update(timeDelta) {
    this.updateMetrics();

    this.setCursor(this.cursorRawX, this.cursorRawY);
    // FIXME: Should be able to skip doing this unless
    // this.cursorChanged === true, but for some reason that's not working
    this.world.publish('mouseMove', this.cursorPosition);

    sprites = this.world.get('Sprite') || {};

    // Delete any stage items not found in sprites
    for (entityId in this.scene) {
      if (!(entityId in sprites)) {
        delete this.scene[entityId];
      }
    }

    // Create items for any sprites not found in stage
    for (entityId in sprites) {
      sprite = sprites[entityId];
      position = this.world.get('Position', entityId);

      if (!(entityId in this.scene)) {
        this.scene[entityId] = {
          position: [0.0, 0.0],
          shape: getSprite(sprite.name)(sprite, entityId, timeDelta)
        };
      }
      sceneSprite = this.scene[entityId];

      sprite.visible = (
        (position.right > this.visibleLeft) &&
        (position.left < this.visibleRight) &&
        (position.bottom > this.visibleTop) &&
        (position.top < this.visibleBottom)
      );

      sceneSprite.visible = sprite.visible;
      sceneSprite.position[0] = position.x;
      sceneSprite.position[1] = position.y;
      sceneSprite.rotation = position.rotation;
      sceneSprite.scale = sprite.size;
      sceneSprite.color = [
        // TODO: this math is terrible
        (sprite.color / 256 / 256) % 256 / 256,
        (sprite.color / 256) % 256 / 256,
        sprite.color % 256 / 256,
        1.0
      ];
    }
  }

  draw() {
    this.followEntity();

    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;

    // gl.uniform1f(uniforms.uTime, currDrawTime);
    this.setUniforms({
      uLineWidth: [0.001 * this.lineWidth],
      uCameraZoom: [this.zoom],
      uCameraOrigin: [this.cameraX, this.cameraY],
      uViewportSize: [this.canvas.clientWidth, this.canvas.clientHeight]
    });

    // this.drawBackdrop(timeDelta);

    // Re-allocate larger buffer if current is too small for the scene.
    const bufferSize = this.calculateBufferSizeForScene();
    if (bufferSize > this.buffer.length) {
      this.buffer = new Float32Array(Math.max(bufferSize * 1.5, this.buffer.length * 2));
    }

    const vertexCount = this.fillBufferFromScene();
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.buffer, this.gl.STATIC_DRAW);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(0, 0, 0, 0.5);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, vertexCount);
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

  /*
  drawBackdrop() {
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
    ctx.lineStyle(5, this.options.gridColor);
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
  */

  initWebGL(canvas) {
    const gl = this.gl = canvas.getContext('webgl', {
      antialias: true,
      preserveDrawingBuffer: true,
      premultipliedAlpha: true
    });

    const program = this.createProgram(
      this.createShader(gl.VERTEX_SHADER, SHADER_VERTEX),
      this.createShader(gl.FRAGMENT_SHADER, SHADER_FRAGMENT)
    );
    gl.useProgram(program);

    // Set up for data buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());

    // First pass through attributes to count total vertex size and index by name
    const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    const attribs = {};
    let vertexSize = 0;
    for (let i = 0; i < numAttribs; i++) {
      const info = gl.getActiveAttrib(program, i);
      const size = TYPE_SIZES[info.type];
      vertexSize += size;
      attribs[info.name] = i;
    }

    // Second pass through attributes to set up attribute pointers into the buffer
    let pos = 0;
    for (let i = 0; i < numAttribs; i++) {
      const info = gl.getActiveAttrib(program, i);
      const size = TYPE_SIZES[info.type];
      gl.vertexAttribPointer(i, size, gl.FLOAT, false, vertexSize * 4, pos * 4);
      gl.enableVertexAttribArray(i);
      pos += size;
    }

    // Index uniform locations by name
    const uniforms = {};
    const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < numUniforms; i++) {
      const info = gl.getActiveUniform(program, i);
      uniforms[info.name] = gl.getUniformLocation(program, info.name);
    }

    const buffer = new Float32Array(200000);

    Object.assign(this, { gl, uniforms, attribs, vertexSize, buffer });
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) { return shader; }

    // console.log('shader', type, 'failed to compile', this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
  }

  createProgram(vertexShader, fragmentShader) {
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (success) { return program; }

    // console.log(this.gl.getProgramInfoLog(program));
    this.gl.deleteProgram(program);
  }

  calculateBufferSizeForScene() {
    return Object.values(this.scene).reduce((acc, item) =>
      acc + (item.shape.length - 0.5) * this.vertexSize * 4, 0);
  }

  fillBufferFromScene() {
    let vertexCount = 0;
    let bufferPos = 0;
    let visible, shape, position, scale, rotation,
        deltaPosition, deltaScale, deltaRotation, color;

    const sceneKeys = Object.keys(this.scene);
    sceneKeys.sort();
    const sceneItems = sceneKeys.map(key => this.scene[key]);

    const bufferVertex = (shapeIdx, lineIdx) => {
      vertexCount++;
      this.buffer[bufferPos++] = lineIdx;
      this.buffer[bufferPos++] = shape[shapeIdx - 1][0];
      this.buffer[bufferPos++] = shape[shapeIdx - 1][1];
      this.buffer[bufferPos++] = shape[shapeIdx][0];
      this.buffer[bufferPos++] = shape[shapeIdx][1];
      this.buffer[bufferPos++] = position[0];
      this.buffer[bufferPos++] = position[1];
      this.buffer[bufferPos++] = scale;
      this.buffer[bufferPos++] = rotation;
      this.buffer[bufferPos++] = deltaPosition[0];
      this.buffer[bufferPos++] = deltaPosition[1];
      this.buffer[bufferPos++] = deltaScale;
      this.buffer[bufferPos++] = deltaRotation;
      this.buffer[bufferPos++] = color[0];
      this.buffer[bufferPos++] = color[1];
      this.buffer[bufferPos++] = color[2];
      this.buffer[bufferPos++] = color[3];
    };

    for (let spriteIdx = 0; spriteIdx < sceneItems.length; spriteIdx++) {
      ({
        visible, shape, position=[0.0, 0.0], scale=0, rotation=0,
        deltaPosition=[0.0, 0.0], deltaScale=0.0, deltaRotation=0.0,
        color=[1, 1, 1, 1]
      } = sceneItems[spriteIdx]);
      if (!visible) { continue; }
      bufferVertex(1, 0);
      for (let shapeIdx = 1; shapeIdx < shape.length; shapeIdx += 1) {
        bufferVertex(shapeIdx, 0);
        bufferVertex(shapeIdx, 1);
        bufferVertex(shapeIdx, 2);
        bufferVertex(shapeIdx, 3);
      }
      bufferVertex(shape.length - 1, 3);
    }

    return vertexCount;
  }

  setUniforms(data) {
    Object.keys(data).forEach(key =>
      this.gl[`uniform${data[key].length}f`]
        .call(this.gl, this.uniforms[key], ...data[key]));
  }
}

Core.registerSystem('ViewportWebGL', ViewportWebGL);

const SHADER_VERTEX = `
// see also: http://m1el.github.io/woscope-how/
precision mediump float;
#define EPS 1E-6
#define PI 3.141592653589793
#define PI_2 6.283185307179586
#define PI_H 1.5707963267948966
#define PI_Q 0.7853981633974483

uniform float uTime;
uniform float uLineWidth;
uniform float uCameraZoom;
uniform float uCameraRotation;
uniform vec2 uCameraOrigin;
uniform vec2 uViewportSize;

attribute float aIdx;
attribute vec4 aLine;
attribute vec4 aTransform;
attribute vec4 aDeltaTransform;
attribute vec4 aColor;

varying vec4 uvl;
varying vec4 vColor;
varying float vLen;

void main () {
  float c, s;

  mat3 mViewportToClipSpace = mat3(
    2.0 / uViewportSize.x, 0, 0,
    0, -2.0 / uViewportSize.y, 0,
    0, 0, 0
  );

  c = cos(uCameraRotation);
  s = sin(uCameraRotation);
  mat3 mCameraRotation = mat3(
    c, -s, 0.0,
    s, c, 0.0,
    0.0, 0.0, 1.0
  );

  mat3 mCameraOrigin = mat3(
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    -uCameraOrigin.x, -uCameraOrigin.y, 1.0
  );

  mat3 mCameraZoom = mat3(
    uCameraZoom, 0.0, 0.0,
    0.0, uCameraZoom, 0.0,
    0.0, 0.0, 1.0
  );

  c = cos(-aTransform.w + PI_H + (aDeltaTransform.w * uTime));
  s = sin(-aTransform.w + PI_H + (aDeltaTransform.w * uTime));
  mat3 mRotation = mat3(
    c, -s, 0.0,
    s, c, 0.0,
    0.0, 0.0, 1.0
  );

  mat3 mPosition = mat3(
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    aTransform.x + (aDeltaTransform.x * uTime), aTransform.y + (aDeltaTransform.y * uTime), 1.0
  );

  mat3 mScale = mat3(
    aTransform.z + (aDeltaTransform.z * uTime), 0.0, 0.0,
    0.0, aTransform.z + (aDeltaTransform.z * uTime), 0.0,
    0.0, 0.0, 1.0
  );

  // TODO: Move some of these matrices into JS?
  mat3 mAll = mViewportToClipSpace
    * mCameraZoom * mCameraRotation * mCameraOrigin
    * mPosition * mScale * mRotation;

  vec2 tStart = (mAll * vec3(aLine.xy, 1)).xy;
  vec2 tEnd = (mAll * vec3(aLine.zw, 1)).xy;

  float tang;
  vec2 current;
  float idx = aIdx;
  if (idx >= 2.0) {
    current = tEnd;
    tang = 1.0;
  } else {
    current = tStart;
    tang = -1.0;
  }

  float side = (mod(idx, 2.0)-0.5)*2.0;
  vec2 dir = tEnd-tStart;

  vColor = aColor;

  uvl.xy = vec2(tang, side);
  uvl.w = floor(aIdx / 4.0 + 0.5);
  uvl.z = length(dir);
  if (uvl.z > EPS) {
    dir = dir / uvl.z;
  } else {
    // If the segment is too short draw a square;
    dir = vec2(1.0, 0.0);
  }
  vec2 norm = vec2(-dir.y, dir.x);
  gl_Position = vec4((current+(tang*dir+norm*side)*uLineWidth),0.0,1.0);
}
`;

const SHADER_FRAGMENT = `
precision mediump float;
varying vec4 vColor;

void main (void)
{
    gl_FragColor = vColor;
}
`;

export class WebGLSprite extends Core.Component {
  static defaults() {
    return {
      name: null,
      color: 0xffffff,
      size: 100,
      width: null,
      height: null,
      drawn: false,
      visible: false
    };
  }
  static create(attrs) {
    const c = super.create(attrs);
    if (!c.width) { c.width = c.size; }
    if (!c.height) { c.height = c.size; }
    return c;
  }
}

Core.registerComponent('Sprite', WebGLSprite);

const spriteRegistry = {};
export function registerSprite(name, sprite) {
  spriteRegistry[name] = sprite;
}
export function getSprite(name) {
  return name in spriteRegistry ? spriteRegistry[name] : spriteRegistry.default;
}

const defaultShape = [ [-0.5, 0], [0.5, 0], [0, 0], [0, -0.5], [0, 0.5], [0, 0] ];
for (let idx = 0; idx < 8; idx++) {
  const rot = idx * (PI2 / 8);
  defaultShape.push([ 0.5 * Math.cos(rot), 0.5 * Math.sin(rot) ]);
}
defaultShape.push([ 0.5, 0 ]);

registerSprite('default', (/*sprite, entityId*/) => {
  return defaultShape;
});

const heroShape = [
  [ 0.0,     0.5],
  [ 0.125,   0.4167],
  [ 0.25,    0.0],
  [ 0.375,  -0.1667],
  [ 0.25,   -0.5],
  [ 0.125,  -0.5],
  [ 0.0625, -0.25],
  [-0.0625, -0.25],
  [-0.125,  -0.5],
  [-0.25,   -0.5],
  [-0.375,  -0.1667],
  [-0.25,    0.0],
  [-0.125,   0.4167],
  [ 0.0,     0.5],
];
registerSprite('hero', () => {
  return heroShape;
});

const repulsorShape = [
 [-0.50,    0.0],
 [-0.375,  -0.50],
 [-0.25,   -0.50],
 [-0.0625,  0.25],
 [ 0.0625,  0.25],
 [ 0.25,   -0.50],
 [ 0.375,  -0.50],
 [ 0.50,    0.0],
 [ 0.375,   0.50],
 [ 0.25,    0.50],
 [ 0.0625, -0.25],
 [-0.0625, -0.25],
 [-0.25,    0.50],
 [-0.375,   0.50],
 [-0.50,    0.0]
];

registerSprite('repulsor', (/*sprite, entityId, timeDelta, world*/) => {
  return repulsorShape;
});

registerSprite('asteroid', (sprite) => {
  let idx;

  if (!sprite.points) {
    const NUM_POINTS = 7 + Math.floor(8 * Math.random());
    const MAX_RADIUS = 0.50;
    const MIN_RADIUS = 0.35;
    const ROTATION = PI2 / NUM_POINTS;

    sprite.points = [];
    for (idx = 0; idx < NUM_POINTS; idx++) {
      const rot = idx * ROTATION;
      const dist = (Math.random() * (MAX_RADIUS - MIN_RADIUS)) + MIN_RADIUS;
      sprite.points.push([dist * Math.cos(rot), dist * Math.sin(rot)]);
    }

    sprite.points.push(sprite.points[0]);
  }

  return sprite.points;
});

registerSprite('mine', (sprite/*, entityId, timeDelta, world*/) => {
  if (!sprite.drawn) {
    let NUM_POINTS = 10 + Math.floor(10 * Math.random());
    if (NUM_POINTS % 2 !== 0) { NUM_POINTS++; }
    const ROTATION = PI2 / NUM_POINTS;
    const MAX_RADIUS = 0.6;
    const MIN_RADIUS = 0.1;

    let even = false;

    sprite.legs = [];
    for (let idx = 0; idx < NUM_POINTS; idx++) {
      const dist = even ? 0.1 : (Math.random() * (MAX_RADIUS - MIN_RADIUS)) + MIN_RADIUS;
      const rot = idx * ROTATION;
      sprite.legs.push([ dist * Math.cos(rot), dist * Math.sin(rot) ]);
      even = !even;
    }
    sprite.legs.push([ sprite.legs[0][0], sprite.legs[0][1] ]);
    sprite.shape = sprite.legs;
    sprite.drawn = true;
  }

  return sprite.shape;

  /*
  if (sprite.drawn && Math.random() < 0.15) {
    sprite.shape = sprite.legs.map(p => [
      p[0] * (0.9 + 0.5 * Math.random()),
      p[1] * (0.9 + 0.5 * Math.random())
    ]);
  }
  return sprite.shape;
  */
});
