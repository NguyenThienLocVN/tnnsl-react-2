import React from 'react';
import Header from '../../../Shared/Header';
import { Link } from 'react-router-dom';
import { MapContainer, Marker, Popup } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import axios from "axios";
import configData from "../../../config.json";
import { FilePdfOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { trackPromise } from 'react-promise-tracker';
import { ConfigProvider, Table, Input, Modal } from 'antd';
import { Button } from "react-bootstrap";
import vnVN from 'antd/lib/locale/vi_VN';
import { getToken } from '../../../Shared/Auth';
import DemGiayPhep from './DemGiayPhep';

import * as L from 'leaflet';
import * as esri from 'esri-leaflet';

import icon from '../../../Shared/marker.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
	iconSize: [15, 15],
    iconAnchor: [10, 15]
});
const { Search } = Input;

L.Marker.prototype.options.icon = DefaultIcon;

export default class QuanLyCapPhepNuocMatCong extends React.Component {
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
        document.title = "Nươc mặt - Công trình cống";

        trackPromise(axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/cong/thong-tin-ban-do-cong-trinh", {
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
            return <div className="license_status" style={{color: "gray", backgroundColor: "#f0f0f0", border: "1px solid gray"}}> Chưa duyệt </div>;
        }else if(hieulucgiayphep === "saphethieuluc"){
            return <div className="license_status" style={{color: "orange", backgroundColor: "#ffd591", border: "1px solid orange"}}> Sắp hết hiệu lực </div>;
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
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/cong/loc-giay-phep/"+filter, {
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
              title: '#',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'Số GP',
              dataIndex: 'gp_sogiayphep',
              key: 'gp_sogiayphep',
              width: '10%',
              render: (text, record, index) => (
                <>
                    <p className="text-primary cursor_pointer m-0" onClick={(record) => this.clickHandler(record, index)}>{record.gp_sogiayphep} &nbsp;<FilePdfOutlined /></p>
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
                    <p title="Xem bản đồ" onClick={record.hang_muc_ct ? () => this.clickToZoom(record.hang_muc_ct[0].latitude, record.hang_muc_ct[0].longitude) : null} className="text-primary m-0 cursor_pointer">{record.congtrinh_ten} <img  src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" /></p>
                )
            },
            {
                title: 'Tổ chức được cấp phép',
                dataIndex: 'chugiayphep_ten',
                key: 'chugiayphep_ten',
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
                        <Link to={"/quan-ly-cap-phep/nuoc-mat/cong/chinh-sua/"+record.id} title="Chỉnh Sửa"><EditOutlined /></Link>
                        <Button onClick={() => {if(window.confirm('Bạn có chắc muốn xóa giấy phép '+record.gp_sogiayphep+' chứ ?')){ this.destroyLicenseHandler(record.id)};}} variant="link" className="text-danger" title="Xóa"><DeleteOutlined /></Button>
                    </div>
                )
            },
        ];

        return(
			<div className="p-0">
                <Header headTitle="QUẢN LÝ CẤP PHÉP CÔNG TRÌNH CỐNG" previousLink="/quan-ly-cap-phep" showHeadImage={true} layout48={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <div className="col-12 px-md-1 vh-50 position-relative">
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

                                {this.state.dataSource.map((marker, key) => (
                                    marker.hang_muc_ct && marker.hang_muc_ct[0] !== undefined ? <Marker position={[marker.hang_muc_ct[0].latitude, marker.hang_muc_ct[0].longitude]} key={key} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">{marker.hang_muc_ct[0].sohieu+" - "+marker.congtrinh_ten}</h5>
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
                                        <Link to={'/quan-ly-cap-phep/nuoc-mat/cong/xem-thong-tin-chung/'+marker.id} className="card-link d-block text-center">Chi tiết công trình</Link>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))}
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
