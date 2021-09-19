/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import Header from '../../../../Shared/Header';
import '../../../../Shared/Page.css';
import LeftBar from '../../../LeftBar';
import { Button, Table, Form, DatePicker, TimePicker, Modal } from 'antd';
import { FilterOutlined } from '@ant-design/icons';


// IMPORT LINE CHARTS DATA
import { Line } from 'react-chartjs-2';

// GET DATA FROM API
import axios from "axios";
import configData from "../../../../config.json";
import { trackPromise } from 'react-promise-tracker';
// CHECK AUTH LOGIN
import { getToken, removeUserSession } from '../../../../Shared/Auth';

// MAP
import { MapContainer, Marker, Popup } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import * as L from 'leaflet';
import ReactLeafletKml from 'react-leaflet-kml';
import blueMarker from '../../../../Shared/marker-blue.png';

const blueIcon = L.icon({
    iconUrl: blueMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'blueMarker',
});


export default class HeThongGiamSatLichSuPhatDienNhoHon2MW extends React.Component {
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

    handleOpenModal = (e, id_tram) => {
        this.setState({
            activeModal: id_tram,
        })
    }

    handleCloseModal = () => {
        this.setState({
            activeModal: null,
        })
    }

    render(){

        // LINE CHARTS DATA
        const dataLine = {
            labels: ['00:00 - 24/08/2021', '00:30 - 24/08/2021','01:00 - 24/08/2021', '01:30 - 24/08/2021', '02:00 - 24/08/2021', '02:30 - 24/08/2021','03:00 - 24/08/2021', '03:30 - 24/08/2021', '04:00 - 24/08/2021', '04:30 - 24/08/2021','05:00 - 24/08/2021', '06:00 - 24/08/2021', '06:30 - 24/08/2021', '07:00 - 24/08/2021', '07:30 - 24/08/2021', '08:00 - 24/08/2021', '08:30 - 24/08/2021', '09:00 - 24/08/2021', '09:30 - 24/08/2021', '10:00 - 24/08/2021', '10:30 - 24/08/2021', '11:00 - 24/08/2021', '11:30 - 24/08/2021','12:00 - 24/08/2021', '12:30 - 24/08/2021','13:00 - 24/08/2021', '13:30 - 24/08/2021','14:00 - 24/08/2021', '14:30 - 24/08/2021', '15:00 - 24/08/2021', '15:30 - 24/08/2021', '16:00 - 24/08/2021', '16:30 - 24/08/2021', '17:00 - 24/08/2021', '17:30 - 24/08/2021', '18:00 - 24/08/2021', '18:30 - 24/08/2021', '19:00 - 24/08/2021', '19:30 - 24/08/2021', '20:00 - 24/08/2021', '20:30 - 24/08/2021', '21:00 - 24/08/2021', '21:30 - 24/08/2021', '22:00 - 24/08/2021', '22:30 - 24/08/2021', '23:00 - 24/08/2021', '23:30 - 24/08/2021'],
            datasets: [
              {
                label: 'Lưu lượng',
                data: [122, 132, 122, 152, 122, 132, 222, 142, null, 152, 122, 132, 152, 132, 152, 122, 122, 112, null, 152, 122, 132, 144, 155,122, 132, 122, 152, 122, 132, 222, 142, 148, 152, 122, 132, 152, 132, 152, 122, 122, 112, 122, 152, 122, 132, 144, 155],
                backgroundColor: [
                  'rgba(75,192,192,0.2)',
                ],
                borderColor: [
                    'rgba(75,192,192,1)',
                ],
                borderWidth: 1,
                fill: true,
              },
            ],
          };
        //   LINE CHARTS OPTIONS
          const optionLine = {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                xAxes: {
                    display: true,
                    gridLines: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Ngày & giờ'
                    },
                },
                yAxes: {
                    display: true,
                    gridLines: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Lưu lượng (m3/s)'
                    },
                    beginAtZero: true,
                    min: 0
                }
            }
          };

        const dataSource = [
            {
                key: '1',
                id: '1',
                gp_sogiayphep: '86/GPTNMT',
                gp_ngayky: '15/05/2005',
                congtrinh_ten: 'Công Trình Thủy Điện 1',
                chugiayphep_ten: '',
                gp_ngayhieuluc: '',
                gp_thoihan: '',
                hieulucgiayphep: 'conhieuluc',
            }
        ];
          
        const columns = [
            {
                title: 'Số giấy phép',
                dataIndex: 'gp_sogiayphep',
                key: 'gp_sogiayphep',
            },
            {
                title: 'Ngày ký',
                dataIndex: 'gp_ngayky',
                key: 'gp_ngayky',
            },
            {
                title: 'Tên chủ đầu tư',
                dataIndex: '',
                key: '',
            },
            {
                title: 'Tên công trình',
                dataIndex: 'congtrinh_ten',
                key: 'congtrinh_ten',
            },
            {
                title: 'Ký hiệu công trình',
                dataIndex: '',
                key: '',
            },
            {
                title: 'Địa chỉ công trình',
                dataIndex: '',
                key: '',
            },
            {
                title: 'Nguồn nước khai thác',
                dataIndex: '',
                key: '',
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
                title: 'Số trạm quan trắc',
                dataIndex: '',
                key: '',
                render: (text, record) => (
                    <span>4</span>
                )
            },
        ];

        const dataTram = [
            {
                key: '1',
                id: '1',
                quantrac_tentram: 'THUONGLUU',
                tram_kyhieu: '',
                tram_chiso: 'LUULUONG',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: [1, 3, 1, 8],
            },
            {
                key: '2',
                id: '2',
                quantrac_tentram: 'NHAMAY',
                tram_kyhieu: '',
                tram_chiso: 'LUULUONG',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: [2, 5, 3, 12],
            },
            {
                key: '3',
                id: '3',
                quantrac_tentram: 'QUATRAN',
                tram_kyhieu: '',
                tram_chiso: 'LUULUONG',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: [8, 6, 1, 6],
            },
            {
                key: '4',
                id: '4',
                quantrac_tentram: 'DCTT',
                tram_kyhieu: '',
                tram_chiso: 'LUULUONG',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: [1, 1, 5, 18],
            }
        ];

        const columnTram = [
            {
                title: 'Tên trạm',
                dataIndex: 'quantrac_tentram',
                key: 'quantrac_tentram',
            },
            {
                title: 'Ký hiệu trạm',
                dataIndex: '',
                key: '',
            },
            {
                title: 'Chỉ số',
                dataIndex: 'tram_chiso',
                key: 'tram_chiso',
            },
            {
                title: 'Thời gian nhận',
                dataIndex: '',
                key: '',
            },
            {
                title: 'Giá trị (m3/s)',
                dataIndex: '',
                key: '',
            },
            {
                title: 'Trạng thái kết nối',
                dataIndex: '',
                key: '',
                width: 200,
                render: (text, record) => (
                    <div className="d-flex justify-content-between">
                        <div className="license_status bg-success px-3 text-light"> {record.tram_trangthaiketnoi[0]} </div>
                        <div className="license_status bg-warning px-3 text-light"> {record.tram_trangthaiketnoi[1]} </div>
                        <div className="license_status bg-danger px-3 text-light"> {record.tram_trangthaiketnoi[2]} </div>
                        <div className="license_status bg-secondary px-3 text-light"> {record.tram_trangthaiketnoi[3]} </div>
                    </div>
                )
            },
            {
                title: 'Xem lịch sử',
                key: '',
                align: 'center',
                render: (text, record) => (
                    <>
                        <span className="fw-bold text-primary" onClick={(e) => { this.handleOpenModal(e, record.id) }} >Xem</span>
                        <Modal
                            className="modal-quantrac"
                            title={false}
                            centered={true}
                            width={1500}
                            visible={this.state.activeModal === record.id} 
                            onCancel={this.handleCloseModal}
                            footer={false}
                            destroyOnClose={true}
                        >
                            <p className="fw-bold"><span className="text-danger">LỊCH SỬ GIÁM SÁT TRẠM QUAN TRẮC: </span> <span> {record.quantrac_tentram} </span> </p>
                            <div>
                                <Line data={dataLine} options={optionLine} width={1000} height={600} />
                            </div>
                        </Modal>
                    </>
                ),
            },
        ];

        return(
            <div className="pt-1 px-1">
                <Header headTitle="HỆ THỐNG GIÁM SÁT CÔNG TRÌNH THỦY ĐIỆN NHỎ HƠN 2MW" previousLink="/he-thong-giam-sat/phat-dien-nho-hon-2mw" showHeadImage={true} layoutfull={true} />
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
                            <Table columns={columns}  dataSource={dataSource} bordered pagination={false} />
                            <Form layout="inline" className="justify-content-end mb-2">
                                <Form.Item className="p-1 m-0" label="Từ">
                                    <DatePicker placeholder="Chọn ngày" />
                                    <TimePicker placeholder="Chọn giờ" />
                                </Form.Item>
                                <Form.Item className="p-1 m-0" label="Đến">
                                    <DatePicker placeholder="Chọn ngày" />
                                    <TimePicker placeholder="Chọn giờ" />
                                </Form.Item>
                                <Form.Item className="p-1 m-0">
                                    <Button type="primary" className="d-flex justify-content-center align-items-center">
                                        <FilterOutlined />
                                        Lọc
                                    </Button>
                                </Form.Item>
                            </Form>
                            <div className="row m-0 p-0">
                                <div className="col-lg-12 row justify-content-center align-items-center mx-0 mb-2">
                                    <div className="col-sm-2">Bình thường: 
                                        <span className="py-1 px-3 fw-bold text-light bg-success">12</span>
                                    </div>
                                    <div className="col-sm-2">Mất kết nối: 
                                        <span className="py-1 px-3 fw-bold text-light bg-warning">15</span>
                                    </div>
                                    <div className="col-sm-2">Vượt ngưỡng: 
                                        <span className="py-1 px-3 fw-bold text-light bg-danger">10</span>
                                    </div>
                                    <div className="col-sm-2">Chưa gửi dữ liệu: 
                                        <span className="py-1 px-3 fw-bold text-light bg-secondary">44</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="table-responsive px-2">
                                <Table columns={columnTram} dataSource={dataTram} bordered />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}