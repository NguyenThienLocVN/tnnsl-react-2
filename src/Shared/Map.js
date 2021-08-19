import React from 'react';
import { MapContainer, LayersControl, TileLayer, ZoomControl } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import ReactLeafletKml from 'react-leaflet-kml';

export default class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: [21.529737201190642, 103.9692398828125],
			zoom: 8,
			kml: null
		};

		this.mapRef = React.createRef();
	}

	componentDidMount(){
		fetch(window.location.origin + "/Placemark.kml")
        .then((res) => res.text())
        .then((kmlText) => {
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmlText, "text/xml");
            
            this.setState({ kml: kml });
        })
	}

    render() {
		return (
			<MapContainer className="h-100 w-100 position-relative" whenCreated={ mapInstance => { this.mapRef.current = mapInstance } } center={this.state.center} zoom={this.state.zoom} zoomControl={false}>
				<BasemapLayer name="ImageryLabels" />

				<LayersControl position="topleft">
					<LayersControl.BaseLayer checked name="Bản đồ vệ tinh">
						<TileLayer
						attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
						url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="Bản đồ địa lý">
						<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="Bản đồ địa hình">
						<TileLayer
						attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
						url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="Bản đồ xám">
						<TileLayer
						attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
						url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
						maxZoom = "16"
						/>
					</LayersControl.BaseLayer>
					
				</LayersControl>

				<ZoomControl position="bottomleft" />

				{this.state.kml && <ReactLeafletKml kml={this.state.kml} />}
			</MapContainer>
		);
    }
}