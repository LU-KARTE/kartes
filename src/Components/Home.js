import React, {Component} from 'react'
import {ImageOverlay, LayersControl, MapContainer, GeoJSON, LayerGroup, Polygon} from 'react-leaflet'
import {CRS} from 'leaflet';
import { withRouter } from "react-router";
import $ from "jquery";
import {Center, Flex, Spacer, Text} from "@chakra-ui/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import * as ReactDOMServer from "react-dom/server";


const MAXFLOOR = 5;


const Popup = ({ feature }) => {
    let roomID = "";
    let roomType = "";
    let roomDescription = "";
    if (feature.properties) {
        if (feature.properties.roomID) {
            roomID = feature.properties.roomID;
        }

        if (feature.properties.roomType) {
            roomType = feature.properties.roomType;
        }

        if (feature.properties.roomDescription) {
            roomDescription = feature.properties.roomDescription;
        }
    }

    return (
        <div>
            <Text size="md">{`  ${
                roomID + ". " + roomType + " " + roomDescription
            }`}</Text>
        </div>
    );
};


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBaseLayerFloorNumber: 1,
            roomID: this.props.match.params.id,
            features: { "type": "FeatureCollection",
                "features": [
                    { "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [ [100.0, 0.0], [100, 100], [500, 100],
                                    [500, 0]  ]
                            ]

                        },
                        "properties": {
                            "prop0": "value0",
                            "prop1": {"this": "that"}
                        }
                    },
                    { "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [ [700.0, 200], [700, 500], [900, 100],
                                    [500, 200]  ]
                            ]

                        },
                        "properties": {
                            "prop0": "value0",
                            "prop1": {"this": "that"}
                        }
                    }
                ]
            }
        };
    }

    // group results (features from JSON) by floors
    groupFeaturesByFloor (features) {
        let groupedFeaturesGeoJSON = {};

        features.forEach(feature => {
            let floor = feature.properties.floor;

            if (!(floor in groupedFeaturesGeoJSON)) { // floor not yet initialized
                groupedFeaturesGeoJSON[floor] = {
                    "type": "FeatureCollection",
                    "features": []
                }
            }

            groupedFeaturesGeoJSON[floor]["features"].push(feature);
        })

        return groupedFeaturesGeoJSON;
    }

    // componentDidMount
    componentDidMount() {
        const id = this.state.roomID;
        this.fetchData(id);

        fetch("/kartes/data.json")
            .then(res => res.json())
            .then(
                (result) => {
                    let groupedFeaturesGeoJSON = this.groupFeaturesByFloor(result.features);
                    this.setState({features: groupedFeaturesGeoJSON});
                    this.setState(prevState => ({mapRerenderKey: prevState.mapRerenderKey + 1}))
                },
                (error) => {
                    alert("error fetching data....");
                }
            )

        $(document).ready(() => {
            $("#FloorDownIcon").on("click", () => {
                if (this.state.currentBaseLayerFloorNumber > 1) {
                    this.setState(prevstate => (
                        {"currentBaseLayerFloorNumber": prevstate["currentBaseLayerFloorNumber"] - 1}
                    ))
                }
            })

            $("#FloorUpIcon").on("click", () => {
                if (this.state.currentBaseLayerFloorNumber < MAXFLOOR)
                    this.setState(prevstate => (
                        {"currentBaseLayerFloorNumber": prevstate["currentBaseLayerFloorNumber"] + 1}
                    ))
            })
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.roomID !== this.props.match.params.id) {
            this.setState({roomID: this.props.match.params.id});
        }
        const id = this.state.roomID;
        this.fetchData(id);
    }

    fetchData = id => {
        if (!id) return;

        // alert("[check console] Search for room #" + id);

        fetch("/kartes/data.json")
            .then(res => res.json())
            .then(
                (result) => {
                    // just some console logs...
                    let foundFlag = false;
                    console.log("Fetched data:");
                    console.log(result);
                    result["features"].forEach ((feature) => {
                            if (feature["properties"]["roomID"] === id) {
                                console.log("The requested room was found:")
                                console.log(feature);
                                foundFlag = true;
                            }
                        }
                    )
                    if (!foundFlag)
                        console.log("Room was not found.");


                },
                (error) => {
                    // ... some error parsing
                }
            )
    };

    onEachFeature = (feature, layer) => {
        const popupContent = ReactDOMServer.renderToString(
            <Popup feature={feature} />
        );
        layer.bindPopup(popupContent);
    };

    render() {
        // for floor changes consts... better would be to include in JSX elements directly but somewhy not working.
        const floor1Checked = this.state.currentBaseLayerFloorNumber === 1;
        const floor2Checked = this.state.currentBaseLayerFloorNumber === 2;
        const floor3Checked = this.state.currentBaseLayerFloorNumber === 3;
        const floor4Checked = this.state.currentBaseLayerFloorNumber === 4;
        const floor5Checked = this.state.currentBaseLayerFloorNumber === 5;
        //
        //
        // const limeOptions = { color: 'lime' }
        //
        // const polygon = [
        //     [0, 0],
        //     [1000, 0],
        //     [1000, 1000],
        //     [0, 1000],
        // ]

        return (
            <>
                <Flex mr={4}>
                    {this.state.roomID ?
                        <Text pl={4}>Tiek meklēts #{this.state.roomID}</Text>
                        : ""
                    }
                    <Spacer />
                    <Center>
                        <ChevronLeftIcon id="FloorDownIcon" style={{"cursor": "pointer"}} w={8} h={8}/>
                        <Text fontSize={20}>{this.state.currentBaseLayerFloorNumber}. Stāvs</Text>
                        <ChevronRightIcon id="FloorUpIcon" style={{"cursor": "pointer"}} w={8} h={8}/>
                    </Center>
                </Flex>


                <MapContainer key={this.state.mapRerenderKey} bounds={this.props.bounds} center={this.props.center} minZoom={-5} doubleClickZoom={false} crs={CRS.Simple}>
                    <LayersControl position="topright" collapsed={false}>
                        {/* layers + layer control */}
                        <LayersControl.BaseLayer checked={floor1Checked} ref={this.props.baseLayerRef} name={this.props.theLayers[1]["name"]}>
                            <LayerGroup>

                                {/*<Polygon pathOptions={limeOptions} positions={polygon} />*/}
                                <GeoJSON style={{fillColor: "yellow", fillOpacity: 0.2}} data={this.state.features[1]} onEachFeature={this.onEachFeature}/>
                                <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[1]["imageName"]} />
                            </LayerGroup>
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked={floor2Checked} name={this.props.theLayers[2]["name"]}>
                            <LayerGroup>
                                <GeoJSON style={{fillColor: "yellow", fillOpacity: 0.2}} data={this.state.features[2]} onEachFeature={this.onEachFeature}/>
                                <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[2]["imageName"]} />
                            </LayerGroup>
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked={floor3Checked} name={this.props.theLayers[3]["name"]}>
                            <LayerGroup>
                                <GeoJSON style={{fillColor: "yellow", fillOpacity: 0.2}} data={this.state.features[3]} onEachFeature={this.onEachFeature}/>
                                <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[3]["imageName"]} />
                            </LayerGroup>
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked={floor4Checked} name={this.props.theLayers[4]["name"]}>
                            <LayerGroup>
                                <GeoJSON style={{fillColor: "yellow", fillOpacity: 0.2}} data={this.state.features[4]} onEachFeature={this.onEachFeature}/>
                                <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[4]["imageName"]} />
                            </LayerGroup>
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked={floor5Checked} name={this.props.theLayers[5]["name"]}>
                            <LayerGroup>
                                <GeoJSON style={{fillColor: "yellow", fillOpacity: 0.2}} data={this.state.features[5]} onEachFeature={this.onEachFeature}/>
                                <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[5]["imageName"]} />
                            </LayerGroup>
                        </LayersControl.BaseLayer>
                    </LayersControl>
                </MapContainer>
            </>
        )
    }
}

export default withRouter(Home);
