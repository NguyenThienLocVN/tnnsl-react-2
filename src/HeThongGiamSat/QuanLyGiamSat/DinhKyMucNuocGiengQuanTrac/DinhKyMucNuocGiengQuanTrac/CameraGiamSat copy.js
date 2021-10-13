/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import '../../../../Shared/Page.css';
import { Button, Table, Form, DatePicker, TimePicker, Modal, Select, Input } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

// moment date in DatePicker
import moment from 'moment';

import { Link } from 'react-router-dom';


export default class CameraGiamSat extends React.Component {

    constructor(props){
        super(props)
        this.state = { 
            activeModal: null,
            loading: false,
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
                quantrac_tentram: 'TRAM SO 1',
                tram_kyhieu: '',
                tram_chiso: 'CLN',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: [1, 3, 1, 8],
            },
            {
                key: '2',
                id: '2',
                quantrac_tentram: 'TRAM SO 2',
                tram_kyhieu: '',
                tram_chiso: 'CLN',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: [2, 5, 3, 12],
            },
            {
                key: '3',
                id: '3',
                quantrac_tentram: 'TRAM SO 3',
                tram_kyhieu: '',
                tram_chiso: 'CLN',
                tram_thoigiannhan: '',
                tram_giatriquantrac: '',
                tram_trangthaiketnoi: [2, 5, 3, 12],
            },
           
        ];

        const columnTram = [
            {
                title: 'Tên trạm',
                dataIndex: 'quantrac_tentram',
                key: 'quantrac_tentram',
                width: 50,
            },
            {
                title: 'Ký hiệu trạm',
                dataIndex: '',
                key: '',
                width: 50,
            },
            {
                title: 'Chỉ số',
                dataIndex: 'tram_chiso',
                key: 'tram_chiso',
                width: 50,
            },
            {
                title: () => {
                    return <span>Thời gian <br /> nhận số liệu</span>
                } ,
                dataIndex: '',
                key: '',
                width: 50,
            },
            {
               
                title: () => { 
                    return <span>Nguồn nước <br /> xả thải</span>
                } ,
                dataIndex: '',
                key: '',
                width: 50,
            },
            {
                title: () => { 
                    return <span>Lưu lượng <br /> xả thải <br /> m3/ngày.dêm</span>
                } ,
           
                dataIndex: '',
                key: '',
                width: 50,
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
                title: 'Vượt ngưỡng',
                dataIndex: 'quantrac_vuotnguong',
                key: 'quantrac_vuotnguong',
                width: 80,
                align: 'center',
                render: (text, record) => (
                    <div className="d-flex justify-content-between">
                        {record.quantrac_vuotnguong > 100 ?  
                            <span className="text-center w-100"> + </span> 
                            : 
                            <span className="text-center w-100"> - </span>
                        }
                    </div>
                )
            },
            {
                title: () => (
                    <>
                        Giá trị <br /> vượt ngưỡng
                    </>
                     
                ),
                dataIndex: 'quantrac_giatrivuotnguong',
                key: 'quantrac_giatrivuotnguong',
                width: 60,
                align: 'center',
                render: (text, record) => (
                    <div className="d-flex justify-content-between">
                        {record.quantrac_vuotnguong > 100 ?  
                            <span className="text-center w-100"> {record.quantrac_vuotnguong - 100} </span> 
                            : 
                            <span className="text-center w-100"> {record.quantrac_vuotnguong - 100} </span>
                        }
                    </div>
                )
            },
            {
                title: () => (
                    <>
                        Giá trị <br /> lớn nhất
                    </>
                ),
                dataIndex: 'quantrac_giatrilonnhat',
                key: 'quantrac_giatrilonnhat',
                align: 'center',
                width: 50,
            },
            {
                title: () => (
                    <>
                        Giá trị <br /> nhỏ nhất
                    </>
                ),
                dataIndex: 'quantrac_giatrinhonhat',
                key: 'quantrac_giatrinhonhat',
                align: 'center',
                width: 50,
            },
            {
                title: () => (
                    <>
                        Giá trị <br /> trung bình
                    </>
                ),
                dataIndex: 'quantrac_giatritrungbinh',
                key: 'quantrac_giatritrungbinh',
                align: 'center',
                width: 50,
            },
            {
                title: 'Trạng thái camera',
                dataIndex: '',
                key: '',
                width: 200,
                render: (text, record) => (
                    <div className="d-flex justify-content-between">
                        <Link to="#">Có link camera</Link>
                    </div>
                )
            },
            {
                title: 'Xem camera',
                key: '',
                align: 'center',
                width: 100,
                render: (text, record) => (
                    <>
                        <span className="text-primary" onClick={(e) => { this.handleOpenModal(e, record.id) }} >Xem</span>
                        <Modal
                            className="modal-quantrac"
                            title={false}
                            centered={true}
                            width={1400}
                            visible={this.state.activeModal === record.id} 
                            onCancel={this.handleCloseModal}
                            footer={false}
                            destroyOnClose={true}
                        >
                            <p className="fw-bold"><span className="text-danger">CAMERA GIÁM SÁT TRẠM QUAN TRẮC: </span> <span> {record.quantrac_tentram} </span> </p>
                            <div>
                                <img src={process.env['PUBLIC_URL'] + '/images/HE_THONG_GIAM_SAT/blank.jpg'} className="w-100" />
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
                    <Form.Item className="p-1 m-0" label="Giám sát kết nối" style={{width:'25%'}}>
                        <Select defaultValue={0} >
                            <Select.Option value={0}>Tất cả</Select.Option>
                            <Select.Option value={1}>Giám sát trực tuyến</Select.Option>  
                            <Select.Option value={2}>Giám sát camera</Select.Option>  
                            <Select.Option value={3}>Giám sát định kỳ</Select.Option>
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
                        <div className="col-sm-2">Bình thường: <span className="py-1 px-3 fw-bold text-light bg-success">{12*11}</span></div>
                        <div className="col-sm-2">Mất kết nối: <span className="py-1 px-3 fw-bold text-light bg-warning">{15*11}</span></div>
                        <div className="col-sm-2">Vượt ngưỡng: <span className="py-1 px-3 fw-bold text-light bg-danger">{10*11}</span></div>
                        <div className="col-sm-2">Chưa gửi dữ liệu: <span className="py-1 px-3 fw-bold text-light bg-secondary">{44*11}</span></div>
                    </div>
                </div>
                <div className="table-responsive px-2">
                    <Table dataSource={dataTram} columns={columnTram} bordered />
                </div>
            </>
        )
    }
}