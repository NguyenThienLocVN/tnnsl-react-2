import React from 'react';
import Header from '../../../../layout/Header';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import configData from "../../../../../config.json";
import {Dropdown, Form, Button} from "react-bootstrap";
import { getUser} from '../../../../common/api';
import { Modal } from 'antd';
import { apiClient } from '../../../../common/api';

const user = getUser();
export default class QuanLyCapPhepQuanLyCapPhepGiayPhepKTNDD extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            pagename: this.props.match.params.pagename,
            countLicense: [],
            dataNewLicenseManagement: [],
            activeModal: null,
            status: '',
            id_gp: '',
        }
    }
    clickHandler = (e, index) => {
        this.setState({ activeModal: index })
    }
    
    hideModal = () => {
        this.setState({ activeModal: null })
    }
    
    componentDidMount(){
        document.title = "Nước dưới đất - cấp mới giấy phéo";
        trackPromise(
            axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/dem-giay-phep")
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
        trackPromise(
            axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/danh-sach-cap-moi-giay-phep-ktndd/"+user.id)
            .then((response) => {
                if(response.status === 200)
                {
                    if(user.role === "admin"){
                        this.setState({
                            dataNewLicenseManagement: response.data.role_admin.data,
                        });
                    }else if(user.role === "user"){
                        this.setState({
                            dataNewLicenseManagement: response.data.role_user.data,
                        });
                    }
                    
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            })
        )
        
    }
    handleStatusChange = (event) => {
        this.setState({
            status: event.target.value,
        });
    }
    handleFormUpdateStatusSubmit = (e) => {
        e.preventDefault();
        var id_gp = e.target[1].value;
        const licenseStatus = this.state.status;
        apiClient.get('/sanctum/csrf-cookie')
            .then(response => {
                trackPromise(
					apiClient.post(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/cap-nhat-trang-thai-giay-phep/"+id_gp, { status:licenseStatus })
                    .then((response) => {
						if (response.status === 200) {
							window.location.reload();
						}
					})
					.catch((error) => {console.log(error);
						setTimeout(this.setState({errorMsg: error.response.data.error_message}), 3000);
					})
				)
            })
    }
    render(){
        return(
			<div className="p-0">
                <Header headTitle="QUẢN LÝ CẤP MỚI GIẤY PHÉP  KHAI THÁC SỬ DỤNG NƯỚC DƯỚI ĐẤT" previousLink="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac" showHeadImage={true} layoutfull={true} />
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

                            
                            <Dropdown>
                                <Dropdown.Toggle className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold text-dark" style={{backgroundColor: "#1EC0D7"}} id="CapMoiGiayPhep">
                                    Cấp mới giấy phép
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="col-11" style={{backgroundColor: "#1EC0D7"}}>
                                    <Dropdown.Item href="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/cap-moi">Cấp mới giấy phép</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Quản lý cấp phép</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/gia-han" style={{backgroundColor: "#41A59F"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Gia hạn giấy phép</Link>
                            <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/dieu-chinh" style={{backgroundColor: "#C5E287"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Điều chỉnh giấy phép</Link>
                            <Link to="#" style={{backgroundColor: "#E2D987"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Hướng dẫn sử dụng</Link>
                        </div>
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <div className="col-12 p-0 ">
                            <div className="col-12 row align-items-center my-1 px-0 mx-0">
                                <div className=" mb-1 col-lg-9 ">
                                    <input type="text" className="form-control form-control-sm" placeholder="-- Tìm kiếm --" aria-label="-- Tìm kiếm --" aria-describedby="basic-addon2" />
                                </div>
                                <div className="col-lg-3 mb-2">
                                    <select defaultValue="0" className="form-control form-control-sm font-13">
                                        <option value="0">-- Sắp xếp --</option>
                                        <option value="1">Sắp xếp theo số giấy phép</option>
                                        <option value="3">Sắp xếp theo tên công trình</option>
                                        <option value="3">Sắp xếp theo tên ĐVCP</option>
                                    </select>
                                </div>
                            </div>
                            <div className="table-responsive px-2">
                                <table className="table table-bordered table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th className="text-nowrap">#</th>
                                            <th className="text-nowrap">Số giấy phép</th>
                                            <th className="text-nowrap">Tên công trình</th>
                                            <th className="text-nowrap">Tổ chức được cấp phép</th>
                                            <th className="text-nowrap">Trạng thái</th>
                                            <th className="text-nowrap">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.dataNewLicenseManagement.map((e, i)=>{
                                            return(
                                                <tr key={i}>
                                                    <td className="text-center align-middle">{i+1}</td>
                                                    <td className="text-start align-middle text-nowrap"><p title="Xem bản đồ" className="text-primary m-0 cursor_pointer">{e.gp_sogiayphep}</p></td>
                                                    <td className="text-start align-middle"><p title="Xem bản đồ" className="text-primary m-0 cursor_pointer">{e.congtrinh_ten} <img  src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" /></p></td>
                                                    <td className="text-start align-middle">{e.chugiayphep_ten}</td>
                                                    <td className="text-start align-middle">
                                                        <Form>
                                                            <Form.Group controlId={e.id}>
                                                                <Form.Control disabled size="sm" as="select" defaultValue={e.status === 0 & e.status === 1 ? 0 : e.status}>
                                                                    <option value={0}>Nộp hồ sơ</option>
                                                                    <option value={2}>Đang lấy ý kiến thẩm định</option>
                                                                    <option value={3}>Hoàn thành hồ sơ cấp phép</option>
                                                                    <option value={1}>Đã được cấp phép</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form>
                                                        <Modal 
                                                            title="Sửa trạng thái giấy phép" 
                                                            width={450}
                                                            id={e.gp_sogiayphep} 
                                                            visible={this.state.activeModal === i} 
                                                            footer={null}
                                                            onCancel={this.hideModal}>
                                                            <form ref="form" onSubmit={this.handleFormUpdateStatusSubmit}>
                                                                <Form.Group controlId={'GPKTNuocDuoiDat-'+e.id}>
                                                                    <Form.Control name="status" onChange={this.handleStatusChange} size="sm" as="select" defaultValue={e.status === 0 & e.status === 1 ? 0 : e.status}>
                                                                        <option value={0}>Nộp hồ sơ</option>
                                                                        <option value={2}>Đang lấy ý kiến thẩm định</option>
                                                                        <option value={3}>Hoàn thành hồ sơ cấp phép</option>
                                                                        <option value={1}>Đã được cấp phép</option>
                                                                    </Form.Control>
                                                                </Form.Group>
                                                                <input type="hidden" name="id_gp" value={e.id} />
                                                                <Button type="submit" onClick={this.hideModal} className="mt-3" variant="primary" title="Cập nhật">Cập nhật</Button>
                                                            </form>
                                                        </Modal>
                                                    </td>
                                                    <td className="text-start align-middle text-nowrap"><div><Button onClick={(e) => this.clickHandler(e, i)} variant="link" title="Chỉnh Sửa">Chỉnh Sửa</Button></div></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}