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

export default class QuanLyCapPhepKhaiThacSuaGiayPhepNDD extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            activeModal: null,
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
        document.title = "S???a gi???y ph??p khai th??c n?????c d?????i ?????t";
        trackPromise(axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/giay-phep-khai-thac/"+this.props.match.params.id_gp, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        licensePostData: response.data[0],
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
                            alert("H??y ??i???n ????? th??ng tin ??? t???t c??? c??c tr?????ng nh???p d??? li???u.")
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


    render(){
        const licensePostData = this.state.licensePostData;
        const giengData = this.state.giengData;
        const user = getUser();
        return(
			<div className="p-0">
                <Header headTitle="????? NGH??? C???P M???I GI???Y PH??P KHAI TH??C N?????C D?????I ?????T" previousLink="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/quan-ly-cap-moi" showHeadImage={true} layoutfull={true} />
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
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten" value={licensePostData.chugiayphep_ten || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_sogiaydangkykinhdoanh" className="form-label fw-bold font-13 m-0">1.2.S??? Gi???y ????ng k?? kinh doanh </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" value={licensePostData.chugiayphep_sogiaydangkykinhdoanh || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_diachi" className="form-label fw-bold font-13 m-0">1.3.?????a ch???  </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" value={licensePostData.chugiayphep_diachi || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0 row m-0">
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_phone" className="form-label fw-bold font-13 m-0">1.4.??i???n tho???i   </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_phone" name="chugiayphep_phone" value={licensePostData.chugiayphep_phone || ''} />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_fax" className="form-label fw-bold font-13 m-0">1.5.Fax   </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_fax" name="chugiayphep_fax" value={licensePostData.chugiayphep_fax || ''} />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.6.Email   </label>
                                        <input type="email" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" value={licensePostData.chugiayphep_email || ''} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.N???i dung ????? ngh??? c???p ph??p: </p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_ten" className="form-label fw-bold font-13 m-0">2.1.T??n c??ng tr??nh khai th??c </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" value={licensePostData.congtrinh_ten || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_diadiem" className="form-label fw-bold font-13 m-0">2.1.V??? tr?? c??ng tr??nh khai th??c </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" value={licensePostData.congtrinh_diadiem || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">2.2.M???c ????ch khai th??c, s??? d???ng n?????c</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" value={licensePostData.mucdich_ktsd || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tangchuanuoc_license" className="form-label fw-bold font-13 m-0">2.3.T???ng ch???a n?????c khai th??c  </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="tangchuanuoc_license" name="tangchuanuoc_license" value={licensePostData.tangchuanuoc || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="sogieng_quantrac" className="form-label fw-bold font-13 m-0">2.4.S??? gi???ng khai th??c   </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="sogieng_quantrac" name="sogieng_quantrac" value={licensePostData.sogieng_quantrac || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tongluuluong_ktsd_max" className="form-label fw-bold font-13 m-0">2.5.T???ng l?????ng n?????c khai th??c (m3/ng??y ????m) </label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="tongluuluong_ktsd_max" name="tongluuluong_ktsd_max" value={licensePostData.tongluuluong_ktsd_max || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="gp_thoigiancapphep" className="form-label fw-bold font-13 m-0">2.6.Th???i gian ????? ngh??? c???p ph??p</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="gp_thoigiancapphep" name="gp_thoigiancapphep" value={licensePostData.gp_thoigiancapphep || ''} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tailieu_sodokhuvucvitricongtrinh" className="form-label d-block m-0 fw-bold">2.7.S?? ????? khu v???c v?? v??? tr?? c??ng tr??nh khai th??c n?????c k??m theo</label>
                                       <input type="file" className="form-control form-control-sm" id="tailieu_sodokhuvucvitricongtrinh" name="tailieu_sodokhuvucvitricongtrinh" />
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
                                                                <Button variant="link" title="T???o m???i h???ng m???c" size="sm" className="w-100 text-primary d-flex justify-content-center align-items-center" onClick={this.addGieng}><PlusSquareOutlined /></Button>
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
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">3.Gi???y t???, t??i li???u n???p k??m theo</p>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_donxincapphep" className="form-label d-block w-75 m-0 font-13">- ????n xin c???p ph??p</label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_donxincapphep" name="tailieu_donxincapphep" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_sodokhuvucvitricongtrinhkhaithac" className="form-label d-block w-75 m-0 font-13">- S?? ????? khu v???c v?? v??? tr?? c??ng tr??nh khai th??c n?????c d?????i ?????t</label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_sodokhuvucvitricongtrinhkhaithac" name="tailieu_sodokhuvucvitricongtrinhkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaoketquathamdo" className="form-label d-block w-75 m-0 font-13">- B??o c??o k???t qu??? th??m d?? ????nh gi?? tr??? l?????ng n?????c d?????i ?????t</label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_baocaoketquathamdo" name="tailieu_baocaoketquathamdo" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaohientrangkhaithac" className="form-label d-block w-75 m-0 font-13">- B??o c??o hi???n tr???ng khai th??c </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_baocaohientrangkhaithac" name="tailieu_baocaohientrangkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_ketqua_ptcln" className="form-label d-block w-75 m-0 font-13">- Phi???u k???t qu??? ph??n t??ch ch???t l?????ng ngu???n n?????c d?????i ?????t </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_ketqua_ptcln" name="tailieu_ketqua_ptcln" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_vanban_yccd" className="form-label d-block w-75 m-0 font-13">- V??n b???n g??p ?? v?? t???ng h???p ti???p thu, gi???i tr??nh l???y ?? ki???n c???ng ?????ng  </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_vanban_yccd" name="tailieu_vanban_yccd" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_giaytokhac" className="form-label d-block w-75 m-0 font-13">- C??c gi???y t???, t??i li???u kh??c c?? li??n quan </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="tailieu_giaytokhac" name="tailieu_giaytokhac" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row col-sm-12 p-0 m-0">
                                    <div className="col-sm-6 row m-0 p-0">
                                        <div>
                                            <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Cam k???t c???a t??? ch???c/c?? nh??n ????? ngh??? c???p ph??p</p>
                                            <div className="col-sm-12 mb-4">
                                                <div className="mb-2 d-flex alicn-items-center mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" onClick={this.handleInputChange} checked={licensePostData.camket_dungsuthat || ''} onChange={this.handleInputChange} required id="camket_dungsuthat" name="camket_dungsuthat" />
                                                            <label htmlFor="camket_dungsuthat"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_dungsuthat" className="form-label d-block m-0 font-13 fw-bold mx-2">????ng s??? th???t</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 mb-4">
                                                <div className="mb-2 d-flex mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" onClick={this.handleInputChange} checked={licensePostData.camket_chaphanhdungquydinh || ''} onChange={this.handleInputChange} required id="camket_chaphanhdungquydinh" name="camket_chaphanhdungquydinh" />
                                                            <label htmlFor="camket_chaphanhdungquydinh"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_chaphanhdungquydinh" className="form-label d-block m-0 font-13 fw-bold mx-2">Ch???p h??nh ????ng, ?????y ????? c??c quy ?????nh</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 mb-4">
                                                <div className="mb-2 d-flex mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" onClick={this.handleInputChange} checked={licensePostData.camket_daguihoso || ''} onChange={this.handleInputChange} id="camket_daguihoso" name="camket_daguihoso" />
                                                            <label htmlFor="camket_daguihoso"></label>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="camket_daguihoso" className="form-label d-block m-0 font-13 fw-bold mx-2">???? g???i m???t (01) b??? h??? s?? t???i S??? T??i nguy??n v?? M??i tr?????ng</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 row m-0 p-0">
                                        <div>
                                            <p className="fw-bold w-100 text-violet p-2 m-0 font-15">5.T??nh tr???ng h??? s?? ????? ngh??? c???p ph??p</p>
                                            <span>Tr???ng th??i hi???n t???i: <span className={this.statusClassName(licensePostData.status)}>{this.getCurrentStatus(licensePostData.status)}</span></span>
                                            {user.role === "admin" ? 
                                                <div className="d-flex my-2 align-items-center">
                                                    <span>S???a tr???ng th??i th??nh : &nbsp;</span>
                                                    <select className="form-select font-13" name="status" style={{ width: 250 }} onChange={this.handleInputChange} >
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
                            </div>
                            <div className="pb-4 text-center col-sm-12">
                                <hr />
                                {user.role === "admin" ? <button type="submit" className="btn btn-primary mx-2 fw-bold font-14">S???A GI???Y PH??P</button> : <button type="submit" className="btn btn-primary mx-2 fw-bold font-14">G???I Y??U C???U S???A GI???Y PH??P</button>}
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}