import React, {Component} from 'react'
import {ImageOverlay, LayersControl, MapContainer, GeoJSON, LayerGroup, Polygon} from 'react-leaflet'
import {CRS} from 'leaflet';
import { withRouter } from "react-router";
import $ from "jquery";
import {Box, Center, Flex, Heading, Spacer, Text} from "@chakra-ui/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import * as ReactDOMServer from "react-dom/server";
import Search from "./Search";


import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";


const MAXFLOOR = 5;


const Popup = ({ feature }) => {
    let roomID = "";
    let roomType = "";
    let roomDescription = "";
    let extraInfo = "";
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

        if (feature.properties.extraInfo) {
            extraInfo = feature.properties.extraInfo;
        }
    }

    return (
        <Text fontSize="20px"> {`  ${
            (extraInfo ? 
                extraInfo : 
                roomID + ". " + roomType)
            + " " + roomDescription
        }`}</Text>
    );
};


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBaseLayerFloorNumber: 1,
            searchingForRoomID: [],
            features: {},
            mapRerenderKey: 0,
        }
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
        if (this.props.match.params.floor) {
            this.setState({
                currentBaseLayerFloorNumber: parseInt(this.props.match.params.floor),
            })
        }

        if (this.props.match.params.id) {
            this.setState({
                searchingForRoomID: [parseInt(this.props.match.params.id)]
            })
        }


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
                    ));

                    this.setState(prevState => ({mapRerenderKey: prevState.mapRerenderKey + 1}));
                }
            })

            $("#FloorUpIcon").on("click", () => {
                if (this.state.currentBaseLayerFloorNumber < MAXFLOOR) {
                    this.setState(prevstate => (
                        {"currentBaseLayerFloorNumber": prevstate["currentBaseLayerFloorNumber"] + 1}
                    ));

                    this.setState(prevState => ({mapRerenderKey: prevState.mapRerenderKey + 1}));
                }
            })
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.searchingForRoomID.includes(parseInt(this.props.match.params.id)) && this.props.match.params.id && this.props.match.params.floor) {
            this.setState({searchingForRoomID: [parseInt(this.props.match.params.id)]});
            this.setState({currentBaseLayerFloorNumber: parseInt(this.props.match.params.floor)});
            this.setState(prevState => ({mapRerenderKey: prevState.mapRerenderKey + 1}));
        }
    }

    onEachFeature = (feature, layer) => {
        if (this.state.searchingForRoomID && this.state.searchingForRoomID.includes(parseInt(feature.properties.roomID))) {
            layer.setStyle({"fillOpacity": 0.5, fillColor: "red"});
        }

        const popupContent = ReactDOMServer.renderToString(
            <Popup feature={feature} />
        );
        layer.bindPopup(popupContent);
    };

    render() {
        // for floor changes consts... better would be to include in JSX elements directly but somewhy not working.
        const floor1Checked = this.state.currentBaseLayerFloorNumber == 1;
        const floor2Checked = this.state.currentBaseLayerFloorNumber == 2;
        const floor3Checked = this.state.currentBaseLayerFloorNumber == 3;
        const floor4Checked = this.state.currentBaseLayerFloorNumber == 4;
        const floor5Checked = this.state.currentBaseLayerFloorNumber == 5;

        // let someStats = ;

        const initGeoJSONStyle = {
            fillOpacity: 0,
            fillColor: "transparent",
            color: "transparent",
            opacity: 1
        }

        return (
            <>
                <Flex p={4}>
                    {/*<Box>*/}
                    {/*<Image h={50} src={pathToImg + "logo.png"}  fallbackSrc="https://via.placeholder.com/150" />*/}
                    {/*</Box>*/}
                    {/*<Spacer />*/}
                    <Search resultsListDisplayStatusHandler={(setTo) => {
                        if (setTo === "block") {
                            $(".hideOnResultsListShow").css("display", "none");
                            $(".hideOnResultsListShowFlex").css("display", "none");
                        } else if (setTo === "none") {
                            $(".hideOnResultsListShow").css("display", "block");
                            $(".hideOnResultsListShowFlex").css("display", "flex");
                        }
                    }}/>
                </Flex>

                <Flex mr={4} className="hideOnResultsListShowFlex">
                    {this.state.searchingForRoomID.length > 0 ?
                        <Text pl={4}>Tiek meklēta
                            {
                                this.state.searchingForRoomID.map(
                                    item => (" " + item + ". telpa " )
                                )
                            }
                        </Text>
                        : ""
                    }
                    <Spacer />
                    <Center>
                        <ChevronLeftIcon id="FloorDownIcon" style={{"cursor": "pointer"}} w={8} h={8}/>
                        <Text fontSize={20}>{this.state.currentBaseLayerFloorNumber}. Stāvs</Text>
                        <ChevronRightIcon id="FloorUpIcon" style={{"cursor": "pointer"}} w={8} h={8}/>
                    </Center>
                </Flex>

                <MapContainer className="hideOnResultsListShow" key={this.state.mapRerenderKey} bounds={this.props.bounds} center={this.props.center} minZoom={-2} doubleClickZoom={false} crs={CRS.Simple}>
                    <LayersControl position="topright" collapsed={true}>
                        {/* layers + layer control */}
                        <LayersControl.BaseLayer checked={floor1Checked} ref={this.props.baseLayerRef} name={this.props.theLayers[1]["name"]}>
                            <LayerGroup>
                                <GeoJSON key={this.state.mapRerenderKey+1} style={initGeoJSONStyle} data={this.state.features[1]} onEachFeature={this.onEachFeature}/>
                                <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[1]["imageName"]} />
                            </LayerGroup>
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked={floor2Checked} name={this.props.theLayers[2]["name"]}>
                            <LayerGroup>
                                <GeoJSON key={this.state.mapRerenderKey+2} style={initGeoJSONStyle} data={this.state.features[2]} onEachFeature={this.onEachFeature}/>
                                <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[2]["imageName"]} />
                            </LayerGroup>
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked={floor3Checked} name={this.props.theLayers[3]["name"]}>
                            <LayerGroup>
                                <GeoJSON key={this.state.mapRerenderKey+3} style={initGeoJSONStyle} data={this.state.features[3]} onEachFeature={this.onEachFeature}/>
                                <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[3]["imageName"]} />
                            </LayerGroup>
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked={floor4Checked} name={this.props.theLayers[4]["name"]}>
                            <LayerGroup>
                                <GeoJSON key={this.state.mapRerenderKey+4} style={initGeoJSONStyle} data={this.state.features[4]} onEachFeature={this.onEachFeature}/>
                                <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[4]["imageName"]} />
                            </LayerGroup>
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked={floor5Checked} name={this.props.theLayers[5]["name"]}>
                            <LayerGroup>
                                <GeoJSON key={this.state.mapRerenderKey+5} style={initGeoJSONStyle} data={this.state.features[5]} onEachFeature={this.onEachFeature}/>
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
