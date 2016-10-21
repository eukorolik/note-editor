import {Component} from './component';

export class Registry {
  static components = new Map();

  static get selectors() {
    return Registry.components.keys();
  }

  static register(declaration) {
    if (!{}.isPrototypeOf.call(Component, declaration)) {
      throw new Error(`${declaration.name} does not extend Component`);
    }

    Registry.components.set(declaration.selector(), declaration);
  }

  static get(selector) {
    return Registry.components.get(selector);
  }
}
