import * as Core from '../lib/core';

export class DebugCanvas extends Core.System {

  defaultOptions() {
    return {
      debugText: false
    };
  }

  initialize() {
    this.viewportSystem = this.world.getSystem(this.options.viewportSystemName);
    this.container = document.querySelector(this.options.container);

    this.debugT = document.createElement('textarea');
    document.body.appendChild(this.debugT);
    Object.assign(this.debugT.style, {
      width: '400px', height: '300px',
      display: 'block', position: 'absolute',
      zIndex: 1000, bottom: '0px', right: '0px',
      color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.7)',
    });

    this.canvas = document.createElement('canvas');
    this.container.appendChild(this.canvas);

    Object.assign(this.canvas.style, {
      zIndex: -1999,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    });

    this.ctx = this.canvas.getContext('2d');

    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;
    this.canvas.width = width;
    this.canvas.height = height;

    this.debug = true;
  }

  update() {
    this.debugT.style.display = (this.options.debugText)
      ? 'block'
      : 'none';
  }

  drawStart() {
    if (!this.world.debug) {
      if ('none' !== this.canvas.style.display) {
        this.canvas.style.display = 'none';
      }
      return;
    }

    if ('block' !== this.canvas.style.display) {
      this.canvas.style.display = 'block';
    }

    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;

    this.ctx.resetTransform();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.scale(this.viewportSystem.zoom, this.viewportSystem.zoom);
    this.ctx.translate(
      0 - this.viewportSystem.cameraX,
      0 - this.viewportSystem.cameraY
    );
  }

  draw(timeDelta) {
    if (!this.world.debug) { return; }

    for (const systemName in this.world.systems) {
      if ('drawDebug' in this.world.systems[systemName]) {
        this.world.systems[systemName].drawDebug(timeDelta, this.ctx);
      }
    }
  }

  drawEnd() {
    if (!this.world.debug) { return; }

    this.ctx.restore();
  }

}

export const systems = { DebugCanvas: DebugCanvas };
