import {Observable} from 'rxjs/Observable';
import {Component, Registry} from '../core';

export class NoteEditorComponent extends Component {
  newNote = {
    title: '',
    text: ''
  };
  htmlElements = {
    title: null,
    text: null
  };

  static selector() {
    return 'note-editor';
  }

  static template() {
    return require('./note-editor.component.pug');
  }

  constructor(element, service) {
    super(element, service);
    this.prepareElements();
    this.listen();

  }

  listen() {
    Observable.fromEvent(this.htmlElements.title, 'keyup').subscribe(() => {
      this.newNote.title = this.htmlElements.title.value;
    });
    Observable.fromEvent(this.htmlElements.text, 'keyup').subscribe(() => {
      this.newNote.text = this.htmlElements.text.value;
    });
  }

  prepareElements() {
    this.htmlElements.title = this.element.getElementsByClassName('note-editor__title')[0];
    this.htmlElements.text = this.element.getElementsByClassName('note-editor__text')[0];
  }
}

Registry.register(NoteEditorComponent);
