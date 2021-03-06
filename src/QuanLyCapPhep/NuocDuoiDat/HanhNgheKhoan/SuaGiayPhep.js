import React from 'react';
import Header from '../../../Shared/Header';
import axios from "axios";
import { trackPromise } from 'react-promise-tracker';
import configData from "../../../config.json";
import { Button} from "react-bootstrap";
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import DemGiayPhep from './DemGiayPhep';
import { apiClient, getToken, getUser } from '../../../Shared/Auth';


export default class QuanLyCapPhepSuaGiayPhepKhoanNDD extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            activeModal: null,
            licenseData: [],
            licensePostData:{
                chugiayphep_ten: '',
                chugiayphep_sogiaydangkykinhdoanh: '', 
                chugiayphep_diachi: '', 
                chugiayphep_phone: '', 
                chugiayphep_fax: '', 
                chugiayphep_email: '', 
                congtrinh_diadiem: '',
                congtrinh_ten: '',
                mucdich_ktsd: '', 
                tangchuanuoc_license: '', 
                sogieng_quantrac: '', 
                tongluuluong_ktsd_max: '', 
                gp_thoigiancapphep: '', 
                tailieu_sodokhuvucvitricongtrinh: '',
                tailieu_sodokhuvucvitricongtrinhkhaithac: '',
                tailieu_baocaoketquathamdo: '',
                tailieu_baocaohientrangkhaithac: '',
                tailieu_ketqua_ptcln: '',
                tailieu_vanban_yccd: '',
                tailieu_giaytokhac: '',
                status: 0,
                camket_dungsuthat: false,
                camket_chaphanhdungquydinh: false,
                camket_daguihoso: false,
            },
            giengs: [{sohieu: "",
            x: "",
            y: "",
            luuluongkhaithac: "",
            chedo_ktsd: "",
            chieusau_doanthunuoctu: "",
            chieusau_doanthunuocden: "",
            chieusau_mucnuoctinh: "",
            tangchuanuoc: "",
            chieusau_mucnuocdong_max: ""}]
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
        document.title = "S???a gi???y ph??p th??m d?? n?????c d?????i ?????t";
        trackPromise(axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/giay-phep-tham-do/"+this.props.match.params.id_gp, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        licenseData: response.data[0],
                    });
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            })
        )
    }

    // Get curent status of license
    getCurrentStatus = (status) => {
        if(status === 1)
        {
            return '???? ???????c c???p ph??p';
        }else if (status === 2){
            return '??ang l???y ?? ki???n th???m ?????nh';
        }else if (status === 3)
            return 'Ho??n th??nh h??? s?? c???p ph??p';
        else{
            return 'N???p h??? s??';
        }
    }

    // Display class for each license status
    statusClassName = (status) => {
        if(status === 1)
        {
            return "fw-bold text-success";
        }else{
            return "fw-bold text-danger";
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
        e.target.className += " was-validated";

        const tailieu_sodokhuvucvitricongtrinh = document.querySelector('#tailieu_sodokhuvucvitricongtrinh');
        const tailieu_donxincapphep = document.querySelector('#tailieu_donxincapphep');
        const formdata = new FormData();
        formdata.append('tailieu_sodokhuvucvitricongtrinh', tailieu_sodokhuvucvitricongtrinh.files[0]);
        formdata.append('tailieu_donxincapphep', tailieu_donxincapphep.files[0]);

        console.log( tailieu_donxincapphep.files[0]);

		apiClient.get('/sanctum/csrf-cookie')
            .then(response => {
                trackPromise(
					apiClient.post(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/cap-moi-giay-phep", {
                        chugiayphep_ten: this.state.licensePostData.chugiayphep_ten,
                        chugiayphep_sogiaydangkykinhdoanh: this.state.licensePostData.chugiayphep_sogiaydangkykinhdoanh, 
                        chugiayphep_diachi: this.state.licensePostData.chugiayphep_diachi, 
                        chugiayphep_phone: this.state.licensePostData.chugiayphep_phone, 
                        chugiayphep_fax: this.state.licensePostData.chugiayphep_fax, 
                        chugiayphep_email: this.state.licensePostData.chugiayphep_email, 
                        congtrinh_diadiem: this.state.licensePostData.congtrinh_diadiem, 
                        congtrinh_ten: this.state.licensePostData.congtrinh_ten, 
                        mucdich_ktsd: this.state.licensePostData.mucdich_ktsd, 
                        tangchuanuoc: this.state.licensePostData.tangchuanuoc_license, 
                        sogieng_quantrac: this.state.licensePostData.sogieng_quantrac, 
                        tongluuluong_ktsd_max: this.state.licensePostData.tongluuluong_ktsd_max, 
                        gp_thoigiancapphep: this.state.licensePostData.gp_thoigiancapphep, 
                        giengs: this.state.giengs,
                        formdata,
                        status: this.state.licensePostData.status,
					})
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

    render(){
        const user = getUser();
        return(
			<div className="p-0">
                <Header headTitle="????? NGH??? CH???NH S???A GI???Y PH??P H??NH NGH??? KHOAN N?????C D?????I ?????T" previousLink="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/quan-ly-cap-moi" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">1.T??? ch???c/C?? nh??n ????? ngh??? CP</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_ten" className="form-label fw-bold font-13 m-0">1.1.T??n t??? ch???c/c?? nh??n </label>
                                        <input type="text" value={this.state.licenseData.chugiayphep_ten || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten"  />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_sogiaydangkykinhdoanh" className="form-label fw-bold font-13 m-0">1.2.S??? Gi???y ????ng k?? kinh doanh </label>
                                        <input type="text" value={this.state.licenseData.chugiayphep_sogiaydangkykinhdoanh || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_diachi" className="form-label fw-bold font-13 m-0">1.3.?????a ch???  </label>
                                        <input type="text" value={this.state.licenseData.chugiayphep_diachi || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" />
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0 row m-0">
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_phone" className="form-label fw-bold font-13 m-0">1.4.??i???n tho???i   </label>
                                        <input type="text" value={this.state.licenseData.chugiayphep_phone || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_phone" name="chugiayphep_phone" />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_fax" className="form-label fw-bold font-13 m-0">1.5.Fax</label>
                                        <input type="text" value={this.state.licenseData.chugiayphep_fax || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_fax" name="chugiayphep_fax" />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.6.Email</label>
                                        <input type="email" value={this.state.licenseData.chugiayphep_email || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.N???i dung ????? ngh??? c???p ph??p:</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_ten" className="form-label fw-bold font-13 m-0">2.1.V??? tr?? c??ng tr??nh th??m d??</label>
                                        <input type="text" value={this.state.licenseData.congtrinh_diadiem || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="mucdichthamdo" className="form-label fw-bold font-13 m-0">2.2.M???c ????ch th??m d??</label>
                                        <input type="text" value={this.state.licenseData.mucdichthamdo || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdichthamdo" name="mucdichthamdo" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="quymothamdo" className="form-label fw-bold font-13 m-0">2.3. Quy m?? th??m d??</label>
                                        <input type="text" value={this.state.licenseData.quymothamdo || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="quymothamdo" name="quymothamdo" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tangchuanuoc_license" className="form-label fw-bold font-13 m-0">2.4.T???ng ch???a n?????c th??m d??</label>
                                        <input type="text" value={this.state.licenseData.tangchuanuoc || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="tangchuanuoc_license" name="tangchuanuoc_license" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="thoigian_thicong" className="form-label fw-bold font-13 m-0">2.5.Th???i gian thi c??ng</label>
                                        <input type="text" value={this.state.licenseData.thoigian_batdau_vanhanh || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="thoigian_thicong" name="thoigian_thicong" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="gp_thoigiancapphep" className="form-label fw-bold font-13 m-0">2.6.Th???i gian ????? ngh??? c???p ph??p</label>
                                        <input type="text" value={this.state.licenseData.gp_thoigiancapphep || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="gp_thoigiancapphep" name="gp_thoigiancapphep" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tailieu_dkhuvucvavitricongtrinh" className="form-label fw-bold font-13 m-0">2.7.S?? ????? khu v???c v?? v??? tr?? c??ng tr??nh th??m d?? k??m theo</label>
                                        <input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_dkhuvucvavitricongtrinh" name="tailieu_dkhuvucvavitricongtrinh" />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="mb-2 row m-0">
                                        <label className="form-label fw-bold font-13 col-12 p-0">2.8.S??? hi???u, v??? tr?? v?? th??ng s??? c???a c??ng tr??nh khai th??c</label>
                                        <div className="col-sm-12 p-0 table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center align-middle" rowSpan="2">S??? hi???u</th>
                                                        <th className="text-center align-middle" colSpan="2">T???a ????? (VN2000, kinh tuy???n tr???c,...m??i chi???u,...)</th>
                                                        <th className="text-center align-middle" rowSpan="2">L??u l?????ng(m3/ng??y ????m)</th>
                                                        <th className="text-center align-middle" rowSpan="2">Ch??? ????? khai th??c (gi???/ng??y ????m)</th>
                                                        <th className="text-center align-middle" colSpan="2">Chi???u s??u ??o???n thu n?????c(m)</th>
                                                        <th className="text-center align-middle" rowSpan="2">Chi???u s??u m???c n?????c t??nh(m)</th>
                                                        <th className="text-center align-middle" rowSpan="2">Chi???u s??u m???c n?????c ?????ng l???n nh???t cho ph??p (m)</th>
                                                        <th className="text-center align-middle" rowSpan="2">T???ng ch???a n?????c khai th??c</th>
                                                        <th className="text-center align-middle text-nowrap">Thao T??c</th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-center align-middle">X</th>
                                                        <th className="text-center align-middle">Y</th>
                                                        <th className="text-center align-middle">T???</th>
                                                        <th className="text-center align-middle">?????n</th>
                                                        <th className="text-center align-middle">
                                                            <div className="w-100">
                                                                <Button variant="link" title="T???o m???i h???ng m???c" size="sm" className="w-100 text-primary d-flex justify-content-center align-items-center" onClick={this.handleAddGieng}><PlusSquareOutlined /></Button>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.giengs.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>
                                                                <input required type="text" value={this.state.giengs[i].sohieu} name="sohieu" onChange={(e) => this.handleChangeGieng(i, e)} className="form-control form-control-sm" />
                                                            </td>
                                                            <td>
                                                                <input required type="text" value={this.state.giengs[i].x} name="x" onChange={(e) => this.handleChangeGieng(i, e)} className="form-control form-control-sm" />
                                                            </td>
                                                            <td>
                                                                <input required type="text" value={this.state.giengs[i].y} name="y" onChange={(e) => this.handleChangeGieng(i, e)} className="form-control form-control-sm" />
                                                            </td>
                                                            <td>
                                                                <input required type="text" value={this.state.giengs[i].luuluongkhaithac} name="luuluongkhaithac" onChange={(e) => this.handleChangeGieng(i, e)} className="form-control form-control-sm" />
                                                            </td>
                                                            <td>
                                                                <input required type="text" value={this.state.giengs[i].chedo_ktsd} name="chedo_ktsd" onChange={(e) => this.handleChangeGieng(i, e)} className="form-control form-control-sm" />
                                                            </td>
                                                            <td>
                                                                <input required type="text" value={this.state.giengs[i].chieusau_doanthunuoctu} name="chieusau_doanthunuoctu" onChange={(e) => this.handleChangeGieng(i, e)} className="form-control form-control-sm" />
                                                            </td>
                                                            <td>
                                                                <input required type="text" value={this.state.giengs[i].chieusau_doanthunuocden} name="chieusau_doanthunuocden" onChange={(e) => this.handleChangeGieng(i, e)} className="form-control form-control-sm" />
                                                            </td>
                                                            <td>
                                                                <input required type="text" value={this.state.giengs[i].chieusau_mucnuoctinh} name="chieusau_mucnuoctinh" onChange={(e) => this.handleChangeGieng(i, e)} className="form-control form-control-sm" />
                                                            </td>
                                                            <td>
                                                                <input required type="text" value={this.state.giengs[i].chieusau_mucnuocdong_max} name="chieusau_mucnuocdong_max" onChange={(e) => this.handleChangeGieng(i, e)} className="form-control form-control-sm" />
                                                            </td>
                                                            <td>
                                                                <input required type="text" value={this.state.giengs[i].tangchuanuoc} name="tangchuanuoc" onChange={(e) => this.handleChangeGieng(i, e)} className="form-control form-control-sm" />
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
                                <div className="col-sm-12 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">3.Gi???y t???, t??i li???u n???p k??m theo</p>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_donxincapphep" className="form-label d-block w-75 m-0 font-13">- ????n xin c???p ph??p</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_donxincapphep" name="tailieu_donxincapphep" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_sodokhuvucvitricongtrinhkhaithac" className="form-label d-block w-75 m-0 font-13">- S?? ????? khu v???c v?? v??? tr?? c??ng tr??nh th??m d?? n?????c d?????i ?????t</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_sodokhuvucvitricongtrinhkhaithac" name="tailieu_sodokhuvucvitricongtrinhkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaodeanthamdo" className="form-label d-block w-75 m-0 font-13">- B??o c??o ????? ??n th??m d?? n?????c d?????i ?????t</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_baocaodeanthamdo" name="tailieu_baocaodeanthamdo" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_thietkethamdo" className="form-label d-block w-75 m-0 font-13">- Thi???t k??? th??m d??</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_thietkethamdo" name="tailieu_thietkethamdo" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_khac" className="form-label d-block w-75 m-0 font-13">- C??c gi???y t???, t??i li???u kh??c c?? li??n quan</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_khac" name="tailieu_khac" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row col-sm-6 p-0 m-0">
                                    <div className="col-sm-12 row m-0 p-0">
                                        <div>
                                            <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Cam k???t c???a t??? ch???c/c?? nh??n ????? ngh??? c???p ph??p</p>
                                            <div className="col-sm-12">
                                                <div className="mb-2 d-flex alicn-items-center mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_dungsuthat || ""} onChange={this.handleInputChange} required id="camket_dungsuthat" name="camket_dungsuthat" />
                                                            <label htmlFor="camket_dungsuthat"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_dungsuthat" className="form-label d-block m-0 font-13 fw-bold mx-2">????ng s??? th???t</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="mb-2 d-flex mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_chaphanhdungquydinh || ""} onChange={this.handleInputChange} required id="camket_chaphanhdungquydinh" name="camket_chaphanhdungquydinh" />
                                                            <label htmlFor="camket_chaphanhdungquydinh"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_chaphanhdungquydinh" className="form-label d-block m-0 font-13 fw-bold mx-2">Ch???p h??nh ????ng, ?????y ????? c??c quy ?????nh</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="mb-2 d-flex mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_daguihoso || ""} onChange={this.handleInputChange} id="camket_daguihoso" name="camket_daguihoso" />
                                                            <label htmlFor="camket_daguihoso"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_daguihoso" className="form-label d-block m-0 font-13 fw-bold mx-2">???? g???i m???t (01) b??? h??? s?? t???i S??? T??i nguy??n v?? M??i tr?????ng</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 row m-0 p-0">
                                    <div>
                                        <p className="fw-bold w-100 text-violet p-2 m-0 font-15">5.T??nh tr???ng h??? s?? ????? ngh??? c???p ph??p</p>
                                        <span>Tr???ng th??i hi???n t???i: <span className={this.statusClassName(this.state.licenseData.status)}>{this.getCurrentStatus(this.state.licenseData.status)}</span></span>
                                        {user.role === "admin" ? 
                                            <div className="d-flex my-2 align-items-center">
                                                <span>S???a tr???ng th??i th??nh : &nbsp;</span>
                                                <select className="form-select font-13" name="status" style={{ width: 250 } || ""} onChange={this.handleInputChange} >
                                                    <option defaultValue={0}>N???p h??? s??</option>
                                                    <option defaultValue={2}>??ang l???y ?? ki???n th???m ?????nh</option>
                                                    <option defaultValue={3}>Ho??n th??nh h??? s?? c???p ph??p</option>
                                                    <option defaultValue={1}>???? ???????c c???p ph??p</option>
                                                </select>
                                            </div>
                                        : ""}
                                    </div>
                                </div>
                            </div>
                            <div className="pb-4 text-center col-sm-12">
                                <hr />
                                <button type="submit" className="btn btn-primary mx-2 fw-bold font-14">G???I Y??U C???U C???P M???I GI???Y PH??P</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}