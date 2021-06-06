import React, {Component} from 'react'
import {ImageOverlay, LayersControl, MapContainer} from 'react-leaflet'
import {CRS} from 'leaflet';
import { withRouter } from "react-router";
import $ from "jquery";
import {Center, Flex, Spacer, Text} from "@chakra-ui/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";


const MAXFLOOR = 5;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBaseLayerFloorNumber: 1
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchData(id);


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
        const id = this.props.match.params.id;
        this.fetchData(id);
    }

    fetchData = id => {
        if (!id) return;

        alert("[check console] Search for room #" + id);

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

    render() {
        // for floor changes consts... better would be to include in JSX elements directly but somewhy not working.
        const floor1Checked = this.state.currentBaseLayerFloorNumber === 1;
        const floor2Checked = this.state.currentBaseLayerFloorNumber === 2;
        const floor3Checked = this.state.currentBaseLayerFloorNumber === 3;
        const floor4Checked = this.state.currentBaseLayerFloorNumber === 4;
        const floor5Checked = this.state.currentBaseLayerFloorNumber === 5;

        return (
            <>
                <Flex mr={4}>
                    <Spacer />
                    <Center>
                        <ChevronLeftIcon id="FloorDownIcon" style={{"cursor": "pointer"}} w={8} h={8}/>
                        <Text fontSize={20}>{this.state.currentBaseLayerFloorNumber}. Stāvs</Text>
                        <ChevronRightIcon id="FloorUpIcon" style={{"cursor": "pointer"}} w={8} h={8}/>
                    </Center>
                </Flex>

                <MapContainer bounds={this.props.bounds} center={this.props.center} minZoom={-5} doubleClickZoom={false} crs={CRS.Simple}>
                    <LayersControl position="topright" collapsed={false}>
                        {/* layers + layer control */}
                        <LayersControl.BaseLayer checked={floor1Checked} ref={this.props.baseLayerRef} name={this.props.theLayers[1]["name"]}>
                            <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[1]["imageName"]} />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked={floor2Checked} name={this.props.theLayers[2]["name"]}>
                            <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[2]["imageName"]} />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked={floor3Checked} name={this.props.theLayers[3]["name"]}>
                            <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[3]["imageName"]} />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked={floor4Checked} name={this.props.theLayers[4]["name"]}>
                            <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[4]["imageName"]} />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer checked={floor5Checked} name={this.props.theLayers[5]["name"]}>
                            <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[5]["imageName"]} />
                        </LayersControl.BaseLayer>
                    </LayersControl>
                </MapContainer>
            </>
        )
    }
}

export default withRouter(Home);
