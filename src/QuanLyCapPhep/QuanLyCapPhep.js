import React from 'react';
import Header from '../Shared/Header';
import axios from "axios";
import configData from "../config.json";
import { LineChartOutlined } from '@ant-design/icons';
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
            DemGPNuocDuoiDat:[],
            barChartData: {},
            doughnutData: {},
            startYear: '2016',
            endYear: '2021',
            timeFilterType: true
        }
    }

    changeTimeFilterType = (e) => {
        this.setState({timeFilterType: e.target.value});
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
                        DemGPNuocDuoiDat: response.data.gp_nuocduoidat,
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
                    console.log(response.data);
                    this.setState({
                        barChartData: {
                            labels: response.data.label,
                            datasets: [
                            {
                                label: 'Nước mặt',
                                data: response.data.dataCharts.gp_nuocmat,
                                stack: 1,
                                backgroundColor: [
                                    'rgb(97, 205, 187)',
                                ],
                            },
                            {
                                label: 'Nước dưới đất',
                                data: response.data.dataCharts.gp_nuocduoidat,
                                stack: 1,
                                backgroundColor: [
                                    'rgb(39, 194, 76)',
                                ],
                            },
                            {
                                label: 'Xả thải',
                                data: response.data.dataCharts.gp_xathai,
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
                                'GP còn hiệu lực','GP sắp hết hiệu lực','GP hết hiệu lực','GP chưa phê duyệt',
                            ],
                            datasets: [{
                                data: response.data.dataChartsDoughnut.gp_nuocmat,
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
                                label: 'Nước mặt',
                                data: response.data.dataCharts.gp_nuocmat,
                                stack: 1,
                                backgroundColor: [
                                    'rgb(97, 205, 187)',
                                ],
                            },
                            {
                                label: 'Nước dưới đất',
                                data: response.data.dataCharts.gp_nuocduoidat,
                                stack: 1,
                                backgroundColor: [
                                    'rgb(39, 194, 76)',
                                ],
                            },
                            {
                                label: 'Xả thải',
                                data: response.data.dataCharts.gp_xathai,
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
                    position: 'right',
                    align: 'start',
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
                                                    <input type="number" name="startYear" defaultValue={this.state.startYear} className="form-control form-control-sm" min="2000" max="3000" onChange={this.handlerChangeYear} />
                                                </div>
                                            </div>
                                            <div className="col-auto row mx-0 px-0 align-items-center">
                                                <div className="col-md-auto col-12">
                                                    <label className="col-form-label">Đến năm: </label>
                                                </div>
                                                <div className="col-md-auto col-12">
                                                    <input type="number" name="endYear" defaultValue={this.state.endYear} className="form-control form-control-sm" min="2000" max="3000" onChange={this.handlerChangeYear} /> 
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
                            <div className="card-header">Biểu đồ tỉ lệ loại giấy phép công trình theo năm</div>
                            <div className="card-body col-12 row mx-0 py-4">
                                <div className="col-12 col-md-3 p-0">
                                    <div className="form-group mb-3">
                                        <label className="fw-bold mt-2 mb-1">Loại giấy phép:</label>
                                        <select className="form-select form-select-sm">
                                            <option>Khai thác sử dụng nước mặt</option>
                                            <option>Khai thác nước dưới đất</option>
                                            <option>Xả thải vào nguồn nước</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="fw-bold mt-2 mb-1">Giai đoạn:</label>
                                        <select className="form-select form-select-sm" onChange={(e) => this.changeTimeFilterType(e)} value={this.state.timeFilterType}>
                                            <option value="all">Tất cả thời gian</option>
                                            <option value="range">Khoảng thời gian</option>
                                        </select>
                                    </div>
                                    
                                    <div className="col-12 d-flex mb-4">
                                        {this.state.timeFilterType === 'range' && 
                                            <>
                                                <div className="form-group mb-2 col-6 px-1">
                                                    <label className="fw-bold mt-2 mb-1">Từ:</label>
                                                    <select className="form-select form-select-sm">
                                                        <option>2015</option>
                                                        <option>2016</option>
                                                        <option>2017</option>
                                                        <option>2018</option>
                                                        <option>2019</option>
                                                        <option>2019</option>
                                                    </select>
                                                </div>
                                                <div className="form-group mb-2 col-6 px-1">
                                                    <label className="fw-bold mt-2 mb-1">Đến:</label>
                                                    <select className="form-select form-select-sm">
                                                        <option>2015</option>
                                                        <option>2016</option>
                                                        <option>2017</option>
                                                        <option>2018</option>
                                                        <option>2019</option>
                                                        <option>2019</option>
                                                    </select>
                                                </div>
                                            </>
                                        }
                                    </div>
                                    
                                    <div>
                                        <button className="btn btn-sm btn-primary mx-auto d-flex align-items-center justify-content-center"><LineChartOutlined /> &nbsp; Thống kê</button>
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

                                <div className="col-11 pb-1 mx-auto my-3 rounded px-0 bg-warning">
                                    <p className="bg-euw-title-box rounded mb-2 p-2 fw-bold text-center">KHAI THÁC NƯỚC DƯỚI ĐẤT</p>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Giấy phép: </p>
                                        <p className="col-3">{this.state.DemGPNuocDuoiDat.tat_ca_giay_phep}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Còn hiệu lực: </p>
                                        <p className="col-3">{this.state.DemGPNuocDuoiDat.con_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Sắp hết hiệu lực: </p>
                                        <p className="col-3">{this.state.DemGPNuocDuoiDat.sap_het_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Hết hiệu lực: </p>
                                        <p className="col-3">{this.state.DemGPNuocDuoiDat.het_hieu_luc}</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa phê duyệt: </p>
                                        <p className="col-3">{this.state.DemGPNuocDuoiDat.chua_phe_duyet}</p>
                                    </div>
                                </div>

                                <div className="col-11 pb-1 mx-auto my-3 rounded text-white px-0 bg-success">
                                    <p className="bg-ww-title-box rounded mb-2 p-2 fw-bold text-center">XẢ THẢI VÀO NGUỒN NƯỚC</p>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Giấy phép: </p>
                                        <p className="col-3">64</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Còn hiệu lực: </p>
                                        <p className="col-3">47</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Sắp hết hiệu lực: </p>
                                        <p className="col-3">0</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Hết hiệu lực: </p>
                                        <p className="col-3">17</p>
                                    </div>
                                    <div className="fw-bold col-12 d-flex px-2">
                                        <p className="col-9 px-sm-0 font-13">Chưa phê duyệt: </p>
                                        <p className="col-3">0</p>
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