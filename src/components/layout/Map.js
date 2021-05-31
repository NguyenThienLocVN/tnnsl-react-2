import React from 'react';
import { useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoibmd1eWVudGhpZW54dWFubG9jMTIiLCJhIjoiY2tkMXQ2NnI1MGlvMTJybDVoc3hpNm5qZyJ9.rkUNvwFT6U3W2fJ4_M1p0A'; // Set your mapbox token here

export default class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lng: 103.9692398828125,
			lat: 21.529737201190642,
			zoom: 7
		};
		this.mapContainer = React.createRef();
	}

	componentDidMount() {
		const { lng, lat, zoom } = this.state;
		const map = new mapboxgl.Map({
		  container: this.mapContainer.current,
		  style: 'mapbox://styles/mapbox/streets-v11',
		  center: [lng, lat],
		  zoom: zoom
		});
	}
    
    render() {
		return (
			<div ref={this.mapContainer} className="map-container h-100" />
		);
    }
}