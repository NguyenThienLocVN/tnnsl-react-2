import React from 'react';
import Header from '../../../Shared/Header';
import { trackPromise } from 'react-promise-tracker';
import configData from "../../../config.json";
import DemGiayPhep from './DemGiayPhep';
import { apiClient } from '../../../Shared/Auth';

export default class QuanLyCapPhepGiaHanDieuChinhXaThaiKhuDanCu extends React.Component {
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
        document.title = "Gia hạn/ điều chỉnh giấy phép xả thải khu dân cư";
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
					apiClient.post(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/cap-moi-giay-phep", {
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
                <Header headTitle="ĐỀ NGHỊ GIA HẠN, ĐIỀU CHỈNH GIẤY PHÉP XẢ THẢI KHU DÂN CƯ/ LÀNG NGHỀ" previousLink="/quan-ly-cap-phep/xa-thai-khu-dan-cu" showHeadImage={true} layoutfull={true} />
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
                                        <input type="text" required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten"  />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_sogiaydangkykinhdoanh" className="form-label fw-bold font-13 m-0">1.2.Số Giấy đăng ký kinh doanh </label>
                                        <input type="text" required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_diachi" className="form-label fw-bold font-13 m-0">1.3.Địa chỉ  </label>
                                        <input type="text" required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" />
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0 row m-0">
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_phone" className="form-label fw-bold font-13 m-0">1.4.Điện thoại   </label>
                                        <input type="text" required className="form-control form-control-sm" id="chugiayphep_phone" name="chugiayphep_phone" />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_fax" className="form-label fw-bold font-13 m-0">1.5.Fax   </label>
                                        <input type="text" required className="form-control form-control-sm" id="chugiayphep_fax" name="chugiayphep_fax" />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.6.Email   </label>
                                        <input type="email" required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.Thông tin về cơ sở xả nước thải:</p>
                                <div className="col-sm-8">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_ten" className="form-label fw-bold font-13 m-0">2.1.Loại hình, quy mô xả nước thải </label>
                                        <input type="text" required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" />
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_diadiem" className="form-label fw-bold font-13 m-0">2.2.Năm vận hành </label>
                                        <input type="text" required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" />
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div className="mb-2">
                                        <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">2.3.Công suất xử lý nước thải </label>
                                        <input type="text" required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">3.Nội dung đề nghị gia hạn, điều chỉnh:</p>
                                <div className="col-sm-4">
                                    <div className="mb-2">
                                        <label htmlFor="xathai_nguontiepnhan" className="form-label fw-bold font-13 m-0">3.1.Nguồn nước tiếp nhận nước thải</label>
                                        <input type="text" className="form-control form-control-sm" id="xathai_nguontiepnhan" name="xathai_nguontiepnhan" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="mb-2">
                                        <label htmlFor="xathai_vitri" className="form-label fw-bold font-13 m-0">3.2.Vị trí xả nước thải</label>
                                        <input type="text" className="form-control form-control-sm" id="xathai_vitri" name="xathai_vitri" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="mb-2">
                                        <label className="form-label fw-bold font-13 m-0">3.3.Tọa độ vị trí xả nước thải (hệ tọa độ VN2000)</label>
                                        <div className="row m-0">
                                            <div className="col-sm-6 d-flex align-items-center">
                                                <label htmlFor="xathai_toado_x" className="form-label fw-bold font-13 m-0 w-25 text-end pe-2">X:</label>
                                                <input type="text" className="form-control form-control-sm w-75" id="xathai_toado_x" name="xathai_toado_x" />
                                            </div>
                                            <div className="col-sm-6 d-flex align-items-center">
                                                <label htmlFor="xathai_toado_y" className="form-label fw-bold font-13 m-0 w-25 text-end pe-2">Y:</label>
                                                <input type="text" className="form-control form-control-sm w-75" id="xathai_toado_y" name="xathai_toado_y" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="mb-2">
                                        <label htmlFor="xathai_phuongthuc" className="form-label fw-bold font-13 m-0">3.4.Phương thức xả nước thải</label>
                                        <input type="text" className="form-control form-control-sm" id="xathai_phuongthuc" name="xathai_phuongthuc" />
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="mb-2">
                                        <label htmlFor="xathai_chedo" className="form-label fw-bold font-13 m-0">3.5.Chế độ xả nước thải</label>
                                        <input type="text" className="form-control form-control-sm" id="xathai_chedo" name="xathai_chedo" />
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="mb-2">
                                        <label htmlFor="xathai_luuluongxa_trungbinh" className="form-label fw-bold font-13 m-0">3.6.Lưu lượng xả trung bình (m3/ngày đêm)</label>
                                        <input type="text" className="form-control form-control-sm" id="xathai_luuluongxa_trungbinh" name="xathai_luuluongxa_trungbinh" />
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="mb-2">
                                        <label htmlFor="xathai_luuluongxa_max" className="form-label fw-bold font-13 m-0">3.7.Lưu lượng xả lớn nhất (m3/ngày đêm)</label>
                                        <input type="text" className="form-control form-control-sm" id="xathai_luuluongxa_max" name="xathai_luuluongxa_max" />
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div className="mb-2">
                                        <label htmlFor="xathai_héokq" className="form-label fw-bold font-13 m-0">3.8.Hệ số Kq</label>
                                        <input type="text" className="form-control form-control-sm" id="xathai_héokq" name="xathai_héokq" />
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div className="mb-2">
                                        <label htmlFor="xathai_héokf" className="form-label fw-bold font-13 m-0">3.9.Hệ số Kf</label>
                                        <input type="text" className="form-control form-control-sm" id="xathai_héokf" name="xathai_héokf" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="mb-2">
                                        <label htmlFor="xathai_quychuanquocgia" className="form-label fw-bold font-13 m-0">3.10.Quy chuẩn quốc gia về chất lượng nước thải</label>
                                        <input type="text" className="form-control form-control-sm" id="xathai_quychuanquocgia" name="xathai_quychuanquocgia" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="mb-2">
                                        <label htmlFor="xathai_thoigiancapphep" className="form-label fw-bold font-13 m-0">3.11.Thời gian đề nghị gia hạn, điều chỉnh</label>
                                        <input type="text" className="form-control form-control-sm" id="xathai_thoigiancapphep" name="xathai_thoigiancapphep" />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="mb-2">
                                        <label htmlFor="tailieu_donxincapphep" className="form-label fw-bold font-13 m-0">3.12.Chất lượng nước thải</label>
                                        <div className="col-sm-12 p-0 table-responsive">
                                            <table className="table table-bordered"> 
                                                <thead>
                                                    <tr>
                                                        <th className="text-center align-middle">TT</th>
                                                        <th className="text-center align-middle">Chỉ tiêu</th>
                                                        <th className="text-center align-middle">Đơn vị</th>
                                                        <th className="text-center align-middle">Giá trị giới hạn tối đa</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">1</td>
                                                        <td className="text-center align-middle p-0">Nhiệt độ</td>
                                                        <td className="text-center align-middle p-0">&ordm;C</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">2</td>
                                                        <td className="text-center align-middle p-0">Màu</td>
                                                        <td className="text-center align-middle p-0">Pt/Co</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">3</td>
                                                        <td className="text-center align-middle p-0">pH</td>
                                                        <td className="text-center align-middle p-0"> _ </td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">4</td>
                                                        <td className="text-center align-middle p-0">BOD₅(20&ordm;C)</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">5</td>
                                                        <td className="text-center align-middle p-0">COD</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">6</td>
                                                        <td className="text-center align-middle p-0">Chất lắng lơ lửng(TSS)</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">7</td>
                                                        <td className="text-center align-middle p-0">Asen</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">8</td>
                                                        <td className="text-center align-middle p-0">Thủy ngân</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">9</td>
                                                        <td className="text-center align-middle p-0">Chì</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">10</td>
                                                        <td className="text-center align-middle p-0">Cadimi</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">11</td>
                                                        <td className="text-center align-middle p-0">Crom(III)</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">12</td>
                                                        <td className="text-center align-middle p-0">Đồng</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">13</td>
                                                        <td className="text-center align-middle p-0">Kẽm</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">14</td>
                                                        <td className="text-center align-middle p-0">Mangan</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">15</td>
                                                        <td className="text-center align-middle p-0">Sắt</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">16</td>
                                                        <td className="text-center align-middle p-0">Tổng Xianua</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">17</td>
                                                        <td className="text-center align-middle p-0">Tổng dầu mỡ</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">18</td>
                                                        <td className="text-center align-middle p-0">Xunfua</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">19</td>
                                                        <td className="text-center align-middle p-0">Amoni(Tính theo N)</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">20</td>
                                                        <td className="text-center align-middle p-0">Tổng nitơ</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">21</td>
                                                        <td className="text-center align-middle p-0">Tổng Phốt pho(Tính theo N)</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">22</td>
                                                        <td className="text-center align-middle p-0">Clorua</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">23</td>
                                                        <td className="text-center align-middle p-0">Clo dư</td>
                                                        <td className="text-center align-middle p-0">mg/l</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center align-middle p-0">24</td>
                                                        <td className="text-center align-middle p-0">Coliform</td>
                                                        <td className="text-center align-middle p-0">NPN/100ml</td>
                                                        <td className="text-center align-middle p-0">
                                                            <input type="text" className="form-control form-control-sm" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           <div className="col-sm-12">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Lý do đề nghị gia hạn/ điều chỉnh giấy phép:</p>
                                <div className="col-sm-12">
                                    <textarea rows="4" className="form-control" />
                                </div>
                           </div>
                           <div className="col-sm-12">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">5.Nội dung đề nghị gia hạn/ điều chỉnh giấy phép:</p>
                                <div className="col-sm-12">
                                    <textarea rows="4" className="form-control" />
                                </div>
                           </div>
                            <div className="row m-0">
                                <div className="col-sm-6 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">6.Giấy tờ, tài liệu nộp kèm theo</p>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_donxincapphep" className="form-label d-block w-75 m-0 font-13">- Đơn xin cấp phép</label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_donxincapphep" name="tailieu_donxincapphep" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_sodokhuvucvitricongtrinhkhaithac" className="form-label d-block w-75 m-0 font-13">- Sơ đồ khu vực và vị trí công trình thăm dò nước dưới đất</label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_sodokhuvucvitricongtrinhkhaithac" name="tailieu_sodokhuvucvitricongtrinhkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaoketquathamdo" className="form-label d-block w-75 m-0 font-13">- Báo cáo đề án thăm dò nước dưới đất</label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_baocaoketquathamdo" name="tailieu_baocaoketquathamdo" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaohientrangkhaithac" className="form-label d-block w-75 m-0 font-13">- Thiết kế thăm dò </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_baocaohientrangkhaithac" name="tailieu_baocaohientrangkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_ketqua_ptcln" className="form-label d-block w-75 m-0 font-13">- Các giấy tờ, tài liệu khác có liên quan</label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_ketqua_ptcln" name="tailieu_ketqua_ptcln" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 row m-0 p-0">
                                    <div>
                                        <p className="fw-bold w-100 text-violet p-2 m-0 font-15">7.Cam kết của tổ chức/cá nhân đề nghị cấp phép</p>
                                        <div className="col-sm-12 mb-2">
                                            <div className="mb-2 d-flex alicn-items-center mx-0">
                                                <div className="d-flex justify-content-end pe-3">
                                                    <div className="round">
                                                        <input type="checkbox" required id="camket_dungsuthat" name="camket_dungsuthat" />
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
                                                        <input type="checkbox" required id="camket_chaphanhdungquydinh" name="camket_chaphanhdungquydinh" />
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
                                                        <input type="checkbox" id="camket_daguihoso" name="camket_daguihoso" />
                                                        <label htmlFor="camket_daguihoso"></label>
                                                    </div>
                                                </div>
                                                <label htmlFor="camket_daguihoso" className="form-label d-block m-0 font-13 fw-bold mx-2">Đã gửi một (01) bộ hồ sơ tới Sở Tài nguyên và Môi trường</label>
                                            </div>
                                        </div>
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