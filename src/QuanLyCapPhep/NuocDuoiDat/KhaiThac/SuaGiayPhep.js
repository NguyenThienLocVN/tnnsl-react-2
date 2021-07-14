import React from 'react';
import Header from '../../../Shared/Header';
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import configData from "../../../config.json";
import { Button} from "react-bootstrap";
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { apiClient, getToken, getUser } from '../../../Shared/Auth';
import DemGiayPhep from './DemGiayPhep';

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
            activeModal: null,
            licenseData: [],
            giengData: [],
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
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/giay-phep-khai-thac/"+this.props.match.params.id_gp, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        licenseData: response.data[0],
                        giengData: response.data[0].hang_muc_ct,
                    });
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            })
        )
    }

    // Gui form du lieu
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
    // Khi doi du lieu trong o input setState
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

    // Khi click checkbox doi state checkbox
    handleClickChangeCheckbox = (e) => {
        const { licenseData } = this.state;
        const target = e.target;
        const value = target.checked;
        const name = target.name;
        licenseData[name] = value;
        this.setState({
            licenseData
        });
    }

    // Function handle add construction item (them hang muc cong trinh)
    addConstructionItem = (e) => {
        const data = new FormData(e.target);
        // var filterValue = data.get('filter');
        console.log(data);    

        e.preventDefault();
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


    render(){
        const licenseData = this.state.licenseData;
        const giengData = this.state.giengData;
        const user = getUser();
        return(
			<div className="p-0">
                <Header headTitle="ĐỀ NGHỊ CẤP MỚI GIẤY PHÉP KHAI THÁC NƯỚC DƯỚI ĐẤT" previousLink="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/quan-ly-cap-moi" showHeadImage={true} layoutfull={true} />
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
                                        <label htmlFor="chugiayphep_ten" className="form-label fw-bold m-0">1.1.Tên tổ chức/cá nhân </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten" value={licenseData.chugiayphep_ten || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_sogiaydangkykinhdoanh" className="form-label fw-bold m-0">1.2.Số Giấy đăng ký kinh doanh </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" value={licenseData.chugiayphep_sogiaydangkykinhdoanh || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_diachi" className="form-label fw-bold m-0">1.3.Địa chỉ  </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" value={licenseData.chugiayphep_diachi || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0 row m-0">
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_phone" className="form-label fw-bold m-0">1.4.Điện thoại   </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_phone" name="chugiayphep_phone" value={licenseData.chugiayphep_phone || ''} />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_fax" className="form-label fw-bold m-0">1.5.Fax   </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_fax" name="chugiayphep_fax" value={licenseData.chugiayphep_fax || ''} />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_email" className="form-label fw-bold m-0">1.6.Email   </label>
                                        <input type="email" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" value={licenseData.chugiayphep_email || ''} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.Nội dung đề nghị cấp phép: </p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_ten" className="form-label fw-bold m-0">2.1.Tên công trình khai thác </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" value={licenseData.congtrinh_ten || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_diadiem" className="form-label fw-bold m-0">2.1.Vị trí công trình khai thác </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" value={licenseData.congtrinh_diadiem || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="mucdich_ktsd" className="form-label fw-bold m-0">2.2.Mục đích khai thác, sử dụng nước</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" value={licenseData.mucdich_ktsd || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tangchuanuoc_license" className="form-label fw-bold m-0">2.3.Tầng chứa nước khai thác  </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="tangchuanuoc_license" name="tangchuanuoc_license" value={licenseData.tangchuanuoc || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="sogieng_quantrac" className="form-label fw-bold m-0">2.4.Số giếng khai thác   </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="sogieng_quantrac" name="sogieng_quantrac" value={licenseData.sogieng_quantrac || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tongluuluong_ktsd_max" className="form-label fw-bold m-0">2.5.Tổng lượng nước khai thác (m3/ngày đêm) </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="tongluuluong_ktsd_max" name="tongluuluong_ktsd_max" value={licenseData.tongluuluong_ktsd_max || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="gp_thoigiancapphep" className="form-label fw-bold m-0">2.6.Thời gian đề nghị cấp phép</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="gp_thoigiancapphep" name="gp_thoigiancapphep" value={licenseData.gp_thoigiancapphep || ''} />
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
                                                    {giengData.map((e, i)=> {
                                                        return(
                                                            <tr key={i}>
                                                                <td>
                                                                    <input required defaultValue={e.sohieu} type="text" name="sohieu[]" className="form-control form-control-sm" />
                                                                </td>
                                                                <td>
                                                                    <input required defaultValue={e.x} type="text" name="x[]" className="form-control form-control-sm" />
                                                                </td>
                                                                <td>
                                                                    <input required defaultValue={e.y} type="text" name="y[]" className="form-control form-control-sm" />
                                                                </td>
                                                                <td>
                                                                    <input required defaultValue={e.luuluongkhaithac} type="text" name="luuluongkhaithac[]" className="form-control form-control-sm" />
                                                                </td>
                                                                <td>
                                                                    <input required defaultValue={e.chedo_ktsd} type="text" name="chedo_ktsd[]" className="form-control form-control-sm" />
                                                                </td>
                                                                <td>
                                                                    <input required defaultValue={e.chieusau_doanthunuoctu} type="text" name="chieusau_doanthunuoctu[]" className="form-control form-control-sm" />
                                                                </td>
                                                                <td>
                                                                    <input required defaultValue={e.chieusau_doanthunuocden} type="text" name="chieusau_doanthunuocden[]" className="form-control form-control-sm" />
                                                                </td>
                                                                <td>
                                                                    <input required defaultValue={e.chieusau_mucnuoctinh} type="text" name="chieusau_mucnuoctinh[]" className="form-control form-control-sm" />
                                                                </td>
                                                                <td>
                                                                    <input required defaultValue={e.chieusau_mucnuocdong_max} type="text" name="chieusau_mucnuocdong_max[]" className="form-control form-control-sm" />
                                                                </td>
                                                                <td>
                                                                    <input required defaultValue={e.tangchuanuoc} type="text" name="tangchuanuoc[]" className="form-control form-control-sm" />
                                                                </td>
                                                                <td className="d-flex justify-content-center">
                                                                    <Button size="sm" variant="link" className="d-flex justify-content-center align-items-center text-danger"><DeleteOutlined /></Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                    {this.state.giengs}
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
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_donxincapphep" name="tailieu_donxincapphep" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_sodokhuvucvitricongtrinhkhaithac" className="form-label d-block w-75 m-0 font-13">- Sơ đồ khu vực và vị trí công trình khai thác nước dưới đất</label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_sodokhuvucvitricongtrinhkhaithac" name="tailieu_sodokhuvucvitricongtrinhkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaoketquathamdo" className="form-label d-block w-75 m-0 font-13">- Báo cáo kết quả thăm dò đánh giá trữ lượng nước dưới đất</label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_baocaoketquathamdo" name="tailieu_baocaoketquathamdo" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaohientrangkhaithac" className="form-label d-block w-75 m-0 font-13">- Báo cáo hiện trạng khai thác </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_baocaohientrangkhaithac" name="tailieu_baocaohientrangkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_ketqua_ptcln" className="form-label d-block w-75 m-0 font-13">- Phiếu kết quả phân tích chất lượng nguồn nước dưới đất </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_ketqua_ptcln" name="tailieu_ketqua_ptcln" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_vanban_yccd" className="form-label d-block w-75 m-0 font-13">- Văn bản góp ý và tổng hợp tiếp thu, giải trình lấy ý kiến cộng đồng  </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_vanban_yccd" name="tailieu_vanban_yccd" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_giaytokhac" className="form-label d-block w-75 m-0 font-13">- Các giấy tờ, tài liệu khác có liên quan </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_giaytokhac" name="tailieu_giaytokhac" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row col-sm-12 p-0 m-0">
                                    <div className="col-sm-6 row m-0 p-0">
                                        <div>
                                            <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Cam kết của tổ chức/cá nhân đề nghị cấp phép</p>
                                            <div className="col-sm-12 mb-4">
                                                <div className="mb-2 d-flex alicn-items-center mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" onClick={this.handleClickChangeCheckbox} checked={licenseData.camket_dungsuthat || ''} onChange={this.handleInputChange} required id="camket_dungsuthat" name="camket_dungsuthat" />
                                                            <label htmlFor="camket_dungsuthat"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_dungsuthat" className="form-label d-block m-0 font-13 fw-bold mx-2">Đúng sự thật</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 mb-4">
                                                <div className="mb-2 d-flex mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" onClick={this.handleClickChangeCheckbox} checked={licenseData.camket_chaphanhdungquydinh || ''} onChange={this.handleInputChange} required id="camket_chaphanhdungquydinh" name="camket_chaphanhdungquydinh" />
                                                            <label htmlFor="camket_chaphanhdungquydinh"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_chaphanhdungquydinh" className="form-label d-block m-0 font-13 fw-bold mx-2">Chấp hành đúng, đầy đủ các quy định</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 mb-4">
                                                <div className="mb-2 d-flex mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" onClick={this.handleClickChangeCheckbox} checked={licenseData.camket_daguihoso || ''} onChange={this.handleInputChange} id="camket_daguihoso" name="camket_daguihoso" />
                                                            <label htmlFor="camket_daguihoso"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_daguihoso" className="form-label d-block m-0 font-13 fw-bold mx-2">Đã gửi một (01) bộ hồ sơ tới Sở Tài nguyên và Môi trường</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 row m-0 p-0">
                                            <div>
                                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">5.Tình trạng hồ sơ đề nghị cấp phép</p>
                                                <span>Trạng thái hiện tại: <span className={this.statusClassName(licenseData.status)}>{this.getCurrentStatus(licenseData.status)}</span></span>
                                                {user.role === "admin" ? 
                                                    <div className="d-flex my-2 align-items-center">
                                                        <span>Sửa trạng thái thành : &nbsp;</span>
                                                        <select className="form-select font-13" name="status" style={{ width: 250 }} onChange={this.handleInputChange} >
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
                            </div>
                            <div className="pb-4 text-center col-sm-12">
                                <hr />
                                {user.role === "admin" ? <button type="submit" className="btn btn-primary mx-2 fw-bold font-14">SỬA GIẤY PHÉP</button> : <button type="submit" className="btn btn-primary mx-2 fw-bold font-14">GỬI YÊU CẦU SỬA GIẤY PHÉP</button>}
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}