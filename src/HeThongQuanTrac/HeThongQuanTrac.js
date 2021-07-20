import React from "react";
import Header from "../Shared/Header";
import { Link } from "react-router-dom";

import Map from '../Shared/Map';


export default class HeThongQuanTrac extends React.Component{
    render(){
        return(
            <div className="p-0">
                <Header headTitle="HỆ THỐNG QUAN TRẮC" previousLink="/" showHeadImage={true} layout37={true} />
                <main className="row m-0 p-0">
                    <div className="col-12 col-lg-3 px-0 menu-home">
                        <div className="row m-0 p-0 surfacewater-usage">
                            <p className="exploit-surfacewater-title mb-2 p-2 fw-bold text-start font-12">NƯỚC MẶT</p>
                            <Link to="/he-thong-quan-trac/nuoc-mat/mua" className="col-sm-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 w-100 text-center text-violet fw-bold font-12 quantrac_title">MƯA</p>
                                    <div className="col-sm-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                        <p className="mb-0 w-100 text-center text-danger fw-bold fst-italic">Trạm</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_MUA.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_MUA" />
                                    </div>
                                </div>
                            </Link>
                            <Link to="/he-thong-quan-trac/nuoc-mat/ho-chua" className="col-sm-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 w-100 text-center text-violet fw-bold font-12 quantrac_title">MỰC NƯỚC HỒ</p>
                                    <div className="col-sm-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                        <p className="mb-0 w-100 text-center text-danger fw-bold fst-italic">Hồ</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_MUC_NUOC_HO.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_MUC_NUOC_HO" />
                                    </div>
                                </div>
                            </Link>
                            <Link to="#" className="col-sm-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 w-100 text-center text-violet fw-bold font-12 quantrac_title">Q ĐẾN HỒ (m3/s)</p>
                                    <div className="col-sm-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                        <p className="mb-0 w-100 text-center text-danger fw-bold fst-italic">Hồ</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_QDEN.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_QDEN" />
                                    </div>
                                </div>
                            </Link>
                            <Link to="#" className="col-sm-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 w-100 text-center text-violet fw-bold font-12 quantrac_title">Q XẢ QUA NHÀ MÁY (m3/s)</p>
                                    <div className="col-sm-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                        <p className="mb-0 w-100 text-center text-danger fw-bold fst-italic">Hồ</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_Q_XA_NHA_MAY.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_Q_XA_NHA_MAY" />
                                    </div>
                                </div>
                            </Link>
                            <Link to="#" className="col-sm-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 w-100 text-center text-violet fw-bold font-12 quantrac_title">Q XẢ QUA TRÀN (m3/s)</p>
                                    <div className="col-sm-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                        <p className="mb-0 w-100 text-center text-danger fw-bold fst-italic">Hồ</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_Q_XA_TRAN.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_Q_XA_TRAN" />
                                    </div>
                                </div>
                            </Link>
                            <Link to="#" className="col-sm-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 w-100 text-center text-violet fw-bold font-12 quantrac_title">Q KHAI THÁC (m3/s)</p>
                                    <div className="col-sm-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                        <p className="mb-0 w-100 text-center text-danger fw-bold fst-italic">Hồ</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_KHAI_THAC.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_KHAI_THAC" />
                                    </div>
                                </div>
                            </Link>
                            <Link to="#" className="col-sm-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 w-100 text-center text-violet fw-bold font-12 quantrac_title">Q XẢ TỐI THIỂU (m3/s)</p>
                                    <div className="col-sm-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                        <p className="mb-0 w-100 text-center text-danger fw-bold fst-italic">Hồ</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_QTOITHIEU.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_QTOITHIEU" />
                                    </div>
                                </div>
                            </Link>
                            <Link to="#" className="col-sm-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 w-100 text-center text-violet fw-bold font-12 quantrac_title">CHẤT LƯỢNG NƯỚC TRONG QUÁ TRÌNH KHAI THÁC (m3/s)</p>
                                    <div className="col-sm-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                        <p className="mb-0 w-100 text-center text-danger fw-bold fst-italic">Hồ</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_CLN_TRONG_QUA_TRINH_KT.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_CLN_TRONG_QUA_TRINH_KT" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="row m-0 p-0 surfacewater-usage">
                            <p className="exploit-surfacewater-title mb-2 p-2 fw-bold text-start font-12">NƯỚC DƯỚI ĐẤT</p>
                            <Link to="#" className="col-sm-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 w-100 text-center text-violet fw-bold font-12 quantrac_title">LƯU LƯỢNG KHAI THÁC NDD (m3/ngày đêm)</p>
                                    <div className="col-sm-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                        <p className="mb-0 w-100 text-center text-danger fw-bold fst-italic">Giếng</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_LUULUONGKHAITHACNDD.png'} alt="HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_LUULUONGKHAITHACNDD" />
                                    </div>
                                </div>
                            </Link>
                            <Link to="#" className="col-sm-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 w-100 text-center text-violet fw-bold font-12 quantrac_title">MỰC NƯỚC TRONG GIẾNG KHAI THÁC (m)</p>
                                    <div className="col-sm-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                        <p className="mb-0 w-100 text-center text-danger fw-bold fst-italic">Giếng</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/MUC_NUOC_GIENG_KT.png'} alt="HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/MUC_NUOC_GIENG_KT" />
                                    </div>
                                </div>
                            </Link>
                            <Link to="#" className="col-sm-6 mb-3 justify-content-center quantrac_item">
                                <div className="surfacewater-usage p-1 row mx-0">
                                    <p className="mb-0 w-100 text-center text-violet fw-bold font-12 quantrac_title">CHẤT LƯỢNG NƯỚC TRONG QUÁ TRÌNH KHAI THÁC (m3/s)</p>
                                    <div className="col-sm-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                        <p className="mb-0 w-100 text-center text-danger fw-bold fst-italic">Giếng</p>
                                    </div>
                                    <div className="col-sm-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_CLN_TRONG_QT_KT.png'} alt="HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_CLN_TRONG_QT_KT" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-12 col-lg-9 map-container px-md-0 position-relative">
                        <Map />
                    </div>
                </main>
            </div>
        )
    }

}