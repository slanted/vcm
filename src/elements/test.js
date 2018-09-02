import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class MyElement extends PolymerElement {

  constructor() {
    super();
  }

  static get is() {
    return 'my-element';
  }

  static get properties() {
    return {
      mood: { type: String }
    };
  }


  render() {
    return html`ERIC`;
  }

  ready() {
    super.ready();
  }
}

console.log("Here");
customElements.define(MyElement.is, MyElement);