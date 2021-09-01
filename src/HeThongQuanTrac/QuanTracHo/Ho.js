import React from 'react';

// IMPORT HEADER
import Header from "../../Shared/Header";

import LeftBarNav from "../LeftBarNav";

// IMPORT FROM ANT
import { FileExcelOutlined, UploadOutlined, PlusCircleOutlined, FilterOutlined } from "@ant-design/icons";
import { Modal, Tabs, Button, Table, Form, Select, DatePicker, Input, TimePicker } from 'antd';


// IMPORT LINE CHARTS DATA
import { Line } from 'react-chartjs-2';

// GET DATA FROM API
import axios from "axios";
import configData from "../../config.json";
import { trackPromise } from 'react-promise-tracker';
// CHECK AUTH LOGIN
import { getToken, removeUserSession } from '../../Shared/Auth';



// MAP
import { MapContainer, Marker, Popup } from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import * as L from 'leaflet';
import ReactLeafletKml from 'react-leaflet-kml';
import blueMarker from '../../Shared/marker-blue.png';

const blueIcon = L.icon({
    iconUrl: blueMarker,
    iconSize: [15, 15],
    iconAnchor: [10, 15],
    className: 'blueMarker',
});

const { TabPane } = Tabs;

export default class HeThongQuanTracNuocMatMucNuocHo extends React.Component{
    constructor(props){
        super(props)
        var today = new Date(),
        date =   today.getDate()+'/'+(today.getMonth() + 1 < 10 ? '0'+(today.getMonth() + 1) : today.getMonth() + 1)+'/'+ today.getFullYear(),
        time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
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

            // GET DATE TIME
            currentDate: date,
            currentTime: time,

            // CHI SO TRAM 
            tenTram: null,
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
        // LINE CHARTS DATA
        const dataLine = {
            labels: ['00:00 - 24/08/2021', '01:00 - 24/08/2021', '02:00 - 24/08/2021', '03:00 - 24/08/2021', '04:00 - 24/08/2021', '05:00 - 24/08/2021','00:06 - 24/08/2021', '07:00 - 24/08/2021', '08:00 - 24/08/2021', '09:00 - 24/08/2021', '10:00 - 24/08/2021', '11:00 - 24/08/2021','12:00 - 24/08/2021', '13:00 - 24/08/2021', '14:00 - 24/08/2021', '15:00 - 24/08/2021', '16:00 - 24/08/2021', '17:00 - 24/08/2021','18:00 - 24/08/2021','19:00 - 24/08/2021','20:00 - 24/08/2021','21:00 - 24/08/2021','22:00 - 24/08/2021','23:00 - 24/08/2021',],
            datasets: [
              {
                label: 'Mực nước',
                data: [122, 132, 122, 152, 122, 132, 222, 142, null, 152, 122, 132, 152, 132, 152, 122, 122, 112, null, 152, 122, 132, 144, 155],
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
                        text: 'Mực nước (m)'
                    },
                    beginAtZero: true,
                    min: 0
                }
            }
          };
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
            },
        ];
        // COLUMN TABLE CONG TRINH
        const columnCongTrinh = [
            {
                title: () => { 
                    return  <div className="d-flex align-items-center">
                                <div className="col-8 p-0">Tên Hồ</div>
                                    <div className="p-1 m-0 col-4 d-flex flex-row-reverse">
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
                                    </div>
                                </div>;
                } ,
                dataIndex: 'congtrinh_ten',
                key: 'congtrinh_ten',
                render: (text, record, index) => (
                    <div className="m-0">
                        <p className="m-0 d-flex align-items-center">
                            <span className="stt_table_quantrac">{record.id < 10 ? "0"+record.id : record.id}. </span>
                            <span className="d-inline-block">
                                <span className="p-1 d-flex align-items-center justify-content-center">
                                    {record.congtrinh_ten}
                                </span>
                                <Modal
                                    className="modal-quantrac"
                                    centered={true}
                                    width={1500}
                                    visible={this.state.activeModal === record.id} 
                                    onCancel={this.hideModal}
                                    Header={false}
                                    footer={false}
                                    destroyOnClose={true}
                                >
                                    {/* MODAL CONTENT */}
                                    <div className="modal_quantrac">
                                        <div className="row p-0 m-0">
                                            <div className="row p-0 mx-0 m-2 align-items-center ">
                                                <p className="fw-bold"><span className="text-danger">THEO DÕI GIÁM SÁT CÔNG TRÌNH: </span> <span> {record.congtrinh_ten} </span> </p>
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

                                                {/* TABLE THONG TIN TRAM QUAN TRAC */}
                                                <Table  
                                                    bordered 
                                                    dataSource={dataCongTrinh} 
                                                    columns={columnCongTrinhDon}  
                                                    pagination={false} 
                                                    rowClassName={(record, index) => this.state.activeModal === record.id ? '' :  'd-none'}
                                                />
                                                {/* END TABLE THONG TIN TRAM QUAN TRAC */}
                                            </div>
                                            <Tabs type="card" tabPosition="left" defaultActiveKey="1">
                                                <TabPane tab="Chỉ số quan trắc" key="1">
                                                    <div>
                                                        <Form layout="inline" className="justify-content-end">
                                                            <Form.Item className="p-1 m-0" label="Trạng thái">
                                                                <Select defaultValue="binhthuong">
                                                                    <Select.Option key='binhthuong'>Bình thường</Select.Option>
                                                                    <Select.Option key='dinhky'>Định kỳ</Select.Option>
                                                                    <Select.Option key='hieuchinh'>Hiệu chỉnh</Select.Option>
                                                                    <Select.Option key='loithietbi'>Lỗi thiết bị</Select.Option>
                                                                </Select>
                                                            </Form.Item>
                                                        </Form>
                                                        <Table 
                                                            bordered 
                                                            dataSource={dataTramQuanTrac} 
                                                            columns={columnTramQuanTrac}
                                                            pagination={false}
                                                        />
                                                    </div>
                                                </TabPane>  
                                                <TabPane tab="Lịch sử quan trắc" key="2">
                                                    <Form layout="inline" className="justify-content-end">
                                                        <Form.Item className="p-1 m-0" label="Trạm QT">
                                                            <Select placeholder="Chọn trạm quan trắc" onChange={(value) => { this.setState(() => {return {tenTram: value}}) }} >
                                                            {dataTramQuanTrac.map((tram,i) => (
                                                                <Select.Option value={tram.quantrac_tentram} key={i}>{tram.quantrac_tentram}</Select.Option>
                                                            ))}
                                                            </Select>
                                                        </Form.Item>
                                                        <Form.Item className="p-1 m-0" label="Chỉ số">
                                                            <Select defaultValue={this.state.tenTram === "HALUU" || "THUONGLUU" ? "MUCNUOC" : "LUULUONG"}>
                                                                <Select.Option value="MUCNUOC">MUCNUOC</Select.Option>
                                                                <Select.Option value="LUULUONG">LUULUONG</Select.Option>
                                                            </Select>
                                                        </Form.Item>
                                                        <Form.Item className="p-1 m-0" label="Trạng thái">
                                                            <Select defaultValue="binhthuong">
                                                                <Select.Option key='binhthuong'>Bình thường</Select.Option>
                                                                <Select.Option key='dinhky'>Định kỳ</Select.Option>
                                                                <Select.Option key='hieuchinh'>Hiệu chỉnh</Select.Option>
                                                                <Select.Option key='loithietbi'>Lỗi thiết bị</Select.Option>
                                                            </Select>
                                                        </Form.Item>
                                                        <Form.Item className="p-1 m-0" label="Trường thời gian">
                                                            <Select defaultValue="thoigiando">
                                                                <Select.Option key='thoigiando'>Thời gian đo</Select.Option>
                                                                <Select.Option key='thoigiannhan'>Thời gian nhận</Select.Option>
                                                            </Select>
                                                        </Form.Item>
                                                        <Form.Item className="p-1 m-0">
                                                            <Button className="d-flex justify-content-center align-items-center">
                                                                <FilterOutlined />
                                                                Lọc
                                                            </Button>
                                                    </Form.Item>
                                                    </Form>
                                                    <Tabs tabPosition="top" defaultActiveKey="1" type="card">
                                                        <TabPane tab="Biểu Đồ" key="1">
                                                            {/* LINE CHARTS MUC NUOC HO */}
                                                            <div className="d-flex align-items-end">
                                                                <Line width={600} height={400} data={dataLine} options={optionLine} />
                                                            </div>
                                                            {/* END LINE CHARTS MUC NUOC HO */}
                                                        </TabPane>
                                                        <TabPane tab="Bảng Biểu" key="2">
                                                            {/* FORM SHOW DATA MUC NUOC HO */}
                                                            <Form>
                                                                <div className="row m-0 p-0">
                                                                    <div className="col-sm-6 p-2">
                                                                        <Table 
                                                                            bordered 
                                                                            dataSource={dataBangBieuLuongMua1} 
                                                                            columns={columnBangBieuLuongMua}
                                                                            pagination={false}
                                                                        />
                                                                    </div>
                                                                    <div className="col-sm-6 p-2">
                                                                        <Table 
                                                                            bordered 
                                                                            dataSource={dataBangBieuLuongMua2} 
                                                                            columns={columnBangBieuLuongMua}
                                                                            pagination={false}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex p-2 justify-content-end">
                                                                    <div className="d-flex justify-content-end">
                                                                        <Button type="primary" className="d-flex justify-content-center align-items-center">
                                                                            <FileExcelOutlined />
                                                                            Xuất file excel
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </Form>
                                                            {/* END FORM SHOW DATA MUC NUOC HO */}
                                                        </TabPane>
                                                        <TabPane tab="Cập Nhật" key="3">
                                                            {/* FORM UPDATE DATA MUC NUOC HO */}
                                                            <Form>
                                                                <div className="row m-0 p-0">
                                                                    <div className="col-sm-6 p-2">
                                                                        <Table 
                                                                            bordered 
                                                                            dataSource={dataBangBieuLuongMua1} 
                                                                            columns={columnCapNhatLuongMua}
                                                                            pagination={false}
                                                                        />
                                                                    </div>
                                                                    <div className="col-sm-6 p-2">
                                                                        <Table 
                                                                            bordered 
                                                                            dataSource={dataBangBieuLuongMua2} 
                                                                            columns={columnCapNhatLuongMua}
                                                                            pagination={false}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex p-2 justify-content-end">
                                                                    <div className="d-flex justify-content-end">
                                                                        <Button type="primary" className="d-flex justify-content-center align-items-center">
                                                                            <UploadOutlined />
                                                                            Cập Nhật
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </Form>
                                                            {/* END FORM SHOW DATA MUC NUOC HO */}
                                                        </TabPane>
                                                    </Tabs>
                                                </TabPane>
                                                <TabPane tab="Mất kết nối" key="3">
                                                    
                                                </TabPane>
                                                <TabPane tab="Vượt ngưỡng" key="4">
                                                    
                                                </TabPane>
                                            </Tabs>
                                        </div>
                                    </div>  
                                </Modal>
                            </span>
                        </p>
                    </div>
                )
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
                title: 'Mực nước hồ thượng lưu (m)',
                children: [
                    {
                      title: 'Mực nước',
                      dataIndex: '',
                      key: '',
                      width: "15px",
                    },
                    {
                        title: () => (
                            <div className="text-center">
                                Giá trị <br /> nhỏ nhất
                            </div>
                        ),
                        dataIndex: '',
                        key: '',
                        width: "15px",
                    },
                    {
                        title: () => (
                            <div className="text-center">
                                Giá trị <br /> lớn nhất
                            </div>
                        ),
                        dataIndex: '',
                        key: '',
                        width: "15px",
                    },
                    {
                        title: 'Trung bình',
                        dataIndex: '',
                        key: '',
                        width: "15px",
                    },
                ],
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: 'Mực nước hồ hạ lưu (m)',
                children: [
                    {
                      title: 'Mực nước',
                      dataIndex: '',
                      key: '',
                      width: "15px",
                    },
                    {
                        title: () => (
                            <div className="text-center">
                                Giá trị <br /> lớn nhất
                            </div>
                        ),
                        dataIndex: '',
                        key: '',
                        width: "15px",
                    },
                    {
                        title: () => (
                            <div className="text-center">
                                Giá trị <br /> nhỏ nhất
                            </div>
                        ),
                        dataIndex: '',
                        key: '',
                        width: "15px",
                    },
                    {
                        title: 'Trung bình',
                        dataIndex: '',
                        key: '',
                        width: "15px",
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
                        <Button onClick={(e) => this.clickHandler(e, record.id, record.gp_sogiayphep, record.congtrinh_ten)}>Xem</Button>
                    </>
                ),
            },
        ];

        // DATA LUONG MUA
        const dataBangBieuLuongMua1 = [
            {
                key: '1',
                id: '1',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '00:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '2',
                id: '2',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '01:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '3',
                id: '3',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '02:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '4',
                id: '4',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '03:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '5',
                id: '5',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '04:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '6',
                id: '6',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '05:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '7',
                id: '7',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '06:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '8',
                id: '8',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '07:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '9',
                id: '9',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '08:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '10',
                id: '10',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '09:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '11',
                id: '11',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '10:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '12',
                id: '12',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '11:00',
                giamsat_mucnuocho: '0',
            },
        ];
        const dataBangBieuLuongMua2 = [
            {
                key: '13',
                id: '13',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '12:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '14',
                id: '14',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '13:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '15',
                id: '15',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '14:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '16',
                id: '16',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '15:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '17',
                id: '17',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '16:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '18',
                id: '18',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '17:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '19',
                id: '19',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '18:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '20',
                id: '20',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '19:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '21',
                id: '21',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '20:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '22',
                id: '22',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '21:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '23',
                id: '23',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '22:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '24',
                id: '24',
                giamsat_ngay: this.state.currentDate,
                giamsat_gio: '23:00',
                giamsat_mucnuocho: '0',
            },
        ];
        // COLUMN SHOW LUONG MUA
        const columnBangBieuLuongMua = [
            {
                title: '#',
                dataIndex: 'id',
                key: 'id',
                align: 'center',
            },
            {
                title: 'Ngày',
                dataIndex: 'giamsat_ngay',
                key: 'giamsat_ngay',
                align: 'center',
            },
            {
                title: 'Giờ',
                dataIndex: 'giamsat_gio',
                key: 'giamsat_gio',
                align: 'center',
            },
            {
                title: 'Mực nước (m)',
                dataIndex: 'giamsat_mucnuocho',
                key: 'giamsat_mucnuocho',
                align: 'center',
                render: (text, record) => (
                    <>
                        <Input size="small" readOnly defaultValue={record.giamsat_mucnuocho} />
                    </>
                )
            },
        ];
        // COLUMN UPDATE MUC NUOC HO
        const columnCapNhatLuongMua = [
            {
                title: '#',
                dataIndex: 'id',
                key: 'id',
                align: 'center',
            },
            {
                title: 'Ngày',
                dataIndex: 'giamsat_ngay',
                key: 'giamsat_ngay',
                align: 'center',
            },
            {
                title: 'Giờ',
                dataIndex: 'giamsat_gio',
                key: 'giamsat_gio',
                align: 'center',
            },
            {
                title: 'Mực nước (m)',
                dataIndex: 'giamsat_mucnuocho',
                key: 'giamsat_mucnuocho',
                align: 'center',
                render: (text, record) => (
                    <>
                        <Input size="small" defaultValue={record.giamsat_mucnuocho} />
                    </>
                )
            },
        ];
          
        // COLUMN CONG TRINH DON
        const columnCongTrinhDon = [
            {
                title: 'Số giấy phép',
                dataIndex: 'gp_sogiayphep',
                key: 'gp_sogiayphep',
            },
            {
              title: 'Tên công trình',
              dataIndex: 'congtrinh_ten',
              key: 'congtrinh_ten',
            },
            {
              title: 'Địa chỉ công trình',
              dataIndex: 'congtrinh_diachi',
              key: 'congtrinh_diachi',
            },
            {
              title: 'Tên chủ đầu tư',
              dataIndex: 'chugiayphep_ten',
              key: 'chugiayphep_ten',
            },
            {
                title: 'Số trạm cấp phép quan trắc',
                dataIndex: 'tramcapphep_soluong',
                key: 'tramcapphep_soluong',
            },
        ];

        // DATA TRAM QUAN TRAC
        const dataTramQuanTrac = [
            {
                key: '1',
                id: '1',
                quantrac_tentram: 'THUONGLUU',
                quantrac_chiso: 'MUCNUOC',
                quantrac_giatri: '',
                quantrac_donvido: 'm',
                quantrac_thoigiannhan: '31/08/2021 17:30:00',
                quantrac_vuotnguong: '',
                quantrac_giatrivuotnguong: '',
                quantrac_giatrilonnhat: '',
                quantrac_giatrinhonhat: '',
                quantrac_giatritrungbinh: '',
                
            },
            {
                key: '2',
                id: '2',
                quantrac_tentram: 'HALUU',
                quantrac_chiso: 'MUCNUOC',
                quantrac_giatri: '',
                quantrac_donvido: 'm',
                quantrac_thoigiannhan: '31/08/2021 17:30:00',
                quantrac_vuotnguong: '',
                quantrac_giatrivuotnguong: '',
                quantrac_giatrilonnhat: '',
                quantrac_giatrinhonhat: '',
                quantrac_giatritrungbinh: '',
                
            },
            {
                key: '3',
                id: '3',
                quantrac_tentram: 'NHAMAY',
                quantrac_chiso: 'LUULUONG',
                quantrac_giatri: '',
                quantrac_donvido: 'm',
                quantrac_thoigiannhan: '31/08/2021 17:30:00',
                quantrac_vuotnguong: '',
                quantrac_giatrivuotnguong: '',
                quantrac_giatrilonnhat: '',
                quantrac_giatrinhonhat: '',
                quantrac_giatritrungbinh: '',
                
            },
        ]
        // COLUMN TRAM QUAN TRAC
        const columnTramQuanTrac = [
            {
                title: 'Tên trạm',
                dataIndex: 'quantrac_tentram',
                key: 'quantrac_tentram',
            },
            {
              title: 'Chỉ số QT',
              dataIndex: 'quantrac_chiso',
              key: 'quantrac_chiso',
            },
            {
              title: 'Giá trị QT',
              dataIndex: 'quantrac_giatri',
              key: 'quantrac_giatri',
            },
            {
              title: 'Đơn vị đo',
              dataIndex: 'quantrac_donvido',
              key: 'quantrac_donvido',
            },
            {
                title: 'Thời gian nhận số liệu',
                dataIndex: 'quantrac_thoigiannhan',
                key: 'quantrac_thoigiannhan',
            },
            {
                title: 'Vượt ngưỡng',
                dataIndex: 'quantrac_vuotnguong',
                key: 'quantrac_vuotnguong',
            },
            {
                title: 'Giá trị vượt ngưỡng',
                dataIndex: 'quantrac_giatrivuotnguong',
                key: 'quantrac_giatrivuotnguong',
            },
            {
                title: 'Giá trị lớn nhất',
                dataIndex: 'quantrac_giatrilonnhat',
                key: 'quantrac_giatrilonnhat',
            },
            {
                title: 'Giá trị nhỏ nhất',
                dataIndex: 'quantrac_giatrinhonhat',
                key: 'quantrac_giatrinhonhat',
            },
            {
                title: 'Giá trị trung bình',
                dataIndex: 'quantrac_giatritrungbinh',
                key: 'quantrac_giatritrungbinh',
            },
        ];

        return(
            <div className="p-0">
                <Header headTitle="QUAN TRẮC MỰC NƯỚC HỒ " previousLink="/he-thong-quan-trac" showHeadImage={true} layout37={true} />
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