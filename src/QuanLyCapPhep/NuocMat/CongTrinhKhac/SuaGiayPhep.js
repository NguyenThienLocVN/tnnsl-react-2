import React from 'react';
import Header from '../../../Shared/Header';
import { trackPromise } from 'react-promise-tracker';
import configData from "../../../config.json";
import { Button } from "react-bootstrap";
import { PlusSquareOutlined, QuestionCircleOutlined, DeleteOutlined, CheckCircleOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Popover, Modal } from 'antd';
import DemGiayPhep from './DemGiayPhep';
import { apiClient } from '../../../Shared/Auth';
import axios from "axios";
import { getToken, removeUserSession } from '../../../Shared/Auth';

// Alert library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class QuanLyCapPhepSuaGiayPhepNuocMatCongTrinhKhac extends React.Component {
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

            modalLicense: false
        }
    }

    // Get well item on change event (Lay du lieu gieng khi thay doi gia tri)
    handleChangeGieng = (i, e) => {
        let giengs = [...this.state.giengs]
        giengs[i][e.target.name] = e.target.value;
        this.setState({ giengs });
    };

    // Add well item (them hang muc gieng)
    handleAddGieng = (e) => {
        this.setState({
            giengs: [...this.state.giengs, {sohieu: "",
            x: "",
            y: "",
            luuluongkhaithac: "",
            chedo_ktsd: "",
            chieusau_doanthunuoctu: "",
            chieusau_doanthunuocden: "",
            chieusau_mucnuoctinh: "",
            tangchuanuoc: "",
            chieusau_mucnuocdong_max: ""}],
        })
    };

    // Remove well item (xoa hang muc gieng)
    handleRemoveSpecificRow = (idx) => () => {
        const giengs = [...this.state.giengs]
        giengs.splice(idx, 1)
        this.setState({ giengs })
    }

    componentDidMount(){
        document.title = "Ch???nh s???a gi???y ph??p khai th??c n?????c m???t - c??ng tr??nh kh??c";

        var constructionId = this.props.match.params.id_gp;

        trackPromise(axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/thong-tin-giay-phep/"+constructionId, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => { this.setState({licensePostData: response.data}); })
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

    submitHandler = (e) => {
        e.preventDefault();
        e.target.className += " was-validated";

		apiClient.get('/sanctum/csrf-cookie')
            .then(response => {
                trackPromise(
					apiClient.post(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/cap-moi-giay-phep")
					.then((response) => {
                        console.log(response);
					})
					.catch((error) => {console.log(error);
						setTimeout(this.setState({errorMsg: error.response.data.error_message}), 3000);
					})
				)
            })
    };

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
            return "???? g???i h??? s??";
        }else if(status === 1){
            return "???? ???????c c???p ph??p";
        }else if(status === 2){
            return "??ang l???y ?? ki???n th???m ?????nh";
        }
        else{
            return "Ho??n th??nh h??? s?? c???p ph??p";
        }
    }

    // Format date time
    formatDate = (t) => {
        var time = new Date(t);
        var day = time.getDate();
        var getMonth = time.getMonth() + 1;
        var month = getMonth < 10 ? "0"+getMonth : getMonth;
        var year = time.getFullYear();
        var hour = time.getHours() < 10 ? "0"+time.getHours() : time.getHours();
        var minute = time.getMinutes() < 10 ? "0"+time.getMinutes() : time.getMinutes();
        
        return day+'/'+month+'/'+year+' - '+hour+":"+minute;
    }

    // Hide modal
    hideModal = () => {
        this.setState({ modalLicense: false })
    }

    render(){
        const { licensePostData } = this.state;

        const statusBox = (
            <div>
              <p className={licensePostData.status === 0 ? "bg-lightgreen m-0 p-1 d-flex align-items-center justify-content-between": "m-0 p-1 d-flex align-items-center"}>1. ???? g???i h??? s?? {licensePostData.status === 0 && <CheckCircleOutlined />}</p>
              <p className={licensePostData.status === 2 ? "bg-lightgreen m-0 p-1 d-flex align-items-center justify-content-between": "m-0 p-1 d-flex align-items-center"}>2. ??ang l???y ?? ki???n th???m ?????nh {licensePostData.status === 2 && <CheckCircleOutlined />}</p>
              <p className={licensePostData.status === 3 ? "bg-lightgreen m-0 p-1 d-flex align-items-center justify-content-between": "m-0 p-1 d-flex align-items-center"}>3. Ho??n th??nh h??? s?? c???p ph??p {licensePostData.status === 3 && <CheckCircleOutlined />}</p>
              <p className={licensePostData.status === 1 ? "bg-lightgreen m-0 p-1 d-flex align-items-center justify-content-between": "m-0 p-1 d-flex align-items-center"}>4. ???? ???????c c???p ph??p {licensePostData.status === 1 && <CheckCircleOutlined />}</p>
            </div>
        );
        
        return(
			<div className="p-0">
                <Header headTitle="CH???NH S???A GI???Y PH??P KHAI TH??C S??? D???NG N?????C M???T CHO C??NG TR??NH KH??C" previousLink="/quan-ly-cap-phep/nuoc-mat/cong-trinh-khac" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <h6 className="px-2 pt-2 d-flex align-items-center fw-bold">C??ng tr??nh: {licensePostData.congtrinh_ten} - <span className={licensePostData.status === 1 ? "text-success" : "text-primary"}>&nbsp; {this.statusText(licensePostData.status)}</span>&nbsp; <Popover placement="bottomLeft" content={statusBox} title="Tr???ng th??i gi???y ph??p" ><QuestionCircleOutlined /></Popover></h6>
                        {licensePostData.status === 1 &&
                            <p className="px-2">S??? gi???y ph??p: {licensePostData.gp_sogiayphep}</p>
                        }
                        <div className="px-2"><hr /></div>
                        <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">1.T??? ch???c/C?? nh??n ????? ngh??? CP</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_ten" className="form-label fw-bold font-13 m-0">1.1.T??n t??? ch???c/c?? nh??n </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten" value={licensePostData.chugiayphep_ten}  />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_sogiaydangkykinhdoanh" className="form-label fw-bold font-13 m-0">1.2.S??? Gi???y ????ng k?? kinh doanh </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" value={licensePostData.chugiayphep_sogiaydangkykinhdoanh} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_diachi" className="form-label fw-bold font-13 m-0">1.3.?????a ch???  </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" value={licensePostData.chugiayphep_diachi} />
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0 row m-0">
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_phone" className="form-label fw-bold font-13 m-0">1.4.??i???n tho???i   </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_phone" name="chugiayphep_phone" value={licensePostData.chugiayphep_phone} />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_fax" className="form-label fw-bold font-13 m-0">1.5.Fax   </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_fax" name="chugiayphep_fax" value={licensePostData.chugiayphep_fax} />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.6.Email   </label>
                                        <input type="email" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" value={licensePostData.chugiayphep_email} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.Th??ng tin v??? c??ng tr??nh khai th??c, s??? d???ng n?????c</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_ten" className="form-label fw-bold font-13 m-0">2.1.T??n c??ng tr??nh khai th??c </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" value={licensePostData.congtrinh_ten} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="phuongthuc_kt" className="form-label fw-bold font-13 m-0">2.2.Lo???i h??nh c??ng tr??nh, ph????ng th???c khai th??c n?????c</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="phuongthuc_kt" name="phuongthuc_kt" value={licensePostData.phuongthuc_kt} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_diadiem" className="form-label fw-bold font-13 m-0">2.3.V??? tr?? c??ng tr??nh</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" value={licensePostData.congtrinh_diadiem} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_hientrang" className="form-label fw-bold font-13 m-0">2.4.Hi???n tr???ng c??ng tr??nh</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_hientrang" name="congtrinh_hientrang" value={licensePostData.congtrinh_hientrang} />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="mb-2">
                                        <p className="form-label fw-bold font-13 m-0">2.5.V??? tr?? c??c h???ng m???c ch??nh c???a c??ng tr??nh khai th??c s??? d???ng n?????c</p>
                                        <div className="col-sm-12 p-0 table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center align-middle" rowSpan="2">TT</th>
                                                        <th className="text-center align-middle" rowSpan="2">H???ng m???c</th>
                                                        <th className="text-center align-middle" colSpan="2">T???a ?????</th>
                                                        <th className="text-center align-middle" rowSpan="2">
                                                            <Button variant="link" title="T???o m???i h???ng m???c" size="sm" className="w-100 text-primary d-flex justify-content-center align-items-center"><PlusSquareOutlined /></Button>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-center align-middle">X</th>
                                                        <th className="text-center align-middle">Y</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {licensePostData.hang_muc_ct && licensePostData.hang_muc_ct.map((item, i) => (
                                                    <tr key={i}>
                                                        <th className="text-center align-middle">{i+1}</th>
                                                        <td> 
                                                            <input type="text" value={licensePostData.hang_muc_ct[i].tenhangmuc} name="tenhangmuc" onChange={(e) => this.handleChangeHangmuc(i, e)} className="form-control form-control-sm" />  
                                                        </td>
                                                        <td> 
                                                            <input type="text" value={licensePostData.hang_muc_ct[i].x} name="x" onChange={(e) => this.handleChangeHangmuc(i, e)} className="form-control form-control-sm" />  
                                                        </td>
                                                        <td> 
                                                            <input type="text" value={licensePostData.hang_muc_ct[i].y} name="y" onChange={(e) => this.handleChangeHangmuc(i, e)} className="form-control form-control-sm" />  
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
                                        <p className="form-label fw-bold font-13 m-0">2.6.C??c th??ng s??? c???a c??ng tr??nh </p>
                                        <div className="col-sm-12 p-0 table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center align-middle">C??ng su???t l???p m??y (MW)</th>
                                                        <th className="text-center align-middle">L??u l?????ng l???n nh???t qua nh?? m??y th???y ??i???n (m3/s)</th>
                                                        <th className="text-center align-middle">M???c n?????c d??ng b??nh th?????ng (m)</th>
                                                        <th className="text-center align-middle">M???c n?????c ch???t (m)</th>
                                                        <th className="text-center align-middle">M???c n?????c cao nh???t tr?????c l?? (m)</th>
                                                        <th className="text-center align-middle">M???c n?????c ????n l?? (m)</th>
                                                        <th className="text-center align-middle">Dung t??ch h???u ??ch (tri???u m3)</th>
                                                        <th className="text-center align-middle">Dung t??ch to??n b??? (tri???u m3)</th>
                                                        <th className="text-center align-middle">L??u l?????ng x??? d??ng ch???y t???i thi???u (m3/s)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" name="congsuat_lapmay" id="congsuat_lapmay" className="form-control form-control-sm" value={licensePostData.congsuat_lapmay} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" name="luuluonglonnhat_quathuydien" id="luuluonglonnhat_quathuydien" className="form-control form-control-sm" value={licensePostData.luuluonglonnhat_quathuydien} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" name="mucnuocdang_binhthuong" id="mucnuocdang_binhthuong" className="form-control form-control-sm" value={licensePostData.mucnuocdang_binhthuong} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" name="mucnuoc_chet" id="mucnuoc_chet" className="form-control form-control-sm" value={licensePostData.mucnuoc_chet} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" name="mucnuoccaonhat_truoclu" id="mucnuoccaonhat_truoclu" className="form-control form-control-sm" value={licensePostData.mucnuoccaonhat_truoclu} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" name="mucnuoc_donlu" id="mucnuoc_donlu" className="form-control form-control-sm" value={licensePostData.mucnuoc_donlu} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" name="dungtich_huuich" id="dungtich_huuich" className="form-control form-control-sm" value={licensePostData.dungtich_huuich} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" name="dungtich_toanbo" id="dungtich_toanbo" className="form-control form-control-sm" value={licensePostData.dungtich_toanbo} /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" name="luuluong_xadongchay_toithieu" id="luuluong_xadongchay_toithieu" className="form-control form-control-sm" value={licensePostData.luuluong_xadongchay_toithieu} /> 
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">3.N???i dung ????? ngh??? c???p ph??p</p>
                                    <div className="col-sm-6">
                                        <div className="mb-2">
                                            <label htmlFor="nguonnuoc_ktsd" className="form-label fw-bold font-13 m-0">3.1.Ngu???n n?????c khai th??c, s??? d???ng</label>
                                            <input type="text" required className="form-control form-control-sm" id="nguonnuoc_ktsd" name="nguonnuoc_ktsd" value={licensePostData.nguonnuoc_ktsd} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2">
                                            <label htmlFor="vitri_laynuoc" className="form-label fw-bold font-13 m-0">3.2.V??? tr?? l???y n?????c</label>
                                            <input type="text" required className="form-control form-control-sm" id="vitri_laynuoc" name="vitri_laynuoc" value={licensePostData.vitri_laynuoc} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.3.M???c ????ch khai th??c, s??? d???ng n?????c</label>
                                            <input type="text" required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" value={licensePostData.mucdich_ktsd} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 p-0">
                                        <div className="mb-2 row mx-0">
                                            <div className="col-sm-12">
                                                <div className="mb-2 m-0">
                                                    <label htmlFor="luuluongnuoc_ktsd" className="form-label w-50 fw-bold font-13 m-0">3.4.L?????ng n?????c khai th??c, s??? d???ng</label>
                                                    <input type="text" required className="form-control form-control-sm w-50" id="luuluongnuoc_ktsd" name="luuluongnuoc_ktsd" value={licensePostData.luuluongnuoc_ktsd} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="mb-2">
                                            <label htmlFor="che_do_kt" className="form-label fw-bold font-13 m-0">3.5.Ch??? ????? khai th??c, s??? d???ng</label>
                                            <input type="text" required className="form-control form-control-sm" id="che_do_kt" name="che_do_kt" value={licensePostData.che_do_kt} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="mb-2">
                                            <label htmlFor="gp_thoihangiayphep" className="form-label fw-bold font-13 m-0">3.6.Th???i gian ????? ngh??? c???p ph??p</label>
                                            <input type="text" required className="form-control form-control-sm" id="gp_thoihangiayphep" name="gp_thoihangiayphep" value={licensePostData.gp_thoihangiayphep} />
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_sodovitrikhuvuc_congtrinh_khaithac" className="form-label fw-bold d-block w-75 m-0 font-13">3.7.S?? ????? khu v???c v?? v??? tr?? c??ng tr??nh khai th??c n?????c k??m theo</label>
                                            <div className="w-25"><input type="file" accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_sodovitrikhuvuc_congtrinh_khaithac" name="tailieu_sodovitrikhuvuc_congtrinh_khaithac" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Gi???y t???, t??i li???u k??m theo</p>
                                    {licensePostData.status === 1 &&
                                        <>
                                            <div className="col-sm-12">
                                                <div className="mb-2 d-flex mx-0">
                                                    <label htmlFor="tailieu_donxincapphep" className="form-label d-block w-75 m-0 font-13">- T??i li???u gi???y ph??p</label>
                                                    <div className="w-25"><button type="button" onClick={() => this.setState({modalLicense: !this.state.modalLicense})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center"><FilePdfOutlined /> &nbsp; {licensePostData.gp_sogiayphep} </button></div>
                                                </div>
                                            </div>

                                            <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title={licensePostData.gp_sogiayphep} width={1000} footer={null} id={licensePostData.gp_sogiayphep} visible={this.state.modalLicense} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0] !== undefined ?
                                                <iframe width="100%" title="file gi???y ph??p" src={"http://tainguyennuocsonla.s3-ap-southeast-1.amazonaws.com/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_giayphep}></iframe>
                                                : "Kh??ng c?? t??i li???u"
                                                }
                                            </div>
                                            </Modal>
                                        </>
                                    }
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_donxincapphep" className="form-label d-block w-75 m-0 font-13">- ????n xin c???p ph??p</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_donxincapphep" name="tailieu_donxincapphep" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaodean_ktsd" className="form-label d-block w-75 m-0 font-13">- ????? ??n/ b??o c??o khai th??c, s??? d???ng n?????c </label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_baocaodean_ktsd" name="tailieu_baocaodean_ktsd" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_ketqua_ptcln" className="form-label d-block w-75 m-0 font-13">- K???t qu??? ph??n t??ch ch???t l?????ng ngu???n n?????c </label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_ketqua_ptcln" name="tailieu_ketqua_ptcln" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaohientrangkhaithac" className="form-label d-block w-75 m-0 font-13">- B??o c??o hi???n tr???ng khai th??c </label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_baocaohientrangkhaithac" name="tailieu_baocaohientrangkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_vanban_yccd" className="form-label d-block w-75 m-0 font-13">- V??n b???n g??p ?? v?? t???ng h???p ti???p thu, gi???i tr??nh l???y ?? ki???n c???ng ?????ng</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_vanban_yccd" name="tailieu_vanban_yccd" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_giaytokhac" className="form-label d-block w-75 m-0 font-13">- C??c gi???y t???, t??i li???u kh??c c?? li??n quan</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_giaytokhac" name="tailieu_giaytokhac" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row col-sm-6 p-0 m-0">
                                    <div className="col-sm-12 row m-0 p-0">
                                        <div>
                                            <p className="fw-bold w-100 text-violet p-2 m-0 font-15">5.Cam k???t c???a t??? ch???c/c?? nh??n ????? ngh??? c???p ph??p</p>
                                            <div className="col-sm-12 mb-2">
                                                <div className="mb-2 d-flex alicn-items-center mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" checked={licensePostData.camket_dungsuthat} onChange={this.handleInputChange} required id="camket_dungsuthat" name="camket_dungsuthat" />
                                                            <label htmlFor="camket_dungsuthat"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_dungsuthat" className="form-label d-block m-0 font-13 fw-bold mx-2">????ng s??? th???t</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <div className="mb-2 d-flex mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" checked={licensePostData.camket_chaphanhdungquydinh} onChange={this.handleInputChange} required id="camket_chaphanhdungquydinh" name="camket_chaphanhdungquydinh" />
                                                            <label htmlFor="camket_chaphanhdungquydinh"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_chaphanhdungquydinh" className="form-label d-block m-0 font-13 fw-bold mx-2">Ch???p h??nh ????ng, ?????y ????? c??c quy ?????nh</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <div className="mb-2 d-flex mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_daguihoso} onChange={this.handleInputChange} id="camket_daguihoso" name="camket_daguihoso" />
                                                            <label htmlFor="camket_daguihoso"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_daguihoso" className="form-label d-block m-0 font-13 fw-bold mx-2">???? g???i m???t (01) b??? h??? s?? t???i S??? T??i nguy??n v?? M??i tr?????ng</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-4 text-center col-sm-12">
                                <hr />
                                <button type="submit" className="btn btn-primary mx-2 fw-bold font-14">C???P NH???T GI???Y PH??P</button>
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