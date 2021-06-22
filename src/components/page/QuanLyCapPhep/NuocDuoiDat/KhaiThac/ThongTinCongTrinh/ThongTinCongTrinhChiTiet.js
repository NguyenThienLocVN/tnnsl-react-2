import React from 'react';
import Header from '../../../../../layout/Header';
import Map from '../../../../../layout/Map';
import { FileImageOutlined } from '@ant-design/icons';
import axios from "axios";
import { trackPromise } from 'react-promise-tracker';
import configData from "../../../../../../config.json";

export default class QuanLyCapPhepNuocMatThongTinCongTrinhChiTiet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          pagename: this.props.match.params.pagename,
          dataHydroContructionInfo: [],
          dataCategoriesContruction: [],
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

        trackPromise(
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/giay-phep-thuy-dien/"+this.props.match.params.id)
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        dataHydroContructionInfo: response.data,
                        dataCategoriesContruction: response.data.hang_muc_ct,
                        dataWaterFlowAccordingToThePurposeOfUse: response.data.luu_luong_theo_muc_dich_sd
                    });
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

    // hang muc cong trinh
    getCategoriesContruction = () => {
        return (
            this.state.dataCategoriesContruction.map((e, i) => (
                <tr key={i}>
                    <th className="py-1">{e.tenhangmuc}</th>
                    <td className="py-1 text-center">{e.x}</td>
                    <td className="py-1 text-center">{e.y}</td>
                    <td className="text-center py-1"> <button type="button" className="font-12 mx-auto d-flex align-items-center btn btn-outline-success btn-sm"> <FileImageOutlined className="mx-1" /> XEM</button> </td>
                </tr>
            ))
        )
    }

    render(){
        return(
			<div className="p-0">
                <Header headTitle={this.headerTitle()} previousLink={"/quan-ly-cap-phep/nuoc-mat/xem-thong-tin-cong-trinh/"+this.props.match.params.id} showHeadImage={true} layout48={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-lg-12 px-0 row mx-0">
                        <div className="col-lg-6 px-0 menu-home discharge-water">
                            <div className="row mx-0 mb-3">
                                <p className="exploit-surfacewater-title col-12 mb-0 p-2 font-weight fw-bold text-start">THÔNG TIN CHUNG</p>
                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="row mx-0 px-0 align-items-center">
                                            <div className="fw-bold px-0 col-md-5 px-0">
                                                <span >Tên công trình:</span>
                                            </div>
                                            <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.congtrinh_ten || ""} readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="row mx-0 px-0 align-items-center">
                                            <div className="fw-bold px-0 col-md-5 px-0">
                                                <span >Ký hiệu công trình:</span>
                                            </div>
                                            <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.congtrinh_kyhieu || ""} readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="row mx-0 px-0 align-items-center">
                                            <div className="fw-bold px-0 col-md-12 px-0">
                                                <span >Chế độ khai thác:</span>
                                            </div>
                                            <textarea rows="1" className="form-control form-control-sm" defaultValue={this.state.dataHydroContructionInfo.che_do_kt || ""} readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="row mx-0 px-0 align-items-center">
                                            <div className="fw-bold px-0 col-md-12 px-0">
                                                <span >Phương thức khai thác:</span>
                                            </div>
                                            <textarea rows="3" className="form-control form-control-sm" defaultValue={this.state.dataHydroContructionInfo.phuongthuc_kt || ""} readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="row mx-0 px-0 align-items-center">
                                            <div className="fw-bold px-0 col-md-12 px-0">
                                                <span >Địa điểm:</span>
                                            </div>
                                            <textarea rows="1" className="form-control form-control-sm" defaultValue={this.state.dataHydroContructionInfo.congtrinh_diadiem || ""} readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="row mx-0 px-0 align-items-center">
                                            <div className="fw-bold px-0 col-md-5 px-0">
                                                <span >Huyện:</span>
                                            </div>
                                            <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.mahuyen || ""} readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="row mx-0 px-0 align-items-center">
                                            <div className="fw-bold px-0 col-md-5 px-0">
                                                <span >Xã:</span>
                                            </div>
                                            <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.maxa || ""} readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="row mx-0 px-0 align-items-center">
                                            <div className="fw-bold px-0 col-md-12 px-0">
                                                <span >Nguồn nước khai thác:</span>
                                            </div>
                                            <textarea rows="1" className="form-control form-control-sm" defaultValue={this.state.dataHydroContructionInfo.nguonnuoc_ktsd	 || ""} readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="row mx-0 px-0 align-items-center">
                                            <div className="fw-bold px-0 col-md-12 px-0">
                                                <span >Mục đích sử dụng:</span>
                                            </div>
                                            <textarea rows="1" className="form-control form-control-sm" defaultValue={this.state.dataHydroContructionInfo.mucdich_ktsd || ""} readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="row mx-0 px-0 align-items-center">
                                            <div className="fw-bold px-0 col-md-12 px-0">
                                                <span >Thuộc sông:</span>
                                            </div>
                                            <textarea rows="1" className="form-control form-control-sm" defaultValue={this.state.dataHydroContructionInfo.thuocsong || ""} readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="row mx-0 px-0 align-items-center">
                                            <div className="fw-bold px-0 col-md-12 px-0">
                                                <span >Thuộc lưu vực sông:</span>
                                            </div>
                                            <textarea rows="1" className="form-control form-control-sm" defaultValue={this.state.dataHydroContructionInfo.thuocluuvucsong || ""} readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="row mx-0 px-0 align-items-center">
                                            <div className="fw-bold px-0 col-md-12 px-0">
                                                <span >Năm vận hành:</span>
                                            </div>
                                            <input type="text" className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.thoigian_batdau_vanhanh || ""} readOnly />
                                        </div> 
                                    </div>
                                </div>
                                <div className="border-bottom col-12"></div>
                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="row mx-0 px-0 align-items-center">
                                            <div className="fw-bold px-0 col-md-8 px-0">
                                                <span >Công suất lắp máy(MW):</span>
                                            </div>
                                            <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.congsuat_lapmay || ""} readOnly />
                                        </div> 
                                    </div>
                                </div>
                                {(this.state.pagename === "thuy-dien" || this.state.pagename === "ho-chua") &&
                                <>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="row mx-0 px-0 align-items-center">
                                                <div className="fw-bold px-0 col-md-8 px-0">
                                                    <span >Q lớn nhất qua NM(m3/s): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.luuluonglonnhat_quathuydien || ""} readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="row mx-0 px-0 align-items-center">
                                                <div className="fw-bold px-0 col-md-8 px-0">
                                                    <span >Q xả TT NM(m3/s):</span>
                                                </div>
                                                <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.luuluong_xadongchay_toithieu || ""} readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="row mx-0 px-0 align-items-center">
                                                <div className="fw-bold px-0 col-md-8 px-0">
                                                    <span >Dung tích hữu ích(triệu m3): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.dungtich_huuich || ""} readOnly />
                                            </div> 
                                        </div>
                                    </div> 
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="row mx-0 px-0 align-items-center">
                                                <div className="fw-bold px-0 col-md-8 px-0">
                                                    <span >Dung tích toàn bộ (triệu m3):</span>
                                                </div>
                                                <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.dungtich_toanbo || ""} readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="row mx-0 px-0 align-items-center">
                                                <div className="fw-bold px-0 col-md-8 px-0">
                                                    <span >Dung tích chết (triệu m3): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.mucnuoc_chet || ""} readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="row mx-0 px-0 align-items-center">
                                                <div className="fw-bold px-0 col-md-8 px-0">
                                                    <span >Mực nước chết(m):</span>
                                                </div>
                                                <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.mucnuoc_chet || ""} readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="row mx-0 px-0 align-items-center">
                                                <div className="fw-bold px-0 col-md-8 px-0">
                                                    <span >Mực nước dâng BT: </span>
                                                </div>
                                                <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.mucnuocdang_binhthuong || ""} readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="row mx-0 px-0 align-items-center">
                                                <div className="fw-bold px-0 col-md-8 px-0">
                                                    <span >Mực nước cao nhất TL(m):</span>
                                                </div>
                                                <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.mucnuoccaonhat_truoclu || ""} readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="row mx-0 px-0 align-items-center">
                                                <div className="fw-bold px-0 col-md-8 px-0">
                                                    <span >Mực nước đón lũ(m): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value={this.state.dataHydroContructionInfo.mucnuoc_donlu || ""} readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    </>
                                }
                                
                            </div>
                            <div className="row mx-0 mb-3">
                                <p className="exploit-surfacewater-title col-12 mb-0 p-2 font-weight fw-bold text-start">LƯU LƯỢNG THEO MỤC ĐÍCH KTSD</p>
                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                    <div className="col-lg-12"> 
                                        <div className="row mx-0 px-0 align-items-center">
                                            <div className="fw-bold px-0 col-md-8 px-0">
                                                <span >Xả dòng chảy tối thiểu(m3/s): </span>
                                            </div>
                                            <input className="form-control form-control-sm" value="" readOnly />
                                        </div> 
                                    </div>
                                </div>
                                {(this.state.pagename === "tram-bom") &&
                                <>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="row mx-0 px-0 align-items-center">
                                                <div className="fw-bold px-0 col-md-8 px-0">
                                                    <span >Cấp nước(m3/s): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value="" readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                </>}
                                {(this.state.pagename === "thuy-dien" || this.state.pagename === "ho-chua") &&
                                <>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="row mx-0 px-0 align-items-center">
                                                <div className="fw-bold px-0 col-md-8 px-0">
                                                    <span >Cấp nước nông nghiệp(m3/s): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value="" readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="row mx-0 px-0 align-items-center">
                                                <div className="fw-bold px-0 col-md-8 px-0">
                                                    <span >Phát điện(m3/s): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value="" readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="row mx-0 px-0 align-items-center">
                                                <div className="fw-bold px-0 col-md-8 px-0">
                                                    <span >Cấp  nước công nghiệp(m3/s): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value="" readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                        <div className="col-lg-12"> 
                                            <div className="row mx-0 px-0 align-items-center">
                                                <div className="fw-bold px-0 col-md-8 px-0">
                                                    <span >Cấp nước sinh hoạt(m3/s): </span>
                                                </div>
                                                <input className="form-control form-control-sm" value="" readOnly />
                                            </div> 
                                        </div>
                                    </div>
                                </>}
                                
                            </div>
                            <div className="row mx-0 mb-2">
                                <p className="exploit-surfacewater-title col-12 mb-0 p-2 font-weight fw-bold text-start">HẠNG MỤC CÔNG TRÌNH</p>
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
                                        {this.getCategoriesContruction()}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row justify-content-center my-2 mx-0 col-12">
                                <button type="button" className="btn btn-primary btn-sm mx-2 px-3 col-2"> Xem </button>
                                <button type="button" className="btn btn-primary btn-sm mx-2 px-3 col-2"> Sửa </button>
                                <button type="button" className="btn btn-primary btn-sm mx-2 px-3 col-2"> Xóa </button>
                                <button type="button" className="btn btn-primary btn-sm mx-2 px-3 col-2"> Lưu </button>
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