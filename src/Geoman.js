import './App.css';
import React from 'react'
import $ from 'jquery'
import {Button, ChakraProvider} from "@chakra-ui/react";

function Home () {
    // script
    $(document).ready(function() {
        // json bin constants
        let API_KEY = "$2b$10$Yjdr9li351h.kPgEDCFee.R4ctCZ.TR7F/YiooA6Kerkqv60OuyQe";
        let BIN_ID_TO_RECEIVE = "608d5bad8a409667ca023d89";
        let BIN_ID_TO_SEND = BIN_ID_TO_RECEIVE;

        // yeah.. bad.
        // eslint-disable-next-line no-undef
        const Leaflet = L;

        const baseUrl = window.location.origin;
        const preFolderName = 'kartes/';
        const pathToImg = baseUrl + '/' + preFolderName;

        // event listeners
        $( "#button-geoJSON" ).on( "click", function() {
            generateGeoJson();
        });

        $( "#button-clear" ).on( "click", function() {
            clearBinsData();
        });

        $( "#button-draw" ).on( "click", function() {
            drawFromDB();
        });

        // receives data from json bin, assigns it to dataFromBin, (and draws it -- currently not implemented)
        function drawFromDB() {
            let dataFromBin = null;
            let req = new XMLHttpRequest();

            // receive data, assign it
            req.onreadystatechange = () => {
                if (req.readyState === XMLHttpRequest.DONE) {
                    // response
                    dataFromBin = req.responseText;

                    // drawing
                    $("#bin-data-received-content").html("<b>Data received: </b><pre>" + JSON.stringify(JSON.parse(dataFromBin), undefined, 2) + "</pre>"); // pre for pretty printing
                    // IMPLEMENT DRAWING LOGIC HERE...
                    // DATA IS IN DataFromBin...
                }
            };

            req.open("GET", "https://api.jsonbin.io/v3/b/"+BIN_ID_TO_RECEIVE+"/latest", true);
            req.setRequestHeader("X-Master-Key", API_KEY);
            req.send();
        }

        // remove map if already initialized
        var container = Leaflet.DomUtil.get('map');
        if(container != null){
            container._leaflet_id = null;
        }

        // init map
        var map = Leaflet.map('map', {
            crs: Leaflet.CRS.Simple,
            minZoom: -5
        })

        var bounds = [[0, 0], [1000, 1000]];

        map.fitBounds(bounds);
        var stavs1 = Leaflet.layerGroup([Leaflet.imageOverlay(pathToImg + 'zm1.svg', bounds)]);
        var stavs2 = Leaflet.layerGroup([Leaflet.imageOverlay(pathToImg + 'zm2.svg', bounds)]);
        var stavs3 = Leaflet.layerGroup([Leaflet.imageOverlay(pathToImg + 'zm3.svg', bounds)]);
        var stavs4 = Leaflet.layerGroup([Leaflet.imageOverlay(pathToImg + 'zm4.svg', bounds)]);
        var stavs5 = Leaflet.layerGroup([Leaflet.imageOverlay(pathToImg + 'zm5.svg', bounds)]);

        var currentBaseLayer = stavs1.addTo(map);

        map.on('pm:create', function (e) {
            currentBaseLayer.addLayer(e.layer);
        }).on('baselayerchange', function (e) {
            currentBaseLayer = e.layer;
        })

        Leaflet.control.layers({1: stavs1, 2: stavs2, 3: stavs3, 4: stavs4, 5: stavs5}, null, {collapsed: false}).addTo(map)

        map.on('pm:create', function (e) {
            currentBaseLayer.addLayer(e.layer);
        }).on('baselayerchange', function (e) {
            currentBaseLayer = e.layer;
        })

        map.pm.addControls({
            position: 'topleft',
            drawCircle: false,
        });

        function generateGeoJson() {
            var fg = Leaflet.featureGroup();
            var layers = findLayers(map);
            layers.forEach(function (layer) {
                fg.addLayer(layer);
            });

            let GeoDataJSON = fg.toGeoJSON();
            let GeoDataJSONString = JSON.stringify(GeoDataJSON);

            console.log(GeoDataJSON);

            // send output to jsonbin (update bin)
            $("#bin-data-sent").html("<b>Sent data to bin: </b><pre>" + JSON.stringify(GeoDataJSON, undefined, 2) + "</pre>"); // pre for pretty printing
            let req = new XMLHttpRequest();

            req.onreadystatechange = () => {
                if (req.readyState === XMLHttpRequest.DONE) {

                    // puts response from the bin which includes bin's content + metadata
                    let responseText = req.responseText; // includes also metadata about the bin
                    let binsData = JSON.stringify(JSON.parse(responseText)["record"]);
                    let binsMetadata = JSON.stringify(JSON.parse(responseText)["metadata"]);
                    // $("#bin-data-received-content").html("<b>Bin's data received:</b> " + binsData);
                    // $("#bin-data-received-metadata").html("<b>Bin's metadata received:</b> " + binsMetadata);

                }
            };

            req.open("PUT", "https://api.jsonbin.io/v3/b/" + BIN_ID_TO_SEND, true);
            req.setRequestHeader("Content-Type", "application/json");
            req.setRequestHeader("X-Master-Key", API_KEY);
            req.send(GeoDataJSONString);
        }

        // clears .bin-data divs
        function clearBinsData() {
            $(".bin-data").each(function () {
                $(this).html("");
            });
        }


        function findLayers(map) {
            var layers = [];
            map.eachLayer(layer => {
                if (
                    layer instanceof Leaflet.Polyline ||
                    layer instanceof Leaflet.Marker ||
                    layer instanceof Leaflet.Circle ||
                    layer instanceof Leaflet.CircleMarker
                ) {
                    layers.push(layer);
                }
            });

            // filter out layers that don't have the leaflet-geoman instance
            layers = layers.filter(layer => !!layer.pm);

            // filter out everything thats leaflet-geoman specific temporary stuff
            layers = layers.filter(layer => !layer._pmTempLayer);
            return layers;

        }
    });

    // return
    return (
        <div id="geoman-wrapper">
            <ChakraProvider>
                <Button m={1} id="button-geoJSON">GeoJSON</Button>
                <Button m={1} id="button-clear">Clear printed data</Button>
                <Button m={1} id="button-draw">Refresh data and draw</Button>
            </ChakraProvider>
            <div id="bin-data-sent" className="bin-data"></div>
            <div id="bin-data-received-content" className="bin-data"></div>
            <div id="bin-data-received-metadata" className="bin-data"></div>
            <div id="map"></div>
        </div>
    )
}

export default Home;
