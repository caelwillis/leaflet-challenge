// url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// accessing with d3
d3.json(url).then(function (data) {
    // log to console
    console.log(data); 
    createFeatures(data.features);   
  });

// Function to determine marker size
function markerSize(magnitude) {
  return magnitude * 2500;
};

// Function to determine marker color by depth
function chooseColor(depth){
  if (depth < 10) return "#00FF00";
  else if (depth < 30) return "#99FF33";
  else if (depth < 50) return "#FFFF00";
  else if (depth < 70) return "#FF9933";
  else if (depth < 90) return "orangered";
  else return "#FF0000";
}

function createFeatures(earthquakeData) {

  //Function for info upon click
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }

  // Creating GeoJSON layer
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,

    pointToLayer: function(feature, latlng) {

      // Marker style
      var markers = {
        radius: markerSize(feature.properties.mag*5),
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        fillOpacity: 0.7,
        color: "black",
        stroke: true,
        weight: 0.5
      }
      return L.circle(latlng,markers);
    }
  });


  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create tile layer
  var grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/{style}/tiles/{z}/{x}/{y}?access_token={access_token}', {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    style: 'mapbox/light-v11',
    access_token: api_key
  });

  // Creating map
  var myMap = L.map("map", {
    center: [
      39.82, -98.57
    ],
    zoom: 5,
    layers: [grayscale, earthquakes]
  });

  // Adding legend
  var legend = L.control({position: "bottomright"});
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90];

    div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"

    for (var i = 0; i < depth.length; i++) {
      div.innerHTML +=
      '<i style="background:' + chooseColor(depth[i] + 1) + '"></i> ' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }
    return div;
  };
  legend.addTo(myMap)
};