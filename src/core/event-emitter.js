import {Subject} from 'rxjs';

export class EventEmitter {
  subject = new Subject();
  observable;

  constructor() {
    this.observable = this.subject.asObservable();
  }

  emit(value) {
    this.subject.next(value);
  }

  subscribe(observerOrNext, error, complete) {
    return this.observable.subscribe(observerOrNext, error, complete);
  }

}
