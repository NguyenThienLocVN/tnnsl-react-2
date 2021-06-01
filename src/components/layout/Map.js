import React from 'react';
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";

export default class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: [21.529737201190642, 103.9692398828125],
			zoom: 7
		};
	}
    
    render() {
		return (
			<MapContainer className="h-100 w-100 position-relative" center={this.state.center} zoom={this.state.zoom}>
				<LayersControl position="topright">
					<LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
						<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
						<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
						/>
					</LayersControl.BaseLayer>
				</LayersControl>
			</MapContainer>
		);
    }
}