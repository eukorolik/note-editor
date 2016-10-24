import {Observable} from 'rxjs/Observable';
import {Component, Registry} from '../core';
import {NeZone} from '../core/ne-zone';

export class NoteComponent extends Component {
  title;
  text;
  htmlElements = {
    title: null,
    text: null,
    container: null
  };
  onEditContainerClick;

  static selector() {
    return 'note';
  }

  static template() {
    return require('./note.component.pug');
  }

  constructor(element, service) {
    super(element, service);
    this.prepareElements();
    this.listen();
    this.prepareEdit();
  }

  prepareElements() {
    this.htmlElements.title = this.element.getElementsByClassName('note__title')[0];
    this.htmlElements.text = this.element.getElementsByClassName('note__text')[0];
    this.htmlElements.container = this.element.getElementsByClassName('note__container')[0];
  }

  listen() {
    NeZone.onMicrotaskEmpty.subscribe(() => {
      this.htmlElements.title.textContent = this.title;
      this.htmlElements.text.textContent = this.text;
    });
  }

  prepareEdit() {
    this.onEditContainerClick = Observable.fromEvent(this.htmlElements.container, 'click');
  }



}

Registry.register(NoteComponent);
