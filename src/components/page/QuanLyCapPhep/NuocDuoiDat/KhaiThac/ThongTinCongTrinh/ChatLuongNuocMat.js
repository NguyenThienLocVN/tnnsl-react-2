import React from 'react';
import Header from '../../../../../layout/Header';
import { Link } from 'react-router-dom';
import Map from '../../../../../layout/Map';
import axios from "axios";
import configData from "../../../../../../config.json";
import { trackPromise } from 'react-promise-tracker';

export default class QuanLyCapPhepNuocMatChatLuongNuocMat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          pagename: this.props.match.params.pagename,
          dataCategoriesContruction: [],
          chatLuongNuocMatQCVN: [],
        };
      }
    componentDidMount(){
        
        document.title = "Xem thông tin khai thác nước dưới đất";

        trackPromise(
            axios
                .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/giay-phep-khai-thac/"+this.props.match.params.id)
                .then((response) => {
                    if(response.status === 200)
                    {
                        this.setState({
                            dataCategoriesContruction: response.data,
                        });
                        
                    }
                })
                .catch((error) => {
                    this.setState({msg: error.response})
                })
            )
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/chat-luong-nuoc-mat-qcvn")
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        chatLuongNuocMatQCVN: response.data,
                    })
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            })
        
    }

    chatLuongNuocMatQCVN = () => {
        return (
            this.state.chatLuongNuocMatQCVN.map((e, i) => (
                <tr key={i} className="text-center align-middle">
                    <td className="p-1">{i+1}</td>
                    <td className="text-start p-1"> {e.thong_so} </td>
                    <td className="p-1"> {e.don_vi} </td>
                    <td className="p-1"> {e.A1} </td>
                    <td className="p-1"> {e.A2} </td>
                    <td className="p-1"> {e.B1} </td>
                    <td className="p-1"> {e.B2} </td>
                </tr>
            ))
        )
    }

    render(){
        return(
			<div className="p-0">
                <Header headTitle="KHAI THÁC NƯỚC DƯỚI ĐẤT CHẤT LƯỢNG NƯỚC MẶT" previousLink={"/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac"} showHeadImage={true} layout48={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-lg-12 px-0 row mx-0">
                        <div className="col-lg-2">
                            <nav className="nav flex-column nav-pills pt-3">
                                <Link to={"/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/xem-thong-tin-chung/"+this.props.match.params.id} className="nav-link text-dark border-bottom ">Thông tin chung</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/xem-thong-tin-cong-trinh/"+this.props.match.params.id} className="nav-link text-dark border-bottom">Thông tin công trình</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/giam-sat-khai-thac-su-dung/"+this.props.match.params.id} className="nav-link text-dark border-bottom">Giám sát KTSD</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/chat-luong-nuoc-mat/"+this.props.match.params.id} className="nav-link text-dark border-bottom active">Chất lượng nước mặt</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/ho-so-cap-phep/"+this.props.match.params.id} className="nav-link text-dark border-bottom">Hồ sơ cấp phép</Link>
                            </nav>
                        </div>
                        <div className="col-12 row mx-0 col-lg-10 px-md-1 pr-2 menu-home discharge-water">
                            <div className="col-12 px-0">
                                <div className="col-lg-12 vh-50 px-0 mb-3">
                                    <Map className="col-12 h-100" />
                                </div>
                                <div className="col-lg-12 px-0">
                                    <div className="row mx-0 mb-3">
                                        <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 fw-bold text-13">Tên công trình:</div>
                                            <input type="text" className="form-control form-control-sm col-6" value={this.state.dataCategoriesContruction.ten_ct || ""} readOnly />
                                        </div>
                                        <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 fw-bold text-13">Ký hiệu công trình:</div>
                                            <input type="text" className="form-control form-control-sm col-6" value={this.state.dataCategoriesContruction.ky_hieu_ct || ""} readOnly />
                                        </div>
                                        <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 fw-bold text-13">Ngày lấy mẫu:</div>
                                            <input type="text" className="form-control form-control-sm col-6" value="--" readOnly />
                                        </div>
                                        <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                            <div className="col-6 px-0 fw-bold text-13">Địa điểm lấy mẫu:</div>
                                            <input type="text" className="form-control form-control-sm col-6" value="--" readOnly />
                                        </div>
                                    </div>
                                    <p className="exploit-surfacewater-title mb-0 p-2 font-weight fw-bold text-start">Chất lượng nước mặt theo QCVN 08-MT:2015-BTNMMT</p>
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr className="text-center align-middle">
                                                    <th className="p-1 align-middle" rowSpan="3">STT</th>
                                                    <th className="p-1 align-middle" rowSpan="3">Thông số</th>
                                                    <th className="p-1 align-middle" rowSpan="3">Giá trị quan trắc</th>
                                                    <th className="p-1 align-middle" colSpan="4">Giá trị giới hạn</th>
                                                </tr>
                                                <tr className="text-center align-middle">
                                                    <th className="p-1 align-middle" colSpan="2">A</th>
                                                    <th className="p-1 align-middle" colSpan="2">B</th>
                                                </tr>
                                                <tr className="text-center align-middle">
                                                    <th className="p-1 align-middle">A 1</th>
                                                    <th className="p-1 align-middle">A 2</th>
                                                    <th className="p-1 align-middle">B 1</th>
                                                    <th className="p-1 align-middle">B 2</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.chatLuongNuocMatQCVN()}
                                            </tbody>
                                        </table>
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