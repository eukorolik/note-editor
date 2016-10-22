export class Component {
  element;

  static selector() {
    return '';
  }

  static template() {
    return '';
  }

  constructor(element) {
    this.element = element;
  }

  static repeat(target, parent, values, callback) {
    for (const value of values) {
      const clone = target.cloneNode(true);
      callback(clone, value);
      parent.appendChild(clone);
    }
  }
}
