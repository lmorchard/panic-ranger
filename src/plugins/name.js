import * as Core from '../lib/core';

export class Name extends Core.Component {
  static defaults() {
    return { name: 'unnamed' };
  }
  static findEntityByName(world, name) {
    const names = world.get('Name');
    for (const nid in names) {
      const nameComponent = names[nid];
      if (nameComponent.name === name) {
        return nid;
      }
    }
  }
}

Core.registerComponent('Name', Name);
