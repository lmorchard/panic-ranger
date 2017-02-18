import * as Core from '../lib/core';

export class ClickCourse extends Core.Component {
  static defaults() {
    return { x: 0, y: 0, stopOnArrival: false, active: true };
  }
}

Core.registerComponent('ClickCourse', ClickCourse);

export class ClickCourseSystem extends Core.System {

  matchComponent() { return 'ClickCourse'; }

  initialize() {
    this.trackingCursor = false;
    this.world
      .subscribe('mouseDown', (msg, cursorPosition) => {
        this.trackingCursor = true;
        this.setCourse(cursorPosition);
      })
      .subscribe('mouseUp', (msg, cursorPosition) => {
        this.trackingCursor = false;
        this.setCourse(cursorPosition);
      })
      .subscribe('mouseMove', (msg, cursorPosition) => {
        if (this.trackingCursor) {
          this.setCourse(cursorPosition);
        }
      });
  }

  setCourse(cursorPosition) {
    const clickCourses = this.world.get('ClickCourse');
    for (const entityId in clickCourses) {
      const clickCourse = clickCourses[entityId];
      clickCourse.active = true;
      clickCourse.x = cursorPosition.x;
      clickCourse.y = cursorPosition.y;
    }
  }

  updateComponent(timeDelta, entityId, clickCourse) {

    const entities = this.world;
    const position = entities.get('Position', entityId);
    const seeker = entities.get('Seeker', entityId);
    const thruster = entities.get('Thruster', entityId);
    const sprite = entities.get('Sprite', entityId);

    if (clickCourse.active) {
      thruster.active = true;
      thruster.stop = false;
      seeker.targetPosition = { x: clickCourse.x, y: clickCourse.y };
    }

    const xOffset = Math.abs(position.x - clickCourse.x);
    const yOffset = Math.abs(position.y - clickCourse.y);
    if (xOffset < sprite.size && yOffset < sprite.size) {
      if (clickCourse.stopOnArrival) {
        thruster.stop = true;
      }
    }

  }

}

Core.registerSystem('ClickCourse', ClickCourseSystem);
