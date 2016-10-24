import {Observable} from 'rxjs/Observable'
import {Component, Registry, NeZone, Dispatcher} from '../core';
import {NoteListComponent} from '../note-list';
import {NoteEditorComponent} from '../note-editor';

export class LayoutComponent extends Component {
  isEditor = false;
  htmlElements = {
    parent: null,
    noteList: null,
    noteEditor: null
  };
  onBackBtnClick;
  onDeleteBtnClick;
  note = null;

  static selector() {
    return 'layout';
  }

  static template() {
    return require('./layout.component.pug');
  }

  constructor(element, service) {
    super(element, service);
    this.findPlace();
    this.showEditor();
  }

  showEditor() {
    let isEditorBuffer = true;
    NeZone.onMicrotaskEmpty.subscribe(() => {
      if (this.isEditor === isEditorBuffer) {
        return;
      }

      while (this.htmlElements.parent.firstChild) {
        this.htmlElements.parent.removeChild(this.htmlElements.parent.firstChild);
      }

      if (!this.isEditor) {
        isEditorBuffer = false;
        this.htmlElements.noteList = document.createElement('note-list');
        const instance = Dispatcher.createComponent(this.htmlElements.noteList, NoteListComponent);
        this.htmlElements.parent.appendChild(this.htmlElements.noteList);

        instance.onAddBtnClick.subscribe(() => {
          this.isEditor = true;
        });

        instance.onNoteClick.subscribe((note) => {
          this.isEditor = true;
          this.note = note;
        })
      } else {
        isEditorBuffer = true;
        this.htmlElements.noteEditor = document.createElement('note-editor');
        const instance = Dispatcher.createComponent(this.htmlElements.noteEditor, NoteEditorComponent);
        this.htmlElements.parent.appendChild(this.htmlElements.noteEditor);


        if (this.note) {
          instance.newNote.title = this.note.title;
          instance.newNote.text = this.note.text;
          this.note = null;
        }
      }
      this.toggleToolbar();
      NeZone.recycle('onShowEditor');
    });
  }

  findPlace() {
    this.htmlElements.parent = this.element.getElementsByTagName('main')[0];
  }

  toggleToolbar() {
    const toolbarBtns = this.element.getElementsByClassName('mdl-layout__drawer-button');
    if (toolbarBtns.length === 0) {
      return;
    }
    const menuBtn = toolbarBtns[0];

    let backBtn;
    let deleteBtn;
    if (toolbarBtns.length === 1) {
      backBtn = menuBtn.cloneNode(true);
      menuBtn.parentNode.appendChild(backBtn);
      backBtn.classList.add('layout__back-btn');
      backBtn.getElementsByTagName('i')[0].textContent = 'arrow_back';

      deleteBtn = menuBtn.cloneNode(true);
      menuBtn.parentNode.appendChild(deleteBtn);
      deleteBtn.classList.add('layout__delete-btn');
      deleteBtn.getElementsByTagName('i')[0].textContent = 'delete';
    } else {
      backBtn = toolbarBtns[1];
      deleteBtn = toolbarBtns[2];
    }
    menuBtn.hidden = this.isEditor;
    deleteBtn.hidden = !this.isEditor;
    backBtn.hidden = !this.isEditor;

    this.onBackBtnClick = Observable.fromEvent(backBtn, 'click');
    this.onBackBtnClick.subscribe(() => {
      this.isEditor = false;
      if (!Dispatcher.has(this.htmlElements.noteEditor)) {
        return;
      }
      const instance = Dispatcher.get(this.htmlElements.noteEditor);
      if (!instance.newNote.title && !instance.newNote.text) {
        Dispatcher.removeComponent(this.htmlElements.noteEditor);
        return;
      }
      this.service.addNote(instance.newNote);
      Dispatcher.removeComponent(this.htmlElements.noteEditor);
    });
    this.onDeleteBtnClick = Observable.fromEvent(deleteBtn, 'click');
  }

}

Registry.register(LayoutComponent);
