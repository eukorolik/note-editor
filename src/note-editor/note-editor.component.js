import {Component, Registry} from '../core';

export class NoteEditorComponent extends Component {

  static selector() {
    return 'note-editor';
  }

  static template() {
    return require('./note-editor.component.pug');
  }

}

Registry.register(NoteEditorComponent);
