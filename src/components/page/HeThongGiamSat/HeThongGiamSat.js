/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'; 
import Map from '../../layout/Map';
import Header from '../../layout/Header';
import { Link } from 'react-router-dom';

import '../Page.css';

export default class HeThongGiamSat extends React.Component {

    componentDidMount(){
        document.title = "Hệ thống giám sát | Giám sát tài nguyên nước Sơn La";
    }

    render(){
        return(
            <div className="pt-1 px-1">
                <Header headTitle="HỆ THỐNG GIÁM SÁT" previousLink="/" showHeadImage={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-12 col-lg-5 px-0 menu-home">
                        <div className="exploit-surfacewater exploit-surfacewater pb-2 mb-1">
                            <p className="col-12 py-1 exploit-surfacewater-title font-weight-bold mb-2">Đối tượng giám sát</p>
                            <div className="monitoring-object-content pl-2">
                                <div className="d-flex mb-1 align-items-center">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_NUOCMAT.png'} alt="ANH_NUOCMAT" className="col-1 py-0 pl-0 pr-2 h-100" />
                                    <span className="font-weight-bold col-3 p-0 font-13 mr-1">NƯỚC MẶT</span>
                                    <div className="text-center w-100">
                                        <span>Loại công trình &nbsp;</span>
                                        <select name="construction" className="facewater-construction-select construction-select" id="facewater-construction-select">
                                            <option value="tat-ca-nuoc-mat">Tất cả</option>
                                            <option value="TREN2MW">Hồ thủy điện trên 2MW</option>
                                            <option value="DUOI2MW">Hồ thủy điện dưới 2MW</option>
                                            <option value="ho-thuy-dien-tren-2m">Hồ SXNN trên 2m3/s</option>
                                            <option value="ho-thuy-dien-duoi-2m">Hồ SXNN dưới 2m3/s</option>
                                            <option value="ho-thuy-muc-dich-khac-tren-50000m">Hồ mục đích khác &gt; 50.000 3/s</option>
                                            <option value="ho-thuy-muc-dich-khac-duoi-50000m">Hồ mục đích khác &lt; 50.000 3/s</option>
                                            <option value="cong-tram-bom-tren-2m">Cống, trạm bơm &gt; 2m3/s</option>
                                            <option value="cong-tram-bom-duoi-2m">Cống, trạm bơm &lt; 2m3/s</option>
                                            <option value="cong-tram-bom-tren-50000m">Cống, trạm bơm &gt; 50.000 3/s</option>
                                            <option value="cong-tram-bom-duoi-50000m">Cống, trạm bơm &lt; 50.000 3/s</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_NUOCDUOIDAT.png'} alt="ANH_NUOCDUOIDAT" className="col-1 py-0 pl-0 pr-2 h-100" />
                                    <span className="font-weight-bold col-3 p-0 font-13 mr-1">NƯỚC DƯỚI ĐẤT</span>
                                    <div className="text-center w-100">
                                        <span>Loại công trình &nbsp;</span>
                                        <select name="" className="facewater-construction-select construction-select" id="facewater-construction-select">
                                            <option value="tat-ca-nuoc-mat">Tất cả</option>
                                            <option value="ho-thuy-dien-tren-2MW">Hồ thủy điện trên 2MW</option>
                                            <option value="ho-thuy-dien-duoi-2MW">Hồ thủy điện dưới 2MW</option>
                                            <option value="ho-thuy-dien-tren-2m">Hồ SXNN trên 2m3/s</option>
                                            <option value="ho-thuy-dien-duoi-2m">Hồ SXNN dưới 2m3/s</option>
                                            <option value="ho-thuy-muc-dich-khac-tren-50000m">Hồ mục đích khác &gt; 50.000 3/s</option>
                                            <option value="ho-thuy-muc-dich-khac-duoi-50000m">Hồ mục đích khác &lt; 50.000 3/s</option>
                                            <option value="cong-tram-bom-tren-2m">Cống, trạm bơm &gt; 2m3/s</option>
                                            <option value="cong-tram-bom-duoi-2m">Cống, trạm bơm &lt; 2m3/s</option>
                                            <option value="cong-tram-bom-tren-50000m">Cống, trạm bơm &gt; 50.000 3/s</option>
                                            <option value="cong-tram-bom-duoi-50000m">Cống, trạm bơm &lt; 50.000 3/s</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="exploit-surfacewater pb-2 mb-1">
                            <p className="col-12 py-1 exploit-surfacewater-title font-weight-bold mb-1">Số liệu quan trắc, vận hành</p>
                            <div className="observed-data-content font-13">
                                <div className="d-flex col-12 pl-0 observed-data-content-row mb-1">
                                    <Link to="#" className=" text-dark col-3 grid-item hover-bg d-flex flex-column px-1" id="mua">
                                        <p className="text-center mb-1">MƯA</p>
                                        <div className="d-flex align-items-center">
                                            <div className="col-6 p-0">
                                                <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span className="count_rain_stations">50</span></p>
                                                <p className="font-weight-bold text-danger text-center mb-1">Trạm</p>
                                            </div>
                                            <div className="col-6 p-0">
                                                <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_MUA.png'} className="w-100" alt="ANH_MUA" />
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="#" className=" text-dark col-3 grid-item hover-bg d-flex flex-column px-1 ml-1">
                                        <p className="text-center mb-1">MỰC NƯỚC</p>
                                        <div className="d-flex align-items-center">
                                            <div className="col-6 p-0">
                                                <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span className="count_rain_stations">50</span></p>
                                                <p className="font-weight-bold text-danger text-center mb-1">Hồ</p>
                                            </div>
                                            <div className="col-6 p-0">
                                                <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_MUCNUOC.png'} className="w-100" alt="ANH_MUCNUOC" />
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="#" className=" text-dark col-3 grid-item hover-bg d-flex flex-column px-1 ml-1">
                                        <p className="text-center mb-1">Q<sub>đến</sub> (m<sup>3</sup>/s)</p>
                                        <div className="d-flex align-items-center">
                                            <div className="col-6 p-0">
                                                <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span className="count_rain_stations">50</span></p>
                                                <p className="font-weight-bold text-danger text-center mb-1">Hồ</p>
                                            </div>
                                            <div className="col-6 p-0">
                                                <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QDEN.png'} className="w-100" alt="ANH_QDEN" />
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="#" className=" text-dark col-3 grid-item hover-bg d-flex flex-column px-1 ml-1">
                                        <p className="text-center mb-1">Q<sub>xả</sub> (m<sup>3</sup>/s)</p>
                                        <div className="d-flex align-items-center">
                                            <div className="col-6 p-0">
                                                <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span className="count_rain_stations">50</span></p>
                                                <p className="font-weight-bold text-danger text-center mb-1">Hồ</p>
                                            </div>
                                            <div className="col-6 p-0">
                                                <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXA.png'} className="w-100" alt="ANH_QXA" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="d-flex col-12 pl-0 observed-data-content-row">
                                    <Link to="#" className=" text-dark col-3 grid-item hover-bg d-flex flex-column px-1 justify-content-between">
                                        <p className="text-center mb-1">Q<sub>tối thiểu</sub> (m<sup>3</sup>/s)</p>
                                        <div className="d-flex align-items-center">
                                            <div className="col-6 p-0">
                                                <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>50</span></p>
                                                <p className="font-weight-bold text-danger text-center mb-1">Trạm</p>
                                            </div>
                                            <div className="col-6 p-0">
                                                <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QTOITHIEU.png'} className="w-100" alt="ANH_QTOITHIEU" />
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="#" className=" text-dark col-3 grid-item hover-bg d-flex flex-column px-1 ml-1 justify-content-between">
                                        <p className="text-center mb-1">Chất lượng nước</p>
                                        <div className="d-flex align-items-center">
                                            <div className="col-6 p-0">
                                                <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>50</span></p>
                                                <p className="font-weight-bold text-danger text-center mb-1">Hồ</p>
                                            </div>
                                            <div className="col-6 p-0">
                                                <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_CHATLUONGNUOC.png'} className="w-100" alt="ANH_CHATLUONGNUOC" />
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="#" className=" text-dark col-3 grid-item hover-bg d-flex flex-column px-1 ml-1">
                                        <p className="text-center mb-1">Mực nước trong giếng quan trắc</p>
                                        <div className="d-flex align-items-center">
                                            <div className="col-6 p-0">
                                                <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>50</span></p>
                                                <p className="font-weight-bold text-danger text-center mb-1">Hồ</p>
                                            </div>
                                            <div className="col-6 p-0">
                                                <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_MUCNUOCGIENG.png'} className="w-100" alt="ANH_MUCNUOCGIENG" />
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="#" className=" text-dark col-3 grid-item hover-bg d-flex flex-column px-1 ml-1">
                                        <p className="text-center mb-1">Lưu lượng khai thác NDD</p>
                                        <div className="d-flex align-items-center">
                                            <div className="col-6 p-0">
                                                <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>50</span></p>
                                                <p className="font-weight-bold text-danger text-center mb-1">Hồ</p>
                                            </div>
                                            <div className="col-6 p-0">
                                                <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_LUULUONGKHAITHACNUOCDUOIDAT.png'} className="w-100" alt="ANH_LUULUONGKHAITHACNUOCDUOIDAT" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="observed-for-electric pb-2 d-flex">
                            <div className="col-6 px-0 exploit-surfacewater">
                                <p className="col-12 py-1 px-1 text-center exploit-surfacewater-title font-weight-bold mb-1 font-14">Giám sát hồ chứa để phát điện</p>
                                <div className="observed-for-electric-content font-13">
                                    <div className="d-flex col-12 pl-0 pr-1 observed-for-electric-content-row mb-1">
                                        <Link to="#" className=" text-dark col-6 grid-item hover-bg d-flex flex-column px-1">
                                            <p className="text-center mb-1">Mực nước</p>
                                            <div className="d-flex align-items-center">
                                                <div className="col-6 p-0">
                                                    <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>80</span></p>
                                                    <p className="font-weight-bold text-danger text-center mb-1">Hồ</p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_MUCNUOC.png'} className="w-100" alt="ANH_MUCNUOC" />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#" className=" text-dark col-6 grid-item hover-bg d-flex flex-column px-1 ml-1">
                                            <p className="text-center mb-1">Q<sub>xả</sub> tối thiểu</p>
                                            <div className="d-flex align-items-center">
                                                <div className="col-6 p-0">
                                                    <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>80</span></p>
                                                    <p className="font-weight-bold text-danger text-center mb-1">Hồ</p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATOITHIEU.png'} className="w-100" alt="ANH_QXATOITHIEU" />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="d-flex col-12 pl-0 pr-1 observed-for-electric-content-row mb-1">
                                        <Link to="#" className=" text-dark col-6 grid-item hover-bg d-flex flex-column px-1">
                                            <p className="text-center mb-1">Q<sub>xả</sub> qua nhà máy</p>
                                            <div className="d-flex align-items-center">
                                                <div className="col-6 p-0">
                                                    <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>80</span></p>
                                                    <p className="font-weight-bold text-danger text-center mb-1">Hồ</p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXANHAMAY.png'} className="w-100" alt="ANH_QXANHAMAY" />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#" className=" text-dark col-6 grid-item hover-bg d-flex flex-column px-1 ml-1">
                                            <p className="text-center mb-1">Q<sub>xả</sub> tràn</p>
                                            <div className="d-flex align-items-center">
                                                <div className="col-6 p-0">
                                                    <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>80</span></p>
                                                    <p className="font-weight-bold text-danger text-center mb-1">Hồ</p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATRAN.png'} className="w-100" alt="ANH_QXATRAN" />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 p-0 exploit-surfacewater">
                                <p className="col-12 py-1 px-1 text-center exploit-surfacewater-title font-weight-bold mb-1 font-14">Giám sát hồ chứa để SXNN</p>
                                <div className="observed-for-electric-content font-13">
                                    <div className="d-flex col-12 pl-0 pr-1 observed-for-electric-content-row mb-1">
                                        <Link to="#" className=" text-dark col-6 grid-item hover-bg d-flex flex-column px-1">
                                            <p className="text-center mb-1">Mực nước</p>
                                            <div className="d-flex align-items-center">
                                                <div className="col-6 p-0">
                                                    <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>80</span></p>
                                                    <p className="font-weight-bold text-danger text-center mb-1">Hồ</p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_MUCNUOC.png'} className="w-100" alt="ANH_MUCNUOC" />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#" className=" text-dark col-6 grid-item hover-bg d-flex flex-column px-1 ml-1">
                                            <p className="text-center mb-1">Q<sub>xả</sub> tối thiểu</p>
                                            <div className="d-flex align-items-center">
                                                <div className="col-6 p-0">
                                                    <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>80</span></p>
                                                    <p className="font-weight-bold text-danger text-center mb-1">Hồ</p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATOITHIEU.png'} className="w-100" alt="ANH_QXATOITHIEU" />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="d-flex col-12 pl-0 pr-1 observed-for-electric-content-row mb-1">
                                        <Link to="#" className=" text-dark col-6 grid-item hover-bg d-flex flex-column px-1">
                                            <p className="text-center mb-1">Q<sub>khai thác</sub> </p>
                                            <div className="d-flex align-items-center">
                                                <div className="col-6 p-0">
                                                    <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>80</span></p>
                                                    <p className="font-weight-bold text-danger text-center mb-1">Hồ</p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QKHAITHAC.png'} className="w-100" alt="ANH_QKHAITHAC" />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#" className=" text-dark col-6 grid-item hover-bg d-flex flex-column px-1 ml-1">
                                            <p className="text-center mb-1">CLN khai thác</p>
                                            <div className="d-flex align-items-center">
                                                <div className="col-6 p-0">
                                                    <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>80</span></p>
                                                    <p className="font-weight-bold text-danger text-center mb-1">Hồ</p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_CLNSXNN.png'} className="w-100" alt="ANH_CLNSXNN" />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="observed-for-electric pb-2 d-flex">
                            <div className="col-5 px-0 exploit-surfacewater">
                                <p className="col-12 py-1 px-1 text-center exploit-surfacewater-title font-weight-bold mb-1 font-14">Giám sát công trình khác</p>
                                <div className="observed-for-electric-content font-13">
                                    <div className="d-flex col-12 pl-0 pr-1 observed-for-electric-content-row mb-1">
                                        <Link to="#" className=" text-dark col-6 grid-item hover-bg d-flex flex-column px-1">
                                            <p className="text-center mb-1">Q<sub>khai thác</sub></p>
                                            <div className="d-flex align-items-center">
                                                <div className="col-6 p-0">
                                                    <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>30</span></p>
                                                    <p className="font-weight-bold text-danger text-center mb-1">CT</p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QKHAITHACKHAC.png'} className="w-100" alt="ANH_QKHAITHACKHAC" />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#" className=" text-dark col-6 grid-item hover-bg d-flex flex-column px-1 ml-1">
                                            <p className="text-center mb-1">CLN khai thác</p>
                                            <div className="d-flex align-items-center">
                                                <div className="col-6 p-0">
                                                    <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>30</span></p>
                                                    <p className="font-weight-bold text-danger text-center mb-1">CT</p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_CLNKHAITHAC.png'} className="w-100" alt="ANH_CLNKHAITHAC" />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-7 p-0 exploit-surfacewater">
                                <p className="col-12 py-1 px-1 text-center exploit-surfacewater-title font-weight-bold mb-1 font-14">Giám sát khai thác NDD</p>
                                <div className="observed-for-electric-content font-13">
                                    <div className="d-flex col-12 pl-0 pr-2 observed-for-electric-content-row mb-1">
                                        <Link to="#" className=" text-dark col-4 grid-item hover-bg d-flex flex-column px-1">
                                            <p className="text-center mb-1">Q<sub>khai thác</sub></p>
                                            <div className="d-flex align-items-center">
                                                <div className="col-6 p-0">
                                                    <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>30</span></p>
                                                    <p className="font-weight-bold text-danger text-center mb-1">CT</p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QKHAITHACNDD.png'} className="w-100" alt="ANH_QKHAITHACNDD" />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#" className=" text-dark col-4 grid-item hover-bg d-flex flex-column px-1 ml-1">
                                            <p className="text-center mb-1">Mực nước</p>
                                            <div className="d-flex align-items-center">
                                                <div className="col-6 p-0">
                                                    <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>30</span></p>
                                                    <p className="font-weight-bold text-danger text-center mb-1">CT</p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_MUCNUOCGIENG.png'} className="w-100" alt="ANH_MUCNUOCGIENG" />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to="#" className=" text-dark col-4 grid-item hover-bg d-flex flex-column px-1 ml-1">
                                            <p className="text-center mb-1">CLN k/thác</p>
                                            <div className="d-flex align-items-center">
                                                <div className="col-6 p-0">
                                                    <p className="text-center font-13 font-weight-bold m-0 text-success"><span>0</span>/<span>30</span></p>
                                                    <p className="font-weight-bold text-danger text-center mb-1">CT</p>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_CLNNDD.png'} className="w-100" alt="ANH_CLNNDD" />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-7 map-container px-md-0">
                        <Map />
                    </div>
                </main>
            </div>
        )
    }
}