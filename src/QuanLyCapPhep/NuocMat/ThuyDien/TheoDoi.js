import React from 'react';
import Header from '../../../Shared/Header';
import DemGiayPhep from './DemGiayPhep';
import { Button } from 'react-bootstrap';
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import configData from "../../../config.json";
import { getToken, removeUserSession } from '../../../Shared/Auth';

export default class QuanLyCapPhepTheoDoiGiayPhepNuocMatThuyDien extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            activeModal: null,
            licensePostData:{
                chugiayphep_ten: '',
                chugiayphep_sogiaydangkykinhdoanh: '', 
                chugiayphep_diachi: '', 
                chugiayphep_phone: '', 
                chugiayphep_fax: '', 
                chugiayphep_email: '', 
                congtrinh_ten: '',
                congtrinh_diadiem: '',
                congtrinh_loaihinh_ktsd: '',
                phuongthuc_kt: '',
                congtrinh_hientrang : '',
                mucdich_ktsd: '', 
                congsuat_lapmay: '', 
                luuluonglonnhat_quathuydien: '', 
                mucnuocdang_binhthuong: '', 
                mucnuoc_chet: '', 
                mucnuoccaonhat_truoclu: '',
                mucnuoc_donlu: '',
                dungtich_huuich: '',
                dungtich_toanbo: '',
                luuluong_xadongchay_toithieu: '',
                nguonnuoc_ktsd: '',
                vitri_laynuoc: '',
                luuluongnuoc_ktsd: '',
                che_do_kt: '',
                gp_thoihangiayphep: '',
                tailieu_sodovitrikhuvuc_congtrinh_khaithac: '',
                tailieu_donxincapphep: '',
                tailieu_baocaodean_ktsd: '',
                tailieu_ketqua_ptcln: '',
                tailieu_baocaohientrangkhaithac: '',
                tailieu_vanban_yccd: '',
                tailieu_giaytokhac: '',
                status: 0,
                camket_dungsuthat: false,
                camket_chaphanhdungquydinh: false,
                camket_daguihoso: false,
            },
            hangmuc: [{
                tenhangmuc: "",
                x: "",
                y: ""
            }],
            toastError: "",
            toastSuccess: "",
            redirectSuccess: false,
        }
    }

    componentDidMount(){
        document.title = "Theo dõi công trình sau cấp phép | Nước mặt - Thủy điện";

        var constructionId = this.props.match.params.id_gp;

        trackPromise(axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/thuy-dien/thong-tin-giay-phep/"+constructionId, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => { this.setState({licensePostData: response.data.licenseData[0], hangmuc: response.data.hangmuc}); })
            .catch((error) => {
                if(error.response.status === 401)
                {
                    removeUserSession();
                    window.location.reload();
                }
                this.setState({msg: error.response})
            })
        )
    }

    render(){
        const { licensePostData } = this.state;

        return(
			<div className="p-0">
                <Header headTitle="THÔNG TIN THEO DÕI CÔNG TRÌNH SAU CẤP PHÉP KHAI THÁC SỬ DỤNG NƯỚC MẶT CÔNG TRÌNH THỦY ĐIỆN" previousLink="/quan-ly-cap-phep/nuoc-mat/thuy-dien/quan-ly-cap-moi" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <form>
                            <div>
                                <div className="1">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">1.Thông tin chủ công trình</p>
                                    <div className="row m-0">
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="chugiayphep_ten" className="form-label fw-bold font-13 m-0">1.1.Tên tổ chức/cá nhân</label>
                                                <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten" value={licensePostData.chugiayphep_ten}  />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                    <label htmlFor="chugiayphep_sogiaykangkykinhdoanh" className="form-label fw-bold font-13 m-0">1.2.Số Giấy đăng ký kinh doanh</label>
                                                    <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" value={licensePostData.chugiayphep_sogiaydangkykinhdoanh} />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-2">
                                                    <label htmlFor="chugiayphep_diachi" className="form-label fw-bold font-13 m-0">1.3.Địa chỉ</label>
                                                    <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" value={licensePostData.chugiayphep_diachi} />
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="mb-2">
                                                    <label htmlFor="chugiayphep_phone" className="form-label fw-bold font-13 m-0">1.4.Điện thoại</label>
                                                    <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_phone" name="chugiayphep_phone" value={licensePostData.chugiayphep_phone} />
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="mb-2">
                                                    <label htmlFor="chugiayphep_fax" className="form-label fw-bold font-13 m-0">1.5.Fax</label>
                                                    <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_fax" name="chugiayphep_fax" value={licensePostData.chugiayphep_fax} />
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="mb-2">
                                                    <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.6.Email</label>
                                                    <input type="email" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" value={licensePostData.chugiayphep_email} />
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div className="2">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.Thông tin công trình </p>
                                    <div className="row m-0">
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="congtrinh_ten" className="form-label fw-bold font-13 m-0">2.1.Tên công trình khai thác</label>
                                                <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" value={licensePostData.congtrinh_ten} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">2.2.Mục đích khai thác, sử dụng nước</label>
                                                <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" value={licensePostData.mucdich_ktsd} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="congtrinh_diadiem" className="form-label fw-bold font-13 m-0">2.3.Vị trí công trình khai thác nước mặt</label>
                                                <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" value={licensePostData.congtrinh_diadiem} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="tangchuanuoc" className="form-label fw-bold font-13 m-0">2.4.Tầng chứa nước khai thác</label>
                                                <input type="text" required className="form-control form-control-sm" id="tangchuanuoc" name="tangchuanuoc"  />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="sogieng_quantrac" className="form-label fw-bold font-13 m-0">2.5.Số giếng khai thác</label>
                                                <input type="text" required className="form-control form-control-sm" id="sogieng_quantrac" name="sogieng_quantrac"  />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="tongluuluong_ktsd_max" className="form-label fw-bold font-13 m-0">2.6.Tổng lượng nước khai thác (m3/ngày đêm)</label>
                                                <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="luuluongnuoc_ktsd" name="luuluongnuoc_ktsd" value={licensePostData.luuluongnuoc_ktsd} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="gp_thoigiancapphep" className="form-label fw-bold font-13 m-0">2.7.Thời hạn giấy phép</label>
                                                <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="gp_thoihangiayphep" name="gp_thoihangiayphep" value={licensePostData.gp_thoihangiayphep} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="tiencapquyen_khaithac" className="form-label fw-bold font-13 m-0">2.8.Tiền cấp quyền khai thác</label>
                                                <input type="email" required className="form-control form-control-sm" id="tiencapquyen_khaithac" name="tiencapquyen_khaithac"  />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="3">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">3.Thanh tra/kiểm tra</p>
                                    <div className="row m-0">
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="thanhtra_tendot" className="form-label fw-bold font-13 m-0">3.1.Tên đợt thanh tra</label>
                                                <input type="text" required className="form-control form-control-sm" id="thanhtra_tendot" name="thanhtra_tendot"  />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="thanhtra_tentruongdoan" className="form-label fw-bold font-13 m-0">3.2.Tên trưởng đoàn</label>
                                                <input type="text" required className="form-control form-control-sm" id="thanhtra_tentruongdoan" name="thanhtra_tentruongdoan"  />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="thanhtra_thoigianthuchien" className="form-label fw-bold font-13 m-0">3.3.Thời gian thực hiện thanh tra</label>
                                                <input type="text" required className="form-control form-control-sm" id="thanhtra_thoigianthuchien" name="thanhtra_thoigianthuchien"  />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="thanhtra_thanhphandoan" className="form-label fw-bold font-13 m-0">3.4.Thành phần đoàn thanh tra</label>
                                                <input type="text" required className="form-control form-control-sm" id="thanhtra_thanhphandoan" name="thanhtra_thanhphandoan"  />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="mb-2">
                                                <label htmlFor="thanhtra_ketluan" className="form-label fw-bold font-13 m-0">3.5.Kết luận thanh tra</label>
                                                <textarea rows="5" className="form-control form-control-sm" id="thanhtra_ketluan" name="thanhtra_ketluan" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-0">
                                    <div className="4 col-sm-6">
                                        <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Theo dõi sau cấp phép</p>
                                        <div className="row m-0">
                                            <div className="col-sm-6">
                                                <div className="mb-2">
                                                    <label htmlFor="theodoisaucp_vanbanso" className="form-label fw-bold font-13 m-0">4.1.Văn bản số</label>
                                                    <input type="text" required className="form-control form-control-sm" id="theodoisaucp_vanbanso" name="theodoisaucp_vanbanso"  />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-2">
                                                    <label htmlFor="thepdoisaucp_noidung" className="form-label fw-bold font-13 m-0">4.2.Nội dung</label>
                                                    <input type="text" required className="form-control form-control-sm" id="thepdoisaucp_noidung" name="thepdoisaucp_noidung"  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="5 col-sm-6">
                                        <p className="fw-bold w-100 text-violet p-2 m-0 font-15">5.Theo dõi quá trình kết nối/ giám sát</p>
                                        <div className="row m-0">
                                            <div className="col-sm-4">
                                                <div className="mb-2">
                                                    <label htmlFor="theodoiquatrinh_ketnoi_giamsat_tudong" className="form-label fw-bold font-13 m-0">5.1.Tự động</label>
                                                    <input type="text" required className="form-control form-control-sm" id="theodoiquatrinh_ketnoi_giamsat_tudong" name="theodoiquatrinh_ketnoi_giamsat_tudong"  />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="mb-2">
                                                    <label htmlFor="theodoiquatrinh_ketnoi_giamsat_tructuyen" className="form-label fw-bold font-13 m-0">5.2.Trực tuyến</label>
                                                    <input type="text" required className="form-control form-control-sm" id="theodoiquatrinh_ketnoi_giamsat_tructuyen" name="theodoiquatrinh_ketnoi_giamsat_tructuyen"  />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="mb-2">
                                                    <label htmlFor="theodoiquatrinh_ketnoi_giamsat_dinhky" className="form-label fw-bold font-13 m-0">5.3.Định kỳ</label>
                                                    <input type="text" required className="form-control form-control-sm" id="theodoiquatrinh_ketnoi_giamsat_dinhky" name="theodoiquatrinh_ketnoi_giamsat_dinhky"  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row m-0 justify-content-between mb-5 px-4">
                                    <Button variant="primary" className="col-sm-2">Sửa</Button>
                                    <Button variant="primary" className="col-sm-2">Xóa</Button>
                                    <Button variant="primary" className="col-sm-2">Ghi</Button>
                                    <Button variant="primary" className="col-sm-2">In</Button>
                                    <Button variant="primary" className="col-sm-2">Xuất PDF</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}