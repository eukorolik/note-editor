export class Component {
  element;
  service;

  static selector() {
    return '';
  }

  static template() {
    return '';
  }

  constructor(element, service) {
    this.element = element;
    this.service = service;
  }

  static repeat(target, parent, values, callback) {

    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }

    for (const value of values) {
      const clone = target.cloneNode(true);
      callback(clone, value);
      parent.appendChild(clone);
    }
  }
}
