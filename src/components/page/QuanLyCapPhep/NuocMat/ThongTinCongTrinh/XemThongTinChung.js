import React from 'react';
import Header from '../../../../layout/Header';
import { Link } from 'react-router-dom';
import Map from '../../../../layout/Map';
import { Tabs } from 'antd';
import { FolderViewOutlined } from '@ant-design/icons';

const TabPane = Tabs.TabPane;

export default class QuanLyCapPhepNuocMatXemThongTinChung extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mode: 'top',
          pagename: this.props.match.params.pagename,
        };
      }
      componentDidMount(){
        if(this.state.pagename === "thuy-dien"){
            document.title = "Xem thông tin | Thủy điện | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "ho-chua"){
            document.title = "Xem thông tin | Hồ Chứa | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "tram-bom"){
            document.title = "Xem thông tin | Trạm Bơm | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            document.title = "Xem thông tin | Đập/Hệ Thống Thủy Lợi | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "cong"){
            document.title = "Xem thông tin | Cống | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            document.title = "Xem thông tin | Trạm Cấp  Nước | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            document.title = "Xem thông tin | Nhà  Máy Nước | Quản lý cấp phép nước mặt";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            document.title = "Xem thông tin | Công Trình Khác | Quản lý cấp phép nước mặt";
        }
        
    }
    headerTitle = () => {
        if(this.state.pagename === "thuy-dien"){
            return " THỦY ĐIỆN | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "ho-chua"){
            return " HỒ CHỨA | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "tram-bom"){
            return " TRẠM BƠM | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            return " HT THỦY LỢI | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "cong"){
            return " CỐNG | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            return " TRẠM CẤP NƯỚC | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            return " NHÀ MÁY NƯỚC | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            return " CÔNG TRÌNH KHÁC | THÔNG TIN CHUNG";
        }
    }

    render(){
        const { mode } = this.state;
        return(
			<div className="p-0">
                <Header headTitle={this.headerTitle()} previousLink={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename} showHeadImage={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-lg-12 px-0 row mx-0">
                        <div className="col-lg-2">
                            <nav className="nav flex-column nav-pills pt-3">
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-chung"} className="nav-link text-dark border-bottom active">Thông tin chung</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-cong-trinh"} className="nav-link text-dark border-bottom">Thông tin công trình</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/giam-sat-khai-thac-su-dung"} className="nav-link text-dark border-bottom">Giám sát KTSD</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/chat-luong-nuoc-mat"} className="nav-link text-dark border-bottom">Chất lượng nước mặt</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/ho-so-cap-phep"} className="nav-link text-dark border-bottom">Hồ sơ cấp phép</Link>
                            </nav>
                        </div>
                        <div className="col-12 col-lg-10 px-md-1 pr-2 menu-home discharge-water">
                            <div className="col-12 px-0 vh-50">
                                <Map className="col-12" />
                            </div>
                            <div className="col-12 px-0">
                                <Tabs className="col-12" defaultActiveKey="1" tabPosition={ mode }>
                                    <TabPane tab="Thông tin chung" key="1">
                                        <div className="row mx-0 col-lg-12 px-0 infomation_table pb-5">
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold col-md-4 px-0">
                                                            <span >Tổ chức/Cá nhân được cấp phép:</span>
                                                        </div>
                                                        <input type="text" className="form-control form-control-sm" placeholder="Organition Name" readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold col-md-4 px-0">
                                                            <span >Đ/C tổ chức/cá nhân được cấp phép:</span>
                                                        </div>
                                                        <input type="text" className="form-control form-control-sm" placeholder="Organition Adress" readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 col-lg-12 px-0">
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="input-group d-flex align-items-center">
                                                            <div className="font-weight-bold col-md-4 px-0">
                                                                <span >Số giấy phép:</span>
                                                            </div>
                                                            <input type="text" className="form-control form-control-sm" placeholder="Licence Number" readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="input-group d-flex align-items-center">
                                                            <div className="font-weight-bold col-md-4 px-0">
                                                                <span >Tên văn bản:</span>
                                                            </div>
                                                            <input type="text" className="form-control form-control-sm" placeholder="Licence Name" readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold col-md-4 px-0">
                                                            <span >Cơ quan cấp phép:</span>
                                                        </div>
                                                        <input type="text" className="form-control form-control-sm" placeholder="Licensing authorities" readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 col-lg-12 px-0">
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="input-group d-flex align-items-center">
                                                            <div className="font-weight-bold col-md-4 px-0">
                                                                <span >Loại hình giấy phép:</span>
                                                            </div>
                                                            <input type="text" className="form-control form-control-sm" placeholder="Licence Type" readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="input-group d-flex align-items-center">
                                                            <div className="font-weight-bold col-md-4 px-0">
                                                                <span >Thời hạn giấy phép:</span>
                                                            </div>
                                                            <input type="date" value="2020-01-01" className="form-control form-control-sm"  readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 col-lg-12 px-0">
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="input-group d-flex align-items-center">
                                                            <div className="font-weight-bold col-md-4 px-0">
                                                                <span >Số giấy phép cũ:</span>
                                                            </div>
                                                            <input type="text" className="form-control form-control-sm" placeholder="Old Licence Number" readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="input-group d-flex align-items-center">
                                                            <div className="font-weight-bold col-md-4 px-0">
                                                                <span >Ngày cấp phép  cũ:</span>
                                                            </div>
                                                            <input type="date" value="2020-01-01" className="form-control form-control-sm"  readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-12 px-0">
                                                            <span >Nội dung cấp lại:</span>
                                                        </div>
                                                        <textarea readOnly className="form-control form-control-sm" rows="3" defaultValue="Re-issued content" />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 col-lg-12 px-0">
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="input-group d-flex align-items-center">
                                                            <div className="font-weight-bold col-md-4 px-0">
                                                                <span >Người ký:</span>
                                                            </div>
                                                            <input type="text" className="form-control form-control-sm" placeholder="Nguyễn Văn A" readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="input-group d-flex align-items-center">
                                                            <div className="font-weight-bold col-md-4 px-0">
                                                                <span >Ngày ký:</span>
                                                            </div>
                                                            <input type="date" value="2020-01-01" className="form-control form-control-sm"  readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 col-lg-12 px-0">
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="input-group d-flex align-items-center">
                                                            <div className="font-weight-bold col-md-4 px-0">
                                                                <span >Có hiệu lực từ:</span>
                                                            </div>
                                                            <input type="date" value="2020-01-01" className="form-control form-control-sm"  readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="input-group d-flex align-items-center">
                                                            <div className="font-weight-bold col-md-4 px-0">
                                                                <span >Hiệu lực đến:</span>
                                                            </div>
                                                            <input type="date" value="2020-01-01" className="form-control form-control-sm"  readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-12 px-0">
                                                            <span >Nơi nhận:</span>
                                                        </div>
                                                        <input type="text" className="form-control form-control-sm" placeholder="Sở TNMT" readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-12 px-0">
                                                            <span >Ghi Chú:</span>
                                                        </div>
                                                        <textarea readOnly className="form-control form-control-sm" rows="3" defaultValue="20/02/2020" /> 
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
                                                        <div className="input-group d-flex align-items-center">
                                                            <div className="font-weight-bold px-0 col-md-12 px-0">
                                                                <span >Tên đợt thanh tra:</span>
                                                            </div>
                                                            <textarea readOnly className="form-control form-control-sm" rows="2" defaultValue="Inspections Name " /> 
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="input-group d-flex align-items-center">
                                                            <div className="font-weight-bold px-0 col-md-12 px-0">
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
                                                        <div className="input-group d-flex align-items-center">
                                                            <div className="font-weight-bold px-0 col-md-12 px-0">
                                                                <span >Tên đơn vị thực hiện:</span>
                                                            </div>
                                                            <textarea readOnly className="form-control form-control-sm" rows="1" defaultValue="Đoàn Thah Tra ABC " /> 
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                    <div className="col-lg-12"> 
                                                        <div className="input-group d-flex align-items-center">
                                                            <div className="font-weight-bold px-0 col-md-12 px-0">
                                                                <span >Năm thực hiện: </span>
                                                            </div>
                                                            <input type="date" className="form-control form-control-sm" readOnly />
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-12 px-0">
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
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-4 px-0">
                                                            <span >Quyết định số:</span>
                                                        </div>
                                                        <input className="form-control form-control-sm" value=" AB123D " readOnly />
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-6 border-bottom px-0">
                                                <div className="col-lg-12"> 
                                                    <div className="input-group d-flex align-items-center">
                                                        <div className="font-weight-bold px-0 col-md-4 px-0">
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
                                                <div className="input-group d-flex align-items-center">
                                                    <div className="font-weight-bold px-0 col-md-12 px-0">
                                                        <span >Ngày tháng: </span>
                                                    </div>
                                                    <textarea readOnly className="form-control form-control-sm" rows="1" defaultValue="Không có dữ liệu..." /> 
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                            <div className="col-lg-12"> 
                                                <div className="input-group d-flex align-items-center">
                                                    <div className="font-weight-bold px-0 col-md-12 px-0">
                                                        <span >Văn bản: </span>
                                                    </div>
                                                    <textarea readOnly className="form-control form-control-sm" rows="1" defaultValue="Không có dữ liệu..." /> 
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                            <div className="col-lg-12"> 
                                                <div className="input-group d-flex align-items-center">
                                                    <div className="font-weight-bold px-0 col-md-12 px-0">
                                                        <span >Nội Dung:  </span>
                                                    </div>
                                                    <textarea readOnly className="form-control form-control-sm" rows="1" defaultValue="Không có dữ liệu..." /> 
                                                </div> 
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Theo dõi quá trình thực hiện kết nối" key="5">Content of tab 5</TabPane>
                                    <TabPane tab="Thông tin tài liệu đính kèm" key="6">
                                        <div className="row mx-0 col-lg-12 px-0 infomation_table pb-5">
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-1">1</div>
                                                <div className="col-lg-5">Tên tài liệu 1</div>
                                                <div className="col-lg-6"> <button type="button" className="btn btn-sm d-flex align-items-center btn-outline-primary"> < FolderViewOutlined className="mx-2" /> Xem Tài Liệu</button> </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-1">2</div>
                                                <div className="col-lg-5">Tên tài liệu 2</div>
                                                <div className="col-lg-6"> <button type="button" className="btn btn-sm d-flex align-items-center btn-outline-primary"> < FolderViewOutlined className="mx-2" /> Xem Tài Liệu</button> </div>
                                            </div>
                                            <div className="row mx-0 py-2 col-lg-12 border-bottom px-0">
                                                <div className="col-lg-1">3</div>
                                                <div className="col-lg-5">Tên tài liệu 3</div>
                                                <div className="col-lg-6"> <button type="button" className="btn btn-sm d-flex align-items-center btn-outline-primary"> < FolderViewOutlined className="mx-2" /> Xem Tài Liệu</button> </div>
                                            </div>
                                        </div>
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