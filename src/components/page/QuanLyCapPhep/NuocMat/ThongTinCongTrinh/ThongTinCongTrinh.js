import React from 'react';
import Header from '../../../../layout/Header';
import { Link } from 'react-router-dom';
import Map from '../../../../layout/Map';
import axios from "axios";
import configData from "../../../../../config.json";
import { trackPromise } from 'react-promise-tracker';

export default class QuanLyCapPhepNuocMatXemThongTinCongTrinh extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mode: 'top',
          pagename: this.props.match.params.pagename,
          dataHydroContructionInfo: [],
        };
      }
      componentDidMount(){
        if(this.state.pagename === "thuy-dien"){
            document.title = "Xem thông tin | Thủy điện | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "ho-chua"){
            document.title = "Xem thông tin | Hồ Chứa | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "tram-bom"){
            document.title = "Xem thông tin | Trạm Bơm | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            document.title = "Xem thông tin | Đập/Hệ Thống Thủy Lợi | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "cong"){
            document.title = "Xem thông tin | Cống | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            document.title = "Xem thông tin | Trạm Cấp  Nước | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            document.title = "Xem thông tin | Nhà  Máy Nước | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            document.title = "Xem thông tin | Công Trình Khác | Quản lý cấp phép nước mặt";
        }

        trackPromise(
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/giay-phep-thuy-dien/"+this.props.match.params.id)
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        dataHydroContructionInfo: response.data,
                    });
                    console.log(this.state.dataHydroContructionInfo);
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            })
        )
    }
    headerTitle = () => {
        if(this.state.pagename === "thuy-dien"){
            return " CÔNG TRÌNH THỦY ĐIỆN | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "ho-chua"){
            return " CÔNG TRÌNH HỒ CHỨA | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "tram-bom"){
            return " CÔNG TRÌNH TRẠM BƠM | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            return " CÔNG TRÌNH HT THỦY LỢI | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "cong"){
            return " CÔNG TRÌNH CỐNG | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            return " CÔNG TRÌNH TRẠM CẤP NƯỚC | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            return " CÔNG TRÌNH NHÀ MÁY NƯỚC | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            return " CÔNG TRÌNH KHÁC | THÔNG TIN CHUNG";
        }
    }
    

    render(){
        return(
			<div className="p-0">
                <Header headTitle={this.headerTitle()} previousLink={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename} showHeadImage={true} layout48={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-lg-12 px-0 row mx-0">
                        <div className="col-lg-2    ">
                            <nav className="nav flex-column nav-pills pt-3">
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-chung/"+this.props.match.params.id} className="nav-link text-dark border-bottom">Thông tin chung</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-cong-trinh/"+this.props.match.params.id} className="nav-link text-dark border-bottom active">Thông tin công trình</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/giam-sat-khai-thac-su-dung/"+this.props.match.params.id} className="nav-link text-dark border-bottom">Giám sát KTSD</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/chat-luong-nuoc-mat/"+this.props.match.params.id} className="nav-link text-dark border-bottom">Chất lượng nước mặt</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/ho-so-cap-phep/"+this.props.match.params.id} className="nav-link text-dark border-bottom">Hồ sơ cấp phép</Link>
                            </nav>
                        </div>
                        <div className="col-12 col-lg-10 px-md-1 pr-2 menu-home discharge-water">
                            <div className="col-12 px-0">
                                <div className="vh-50 col-12 px-0">
                                    <Map className="col-12" />
                                </div>
                                <div className="col-12 px-0">
                                    <div className="d-flex mx-0">
                                        <div className="py-2 px-3 text-primary border-bottom border-primary">Thông tin chung</div>
                                        <Link className="py-2 px-3 text-primary" to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-cong-trinh/chi-tiet/"+this.props.match.params.id}>Thông tin chi tiết</Link>
                                    </div>
                                    <div tab="Thông tin chung" key="1">
                                        <div className="row mx-0 col-lg-12 px-0">
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row mx-0 px-0 align-items-center">
                                                        <div className="fw-bold px-0 col-md-12 px-0">
                                                            <span >Tên công trình:</span>
                                                        </div>
                                                        <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.congtrinh_ten || ""} readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row mx-0 px-0 align-items-center">
                                                        <div className="fw-bold px-0 col-md-12 px-0">
                                                            <span >Ký hiệu công trình: </span>
                                                        </div>
                                                        <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.congtrinh_kyhieu || ""} readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                            <div className="col-lg-12"> 
                                                <div className="row mx-0 px-0 align-items-center">
                                                    <div className="fw-bold px-0 col-md-12 px-0">
                                                        <span >Địa điểm: </span>
                                                    </div>
                                                    <textarea className="form-control form-control-sm" rows="2" defaultValue={this.state.dataHydroContructionInfo.congtrinh_diadiem || ""} readOnly /> 
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="row mx-0 col-lg-12 px-0">
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row mx-0 px-0 align-items-center">
                                                        <div className="fw-bold px-0 col-md-12 px-0">
                                                            <span >Huyện: </span>
                                                        </div>
                                                        <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.mahuyen || ""} readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row mx-0 px-0 align-items-center">
                                                        <div className="fw-bold px-0 col-md-12 px-0">
                                                            <span >Xã: </span>
                                                        </div>
                                                        <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.maxa || ""} readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mx-0 col-lg-12 px-0">
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row mx-0 px-0 align-items-center">
                                                        <div className="fw-bold px-0 col-md-12 px-0">
                                                            <span >Mục đích sử dụng: </span>
                                                        </div>
                                                        <textarea className="form-control form-control-sm" rows="1" defaultValue={this.state.dataHydroContructionInfo.mucdich_ktsd || ""} readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row mx-0 px-0 align-items-center">
                                                        <div className="fw-bold px-0 col-md-12 px-0">
                                                            <span >Nguồn nước KTSD: </span>
                                                        </div>
                                                        <textarea className="form-control form-control-sm" rows="1" defaultValue={this.state.dataHydroContructionInfo.nguon_nuoc_ktsd || ""} readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mx-0 col-lg-12 px-0">
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row mx-0 px-0 align-items-center">
                                                        <div className="fw-bold px-0 col-md-12 px-0">
                                                            <span >Thuộc sông: </span>
                                                        </div>
                                                        <textarea className="form-control form-control-sm" rows="1" defaultValue={this.state.dataHydroContructionInfo.thuocsong || ""} readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row mx-0 px-0 align-items-center">
                                                        <div className="fw-bold px-0 col-md-12 px-0">
                                                            <span >Thuộc lưu vực sông: </span>
                                                        </div>
                                                        <textarea className="form-control form-control-sm" rows="1" defaultValue={this.state.dataHydroContructionInfo.thuocluuvucsong || ""} readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mx-0 col-lg-12 px-0">
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row mx-0 px-0 align-items-center">
                                                        <div className="fw-bold px-0 col-md-12 px-0">
                                                            <span >Chế độ khai thác: </span>
                                                        </div>
                                                        <textarea className="form-control form-control-sm" rows="1" defaultValue={this.state.dataHydroContructionInfo.che_do_kt || ""} readOnly  />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row mx-0 px-0 align-items-center">
                                                        <div className="fw-bold px-0 col-md-12 px-0">
                                                            <span >Lượng nước khai thác, sử dụng: </span>
                                                        </div>
                                                        <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.luuluongnuoc_ktsd || ""} readOnly  />
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                            <div className="col-lg-12"> 
                                                <div className="row mx-0 px-0 align-items-center">
                                                    <div className="fw-bold px-0 col-md-12 px-0">
                                                        <span >Phương thức khai thác: </span>
                                                    </div>
                                                    <textarea className="form-control form-control-sm" defaultValue={this.state.dataHydroContructionInfo.phuongthuc_kt || ""} rows="2" readOnly />
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                            <div className="col-lg-6"> 
                                                <div className="row mx-0 px-0 align-items-center">
                                                    <div className="fw-bold px-0 col-md-12 px-0">
                                                        <span >Năm sử dụng: </span>
                                                    </div>
                                                    <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.thoigian_batdau_vanhanh || ""} readOnly />
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                            <div className="col-lg-12"> 
                                                <div className="row mx-0 px-0 align-items-center">
                                                    <div className="fw-bold px-0 col-md-12 px-0">
                                                        <span >Ghi chú: </span>
                                                    </div>
                                                    <textarea className="form-control form-control-sm" rows="2" defaultValue={this.state.dataHydroContructionInfo.congtrinh_ghichu || ""} readOnly  />
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}