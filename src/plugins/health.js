import { Component, System } from '../lib/core';
import { MSG_DESTROY } from './spawn';

export const MSG_DAMAGE = 'healthDamage';
export const MSG_HEAL = 'healthHeal';

let health;

export class Health extends Component {
  static defaults() {
    return {
      max: 1000,
      current: null,
      show_bar: true
    };
  }
  static create(attrs) {
    const c = super.create(attrs);
    c.current = c.max;
    return c;
  }
}

export const components = { Health: Health };

export class HealthSystem extends System {

  initialize() {
    this.world
      .subscribe(MSG_DAMAGE, (msg, data) => {
        health = this.world.get('Health', data.to);
        if (health) { health.current -= data.amount; }
      })
      .subscribe(MSG_HEAL, (msg, data) => {
        health = this.world.get('Health', data.to);
        if (health) { health.current += data.amount; }
      });
  }

  matchComponent() { return 'Health'; }

  updateComponent(timeDelta, entityId, health) {
    if (health.current === null) {
      health.current = health.max;
    }
    if (health.current < 0) {
      this.world.publish(MSG_DESTROY, entityId);
    }
  }

}

export const systems = { Health: HealthSystem };
