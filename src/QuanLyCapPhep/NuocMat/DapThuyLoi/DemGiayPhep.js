import React from 'react';
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import { Link } from 'react-router-dom';
import configData from "../../../config.json";
import { getToken } from '../../../Shared/Auth';

export default class DemGiayDapThuyLoi extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            countLicense: [],
        }
    }
    componentDidMount(){
        trackPromise(
            axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/dem-giay-phep", {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        countLicense: response.data.dap,
                    });
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            })
        )
    }


    render(){
        return(
            <div className="col-12 px-2 pb-4">
                <div className="col-10 py-2 m-auto row m-0 justify-content-center text-center">
                        <div className="col-12 text-center p-0">
                            <p className="fw-bold font-20 text-primary col-sm-12 mb-1">Tổng số công trình <br /> đập thủy lợi </p>
                        </div>
                        <div className="col-6 text-center p-0">
                            <p className="font-30 m-0 fw-bold">{this.state.countLicense.allgp ? this.state.countLicense.allgp : 0}</p>
                        </div>
                        <div className="col-6 text-center p-0">
                            <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/NuocDuoiDat/anhkhaithacnuocduoidat.png'} className="p-0 hydroelectric-icon border border-secondary my-auto mx-3" alt="dap-dap-thuy-loi" />
                        </div>
                    </div>

                    <div className="col-12 py-1 mt-4 d-flex justify-content-center text-center border-top border-bottom">
                        <div className="col-9 text-start p-0">
                            <p className="fw-bold m-0">Tổng số công trình (TSCT)  đã vận hành</p>
                            <p className="font-18 m-0 fw-bold text-danger">{this.state.countLicense.tat_ca_giay_phep} / {this.state.countLicense.tat_ca_giay_phep}</p>
                        </div>
                        <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/NuocDuoiDat/anhkhaithacnuocduoidat.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="dap-dap-thuy-loi" />
                    </div>
                    <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                        <div className="col-9 text-start p-0">
                            <p className="fw-bold m-0">Giấy phép đã cấp</p>
                            <p className="font-18 m-0 fw-bold text-danger">{this.state.countLicense.giay_phep_da_cap - this.state.countLicense.chua_phe_duyet} / {this.state.countLicense.tat_ca_giay_phep}</p>
                        </div>
                        <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep" />
                    </div>
                    <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                        <div className="col-9 text-start p-0">
                            <p className="fw-bold m-0">Giấy phép sắp hết hiệu lực</p>
                            <p className="font-18 m-0 fw-bold text-danger">{this.state.countLicense.sap_het_hieu_luc} / {this.state.countLicense.tat_ca_giay_phep}</p>
                        </div>
                        <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing-2.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep-2" />
                    </div>
                    <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                        <div className="col-9 text-start p-0">
                            <p className="fw-bold m-0">Giấy phép hết hiệu lực</p>
                            <p className="font-18 m-0 fw-bold text-danger">{this.state.countLicense.het_hieu_luc} / {this.state.countLicense.tat_ca_giay_phep}</p>
                        </div>
                        <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/licensing-3.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="giay-phep-3" />
                    </div>
                    <div className="col-12 py-1 d-flex justify-content-center text-center border-bottom">
                        <div className="col-9 text-start p-0">
                            <p className="fw-bold m-0">Chưa có giấy phép</p>
                            <p className="font-18 m-0 fw-bold text-danger"> {this.state.countLicense.chua_phe_duyet} / {this.state.countLicense.tat_ca_giay_phep}</p>
                        </div>
                        <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/CONG_TRINH/expire.png'} className="p-0 hydroelectric-sub-icon border-secondary my-auto mx-3" alt="het-han" />
                    </div>

                    
                    <Link to="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi/cap-moi" style={{backgroundColor: "rgb(0 152 208)"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Cấp mới giấy phép</Link>
                    <Link to="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi/quan-ly-cap-moi" style={{backgroundColor: "#1EC0D7"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Quản lý cấp phép</Link>
                    <Link to="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi/gia-han-dieu-chinh" style={{backgroundColor: "#C5E287"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Gia hạn, điều chỉnh giấy phép</Link>
                    <Link to="#" style={{backgroundColor: "#E2D987"}} className="col-11 btn d-flex align-items-center mx-auto mt-3 fw-bold">Hướng dẫn sử dụng</Link>
                </div>
        )
    }
}