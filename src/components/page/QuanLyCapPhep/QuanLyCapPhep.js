import React from 'react';
import Header from '../../layout/Header';
import { Link } from 'react-router-dom';
import axios from "axios";
import configData from "../../../config.json";
import { SearchOutlined, DownloadOutlined, LineChartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Bar, Doughnut } from 'react-chartjs-2';
import { trackPromise } from 'react-promise-tracker';

export default class QuanLyCapPhep extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            countDataNuocMat: 0,
            countLicense: 0,
            DataNuocMat:[],
            barChartData: {
                labels: ['2015', '2016', '2017', '2018', '2019', '2020'],
                datasets: [{
                    label: 'Xả nước thải vào nguồn nước',
                    data: [15, 19, 3, 5, 4, 3],
                    stack: 1,
                    backgroundColor: [
                      'rgba(255, 159, 64)',
                      'rgba(255, 159, 64)',
                      'rgba(255, 159, 64)',
                      'rgba(255, 159, 64)',
                      'rgba(255, 159, 64)',
                      'rgba(255, 159, 64)'
                    ]
                  },
                  {
                    label: 'KT, SD nước mặt',
                    data: [5, 7, 13, 5, 6, 9],
                    stack: 1,
                    backgroundColor: [
                      'rgb(97, 205, 187)',
                      'rgb(97, 205, 187)',
                      'rgb(97, 205, 187)',
                      'rgb(97, 205, 187)',
                      'rgb(97, 205, 187)',
                      'rgb(97, 205, 187)'
                    ]
                  },
                  {
                    label: 'KT, SD nước dưới đất',
                    data: [10, 11, 9, 5, 7, 3],
                    stack: 1,
                    backgroundColor: [
                      'rgb(39, 194, 76)',
                      'rgb(39, 194, 76)',
                      'rgb(39, 194, 76)',
                      'rgb(39, 194, 76)',
                      'rgb(39, 194, 76)',
                      'rgb(39, 194, 76)'
                    ]
                  },
                  {
                    label: 'TD nước dưới đất',
                    data: [5, 9, 3, 15, 8, 4],
                    stack: 1,
                    backgroundColor: [
                      'rgba(220, 172, 172, 0.77)',
                      'rgba(220, 172, 172, 0.77)',
                      'rgba(220, 172, 172, 0.77)',
                      'rgba(220, 172, 172, 0.77)',
                      'rgba(220, 172, 172, 0.77)',
                      'rgba(220, 172, 172, 0.77)'
                    ]
                  },
                  {
                    label: 'Hành nghề khoan NDĐ',
                    data: [10, 8, 6, 5, 4, 7],
                    stack: 1,
                    backgroundColor: [
                      'rgba(226, 159, 106, 0.92)',
                      'rgba(226, 159, 106, 0.92)',
                      'rgba(226, 159, 106, 0.92)',
                      'rgba(226, 159, 106, 0.92)',
                      'rgba(226, 159, 106, 0.92)',
                      'rgba(226, 159, 106, 0.92)'
                    ]
                  }
                ] 
            },
            doughnutData: {
                labels: [
                    'MFA',
                    'NON-MFA'
                ],
                datasets: [{
                    data: [5667, 2829],
                    backgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                    ],
                }]
            }      
        }
    }

    componentDidMount(){
        document.title = "Quản lý cấp phép | Giám sát tài nguyên nước Sơn La";


        trackPromise(
            axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/danh-sach-tat-ca-giay-phep")
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        countDataNuocMat: response.data.gp_all.length,
                        DataNuocMat: response.data.gp_all,
                    });
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            })
        )

        trackPromise(
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/dem-so-giay-phep")
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        countLicense: response.data.tat_ca_gp_nuoc_mat,
                    });
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            })
        )
    }

    render(){
        const chartOptions = {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'right'
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Năm'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Số giấy phép'
                    }
                }
            }
        }

        const doughnutOptions = {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'right'
                },
            }
        }

        return(
			<div className="p-0">
                <Header headTitle="QUẢN LÝ CẤP PHÉP TÀI NGUYÊN NƯỚC" previousLink="/" showHeadImage={true} layout48={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-12 col-lg-2 px-0 menu-home">
                        <div className="row m-0">
                            <div className="col-lg-12 p-0">
                                <ul className="nav flex-column nav-pills pl-2 pb-1 mx-auto my-3 rounded">
                                    <div >
                                        <p className="btn btn-outline-dark col-12 col-sm-11 mx-auto font-13 btn-sm d-flex justify-content-center align-items-center fw-bold"> <InfoCircleOutlined className="mx-1" /> GIỚI THIỆU CHUNG</p>
                                        <p className="exploit-surfacewater-title mb-2 p-2 fw-bold text-start font-12">KHAI THÁC SỬ DỤNG NƯỚC MẶT</p>
                                        <li className="nav-item">
                                            <Link to="/quan-ly-cap-phep/nuoc-mat/thuy-dien" className="nav-link font-13 hover-link" href="#">Thủy Điện</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/quan-ly-cap-phep/nuoc-mat/ho-chua" className="nav-link font-13 hover-link">Hồ Chứa</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/quan-ly-cap-phep/nuoc-mat/tram-bom" className="nav-link font-13 hover-link">Trạm Bơm</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi" className="nav-link font-13 hover-link">Đập / Hệ Thống Thủy Lợi</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/quan-ly-cap-phep/nuoc-mat/cong" className="nav-link font-13 hover-link">Cống</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc" className="nav-link font-13 hover-link">Trạm Cấp Nước</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc" className="nav-link font-13 hover-link">Nhà Máy Nước</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/quan-ly-cap-phep/nuoc-mat/cong-trinh-khac" className="nav-link font-13 hover-link">Công Trình Khác</Link>
                                        </li>
                                    </div>
                                    <div className="exploit-surfacewater">
                                        <p className="exploit-surfacewater-title mb-2 p-2 fw-bold text-start font-12">KHAI THÁC NƯỚC DƯỚI ĐẤT</p>
                                        <li className="nav-item">
                                            <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac" className="nav-link font-13 hover-link">Khai Thác</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do" className="nav-link font-13 hover-link">Thăm Dò</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan" className="nav-link font-13 hover-link">Hành Nghề Khoan</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac" className="nav-link font-13 hover-link">Công Trình Khác</Link>
                                        </li>
                                    </div>
                                    <div className="exploit-surfacewater">
                                        <p className="exploit-surfacewater-title mb-2 p-2 fw-bold text-start font-12">XẢ THẢI VÀO NGUỒN NƯỚC</p>
                                        <li className="nav-item">
                                            <Link to="#" className="nav-link font-13 hover-link">Khu / Cụm CN  Tập Trung</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="#" className="nav-link font-13 hover-link">SX Tiểu Thủ CN</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="#" className="nav-link font-13 hover-link">SX KD Dịch Vụ</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="#" className="nav-link font-13 hover-link">CS Bệnh Viện</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="#" className="nav-link font-13 hover-link">Khu Dân Cư / Làng Nghề</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="#" className="nav-link font-13 hover-link">Chăn Nuôi / NTTS</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="#" className="nav-link font-13 hover-link">Công Trình Khác</Link>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-7 menu-home px-md-1">
                        <div className="qlcp-chart col-12 p-0 mt-3 card">
                            <div className="card-header">Số lượng giấy phép công trình được cấp theo năm</div>
                            <div className="col-12 row mx-0 pt-2">
                                <div className="col-12 col-md-3 mb-2 px-3">
                                    <span className="col-12 col-lg-2 fw-bold">Từ :</span>
                                    <select className="mx-3 form-control form-control-sm">
                                        <option defaultValue="2018">2018</option>
                                        <option defaultValue="2019">2019</option>
                                        <option defaultValue="2020">2020</option>
                                    </select>
                                </div>
                                <div className="col-12 col-md-3 mb-2 px-3">
                                    <span className="col-12 col-lg-2 fw-bold">Đến :</span>
                                    <select className="mx-3 form-control form-control-sm">
                                        <option defaultValue="2018">2018</option>
                                        <option defaultValue="2019">2019</option>
                                        <option defaultValue="2020">2020</option>
                                    </select>
                                </div>
                                <div className="col-12 col-md-3 mb-2 px-3">
                                    <span className="col-12 col-lg-2 fw-bold">Huyện :</span>
                                    <select className="mx-3 form-control form-control-sm">
                                        <option defaultValue="2018">2018</option>
                                        <option defaultValue="2019">2019</option>
                                        <option defaultValue="2020">2020</option>
                                    </select>
                                </div>
                                <div className="col-12 col-md-3 mb-2 px-3">
                                    <span className="col-12 col-lg-2 fw-bold">&nbsp;</span>
                                    <button className="btn btn-sm btn-primary d-flex align-items-center fw-bold mx-auto text-light"><SearchOutlined /> &nbsp; THỐNG KÊ </button>
                                </div>
                                
                            </div>
                            <div className="card-body">
                                <Bar height={350} width={75} data={this.state.barChartData} options={chartOptions} />
                            </div>
                        </div>

                        <div className="qlcp-chart col-12 p-0 mt-3 card">
                            <div className="card-body col-12 row mx-0">
                                <div className="col-12 col-md-4 p-0">
                                    <div className="form-group mb-2">
                                        <label className="fw-bold m-0">Biểu đồ:</label>
                                        <input type="text" className="form-control form-control-sm" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="fw-bold m-0">Đối tượng:</label>
                                        <input type="text" className="form-control form-control-sm" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="fw-bold m-0">Nhóm:</label>
                                        <input type="text" className="form-control form-control-sm" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="fw-bold m-0">Giai đoạn:</label>
                                        <input type="text" className="form-control form-control-sm" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="fw-bold m-0">Chu kỳ:</label>
                                        <input type="text" className="form-control form-control-sm" />
                                    </div>
                                    <div className="form-group d-flex mb-2 justify-content-between">
                                        <button className="col-5 font-11 btn btn-sm btn-success d-flex align-items-center justify-content-center mr-1"><DownloadOutlined /> &nbsp; Xuất PDF</button>
                                        <button className="col-5 font-11 btn btn-sm btn-primary d-flex align-items-center justify-content-center"><LineChartOutlined /> &nbsp; Thống kê</button>
                                    </div>
                                </div>
                                <div className="col-md-8 col-12">
                                    <Doughnut data={this.state.doughnutData} options={doughnutOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 px-0 menu-home">
                        <div className="row m-0">
                            <div className="col-lg-12 p-0">
                                <div className="d-block col-11 pb-1 mx-auto my-3 rounded text-white px-0 bg-sw-content-box">
                                    <p className="bg-sw-title-box rounded mb-2 p-2 fw-bold text-center">KHAI THÁC SỬ DỤNG NƯỚC MẶT</p>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Giấy phép: </p>
                                        <p className="col-3">{this.state.countDataNuocMat}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Còn hiệu lực: </p>
                                        <p className="col-3">{this.state.countLicense.con_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Sắp hết hiệu lực: </p>
                                        <p className="col-3"> {this.state.countLicense.sap_het_hieu_luc} </p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Hết hiệu lực: </p>
                                        <p className="col-3">{this.state.countLicense.het_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa phê duyệt: </p>
                                        <p className="col-3">{this.state.countLicense.chua_phe_duyet}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa có GP thay thế: </p>
                                        <p className="col-3"> -- </p>
                                    </div>
                                </div>

                                <div className="col-11 pb-1 mx-auto my-3 rounded text-white px-0 bg-success">
                                    <p className="bg-ww-title-box rounded mb-2 p-2 fw-bold text-center">XẢ THẢI VÀO NGUỒN NƯỚC</p>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Giấy phép: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Sắp hết hiệu lực: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Hết hiệu lực: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa phê duyệt: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa có GP thay thế: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                </div>

                                <div className="col-11 pb-1 mx-auto my-3 rounded px-0 bg-warning">
                                    <p className="bg-euw-title-box rounded mb-2 p-2 fw-bold text-center">KHAI THÁC NƯỚC DƯỚI ĐẤT</p>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Giấy phép: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Sắp hết hiệu lực: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Hết hiệu lực: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa phê duyệt: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa có GP thay thế: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                </div>

                                <div className="col-11 pb-1 mx-auto my-3 rounded text-white px-0 bg-danger">
                                    <p className="bg-uwe-title-box rounded mb-2 p-2 fw-bold text-center">THĂM DÒ NƯỚC DƯỚI ĐẤT</p>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Giấy phép: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Sắp hết hiệu lực: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Hết hiệu lực: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa phê duyệt: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa có GP thay thế: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                </div>

                                <div className="col-11 pb-1 mx-auto my-3 rounded text-white px-0 bg-secondary">
                                    <p className="bg-practise-title-box rounded mb-2 p-2 fw-bold text-center">HÀNH NGHỀ</p>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Giấy phép: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Sắp hết hiệu lực: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Hết hiệu lực: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa phê duyệt: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa có GP thay thế: </p>
                                        <p className="col-3">1000</p>
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