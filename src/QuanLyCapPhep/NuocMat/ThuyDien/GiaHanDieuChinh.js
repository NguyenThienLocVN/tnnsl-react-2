import React from 'react';
import Header from '../../../Shared/Header';
import { trackPromise } from 'react-promise-tracker';
import configData from "../../../config.json";
import { FilePdfOutlined } from '@ant-design/icons';
import DemGiayPhep from './DemGiayPhep';
import { apiClient } from '../../../Shared/Auth';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import axios from "axios";
import { getToken, removeUserSession } from '../../../Shared/Auth';
import { Modal } from 'antd';

// Font
import Roboto from '../../../Shared/fonts/Roboto-Light.ttf';
import RobotoBold from '../../../Shared/fonts/Roboto-Bold.ttf';
import RobotoItalic from '../../../Shared/fonts/Roboto-LightItalic.ttf';

Font.register({
    family: "Roboto",
    src: Roboto
});

Font.register({
    family: "RobotoBold",
    src: RobotoBold
});

Font.register({
    family: "RobotoItalic",
    src: RobotoItalic
});

const styles = StyleSheet.create({
    page: {
        margin: 15,
        padding: 15,
        fontFamily: "Roboto"
    },
    displayFlexRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    displayFlexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    textEnd: {
        textAlign: 'right'
    }
});

export default class QuanLyCapPhepGiaHanDieuChinhNuocMatThuyDien extends React.Component {
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
        document.title = "Gia h???n - ??i???u ch???nh gi???y ph??p khai th??c n?????c d?????i ?????t";

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
        const GenerateRequestFile = ({data}) => (
            <Document>
                <Page size="A4" style={styles.page} >
                    <View style={[styles.textEnd]}>
                        <Text style={{ fontSize: 12, paddingRight: 15, paddingBottom: 10, fontFamily: 'RobotoBold' }}>M???u 06</Text>
                    </View>
                    <View style={{ textAlign: 'center', fontFamily: 'RobotoBold' }}>
                        <Text style={{ fontSize: 12 }}>C???NG H??A X?? H???I CH??? NGH??A VI???T NAM</Text>
                        <Text style={{ fontSize: 12 }}>?????c l???p - T??? do - H???nh ph??c</Text>
                        <Text style={{ fontSize: 12 }}>--------------</Text>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={{ textAlign: 'center', fontFamily: 'RobotoBold', marginBottom: 10 }}>
                        <Text style={{ fontSize: 12, marginBottom: 5}}>????N ????? NGH??? GIA H???N/??I???U CH???NH GI???Y PH??P KHAI TH??C, S??? D???NG N?????C M???T</Text>
                        <Text style={{ fontSize: 12 }}>K??nh g???i: ........................................... (1)</Text>
                    </View>
                    <View style={{ fontFamily: 'RobotoBold' }}>
                        <Text style={{ fontSize: 12, marginBottom: 3}}>1. Th??ng tin v??? ch??? gi???y ph??p: </Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15 }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>1.1. T??n ch??? gi???y ph??p: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.chugiayphep_ten}</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15, flexWrap: 'wrap' }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>1.2. ?????a ch???: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.chugiayphep_diachi}</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15, flexWrap: 'wrap' }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>1.3. ??i???n tho???i: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.chugiayphep_phone}</Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>&nbsp; &nbsp; Fax: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.chugiayphep_fax}</Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>&nbsp; &nbsp; Email: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.chugiayphep_email}</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15, flexWrap: 'wrap' }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>1.4. Gi???y ph??p khai th??c, s??? d???ng n?????c m???t s???: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>......</Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>&nbsp; &nbsp; ng??y </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>......</Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>&nbsp; &nbsp; th??ng </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>......</Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>&nbsp; &nbsp; n??m </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>......</Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>&nbsp; &nbsp; do </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>...... c???p</Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>; th???i h???n c???a gi???y ph??p</Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}> ....... </Text>
                    </View>
                    <View style={{ fontFamily: 'RobotoBold' }}>
                        <Text style={{ fontSize: 12, marginBottom: 3}}>2. L?? do ????? ngh??? gia h???n/??i???u ch???nh gi???y ph??p: </Text>
                    </View>
                    <View style={{ marginBottom: 3, paddingRight: 15 }}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>- ............ </Text>
                    </View>
                    <View style={{ fontFamily: 'RobotoBold' }}>
                        <Text style={{ fontSize: 12, marginBottom: 3}}>3. Th???i gian ????? ngh??? gia h???n/n???i dung ????? ngh??? ??i???u ch???nh gi???y ph??p: </Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15 }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>- Th???i h???n ????? ngh??? gia h???n: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>.....</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15, flexWrap: 'wrap' }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>- N???i dung ????? ngh??? ??i???u ch???nh: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>......</Text>
                    </View>
                    <View style={{ fontFamily: 'RobotoBold' }}>
                        <Text style={{ fontSize: 12, marginBottom: 3 }}>4. Gi???y t???, t??i li???u n???p k??m theo ????n n??y g???m c??: </Text>
                    </View>
                    <View style={{ marginBottom: 3, paddingRight: 15 }}>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- B??o c??o hi???n tr???ng khai th??c, s??? d???ng n?????c m???t v?? t??nh h??nh th???c hi???n gi???y ph??p. </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- K???t qu??? ph??n t??ch ch???t l?????ng ngu???n n?????c (kh??ng qu?? ba (03) th??ng t??nh ?????n th???i ??i???m n???p h??? s??). </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- B???n sao gi???y ph??p ???? ???????c c???p. </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- C??c gi???y t???, t??i li???u kh??c c?? li??n quan (n???u c??).</Text>
                    </View>
                    <View style={{ fontFamily: 'RobotoBold' }}>
                        <Text style={{ fontSize: 12, marginBottom: 3 }}>5. Cam k???t c???a ch??? gi???y ph??p: </Text>
                    </View>
                    <View style={{ marginBottom: 3, paddingRight: 15 }}>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- (Ch??? gi???y ph??p) cam ??oan c??c n???i dung, th??ng tin trong ????n n??y v?? c??c gi???y t???, t??i li???u g???i k??m theo l?? ????ng s??? th???t v?? xin ho??n to??n ch???u tr??ch nhi???m tr?????c ph??p lu???t. </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- (Ch??? gi???y ph??p) cam k???t ch???p h??nh ????ng, ?????y ????? c??c quy ?????nh c???a Gi???y ph??p v?? th???c hi???n ?????y ????? c??c ngh??a v??? quy ?????nh t???i Kho???n 2 ??i???u 43 c???a Lu???t t??i nguy??n n?????c v?? quy ?????nh c???a ph??p lu???t c?? li??n quan. </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- (Ch??? gi???y ph??p) ???? g???i m???t (01) b??? h??? s?? t???i S??? T??i nguy??n v?? M??i tr?????ng t???nh S??n La (10). </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>????? ngh??? (t??n c?? quan c???p ph??p) xem x??t, gia h???n/??i???u ch???nh gi???y ph??p khai th??c, s??? d???ng n?????c m???t cho (t??n ch??? gi???y ph??p)./. </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: 15, textAlign: 'center' }}>
                        <Text style={{ fontSize: 11, marginBottom: 3, fontFamily: 'RobotoItalic' }}> ........ ng??y....... th??ng....... n??m........ </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}> T??? ch???c, c?? nh??n ????? ngh??? c???p ph??p </Text>
                        <Text style={{ fontSize: 10, marginBottom: 3, fontFamily: 'RobotoItalic' }}> K??, ghi r?? h??? t??n (????ng d???u n???u c??) </Text>
                    </View>
                </Page>
            </Document>
        )

        const { licensePostData } = this.state;

        return(
			<div className="p-0">
                <Header headTitle="????? NGH??? ????? NGH??? GIA H???N/ ??I???U CH???NH GI???Y PH??P KHAI TH??C S??? D???NG N?????C M???T CHO C??NG TR??NH TH???Y ??I???N" previousLink="/quan-ly-cap-phep/nuoc-mat/thuy-dien" showHeadImage={true} layoutfull={true} />
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
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi"  value={licensePostData.chugiayphep_diachi} />
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
                                        <label htmlFor="congtrinh_diadiem" className="form-label fw-bold font-13 m-0">2.2.Lo???i h??nh c??ng tr??nh, ph????ng th???c khai th??c n?????c</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="phuongthuc_kt" name="phuongthuc_kt" value={licensePostData.phuongthuc_kt} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">2.3.V??? tr?? c??ng tr??nh</label>
                                        <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" value={licensePostData.congtrinh_diadiem} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">2.4.Hi???n tr???ng c??ng tr??nh</label>
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
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.1.Ngu???n n?????c khai th??c, s??? d???ng</label>
                                            <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="nguonnuoc_ktsd" name="nguonnuoc_ktsd" value={licensePostData.nguonnuoc_ktsd} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.2.V??? tr?? l???y n?????c</label>
                                            <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="vitri_laynuoc" name="vitri_laynuoc" value={licensePostData.vitri_laynuoc} />
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
                                            <input type="text" readOnly onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="gp_thoihangiayphep" name="gp_thoihangiayphep" value={licensePostData.gp_thoihangiayphep} />
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
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.L?? do ????? ngh??? gia h???n/ ??i???u ch???nh gi???y ph??p</p>
                                    <div className="col-sm-12">
                                        <textarea rows="4" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-sm-12 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">5.Th???i gian ????? ngh??? gia h???n/n???i dung ????? ngh??? ??i???u ch???nh gi???y ph??p</p>
                                    <div className="col-sm-12">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">5.1.Th???i h???n ????? ngh??? gia h???n</label>
                                            <input type="text" onChange={this.handleInputChange} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">5.2.N???i dung ????? ngh??? ??i???u ch???nh</label>
                                            <textarea rows="4" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">6.Gi???y t???, t??i li???u n???p k??m theo</p>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                        <span htmlFor="tailieu_donxincapphep" className="form-label d-flex w-75 m-0 font-13 align-items-center"><span>- ????n xin c???p ph??p</span> &nbsp;(<PDFDownloadLink document={<GenerateRequestFile data={this.state.licensePostData} />} className="mx-2 fw-bold font-14 d-flex align-items-center justify-content-center" fileName="Don-de-nghi-gia-han-dieu-chinh-giay-phep-nuoc-mat.pdf"><FilePdfOutlined /> &nbsp; In PDF</PDFDownloadLink>)</span>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_donxincapphep" name="tailieu_donxincapphep" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_sodokhuvucvitricongtrinhkhaithac" className="form-label d-block w-75 m-0 font-13">- ????? ??n/ b??o c??o khai th??c, s??? d???ng n?????c </label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_sodokhuvucvitricongtrinhkhaithac" name="tailieu_sodokhuvucvitricongtrinhkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaoketquathamdo" className="form-label d-block w-75 m-0 font-13">- K???t qu??? ph??n t??ch ch???t l?????ng ngu???n n?????c </label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_baocaoketquathamdo" name="tailieu_baocaoketquathamdo" /></div>
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
                                            <label htmlFor="tailieu_ketqua_ptcln" className="form-label d-block w-75 m-0 font-13">- V??n b???n g??p ?? v?? t???ng h???p ti???p thu, gi???i tr??nh l???y ?? ki???n c???ng ?????ng</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_ketqua_ptcln" name="tailieu_ketqua_ptcln" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_vanban_yccd" className="form-label d-block w-75 m-0 font-13">- C??c gi???y t???, t??i li???u kh??c c?? li??n quan</label>
                                            <div className="w-25"><input type="file" onChange={this.handleInputChange} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_vanban_yccd" name="tailieu_vanban_yccd" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row col-sm-6 p-0 m-0">
                                    <div className="col-sm-12 row m-0 p-0">
                                        <div>
                                            <p className="fw-bold w-100 text-violet p-2 m-0 font-15">7.Cam k???t c???a t??? ch???c/c?? nh??n ????? ngh??? c???p ph??p</p>
                                            <div className="col-sm-12 mb-2">
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
                                            <div className="col-sm-12 mb-2">
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
                                <button type="submit" className="btn btn-primary mx-2 fw-bold font-14">G???I Y??U C???U C???P M???I GI???Y PH??P</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}