import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import GoogleMapsApiLoader from 'google-maps-api-loader';

class MyElement extends PolymerElement {

  constructor() {
    super();
  }

  static get template() {
    return html`Your position is: {{position}} <div id='mapholder'></div>`;
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
    navigator.geolocation.watchPosition((pos) => {
      console.log("updating.");
      this.position = pos.coords.latitude + ":" + pos.coords.longitude;
    });

    console.log("GoogleMapsApiLoader:",GoogleMapsApiLoader);
    GoogleMapsApiLoader({
        libraries: ['places'],
        apiKey: 'AIzaSyC4ci6kvIugUqu85i1VyXmA3WF17sz-F90' // optional
    })
    .then(function(googleApi) {
      console.log("In here")
        var autocomplete = new googleApi.maps.places.AutocompleteService();
    }, function(err) {
        console.error(err);
    });
  }
}

customElements.define('my-position', MyElement);