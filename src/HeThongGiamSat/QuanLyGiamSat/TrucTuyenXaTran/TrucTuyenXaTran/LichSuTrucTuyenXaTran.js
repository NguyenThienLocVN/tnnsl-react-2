/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import Header from '../../../../Shared/Header';
import '../../../../Shared/Page.css';
import LeftBar from '../../../LeftBar';
import { Button, Table, Form, DatePicker, TimePicker, Select, Tabs } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

// moment date in DatePicker
import moment from 'moment';


// MAP
import { MapContainer, Marker, Popup } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import * as L from 'leaflet';
import ReactLeafletKml from 'react-leaflet-kml';
import blueMarker from '../../../../Shared/marker-blue.png';


// Import Giam Sat
import GiamSatDuLieu from './GiamSatDuLieu';
import CameraGiamSat from './CameraGiamSat';
import GiamSatKetNoi from './GiamSatKetNoi';
import NhatKyCanhBao from './NhatKyCanhBao';
import TongHopVanHanh from './TongHopVanHanh';
import GiamSatXaTran from './GiamSatXaTran';

const blueIcon = L.icon({
    iconUrl: blueMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'blueMarker',
});

const { TabPane } = Tabs;

export default class HeThongGiamSatLichSuTrucTuyenXaQuaTran extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            center: [21.529737201190642, 103.9692398828125],
			zoom: 8,
            dataSource: [],
            pagination: {},
            activeModal: null,
            loading: false,
            showMapLayer: false,
            showMapLegend: true,
            kml: null,
        };
        
        this.mapRef = React.createRef();
    }
    componentDidMount(){
        document.title = "Hệ thống giám sát | Giám sát tài nguyên nước Sơn La";
    }

    render(){
        return(
            <div>
                <Header headTitle="HỆ THỐNG GIÁM SÁT TRỰC TUYẾN LƯU LƯỢNG XẢ QUA TRÀN " previousLink="/he-thong-giam-sat/truc-tuyen-xa-tràn" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-12 col-lg-3 px-0 menu-home">
                        <LeftBar />
                    </div>
                    <div className="col-12 col-lg-9 px-0 menu-home">
                        <div className="col-12 p-0 vh-50">
                            {/* MAP */}
                            <MapContainer className="col-12 h-100 w-100" whenCreated={ mapInstance => { this.mapRef.current = mapInstance } } center={this.state.center} zoom={this.state.zoom}>
                                <BasemapLayer name="Imagery" />
                                <BasemapLayer name="ImageryLabels" />

                                {this.state.kml && <ReactLeafletKml kml={this.state.kml} />}

                                {/* POPUP DIEM MUA */}
                                { this.state.dataSource.map((marker, key) => (
                                        marker.location_type === "muc-nuoc-ho" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={blueIcon} >
                                        <Popup>
                                        <div>
                                            <h5 className="card-title fw-bold font-13">Hồ chứa - {marker.location_name}</h5>
                                        </div>
                                        </Popup>
                                    </Marker> : ""
                                    ))
                                }
                            </MapContainer>
                            {/* MAP */}
                        </div>
                        <div className="col-12 row align-items-center my-1 px-0 mx-0">
                            <Tabs tabPosition="top" defaultActiveKey="1">
                                <TabPane tab="Giám sát mực nước hồ thượng lưu " key="1">
                                    <GiamSatKetNoi />
                                </TabPane>
                                <TabPane tab="Giám sát dòng chảy đến hồ" key="2">
                                    <GiamSatDuLieu />
                               </TabPane>
                               <TabPane tab="Giám sát xả dòng chảy tối thiểu" key="3"> 
                                    <CameraGiamSat /> 
                                </TabPane> 
                                <TabPane tab="Giám sát lưu lượng xả qua nhà máy" key="4">
                                    <NhatKyCanhBao /> 
                                </TabPane> 
                               <TabPane tab="Giám sát lưu lượng xả qua tràn" key="5"> 
                                   <GiamSatXaTran /> 
                                </TabPane> 
                            </Tabs>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}