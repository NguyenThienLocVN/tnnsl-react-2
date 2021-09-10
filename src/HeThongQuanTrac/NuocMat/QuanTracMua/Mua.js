import React from 'react';

// IMPORT HEADER
import Header from "../../../Shared/Header";

// IMPORT FROM ANT
import { FileExcelOutlined, SearchOutlined, UploadOutlined, PlusCircleOutlined, FilterOutlined } from "@ant-design/icons";
import { Modal, Tabs, Button, Table, Form, Select, DatePicker, Input } from 'antd';

// DRAG AND RESIZE MODAL
import { ResizableBox } from "react-resizable";
import DragM from "dragm";
import "antd/dist/antd.css";

// IMPORT BAR CHARTS DATA
import { Bar } from 'react-chartjs-2';

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

const { TabPane } = Tabs;

// MODAL TITLE IN DRAG MODAL
class BuildTitle extends React.Component {
    updateTransform = transformStr => {
      this.modalDom.style.transform = transformStr;
    };
    componentDidMount() {
      this.modalDom = document.getElementsByClassName(
        "ant-modal-wrap"
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
            TenTramQuanTrac: '',
        };
        
        this.mapRef = React.createRef();
    }

    componentDidMount(){
        // PAGE TITLE
        document.title = "Hệ thống quan trắc | Mưa | Giám sát tài nguyên nước Sơn La";

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
    clickHandler = (e, index, tentram) => {
        this.setState({ 
            activeModal: index,
            TenTramQuanTrac: tentram
         })
    }
    // CLOSE MODAL
    hideModal = () => {
        this.setState({ 
            activeModal: null,
            TenTramQuanTrac: ''
        })
    }
    
    render(){
        // BAR CHARTS DATA
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
        //   BAR CHARTS OPTIONS
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
                        text: 'Lượng mưa (mm)'
                    },
                }
            }
          };
        //   TRAM DATA IN TABLE TRAM
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
        // COLUMN IN TABLE TRAM
        const columnTram = [
            {
                title: () => { 
                    return  <div className="d-flex align-items-center">
                                <div className="col-8 p-0">Tên Trạm</div>
                                <div className="p-1 m-0 col-4 d-flex flex-row-reverse">
                                    <Button className="d-flex align-items-center" type="ghost" onClick={(e) => this.clickHandler(e, "yeucau_themtrammoi")}> <PlusCircleOutlined /> Thêm trạm</Button>
                                    <Modal
                                        className="modal-quantrac"
                                        scrollableBody={true}
                                        destroyOnClose={true}
                                        title="YÊU CẦU THÊM MỚI TRẠM QUAN TRẮC"
                                        width={500}
                                        centered={true}
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
                                </div>
                            </div>;
                } ,
                dataIndex: 'tentram',
                key: 'tentram',
                render: (text, record, index) => (
                    <div className="m-0 fw-bold">
                        <p className="m-0 d-flex align-items-center">
                            <span className="stt_table_quantrac">{record.id}. </span>
                            <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" />
                            <span className="d-inline-block">
                                <span className="p-1 d-flex align-items-center justify-content-center">
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

                                    // STYLE RESIZE MODAL
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
                                    {/* RESIZE MODAL CONTENT */}
                                    <ResizableBox
                                        width={1290}
                                        height={750}
                                        minConstraints={[750, 600]}
                                        maxConstraints={[1290, 800]}
                                    >
                                        {/* MODAL CONTENT */}
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
                                                            <span className="d-flex"> = <span className="fw-bold text-primary px-1">0</span>(mm)</span>
                                                        </div>
                                                    </div>
                                                    {/* FILTER FORM */}
                                                    <Form className="col-sm-8">
                                                        <div className="d-flex justify-content-end">
                                                            <Form.Item className="px-2 mb-0" label="Từ ngày: ">
                                                                <DatePicker size="small" placeholder=" Chọn ngày " />
                                                            </Form.Item>
                                                            <Form.Item className="px-2 mb-0" label="Đến ngày: ">
                                                                <DatePicker size="small" placeholder=" Chọn ngày " />
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
                                                    {/* END FILTER FORM */}
                                                </div>
                                            </div>
                                            <Tabs tabPosition="left" defaultActiveKey="1">
                                                <TabPane tab="Biểu Đồ" key="1">
                                                    {/* BAR CHARTS LUU LUONG MUA */}
                                                    <div className="d-flex align-items-end">
                                                        <Bar width={600} height={400} data={dataBar} options={optionBar} />
                                                    </div>
                                                    {/* END BAR CHARTS LUU LUONG MUA */}
                                                </TabPane>
                                                <TabPane tab="Bảng Biểu" key="2">
                                                    {/* FORM SHOW DATA LUU LUONG MUA */}
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
                                                    {/* END FORM SHOW DATA LUU LUONG MUA */}
                                                </TabPane>
                                                <TabPane tab="Cập Nhật" key="3">
                                                    {/* FORM UPDATE DATA LUU LUONG MUA */}
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
                                                    {/* END FORM SHOW DATA LUU LUONG MUA */}
                                                </TabPane>
                                            </Tabs>
                                        </div>  
                                    </ResizableBox>
                                </Modal>
                            </span>
                        </p>
                        <div className="d-flex">
                            <p className="text-primary" onClick={(e) => this.clickHandler(e, record.id, record.tentram)}> Thông số </p> 
                            <span className="px-2">|</span>
                            <p className="text-primary" onClick={(e) => this.clickHandler(e, "chi-tiet-tram"+record.id, record.tentram)}> Chi Tiết </p>
                            <Modal
                                    className="modal-quantrac"
                                    title={record.tentram}
                                    centered={true}
                                    visible={this.state.activeModal === "chi-tiet-tram"+record.id} 
                                    onCancel={this.hideModal}
                                    footer={false}
                                    destroyOnClose={true}
                            >
                                Thông tin trạm
                            </Modal>
                        </div>
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
                title: 'Lượng Mưa (mm)',
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
        // COLUMN UPDATE LUU LUONG MUA
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
                title: 'Lượng Mưa (mm)',
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

        // BUILE TITLE MODAL
        const title = (
            <BuildTitle visible={this.state.visible} title={"SỐ LIỆU QUAN TRẮC MƯA - "+this.state.TenTramQuanTrac} />
        );
        return(
            <div className="p-0">
                <Header headTitle="QUAN TRẮC MƯA " previousLink="/he-thong-quan-trac" showHeadImage={true} layout37={true} />
                <main className="row m-0 p-0">
                    <div className="col-12 col-lg-3 px-0 menu-home">
                        <div className="my-2 col-12 p-0 row m-0">
                            <div className="p-1 m-0 fw-bold text-center">Có <span className="text-danger"> 0 </span> / <span> 11 </span> trạm đang mưa </div>
                            {/* FORM FILTER TRAM QUAN TRAC */}
                            <Form className="row m-0" labelCol={{ span: 9 }}>
                                <div className="col-6 p-0">
                                    <Form.Item className="p-1 m-0" label="Chọn trạm">
                                        <Select size="small" defaultValue="all">
                                            <Select.Option key='all'>Tất cả</Select.Option>
                                            <Select.Option key='az'>{"A -> Z"}</Select.Option>
                                            <Select.Option key='za'>{"Z -> A"}</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item className="p-1 m-0" label="Lượng mưa">
                                        <Select size="small" defaultValue="all">
                                            <Select.Option key='all'>Tất cả</Select.Option>
                                            <Select.Option key='minmax'>Thấp đến cao</Select.Option>
                                            <Select.Option key='maxmin'>Cao đến thấp</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className="col-6 p-0">
                                    <Form.Item className="p-1 m-0" label="Từ ngày">
                                        <DatePicker size="small" placeholder="Chọn ngày" />
                                    </Form.Item>
                                    <Form.Item className="p-1 m-0" label="Đến ngày">
                                        <DatePicker size="small" placeholder="Chọn ngày" />
                                    </Form.Item>
                                </div>
                                <Form.Item className="p-1 m-0">
                                    <div className="d-flex justify-content-end">
                                        <Button className="d-flex justify-content-center align-items-center">
                                            <FilterOutlined />
                                            Lọc trạm
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                            {/* END FORM FILTER TRAM QUAN TRAC */}
                        </div>
                        <div className="px-2">
                            {/* TABLE SHOW LIST TRAM QUAN TRAC MUA */}
                            <Table bordered dataSource={dataTram} columns={columnTram} />
                            {/* END TABLE SHOW LIST TRAM QUAN TRAC MUA */}
                        </div>
                    </div>
                    <div className="col-12 col-lg-9 map-container px-md-0 position-relative">
                        {/* MAP */}
                        <MapContainer className="col-12 h-100 w-100" whenCreated={ mapInstance => { this.mapRef.current = mapInstance } } center={this.state.center} zoom={this.state.zoom}>
                            <BasemapLayer name="Imagery" />
                            <BasemapLayer name="ImageryLabels" />

                            {this.state.kml && <ReactLeafletKml kml={this.state.kml} />}

                            {/* POPUP DIEM MUA */}
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
                        {/* MAP */}
                    </div>
                </main>
            </div>
        )
    }

}