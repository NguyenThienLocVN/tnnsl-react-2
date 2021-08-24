import React from 'react';

import Header from "../../Shared/Header";


import { FileExcelOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { Modal, Tabs, Button, Table, Form, Select, DatePicker, Input } from 'antd';
import { ResizableBox } from "react-resizable";

import DragM from "dragm";
import "antd/dist/antd.css";


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

class BuildTitle extends React.Component {
    updateTransform = transformStr => {
      this.modalDom.style.transform = transformStr;
    };
    componentDidMount() {
      this.modalDom = document.getElementsByClassName(
        "ant-modal-wrap" //modal的class是ant-modal
      )[0];
    }
    render() {
      const { title } = this.props;
      return (
        <DragM updateTransform={this.updateTransform}>
          <div>{title}</div>
        </DragM>
      );
    }
  }

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
        const dataBar = {
            labels: ['00:00 - 24/08/2021', '01:00 - 24/08/2021', '02:00 - 24/08/2021', '03:00 - 24/08/2021', '04:00 - 24/08/2021', '05:00 - 24/08/2021','00:06 - 24/08/2021', '07:00 - 24/08/2021', '08:00 - 24/08/2021', '09:00 - 24/08/2021', '10:00 - 24/08/2021', '11:00 - 24/08/2021','12:00 - 24/08/2021', '13:00 - 24/08/2021', '14:00 - 24/08/2021', '15:00 - 24/08/2021', '16:00 - 24/08/2021', '17:00 - 24/08/2021','18:00 - 24/08/2021','19:00 - 24/08/2021','20:00 - 24/08/2021','21:00 - 24/08/2021','22:00 - 24/08/2021','23:00 - 24/08/2021',],
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
          
          const optionBar = {
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
                        text: 'Lượng mưa'
                    },
                }
            }
          };
        //   TABLE DATA
        const dataTram = [
            {
                key: '1',
                id: '1',
                tentram: 'Trạm quan trắc mưa số 1 tỉnh Sơn La',
                hientai: 0,
                ngay1: '10',
                ngay3: '15',
            },
            {
                key: '2',
                id: '2',
                tentram: 'Trạm quan trắc mưa số 2 tỉnh Sơn La',
                hientai: 0,
                ngay1: '8',
                ngay3: '9',
            },
            {
                key: '3',
                id: '3',
                tentram: 'Trạm quan trắc mưa số 3 tỉnh Sơn La',
                hientai: 0,
                ngay1: '13',
                ngay3: '19',
            },
            {
                key: '4',
                id: '4',
                tentram: 'Trạm quan trắc mưa số 4 tỉnh Sơn La',
                hientai: 0,
                ngay1: '13',
                ngay3: '19',
            },
            {
                key: '5',
                id: '5',
                tentram: 'Trạm quan trắc mưa số 5 tỉnh Sơn La',
                hientai: 0,
                ngay1: '13',
                ngay3: '19',
            },
            {
                key: '6',
                id: '6',
                tentram: 'Trạm quan trắc mưa số 6 tỉnh Sơn La',
                hientai: 0,
                ngay1: '13',
                ngay3: '19',
            },
            {
                key: '7',
                id: '7',
                tentram: 'Trạm quan trắc mưa số 7 tỉnh Sơn La',
                hientai: 0,
                ngay1: '13',
                ngay3: '19',
            },
            {
                key: '8',
                id: '8',
                tentram: 'Trạm quan trắc mưa số 8 tỉnh Sơn La',
                hientai: 0,
                ngay1: '13',
                ngay3: '19',
            },
            {
                key: '9',
                id: '9',
                tentram: 'Trạm quan trắc mưa số 9 tỉnh Sơn La',
                hientai: 0,
                ngay1: '13',
                ngay3: '19',
            },
            {
                key: '10',
                id: '10',
                tentram: 'Trạm quan trắc mưa số 10 tỉnh Sơn La',
                hientai: 0,
                ngay1: '13',
                ngay3: '19',
            },
            {
                key: '11',
                id: '11',
                tentram: 'Trạm quan trắc mưa số 11 tỉnh Sơn La',
                hientai: 0,
                ngay1: '13',
                ngay3: '19',
            },
        ];
          
        const columnTram = [
            {
                title: 'Tên Trạm',
                dataIndex: 'tentram',
                key: 'tentram',
                render: (text, record, index) => (
                    <div className="m-0 fw-bold">
                        <p className="m-0 d-flex align-items-center">
                            <span className="stt_table_quantrac">{record.id}. </span>
                            <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" />
                            <span className="d-inline-block">
                                <span className="p-1 d-flex align-items-center justify-content-center text-primary" onClick={(e) => this.clickHandler(e, record.id)}>
                                    {record.tentram}
                                </span>
                                <Modal
                                    className="modal-quantrac"
                                    title={title}
                                    centered={true}
                                    width="min-content"
                                    visible={this.state.activeModal === record.id} 
                                    onCancel={this.hideModal}
                                    footer={false}
                                    destroyOnClose={true}
                                    mask={false}
                                    style={{ pointerEvents: "all" }}
                                    wrapProps={{ style: { pointerEvents: "none" } }}
                                    afterClose={() => {
                                        try {
                                        document.getElementsByClassName(
                                            "ant-modal-wrap"
                                        )[0].style.transform =
                                            "translate(0px, 0px)";
                                        } catch (e) {}
                                    }}
                                >
                                    <ResizableBox
                                        width={1290}
                                        height={750}
                                        minConstraints={[750, 550]}
                                        maxConstraints={[1290, 800]}
                                    >
                                        <div className="modal_quantrac">
                                            <div className="row p-0 m-0">
                                                <div className="row p-0 mx-0 m-2 align-items-center ">
                                                    <div className="d-flex align-items-center col-sm-4">
                                                        <div style={{fontSize:30, fontWeight:"bold"}}>&sum;</div>
                                                        <div className="row col-auto m-0 p-0">
                                                            <span className="col-12 text-nowrap p-0">mưa</span>
                                                            <span className="col-12 text-nowrap p-0">thực đo</span>
                                                        </div>
                                                        <div>
                                                            <span className="d-flex"> = <span className="fw-bold text-primary">0</span>(mm)</span>
                                                        </div>
                                                    </div>
                                                    <Form className="col-sm-8">
                                                        <div className="d-flex justify-content-end">
                                                            <Form.Item className="px-2 mb-0" label="Từ ngày: ">
                                                                <DatePicker placeholder=" Chọn ngày " />
                                                            </Form.Item>
                                                            <Form.Item className="px-2 mb-0" label="Đến ngày: ">
                                                                <DatePicker placeholder=" Chọn ngày " />
                                                            </Form.Item>
                                                            <Form.Item className="px-2 mb-0 d-flex justify-content-end align-items-end">
                                                                <div className="d-flex justify-content-end align-items-end">
                                                                    <Button className="d-flex justify-content-center align-items-center">
                                                                        <SearchOutlined />
                                                                        Tìm kiếm
                                                                    </Button>
                                                                </div>
                                                            </Form.Item>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                            <Tabs defaultActiveKey="1" type="card">
                                                <TabPane tab="Biểu Đồ" key="1">
                                                    <div className="d-flex align-items-end">
                                                        <Bar width={600} height={400} data={dataBar} options={optionBar} />
                                                    </div>
                                                </TabPane>
                                                <TabPane tab="Bảng Biểu" key="2">
                                                    <Form>
                                                        <div className="row m-0 p-0">
                                                            <div className="col-sm-6 p-2">
                                                                <Table bordered 
                                                                dataSource={dataBangBieuLuongMua1} 
                                                                columns={columnBangBieuLuongMua}
                                                                pagination={false}
                                                                />
                                                            </div>
                                                            <div className="col-sm-6 p-2">
                                                                <Table bordered 
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
                                                </TabPane>
                                                <TabPane tab="Cập Nhật" key="3">
                                                    <Form>
                                                        <div className="row m-0 p-0">
                                                            <div className="col-sm-6 p-2">
                                                                <Table bordered 
                                                                dataSource={dataBangBieuLuongMua1} 
                                                                columns={columnCapNhatLuongMua}
                                                                pagination={false}
                                                                />
                                                            </div>
                                                            <div className="col-sm-6 p-2">
                                                                <Table bordered 
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
                                                </TabPane>
                                            </Tabs>
                                        </div>  
                                    </ResizableBox>
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
                align: 'center',
            },
            {
                title: 'Ngày 1',
                dataIndex: 'ngay1',
                key: 'ngay1',
                align: 'center',
            },
            {
                title: 'Ngày 3',
                dataIndex: 'ngay3',
                key: 'ngay3',
                align: 'center',
            },
        ];

        // DATA LUONG MUA
        const dataBangBieuLuongMua1 = [
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
        ];
        const dataBangBieuLuongMua2 = [
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
                title: 'Lưu lượng Mưa (mm)',
                dataIndex: 'giamsat_luongmua',
                key: 'giamsat_luongmua',
                align: 'center',
                render: (text, record) => (
                    <>
                        <Input size="small" readOnly defaultValue={record.giamsat_luongmua} />
                    </>
                )
            },
        ];
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
                title: 'Lưu lượng Mưa (mm)',
                dataIndex: 'giamsat_luongmua',
                key: 'giamsat_luongmua',
                align: 'center',
                render: (text, record) => (
                    <>
                        <Input size="small" defaultValue={record.giamsat_luongmua} />
                    </>
                )
            },
        ];
        const title = (
            <BuildTitle visible={this.state.visible} title={"SỐ LIỆU QUAN TRẮC MƯA"} />
        );
        return(
            <div className="p-0">
                <Header headTitle="QUAN TRẮC MƯA " previousLink="/he-thong-quan-trac" showHeadImage={true} layout37={true} />
                <main className="row m-0 p-0">
                    <div className="col-12 col-lg-3 px-0 menu-home">
                        <div className="my-2 col-12 p-0 row m-0">
                            <Form className="col-6 border-end row m-0 align-items-end">
                                <div className="px-2 my-2 fw-bold">Có <span className="text-danger"> 0 </span> / <span> 11 </span> trạm đang mưa </div>
                                <Form.Item className="px-2 my-2">
                                    <Select placeholder="Chọn trạm">
                                        {dataTram.map((tram,i) => (
                                            <Select.Option key={i}>{tram.tentram}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item className="px-2 my-2">
                                    <Button className="col-12" onClick={(e) => this.clickHandler(e, "yeucau_themtrammoi")}>Thêm trạm</Button>
                                    <Modal
                                        className="modal-quantrac"
                                        scrollableBody={true}
                                        title="YÊU CẦU THÊM MỚI TRẠM QUAN TRẮC"
                                        width={500}
                                        visible={this.state.activeModal === "yeucau_themtrammoi"}
                                        onCancel={this.hideModal}
                                        footer={false}
                                    >
                                        <div>
                                            <Form labelCol={{ span: 24 }}>
                                                <Form.Item label="Tên trạm" style={{ marginBottom: 0 }}>
                                                    <Input placeholder="Tên trạm" />
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
                                </Form.Item>
                            </Form>

                            <Form className="col-6 border-start row m-0 align-items-end" labelCol={{ span: 8 }}>
                                <Form.Item className="px-2 my-2" label="Từ ngày">
                                    <DatePicker placeholder="Chọn ngày" />
                                </Form.Item>
                                <Form.Item className="px-2 my-2" label="Đến ngày">
                                    <DatePicker placeholder="Chọn ngày" />
                                </Form.Item>
                                <Form.Item className="px-2 my-2">
                                    <Button className="d-flex justify-content-center align-items-center col-12">
                                        <SearchOutlined />
                                        Tìm kiếm
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        <div className="px-2">
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