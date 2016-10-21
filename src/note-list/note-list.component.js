import {Component, Registry} from '../core';

export class NoteListComponent extends Component {

  static selector() {
    return 'note-list';
  }

  static template() {
    return require('./note-list.component.pug');
  }

}

Registry.register(NoteListComponent);
