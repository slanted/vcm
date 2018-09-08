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
            display: block;
            height: 500px;
            width: 100%;
            border:1px solid black;
          }
        </style>
        <div id="map"></div>   
    `;
  }

  static get properties() {
    return {
      apiKey: { type: String },
      currentPosition: { type: Boolean },
      position: { type: Object },
      watchPosition: { type: Boolean }
    };
  }

  printPosition(pos) {
    console.log("Lat:" + pos.coords.latitude + " Lon:" + pos.coords.longitude);
  }

  ready() {
    super.ready();

    var that = this;
    var map;

    var apiKey = "AIzaSyBC9ieQc9GXkl5uQc0oBigP-fh5ScMHrfs";
    var script = document.createElement('script');
    script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' + apiKey);
    script.onload = () => {
      console.log("Loaded script");
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log("pos:" + pos);
        var mapEl = that.$.map;
        var c = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        map = new google.maps.Map(mapEl, { zoom: 14, center: c })
        var marker = new google.maps.Marker({position: c, map: map});
      })

      // navigator.geolocation.watchPosition((mypos) => {
      //   var center = {
      //     lat: mypos.coords.latitude,
      //     lng: mypos.coords.longitude
      //   }
      //   map.setCenter(center);
      //   console.log("Set center");
      // })
    }
    document.head.appendChild(script);
    console.log("Added google script");



    // GoogleMapsApiLoader({
    //   libraries: [],
    //   apiKey: '' // optional
    // })
    //   .then(function (googleApi) {

    //     if (that.watchPosition) {
    //       console.log("watching position");
    //       navigator.geolocation.watchPosition((pos) => {
    //         console.log("Got position");
    //         that.position = pos;
    //         that.printPosition(pos);
    //         var mapEl = that.$.map;
    //         console.log("mapEl:" + mapEl);
    //         var map = googleApi.maps.Map(mapEl, { zoom: 4, center: pos })
    //       });
    //     }
    //   }, function (err) {
    //     console.error(err);
    //   });
  }
}

customElements.define('google-map', GoogleMap);