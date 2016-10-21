import {Dispatcher} from './dispatcher';

export function bootstrap(element) {
  Dispatcher.findComponents(element);
}
