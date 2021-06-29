import React, { useRef } from 'react';
import Header from '../../../../layout/Header';
import { Link } from 'react-router-dom';
import { MapContainer, Marker, Popup } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import axios from "axios";
import configData from "../../../../../config.json";
import { EyeOutlined, SearchOutlined, FilePdfOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { trackPromise } from 'react-promise-tracker';
import { Dropdown } from "react-bootstrap";
import { ConfigProvider, Table, Select, Input, Modal} from 'antd';
import vnVN from 'antd/lib/locale/vi_VN';

import * as L from 'leaflet';
import * as esri from 'esri-leaflet';

import icon from '../../../../common/marker.png';


const { Option } = Select;
let DefaultIcon = L.icon({
    iconUrl: icon,
	iconSize: [15, 15],
    iconAnchor: [10, 15]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default class QuanLyCapPhepNuocDuoiDatKhaiThac extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            center: [21.529737201190642, 103.9692398828125],
			zoom: 8,
            pagename: this.props.match.params.pagename,
            countLicense: [],
			contructionInfoForMap: [],
            loading: false,
            sRT: "",
            dataSource: [],
            nameSearch: "",
            visible: false,
            activeModal: null,
            pagination: {},
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
        document.title = "Khai thác nước dưới đất";
    
        trackPromise(
            axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/dem-giay-phep")
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        countLicense: response.data.gp_ktsdnuocduoidat,
                    });
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            })
        )

        trackPromise(
            axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/thong-tin-ban-do-cong-trinh")
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

        this.fetch(this.state.pagination);
    }

    clickToZoom = (lat, long) => {
        this.mapRef.current.flyTo([lat, long], 12);
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
            return <div className="license_status" style={{color: "#fff", backgroundColor: "gray"}}> Chưa duyệt </div>;
        }else if(hieulucgiayphep === "saphethieuluc"){
            return <div className="license_status" style={{color: "#fff", backgroundColor: "orange"}}> Sắp hết hiệu lực </div>;
        }else if(hieulucgiayphep === "conhieuluc"){
            return <div className="license_status" style={{color: "#fff", backgroundColor: "green"}}> Còn hiệu lực </div>;
        }else if(hieulucgiayphep === "hethieuluc"){
            return <div className="license_status" style={{color: "#fff", backgroundColor: "red"}}> Hết hiệu lực </div>;
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
        pagination: pager
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    fetch = (params = {}) => {
        this.setState({ loading: true });
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/danh-sach-giay-phep")
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        loading: false,
                        dataSource: response.data,
                        pagination: {
                          ...params.pagination,
                          total: 200,
                        },
                      });
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            })
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search ${dataIndex}`}
              //value={selectedKeys[0]}
              onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            />
          </div>
        ),
        filterIcon: filtered => (
          <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        }
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ sRT: selectedKeys[0] });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ sRT: "" });
      };

    render(){
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        
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
              render: (text, record, index) => (
                <>
                    <p className="text-primary cursor_pointer m-0" onClick={(record) => this.clickHandler(record, index)}>{record.gp_sogiayphep} &nbsp;<FilePdfOutlined /></p>
                    <Modal className="modal-view-file-pdf" title={record.gp_sogiayphep} width={1000} footer={null} id={record.gp_sogiayphep} visible={this.state.activeModal === index} onCancel={this.hideModal}>
                        <div>
                            {record.tai_lieu_nuoc_duoi_dat[0] ?
                            <iframe width="100%" title="file giấy phép" src={"http://tainguyennuocsonla.s3-ap-southeast-1.amazonaws.com/"+record.tai_lieu_nuoc_duoi_dat[0].tailieu_nam+"/"+record.tai_lieu_nuoc_duoi_dat[0].tailieu_loaigiayphep+"/"+record.tai_lieu_nuoc_duoi_dat[0].tailieu_giayphep+".pdf"}></iframe>
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
                render: (text, record) => (
                    <p title="Xem bản đồ" onClick={record.hang_muc_ct ? () => this.clickToZoom(record.hang_muc_ct[0].longitude, record.hang_muc_ct[0].latitude) : null} className="text-primary m-0 cursor_pointer">{record.congtrinh_ten} <img  src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" /></p>
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
                dataIndex: 'gp_thoihangiayphep',
                key: 'gp_thoihangiayphep',
                sorter: (a, b) => {
                    let year_a = a.gp_thoihangiayphep.split(" ");
                    let year_b = b.gp_thoihangiayphep.split(" ");
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
                    <div><Link className="text-primary" title="Xem GP" to={'/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/xem-thong-tin-chung/'+record.id}><EyeOutlined /></Link>&nbsp; &nbsp;<Link to="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/cap-moi" title="Sửa"><EditOutlined /></Link>&nbsp; &nbsp;<span title="Xóa" className="text-danger"><DeleteOutlined /></span></div>
                )
            },
        ];

        return(
			<div className="p-0">
                <Header headTitle="QUẢN LÝ CẤP PHÉP KHAI THÁC NƯỚC DƯỚI ĐẤT" previousLink="/quan-ly-cap-phep" showHeadImage={true} layout48={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                        <div className="col-12 px-2 pb-4">
                            <div className="col-10 py-2 m-auto row m-0 justify-content-center text-center">
                                <div className="col-12 text-center p-0">
                                    <p className="fw-bold font-20 text-primary col-sm-12 mb-1">Tổng số công trình <br /> khai thác nước dưới đất </p>
                                </div>
                                <div className="col-6 text-center p-0">
                                    <p className="font-30 m-0 fw-bold">{this.state.countLicense.tat_ca_giay_phep}</p>
                                </div>
                                <div className="col-6 text-center p-0">
                                    <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/NuocDuoiDat/anhkhaithacnuocduoidat.png'} className="p-0 hydroelectric-icon border border-secondary my-auto mx-3" alt="dap-thuy-dien" />
                                </div>
                            </div>

                            <div className="col-12 py-1 mt-4 d-flex justify-content-center text-center border-top border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Tổng số công trình (TSCT)  đã vận hành</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countLicense.tat_ca_giay_phep} / {this.state.countLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/NuocDuoiDat/anhkhaithacnuocduoidat.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="dap-thuy-dien" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép đã cấp</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countLicense.giay_phep_da_cap} / {this.state.countLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép sắp hết hiệu lực</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countLicense.sap_het_hieu_luc} / {this.state.countLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing-2.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep-2" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép hết hiệu lực</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countLicense.het_hieu_luc} / {this.state.countLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing-3.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep-3" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Chưa có giấy phép</p>
                                    <p className="font-18 m-0 fw-bold text-danger"> {this.state.countLicense.chua_phe_duyet} / {this.state.countLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/expire.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="het-han" />
                            </div>

                            <Dropdown>
                                <Dropdown.Toggle className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold text-dark" style={{backgroundColor: "#1EC0D7"}} id="CapMoiGiayPhep">
                                    Cấp mới giấy phép
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="col-11" style={{backgroundColor: "#1EC0D7"}}>
                                    <Dropdown.Item href="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/cap-moi">Cấp mới giấy phép</Dropdown.Item>
                                    <Dropdown.Item href="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/quan-ly-cap-moi">Quản lý cấp phép</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/gia-han" style={{backgroundColor: "#41A59F"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Gia hạn giấy phép</Link>
                            <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/dieu-chinh" style={{backgroundColor: "#C5E287"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Điều chỉnh giấy phép</Link>
                            <Link to="#" style={{backgroundColor: "#E2D987"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Hướng dẫn sử dụng</Link>
                        </div>
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
                                    marker.hang_muc_ct[0] ? <Marker position={[marker.hang_muc_ct[0].longitude, marker.hang_muc_ct[0].latitude]} key={key} >
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
                                                    <td className="col-8 py-1">{this.formatDate(marker.gp_thoigiancapphep)}</td>
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
                                        <Link to={'/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/xem-thong-tin-chung/'+marker.id} className="card-link d-block text-center">Chi tiết công trình</Link>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))}
                            </MapContainer>

                            <div className="col-12 p-0 ">
                                <div className="col-12 row align-items-center my-1 px-0 mx-0">
                                    <div className="col-lg-3">
                                        <Input.Search
                                            allowClear
                                            onSearch={nameSearch =>
                                                this.setState({
                                                    dataSource: this.state.dataSource.filter(person =>
                                                        person.gp_sogiayphep.includes(nameSearch)
                                                    )
                                                })
                                            }
                                            placeholder="--Nhập số giấy phép--"
                                        />
                                    </div>
                                    <Select className="col-lg-2" defaultValue="conhieuluc" onChange={this.handleFilter}>
                                        <Option value="all">-- Chọn hiệu lực --</Option>
                                        <Option value="conhieuluc">Còn hiệu lực</Option>
                                        <Option value="chuapheduyet">Chưa phê duyệt</Option>
                                        <Option value="hethieuluc">Hết hiệu lực</Option>
                                        <Option value="saphethieuluc">Sắp hết hiệu lực</Option>
                                    </Select>
                                    <div className="col-lg-2 px-2"><button className="col-6 fw-bold btn bg-lightblue d-flex align-items-center justify-content-center font-13">Tìm &nbsp;<SearchOutlined /></button></div>
                                </div>
                                <div className="table-responsive">
                                    <ConfigProvider locale={vnVN}>
                                        <Table  className="table table-sm table-bordered col-12 table-hover text-center" 
                                            columns={columns} 
                                            loading={this.state.loading}
                                            onChange={this.handleTableChange}
                                            dataSource={this.state.dataSource}
                                            pagination={this.state.pagination} 
                                            pagination={{ pageSize: 10}}/>
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