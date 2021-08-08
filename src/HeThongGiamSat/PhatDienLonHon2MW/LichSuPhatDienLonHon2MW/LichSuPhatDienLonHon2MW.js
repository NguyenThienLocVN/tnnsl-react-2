/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import Header from '../../../Shared/Header';
import '../../../Shared/Page.css';
import LeftBar from '../../LeftBar';
import { Table, Input, Button } from 'antd';


export default class LichSuPhatDienLonHon2MW extends React.Component {

    componentDidMount(){
        document.title = "Hệ thống giám sát | Giám sát tài nguyên nước Sơn La";
    }
    
    render(){
        const dataSource = [
            {
                key: '1',
                tram_quantrac: 'Nhà máy (NHAMAY1)',
                thongsodo: 'LUULUONG',
                giatri_hientai: '72.242',
                donvi: 'm3/s',
                thoigiannhan: '02/08/2021 - 20:30:47',
                giatriyeucau: '72.242',
                vuotnguong: '-',
                giatri_nhonhat: '',
                giatri_lonnhat: '',
            },
          ];
          
          const columns = [
            {
                title: 'Trạm quan trắc',
                key: 'tram_quantrac',
                render: (text, record) => (
                    <>
                        <p className="m-0">{record.tram_quantrac}</p>
                    </>
                )
            },
            {
                title: 'Thông số đo',
                key: 'thongsodo',
                render: (text, record) => (
                    <>
                        <p className="m-0 text-center">{record.thongsodo}</p>
                    </>
                )
            },
            {
                title: 'Giá trị hiện tại',
                key: 'giatri_hientai',
                render: (text, record) => (
                    <>
                        <p className="m-0 text-center">{record.giatri_hientai}</p>
                    </>
                )
            },
            {
                title: 'Đơn vị',
                key: 'donvi',
                render: (text, record) => (
                    <>
                        <p className="m-0 text-center">{record.donvi}</p>
                    </>
                )
            },
            {
                title: 'Thời gian nhận',
                key: 'thoigiannhan',
                render: (text, record) => (
                    <>
                        <p className="m-0 text-center">{record.thoigiannhan}</p>
                    </>
                )
            },
            {
                title: 'Giá trị yêu cầu',
                key: 'giatriyeucau',
                render: (text, record) => (
                    <>
                        <p className="m-0 text-center">{record.giatriyeucau}</p>
                    </>
                )
            },
            {
                title: 'Vượt ngưỡng (+/-)',
                key: 'vuotnguong',
                render: (text, record) => (
                    <>
                        <p className="m-0 text-center">{record.vuotnguong}</p>
                    </>
                )
            },
            {
                title: 'Giá trị nhỏ nhất',
                key: 'giatri_nhonhat',
                render: (text, record) => (
                    <>
                        <p className="m-0 text-center">{record.giatri_nhonhat}</p>
                    </>
                )
            },
            {
                title: 'Giá trị lớn nhất',
                key: 'giatri_lonnhat',
                render: (text, record) => (
                    <>
                        <p className="m-0 text-center">{record.giatri_lonnhat}</p>
                    </>
                )
            },
          ];
        return(
            <div className="pt-1 px-1">
                <Header headTitle="HỆ THỐNG GIÁM SÁT CÔNG TRÌNH THỦY ĐIỆN LỚN HƠN 2MW - LỊCH SỬ" previousLink="/he-thong-giam-sat/phat-dien-lon-hon-2mw" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-12 col-lg-4 px-0 menu-home">
                        <LeftBar />
                    </div>
                    <div className="col-12 col-lg-8 px-0 menu-home">
                        <div className="col-12 row align-items-center my-1 px-0 mx-0">
                            <div className=" mb-2 col-lg-4 ">
                                <select name="filter" id="filter" onChange={this.onFilterHandle} className="form-select form-select-sm font-13" defaultValue="all">
                                    <option value="all">Chọn huyện</option>
                                    <option value={0}>Huyện 1</option>
                                    <option value={1}>Huyện 2</option>  
                                    <option value={2}>Huyện 3</option>
                                </select>
                            </div>
                            <div className=" mb-1 col-lg-4 ">
                                <Input.Search allowClear name="congtrinh" placeholder="--Tìm kiếm công trình--" onSearch={this.onSearchHandle} />
                            </div>
                            <div className=" mb-1 col-lg-4 ">
                                <Input.Search allowClear name="search" placeholder="--Tìm kiếm giấy phép--" onSearch={this.onSearchHandle} />
                            </div>
                            <div className="col-lg-12 row mx-0 mb-2">
                                <div className="col-sm-6 row px-0 mx-0">
                                    <div className="col-sm-2 mx-0 row align-items-center justify-content-end">
                                        Từ: 
                                    </div>
                                    <div className="col-sm-5 px-0">
                                        <select name="filter" id="filter" onChange={this.onFilterHandle} className="form-select form-select-sm font-13" defaultValue="all">
                                            <option value="all">Ngày/Tháng/Năm</option>
                                            <option value={0}>Ngày/Tháng/Năm</option>
                                            <option value={1}>Ngày/Tháng/Năm</option>  
                                            <option value={2}>Ngày/Tháng/Năm</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-5 px-0">
                                        <select name="filter" id="filter" onChange={this.onFilterHandle} className="form-select form-select-sm font-13" defaultValue="all">
                                            <option value="all">Giờ:Phút</option>
                                            <option value={0}>Giờ:Phút</option>
                                            <option value={1}>Giờ:Phút</option>  
                                            <option value={2}>Giờ:Phút</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6 row px-0 mx-0">
                                    <div className="col-sm-2 mx-0 row align-items-center justify-content-end">
                                        Đến: 
                                    </div>
                                    <div className="col-sm-5 px-0">
                                        <select name="filter" id="filter" onChange={this.onFilterHandle} className="form-select form-select-sm font-13" defaultValue="all">
                                            <option value="all">Ngày/Tháng/Năm</option>
                                            <option value={0}>Ngày/Tháng/Năm</option>
                                            <option value={1}>Ngày/Tháng/Năm</option>  
                                            <option value={2}>Ngày/Tháng/Năm</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-5 px-0">
                                        <select name="filter" id="filter" onChange={this.onFilterHandle} className="form-select form-select-sm font-13" defaultValue="all">
                                            <option value="all">Giờ:Phút</option>
                                            <option value={0}>Giờ:Phút</option>
                                            <option value={1}>Giờ:Phút</option>  
                                            <option value={2}>Giờ:Phút</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row mx-0">
                                <div className="col-sm-7 d-flex-md px-0">
                                    <span className="px-2">
                                        <Button> Chỉ số HT </Button>
                                    </span>
                                    <span className="px-2">
                                        <Button> Tổng hợp </Button>
                                    </span>
                                    <span className="px-2">
                                        <Button> Vận hành </Button>
                                    </span>
                                    <span className="px-2">
                                        <Button> Vượt ngưỡng </Button>
                                    </span>
                                    <span className="px-2">
                                        <Button> Kết nối </Button>
                                    </span>
                                </div>
                                <div className="col-sm-5 row mx-0 px-0">
                                    <label className="w-25" htmlFor="filter">Trạng thái: </label>
                                    <select name="filter" id="filter" onChange={this.onFilterHandle} className="form-select form-select-sm font-13 w-75" defaultValue="all">
                                        <option value="all">Bình thường</option>
                                        <option value={0}>Định kỳ</option>
                                        <option value={1}>Hiệu chỉnh</option>  
                                        <option value={2}>Lỗi thiết bị</option>
                                    </select>
                                </div>
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