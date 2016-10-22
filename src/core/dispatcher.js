import {Component} from './component';
import {Registry} from './registry';

export class Dispatcher {
  static components = new Map();

  static get(element) {
    return Dispatcher.components.get(element);
  }

  static createComponent(element, declaration) {
    if (!{}.isPrototypeOf.call(Component, declaration)) {
      throw new Error(`${declaration.name} does not extend Component`);
    }

    if (Dispatcher.components.has(element)) {
      return;
    }

    element.innerHTML = declaration.template();
    Dispatcher.findComponents(element);

    const instance = new declaration(element);
    Dispatcher.components.set(element, instance);

    return instance;
  }

  static findComponents(element) {
    for (const selector of Registry.selectors) {
      const nodes = element.getElementsByTagName(selector);
      if (nodes.length === 0) {
        continue;
      }

      const declaration = Registry.get(selector);

      for (const node of nodes) {
        Dispatcher.createComponent(node, declaration);
      }
    }
  }
}
