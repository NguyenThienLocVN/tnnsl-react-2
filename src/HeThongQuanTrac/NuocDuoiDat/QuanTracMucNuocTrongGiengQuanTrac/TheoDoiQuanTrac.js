import React from 'react';

// IMPORT HEADER
import Header from "../../../Shared/Header";

import LeftBarNav from "../../LeftBarNav";

// IMPORT FROM ANT
import { FileExcelOutlined, UploadOutlined, FilterOutlined } from "@ant-design/icons";
import { Tabs, Button, Table, Form, Select, DatePicker, Input, TimePicker } from 'antd';


// IMPORT LINE CHARTS DATA
import { Line } from 'react-chartjs-2';

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

export default class HeThongQuanTracNuocDuoiDatTheoDoiQuanTracMucNuocTrongGiengQuanTrac extends React.Component{
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
        // LINE CHARTS DATA
        const dataLine = {
            labels: ['00:00 - 24/08/2021', '00:30 - 24/08/2021','01:00 - 24/08/2021', '01:30 - 24/08/2021', '02:00 - 24/08/2021', '02:30 - 24/08/2021','03:00 - 24/08/2021', '03:30 - 24/08/2021', '04:00 - 24/08/2021', '04:30 - 24/08/2021','05:00 - 24/08/2021', '06:00 - 24/08/2021', '06:30 - 24/08/2021', '07:00 - 24/08/2021', '07:30 - 24/08/2021', '08:00 - 24/08/2021', '08:30 - 24/08/2021', '09:00 - 24/08/2021', '09:30 - 24/08/2021', '10:00 - 24/08/2021', '10:30 - 24/08/2021', '11:00 - 24/08/2021', '11:30 - 24/08/2021','12:00 - 24/08/2021', '12:30 - 24/08/2021','13:00 - 24/08/2021', '13:30 - 24/08/2021','14:00 - 24/08/2021', '14:30 - 24/08/2021', '15:00 - 24/08/2021', '15:30 - 24/08/2021', '16:00 - 24/08/2021', '16:30 - 24/08/2021', '17:00 - 24/08/2021', '17:30 - 24/08/2021', '18:00 - 24/08/2021', '18:30 - 24/08/2021', '19:00 - 24/08/2021', '19:30 - 24/08/2021', '20:00 - 24/08/2021', '20:30 - 24/08/2021', '21:00 - 24/08/2021', '21:30 - 24/08/2021', '22:00 - 24/08/2021', '22:30 - 24/08/2021', '23:00 - 24/08/2021', '23:30 - 24/08/2021'],
            datasets: [
              {
                label: 'Mực nước',
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
                        text: 'Mực nước trong giếng quan trắc (m)'
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
                congtrinh_ten: 'Thủy điện 1',
                congtrinh_diachi: "123 đường 123 - tp sơn la",
                chugiayphep_ten: 'Công ty 1',
                tramcapphep_soluong: 2,
                congtrinh_matketnoi: 1,
            },
        ];

        // DATA LUONG MUA
        const dataBangBieuLuongMua = [
            {
                key: '1',
                id: '1',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '00:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '2',
                id: '2',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '01:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '3',
                id: '3',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '02:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '4',
                id: '4',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '03:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '5',
                id: '5',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '04:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '6',
                id: '6',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '05:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '7',
                id: '7',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '06:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '8',
                id: '8',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '07:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '9',
                id: '9',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '08:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '10',
                id: '10',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '09:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '11',
                id: '11',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '10:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '12',
                id: '12',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '11:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '13',
                id: '13',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '12:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '14',
                id: '14',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '13:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '15',
                id: '15',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '14:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '16',
                id: '16',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '15:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '17',
                id: '17',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '16:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '18',
                id: '18',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '17:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '19',
                id: '19',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '18:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '20',
                id: '20',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '19:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '21',
                id: '21',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '20:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '22',
                id: '22',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '21:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '23',
                id: '23',
                giamsat_ngay: '04/09/2021',
                giamsat_gio: '22:00',
                giamsat_mucnuocho: '0',
            },
            {
                key: '24',
                id: '24',
                giamsat_ngay: '04/09/2021',
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
                title: 'Mực nước trong giếng quan trắc (m)',
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
                title: 'Mực nước trong giếng quan trắc (m)',
                dataIndex: 'giamsat_mucnuocho',
                key: 'giamsat_mucnuocho',
                align: 'center',
                render: (text, record) => (
                    <>
                        <Input size="small" defaultValue={record.giamsat_mucnuocho} />
                    </>
                )
            },
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
                title: 'Mực nước trong giếng quan trắc (m)',
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
                title: 'Nguồn nước quan trắc',
                dataIndex: '',
                key: '',
            },
            {
                title: 'Số giếng',
                dataIndex: 'tramcapphep_soluong',
                key: 'tramcapphep_soluong',
            },
        ];

        // COLUMN CONG TRINH MAT KET NOI
        const columnCongTrinhMatKetNoi = [
            {
                title: 'Số hiệu',
                dataIndex: '',
                key: '',
            },{
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
                    <span> Chiều sâu <br /> đoạn thu nước<br /> (m)</span>
                ),
                children: [
                    {
                      title: 'Từ',
                      dataIndex: '',
                      key: '',
                      align: 'center',
                    },
                    {
                        title: 'Đến',
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
                    <span>Chiều sâu <br /> mực nước tĩnh <br /> (m) </span>
                ),
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: () => (
                    <span>Chiều sâu <br /> mực nước động <br /> lớn nhất <br /> (m) </span>
                ),
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: () => (
                    <span>Hạ thấp <br /> mực nước  <br /> (m) </span>
                ),
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: () => (
                    <span>Mực nước <br /> trong giếng <br /> quan trắc  <br /> (m) </span>
                ),
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: () => (
                    <span>Thời gian <br /> nhận số liệu</span>
                ),
                dataIndex: '',
                key: '',
                width: 90,
                align: 'center',
            },
            {
                title: 'Giá trị (m)',
                dataIndex: '',
                key: '',
                align: 'center',
                render: (record, index) => (
                    <span> 0 </span>
                ),
            },
        ];

        // COLUMN CONG TRINH VUOT NGUONG
        const columnCongTrinhVuotNguong = [
            {
                title: 'Số hiệu',
                dataIndex: '',
                key: '',
            },{
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
                    <span> Chiều sâu <br /> đoạn thu nước<br /> (m)</span>
                ),
                children: [
                    {
                      title: 'Từ',
                      dataIndex: '',
                      key: '',
                      align: 'center',
                    },
                    {
                        title: 'Đến',
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
                    <span>Chiều sâu <br /> mực nước tĩnh <br /> (m) </span>
                ),
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: () => (
                    <span>Chiều sâu <br /> mực nước động <br /> lớn nhất <br /> (m) </span>
                ),
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: () => (
                    <span>Hạ thấp <br /> mực nước  <br /> (m) </span>
                ),
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: () => (
                    <span>Mực nước <br /> trong giếng <br /> quan trắc  <br /> (m) </span>
                ),
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: () => (
                    <span>Thời gian <br /> nhận số liệu</span>
                ),
                dataIndex: '',
                key: '',
                align: 'center',
                width: 90,
                render: () => (
                    <span> 2021-08-31 17:30:00 </span>
                ),
            },
            {
                title: 'Vượt ngưỡng',
                dataIndex: '',
                key: '',
                align: 'center',
                render: (record, index) => (
                    <span> Không </span>
                ),
            },
            {
                title: () => (
                   <span>Giá trị <br /> vượt ngưỡng</span>
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
        ];

        // DATA TRAM QUAN TRAC
        const dataTramQuanTrac = [
            {
                key: '1',
                id: '1',
                gieng_sohieu: 'GK1',
                quantrac_thoigiannhan: '2021-08-31 17:30:00',
            },
            {
                key: '2',
                id: '2',
                gieng_sohieu: 'GK2',
                quantrac_thoigiannhan: '2021-08-31 17:30:00',
            },
            {
                key: '3',
                id: '3',
                gieng_sohieu: 'GK3',
                quantrac_thoigiannhan: '2021-08-31 17:30:00',
            },
        ]
        // COLUMN TRAM QUAN TRAC
        const columnTramQuanTrac = [
            {
                title: 'Số hiệu giếng',
                dataIndex: 'gieng_sohieu',
                key: 'gieng_sohieu',
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
                    <span> Chiều sâu <br /> đoạn thu nước<br /> (m)</span>
                ),
                children: [
                    {
                      title: 'Từ',
                      dataIndex: '',
                      key: '',
                      align: 'center',
                    },
                    {
                        title: 'Đến',
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
                    <span>Chiều sâu <br /> mực nước tĩnh <br /> (m) </span>
                ),
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: () => (
                    <span>Chiều sâu <br /> mực nước động <br /> lớn nhất <br /> (m) </span>
                ),
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: () => (
                    <span>Hạ thấp <br /> mực nước  <br /> (m) </span>
                ),
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: () => (
                    <span>Mực nước <br /> trong giếng <br /> quan trắc  <br /> (m) </span>
                ),
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                title: () => (
                    <span>Thời gian <br /> nhận số liệu</span>
                ),
                dataIndex: 'quantrac_thoigiannhan',
                key: 'quantrac_thoigiannhan',
                align: 'center',
                width: 90,
            },
            {
                title: 'Vượt ngưỡng',
                dataIndex: '',
                key: '',
                align: 'center',
            },
            {
                 title: () => (
                    <span>Giá trị <br /> vượt ngưỡng</span>
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
        ];

        return(
            <div className="p-0">
                <Header headTitle="QUAN TRẮC MỰC NƯỚC TRONG GIẾNG QUAN TRẮC" previousLink="/he-thong-quan-trac/nuoc-duoi-dat/muc-nuoc-trong-gieng-quan-trac" showHeadImage={true} layout37={true} />
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
                        <div className="px-2">
                            {/* TABLE SHOW LIST TRAM QUAN TRAC MUC NUOC HO */}
                            <div className="modal_quantrac">
                                <div className="row p-0 m-0">
                                    <div className="row p-0 mx-0 m-2 align-items-center ">
                                        <p className="fw-bold"><span className="text-danger">THEO DÕI QUAN TRẮC: </span> <span> ten cong trinh </span> </p>
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
                                        />
                                        {/* END TABLE THONG TIN TRAM QUAN TRAC */}
                                    </div>
                                    <Tabs tabPosition="top" defaultActiveKey="1">
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
                                                    <Select placeholder="Chọn trạm quan trắc" >
                                                    {dataTramQuanTrac.map((tram,i) => (
                                                        <Select.Option value={tram.gieng_sohieu} key={i}>{tram.gieng_sohieu}</Select.Option>
                                                    ))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item className="p-1 m-0" label="Chỉ số">
                                                    <Select defaultValue="LUULUONG" >
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
                                            <Tabs tabPosition="top" defaultActiveKey="1">
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
                                                                    dataSource={dataBangBieuLuongMua} 
                                                                    columns={columnBangBieuLuongMua}
                                                                    pagination={false}
                                                                    rowClassName={(record, index) => (record.id <=12 ? "" : "d-none")}
                                                                />
                                                            </div>
                                                            <div className="col-sm-6 p-2">
                                                                <Table 
                                                                    bordered 
                                                                    dataSource={dataBangBieuLuongMua} 
                                                                    columns={columnBangBieuLuongMua}
                                                                    pagination={false}
                                                                    rowClassName={(record, index) => (record.id <=12 ? "d-none" : "")}
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
                                                                    dataSource={dataBangBieuLuongMua} 
                                                                    columns={columnBangBieuLuongMua}
                                                                    pagination={false}
                                                                    rowClassName={(record, index) => (record.id <=12 ? "" : "d-none")}
                                                                />
                                                            </div>
                                                            <div className="col-sm-6 p-2">
                                                                <Table 
                                                                    bordered 
                                                                    dataSource={dataBangBieuLuongMua} 
                                                                    columns={columnBangBieuLuongMua}
                                                                    pagination={false}
                                                                    rowClassName={(record, index) => (record.id <=12 ? "d-none" : "")}
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
                                            <Form layout="inline" className="justify-content-end">
                                                <Form.Item className="p-1 m-0" label="Trạm QT">
                                                    <Select placeholder="Chọn trạm quan trắc" >
                                                    {dataTramQuanTrac.map((tram,i) => (
                                                        <Select.Option value={tram.gieng_sohieu} key={i}>{tram.gieng_sohieu}</Select.Option>
                                                    ))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item className="p-1 m-0" label="Chỉ số">
                                                    <Select defaultValue="LUULUONG">
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
                                            <Table  
                                                bordered 
                                                dataSource={dataCongTrinh} 
                                                columns={columnCongTrinhMatKetNoi}  
                                                pagination={false} 
                                            />
                                        </TabPane>
                                        <TabPane tab="Vượt ngưỡng" key="4" style={{"overflow": "auto"}}>
                                            <Form layout="inline" className="justify-content-end">
                                                <Form.Item className="p-1 m-0" label="Trạm QT">
                                                    <Select placeholder="Chọn trạm quan trắc">
                                                    {dataTramQuanTrac.map((tram,i) => (
                                                        <Select.Option value={tram.gieng_sohieu} key={i}>{tram.gieng_sohieu}</Select.Option>
                                                    ))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item className="p-1 m-0" label="Chỉ số">
                                                    <Select defaultValue="LUULUONG" >
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
                                            <Table  
                                                bordered 
                                                dataSource={dataCongTrinh} 
                                                columns={columnCongTrinhVuotNguong}  
                                                pagination={false}
                                            />
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </div>  
                            {/* END TABLE SHOW LIST TRAM QUAN TRAC MUC NUOC HO */}
                        </div>
                    </div>
                </main>
            </div>
        )
    }

}