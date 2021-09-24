/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import Header from '../Shared/Header';
import { Link } from 'react-router-dom';
import { Progress } from 'antd';

import '../Shared/Page.css';
import RightBar from './RightBar';
import LeftBar from './LeftBar';

export default class HeThongGiamSat extends React.Component {

    componentDidMount(){
        document.title = "Hệ thống giám sát | Giám sát tài nguyên nước Sơn La";
    }

    render(){
        return(
            <div>
                <Header headTitle="HỆ THỐNG GIÁM SÁT" previousLink="/" showHeadImage={true} layout48={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-12 col-lg-3 px-0 menu-home">
                        <LeftBar />
                    </div>
                    <div className="col-12 col-lg-6 row mx-0 px-0 menu-home">
                        <div className="mb-2 px-1">
                            <p className="exploit-surfacewater-title m-0 d-flex p-2 font-12">
                                <span className="fw-bold d-block col-6">TRẠNG THÁI CÔNG TRÌNH</span>
                                <span className="d-block col-6 text-end">Tính đến 04:43:52 01/07/2021</span>
                            </p>
                            <div className="row m-0 font-14 bg-greenyellow px-5 py-2">
                                <span className="fw-bold d-block col-7">Tổng số trạm: </span>
                                <span className="d-block col-3 text-end">2023</span>
                            </div>
                            <div className="row m-0 font-14 bg-greenyellow px-5 py-2">
                                <span className="fw-bold d-block col-12">Trạm mất kết nối: </span>
                                <div  className="col-10">
                                    <Progress 
                                        strokeLinecap="square" 
                                        percent={18.64}
                                        format={percent => `(377) ${percent} %`} 
                                        strokeColor={{
                                            '0%': 'orange',
                                            '100%': 'orange',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row m-0 font-14 bg-greenyellow px-5 py-2">
                                <span className="fw-bold d-block col-12">Trạm kết nối bình thường: </span>
                                <div  className="col-10">
                                    <Progress 
                                        strokeLinecap="square" 
                                        percent={34.26}
                                        format={percent => `(693) ${percent} %`} 
                                        strokeColor={{
                                            '0%': 'green',
                                            '100%': 'green',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row m-0 font-14 bg-greenyellow px-5 py-2">
                                <span className="fw-bold d-block col-12">Trạm chưa gửi dữ liệu: </span>
                                <div  className="col-10">
                                    <Progress 
                                        strokeLinecap="square" 
                                        percent={47.11}
                                        format={percent => `(953) ${percent} %`} 
                                        strokeColor={{
                                            '0%': 'gray',
                                            '100%': 'gray',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 px-1 mb-2">
                            <div className="bg-brownyellow">
                                <p className="exploit-surfacewater-title m-0 d-flex p-2 font-12">
                                    <span className="fw-bold d-block col-6">THEO DÕI KẾT NỐI</span>
                                    <span className="d-block col-6 text-end">Tính đến 04:43:52 01/07/2021</span>
                                </p>
                                <div className="border border-light p-1 row mx-1 my-2">
                                    <div className="row mx-0">
                                        <div className="col-7 row mx-0 align-items-center">
                                            <p className="mb-0 col-12 text-center fw-bold text-blue quantrac_title">Khai thác nước mặt</p>
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>3</span>/<span>63</span> <br /> CT mất kết nối </p>
                                        </div>
                                        <div className="col-5 px-2">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXA.png'} alt="HE_THONG_GIAM_SAT/ANH_QXA" width="100%" />
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-light p-1 row mx-1 my-2">
                                    <div className="row mx-0">
                                        <div className="col-7 row mx-0 align-items-center">
                                            <p className="mb-0 col-12 text-center fw-bold text-blue quantrac_title">Khai thác nước dưới đất</p>
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>3</span>/<span>63</span> <br /> CT mất kết nối </p>
                                        </div>
                                        <div className="col-5 px-2">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_LUULUONGKHAITHACNUOCDUOIDAT.png'} alt="HE_THONG_GIAM_SAT/ANH_LUULUONGKHAITHACNUOCDUOIDAT" width="100%" />
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-light p-1 row mx-1 my-2">
                                    <div className="row mx-0">
                                        <div className="col-7 row mx-0 align-items-center">
                                            <p className="mb-0 col-12 text-center fw-bold text-blue quantrac_title">Xả thải vào nguồn nước</p>
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>3</span>/<span>63</span> <br /> CT mất kết nối </p>
                                        </div>
                                        <div className="col-5 px-2">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATOITHIEU.png'} alt="HE_THONG_GIAM_SAT/ANH_QXATOITHIEU" width="100%" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 px-1 mb-2">
                            <div className="bg-brownyellow">
                                <p className="exploit-surfacewater-title m-0 d-flex p-2 font-12">
                                    <span className="fw-bold d-block col-6">THEO DÕI GỬI DỮ LIỆU</span>
                                    <span className="d-block col-6 text-end">Tính đến 04:43:52 01/07/2021</span>
                                </p>
                                <div className="border border-light p-1 row mx-1 my-2">
                                    <div className="row mx-0">
                                        <div className="col-7 row mx-0 align-items-center">
                                            <p className="mb-0 col-12 text-center fw-bold text-blue quantrac_title">Khai thác nước mặt</p>
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>3</span>/<span>63</span> <br /> Chưa gửi dữ liệu </p>
                                        </div>
                                        <div className="col-5 px-2">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXA.png'} alt="HE_THONG_GIAM_SAT/ANH_QXA" width="100%" />
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-light p-1 row mx-1 my-2">
                                    <div className="row mx-0">
                                        <div className="col-7 row mx-0 align-items-center">
                                            <p className="mb-0 col-12 text-center fw-bold text-blue quantrac_title">Khai thác nước dưới đất</p>
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>3</span>/<span>63</span> <br /> Chưa gửi dữ liệu </p>
                                        </div>
                                        <div className="col-5 px-2">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_LUULUONGKHAITHACNUOCDUOIDAT.png'} alt="HE_THONG_GIAM_SAT/ANH_LUULUONGKHAITHACNUOCDUOIDAT" width="100%" />
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-light p-1 row mx-1 my-2">
                                    <div className="row mx-0">
                                        <div className="col-7 row mx-0 align-items-center">
                                            <p className="mb-0 col-12 text-center fw-bold text-blue quantrac_title">Xả thải vào nguồn nước</p>
                                            <p className="mb-0 w-100 text-center fw-bold p-0"><span>3</span>/<span>63</span> <br /> Chưa gửi dữ liệu </p>
                                        </div>
                                        <div className="col-5 px-2">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATOITHIEU.png'} alt="HE_THONG_GIAM_SAT/ANH_QXATOITHIEU" width="100%" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 px-1">
                            <div className="bg-brownyellow">    
                                <p className="exploit-surfacewater-title m-0 d-flex p-2 font-12">
                                    <span className="fw-bold d-block col-6">TRA CỨU DỮ LIỆU</span>
                                    <span className="d-block col-6 text-end">Tính đến 04:43:52 01/07/2021</span>
                                </p>
                                <div className="border border-light p-1 row mx-1 my-2">
                                    <div className="row mx-0">
                                        <div className="col-7 row mx-0 align-items-center">
                                            <p className="mb-0 col-12 text-center fw-bold text-blue quantrac_title">Khai thác nước mặt</p>
                                            <Link to="#" className="text-danger fw-bold text-center">Xem</Link>
                                            <br />                        
                                        </div>
                                        <div className="col-5 px-2">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXA.png'} alt="HE_THONG_GIAM_SAT/ANH_QXA" width="100%" />
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-light p-1 row mx-1 my-2">
                                    <div className="row mx-0">
                                        <div className="col-7 row mx-0 align-items-center">
                                            <p className="mb-0 col-12 text-center fw-bold text-blue quantrac_title">Khai thác nước dưới đất</p>
                                            <Link to="#" className="text-danger fw-bold text-center">Xem</Link>
                                            <br />                                   
                                        </div>
                                        <div className="col-5 px-2">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_LUULUONGKHAITHACNUOCDUOIDAT.png'} alt="HE_THONG_GIAM_SAT/ANH_LUULUONGKHAITHACNUOCDUOIDAT" width="100%" />
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-light p-1 row m-0">
                                    <div className="row mx-0">
                                        <div className="col-7 row mx-0 align-items-center">
                                            <p className="mb-0 col-12 text-center fw-bold text-blue quantrac_title">Xả thải vào nguồn nước</p>
                                            <Link to="#" className="text-danger fw-bold text-center">Xem</Link>
                                        </div>
                                        <div className="col-5 px-2">
                                            <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATOITHIEU.png'} alt="HE_THONG_GIAM_SAT/ANH_QXATOITHIEU" width="100%" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 px-0 menu-home">
                        <RightBar />
                    </div>
                </main>
            </div>
        )
    }
}