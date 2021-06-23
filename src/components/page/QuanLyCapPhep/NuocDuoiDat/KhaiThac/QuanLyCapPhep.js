import React from 'react';
import Header from '../../../../layout/Header';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import configData from "../../../../../config.json";
import {Dropdown, Form} from "react-bootstrap";
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';


export default class QuanLyCapPhepQuanLyCapPhepGiayPhepKTNDD extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            pagename: this.props.match.params.pagename,
            countLicense: [],
        }
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
                                            <th className="text-nowrap">Tên công trình</th>
                                            <th className="text-nowrap">Tổ chức được cấp phép</th>
                                            <th className="text-nowrap">Trạng thái</th>
                                            <th className="text-nowrap">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key="1">
                                            <td className="text-center align-middle">1</td>
                                            <td className="text-start align-middle text-nowrap"><p title="Xem bản đồ" className="text-primary m-0 cursor_pointer">SOGP/01 < EyeOutlined /></p></td>
                                            <td className="text-start align-middle"><p title="Xem bản đồ" className="text-primary m-0 cursor_pointer">Ten Cong Trinh <img  src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" /></p></td>
                                            <td className="text-start align-middle">Ten Chu GP</td>
                                            <td className="text-start align-middle">
                                                <Form>
                                                    <Form.Group controlId="formGridState">
                                                        <Form.Control as="select" defaultValue="Nộp hồ sơ">
                                                            <option>Nộp hồ sơ</option>
                                                            <option>Đang lấy ý kiến thẩm định</option>
                                                            <option>Hoàn thành hồ sơ cấp phép</option>
                                                            <option>Đã được cấp phép</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Form>
                                            </td>
                                            <td className="text-start align-middle text-nowrap"><div><Link className="text-primary" title="Xem GP" to="#">Cập nhật</Link></div></td>
                                        </tr>
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