import React from 'react';
import Header from "../../Shared/Header";
import Table from 'react-bootstrap/Table'
import { MoreOutlined } from "@ant-design/icons";
import { Modal, Tabs } from 'antd';

import { Line } from 'react-chartjs-2';

import { MapContainer, Marker, Popup } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import axios from "axios";
import configData from "../../config.json";
import { trackPromise } from 'react-promise-tracker';
import ReactLeafletKml from 'react-leaflet-kml';
import { getToken, removeUserSession } from '../../Shared/Auth';

import * as L from 'leaflet';

import grayMarker from '../../Shared/marker-gray.png';

const grayIcon = L.icon({
    iconUrl: grayMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'grayMarker',
});

const { TabPane } = Tabs;

export default class HeThongQuanTracNuocMatMua extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            center: [21.529737201190642, 103.9692398828125],
			zoom: 8,
            visible: false,
            activeModal: null,
            dataSource: [],
            pagination: {},
            loading: false,
            showMapLayer: false,
            showMapLegend: true,
            kml: null,
        };
        
        this.mapRef = React.createRef();
    }

    componentDidMount(){
        document.title = "Hệ thống quan trắc | Hồ chứa | Giám sát tài nguyên nước Sơn La";

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

    clickHandler = (e, index) => {
        this.setState({ activeModal: index })
    }
    
    hideModal = () => {
        this.setState({ activeModal: null })
    }
    
    render(){
        const data = {
            labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00','00:06', '07:00', '08:00', '09:00', '10:00', '11:00','12:00', '13:00', '14:00', '15:00', '16:00', '17:00','18:00','19:00','20:00','21:00','22:00','23:00',],
            datasets: [
              {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3,],
                backgroundColor: [
                  'green',
                ],
                borderColor: [
                    'green',
                ],
                borderWidth: 1,
              },
            ],
          };
          
          const options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };
        return(
            <div className="p-0">
                <Header headTitle="QUAN TRẮC | NƯỚC MẶT | LƯU LƯỢNG ĐẾN HỒ " previousLink="/he-thong-quan-trac" showHeadImage={true} layout37={true} />
                <main className="row m-0 p-0">
                    <div className="col-12 col-lg-3 px-0 menu-home">
                        <div className="row justify-content-between mx-0">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="loai_ho" className="fw-bold" >Loại hồ</label>
                                    <select className="form-select form-select-sm" id="loai_ho">
                                        <option>Tất cả</option>
                                        <option>Hồ thủy điện</option>
                                        <option>Hồ thủy lợi</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <label className="fw-bold form-label" htmlFor="from_date">Từ ngày</label>
                                <input id="from_date" type="date" className="form-control form-control-sm" />
                            </div>
                            <div className="col-sm-4">
                                <label className="fw-bold form-label" htmlFor="to_date">Đến ngày</label>
                                <input id="to_date" type="date" className="form-control form-control-sm" />
                            </div>
                        </div>
                        <div className="row m-0 p-0 surfacewater-usage">
                        <Table striped bordered hover responsive>
                            <thead className="bg-lightblue">
                                <tr>
                                    <th className="text-center text-nowrap align-center">Tên Hồ</th>
                                    <th className="text-center text-nowrap align-center" style={{width:110}}>Mực Nước</th>
                                    <th className="text-center text-nowrap align-center">W</th>
                                    <th className="text-center text-nowrap align-center">Q <sub>đến</sub></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="cursor_pointer">
                                    <td>
                                        <div className="m-0 fw-bold">
                                            <span className="stt_table_quantrac">1. </span>
                                            <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" />
                                            <p className="text-primary">
                                                Nà Bó
                                                <span className="d-inline-block">
                                                    <span className="p-1 d-flex align-items-center justify-content-center" onClick={(e) => this.clickHandler(e, 1)}>
                                                        <MoreOutlined />
                                                    </span>
                                                    <Modal
                                                        className="modal-quantrac"
                                                        scrollableBody={true}
                                                        title="THÔNG TIN QUAN TRẮC"
                                                        width={1500}
                                                        visible={this.state.activeModal === 1} 
                                                        onCancel={this.hideModal}
                                                        footer={null}
                                                    >
                                                        <div className="modal_quantrac">
                                                            <Tabs defaultActiveKey="1" type="card">
                                                                <TabPane tab="Biểu Đồ" key="1">
                                                                    <div className="row m-0">
                                                                        <span className="fw-bold col-sm-4">SỐ LIỆU QUAN TRẮC MỰC NƯỚC HỒ</span> 
                                                                        <div className="col-sm-8">
                                                                            <div className="row justify-content-end mx-0">
                                                                                <div className="col-sm-4 row jistify-content-end align-items-center m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-label text-end" htmlFor="from_date">Từ ngày: </label>
                                                                                    <input id="from_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                                <div className="col-sm-4 row jistify-content-end m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-labe text-end" htmlFor="to_date">Đến ngày: </label>
                                                                                    <input id="to_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <Line width={600} height={200} data={data} options={options} />      
                                                                </TabPane>
                                                                <TabPane tab="Bảng Biểu" key="2">
                                                                    <div className="row m-0">
                                                                        <span className="fw-bold col-sm-4">SỐ LIỆU QUAN TRẮC MỰC NƯỚC HỒ</span> 
                                                                        <div className="col-sm-8">
                                                                            <div className="row justify-content-end mx-0">
                                                                                <div className="col-sm-4 row jistify-content-end align-items-center m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-label text-end" htmlFor="from_date">Từ ngày: </label>
                                                                                    <input id="from_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                                <div className="col-sm-4 row jistify-content-end m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-labe text-end" htmlFor="to_date">Đến ngày: </label>
                                                                                    <input id="to_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <Table className="table_quantrac" striped bordered hover>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th>Thời gian</th>
                                                                                <th>Mực nước hồ (m)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td>19/07/2021 13:00:00</td>
                                                                                <td>735.8</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>
                                                                </TabPane>
                                                                <TabPane tab="Cập nhật" key="3">
                                                                    <p className="fw-bold m-0"> THÊM MỚI SỐ LIỆU QUAN TRẮC </p>
                                                                    <div className="row col-sm-12 mx-0 p-0 mb-2">
                                                                        <div className="col-sm-12 row m-0 p-0">
                                                                            <div className="col-sm-8 row m-0 p-0">
                                                                                <div className="col-sm-6 row m-0 p-2 align-items-center">
                                                                                    <label className="fw-bold w-50 form-label" htmlFor="to_date">Hồ chứa: </label>
                                                                                    <input id="ho_chua" type="text" className="form-control w-50 form-control-sm" />
                                                                                </div>
                                                                                <div className="col-sm-6 row m-0 p-2 align-items-center">
                                                                                    <label className="fw-bold w-50 form-label" htmlFor="to_date">Ngày: </label>
                                                                                    <input id="ngay" type="date" className="form-control w-50 form-control-sm" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-4 p-0">
                                                                                <p className="fw-bold m-0"> TRUNG BÌNH NGÀY </p>
                                                                                <div className="col-sm-12 row m-0 p-2 align-items-center">
                                                                                    <label className="fw-bold w-50 form-label" htmlFor="to_date">Mực nước hồ: </label>
                                                                                    <input id="ho_chua" type="text" className="form-control w-50 form-control-sm" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-12 row justufy-content-start m-0 p-0">
                                                                            <div>
                                                                                <button className="btn btn-sm btn-success col-sm-1 mx-1" type="button"> Nhập file XLS </button>
                                                                                <button className="btn btn-sm btn-danger col-sm-1 mx-1" type="reset"> Xóa </button>
                                                                                <button className="btn btn-sm btn-primary col-sm-1 mx-1" type="button"> Cập nhật </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <p className="fw-bold m-0">CHI TIẾT</p>
                                                                    <Table className="table_quantrac" striped bordered hover>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th>Ngày</th>
                                                                                <th>Giờ</th>
                                                                                <th>Mực nước hồ (mm)</th>
                                                                                <th>Lưu lượng đến (m³/s)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        <tr>
                                                                                <td>1</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>00:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>01:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>3</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>02:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>4</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>03:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>5</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>04:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>6</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>05:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>7</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>06:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>8</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>07:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>9</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>08:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>10</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>09:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>11</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>10:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>12</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>11:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>13</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>12:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>14</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>13:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>15</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>14:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>16</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>15:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>17</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>16:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>18</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>17:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>19</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>18:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>20</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>19:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>21</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>20:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>22</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>21:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>23</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>22:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>24</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>23:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>     
                                                                </TabPane>
                                                            </Tabs>
                                                        </div>
                                                    </Modal>
                                                </span>
                                            </p>
                                        </div>
                                        <p className="m-0 text-warning">
                                            Nguồn: Author
                                        </p>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="text-center text-nowrap fw-bold mb-0">735.8</p>
                                            <p className="text-center text-nowrap mb-0">(m)</p>
                                            <p className="text-center mb-0">Cập nhật <br /> 07:00</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="text-center text-nowrap fw-bold mb-0"> - </p>
                                            <p className="text-center text-nowrap mb-0">(tr.m³)</p>
                                            <p className="text-center text-italic text-danger mb-0"> Tỷ lệ - % </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="text-center text-nowrap fw-bold mb-0"> - </p>
                                            <p className="text-center text-nowrap mb-0">(m³/s)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor_pointer">
                                    <td>
                                        <div className="m-0 fw-bold">
                                            <span className="stt_table_quantrac">2. </span>
                                            <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" />
                                            <p className="text-primary">
                                                Nà Bó
                                                <span className="d-inline-block">
                                                    <span className="p-1 d-flex align-items-center justify-content-center" onClick={(e) => this.clickHandler(e, 2)}>
                                                        <MoreOutlined />
                                                    </span>
                                                    <Modal
                                                        className="modal-quantrac"
                                                        scrollableBody={true}
                                                        title="THÔNG TIN QUAN TRẮC"
                                                        width={1500}
                                                        visible={this.state.activeModal === 2} 
                                                        onCancel={this.hideModal}
                                                        footer={null}
                                                    >
                                                        <div className="modal_quantrac">
                                                            <Tabs defaultActiveKey="1" type="card">
                                                                <TabPane tab="Biểu Đồ" key="1">
                                                                    <div className="row m-0">
                                                                        <span className="fw-bold col-sm-4">SỐ LIỆU QUAN TRẮC MỰC NƯỚC HỒ</span> 
                                                                        <div className="col-sm-8">
                                                                            <div className="row justify-content-end mx-0">
                                                                                <div className="col-sm-4 row jistify-content-end align-items-center m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-label text-end" htmlFor="from_date">Từ ngày: </label>
                                                                                    <input id="from_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                                <div className="col-sm-4 row jistify-content-end m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-labe text-end" htmlFor="to_date">Đến ngày: </label>
                                                                                    <input id="to_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <Line width={600} height={200} data={data} options={options} />      
                                                                </TabPane>
                                                                <TabPane tab="Bảng Biểu" key="2">
                                                                    <div className="row m-0">
                                                                        <span className="fw-bold col-sm-4">SỐ LIỆU QUAN TRẮC MỰC NƯỚC HỒ</span> 
                                                                        <div className="col-sm-8">
                                                                            <div className="row justify-content-end mx-0">
                                                                                <div className="col-sm-4 row jistify-content-end align-items-center m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-label text-end" htmlFor="from_date">Từ ngày: </label>
                                                                                    <input id="from_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                                <div className="col-sm-4 row jistify-content-end m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-labe text-end" htmlFor="to_date">Đến ngày: </label>
                                                                                    <input id="to_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <Table className="table_quantrac" striped bordered hover>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th>Thời gian</th>
                                                                                <th>Mực nước hồ (m)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td>19/07/2021 13:00:00</td>
                                                                                <td>735.8</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>
                                                                </TabPane>
                                                                <TabPane tab="Cập nhật" key="3">
                                                                    <p className="fw-bold m-0"> THÊM MỚI SỐ LIỆU QUAN TRẮC </p>
                                                                    <div className="row col-sm-12 mx-0 p-0 mb-2">
                                                                        <div className="col-sm-12 row m-0 p-0">
                                                                            <div className="col-sm-8 row m-0 p-0">
                                                                                <div className="col-sm-6 row m-0 p-2 align-items-center">
                                                                                    <label className="fw-bold w-50 form-label" htmlFor="to_date">Hồ chứa: </label>
                                                                                    <input id="ho_chua" type="text" className="form-control w-50 form-control-sm" />
                                                                                </div>
                                                                                <div className="col-sm-6 row m-0 p-2 align-items-center">
                                                                                    <label className="fw-bold w-50 form-label" htmlFor="to_date">Ngày: </label>
                                                                                    <input id="ngay" type="date" className="form-control w-50 form-control-sm" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-4 p-0">
                                                                                <p className="fw-bold m-0"> TRUNG BÌNH NGÀY </p>
                                                                                <div className="col-sm-12 row m-0 p-2 align-items-center">
                                                                                    <label className="fw-bold w-50 form-label" htmlFor="to_date">Mực nước hồ: </label>
                                                                                    <input id="ho_chua" type="text" className="form-control w-50 form-control-sm" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-12 row justufy-content-start m-0 p-0">
                                                                            <div>
                                                                                <button className="btn btn-sm btn-success col-sm-1 mx-1" type="button"> Nhập file XLS </button>
                                                                                <button className="btn btn-sm btn-danger col-sm-1 mx-1" type="reset"> Xóa </button>
                                                                                <button className="btn btn-sm btn-primary col-sm-1 mx-1" type="button"> Cập nhật </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <p className="fw-bold m-0">CHI TIẾT</p>
                                                                    <Table className="table_quantrac" striped bordered hover>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th>Ngày</th>
                                                                                <th>Giờ</th>
                                                                                <th>Mực nước hồ (mm)</th>
                                                                                <th>Lưu lượng đến (m³/s)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        <tr>
                                                                                <td>1</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>00:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>01:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>3</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>02:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>4</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>03:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>5</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>04:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>6</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>05:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>7</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>06:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>8</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>07:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>9</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>08:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>10</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>09:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>11</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>10:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>12</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>11:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>13</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>12:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>14</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>13:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>15</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>14:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>16</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>15:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>17</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>16:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>18</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>17:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>19</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>18:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>20</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>19:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>21</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>20:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>22</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>21:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>23</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>22:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>24</td>
                                                                                <td>19/07/2021</td>
                                                                                <td>23:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>     
                                                                </TabPane>
                                                            </Tabs>
                                                        </div>
                                                    </Modal>
                                                </span>
                                            </p>
                                        </div>
                                        <p className="m-0 text-warning">
                                            Nguồn: Author
                                        </p>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="text-center text-nowrap fw-bold mb-0">715.3</p>
                                            <p className="text-center text-nowrap mb-0">(m)</p>
                                            <p className="text-center mb-0">Cập nhật <br /> 07:00</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="text-center text-nowrap fw-bold mb-0"> 0.11 </p>
                                            <p className="text-center text-nowrap mb-0">(tr.m³)</p>
                                            <p className="text-center text-italic text-danger mb-0"> Tỷ lệ 99.28 % </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="text-center text-nowrap fw-bold mb-0"> - </p>
                                            <p className="text-center text-nowrap mb-0">(m³/s)</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="col-12 col-lg-9 map-container px-md-0 position-relative">
                        <MapContainer className="col-12 h-100 w-100" whenCreated={ mapInstance => { this.mapRef.current = mapInstance } } center={this.state.center} zoom={this.state.zoom}>
                            <BasemapLayer name="Imagery" />
                            <BasemapLayer name="ImageryLabels" />

                            {this.state.kml && <ReactLeafletKml kml={this.state.kml} />}

                            {/* Diem mua*/}
                            { this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "q-den-ho" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={grayIcon} >
                                    <Popup>
                                    <div>
                                        <h5 className="card-title fw-bold font-13">Mưa - {marker.location_name}</h5>
                                    </div>
                                    </Popup>
                                </Marker> : ""
                                ))
                            }
                        </MapContainer>
                    </div>
                </main>
            </div>
        )
    }

}