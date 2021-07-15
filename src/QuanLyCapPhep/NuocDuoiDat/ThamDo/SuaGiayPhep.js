import React from 'react';
import Header from '../../../Shared/Header';
import axios from "axios";
import { trackPromise } from 'react-promise-tracker';
import configData from "../../../config.json";
import { Button} from "react-bootstrap";
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import DemGiayPhep from './DemGiayPhep';
import { apiClient, getToken, getUser } from '../../../Shared/Auth';


export default class QuanLyCapPhepThamDoSuaGiayPhepNDD extends React.Component {
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
        document.title = "Sửa giấy phép thăm dò nước dưới đất";
        trackPromise(
            axios
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
            return 'Đã được cấp phép';
        }else if (status === 2){
            return 'Đang lấy ý kiến thẩm định';
        }else if (status === 3)
            return 'Hoàn thành hồ sơ cấp phép';
        else{
            return 'Nộp hồ sơ';
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
                <Header headTitle="ĐỀ NGHỊ CẤP CHỈNH SỬA GIẤY PHÉP THĂM DÒ NƯỚC DƯỚI ĐẤT" previousLink="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/quan-ly-cap-moi" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">1.Tổ chức/Cá nhân đề nghị CP</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_ten" className="form-label fw-bold font-13 m-0">1.1.Tên tổ chức/cá nhân </label>
                                        <input type="text" value={this.state.licenseData.chugiayphep_ten || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten"  />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_sogiaydangkykinhdoanh" className="form-label fw-bold font-13 m-0">1.2.Số Giấy đăng ký kinh doanh </label>
                                        <input type="text" value={this.state.licenseData.chugiayphep_sogiaydangkykinhdoanh || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_diachi" className="form-label fw-bold font-13 m-0">1.3.Địa chỉ  </label>
                                        <input type="text" value={this.state.licenseData.chugiayphep_diachi || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" />
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0 row m-0">
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_phone" className="form-label fw-bold font-13 m-0">1.4.Điện thoại   </label>
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
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.Nội dung đề nghị cấp phép:</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_ten" className="form-label fw-bold font-13 m-0">2.1.Vị trí công trình thăm dò</label>
                                        <input type="text" value={this.state.licenseData.congtrinh_diadiem || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="mucdichthamdo" className="form-label fw-bold font-13 m-0">2.2.Mục đích thăm dò</label>
                                        <input type="text" value={this.state.licenseData.mucdichthamdo || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdichthamdo" name="mucdichthamdo" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="quymothamdo" className="form-label fw-bold font-13 m-0">2.3. Quy mô thăm dò</label>
                                        <input type="text" value={this.state.licenseData.quymothamdo || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="quymothamdo" name="quymothamdo" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tangchuanuoc_license" className="form-label fw-bold font-13 m-0">2.4.Tầng chứa nước thăm dò</label>
                                        <input type="text" value={this.state.licenseData.tangchuanuoc || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="tangchuanuoc_license" name="tangchuanuoc_license" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="thoigian_thicong" className="form-label fw-bold font-13 m-0">2.5.Thời gian thi công</label>
                                        <input type="text" value={this.state.licenseData.thoigian_batdau_vanhanh || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="thoigian_thicong" name="thoigian_thicong" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="gp_thoigiancapphep" className="form-label fw-bold font-13 m-0">2.6.Thời gian đề nghị cấp phép</label>
                                        <input type="text" value={this.state.licenseData.gp_thoigiancapphep || ""} onChange={this.handleInputChange} required className="form-control form-control-sm" id="gp_thoigiancapphep" name="gp_thoigiancapphep" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tailieu_dkhuvucvavitricongtrinh" className="form-label fw-bold font-13 m-0">2.7.Sơ đồ khu vực và vị trí công trình thăm dò kèm theo</label>
                                        <input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_dkhuvucvavitricongtrinh" name="tailieu_dkhuvucvavitricongtrinh" />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="mb-2 row m-0">
                                        <label className="form-label fw-bold font-13 col-12 p-0">2.8.Số hiệu, vị trí và thông số của công trình khai thác</label>
                                        <div className="col-sm-12 p-0 table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center align-middle" rowSpan="2">Số hiệu</th>
                                                        <th className="text-center align-middle" colSpan="2">Tọa độ (VN2000, kinh tuyến trục,...múi chiếu,...)</th>
                                                        <th className="text-center align-middle" rowSpan="2">Lưu lượng(m3/ngày đêm)</th>
                                                        <th className="text-center align-middle" rowSpan="2">Chế độ khai thác (giờ/ngày đêm)</th>
                                                        <th className="text-center align-middle" colSpan="2">Chiều sâu đoạn thu nước(m)</th>
                                                        <th className="text-center align-middle" rowSpan="2">Chiều sâu mực nước tĩnh(m)</th>
                                                        <th className="text-center align-middle" rowSpan="2">Chiều sâu mực nước động lớn nhất cho phép (m)</th>
                                                        <th className="text-center align-middle" rowSpan="2">Tầng chứa nước khai thác</th>
                                                        <th className="text-center align-middle text-nowrap">Thao Tác</th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-center align-middle">X</th>
                                                        <th className="text-center align-middle">Y</th>
                                                        <th className="text-center align-middle">Từ</th>
                                                        <th className="text-center align-middle">Đến</th>
                                                        <th className="text-center align-middle">
                                                            <div className="w-100">
                                                                <Button variant="link" title="Tạo mới hạng mục" size="sm" className="w-100 text-primary d-flex justify-content-center align-items-center" onClick={this.handleAddGieng}><PlusSquareOutlined /></Button>
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
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">3.Giấy tờ, tài liệu nộp kèm theo</p>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_donxincapphep" className="form-label d-block w-75 m-0 font-13">- Đơn xin cấp phép</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_donxincapphep" name="tailieu_donxincapphep" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_sodokhuvucvitricongtrinhkhaithac" className="form-label d-block w-75 m-0 font-13">- Sơ đồ khu vực và vị trí công trình thăm dò nước dưới đất</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_sodokhuvucvitricongtrinhkhaithac" name="tailieu_sodokhuvucvitricongtrinhkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaodeanthamdo" className="form-label d-block w-75 m-0 font-13">- Báo cáo đề án thăm dò nước dưới đất</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_baocaodeanthamdo" name="tailieu_baocaodeanthamdo" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_thietkethamdo" className="form-label d-block w-75 m-0 font-13">- Thiết kế thăm dò</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_thietkethamdo" name="tailieu_thietkethamdo" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_khac" className="form-label d-block w-75 m-0 font-13">- Các giấy tờ, tài liệu khác có liên quan</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_khac" name="tailieu_khac" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row col-sm-6 p-0 m-0">
                                    <div className="col-sm-12 row m-0 p-0">
                                        <div>
                                            <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Cam kết của tổ chức/cá nhân đề nghị cấp phép</p>
                                            <div className="col-sm-12">
                                                <div className="mb-2 d-flex alicn-items-center mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_dungsuthat || ""} onChange={this.handleInputChange} required id="camket_dungsuthat" name="camket_dungsuthat" />
                                                            <label htmlFor="camket_dungsuthat"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_dungsuthat" className="form-label d-block m-0 font-13 fw-bold mx-2">Đúng sự thật</label>
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
                                                    <label htmlFor="camket_chaphanhdungquydinh" className="form-label d-block m-0 font-13 fw-bold mx-2">Chấp hành đúng, đầy đủ các quy định</label>
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
                                                    <label htmlFor="camket_daguihoso" className="form-label d-block m-0 font-13 fw-bold mx-2">Đã gửi một (01) bộ hồ sơ tới Sở Tài nguyên và Môi trường</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 row m-0 p-0">
                                    <div>
                                        <p className="fw-bold w-100 text-violet p-2 m-0 font-15">5.Tình trạng hồ sơ đề nghị cấp phép</p>
                                        <span>Trạng thái hiện tại: <span className={this.statusClassName(this.state.licenseData.status)}>{this.getCurrentStatus(this.state.licenseData.status)}</span></span>
                                        {user.role === "admin" ? 
                                            <div className="d-flex my-2 align-items-center">
                                                <span>Sửa trạng thái thành : &nbsp;</span>
                                                <select className="form-select font-13" name="status" style={{ width: 250 } || ""} onChange={this.handleInputChange} >
                                                    <option defaultValue={0}>Nộp hồ sơ</option>
                                                    <option defaultValue={2}>Đang lấy ý kiến thẩm định</option>
                                                    <option defaultValue={3}>Hoàn thành hồ sơ cấp phép</option>
                                                    <option defaultValue={1}>Đã được cấp phép</option>
                                                </select>
                                            </div>
                                        : ""}
                                    </div>
                                </div>
                            </div>
                            <div className="pb-4 text-center col-sm-12">
                                <hr />
                                <button type="submit" className="btn btn-primary mx-2 fw-bold font-14">GỬI YÊU CẦU CẤP MỚI GIẤY PHÉP</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}