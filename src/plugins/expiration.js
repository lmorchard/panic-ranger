import * as Core from '../lib/core';

export class Expiration extends Core.Component {
  static defaults() {
    return { ttl: 0, age: 0 };
  }
}
Core.registerComponent('Expiration', Expiration);

export class ExpirationSystem extends Core.System {
  matchComponent() {
    return 'Expiration';
  }
  updateComponent(timeDelta, entityId, expiration) {
    expiration.age += timeDelta;
    if (expiration.age >= expiration.ttl) {
      this.world.destroy(entityId);
    }
  }
}
Core.registerSystem('Expiration', ExpirationSystem);
