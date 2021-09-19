import React from 'react';

// IMPORT HEADER
import Header from "../../../Shared/Header";

import LeftBarNav from "../../LeftBarNav";

import { Link } from 'react-router-dom';

// IMPORT FROM ANT
import { FilterOutlined } from "@ant-design/icons";
import { Button, Table, Form, Select, DatePicker, TimePicker } from 'antd';



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

const blueIcon = L.icon({
    iconUrl: blueMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'blueMarker',
});

export default class HeThongQuanTracXaThaiLuuLuongXaThai extends React.Component{
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
        // PAGE TITLE
        document.title = "Hệ thống quan trắc | Hồ chứa | Giám sát tài nguyên nước Sơn La";

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
    // OPEN MODAL
    clickHandler = (e, index, gp_sogiayphep) => {
        this.setState({ 
            activeModal: index,
            activeRows: gp_sogiayphep,
         })
    }
    // CLOSE MODAL
    hideModal = () => {
        this.setState({ 
            activeModal: null,
        })
    }

    
    render(){
        //   DATA IN TABLE CONG TRINH
        const dataCongTrinh = [
            {
                key: '1',
                id: '1',
                mucnuocho: 725.1,
                updatetime: "07:00",
                gp_sogiayphep: 'GP/22-BTNMT',
                congtrinh_ten: 'Thủy điện1',
                congtrinh_diachi: "123 đường 123 - tp sơn la",
                chugiayphep_ten: 'Công ty 1',
                tramcapphep_soluong: 2,
                congtrinh_matketnoi: 1,
                congtrinh_vuotnguong: 1,
            },
            {
                key: '2',
                id: '2',
                mucnuocho: 725.1,
                updatetime: "07:00",
                gp_sogiayphep: 'GP/22-BTNMT',
                congtrinh_ten: 'Thủy điện2',
                congtrinh_diachi: "123 đường 123 - tp sơn la",
                chugiayphep_ten: 'Công ty 1',
                tramcapphep_soluong: 2,
                congtrinh_matketnoi: 0,
                congtrinh_vuotnguong: 0,
            },
            {
                key: '3',
                id: '3',
                mucnuocho: 725.1,
                updatetime: "07:00",
                gp_sogiayphep: 'GP/22-BTNMT',
                congtrinh_ten: 'Thủy điện3',
                congtrinh_diachi: "123 đường 123 - tp sơn la",
                chugiayphep_ten: 'Công ty 1',
                tramcapphep_soluong: 2,
                congtrinh_matketnoi: 1,
                congtrinh_vuotnguong: 1,
            },
            {
                key: '4',
                id: '4',
                mucnuocho: 725.1,
                updatetime: "07:00",
                gp_sogiayphep: 'GP/22-BTNMT',
                congtrinh_ten: 'Thủy điện4',
                congtrinh_diachi: "123 đường 123 - tp sơn la",
                chugiayphep_ten: 'Công ty 1',
                tramcapphep_soluong: 2,
                congtrinh_matketnoi: 0,
                congtrinh_vuotnguong: 0,
            },
            {
                key: '5',
                id: '5',
                mucnuocho: 725.1,
                updatetime: "07:00",
                gp_sogiayphep: 'GP/22-BTNMT',
                congtrinh_ten: 'Thủy điện5',
                congtrinh_diachi: "123 đường 123 - tp sơn la",
                chugiayphep_ten: 'Công ty 1',
                tramcapphep_soluong: 2,
                congtrinh_matketnoi: 0,
                congtrinh_vuotnguong: 0,
            },
            {
                key: '6',
                id: '6',
                mucnuocho: 725.1,
                updatetime: "07:00",
                gp_sogiayphep: 'GP/22-BTNMT',
                congtrinh_ten: 'Thủy điện6',
                congtrinh_diachi: "123 đường 123 - tp sơn la",
                chugiayphep_ten: 'Công ty 1',
                tramcapphep_soluong: 2,
                congtrinh_matketnoi: 0,
                congtrinh_vuotnguong: 0,
            },
            {
                key: '7',
                id: '7',
                mucnuocho: 725.1,
                updatetime: "07:00",
                gp_sogiayphep: 'GP/22-BTNMT',
                congtrinh_ten: 'Thủy điện7',
                congtrinh_diachi: "123 đường 123 - tp sơn la",
                chugiayphep_ten: 'Công ty 1',
                tramcapphep_soluong: 2,
                congtrinh_matketnoi: 1,
                congtrinh_vuotnguong: 1,
            },
            {
                key: '8',
                id: '8',
                mucnuocho: 725.1,
                updatetime: "07:00",
                gp_sogiayphep: 'GP/22-BTNMT',
                congtrinh_ten: 'Thủy điện8',
                congtrinh_diachi: "123 đường 123 - tp sơn la",
                chugiayphep_ten: 'Công ty 1',
                tramcapphep_soluong: 2,
                congtrinh_matketnoi: 0,
                congtrinh_vuotnguong: 0,
            },
            {
                key: '9',
                id: '9',
                mucnuocho: 725.1,
                updatetime: "07:00",
                gp_sogiayphep: 'GP/22-BTNMT',
                congtrinh_ten: 'Thủy điện9',
                congtrinh_diachi: "123 đường 123 - tp sơn la",
                chugiayphep_ten: 'Công ty 1',
                tramcapphep_soluong: 2,
                congtrinh_matketnoi: 0,
                congtrinh_vuotnguong: 0,
            },
            {
                key: '10',
                id: '10',
                mucnuocho: 725.1,
                updatetime: "07:00",
                gp_sogiayphep: 'GP/22-BTNMT',
                congtrinh_ten: 'Thủy điện10',
                congtrinh_diachi: "123 đường 123 - tp sơn la",
                chugiayphep_ten: 'Công ty 1',
                tramcapphep_soluong: 2,
                congtrinh_matketnoi: 0,
                congtrinh_vuotnguong: 0,
            },
            {
                key: '11',
                id: '11',
                mucnuocho: 725.1,
                updatetime: "07:00",
                gp_sogiayphep: 'GP/22-BTNMT',
                congtrinh_ten: 'Thủy điện11',
                congtrinh_diachi: "123 đường 123 - tp sơn la",
                chugiayphep_ten: 'Công ty 1',
                tramcapphep_soluong: 2,
                congtrinh_matketnoi: 0,
                congtrinh_vuotnguong: 0,
            },
        ];
        // COLUMN TABLE CONG TRINH
        const columnCongTrinh = [
            {
                title: 'Số giấy phép',
                dataIndex: 'gp_sogiayphep',
                key: 'gp_sogiayphep',
            },
            {
                title: () => { 
                    return <span>Vị trí xả thải</span>
                } ,
                dataIndex: 'congtrinh_ten',
                key: 'congtrinh_ten',
                render: (text, render, index) => (
                    <div className="d-flex align-items-center">
                        <span className="px-2">
                            <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" />
                        </span>
                        <span>
                            {render.congtrinh_ten}
                        </span>
                    </div>
                )
            },
            {
                title: () => (
                    <span>Tọa độ (VN2000, <br /> Kinh tuyến trục 104⁰, <br /> múi chiếu 3⁰ </span>
                ),
                children: [
                    {
                      title: 'X',
                      dataIndex: '',
                      key: '',
                      align: 'center',
                    },
                    {
                        title: 'Y',
                        dataIndex: '',
                        key: '',
                        align: 'center',
                    },
                ],
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: () => (
                    <span>Nguồn nước <br /> xả thải </span>
                ),
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: () => (
                    <span>Lưu lượng xả thải (m3/s)</span>
                ),
                children: [
                    {
                        title: () => (
                            <span>Lưu lượng <br /> xả thải <br /> (m3/ngày đêm)</span>
                        ),
                      dataIndex: '',
                      key: '',
                      align: 'center',
                    },
                    {
                        title: () => (
                            <span>Giá trị <br /> lớn nhất</span>
                        ),
                        dataIndex: '',
                        key: '',
                        align: 'center',
                    },
                    {
                        title: () => (
                            <span>Giá trị <br /> nhỏ nhất</span>
                        ),
                        dataIndex: '',
                        key: '',
                        align: 'center',
                    },
                    {
                        title: () => (
                            <span>Giá trị <br /> trung bình</span>
                        ),
                        dataIndex: '',
                        key: '',
                        align: 'center',
                    },
                ],
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: '',
                dataIndex: '',
                key: '',
                align: 'center',
                render: (text, record, index) => (
                    <>
                        <Link to={"/he-thong-quan-trac/xa-thai/luu-luong-xa-thai/theo-doi-quan-trac/"+record.id} onClick={(e) => this.clickHandler(e, record.id, record.gp_sogiayphep, record.congtrinh_ten)}>Xem</Link>
                    </>
                ),
            },
        ];


        return(
            <div className="p-0">
                <Header headTitle="QUAN TRẮC LƯU LƯỢNG XẢ THẢI " previousLink="/he-thong-quan-trac" showHeadImage={true} layout37={true} />
                <main className="row m-0 p-0">
                    <div className="col-12 col-lg-3 px-0 menu-home">
                        <LeftBarNav />
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
                        <div className="my-2 col-12 p-0 row m-0">
                            {/* FORM FILTER TRAM QUAN TRAC */}
                            <Form layout="inline" className="justify-content-end">
                                <Form.Item className="p-1 m-0" label="Hồ">
                                    <Select defaultValue="all">
                                        <Select.Option key='all'>Tất cả</Select.Option>
                                        <Select.Option key='thuy-dien'>Thủy điện</Select.Option>
                                        <Select.Option key='thuy-loi'>Thủy lợi</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item className="p-1 m-0" label="Sắp xếp">
                                    <Select defaultValue="default">
                                        <Select.Option key='default'>Mặc định</Select.Option>
                                        <Select.Option key='minmax'>Từ thấp đến cao</Select.Option>
                                        <Select.Option key='maxmin'>Từ cao đến thấp</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item className="p-1 m-0" label="Từ">
                                    <TimePicker placeholder="Chọn giờ" />
                                    <DatePicker placeholder="Chọn ngày" />
                                </Form.Item>
                                <Form.Item className="p-1 m-0" label="Đến">
                                    <TimePicker placeholder="Chọn giờ" />
                                    <DatePicker placeholder="Chọn ngày" />
                                </Form.Item>
                                <Form.Item className="p-1 m-0">
                                    <Button className="d-flex justify-content-center align-items-center">
                                        <FilterOutlined />
                                        Lọc
                                    </Button>
                                </Form.Item>
                            </Form>
                            {/* END FORM FILTER TRAM QUAN TRAC */}
                        </div>
                        <div className="px-2">
                            {/* TABLE SHOW LIST TRAM QUAN TRAC MUC NUOC HO */}
                            <Table bordered dataSource={dataCongTrinh} columns={columnCongTrinh} />
                            {/* END TABLE SHOW LIST TRAM QUAN TRAC MUC NUOC HO */}
                        </div>
                        
                    </div>
                </main>
            </div>
        )
    }

}