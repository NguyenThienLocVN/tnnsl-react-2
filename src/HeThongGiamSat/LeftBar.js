import React from 'react';
import { Link } from 'react-router-dom';

export default class LeftBar extends React.Component {
    render(){
        return(
            <>
                <div className="row m-0 p-0 border mb-2">
                    <p className="exploit-surfacewater-title mb-0 p-2 fw-bold text-start font-12">QUẢN LÝ GIÁM SÁT</p>
                    <div className="col-6 pt-0">
                        <p className="mb-0 p-0 fw-bold text-center font-12 text-violet">Bộ quản lý</p>
                        <Link to="/he-thong-giam-sat/phat-dien-lon-hon-2mw" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Phát điện {'>'} 2MW</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold font-11 p-0"><span>0</span> CT</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXA.png'} alt="HE_THONG_GIAM_SAT/ANH_QXA" />
                                    </div>
                               </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/san-xuat-nong-nghiep" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">SXNN - NTTS {'>'} 2m3/s</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold font-11 p-0"><span>0</span> CT</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_MUCNUOC.png'} alt="HE_THONG_GIAM_SAT/ANH_MUCNUOC" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        
                        <Link to="/he-thong-giam-sat/muc-dich-khac-lon-hon" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Mục đích khác {'>'} 50.000 m3/ngđ</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold font-11 p-0"><span>0</span> CT</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_DINHKY.png'} alt="HE_THONG_GIAM_SAT/ANH_DINHKY" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/khai-thac-nuoc-duoi-dat-lon-hon" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Khai thác NDĐ {'>'} 3000 m3/ngđ</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold font-11 p-0"><span>0</span> CT</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_LUULUONGKHAITHACNUOCDUOIDAT.png'} alt="HE_THONG_GIAM_SAT/ANH_LUULUONGKHAITHACNUOCDUOIDAT" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/xa-thai-lon-hon-3000m3ngaydem" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Xả thải {'>'} 3000 m3/ngđ</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold font-11 p-0"><span>0</span> CT</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATOITHIEU.png'} alt="HE_THONG_GIAM_SAT/ANH_QXATOITHIEU" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/xa-thai-NTTS-lon-hon-30.000m3ngaydem" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Xả thải NTTS {'>'} 30.000 m3/ngđ</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold font-11 p-0"><span>0</span> CT</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATOITHIEU.png'} alt="HE_THONG_GIAM_SAT/ANH_QXATOITHIEU" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    
                    <div className="col-6 pt-0">
                        <p className="mb-0 p-0 fw-bold text-center font-12 text-violet">UBND quản lý</p>
                        <Link to="/he-thong-giam-sat/phat-dien-nho-hon-2mw" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-danger quantrac_title">Phát điện {'<'} 2MW</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold font-11 p-0"><span>0</span> CT</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXA.png'} alt="HE_THONG_GIAM_SAT/ANH_QXA" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/san-xuat-nong-nghiep-nho-hon" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-danger quantrac_title">SXNN - NTTS {'<'} 2m3/s</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold font-11 p-0"><span>0</span> CT</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_MUCNUOC.png'} alt="HE_THONG_GIAM_SAT/ANH_MUCNUOC" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/muc-dich-khac-nho-hon" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-danger quantrac_title">Mục đích khác {'<'} 50.000 m3/ngđ</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold font-11 p-0"><span>0</span> CT</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_DINHKY.png'} alt="HE_THONG_GIAM_SAT/ANH_DINHKY" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/khai-thac-nuoc-duoi-dat-nho-hon" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-danger quantrac_title">Khai thác NDĐ {'>'} 3.000 m3/ngđ</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold font-11 p-0"><span>0</span> CT</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_LUULUONGKHAITHACNUOCDUOIDAT.png'} alt="HE_THONG_GIAM_SAT/ANH_LUULUONGKHAITHACNUOCDUOIDAT" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/xa-thai-nho-hon-3000m3ngaydem" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-danger quantrac_title">Xả thải {'<'} 3000 m3/ngđ</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold font-11 p-0"><span>0</span> CT</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATOITHIEU.png'} alt="HE_THONG_GIAM_SAT/ANH_QXATOITHIEU" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/xa-thai-NTTS-nho-hon-30.000m3ngaydem" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-danger quantrac_title">Xả thải NTTS {'<'} 30.000 m3/ngđ</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold font-11 p-0"><span>0</span> CT</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATOITHIEU.png'} alt="HE_THONG_GIAM_SAT/ANH_QXATOITHIEU" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="row m-0 p-0 border mb-2">
                    <p className="exploit-surfacewater-title mb-0 p-2 fw-bold text-start font-12">GIÁM SÁT TỰ ĐỘNG, TRỰC TUYẾN</p>
                    <div className="col-sm-12 row m-0 pt-2">
                        <Link to="/he-thong-giam-sat/truc-tuyen-muc-nuoc-ho-chua" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Mực nước hồ (m)</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center font-11 p-0"><span>4</span>/<span>63</span> vượt ngưỡng</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_MUCNUOC.png'} alt="HE_THONG_GIAM_SAT/ANH_MUCNUOC" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/truc-tuyen-xa-dong-chay-toi-thieu" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Q xả tối thiểu (m3/s) </p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center font-11 p-0"><span>4</span>/<span>63</span> vượt ngưỡng</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATOITHIEU.png'} alt="HE_THONG_GIAM_SAT/ANH_QXATOITHIEU" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/truc-tuyen-xa-dong-chay-qua-nha-may" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Q xả qua nhà máy (m3/s) </p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center font-11 p-0"><span>4</span>/<span>63</span> vượt ngưỡng</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXANHAMAY.png'} alt="HE_THONG_GIAM_SAT/ANH_QXANHAMAY" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/truc-tuyen-xa-tràn" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Q xả tràn (hồ {'>'} 1 triệu m3)</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center font-11 p-0"><span>4</span>/<span>63</span> vượt ngưỡng</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATRAN.png'} alt="HE_THONG_GIAM_SAT/ANH_QXATRAN" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/truc-tuyen-ho-chua-san-xuat-nong-nghiep" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Q khai thác SXNN {'>'} 2m3/s; mục đích khác {'>'} 50.000m3/ngđ  </p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center font-11 p-0"><span>4</span>/<span>63</span> vượt ngưỡng</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_DINHKY.png'} alt="HE_THONG_GIAM_SAT/ANH_DINHKY" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/truc-tuyen-muc-muoc-gieng-quan-trac" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Mực nước giếng KT (m) </p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center font-11 p-0"><span>4</span>/<span>63</span> vượt ngưỡng</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXA.png'} alt="HE_THONG_GIAM_SAT/ANH_QXA" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="row m-0 p-0 border mb-2">
                    <p className="exploit-surfacewater-title mb-0 p-2 fw-bold text-start font-12">GIÁM SÁT BẰNG CAMERA</p>
                    <div className="col-sm-12 row m-0 pt-2">
                        <Link to="/he-thong-giam-sat/camera-van-hanh-xa-dctt" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Vận hành xả nước TT</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold font-11 p-0"><span>4</span> CT</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_MUCNUOC.png'} alt="HE_THONG_GIAM_SAT/ANH_MUCNUOC" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/camera-van-hanh-xa-nuoc-qua-tran" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Vận hành xả nước qua tràn</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center fw-bold font-11 p-0"><span>4</span> CT</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATOITHIEU.png'} alt="HE_THONG_GIAM_SAT/ANH_QXATOITHIEU" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="row m-0 p-0 border border-light">
                    <p className="exploit-surfacewater-title mb-0 p-2 fw-bold text-start font-12">GIÁM SÁT ĐỊNH KỲ</p>
                    <div className="col-sm-12 row m-0 pt-2">
                        <Link to="/he-thong-giam-sat/dinh-ky-xa-tran-ho-nho" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Q xả tràn (hồ {'<'} 1tr m3)</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center font-11 p-0"><span>4</span>/<span>63</span> vượt ngưỡng</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_DINHKY.png'} alt="HE_THONG_GIAM_SAT/ANH_DINHKY" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/dinh-ky-muc-muoc-gieng-quan-trac" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Chất lượng nước trong quá trình KT</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center font-11 p-0"><span>4</span>/<span>63</span> vượt ngưỡng</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATOITHIEU.png'} alt="HE_THONG_GIAM_SAT/ANH_QXATOITHIEU" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/dinh-ky-khai-thac-luu-luong" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Q khai thác {'>'} 0.1 m3/s; 100m3/ng đ </p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center font-11 p-0"><span>4</span>/<span>63</span> vượt ngưỡng</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXANHAMAY.png'} alt="HE_THONG_GIAM_SAT/ANH_QXANHAMAY" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/he-thong-giam-sat/dinh-ky-muc-muoc-gieng-quan-trac" className="col-6 justify-content-center text-dark quantrac_item">
                            <div className="border p-1 row mx-0 mb-1">
                                <p className="mb-0 col-12 text-center fw-bold font-12 text-blue quantrac_title">Mực nước giếng KT</p>
                                <div className="row mx-0">
                                    <div className="col-5 row mx-0 align-items-center">
                                        <p className="mb-0 w-100 text-center font-11 p-0"><span>4</span>/<span>63</span> vượt ngưỡng</p>
                                    </div>
                                    <div className="col-7">
                                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/MUC_NUOC_GIENG_KT.png'} alt="HE_THONG_GIAM_SAT/MUC_NUOC_GIENG_KT" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}