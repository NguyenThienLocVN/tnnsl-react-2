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
import { getToken } from '../../../Shared/Auth';
import DemGiayPhep from './DemGiayPhep';
import ReactLeafletKml from 'react-leaflet-kml';

import * as L from 'leaflet';

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

export default class QuanLyCapPhepNuocMatHoChua extends React.Component {
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
        document.title = "Nước mặt - Công trình hồ chứa";

        trackPromise(axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/ho-chua/thong-tin-ban-do-cong-trinh", {
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
            return <div className="license_status" style={{color: "gray", backgroundColor: "#f0f0f0", border: "1px solid gray"}}> Chưa duyệt </div>;
        }else if(hieulucgiayphep === "saphethieuluc"){
            return <div className="license_status" style={{color: "#d09114", backgroundColor: "#ffd591", border: "1px solid orange"}}> Sắp hết hiệu lực </div>;
        }else if(hieulucgiayphep === "conhieuluc"){
            return <div className="license_status" style={{color: "green", backgroundColor: "#b7eb8f", border: "1px solid green"}}> Còn hiệu lực </div>;
        }else if(hieulucgiayphep === "hethieuluc"){
            return <div className="license_status" style={{color: "red", backgroundColor: "#ffa39e", border: "1px solid red"}}> Hết hiệu lực </div>;
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

        var pageName = this.props.match.path.split("/").pop();
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/"+pageName+"/loc-giay-phep/"+filter, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if(response.status === 200)
                {
                    console.log(response);
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
                this.setState({msg: error.response})
            })
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
            axios.get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/xoa-giay-phep/"+id_gp, {
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
              title: 'Số GP',
              dataIndex: 'gp_sogiayphep',
              key: 'gp_sogiayphep',
              width: '10%',
              render: (text, record, index) => (
                <>
                    <p className="text-primary cursor_pointer text-nowrap m-0 d-flex align-items-center" onClick={(record) => this.clickHandler(record, index)}>{record.gp_sogiayphep} &nbsp;<FilePdfOutlined /></p>
                    <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title={record.gp_sogiayphep} width={1000} footer={null} id={record.gp_sogiayphep} visible={this.state.activeModal === index} onCancel={this.hideModal}>
                        <div>
                            {record.tai_lieu && record.tai_lieu[0] !== undefined ?
                            <iframe width="100%" title="file giấy phép" src={"http://tainguyennuocsonla.s3-ap-southeast-1.amazonaws.com/"+record.tai_lieu[0].tailieu_loaigiayphep+"/"+record.tai_lieu[0].tailieu_nam+"/"+record.tai_lieu[0].tailieu_giayphep}></iframe>
                            : "Không có tài liệu"
                            }
                        </div>
                    </Modal>
                </>
              ),
            },
            {
              title: 'Ngày ký',
              dataIndex: 'gp_ngayky',
              key: 'gp_ngayky',
              sorter: (a, b) => new Date(a.gp_ngayky) - new Date(b.gp_ngayky),
              render: (text, record) => (
                this.formatDate(record.gp_ngayky)
              )
            },
            {
                title: 'Tên công trình',
                dataIndex: 'congtrinh_ten',
                key: 'congtrinh_ten',
                width: '30%',
                sorter: (a, b) => a.congtrinh_ten.localeCompare(b.congtrinh_ten),
                render: (text, record) => (
                    <p title="Xem bản đồ" onClick={record.hang_muc_ct ? () => this.clickToZoom(record.hang_muc_ct[0].latitude, record.hang_muc_ct[0].longitude) : null} className="text-primary text-2-wrap m-0 cursor_pointer">{record.congtrinh_ten} <img  src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" /></p>
                )
            },
            {
                title: 'Tổ chức được cấp phép',
                dataIndex: 'chugiayphep_ten',
                key: 'chugiayphep_ten',render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.chugiayphep_ten ? record.chugiayphep_ten : "--"} </p>
                )
            },
            {
                title: 'Ngày có hiệu lực',
                dataIndex: 'gp_ngaybatdau',
                key: 'gp_ngaybatdau',
                render: (text, record) => (
                    this.formatDate(record.gp_ngaybatdau)
                )
            },
            {
                title: 'Thời hạn',
                dataIndex: 'gp_thoigiancapphep',
                key: 'gp_thoigiancapphep',
                sorter: (a, b) => {
                    let year_a = a.gp_thoigiancapphep.split(" ");
                    let year_b = b.gp_thoigiancapphep.split(" ");
                    return year_a[0] - year_b[0];
                }
            },
            {
                title: 'Trạng thái',
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
                        <Link to={"/quan-ly-cap-phep/nuoc-mat/ho-chua/chinh-sua/"+record.id} title="Chỉnh Sửa"><EditOutlined /></Link>
                        <Button onClick={() => {if(window.confirm('Bạn có chắc muốn xóa giấy phép '+record.gp_sogiayphep+' chứ ?')){ this.destroyLicenseHandler(record.id)};}} variant="link" className="text-danger" title="Xóa"><DeleteOutlined /></Button>
                    </div>
                )
            },
        ];

        return(
			<div className="p-0">
                <Header headTitle="QUẢN LÝ CẤP PHÉP CÔNG TRÌNH HỒ CHỨA" previousLink="/quan-ly-cap-phep" showHeadImage={true} layout48={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <div className="col-12 px-md-1 vh-50 position-relative">
                            <MapContainer className="col-12 h-100 w-100" whenCreated={ mapInstance => { this.mapRef.current = mapInstance } } center={this.state.center} zoom={this.state.zoom} zoomControl={false} maxZoom={14} maxBounds={this.state.maxBounds}>
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

                                {/* Diem cong trinh con hieu luc */}
                                {this.state.greenMarker && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.hang_muc_ct && marker.hang_muc_ct[0] !== undefined && marker.hieulucgiayphep === "conhieuluc" ? <Marker position={[marker.hang_muc_ct[0].latitude, marker.hang_muc_ct[0].longitude]} key={key} icon={GreenIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">{marker.hang_muc_ct[0].tenhangmuc+" - "+marker.congtrinh_ten}</h5>
                                        <table className="table table-striped table-hover mb-2">
                                            <tbody>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Tọa độ X</td>
                                                    <td className="col-8 py-1">{marker.hang_muc_ct[0].x}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Tọa độ Y</td>
                                                    <td className="col-8 py-1">{marker.hang_muc_ct[0].y}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Địa điểm</td>
                                                    <td className="col-8 py-1">{marker.congtrinh_diadiem}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Số GP</td>
                                                    <td className="col-8 py-1">{marker.gp_sogiayphep}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Ngày cấp</td>
                                                    <td className="col-8 py-1">{this.formatDate(marker.gp_ngaycap)}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1 font-11">Cấp thẩm quyền</td>
                                                    <td className="col-8 py-1">{marker.gp_donvi_thamquyen}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Q <sub>xả TT</sub>  gp</td>
                                                    <td className="col-8 py-1">{marker.luuluong_xadongchay_toithieu} m<sup>3</sup>/s</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Q <sub>xả TT</sub>  thực tế</td>
                                                    <td className="col-8 py-1"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Link to={'/quan-ly-cap-phep/nuoc-mat/ho-chua/xem-thong-tin-chung/'+marker.id} className="card-link d-block text-center">Chi tiết công trình</Link>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))}

                                {/* Diem cong trinh sap het hieu luc */}
                                {this.state.yellowMarker && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.hang_muc_ct && marker.hang_muc_ct[0] !== undefined && marker.hieulucgiayphep === "saphethieuluc" ? <Marker position={[marker.hang_muc_ct[0].latitude, marker.hang_muc_ct[0].longitude]} key={key} icon={YellowIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">{marker.hang_muc_ct[0].tenhangmuc+" - "+marker.congtrinh_ten}</h5>
                                        <table className="table table-striped table-hover mb-2">
                                            <tbody>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Tọa độ X</td>
                                                    <td className="col-8 py-1">{marker.hang_muc_ct[0].x}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Tọa độ Y</td>
                                                    <td className="col-8 py-1">{marker.hang_muc_ct[0].y}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Địa điểm</td>
                                                    <td className="col-8 py-1">{marker.congtrinh_diadiem}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Số GP</td>
                                                    <td className="col-8 py-1">{marker.gp_sogiayphep}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Ngày cấp</td>
                                                    <td className="col-8 py-1">{this.formatDate(marker.gp_ngaycap)}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1 font-11">Cấp thẩm quyền</td>
                                                    <td className="col-8 py-1">{marker.gp_donvi_thamquyen}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Q <sub>xả TT</sub>  gp</td>
                                                    <td className="col-8 py-1">{marker.luuluong_xadongchay_toithieu} m<sup>3</sup>/s</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Q <sub>xả TT</sub>  thực tế</td>
                                                    <td className="col-8 py-1"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Link to={'/quan-ly-cap-phep/nuoc-mat/ho-chua/xem-thong-tin-chung/'+marker.id} className="card-link d-block text-center">Chi tiết công trình</Link>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))}

                                {/* Diem cong trinh het hieu luc */}
                                {this.state.yellowMarker && 
                                this.state.dataSource.map((marker, key) => (
                                    marker.hang_muc_ct && marker.hang_muc_ct[0] !== undefined && marker.hieulucgiayphep === "hethieuluc" ? <Marker position={[marker.hang_muc_ct[0].latitude, marker.hang_muc_ct[0].longitude]} key={key} icon={RedIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">{marker.hang_muc_ct[0].tenhangmuc+" - "+marker.congtrinh_ten}</h5>
                                        <table className="table table-striped table-hover mb-2">
                                            <tbody>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Tọa độ X</td>
                                                    <td className="col-8 py-1">{marker.hang_muc_ct[0].x}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Tọa độ Y</td>
                                                    <td className="col-8 py-1">{marker.hang_muc_ct[0].y}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Địa điểm</td>
                                                    <td className="col-8 py-1">{marker.congtrinh_diadiem}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Số GP</td>
                                                    <td className="col-8 py-1">{marker.gp_sogiayphep}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Ngày cấp</td>
                                                    <td className="col-8 py-1">{this.formatDate(marker.gp_ngaycap)}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1 font-11">Cấp thẩm quyền</td>
                                                    <td className="col-8 py-1">{marker.gp_donvi_thamquyen}</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Q <sub>xả TT</sub>  gp</td>
                                                    <td className="col-8 py-1">{marker.luuluong_xadongchay_toithieu} m<sup>3</sup>/s</td>
                                                </tr>
                                                <tr className="col-12 d-flex p-0">
                                                    <td className="col-4 py-1">Q <sub>xả TT</sub>  thực tế</td>
                                                    <td className="col-8 py-1"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Link to={'/quan-ly-cap-phep/nuoc-mat/ho-chua/xem-thong-tin-chung/'+marker.id} className="card-link d-block text-center">Chi tiết công trình</Link>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))}

                                {/* Diem cong trinh chua duoc duyet */}
                                {this.state.grayMarker && 
                                    this.state.dataSource.map((marker, key) => (
                                        marker.hang_muc_ct && marker.hang_muc_ct[0] !== undefined && marker.hieulucgiayphep === "chuaduocduyet" ? <Marker position={[marker.hang_muc_ct[0].latitude, marker.hang_muc_ct[0].longitude]} key={key} icon={GrayIcon} >
                                        <Popup>
                                        <div>
                                            <h5 className="card-title fw-bold font-13">{marker.hang_muc_ct[0].tenhangmuc+" - "+marker.congtrinh_ten}</h5>
                                            <table className="table table-striped table-hover mb-2">
                                                <tbody>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">Tọa độ X</td>
                                                        <td className="col-8 py-1">{marker.hang_muc_ct[0].x}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">Tọa độ Y</td>
                                                        <td className="col-8 py-1">{marker.hang_muc_ct[0].y}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">Địa điểm</td>
                                                        <td className="col-8 py-1">{marker.congtrinh_diadiem}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">Số GP</td>
                                                        <td className="col-8 py-1">{marker.gp_sogiayphep}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">Ngày cấp</td>
                                                        <td className="col-8 py-1">{this.formatDate(marker.gp_ngaycap)}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1 font-11">Cấp thẩm quyền</td>
                                                        <td className="col-8 py-1">{marker.gp_donvi_thamquyen}</td>
                                                    </tr>
                                                    <tr className="col-12 d-flex p-0">
                                                        <td className="col-4 py-1">Chủ giấy phép</td>
                                                        <td className="col-8 py-1">{marker.chugiayphep_ten}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <Link to={'/quan-ly-cap-phep/nuoc-mat/thuy-dien/xem-thong-tin-chung/'+marker.id} className="card-link d-block text-center">Chi tiết công trình</Link>
                                        </div>
                                        </Popup>
                                    </Marker> : ""
                                    ))
                                }



                                {this.state.kml && <ReactLeafletKml kml={this.state.kml} />}

                                <button className="btn btn-sm position-absolute btn-map-layer bg-white d-flex" title="Các lớp bản đồ công trình" onClick={() => this.setState({showMapLayer: !this.state.showMapLayer, showMapLegend: false})}><BlockOutlined /></button>
                                {this.state.showMapLayer &&
                                    <div className="map-layer position-absolute bg-white">
                                        <p className="m-0 p-1 text-center bg-header-bar text-white"><span>CÁC LỚP BẢN ĐỒ</span></p>
                                        <ul className="p-2 m-0">
                                            <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked onChange={() => this.setState({greenMarker: !this.state.greenMarker})} />&nbsp;<span className="font-weight-bold">Còn hiệu lực</span>  &nbsp; <img alt="marker" style={{width: "15px"}} src={greenMarker} /> </li>
                                            <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked onChange={() => this.setState({redMarker: !this.state.redMarker})} />&nbsp;<span className="font-weight-bold">Hết hiệu lực</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={redMarker} /> </li>
                                            <li className="d-flex mb-2 align-items-center"><Checkbox defaultChecked onChange={() => this.setState({yellowMarker: !this.state.yellowMarker})} />&nbsp;<span className="font-weight-bold">Sắp hết hiệu lực</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={yellowMarker} /> </li>
                                            <li className="d-flex mb-1 align-items-center"><Checkbox defaultChecked onChange={() => this.setState({grayMarker: !this.state.grayMarker})} />&nbsp;<span className="font-weight-bold">Chưa được duyệt</span> &nbsp; <img alt="marker" style={{width: "15px"}} src={grayMarker} /> </li>
                                        </ul>
                                    </div>
                                }

                                <button className="btn btn-sm position-absolute btn-map-legend bg-white d-flex" title="Chú giải" onClick={() => this.setState({showMapLegend: !this.state.showMapLegend, showMapLayer: false})}><QuestionCircleOutlined /></button>
                                {this.state.showMapLegend &&
                                    <div className="map-legend position-absolute bg-white">
                                        <p className="m-0 p-1 text-center bg-header-bar text-white"><span>CHÚ GIẢI</span></p>
                                        <ul className="p-2 m-0">
                                            <li className="d-flex mb-2 align-items-center"><span className="dot bg-conhieuluc rounded-circle border-secondary border border-dark"></span>&nbsp;<span className="font-weight-bold">Còn hiệu lực</span> </li>
                                            <li className="d-flex mb-2 align-items-center"><span className="dot bg-hethieuluc rounded-circle border-secondary border border-dark"></span>&nbsp;<span className="font-weight-bold">Hết hiệu lực</span> </li>
                                            <li className="d-flex mb-2 align-items-center"><span className="dot bg-saphethieuluc rounded-circle border-secondary border border-dark"></span>&nbsp;<span className="font-weight-bold">Sắp hết hiệu lực</span> </li>
                                            <li className="d-flex mb-1 align-items-center"><span className="dot bg-chuaduocduyet rounded-circle border-secondary border border-dark"></span>&nbsp;<span className="font-weight-bold">Chưa được duyệt</span> </li>
                                        </ul>
                                    </div>
                                }
                            </MapContainer>

                            <div className="col-12 py-1 row mx-0 align-items-center">
                                <div className="col-lg-4">
                                    <Search allowClear id="search" name="search" placeholder="--Tìm kiếm giấy phép--" onSearch={this.onSearchHandle} />
                                </div>
                                <div className="col-3 p-0">
                                    <select name="filter" id="filter" onChange={this.onFilterHandle} className="form-select font-13" defaultValue="all">
                                        <option value="all">Tất cả</option>
                                        <option value="conhieuluc">Còn hiệu lực</option>
                                        <option value="chuapheduyet">Chưa phê duyệt</option>
                                        <option value="hethieuluc">Hết hiệu lực</option>
                                        <option value="saphethieuluc">Sắp hết hiệu lực</option>
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
                                            showTotal: (total, range) => `Tất cả ${total} bản ghi`,
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
