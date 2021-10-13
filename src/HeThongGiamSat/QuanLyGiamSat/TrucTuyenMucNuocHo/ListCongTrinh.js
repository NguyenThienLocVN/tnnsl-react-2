/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import '../../../Shared/Page.css';
import { Link } from 'react-router-dom';
import { Button, Table, Form, Select, DatePicker, Input, TimePicker } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

// moment date in DatePicker
import moment from 'moment';

export default class ListCongTrinh extends React.Component {

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
    
    render(){
        const dataSource = [
            {
                key: '1',
                gp_sogiayphep: '86/GPTNMT',
                gp_ngayky: '15/05/2005',
                congtrinh_ten: 'Công Trình Thủy Điện 1',
                chugiayphep_ten: '',
                gp_ngayhieuluc: '',
                gp_thoihan: '',
                hieulucgiayphep: 'conhieuluc',
                gp_thoigianguigannhat: '',
                connect_status: '',
                view_history: '1',
            },{
                key: '2',
                gp_sogiayphep: '103/GPTNMT',
                gp_ngayky: '15/05/2005',
                congtrinh_ten: 'Công Trình Thủy Điện 2',
                chugiayphep_ten: '',
                gp_ngayhieuluc: '',
                gp_thoihan: '',
                hieulucgiayphep: 'saphethieuluc',
                gp_thoigianguigannhat: '',
                connect_status: '',
                view_history: '1',
            },{
                key: '3',
                gp_sogiayphep: '103/GPTNMT',
                gp_ngayky: '15/05/2005',
                congtrinh_ten: 'Công Trình Thủy Điện 3',
                chugiayphep_ten: '',
                gp_ngayhieuluc: '',
                gp_thoihan: '',
                hieulucgiayphep: 'hethieuluc',
                gp_thoigianguigannhat: '',
                connect_status: '',
                view_history: '1',
            },{
                key: '4',
                gp_sogiayphep: '103/GPTNMT',
                gp_ngayky: '15/05/2005',
                congtrinh_ten: 'Công Trình Thủy Điện 4',
                chugiayphep_ten: '',
                gp_ngayhieuluc: '',
                gp_thoihan: '',
                hieulucgiayphep: 'hethieuluc',
                gp_thoigianguigannhat: '',
                connect_status: '',
                view_history: '1',
            },{
                key: '5',
                gp_sogiayphep: '103/GPTNMT',
                gp_ngayky: '15/05/2005',
                congtrinh_ten: 'Công Trình Thủy Điện 5',
                chugiayphep_ten: '',
                gp_ngayhieuluc: '',
                gp_thoihan: '',
                hieulucgiayphep: 'hethieuluc',
                gp_thoigianguigannhat: '',
                connect_status: '',
                view_history: '1',
            },
            {
                key: '6',
                gp_sogiayphep: '103/GPTNMT',
                gp_ngayky: '15/05/2005',
                congtrinh_ten: 'Công Trình Thủy Điện 6',
                chugiayphep_ten: '',
                gp_ngayhieuluc: '',
                gp_thoihan: '',
                hieulucgiayphep: 'hethieuluc',
                gp_thoigianguigannhat: '',
                connect_status: '',
                view_history: '1',
            },
            {
                key: '7',
                gp_sogiayphep: '103/GPTNMT',
                gp_ngayky: '15/05/2005',
                congtrinh_ten: 'Công Trình Thủy Điện 7',
                chugiayphep_ten: '',
                gp_ngayhieuluc: '',
                gp_thoihan: '',
                hieulucgiayphep: 'conhieuluc',
                gp_thoigianguigannhat: '',
                connect_status: '',
                view_history: '1',
            },
            {
                key: '8',
                gp_sogiayphep: '103/GPTNMT',
                gp_ngayky: '15/05/2005',
                congtrinh_ten: 'Công Trình Thủy Điện 8',
                chugiayphep_ten: '',
                gp_ngayhieuluc: '',
                gp_thoihan: '',
                hieulucgiayphep: 'conhieuluc',
                gp_thoigianguigannhat: '',
                connect_status: '',
                view_history: '1',
            },
            {
                key: '9',
                gp_sogiayphep: '103/GPTNMT',
                gp_ngayky: '15/05/2005',
                congtrinh_ten: 'Công Trình Thủy Điện 9',
                chugiayphep_ten: '',
                gp_ngayhieuluc: '',
                gp_thoihan: '',
                hieulucgiayphep: 'conhieuluc',
                gp_thoigianguigannhat: '',
                connect_status: '',
                view_history: '1',
            },
            {
                key: '10',
                gp_sogiayphep: '103/GPTNMT',
                gp_ngayky: '15/05/2005',
                congtrinh_ten: 'Công Trình Thủy Điện 10',
                chugiayphep_ten: '',
                gp_ngayhieuluc: '',
                gp_thoihan: '',
                hieulucgiayphep: 'conhieuluc',
                gp_thoigianguigannhat: '',
                connect_status: '',
                view_history: '1',
            },
            {
                key: '11',
                gp_sogiayphep: '103/GPTNMT',
                gp_ngayky: '15/05/2005',
                congtrinh_ten: 'Công Trình Thủy Điện 11',
                chugiayphep_ten: '',
                gp_ngayhieuluc: '',
                gp_thoihan: '',
                hieulucgiayphep: 'conhieuluc',
                gp_thoigianguigannhat: '',
                connect_status: '',
                view_history: '1',
            },
          ];
          
          const columns = [
            {
                title: 'Số giấy phép',
                dataIndex: 'gp_sogiayphep',
                  key: 'gp_sogiayphep',
                  width: 100,
            },
            {
                title: 'Ngày ký',
                dataIndex: 'gp_ngayky',
                key: 'gp_ngayky',
                width: 100,
            },
            {
                title: 'Tên công trình',
                dataIndex: 'congtrinh_ten',
                key: 'congtrinh_ten',
                width: 150,
            },
            {
                title: 'Chủ giấy phép',
                dataIndex: 'chugiayphep_ten',
                key: 'chugiayphep_ten',
            },
            {
                title: 'Thời hạn GP',
                dataIndex: 'gp_thoihan',
                key: 'gp_thoihan',
                width: 100,
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
                title: 'Nguồn nước khai thác',
                dataIndex: '',
                key: '',
                
              },
            
            
            {
                title: () => {
                    return <span>Thời gian gửi <br /> dữ liệu gần nhất </span>
                }, 
                    dataIndex: 'gp_thoigianguigannhat',
                    
                key: 'gp_thoigianguigannhat',
                width: 100,
            //{
              //      title: () => {
               //         return <span>Thời gian <br /> nhận số liệu</span>
               //    } ,
               //     dataIndex: '',
               //     key: '',
               
            //  },
              },
            
              {
                title: () => {
                    return <span>Mực nước hồ <br /> thượng lưu (m) </span>
                }, 
                    dataIndex: 'gp_mucnuochothuongluu',
                    
                key: 'gp_mucnuochothuongluu',
                width: 100,
            //{
              //      title: () => {
               //         return <span>Thời gian <br /> nhận số liệu</span>
               //    } ,
               //     dataIndex: '',
               //     key: '',
               
            //  },
              },
              {
                title: () => {
                    return <span>Mực nước hồ <br /> hạ lưu (m) </span>
                }, 
                    dataIndex: 'gp_mucnuochohaluu',
                    
                key: 'gp_mucnuochohaluu',
                width: 100,
            //{
              //      title: () => {
               //         return <span>Thời gian <br /> nhận số liệu</span>
               //    } ,
               //     dataIndex: '',
               //     key: '',
               
            //  },
              },
            {
                title: 'Tình trạng kết nối',
                dataIndex: 'connect_status',
                key: 'connect_status',
                width: 120,
                render: (text, record) => (
                    <div className="d-flex justify-content-center">
                        <div className="license_status bg-success px-3 text-light"> 12 </div>
                        <div className="license_status bg-warning px-3 text-light"> 15 </div>
                        <div className="license_status bg-danger px-3 text-light"> 10 </div>
                        <div className="license_status bg-secondary px-3 text-light"> 44 </div>
                    </div>
                )
            },
            {
                title: 'Xem lịch sử',
                key: 'view_history',
                align: 'center',
                width: 100,
                render: (text, record) => (
                    <>
                        <Link to={"/he-thong-giam-sat/truc-tuyen-muc-nuoc-ho/lich-su/"+record.view_history} className="text-center">Xem</Link>
                    </>
                ),
            },
          ];

        const dateFormat = 'DD/MM/YYYY';
        const timeFormat = 'HH:mm';

        return(
            <>
                <Form layout="inline" className="justify-content-end mb-2">
                    <Form.Item className="p-1 m-0" label="Giám sát kết nối" style={{width:'25%'}}>
                        <Select defaultValue={0} >
                            <Select.Option value={0}>Tất cả</Select.Option>
                            <Select.Option value={1}>Giám sát trực tuyến</Select.Option>  
                            <Select.Option value={2}>Giám sát camera</Select.Option>  
                            <Select.Option value={3}>Giám sát định kỳ</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className="p-1 m-0" label="Giấy phép" style={{width:'25%'}}>
                        <Input allowClear name="search" placeholder="--Tìm kiếm giấy phép--" onSearch={this.onSearchHandle} />
                    </Form.Item>
                    <Form.Item className="p-1 m-0" label="Huyện" style={{width:'25%'}}>
                        <Select defaultValue={0}>
                            <Select.Option value={0}>Chọn huyện</Select.Option>
                            <Select.Option value={1}>Chọn huyện</Select.Option>  
                            <Select.Option value={2}>Chọn huyện</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className="p-1 m-0" label="Dung tích hồ" style={{width:'25%'}}>
                        <Select defaultValue={0}>
                            <Select.Option value={0}>Tất cả dung tích</Select.Option>
                            <Select.Option value={1}>Dung tích hồ {">"} 1 triệu m3</Select.Option>  
                            <Select.Option value={2}>Dung tích hồ {"<"} 1 triệu m3</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className="p-1 m-0" label="Từ">
                        <DatePicker placeholder="Chọn ngày" defaultValue={moment()} format={dateFormat} />
                        <TimePicker placeholder="Chọn giờ" defaultValue={moment("00:00", timeFormat)} format={timeFormat} />
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
                    <Table dataSource={dataSource} columns={columns} bordered />
                </div>
            </>
        )
    }
}