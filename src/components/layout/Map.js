import React from 'react';
import { MapContainer } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import * as esri from 'esri-leaflet';

export default class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: [21.529737201190642, 103.9692398828125],
			zoom: 8,
		};

		this.mapRef = React.createRef();
	}
	
	changeBasemap = (event) => {
        // Change basemap follow select option
        var basemap = event.target.value
        var map = this.mapRef.current;

        map.eachLayer(function (layer) {
            map.removeLayer(layer);
        });
    
        var layer = esri.basemapLayer(basemap);
    
        map.addLayer(layer);
    
        if (basemap === 'ShadedRelief'
        || basemap === 'Oceans'
        || basemap === 'Gray'
        ) {
            var layerLabels = esri.basemapLayer(basemap + 'Labels');
            map.addLayer(layerLabels);
        } else if (basemap === 'Imagery') {
            var imagery = esri.basemapLayer('Imagery');
            var imageryLabels = esri.basemapLayer('ImageryLabels');
            map.addLayer(imagery);
            map.addLayer(imageryLabels);
        }
	}

    render() {
		return (
			<>
			<select defaultValue="Imagery" id="switch-basemaps" className="position-absolute" onChange={this.changeBasemap}>
				<option value="Imagery">Bản đồ vệ tinh</option>
				<option value="Topographic">Bản đồ địa hình</option>
				<option value="Streets">Bản đồ đường</option>
				<option value="NationalGeographic">Bản đồ địa lý</option>
				<option value="Gray">Bản đồ xám</option>
			</select>
			<MapContainer className="h-100 w-100 position-relative" whenCreated={ mapInstance => { this.mapRef.current = mapInstance } } center={this.state.center} zoom={this.state.zoom}>
				<BasemapLayer name="Imagery" />
				<BasemapLayer name="ImageryLabels" />
			</MapContainer>
			</>
		);
    }
}