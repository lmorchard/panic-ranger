import * as Core from '../lib/core';

export class Name extends Core.Component {
  static defaults() {
    return {
      name: 'unnamed',
      tags: []
    };
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
  static findEntitiesByTags(world, tags) {
    const names = world.get('Name');
    const out = {};
    for (const tag of tags) {
      for (const nid in names) {
        const nameComponent = names[nid];
        if (nameComponent.tags.includes(tag)) {
          out[nid] = nameComponent;
        }
      }
    }
    return out;
  }
}

Core.registerComponent('Name', Name);
