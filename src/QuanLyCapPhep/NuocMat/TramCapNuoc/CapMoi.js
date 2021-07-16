import React from 'react';
import Header from '../../../Shared/Header';
import { trackPromise } from 'react-promise-tracker';
import configData from "../../../config.json";
import { Button} from "react-bootstrap";
import { PlusSquareOutlined } from '@ant-design/icons';
import DemGiayPhep from './DemGiayPhep';
import { apiClient } from '../../../Shared/Auth';

export default class QuanLyCapPhepCapMoiNuocMatTramCapNuoc extends React.Component {
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
        document.title = "Cấp mới giấy phép nước mặt - Trạm cấp nước";
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
                <Header headTitle="ĐỀ NGHỊ CẤP MỚI GIẤY PHÉP KHAI THÁC SỬ DỤNG NƯỚC MẶT CHO CÔNG TRÌNH TRẠM CẤP NƯỚC" previousLink="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc" showHeadImage={true} layoutfull={true} />
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
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten"  />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_sogiaydangkykinhdoanh" className="form-label fw-bold font-13 m-0">1.2.Số Giấy đăng ký kinh doanh </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_diachi" className="form-label fw-bold font-13 m-0">1.3.Địa chỉ  </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" />
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0 row m-0">
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_phone" className="form-label fw-bold font-13 m-0">1.4.Điện thoại   </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_phone" name="chugiayphep_phone" />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_fax" className="form-label fw-bold font-13 m-0">1.5.Fax   </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_fax" name="chugiayphep_fax" />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.6.Email   </label>
                                        <input type="email" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.Thông tin về công trình khai thác, sử dụng nước</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_ten" className="form-label fw-bold font-13 m-0">2.1.Tên công trình khai thác </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_diadiem" className="form-label fw-bold font-13 m-0">2.2.Loại hình công trình, phương thức khai thác nước</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">2.3.Vị trí công trình</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">2.4.Hiện trạng công trình</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
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
                                                            <Button variant="link" title="Tạo mới hạng mục" size="sm" className="w-100 text-primary d-flex justify-content-center align-items-center"><PlusSquareOutlined /></Button>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-center align-middle">X</th>
                                                        <th className="text-center align-middle">Y</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th className="text-center align-middle"> 
                                                            1
                                                        </th>
                                                        <td> 
                                                            <input type="text" className="form-control form-control-sm" />  
                                                        </td>
                                                        <td> 
                                                            <input type="text" className="form-control form-control-sm" />  
                                                        </td>
                                                        <td> 
                                                            <input type="text" className="form-control form-control-sm" />  
                                                        </td>
                                                        <td> 
                                                             
                                                        </td>
                                                    </tr>
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
                                                        <th className="text-center align-middle">Tên công trình</th>
                                                        <th className="text-center align-middle">Công suất máy bơm (MW)</th>
                                                        <th className="text-center align-middle">Lưu lượng khai thác (m3/h)</th>
                                                        <th className="text-center align-middle">Số máy bơm (máy)</th>
                                                        <th className="text-center align-middle">Số tổ máy (tổ)</th>
                                                        <th className="text-center align-middle">Diện tích tưới thiết kế (ha)</th>
                                                        <th className="text-center align-middle">Diện tích tưới thực tế (ha)</th>
                                                        <th className="text-center align-middle">Lưu lượng thiết kế (m3/s)</th>
                                                        <th className="text-center align-middle">Lưu lượng thực tế (m3/s)</th>
                                                        <th className="text-center align-middle">Lưu lượn cấp nước cho sinh hoạt, công nghiệp (m3/ngày đêm)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle"> 
                                                            <input type="text" className="form-control form-control-sm" /> 
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">3.Nội dung đề nghị cấp phép</p>
                                    <div className="col-sm-4">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.1.Nguồn nước khai thác, sử dụng</label>
                                            <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.2.Mục đích khai thác, sử dụng nước</label>
                                            <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.3.Lưu lượng nước khai thác, sử dụng (m3/s)</label>
                                            <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4 p-0">
                                        <div className="mb-2 row mx-0">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.4.Vị trí khai thác sử dụng nước (theo tọa độ VN2000)</label>
                                            <div className="col-sm-6">
                                                <div className="mb-2 row m-0">
                                                    <label htmlFor="mucdich_ktsd" className="form-label w-50 fw-bold font-13 m-0 text-end pe-2">Tọa độ X:</label>
                                                    <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm w-50" id="mucdich_ktsd" name="mucdich_ktsd" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-2 row m-0">
                                                    <label htmlFor="mucdich_ktsd" className="form-label w-50 fw-bold font-13 m-0 text-end pe-2">Tọa độ Y:</label>
                                                    <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm w-50" id="mucdich_ktsd" name="mucdich_ktsd" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.5.Chế độ khai thác, sử dụng</label>
                                            <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.6.Phương thức khai thác, sử lý nước</label>
                                            <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.7.Phương thức khai thác, sử dụng</label>
                                            <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.8.Thời gian đề nghị cấp phép</label>
                                            <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_donxincapphep" className="form-label fw-bold d-block w-75 m-0 font-13">3.7.Sơ đồ khu vực và vị trí công trình khai thác nước kèm theo</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_donxincapphep" name="tailieu_donxincapphep" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Giấy tờ, tài liệu nộp kèm theo</p>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_donxincapphep" className="form-label d-block w-75 m-0 font-13">Đơn xin cấp phép</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_donxincapphep" name="tailieu_donxincapphep" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_sodokhuvucvitricongtrinhkhaithac" className="form-label d-block w-75 m-0 font-13">Đề án/ báo cáo khai thác, sử dụng nước </label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_sodokhuvucvitricongtrinhkhaithac" name="tailieu_sodokhuvucvitricongtrinhkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaoketquathamdo" className="form-label d-block w-75 m-0 font-13">Kết quả phân tích chất lượng nguồn nước </label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_baocaoketquathamdo" name="tailieu_baocaoketquathamdo" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaohientrangkhaithac" className="form-label d-block w-75 m-0 font-13"> Báo cáo hiện trạng khai thác </label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_baocaohientrangkhaithac" name="tailieu_baocaohientrangkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_ketqua_ptcln" className="form-label d-block w-75 m-0 font-13">Văn bản góp ý và tổng hợp tiếp thu, giải trình lấy ý kiến cộng đồng</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_ketqua_ptcln" name="tailieu_ketqua_ptcln" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_vanban_yccd" className="form-label d-block w-75 m-0 font-13"> Các giấy tờ, tài liệu khác có liên quan</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_vanban_yccd" name="tailieu_vanban_yccd" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row col-sm-6 p-0 m-0">
                                    <div className="col-sm-12 row m-0 p-0">
                                        <div>
                                            <p className="fw-bold w-100 text-violet p-2 m-0 font-15">5.Cam kết của tổ chức/cá nhân đề nghị cấp phép</p>
                                            <div className="col-sm-12 mb-2">
                                                <div className="mb-2 d-flex alicn-items-center mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_dungsuthat} onChange={this.handleInputChange} required id="camket_dungsuthat" name="camket_dungsuthat" />
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
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_chaphanhdungquydinh} onChange={this.handleInputChange} required id="camket_chaphanhdungquydinh" name="camket_chaphanhdungquydinh" />
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
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_daguihoso} onChange={this.handleInputChange} id="camket_daguihoso" name="camket_daguihoso" />
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