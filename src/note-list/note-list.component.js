import {Component, Registry} from '../core';
import {Dispatcher} from '../core/dispatcher';
import {NoteComponent} from '../note';

export class NoteListComponent extends Component {
  data = [
    {title: 'Old Nun', text: 'My little summer child #got'},
    {title: 'The red head', text: 'You know nothing, Jon Snow #got'}
  ];
  noteRepeat = {
    parent: null,
    target: null
  };

  static selector() {
    return 'note-list';
  }

  static template() {
    return require('./note-list.component.pug');
  }

  constructor(element) {
    super(element);
    this.prepareNoteRepeat();
    this.runNoteRepeat();
    this.element.getElementsByClassName('note-list__add')[0]
      .addEventListener('click', () => {
      });
  }

  prepareNoteRepeat() {
    this.noteRepeat.parent = this.element.getElementsByClassName('note-repeat')[0];
    this.noteRepeat.target = document.createElement('li');
    const note = document.createElement('note');
    this.noteRepeat.target.appendChild(note);
  }

  runNoteRepeat() {
    Component.repeat(this.noteRepeat.target, this.noteRepeat.parent, this.data,
      (element, value) => {
        const note = element.getElementsByTagName('note')[0];
        const instance = Dispatcher.createComponent(note, NoteComponent);
        instance.title = value.title;
        instance.text = value.text;
      });
  }
}

Registry.register(NoteListComponent);

