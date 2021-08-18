import React from 'react';
import Header from '../../../Shared/Header';
import DemGiayPhep from './DemGiayPhep';
import { Button } from 'react-bootstrap';

export default class QuanLyCapPhepTheoDoiGiayPhepXaThaiKhuDanCu extends React.Component {

    render(){
        return(
			<div className="p-0">
                <Header headTitle="THÔNG TIN THEO DÕI CÔNG TRÌNH SAU CẤP PHÉP XẢ THẢI KHU DÂN CƯ/ LÀNG NGHỀ" previousLink="/quan-ly-cap-phep/xa-thai-khu-dan-cu/quan-ly-cap-moi" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <form>
                            <div>
                                <div className="1">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">1.Thông tin chủ công trình</p>
                                    <div className="row m-0">
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="chugiayphep_ten" className="form-label fw-bold font-13 m-0">1.1.Tên tổ chức/cá nhân</label>
                                                <input type="text" required className="form-control form-control-sm" id="chugiayphep_ten" name="chugiayphep_ten"  />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                    <label htmlFor="chugiayphep_sogiaykangkykinhdoanh" className="form-label fw-bold font-13 m-0">1.2.Số Giấy đăng ký kinh doanh</label>
                                                    <input type="text" required className="form-control form-control-sm" id="chugiayphep_sogiaykangkykinhdoanh" name="chugiayphep_sogiaykangkykinhdoanh"  />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-2">
                                                    <label htmlFor="chugiayphep_diachi" className="form-label fw-bold font-13 m-0">1.3.Địa chỉ</label>
                                                    <input type="text" required className="form-control form-control-sm" id="chugiayphep_diachi" name="chugiayphep_diachi"  />
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="mb-2">
                                                    <label htmlFor="chugiayphep_phone" className="form-label fw-bold font-13 m-0">1.4.Điện thoại</label>
                                                    <input type="text" required className="form-control form-control-sm" id="chugiayphep_phone" name="chugiayphep_phone"  />
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="mb-2">
                                                    <label htmlFor="chugiayphep_fax" className="form-label fw-bold font-13 m-0">1.5.Fax</label>
                                                    <input type="text" required className="form-control form-control-sm" id="chugiayphep_fax" name="chugiayphep_fax"  />
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="mb-2">
                                                    <label htmlFor="chugiayphep_email" className="form-label fw-bold font-13 m-0">1.6.Email</label>
                                                    <input type="email" required className="form-control form-control-sm" id="chugiayphep_email" name="chugiayphep_email"  />
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div className="col-12 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">2.Thông tin về cơ sở xả nước thải:</p>
                                    <div className="col-sm-8">
                                        <div className="mb-2">
                                            <label htmlFor="congtrinh_ten" className="form-label fw-bold font-13 m-0">2.1.Loại hình, quy mô xả nước thải </label>
                                            <input type="text" required className="form-control form-control-sm" id="congtrinh_ten" name="congtrinh_ten" />
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="mb-2">
                                            <label htmlFor="congtrinh_diadiem" className="form-label fw-bold font-13 m-0">2.2.Năm vận hành </label>
                                            <input type="text" required className="form-control form-control-sm" id="congtrinh_diadiem" name="congtrinh_diadiem" />
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="mb-2">
                                            <label htmlFor="mucdich_ktsd" className="form-label fw-bold font-13 m-0">2.3.Công suất xử lý nước thải </label>
                                            <input type="text" required className="form-control form-control-sm" id="mucdich_ktsd" name="mucdich_ktsd" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 row m-0 p-0">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">3.Nội dung đề nghị gia hạn, điều chỉnh:</p>
                                    <div className="col-sm-4">
                                        <div className="mb-2">
                                            <label htmlFor="xathai_nguontiepnhan" className="form-label fw-bold font-13 m-0">3.1.Nguồn nước tiếp nhận nước thải</label>
                                            <input type="text" className="form-control form-control-sm" id="xathai_nguontiepnhan" name="xathai_nguontiepnhan" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="mb-2">
                                            <label htmlFor="xathai_vitri" className="form-label fw-bold font-13 m-0">3.2.Vị trí xả nước thải</label>
                                            <input type="text" className="form-control form-control-sm" id="xathai_vitri" name="xathai_vitri" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="mb-2">
                                            <label className="form-label fw-bold font-13 m-0">3.3.Tọa độ vị trí xả nước thải (hệ tọa độ VN2000)</label>
                                            <div className="row m-0">
                                                <div className="col-sm-6 d-flex align-items-center">
                                                    <label htmlFor="xathai_toado_x" className="form-label fw-bold font-13 m-0 w-25 text-end pe-2">X:</label>
                                                    <input type="text" className="form-control form-control-sm w-75" id="xathai_toado_x" name="xathai_toado_x" />
                                                </div>
                                                <div className="col-sm-6 d-flex align-items-center">
                                                    <label htmlFor="xathai_toado_y" className="form-label fw-bold font-13 m-0 w-25 text-end pe-2">Y:</label>
                                                    <input type="text" className="form-control form-control-sm w-75" id="xathai_toado_y" name="xathai_toado_y" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="mb-2">
                                            <label htmlFor="xathai_phuongthuc" className="form-label fw-bold font-13 m-0">3.4.Phương thức xả nước thải</label>
                                            <input type="text" className="form-control form-control-sm" id="xathai_phuongthuc" name="xathai_phuongthuc" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="mb-2">
                                            <label htmlFor="xathai_chedo" className="form-label fw-bold font-13 m-0">3.5.Chế độ xả nước thải</label>
                                            <input type="text" className="form-control form-control-sm" id="xathai_chedo" name="xathai_chedo" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="mb-2">
                                            <label htmlFor="xathai_luuluongxa_trungbinh" className="form-label fw-bold font-13 m-0">3.6.Lưu lượng xả trung bình (m3/ngày đêm)</label>
                                            <input type="text" className="form-control form-control-sm" id="xathai_luuluongxa_trungbinh" name="xathai_luuluongxa_trungbinh" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="mb-2">
                                            <label htmlFor="xathai_luuluongxa_max" className="form-label fw-bold font-13 m-0">3.7.Lưu lượng xả lớn nhất (m3/ngày đêm)</label>
                                            <input type="text" className="form-control form-control-sm" id="xathai_luuluongxa_max" name="xathai_luuluongxa_max" />
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="mb-2">
                                            <label htmlFor="xathai_héokq" className="form-label fw-bold font-13 m-0">3.8.Hệ số Kq</label>
                                            <input type="text" className="form-control form-control-sm" id="xathai_héokq" name="xathai_héokq" />
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="mb-2">
                                            <label htmlFor="xathai_héokf" className="form-label fw-bold font-13 m-0">3.9.Hệ số Kf</label>
                                            <input type="text" className="form-control form-control-sm" id="xathai_héokf" name="xathai_héokf" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="mb-2">
                                            <label htmlFor="xathai_quychuanquocgia" className="form-label fw-bold font-13 m-0">3.10.Quy chuẩn quốc gia về chất lượng nước thải</label>
                                            <input type="text" className="form-control form-control-sm" id="xathai_quychuanquocgia" name="xathai_quychuanquocgia" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="mb-2">
                                            <label htmlFor="xathai_thoigiancapphep" className="form-label fw-bold font-13 m-0">3.11.Thời gian đề nghị gia hạn, điều chỉnh</label>
                                            <input type="text" className="form-control form-control-sm" id="xathai_thoigiancapphep" name="xathai_thoigiancapphep" />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="mb-2">
                                            <label htmlFor="tailieu_donxincapphep" className="form-label fw-bold font-13 m-0">3.12.Chất lượng nước thải</label>
                                            <div className="col-sm-12 p-0 table-responsive">
                                                <table className="table table-bordered"> 
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center align-middle">TT</th>
                                                            <th className="text-center align-middle">Chỉ tiêu</th>
                                                            <th className="text-center align-middle">Đơn vị</th>
                                                            <th className="text-center align-middle">Giá trị giới hạn tối đa</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">1</td>
                                                            <td className="text-center align-middle p-0">Nhiệt độ</td>
                                                            <td className="text-center align-middle p-0">&ordm;C</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">2</td>
                                                            <td className="text-center align-middle p-0">Màu</td>
                                                            <td className="text-center align-middle p-0">Pt/Co</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">3</td>
                                                            <td className="text-center align-middle p-0">pH</td>
                                                            <td className="text-center align-middle p-0"> _ </td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">4</td>
                                                            <td className="text-center align-middle p-0">BOD₅(20&ordm;C)</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">5</td>
                                                            <td className="text-center align-middle p-0">COD</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">6</td>
                                                            <td className="text-center align-middle p-0">Chất lắng lơ lửng(TSS)</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">7</td>
                                                            <td className="text-center align-middle p-0">Asen</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">8</td>
                                                            <td className="text-center align-middle p-0">Thủy ngân</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">9</td>
                                                            <td className="text-center align-middle p-0">Chì</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">10</td>
                                                            <td className="text-center align-middle p-0">Cadimi</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">11</td>
                                                            <td className="text-center align-middle p-0">Crom(III)</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">12</td>
                                                            <td className="text-center align-middle p-0">Đồng</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">13</td>
                                                            <td className="text-center align-middle p-0">Kẽm</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">14</td>
                                                            <td className="text-center align-middle p-0">Mangan</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">15</td>
                                                            <td className="text-center align-middle p-0">Sắt</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">16</td>
                                                            <td className="text-center align-middle p-0">Tổng Xianua</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">17</td>
                                                            <td className="text-center align-middle p-0">Tổng dầu mỡ</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">18</td>
                                                            <td className="text-center align-middle p-0">Xunfua</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">19</td>
                                                            <td className="text-center align-middle p-0">Amoni(Tính theo N)</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">20</td>
                                                            <td className="text-center align-middle p-0">Tổng nitơ</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">21</td>
                                                            <td className="text-center align-middle p-0">Tổng Phốt pho(Tính theo N)</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">22</td>
                                                            <td className="text-center align-middle p-0">Clorua</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">23</td>
                                                            <td className="text-center align-middle p-0">Clo dư</td>
                                                            <td className="text-center align-middle p-0">mg/l</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center align-middle p-0">24</td>
                                                            <td className="text-center align-middle p-0">Coliform</td>
                                                            <td className="text-center align-middle p-0">NPN/100ml</td>
                                                            <td className="text-center align-middle p-0">
                                                                <input type="text" className="form-control form-control-sm" />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="3">
                                    <p className="fw-bold w-100 text-violet p-2 m-0 font-15">4.Thanh tra/kiểm tra</p>
                                    <div className="row m-0">
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="thanhtra_tendot" className="form-label fw-bold font-13 m-0">4.1.Tên đợt thanh tra</label>
                                                <input type="text" required className="form-control form-control-sm" id="thanhtra_tendot" name="thanhtra_tendot"  />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="thanhtra_tentruongdoan" className="form-label fw-bold font-13 m-0">4.2.Tên trưởng đoàn</label>
                                                <input type="text" required className="form-control form-control-sm" id="thanhtra_tentruongdoan" name="thanhtra_tentruongdoan"  />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="thanhtra_thoigianthuchien" className="form-label fw-bold font-13 m-0">4.3.Thời gian thực hiện thanh tra</label>
                                                <input type="text" required className="form-control form-control-sm" id="thanhtra_thoigianthuchien" name="thanhtra_thoigianthuchien"  />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2">
                                                <label htmlFor="thanhtra_thanhphandoan" className="form-label fw-bold font-13 m-0">4.4.Thành phần đoàn thanh tra</label>
                                                <input type="text" required className="form-control form-control-sm" id="thanhtra_thanhphandoan" name="thanhtra_thanhphandoan"  />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="mb-2">
                                                <label htmlFor="thanhtra_ketluan" className="form-label fw-bold font-13 m-0">4.5.Kết luận thanh tra</label>
                                                <textarea rows="5" className="form-control form-control-sm" id="thanhtra_ketluan" name="thanhtra_ketluan" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-0">
                                    <div className="4 col-sm-6">
                                        <p className="fw-bold w-100 text-violet p-2 m-0 font-15">5.Theo dõi sau cấp phép</p>
                                        <div className="row m-0">
                                            <div className="col-sm-6">
                                                <div className="mb-2">
                                                    <label htmlFor="theodoisaucp_vanbanso" className="form-label fw-bold font-13 m-0">5.1.Văn bản số</label>
                                                    <input type="text" required className="form-control form-control-sm" id="theodoisaucp_vanbanso" name="theodoisaucp_vanbanso"  />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-2">
                                                    <label htmlFor="thepdoisaucp_noidung" className="form-label fw-bold font-13 m-0">5.2.Nội dung</label>
                                                    <input type="text" required className="form-control form-control-sm" id="thepdoisaucp_noidung" name="thepdoisaucp_noidung"  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="5 col-sm-6">
                                        <p className="fw-bold w-100 text-violet p-2 m-0 font-15">6.Theo dõi quá trình kết nối/ giám sát</p>
                                        <div className="row m-0">
                                            <div className="col-sm-4">
                                                <div className="mb-2">
                                                    <label htmlFor="theodoiquatrinh_ketnoi_giamsat_tudong" className="form-label fw-bold font-13 m-0">6.1.Tự động</label>
                                                    <input type="text" required className="form-control form-control-sm" id="theodoiquatrinh_ketnoi_giamsat_tudong" name="theodoiquatrinh_ketnoi_giamsat_tudong"  />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="mb-2">
                                                    <label htmlFor="theodoiquatrinh_ketnoi_giamsat_tructuyen" className="form-label fw-bold font-13 m-0">6.2.Trực tuyến</label>
                                                    <input type="text" required className="form-control form-control-sm" id="theodoiquatrinh_ketnoi_giamsat_tructuyen" name="theodoiquatrinh_ketnoi_giamsat_tructuyen"  />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="mb-2">
                                                    <label htmlFor="theodoiquatrinh_ketnoi_giamsat_dinhky" className="form-label fw-bold font-13 m-0">6.3.Định kỳ</label>
                                                    <input type="text" required className="form-control form-control-sm" id="theodoiquatrinh_ketnoi_giamsat_dinhky" name="theodoiquatrinh_ketnoi_giamsat_dinhky"  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row m-0 justify-content-between mb-5 px-4">
                                    <Button variant="primary" className="col-sm-2">Sửa</Button>
                                    <Button variant="primary" className="col-sm-2">Xóa</Button>
                                    <Button variant="primary" className="col-sm-2">Ghi</Button>
                                    <Button variant="primary" className="col-sm-2">In</Button>
                                    <Button variant="primary" className="col-sm-2">Xuất PDF</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}