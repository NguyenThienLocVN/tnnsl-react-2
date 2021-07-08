import React from 'react';
import Header from '../../../Shared/Header';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import configData from "../../../config.json";
import { Button} from "react-bootstrap";
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { apiClient, getToken } from '../../../Shared/Auth';

const GiengItem = () => {
    return <tr>
        <td>
            <input required type="text" name="sohieu[]" className="form-control form-control-sm" />
        </td>
        <td>
            <input required type="text" name="x[]" className="form-control form-control-sm" />
        </td>
        <td>
            <input required type="text" name="y[]" className="form-control form-control-sm" />
        </td>
        <td>
            <input required type="text" name="luuluongkhaithac[]" className="form-control form-control-sm" />
        </td>
        <td>
            <input required type="text" name="chedo_ktsd[]" className="form-control form-control-sm" />
        </td>
        <td>
            <input required type="text" name="chieusau_doanthunuoctu[]" className="form-control form-control-sm" />
        </td>
        <td>
            <input required type="text" name="chieusau_doanthunuocden[]" className="form-control form-control-sm" />
        </td>
        <td>
            <input required type="text" name="chieusau_mucnuoctinh[]" className="form-control form-control-sm" />
        </td>
        <td>
            <input required type="text" name="chieusau_mucnuocdong_max[]" className="form-control form-control-sm" />
        </td>
        <td>
            <input required type="text" name="tangchuanuoc[]" className="form-control form-control-sm" />
        </td>
        <td className="d-flex justify-content-center">
            <Button size="sm" variant="link" className="d-flex justify-content-center align-items-center text-danger"><DeleteOutlined /></Button>
        </td>
    </tr>
}

export default class QuanLyCapPhepCapMoiGiayPhepKTNDD extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            countLicense: [],
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
                sohieu: '', 
                x: '', 
                y: '', 
                luuluongkhaithac: '', 
                chedo_ktsd: '', 
                chieusau_doanthunuoctu: '', 
                chieusau_doanthunuocden: '', 
                chieusau_mucnuoctinh: '', 
                chieusau_mucnuocdong_max: '', 
                tangchuanuoc_gieng: '', 
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
            giengs: []
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    addGieng = () => {
        this.setState({
          giengs: [...this.state.giengs, <GiengItem />]
        })
    }

    clickHandler(e, index) {
        this.setState({ activeModal: index })
    }
    
    hideModal() {
        this.setState({ activeModal: null })
    }

    componentDidMount(){
        document.title = "Cấp mới giấy phép khai thác nước dưới đất";
        trackPromise(
            axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/dem-giay-phep", {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        countLicense: response.data.gp_ktsdnuocduoidat,
                    });
                }
            })
            .catch((error) => {
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
                        tangchuanuoc_license: this.state.licensePostData.tangchuanuoc_license, 
                        sogieng_quantrac: this.state.licensePostData.sogieng_quantrac, 
                        tongluuluong_ktsd_max: this.state.licensePostData.tongluuluong_ktsd_max, 
                        gp_thoigiancapphep: this.state.licensePostData.gp_thoigiancapphep, 
                        sohieu: this.state.licensePostData.sohieu, 
                        x: this.state.licensePostData.x, 
                        y: this.state.licensePostData.y, 
                        luuluongkhaithac: this.state.licensePostData.luuluongkhaithac, 
                        chedo_ktsd: this.state.licensePostData.chedo_ktsd, 
                        chieusau_doanthunuoctu: this.state.licensePostData.chieusau_doanthunuoctu, 
                        chieusau_doanthunuocden: this.state.licensePostData.chieusau_doanthunuocden, 
                        chieusau_mucnuoctinh: this.state.licensePostData.chieusau_mucnuoctinh, 
                        chieusau_mucnuocdong_max: this.state.licensePostData.chieusau_mucnuocdong_max, 
                        tangchuanuoc_gieng: this.state.licensePostData.tangchuanuoc_gieng, 
                        tailieu_sodokhuvucvitricongtrinh: this.state.licensePostData.tailieu_sodokhuvucvitricongtrinh,
                        tailieu_sodokhuvucvitricongtrinhkhaithac: this.state.licensePostData.tailieu_sodokhuvucvitricongtrinhkhaithac,
                        tailieu_baocaoketquathamdo: this.state.licensePostData.tailieu_baocaoketquathamdo,
                        tailieu_baocaohientrangkhaithac: this.state.licensePostData.tailieu_baocaohientrangkhaithac,
                        tailieu_ketqua_ptcln: this.state.licensePostData.tailieu_ketqua_ptcln,
                        tailieu_vanban_yccd: this.state.licensePostData.tailieu_vanban_yccd,
                        tailieu_giaytokhac: this.state.licensePostData.tailieu_giaytokhac,
                        status: this.state.licensePostData.status,
					})
					.then((response) => {
						if (response.status === 200) {
							window.location.href = '/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/quan-ly-cap-moi';
						}else{
                            alert("Hãy điền đủ thông tin ở tất cả các trường nhập dữ liệu.")
                        }
					})
					.catch((error) => {console.log(error);
						setTimeout(this.setState({errorMsg: error.response.data.error_message}), 3000);
					})
				)
            })
    };
    handleInputChange = event => {
        const { licensePostData } = this.state;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        licensePostData[name] = value;
        this.setState({
            licensePostData
        });
    }

    // Function handle add construction item (them hang muc cong trinh)
    addConstructionItem = (e) => {
        const data = new FormData(e.target);
        // var filterValue = data.get('filter');
        console.log(data);    

        e.preventDefault();
    }

    render(){
        return(
			<div className="p-0">
                <Header headTitle="ĐỀ NGHỊ CẤP MỚI GIẤY PHÉP KHAI THÁC NƯỚC DƯỚI ĐẤT" previousLink="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <div className="col-12 px-2 pb-4">
                        <div className="col-10 py-2 m-auto row m-0 justify-content-center text-center">
                                <div className="col-12 text-center p-0">
                                    <p className="fw-bold font-20 text-primary col-sm-12 mb-1">Tổng số công trình <br /> khai thác nước dưới đất </p>
                                </div>
                                <div className="col-6 text-center p-0">
                                    <p className="font-30 m-0 fw-bold">{this.state.countLicense.tat_ca_giay_phep}</p>
                                </div>
                                <div className="col-6 text-center p-0">
                                    <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/NuocDuoiDat/anhkhaithacnuocduoidat.png'} className="p-0 hydroelectric-icon border border-secondary my-auto mx-3" alt="dap-thuy-dien" />
                                </div>
                            </div>

                            <div className="col-12 py-1 mt-4 d-flex justify-content-center text-center border-top border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Tổng số công trình (TSCT)  đã vận hành</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countLicense.tat_ca_giay_phep} / {this.state.countLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/NuocDuoiDat/anhkhaithacnuocduoidat.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="dap-thuy-dien" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép đã cấp</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countLicense.giay_phep_da_cap} / {this.state.countLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép sắp hết hiệu lực</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countLicense.sap_het_hieu_luc} / {this.state.countLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing-2.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep-2" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép hết hiệu lực</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countLicense.het_hieu_luc} / {this.state.countLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing-3.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep-3" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Chưa có giấy phép</p>
                                    <p className="font-18 m-0 fw-bold text-danger"> {this.state.countLicense.chua_phe_duyet} / {this.state.countLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/expire.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="het-han" />
                            </div>

                            
                            <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/cap-moi" style={{backgroundColor: "rgb(0 152 208)"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Cấp mới giấy phép</Link>
                            <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/quan-ly-cap-moi" style={{backgroundColor: "#1EC0D7"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Quản lý cấp phép</Link>
                            <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/gia-han" style={{backgroundColor: "#41A59F"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Gia hạn giấy phép</Link>
                            <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/dieu-chinh" style={{backgroundColor: "#C5E287"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Điều chỉnh giấy phép</Link>
                            <Link to="#" style={{backgroundColor: "#E2D987"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Hướng dẫn sử dụng</Link>
                        </div>
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">1.Tổ chức/Cá nhân đề nghị CP</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_ten" className="form-label fw-bold m-0">1.1.Tên tổ chức/cá nhân </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten"  />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_sogiaydangkykinhdoanh" className="form-label fw-bold m-0">1.2.Số Giấy đăng ký kinh doanh </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_diachi" className="form-label fw-bold m-0">1.3.Địa chỉ  </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" />
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0 row m-0">
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_phone" className="form-label fw-bold m-0">1.4.Điện thoại   </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_phone" name="chugiayphep_phone" />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_fax" className="form-label fw-bold m-0">1.5.Fax   </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_fax" name="chugiayphep_fax" />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_email" className="form-label fw-bold m-0">1.6.Email   </label>
                                        <input type="email" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.Nội dung đề nghị cấp phép: </p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_ten" className="form-label fw-bold m-0">2.1.Tên công trình khai thác </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_diadiem" className="form-label fw-bold m-0">2.1.Vị trí công trình khai thác </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="mucdich_ktsd" className="form-label fw-bold m-0">2.2.Mục đích khai thác, sử dụng nước</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tangchuanuoc_license" className="form-label fw-bold m-0">2.3.Tầng chứa nước khai thác  </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="tangchuanuoc_license" name="tangchuanuoc_license" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="sogieng_quantrac" className="form-label fw-bold m-0">2.4.Số giếng khai thác   </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="sogieng_quantrac" name="sogieng_quantrac" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tongluuluong_ktsd_max" className="form-label fw-bold m-0">2.5.Tổng lượng nước khai thác (m3/ngày đêm) </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="tongluuluong_ktsd_max" name="tongluuluong_ktsd_max" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="gp_thoigiancapphep" className="form-label fw-bold m-0">2.6.Thời gian đề nghị cấp phép</label>
                                        <input type="date" onChange={this.handleInputChange} required className="form-control form-control-sm" id="gp_thoigiancapphep" name="gp_thoigiancapphep" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tailieu_sodokhuvucvitricongtrinh" className="form-label d-block m-0 fw-bold">2.7.Sơ đồ khu vực và vị trí công trình khai thác nước kèm theo</label>
                                       <input type="file" className="form-control form-control-sm" id="tailieu_sodokhuvucvitricongtrinh" name="tailieu_sodokhuvucvitricongtrinh" />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="mb-2 row m-0">
                                        <label className="form-label fw-bold col-12 p-0">2.8.Số hiệu, vị trí và thông số của công trình khai thác</label>
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
                                                                <Button variant="link" title="Tạo mới hạng mục" size="sm" className="w-100 text-primary d-flex justify-content-center align-items-center" onClick={this.addGieng}><PlusSquareOutlined /></Button>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.giengs}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">3.Giấy tờ, tài liệu nộp kèm theo</p>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_donxincapphep" className="form-label d-block w-75 m-0 font-13">- Đơn xin cấp phép</label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_donxincapphep" name="tailieu_donxincapphep" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_sodokhuvucvitricongtrinhkhaithac" className="form-label d-block w-75 m-0 font-13">- Sơ đồ khu vực và vị trí công trình khai thác nước dưới đất</label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_sodokhuvucvitricongtrinhkhaithac" name="tailieu_sodokhuvucvitricongtrinhkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaoketquathamdo" className="form-label d-block w-75 m-0 font-13">- Báo cáo kết quả thăm dò đánh giá trữ lượng nước dưới đất</label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_baocaoketquathamdo" name="tailieu_baocaoketquathamdo" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaohientrangkhaithac" className="form-label d-block w-75 m-0 font-13">- Báo cáo hiện trạng khai thác </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_baocaohientrangkhaithac" name="tailieu_baocaohientrangkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_ketqua_ptcln" className="form-label d-block w-75 m-0 font-13">- Phiếu kết quả phân tích chất lượng nguồn nước dưới đất </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_ketqua_ptcln" name="tailieu_ketqua_ptcln" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_vanban_yccd" className="form-label d-block w-75 m-0 font-13">- Văn bản góp ý và tổng hợp tiếp thu, giải trình lấy ý kiến cộng đồng  </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_vanban_yccd" name="tailieu_vanban_yccd" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_giaytokhac" className="form-label d-block w-75 m-0 font-13">- Các giấy tờ, tài liệu khác có liên quan </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_giaytokhac" name="tailieu_giaytokhac" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row col-sm-6 p-0 m-0">
                                    <div className="col-sm-12 row m-0 p-0">
                                        <div>
                                            <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Cam kết của tổ chức/cá nhân đề nghị cấp phép</p>
                                            <div className="col-sm-12 mt-4">
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
                                            <div className="col-sm-12 mt-4">
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
                                            <div className="col-sm-12 mt-4">
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
                                <button type="submit" className="btn btn-primary mx-2 fw-bold font-14">GỬI GIẤY PHÉP</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}