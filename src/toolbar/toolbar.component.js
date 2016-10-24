import {Component, Registry} from '../core';

export class ToolbarComponent extends Component {

  static selector() {
    return 'toolbar';
  }

  static template() {
    return require('./toolbar.component.pug');
  }


}

Registry.register(ToolbarComponent);
