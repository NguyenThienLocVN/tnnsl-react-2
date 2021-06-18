import React from 'react';
import Header from '../../../layout/Header';
import { Link } from 'react-router-dom';
import Map from '../../../layout/Map';
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import configData from "../../../../config.json";
import { InfoCircleOutlined, EyeOutlined, PlusOutlined, FileExcelOutlined, SearchOutlined, EditOutlined, DeleteOutlined, FilePdfOutlined, CloseOutlined } from '@ant-design/icons';
import { trackPromise } from 'react-promise-tracker';


export default class QuanLyCapPhepNuocMatTongQuanCongTrinh extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            pagename: this.props.match.params.pagename,
            showSearch: false,
            dataHydroelectricLicense: [],
            countHydroelectricLicense: 0,
            activeModal: null,
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    clickHandler(e, index) {
        this.setState({ activeModal: index })
    }
    
    hideModal() {
        this.setState({ activeModal: null })
    }

    componentDidMount(){
        if(this.state.pagename === "thuy-dien"){
            document.title = "Thủy điện | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "ho-chua"){
            document.title = "Hồ Chứa | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "tram-bom"){
            document.title = "Trạm Bơm | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            document.title = "Đập/Hệ Thống Thủy Lợi | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "cong"){
            document.title = "Cống | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            document.title = "Trạm Cấp  Nước | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            document.title = "Nhà  Máy Nước | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            document.title = "Công Trình Khác | Quản lý cấp phép nước mặt";
        }

        trackPromise(
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/danh-sach-giay-phep-thuy-dien")
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        dataHydroelectricLicense: response.data,
                    })
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            })
        )
            
        trackPromise(
            axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/dem-so-giay-phep")
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        countHydroelectricLicense: response.data.thuy_dien,
                    });
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            })
        )
    }
    headerTitle = () => {
        if(this.state.pagename === "thuy-dien"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH THỦY ĐIỆN ";
        }
        else if(this.state.pagename === "ho-chua"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH HỒ CHỨA ";
        }
        else if(this.state.pagename === "tram-bom"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH TRẠM BƠM ";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH HỆ THỐNG THỦY LỢI ";
        }
        else if(this.state.pagename === "cong"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH CỐNG ";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH TRẠM CẤP NƯỚC ";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH NHÀ MÁY NƯỚC ";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            return "QUẢN LÝ CẤP PHÉP CÔNG TRÌNH CÔNG TRÌNH KHÁC ";
        }
    }

    xemThongTinChung = () => {
        return "/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-chung";
    }

    imageConstruction = () => {
        if(this.state.pagename === "thuy-dien"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/thuydien.png';
        }
        else if(this.state.pagename === "ho-chua"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/hochua.png';
        }
        else if(this.state.pagename === "tram-bom"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/trambom.jpg';
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/dapthuyloi.jpg';
        }
        else if(this.state.pagename === "cong"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/cong.jpg';
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/tramcapnuoc.jpg';
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/nhamaynuoc.jpg';
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            return process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/trambom.jpg';
        }
    }

    constructionType = () => {
        if(this.state.pagename === "thuy-dien"){
            return "thủy điện";
        }
        else if(this.state.pagename === "ho-chua"){
            return "hồ chứa";
        }
        else if(this.state.pagename === "tram-bom"){
            return "trạm bơm";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            return "đập/hệ thống thủy lợi";
        }
        else if(this.state.pagename === "cong"){
            return "cống";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            return "trạm cấp nước";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            return "nhà máy nươc";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            return "công trình khác";
        }
    }

    formatDate(date) {
        var date_format = new Date(date);
        var d = date_format.getDate();
        var m = date_format.getMonth();
        var y = date_format.getFullYear();
        return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
    }
    checkStatus(hieulucgiayphep){
        if(hieulucgiayphep === "chuaduocduyet"){
            return <div className="license_status" style={{color: "#fff", backgroundColor: "gray"}}> Chưa duyệt </div>;
        }else if(hieulucgiayphep === "saphethieuluc"){
            return <div className="license_status" style={{color: "#fff", backgroundColor: "orange"}}> Sắp hết hiệu lực </div>;
        }else if(hieulucgiayphep === "conhieuluc"){
            return <div className="license_status" style={{color: "#fff", backgroundColor: "green"}}> Còn hiệu lực </div>;
        }else if(hieulucgiayphep === "hethieuluc"){
            return <div className="license_status" style={{color: "#fff", backgroundColor: "red"}}> Hết hiệu lực </div>;
        }
    }


    render(){
        return(
			<div className="p-0">
                <Header headTitle={this.headerTitle()} previousLink="/quan-ly-cap-phep" showHeadImage={true} layout48={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                        <div className="col-12 px-2">
                            
                            <div className="col-10 py-2 m-auto d-flex justify-content-center text-center">
                                {/* <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/thuydien1.png'} className="p-0 hydroelectric-icon rounded-circle border border-secondary my-auto mx-3" alt="dap-thuy-dien" /> */}
                                <img src={this.imageConstruction()} className="p-0 hydroelectric-icon rounded-circle border border-secondary my-auto mx-3" alt="dap-thuy-dien" />
                                <div className="col-6 text-center p-0">
                                    <p className="fw-bold mb-1">Tổng số công trình {this.constructionType()} </p>
                                    <p className="font-30 m-0 fw-bold">{this.state.countHydroelectricLicense.tat_ca_giay_phep}</p>
                                </div>
                            </div>

                            <div className="col-12 py-1 mt-4 d-flex justify-content-center text-center border-top border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Tổng số CT đã vận hành</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countHydroelectricLicense.tat_ca_giay_phep} / {this.state.countHydroelectricLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={this.imageConstruction()} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="dap-thuy-dien" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép đã cấp</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countHydroelectricLicense.giay_phep_da_cap} / {this.state.countHydroelectricLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép sắp hết hiệu lực</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countHydroelectricLicense.sap_het_hieu_luc} / {this.state.countHydroelectricLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing-2.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep-2" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép hết hiệu lực</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countHydroelectricLicense.het_hieu_luc} / {this.state.countHydroelectricLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing-3.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep-3" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Chưa có giấy phép</p>
                                    <p className="font-18 m-0 fw-bold text-danger"> {this.state.countHydroelectricLicense.chua_phe_duyet} / {this.state.countHydroelectricLicense.tat_ca_giay_phep}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/expire.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="het-han" />
                            </div>

                            <Link to="/quan-ly-cap-phep/nuoc-mat/tao-moi" className="col-11 btn btn-primary d-flex align-items-center mx-auto mt-3"><PlusOutlined /> &nbsp; Tạo mới giấy phép</Link>
                            <button className="col-11 btn btn-success d-flex align-items-center mx-auto mt-1"><FileExcelOutlined /> &nbsp; Xuất file</button>
                            <button className="col-11 btn btn-secondary d-flex align-items-center mx-auto mt-1"><InfoCircleOutlined /> &nbsp; Hướng dẫn sử dụng</button>
                        </div>
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <div className="col-12 px-md-1 vh-50">
                            <Map className="col-12" pagename={this.state.pagename} subpagename="" />

                            <div className="col-12 p-0 ">
                                <div className="col-12 row align-items-center my-1 px-0 mx-0">
                                    <div className=" mb-1 col-lg-3 ">
                                        <input type="text" className="form-control form-control-sm" placeholder="-- Tìm kiếm --" aria-label="-- Tìm kiếm --" aria-describedby="basic-addon2" />
                                    </div>
                                    <div className="col-lg-3 mb-2">
                                        <select defaultValue="0" className="form-control form-control-sm font-13">
                                            <option value="0">-- Chọn hiệu lực --</option>
                                            <option value="1">Còn hiệu lực</option>
                                            <option value="2">Chưa phê duyệt</option>
                                            <option value="3">Hết hiệu lực</option>
                                            <option value="3">Sắp hết hiệu lực</option>
                                            <option value="3">Hết hiệu lực chưa có GP thay thế</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-3 mb-2">
                                        <select defaultValue="0" className="form-control form-control-sm font-13">
                                            <option value="0">-- Sắp xếp --</option>
                                            <option value="1">Sắp xếp theo số giấy phép</option>
                                            <option value="2">Sắp xếp theo ngày kí</option>
                                            <option value="3">Sắp xếp theo tên công trình</option>
                                            <option value="3">Sắp xếp theo tên ĐVXCP</option>
                                            <option value="3">Sắp xếp theo ngày bắt đầu hiệu lực</option>
                                            <option value="3">Sắp xếp theo ngày kết thúc hiệu lực</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-3 mb-2 px-2"><button className="col-6 fw-bold btn bg-lightblue d-flex align-items-center justify-content-center font-13">Tìm &nbsp;<SearchOutlined /></button></div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-sm table-bordered col-12 table-hover text-center">
                                        <thead>
                                            <tr>
                                                <th className="text-nowrap">#</th>
                                                <th className="text-nowrap">Số giấy phép</th>
                                                <th className="text-nowrap">Ngày ký giấy phép</th>
                                                <th className="text-nowrap">Tên công trình</th>
                                                <th className="text-nowrap">Tổ chức được cấp phép</th>
                                                <th className="text-nowrap">Ngày có hiệu lực</th>
                                                <th className="text-nowrap">Thời hạn</th>
                                                <th className="text-nowrap">Trạng thái</th>
                                                <th className="text-nowrap">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.dataHydroelectricLicense.map((e, i) => {
                                                return (
                                                    <tr key={i}>
                                                    <td className="text-center align-middle">{i+1}</td>
                                                    <td className="text-start align-middle text-nowrap">
                                                        <p className="text-dark m-0">{e.gp_sogiayphep} &nbsp;
                                                            <span id={e.gp_sogiayphep} title="Xem file giấy phép" className="text-primary cursor_pointer m-0" onClick={event => this.clickHandler(event, i)}> <FilePdfOutlined /> </span>
                                                        </p>
                                                    </td>
                                                    <td className="text-start align-middle">{this.formatDate(e.gp_ngayky)}</td>
                                                    <td className="text-start align-middle"><p title="Xem bản đồ" className="text-primary m-0 cursor_pointer">{e.congtrinh_ten} <img  src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" /></p></td>
                                                    <td className="text-start align-middle">{e.chugiayphep_ten}</td>
                                                    <td className="text-start align-middle">{this.formatDate(e.gp_ngaybatdau)}</td>
                                                    <td className="text-center align-middle">{e.gp_thoihangiayphep}</td>
                                                    <td className="text-start align-middle">{this.checkStatus(e.hieulucgiayphep)}</td>
                                                    <td className="text-start align-middle text-nowrap"><div><Link className="text-primary" title="Xem GP" to={'/quan-ly-cap-phep/nuoc-mat/'+this.state.pagename+'/xem-thong-tin-chung/'+e.id}><EyeOutlined /></Link>&nbsp; &nbsp;<Link to="/quan-ly-cap-phep/nuoc-mat/tao-moi" title="Sửa"><EditOutlined /></Link>&nbsp; &nbsp;<span title="Xóa" className="text-danger"><DeleteOutlined /></span></div></td>
                                                    <>
                                                        <Modal id={e.gp_sogiayphep} show={this.state.activeModal === i} onHide={this.hideModal} size="xl">
                                                            <Modal.Body className="bg-dark">
                                                                <Button className="close-btn text-white" variant="white" onClick={this.hideModal}><CloseOutlined /></Button>
                                                                <div>
                                                                    {e.tai_lieu[0] ?
                                                                    <iframe width="100%" height="600" title="file giấy phép" src={"https://tainguyennuocsonla.s3-ap-southeast-1.amazonaws.com/"+e.tai_lieu[0].tailieu_loaigiayphep+"/"+e.tai_lieu[0].tailieu_name+"/"+e.tai_lieu[0].tailieu_giayphep}></iframe>
                                                                    : "Không có tài liệu"
                                                                    }
                                                                </div>
                                                            </Modal.Body>
                                                        </Modal>
                                                    </>
                                                </tr>
                                                )
                                                
                                            })}
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}