import React from 'react';
import Header from '../../../Shared/Header';
import { trackPromise } from 'react-promise-tracker';
import configData from "../../../config.json";
import { Button} from "react-bootstrap";
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import DemGiayPhep from './DemGiayPhep';
import { apiClient } from '../../../Shared/Auth';

export default class QuanLyCapPhepThamDoGiaHanDieuChinhNDD extends React.Component {
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
        document.title = "C???p m???i gi???y ph??p th??m d?? n?????c d?????i ?????t";
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
        return(
			<div className="p-0">
                <Header headTitle="????? NGH??? C???P M???I GI???Y PH??P TH??M D?? N?????C D?????I ?????T" previousLink="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">1.Th??ng tin v??? ch??? gi???y ph??p</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_ten" className="form-label fw-bold font-13 m-0">1.1. T??n ch??? gi???y ph??p</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten"  />
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_sogiaydangkykinhdoanh" className="form-label fw-bold font-13 m-0">1.2. ?????a ch???</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" />
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_diachi" className="form-label fw-bold font-13 m-0">1.3.??i???n tho???i </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" />
                                    </div>
                                </div>
                                <div className="col-sm-12 p-0 row m-0">
                                    <div className="mb-2 col-sm-2">
                                        <label htmlFor="chugiayphep_phone" className="form-label fw-bold font-13 m-0">1.4.S??? gi???y ph??p</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_phone" name="chugiayphep_phone" />
                                    </div>
                                    <div className="mb-2 col-sm-2">
                                        <label htmlFor="chugiayphep_fax" className="form-label fw-bold font-13 m-0">1.5.Ng??y k??</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_fax" name="chugiayphep_fax" />
                                    </div>
                                    <div className="mb-2 col-sm-2">
                                        <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.6.C?? hi???u l???c t??? ng??y</label>
                                        <input type="email" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" />
                                    </div>
                                    <div className="mb-2 col-sm-2">
                                        <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.7.T??n c??ng trinh</label>
                                        <input type="email" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" />
                                    </div>
                                    <div className="mb-2 col-sm-2">
                                        <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.8.Fax</label>
                                        <input type="email" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" />
                                    </div>
                                    <div className="mb-2 col-sm-2">
                                        <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.9.Email </label>
                                        <input type="email" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.N???i dung ????? ngh??? gia h???n/??i???u ch???nh gi???y ph??p: </p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_ten" className="form-label fw-bold font-13 m-0">2.1.V??? tr?? c??ng tr??nh th??m d??</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_diadiem" className="form-label fw-bold font-13 m-0">2.2.M???c ????ch th??m d??</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">2.3. Quy m?? th??m d??</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tangchuanuoc_license" className="form-label fw-bold font-13 m-0">2.4.T???ng ch???a n?????c th??m d??</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="tangchuanuoc_license" name="tangchuanuoc_license" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="sogieng_quantrac" className="form-label fw-bold font-13 m-0">2.5.L?? do ????? ngh??? gia h???n gi???y ph??p th??m d?? n?????c d?????i ?????t</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="sogieng_quantrac" name="sogieng_quantrac" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tongluuluong_ktsd_max" className="form-label fw-bold font-13 m-0">2.6.Th???i gian ????? ngh???  gia h???n/ ??i???u ch???nh gi???y ph??p</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="tongluuluong_ktsd_max" name="tongluuluong_ktsd_max" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tailieu_donxincapphep" className="form-label fw-bold font-13 m-0">2.7.S?? ????? khu v???c v?? v??? tr?? c??ng tr??nh th??m d?? k??m theo</label>
                                        <input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_donxincapphep" name="tailieu_donxincapphep" />
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
                                <div className="col-sm-6 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">3.Gi???y t???, t??i li???u n???p k??m theo</p>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_donxincapphep" className="form-label d-block w-75 m-0 font-13">- B???n sao gi???y ph??p ???? ???????c c???p</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_donxincapphep" name="tailieu_donxincapphep" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_sodokhuvucvitricongtrinhkhaithac" className="form-label d-block w-75 m-0 font-13">- B??o c??o t??nh h??nh th???c hi???n c??c quy ?????nh trong gi???y ph??p</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_sodokhuvucvitricongtrinhkhaithac" name="tailieu_sodokhuvucvitricongtrinhkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaoketquathamdo" className="form-label d-block w-75 m-0 font-13">- C??c gi???y t???, t??i li???u kh??c c?? li??n quan</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_baocaoketquathamdo" name="tailieu_baocaoketquathamdo" /></div>
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
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_dungsuthat} onChange={this.handleInputChange} required id="camket_dungsuthat" name="camket_dungsuthat" />
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
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_chaphanhdungquydinh} onChange={this.handleInputChange} required id="camket_chaphanhdungquydinh" name="camket_chaphanhdungquydinh" />
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
                                <button type="submit" className="btn btn-primary mx-2 fw-bold font-14">G???I Y??U C???U C???P M???I GI???Y PH??P</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}