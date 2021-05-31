import React from 'react';
import Header from '../../layout/Header';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

export default class BaoCaoBieuMau extends React.Component {

    componentDidMount(){
        document.title = "Báo cáo biểu mẫu | Giám sát tài nguyên nước Sơn La";
    }

    render(){

        return(
			<div className="p-0">
                <Header headTitle="BÁO CÁO BIỂU MẪU" previousLink="/" showHeadImage={true} />
                <main className="d-flex flex-column">
                    <div className="col-12 col-sm-4 row px-0 mx-0 py-2 mx-auto">
                        <input type="text" className="form-control form-control-sm w-75" placeholder="Tìm kiếm"  />
                        <button className="btn btn-outline-danger justify-content-center d-flex align-items-center w-25" type="button"><SearchOutlined /></button>
                    </div>
                    <div className="col-12 px-0">
                        <div className="col-12 px-0 d-flex flex-column flex-lg-row h-100">
                            {/* Block 1 */}
                            <div className="col-12 col-lg-3 pb-lg-0 px-0 mb-lg-3 report-block-one">
                                <Link to="#" className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 01</p>
                                        <p className="text-success fw-bold">Số lượng trạm quan trắc</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU1.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU1" />
                                </Link>
                                <Link to="#" className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 02</p>
                                        <p className="text-success fw-bold">Tổng lượng mưa, phân phối mưa</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU2.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU2" />
                                </Link>
                                <Link to="#" className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 03</p>
                                        <p className="text-success fw-bold">Lượng mưa tháng, năm kỳ báo cáo</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU3.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU3" />
                                </Link>
                                <Link to="#" className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 04</p>
                                        <p className="text-success fw-bold">Tổng lượng nước mặt trên các LVS</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU4.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU4" />
                                </Link>
                                <Link to="#" className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 05</p>
                                        <p className="text-success fw-bold">Dòng chảy TB tháng, năm kỳ báo cáo</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU5.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU5" />
                                </Link>
                                <Link to="#" className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 06</p>
                                        <p className="text-success fw-bold">Tổng dung tích các hồ chứa lớn</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU6.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU6" />
                                </Link>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 07</p>
                                        <p className="text-success fw-bold">Diện tích đã được điều tra đánh giá TNNDĐ</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU7.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU7" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 08</p>
                                        <p className="text-success fw-bold">Tổng hợp các đặc trưng MNDĐ</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU8.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU8" />
                                </div>
                            </div>

                            {/* Block 2 */}
                            <div className="col-12 col-lg-3 pb-lg-0 px-0 mb-lg-3 report-block-two">
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 09</p>
                                        <p className="text-success fw-bold">Số lượng CTKT theo nguồn nước</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU9.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU9" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 10</p>
                                        <p className="text-success fw-bold">Số lượng CTKT phân theo sử dụng</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU10.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU10" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 11</p>
                                        <p className="text-success fw-bold">Số lượng CTKT phân theo loại hình</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU11.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU11" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 12</p>
                                        <p className="text-success fw-bold">Lượng nước khai thác sử dụng</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU12.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU12" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 13</p>
                                        <p className="text-success fw-bold">Chỉ tiêu chất lượng nước mặt</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU13.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU13" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 14</p>
                                        <p className="text-success fw-bold">Chỉ tiêu chất lượng nước dưới đất</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU14.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU14" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 15</p>
                                        <p className="text-success fw-bold">Văn bản PLTNN đã ban hành</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU15.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU15" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 16</p>
                                        <p className="text-success fw-bold">Số lượng giấy phép TNN đã cấp</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU16.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU16" />
                                </div>
                            </div>

                            {/* Block 3 */}
                            <div className="col-12 col-lg-3 px-0 pb-lg-0 px-lg-0 mb-lg-3 report-block-three">
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 17</p>
                                        <p className="text-success fw-bold">Cấp quyền khai thác</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU17.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU17" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 18</p>
                                        <p className="text-success fw-bold">Dòng chảy tối thiểu</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU18.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU10" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 19</p>
                                        <p className="text-success fw-bold">Kết quả thanh tra trong lĩnh vực TNN</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU19.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU11" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 20</p>
                                        <p className="text-success fw-bold">Danh mục các CTKT, SD tài nguyên nước</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU20.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU12" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 21</p>
                                        <p className="text-success fw-bold">KT, SD nước mặt đối với loại hình hồ chứa</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU21.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU13" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu22</p>
                                        <p className="text-success fw-bold">KT, SD nước mặt đối với loại hình khác hồ chứa</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU22.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU14" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 23</p>
                                        <p className="text-success fw-bold">KT, SD nước nước dưới đất</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU23.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU15" />
                                </div>
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 24</p>
                                        <p className="text-success fw-bold">Tổng hợp tình hình xả nước thải </p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU24.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU16" />
                                </div>
                            </div>

                            {/* Block 4 */}
                            <div className="col-12 col-lg-3 pb-lg-0 row mx-0 px-0 mb-lg-3 report-block-four">
                                <div className="nav-link col-12 d-flex align-items-center report-item report-item-one py-3 py-lg-0">
                                    <div className="col-8 p-0">
                                        <p className="text-danger fw-bold pt-2 mb-1">Biểu mẫu 25</p>
                                        <p className="text-success fw-bold">Nồng độ chất ô nhiễm</p>
                                    </div>
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/ANHBIEUMAU25.webp'} className="col-4 p-0 d-block" alt="ANHBIEUMAU25" />
                                </div>
                                <div className="col-12 d-flex flex-column align-items-center report-item report-item-four pt-4">
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/bao-cao-su-dung-tnn.webp'} className="col-4 p-0 my-2 d-block" alt="bao-cao-su-dung-tnn" />
                                    <div className="col-12 col-sm-9 p-0">
                                        <p className="text-danger fw-bold text-center">BÁO CÁO SỬ DỤNG TNN</p>
                                    </div>
                                </div>
                                <div className="col-12 d-flex flex-column align-items-center report-item report-item-four pt-4">
                                    <img src={process.env.PUBLIC_URL + '/images/BAO_CAO_BIEU_MAU/bao-cao-khai-thac-su-dung-xa-thai.webp'} className="col-4 p-0 my-2 d-block" alt="bao-cao-khai-thac-su-dung-xa-thai" />
                                    <div className="col-12 col-sm-9 p-0">
                                        <p className="text-danger fw-bold text-center">BÁO CÁO HOẠT ĐỘNG KTSD, <br/> XẢ THẢI</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}