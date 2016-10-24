import {EventEmitter} from './event-emitter';

export class Service {
  notes = [];


  constructor() {
    const notes = JSON.parse(localStorage.getItem('ne:note-list'));
    if (notes) {
      this.notes = notes;
    }
  }

  addNote(note) {
    this.notes.push(note);
    localStorage.setItem('ne:note-list', JSON.stringify(this.notes));
  }

}
