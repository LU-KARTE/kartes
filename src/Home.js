import './App.css';
import React from 'react'
import $ from 'jquery'

function Home () {
    // script -- init map
    $(document).ready( function() {
        // yeah.... bad.
        // eslint-disable-next-line no-undef
        const Leaflet = L;
        const baseUrl = window.location.origin;
        const preFolderName = 'kartes/';
        const pathToImg = baseUrl + '/' + preFolderName;

        // remove map if already initialized
        var container = Leaflet.DomUtil.get('map');
        if(container != null){
            container._leaflet_id = null;
        }

        // init map
        var map = Leaflet.map('map', {
            crs: Leaflet.CRS.Simple,
            minZoom: -5
        });

        var bounds = [[0, 0], [1000, 1000]];
        var stavs1 = Leaflet.imageOverlay(pathToImg + 'zm1.svg', bounds).addTo(map);
        var stavs2 = Leaflet.imageOverlay(pathToImg + 'zm2.svg', bounds).addTo(map);
        var stavs3 = Leaflet.imageOverlay(pathToImg + 'zm3.svg', bounds).addTo(map);
        var stavs4 = Leaflet.imageOverlay(pathToImg + 'zm4.svg', bounds).addTo(map);
        var stavs5 = Leaflet.imageOverlay(pathToImg + 'zm5.svg', bounds).addTo(map);

        var baseMaps = {
            "1": stavs1,
            "2": stavs2,
            "3": stavs3,
            "4": stavs4,
            "5": stavs5
        };

        Leaflet.control.layers(baseMaps).addTo(map);

        map.fitBounds(bounds);
    });

    return (<div id="map"/>)
}

export default Home;
