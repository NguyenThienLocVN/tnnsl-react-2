import React from 'react';
import Header from '../../../layout/Header';
import { Link } from 'react-router-dom';
import Map from '../../../layout/Map';
import { InfoCircleOutlined, EyeOutlined, PlusOutlined, FileExcelOutlined, SearchOutlined, EditOutlined, DeleteOutlined, FileOutlined } from '@ant-design/icons';

import { Table, Tag } from 'antd';

export default class QuanLyCapPhepNuocMatTongQuanCongTrinh extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            pagename: this.props.match.params.pagename,
            showSearch: false,
            columns : [
                {
                    title: '#',
                    dataIndex: 'id',
                },
                {
                  title: 'Số giấy phép',
                  dataIndex: 'so_giay_phep',
                },
                {
                  title: 'Ngày ký',
                  dataIndex: 'ngay_ky',
                },
                {
                  title: 'Tên công trình',
                  dataIndex: 'ten_cong_trinh',
                },
                {
                  title: 'Tổ chức được CP',
                  dataIndex: 'ten_to_chuc',
                },
                {
                    title: 'Ngày có hiệu lực',
                    dataIndex: 'ngay_hieu_luc',
                },
                {
                    title: 'Thời hạn (năm)',
                    dataIndex: 'thoi_han',
                },
                {
                    title: 'Trạng thái',
                    dataIndex: 'trang_thai',
                    render: trang_thai => (
                        <>
                          {trang_thai.map(tt => {
                            let color = 'gray';
                            let text = 'Chưa phê duyệt';
                            if (tt === '1') {
                              color = 'green';
                              text = 'Còn hiệu lực';
                            }
                            else if (tt === '2') {
                                color = 'orange';
                                text = 'Sắp hết hiệu lực';
                            }
                            else if (tt === '3') {
                                color = 'red';
                                text = 'Hết hiệu lực';
                            }
                            else if (tt === '4') {
                                color = 'purple';
                                text = 'Chưa có GP thay thế';
                            }
                            return (
                              <Tag color={color} key={tt}>
                                {text.toUpperCase()}
                              </Tag>
                            );
                          })}
                        </>
                      ),
                },
                {
                    title: 'Thao tác',
                    dataIndex: 'thao_tac',
                }
            ],
            data : [
                {
                  id: '1',
                  so_giay_phep: <p title="Xem file giấy phép" className="text-primary m-0">482/GP-BTNMT &nbsp; <FileOutlined /> </p>,
                  ngay_ky: '11/05/2021',
                  ten_cong_trinh: <p title="Xem bản đồ" className="text-primary m-0">Thủy điện Sơ Vin <img  src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" /></p>,
                  ten_to_chuc: 'Công ty A',
                  ngay_hieu_luc: '12/05/2021',
                  thoi_han: 10,
                  trang_thai: ['1'],
                  thao_tac: <div><Link title="Xem GP" to={this.xemThongTinChung}><EyeOutlined /></Link>&nbsp; &nbsp;<Link to="/quan-ly-cap-phep/nuoc-mat/tao-moi" title="Sửa"><EditOutlined /></Link>&nbsp; &nbsp;<span title="Xóa" className="text-danger"><DeleteOutlined /></span></div>
                },
                {
                  id: '2',
                  so_giay_phep: <p title="Xem file giấy phép" className="text-primary m-0">773/GP-BTNMT &nbsp; <FileOutlined /> </p>,
                  ngay_ky: '04/05/2021',
                  ten_cong_trinh: <p title="Xem bản đồ" className="text-primary m-0">Thủy điện Nậm Pia <img  src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" /></p>,
                  ten_to_chuc: 'Công ty B',
                  ngay_hieu_luc: '11/05/2021',
                  thoi_han: 10,
                  trang_thai: ['2'],
                  thao_tac: <div><Link title="Xem GP" to={this.xemThongTinChung}><EyeOutlined /></Link>&nbsp; &nbsp;<Link to="/quan-ly-cap-phep/nuoc-mat/tao-moi" title="Sửa"><EditOutlined /></Link>&nbsp; &nbsp;<span title="Xóa" className="text-danger"><DeleteOutlined /></span></div>
                },
                {
                    id: '3',
                    so_giay_phep: <p title="Xem file giấy phép" className="text-primary m-0">773/GP-BTNMT &nbsp; <FileOutlined /> </p>,
                    ngay_ky: '04/05/2021',
                    ten_cong_trinh: <p title="Xem bản đồ" className="text-primary m-0">Thủy điện Nậm Pia <img  src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" /></p>,
                    ten_to_chuc: 'Công ty B',
                    ngay_hieu_luc: '11/05/2021',
                    thoi_han: 10,
                    trang_thai: ['3'],
                    thao_tac: <div><Link title="Xem GP" to={this.xemThongTinChung}><EyeOutlined /></Link>&nbsp; &nbsp;<Link to="/quan-ly-cap-phep/nuoc-mat/tao-moi" title="Sửa"><EditOutlined /></Link>&nbsp; &nbsp;<span title="Xóa" className="text-danger"><DeleteOutlined /></span></div>
                  }
            ]
        }
    }

    componentDidMount(){
        if(this.state.pagename === "thuy-dien"){
            document.title = "Thủy điện | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "ho-chua"){
            document.title = "Hồ Chứa | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "tram-bom"){
            document.title = "Trạm Bơm | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            document.title = "Đập/Hệ Thống Thủy Lợi | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "cong"){
            document.title = "Cống | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            document.title = "Trạm Cấp  Nước | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            document.title = "Nhà  Máy Nước | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            document.title = "Công Trình Khác | Quản lý cấp phép nước mặt";
        }
        
    }
    headerTitle = () => {
        if(this.state.pagename === "thuy-dien"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH | THỦY ĐIỆN ";
        }
        else if(this.state.pagename === "ho-chua"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH | HỒ CHỨA ";
        }
        else if(this.state.pagename === "tram-bom"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH | TRẠM BƠM ";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH | HỆ THỐNG THỦY LỢI ";
        }
        else if(this.state.pagename === "cong"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH | CỐNG ";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH | TRẠM CẤP NƯỚC ";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH | NHÀ MÁY NƯỚC ";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH | CÔNG TRÌNH KHÁC ";
        }
    }

    xemThongTinChung = () => {
        return "/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-chung";
    }

    imageConstruction = () => {
        if(this.state.pagename === "thuy-dien"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/thuydien.png';
        }
        else if(this.state.pagename === "ho-chua"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/hochua.png';
        }
        else if(this.state.pagename === "tram-bom"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/trambom.jpg';
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/dapthuyloi.jpg';
        }
        else if(this.state.pagename === "cong"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/cong.jpg';
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/tramcapnuoc.jpg';
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/nhamaynuoc.jpg';
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/trambom.jpg';
        }
    }

    constructionType = () => {
        if(this.state.pagename === "thuy-dien"){
            return "thủy điện";
        }
        else if(this.state.pagename === "ho-chua"){
            return "hồ chứa";
        }
        else if(this.state.pagename === "tram-bom"){
            return "trạm bơm";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            return "đập/hệ thống thủy lợi";
        }
        else if(this.state.pagename === "cong"){
            return "cống";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            return "trạm cấp nước";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            return "nhà máy nươc";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            return "công trình khác";
        }
    }

    render(){
        return(
			<div className="p-0">
                <Header headTitle={this.headerTitle()} previousLink="/quan-ly-cap-phep" showHeadImage={true} layout48={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                        <div className="col-12 px-0">
                            
                            <div className="col-10 py-2 m-auto d-flex justify-content-center text-center">
                                {/* <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/thuydien1.png'} className="p-0 hydroelectric-icon rounded-circle border border-secondary my-auto mx-3" alt="dap-thuy-dien" /> */}
                                <img src={this.imageConstruction()} className="p-0 hydroelectric-icon rounded-circle border border-secondary my-auto mx-3" alt="dap-thuy-dien" />
                                <div className="col-6 text-center p-0">
                                    <p className="fw-bold mb-1">Tổng số công trình {this.constructionType()} </p>
                                    <p className="font-30 m-0 fw-bold">60</p>
                                </div>
                            </div>

                            <div className="col-12 py-1 mt-4 d-flex justify-content-center text-center border-top border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Tổng số CT đã vận hành</p>
                                    <p className="font-18 m-0 fw-bold text-danger">28 / 60</p>
                                </div>
                                <img src={this.imageConstruction()} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="dap-thuy-dien" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép đã cấp</p>
                                    <p className="font-18 m-0 fw-bold text-danger">11 / 60</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép sắp hết hiệu lực</p>
                                    <p className="font-18 m-0 fw-bold text-danger">06 / 60</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing-2.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep-2" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép hết hiệu lực</p>
                                    <p className="font-18 m-0 fw-bold text-danger">03 / 60</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing-3.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep-3" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép chưa phê duyệt</p>
                                    <p className="font-18 m-0 fw-bold text-danger">10 / 60</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/report.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="chua-duyet" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Chưa có giấy phép</p>
                                    <p className="font-18 m-0 fw-bold text-danger">02 / 60</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/expire.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="het-han" />
                            </div>

                            <Link to="/quan-ly-cap-phep/nuoc-mat/tao-moi" className="col-11 btn btn-primary d-flex align-items-center mx-auto mt-3"><PlusOutlined /> &nbsp; Tạo mới giấy phép</Link>
                            <button className="col-11 btn btn-success d-flex align-items-center mx-auto mt-1"><FileExcelOutlined /> &nbsp; Xuất file</button>
                            <button className="col-11 btn btn-info d-flex align-items-center mx-auto mt-1"><InfoCircleOutlined /> &nbsp; Hướng dẫn sử dụng</button>
                        </div>
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <div className="col-12 px-md-1 vh-50">
                            <Map className="col-12" />

                            <div className="col-12 p-0 ">
                                <div className="col-12 row align-items-center my-1 px-0 mx-0">
                                    <div className=" mb-1 col-lg-3 ">
                                        <input type="text" className="form-control" placeholder="-- Tìm kiếm --" aria-label="-- Tìm kiếm --" aria-describedby="basic-addon2" />
                                    </div>
                                    <div className="col-lg-3 mb-2">
                                        <select defaultValue="0" className="form-control form-control-sm font-13">
                                            <option value="0">-- Chọn hiệu lực --</option>
                                            <option value="1">Còn hiệu lực</option>
                                            <option value="2">Chưa phê duyệt</option>
                                            <option value="3">Hết hiệu lực</option>
                                            <option value="3">Sắp hết hiệu lực</option>
                                            <option value="3">Hết hiệu lực chưa có GP thay thế</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-3 mb-2">
                                        <select defaultValue="0" className="form-control form-control-sm font-13">
                                            <option value="0">-- Sắp xếp --</option>
                                            <option value="1">Sắp xếp theo số giấy phép</option>
                                            <option value="2">Sắp xếp theo ngày kí</option>
                                            <option value="3">Sắp xếp theo tên công trình</option>
                                            <option value="3">Sắp xếp theo tên ĐVXCP</option>
                                            <option value="3">Sắp xếp theo ngày bắt đầu hiệu lực</option>
                                            <option value="3">Sắp xếp theo ngày kết thúc hiệu lực</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-3 mb-2 px-2"><button className="col-6 fw-bold text-light btn btn-info d-flex align-items-center justify-content-center font-13">Tìm &nbsp;<SearchOutlined /></button></div>
                                </div>
                                <div className="table-responsive">
                                    <Table className="table-data-license" columns={this.state.columns} bordered pagination={{ position: 'bottomLeft' }} dataSource={this.state.data}  />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}