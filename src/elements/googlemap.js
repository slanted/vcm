import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
// import GoogleMapsApiLoader from 'google-maps-api-loader';

class GoogleMap extends PolymerElement {
  constructor() {
    super();
  }

  static get template() {
    return html`
        <style>
          #map {
            height: 93%;
          }

          .options {
            display: inline-grid;
            grid-template-columns: 1fr 1fr;
            width: 100%;
          }

          .options span {
            border: 2px solid black;
            align-self: stretch;
            padding: 5px;
            margin:2px;
            background: lightblue;
            text-align: center;
          }

        </style>
        <div>Status: {{status}}</div>
        <div class="options">
          <span on-click="toggleAccuracy">High Accuracy: {{highAccuracy}}</span>
          <span on-click="toggleTracking">Tracking: {{track}}</span>
        </div>
        <div id="map"></div>   
    `;
  }

  static get properties() {
    return {
      apiKey: { type: String },
      currentPosition: { type: Boolean },
      position: { type: Object },
      watchPosition: { type: Boolean },
      status: { type: Boolean },
      highAccuracy: { type: Boolean, value: true },
      track: { type: Boolean, value: false },
      lat: { type: String },
      lng: { type: String }
    };
  }

  printPosition(pos) {
    console.log("Lat:" + pos.coords.latitude + " Lon:" + pos.coords.longitude);
  }

  toggleAccuracy() {
    this.highAccuracy = !this.highAccuracy;
    console.log("Set highAccuracy:" + this.highAccuracy);
  }

  toggleTracking() {
    this.track = !this.track;
    console.log("Set track:" + this.track);
  }

  setPosition() {

  }

  ready() {
    super.ready();

    var that = this;
    var map;
    var currentMarker;

    var script = document.createElement('script');
    var apiKey = this.apiKey;
    script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' + apiKey);
    script.onload = () => {
      console.log("Loaded script");

      var options = {
        enableHighAccurary: this.highAccuracy
      }

      if (this.watchPosition) {
        navigator.geolocation.getCurrentPosition((pos) => {
          var mapEl = that.$.map;
          var c = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
          this.status = "Got inital position:" + c.lat + " " + c.lng;
          map = new google.maps.Map(mapEl, { zoom: 15, center: c })
          current = new google.maps.Marker({ position: c, map: map });
        }, null, options);
      } else {

      }

      if (this.watchPosition) {
        navigator.geolocation.watchPosition((pos) => {
          var mapEl = that.$.map;
          var c = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }

          this.status = "Got Position:" + c.lat + " " + c.lng;

          currentMarker.setPosition(c);
          map.setCenter(c);
        }, null, options);
      }
    }
    document.head.appendChild(script);
  }
}

customElements.define('google-map', GoogleMap);