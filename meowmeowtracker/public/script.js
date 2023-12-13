//Map
// Quick start documentation: https://leafletjs.com/examples/quick-start/

// ** initiate the map using 'leaflet' method and set a view point
var map = L.map('map').setView([31.1509, 121.476437], 16);

// ** add a tile layer to our map using 'OpenStreetMap' tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    // credit, not functional
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// ** create a MARKER and add to map
// var marker = L.marker([31.1509, 121.477]).addTo(map);
// ** create a POPUP and add on to MARKER
// marker.bindPopup("<b>Anita</b><br>description of cat Anita")