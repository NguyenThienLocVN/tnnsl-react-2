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
            return " THỦY ĐIỆN | HỒ SƠ CẤP PHÉP";
        }
        else if(this.state.pagename === "ho-chua"){
            return " HỒ CHỨA | HỒ SƠ CẤP PHÉP";
        }
        else if(this.state.pagename === "tram-bom"){
            return " TRẠM BƠM | HỒ SƠ CẤP PHÉP";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            return " HT THỦY LỢI | HỒ SƠ CẤP PHÉP";
        }
        else if(this.state.pagename === "cong"){
            return " CỐNG | HỒ SƠ CẤP PHÉP";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            return " TRẠM CẤP NƯỚC | HỒ SƠ CẤP PHÉP";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            return " NHÀ MÁY NƯỚC | HỒ SƠ CẤP PHÉP";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            return " CÔNG TRÌNH KHÁC | HỒ SƠ CẤP PHÉP";
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
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-chung"} className="nav-link text-dark border-bottom ">Thông tin chung</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-cong-trinh"} className="nav-link text-dark border-bottom">Thông tin công trình</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/giam-sat-khai-thac-su-dung"} className="nav-link text-dark border-bottom">Giám sát KTSD</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/chat-luong-nuoc-mat"} className="nav-link text-dark border-bottom">Chất lượng nước mặt</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/ho-so-cap-phep"} className="nav-link text-dark border-bottom active">Hồ sơ cấp phép</Link>
                            </nav>
                        </div>
                        <div className="col-12 col-lg-10 px-md-1 pr-2">
                            <div className="col-12 row mx-0 px-0">
                                <div className="col-lg-6 px-0 menu-home discharge-water">
                                    <div className="row mx-0 mb-3">
                                        <p className="exploit-surfacewater-title col-12 mb-0 p-2 font-weight font-weight-bold text-left">HỒ SƠ CẤP PHÉP CÔNG TRÌNH</p>
                                        <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 font-weight-bold text-13">Tên công trình:</div>
                                            <div className="col-6 px-0 text-13">Thủy Điện</div>
                                        </div>
                                        <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 font-weight-bold text-13">Ký hiệu công trình:</div>
                                            <div className="col-6 px-0 text-13">Thủy Điện</div>
                                        </div>
                                        <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 font-weight-bold text-13">Đơn xin cấp phép:</div>
                                            <div className="col-6 px-0 row mx-0 text-13">
                                                <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center mx-1 px-1"> <FolderViewOutlined className="mx-2" /> File Đính Kèm </button>
                                                <button type="button" className="btn btn-outline-info btn-sm d-flex align-items-center mx-1 px-1"> <PrinterOutlined className="mx-2" /> In Giấy Phép </button>
                                            </div>
                                        </div>
                                        <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 font-weight-bold text-13">Báo cáo đề án KTSD:</div>
                                            <div className="col-6 px-0 row mx-0 text-13">
                                                <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center mx-1 px-1"> <FolderViewOutlined className="mx-2" /> File Đính Kèm </button>
                                                <button type="button" className="btn btn-outline-info btn-sm d-flex align-items-center mx-1 px-1"> <PrinterOutlined className="mx-2" /> In Giấy Phép </button>
                                            </div>
                                        </div>
                                        <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 font-weight-bold text-13">Kết quả phân tích CLN:</div>
                                            <div className="col-6 px-0 row mx-0 text-13">
                                                <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center mx-1 px-1"> <FolderViewOutlined className="mx-2" /> File Đính Kèm </button>
                                                <button type="button" className="btn btn-outline-info btn-sm d-flex align-items-center mx-1 px-1"> <PrinterOutlined className="mx-2" /> In Giấy Phép </button>
                                            </div>
                                        </div>
                                        <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 font-weight-bold text-13">Văn bản ý kiến cộng đồng:</div>
                                            <div className="col-6 px-0 row mx-0 text-13">
                                                <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center mx-1 px-1"> <FolderViewOutlined className="mx-2" /> File Đính Kèm </button>
                                                <button type="button" className="btn btn-outline-info btn-sm d-flex align-items-center mx-1 px-1"> <PrinterOutlined className="mx-2" /> In Giấy Phép </button>
                                            </div>
                                        </div>
                                        <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 font-weight-bold text-13">Giấy tờ khác:</div>
                                            <div className="col-6 px-0 row mx-0 text-13">
                                                <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center mx-1 px-1"> <FolderViewOutlined className="mx-2" /> File Đính Kèm </button>
                                                <button type="button" className="btn btn-outline-info btn-sm d-flex align-items-center mx-1 px-1"> <PrinterOutlined className="mx-2" /> In Giấy Phép </button>
                                            </div>
                                        </div>
                                        <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 font-weight-bold text-13">Quyết định phê duyệt giấy phép lần 1:</div>
                                            <div className="col-6 px-0 row mx-0 text-13">
                                                <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center mx-1 px-1"> <FolderViewOutlined className="mx-2" /> File Đính Kèm </button>
                                                <button type="button" className="btn btn-outline-info btn-sm d-flex align-items-center mx-1 px-1"> <PrinterOutlined className="mx-2" /> In Giấy Phép </button>
                                            </div>
                                        </div>
                                        <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 font-weight-bold text-13">Quyết định phê duyệt giấy phép lần 2:</div>
                                            <div className="col-6 px-0 row mx-0 text-13">
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