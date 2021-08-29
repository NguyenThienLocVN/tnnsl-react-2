import React from 'react';
import Header from '../Shared/Header';
import axios from "axios";
import configData from "../config.json";
import { DownloadOutlined, LineChartOutlined } from '@ant-design/icons';
import { Bar, Doughnut } from 'react-chartjs-2';
import { trackPromise } from 'react-promise-tracker';
import { removeUserSession } from '../Shared/Auth';
import { Button } from 'antd';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';


export default class QuanLyCapPhep extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            DemGPNuocMat:[],
            DemGPKTNuocDuoiDat:[],
            DemGPTDNuocDuoiDat:[],
            DemGPKhoanNuocDuoiDat:[],
            barChartData: {},
            doughnutData: {},
            startYear: '2016',
            endYear: '2020',
        }
    }

    componentDidMount(){
        document.title = "Quản lý cấp phép | Giám sát tài nguyên nước Sơn La";

        trackPromise(
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/dem-giay-phep")
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        DemGPNuocMat: response.data.gp_nuocmat,
                        DemGPKTNuocDuoiDat: response.data.gp_ktnuocduoidat,
                        DemGPTDNuocDuoiDat: response.data.gp_tdnuocduoidat,
                        DemGPKhoanNuocDuoiDat: response.data.gp_khoannuocduoidat,
                    });
                }
            })
            .catch((error) => {
                if(error.response.status === 401)
                {
                    removeUserSession();
                    window.location.reload();
                }
                this.setState({msg: error.response})
            })
        )
        trackPromise(axios
            .get(configData.API_URL + "/quan-ly-cap-phep/dem-giay-phep-theo-loai/"+this.state.startYear+"/"+this.state.endYear)
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        barChartData: {
                            labels: response.data.label,
                            datasets: [
                            {
                                label: 'KT, SD nước mặt',
                                data: response.data.data.gp_nuocmat,
                                stack: 1,
                                backgroundColor: [
                                    'rgb(97, 205, 187)',
                                ],
                            },
                            {
                                label: 'Khai thác nước dưới đất',
                                data: response.data.data.gp_ktnuocduoidat,
                                stack: 1,
                                backgroundColor: [
                                    'rgb(39, 194, 76)',
                                ],
                            },
                            {
                                label: 'Thăm dò nước dưới đất',
                                data: response.data.data.gp_tdnuocduoidat,
                                stack: 1,
                                backgroundColor: [
                                    'rgba(220, 172, 172, 0.77)',
                                ],
                            },
                            {
                                label: 'Hành nghề khoan nước dưới đất',
                                data: response.data.data.gp_khoannuocduoidat,
                                stack: 1,
                                backgroundColor: [
                                    'rgba(226, 159, 106, 0.92)',
                                ],
                            },
                            {
                                label: 'Xả thải',
                                data: response.data.data.gp_xathai,
                                stack: 1,
                                backgroundColor: [
                                    'rgba(255, 159, 64)',
                                ],
                            },
                            
                            ] 
                        }
                    });
                }
            })
            .catch((error) => {
                if(error.response.status === 401)
                {
                    removeUserSession();
                    window.location.reload();
                }
                this.setState({msg: error.response})
            })
        )
        trackPromise(axios
            .get(configData.API_URL + "/quan-ly-cap-phep/dem-giay-phep-theo-loai/2016/2020")
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        doughnutData: {
                            labels: [
                                'Năm 2015','Năm 2016','Năm 2017','Năm 2018','Năm 2019','Năm 2020',
                            ],
                            datasets: [{
                                data: response.data.data.gp_nuocmat,
                                backgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                'orange',
                                'orangered',
                                'violet',
                                'green'
                                ],
                            }]
                        }
                    });
                }
            })
            .catch((error) => {
                if(error.response.status === 401)
                {
                    removeUserSession();
                    window.location.reload();
                }
                this.setState({msg: error.response})
            })
        )
    }
    
    handlerChangeYear = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    handlerFillterYear = () => {
        trackPromise(axios
            .get(configData.API_URL + "/quan-ly-cap-phep/dem-giay-phep-theo-loai/"+this.state.startYear+"/"+this.state.endYear)
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        barChartData: {
                            labels: response.data.label,
                            datasets: [
                            {
                                label: 'KT, SD nước mặt',
                                data: response.data.data.gp_nuocmat,
                                stack: 1,
                                backgroundColor: [
                                    'rgb(97, 205, 187)',
                                ],
                            },
                            {
                                label: 'Khai thác nước dưới đất',
                                data: response.data.data.gp_ktnuocduoidat,
                                stack: 1,
                                backgroundColor: [
                                    'rgb(39, 194, 76)',
                                ],
                            },
                            {
                                label: 'Thăm dò nước dưới đất',
                                data: response.data.data.gp_tdnuocduoidat,
                                stack: 1,
                                backgroundColor: [
                                    'rgba(220, 172, 172, 0.77)',
                                ],
                            },
                            {
                                label: 'Hành nghề khoan nước dưới đất',
                                data: response.data.data.gp_khoannuocduoidat,
                                stack: 1,
                                backgroundColor: [
                                    'rgba(226, 159, 106, 0.92)',
                                ],
                            },
                            {
                                label: 'Xả thải',
                                data: response.data.data.gp_xathai,
                                stack: 1,
                                backgroundColor: [
                                    'rgba(255, 159, 64)',
                                ],
                            },
                            
                            ] 
                        }
                    });
                }
            })
            .catch((error) => {
                if(error.response.status === 401)
                {
                    removeUserSession();
                    window.location.reload();
                }
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
                    position: 'top'
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
                <Header headTitle="QUẢN LÝ CẤP PHÉP" previousLink="/" showHeadImage={true} />
                <main className="d-flex flex-column flex-lg-row">
                    {/* NAV */}
                    <DesktopNav />
                    <MobileNav />             
                      {/* END NAV */}
                    <div className="col-12 col-lg-7 menu-home px-md-1">
                        <div className="qlcp-chart col-12 p-0 mt-3 card">
                            <div className="card-header">Biểu đồ số lượng giấy phép được cấp theo năm</div>
                            <div>
                                <form>
                                    <div className="row m-0 py-1">
                                        <div className="d-flex col-auto p-0 mb-2">
                                            <div className="col-auto row mx-0 px-0 align-items-center">
                                                <div className="col-md-auto col-12">
                                                    <label className="col-form-label">Từ năm: </label>
                                                </div>
                                                <div className="col-md-auto col-12">
                                                    <select name="startYear" defaultValue={this.state.startYear} className="form-select form-select-sm" onChange={this.handlerChangeYear} >
                                                        <option value={2013}>2013</option>
                                                        <option value={2014}>2014</option>
                                                        <option value={2015}>2015</option>
                                                        <option value={2016}>2016</option>
                                                        <option value={2017}>2017</option>
                                                        <option value={2018}>2018</option>
                                                        <option value={2019}>2019</option>
                                                        <option value={2020}>2020</option>
                                                        <option value={2021}>2021</option>
                                                        <option value={2022}>2022</option>
                                                        <option value={2023}>2023</option>
                                                        <option value={2024}>2024</option>
                                                        <option value={2025}>2025</option>
                                                        <option value={2026}>2026</option>
                                                        <option value={2027}>2027</option>
                                                        <option value={2028}>2028</option>
                                                        <option value={2029}>2029</option>
                                                        <option value={2030}>2030</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-auto row mx-0 px-0 align-items-center">
                                                <div className="col-md-auto col-12">
                                                    <label className="col-form-label">Đến năm: </label>
                                                </div>
                                                <div className="col-md-auto col-12">
                                                    <select name="endYear" defaultValue={this.state.endYear} className="form-select form-select-sm" onChange={this.handlerChangeYear} >
                                                        <option value={2013}>2013</option>
                                                        <option value={2014}>2014</option>
                                                        <option value={2015}>2015</option>
                                                        <option value={2016}>2016</option>
                                                        <option value={2017}>2017</option>
                                                        <option value={2018}>2018</option>
                                                        <option value={2019}>2019</option>
                                                        <option value={2020}>2020</option>
                                                        <option value={2021}>2021</option>
                                                        <option value={2022}>2022</option>
                                                        <option value={2023}>2023</option>
                                                        <option value={2024}>2024</option>
                                                        <option value={2025}>2025</option>
                                                        <option value={2026}>2026</option>
                                                        <option value={2027}>2027</option>
                                                        <option value={2028}>2028</option>
                                                        <option value={2029}>2029</option>
                                                        <option value={2030}>2030</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-auto row mx-0 px-0 align-items-center mb-2">
                                            <div className="col-md-auto col-12">
                                                <Button type="primary" onClick={this.handlerFillterYear}> Lọc </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-body">
                                <Bar height={500} width={75} data={this.state.barChartData} options={chartOptions} />
                            </div>
                        </div>

                        <div className="qlcp-chart col-12 p-0 mt-3 card">
                            <div className="card-header">Số lượng giấy phép công trình được cấp theo năm</div>
                            <div className="card-body col-12 row mx-0">
                                <div className="col-12 col-md-3 p-0">
                                    <div className="form-group mb-2">
                                        <label className="fw-bold m-0">Đối tượng:</label>
                                        <select className="form-select form-select-sm">
                                            <option>Đối tượng 0</option>
                                            <option>Đối tượng 1</option>
                                            <option>Đối tượng 2</option>
                                            <option>Đối tượng 3</option>
                                            <option>Đối tượng 4</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="fw-bold m-0">Nhóm:</label>
                                        <select className="form-select form-select-sm">
                                            <option>Nhóm 0</option>
                                            <option>Nhóm 1</option>
                                            <option>Nhóm 2</option>
                                            <option>Nhóm 3</option>
                                            <option>Nhóm 4</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="fw-bold m-0">Giai đoạn:</label>
                                        <select className="form-select form-select-sm">
                                            <option>Giai đoạn 0</option>
                                            <option>Giai đoạn 1</option>
                                            <option>Giai đoạn 2</option>
                                            <option>Giai đoạn 3</option>
                                            <option>Giai đoạn 4</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="fw-bold m-0">Chu kỳ:</label>
                                        <select className="form-select form-select-sm">
                                            <option>Chu kỳ 0</option>
                                            <option>Chu kỳ 1</option>
                                            <option>Chu kỳ 2</option>
                                            <option>Chu kỳ 3</option>
                                            <option>Chu kỳ 4</option>
                                        </select>
                                    </div>
                                    <div className="form-group d-flex mb-2 justify-content-between">
                                        <button className="col-5 font-11 btn btn-sm btn-success d-flex align-items-center justify-content-center mr-1"><DownloadOutlined /> &nbsp; Xuất PDF</button>
                                        <button className="col-5 font-11 btn btn-sm btn-primary d-flex align-items-center justify-content-center"><LineChartOutlined /> &nbsp; Thống kê</button>
                                    </div>
                                </div>
                                <div className="col-md-9 col-12">
                                    <Doughnut data={this.state.doughnutData} options={doughnutOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 mx-0 px-0 menu-home">
                        <div className="row m-0">
                            <div className="col-lg-12 p-0">
                                <div className="d-block col-11 pb-1 mx-auto my-3 rounded text-white px-0 bg-sw-content-box">
                                    <p className="bg-sw-title-box rounded mb-2 p-2 fw-bold text-center">KHAI THÁC SỬ DỤNG NƯỚC MẶT</p>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Giấy phép: </p>
                                        <p className="col-3">{this.state.DemGPNuocMat.tat_ca_giay_phep}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Còn hiệu lực: </p>
                                        <p className="col-3">{this.state.DemGPNuocMat.con_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Sắp hết hiệu lực: </p>
                                        <p className="col-3"> {this.state.DemGPNuocMat.sap_het_hieu_luc} </p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Hết hiệu lực: </p>
                                        <p className="col-3">{this.state.DemGPNuocMat.het_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa phê duyệt: </p>
                                        <p className="col-3">{this.state.DemGPNuocMat.chua_phe_duyet}</p>
                                    </div>
                                </div>

                                <div className="col-11 pb-1 mx-auto my-3 rounded text-white px-0 bg-success">
                                    <p className="bg-ww-title-box rounded mb-2 p-2 fw-bold text-center">XẢ THẢI VÀO NGUỒN NƯỚC</p>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Giấy phép: </p>
                                        <p className="col-3">1000</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Còn hiệu lực: </p>
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
                                </div>

                                <div className="col-11 pb-1 mx-auto my-3 rounded px-0 bg-warning">
                                    <p className="bg-euw-title-box rounded mb-2 p-2 fw-bold text-center">KHAI THÁC NƯỚC DƯỚI ĐẤT</p>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Giấy phép: </p>
                                        <p className="col-3">{this.state.DemGPKTNuocDuoiDat.tat_ca_giay_phep}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Còn hiệu lực: </p>
                                        <p className="col-3">{this.state.DemGPKTNuocDuoiDat.con_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Sắp hết hiệu lực: </p>
                                        <p className="col-3">{this.state.DemGPKTNuocDuoiDat.sap_het_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Hết hiệu lực: </p>
                                        <p className="col-3">{this.state.DemGPKTNuocDuoiDat.het_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa phê duyệt: </p>
                                        <p className="col-3">{this.state.DemGPKTNuocDuoiDat.chua_phe_duyet}</p>
                                    </div>
                                </div>

                                <div className="col-11 pb-1 mx-auto my-3 rounded text-white px-0 bg-danger">
                                    <p className="bg-uwe-title-box rounded mb-2 p-2 fw-bold text-center">THĂM DÒ NƯỚC DƯỚI ĐẤT</p>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Giấy phép: </p>
                                        <p className="col-3">{this.state.DemGPTDNuocDuoiDat.tat_ca_giay_phep}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Còn hiệu lực: </p>
                                        <p className="col-3">{this.state.DemGPTDNuocDuoiDat.con_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Sắp hết hiệu lực: </p>
                                        <p className="col-3">{this.state.DemGPTDNuocDuoiDat.sap_het_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Hết hiệu lực: </p>
                                        <p className="col-3">{this.state.DemGPTDNuocDuoiDat.het_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa phê duyệt: </p>
                                        <p className="col-3">{this.state.DemGPTDNuocDuoiDat.chua_phe_duyet}</p>
                                    </div>
                                </div>

                                <div className="col-11 pb-1 mx-auto my-3 rounded text-white px-0 bg-secondary">
                                    <p className="bg-practise-title-box rounded mb-2 p-2 fw-bold text-center">HÀNH NGHỀ</p>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Giấy phép: </p>
                                        <p className="col-3">{this.state.DemGPKhoanNuocDuoiDat.tat_ca_giay_phep}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Còn hiệu lực: </p>
                                        <p className="col-3">{this.state.DemGPKhoanNuocDuoiDat.con_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Sắp hết hiệu lực: </p>
                                        <p className="col-3">{this.state.DemGPKhoanNuocDuoiDat.sap_het_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Hết hiệu lực: </p>
                                        <p className="col-3">{this.state.DemGPKhoanNuocDuoiDat.het_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa phê duyệt: </p>
                                        <p className="col-3">{this.state.DemGPKhoanNuocDuoiDat.chua_phe_duyet}</p>
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