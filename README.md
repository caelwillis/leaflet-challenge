# leaflet-challenge

For this challenge, we were tasked to fetch earthquake data from a GeoJSON feed and display it on a Leaflet map. The code utilizes D3.js for fetching JSON data and Leaflet.js for mapping.

First we fetch the data using D3. We are visualizing earthquakes from the past week from the following url: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson. This GeoJSON is made usable through D3.

Next we need to create the layers of our map. The GeoJSON layer with our data, the tile layer to display a backdrop, and then the creation of our map itself.

Then we want to add characteristics to each earthquake depending on its depth and magnitude. We define a variable called "markers" that will set the size of the marker based on earthquake magnitude, and we create a "chooseColor" function which will set the color of each marker based on depth. 

Next we use a "createFeatures" function and configure it to provide additional information for the earthquake once each marker is clicked on. 

Finally our legend is created to show a key of what depth range each marker color represents.
