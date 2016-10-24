import {Component} from './component';
import {Registry} from './registry';
import {Service} from './service';

export class Dispatcher {
  static components = new Map();
  static service = new Service();

  static get(element) {
    return Dispatcher.components.get(element);
  }

  static has(element) {
    return Dispatcher.components.has(element);
  }

  static createComponent(element, declaration) {
    if (!{}.isPrototypeOf.call(Component, declaration)) {
      throw new Error(`${declaration.name} does not extend Component`);
    }

    if (Dispatcher.components.has(element)) {
      return null;
    }

    element.innerHTML = declaration.template();
    Dispatcher.findComponents(element);

    const instance = new declaration(element, Dispatcher.service);
    Dispatcher.components.set(element, instance);

    return instance;
  }

  static removeComponent(element) {
    Dispatcher.components.delete(element);
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
