import {EventEmitter} from './event-emitter';

export class NeZone {
  static onMicrotaskEmpty = new EventEmitter();
  static onMacrotaskEmpty = new EventEmitter();

  static own = Zone.current.fork({
    name: 'own-zone',
    onInvokeTask: (delegate, current, target, task, applyThis, applyArgs) => {
      task.callback(applyArgs);
      if (task.type !== 'microTask') {
        NeZone.recycle('onInvokeTask');
      }
    },
    onHasTask: (delegate, current, target, hasTaskState) => {
      delegate.hasTask(target, hasTaskState);

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

  static recycle(name) {
    NeZone.own.scheduleMicroTask(name, () => {});
  }
}
