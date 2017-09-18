import { Component, System } from '../lib/core';

export class PlayerInputSteering extends Component {
  static defaults() {
    return {
      active: true,
      radPerSec: Math.PI * 2
    };
  }
}

export const components = { PlayerInputSteering: PlayerInputSteering };

const PI2 = Math.PI * 2;

export class PlayerInputSteeringSystem extends System {

  defaultOptions() {
    return {
      gamepadDeadzone: 0.2
    };
  }

  matchComponent() { return 'PlayerInputSteering'; }

  initialize() {
    this.gamepad = { active: false };
    this.pointer = { active: false, x: 0, y: 0 };
    this.keys = { active: false };
    this.touch = { active: false, x: 0, y: 0 };

    this.world
      .subscribe('mouseDown', (msg, cursorPosition) =>
        this.setPointer(true, cursorPosition))
      .subscribe('mouseUp', (msg, cursorPosition) =>
        this.setPointer(false, cursorPosition))
      .subscribe('mouseMove', (msg, cursorPosition) =>
        this.setPointer(this.pointer.active, cursorPosition));

    const windowEvents = {
      keydown: this.handleKeyDown,
      keyup: this.handleKeyUp
    };
    Object.keys(windowEvents)
      .forEach(k => window.addEventListener(k, windowEvents[k].bind(this)));
  }

  setPointer(active, position) {
    this.pointer.active = active;
    this.pointer.x = position.x;
    this.pointer.y = position.y;
  }

  update(timeDelta) {
    this.updateGamepads(timeDelta);
    this.updateKeyboard(timeDelta);
    super.update(timeDelta);
  }

  updateComponent(timeDelta, entityId, steering) {
    const thruster = this.world.get('Thruster', entityId);
    const motion = this.world.get('Motion', entityId);

    thruster.active = true;
    thruster.stop = false;

    if (this.keys.active) {
      return this.updateComponentFromKeyboard(timeDelta, entityId, steering);
    }

    if (this.pointer.active) {
      return this.updateComponentFromPointer(timeDelta, entityId, steering);
    }

    if (this.gamepad.active) {
      return this.updateComponentFromGamepad(timeDelta, entityId, steering);
    }

    thruster.stop = true;
    motion.drotation = 0;
  }

  updateComponentFromPointer(timeDelta, entityId, steering) {
    const position = this.world.get('Position', entityId);
    this.updateMotionFromTargetAngle(timeDelta, entityId, steering,
      Math.atan2(this.pointer.y - position.y, this.pointer.x - position.x));
  }

  updateComponentFromGamepad(timeDelta, entityId, steering) {
    this.updateMotionFromTargetAngle(timeDelta, entityId, steering,
      Math.atan2(this.gamepad.axis1, this.gamepad.axis0));
  }

  updateComponentFromKeyboard(timeDelta, entityId, steering) {
    const thruster = this.world.get('Thruster', entityId);
    const motion = this.world.get('Motion', entityId);

    const dleft  = (this.keys[65] || this.keys[37] || this.gamepad.button13);
    const dright = (this.keys[68] || this.keys[39] || this.gamepad.button14);
    const dup    = (this.keys[87] || this.keys[38] || this.gamepad.button11);
    // const ddown  = (this.keys[83] || this.keys[40] || this.gamepad.button12);

    if (dup) {
      thruster.active = true;
    } else {
      thruster.stop = true;
    }

    const direction = dleft ? -1 : (dright ? 1 : 0);
    const targetDr = direction * steering.radPerSec;
    motion.drotation = targetDr;
  }

  updateGamepads() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

    // TODO: specify which gamepad, i.e. for multiplayer
    for (let i = 0; i < gamepads.length; i++) {
      const gp = gamepads[i];
      if (!gp || !gp.connected) continue;
      gp.buttons.forEach((val, idx) => this.gamepad[`button${idx}`] = val.pressed);
      gp.axes.forEach((val, idx) => this.gamepad[`axis${idx}`] = val);
      break; // stop after the first gamepad
    }

    Object.keys(this.gamepad).forEach(k => {
      if (!this.gamepad[k]) { delete this.gamepad[k]; }
    });

    const axisX = this.gamepad.axis0;
    const axisY = this.gamepad.axis1;
    this.gamepad.active =
      (Math.abs(axisX) > 0 || Math.abs(axisY) > 0) &&
      (Math.sqrt(axisX * axisX + axisY * axisY) > this.options.gamepadDeadzone);
  }

  updateKeyboard() {
    const dleft  = (this.keys[65] || this.keys[37] || this.gamepad.button13);
    const dright = (this.keys[68] || this.keys[39] || this.gamepad.button14);
    const dup    = (this.keys[87] || this.keys[38] || this.gamepad.button11);
    const ddown  = (this.keys[83] || this.keys[40] || this.gamepad.button12);

    this.keys.active = (dleft || dright || dup || ddown);
  }

  handleKeyDown(ev) {
    this.keys[ev.keyCode] = true;
    ev.preventDefault();
  }

  handleKeyUp(ev) {
    delete this.keys[ev.keyCode];
    ev.preventDefault();
  }

  updateMotionFromTargetAngle(timeDelta, entityId, steering, targetAngleRaw) {
    const position = this.world.get('Position', entityId);
    const motion = this.world.get('Motion', entityId);

    const targetAngle = (targetAngleRaw < 0) ?
      targetAngleRaw + PI2 : targetAngleRaw;

    // Pick the direction from current to target angle
    let direction = (targetAngle < position.rotation) ? -1 : 1;

    // If the offset between the angles is more than half a circle, go
    // the other way because it'll be shorter.
    const offset = Math.abs(targetAngle - position.rotation);
    if (offset > Math.PI) {
      direction = 0 - direction;
    }

    // Work out the desired delta-rotation to steer toward target
    const targetDr = direction * Math.min(steering.radPerSec, offset / timeDelta);

    // Calculate the delta-rotation impulse required to meet the goal,
    // but constrain to the capability of the steering thrusters
    let impulseDr = (targetDr - motion.drotation);
    if (Math.abs(impulseDr) > steering.radPerSec) {
      if (impulseDr > 0) {
        impulseDr = steering.radPerSec;
      } else if (impulseDr < 0) {
        impulseDr = 0 - steering.radPerSec;
      }
    }

    motion.drotation += impulseDr;
  }

}

export const systems = { PlayerInputSteering: PlayerInputSteeringSystem };
