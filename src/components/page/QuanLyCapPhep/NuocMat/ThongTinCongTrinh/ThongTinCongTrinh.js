import React from 'react';
import Header from '../../../../layout/Header';
import { Link } from 'react-router-dom';
import Map from '../../../../layout/Map';

export default class QuanLyCapPhepNuocMatXemThongTinCongTrinh extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mode: 'top',
          pagename: this.props.match.params.pagename,
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
        
    }
    headerTitle = () => {
        if(this.state.pagename === "thuy-dien"){
            return " THỦY ĐIỆN | THÔNG TIN CT";
        }
        else if(this.state.pagename === "ho-chua"){
            return " HỒ CHỨA | THÔNG TIN CT";
        }
        else if(this.state.pagename === "tram-bom"){
            return " TRẠM BƠM | THÔNG TIN CT";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            return " HT THỦY LỢI | THÔNG TIN CT";
        }
        else if(this.state.pagename === "cong"){
            return " CỐNG | THÔNG TIN CT";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            return " TRẠM CẤP NƯỚC | THÔNG TIN CT";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            return " NHÀ MÁY NƯỚC | THÔNG TIN CT";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            return " CÔNG TRÌNH KHÁC | THÔNG TIN CT";
        }
    }
    

    render(){
        return(
			<div className="p-0">
                <Header headTitle={this.headerTitle()} previousLink={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename} showHeadImage={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-lg-12 px-0 row mx-0">
                        <div className="col-lg-2    ">
                            <nav className="nav flex-column nav-pills pt-3">
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-chung"} className="nav-link text-dark border-bottom">Thông tin chung</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-cong-trinh"} className="nav-link text-dark border-bottom active">Thông tin công trình</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/giam-sat-khai-thac-su-dung"} className="nav-link text-dark border-bottom">Giám sát KTSD</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/chat-luong-nuoc-mat"} className="nav-link text-dark border-bottom">Chất lượng nước mặt</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/ho-so-cap-phep"} className="nav-link text-dark border-bottom">Hồ sơ cấp phép</Link>
                            </nav>
                        </div>
                        <div className="col-12 col-lg-10 px-md-1 pr-2 menu-home discharge-water">
                            <div className="col-12 px-0">
                                <div className="vh-50 col-12 px-0">
                                    <Map className="col-12" />
                                </div>
                                <div className="col-12 px-0">
                                    <div className="row mx-0">
                                        <div className="py-2 px-3 text-primary border-bottom border-primary">Thông tin chung</div>
                                        <Link className="py-2 px-3 text-primary" to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-cong-trinh/chi-tiet"}>Thông tin chi tiết</Link>
                                    </div>
                                    <div tab="Thông tin chung" key="1">
                                        <div className="row mx-0 col-lg-12 px-0">
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-4 px-0">
                                                            <span >Tên công trình:</span>
                                                        </div>
                                                        <input className="form-control form-control-sm" value=" Thủy Điện  ABC  " readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-4 px-0">
                                                            <span >Ký hiệu công trình: </span>
                                                        </div>
                                                        <input className="form-control form-control-sm" value=" CT01 " readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                            <div className="col-lg-12"> 
                                                <div className="input-group d-flex align-items-center">
                                                    <div className="font-weight-bold px-0 col-md-12 px-0">
                                                        <span >Địa điểm: </span>
                                                    </div>
                                                    <textarea className="form-control form-control-sm" rows="2" defaultValue="xã Ea Wer, xã Tân Hòa, huyện Buôn Đôn, tỉnh Đăk Lăk và xã Ea Pô huyện Cư Jút, tỉnh Đăk Nông" readOnly /> 
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="row mx-0 col-lg-12 px-0">
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-4 px-0">
                                                            <span >Huyện: </span>
                                                        </div>
                                                        <input className="form-control form-control-sm" value=" Huyện  " readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-4 px-0">
                                                            <span >Xã: </span>
                                                        </div>
                                                        <input className="form-control form-control-sm" value=" Xã " readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mx-0 col-lg-12 px-0">
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-4 px-0">
                                                            <span >Mục đích sử dụng: </span>
                                                        </div>
                                                        <textarea className="form-control form-control-sm" rows="1" defaultValue="phát điện" readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-4 px-0">
                                                            <span >Nguồn nước KTSD: </span>
                                                        </div>
                                                        <textarea className="form-control form-control-sm" rows="1" defaultValue="sông Srê Pốk" readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mx-0 col-lg-12 px-0">
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-4 px-0">
                                                            <span >Thuộc sông: </span>
                                                        </div>
                                                        <textarea className="form-control form-control-sm" rows="1" defaultValue="sông Srê Pốk" readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-4 px-0">
                                                            <span >Thuộc lưu vực sông: </span>
                                                        </div>
                                                        <textarea className="form-control form-control-sm" rows="1" defaultValue="sông Srê Pốk" readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mx-0 col-lg-12 px-0">
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-4 px-0">
                                                            <span >Chế độ khai thác: </span>
                                                        </div>
                                                        <textarea className="form-control form-control-sm" rows="1" defaultValue="Chế độ khai thác" readOnly  />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-4 px-0">
                                                            <span >Lượng nước khai thác, sử dụng: </span>
                                                        </div>
                                                        <input className="form-control form-control-sm" value="200(m3/s)" readOnly  />
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                            <div className="col-lg-12"> 
                                                <div className="input-group d-flex align-items-center">
                                                    <div className="font-weight-bold px-0 col-md-12 px-0">
                                                        <span >Phương thức khai thác: </span>
                                                    </div>
                                                    <textarea className="form-control form-control-sm" defaultValue="Bằng công trình với các thông số như trong hồ sơ thiết kế đã được cấp có thẩm quyền phê duyệt nộp kèm theo Đề án khai thác, sử dụng nước." rows="2" readOnly />
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                            <div className="col-lg-6"> 
                                                <div className="input-group d-flex align-items-center">
                                                    <div className="font-weight-bold px-0 col-md-4 px-0">
                                                        <span >Năm sử dụng: </span>
                                                    </div>
                                                    <input className="form-control form-control-sm" value="20/02/2020" readOnly />
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                            <div className="col-lg-12"> 
                                                <div className="input-group d-flex align-items-center">
                                                    <div className="font-weight-bold px-0 col-md-12 px-0">
                                                        <span >Ghi chú: </span>
                                                    </div>
                                                    <textarea className="form-control form-control-sm" rows="2" defaultValue="Nội dung ghi chú" readOnly  />
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