import React from 'react';
import Header from '../../../Shared/Header';
import { trackPromise } from 'react-promise-tracker';
import configData from "../../../config.json";
import { Button} from "react-bootstrap";
import { PlusSquareOutlined, DeleteOutlined, FilePdfOutlined } from '@ant-design/icons';
import DemGiayPhep from './DemGiayPhep';
import { apiClient, removeUserSession, getToken } from '../../../Shared/Auth';
import { Redirect } from 'react-router';

// Alert library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class QuanLyCapPhepCapMoiNuocMatThuyDien extends React.Component {
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
            redirectSuccess: false
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
        document.title = "Cấp mới giấy phép khai thác nước dưới đất";
    }

    submitHandler = (e) => {
        e.preventDefault();
        var loaiHinhKTSD = this.props.match.path.split('/');

        let formData = new FormData();    //formdata object

        var chugiayphep_ten = document.querySelector('#chugiayphep_ten').value;
        var chugiayphep_sogiaydangkykinhdoanh = document.querySelector('#chugiayphep_sogiaydangkykinhdoanh').value;
        var chugiayphep_diachi = document.querySelector('#chugiayphep_diachi').value;
        var chugiayphep_phone = document.querySelector('#chugiayphep_phone').value;
        var chugiayphep_fax = document.querySelector('#chugiayphep_fax').value;
        var chugiayphep_email = document.querySelector('#chugiayphep_email').value;
        var congtrinh_ten = document.querySelector('#congtrinh_ten').value;
        var congtrinh_diadiem = document.querySelector('#congtrinh_diadiem').value;
        var phuongthuc_kt = document.querySelector('#phuongthuc_kt').value;
        var congtrinh_hientrang = document.querySelector('#congtrinh_hientrang').value;
        var mucdich_ktsd = document.querySelector('#mucdich_ktsd').value;
        var congsuat_lapmay = document.querySelector('#congsuat_lapmay').value;
        var luuluonglonnhat_quathuydien = document.querySelector('#luuluonglonnhat_quathuydien').value;
        var mucnuocdang_binhthuong = document.querySelector('#mucnuocdang_binhthuong').value;
        var mucnuoc_chet = document.querySelector('#mucnuoc_chet').value;
        var mucnuoccaonhat_truoclu = document.querySelector('#mucnuoccaonhat_truoclu').value;
        var mucnuoc_donlu = document.querySelector('#mucnuoc_donlu').value;
        var dungtich_huuich = document.querySelector('#dungtich_huuich').value;
        var dungtich_toanbo = document.querySelector('#dungtich_toanbo').value;
        var luuluong_xadongchay_toithieu = document.querySelector('#luuluong_xadongchay_toithieu').value;
        var nguonnuoc_ktsd = document.querySelector('#nguonnuoc_ktsd').value;
        var vitri_laynuoc = document.querySelector('#vitri_laynuoc').value;
        var luuluongnuoc_ktsd = document.querySelector('#luuluongnuoc_ktsd').value;
        var che_do_kt = document.querySelector('#che_do_kt').value;
        var gp_thoihangiayphep = document.querySelector('#gp_thoihangiayphep').value;
        var tailieu_sodovitrikhuvuc_congtrinh_khaithac = document.querySelector('#tailieu_sodovitrikhuvuc_congtrinh_khaithac').files[0];
        var tailieu_donxincapphep = document.querySelector('#tailieu_donxincapphep').files[0];
        var tailieu_baocaodean_ktsd = document.querySelector('#tailieu_baocaodean_ktsd').files[0];
        var tailieu_ketqua_ptcln = document.querySelector('#tailieu_ketqua_ptcln').files[0];
        var tailieu_baocaohientrangkhaithac = document.querySelector('#tailieu_baocaohientrangkhaithac').files[0];
        var tailieu_vanban_yccd = document.querySelector('#tailieu_vanban_yccd').files[0];
        var tailieu_giaytokhac = document.querySelector('#tailieu_giaytokhac').files[0];
        var camket_dungsuthat = document.querySelector('#camket_dungsuthat').value;
        var camket_chaphanhdungquydinh = document.querySelector('#camket_chaphanhdungquydinh').value;
        var camket_daguihoso = document.querySelector('#camket_daguihoso').value;
        
        formData.append("chugiayphep_ten", chugiayphep_ten);
        formData.append("chugiayphep_sogiaydangkykinhdoanh", chugiayphep_sogiaydangkykinhdoanh);
        formData.append("chugiayphep_diachi", chugiayphep_diachi);
        formData.append("chugiayphep_phone", chugiayphep_phone);
        formData.append("chugiayphep_fax", chugiayphep_fax);
        formData.append("chugiayphep_email", chugiayphep_email);
        formData.append("congtrinh_ten", congtrinh_ten);
        formData.append("congtrinh_diadiem", congtrinh_diadiem);
        formData.append("congtrinh_loaihinh_ktsd", loaiHinhKTSD[3]);
        formData.append("phuongthuc_kt", phuongthuc_kt);
        formData.append("congtrinh_hientrang", congtrinh_hientrang);
        formData.append("hangmuc", JSON.stringify(this.state.hangmuc));
        formData.append("mucdich_ktsd", mucdich_ktsd);
        formData.append("congsuat_lapmay", congsuat_lapmay);
        formData.append("luuluonglonnhat_quathuydien", luuluonglonnhat_quathuydien);
        formData.append("mucnuocdang_binhthuong", mucnuocdang_binhthuong);
        formData.append("mucnuoc_chet", mucnuoc_chet);
        formData.append("mucnuoccaonhat_truoclu", mucnuoccaonhat_truoclu);
        formData.append("mucnuoc_donlu", mucnuoc_donlu);
        formData.append("dungtich_huuich", dungtich_huuich);
        formData.append("dungtich_toanbo", dungtich_toanbo);
        formData.append("luuluong_xadongchay_toithieu", luuluong_xadongchay_toithieu);
        formData.append("nguonnuoc_ktsd", nguonnuoc_ktsd);
        formData.append("vitri_laynuoc", vitri_laynuoc);
        formData.append("luuluongnuoc_ktsd", luuluongnuoc_ktsd);
        formData.append("che_do_kt", che_do_kt);
        formData.append("gp_thoihangiayphep", gp_thoihangiayphep);
        formData.append("tailieu_sodovitrikhuvuc_congtrinh_khaithac", tailieu_sodovitrikhuvuc_congtrinh_khaithac);
        formData.append("tailieu_donxincapphep", tailieu_donxincapphep);
        formData.append("tailieu_baocaodean_ktsd", tailieu_baocaodean_ktsd);
        formData.append("tailieu_ketqua_ptcln", tailieu_ketqua_ptcln);
        formData.append("tailieu_baocaohientrangkhaithac", tailieu_baocaohientrangkhaithac);
        formData.append("tailieu_vanban_yccd", tailieu_vanban_yccd);
        formData.append("tailieu_giaytokhac", tailieu_giaytokhac);
        formData.append("camket_dungsuthat", camket_dungsuthat);
        formData.append("camket_chaphanhdungquydinh", camket_chaphanhdungquydinh);
        formData.append("camket_daguihoso", camket_daguihoso);

		apiClient.get('/sanctum/csrf-cookie')
            .then(response => {
                trackPromise(
					apiClient.post(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/cap-moi-giay-phep", formData, {
                        headers: {
                            'content-type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + getToken()
                        } 
                    })
					.then((response) => {
                        this.setState({toastSuccess: response.data.success_message});
                        this.notifySuccess();

                        setTimeout(() => {
                            this.setState({redirectSuccess: true});
                        }, 5000);
					})
					.catch((error) => {
                        this.setState({toastError: error.response.data.error_message});
                        this.notifyError();
                        if(error.response.status === 401)
                        {
                            removeUserSession();
                            window.location.reload();
                        }
					})
				)
            })

        
    };

    // Get value for license creation on change (Lay gia tri input de tao moi giay phep)
    handleInputChange = (event) => {
        const { licensePostData } = this.state;
        var value = "";
        if(event.target.type === 'checkbox'){
            value = event.target.checked
        }else if(event.target.type === 'file'){
            value = event.target.files[0]
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

    render(){
        return(
            this.state.redirectSuccess ?  <Redirect to='/quan-ly-cap-phep/nuoc-mat/thuy-dien/quan-ly-cap-moi' /> :
			<div className="p-0">
                <Header headTitle="ĐỀ NGHỊ CẤP MỚI GIẤY PHÉP KHAI THÁC SỬ DỤNG NƯỚC MẶT CHO CÔNG TRÌNH THỦY ĐIỆN" previousLink="/quan-ly-cap-phep/nuoc-mat/thuy-dien" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <form action="" onSubmit={(e) => this.submitHandler(e)} noValidate>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">1.Tổ chức/Cá nhân đề nghị CP</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_ten" className="form-label fw-bold font-13 m-0">1.1.Tên tổ chức/cá nhân </label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten"  />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_sogiaydangkykinhdoanh" className="form-label fw-bold font-13 m-0">1.2.Số Giấy đăng ký kinh doanh </label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_diachi" className="form-label fw-bold font-13 m-0">1.3.Địa chỉ  </label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" />
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0 row m-0">
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_phone" className="form-label fw-bold font-13 m-0">1.4.Điện thoại   </label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_phone" name="chugiayphep_phone" />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_fax" className="form-label fw-bold font-13 m-0">1.5.Fax   </label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} className="form-control form-control-sm" id="chugiayphep_fax" name="chugiayphep_fax" />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.6.Email   </label>
                                        <input type="email" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.Thông tin về công trình khai thác, sử dụng nước</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_ten" className="form-label fw-bold font-13 m-0">2.1.Tên công trình khai thác </label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="phuongthuc_kt" className="form-label fw-bold font-13 m-0">2.2.Phương thức khai thác nước</label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="phuongthuc_kt" name="phuongthuc_kt" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_diadiem" className="form-label fw-bold font-13 m-0">2.3.Vị trí công trình</label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_hientrang" className="form-label fw-bold font-13 m-0">2.4.Hiện trạng công trình</label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_hientrang" name="congtrinh_hientrang" />
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
                                                        <th className="text-center align-middle" rowSpan="2">
                                                            <Button variant="link" title="Tạo mới hạng mục" size="sm" className="w-100 text-primary d-flex justify-content-center align-items-center" onClick={this.handleAddHangmuc}><PlusSquareOutlined /></Button>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-center align-middle">X</th>
                                                        <th className="text-center align-middle">Y</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.hangmuc.map((item, i) => (
                                                    <tr key={i}>
                                                        <th className="text-center align-middle">{i+1}</th>
                                                        <td> 
                                                            <input type="text" value={this.state.hangmuc[i].tenhangmuc} name="tenhangmuc" onChange={(e) => this.handleChangeHangmuc(i, e)} className="form-control form-control-sm" />  
                                                        </td>
                                                        <td> 
                                                            <input type="text" value={this.state.hangmuc[i].x} name="x" onChange={(e) => this.handleChangeHangmuc(i, e)} className="form-control form-control-sm" />  
                                                        </td>
                                                        <td> 
                                                            <input type="text" value={this.state.hangmuc[i].y} name="y" onChange={(e) => this.handleChangeHangmuc(i, e)} className="form-control form-control-sm" />  
                                                        </td>
                                                        <td className="d-flex justify-content-center">
                                                            <Button size="sm" variant="link" className="d-flex justify-content-center align-items-center text-danger" onClick={this.handleRemoveSpecificRow(i)}><DeleteOutlined /></Button>
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
                                                        <th className="text-center align-middle">Công suất lắp máy (MW)</th>
                                                        <th className="text-center align-middle">Lưu lượng lớn nhất qua nhà máy thủy điện (m3/s)</th>
                                                        <th className="text-center align-middle">Mực nước dâng bình thường (m)</th>
                                                        <th className="text-center align-middle">Mực nước chết (m)</th>
                                                        <th className="text-center align-middle">Mực nước cao nhất trước lũ (m)</th>
                                                        <th className="text-center align-middle">Mực nước đón lũ (m)</th>
                                                        <th className="text-center align-middle">Dung tích hữu ích (triệu m3)</th>
                                                        <th className="text-center align-middle">Dung tích toàn bộ (triệu m3)</th>
                                                        <th className="text-center align-middle">Lưu lượng xả dòng chảy tối thiểu (m3/s)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="congsuat_lapmay" id="congsuat_lapmay" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="luuluonglonnhat_quathuydien" id="luuluonglonnhat_quathuydien" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="mucnuocdang_binhthuong" id="mucnuocdang_binhthuong" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="mucnuoc_chet" id="mucnuoc_chet" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="mucnuoccaonhat_truoclu" id="mucnuoccaonhat_truoclu" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="mucnuoc_donlu" id="mucnuoc_donlu" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="dungtich_huuich" id="dungtich_huuich" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="dungtich_toanbo" id="dungtich_toanbo" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="luuluong_xadongchay_toithieu" id="luuluong_xadongchay_toithieu" className="form-control form-control-sm" /> 
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
                                            <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="nguonnuoc_ktsd" name="nguonnuoc_ktsd" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2">
                                            <label htmlFor="vitri_laynuoc" className="form-label fw-bold font-13 m-0">3.2.Vị trí lấy nước</label>
                                            <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="vitri_laynuoc" name="vitri_laynuoc" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.3.Mục đích khai thác, sử dụng nước</label>
                                            <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 p-0">
                                        <div className="mb-2 row mx-0">
                                            <div className="col-sm-12">
                                                <div className="mb-2 m-0">
                                                    <label htmlFor="luuluongnuoc_ktsd" className="form-label w-50 fw-bold font-13 m-0">3.4.Lượng nước khai thác, sử dụng</label>
                                                    <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm w-50" id="luuluongnuoc_ktsd" name="luuluongnuoc_ktsd" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="mb-2">
                                            <label htmlFor="che_do_kt" className="form-label fw-bold font-13 m-0">3.5.Chế độ khai thác, sử dụng</label>
                                            <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="che_do_kt" name="che_do_kt" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="mb-2">
                                            <label htmlFor="gp_thoihangiayphep" className="form-label fw-bold font-13 m-0">3.6.Thời gian đề nghị cấp phép</label>
                                            <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="gp_thoihangiayphep" name="gp_thoihangiayphep" />
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_sodovitrikhuvuc_congtrinh_khaithac" className="form-label fw-bold d-block w-75 m-0 font-13">3.7.Sơ đồ khu vực và vị trí công trình khai thác nước kèm theo</label>
                                            <div className="w-25"><input type="file" onChange={(e) => this.handleInputChange(e)} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_sodovitrikhuvuc_congtrinh_khaithac" name="tailieu_sodovitrikhuvuc_congtrinh_khaithac" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Giấy tờ, tài liệu nộp kèm theo (.pdf)</p>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_donxincapphep" className="form-label d-block w-75 m-0 font-13">- Đơn xin cấp phép</label>
                                            <div className="w-25"><input type="file" onChange={(e) => this.handleInputChange(e)} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_donxincapphep" name="tailieu_donxincapphep" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaodean_ktsd" className="form-label d-block w-75 m-0 font-13">- Đề án/ báo cáo khai thác, sử dụng nước </label>
                                            <div className="w-25"><input type="file" onChange={(e) => this.handleInputChange(e)} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_baocaodean_ktsd" name="tailieu_baocaodean_ktsd" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_ketqua_ptcln" className="form-label d-block w-75 m-0 font-13">- Kết quả phân tích chất lượng nguồn nước </label>
                                            <div className="w-25"><input type="file" onChange={(e) => this.handleInputChange(e)} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_ketqua_ptcln" name="tailieu_ketqua_ptcln" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaohientrangkhaithac" className="form-label d-block w-75 m-0 font-13">- Báo cáo hiện trạng khai thác </label>
                                            <div className="w-25"><input type="file" onChange={(e) => this.handleInputChange(e)} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_baocaohientrangkhaithac" name="tailieu_baocaohientrangkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_vanban_yccd" className="form-label d-block w-75 m-0 font-13">- Văn bản góp ý và tổng hợp tiếp thu, giải trình lấy ý kiến cộng đồng</label>
                                            <div className="w-25"><input type="file" onChange={(e) => this.handleInputChange(e)} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_vanban_yccd" name="tailieu_vanban_yccd" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_giaytokhac" className="form-label d-block w-75 m-0 font-13">- Các giấy tờ, tài liệu khác có liên quan</label>
                                            <div className="w-25"><input type="file" onChange={(e) => this.handleInputChange(e)} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_giaytokhac" name="tailieu_giaytokhac" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row col-sm-6 p-0 m-0">
                                    <div className="col-sm-12 row m-0 p-0">
                                        <div>
                                            <p className="fw-bold w-100 text-violet py-2 m-0 font-15">5.Cam kết của tổ chức/cá nhân đề nghị cấp phép</p>
                                            <div className="col-sm-12 mb-2">
                                                <div className="mb-2 d-flex alicn-items-center mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_dungsuthat} value={this.state.licensePostData.camket_dungsuthat} onChange={(e) => this.handleInputChange(e)} required id="camket_dungsuthat" name="camket_dungsuthat" />
                                                            <label htmlFor="camket_dungsuthat"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_dungsuthat" className="form-label d-block m-0 font-13 fw-bold mx-2">Đúng sự thật</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <div className="mb-2 d-flex mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_chaphanhdungquydinh} value={this.state.licensePostData.camket_chaphanhdungquydinh} onChange={(e) => this.handleInputChange(e)} required id="camket_chaphanhdungquydinh" name="camket_chaphanhdungquydinh" />
                                                            <label htmlFor="camket_chaphanhdungquydinh"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_chaphanhdungquydinh" className="form-label d-block m-0 font-13 fw-bold mx-2">Chấp hành đúng, đầy đủ các quy định</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <div className="mb-2 d-flex mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_daguihoso} value={this.state.licensePostData.camket_daguihoso} onChange={(e) => this.handleInputChange(e)} id="camket_daguihoso" name="camket_daguihoso" />
                                                            <label htmlFor="camket_daguihoso"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_daguihoso" className="form-label d-block m-0 font-13 fw-bold mx-2">Đã gửi một (01) bộ hồ sơ tới Sở Tài nguyên và Môi trường</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-3 p-1"></div>
                            <div className="pb-4 text-center col-sm-12 d-flex">
                                <div className="col-3">
                                    <button type="submit" className="btn btn-outline-primary mx-2 fw-bold font-14 d-flex align-items-center"><FilePdfOutlined /> &nbsp; IN PDF</button>
                                </div>
                                <div className="col-6 d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary mx-2 fw-bold font-14 d-flex align-items-center">GỬI YÊU CẦU CẤP MỚI GIẤY PHÉP</button>
                                </div>
                                <div className="col-3"></div>
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