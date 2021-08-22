import React from 'react';
import Header from "../../Shared/Header";
import { MoreOutlined } from "@ant-design/icons";
import { Modal, Tabs, Button, Table } from 'antd';

import { Bar } from 'react-chartjs-2';

import { MapContainer, Marker, Popup } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import axios from "axios";
import configData from "../../config.json";
import { trackPromise } from 'react-promise-tracker';
import ReactLeafletKml from 'react-leaflet-kml';
import { getToken, removeUserSession } from '../../Shared/Auth';

import * as L from 'leaflet';

import blueMarker from '../../Shared/marker-blue.png';

const blueIcon = L.icon({
    iconUrl: blueMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'blueMarker',
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
        document.title = "Hệ thống quan trắc | Mưa | Giám sát tài nguyên nước Sơn La";

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
        //   TABLE DATA
        const dataTram = [
            {
                key: '1',
                id: '1',
                tentram: 'Tram 1',
                hientai: 32,
                ngay1: '10',
                ngay3: '15',
            },
            {
                key: '2',
                id: '2',
                tentram: 'Tram 2',
                hientai: 42,
                ngay1: '8',
                ngay3: '9',
            },
        ];
          
        const columnTram = [
            {
                title: 'Tên Trạm',
                dataIndex: 'tentram',
                key: 'tentram',
                render: (text, record) => (
                    <div className="m-0 fw-bold">
                        <p className="m-0">
                            <span className="stt_table_quantrac">{record.id}. </span>
                            <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" />
                            <span className="d-inline-block">
                                <span className="p-1 d-flex align-items-center justify-content-center text-primary" onClick={(e) => this.clickHandler(e, record.id)}>
                                    {record.tentram} <MoreOutlined />
                                </span>
                                <Modal
                                    className="modal-quantrac"
                                    scrollableBody={true}
                                    title={"SỐ LIỆU QUAN TRẮC MƯA - "+record.tentram}
                                    width={1000}
                                    visible={this.state.activeModal === record.id} 
                                    onCancel={this.hideModal}
                                    footer={false}
                                >
                                    <div className="modal_quantrac">
                                        <div className="row p-0 m-0">
                                            <div className="p-0">
                                                <form>
                                                    <div>
                                                        <div className="row mx-0 mb-2">
                                                            <div className="col-6 row mx-0 px-0 align-items-center">
                                                                <div className="col-12">
                                                                    <label className="col-form-label">Từ: </label>
                                                                </div>
                                                                <div className="col-12">
                                                                    <input type="date" className="form-control form-control-sm" />
                                                                </div>
                                                            </div>
                                                            <div className="col-6 row mx-0 px-0 align-items-center">
                                                                <div className="col-12">
                                                                    <label className="col-form-label">Đến: </label>
                                                                </div>
                                                                <div className="col-12">
                                                                    <input type="date" className="form-control form-control-sm" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-auto row mx-0 px-0 align-items-center mb-2">
                                                            <div className="col-md-auto col-12">
                                                                <Button> Lọc </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <Tabs defaultActiveKey="1" type="card">
                                            <TabPane tab="Biểu Đồ" key="1">
                                                <Bar width={600} height={300} data={data} options={options} />      
                                            </TabPane>
                                            <TabPane tab="Bảng Biểu" key="2">
                                                <Table bordered 
                                                    dataSource={dataLuongMua} 
                                                    columns={columnLuongMua}
                                                />
                                            </TabPane>
                                            <TabPane tab="Cập Nhật" key="3">
                                                <form>
                                                    <table className="table table-bordered table-sm">
                                                        <thead>
                                                            <tr>
                                                                <th className="text-center align-center">#</th>
                                                                <th className="text-center align-center">Ngày</th>
                                                                <th className="text-center align-center">Giờ</th>
                                                                <th className="text-center align-center">Lưu lượng Mưa (mm)</th>
                                                                <th className="text-center align-center"> <Button> + </Button> </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1</td>
                                                                <td>22/08/2021</td>
                                                                <td>12:38</td>
                                                                <td colSpan="2"><input type="text" className="form-control form-control-sm" /></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div className="row col-12 m-0 p-0 justify-content-end">
                                                        <div className="col-auto p-0"><Button> Cập Nhật </Button></div>
                                                    </div>
                                                </form>
                                            </TabPane>
                                        </Tabs>
                                    </div>
                                </Modal>
                            </span>
                        </p>
                    </div>
                )
            },
            {
                title: 'Hiện Tại',
                dataIndex: 'hientai',
                key: 'hientai',
            },
            {
                title: 'Ngày 1',
                dataIndex: 'ngay1',
                key: 'ngay1',
            },
            {
                title: 'Ngày 3',
                dataIndex: 'ngay3',
                key: 'ngay3',
            },
        ];

        // DATA LUONG MUA
        const dataLuongMua = [
            {
                key: '1',
                id: '1',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '00:00',
                giamsat_luongmua: '0',
            },
            {
                key: '2',
                id: '2',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '01:00',
                giamsat_luongmua: '0',
            },
            {
                key: '3',
                id: '3',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '02:00',
                giamsat_luongmua: '0',
            },
            {
                key: '4',
                id: '4',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '03:00',
                giamsat_luongmua: '0',
            },
            {
                key: '5',
                id: '5',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '04:00',
                giamsat_luongmua: '0',
            },
            {
                key: '6',
                id: '6',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '05:00',
                giamsat_luongmua: '0',
            },
            {
                key: '7',
                id: '7',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '06:00',
                giamsat_luongmua: '0',
            },
            {
                key: '8',
                id: '8',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '07:00',
                giamsat_luongmua: '0',
            },
            {
                key: '9',
                id: '9',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '08:00',
                giamsat_luongmua: '0',
            },
            {
                key: '10',
                id: '10',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '09:00',
                giamsat_luongmua: '0',
            },
            {
                key: '11',
                id: '11',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '10:00',
                giamsat_luongmua: '0',
            },
            {
                key: '12',
                id: '12',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '11:00',
                giamsat_luongmua: '0',
            },
            {
                key: '13',
                id: '13',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '12:00',
                giamsat_luongmua: '0',
            },
            {
                key: '14',
                id: '14',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '13:00',
                giamsat_luongmua: '0',
            },
            {
                key: '15',
                id: '15',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '14:00',
                giamsat_luongmua: '0',
            },
            {
                key: '16',
                id: '16',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '15:00',
                giamsat_luongmua: '0',
            },
            {
                key: '17',
                id: '17',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '16:00',
                giamsat_luongmua: '0',
            },
            {
                key: '18',
                id: '18',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '17:00',
                giamsat_luongmua: '0',
            },
            {
                key: '19',
                id: '19',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '18:00',
                giamsat_luongmua: '0',
            },
            {
                key: '20',
                id: '20',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '19:00',
                giamsat_luongmua: '0',
            },
            {
                key: '21',
                id: '21',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '20:00',
                giamsat_luongmua: '0',
            },
            {
                key: '22',
                id: '22',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '21:00',
                giamsat_luongmua: '0',
            },
            {
                key: '23',
                id: '23',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '22:00',
                giamsat_luongmua: '0',
            },
            {
                key: '24',
                id: '24',
                giamsat_ngay: '22/08/2021',
                giamsat_gio: '23:00',
                giamsat_luongmua: '0',
            },
        ];
        const columnLuongMua = [
            {
                title: '#',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Ngày',
                dataIndex: 'giamsat_ngay',
                key: 'giamsat_ngay',
            },
            {
                title: 'Giờ',
                dataIndex: 'giamsat_gio',
                key: 'giamsat_gio',
            },
            {
                title: 'Lưu lượng (mm)',
                dataIndex: 'giamsat_luongmua',
                key: 'giamsat_luongmua',
                render: (text, record) => (
                    <div className="m-0 fw-bold">
                        <input type="text" className="form-control form-control-sm" value={record.giamsat_luongmua} readOnly />
                    </div>
                )
            },
        ];
        return(
            <div className="p-0">
                <Header headTitle="QUAN TRẮC MƯA " previousLink="/he-thong-quan-trac" showHeadImage={true} layout37={true} />
                <main className="row m-0 p-0">
                    <div className="col-12 col-lg-3 px-0 menu-home">
                        <div>
                            <form>
                                <div className="row m-0 p-0">
                                    <div className="row mb-2">
                                        <div className="col-6 row mx-0 px-0 align-items-center">
                                            <div className="col-12">
                                                <label className="col-form-label">Từ: </label>
                                            </div>
                                            <div className="col-12">
                                                <input type="date" className="form-control form-control-sm" />
                                            </div>
                                        </div>
                                        <div className="col-6 row mx-0 px-0 align-items-center">
                                            <div className="col-12">
                                                <label className="col-form-label">Đến: </label>
                                            </div>
                                            <div className="col-12">
                                                <input type="date" className="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-auto row mx-0 px-0 align-items-center mb-2">
                                        <div className="col-md-auto col-12">
                                            <Button> Lọc </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="row m-0 p-0">
                            <Table bordered dataSource={dataTram} columns={columnTram} />
                        </div>
                    </div>
                    <div className="col-12 col-lg-9 map-container px-md-0 position-relative">
                        <MapContainer className="col-12 h-100 w-100" whenCreated={ mapInstance => { this.mapRef.current = mapInstance } } center={this.state.center} zoom={this.state.zoom}>
                            <BasemapLayer name="Imagery" />
                            <BasemapLayer name="ImageryLabels" />

                            {this.state.kml && <ReactLeafletKml kml={this.state.kml} />}

                            {/* Diem mua*/}
                            { this.state.dataSource.map((marker, key) => (
                                    marker.location_type === "mua" ? <Marker position={[marker.latitude, marker.longitude]} key={key} icon={blueIcon} >
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