/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import '../../../../Shared/Page.css';
import { Button, Table, Form, DatePicker, TimePicker, Modal, Select, Tabs, Input } from 'antd';
import { FilterOutlined, FileExcelOutlined, UploadOutlined } from '@ant-design/icons';

// moment date in DatePicker
import moment from 'moment';

// IMPORT LINE CHARTS DATA
import { Line } from 'react-chartjs-2';

const { TabPane } = Tabs;


export default class HeThongGiamSatLichSuPhatDienLonHon2MW extends React.Component {
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
            },
        ];

        // DATA LUONG MUA
        const dataBangBieuLuongMua1 = [
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
        ];
        const dataBangBieuLuongMua2 = [
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
                title: 'Lưu lượng (m3/s)',
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
                title: 'Lưu lượng (m3/s)',
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
                tram_chiso: 'MUCNUOC',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: 1,
                quantrac_vuotnguong: 100,
            },
            {
                key: '2',
                id: '2',
                quantrac_tentram: 'HALUU',
                tram_kyhieu: '',
                tram_chiso: 'MUCNUOC',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: 2,
                quantrac_vuotnguong: 100,
            },
            {
                key: '3',
                id: '3',
                quantrac_tentram: 'NHAMAY',
                tram_kyhieu: '',
                tram_chiso: 'LUULUONG',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: 3,
                quantrac_vuotnguong: 100,
            },
            {
                key: '4',
                id: '4',
                quantrac_tentram: 'QUATRAN',
                tram_kyhieu: '',
                tram_chiso: 'LUULUONG',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: 4,
                quantrac_vuotnguong: 100.5,
            },
            {
                key: '5',
                id: '5',
                quantrac_tentram: 'DCTT',
                tram_kyhieu: '',
                tram_chiso: 'LUULUONG',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: 1,
                quantrac_vuotnguong: 100.5,
            }
        ];

        const columnTram = [
            {
                title: 'Tên trạm',
                dataIndex: 'quantrac_tentram',
                key: 'quantrac_tentram',
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
                title: 'Giá trị quan trắc hiện tại',
                dataIndex: '',
                key: '',
            },
            {
                title: 'Trạng thái kết nối',
                dataIndex: '',
                key: '',
                width: 120,
                render: (text, record) => (
                    <div className="d-flex justify-content-between">
                        {record.tram_trangthaiketnoi === 1 ?  
                            <div style={{width: 120}} className="license_status bg-success px-3 text-light"> Bình thường </div> 
                            : 
                        record.tram_trangthaiketnoi === 2 ? 
                            <div style={{width: 120}} className="license_status bg-warning px-3 text-light"> Vượt ngưỡng </div> 
                            :
                        record.tram_trangthaiketnoi === 3 ? 
                        <div style={{width: 120}} className="license_status bg-danger px-3 text-light"> Mất kết nối </div>
                            :
                        record.tram_trangthaiketnoi === 4 ? 
                            <div style={{width: 120}} className="license_status bg-secondary px-3 text-light"> Chưa gửi dữ liệu </div>
                        : ""}
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
                            {/* Tab Bieu do, Cap nhat, Bang bieu */}
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
                        </Modal>
                    </>
                ),
            },
        ];

        const dateFormat = 'DD/MM/YYYY';
        const timeFormat = 'HH:mm';

        const countknbt = dataTram.filter(function(item){
            if (item.tram_trangthaiketnoi === 1) {
              return true;
            } else {
              return false;
            }
          }).length;

          const counvn = dataTram.filter(function(item){
            if (item.tram_trangthaiketnoi === 2) {
              return true;
            } else {
              return false;
            }
          }).length;

          const countmkn = dataTram.filter(function(item){
            if (item.tram_trangthaiketnoi === 3) {
              return true;
            } else {
              return false;
            }
          }).length;

          const countcgdk = dataTram.filter(function(item){
            if (item.tram_trangthaiketnoi === 4) {
              return true;
            } else {
              return false;
            }
          }).length;

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
                        <div className="col-sm-2">Bình thường: <span className="py-1 px-3 fw-bold text-light bg-success">{countknbt}</span></div>
                        <div className="col-sm-2">Mất kết nối: <span className="py-1 px-3 fw-bold text-light bg-warning">{counvn}</span></div>
                        <div className="col-sm-2">Vượt ngưỡng: <span className="py-1 px-3 fw-bold text-light bg-danger">{countmkn}</span></div>
                        <div className="col-sm-2">Chưa gửi dữ liệu: <span className="py-1 px-3 fw-bold text-light bg-secondary">{countcgdk}</span></div>
                    </div>
                </div>
                <div className="table-responsive px-2">
                    <Table columns={columnTram} dataSource={dataTram} bordered />
                </div>
            </>
        )
    }
}