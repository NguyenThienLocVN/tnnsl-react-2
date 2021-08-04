/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import Header from '../../Shared/Header';
import '../../Shared/Page.css';
import LeftBar from '../LeftBar';
import { Table, Input } from 'antd';
import { Link } from 'react-router-dom';


export default class PhatDienLonHon2MW extends React.Component {

    componentDidMount(){
        document.title = "Hệ thống giám sát | Giám sát tài nguyên nước Sơn La";
    }
    
    render(){
        const dataSource = [
            {
                key: '1',
                gp_sogiayphep: '86/GPTNMT',
                gp_ngayky: '15/05/2005',
                congtrinh_ten: 'Thủy điện suối tân',
                chugiayphep_ten: '',
                gp_ngayhieuluc: '',
                gp_thoihan: '',
                status: '',
                gp_thoigianguigannhat: '',
                connect_status: '',
                view_history: 'a',
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
                dataIndex: 'status',
                key: 'status',
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
            },
            {
                title: 'Xem lịch sử',
                dataIndex: 'view_history',
                key: 'view_history',
                render() {
                    <Link>Xem lịch sử</Link>
                }
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
                            <div className=" mb-1 col-lg-9 ">
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