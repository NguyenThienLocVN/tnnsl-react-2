import React from 'react';
import { Link } from 'react-router-dom';
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
			mainHydroelectricInfo: [],
			itemHydroelectricInfo: [],
			idConstruct: this.props.idConstruct,
			subpagename: this.props.subpagename
		};
	}
	
	componentDidMount(){
		trackPromise(
			axios
				.get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/thong-tin-ban-do-thuy-dien")
				.then((response) => {
					if(response.status === 200)
					{	
						this.setState({mainHydroelectricInfo: response.data});
					}
				})
				.catch((error) => {
					console.log(error);
				})
			);

		trackPromise(
			axios
				.get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/giay-phep-thuy-dien/"+this.state.idConstruct)
				.then((response) => {
					if(response.status === 200)
					{
						
						this.setState({itemHydroelectricInfo: response.data.hang_muc_ct})
					}
				})
				.catch((error) => {
					this.setState({msg: error.response})
				})
			)
	}

	formatDate(date) {
        var date_format = new Date(date);
        var d = date_format.getDate();
        var m = date_format.getMonth();
        var y = date_format.getFullYear();
        return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
    }
	
    render() {
		const {mainHydroelectricInfo, itemHydroelectricInfo} = this.state;
		
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

					{(this.props.subpagename === 'thong-tin-cong-trinh') ?
						itemHydroelectricInfo.map((marker, key) => (
							<Marker position={[marker.longitude, marker.latitude]} key={key} >
								<Popup>
									<div>
										<h5 class="card-title fw-bold font-13">Công trình: {marker.congtrinh_ten}</h5>	
										<div class="d-flex col-12 p-1">
											<span class="col-6 py-1">Tọa độ X:</span>
											<span class="col-6 py-1">{marker.x}</span>
										</div>
										<div class="d-flex col-12 p-1">
											<span class="col-6 py-1">Tọa độ Y:</span>
											<span class="col-6 py-1">{marker.y}</span>
										</div>
									</div>
								</Popup>
							</Marker>
						)) : ""
					}

					{(this.props.pagename === "thuy-dien" && this.props.subpagename === "") ?
						mainHydroelectricInfo.map((marker, key) => (
							<Marker position={[marker["0"].longitude, marker["0"].latitude]} key={key} >
								<Popup>
								<div>
									<h5 class="card-title fw-bold font-13">{marker["0"].tenhangmuc+" - "+marker.congtrinh_ten}</h5>
									<table class="table table-striped table-hover">
										<tbody>
											<tr class="col-12 d-flex p-0">
												<td class="col-4 py-1">Tọa độ X</td>
												<td class="col-8 py-1">{marker["0"].x}</td>
											</tr>
											<tr class="col-12 d-flex p-0">
												<td class="col-4 py-1">Tọa độ Y</td>
												<td class="col-8 py-1">{marker["0"].y}</td>
											</tr>
											<tr class="col-12 d-flex p-0">
												<td class="col-4 py-1">Địa điểm</td>
												<td class="col-8 py-1">{marker.congtrinh_diadiem}</td>
											</tr>
											<tr class="col-12 d-flex p-0">
												<td class="col-4 py-1">Số GP</td>
												<td class="col-8 py-1">{marker.gp_sogiayphep}</td>
											</tr>
											<tr class="col-12 d-flex p-0">
												<td class="col-4 py-1">Ngày cấp</td>
												<td class="col-8 py-1">{this.formatDate(marker.gp_thoigiancapphep)}</td>
											</tr>
											<tr class="col-12 d-flex p-0">
												<td class="col-4 py-1 font-11">Cấp thẩm quyền</td>
												<td class="col-8 py-1">{marker.gp_donvi_thamquyen}</td>
											</tr>
											<tr class="col-12 d-flex p-0">
												<td class="col-4 py-1">Q <sub>xả TT</sub>  gp</td>
												<td class="col-8 py-1">{marker.luuluong_xadongchay_toithieu} m<sup>3</sup>/s</td>
											</tr>
											<tr class="col-12 d-flex p-0">
												<td class="col-4 py-1">Q <sub>xả TT</sub>  thực tế</td>
												<td class="col-8 py-1"></td>
											</tr>
										</tbody>
									</table>
									<Link to={'/quan-ly-cap-phep/nuoc-mat/thuy-dien/xem-thong-tin-chung/'+marker.id} class="card-link">Chi tiết công trình</Link>
								</div>
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