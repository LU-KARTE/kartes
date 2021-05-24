import React from 'react'
import $ from 'jquery'
import {
    Button,
    ChakraProvider, FormControl, FormLabel, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select, useDisclosure
} from "@chakra-ui/react";
import {
    MapContainer,
    LayerGroup,
    LayersControl,
    ImageOverlay,
} from "react-leaflet";
import {CRS, Polygon, Polyline} from "leaflet";

import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

// still to do
// 1. add modal edit option (open modal, preferably with written previous data)
// 2. remove unneeded stuff
// 3. json bin ? or no.

function GeomanPage(props) {

    const mapRef = React.useRef();
    const floors = [React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef()];

    const { isOpen, onOpen, onClose } = useDisclosure({
        onClose() { $("#cancelButton").click(); }
    }) // for modal
    const idRef = React.useRef() // for modal


    function printJSON() {
        let map = mapRef.current;
        let rawLayers = null;
        let processedLayers = null;
        if (map) {
            rawLayers = findLayers();
            processedLayers = processLayers(rawLayers);
        }

        $("#bin-data-sent").html("<pre>" + JSON.stringify(processedLayers, undefined, 2) + "</pre>");
    }

    function processLayers(layers) {
        let result = {
            "type": "GeometryCollection",
            "features": {"1": [], "2": [], "3": [], "4": [], "5": []}
        };

        for (let key in layers) {
            let target = result.features[key];
            layers[key].forEach((el, index) => {
                let shape = el.pm._shape;

                // get coordinates
                let coordinates = [];
                el._parts[0].forEach((el, index) => {
                    coordinates.push([el.x, el.y]);
                });

                // push clean geoJSON data object
                target.push({
                    "type": shape,
                    "id": key.toString() + index.toString(),
                    "properties": {
                        "roomID": el.LUProperties.id,
                        "roomType": el.LUProperties.type
                    },
                    "coordinates": coordinates
                })
            });
        }

        return result;
    }

    // filter drawed layers grouped by floor
    function findLayers() {
        let layersResult = {"1": [], "2": [], "3": [], "4": [], "5": []}; // init empty

        // go over each floor and add each floor's drawings
        floors.forEach((el, index) => {
            let layers = el.current._layers; // this is a little sketchy to use _layers variable
            for (let key in layers) {
                if (
                    layers[key] instanceof Polyline || // only if its polyline or polygon
                    layers[key] instanceof Polygon
                ) {
                    layersResult[index+1].push(layers[key]);
                }
            }
        });

        // // filter out layers that don't have the leaflet-geoman instance
        // layersResult = layersResult.filter(layer => !!layer.pm);
        //
        // // filter out everything thats leaflet-geoman specific temporary stuff
        // layersResult = layersResult.filter(layer => !layer._pmTempLayer);

        return layersResult;
    }

    $(document).ready(function() {
        let map = mapRef.current;
        if (map) {
            map.pm.addControls({
                drawCircleMarker: false,
                drawCircle: false,
                drawMarker: false,
                drawPolyline: false
            });

            let currentBaseLayer = floors[0].current;

            // on new drawing created
            map.on('pm:create', function (e) {
                onOpen(); // opens modal

                // remove layer if cancelled
                $("#cancelButton").on("click", function () {
                    e.layer.remove();
                    $("#mainForm").off("click");
                    $("#cancelbutton").off("click");
                });

                // add layer if form submitted
                $("#mainForm").on("submit", function (event) {
                    let ID = $("#idField").val();
                    let type = $("#typeField").val();
                    e.layer.LUProperties = {};
                    e.layer.LUProperties.id = ID;
                    e.layer.LUProperties.type = type;
                    currentBaseLayer.addLayer(e.layer);
                    $("#mainForm").off("submit");
                    $("#cancelButton").off("click");
                });

            // on floor change
            }).on('baselayerchange', function (e) {
                currentBaseLayer = e.layer;
            })
        }
    });

    //
    return (
        <div id="geoman-wrapper">
            <ChakraProvider>
                <Button m={1} onClick={printJSON} id="button-geoJSON">GeoJSON</Button>
                <Button m={1} id="button-clear">Clear printed data</Button>
                <Button m={1} id="button-draw">Refresh data and draw</Button>
                <Modal
                    initialFocusRef={idRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Telpas informācija</ModalHeader>
                        <ModalCloseButton />
                        <form id="mainForm">
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>ID</FormLabel>
                                <Input id="idField" ref={idRef} placeholder="Piemēram, 312"/>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Tips</FormLabel>
                                <Select id="typeField" placeholder="Izvēlies tipu">
                                    <option value="kabinets">Kabinets</option>
                                    <option value="laboratorija">Laboratorija</option>
                                    <option value="cits">Cits</option>
                                </Select>
                            </FormControl>
                        </ModalBody>

                            <ModalFooter>
                                <Button onClick={onClose} type="submit" colorScheme="blue" mr={3}>
                                    Saglabāt
                                </Button>
                                <Button onClick={onClose} id="cancelButton">Atcelt</Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>

            </ChakraProvider>
            <div id="bin-data-sent" className="bin-data"/>
            <div id="bin-data-received-content" className="bin-data"/>
            <div id="bin-data-received-metadata" className="bin-data"/>
            <MapContainer whenCreated={(mapInstance)=> { mapRef.current = mapInstance }} bounds={props.bounds} center={props.center} maxZoom={1} minZoom={-5} doubleClickZoom={false} crs={CRS.Simple}>
                <LayersControl position="topright" collapsed={false}>
                    {/* layers + layer control */}
                    <LayersControl.BaseLayer  checked name={props.theLayers[1]["name"]}>
                        <LayerGroup ref={floors[0]}>
                            <ImageOverlay bounds={props.bounds} url={props.pathToImg + props.theLayers[1]["imageName"]} />
                        </LayerGroup>
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name={props.theLayers[2]["name"]}>
                        <LayerGroup ref={floors[1]}>
                            <ImageOverlay bounds={props.bounds} url={props.pathToImg + props.theLayers[2]["imageName"]} />
                        </LayerGroup>
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name={props.theLayers[3]["name"]}>
                        <LayerGroup ref={floors[2]}>
                        <ImageOverlay bounds={props.bounds} url={props.pathToImg + props.theLayers[3]["imageName"]} />
                        </LayerGroup>
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name={props.theLayers[4]["name"]}>
                        <LayerGroup ref={floors[3]}>
                        <ImageOverlay bounds={props.bounds} url={props.pathToImg + props.theLayers[4]["imageName"]} />
                        </LayerGroup>
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name={props.theLayers[5]["name"]}>
                        <LayerGroup ref={floors[4]}>
                        <ImageOverlay bounds={props.bounds} url={props.pathToImg + props.theLayers[5]["imageName"]} />
                        </LayerGroup>
                    </LayersControl.BaseLayer>
                </LayersControl>
            </MapContainer>
        </div>
    )
}

export default GeomanPage;
