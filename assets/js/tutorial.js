// Initialize map and setview to geo coordinates and zoom level
var mymap = L.map("mapid").setView([51.505, -0.09], 13);

// Add tile layer to add to the map
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/outdoors-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1Ijoic2ViYXN0aWFhbmRla2tlciIsImEiOiJja2c5OHh6eXUwNG1iMnVtc2NlaDJ5dXZrIn0.T577Ev7ABk3QIvTMHpxYMQ",
  }
).addTo(mymap);

// Add a marker
var marker = L.marker([51.5, -0.09]).addTo(mymap);

// Add a circle
var circle = L.circle([51.508, -0.11], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500,
}).addTo(mymap);

// Add a polygon
var polygon = L.polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047],
]).addTo(mymap);

// Popups binding
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

// Use standalone popup as layer
var popup = L.popup()
  .setLatLng([51.5, -0.09])
  .setContent("I am a standalone popup.")
  .openOn(mymap);

var popup2 = L.popup();

function onMapClick(e) {
  popup2
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
}

mymap.on("click", onMapClick);
