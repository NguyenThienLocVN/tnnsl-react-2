/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import '../../../../Shared/Page.css';
import { Button, Table, Form, DatePicker, TimePicker, Modal, Select } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

// moment date in DatePicker
import moment from 'moment';

// IMPORT LINE CHARTS DATA
import { Line } from 'react-chartjs-2';


export default class HeThongGiamSatLichSuKhaiThacNuocDuoiDatLonHon extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activeModal: null,
        };
    }

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
                label: 'Giá trị quan trắc',
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
                quantrac_tentram: 'LUULUONGKTNDD',
                tram_kyhieu: '',
                tram_chiso: 'LUULUONG',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: [1, 3, 1, 8],
            },
            {
                key: '2',
                id: '2',
                quantrac_tentram: 'MUCNUOCKTNDD',
                tram_kyhieu: '',
                tram_chiso: 'MUCNUOC',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: [1, 3, 1, 8],
            },
            {
                key: '3',
                id: '3',
                quantrac_tentram: 'CLNKHAITHACNDD',
                tram_kyhieu: '',
                tram_chiso: 'CLN',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: [2, 5, 3, 12],
            },
            {
                key: '4',
                id: '4',
                quantrac_tentram: 'MUCNUOCGIENGQT',
                tram_kyhieu: '',
                tram_chiso: 'MUCNUOC',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: [8, 6, 1, 6],
            },
            
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
                title: () => {
                    return <span>Thời gian <br /> nhận số liệu</span>
                } ,
                dataIndex: '',
                key: '',
            },
            {
               
                title: () => { 
                    return <span>Lưu lượng <br /> khai thác <br /> (m3/ngày đêm)</span>
                } ,
                dataIndex: '',
                key: '',
            },
            {
                title: () => { 
                    return <span>Mực nước <br /> trong giếng <br /> khai thác</span>
                } ,
           
                dataIndex: '',
                key: '',
            },
            {
                title: 'Quan trắc chất lượng nước trong quá trình khai thác',
                children: [
                    {
                      title: 'Nhiệt độ',
                      dataIndex: '',
                      key: '',
                      width: 80,
                    },
                    {
                        title: () => (
                            <div className="text-center">
                                pH
                            </div>
                        ),
                        dataIndex: '',
                        key: '',
                        width: 80,
                    },
                    {
                        title: () => (
                            <div className="text-center">
                                BOD₅(20⁰)
                            </div>
                        ),
                        dataIndex: '',
                        key: '',
                        width: 80,
                    },
                    {
                        title: () => (
                            <div className="text-center">
                                COD
                            </div>
                        ),
                        dataIndex: '',
                        key: '',
                        width: 80,
                    },
                    {
                        title: () => (
                            <div className="text-center">
                                DO
                            </div>
                        ),
                        dataIndex: '',
                        key: '',
                        width: 80,
                    },
                    {
                        title: () => (
                            <div className="text-center">
                                TSS
                            </div>
                        ),
                        dataIndex: '',
                        key: '',
                        width: 80,
                    },
                    {
                        title: () => (
                            <div className="text-center">
                                NH4+
                            </div>
                        ),
                        dataIndex: '',
                        key: '',
                        width: 80,
                    },
                ],
                dataIndex: '',
                key: '',
                align: 'center',
            },
            
            {
                title: 'Trạng thái kết nối',
                dataIndex: '',
                key: '',
                width: 200,
                render: (text, record) => (
                    <div className="d-flex justify-content-between">
                        <div className="license_status bg-success px-3 text-light"> {record.tram_trangthaiketnoi[0] < 10 ? "0"+record.tram_trangthaiketnoi[0] : record.tram_trangthaiketnoi[0]} </div>
                        <div className="license_status bg-warning px-3 text-light"> {record.tram_trangthaiketnoi[1] < 10 ? "0"+record.tram_trangthaiketnoi[1] : record.tram_trangthaiketnoi[1]} </div>
                        <div className="license_status bg-danger px-3 text-light"> {record.tram_trangthaiketnoi[2] < 10 ? "0"+record.tram_trangthaiketnoi[2] : record.tram_trangthaiketnoi[2]} </div>
                        <div className="license_status bg-secondary px-3 text-light"> {record.tram_trangthaiketnoi[3] < 10 ? "0"+record.tram_trangthaiketnoi[3] : record.tram_trangthaiketnoi[3]} </div>
                    </div>
                )
            },
            {
                title: 'Xem lịch sử',
                key: '',
                align: 'center',
                render: (text, record) => (
                    <>
                        <span className="text-primary" onClick={(e) => { this.handleOpenModal(e, record.id) }} >Xem</span>
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

        const dateFormat = 'DD/MM/YYYY';
        const timeFormat = 'HH:mm';

        return(
            <>
                <Table columns={columns}  dataSource={dataSource} bordered pagination={false} />
                <Form layout="inline" className="justify-content-end mb-2">
                    <Form.Item className="p-1 m-0" label="Trạm QT">
                        <Select placeholder="Chọn trạm quan trắc" >
                        {dataTram.map((tram,i) => (
                            <Select.Option value={tram.quantrac_tentram} key={i}>{tram.quantrac_tentram}</Select.Option>
                        ))}
                        </Select>
                    </Form.Item>
                    <Form.Item className="p-1 m-0" label="Chỉ số">
                        <Select defaultValue="LUULUONG">
                            <Select.Option value="LUULUONG">LUULUONG</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className="p-1 m-0" label="Từ">
                        <DatePicker placeholder="Chọn ngày" defaultValue={moment()} format={dateFormat} />
                        <TimePicker placeholder="Chọn giờ" defaultValue={moment('00:00', timeFormat)} format={timeFormat} />
                    </Form.Item>
                    <Form.Item className="p-1 m-0" label="Đến">
                        <DatePicker placeholder="Chọn ngày" defaultValue={moment()} format={dateFormat} />
                        <TimePicker placeholder="Chọn giờ" defaultValue={moment()} format={timeFormat} />
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
            </>
        )
    }
}