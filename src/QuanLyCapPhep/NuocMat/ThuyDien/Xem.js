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
        document.title = "Ch???nh s???a gi???y ph??p khai th??c n?????c m???t - Th???y ??i???n";

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
              <p className={licensePostData.status === 0 ? "bg-success text-white m-0 p-1 d-flex align-items-center justify-content-between": "m-0 p-1 d-flex align-items-center"}>1. ???? g???i h??? s?? {licensePostData.status === 0 && <CheckCircleOutlined />}</p>
              <p className={licensePostData.status === 2 ? "bg-success text-white m-0 p-1 d-flex align-items-center justify-content-between": "m-0 p-1 d-flex align-items-center"}>2. ??ang l???y ?? ki???n th???m ?????nh {licensePostData.status === 2 && <CheckCircleOutlined />}</p>
              <p className={licensePostData.status === 3 ? "bg-success text-white m-0 p-1 d-flex align-items-center justify-content-between": "m-0 p-1 d-flex align-items-center"}>3. Ho??n th??nh h??? s?? c???p ph??p {licensePostData.status === 3 && <CheckCircleOutlined />}</p>
              <p className={licensePostData.status === 1 ? "bg-success text-white m-0 p-1 d-flex align-items-center justify-content-between": "m-0 p-1 d-flex align-items-center"}>4. ???? ???????c c???p ph??p {licensePostData.status === 1 && <CheckCircleOutlined />}</p>
            </div>
        );
        
        return(
			<div className="p-0">
                <Header headTitle="GI???Y PH??P KHAI TH??C S??? D???NG N?????C M???T CHO C??NG TR??NH TH???Y ??I???N" previousLink="/quan-ly-cap-phep/nuoc-mat/thuy-dien" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <h6 className="px-2 pt-2 d-flex align-items-center d-flex"><span className="col-1">C??ng tr??nh:</span> <span className="fw-bold">{licensePostData.congtrinh_ten} - <span className={licensePostData.status === 1 ? "text-success" : "text-primary"}>&nbsp; {this.statusText(licensePostData.status)}</span></span>&nbsp; <Popover placement="bottomLeft" content={statusBox} title="Tr???ng th??i gi???y ph??p" ><QuestionCircleOutlined /></Popover></h6>
                        {licensePostData.status === 1 &&
                            <>
                            <p className="px-2 m-0 d-flex font-14"><span className="col-1">S??? gi???y ph??p: </span><span className="fw-bold"><u>{licensePostData.gp_sogiayphep}</u></span>&nbsp; &nbsp; <span title="Xem t??i li???u" onClick={() => this.setState({modalLicense: !this.state.modalLicense})} className="col-1 text-primary font-13 d-flex align-items-center"><FilePdfOutlined /></span></p>
                                <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title={licensePostData.gp_sogiayphep} width={1000} footer={null} id={licensePostData.gp_sogiayphep} visible={this.state.modalLicense} onCancel={this.hideModal}>
                                <div>
                                    {licensePostData.tai_lieu && licensePostData.tai_lieu[0] !== undefined ?
                                    <iframe width="100%" title="file gi???y ph??p" src={"http://tainguyennuocsonla.s3-ap-southeast-1.amazonaws.com/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_giayphep}></iframe>
                                    : "Kh??ng c?? t??i li???u"
                                    }
                                </div>
                                </Modal>
                            
                            <p className="px-2 m-0 d-flex font-14"><span className="col-1">Ng??y c???p: </span><span className="fw-bold">{this.formatDate(licensePostData.gp_ngaycap)}</span></p>
                            <p className="px-2 m-0 d-flex font-14"><span className="col-1">Th???i h???n GP: </span><span className="fw-bold">{licensePostData.gp_thoigiancapphep}</span></p>
                            </>
                        }
                        <div className="px-2"><hr /></div>
                        <form action="" noValidate>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">1.T??? ch???c/C?? nh??n ????? ngh??? CP</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_ten" className="form-label fw-bold font-13 m-0">1.1.T??n t??? ch???c/c?? nh??n </label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten" value={licensePostData.chugiayphep_ten}  />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_sogiaydangkykinhdoanh" className="form-label fw-bold font-13 m-0">1.2.S??? Gi???y ????ng k?? kinh doanh </label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" value={licensePostData.chugiayphep_sogiaydangkykinhdoanh} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_diachi" className="form-label fw-bold font-13 m-0">1.3.?????a ch???  </label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" value={licensePostData.chugiayphep_diachi} />
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0 row m-0">
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_phone" className="form-label fw-bold font-13 m-0">1.4.??i???n tho???i   </label>
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
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.Th??ng tin v??? c??ng tr??nh khai th??c, s??? d???ng n?????c</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_ten" className="form-label fw-bold font-13 m-0">2.1.T??n c??ng tr??nh khai th??c </label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" value={licensePostData.congtrinh_ten} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="phuongthuc_kt" className="form-label fw-bold font-13 m-0">2.2.Lo???i h??nh c??ng tr??nh, ph????ng th???c khai th??c n?????c</label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="phuongthuc_kt" name="phuongthuc_kt" value={licensePostData.phuongthuc_kt} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_diadiem" className="form-label fw-bold font-13 m-0">2.3.V??? tr?? c??ng tr??nh</label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" value={licensePostData.congtrinh_diadiem} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_hientrang" className="form-label fw-bold font-13 m-0">2.4.Hi???n tr???ng c??ng tr??nh</label>
                                        <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_hientrang" name="congtrinh_hientrang" value={licensePostData.congtrinh_hientrang} />
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
                                        <p className="form-label fw-bold font-13 m-0">2.6.C??c th??ng s??? c???a c??ng tr??nh </p>
                                        <div className="col-sm-12 p-0 table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center align-middle font-13">C??ng su???t l???p m??y (MW)</th>
                                                        <th className="text-center align-middle font-13">L??u l?????ng l???n nh???t qua nh?? m??y th???y ??i???n (m3/s)</th>
                                                        <th className="text-center align-middle font-13">M???c n?????c d??ng b??nh th?????ng (m)</th>
                                                        <th className="text-center align-middle font-13">M???c n?????c ch???t (m)</th>
                                                        <th className="text-center align-middle font-13">M???c n?????c cao nh???t tr?????c l?? (m)</th>
                                                        <th className="text-center align-middle font-13">M???c n?????c ????n l?? (m)</th>
                                                        <th className="text-center align-middle font-13">Dung t??ch h???u ??ch (tri???u m3)</th>
                                                        <th className="text-center align-middle font-13">Dung t??ch to??n b??? (tri???u m3)</th>
                                                        <th className="text-center align-middle font-13">L??u l?????ng x??? d??ng ch???y t???i thi???u (m3/s)</th>
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
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">3.N???i dung ????? ngh??? c???p ph??p</p>
                                    <div className="col-sm-6">
                                        <div className="mb-2">
                                            <label htmlFor="nguonnuoc_ktsd" className="form-label fw-bold font-13 m-0">3.1.Ngu???n n?????c khai th??c, s??? d???ng</label>
                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)}  required className="form-control form-control-sm" id="nguonnuoc_ktsd" name="nguonnuoc_ktsd" value={licensePostData.nguonnuoc_ktsd} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2">
                                            <label htmlFor="vitri_laynuoc" className="form-label fw-bold font-13 m-0">3.2.V??? tr?? l???y n?????c</label>
                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="vitri_laynuoc" name="vitri_laynuoc" value={licensePostData.vitri_laynuoc} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.3.M???c ????ch khai th??c, s??? d???ng n?????c</label>
                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" value={licensePostData.mucdich_ktsd} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 p-0">
                                        <div className="mb-2 row mx-0">
                                            <div className="col-sm-12">
                                                <div className="mb-2 m-0">
                                                    <label htmlFor="luuluongnuoc_ktsd" className="form-label w-50 fw-bold font-13 m-0">3.4.L?????ng n?????c khai th??c, s??? d???ng</label>
                                                    <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm w-50" id="luuluongnuoc_ktsd" name="luuluongnuoc_ktsd" value={licensePostData.luuluongnuoc_ktsd} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="mb-2">
                                            <label htmlFor="che_do_kt" className="form-label fw-bold font-13 m-0">3.5.Ch??? ????? khai th??c, s??? d???ng</label>
                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="che_do_kt" name="che_do_kt" value={licensePostData.che_do_kt} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="mb-2">
                                            <label htmlFor="gp_thoihangiayphep" className="form-label fw-bold font-13 m-0">3.6.Th???i gian ????? ngh??? c???p ph??p</label>
                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="gp_thoigiancapphep" name="gp_thoigiancapphep" value={licensePostData.gp_thoigiancapphep} />
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_sodovitrikhuvuc_congtrinh_khaithac" className="form-label fw-bold d-block w-75 m-0 font-13">3.7.S?? ????? khu v???c v?? v??? tr?? c??ng tr??nh khai th??c n?????c k??m theo</label>
                                            <div className="w-25"><button type="button" onClick={() => this.setState({modalSoDoViTri: !this.state.modalSoDoViTri})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center justify-content-center"><FilePdfOutlined /> &nbsp; XEM FILE </button></div>
                                        </div>

                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title="????n xin c???p ph??p" width={1000} footer={null} id={licensePostData.id} visible={this.state.modalSoDoViTri} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0].tailieu_sodovitrikhuvuc_congtrinh_khaithac !== null ?
                                                <iframe width="100%" title="file gi???y ph??p" src={configData.BASE_API_URL+"/uploads/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_sodovitrikhuvuc_congtrinh_khaithac}></iframe>
                                                : <p className="text-white">Kh??ng c?? t??i li???u</p>
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-sm-12 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Gi???y t???, t??i li???u k??m theo</p>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_donxincapphep" className="form-label d-block w-75 m-0 font-13">- ????n xin c???p ph??p</label>
                                            <div className="w-25"><button type="button" onClick={() => this.setState({modalDonXin: !this.state.modalDonXin})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center justify-content-center"><FilePdfOutlined /> &nbsp; XEM FILE </button></div>
                                        </div>

                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title="????n xin c???p ph??p" width={1000} footer={null} id={licensePostData.id} visible={this.state.modalDonXin} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0].tailieu_donxincapphep !== null ?
                                                <iframe width="100%" title="file gi???y ph??p" src={configData.BASE_API_URL+"/uploads/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_donxincapphep}></iframe>
                                                : <p className="text-white">Kh??ng c?? t??i li???u</p>
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaodean_ktsd" className="form-label d-block w-75 m-0 font-13">- ????? ??n/ b??o c??o khai th??c, s??? d???ng n?????c </label>
                                            <div className="w-25"><button type="button" onClick={() => this.setState({modalBaoCaoKTSD: !this.state.modalBaoCaoKTSD})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center justify-content-center"><FilePdfOutlined /> &nbsp; XEM FILE </button></div>
                                        </div>

                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title="????? ??n/ b??o c??o khai th??c, s??? d???ng n?????c" width={1000} footer={null} id={licensePostData.id} visible={this.state.modalBaoCaoKTSD} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0].tailieu_baocaodean_ktsd !== null ?
                                                <iframe width="100%" title="file gi???y ph??p" src={configData.BASE_API_URL+"/uploads/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_baocaodean_ktsd}></iframe>
                                                : <p className="text-white">Kh??ng c?? t??i li???u</p>
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_ketqua_ptcln" className="form-label d-block w-75 m-0 font-13">- K???t qu??? ph??n t??ch ch???t l?????ng ngu???n n?????c </label>
                                            <div className="w-25"><button type="button" onClick={() => this.setState({modalPhanTichCLN: !this.state.modalPhanTichCLN})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center justify-content-center"><FilePdfOutlined /> &nbsp; XEM FILE </button></div>
                                        </div>

                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title="K???t qu??? ph??n t??ch ch???t l?????ng ngu???n n?????c" width={1000} footer={null} id={licensePostData.id} visible={this.state.modalPhanTichCLN} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0].tailieu_ketqua_ptcln !== null ?
                                                <iframe width="100%" title="file gi???y ph??p" src={configData.BASE_API_URL+"/uploads/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_ketqua_ptcln}></iframe>
                                                : <p className="text-white">Kh??ng c?? t??i li???u</p>
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaohientrangkhaithac" className="form-label d-block w-75 m-0 font-13">- B??o c??o hi???n tr???ng khai th??c </label>
                                            <div className="w-25"><button type="button" onClick={() => this.setState({modalBaoCaoHTKT: !this.state.modalBaoCaoHTKT})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center justify-content-center"><FilePdfOutlined /> &nbsp; XEM FILE </button></div>
                                        </div>

                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title="B??o c??o hi???n tr???ng khai th??c" width={1000} footer={null} id={licensePostData.id} visible={this.state.modalBaoCaoHTKT} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0].tailieu_baocaohientrangkhaithac !== null ?
                                                <iframe width="100%" title="file gi???y ph??p" src={configData.BASE_API_URL+"/uploads/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_baocaohientrangkhaithac}></iframe>
                                                : <p className="text-white">Kh??ng c?? t??i li???u</p>
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_vanban_yccd" className="form-label d-block w-75 m-0 font-13">- V??n b???n g??p ?? v?? t???ng h???p ti???p thu, gi???i tr??nh l???y ?? ki???n c???ng ?????ng</label>
                                            <div className="w-25"><button type="button" onClick={() => this.setState({modalVanBanYKCD: !this.state.modalVanBanYKCD})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center justify-content-center"><FilePdfOutlined /> &nbsp; XEM FILE </button></div>
                                        </div>

                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title="V??n b???n g??p ?? v?? t???ng h???p ti???p thu, gi???i tr??nh l???y ?? ki???n c???ng ?????ng" width={1000} footer={null} id={licensePostData.id} visible={this.state.modalVanBanYKCD} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0].tailieu_vanban_yccd !== null ?
                                                <iframe width="100%" title="file gi???y ph??p" src={configData.BASE_API_URL+"/uploads/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_vanban_yccd}></iframe>
                                                : <p className="text-white">Kh??ng c?? t??i li???u</p>
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_giaytokhac" className="form-label d-block w-75 m-0 font-13">- C??c gi???y t???, t??i li???u kh??c c?? li??n quan</label>
                                            <div className="w-25"><button type="button" onClick={() => this.setState({modalGiayToLienQuan: !this.state.modalGiayToLienQuan})} className="form-control btn btn-md btn-outline-primary form-control-sm w-100 font-13 d-flex align-items-center justify-content-center"><FilePdfOutlined /> &nbsp; XEM FILE </button></div>
                                        </div>

                                        <Modal className="modal-view-file-pdf" bodyStyle={{backgroundColor : '#323639'}} title="C??c gi???y t???, t??i li???u kh??c c?? li??n quan" width={1000} footer={null} id={licensePostData.id} visible={this.state.modalGiayToLienQuan} onCancel={this.hideModal}>
                                            <div>
                                                {licensePostData.tai_lieu && licensePostData.tai_lieu[0].tailieu_giaytokhac !== null ?
                                                <iframe width="100%" title="file gi???y ph??p" src={configData.BASE_API_URL+"/uploads/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_giaytokhac}></iframe>
                                                : <p className="text-white">Kh??ng c?? t??i li???u</p>
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
                                            <iframe width="100%" title="file gi???y ph??p" src={"http://tainguyennuocsonla.s3-ap-southeast-1.amazonaws.com/"+licensePostData.tai_lieu[0].tailieu_loaigiayphep+"/"+licensePostData.tai_lieu[0].tailieu_nam+"/"+licensePostData.tai_lieu[0].tailieu_giayphep}></iframe>
                                            : "Kh??ng c?? t??i li???u"
                                            }
                                        </div>
                                        </Modal>
                                    </>
                                }
                                <Link to="/quan-ly-cap-phep/nuoc-mat/thuy-dien" className="btn btn-danger mx-2 fw-bold font-14 d-flex align-items-center">TR??? L???I &nbsp; <RollbackOutlined /> </Link>
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