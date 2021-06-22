import React from 'react';
import Header from '../../../../layout/Header';
import Map from '../../../../layout/Map';
import { Link } from 'react-router-dom';
import { PrinterOutlined, FolderViewOutlined } from '@ant-design/icons';

export default class QuanLyCapPhepNuocMatThongTinCongTrinhChiTiet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
                <Header headTitle={this.headerTitle()} previousLink={"/quan-ly-cap-phep/nuoc-mat/"+this.props.match.params.id} showHeadImage={true} layout48={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-lg-12 px-0 row mx-0">
                        <div className="col-lg-2    ">
                            <nav className="nav flex-column nav-pills pt-3">
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/xem-thong-tin-chung/"+this.props.match.params.id} className="nav-link text-dark border-bottom ">Thông tin chung</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/xem-thong-tin-cong-trinh/"+this.props.match.params.id} className="nav-link text-dark border-bottom">Thông tin công trình</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/giam-sat-khai-thac-su-dung/"+this.props.match.params.id} className="nav-link text-dark border-bottom">Giám sát KTSD</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/chat-luong-nuoc-mat/"+this.props.match.params.id} className="nav-link text-dark border-bottom">Chất lượng nước mặt</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/ho-so-cap-phep/"+this.props.match.params.id} className="nav-link text-dark border-bottom active">Hồ sơ cấp phép</Link>
                            </nav>
                        </div>
                        <div className="col-12 col-lg-10 px-md-1 pr-2">
                            <div className="col-12 row mx-0 px-0">
                                <div className="col-lg-6 px-0 menu-home discharge-water">
                                    <div className="row mx-0 mb-3">
                                        <p className="exploit-surfacewater-title col-12 mb-0 p-2 font-weight fw-bold text-start">HỒ SƠ CẤP PHÉP CÔNG TRÌNH</p>
                                        <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 fw-bold text-13">Tên công trình:</div>
                                            <div className="col-6 px-0 text-13">Thủy Điện</div>
                                        </div>
                                        <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 fw-bold text-13">Ký hiệu công trình:</div>
                                            <div className="col-6 px-0 text-13">Thủy Điện</div>
                                        </div>
                                        <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 fw-bold text-13">Đơn xin cấp phép:</div>
                                            <div className="col-12 col-sm-6 px-0 d-flex mx-0 text-13">
                                                <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center mx-1 px-1"> <FolderViewOutlined className="mx-2" /> File Đính Kèm </button>
                                                <button type="button" className="btn btn-outline-info btn-sm d-flex align-items-center mx-1 px-1"> <PrinterOutlined className="mx-2" /> In Giấy Phép </button>
                                            </div>
                                        </div>
                                        <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 fw-bold text-13">Báo cáo đề án KTSD:</div>
                                            <div className="col-12 col-sm-6 px-0 d-flex mx-0 text-13">
                                                <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center mx-1 px-1"> <FolderViewOutlined className="mx-2" /> File Đính Kèm </button>
                                                <button type="button" className="btn btn-outline-info btn-sm d-flex align-items-center mx-1 px-1"> <PrinterOutlined className="mx-2" /> In Giấy Phép </button>
                                            </div>
                                        </div>
                                        <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 fw-bold text-13">Kết quả phân tích CLN:</div>
                                            <div className="col-12 col-sm-6 px-0 d-flex mx-0 text-13">
                                                <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center mx-1 px-1"> <FolderViewOutlined className="mx-2" /> File Đính Kèm </button>
                                                <button type="button" className="btn btn-outline-info btn-sm d-flex align-items-center mx-1 px-1"> <PrinterOutlined className="mx-2" /> In Giấy Phép </button>
                                            </div>
                                        </div>
                                        <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 fw-bold text-13">Văn bản ý kiến cộng đồng:</div>
                                            <div className="col-12 col-sm-6 px-0 d-flex mx-0 text-13">
                                                <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center mx-1 px-1"> <FolderViewOutlined className="mx-2" /> File Đính Kèm </button>
                                                <button type="button" className="btn btn-outline-info btn-sm d-flex align-items-center mx-1 px-1"> <PrinterOutlined className="mx-2" /> In Giấy Phép </button>
                                            </div>
                                        </div>
                                        <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 fw-bold text-13">Giấy tờ khác:</div>
                                            <div className="col-12 col-sm-6 px-0 d-flex mx-0 text-13">
                                                <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center mx-1 px-1"> <FolderViewOutlined className="mx-2" /> File Đính Kèm </button>
                                                <button type="button" className="btn btn-outline-info btn-sm d-flex align-items-center mx-1 px-1"> <PrinterOutlined className="mx-2" /> In Giấy Phép </button>
                                            </div>
                                        </div>
                                        <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 fw-bold text-13">Quyết định phê duyệt giấy phép lần 1:</div>
                                            <div className="col-12 col-sm-6 px-0 d-flex mx-0 text-13">
                                                <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center mx-1 px-1"> <FolderViewOutlined className="mx-2" /> File Đính Kèm </button>
                                                <button type="button" className="btn btn-outline-info btn-sm d-flex align-items-center mx-1 px-1"> <PrinterOutlined className="mx-2" /> In Giấy Phép </button>
                                            </div>
                                        </div>
                                        <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 fw-bold text-13">Quyết định phê duyệt giấy phép lần 2:</div>
                                            <div className="col-12 col-sm-6 px-0 d-flex mx-0 text-13">
                                                <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center mx-1 px-1"> <FolderViewOutlined className="mx-2" /> File Đính Kèm </button>
                                                <button type="button" className="btn btn-outline-info btn-sm d-flex align-items-center mx-1 px-1"> <PrinterOutlined className="mx-2" /> In Giấy Phép </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 px-md-1 menu-home pr-2">
                                    <Map className="h-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}