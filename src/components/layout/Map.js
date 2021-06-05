import React from 'react';
import { MapContainer, TileLayer, LayersControl, Marker, Popup } from "react-leaflet";
import L from 'leaflet';

import icon from '../common/marker.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: [21.529737201190642, 103.9692398828125],
			zoom: 8,
			markers: [
				[20.8538, 105.8276],
				[21.6212, 104.1707],
				[21.2070, 104.4999],
				[20.9073, 105.5045],
				[21.4613, 105.179111],
				[21.4562, 105.173352],
				[21.3290, 104.3357],
				[21.4127, 104.9814],
				[21.0213, 103.660 ]
			]
		};
	}
    
    render() {
		return (
			<MapContainer className="h-100 w-100 position-relative" center={this.state.center} zoom={this.state.zoom}>
				<LayersControl position="topright">
					<LayersControl.BaseLayer checked name="Bản đồ chính">
						<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="Bản đồ xám">
						<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="Bản đồ đường">
						<TileLayer
						attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
						/>
					</LayersControl.BaseLayer>

					{(this.props.pagename === "thuy-dien") ?
						this.state.markers.map((marker, key) => (
							<Marker
								position={marker}
								key={key}
							>
								<Popup>A</Popup>
							</Marker>
							))
						: ""
					}
				</LayersControl>

				
			</MapContainer>
		);
    }
}