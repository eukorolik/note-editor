import {Component, Registry} from '../core';

export class LayoutComponent extends Component {

  static selector() {
    return 'layout';
  }

  static template() {
    return require('./layout.component.pug');
  }

}

Registry.register(LayoutComponent);
