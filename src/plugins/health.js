import * as Core from '../lib/core';

export class Health extends Core.Component {
  static defaults() {
    return { max: 1000, current: null, show_bar: true };
  }
  static create(attrs) {
    const c = super.create(attrs);
    c.current = c.max;
    return c;
  }
}

Core.registerComponent('Health', Health);
