import React from 'react';
import Header from '../../../../layout/Header';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import configData from "../../../../../config.json";
import {Dropdown} from "react-bootstrap";


export default class QuanLyCapPhepGiaHanKTSDNuocDuoiDat extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            pagename: this.props.match.params.pagename,
            countLicense: [],
        }
    }
    componentDidMount(){
        document.title = "Nước dưới đất - gia hạn giấy phéo";
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
                <Header headTitle="ĐỀ NGHỊ GIA HẠN GIẤY PHÉP  KHAI THÁC SỬ DỤNG NƯỚC DƯỚI ĐẤT" previousLink="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac" showHeadImage={true} layoutfull={true} />
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
                        <form>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">1.Tổ chức/Cá nhân đề nghị CP</p>
                                <div className="col-sm-5">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_ten" className="form-label fw-bold m-0">1.1.Tên chủ giấy phép</label>
                                        <input type="text" className="form-control form-control-sm" id="chugiayphep_ten" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_diachi" className="form-label fw-bold m-0">1.2.Địa chỉ</label>
                                        <input type="text" className="form-control form-control-sm" id="chugiayphep_diachi" />
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="mb-2">
                                        <label htmlFor="chugiayphep_phone" className="form-label fw-bold m-0">1.3.Điện thoại</label>
                                        <input type="text" className="form-control form-control-sm" id="chugiayphep_phone" />
                                    </div>
                                </div>
                                <div className="mb-2 col-sm-3">
                                    <label htmlFor="gp_sogiayphep" className="form-label fw-bold m-0">1.4.Số Giấy phép</label>
                                    <input type="text" className="form-control form-control-sm" id="gp_sogiayphep" />
                                </div>
                                <div className="mb-2 col-sm-2">
                                    <label htmlFor="gp_ngayky" className="form-label fw-bold m-0">1.5.Ngày ký</label>
                                    <input type="text" className="form-control form-control-sm" id="gp_ngayky" />
                                </div>
                                <div className="mb-2 col-sm-5">
                                    <label htmlFor="congtrinh_ten" className="form-label fw-bold m-0">1.6.Tên công trình</label>
                                    <input type="mail" className="form-control form-control-sm" id="congtrinh_ten" />
                                </div>
                                <div className="mb-2 col-sm-2">
                                    <label htmlFor="gp_ngayhieuluc" className="form-label fw-bold m-0">1.7.Hiệu lực từ ngày</label>
                                    <input type="mail" className="form-control form-control-sm" id="gp_ngayhieuluc" />
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0">
                                <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.Nội dung đề nghị gia hạn giấy phép: </p>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="congtring_diachi" className="form-label fw-bold m-0">2.1.Vị trí công trình khai thác </label>
                                        <input type="text" className="form-control form-control-sm" id="congtring_diachi" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="mucdich_ktsd" className="form-label fw-bold m-0">2.2.Mục đích khai thác, sử dụng nước</label>
                                        <input type="text" className="form-control form-control-sm" id="mucdich_ktsd" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tangchuanuoc" className="form-label fw-bold m-0">2.3.Tầng chứa nước khai thác  </label>
                                        <input type="text" className="form-control form-control-sm" id="tangchuanuoc" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="sogieng_quantrac" className="form-label fw-bold m-0">2.4.Số giếng khai thác   </label>
                                        <input type="text" className="form-control form-control-sm" id="sogieng_quantrac" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="tongluuluong_ktsd_max" className="form-label fw-bold m-0">2.5.Tổng lượng nước khai thác (m3/ngày đêm) </label>
                                        <input type="text" className="form-control form-control-sm" id="tongluuluong_ktsd_max" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="gp_thoigiancapphep" className="form-label fw-bold m-0">2.6.Thời gian đề nghị cấp phép</label>
                                        <input type="text" className="form-control form-control-sm" id="gp_thoigiancapphep" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="gp_thoigiancapphep" className="form-label fw-bold m-0">2.7.Lý do đề nghị gia hạn giấy phép</label>
                                        <input type="text" className="form-control form-control-sm" id="gp_thoigiancapphep" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2">
                                        <label htmlFor="gp_thoigiancapphep" className="form-label fw-bold m-0">2.8.Nội dung đề nghị gia hạn giấy phép</label>
                                        <input type="text" className="form-control form-control-sm" id="gp_thoigiancapphep" />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="mb-2 row m-0">
                                        <label className="form-label fw-bold col-12 p-0">2.9.Số hiệu, vị trí và thông số của công trình khai thác</label>
                                        <div className="col-sm-10 p-0 table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center align-center" rowSpan="2">Số hiệu</th>
                                                        <th className="text-center align-center" colSpan="2">Tọa độ (VN2000, kinh tuyến trục,...múi chiếu,...)</th>
                                                        <th className="text-center align-center" rowSpan="2">Lưu lượng(m3/ngày đêm)</th>
                                                        <th className="text-center align-center" rowSpan="2">Chế độ khai thác (giờ/ngày đêm)</th>
                                                        <th className="text-center align-center" colSpan="2">Chiều sâu đoạn thu nước(m)</th>
                                                        <th className="text-center align-center" rowSpan="2">Chiều sâu mực nước tĩnh(m)</th>
                                                        <th className="text-center align-center" rowSpan="2">Chiều sâu mực nước động lớn nhất cho phép (m)</th>
                                                        <th className="text-center align-center" rowSpan="2">Tầng chứa nước khai thác</th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-center align-center">X</th>
                                                        <th className="text-center align-center">Y</th>
                                                        <th className="text-center align-center">Từ</th>
                                                        <th className="text-center align-center">Đến</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-sm-2 row m-0">
                                            <div className="w-100">
                                                <button className="mb-2 w-100 btn btn-sm btn-primary ">Thêm</button>
                                                <button className="mb-2 w-100 btn btn-sm btn-warning ">Sửa</button>
                                                <button className="mb-2 w-100 btn btn-sm btn-danger ">Xóa</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-7">
                                    <div className="mb-2 d-flex mx-0">
                                        <label htmlFor="filesodo" className="form-label d-block w-75 m-0 fw-bold">2.10.Sơ đồ khu vực và vị trí công trình khai thác nước kèm theo</label>
                                        <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="filesodo" /></div>
                                    </div>
                                </div>
                                <div className="col-sm-6 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">3.Giấy tờ, tài liệu nộp kèm theo</p>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="filesodo" className="form-label d-block w-75 m-0 font-13">- Sơ đồ khu vực và vị trí công trình khai thác nước dưới đất</label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="filesodo" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="filesodo" className="form-label d-block w-75 m-0 font-13">- Báo cáo kết quả thăm dò đánh giá trữ lượng nước dưới đất</label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="filesodo" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="filesodo" className="form-label d-block w-75 m-0 font-13">- Báo cáo hiện trạng khai thác </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="filesodo" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="filesodo" className="form-label d-block w-75 m-0 font-13">- Phiếu kết quả phân tích chất lượng nguồn nước dưới đất </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="filesodo" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="filesodo" className="form-label d-block w-75 m-0 font-13">- Văn bản góp ý và tổng hợp tiếp thu, giải trình lấy ý kiến cộng đồng  </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="filesodo" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2 d-flex mx-0">
                                            <label htmlFor="filesodo" className="form-label d-block w-75 m-0 font-13">- Các giấy tờ, tài liệu khác có liên quan </label>
                                            <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="filesodo" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0">
                                    <div className="col-sm-12 row m-0 p-0">
                                        <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Cam kết của tổ chức/cá nhân đề nghị cấp phép</p>
                                        <div className="col-sm-12 mt-2">
                                            <div className="mb-2 d-flex mx-0">
                                                <div><input type="checkbox" id="camket_dungsuthat" /></div>
                                                <label htmlFor="camket_dungsuthat" className="form-label d-block w-75 m-0 font-13 fw-bold mx-2">Đúng sự thật</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 mt-2">
                                            <div className="mb-2 d-flex mx-0">
                                                <div><input type="checkbox" id="camket_chaphanhdayduquydinh" /></div>
                                                <label htmlFor="camket_chaphanhdayduquydinh" className="form-label d-block w-75 m-0 font-13 fw-bold mx-2">Chấp hành đúng, đầy đủ các quy định</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 mt-2">
                                            <div className="mb-2 d-flex mx-0">
                                                <div><input type="checkbox" id="camket_daguihosotoibtnmt" /></div>
                                                <label htmlFor="camket_daguihosotoibtnmt" className="form-label d-block w-75 m-0 font-13 fw-bold mx-2">Đã gửi một (01) bộ hồ sơ tới Sở Tài nguyên và Môi trường</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 row m-0 p-0">
                                        <p className="fw-bold w-100 text-violet p-2 m-0 font-15">5.Tình trạng hồ sơ đề nghị cấp phép  </p>
                                        <div className="col-sm-12">
                                            <div className="mb-2 d-flex mx-0">
                                                <label htmlFor="filesodo" className="form-label d-block w-75 m-0 font-13 text-primary fw-bold">Nộp hồ sơ  </label>
                                                <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="filesodo" /></div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="mb-2 d-flex mx-0">
                                                <label htmlFor="filesodo" className="form-label d-block w-75 m-0 font-13 text-primary fw-bold">Đang lấy ý kiến thẩm định</label>
                                                <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="filesodo" /></div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="mb-2 d-flex mx-0">
                                                <label htmlFor="filesodo" className="form-label d-block w-75 m-0 font-13 text-primary fw-bold">Hoàn thành hồ sơ cấp phép </label>
                                                <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="filesodo" /></div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="mb-2 d-flex mx-0">
                                                <label htmlFor="filesodo" className="form-label d-block w-75 m-0 font-13 text-primary fw-bold">Đã được cấp phép</label>
                                                <div className="w-25"><input type="file" className="form-control form-control-sm w-100" id="filesodo" /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-4 text-center col-sm-12">
                                <hr />
                                <button className="btn btn-primary mx-2 fw-bold font-14">GỬI GIẤY PHÉP</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}