import { treeJSON } from "./treeJson.js";

// Initialize map and setview to geo coordinates and zoom level
const mymap = L.map("mapid", {
  scrollWheelZoom: false,
  smoothWheelZoom: true,
  smoothSensitivity: 1,
}).setView([0, 0], 2);

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

// geoJSON styling
function markerStyling(feature) {
  // console.log(feature);
  // getRadius(feature);
  return {
    radius: getRadius(feature),
    fillColor: "#7ec346",
    color: "#265525",
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.6,
  };
}

// Different radius based on trees amount
function getRadius(feature) {
  if (feature.properties.name) {
    const treesAmount = feature.properties.name
      .substring(0, 8)
      .replace(/\D/g, "");
    return treesAmount > 1000
      ? 32
      : treesAmount > 500
      ? 26
      : treesAmount > 200
      ? 22
      : treesAmount > 100
      ? 18
      : treesAmount > 20
      ? 14
      : treesAmount > 10
      ? 10
      : 8;
  } else {
    return 10;
  }
}

let geojson;

// Highlight tree marker on mouse over
function highlightFeature(event) {
  // Get access to the layer that was hovered
  const treeMarker = event.target;

  treeMarker.setStyle({
    weight: 3,
    color: "#666",
    // fillOpacity: 1,
  });

  // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
  //   treeMarker.bringToFront();
  // }
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
  if (mymap.getZoom() < 7) {
    mymap.setView(e.target._latlng, 7);
  } else if (mymap.getZoom() < 10) {
    mymap.setView(e.target._latlng, 10);
  } else {
    mymap.setView(e.target._latlng, 13);
  }
}

// On each feature before adding it to the geojson layer
function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.name);
  layer.on({
    mouseover: function (e) {
      this.openPopup();
    },
    mouseout: function (e) {
      this.closePopup();
    },
    click: zoomToFeature,
    // click: mymap.flyTo(e.target.latlng),
  });
}

geojson = L.geoJSON(treeJSON, {
  pointToLayer: function (feature, latlng) {
    const markerStyle = markerStyling(feature);
    return L.circleMarker(latlng, markerStyle);
  },
  onEachFeature: onEachFeature,
}).addTo(mymap);
