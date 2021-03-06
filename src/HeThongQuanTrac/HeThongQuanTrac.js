import React from "react";
import Header from "../Shared/Header";


import LeftBarNav from "./LeftBarNav";


import { MapContainer, Marker, Popup, LayersControl, TileLayer, ZoomControl } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import axios from "axios";
import configData from "../config.json";
import { trackPromise } from 'react-promise-tracker';
import ReactLeafletKml from 'react-leaflet-kml';
import { BlockOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { getToken, removeUserSession } from '../Shared/Auth';

import * as L from 'leaflet';

import yellowMarker from '../Shared/marker-yellow.png';
import greenMarker from '../Shared/marker-green.png';
import redMarker from '../Shared/marker-red.png';
import grayMarker from '../Shared/marker-gray.png';
import blueMarker from '../Shared/marker-blue.png';
import pinkMarker from '../Shared/marker-pink.png';
import orangeMarker from '../Shared/marker-orange.png';
import brownMarker from '../Shared/marker-brown.png';

import triangleBrown from '../Shared/triangle-brown.png';
import triangleYellow from '../Shared/triangle-yellow.png';

import arrowBlue from '../Shared/down-arrow-blue.png';
import arrowDeepBlue from '../Shared/down-arrow-deepblue.png';
import arrowGray from '../Shared/down-arrow-gray.png';

// Icon nuoc mat
const yellowIcon = L.icon({
    iconUrl: yellowMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'yellowMarker',
});

const greenIcon = L.icon({
    iconUrl: greenMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'greenMarker',
});

const redIcon = L.icon({
    iconUrl: redMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'redMarker',
});

const grayIcon = L.icon({
    iconUrl: grayMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'grayMarker',
});

const blueIcon = L.icon({
    iconUrl: blueMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'blueMarker',
});

const pinkIcon = L.icon({
    iconUrl: pinkMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'pinkMarker',
});

const orangeIcon = L.icon({
    iconUrl: orangeMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'orangeMarker',
});

const brownIcon = L.icon({
    iconUrl: brownMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'brownMarker',
});


// Icon nuoc xa thai
const triangleBrownIcon = L.icon({
    iconUrl: triangleBrown,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'triangleBrown',
});

const triangleYellowIcon = L.icon({
    iconUrl: triangleYellow,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'triangleYellow',
});

//Icon nuoc duoi dat
const arrowBlueIcon = L.icon({
    iconUrl: arrowBlue,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'arrowBlue',
});

const arrowDeepBlueIcon = L.icon({
    iconUrl: arrowDeepBlue,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'arrowDeepBlue',
});

const arrowGrayIcon = L.icon({
    iconUrl: arrowGray,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'arrowGray',
});

export default class HeThongQuanTrac extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            center: [21.529737201190642, 103.9692398828125],
			zoom: 8,
            pagename: this.props.match.params.pagename,
			contructionInfoForMap: [],
            dataSource: [],
            pagination: {},
            loading: false,
            showMapLayer: false,
            showMapLegend: true,
            kml: null,
            yellowMarker: true,
            greenMarker: true,
            redMarker: true,
            grayMarker: true,
            triangleBrown: true,
            triangleYellow: true,

            arrowBlue: true,
            arrowDeepBlue: true,
            arrowGray: true,

            blueMarker: true,
            pinkMarker: true,
            orangeMarker: true,
            brownMarker: true
        }

        this.mapRef = React.createRef();
    }
    
    componentDidMount(){
        document.title = "H??? th???ng quan tr???c | Gi??m s??t t??i nguy??n n?????c S??n La";

        fetch(window.location.origin + "/Placemark.kml")
        .then((res) => res.text())
        .then((kmlText) => {
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmlText, "text/xml");
            
            this.setState({ kml: kml });
        })

        this.fetch(this.state.pagination, 'all');
    }

    fetch = (params = {}, filter) => {
        this.setState({ loading: true });
        trackPromise(
            axios
            .get(configData.API_URL + "/he-thong-quan-trac/loc-dia-diem/"+filter, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        loading: false,
                        dataSource: response.data,
                        pagination: {
                            ...params.pagination,
                            total: response.data.length
                        },
                    });
                }
            })
            .catch((error) => {
                if(error.response.status === 401)
                {
                    removeUserSession();
                    window.location.reload();
                }
                this.setState({msg: error.response})
            })
        )
        
    };

    render(){
        return(
            <div className="p-0">
                <Header headTitle="H??? TH???NG QUAN TR???C" previousLink="/" showHeadImage={true} layout37={true} />
                <main className="row m-0 p-0">
                    <div className="col-12 col-lg-3 px-0 menu-home">
                        <LeftBarNav />
                    </div>
                    <div className="col-12 col-lg-9 map-container px-md-0 position-relative">
                        <select defaultValue="Imagery" id="switch-basemaps" className="position-absolute" onChange={this.changeBasemap}>
                            <option value="Imagery">B???n ????? v??? tinh</option>
                            <option value="Topographic">B???n ????? ?????a h??nh</option>
                            <option value="Streets">B???n ????? ???????ng</option>
                            <option value="NationalGeographic">B???n ????? ?????a l??</option>
                            <option value="Gray">B???n ????? x??m</option>
                        </select>
                        <MapContainer className="col-12 h-100 w-100" whenCreated={ mapInstance => { this.mapRef.current = mapInstance } } center={this.state.center} zoom={this.state.zoom} zoomControl={false}>
                            <BasemapLayer name="ImageryLabels" />

                            <LayersControl position="topleft">
                                <LayersControl.BaseLayer checked name="B???n ????? v??? tinh">
                                    <TileLayer
                                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                    />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="B???n ????? ?????a l??">
                                    <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="B???n ????? ?????a h??nh">
                                    <TileLayer
                                    attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                                    />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="B???n ????? x??m">
                                    <TileLayer
                                    attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                                    maxZoom = "16"
                                    />
                                </LayersControl.BaseLayer>
                            </LayersControl>

                            <ZoomControl position="bottomleft" />

                            {/* ========================= NUOC THAI ========================= */}
                            {/* Diem Q xa thai*/}
                            {this.state.triangleYellow && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "q-xa-thai" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={triangleYellowIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">Q x??? th???i - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }

                            {/* Diem chat luong xa thai*/}
                            {this.state.triangleBrown && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "cln-thai" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={triangleBrownIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">Ch???t l?????ng x??? th???i - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }
                            {/* ========================= NUOC THAI ========================= */}


                            {/* ========================= NUOC DUOI DAT ========================= */}
                            {/* Diem luu luong khai thac nuoc duoi dat*/}
                            {this.state.arrowBlue && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "luu-luong-ktndd" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={arrowBlueIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">L??u l?????ng khai th??c n?????c d?????i ?????t - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }

                            {/* Diem muc nuoc trong gieng khai thac*/}
                            {this.state.arrowDeepBlue && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "muc-nuoc-trong-gieng-kt" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={arrowDeepBlueIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">M???c n?????c trong gi???ng khai th??c - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }

                            {/* Diem chat luong nuoc trong qua trinh khai thac*/}
                            {this.state.arrowGray && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "cln-trong-qtkt-ndd" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={arrowGrayIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">Ch???t l?????ng n?????c trong qu?? tr??nh khai th??c - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }
                            {/* ========================= NUOC DUOI DAT ========================= */}


                            {/* ========================= NUOC MAT ========================= */}
                            {/* Diem mua*/}
                            {this.state.blueMarker && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "mua" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={blueIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">M??a - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }

                            {/* Diem muc nuoc ho*/}
                            {this.state.pinkMarker && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "muc-nuoc-ho" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={pinkIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">M???c n?????c h??? - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }

                            {/* Diem q den ho*/}
                            {this.state.grayMarker && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "q-den-ho" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={grayIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">Q ?????n h??? - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }

                            {/* Diem q xa qua nha may*/}
                            {this.state.greenMarker && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "q-xa-qua-nha-may" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={greenIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">Q x??? qua nh?? m??y - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }

                            {/* Diem q xa qua tran*/}
                            {this.state.orangeMarker && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "q-xa-qua-tran" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={orangeIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">Q x??? qua tr??n - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }

                            {/* Diem q khai thac*/}
                            {this.state.brownMarker && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "q-khai-thac" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={brownIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">Q khai th??c - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }

                            {/* Diem q xa toi thieu*/}
                            {this.state.redMarker && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "q-xa-toi-thieu" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={redIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">Q khai th??c - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }

                            {/* Diem q xa toi thieu*/}
                            {this.state.yellowMarker && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "cln-trong-qtkt-nm" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={yellowIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">Q khai th??c - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }
                            {/* ========================= NUOC MAT ========================= */}
                            

                            {this.state.kml && <ReactLeafletKml kml={this.state.kml} />}

                            <button className="btn btn-sm position-absolute btn-map-layer bg-white d-flex" title="C??c l???p b???n ????? c??ng tr??nh" onClick={() => this.setState({showMapLayer: !this.state.showMapLayer, showMapLegend: false})}><BlockOutlined /></button>
                            {this.state.showMapLayer &&
                                <div className="map-layer position-absolute bg-white">
                                    <p className="m-0 p-1 text-center bg-header-bar text-white"><span>C??C L???P B???N ?????</span></p>
                                    <div className="legend-title-secondary pt-2">
                                        <span className="bg-secondary text-white d-inline-block pt-1 px-2">N?????C M???T</span>
                                    </div>
                                    <ul className="p-2 m-0">
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.blueMarker} onChange={() => this.setState({blueMarker: !this.state.blueMarker})} />&nbsp;<span className="font-weight-bold">M??a</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={blueMarker} /> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.pinkMarker} onChange={() => this.setState({pinkMarker: !this.state.pinkMarker})} />&nbsp;<span className="font-weight-bold">M???c n?????c h???</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={pinkMarker} /> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.grayMarker} onChange={() => this.setState({grayMarker: !this.state.grayMarker})} />&nbsp;<span className="font-weight-bold">Q ?????n h???</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={grayMarker} /> </li>
                                        <li className="d-flex mb-1 align-items-center"><Checkbox defaultChecked={this.state.greenMarker} onChange={() => this.setState({greenMarker: !this.state.greenMarker})} />&nbsp;<span className="font-weight-bold">Q x??? qua nh?? m??y</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={greenMarker} /> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.orangeMarker} onChange={() => this.setState({orangeMarker: !this.state.orangeMarker})} />&nbsp;<span className="font-weight-bold">Q x??? qua tr??n</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={orangeMarker} /> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.brownMarker} onChange={() => this.setState({brownMarker: !this.state.brownMarker})} />&nbsp;<span className="font-weight-bold">Q khai th??c</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={brownMarker} /> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.redMarker} onChange={() => this.setState({redMarker: !this.state.redMarker})} />&nbsp;<span className="font-weight-bold">Q x??? t???i thi???u</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={redMarker} /> </li>
                                        <li className="d-flex mb-1 align-items-center"><Checkbox defaultChecked={this.state.yellowMarker} onChange={() => this.setState({yellowMarker: !this.state.yellowMarker})} />&nbsp;<span className="font-weight-bold">Ch???t l?????ng n?????c</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={yellowMarker} /> </li>
                                    </ul>

                                    <div className="legend-title-secondary pt-2">
                                        <span className="bg-secondary text-white d-inline-block pt-1 px-2">N?????C D?????I ?????T</span>
                                    </div>
                                    <ul className="p-2 m-0">
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.arrowBlue} onChange={() => this.setState({arrowBlue: !this.state.arrowBlue})} />&nbsp;<span className="font-weight-bold">L??u l?????ng khai th??c NDD</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={arrowBlue} /> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.arrowDeepBlue} onChange={() => this.setState({arrowDeepBlue: !this.state.arrowDeepBlue})} />&nbsp;<span className="font-weight-bold">M???c n?????c trong gi???ng</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={arrowDeepBlue} /> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.arrowGray} onChange={() => this.setState({arrowGray: !this.state.arrowGray})} />&nbsp;<span className="font-weight-bold">Ch???t l?????ng n?????c</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={arrowGray} /> </li>
                                    </ul>

                                    <div className="legend-title-secondary pt-2">
                                        <span className="bg-secondary text-white d-inline-block pt-1 px-2">X??? TH???I</span>
                                    </div>
                                    <ul className="p-2 m-0">
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.triangleYellow} onChange={() => this.setState({triangleYellow: !this.state.triangleYellow})} />&nbsp;<span className="font-weight-bold">Q x??? th???i</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={triangleYellow} /></li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.triangleBrown} onChange={() => this.setState({triangleBrown: !this.state.triangleBrown})} />&nbsp;<span className="font-weight-bold">Ch???t l?????ng n?????c th???i</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={triangleBrown} /></li>
                                    </ul>
                                </div>
                            }

                            <button className="btn btn-sm position-absolute btn-map-legend bg-white d-flex" title="Ch?? gi???i" onClick={() => this.setState({showMapLegend: !this.state.showMapLegend, showMapLayer: false})}><QuestionCircleOutlined /></button>
                            {this.state.showMapLegend &&
                                <div className="map-legend position-absolute bg-white">
                                    <p className="m-0 p-1 text-center bg-header-bar text-white"><span>CH?? GI???I</span></p>
                                    <div className="legend-title-secondary pt-2">
                                        <span className="bg-secondary text-white d-inline-block pt-1 px-2">N?????C M???T</span>
                                    </div>
                                    <ul className="p-2 m-0">
                                        <li className="d-flex mb-1 align-items-center"><img alt="marker" style={{width: "16px"}} src={blueMarker} />&nbsp;<span className="font-weight-bold">M??a</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img alt="marker" style={{width: "16px"}} src={pinkMarker} />&nbsp;<span className="font-weight-bold">M???c n?????c h???</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img alt="marker" style={{width: "16px"}} src={grayMarker} />&nbsp;<span className="font-weight-bold">Q ?????n h???</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img alt="marker" style={{width: "16px"}} src={greenMarker} />&nbsp;<span className="font-weight-bold">Q x??? qua nh?? m??y</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img alt="marker" style={{width: "16px"}} src={orangeMarker} />&nbsp;<span className="font-weight-bold">Q x??? qua tr??n</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img alt="marker" style={{width: "16px"}} src={brownMarker} />&nbsp;<span className="font-weight-bold">Q khai th??c</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img alt="marker" style={{width: "16px"}} src={redMarker} />&nbsp;<span className="font-weight-bold">Q x??? t???i thi???u</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img alt="marker" style={{width: "16px"}} src={yellowMarker} />&nbsp;<span className="font-weight-bold">Ch???t l?????ng n?????c</span> </li>
                                    </ul> 

                                    <div className="legend-title-secondary pt-2">
                                        <span className="bg-secondary text-white d-inline-block pt-1 px-2">N?????C D?????I ?????T</span>
                                    </div>
                                    <ul className="p-2 m-0">
                                        <li className="d-flex mb-2 align-items-center"><img alt="marker" style={{width: "18px"}} src={arrowBlue} />&nbsp;<span className="font-weight-bold">L??u l?????ng khai th??c NDD</span> </li>
                                        <li className="d-flex mb-2 align-items-center"><img alt="marker" style={{width: "18px"}} src={arrowDeepBlue} />&nbsp;<span className="font-weight-bold">M???c n?????c trong gi???ng</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img alt="marker" style={{width: "18px"}} src={arrowGray} />&nbsp;<span className="font-weight-bold">Ch???t l?????ng n?????c</span> </li>
                                    </ul>

                                    <div className="legend-title-secondary pt-2">
                                        <span className="bg-secondary text-white d-inline-block pt-1 px-2">X??? TH???I</span>
                                    </div>
                                    <ul className="p-2 m-0">
                                        <li className="d-flex mb-1 align-items-center"><img alt="marker" style={{width: "18px"}} src={triangleYellow} />&nbsp;<span className="font-weight-bold">Q x??? th???i</span> </li>
                                        <li className="d-flex mb-2 align-items-center"><img alt="marker" style={{width: "18px"}} src={triangleBrown} />&nbsp;<span className="font-weight-bold">Ch???t l?????ng n?????c th???i</span> </li>
                                    </ul>
                                </div>
                            }
                        </MapContainer>
                    </div>
                </main>
            </div>
        )
    }

}