import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class MyElement extends PolymerElement {

  constructor() {
    super();
  }

  static get template() {
    return html`Your position is: {{position}}`;
  }

  static get properties() {
    return {
      position: { type: String },
      test: {type: String}
    };
  }

  ready() {
    super.ready();
    console.log("About to get position");
    console.log("this:"+this);
    navigator.geolocation.getCurrentPosition((pos) => {
      this.position = pos.coords.latitude + ":" + pos.coords.longitude;
    });
  }
}

customElements.define('my-position', MyElement);