import {Component, Registry} from '../core';

export class MainMenuComponent extends Component {

  static selector() {
    return 'main-menu';
  }

  static template() {
    return require('./main-menu.component.pug');
  }

}

Registry.register(MainMenuComponent);
