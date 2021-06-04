import React, {useState} from 'react';
import Header from '../../../layout/Header';
import { Link } from 'react-router-dom';
import Map from '../../../layout/Map';
import axios from "axios";
import { Modal} from 'react-bootstrap';
import configData from "../../../../config.json";
import { InfoCircleOutlined, EyeOutlined, PlusOutlined, FileExcelOutlined, SearchOutlined, EditOutlined, DeleteOutlined, FileOutlined, FilePdfOutlined } from '@ant-design/icons';

function ModalViewLicensePDF() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <span title="Xem file giấy phép" className="text-primary cursor_pointer m-0" onClick={handleShow}> <FilePdfOutlined /> </span>
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Body>
                <iframe src="https://drive.google.com/file/d/1Ewiby-C0CHVCj4HuWfh1GRXgFU61nUHV/view?usp=sharing"></iframe>
            </Modal.Body>
        </Modal>
      </>
    );
  }

export default class QuanLyCapPhepNuocMatTongQuanCongTrinh extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            pagename: this.props.match.params.pagename,
            showSearch: false,
            dataColumn: [],
            countData: 0,
            countHydroelectricLicense: 0,
        }
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


        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/danh-sach-giay-phep-thuy-dien")
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        dataColumn: response.data,
                        countData: response.data.length,
                    })
                }
            })
            .catch((error) => {
                this.setState({msg: error.response.data.message})
            })
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
                this.setState({msg: error.response.data.message})
            })
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
    checkStatus(status, date){
        var currentDate = new Date();
        var licenseDate = new Date(date);
        var diff = Math.abs(currentDate - licenseDate);
        var totalDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

        if(status === 0 || status === "0"){
            return <div className="license_status" style={{color: "#fff", backgroundColor: "gray"}}> Chưa duyệt </div>;
        }else if(currentDate < licenseDate){
            if(totalDays <= 60 & totalDays >= 0 ){
                return <div className="license_status" style={{color: "#fff", backgroundColor: "orange"}}> Sắp hết hiệu lực </div>;
            }else{
                return <div className="license_status" style={{color: "#fff", backgroundColor: "green"}}> Còn hiệu lực </div>;
            }
        }else if(currentDate > licenseDate){
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
                                    <p className="font-30 m-0 fw-bold">{this.state.countData}</p>
                                </div>
                            </div>

                            <div className="col-12 py-1 mt-4 d-flex justify-content-center text-center border-top border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Tổng số CT đã vận hành</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countData} / {this.state.countData}</p>
                                </div>
                                <img src={this.imageConstruction()} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="dap-thuy-dien" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép đã cấp</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countHydroelectricLicense.giay_phep_da_cap} / {this.state.countData}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép sắp hết hiệu lực</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countHydroelectricLicense.sap_het_hieu_luc} / {this.state.countData}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing-2.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep-2" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép hết hiệu lực</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countHydroelectricLicense.het_hieu_luc} / {this.state.countData}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing-3.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep-3" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Giấy phép chưa phê duyệt</p>
                                    <p className="font-18 m-0 fw-bold text-danger">{this.state.countHydroelectricLicense.chua_phe_duyet} / {this.state.countData}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/report.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="chua-duyet" />
                            </div>
                            <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                                <div className="col-9 text-start p-0">
                                    <p className="fw-bold m-0">Chưa có giấy phép</p>
                                    <p className="font-18 m-0 fw-bold text-danger"> -- / {this.state.countData}</p>
                                </div>
                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/expire.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="het-han" />
                            </div>

                            <Link to="/quan-ly-cap-phep/nuoc-mat/tao-moi" className="col-11 btn btn-primary d-flex align-items-center mx-auto mt-3"><PlusOutlined /> &nbsp; Tạo mới giấy phép</Link>
                            <button className="col-11 btn btn-success d-flex align-items-center mx-auto mt-1"><FileExcelOutlined /> &nbsp; Xuất file</button>
                            <button className="col-11 btn btn-info d-flex align-items-center mx-auto mt-1"><InfoCircleOutlined /> &nbsp; Hướng dẫn sử dụng</button>
                        </div>
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <div className="col-12 px-md-1 vh-50">
                            <Map className="col-12" />

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
                                    <div className="col-lg-3 mb-2 px-2"><button className="col-6 fw-bold text-light btn btn-info d-flex align-items-center justify-content-center font-13">Tìm &nbsp;<SearchOutlined /></button></div>
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
                                            {this.state.dataColumn.map((e, i) => {
                                                return (
                                                    <tr key={i}>
                                                    <td className="text-center align-middle">{i+1}</td>
                                                    <td className="text-start align-middle text-nowrap"><p className="text-dark m-0">{e.so_gp} &nbsp; <ModalViewLicensePDF /> </p></td>
                                                    <td className="text-start align-middle">{this.formatDate(e.ngay_ky)}</td>
                                                    <td className="text-start align-middle"><p title="Xem bản đồ" className="text-primary m-0 cursor_pointer">{e.ten_ct} <img  src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" /></p></td>
                                                    <td className="text-start align-middle">{e.ten_to_chuc}</td>
                                                    <td className="text-start align-middle">{this.formatDate(e.hieu_luc_tu)}</td>
                                                    <td className="text-center align-middle">{e.thoi_han_gp}</td>
                                                    <td className="text-start align-middle">{this.checkStatus(e.status,e.hieu_luc_den)}</td>
                                                    <td className="text-start align-middle text-nowrap"><div><Link className="text-primary" title="Xem GP" to={'/quan-ly-cap-phep/nuoc-mat/'+this.state.pagename+'/xem-thong-tin-chung/'+e.id}><EyeOutlined /></Link>&nbsp; &nbsp;<Link to="/quan-ly-cap-phep/nuoc-mat/tao-moi" title="Sửa"><EditOutlined /></Link>&nbsp; &nbsp;<span title="Xóa" className="text-danger"><DeleteOutlined /></span></div></td>
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