import React from 'react';
import Header from '../../../Shared/Header';
import { trackPromise } from 'react-promise-tracker';
import configData from "../../../config.json";
import { QuestionCircleOutlined, CheckCircleOutlined, FilePdfOutlined, RollbackOutlined, PrinterOutlined } from '@ant-design/icons';
import { Popover, Modal } from 'antd';
import DemGiayPhep from './DemGiayPhep';
import { getToken, removeUserSession } from '../../../Shared/Auth';
import axios from "axios";

// Alert library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default class QuanLyCapPhepXemGiayPhepNuocMatThuyDien extends React.Component {
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

            modalSoDoViTri: false,
            modalDonXin: false,
            modalBaoCaoKTSD: false,
            modalPhanTichCLN: false,
            modalBaoCaoHTKT: false,
            modalVanBanYKCD: false,
            modalGiayToLienQuan: false
        }
    }

    // Get well item on change event (Lay du lieu gieng khi thay doi gia tri)
    handleChangeHangmuc = (i, e) => {
        let hangmuc = [...this.state.hangmuc]
        hangmuc[i][e.target.name] = e.target.value;
        this.setState({ hangmuc });
    };

    // Add well item (them hang muc gieng)
    handleAddHangmuc = (e) => {
        this.setState({
            hangmuc: [...this.state.hangmuc, {
                tenhangmuc: "",
                x: "",
                y: ""
            }],
        })
    };

    // Remove well item (xoa hang muc gieng)
    handleRemoveSpecificRow = (idx) => () => {
        const hangmuc = [...this.state.hangmuc]
        if(hangmuc.length > 1){
            hangmuc.splice(idx, 1)
            this.setState({ hangmuc })
        }
    }

    componentDidMount(){
        document.title = "Chỉnh sửa giấy phép khai thác nước mặt - Thủy điện";

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

    // Get value for license creation on change (Lay gia tri input de tao moi giay phep)
    handleInputChange = event => {
        const { licensePostData } = this.state;
        var value = "";
        if(event.target.type === 'checkbox'){
            value = event.target.checked
        }else if(event.target.type === 'file'){
            value = event.target.files[0].name
        }
        else{
            value = event.target.value;
        }
        const name = event.target.name;
        licensePostData[name] = value;
        this.setState({
            licensePostData
        });
    }

    // Get text of status
    statusText = (status) => {
        if(status === 0){
            return "Đã gửi hồ sơ";
        }else if(status === 1){
            return "Đã được cấp phép";
        }else if(status === 2){
            return "Đang lấy ý kiến thẩm định";
        }
        else{
            return "Hoàn thành hồ sơ cấp phép";
        }
    }

    // Hide modal
    hideModal = () => {
        this.setState({ modalLicense: false })
        this.setState({ modalDonXin: false })
        this.setState({ modalBaoCaoKTSD: false })
        this.setState({ modalBaoCaoHTKT: false })
        this.setState({ modalPhanTichCLN: false })
        this.setState({ modalVanBanYKCD: false })
        this.setState({ modalGiayToLienQuan: false })
        this.setState({ modalSoDoViTri: false })
    }

    notifyError = () => {
        toast.error(this.state.toastError, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    notifySuccess = () => {
        toast.success(this.state.toastSuccess, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    formatDate = (date) => {
        if(date === null){
            return "--";
        }else if(date === "0000-00-00"){
            return "--";
        }else{
            var date_format = new Date(date);
            var d = date_format.getDate();
            var m = date_format.getMonth()+1;
            var y = date_format.getFullYear();
            return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
        }
    }

    render(){
        const { licensePostData } = this.state;

        const statusBox = (
            <div>
              <p className={licensePostData.status === 0 ? "bg-success text-white m-0 p-1 d-flex align-items-center justify-content-between": "m-0 p-1 d-flex align-items-center"}>1. Đã gửi hồ sơ {licensePostData.status === 0 && <CheckCircleOutlined />}</p>
              <p className={licensePostData.status === 2 ? "bg-success text-white m-0 p-1 d-flex align-items-center justify-content-between": "m-0 p-1 d-flex align-items-center"}>2. Đang lấy ý kiến thẩm định {licensePostData.status === 2 && <CheckCircleOutlined />}</p>
              <p className={licensePostData.status === 3 ? "bg-success text-white m-0 p-1 d-flex align-items-center justify-content-between": "m-0 p-1 d-flex align-items-center"}>3. Hoàn thành hồ sơ cấp phép {licensePostData.status === 3 && <CheckCircleOutlined />}</p>
              <p className={licensePostData.status === 1 ? "bg-success text-white m-0 p-1 d-flex align-items-center justify-content-between": "m-0 p-1 d-flex align-items-center"}>4. Đã được cấp phép {licensePostData.status === 1 && <CheckCircleOutlined />}</p>
            </div>
        );
        
        return(
			<div className="p-0">
                <Header headTitle="GIẤY PHÉP KHAI THÁC SỬ DỤNG NƯỚC MẶT CHO CÔNG TRÌNH THỦY ĐIỆN" previousLink="/quan-ly-cap-phep/nuoc-mat/thuy-dien" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <h6 className="px-2 pt-2 d-flex align-items-center d-flex"><span className="col-1">Công trình:</span> <span className="fw-bold">{licensePostData.congtrinh_ten} - <span className={licensePostData.status === 1 ? "text-success" : "text-primary"}>&nbsp; {this.statusText(licensePostData.status)}</span></span>&nbsp; <Popover placement="bottomLeft" content={statusBox} title="Trạng thái giấy phép" ><QuestionCircleOutlined /></Popover></h6>
                        {licensePostData.status === 1 &&
                            <>
                            <p className="px-2 m-0 d-flex font-14"><span className="col-1">Số giấy phép: </span><span className="fw-bold"><u>{licensePostData.gp_sogiayphep}</u></span>&nbsp; &nbsp; <span title="Xem tài liệu" onClick={() => this.setState({modalLicense: !this.state.modalLicense})} className="col-1 text-primary font-13 d-flex align-items-center"><FilePdfOutlined /></span></p>
                                <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title={licensePostData.gp_sogiayphep} width={1000} footer={null} id={licensePostData.gp_sogiayphep} visible={this.state.modalLicense} onCancel={this.hideModal}>
                                <div>
                                    {licensePostData.tai_lieu && licensePostData.tai_lieu[0] !== undefined ?
                                    <iframe width="100%" title="file giấy phép" src={"http://tainguyennuocsonla.s3-ap-southeast-1.amazonaws.com/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_giayphep}></iframe>
                                    : "Không có tài liệu"
                                    }
                                </div>
                                </Modal>
                            
                            <p className="px-2 m-0 d-flex font-14"><span className="col-1">Ngày cấp: </span><span className="fw-bold">{this.formatDate(licensePostData.gp_ngaycap)}</span></p>
                            <p className="px-2 m-0 d-flex font-14"><span className="col-1">Thời hạn GP: </span><span className="fw-bold">{licensePostData.gp_thoigiancapphep}</span></p>
                            </>
                        }
                        <div className="px-2"><hr /></div>
                        <form action="" noValidate>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">1.Tổ chức/Cá nhân đề nghị CP</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_ten" className="form-label fw-bold font-13 m-0">1.1.Tên tổ chức/cá nhân </label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten" value={licensePostData.chugiayphep_ten}  />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_sogiaydangkykinhdoanh" className="form-label fw-bold font-13 m-0">1.2.Số Giấy đăng ký kinh doanh </label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" value={licensePostData.chugiayphep_sogiaydangkykinhdoanh} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_diachi" className="form-label fw-bold font-13 m-0">1.3.Địa chỉ  </label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" value={licensePostData.chugiayphep_diachi} />
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0 row m-0">
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_phone" className="form-label fw-bold font-13 m-0">1.4.Điện thoại   </label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_phone" name="chugiayphep_phone" value={licensePostData.chugiayphep_phone} />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_fax" className="form-label fw-bold font-13 m-0">1.5.Fax   </label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_fax" name="chugiayphep_fax" value={licensePostData.chugiayphep_fax} />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.6.Email   </label>
                                        <input type="email" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" value={licensePostData.chugiayphep_email} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.Thông tin về công trình khai thác, sử dụng nước</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_ten" className="form-label fw-bold font-13 m-0">2.1.Tên công trình khai thác </label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" value={licensePostData.congtrinh_ten} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="phuongthuc_kt" className="form-label fw-bold font-13 m-0">2.2.Loại hình công trình, phương thức khai thác nước</label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="phuongthuc_kt" name="phuongthuc_kt" value={licensePostData.phuongthuc_kt} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_diadiem" className="form-label fw-bold font-13 m-0">2.3.Vị trí công trình</label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" value={licensePostData.congtrinh_diadiem} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_hientrang" className="form-label fw-bold font-13 m-0">2.4.Hiện trạng công trình</label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_hientrang" name="congtrinh_hientrang" value={licensePostData.congtrinh_hientrang} />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="mb-2">
                                        <p className="form-label fw-bold font-13 m-0">2.5.Vị trí các hạng mục chính của công trình khai thác sử dụng nước</p>
                                        <div className="col-sm-12 p-0 table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center align-middle" rowSpan="2">TT</th>
                                                        <th className="text-center align-middle" rowSpan="2">Hạng mục</th>
                                                        <th className="text-center align-middle" colSpan="2">Tọa độ</th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-center align-middle">X</th>
                                                        <th className="text-center align-middle">Y</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.hangmuc && this.state.hangmuc.map((item, i) => (
                                                    <tr key={i}>
                                                        <th className="text-center align-middle">{i+1}</th>
                                                        <td> 
                                                            <input type="text" readOnly value={this.state.hangmuc[i].tenhangmuc} name="tenhangmuc" onChange={(e) => this.handleChangeHangmuc(i, e)} className="form-control form-control-sm" />  
                                                        </td>
                                                        <td> 
                                                            <input type="text" readOnly value={this.state.hangmuc[i].x} name="x" onChange={(e) => this.handleChangeHangmuc(i, e)} className="form-control form-control-sm text-center" />  
                                                        </td>
                                                        <td> 
                                                            <input type="text" readOnly value={this.state.hangmuc[i].y} name="y" onChange={(e) => this.handleChangeHangmuc(i, e)} className="form-control form-control-sm text-center" />  
                                                        </td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="mb-2">
                                        <p className="form-label fw-bold font-13 m-0">2.6.Các thông số của công trình </p>
                                        <div className="col-sm-12 p-0 table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center align-middle font-13">Công suất lắp máy (MW)</th>
                                                        <th className="text-center align-middle font-13">Lưu lượng lớn nhất qua nhà máy thủy điện (m3/s)</th>
                                                        <th className="text-center align-middle font-13">Mực nước dâng bình thường (m)</th>
                                                        <th className="text-center align-middle font-13">Mực nước chết (m)</th>
                                                        <th className="text-center align-middle font-13">Mực nước cao nhất trước lũ (m)</th>
                                                        <th className="text-center align-middle font-13">Mực nước đón lũ (m)</th>
                                                        <th className="text-center align-middle font-13">Dung tích hữu ích (triệu m3)</th>
                                                        <th className="text-center align-middle font-13">Dung tích toàn bộ (triệu m3)</th>
                                                        <th className="text-center align-middle font-13">Lưu lượng xả dòng chảy tối thiểu (m3/s)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} name="congsuat_lapmay" id="congsuat_lapmay" className="form-control form-control-sm text-center" value={licensePostData.congsuat_lapmay} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} name="luuluonglonnhat_quathuydien" id="luuluonglonnhat_quathuydien" className="form-control form-control-sm text-center" value={licensePostData.luuluonglonnhat_quathuydien} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} name="mucnuocdang_binhthuong" id="mucnuocdang_binhthuong" className="form-control form-control-sm text-center" value={licensePostData.mucnuocdang_binhthuong} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} name="mucnuoc_chet" id="mucnuoc_chet" className="form-control form-control-sm text-center" value={licensePostData.mucnuoc_chet} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} name="mucnuoccaonhat_truoclu" id="mucnuoccaonhat_truoclu" className="form-control form-control-sm text-center" value={licensePostData.mucnuoccaonhat_truoclu} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} name="mucnuoc_donlu" id="mucnuoc_donlu" className="form-control form-control-sm text-center" value={licensePostData.mucnuoc_donlu} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} name="dungtich_huuich" id="dungtich_huuich" className="form-control form-control-sm text-center" value={licensePostData.dungtich_huuich} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} name="dungtich_toanbo" id="dungtich_toanbo" className="form-control form-control-sm text-center" value={licensePostData.dungtich_toanbo} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} name="luuluong_xadongchay_toithieu" id="luuluong_xadongchay_toithieu" className="form-control form-control-sm text-center" value={licensePostData.luuluong_xadongchay_toithieu} /> 
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">3.Nội dung đề nghị cấp phép</p>
                                    <div className="col-sm-6">
                                        <div className="mb-2">
                                            <label htmlFor="nguonnuoc_ktsd" className="form-label fw-bold font-13 m-0">3.1.Nguồn nước khai thác, sử dụng</label>
                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)}  required className="form-control form-control-sm" id="nguonnuoc_ktsd" name="nguonnuoc_ktsd" value={licensePostData.nguonnuoc_ktsd} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2">
                                            <label htmlFor="vitri_laynuoc" className="form-label fw-bold font-13 m-0">3.2.Vị trí lấy nước</label>
                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="vitri_laynuoc" name="vitri_laynuoc" value={licensePostData.vitri_laynuoc} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.3.Mục đích khai thác, sử dụng nước</label>
                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" value={licensePostData.mucdich_ktsd} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 p-0">
                                        <div className="mb-2 row mx-0">
                                            <div className="col-sm-12">
                                                <div className="mb-2 m-0">
                                                    <label htmlFor="luuluongnuoc_ktsd" className="form-label w-50 fw-bold font-13 m-0">3.4.Lượng nước khai thác, sử dụng</label>
                                                    <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm w-50" id="luuluongnuoc_ktsd" name="luuluongnuoc_ktsd" value={licensePostData.luuluongnuoc_ktsd} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="mb-2">
                                            <label htmlFor="che_do_kt" className="form-label fw-bold font-13 m-0">3.5.Chế độ khai thác, sử dụng</label>
                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="che_do_kt" name="che_do_kt" value={licensePostData.che_do_kt} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="mb-2">
                                            <label htmlFor="gp_thoihangiayphep" className="form-label fw-bold font-13 m-0">3.6.Thời gian đề nghị cấp phép</label>
                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="gp_thoigiancapphep" name="gp_thoigiancapphep" value={licensePostData.gp_thoigiancapphep} />
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_sodovitrikhuvuc_congtrinh_khaithac" className="form-label fw-bold d-block w-75 m-0 font-13">3.7.Sơ đồ khu vực và vị trí công trình khai thác nước kèm theo</label>
                                            <div className="w-25"><button type="button" onClick={() => this.setState({modalSoDoViTri: !this.state.modalSoDoViTri})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center justify-content-center"><FilePdfOutlined /> &nbsp; XEM FILE </button></div>
                                        </div>

                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title="Đơn xin cấp phép" width={1000} footer={null} id={licensePostData.id} visible={this.state.modalSoDoViTri} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0].tailieu_sodovitrikhuvuc_congtrinh_khaithac !== null ?
                                                <iframe width="100%" title="file giấy phép" src={configData.BASE_API_URL+"/uploads/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_sodovitrikhuvuc_congtrinh_khaithac}></iframe>
                                                : <p className="text-white">Không có tài liệu</p>
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-sm-12 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Giấy tờ, tài liệu kèm theo</p>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_donxincapphep" className="form-label d-block w-75 m-0 font-13">- Đơn xin cấp phép</label>
                                            <div className="w-25"><button type="button" onClick={() => this.setState({modalDonXin: !this.state.modalDonXin})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center justify-content-center"><FilePdfOutlined /> &nbsp; XEM FILE </button></div>
                                        </div>

                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title="Đơn xin cấp phép" width={1000} footer={null} id={licensePostData.id} visible={this.state.modalDonXin} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0].tailieu_donxincapphep !== null ?
                                                <iframe width="100%" title="file giấy phép" src={configData.BASE_API_URL+"/uploads/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_donxincapphep}></iframe>
                                                : <p className="text-white">Không có tài liệu</p>
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaodean_ktsd" className="form-label d-block w-75 m-0 font-13">- Đề án/ báo cáo khai thác, sử dụng nước </label>
                                            <div className="w-25"><button type="button" onClick={() => this.setState({modalBaoCaoKTSD: !this.state.modalBaoCaoKTSD})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center justify-content-center"><FilePdfOutlined /> &nbsp; XEM FILE </button></div>
                                        </div>

                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title="Đề án/ báo cáo khai thác, sử dụng nước" width={1000} footer={null} id={licensePostData.id} visible={this.state.modalBaoCaoKTSD} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0].tailieu_baocaodean_ktsd !== null ?
                                                <iframe width="100%" title="file giấy phép" src={configData.BASE_API_URL+"/uploads/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_baocaodean_ktsd}></iframe>
                                                : <p className="text-white">Không có tài liệu</p>
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_ketqua_ptcln" className="form-label d-block w-75 m-0 font-13">- Kết quả phân tích chất lượng nguồn nước </label>
                                            <div className="w-25"><button type="button" onClick={() => this.setState({modalPhanTichCLN: !this.state.modalPhanTichCLN})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center justify-content-center"><FilePdfOutlined /> &nbsp; XEM FILE </button></div>
                                        </div>

                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title="Kết quả phân tích chất lượng nguồn nước" width={1000} footer={null} id={licensePostData.id} visible={this.state.modalPhanTichCLN} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0].tailieu_ketqua_ptcln !== null ?
                                                <iframe width="100%" title="file giấy phép" src={configData.BASE_API_URL+"/uploads/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_ketqua_ptcln}></iframe>
                                                : <p className="text-white">Không có tài liệu</p>
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaohientrangkhaithac" className="form-label d-block w-75 m-0 font-13">- Báo cáo hiện trạng khai thác </label>
                                            <div className="w-25"><button type="button" onClick={() => this.setState({modalBaoCaoHTKT: !this.state.modalBaoCaoHTKT})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center justify-content-center"><FilePdfOutlined /> &nbsp; XEM FILE </button></div>
                                        </div>

                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title="Báo cáo hiện trạng khai thác" width={1000} footer={null} id={licensePostData.id} visible={this.state.modalBaoCaoHTKT} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0].tailieu_baocaohientrangkhaithac !== null ?
                                                <iframe width="100%" title="file giấy phép" src={configData.BASE_API_URL+"/uploads/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_baocaohientrangkhaithac}></iframe>
                                                : <p className="text-white">Không có tài liệu</p>
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_vanban_yccd" className="form-label d-block w-75 m-0 font-13">- Văn bản góp ý và tổng hợp tiếp thu, giải trình lấy ý kiến cộng đồng</label>
                                            <div className="w-25"><button type="button" onClick={() => this.setState({modalVanBanYKCD: !this.state.modalVanBanYKCD})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center justify-content-center"><FilePdfOutlined /> &nbsp; XEM FILE </button></div>
                                        </div>

                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title="Văn bản góp ý và tổng hợp tiếp thu, giải trình lấy ý kiến cộng đồng" width={1000} footer={null} id={licensePostData.id} visible={this.state.modalVanBanYKCD} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0].tailieu_vanban_yccd !== null ?
                                                <iframe width="100%" title="file giấy phép" src={configData.BASE_API_URL+"/uploads/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_vanban_yccd}></iframe>
                                                : <p className="text-white">Không có tài liệu</p>
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_giaytokhac" className="form-label d-block w-75 m-0 font-13">- Các giấy tờ, tài liệu khác có liên quan</label>
                                            <div className="w-25"><button type="button" onClick={() => this.setState({modalGiayToLienQuan: !this.state.modalGiayToLienQuan})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center justify-content-center"><FilePdfOutlined /> &nbsp; XEM FILE </button></div>
                                        </div>

                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title="Các giấy tờ, tài liệu khác có liên quan" width={1000} footer={null} id={licensePostData.id} visible={this.state.modalGiayToLienQuan} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0].tailieu_giaytokhac !== null ?
                                                <iframe width="100%" title="file giấy phép" src={configData.BASE_API_URL+"/uploads/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_giaytokhac}></iframe>
                                                : <p className="text-white">Không có tài liệu</p>
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                            <div className="border-top col-12 my-3"></div>
                            <div className="pb-4 col-sm-12 d-flex justify-content-end">
                            <Link to="#" className="btn btn-success mx-2 fw-bold font-14 d-flex align-items-center" > IN &nbsp; <PrinterOutlined /> </Link>
                                {licensePostData.status === 1 &&
                                    <>
                                        <Link to="#" className="btn btn-primary mx-2 fw-bold font-14 d-flex align-items-center" onClick={() => this.setState({modalLicense: !this.state.modalLicense})} >XEM PDF &nbsp; <FilePdfOutlined /> </Link>
                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title={licensePostData.gp_sogiayphep} width={1000} footer={null} id={licensePostData.gp_sogiayphep} visible={this.state.modalLicense} onCancel={this.hideModal}>
                                        <div>
                                            {licensePostData.tai_lieu && licensePostData.tai_lieu[0] !== undefined ?
                                            <iframe width="100%" title="file giấy phép" src={"http://tainguyennuocsonla.s3-ap-southeast-1.amazonaws.com/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_giayphep}></iframe>
                                            : "Không có tài liệu"
                                            }
                                        </div>
                                        </Modal>
                                    </>
                                }
                                <Link to="/quan-ly-cap-phep/nuoc-mat/thuy-dien" className="btn btn-danger mx-2 fw-bold font-14 d-flex align-items-center">TRỞ LẠI &nbsp; <RollbackOutlined /> </Link>
                            </div>
                        </form>
                    </div>
                </main>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
            </div>
        )
    }
}