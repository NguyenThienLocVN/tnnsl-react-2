import React from 'react';
import Header from '../../../../layout/Header';
import { Link } from 'react-router-dom';
import Map from '../../../../layout/Map';

export default class QuanLyCapPhepNuocMatChatLuongNuocMat extends React.Component {
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
            return " THỦY ĐIỆN | CHẤT LƯỢNG NM";
        }
        else if(this.state.pagename === "ho-chua"){
            return " HỒ CHỨA | CHẤT LƯỢNG NM";
        }
        else if(this.state.pagename === "tram-bom"){
            return " TRẠM BƠM | CHẤT LƯỢNG NM";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            return " HT THỦY LỢI | CHẤT LƯỢNG NM";
        }
        else if(this.state.pagename === "cong"){
            return " CỐNG | CHẤT LƯỢNG NM";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            return " TRẠM CẤP NƯỚC | CHẤT LƯỢNG NM";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            return " NHÀ MÁY NƯỚC | CHẤT LƯỢNG NM";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            return " CÔNG TRÌNH KHÁC | CHẤT LƯỢNG NM";
        }
    }

    render(){
        return(
			<div className="p-0">
                <Header headTitle={this.headerTitle()} previousLink={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename} showHeadImage={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-lg-12 px-0 row mx-0">
                        <div className="col-lg-2">
                            <nav className="nav flex-column nav-pills pt-3">
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-chung"} className="nav-link text-dark border-bottom ">Thông tin chung</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-cong-trinh"} className="nav-link text-dark border-bottom">Thông tin công trình</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/giam-sat-khai-thac-su-dung"} className="nav-link text-dark border-bottom">Giám sát KTSD</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/chat-luong-nuoc-mat"} className="nav-link text-dark border-bottom active">Chất lượng nước mặt</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/ho-so-cap-phep"} className="nav-link text-dark border-bottom">Hồ sơ cấp phép</Link>
                            </nav>
                        </div>
                        <div className="col-12 row mx-0 col-lg-10 px-md-1 pr-2 menu-home discharge-water">
                            <div className="col-12 px-0">
                                <div className="col-lg-12 vh-50 px-0 mb-3">
                                    <Map className="col-12 h-100" />
                                </div>
                                <div className="col-lg-12 px-0">
                                    <div className="row mx-0 mb-3">
                                        <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 font-weight-bold text-13">Tên công trình:</div>
                                            <input type="text" className="form-control form-control-sm col-6" value="Thuy Dien" readOnly />
                                        </div>
                                        <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 font-weight-bold text-13">Ký hiệu công trình:</div>
                                            <input type="text" className="form-control form-control-sm col-6" value="Thuy Dien" readOnly />
                                        </div>
                                        <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 font-weight-bold text-13">Ngày lấy mẫu:</div>
                                            <input type="text" className="form-control form-control-sm col-6" value="Thuy Dien" readOnly />
                                        </div>
                                        <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 font-weight-bold text-13">Địa điểm lấy mẫu:</div>
                                            <input type="text" className="form-control form-control-sm col-6" value="Thuy Dien" readOnly />
                                        </div>
                                    </div>
                                    <p className="exploit-surfacewater-title mb-0 p-2 font-weight font-weight-bold text-left">Chất lượng nước mặt theo QCVN 08-MT:2015-BTNMMT</p>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr className="text-center align-middle">
                                                <th className="p-1 align-middle" rowSpan="3">STT</th>
                                                <th className="p-1 align-middle" rowSpan="3">Thông số</th>
                                                <th className="p-1 align-middle" rowSpan="3">Giá trị quan trắc</th>
                                                <th className="p-1 align-middle" colSpan="4">Giá trị giới hạn</th>
                                            </tr>
                                            <tr className="text-center align-middle">
                                                <th className="p-1 align-middle" colSpan="2">A</th>
                                                <th className="p-1 align-middle" colSpan="2">B</th>
                                            </tr>
                                            <tr className="text-center align-middle">
                                                <th className="p-1 align-middle">A 1</th>
                                                <th className="p-1 align-middle">A 2</th>
                                                <th className="p-1 align-middle">B 1</th>
                                                <th className="p-1 align-middle">B 2</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="text-center align-middle">
                                                <td className="p-1">1</td>
                                                <td className="p-1"> pH </td>
                                                <td className="p-1"> - </td>
                                                <td className="p-1"> 6 - 8.5 </td>
                                                <td className="p-1"> 6 - 8.5 </td>
                                                <td className="p-1"> 5.5 - 9 </td>
                                                <td className="p-1"> 5.5 - 9 </td>
                                            </tr>
                                            <tr className="text-center align-middle">
                                                <td className="p-1">2</td>
                                                <td className="p-1">BOD₅(20⁰C)</td>
                                                <td className="p-1"> mg/l </td>
                                                <td className="p-1">  4 </td>
                                                <td className="p-1">  6 </td>
                                                <td className="p-1">  15 </td>
                                                <td className="p-1">  25 </td>
                                            </tr>
                                            <tr className="text-center align-middle">
                                                <td className="p-1">3</td>
                                                <td className="p-1"> COD </td>
                                                <td className="p-1"> mg/l </td>
                                                <td className="p-1"> 10 </td>
                                                <td className="p-1"> 15 </td>
                                                <td className="p-1"> 30 </td>
                                                <td className="p-1"> 50 </td>
                                            </tr>
                                            <tr className="text-center align-middle">
                                                <td className="p-1">4</td>
                                                <td className="p-1"> Oxy hòa tan(DO) </td>
                                                <td className="p-1"> mg/l </td>
                                                <td className="p-1"> ≥6 </td>
                                                <td className="p-1"> ≥5 </td>
                                                <td className="p-1"> ≥4 </td>
                                                <td className="p-1"> ≥2 </td>
                                            </tr>
                                            <tr className="text-center align-middle">
                                                <td className="p-1">5</td>
                                                <td className="p-1"> Tổng chất rawsnlow lửng (TSS) </td>
                                                <td className="p-1"> mg/l </td>
                                                <td className="p-1"> 20 </td>
                                                <td className="p-1"> 30 </td>
                                                <td className="p-1"> 50 </td>
                                                <td className="p-1"> 100 </td>
                                            </tr>
                                            <tr className="text-center align-middle">
                                                <td className="p-1">6</td>
                                                <td className="p-1"> Amoni(NH₄⋅ Tính theo N) </td>
                                                <td className="p-1"> mg/l </td>
                                                <td className="p-1"> 0.3 </td>
                                                <td className="p-1"> 0.3 </td>
                                                <td className="p-1"> 0.9 </td>
                                                <td className="p-1"> 0.9 </td>
                                            </tr>
                                            <tr className="text-center align-middle">
                                                <td className="p-1">7</td>
                                                <td className="p-1"> Clorua(CL-) </td>
                                                <td className="p-1"> mg/l </td>
                                                <td className="p-1"> 250 </td>
                                                <td className="p-1"> 350 </td>
                                                <td className="p-1"> 350 </td>
                                                <td className="p-1"> -- </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}