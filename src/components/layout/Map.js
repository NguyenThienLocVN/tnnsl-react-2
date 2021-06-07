import React from 'react';
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import { MapContainer, TileLayer, LayersControl, Marker, Popup } from "react-leaflet";
import L from 'leaflet';

import configData from '../../config.json';
import icon from '../common/marker.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
	iconSize: [20, 35],
    iconAnchor: [10, 35]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: [21.529737201190642, 103.9692398828125],
			zoom: 8,
			mainHydroelectricLocations: []
		};
	}
	
	componentDidMount(){
		trackPromise(
			axios
				.get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/danh-sach-giay-phep-thuy-dien")
				.then((response) => {
					if(response.status === 200)
					{	
						var locations = [];
						response.data.map((e, k) => {
							e.hang_muc_ct.map((i) => {
								if(i.toa_do_chinh == 1)
								{
									locations.push(i);
								}
							})
						})
						this.setState({mainHydroelectricLocations: locations})
					}
				})
				.catch((error) => {
					console.log(error);
				})
			);
	}
	
    render() {
		const {mainHydroelectricLocations} = this.state;
		
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
						mainHydroelectricLocations.map((marker, key) => (
							<Marker position={[marker.longitude, marker.latitude]} key={key} >
								<Popup>
									<b>Nội dung</b>
								</Popup>
							</Marker>
							))
						: ""
					}
				</LayersControl>

				
			</MapContainer>
		);
    }
}