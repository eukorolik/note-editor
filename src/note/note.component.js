import {Component, Registry} from '../core';
import {NeZone} from '../core/ne-zone';

export class NoteComponent extends Component {
  title;
  text;
  elements = {
    title: null,
    text: null
  };

  static selector() {
    return 'note';
  }

  static template() {
    return require('./note.component.pug');
  }

  constructor(element) {
    super(element);
    this.prepareElements();
    this.listen();
  }

  prepareElements() {
    this.elements.title = this.element.getElementsByClassName('note__title')[0];
    this.elements.text = this.element.getElementsByClassName('note__text')[0];
  }

  listen() {
    NeZone.onMicrotaskEmpty.subscribe(() => {
      console.log(1);
      this.elements.title.textContent = this.title;
      this.elements.text.textContent = this.text;
    });
  }

}

Registry.register(NoteComponent);
