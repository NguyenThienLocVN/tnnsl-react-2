import React from 'react';
import Header from '../../../../../layout/Header';
import { Link } from 'react-router-dom';
import Map from '../../../../../layout/Map';
import { Tabs } from 'antd';
import axios from "axios";
import configData from "../../../../../../config.json";
import { FolderViewOutlined, FilePdfOutlined, PrinterOutlined } from '@ant-design/icons';
import { trackPromise } from 'react-promise-tracker';

const TabPane = Tabs.TabPane;

export default class QuanLyCapPhepNuocMatXemThongTinChung extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mode: 'top',
          pagename: this.props.match.params.pagename,
          idConstruct: this.props.match.params.id,
          dataLicenseInfo:[],
        };
      }
      componentDidMount(){
    
        document.title = "Xem thông tin chung khai thác nước dưới đất";

        trackPromise(
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/giay-phep-khai-thac/"+this.props.match.params.id)
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        dataLicenseInfo: response.data,
                    });
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            })
        )
    }
    render(){
        const { mode } = this.state;
        return(
			<div className="p-0">
                <Header headTitle="THÔNG TIN CHUNG KHAI THÁC NƯỚC DƯỚI ĐẤT" previousLink={"/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac"} showHeadImage={true} layout48={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-lg-12 px-0 row mx-0">
                        <div className="col-lg-2">
                            <nav className="nav flex-column nav-pills pt-3">
                                <Link to={"/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/xem-thong-tin-chung/"+this.props.match.params.id} className="nav-link text-dark border-bottom active">Thông tin chung</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/xem-thong-tin-cong-trinh/"+this.props.match.params.id} className="nav-link text-dark border-bottom">Thông tin công trình</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/giam-sat-khai-thac-su-dung/"+this.props.match.params.id} className="nav-link text-dark border-bottom">Giám sát KTSD</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/chat-luong-nuoc-mat/"+this.props.match.params.id} className="nav-link text-dark border-bottom">Chất lượng nước mặt</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/ho-so-cap-phep/"+this.props.match.params.id} className="nav-link text-dark border-bottom">Hồ sơ cấp phép</Link>
                            </nav>
                        </div>
                        <div className="col-12 col-lg-10 px-md-1 pr-2 menu-home discharge-water">
                            <div className="col-12 px-0 vh-50">
                                <Map className="col-12" pagename={this.state.pagename} idConstruct={this.state.idConstruct} subpagename="thong-tin-cong-trinh" />
                            </div>
                            <div className="col-12 px-0">
                                <Tabs className="col-12" defaultActiveKey="1" tabPosition={ mode }>
                                    <TabPane tab="Thông tin chung" key="1">
                                        <div className="row mx-0 col-lg-12 px-0 infomation_table pb-5">
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row px-0 mx-0 align-items-center">
                                                        <div className="fw-bold col-md-4 px-0">
                                                            <span >Tổ chức/Cá nhân được cấp phép:</span>
                                                        </div>
                                                        <input type="text" className="form-control form-control-sm" value={this.state.dataLicenseInfo.chugiayphep_ten || ""} readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row px-0 mx-0 align-items-center">
                                                        <div className="fw-bold col-md-4 px-0">
                                                            <span >Đ/C tổ chức/cá nhân được cấp phép:</span>
                                                        </div>
                                                        <textarea rows="1" className="form-control form-control-sm" defaultValue={this.state.dataLicenseInfo.chugiayphep_diachi || ""} readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 col-lg-12 px-0">
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="row px-0 mx-0 align-items-center">
                                                            <div className="fw-bold col-md-4 px-0">
                                                                <span >Số giấy phép:</span>
                                                            </div>
                                                            <input type="text" className="form-control form-control-sm" value={this.state.dataLicenseInfo.gp_sogiayphep || ""} readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="row px-0 mx-0 align-items-center">
                                                            <div className="fw-bold col-md-4 px-0">
                                                                <span >Tên văn bản:</span>
                                                            </div>
                                                            <input type="text" className="form-control form-control-sm" value={this.state.dataLicenseInfo.gp_tengiayphep || ""} readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row px-0 mx-0 align-items-center">
                                                        <div className="fw-bold col-md-4 px-0">
                                                            <span >Cơ quan cấp phép:</span>
                                                        </div>
                                                        <input type="text" className="form-control form-control-sm" value={this.state.dataLicenseInfo.gp_coquan_capphep || ""} readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 col-lg-12 px-0">
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="row px-0 mx-0 align-items-center">
                                                            <div className="fw-bold col-md-4 px-0">
                                                                <span >Loại hình giấy phép:</span>
                                                            </div>
                                                            <input type="text" className="form-control form-control-sm" value={this.state.dataLicenseInfo.loaigiayphep || ""} readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="row px-0 mx-0 align-items-center">
                                                            <div className="fw-bold col-md-4 px-0">
                                                                <span >Thời hạn giấy phép:</span>
                                                            </div>
                                                            <input type="text" value={this.state.dataLicenseInfo.gp_thoihangiayphep || ""} className="form-control form-control-sm"  readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            {   this.state.dataLicenseInfo.gp_loaigiayphep === "cap-moi" ? 
                                                ""
                                                :
                                                <>
                                                <div className="row mx-0 col-lg-12 px-0">
                                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                        <div className="col-lg-12"> 
                                                            <div className="row px-0 mx-0 align-items-center">
                                                                <div className="fw-bold col-md-4 px-0">
                                                                    <span >Số giấy phép cũ:</span>
                                                                </div>
                                                                <input type="text" className="form-control form-control-sm" value={this.state.dataLicenseInfo.gp_sogiayphepcu || ""} readOnly />
                                                            </div> 
                                                        </div>
                                                    </div>
                                                    <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                        <div className="col-lg-12"> 
                                                            <div className="row px-0 mx-0 align-items-center">
                                                                <div className="fw-bold col-md-4 px-0">
                                                                    <span >Ngày cấp phép  cũ:</span>
                                                                </div>
                                                                <input type="text" value={this.state.dataLicenseInfo.gp_ngaycapphepcu || ""} className="form-control form-control-sm"  readOnly />
                                                            </div> 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="row px-0 mx-0 align-items-center">
                                                            <div className="fw-bold px-0 col-md-12 px-0">
                                                                <span >Nội dung cấp lại:</span>
                                                            </div>
                                                            <textarea readOnly className="form-control form-control-sm" rows="3" defaultValue={this.state.dataLicenseInfo.gp_noi_dungcapphep || ""} />
                                                        </div> 
                                                    </div>
                                                </div>
                                                </>
                                            }
                                            <div className="row mx-0 col-lg-12 px-0">
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="row px-0 mx-0 align-items-center">
                                                            <div className="fw-bold col-md-4 px-0">
                                                                <span >Người ký:</span>
                                                            </div>
                                                            <input type="text" className="form-control form-control-sm" value={this.state.dataLicenseInfo.gp_nguoiky || ""} readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="row px-0 mx-0 align-items-center">
                                                            <div className="fw-bold col-md-4 px-0">
                                                                <span >Chức vụ:</span>
                                                            </div>
                                                            <input type="text" value={this.state.dataLicenseInfo.gp_chucvu_nguoiky || ""} className="form-control form-control-sm"  readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 col-lg-12 px-0">
                                                <div className="row mx-0 py-2 col-lg-4 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="row px-0 mx-0 align-items-center">
                                                            <div className="fw-bold col-md-4 px-0">
                                                                <span >Ngày ký:</span>
                                                            </div>
                                                            <input type="date" value={this.state.dataLicenseInfo.gp_ngayky || ""} className="form-control form-control-sm"  readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-4 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="row px-0 mx-0 align-items-center">
                                                            <div className="fw-bold col-md-4 px-0">
                                                                <span >Có hiệu lực từ:</span>
                                                            </div>
                                                            <input type="date" value={this.state.dataLicenseInfo.gp_ngaybatdau || ""} className="form-control form-control-sm"  readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-4 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="row px-0 mx-0 align-items-center">
                                                            <div className="fw-bold col-md-4 px-0">
                                                                <span >Hiệu lực đến:</span>
                                                            </div>
                                                            <input type="date" value={this.state.dataLicenseInfo.gp_ngayhethan || ""} className="form-control form-control-sm"  readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row px-0 mx-0 align-items-center">
                                                        <div className="fw-bold px-0 col-md-12 px-0">
                                                            <span >Ghi Chú:</span>
                                                        </div>
                                                        <textarea readOnly className="form-control form-control-sm" rows="3" defaultValue={this.state.dataLicenseInfo.gp_ghichu || ""} /> 
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Thanh tra / Kiểm tra" key="2">
                                        <div className="row mx-0 col-lg-12 px-0 infomation_table pb-5">
                                            <div className="row mx-0 col-lg-12 px-0">
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="row px-0 mx-0 align-items-center">
                                                            <div className="fw-bold px-0 col-md-12 px-0">
                                                                <span >Tên đợt thanh tra:</span>
                                                            </div>
                                                            <textarea readOnly className="form-control form-control-sm" rows="2" defaultValue="Inspections Name " /> 
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="row px-0 mx-0 align-items-center">
                                                            <div className="fw-bold px-0 col-md-12 px-0">
                                                                <span >Tên trưởng đoàn: </span>
                                                            </div>
                                                            <textarea readOnly className="form-control form-control-sm" rows="2" defaultValue="Nguyễn Văn A" /> 
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 col-lg-12 px-0">
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="row px-0 mx-0 align-items-center">
                                                            <div className="fw-bold px-0 col-md-12 px-0">
                                                                <span >Tên đơn vị thực hiện:</span>
                                                            </div>
                                                            <textarea readOnly className="form-control form-control-sm" rows="1" defaultValue="Đoàn Thah Tra ABC " /> 
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="row px-0 mx-0 align-items-center">
                                                            <div className="fw-bold px-0 col-md-12 px-0">
                                                                <span >Năm thực hiện: </span>
                                                            </div>
                                                            <input type="date" className="form-control form-control-sm" readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row px-0 mx-0 align-items-center">
                                                        <div className="fw-bold px-0 col-md-12 px-0">
                                                            <span >Ghi chú: </span>
                                                        </div>
                                                        <textarea readOnly className="form-control form-control-sm" rows="2" defaultValue="nội dung ghi chú" /> 
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Tiền cấp quyền KTSD" key="3">
                                        <div className="row mx-0 col-lg-12 px-0">
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row px-0 mx-0 align-items-center">
                                                        <div className="fw-bold px-0 col-md-4 px-0">
                                                            <span >Quyết định số:</span>
                                                        </div>
                                                        <input className="form-control form-control-sm" value=" AB123D " readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="row px-0 mx-0 align-items-center">
                                                        <div className="fw-bold px-0 col-md-4 px-0">
                                                            <span >Tổng Tiền: </span>
                                                        </div>
                                                        <input className="form-control form-control-sm" value=" 11,511,353,700 " readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Theo dõi quá trình sau GP" key="4">
                                        <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                            <div className="col-lg-12"> 
                                                <div className="row px-0 mx-0 align-items-center">
                                                    <div className="fw-bold px-0 col-md-12 px-0">
                                                        <span >Ngày tháng: </span>
                                                    </div>
                                                    <textarea readOnly className="form-control form-control-sm" rows="1" defaultValue="" /> 
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                            <div className="col-lg-12"> 
                                                <div className="row px-0 mx-0 align-items-center">
                                                    <div className="fw-bold px-0 col-md-12 px-0">
                                                        <span >Văn bản: </span>
                                                    </div>
                                                    <textarea readOnly className="form-control form-control-sm" rows="1" defaultValue="" /> 
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                            <div className="col-lg-12"> 
                                                <div className="row px-0 mx-0 align-items-center">
                                                    <div className="fw-bold px-0 col-md-12 px-0">
                                                        <span >Nội Dung:  </span>
                                                    </div>
                                                    <textarea readOnly className="form-control form-control-sm" rows="1" defaultValue="" /> 
                                                </div> 
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Theo dõi quá trình thực hiện kết nối" key="5">Content of tab 5</TabPane>
                                    <TabPane tab="Thông tin tài liệu đính kèm" key="6">
                                        <ul className="row mx-0 col-lg-12 px-0 infomation_table pb-5">
                                            <li className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <span className="col-lg-6">Đơn xin cấp phép</span>
                                                <div className="row px-0 mx-0 col-lg-6"> 
                                                    <button type="button" className="col-3 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-outline-primary"> < FilePdfOutlined className="mx-2" /> File đính kèm </button> 
                                                    <button type="button" className="col-2 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-outline-success"> < FolderViewOutlined className="mx-2" /> Xem </button> 
                                                    <button type="button" className="col-2 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-primary"> < PrinterOutlined className="mx-2" /> In </button> 
                                                </div>
                                            </li>
                                            <li className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <span className="col-lg-6">Báo cáo/Đề án khai thác sử dụng</span>
                                                <div className="row px-0 mx-0 col-lg-6"> 
                                                    <button type="button" className="col-3 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-outline-primary"> < FilePdfOutlined className="mx-2" /> File đính kèm </button> 
                                                    <button type="button" className="col-2 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-outline-success"> < FolderViewOutlined className="mx-2" /> Xem </button> 
                                                    <button type="button" className="col-2 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-primary"> < PrinterOutlined className="mx-2" /> In </button> 
                                                </div>
                                            </li>
                                            <li className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <span className="col-lg-6">Kết quả phân tích chất lượng nước</span>
                                                <div className="row px-0 mx-0 col-lg-6"> 
                                                    <button type="button" className="col-3 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-outline-primary"> < FilePdfOutlined className="mx-2" /> File đính kèm </button> 
                                                    <button type="button" className="col-2 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-outline-success"> < FolderViewOutlined className="mx-2" /> Xem </button> 
                                                    <button type="button" className="col-2 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-primary"> < PrinterOutlined className="mx-2" /> In </button> 
                                                </div>
                                            </li>
                                            <li className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <span className="col-lg-6">Văn bản ý kến cộng đồng</span>
                                                <div className="row px-0 mx-0 col-lg-6"> 
                                                    <button type="button" className="col-3 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-outline-primary"> < FilePdfOutlined className="mx-2" /> File đính kèm </button> 
                                                    <button type="button" className="col-2 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-outline-success"> < FolderViewOutlined className="mx-2" /> Xem </button> 
                                                    <button type="button" className="col-2 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-primary"> < PrinterOutlined className="mx-2" /> In </button> 
                                                </div>
                                            </li>
                                            <li className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <span className="col-lg-6">Giấy tờ khác</span>
                                                <div className="row px-0 mx-0 col-lg-6"> 
                                                    <button type="button" className="col-3 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-outline-primary"> < FilePdfOutlined className="mx-2" /> File đính kèm </button> 
                                                    <button type="button" className="col-2 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-outline-success"> < FolderViewOutlined className="mx-2" /> Xem </button> 
                                                    <button type="button" className="col-2 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-primary"> < PrinterOutlined className="mx-2" /> In </button> 
                                                </div>
                                            </li>
                                            <li className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <span className="col-lg-6">Quyết định phê duyệt lần 1</span>
                                                <div className="row px-0 mx-0 col-lg-6"> 
                                                    <button type="button" className="col-3 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-outline-primary"> < FilePdfOutlined className="mx-2" /> File đính kèm </button> 
                                                    <button type="button" className="col-2 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-outline-success"> < FolderViewOutlined className="mx-2" /> Xem </button> 
                                                    <button type="button" className="col-2 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-primary"> < PrinterOutlined className="mx-2" /> In </button> 
                                                </div>
                                            </li>
                                            <li className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <span className="col-lg-6">Quyết định phê duyệt lần 2</span>
                                                <div className="row px-0 mx-0 col-lg-6"> 
                                                    <button type="button" className="col-3 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-outline-primary"> < FilePdfOutlined className="mx-2" /> File đính kèm </button> 
                                                    <button type="button" className="col-2 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-outline-success"> < FolderViewOutlined className="mx-2" /> Xem </button> 
                                                    <button type="button" className="col-2 mx-1 btn btn-sm d-flex justify-content-center align-items-center btn-primary"> < PrinterOutlined className="mx-2" /> In </button> 
                                                </div>
                                            </li>
                                        </ul>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}