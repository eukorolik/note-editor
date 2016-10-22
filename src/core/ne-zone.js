import {EventEmitter} from './event-emitter';

export class NeZone {
  static onMicrotaskEmpty = new EventEmitter();
  static onMacrotaskEmpty = new EventEmitter();

  static own = Zone.current.fork({
    name: 'own-zone',
    onHasTask: (delegate, current, target, hasTaskState) => {
      delegate.hasTask(target, hasTaskState);
      console.log(current === target);
      console.log(hasTaskState.change);

      if (current === target) {
        if (hasTaskState.change === 'microTask') {
          NeZone.checkMicrotaskQueue(hasTaskState.microTask);
        } else if (hasTaskState.change === 'macroTask') {
          NeZone.checkMacrotaskQueue(hasTaskState.macroTask);
        }
      }
    }
  });

  static checkMicrotaskQueue(hasMicrotask) {
    if (!hasMicrotask) {
      NeZone.onMicrotaskEmpty.emit(null);
    }
  }

  static checkMacrotaskQueue(hasMacrotask) {
    if (!hasMacrotask) {
      NeZone.onMacrotaskEmpty.emit(null);
    }
  }
}
