import React from 'react';

// IMPORT HEADER
import Header from "../../../Shared/Header";

import LeftBarNav from "../../LeftBarNav";

import { Link } from 'react-router-dom';

// IMPORT FROM ANT
import { PlusCircleOutlined, FilterOutlined } from "@ant-design/icons";
import { Modal, Button, Table, Form, Select, DatePicker, Input, TimePicker } from 'antd';



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

export default class HeThongQuanTracNuocMatLuuLuongDenHo extends React.Component{
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
                congtrinh_ten: 'Thủy Điện 1',
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
                congtrinh_ten: 'Thủy Điện 2',
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
                congtrinh_ten: 'Thủy Điện 3',
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
                congtrinh_ten: 'Thủy Điện 4',
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
                congtrinh_ten: 'Thủy Điện 5',
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
                congtrinh_ten: 'Thủy Điện 6',
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
                congtrinh_ten: 'Thủy Điện 7',
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
                congtrinh_ten: 'Thủy Điện 8',
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
                congtrinh_ten: 'Thủy Điện 9',
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
                congtrinh_ten: 'Thủy Điện 10',
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
                congtrinh_ten: 'Thủy Điện 11',
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
                    return  <div className="d-flex align-items-center">
                                <div className="col-8 p-0">Tên Hồ</div>
                                    {/* <div className="p-1 m-0 col-4 d-flex flex-row-reverse">
                                        <Button className="d-flex align-items-center" type="ghost" onClick={(e) => this.clickHandler(e, "yeucau_themtrammoi")}> <PlusCircleOutlined /> Thêm hồ</Button>
                                        <Modal
                                            className="modal-quantrac"
                                            scrollableBody={true}
                                            title="YÊU CẦU THÊM MỚI HỒ"
                                            width={500}
                                            centered={true}
                                            visible={this.state.activeModal === "yeucau_themtrammoi"}
                                            onCancel={this.hideModal}
                                            footer={false}
                                        >
                                            <div>
                                                <Form labelCol={{ span: 24 }}>
                                                    <Form.Item label="Tên hồ" style={{ marginBottom: 0 }}>
                                                        <Input placeholder="Tên hồ" />
                                                    </Form.Item>
                                                    <Form.Item label="Tọa độ (VN2000)" style={{ marginBottom: 0 }}>
                                                        <div className="d-flex justify-content-between">
                                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)',marginBottom: 0 }}>
                                                                <Input placeholder="X" />
                                                            </Form.Item>
                                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)',marginBottom: 0 }}>
                                                                <Input placeholder="Y" />
                                                            </Form.Item>
                                                        </div>
                                                    </Form.Item>
                                                    <Form.Item label="Huyện / Xã" style={{ marginBottom: 0 }}>
                                                        <div className="d-flex justify-content-between">
                                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)',marginBottom: 0 }}>
                                                                <Input placeholder="Huyện" />
                                                            </Form.Item>
                                                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)',marginBottom: 0 }}>
                                                                <Input placeholder="Xã" />
                                                            </Form.Item>
                                                        </div>
                                                    </Form.Item>
                                                    <Form.Item label="Địa chỉ">
                                                        <Input placeholder="Địa chỉ" />
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <div className="d-flex justify-content-center">
                                                            <Button>Yêu cầu thêm mới</Button>
                                                        </div>
                                                    </Form.Item>
                                                </Form>
                                            </div>
                                        </Modal>
                                    </div> */}
                                </div>;
                } ,
                dataIndex: 'congtrinh_ten',
                key: 'congtrinh_ten',
            },
            {
                title: 'Địa điểm',
                dataIndex: '',
                key: '',
                align: 'center',
                render: () => (
                    <div className="d-flex align-items-center">
                        <span className="px-2">
                            <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" />
                        </span>
                        <span>
                            Địa điểm hồ chứa
                        </span>
                    </div>
                )
            },
            {
                title: 'Nguồn nước khai thác',
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: 'Lưu lượng đến hồ (m3/s)',
                children: [
                    {
                      title: 'Q đến (m3/s)',
                      dataIndex: '',
                      key: '',
                      width: 150,
                    },
                    {
                        title: () => (
                            <div className="text-center">
                                Giá trị <br /> lớn nhất
                            </div>
                        ),
                        dataIndex: '',
                        key: '',
                        width: 150,
                    },
                    {
                        title: () => (
                            <div className="text-center">
                                Giá trị <br /> nhỏ nhất
                            </div>
                        ),
                        dataIndex: '',
                        key: '',
                        width: 150,
                    },
                    {
                        title: 'Trung bình',
                        dataIndex: '',
                        key: '',
                        width: 150,
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
                        <Link to={"/he-thong-quan-trac/nuoc-mat/luu-luong-den-ho/theo-doi-quan-trac/"+record.id} onClick={(e) => this.clickHandler(e, record.id, record.gp_sogiayphep, record.congtrinh_ten)}>Xem</Link>
                    </>
                ),
            },
        ];


        return(
            <div className="p-0">
                <Header headTitle="QUAN TRẮC LƯU LƯỢNG ĐẾN HỒ " previousLink="/he-thong-quan-trac" showHeadImage={true} layout37={true} />
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