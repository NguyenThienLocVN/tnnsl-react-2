import React from 'react';
import { MapContainer } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";

export default class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: [21.529737201190642, 103.9692398828125],
			zoom: 8,
		};
	}
	
    render() {
		
		return (
			<MapContainer className="h-100 w-100 position-relative" center={this.state.center} zoom={this.state.zoom}>
				<BasemapLayer name="Imagery" />
				<BasemapLayer name="ImageryLabels" />
			</MapContainer>
		);
    }
}