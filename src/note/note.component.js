import {Component, Registry} from '../core';

export class NoteComponent extends Component {

  static selector() {
    return 'note';
  }

  static template() {
    return require('./note.component.pug');
  }

}

Registry.register(NoteComponent);
