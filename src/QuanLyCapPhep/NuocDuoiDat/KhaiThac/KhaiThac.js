import React from 'react';
import Header from '../../../Shared/Header';
import { Link } from 'react-router-dom';
import { MapContainer, Marker, Popup, LayersControl, TileLayer, ZoomControl } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import axios from "axios";
import configData from "../../../config.json";
import { FilePdfOutlined, EditOutlined, DeleteOutlined, BlockOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { trackPromise } from 'react-promise-tracker';
import { ConfigProvider, Table, Input, Modal, Checkbox } from 'antd';
import { Button } from "react-bootstrap";
import vnVN from 'antd/lib/locale/vi_VN';
import { getToken, removeUserSession } from '../../../Shared/Auth';
import DemGiayPhep from './DemGiayPhep';
import ReactLeafletKml from 'react-leaflet-kml';

import * as L from 'leaflet';
import * as esri from 'esri-leaflet';

import yellowMarker from '../../../Shared/marker-yellow.png';
import greenMarker from '../../../Shared/marker-green.png';
import redMarker from '../../../Shared/marker-red.png';
import grayMarker from '../../../Shared/marker-gray.png';

const { Search } = Input;
const YellowIcon = L.icon({
    iconUrl: yellowMarker,
    iconSize: [12, 12],
    iconAnchor: [10, 12],
    className: 'yellowMarker',
});

const GreenIcon = L.icon({
    iconUrl: greenMarker,
    iconSize: [12, 12],
    iconAnchor: [10, 12],
    className: 'greenMarker',
});

const RedIcon = L.icon({
    iconUrl: redMarker,
    iconSize: [12, 12],
    iconAnchor: [10, 12],
    className: 'redMarker',
});

const GrayIcon = L.icon({
    iconUrl: grayMarker,
    iconSize: [12, 12],
    iconAnchor: [10, 12],
    className: 'grayMarker',
});

export default class QuanLyCapPhepKhaiThacNDD extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            center: [21.529737201190642, 103.9692398828125],
			zoom: 8,
            pagename: this.props.match.params.pagename,
			contructionInfoForMap: [],
            loading: false,
            dataSource: [],
            visible: false,
            activeModal: null,
            pagination: {},
            search: '',
            filter: '',
            showMapLayer: false,
            showMapLegend: true,
            kml: null,
            yellowMarker: true,
            greenMarker: true,
            redMarker: true,
            grayMarker: true,

            maxBounds: [
				[22.716233, 102.127487],
				[20.161321, 106.096565]
			]
        }

        this.mapRef = React.createRef();
    }

    clickHandler = (e, index) => {
        this.setState({ activeModal: index })
    }
    
    hideModal = () => {
        this.setState({ activeModal: null })
    }

    componentDidMount(){
        document.title = "Khai th??c n?????c d?????i ?????t";

        trackPromise(axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/thong-tin-ban-do-cong-trinh", {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        contructionInfoForMap: response.data,
                    });
                }
            })
            .catch((error) => {
                if(error.response.status === 401)
                {
                    removeUserSession();
                }
                this.setState({msg: error.response})
            })
        )

        fetch(window.location.origin + "/Placemark.kml")
        .then((res) => res.text())
        .then((kmlText) => {
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmlText, "text/xml");
            
            this.setState({ kml: kml });
        })

        this.fetch(this.state.pagination, 'all');
    }

    clickToZoom = (lat, long) => {
        this.mapRef.current.flyTo([lat, long], 16);
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

    formatDate(date) {
        if(date === null){
            return "--";
        }else if(date === "0000-00-00"){
            return "--";
        }else{
            var date_format = new Date(date);
            var d = date_format.getDate();
            var m = date_format.getMonth()+1;
            var y = date_format.getFullYear();
            return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
        }
    }

    checkStatus(hieulucgiayphep){
        if(hieulucgiayphep === "chuaduocduyet"){
            return <div className="license_status" style={{color: "gray", backgroundColor: "#f0f0f0", border: "1px solid gray"}}> Ch??a duy???t </div>;
        }else if(hieulucgiayphep === "saphethieuluc"){
            return <div className="license_status" style={{color: "#d09114", backgroundColor: "#ffd591", border: "1px solid orange"}}> S???p h???t hi???u l???c </div>;
        }else if(hieulucgiayphep === "conhieuluc"){
            return <div className="license_status" style={{color: "green", backgroundColor: "#b7eb8f", border: "1px solid green"}}> C??n hi???u l???c </div>;
        }else if(hieulucgiayphep === "hethieuluc"){
            return <div className="license_status" style={{color: "red", backgroundColor: "#ffa39e", border: "1px solid red"}}> H???t hi???u l???c </div>;
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
          });
    };

    fetch = (params = {}, filter) => {
        this.setState({ loading: true });
        trackPromise(
            axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/loc-giay-phep/"+filter, {
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

    // Function handle filter feature
    onFilterHandle = (e) => {
        this.fetch(this.state.pagination, e.target.value);   
    }

    // Function search
    onSearchHandle = (value) => {
        if(!value)
        {   
            this.fetch(this.state.pagination, 'all');
        }
        const filterResult = this.state.dataSource.filter(o =>
            Object.keys(o).some(k =>
                String(o[k])
                .toLowerCase()
                .includes(value.toLowerCase())
            )
        );

        this.setState({ dataSource : filterResult });
    }

    //  Destroy License
    handlerDestroyLicense = (id_gp) =>{
        trackPromise(
            axios.get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/xoa-giay-phep/"+id_gp, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if (response.status === 200) {
                    window.location.reload();
                }
            })
        );
    }

    render(){
        const columns = [
            {
              title: 'S??? GP',
              dataIndex: 'gp_sogiayphep',
              key: 'gp_sogiayphep',
              width: '10%',
              render: (text, record, index) => (
                <>
                    <p className="text-primary cursor_pointer text-nowrap m-0 d-flex align-items-center" onClick={(record) => this.clickHandler(record, index)}>{record.gp_sogiayphep} &nbsp;<FilePdfOutlined /></p>
                    <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title={record.gp_sogiayphep} width={1000} footer={null} id={record.gp_sogiayphep} visible={this.state.activeModal === index} onCancel={this.hideModal}>
                        <div>
                            {record.tai_lieu_nuoc_duoi_dat && record.tai_lieu_nuoc_duoi_dat[0] !== undefined ?
                            <iframe width="100%" title="file gi???y ph??p" src={"http://tainguyennuocsonla.s3-ap-southeast-1.amazonaws.com/"+record.tai_lieu_nuoc_duoi_dat[0].tailieu_loaigiayphep+"/"+record.tai_lieu_nuoc_duoi_dat[0].tailieu_nam+"/"+record.tai_lieu_nuoc_duoi_dat[0].tailieu_giayphep}></iframe>
                            : "Kh??ng c?? t??i li???u"
                            }
                        </div>
                    </Modal>
                </>
              ),
            },
            {
              title: 'Ng??y k??',
              dataIndex: 'gp_ngayky',
              key: 'gp_ngayky',
              sorter: (a, b) => new Date(a.gp_ngayky) - new Date(b.gp_ngayky),
              render: (text, record) => (
                this.formatDate(record.gp_ngayky)
              )
            },
            {
                title: 'T??n c??ng tr??nh',
                dataIndex: 'congtrinh_ten',
                key: 'congtrinh_ten',
                width: '30%',
                sorter: (a, b) => a.congtrinh_ten.localeCompare(b.congtrinh_ten),
                render: (text, record) => (
                    <p title="Xem b???n ?????" onClick={record.hang_muc_ct ? () => this.clickToZoom(record.hang_muc_ct[0].latitude, record.hang_muc_ct[0].longitude) : null} className="text-primary m-0 text-2-wrap cursor_pointer">{record.congtrinh_ten} <img  src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" /></p>
                )
            },
            {
                title: 'T??? ch???c ???????c c???p ph??p',
                dataIndex: 'chugiayphep_ten',
                key: 'chugiayphep_ten',
                render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.chugiayphep_ten ? record.chugiayphep_ten : "--"} </p>
                )
            },
            {
                title: 'Ng??y c?? hi???u l???c',
                dataIndex: 'gp_ngaybatdau',
                key: 'gp_ngaybatdau',
                render: (text, record) => (
                    this.formatDate(record.gp_ngaybatdau)
                )
            },
            {
                title: 'Th???i h???n',
                dataIndex: 'gp_thoigiancapphep',
                key: 'gp_thoigiancapphep',
                sorter: (a, b) => {
                    let year_a = a.gp_thoigiancapphep.split(" ");
                    let year_b = b.gp_thoigiancapphep.split(" ");
                    return year_a[0] - year_b[0];
                }
            },
            {
                title: 'Tr???ng th??i',
                dataIndex: 'hieulucgiayphep',
                key: 'hieulucgiayphep',
                render: (text, record) => (
                    this.checkStatus(record.hieulucgiayphep)
                )
            },
            {
                title: '',
                key: 'action',
                render: (text, record) => (
                    <div className="d-flex align-items-center justify-content-center">
                        <Link to={"/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/chinh-sua/"+record.id} title="Ch???nh S???a"><EditOutlined /></Link>
                        <Button onClick={() => {if(window.confirm('B???n c?? ch???c mu???n x??a gi???y ph??p '+record.gp_sogiayphep+' ch??? ?')){ this.destroyLicenseHandler(record.id)};}} variant="link" className="text-danger" title="X??a"><DeleteOutlined /></Button>
                    </div>
                )
            },
        ];

        return(
			<div className="p-0">
                <Header headTitle="QU???N L?? C???P PH??P KHAI TH??C N?????C D?????I ?????T" previousLink="/quan-ly-cap-phep" showHeadImage={true} layout48={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <div className="col-12 px-md-1 vh-50 position-relative">
                            <MapContainer className="col-12 h-100 w-100" whenCreated={ mapInstance => { this.mapRef.current = mapInstance } } center={this.state.center} zoom={this.state.zoom} zoomControl={false} maxZoom={14} maxBounds={this.state.maxBounds}>
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

                                {/* Diem cong trinh con hieu luc */}
                                {this.state.greenMarker && 
                                    this.state.dataSource.map((marker, key) => (
                                        marker.hang_muc_ct && marker.hang_muc_ct[0] !== undefined && marker.hieulucgiayphep === "conhieuluc" ? <Marker position={[marker.hang_muc_ct[0].latitude, marker.hang_muc_ct[0].longitude]} key={key} icon={GreenIcon} >
                                        <Popup>
                                        <div>
                                            <h5 className="card-title fw-bold font-13">{marker.hang_muc_ct[0].sohieu+" - "+marker.congtrinh_ten}</h5>
                                            <table className="table table-striped table-hover mb-2">
                                                <tbody>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">T???a ????? X</td>
                                                        <td className="col-8 py-1">{marker.hang_muc_ct[0].x}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">T???a ????? Y</td>
                                                        <td className="col-8 py-1">{marker.hang_muc_ct[0].y}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">?????a ??i???m</td>
                                                        <td className="col-8 py-1">{marker.congtrinh_diadiem}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">S??? GP</td>
                                                        <td className="col-8 py-1">{marker.gp_sogiayphep}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">Ng??y c???p</td>
                                                        <td className="col-8 py-1">{this.formatDate(marker.gp_ngaycap)}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1 font-11">C???p th???m quy???n</td>
                                                        <td className="col-8 py-1">{marker.gp_donvi_thamquyen}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">Ch??? gi???y ph??p</td>
                                                        <td className="col-8 py-1">{marker.chugiayphep_ten}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <Link to={'/quan-ly-cap-phep/nuoc-mat/thuy-dien/xem-thong-tin-chung/'+marker.id} className="card-link d-block text-center">Chi ti???t c??ng tr??nh</Link>
                                        </div>
                                        </Popup>
                                    </Marker> : ""
                                    ))
                                }

                                {/* Diem cong trinh sap het hieu luc */}
                                {this.state.yellowMarker && 
                                    this.state.dataSource.map((marker, key) => (
                                        marker.hang_muc_ct && marker.hang_muc_ct[0] !== undefined && marker.hieulucgiayphep === "saphethieuluc" ? <Marker position={[marker.hang_muc_ct[0].latitude, marker.hang_muc_ct[0].longitude]} key={key} icon={YellowIcon} >
                                        <Popup>
                                        <div>
                                            <h5 className="card-title fw-bold font-13">{marker.hang_muc_ct[0].sohieu+" - "+marker.congtrinh_ten}</h5>
                                            <table className="table table-striped table-hover mb-2">
                                                <tbody>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">T???a ????? X</td>
                                                        <td className="col-8 py-1">{marker.hang_muc_ct[0].x}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">T???a ????? Y</td>
                                                        <td className="col-8 py-1">{marker.hang_muc_ct[0].y}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">?????a ??i???m</td>
                                                        <td className="col-8 py-1">{marker.congtrinh_diadiem}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">S??? GP</td>
                                                        <td className="col-8 py-1">{marker.gp_sogiayphep}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">Ng??y c???p</td>
                                                        <td className="col-8 py-1">{this.formatDate(marker.gp_ngaycap)}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1 font-11">C???p th???m quy???n</td>
                                                        <td className="col-8 py-1">{marker.gp_donvi_thamquyen}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">Ch??? gi???y ph??p</td>
                                                        <td className="col-8 py-1">{marker.chugiayphep_ten}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <Link to={'/quan-ly-cap-phep/nuoc-mat/thuy-dien/xem-thong-tin-chung/'+marker.id} className="card-link d-block text-center">Chi ti???t c??ng tr??nh</Link>
                                        </div>
                                        </Popup>
                                    </Marker> : ""
                                    ))
                                }

                                {/* Diem cong trinh het hieu luc */}
                                {this.state.redMarker && 
                                    this.state.dataSource.map((marker, key) => (
                                        marker.hang_muc_ct && marker.hang_muc_ct[0] !== undefined && marker.hieulucgiayphep === "hethieuluc" ? <Marker position={[marker.hang_muc_ct[0].latitude, marker.hang_muc_ct[0].longitude]} key={key} icon={RedIcon} >
                                        <Popup>
                                        <div>
                                            <h5 className="card-title fw-bold font-13">{marker.hang_muc_ct[0].sohieu+" - "+marker.congtrinh_ten}</h5>
                                            <table className="table table-striped table-hover mb-2">
                                                <tbody>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">T???a ????? X</td>
                                                        <td className="col-8 py-1">{marker.hang_muc_ct[0].x}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">T???a ????? Y</td>
                                                        <td className="col-8 py-1">{marker.hang_muc_ct[0].y}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">?????a ??i???m</td>
                                                        <td className="col-8 py-1">{marker.congtrinh_diadiem}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">S??? GP</td>
                                                        <td className="col-8 py-1">{marker.gp_sogiayphep}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">Ng??y c???p</td>
                                                        <td className="col-8 py-1">{this.formatDate(marker.gp_ngaycap)}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1 font-11">C???p th???m quy???n</td>
                                                        <td className="col-8 py-1">{marker.gp_donvi_thamquyen}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">Ch??? gi???y ph??p</td>
                                                        <td className="col-8 py-1">{marker.chugiayphep_ten}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <Link to={'/quan-ly-cap-phep/nuoc-mat/thuy-dien/xem-thong-tin-chung/'+marker.id} className="card-link d-block text-center">Chi ti???t c??ng tr??nh</Link>
                                        </div>
                                        </Popup>
                                    </Marker> : ""
                                    ))
                                }

                                {/* Diem cong trinh het hieu luc */}
                                {this.state.grayMarker && 
                                    this.state.dataSource.map((marker, key) => (
                                        marker.hang_muc_ct && marker.hang_muc_ct[0] !== undefined && marker.hieulucgiayphep === "chuaduocduyet" ? <Marker position={[marker.hang_muc_ct[0].latitude, marker.hang_muc_ct[0].longitude]} key={key} icon={GrayIcon} >
                                        <Popup>
                                        <div>
                                            <h5 className="card-title fw-bold font-13">{marker.hang_muc_ct[0].sohieu+" - "+marker.congtrinh_ten}</h5>
                                            <table className="table table-striped table-hover mb-2">
                                                <tbody>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">T???a ????? X</td>
                                                        <td className="col-8 py-1">{marker.hang_muc_ct[0].x}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">T???a ????? Y</td>
                                                        <td className="col-8 py-1">{marker.hang_muc_ct[0].y}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">?????a ??i???m</td>
                                                        <td className="col-8 py-1">{marker.congtrinh_diadiem}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">S??? GP</td>
                                                        <td className="col-8 py-1">{marker.gp_sogiayphep}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">Ng??y c???p</td>
                                                        <td className="col-8 py-1">{this.formatDate(marker.gp_ngaycap)}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1 font-11">C???p th???m quy???n</td>
                                                        <td className="col-8 py-1">{marker.gp_donvi_thamquyen}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">Ch??? gi???y ph??p</td>
                                                        <td className="col-8 py-1">{marker.chugiayphep_ten}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <Link to={'/quan-ly-cap-phep/nuoc-mat/thuy-dien/xem-thong-tin-chung/'+marker.id} className="card-link d-block text-center">Chi ti???t c??ng tr??nh</Link>
                                        </div>
                                        </Popup>
                                    </Marker> : ""
                                    ))
                                }

                                {this.state.kml && <ReactLeafletKml kml={this.state.kml} />}

                                <button className="btn btn-sm position-absolute btn-map-layer bg-white d-flex" title="C??c l???p b???n ????? c??ng tr??nh" onClick={() => this.setState({showMapLayer: !this.state.showMapLayer, showMapLegend: false})}><BlockOutlined /></button>
                                {this.state.showMapLayer &&
                                    <div className="map-layer position-absolute bg-white">
                                        <p className="m-0 p-1 text-center bg-header-bar text-white"><span>C??C L???P B???N ?????</span></p>
                                        <ul className="p-2 m-0">
                                            <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked onChange={() => this.setState({greenMarker: !this.state.greenMarker})} />&nbsp;<span className="font-weight-bold">C??n hi???u l???c</span>&nbsp; <img alt="marker" style={{width: "15px"}} src={greenMarker} /> </li>
                                            <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked onChange={() => this.setState({redMarker: !this.state.redMarker})} />&nbsp;<span className="font-weight-bold">H???t hi???u l???c</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={redMarker} /></li>
                                            <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked onChange={() => this.setState({yellowMarker: !this.state.yellowMarker})} />&nbsp;<span className="font-weight-bold">S???p h???t hi???u l???c</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={yellowMarker} /> </li>
                                            <li className="d-flex mb-1 align-items-center"><Checkbox defaultChecked onChange={() => this.setState({grayMarker: !this.state.grayMarker})} />&nbsp;<span className="font-weight-bold">Ch??a ???????c duy???t</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={grayMarker} /> </li>
                                        </ul>
                                    </div>
                                }

                                <button className="btn btn-sm position-absolute btn-map-legend bg-white d-flex" title="Ch?? gi???i" onClick={() => this.setState({showMapLegend: !this.state.showMapLegend, showMapLayer: false})}><QuestionCircleOutlined /></button>
                                {this.state.showMapLegend &&
                                    <div className="map-legend position-absolute bg-white">
                                        <p className="m-0 p-1 text-center bg-header-bar text-white"><span>CH?? GI???I</span></p>
                                        <ul className="p-2 m-0">
                                            <li className="d-flex mb-2 align-items-center"><span className="dot bg-conhieuluc rounded-circle border-secondary border border-dark"></span>&nbsp;<span className="font-weight-bold">C??n hi???u l???c</span> </li>
                                            <li className="d-flex mb-2 align-items-center"><span className="dot bg-hethieuluc rounded-circle border-secondary border border-dark"></span>&nbsp;<span className="font-weight-bold">H???t hi???u l???c</span> </li>
                                            <li className="d-flex mb-2 align-items-center"><span className="dot bg-saphethieuluc rounded-circle border-secondary border border-dark"></span>&nbsp;<span className="font-weight-bold">S???p h???t hi???u l???c</span> </li>
                                            <li className="d-flex mb-1 align-items-center"><span className="dot bg-chuaduocduyet rounded-circle border-secondary border border-dark"></span>&nbsp;<span className="font-weight-bold">Ch??a ???????c duy???t</span> </li>
                                        </ul>
                                    </div>
                                }
                            </MapContainer>

                            <div className="col-12 py-1 row mx-0 align-items-center">
                                <div className="col-lg-4">
                                    <Search allowClear id="search" name="search" placeholder="--T??m ki???m gi???y ph??p--" onSearch={this.onSearchHandle} />
                                </div>
                                <div className="col-3 p-0">
                                    <select name="filter" id="filter" onChange={this.onFilterHandle} className="form-select font-13" defaultValue="all">
                                        <option value="all">T???t c???</option>
                                        <option value="conhieuluc">C??n hi???u l???c</option>
                                        <option value="chuapheduyet">Ch??a ph?? duy???t</option>
                                        <option value="hethieuluc">H???t hi???u l???c</option>
                                        <option value="saphethieuluc">S???p h???t hi???u l???c</option>
                                    </select>
                                </div>
                                <div className="table-responsive">
                                    <ConfigProvider locale={vnVN}>
                                        <Table  className="table table-sm table-bordered col-12 table-hover text-center" 
                                            columns={columns} 
                                            loading={this.state.loading}
                                            onChange={() => this.handleTableChange}
                                            dataSource={this.state.dataSource}
                                            rowKey="id" 
                                            bordered                                           
                                            pagination={{
                                            showTotal: (total, range) => `T???t c??? ${total} b???n ghi`,
                                                current: this.state.currentPage,
                                                pageSize: 10}}/>
                                    </ConfigProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
