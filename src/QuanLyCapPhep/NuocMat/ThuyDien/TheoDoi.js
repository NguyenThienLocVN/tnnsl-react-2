import React from 'react';
import Header from '../../../Shared/Header';
import DemGiayPhep from './DemGiayPhep';
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import configData from "../../../config.json";
import { getToken, removeUserSession } from '../../../Shared/Auth';
import { ConfigProvider, Modal, Table } from 'antd';
import { PlusOutlined, SendOutlined, CloseOutlined } from '@ant-design/icons';
import vnVN from 'antd/lib/locale/vi_VN';
import { Link } from 'react-router-dom';

export default class QuanLyCapPhepTheoDoiGiayPhepNuocMatThuyDien extends React.Component {
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
            thanhtra_nuocmat_thuydien: [],
            toastError: "",
            toastSuccess: "",
            redirectSuccess: false,

            modalLicenseInspect: false,
            modalLicenseFollow: false,
            modalConnectFollow: false
        }
    }

    componentDidMount(){
        document.title = "Theo d??i c??ng tr??nh sau c???p ph??p | N?????c m???t - Th???y ??i???n";

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

    handleCloseModal = () => {
        this.setState({modalLicenseInspect: false})
        this.setState({modalLicenseFollow: false})
        this.setState({modalConnectFollow: false})
    }

    handleModalLicenseInspect = () => {
        this.setState({modalLicenseInspect: true})
    }

    handleModalLicenseFollow = () => {
        this.setState({modalLicenseFollow: true})
    }

    handleModalConnectFollow = () => {
        this.setState({modalConnectFollow: true})
    }

    render(){
        const { licensePostData } = this.state;

        const columnLicenseInspect = [
            {
              title: '#',
              dataIndex: 'gp_sogiayphep',
              key: 'gp_sogiayphep',
              width: '10%',
              render: (text, record, index) => (
                <p className="cursor_pointer m-0">#</p>
              ),
            },
            {
                title: 'T??n ?????t thanh tra',
                dataIndex: 'congtrinh_ten',
                key: 'congtrinh_ten',
                width: '30%',
                render: (text, record) => (
                    <p className="cursor_pointer m-0">{record.congtrinh_ten ? record.congtrinh_ten : "--"} </p>
                )
            },
            {
                title: '????n v??? th???c hi???n',
                dataIndex: 'chugiayphep_ten',
                key: 'chugiayphep_ten',
                render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.chugiayphep_ten ? record.chugiayphep_ten : "--"} </p>
                )
            },
            {
                title: 'T??n tr?????ng ??o??n',
                dataIndex: 'gp_ngayhethan',
                key: 'gp_ngayhethan',
                render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.gp_ngayhethan ? this.formatDate(record.gp_ngayhethan) : "--"} </p>
                )
            },
            {
                title: 'N??m th???c hi???n',
                dataIndex: 'gp_ngayhethan',
                key: 'gp_ngayhethan',render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.gp_ngayhethan ? this.formatDate(record.gp_ngayhethan) : "--"} </p>
                )
            }
        ];

        const columnLicenseFollow = [
            {
              title: '#',
              dataIndex: 'gp_sogiayphep',
              key: 'gp_sogiayphep',
              width: '10%',
              render: (text, record, index) => (
                <p className="cursor_pointer m-0">#</p>
              ),
            },
            {
                title: 'Ng??y th??ng',
                dataIndex: 'congtrinh_ten',
                key: 'congtrinh_ten',
                width: '30%',
                render: (text, record) => (
                    <p className="cursor_pointer m-0">"--"</p>
                )
            },
            {
                title: 'T??n v??n b???n',
                dataIndex: 'chugiayphep_ten',
                key: 'chugiayphep_ten',
                render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">--</p>
                )
            },
            {
                title: 'N???i dung',
                dataIndex: 'chugiayphep_ten',
                key: 'chugiayphep_ten',
                render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">--</p>
                )
            }
        ];

        const columnConnectFollow = [
            {
              title: '#',
              dataIndex: 'gp_sogiayphep',
              key: 'gp_sogiayphep',
              width: '10%',
              render: (text, record, index) => (
                <p className="cursor_pointer m-0">#</p>
              ),
            },
            {
                title: 'Ng??y th??ng',
                dataIndex: 'congtrinh_ten',
                key: 'congtrinh_ten',
                width: '30%',
                render: (text, record) => (
                    <p className="cursor_pointer m-0">"--"</p>
                )
            },
            {
                title: 'T??n v??n b???n',
                dataIndex: 'chugiayphep_ten',
                key: 'chugiayphep_ten',
                render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">--</p>
                )
            },
            {
                title: 'N???i dung',
                dataIndex: 'chugiayphep_ten',
                key: 'chugiayphep_ten',
                render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">--</p>
                )
            }
        ];

        return(
			<div className="p-0">
                <Header headTitle="TH??NG TIN THEO D??I C??NG TR??NH SAU C???P PH??P KHAI TH??C S??? D???NG N?????C M???T C??NG TR??NH TH???Y ??I???N" previousLink="/quan-ly-cap-phep/nuoc-mat/thuy-dien" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <form>
                            <div>
                                <div className="1">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">1.Th??ng tin ch??? c??ng tr??nh</p>
                                    <div className="row m-0">
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="chugiayphep_ten" className="form-label fw-bold font-13 m-0">1.1.T??n t??? ch???c/c?? nh??n</label>
                                                <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten" value={licensePostData.chugiayphep_ten}  />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                    <label htmlFor="chugiayphep_sogiaykangkykinhdoanh" className="form-label fw-bold font-13 m-0">1.2.S??? Gi???y ????ng k?? kinh doanh</label>
                                                    <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_sogiaydangkykinhdoanh" name="chugiayphep_sogiaydangkykinhdoanh" value={licensePostData.chugiayphep_sogiaydangkykinhdoanh} />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-2">
                                                    <label htmlFor="chugiayphep_diachi" className="form-label fw-bold font-13 m-0">1.3.?????a ch???</label>
                                                    <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_diachi"  name="chugiayphep_diachi" value={licensePostData.chugiayphep_diachi} />
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="mb-2">
                                                    <label htmlFor="chugiayphep_phone" className="form-label fw-bold font-13 m-0">1.4.??i???n tho???i</label>
                                                    <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_phone" name="chugiayphep_phone" value={licensePostData.chugiayphep_phone} />
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="mb-2">
                                                    <label htmlFor="chugiayphep_fax" className="form-label fw-bold font-13 m-0">1.5.Fax</label>
                                                    <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_fax" name="chugiayphep_fax" value={licensePostData.chugiayphep_fax} />
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="mb-2">
                                                    <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.6.Email</label>
                                                    <input type="email" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email" value={licensePostData.chugiayphep_email} />
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div className="2">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.Th??ng tin c??ng tr??nh </p>
                                    <div className="row m-0">
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="congtrinh_ten" className="form-label fw-bold font-13 m-0">2.1.T??n c??ng tr??nh khai th??c</label>
                                                <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" value={licensePostData.congtrinh_ten} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">2.2.M???c ????ch khai th??c, s??? d???ng n?????c</label>
                                                <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" value={licensePostData.mucdich_ktsd} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="congtrinh_diadiem" className="form-label fw-bold font-13 m-0">2.3.V??? tr?? c??ng tr??nh khai th??c n?????c m???t</label>
                                                <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" value={licensePostData.congtrinh_diadiem} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="tangchuanuoc" className="form-label fw-bold font-13 m-0">2.4.T???ng ch???a n?????c khai th??c</label>
                                                <input type="text" required className="form-control form-control-sm" id="tangchuanuoc" name="tangchuanuoc"  />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="sogieng_quantrac" className="form-label fw-bold font-13 m-0">2.5.S??? gi???ng khai th??c</label>
                                                <input type="text" required className="form-control form-control-sm" id="sogieng_quantrac" name="sogieng_quantrac"  />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="tongluuluong_ktsd_max" className="form-label fw-bold font-13 m-0">2.6.T???ng l?????ng n?????c khai th??c (m3/ng??y ????m)</label>
                                                <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="luuluongnuoc_ktsd" name="luuluongnuoc_ktsd" value={licensePostData.luuluongnuoc_ktsd} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="gp_thoigiancapphep" className="form-label fw-bold font-13 m-0">2.7.Th???i h???n gi???y ph??p</label>
                                                <input type="text" onChange={(e) => this.handleInputChange(e)} required className="form-control form-control-sm" id="gp_thoihangiayphep" name="gp_thoihangiayphep" value={licensePostData.gp_thoihangiayphep} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="tiencapquyen_khaithac" className="form-label fw-bold font-13 m-0">2.8.Ti???n c???p quy???n khai th??c</label>
                                                <input type="email" required className="form-control form-control-sm" id="tiencapquyen_khaithac" name="tiencapquyen_khaithac"  />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="3">
                                    <div className="d-flex justify-content-between col-12 align-items-center">
                                        <p className="fw-bold w-100 text-violet p-2 m-0 font-15">3.Thanh tra/ki???m tra</p>
                                        <button type="button" className="btn btn-sm btn-outline-primary m-3 d-flex" title="Th??m m???i ?????t thanh tra / ki???m tra" onClick={() => this.handleModalLicenseInspect()}><PlusOutlined /></button>
                                        <Modal title="Th??m m???i ?????t thanh tra / ki???m tra" visible={this.state.modalLicenseInspect} onCancel={() => this.handleCloseModal()} onOk={() => this.handleCloseModal()} >
                                            <div className="form-group mb-3">
                                                <p className="m-0">T??n ?????t <span className="text-danger">*</span></p>
                                                <input type="text" className="form-control font-13" name="ten_dotthanhtra" placeholder="-- Nh???p t??n ?????t thanh tra ki???m tra --" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <p className="m-0">????n v??? th???c hi???n</p>
                                                <input type="text" className="form-control font-13" name="donvi_thanhtra" placeholder="-- Nh???p ????n v??? th???c hi???n --" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <p className="m-0">Tr?????ng ??o??n thanh tra</p>
                                                <input type="text" className="form-control font-13" name="truongdoan_thanhtra" placeholder="-- Nh???p tr?????ng ??o??n thanh tra --" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <p className="m-0">N??m th???c hi???n</p>
                                                <input type="text" className="form-control font-13" name="namthuchien_thanhtra" placeholder="-- Nh???p n??m th???c hi???n --" />
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="row m-0 table-responsive">
                                        <ConfigProvider locale={vnVN}>
                                            <Table  className="table table-sm table-bordered col-12 table-hover text-center" 
                                                columns={columnLicenseInspect} 
                                                loading={this.state.loading}
                                                onChange={() => this.handleTableChange}
                                                dataSource={this.state.dataSource}
                                                rowKey="id" 
                                                bordered                                           
                                                pagination={{
                                                showTotal: (total, range) => `T???t c??? ${total} b???n ghi`,
                                                    current: this.state.currentPage,
                                                    pageSize: 10}}/>
                                        </ConfigProvider>
                                    </div>
                                </div>
                                <div className="row m-0 mb-4">
                                    <div className="4 col-sm-6 px-0 border-right-gray">
                                        <div className="d-flex justify-content-between col-12 align-items-center">
                                            <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Theo d??i sau c???p ph??p</p>
                                            <button type="button" className="btn btn-sm btn-outline-primary m-3 d-flex" title="Theo d??i sau c???p ph??p" onClick={() => this.handleModalLicenseFollow()}><PlusOutlined /></button>
                                            <Modal title="Theo d??i sau c???p ph??p" visible={this.state.modalLicenseFollow} onCancel={() => this.handleCloseModal()} onOk={() => this.handleCloseModal()} >
                                                <div className="form-group mb-3">
                                                    <p className="m-0">Ng??y th??ng <span className="text-danger">*</span></p>
                                                    <input type="date" className="form-control font-13" name="ten_dotthanhtra" />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <p className="m-0">T??n v??n b???n <span className="text-danger">*</span></p>
                                                    <input type="text" className="form-control font-13" name="donvi_thanhtra" placeholder="-- Nh???p t??n v??n b???n --" />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <p className="m-0">N???i dung</p>
                                                    <textarea className="form-control font-13" name="truongdoan_thanhtra" placeholder="-- Nh???p n???i dung --"></textarea>
                                                </div>
                                            </Modal>
                                        </div>
                                        <div className="row m-0">
                                            <ConfigProvider locale={vnVN}>
                                                <Table  className="table table-sm table-bordered col-12 table-hover text-center" 
                                                    columns={columnLicenseFollow} 
                                                    loading={this.state.loading}
                                                    onChange={() => this.handleTableChange}
                                                    dataSource={this.state.dataSource}
                                                    rowKey="id" 
                                                    bordered                                           
                                                    pagination={{
                                                    showTotal: (total, range) => `T???t c??? ${total} b???n ghi`,
                                                        current: this.state.currentPage,
                                                        pageSize: 10}}/>
                                            </ConfigProvider>
                                        </div>
                                    </div>
                                    <div className="5 col-sm-6 px-0">
                                        <div className="d-flex justify-content-between col-12 align-items-center">
                                            <p className="fw-bold w-100 text-violet p-2 m-0 font-15">5.Theo d??i qu?? tr??nh k???t n???i/ gi??m s??t</p>
                                            <button type="button" className="btn btn-sm btn-outline-primary m-3 d-flex" title="Theo d??i qu?? tr??nh k???t n???i / gi??m s??t" onClick={() => this.handleModalConnectFollow()}><PlusOutlined /></button>
                                            <Modal title="Theo d??i qu?? tr??nh th???c hi???n k???t n???i" visible={this.state.modalConnectFollow} onCancel={() => this.handleCloseModal()} onOk={() => this.handleCloseModal()} >
                                                <div className="form-group mb-3">
                                                    <p className="m-0">Ng??y th??ng <span className="text-danger">*</span></p>
                                                    <input type="date" className="form-control font-13" name="ten_dotthanhtra" />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <p className="m-0">N???i dung</p>
                                                    <textarea className="form-control font-13" name="truongdoan_thanhtra" placeholder="-- Nh???p n???i dung --"></textarea>
                                                </div>
                                            </Modal>
                                        </div>
                                        <div className="row m-0">
                                            <ConfigProvider locale={vnVN}>
                                                <Table  className="table table-sm table-bordered col-12 table-hover text-center" 
                                                    columns={columnConnectFollow} 
                                                    loading={this.state.loading}
                                                    onChange={() => this.handleTableChange}
                                                    dataSource={this.state.dataSource}
                                                    rowKey="id" 
                                                    bordered                                           
                                                    pagination={{
                                                    showTotal: (total, range) => `T???t c??? ${total} b???n ghi`,
                                                        current: this.state.currentPage,
                                                        pageSize: 10}}/>
                                            </ConfigProvider>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-top col-12 my-3"></div>
                                <div className="pb-4 col-sm-12 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary mx-2 fw-bold font-14 d-flex align-items-center">G???I Y??U C???U &nbsp; <SendOutlined /> </button>
                                    <button type="reset" className="btn btn-success mx-2 fw-bold font-14">RESET</button>
                                    {/* <button type="button" className="btn btn-warning mx-2 fw-bold font-14">IN</button>
                                    <button type="button" className="btn btn-warning mx-2 fw-bold font-14">XU???T PDF</button> */}
                                    <Link to="/quan-ly-cap-phep/nuoc-mat/thuy-dien" className="btn btn-danger mx-2 fw-bold font-14 d-flex align-items-center">H???Y &nbsp; <CloseOutlined /> </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}