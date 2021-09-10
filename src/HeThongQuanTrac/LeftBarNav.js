import React from 'react';
import { Link } from 'react-router-dom';

export default class LeftBarNav extends React.Component {
    render(){
        return(
            <div>
                <div className="row m-0 p-0 surfacewater-usage">
                    <p className="exploit-surfacewater-title mb-2 p-2 fw-bold text-start font-12">NƯỚC MẶT</p>
                    <Link to="/he-thong-quan-trac/nuoc-mat/mua" className="col-6 mb-3 justify-content-center quantrac_item">
                        <div className="surfacewater-usage p-1 row mx-0">
                            <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">MƯA</p>
                            <div className="row mx-0">
                                <div className="col-5 row mx-0 align-items-center">
                                    <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                    <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Trạm</p>
                                </div>
                                <div className="col-7">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_MUA.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_MUA" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/he-thong-quan-trac/nuoc-mat/ho-chua" className="col-6 mb-3 justify-content-center quantrac_item">
                        <div className="surfacewater-usage p-1 row mx-0">
                            <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">MỰC NƯỚC HỒ</p>
                            <div className="row mx-0">
                                <div className="col-5 row mx-0 align-items-center">
                                    <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                    <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Hồ</p>
                                </div>
                                <div className="col-7">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_MUC_NUOC_HO.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_MUC_NUOC_HO" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/he-thong-quan-trac/nuoc-mat/luu-luong-den-ho" className="col-6 mb-3 justify-content-center quantrac_item">
                        <div className="surfacewater-usage p-1 row mx-0">
                            <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">Q ĐẾN HỒ (m3/s)</p>
                            <div className="row mx-0">
                                <div className="col-5 row mx-0 align-items-center">
                                    <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                    <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Hồ</p>
                                </div>
                                <div className="col-7">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_QDEN.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_QDEN" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-qua-nha-may" className="col-6 mb-3 justify-content-center quantrac_item">
                        <div className="surfacewater-usage p-1 row mx-0">
                            <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">Q XẢ QUA NHÀ MÁY (m3/s)</p>
                            <div className="row mx-0">
                                <div className="col-5 row mx-0 align-items-center">
                                    <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                    <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Hồ</p>
                                </div>
                                <div className="col-7">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_Q_XA_NHA_MAY.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_Q_XA_NHA_MAY" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-qua-tran" className="col-6 mb-3 justify-content-center quantrac_item">
                        <div className="surfacewater-usage p-1 row mx-0">
                            <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">Q XẢ QUA TRÀN (m3/s)</p>
                            <div className="row mx-0">
                                <div className="col-5 row mx-0 align-items-center">
                                    <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                    <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Hồ</p>
                                </div>
                                <div className="col-7">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_Q_XA_TRAN.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_Q_XA_TRAN" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/he-thong-quan-trac/nuoc-mat/luu-luong-khai-thac" className="col-6 mb-3 justify-content-center quantrac_item">
                        <div className="surfacewater-usage p-1 row mx-0">
                            <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">Q KHAI THÁC (m3/s)</p>
                            <div className="row mx-0">
                                <div className="col-5 row mx-0 align-items-center">
                                    <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                    <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Hồ</p>
                                </div>
                                <div className="col-7">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_KHAI_THAC.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_KHAI_THAC" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-toi-thieu" className="col-6 mb-3 justify-content-center quantrac_item">
                        <div className="surfacewater-usage p-1 row mx-0">
                            <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">Q XẢ TỐI THIỂU (m3/s)</p>
                            <div className="row mx-0">
                                <div className="col-5 row mx-0 align-items-center">
                                    <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                    <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Hồ</p>
                                </div>
                                <div className="col-7">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_QTOITHIEU.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_QTOITHIEU" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/he-thong-quan-trac/nuoc-mat/chat-luong-nuoc-khai-thac" className="col-6 mb-3 justify-content-center quantrac_item">
                        <div className="surfacewater-usage p-1 row mx-0">
                            <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">CHẤT LƯỢNG NƯỚC TRONG QUÁ TRÌNH KHAI THÁC (m3/s)</p>
                            <div className="row mx-0">
                                <div className="col-5 row mx-0 align-items-center">
                                    <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                    <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Hồ</p>
                                </div>
                                <div className="col-7">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_CLN_TRONG_QUA_TRINH_KT.png'} alt="HE_THONG_QUAN_TRAC/NUOC_MAT/ANH_CLN_TRONG_QUA_TRINH_KT" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="row m-0 p-0 surfacewater-usage">
                    <p className="exploit-surfacewater-title mb-2 p-2 fw-bold text-start font-12">NƯỚC DƯỚI ĐẤT</p>
                    <Link to="/he-thong-quan-trac/nuoc-duoi-dat/luu-luong-khai-thac" className="col-6 mb-3 justify-content-center quantrac_item">
                        <div className="surfacewater-usage p-1 row mx-0">
                            <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">LƯU LƯỢNG KHAI THÁC NDD (m3/ngày đêm)</p>
                            <div className="row mx-0">
                                <div className="col-5 row mx-0 align-items-center">
                                    <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                    <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Giếng</p>
                                </div>
                                <div className="col-7">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_LUULUONGKHAITHACNDD.png'} alt="HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_LUULUONGKHAITHACNDD" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/he-thong-quan-trac/nuoc-duoi-dat/muc-nuoc-trong-gieng-khai-thac" className="col-6 mb-3 justify-content-center quantrac_item">
                        <div className="surfacewater-usage p-1 row mx-0">
                            <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">MỰC NƯỚC TRONG GIẾNG KHAI THÁC (m)</p>
                            <div className="row mx-0">
                                <div className="col-5 row mx-0 align-items-center">
                                    <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                    <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Giếng</p>
                                </div>
                                <div className="col-7">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/MUC_NUOC_GIENG_KT.png'} alt="HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/MUC_NUOC_GIENG_KT" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/he-thong-quan-trac/nuoc-duoi-dat/muc-nuoc-trong-gieng-quan-trac" className="col-6 mb-3 justify-content-center quantrac_item">
                        <div className="surfacewater-usage p-1 row mx-0">
                            <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">MỰC NƯỚC GIẾNG QUAN TRẮC</p>
                            <div className="row mx-0">
                                <div className="col-5 row mx-0 align-items-center">
                                    <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                    <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Giếng</p>
                                </div>
                                <div className="col-7">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/MUC_NUOC_GIENG_KT.png'} alt="HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/MUC_NUOC_GIENG_KT" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/he-thong-quan-trac/nuoc-duoi-dat/chat-luong-nuoc-khai-thac" className="col-6 mb-3 justify-content-center quantrac_item">
                        <div className="surfacewater-usage p-1 row mx-0">
                            <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">CHẤT LƯỢNG NƯỚC TRONG QUÁ TRÌNH KHAI THÁC (m3/s)</p>
                            <div className="row mx-0">
                                <div className="col-5 row mx-0 align-items-center">
                                    <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                    <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Giếng</p>
                                </div>
                                <div className="col-7">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_CLN_TRONG_QT_KT.png'} alt="HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_CLN_TRONG_QT_KT" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="row m-0 p-0 surfacewater-usage">
                    <p className="exploit-surfacewater-title mb-2 p-2 fw-bold text-start font-12">XẢ THẢI VÀO NGUỒN NƯỚC</p>
                    <Link to="#" className="col-6 mb-3 justify-content-center quantrac_item">
                        <div className="surfacewater-usage p-1 row mx-0">
                            <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">Q XẢ THẢI (m3/s)</p>
                            <div className="row mx-0">
                                <div className="col-5 row mx-0 align-items-center">
                                    <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                    <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Công trình</p>
                                </div>
                                <div className="col-7">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_LUULUONGKHAITHACNDD.png'} alt="HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/ANH_LUULUONGKHAITHACNDD" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="#" className="col-6 mb-3 justify-content-center quantrac_item">
                        <div className="surfacewater-usage p-1 row mx-0">
                            <p className="mb-0 col-12 text-center text-violet fw-bold font-12 quantrac_title">CHẤT LƯỢNG NƯỚC THẢI</p>
                            <div className="row mx-0">
                                <div className="col-5 row mx-0 align-items-center">
                                    <p className="mb-0 w-100 text-center fw-bold p-0"><span>0</span>/<span>0</span></p>
                                    <p className="mb-0 w-100 p-0 text-center text-danger fw-bold fst-italic">Giếng</p>
                                </div>
                                <div className="col-7">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/MUC_NUOC_GIENG_KT.png'} alt="HE_THONG_QUAN_TRAC/NUOC_DUOI_DAT/MUC_NUOC_GIENG_KT" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}