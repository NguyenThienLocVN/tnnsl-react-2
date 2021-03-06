import React from 'react';
import Header from '../../../Shared/Header';
import { trackPromise } from 'react-promise-tracker';
import configData from "../../../config.json";
import { Button } from "react-bootstrap";
import { PlusSquareOutlined, DeleteOutlined, FilePdfOutlined } from '@ant-design/icons';
import DemGiayPhep from './DemGiayPhep';
import { apiClient, removeUserSession, getToken } from '../../../Shared/Auth';
import { Redirect } from 'react-router';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';

// Alert library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export default class QuanLyCapPhepCapMoiNuocMatThuyDien extends React.Component {
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
            redirectSuccess: false
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
        document.title = "C???p m???i gi???y ph??p khai th??c n?????c d?????i ?????t";
    }

    submitHandler = (e) => {
        e.preventDefault();
        var loaiHinhKTSD = this.props.match.path.split('/');

        let formData = new FormData();    //formdata object

        var chugiayphep_ten = document.querySelector('#chugiayphep_ten').value;
        var chugiayphep_sogiaydangkykinhdoanh = document.querySelector('#chugiayphep_sogiaydangkykinhdoanh').value;
        var chugiayphep_diachi = document.querySelector('#chugiayphep_diachi').value;
        var chugiayphep_phone = document.querySelector('#chugiayphep_phone').value;
        var chugiayphep_fax = document.querySelector('#chugiayphep_fax').value;
        var chugiayphep_email = document.querySelector('#chugiayphep_email').value;
        var congtrinh_ten = document.querySelector('#congtrinh_ten').value;
        var congtrinh_diadiem = document.querySelector('#congtrinh_diadiem').value;
        var phuongthuc_kt = document.querySelector('#phuongthuc_kt').value;
        var congtrinh_hientrang = document.querySelector('#congtrinh_hientrang').value;
        var mucdich_ktsd = document.querySelector('#mucdich_ktsd').value;
        var congsuat_lapmay = document.querySelector('#congsuat_lapmay').value;
        var luuluonglonnhat_quathuydien = document.querySelector('#luuluonglonnhat_quathuydien').value;
        var mucnuocdang_binhthuong = document.querySelector('#mucnuocdang_binhthuong').value;
        var mucnuoc_chet = document.querySelector('#mucnuoc_chet').value;
        var mucnuoccaonhat_truoclu = document.querySelector('#mucnuoccaonhat_truoclu').value;
        var mucnuoc_donlu = document.querySelector('#mucnuoc_donlu').value;
        var dungtich_huuich = document.querySelector('#dungtich_huuich').value;
        var dungtich_toanbo = document.querySelector('#dungtich_toanbo').value;
        var luuluong_xadongchay_toithieu = document.querySelector('#luuluong_xadongchay_toithieu').value;
        var nguonnuoc_ktsd = document.querySelector('#nguonnuoc_ktsd').value;
        var vitri_laynuoc = document.querySelector('#vitri_laynuoc').value;
        var luuluongnuoc_ktsd = document.querySelector('#luuluongnuoc_ktsd').value;
        var che_do_kt = document.querySelector('#che_do_kt').value;
        var gp_thoihangiayphep = document.querySelector('#gp_thoihangiayphep').value;
        var tailieu_sodovitrikhuvuc_congtrinh_khaithac = document.querySelector('#tailieu_sodovitrikhuvuc_congtrinh_khaithac').files[0];
        var tailieu_donxincapphep = document.querySelector('#tailieu_donxincapphep').files[0];
        var tailieu_baocaodean_ktsd = document.querySelector('#tailieu_baocaodean_ktsd').files[0];
        var tailieu_ketqua_ptcln = document.querySelector('#tailieu_ketqua_ptcln').files[0];
        var tailieu_baocaohientrangkhaithac = document.querySelector('#tailieu_baocaohientrangkhaithac').files[0];
        var tailieu_vanban_yccd = document.querySelector('#tailieu_vanban_yccd').files[0];
        var tailieu_giaytokhac = document.querySelector('#tailieu_giaytokhac').files[0];
        var camket_dungsuthat = document.querySelector('#camket_dungsuthat').value;
        var camket_chaphanhdungquydinh = document.querySelector('#camket_chaphanhdungquydinh').value;
        var camket_daguihoso = document.querySelector('#camket_daguihoso').value;
        
        formData.append("chugiayphep_ten", chugiayphep_ten);
        formData.append("chugiayphep_sogiaydangkykinhdoanh", chugiayphep_sogiaydangkykinhdoanh);
        formData.append("chugiayphep_diachi", chugiayphep_diachi);
        formData.append("chugiayphep_phone", chugiayphep_phone);
        formData.append("chugiayphep_fax", chugiayphep_fax);
        formData.append("chugiayphep_email", chugiayphep_email);
        formData.append("congtrinh_ten", congtrinh_ten);
        formData.append("congtrinh_diadiem", congtrinh_diadiem);
        formData.append("congtrinh_loaihinh_ktsd", loaiHinhKTSD[3]);
        formData.append("phuongthuc_kt", phuongthuc_kt);
        formData.append("congtrinh_hientrang", congtrinh_hientrang);
        formData.append("hangmuc", JSON.stringify(this.state.hangmuc));
        formData.append("mucdich_ktsd", mucdich_ktsd);
        formData.append("congsuat_lapmay", congsuat_lapmay);
        formData.append("luuluonglonnhat_quathuydien", luuluonglonnhat_quathuydien);
        formData.append("mucnuocdang_binhthuong", mucnuocdang_binhthuong);
        formData.append("mucnuoc_chet", mucnuoc_chet);
        formData.append("mucnuoccaonhat_truoclu", mucnuoccaonhat_truoclu);
        formData.append("mucnuoc_donlu", mucnuoc_donlu);
        formData.append("dungtich_huuich", dungtich_huuich);
        formData.append("dungtich_toanbo", dungtich_toanbo);
        formData.append("luuluong_xadongchay_toithieu", luuluong_xadongchay_toithieu);
        formData.append("nguonnuoc_ktsd", nguonnuoc_ktsd);
        formData.append("vitri_laynuoc", vitri_laynuoc);
        formData.append("luuluongnuoc_ktsd", luuluongnuoc_ktsd);
        formData.append("che_do_kt", che_do_kt);
        formData.append("gp_thoihangiayphep", gp_thoihangiayphep);
        formData.append("tailieu_sodovitrikhuvuc_congtrinh_khaithac", tailieu_sodovitrikhuvuc_congtrinh_khaithac);
        formData.append("tailieu_donxincapphep", tailieu_donxincapphep);
        formData.append("tailieu_baocaodean_ktsd", tailieu_baocaodean_ktsd);
        formData.append("tailieu_ketqua_ptcln", tailieu_ketqua_ptcln);
        formData.append("tailieu_baocaohientrangkhaithac", tailieu_baocaohientrangkhaithac);
        formData.append("tailieu_vanban_yccd", tailieu_vanban_yccd);
        formData.append("tailieu_giaytokhac", tailieu_giaytokhac);
        formData.append("camket_dungsuthat", camket_dungsuthat);
        formData.append("camket_chaphanhdungquydinh", camket_chaphanhdungquydinh);
        formData.append("camket_daguihoso", camket_daguihoso);

		apiClient.get('/sanctum/csrf-cookie')
            .then(response => {
                trackPromise(
					apiClient.post(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/cap-moi-giay-phep", formData, {
                        headers: {
                            'content-type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + getToken()
                        } 
                    })
					.then((response) => {
                        this.setState({toastSuccess: response.data.success_message});
                        this.notifySuccess();

                        setTimeout(() => {
                            this.setState({redirectSuccess: true});
                        }, 5000);
					})
					.catch((error) => {
                        this.setState({toastError: error.response.data.error_message});
                        this.notifyError();
                        if(error.response.status === 401)
                        {
                            removeUserSession();
                            window.location.reload();
                        }
					})
				)
            })

        
    };

    // Get value for license creation on change (Lay gia tri input de tao moi giay phep)
    handleInputChange = (event) => {
        const { licensePostData } = this.state;
        var value = "";
        if(event.target.type === 'checkbox'){
            value = event.target.checked
        }else if(event.target.type === 'file'){
            value = event.target.files[0]
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

    render(){
        const GenerateRequestFile = ({data}) => (
            <Document>
                <Page size="A4" style={styles.page} >
                    <View style={[styles.textEnd]}>
                        <Text style={{ fontSize: 12, paddingRight: 15, paddingBottom: 10, fontFamily: 'RobotoBold' }}>M???u 05</Text>
                    </View>
                    <View style={{ textAlign: 'center', fontFamily: 'RobotoBold' }}>
                        <Text style={{ fontSize: 12 }}>C???NG H??A X?? H???I CH??? NGH??A VI???T NAM</Text>
                        <Text style={{ fontSize: 12 }}>?????c l???p - T??? do - H???nh ph??c</Text>
                        <Text style={{ fontSize: 12 }}>--------------</Text>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={{ textAlign: 'center', fontFamily: 'RobotoBold', marginBottom: 10 }}>
                        <Text style={{ fontSize: 12, marginBottom: 5}}>????N ????? NGH??? C???P GI???Y PH??P KHAI TH??C, S??? D???NG N?????C M???T</Text>
                        <Text style={{ fontSize: 12 }}>K??nh g???i: ........................................... (1)</Text>
                    </View>
                    <View style={{ fontFamily: 'RobotoBold' }}>
                        <Text style={{ fontSize: 12, marginBottom: 3}}>1. T??? ch???c/c?? nh??n ????? ngh??? c???p ph??p: </Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15 }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>1.1. T??n t??? ch???c/c?? nh??n: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.chugiayphep_ten}</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15, flexWrap: 'wrap' }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11, marginBottom: 3 }]}>1.2. S??? Gi???y ????ng k?? kinh doanh, n??i c???p, ng??y c???p ho???c s??? Quy???t ?????nh th??nh l???p, c?? quan k?? quy???t ?????nh: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.chugiayphep_sogiaydangkykinhdoanh}</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15, flexWrap: 'wrap' }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>1.3. ?????a ch???: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.chugiayphep_diachi}</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15, flexWrap: 'wrap' }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>1.4. ??i???n tho???i: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.chugiayphep_phone}</Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>&nbsp; &nbsp; Fax: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.chugiayphep_fax}</Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>&nbsp; &nbsp; Email: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.chugiayphep_email}</Text>
                    </View>
                    <View style={{ fontFamily: 'RobotoBold' }}>
                        <Text style={{ fontSize: 12, marginBottom: 3}}>2. Th??ng tin chung v??? c??ng tr??nh khai th??c, s??? d???ng n?????c: </Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15 }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>2.1. T??n c??ng tr??nh: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.congtrinh_ten}</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15 }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>2.2. Lo???i h??nh c??ng tr??nh, ph????ng th???c khai th??c n?????c: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.phuongthuc_kt}</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15 }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>2.3. V??? tr?? c??ng tr??nh: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.congtrinh_diadiem}</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15 }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>2.4. Hi???n tr???ng c??ng tr??nh: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.congtrinh_hientrang}</Text>
                    </View>
                    <View style={{ fontFamily: 'RobotoBold' }}>
                        <Text style={{ fontSize: 12, marginBottom: 3}}>3. N???i dung ????? ngh??? c???p ph??p: </Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15 }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>3.1. Ngu???n n?????c khai th??c, s??? d???ng: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.nguonnuoc_ktsd}</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15 }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>3.2. V??? tr?? l???y n?????c: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.vitri_laynuoc}</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15 }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>3.3. M???c ????ch khai th??c, s??? d???ng n?????c: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.mucdich_ktsd}</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15 }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>3.4. L?????ng n?????c khai th??c, s??? d???ng: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.luuluongnuoc_ktsd}</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15 }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>3.5. Ch??? ????? khai th??c, s??? d???ng: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.che_do_kt}</Text>
                    </View>
                    <View style={[styles.displayFlexRow, { marginBottom: 3, paddingRight: 15 }]}>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>3.6. Th???i gian ????? ngh??? c???p ph??p: </Text>
                        <Text style={[styles.displayFlexRow, { fontSize: 11 }]}>{data.gp_thoihangiayphep}</Text>
                    </View>
                    <View style={{ fontFamily: 'RobotoBold' }}>
                        <Text style={{ fontSize: 12, marginBottom: 3 }}>4. Gi???y t???, t??i li???u n???p k??m theo ????n n??y g???m c??: </Text>
                    </View>
                    <View style={{ marginBottom: 3, paddingRight: 15 }}>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- ????? ??n khai th??c, s??? d???ng n?????c; B??o c??o hi???n tr???ng khai th??c, s??? d???ng n?????c k??m theo quy tr??nh v???n h??nh. </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- K???t qu??? ph??n t??ch ch???t l?????ng ngu???n n?????c. </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- S?? ????? v??? tr?? c??ng tr??nh khai th??c n?????c. </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- V??n b???n g??p ?? v?? t???ng h???p ti???p thu, gi???i tr??nh l???y ?? ki???n c???ng ?????ng. </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- C??c gi???y t???, t??i li???u kh??c c?? li??n quan. </Text>
                    </View>
                    <View style={{ fontFamily: 'RobotoBold' }}>
                        <Text style={{ fontSize: 12, marginBottom: 3 }}>5. Cam k???t c???a t??? ch???c/c?? nh??n ????? ngh??? c???p ph??p: </Text>
                    </View>
                    <View style={{ marginBottom: 3, paddingRight: 15 }}>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- (T??n t??? ch???c/c?? nh??n ????? ngh??? c???p ph??p) cam ??oan c??c n???i dung, th??ng tin trong ????n n??y v?? c??c gi???y t???, t??i li???u g???i k??m theo l?? ????ng s??? th???t v?? xin ho??n to??n ch???u tr??ch nhi???m tr?????c ph??p lu???t. </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- (T??n t??? ch???c/c?? nh??n ????? ngh??? c???p ph??p) cam k???t ch???p h??nh ????ng, ?????y ????? c??c quy ?????nh c???a gi???y ph??p v?? th???c hi???n ?????y ????? c??c ngh??a v??? quy ?????nh t???i Kho???n 2 ??i???u 43 c???a Lu???t t??i nguy??n n?????c v?? quy ?????nh c???a ph??p lu???t c?? li??n quan. </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>- (T??n t??? ch???c/c?? nh??n ????? ngh??? c???p ph??p) ???? g???i m???t (01) b??? h??? s?? t???i S??? T??i nguy??n v?? M??i tr?????ng t???nh S??n La (10). </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}>????? ngh??? (t??n c?? quan c???p ph??p) xem x??t, c???p gi???y ph??p khai th??c s??? d???ng n?????c m???t cho (t??? ch???c/c?? nh??n ????? ngh??? c???p ph??p)./. </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: 15, textAlign: 'center' }}>
                        <Text style={{ fontSize: 11, marginBottom: 3, fontFamily: 'RobotoItalic' }}> ........ ng??y....... th??ng....... n??m........ </Text>
                        <Text style={{ fontSize: 11, marginBottom: 3 }}> T??? ch???c, c?? nh??n ????? ngh??? c???p ph??p </Text>
                        <Text style={{ fontSize: 10, marginBottom: 3, fontFamily: 'RobotoItalic' }}> K??, ghi r?? h??? t??n (????ng d???u n???u c??) </Text>
                    </View>
                </Page>
            </Document>
        )

        return(
            this.state.redirectSuccess ?  <Redirect to='/quan-ly-cap-phep/nuoc-mat/thuy-dien/quan-ly-ho-so' /> :
			<div className="p-0">
                <Header headTitle="????? NGH??? C???P M???I GI???Y PH??P KHAI TH??C S??? D???NG N?????C M???T CHO C??NG TR??NH TH???Y ??I???N" previousLink="/quan-ly-cap-phep/nuoc-mat/thuy-dien" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <form action="" onSubmit={(e) => this.submitHandler(e)} noValidate>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">1.T??? ch???c/C?? nh??n ????? ngh??? CP</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_ten" className="form-label fw-bold font-13 m-0">1.1.T??n t??? ch???c/c?? nh??n <span className="text-danger">*</span> </label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten"  />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_sogiaydangkykinhdoanh" className="form-label fw-bold font-13 m-0">1.2.S??? Gi???y ????ng k?? kinh doanh </label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_diachi" className="form-label fw-bold font-13 m-0">1.3.?????a ch??? <span className="text-danger">*</span> </label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" />
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0 row m-0">
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_phone" className="form-label fw-bold font-13 m-0">1.4.??i???n tho???i <span className="text-danger">*</span> </label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_phone" name="chugiayphep_phone" />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_fax" className="form-label fw-bold font-13 m-0">1.5.Fax   </label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} className="form-control form-control-sm" id="chugiayphep_fax" name="chugiayphep_fax" />
                                    </div>
                                    <div className="mb-2 col-sm-4">
                                        <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.6.Email <span className="text-danger">*</span> </label>
                                        <input type="email" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.Th??ng tin v??? c??ng tr??nh khai th??c, s??? d???ng n?????c</p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_ten" className="form-label fw-bold font-13 m-0">2.1.T??n c??ng tr??nh khai th??c </label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="phuongthuc_kt" className="form-label fw-bold font-13 m-0">2.2.Ph????ng th???c khai th??c n?????c</label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="phuongthuc_kt" name="phuongthuc_kt" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_diadiem" className="form-label fw-bold font-13 m-0">2.3.V??? tr?? c??ng tr??nh</label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtrinh_hientrang" className="form-label fw-bold font-13 m-0">2.4.Hi???n tr???ng c??ng tr??nh</label>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_hientrang" name="congtrinh_hientrang" />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="mb-2">
                                        <p className="form-label fw-bold font-13 m-0">2.5.V??? tr?? c??c h???ng m???c ch??nh c???a c??ng tr??nh khai th??c s??? d???ng n?????c</p>
                                        <div className="col-sm-12 p-0 table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center align-middle font-13" rowSpan="2">TT</th>
                                                        <th className="text-center align-middle font-13" rowSpan="2">H???ng m???c</th>
                                                        <th className="text-center align-middle font-13" colSpan="2">T???a ?????</th>
                                                        <th className="text-center align-middle font-13" rowSpan="2">
                                                            <Button variant="link" title="T???o m???i h???ng m???c" size="sm" className="w-100 text-primary d-flex justify-content-center align-items-center" onClick={this.handleAddHangmuc}><PlusSquareOutlined /></Button>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-center align-middle font-13">X</th>
                                                        <th className="text-center align-middle font-13">Y</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.hangmuc.map((item, i) => (
                                                    <tr key={i}>
                                                        <th className="text-center align-middle font-13">{i+1}</th>
                                                        <td> 
                                                            <input type="text" value={this.state.hangmuc[i].tenhangmuc} name="tenhangmuc" onChange={(e) => this.handleChangeHangmuc(i, e)} className="form-control form-control-sm" />  
                                                        </td>
                                                        <td> 
                                                            <input type="text" value={this.state.hangmuc[i].x} name="x" onChange={(e) => this.handleChangeHangmuc(i, e)} className="form-control form-control-sm" />  
                                                        </td>
                                                        <td> 
                                                            <input type="text" value={this.state.hangmuc[i].y} name="y" onChange={(e) => this.handleChangeHangmuc(i, e)} className="form-control form-control-sm" />  
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
                                                        <td className="text-center align-middle font-13"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="congsuat_lapmay" id="congsuat_lapmay" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle font-13"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="luuluonglonnhat_quathuydien" id="luuluonglonnhat_quathuydien" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle font-13"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="mucnuocdang_binhthuong" id="mucnuocdang_binhthuong" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle font-13"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="mucnuoc_chet" id="mucnuoc_chet" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle font-13"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="mucnuoccaonhat_truoclu" id="mucnuoccaonhat_truoclu" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle font-13"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="mucnuoc_donlu" id="mucnuoc_donlu" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle font-13"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="dungtich_huuich" id="dungtich_huuich" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle font-13"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="dungtich_toanbo" id="dungtich_toanbo" className="form-control form-control-sm" /> 
                                                        </td>
                                                        <td className="text-center align-middle font-13"> 
                                                            <input type="text" onChange={(e) => this.handleInputChange(e)} name="luuluong_xadongchay_toithieu" id="luuluong_xadongchay_toithieu" className="form-control form-control-sm" /> 
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
                                            <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="nguonnuoc_ktsd" name="nguonnuoc_ktsd" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2">
                                            <label htmlFor="vitri_laynuoc" className="form-label fw-bold font-13 m-0">3.2.V??? tr?? l???y n?????c</label>
                                            <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="vitri_laynuoc" name="vitri_laynuoc" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">3.3.M???c ????ch khai th??c, s??? d???ng n?????c</label>
                                            <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 p-0">
                                        <div className="mb-2 row mx-0">
                                            <div className="col-sm-12">
                                                <div className="mb-2 m-0">
                                                    <label htmlFor="luuluongnuoc_ktsd" className="form-label w-50 fw-bold font-13 m-0">3.4.L?????ng n?????c khai th??c, s??? d???ng</label>
                                                    <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm w-50" id="luuluongnuoc_ktsd" name="luuluongnuoc_ktsd" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="mb-2">
                                            <label htmlFor="che_do_kt" className="form-label fw-bold font-13 m-0">3.5.Ch??? ????? khai th??c, s??? d???ng</label>
                                            <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="che_do_kt" name="che_do_kt" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="mb-2">
                                            <label htmlFor="gp_thoihangiayphep" className="form-label fw-bold font-13 m-0">3.6.Th???i gian ????? ngh??? c???p ph??p</label>
                                            <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="gp_thoihangiayphep" name="gp_thoihangiayphep" />
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_sodovitrikhuvuc_congtrinh_khaithac" className="form-label fw-bold d-block w-75 m-0 font-13">3.7.S?? ????? khu v???c v?? v??? tr?? c??ng tr??nh khai th??c n?????c k??m theo</label>
                                            <div className="w-25"><input type="file" onChange={(e) => this.handleInputChange(e)} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_sodovitrikhuvuc_congtrinh_khaithac" name="tailieu_sodovitrikhuvuc_congtrinh_khaithac" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Gi???y t???, t??i li???u n???p k??m theo (.pdf)</p>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <span htmlFor="tailieu_donxincapphep" className="form-label d-flex w-75 m-0 font-13 align-items-center"><span>- ????n xin c???p ph??p</span> &nbsp;(<PDFDownloadLink document={<GenerateRequestFile data={this.state.licensePostData} />} className="mx-2 fw-bold font-14 d-flex align-items-center justify-content-center" fileName="Don-de-nghi-cap-phep-nuoc-mat.pdf"><FilePdfOutlined /> &nbsp; In PDF</PDFDownloadLink>)</span>
                                            <div className="w-25"><input type="file" onChange={(e) => this.handleInputChange(e)} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_donxincapphep" name="tailieu_donxincapphep" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaodean_ktsd" className="form-label d-block w-75 m-0 font-13">- ????? ??n/ b??o c??o khai th??c, s??? d???ng n?????c </label>
                                            <div className="w-25"><input type="file" onChange={(e) => this.handleInputChange(e)} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_baocaodean_ktsd" name="tailieu_baocaodean_ktsd" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_ketqua_ptcln" className="form-label d-block w-75 m-0 font-13">- K???t qu??? ph??n t??ch ch???t l?????ng ngu???n n?????c </label>
                                            <div className="w-25"><input type="file" onChange={(e) => this.handleInputChange(e)} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_ketqua_ptcln" name="tailieu_ketqua_ptcln" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_baocaohientrangkhaithac" className="form-label d-block w-75 m-0 font-13">- B??o c??o hi???n tr???ng khai th??c </label>
                                            <div className="w-25"><input type="file" onChange={(e) => this.handleInputChange(e)} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_baocaohientrangkhaithac" name="tailieu_baocaohientrangkhaithac" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_vanban_yccd" className="form-label d-block w-75 m-0 font-13">- V??n b???n g??p ?? v?? t???ng h???p ti???p thu, gi???i tr??nh l???y ?? ki???n c???ng ?????ng</label>
                                            <div className="w-25"><input type="file" onChange={(e) => this.handleInputChange(e)} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_vanban_yccd" name="tailieu_vanban_yccd" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="tailieu_giaytokhac" className="form-label d-block w-75 m-0 font-13">- C??c gi???y t???, t??i li???u kh??c c?? li??n quan</label>
                                            <div className="w-25"><input type="file" onChange={(e) => this.handleInputChange(e)} accept="application/pdf" className="form-control form-control-sm w-100" id="tailieu_giaytokhac" name="tailieu_giaytokhac" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row col-sm-6 p-0 m-0">
                                    <div className="col-sm-12 row m-0 p-0">
                                        <div>
                                            <p className="fw-bold w-100 text-violet py-2 m-0 font-15">5.Cam k???t c???a t??? ch???c/c?? nh??n ????? ngh??? c???p ph??p</p>
                                            <div className="col-sm-12 mb-2">
                                                <div className="mb-2 d-flex alicn-items-center mx-0">
                                                    <div className="d-flex justify-content-end pe-3">
                                                        <div className="round">
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_dungsuthat} value={this.state.licensePostData.camket_dungsuthat} onChange={(e) => this.handleInputChange(e)} required id="camket_dungsuthat" name="camket_dungsuthat" />
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
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_chaphanhdungquydinh} value={this.state.licensePostData.camket_chaphanhdungquydinh} onChange={(e) => this.handleInputChange(e)} required id="camket_chaphanhdungquydinh" name="camket_chaphanhdungquydinh" />
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
                                                            <input type="checkbox" checked={this.state.licensePostData.camket_daguihoso} value={this.state.licensePostData.camket_daguihoso} onChange={(e) => this.handleInputChange(e)} id="camket_daguihoso" name="camket_daguihoso" />
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
                            <div className="my-3 p-1"></div>
                            <div className="pb-4 text-center col-sm-12 d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary mx-2 fw-bold font-14 d-flex align-items-center">G???I Y??U C???U C???P M???I GI???Y PH??P</button>
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