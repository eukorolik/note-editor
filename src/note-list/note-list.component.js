import {Observable} from 'rxjs/Observable';
import {Component, Registry, NeZone, EventEmitter, Dispatcher} from '../core';
import {NoteComponent} from '../note';


export class NoteListComponent extends Component {
  htmlElements = {
    noteRepeat: {
      parent: null,
      target: null
    },
    addBtn: null
  };
  onAddBtnClick;
  onNoteClick = new EventEmitter();


  static selector() {
    return 'note-list';
  }

  static template() {
    return require('./note-list.component.pug');
  }

  constructor(element, service) {
    super(element, service);
    this.prepareNoteRepeat();
    this.runNoteRepeat();
    this.prepareAddBtn();
  }

  prepareNoteRepeat() {
    this.htmlElements.noteRepeat.parent = this.element.getElementsByClassName('note-repeat')[0];
    this.htmlElements.noteRepeat.target = document.createElement('li');
    const note = document.createElement('note');
    this.htmlElements.noteRepeat.target.appendChild(note);
  }

  runNoteRepeat() {
    NeZone.onMicrotaskEmpty.subscribe(() => {
      if (this.service.notes.length === this.htmlElements.noteRepeat.parent.children.length) {
        return;
      }

      Component.repeat(this.htmlElements.noteRepeat.target, this.htmlElements.noteRepeat.parent,
        this.service.notes,
        (element, value) => {
          const note = element.getElementsByTagName('note')[0];
          const instance = Dispatcher.createComponent(note, NoteComponent);
          instance.title = value.title;
          instance.text = value.text;
          instance.onEditContainerClick.subscribe(() => {
            this.onNoteClick.emit(instance);
          })
        });

      NeZone.recycle('componentRepeat');
    });
  }

  prepareAddBtn() {
    this.htmlElements.addBtn = this.element.getElementsByClassName('note-list__add')[0];
    this.onAddBtnClick = Observable.fromEvent(this.htmlElements.addBtn, 'click');
  }


}

Registry.register(NoteListComponent);

