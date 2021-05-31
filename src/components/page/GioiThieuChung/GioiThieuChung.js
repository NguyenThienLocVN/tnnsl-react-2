/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { Link } from 'react-router-dom';
import Map from '../../layout/Map';
import Header from '../../layout/Header';

import '../Page.css';

export default class Login extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            nameUser: '',
            redirect: false,
        }
    }

    componentDidMount(){
        document.title = "Giới thiệu chung | Giám sát tài nguyên nước Sơn La";
    }

    render(){
        return(
            <div className="pt-1 px-1">
                <Header headTitle="GIỚI THIỆU CHUNG" previousLink="/" showHeadImage={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-12 col-lg-4 menu-home discharge-water">
                        <Link to="#" className="d-flex align-items-center text-success mt-2 border">
                            <img className="introduce-image" src={process.env.PUBLIC_URL + '/images/TRANG_CHU/ANH_HETHONGQUANTRAC.png'} alt="thong-tin-chung" />
                            <b className="pl-2 introduct-text">GIỚI THIỆU HỆ THỐNG QUẢN LÝ QUAN TRẮC</b>
                        </Link>
                        <Link to="#" className="d-flex align-items-center text-success mt-3 border">
                            <img className="introduce-image" src={process.env.PUBLIC_URL + '/images/TRANG_CHU/ANH_HETHONGGIAMSAT.png'} alt="thong-tin-chung" />
                            <b className="pl-2 introduct-text">GIỚI THIỆU HỆ THỐNG QUẢN LÝ GIÁM SÁT</b>
                        </Link>
                        <Link to="#" className="d-flex align-items-center text-success mt-3 border">
                            <img className="introduce-image" src={process.env.PUBLIC_URL + '/images/TRANG_CHU/ANH_QUANLYCAPPHEP.png'} alt="thong-tin-chung" />
                            <b className="pl-2 introduct-text">GIỚI THIỆU HỆ THỐNG QUẢN LÝ CẤP PHÉP</b>
                        </Link>
                        <Link to="#" className="d-flex align-items-center text-success mt-3 border">
                            <img className="introduce-image" src={process.env.PUBLIC_URL + '/images/TRANG_CHU/ANH_QUANLYDULIEU.png'} alt="thong-tin-chung" />
                            <b className="pl-2 introduct-text">GIỚI THIỆU HỆ THỐNG QUẢN LÝ DỮ LIỆU</b>
                        </Link>
                        <Link to="#" className="d-flex align-items-center text-success mt-3 border">
                            <img className="introduce-image" src={process.env.PUBLIC_URL + '/images/TRANG_CHU/ANH_BIEUMAUBAOCAO.png'} alt="thong-tin-chung" />
                            <b className="pl-2 introduct-text">GIỚI THIỆU HỆ THỐNG QUẢN LÝ BÁO CÁO</b>
                        </Link>
                        <Link to="#" className="d-flex align-items-center text-success mt-3 border">
                            <img className="introduce-image" src={process.env.PUBLIC_URL + '/images/TRANG_CHU/ANH_THONGBAO.png'} alt="thong-tin-chung" />
                            <b className="pl-2 introduct-text">GIỚI THIỆU HỆ THỐNG QUẢN LÝ THÔNG BÁO</b>
                        </Link>
                        <Link to="#" className="d-flex align-items-center text-success mt-3 border">
                            <img className="introduce-image" src={process.env.PUBLIC_URL + '/images/TRANG_CHU/ANH_HUONGDANQUYDINH.png'} alt="thong-tin-chung" />
                            <b className="pl-2 introduct-text">GIỚI THIỆU CÁC HƯỚNG DẪN QUY ĐỊNH CHUNG</b>
                        </Link>
                        <Link to="#" className="d-flex align-items-center text-success mt-3 border">
                            <img className="introduce-image" src={process.env.PUBLIC_URL + '/images/TRANG_CHU/ANH_YEUCAUKETNOI.png'} alt="thong-tin-chung" />
                            <b className="pl-2 introduct-text">GIỚI THIỆU CÁCH ĐĂNG KÝ/ KẾT NỐI</b>
                        </Link>
                    </div>
                    <div className="col-12 col-lg-8 map-container px-md-0">
                        <Map />
                    </div>
                </main>
            </div>
        )
    }
}