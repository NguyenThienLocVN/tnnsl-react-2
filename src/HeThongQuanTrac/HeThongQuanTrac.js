import React from "react";
import Header from "../Shared/Header";
import { Link } from "react-router-dom";

import { MapContainer, Marker, Popup } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import axios from "axios";
import configData from "../config.json";
import { trackPromise } from 'react-promise-tracker';
import ReactLeafletKml from 'react-leaflet-kml';
import { BlockOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { getToken, removeUserSession } from '../Shared/Auth';

import * as L from 'leaflet';
import * as esri from 'esri-leaflet';

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

            yellowMarker: true,
            greenMarker: true,
            redMarker: true,
            grayMarker: true,
            blueMarker: true,
            pinkMarker: true,
            orangeMarker: true,
            brownMarker: true
        }

        this.mapRef = React.createRef();
    }
    
    componentDidMount(){
        document.title = "Hệ thống quan trắc | Giám sát tài nguyên nước Sơn La";

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

        // Add marker
        var markerStyle = {
            radius: 7,
            fillColor: "yellow",
            color: "yellow",
            weight: 1,
            opacity: 1,
            fillOpacity: 1,
            className: 'marker'
        };

        // Draw circle each point
        L.geoJSON(this.state.contructionInfoForMap, {
        onEachFeature: this.onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, markerStyle);
        }
        }).addTo(map);
    }

    // Click to show popup
    onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.hoverContent) {
            layer.on('click', function() { layer.bindPopup(feature.properties.detailContent, {closeOnClick: true, autoClose: false}).openPopup()});
            layer.on('mouseover', function() { layer.bindPopup(feature.properties.hoverContent).openPopup()});
        }
    }

    render(){
        return(
            <div className="p-0">
                <Header headTitle="HỆ THỐNG QUAN TRẮC" previousLink="/" showHeadImage={true} layout37={true} />
                <main className="row m-0 p-0">
                    <div className="col-12 col-lg-3 px-0 menu-home">
                        <div className="row m-0 p-0 surfacewater-usage">
                            <p className="exploit-surfacewater-title mb-2 p-2 fw-bold text-start font-12">NƯỚC MẶT</p>
                            <Link to="/he-thong-quan-trac/nuoc-mat/mua" className="col-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">MƯA</p>
                                    <div className="row mx-0">
                                        <div className="col-5 row mx-0 align-items-center">
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                            <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Trạm</p>
                                        </div>
                                        <div className="col-7">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_MUA.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_MUA" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/he-thong-quan-trac/nuoc-mat/ho-chua" className="col-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">MỰC NƯỚC HỒ</p>
                                    <div className="row mx-0">
                                        <div className="col-5 row mx-0 align-items-center">
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                            <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Hồ</p>
                                        </div>
                                        <div className="col-7">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_MUC_NUOC_HO.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_MUC_NUOC_HO" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/he-thong-quan-trac/nuoc-mat/luu-luong-den-ho" className="col-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">Q ĐẾN HỒ (m3/s)</p>
                                    <div className="row mx-0">
                                        <div className="col-5 row mx-0 align-items-center">
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                            <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Hồ</p>
                                        </div>
                                        <div className="col-7">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_QDEN.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_QDEN" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-qua-nha-may" className="col-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">Q XẢ QUA NHÀ MÁY (m3/s)</p>
                                    <div className="row mx-0">
                                        <div className="col-5 row mx-0 align-items-center">
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                            <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Hồ</p>
                                        </div>
                                        <div className="col-7">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_Q_XA_NHA_MAY.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_Q_XA_NHA_MAY" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-tran" className="col-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">Q XẢ QUA TRÀN (m3/s)</p>
                                    <div className="row mx-0">
                                        <div className="col-5 row mx-0 align-items-center">
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                            <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Hồ</p>
                                        </div>
                                        <div className="col-7">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_Q_XA_TRAN.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_Q_XA_TRAN" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="#" className="col-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">Q KHAI THÁC (m3/s)</p>
                                    <div className="row mx-0">
                                        <div className="col-5 row mx-0 align-items-center">
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                            <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Hồ</p>
                                        </div>
                                        <div className="col-7">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_KHAI_THAC.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_KHAI_THAC" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-toi-thieu" className="col-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">Q XẢ TỐI THIỂU (m3/s)</p>
                                    <div className="row mx-0">
                                        <div className="col-5 row mx-0 align-items-center">
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                            <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Hồ</p>
                                        </div>
                                        <div className="col-7">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_QTOITHIEU.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_QTOITHIEU" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="#" className="col-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">CHẤT LƯỢNG NƯỚC TRONG QUÁ TRÌNH KHAI THÁC (m3/s)</p>
                                    <div className="row mx-0">
                                        <div className="col-5 row mx-0 align-items-center">
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                            <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Hồ</p>
                                        </div>
                                        <div className="col-7">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_CLN_TRONG_QUA_TRINH_KT.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_CLN_TRONG_QUA_TRINH_KT" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="row m-0 p-0 surfacewater-usage">
                            <p className="exploit-surfacewater-title mb-2 p-2 fw-bold text-start font-12">NƯỚC DƯỚI ĐẤT</p>
                            <Link to="#" className="col-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">LƯU LƯỢNG KHAI THÁC NDD (m3/ngày đêm)</p>
                                    <div className="row mx-0">
                                        <div className="col-5 row mx-0 align-items-center">
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                            <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Giếng</p>
                                        </div>
                                        <div className="col-7">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_LUULUONGKHAITHACNDD.png'} alt="HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_LUULUONGKHAITHACNDD" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="#" className="col-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">MỰC NƯỚC TRONG GIẾNG KHAI THÁC (m)</p>
                                    <div className="row mx-0">
                                        <div className="col-5 row mx-0 align-items-center">
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                            <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Giếng</p>
                                        </div>
                                        <div className="col-7">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/MUC_NUOC_GIENG_KT.png'} alt="HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/MUC_NUOC_GIENG_KT" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="#" className="col-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">CHẤT LƯỢNG NƯỚC TRONG QUÁ TRÌNH KHAI THÁC (m3/s)</p>
                                    <div className="row mx-0">
                                        <div className="col-5 row mx-0 align-items-center">
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                            <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Giếng</p>
                                        </div>
                                        <div className="col-7">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_CLN_TRONG_QT_KT.png'} alt="HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_CLN_TRONG_QT_KT" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="row m-0 p-0 surfacewater-usage">
                            <p className="exploit-surfacewater-title mb-2 p-2 fw-bold text-start font-12">XẢ THẢI VÀO NGUỒN NƯỚC</p>
                            <Link to="#" className="col-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">Q XẢ THẢI (m3/s)</p>
                                    <div className="row mx-0">
                                        <div className="col-5 row mx-0 align-items-center">
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                            <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Công trình</p>
                                        </div>
                                        <div className="col-7">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_LUULUONGKHAITHACNDD.png'} alt="HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_LUULUONGKHAITHACNDD" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="#" className="col-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">CHẤT LƯỢNG NƯỚC THẢI</p>
                                    <div className="row mx-0">
                                        <div className="col-5 row mx-0 align-items-center">
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                            <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Giếng</p>
                                        </div>
                                        <div className="col-7">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/MUC_NUOC_GIENG_KT.png'} alt="HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/MUC_NUOC_GIENG_KT" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-12 col-lg-9 map-container px-md-0 position-relative">
                        <select defaultValue="Imagery" id="switch-basemaps" className="position-absolute" onChange={this.changeBasemap}>
                            <option value="Imagery">Bản đồ vệ tinh</option>
                            <option value="Topographic">Bản đồ địa hình</option>
                            <option value="Streets">Bản đồ đường</option>
                            <option value="NationalGeographic">Bản đồ địa lý</option>
                            <option value="Gray">Bản đồ xám</option>
                        </select>
                        <MapContainer className="col-12 h-100 w-100" whenCreated={ mapInstance => { this.mapRef.current = mapInstance } } center={this.state.center} zoom={this.state.zoom}>
                            <BasemapLayer name="Imagery" />
                            <BasemapLayer name="ImageryLabels" />

                            {/* ========================= NUOC THAI ========================= */}
                            {/* Diem Q xa thai*/}
                            {this.state.triangleYellow && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "q-xa-thai" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={triangleYellowIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">Q xả thải - {marker.location_name}</h5>
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
                                        <h5 className="card-title fw-bold font-13">Chất lượng xả thải - {marker.location_name}</h5>
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
                                        <h5 className="card-title fw-bold font-13">Lưu lượng khai thác nước dưới đất - {marker.location_name}</h5>
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
                                        <h5 className="card-title fw-bold font-13">Mực nước trong giếng khai thác - {marker.location_name}</h5>
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
                                        <h5 className="card-title fw-bold font-13">Chất lượng nước trong quá trình khai thác - {marker.location_name}</h5>
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
                                        <h5 className="card-title fw-bold font-13">Mưa - {marker.location_name}</h5>
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
                                        <h5 className="card-title fw-bold font-13">Mực nước hồ - {marker.location_name}</h5>
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
                                        <h5 className="card-title fw-bold font-13">Q đến hồ - {marker.location_name}</h5>
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
                                        <h5 className="card-title fw-bold font-13">Q xả qua nhà máy - {marker.location_name}</h5>
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
                                        <h5 className="card-title fw-bold font-13">Q xả qua tràn - {marker.location_name}</h5>
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
                                        <h5 className="card-title fw-bold font-13">Q khai thác - {marker.location_name}</h5>
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
                                        <h5 className="card-title fw-bold font-13">Q khai thác - {marker.location_name}</h5>
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
                                        <h5 className="card-title fw-bold font-13">Q khai thác - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }
                            {/* ========================= NUOC MAT ========================= */}
                            

                            {this.state.kml && <ReactLeafletKml kml={this.state.kml} />}

                            <button className="btn btn-sm position-absolute btn-map-layer bg-white d-flex" title="Các lớp bản đồ công trình" onClick={() => this.setState({showMapLayer: !this.state.showMapLayer, showMapLegend: false})}><BlockOutlined /></button>
                            {this.state.showMapLayer &&
                                <div className="map-layer position-absolute bg-white">
                                    <p className="m-0 p-1 text-center bg-header-bar text-white"><span>CÁC LỚP BẢN ĐỒ</span></p>
                                    <div className="legend-title-secondary pt-2">
                                        <span className="bg-secondary text-white d-inline-block pt-1 px-2">NƯỚC MẶT</span>
                                    </div>
                                    <ul className="p-2 m-0">
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.blueMarker} onChange={() => this.setState({blueMarker: !this.state.blueMarker})} />&nbsp;<span className="font-weight-bold">Mưa</span> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.pinkMarker} onChange={() => this.setState({pinkMarker: !this.state.pinkMarker})} />&nbsp;<span className="font-weight-bold">Mực nước hồ</span> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.grayMarker} onChange={() => this.setState({grayMarker: !this.state.grayMarker})} />&nbsp;<span className="font-weight-bold">Q đến hồ</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><Checkbox defaultChecked={this.state.greenMarker} onChange={() => this.setState({greenMarker: !this.state.greenMarker})} />&nbsp;<span className="font-weight-bold">Q xả qua nhà máy</span> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.orangeMarker} onChange={() => this.setState({orangeMarker: !this.state.orangeMarker})} />&nbsp;<span className="font-weight-bold">Q xả qua tràn</span> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.brownMarker} onChange={() => this.setState({brownMarker: !this.state.brownMarker})} />&nbsp;<span className="font-weight-bold">Q khai thác</span> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.redMarker} onChange={() => this.setState({redMarker: !this.state.redMarker})} />&nbsp;<span className="font-weight-bold">Q xả tối thiểu</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><Checkbox defaultChecked={this.state.yellowMarker} onChange={() => this.setState({yellowMarker: !this.state.yellowMarker})} />&nbsp;<span className="font-weight-bold">Chất lượng nước</span> </li>
                                    </ul>

                                    <div className="legend-title-secondary pt-2">
                                        <span className="bg-secondary text-white d-inline-block pt-1 px-2">NƯỚC DƯỚI ĐẤT</span>
                                    </div>
                                    <ul className="p-2 m-0">
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.arrowBlue} onChange={() => this.setState({arrowBlue: !this.state.arrowBlue})} />&nbsp;<span className="font-weight-bold">Lưu lượng khai thác NDD</span> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.arrowDeepBlue} onChange={() => this.setState({arrowDeepBlue: !this.state.arrowDeepBlue})} />&nbsp;<span className="font-weight-bold">Mực nước trong giếng</span> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.arrowGray} onChange={() => this.setState({arrowGray: !this.state.arrowGray})} />&nbsp;<span className="font-weight-bold">Chất lượng nước</span> </li>
                                    </ul>

                                    <div className="legend-title-secondary pt-2">
                                        <span className="bg-secondary text-white d-inline-block pt-1 px-2">XẢ THẢI</span>
                                    </div>
                                    <ul className="p-2 m-0">
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.triangleYellow} onChange={() => this.setState({triangleYellow: !this.state.triangleYellow})} />&nbsp;<span className="font-weight-bold">Q xả thải</span> </li>
                                        <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked={this.state.triangleBrown} onChange={() => this.setState({triangleBrown: !this.state.triangleBrown})} />&nbsp;<span className="font-weight-bold">Chất lượng nước thải</span> </li>
                                    </ul>
                                </div>
                            }

                            <button className="btn btn-sm position-absolute btn-map-legend bg-white d-flex" title="Chú giải" onClick={() => this.setState({showMapLegend: !this.state.showMapLegend, showMapLayer: false})}><QuestionCircleOutlined /></button>
                            {this.state.showMapLegend &&
                                <div className="map-legend position-absolute bg-white">
                                    <p className="m-0 p-1 text-center bg-header-bar text-white"><span>CHÚ GIẢI</span></p>
                                    <div className="legend-title-secondary pt-2">
                                        <span className="bg-secondary text-white d-inline-block pt-1 px-2">NƯỚC MẶT</span>
                                    </div>
                                    <ul className="p-2 m-0">
                                        <li className="d-flex mb-1 align-items-center"><img style={{width: "16px"}} src={blueMarker} />&nbsp;<span className="font-weight-bold">Mưa</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img style={{width: "16px"}} src={pinkMarker} />&nbsp;<span className="font-weight-bold">Mực nước hồ</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img style={{width: "16px"}} src={grayMarker} />&nbsp;<span className="font-weight-bold">Q đến hồ</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img style={{width: "16px"}} src={greenMarker} />&nbsp;<span className="font-weight-bold">Q xả qua nhà máy</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img style={{width: "16px"}} src={orangeMarker} />&nbsp;<span className="font-weight-bold">Q xả qua tràn</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img style={{width: "16px"}} src={brownMarker} />&nbsp;<span className="font-weight-bold">Q khai thác</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img style={{width: "16px"}} src={redMarker} />&nbsp;<span className="font-weight-bold">Q xả tối thiểu</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img style={{width: "16px"}} src={yellowMarker} />&nbsp;<span className="font-weight-bold">Chất lượng nước</span> </li>
                                    </ul> 

                                    <div className="legend-title-secondary pt-2">
                                        <span className="bg-secondary text-white d-inline-block pt-1 px-2">NƯỚC DƯỚI ĐẤT</span>
                                    </div>
                                    <ul className="p-2 m-0">
                                        <li className="d-flex mb-2 align-items-center"><img style={{width: "18px"}} src={arrowBlue} />&nbsp;<span className="font-weight-bold">Lưu lượng khai thác NDD</span> </li>
                                        <li className="d-flex mb-2 align-items-center"><img style={{width: "18px"}} src={arrowDeepBlue} />&nbsp;<span className="font-weight-bold">Mực nước trong giếng</span> </li>
                                        <li className="d-flex mb-1 align-items-center"><img style={{width: "18px"}} src={arrowGray} />&nbsp;<span className="font-weight-bold">Chất lượng nước</span> </li>
                                    </ul>

                                    <div className="legend-title-secondary pt-2">
                                        <span className="bg-secondary text-white d-inline-block pt-1 px-2">XẢ THẢI</span>
                                    </div>
                                    <ul className="p-2 m-0">
                                        <li className="d-flex mb-1 align-items-center"><img style={{width: "18px"}} src={triangleYellow} />&nbsp;<span className="font-weight-bold">Q xả thải</span> </li>
                                        <li className="d-flex mb-2 align-items-center"><img style={{width: "18px"}} src={triangleBrown} />&nbsp;<span className="font-weight-bold">Chất lượng nước thải</span> </li>
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