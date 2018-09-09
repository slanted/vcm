import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './googlemap';

class MyElement extends PolymerElement {

  constructor() {
    super();
  }

  static get template() {
    return html`
      <google-map watch-position api-key="AIzaSyBC9ieQc9GXkl5uQc0oBigP-fh5ScMHrfs">
        <google-map-marker title="You" currentPosition></google-map-marker>
      </google-map>
    `;
  }

  static get properties() {
    return {
      position: { type: String }
    };
  }

  ready() {
    super.ready();
  }
}

customElements.define('my-position', MyElement);