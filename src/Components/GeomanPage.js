import React, {useState} from 'react'
import $ from 'jquery'
import {
    Button,
    Flex, FormControl, FormHelperText, FormLabel, Input,
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
    ImageOverlay
} from "react-leaflet";
import {CRS} from "leaflet";

import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import Search from "./Search";
let fileDownload = require('js-file-download');

function GeomanPage(props) {

    const mapRef = React.useRef();
    const floors = [React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef()];

    const { isOpen, onOpen, onClose } = useDisclosure({
        onClose() { $("#cancelButton").click(); }
    }) // for modal
    const idRef = React.useRef() // for modal
    const [JSONData, LoadJSONData] = useState({})


    function printJSON() {
        let map = mapRef.current;
        let rawLayers = null;
        let processedLayers = null;
        if (map) {
            rawLayers = findLayers();
            processedLayers = processLayers(rawLayers);
        }

        $("#bin-data-sent").html("<pre>" + JSON.stringify(processedLayers, undefined, 2) + "</pre>");
        // fileDownload( JSON.stringify(processedLayers, undefined, 2), 'data.json');
    }

    function processLayers(layers) {

        let map = mapRef.current;

        if (map) {

            let result = {
                "type": "FeatureCollection",
                "features": []
            };

            for (let key in layers) {
                let target = result.features;
                layers[key].forEach((el, index) => {
                    let shape = el.pm._shape;

                    // get coordinates
                    let coordinates = [];

                    el.getLatLngs()[0].forEach((el, index) => {
                        coordinates.push([el.lng, el.lat]);
                    });

                    // push clean geoJSON data object
                    target.push({
                        // "type": shape,
                        "type": "Feature",
                        "id": key.toString() + index.toString(),
                        "properties": {
                            "floor": key,
                            "roomID": el.LUProperties.id,
                            "roomType": el.LUProperties.type,
                            "extraInfo": el.LUProperties.extraInfo
                        },
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [coordinates]
                        }
                    })
                });
            }

            return result;
        } else {
            alert("there was error processing map...");
            return "";
        }
    }

    // filter drawed layers grouped by floor
    function findLayers() {
        let layersResult = {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": []}; // init empty

        // go over each floor and add each floor's drawings
        floors.forEach((el, index) => {
            let layers = el.current._layers; // this is a little sketchy to use _layers variable
            for (let key in layers) {
                // if (
                //     layers[key] instanceof Polyline || // only if its polyline or polygon
                //     layers[key] instanceof Polygon
                // ) {
                if ("LUProperties" in layers[key])
                    layersResult[index+1].push(layers[key]);
                // }
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
        
        $("#button-clear").on("click", () => {
            $("#bin-data-sent").html("");
            $("#bin-data-received-content").html("");
        });

        $("#button-receive-data").on("click", () => {
            fetch("/kartes/data.json")
                .then(res => res.json())
                .then(
                    (result) => {
                        LoadJSONData(result);
                        $("#bin-data-received-content").html(JSON.stringify(result));
                    },
                    (error) => {
                        // ... some error parsing
                    }
                )
        })

        if (map) {
            let currentBaseLayer = floors[0].current;

            map.pm.addControls({
                drawCircleMarker: false,
                drawCircle: false,
                drawMarker: false,
                drawPolyline: false
            });

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
                    let extraInfo = $("#extraInfoField").val();
                    e.layer.LUProperties = {};
                    e.layer.LUProperties.id = ID;
                    e.layer.LUProperties.type = type;
                    e.layer.LUProperties.extraInfo = extraInfo;
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
            <Flex p={4}>
                {/*<Box>*/}
                {/*<Image h={50} src={pathToImg + "logo.png"}  fallbackSrc="https://via.placeholder.com/150" />*/}
                {/*</Box>*/}
                {/*<Spacer />*/}

                <Search />
            </Flex>
            <Button m={1} onClick={printJSON} id="button-geoJSON">Generate JSON</Button>
            <Button m={1} id="button-receive-data">Receive data</Button>
            <Button m={1} id="button-clear">Clear data</Button>

            <Modal
                initialFocusRef={idRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Pievienot jaunu telpu</ModalHeader>
                    <ModalCloseButton />
                    <form id="mainForm">
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>ID*</FormLabel>
                                <Input type="number"  id="idField" ref={idRef} placeholder="Piemēram, 312"/>
                            </FormControl>


                            <FormControl my={5}>
                                <FormLabel>Tips*</FormLabel>
                                <Select id="typeField" placeholder="Izvēlies tipu">
                                    <option value="kabinets">Kabinets</option>
                                    <option value="laboratorija">Laboratorija</option>
                                    <option value="auditorija">Auditorija</option>
                                    <option value="tualete">Tualetes</option>
                                    <option value="telpa">Cita telpa</option>
                                </Select>
                            </FormControl>


                            <FormControl>
                                <FormLabel>Telpas nosaukums</FormLabel>
                                <Input id="extraInfoField" placeholder="Piemēram, Studentu pašpārvaldes telpa"/>
                                <FormHelperText>Šo jāieraksta tikai tad, ja telpai ir īpašs nosaukums. Tas aizstāj ID un tipu. </FormHelperText>
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

            <div id="bin-data-sent" className="bin-data"/>
            <div id="bin-data-received-content" className="bin-data"/>
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
                    <LayersControl.BaseLayer name={props.theLayers[6]["name"]}>
                        <LayerGroup ref={floors[5]}>
                            <ImageOverlay bounds={props.bounds} url={props.pathToImg + props.theLayers[6]["imageName"]} />
                        </LayerGroup>
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name={props.theLayers[7]["name"]}>
                        <LayerGroup ref={floors[6]}>
                            <ImageOverlay bounds={props.bounds} url={props.pathToImg + props.theLayers[7]["imageName"]} />
                        </LayerGroup>
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name={props.theLayers[8]["name"]}>
                        <LayerGroup ref={floors[7]}>
                            <ImageOverlay bounds={props.bounds} url={props.pathToImg + props.theLayers[8]["imageName"]} />
                        </LayerGroup>
                    </LayersControl.BaseLayer>
                </LayersControl>
            </MapContainer>
        </div>
    )
}

export default GeomanPage;
