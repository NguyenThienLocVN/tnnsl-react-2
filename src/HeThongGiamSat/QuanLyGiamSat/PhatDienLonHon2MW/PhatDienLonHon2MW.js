/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import Header from '../../../Shared/Header';
import '../../../Shared/Page.css';
import LeftBar from '../../LeftBar';
import { Table, Input } from 'antd';
import { Link } from 'react-router-dom';


export default class PhatDienLonHon2MW extends React.Component {

    componentDidMount(){
        document.title = "Hệ thống giám sát | Giám sát tài nguyên nước Sơn La";
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
            },
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
                title: 'Tên công trình',
                dataIndex: 'congtrinh_ten',
                key: 'congtrinh_ten',
            },
            {
                title: 'Tổ chức được cấp phép',
                dataIndex: 'chugiayphep_ten',
                key: 'chugiayphep_ten',
            },
            {
                title: 'Ngày có hiệu lực',
                dataIndex: 'gp_ngayhieuluc',
                key: 'gp_ngayhieuluc',
            },
            {
                title: 'Thời hạn',
                dataIndex: 'gp_thoihan',
                key: 'gp_thoihan',
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
                title: 'Thời gian dửi dữ liệu gần nhất',
                dataIndex: 'gp_thoigianguigannhat',
                key: 'gp_thoigianguigannhat',
            },
            {
                title: 'Tình trạng kết nối',
                dataIndex: 'connect_status',
                key: 'connect_status',
                render: (text, record) => (
                    <div className="d-flex">
                        <div className="license_status bg-success px-3"> 1 </div>
                        <div className="license_status bg-warning px-3"> 1 </div>
                        <div className="license_status bg-secondary px-3"> 19 </div>
                    </div>
                )
            },
            {
                title: '',
                key: 'view_history',
                render: (text, record) => (
                    <>
                        <Link to={"/he-thong-giam-sat/phat-dien-lon-hon-2mw/lich-su/"+record.view_history}>Xem lịch sử</Link>
                    </>
                ),
            },
          ];
        return(
            <div className="pt-1 px-1">
                <Header headTitle="HỆ THỐNG GIÁM SÁT CÔNG TRÌNH THỦY ĐIỆN LỚN HƠN 2MW" previousLink="/he-thong-giam-sat" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-12 col-lg-4 px-0 menu-home">
                        <LeftBar />
                    </div>
                    <div className="col-12 col-lg-8 px-0 menu-home">
                        <div className="col-12 row align-items-center my-1 px-0 mx-0">
                            <div className=" mb-1 col-lg-3">
                                <Input.Search allowClear name="search" placeholder="--Tìm kiếm giấy phép--" onSearch={this.onSearchHandle} />
                            </div>
                            <div className="col-lg-3 mb-2">
                                <select name="filter" id="filter" onChange={this.onFilterHandle} className="form-select font-13" defaultValue="all">
                                    <option value="all">Trạng thái</option>
                                    <option value={0}>Bình thường</option>
                                    <option value={1}>Mất kết nối</option>  
                                    <option value={2}>Chưa gửi dữ liệu</option>
                                </select>
                            </div>
                            <div className="col-lg-6 row mx-0 mb-2">
                                <div className="col-sm-4">Bình thường: <span className="p-2 bg-success">152</span></div>
                                <div className="col-sm-4">Mất kết nối: <span className="p-2 bg-warning">152</span></div>
                                <div className="col-sm-4">Chưa gửi dữ liệu: <span className="p-2 bg-secondary">152</span></div>
                            </div>
                        </div>
                        <div className="table-responsive px-2">
                            <Table dataSource={dataSource} columns={columns} bordered />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}