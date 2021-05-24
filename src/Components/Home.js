import {React, Component} from 'react'
import {ImageOverlay, LayersControl, MapContainer} from 'react-leaflet'
import {CRS} from 'leaflet';

class Home extends Component {
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
                </LayersControl>            </MapContainer>
        )
    }
}

export default Home;
