import React from 'react';
import { Link } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';

export default class MobileNav extends React.Component {
    render(){
        return(
            <nav id="mobileNav" role="navigation">
                <div id="menuToggle">
                        <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>
                    <ul id="menu">
                        <ul className="nav flex-column nav-pills pl-2 pb-1 mx-auto my-3 rounded">
                            <div>
                                <p className="btn btn-outline-dark col-12 col-sm-11 mx-auto font-13 btn-sm d-flex justify-content-center align-items-center fw-bold"> <InfoCircleOutlined className="mx-1" /> GIỚI THIỆU CHUNG</p>
                                <p className="exploit-surfacewater-title mb-1 p-2 fw-bold text-start font-12">KHAI THÁC SỬ DỤNG NƯỚC MẶT</p>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/nuoc-mat/thuy-dien" className="nav-link font-13 hover-link" href="#">Thủy Điện</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/nuoc-mat/ho-chua" className="nav-link font-13 hover-link">Hồ Chứa</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/nuoc-mat/tram-bom" className="nav-link font-13 hover-link">Trạm Bơm</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi" className="nav-link font-13 hover-link">Đập / Hệ Thống Thủy Lợi</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/nuoc-mat/cong" className="nav-link font-13 hover-link">Cống</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc" className="nav-link font-13 hover-link">Trạm Cấp Nước</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc" className="nav-link font-13 hover-link">Nhà Máy Nước</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/nuoc-mat/cong-trinh-khac" className="nav-link font-13 hover-link">Công Trình Khác</Link>
                                </li>
                            </div>
                            <div className="exploit-surfacewater">
                                <p className="exploit-surfacewater-title mb-1 p-2 fw-bold text-start font-12">KHAI THÁC NƯỚC DƯỚI ĐẤT</p>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac" className="nav-link font-13 hover-link">Khai Thác</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do" className="nav-link font-13 hover-link">Thăm Dò</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan" className="nav-link font-13 hover-link">Hành Nghề Khoan</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac" className="nav-link font-13 hover-link">Công Trình Khác</Link>
                                </li>
                            </div>
                            <div className="exploit-surfacewater">
                                <p className="exploit-surfacewater-title mb-1 p-2 fw-bold text-start font-12">XẢ THẢI VÀO NGUỒN NƯỚC</p>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/xa-thai-khu-cum-cong-nghiep-tap-trung" className="nav-link font-13 hover-link">Khu / Cụm CN  Tập Trung</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/xa-thai-cssx-tieu-thu-cn" className="nav-link font-13 hover-link">SX Tiểu Thủ CN</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/xa-thai-cssx-kinh-doanh-dich-vu" className="nav-link font-13 hover-link">SX KD Dịch Vụ</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/xa-thai-cs-benh-vien" className="nav-link font-13 hover-link">CS Bệnh Viện</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/xa-thai-khu-dan-cu" className="nav-link font-13 hover-link">Khu Dân Cư / Làng Nghề</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/xa-thai-chan-nuoi" className="nav-link font-13 hover-link">Chăn Nuôi / NTTS</Link>
                                </li>
                                <li className="nav-item border-bottom py-0">
                                    <Link to="/quan-ly-cap-phep/xa-thai-khac" className="nav-link font-13 hover-link">Công Trình Khác</Link>
                                </li>
                            </div>
                        </ul>
                    </ul>
                </div>
            </nav>
        )
    }
}