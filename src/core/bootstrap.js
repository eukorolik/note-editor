import {Dispatcher} from './dispatcher';
import {NeZone} from './ne-zone';

export function bootstrap(element) {
  NeZone.own.run(() => {
    Dispatcher.findComponents(element);
    NeZone.recycle('onLoad');
  });
}
