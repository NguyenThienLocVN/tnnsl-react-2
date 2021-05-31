import React from 'react';
import Header from '../../../../layout/Header';
import Map from '../../../../layout/Map';
import { FileImageOutlined } from '@ant-design/icons';

export default class QuanLyCapPhepNuocMatThongTinCongTrinhChiTiet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          pagename: this.props.match.params.pagename,
        };
      }
      componentDidMount(){
        if(this.state.pagename === "thuy-dien"){
            document.title = "Thông tin chi tiết | Thủy điện | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "ho-chua"){
            document.title = "Thông tin chi tiết | Hồ Chứa | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "tram-bom"){
            document.title = "Thông tin chi tiết | Trạm Bơm | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            document.title = "Thông tin chi tiết | Đập/Hệ Thống Thủy Lợi | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "cong"){
            document.title = "Thông tin chi tiết | Cống | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            document.title = "Thông tin chi tiết | Trạm Cấp  Nước | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            document.title = "Thông tin chi tiết | Nhà  Máy Nước | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            document.title = "Thông tin chi tiết | Công Trình Khác | Quản lý cấp phép nước mặt";
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
                <Header headTitle={this.headerTitle()} previousLink={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-cong-trinh"} showHeadImage={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-lg-12 px-0 row mx-0">
                        <div className="col-lg-6 px-0 menu-home discharge-water">
                            <div className="row mx-0 mb-3">
                                <p className="exploit-surfacewater-title col-12 mb-0 p-2 font-weight font-weight-bold text-left">THÔNG TIN CHUNG</p>
                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="input-group d-flex align-items-center">
                                            <div className="font-weight-bold px-0 col-md-5 px-0">
                                                <span >Tên công trình:</span>
                                            </div>
                                            <input className="form-control form-control-sm" value=" Thủy Điện  " readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="input-group d-flex align-items-center">
                                            <div className="font-weight-bold px-0 col-md-5 px-0">
                                                <span >Ký hiệu công trình:</span>
                                            </div>
                                            <input className="form-control form-control-sm" value=" Thủy Điện  " readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="input-group d-flex align-items-center">
                                            <div className="font-weight-bold px-0 col-md-12 px-0">
                                                <span >Chế độ khai thác:</span>
                                            </div>
                                            <textarea rows="1" className="form-control form-control-sm" defaultValue=" Thủy Điện  " readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="input-group d-flex align-items-center">
                                            <div className="font-weight-bold px-0 col-md-12 px-0">
                                                <span >Phương thức khai thác:</span>
                                            </div>
                                            <textarea rows="1" className="form-control form-control-sm" defaultValue=" Thủy Điện  " readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="input-group d-flex align-items-center">
                                            <div className="font-weight-bold px-0 col-md-12 px-0">
                                                <span >Địa điểm:</span>
                                            </div>
                                            <textarea rows="1" className="form-control form-control-sm" defaultValue=" Thủy Điện  " readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="input-group d-flex align-items-center">
                                            <div className="font-weight-bold px-0 col-md-5 px-0">
                                                <span >Huyện:</span>
                                            </div>
                                            <input className="form-control form-control-sm" value=" Thủy Điện  " readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="input-group d-flex align-items-center">
                                            <div className="font-weight-bold px-0 col-md-5 px-0">
                                                <span >Xã:</span>
                                            </div>
                                            <input className="form-control form-control-sm" value=" Thủy Điện  " readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="input-group d-flex align-items-center">
                                            <div className="font-weight-bold px-0 col-md-12 px-0">
                                                <span >Nguồn nước khai thác:</span>
                                            </div>
                                            <textarea rows="1" className="form-control form-control-sm" defaultValue=" Thủy Điện  " readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="input-group d-flex align-items-center">
                                            <div className="font-weight-bold px-0 col-md-12 px-0">
                                                <span >Mục đích sử dụng:</span>
                                            </div>
                                            <textarea rows="1" className="form-control form-control-sm" defaultValue=" Thủy Điện  " readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="input-group d-flex align-items-center">
                                            <div className="font-weight-bold px-0 col-md-12 px-0">
                                                <span >Thuộc sông:</span>
                                            </div>
                                            <textarea rows="1" className="form-control form-control-sm" defaultValue=" Thủy Điện  " readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="input-group d-flex align-items-center">
                                            <div className="font-weight-bold px-0 col-md-12 px-0">
                                                <span >Thuộc lưu vực sông:</span>
                                            </div>
                                            <textarea rows="1" className="form-control form-control-sm" defaultValue=" Thủy Điện  " readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="input-group d-flex align-items-center">
                                            <div className="font-weight-bold px-0 col-md-12 px-0">
                                                <span >Năm vận hành:</span>
                                            </div>
                                            <input type="date" className="form-control form-control-sm" value="2020-01-01" readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <hr />
                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="input-group d-flex align-items-center">
                                            <div className="font-weight-bold px-0 col-md-8 px-0">
                                                <span >Công suất lắp máy(MW):</span>
                                            </div>
                                            <input className="form-control form-control-sm" value=" 200  " readOnly />
                                        </div> 
                                    </div>
                                </div>
                                {(this.state.pagename === "thuy-dien" || this.state.pagename === "ho-chua") &&
                                <>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="input-group d-flex align-items-center">
                                                <div className="font-weight-bold px-0 col-md-8 px-0">
                                                    <span >Q lớn nhất qua NM(m3/s): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value=" 200 " readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="input-group d-flex align-items-center">
                                                <div className="font-weight-bold px-0 col-md-8 px-0">
                                                    <span >Q xả TT NM(m3/s):</span>
                                                </div>
                                                <input className="form-control form-control-sm" value=" 200  " readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="input-group d-flex align-items-center">
                                                <div className="font-weight-bold px-0 col-md-8 px-0">
                                                    <span >Dung tích hữu ích(triệu m3): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value=" 200 " readOnly />
                                            </div> 
                                        </div>
                                    </div> 
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="input-group d-flex align-items-center">
                                                <div className="font-weight-bold px-0 col-md-8 px-0">
                                                    <span >Dung tích toàn bộ (triệu m3):</span>
                                                </div>
                                                <input className="form-control form-control-sm" value=" 200  " readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="input-group d-flex align-items-center">
                                                <div className="font-weight-bold px-0 col-md-8 px-0">
                                                    <span >Dung tích chết (triệu m3): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value=" 200 " readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="input-group d-flex align-items-center">
                                                <div className="font-weight-bold px-0 col-md-8 px-0">
                                                    <span >Mực nước chết(m):</span>
                                                </div>
                                                <input className="form-control form-control-sm" value=" 200  " readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="input-group d-flex align-items-center">
                                                <div className="font-weight-bold px-0 col-md-8 px-0">
                                                    <span >Mực nước dâng BT: </span>
                                                </div>
                                                <input className="form-control form-control-sm" value=" 200 " readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="input-group d-flex align-items-center">
                                                <div className="font-weight-bold px-0 col-md-8 px-0">
                                                    <span >Mực nước cao nhất TL(m):</span>
                                                </div>
                                                <input className="form-control form-control-sm" value=" 200  " readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="input-group d-flex align-items-center">
                                                <div className="font-weight-bold px-0 col-md-8 px-0">
                                                    <span >Mực nước đón lũ(m): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value=" 200 " readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    </>
                                }
                                
                            </div>
                            <div className="row mx-0 mb-3">
                                <p className="exploit-surfacewater-title col-12 mb-0 p-2 font-weight font-weight-bold text-left">LƯU LƯỢNG THEO MỤC ĐÍCH KTSD</p>
                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="input-group d-flex align-items-center">
                                            <div className="font-weight-bold px-0 col-md-8 px-0">
                                                <span >Xả dòng chảy tối thiểu(m3/s): </span>
                                            </div>
                                            <input className="form-control form-control-sm" value=" 200 " readOnly />
                                        </div> 
                                    </div>
                                </div>
                                {(this.state.pagename === "tram-bom") &&
                                <>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="input-group d-flex align-items-center">
                                                <div className="font-weight-bold px-0 col-md-8 px-0">
                                                    <span >Cấp nước(m3/s): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value=" 200 " readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                </>}
                                {(this.state.pagename === "thuy-dien" || this.state.pagename === "ho-chua") &&
                                <>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="input-group d-flex align-items-center">
                                                <div className="font-weight-bold px-0 col-md-8 px-0">
                                                    <span >Cấp nước nông nghiệp(m3/s): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value=" 200 " readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="input-group d-flex align-items-center">
                                                <div className="font-weight-bold px-0 col-md-8 px-0">
                                                    <span >Phát điện(m3/s): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value=" 200 " readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="input-group d-flex align-items-center">
                                                <div className="font-weight-bold px-0 col-md-8 px-0">
                                                    <span >Cấp  nước nông nghiệp(m3/s): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value=" 200 " readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="input-group d-flex align-items-center">
                                                <div className="font-weight-bold px-0 col-md-8 px-0">
                                                    <span >Cấp nước sinh hoạt(m3/s): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value=" 200 " readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                </>}
                                
                            </div>
                            <div className="row mx-0 mb-3">
                                <p className="exploit-surfacewater-title col-12 mb-0 p-2 font-weight font-weight-bold text-left">HẠNG MỤC CÔNG TRÌNH</p>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr className="text-center">
                                            <th></th>
                                            <th>Tọa độ X</th>
                                            <th>Tọa độ Y</th>
                                            <th>Ảnh công trình</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {(this.state.pagename === "thuy-dien" || this.state.pagename === "ho-chua") &&
                                        <>
                                            <tr>
                                                <th className="py-1">Tuyến đập</th>
                                                <td className="py-1"></td>
                                                <td className="py-1"></td>
                                                <td className="text-center py-1"> <button type="button" className="font-12 mx-auto d-flex align-items-center btn btn-outline-success btn-sm"> <FileImageOutlined className="mx-1" /> XEM</button> </td>
                                            </tr>
                                            <tr>
                                                <th className="py-1">Cửa lấy nước</th>
                                                <td className="py-1"></td>
                                                <td className="py-1"></td>
                                                <td className="text-center py-1"> <button type="button" className="font-12 mx-auto d-flex align-items-center btn btn-outline-success btn-sm"> <FileImageOutlined className="mx-1" /> XEM</button> </td>
                                            </tr>
                                            <tr>
                                                <th className="py-1">Nhà máy thủy điện</th>
                                                <td className="py-1"></td>
                                                <td className="py-1"></td>
                                                <td className="text-center py-1"> <button type="button" className="font-12 mx-auto d-flex align-items-center btn btn-outline-success btn-sm"> <FileImageOutlined className="mx-1" /> XEM</button> </td>
                                            </tr>
                                            <tr>
                                                <th className="py-1">Cửa xả sau nhà máy</th>
                                                <td className="py-1"></td>
                                                <td className="py-1"></td>
                                                <td className="text-center py-1"> <button type="button" className="font-12 mx-auto d-flex align-items-center btn btn-outline-success btn-sm"> <FileImageOutlined className="mx-1" /> XEM</button> </td>
                                            </tr>
                                            <tr>
                                                <th className="py-1">Công trình xả tối thiểu</th>
                                                <td className="py-1"></td>
                                                <td className="py-1"></td>
                                                <td className="text-center py-1"> <button type="button" className="font-12 mx-auto d-flex align-items-center btn btn-outline-success btn-sm"> <FileImageOutlined className="mx-1" /> XEM</button> </td>
                                            </tr>
                                        </>
                                    }
                                    {(this.state.pagename === "tram-bom") &&
                                    <>
                                        <tr>
                                            <th className="py-1">Trạm bơm</th>
                                            <td className="py-1"></td>
                                            <td className="py-1"></td>
                                            <td className="text-center py-1"> <button type="button" className="font-12 mx-auto d-flex align-items-center btn btn-outline-success btn-sm"> <FileImageOutlined className="mx-1" /> XEM</button> </td>
                                        </tr>
                                        <tr>
                                            <th className="py-1">Họng bơm</th>
                                            <td className="py-1"></td>
                                            <td className="py-1"></td>
                                            <td className="text-center py-1"> <button type="button" className="font-12 mx-auto d-flex align-items-center btn btn-outline-success btn-sm"> <FileImageOutlined className="mx-1" /> XEM</button> </td>
                                        </tr>
                                    </>}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row justify-content-center mx-0">
                                <button type="button" className="btn btn-primary btn-sm mx-2 px-3"> Xem </button>
                                <button type="button" className="btn btn-primary btn-sm mx-2 px-3"> Sửa </button>
                                <button type="button" className="btn btn-primary btn-sm mx-2 px-3"> Xóa </button>
                                <button type="button" className="btn btn-primary btn-sm mx-2 px-3"> Lưu </button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 px-md-1 h-100 pr-2">
                            <Map className="h-100" />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}