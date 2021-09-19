/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import Header from '../../../Shared/Header';
import '../../../Shared/Page.css';
import LeftBar from '../../LeftBar';
import { Tabs } from 'antd';


// GET DATA FROM API
import axios from "axios";
import configData from "../../../config.json";
import { trackPromise } from 'react-promise-tracker';
// CHECK AUTH LOGIN
import { getToken, removeUserSession } from '../../../Shared/Auth';

// MAP
import { MapContainer, Marker, Popup } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import * as L from 'leaflet';
import ReactLeafletKml from 'react-leaflet-kml';
import blueMarker from '../../../Shared/marker-blue.png';
import GiamSatKetNoi from './GiamSatKetNoi';

const blueIcon = L.icon({
    iconUrl: blueMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'blueMarker',
});

const { TabPane } = Tabs;


export default class HeThongGiamSatPhatDienNhoHon2MW extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            center: [21.529737201190642, 103.9692398828125],
			zoom: 8,
            visible: false,
            pagination: {},
            loading: false,
            dataSource: [],
            showMapLayer: false,
            showMapLegend: true,
            kml: null,
        };
        
        this.mapRef = React.createRef();
    }
    componentDidMount(){
        document.title = "Hệ thống giám sát | Giám sát tài nguyên nước Sơn La";

        // 
        fetch(window.location.origin + "/Placemark.kml")
        .then((res) => res.text())
        .then((kmlText) => {
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmlText, "text/xml");
            this.setState({ kml: kml });
        })
        this.fetch(this.state.pagination, 'all');
    }

    // FILTER LOCATION
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
            <div className="pt-1 px-1">
                <Header headTitle="HỆ THỐNG GIÁM SÁT CÔNG TRÌNH THỦY ĐIỆN NHỎ HƠN 2MW" previousLink="/he-thong-giam-sat" showHeadImage={true} layoutfull={true} />
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
                                <TabPane tab="Giám sát kết nối" key="1">
                                    <GiamSatKetNoi />
                                </TabPane>
                                <TabPane tab="Giám sát dữ liệu" key="2"></TabPane>
                                <TabPane tab="Camera giám sát" key="3"></TabPane>
                                <TabPane tab="Nhật ký cảnh báo" key="4"></TabPane>
                                <TabPane tab="Tổng hợp vận hành" key="5"></TabPane>
                            </Tabs>
                            
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}