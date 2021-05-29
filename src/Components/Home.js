import React, {Component} from 'react'
import {ImageOverlay, LayersControl, MapContainer} from 'react-leaflet'
import {CRS} from 'leaflet';
import { withRouter } from "react-router";

class Home extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchData(id);
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
        return (
            <MapContainer bounds={this.props.bounds} center={this.props.center} minZoom={-5} doubleClickZoom={false} crs={CRS.Simple}>
                <LayersControl position="topright" collapsed={false}>
                    {/* layers + layer control */}
                    <LayersControl.BaseLayer ref={this.props.baseLayerRef} checked name={this.props.theLayers[1]["name"]}>
                        <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[1]["imageName"]} />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name={this.props.theLayers[2]["name"]}>
                        <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[2]["imageName"]} />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name={this.props.theLayers[3]["name"]}>
                        <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[3]["imageName"]} />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name={this.props.theLayers[4]["name"]}>
                        <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[4]["imageName"]} />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name={this.props.theLayers[5]["name"]}>
                        <ImageOverlay bounds={this.props.bounds} url={this.props.pathToImg + this.props.theLayers[5]["imageName"]} />
                    </LayersControl.BaseLayer>
                </LayersControl>
            </MapContainer>
        )
    }
}

export default withRouter(Home);
