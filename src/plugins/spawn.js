import { Component, System, registerComponent, registerSystem } from '../lib/core';

export const MSG_SPAWN = 'spawnSpawn';
export const MSG_DESTROY = 'spawnDestroy';
export const MSG_DESPAWN = 'spawnDespawn';
export const MSG_CAPTURE_CAMERA = 'spawnCaptureCamera';

let spawn;

export class Spawn extends Component {
  static defaults() {
    return {
      ttl: null,
      age: 0,
      destroy: false,
      tombstone: null
    };
  }
}

registerComponent('Spawn', Spawn);

export class SpawnSystem extends System {
  defaultOptions() {
    return {

    };
  }

  initialize() {
    this.world.subscribe(MSG_DESTROY, (msg, entityId) => {
      spawn = this.world.get('Spawn', entityId);
      if (spawn) { spawn.destroy = true; }
    });
  }

  matchComponent() { return 'Spawn'; }

  updateComponent(timeDelta, entityId, spawn) {
    const name = this.world.get('Name', entityId);
    if (!spawn.spawned) {
      spawn.spawned = true;
      this.world.publish(MSG_SPAWN, entityId);
      if (spawn.captureCamera) {
        this.world.publish(MSG_CAPTURE_CAMERA, entityId);
      }
    }
    if (spawn.ttl !== null) {
      spawn.age += timeDelta;
      if (spawn.age >= spawn.ttl) {
        spawn.destroy = true;
      }
    }
    if (spawn.destroy) {
      console.log('destroy', name.name);
      if (spawn.tombstone !== null) {
        const toInsert = (typeof spawn.tombstone === 'function')
          ? spawn.tombstone(spawn, entityId)
          : spawn.tombstone;
        console.log('tombstone', JSON.stringify(toInsert));
        this.world.insert(toInsert);
      }
      this.world.publish(MSG_DESPAWN, entityId);
      this.world.destroy(entityId);
    }
  }
}

registerSystem('Spawn', SpawnSystem);
