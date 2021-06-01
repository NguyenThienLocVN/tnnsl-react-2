import React, { useState } from 'react';
import Header from '../../../../layout/Header';
import { Link } from 'react-router-dom';
import Map from '../../../../layout/Map';
import { DatePicker } from 'antd';
import { Modal, Button} from 'react-bootstrap';
import { MacCommandOutlined, SelectOutlined, SearchOutlined, CalendarOutlined, CloseOutlined, FileExcelOutlined, PrinterOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Line } from 'react-chartjs-2';

function TongHopHoChua() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const data = {
        labels: ['11/02/2021', '12/02/2021', '13/02/2021', '14/02/2021', '15/02/2021', '16/02/2021', '17/02/2021', '18/02/2021', '19/02/2021', '20/02/2021', '21/02/2021', '22/02/2021'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 23, 15, 15, 54, 92, 66],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
        }]
    };

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            }
        },
        scales: {
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Mực nước'
                }
            }
        }
    }

    return (
        <>
        <MacCommandOutlined onClick={handleShow} />
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Body>
                <p><b>TỔNG HỢP HỒ CHỨA - Tên hồ chứa</b> <Button className="close-btn" variant="white" onClick={handleClose}><CloseOutlined /></Button> </p>
                <hr />
                <div className="col-12 p-0 d-flex">
                    <div className="col-3 p-0">
                        <p className="fw-bold mb-0 mt-3">THÔNG SỐ</p>
                        <div className="bg-lightgray col-12 d-flex px-2">
                            <p className="col-9 p-0 my-1">Mực nước yêu cầu đầu mùa cạn (m)</p>
                            <p className="col-3 pr-0 my-1">--</p>
                        </div>
                        <div className="bg-lightgray col-12 d-flex px-2">
                            <p className="col-9 p-0 my-1">Dung tích yêu cầu đầu mùa cạn (triệu m³)</p>
                            <p className="col-3 pr-0 my-1">--</p>
                        </div>

                        <p className="fw-bold mb-0 mt-3">TÌNH HÌNH VẬN HÀNH</p>
                        <div className="col-12 d-flex px-2 bg-lightgreen">
                            <p className="col-9 p-0 my-1">Mực nước hiện tại (m)</p>
                            <p className="col-3 pr-0 my-1">544.91</p>
                        </div>
                        <div className="col-12 d-flex px-2 bg-lightgreen">
                            <p className="col-9 p-0 my-1">Mực nước yêu cầu (m)</p>
                            <p className="col-3 pr-0 my-1">--</p>
                        </div>
                        <div className="col-12 d-flex px-2 bg-lightgreen">
                            <p className="col-9 p-0 my-1">Chênh lệch (m)</p>
                            <p className="col-3 pr-0 my-1">--</p>
                        </div>
                        <div className="col-12 d-flex px-2 bg-goldenyellow">
                            <p className="col-9 p-0 my-1">Dung tích hiện tại (triệu m³)</p>
                            <p className="col-3 pr-0 my-1">--</p>
                        </div>
                        <div className="col-12 d-flex px-2 bg-goldenyellow">
                            <p className="col-9 p-0 my-1">Dung tích yêu cầu (triệu m³)</p>
                            <p className="col-3 pr-0 my-1">--</p>
                        </div>
                        <div className="col-12 d-flex px-2 bg-goldenyellow">
                            <p className="col-9 p-0 my-1">Chênh lệch (m)</p>
                            <p className="col-3 pr-0 my-1">--</p>
                        </div>
                        <div className="col-12 d-flex px-2 bg-lightred">
                            <p className="col-9 p-0 my-1">Lưu lượng xả thực tế (m³/s)</p>
                            <p className="col-3 pr-0 my-1">--</p>
                        </div>
                        <div className="col-12 d-flex px-2 bg-lightred">
                            <p className="col-9 p-0 my-1">Lưu lượng yêu cầu (m³/s)</p>
                            <p className="col-3 pr-0 my-1">--</p>
                        </div>
                        <div className="col-12 d-flex px-2 bg-lightred">
                            <p className="col-9 p-0 my-1">Chênh lệch (m³/s)</p>
                            <p className="col-3 pr-0 my-1">--</p>
                        </div>
                        <div className="col-12 d-flex px-2 bg-lightblue">
                            <p className="col-9 p-0 my-1">Thời gian thực tế (Giờ)</p>
                            <p className="col-3 pr-0 my-1">--</p>
                        </div>
                        <div className="col-12 d-flex px-2 bg-lightblue">
                            <p className="col-9 p-0 my-1">Thời gian yêu cầu (Giờ)</p>
                            <p className="col-3 pr-0 my-1">--</p>
                        </div>
                        <div className="col-12 d-flex px-2 bg-lightblue">
                            <p className="col-9 p-0 my-1">Chênh lệch (Giờ)</p>
                            <p className="col-3 pr-0 my-1">--</p>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="col-12 d-flex">
                            <div className="col-4 d-flex align-items-center">
                                <span className="pr-2">Từ ngày</span>
                                <DatePicker name="from-date" />
                            </div>
                            <div className="col-4 d-flex align-items-center">
                                <span className="pr-2">Đến ngày</span>
                                <DatePicker name="to-date" />
                            </div>
                            <div className="col-3">
                                <button className="submit-date btn btn-info d-flex align-items-center font-13"><SearchOutlined />&nbsp; TÌM KIẾM</button>
                            </div>
                        </div>
                        <Line data={data} option={chartOptions} />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

function CapNhatSoLieuVanHanh() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <SelectOutlined onClick={handleShow} />
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Body>
                <p><b>CẬP NHẬT SỐ LIỆU VẬN HÀNH - Tên thủy điện</b> <Button className="close-btn" variant="white" onClick={handleClose}><CloseOutlined /></Button> </p>
                <hr />
                <div className="col-12 p-0">
                    <div className="col-12 d-flex px-2">
                        <div className="col-6 p-0 my-1 d-flex">
                            <p className="col-3 m-0 pl-0">Hồ chứa</p>
                            <p className="col-6 m-0">Ialy</p>
                        </div>
                        <div className="col-6 p-0 my-1 d-flex">
                            <p className="col-3 m-0">Ngày</p>
                            <p className="col-6 m-0">05/05/2021</p>
                        </div>
                    </div>

                    <p className="fw-bold mb-0 mt-3 pl-2">TRUNG BÌNH NGÀY</p>
                    <div className="col-12 d-flex px-2">
                        <div className="col-6 d-flex px-2 bg-lightgray">
                            <p className="col-7 p-0 my-1">Mực nước hồ (m)</p>
                            <p className="col-3 pr-0 my-1">544.91</p>
                        </div>
                        <div className="col-6 d-flex px-2 bg-lightgray">
                            <p className="col-7 p-0 my-1">Tổng lưu lượng xả (m)</p>
                            <p className="col-3 pr-0 my-1">29</p>
                        </div>
                    </div>
                    <div className="col-12 d-flex px-2">
                        <div className="col-6 d-flex px-2">
                            <p className="col-7 p-0 my-1">Lưu lượng đến hồ (m³/s)</p>
                            <p className="col-3 pr-0 my-1">91</p>
                        </div>
                        <div className="col-6 d-flex px-2">
                            <p className="col-7 p-0 my-1">Lưu lượng qua nhà máy (m³/s)</p>
                            <p className="col-3 pr-0 my-1">21</p>
                        </div>
                    </div>
                    <div className="col-12 d-flex px-2">
                        <div className="col-6 d-flex px-2 bg-lightgray">
                            <p className="col-7 p-0 my-1">Số giờ phát điện</p>
                            <p className="col-3 pr-0 my-1">91</p>
                        </div>
                        <div className="col-6 d-flex px-2 bg-lightgray">
                            <p className="col-7 p-0 my-1">Lưu lượng xả sau đập (m³/s)</p>
                            <p className="col-3 pr-0 my-1">28</p>
                        </div>
                    </div>
                    <div className="col-12 d-flex px-2">
                        <div className="col-6 d-flex px-2">
                            <p className="col-7 p-0 my-1">Ghi chú</p>
                            <p className="col-3 pr-0 my-1">--</p>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-sm table-bordered col-12 table-hover text-center">
                            <thead>
                                <tr>
                                    <th scope="col"rowSpan="2">VẬN HÀNH KHÔNG DÚNG QUY TRÌNH</th>
                                    <th scope="col" colSpan="2">TÊN CÔNG TRÌNH</th>
                                </tr>
                                <tr>
                                    <th scope="col">SỐ NGÀY</th>
                                    <th scope="col">CÁC NGÀY</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-start">Tổng lưu lượng xả</td>
                                    <td>0</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td className="text-start">Dòng chảy tối thiểu</td>
                                    <td>0</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td className="text-start">Thời gian xả</td>
                                    <td>0</td>
                                    <td>-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="fw-bold mb-0 mt-3 pl-2">CHI TIẾT</p>
                    <div className="table-responsive">
                        <table className="table table-sm table-bordered col-12 table-striped table-hover text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Giờ</th>
                                    <th scope="col">Mực nước hồ (m)</th>
                                    <th scope="col">Lưu lượng đến hồ (m³/s)</th>
                                    <th scope="col">Tổng lưu lượng xả (m³/s)</th>
                                    <th scope="col">Lưu lượng qua nhà máy (m³/s)</th>
                                    <th scope="col">Lưu lượng xả sau đập (m³/s)</th>
                                    <th scope="col">Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">07:00</th>
                                    <td>500.37</td>
                                    <td>233</td>
                                    <td>280</td>
                                    <td>280</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">12:00</th>
                                    <td>500.37</td>
                                    <td>263</td>
                                    <td>281</td>
                                    <td>282</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>   
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}
function XemHienTrang() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <CalendarOutlined  onClick={handleShow} />
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Body>
                <p><b>CÔNG TRÌNH THEO DÕI - Tên công trình</b> <Button className="close-btn" variant="white" onClick={handleClose}><CloseOutlined /></Button> </p>
                <hr />
                <div className="table-responsive">
                    <table className="table table-sm table-bordered col-12 table-striped table-hover text-center">
                        <thead>
                            <tr>
                                <th scope="col">Trạm</th>
                                <th scope="col">Chỉ số</th>
                                <th scope="col">Giá Trị</th>
                                <th scope="col">Đơn vị</th>
                                <th scope="col">Thời gian đo</th>
                                <th scope="col">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>NHAMAY</td>
                                <td>LUULUONG</td>
                                <td>0</td>
                                <td>m3/s</td>
                                <td>11:34:07, 31/05/2021</td>
                                <td>Bình thường</td>
                            </tr>
                            <tr>
                                <td>QUATTRAN</td>
                                <td>LUULUONG</td>
                                <td>0</td>
                                <td>m3/s</td>
                                <td>11:34:07, 31/05/2021</td>
                                <td>Bình thường</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default class QuanLyCapPhepNuocMatGiamSatKhaiThacSuDung extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            return " CÔNG TRÌNH THỦY ĐIỆN | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "ho-chua"){
            return " CÔNG TRÌNH HỒ CHỨA | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "tram-bom"){
            return " CÔNG TRÌNH TRẠM BƠM | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "he-thong-thuy-loi"){
            return " CÔNG TRÌNH HT THỦY LỢI | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "cong"){
            return " CÔNG TRÌNH CỐNG | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "tram-cap-nuoc"){
            return " CÔNG TRÌNH TRẠM CẤP NƯỚC | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "nha-may-nuoc"){
            return " CÔNG TRÌNH NHÀ MÁY NƯỚC | THÔNG TIN CHUNG";
        }
        else if(this.state.pagename === "cong-trinh-khac"){
            return " CÔNG TRÌNH KHÁC | THÔNG TIN CHUNG";
        }
    }

    render(){
        return(
			<div className="p-0">
                <Header headTitle={this.headerTitle()} previousLink={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename} showHeadImage={true} layout48={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-lg-12 px-0 row mx-0">
                        <div className="col-lg-2">
                            <nav className="nav flex-column nav-pills pt-3">
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-chung"} className="nav-link text-dark border-bottom ">Thông tin chung</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/xem-thong-tin-cong-trinh"} className="nav-link text-dark border-bottom">Thông tin công trình</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/giam-sat-khai-thac-su-dung"} className="nav-link text-dark border-bottom active">Giám sát KTSD</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/chat-luong-nuoc-mat"} className="nav-link text-dark border-bottom">Chất lượng nước mặt</Link>
                                <Link to={"/quan-ly-cap-phep/nuoc-mat/"+this.state.pagename+"/ho-so-cap-phep"} className="nav-link text-dark border-bottom">Hồ sơ cấp phép</Link>
                            </nav>
                        </div>
                        <div className="col-12 col-lg-10 px-0 pr-2 menu-home discharge-water">
                            <div className="col-12 px-0 row mx-0">
                                <div className="col-sm-7 px-0">
                                    <div className="pb-2 mx-0">
                                        <div className="row mx-0 mb-3">
                                            <p className="exploit-surfacewater-title col-12 mb-0 p-2 fw-bold text-start">THÔNG TIN CHUNG</p>
                                            <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                                <div className="col-12 px-0 fw-bold text-13">Tên công trình:</div>
                                                <input type="text" className="form-control form-control-sm" value="Thuy Dien" readOnly />
                                            </div>
                                            <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                                <div className="col-12 px-0 fw-bold text-13">Ký hiệu công trình:</div>
                                                <input type="text" className="form-control form-control-sm" value="Thuy Dien" readOnly />
                                            </div>
                                            <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                                <div className="col-12 px-0 fw-bold text-13">Chế độ khai thác:</div>
                                                <textarea rows="1" type="text" className="form-control form-control-sm" defaultValue="Thuy Dien" readOnly />
                                            </div>
                                            <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                                <div className="col-12 px-0 fw-bold text-13">Phương thức khai thác:</div>
                                                <textarea rows="1" type="text" className="form-control form-control-sm" defaultValue="Thuy Dien" readOnly />
                                            </div>
                                            <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                <div className="col-12 px-0 fw-bold text-13">Địa điểm:</div>
                                                <textarea rows="1" type="text" className="form-control form-control-sm" defaultValue="Thuy Dien" readOnly />
                                            </div>
                                            <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                                <div className="col-6 px-0 fw-bold text-13">Huyện:</div>
                                                <input type="text" className="form-control form-control-sm" value="Thuy Dien" readOnly />
                                            </div>
                                            <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                                <div className="col-6 px-0 fw-bold text-13">Xã:</div>
                                                <input type="text" className="form-control form-control-sm" value="Thuy Dien" readOnly />
                                            </div>
                                            {(this.state.pagename === "thuy-dien" || this.state.pagename === "ho-chua") &&
                                            <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                                <div className="col-10 px-0 fw-bold text-13">Q lớn nhất qua NM (m3/s):</div>
                                                <input type="text" className="form-control form-control-sm col-2" value="4000" readOnly />
                                            </div>}
                                            {(this.state.pagename === "tram-bom") &&
                                            <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                                <div className="col-10 px-0 fw-bold text-13">Công suất máy bơm(m3/s):</div>
                                                <input type="text" className="form-control form-control-sm col-2" value="4000" readOnly />
                                            </div>}
                                            <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                                <div className="col-10 px-0 fw-bold text-13">Q xả tối thiểu (m3/s):</div>
                                                <input type="text" className="form-control form-control-sm col-2" value="4000" readOnly />
                                            </div>
                                            {(this.state.pagename === "thuy-dien" || this.state.pagename === "ho-chua") &&
                                            <div className="row col-lg-6 mx-0 border-bottom align-items-center py-1">
                                                <div className="col-10 px-0 fw-bold text-13">Công suất lắp máy MW:</div>
                                                <input type="text" className="form-control form-control-sm col-2" value="4000" readOnly />
                                            </div>}
                                        </div>
                                        <div className="row mx-0 mb-3">
                                            <p className="exploit-surfacewater-title col-12 mb-0 p-2 fw-bold text-start">Giám sát KTSD theo thông tư 47/2017/TT-BTNMT</p>
                                            {/* Ho Chua & Thuy Dien */}
                                            {(this.state.pagename === "thuy-dien" || this.state.pagename === "ho-chua") &&
                                            <div id="thuy-dien-ho-chua">
                                                <p className="font-14 col-12 mb-0 fw-bold text-danger">Thông số giám sát</p>
                                                    <div className="row mx-0">
                                                        <div className="col-sm-6 px-0 row mx-0">
                                                            <p className="font-14 col-12 fw-bold text-success mb-0">Mực nước hồ (m)</p>
                                                            <div className="row mx-0 col-sm-6 px-0">
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-9 px-0 fw-bold text-13">H_min(m):</div>
                                                                    <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                </div>
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-9 px-0 fw-bold text-13">H_max(m):</div>
                                                                    <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                </div>
                                                            </div>
                                                            <div className="row mx-0 col-sm-6 px-0">
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-12 px-0 fw-bold text-13">H_hiện tại(m):</div>
                                                                    <input type="text" className="form-control form-control-sm col-12" value="40" readOnly />
                                                                </div>
                                                                <div className="row col-6 col-sm-12 mx-auto mx-sm-0 border-bottom align-items-center p-0">
                                                                    <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/sea-level.png'} alt="sea-level" className="w-100 img__sea_lever" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 px-0 row mx-0">
                                                            <p className="font-14 col-12 fw-bold text-success mb-0">Lưu lượng xả nhà máy (m3/s)</p>
                                                            <div className="row mx-0 col-sm-6 px-0">
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-9 px-0 fw-bold text-13">Q_min(m3/s):</div>
                                                                    <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                </div>
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-9 px-0 fw-bold text-13">Q_max(m3/s):</div>
                                                                    <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                </div>
                                                            </div>
                                                            <div className="row mx-0 col-sm-6 px-0">
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-12 px-0 fw-bold text-13">Q_hiện tại(m3/s):</div>
                                                                    <input type="text" className="form-control form-control-sm col-12" value="40" readOnly />
                                                                </div>
                                                                <div className="row col-6 col-sm-12 mx-auto mx-sm-0 border-bottom align-items-center p-0">
                                                                    <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/sea-level-2.png'} alt="sea-level-2" className="w-100 img__sea_lever" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 px-0 row mx-0">
                                                            <p className="font-14 col-12 fw-bold text-success mb-0">Lưu lượng duy trì xả tối thiểu (m3/s)</p>
                                                            <div className="row mx-0 col-sm-6 px-0">
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-9 px-0 fw-bold text-13">Qxả cho phép (m3/s):</div>
                                                                    <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                </div>
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-9 px-0 fw-bold text-13">Qxả thực tế (m3/s):</div>
                                                                    <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                </div>
                                                            </div>
                                                            {/* <div className="row mx-0 col-6 px-1 align-items-end border-bottom">
                                                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/water-level.png'} alt="water-level" className="w-100 img__sea_lever" />
                                                            </div> */}
                                                            <div className="row col-6 mx-auto mx-sm-0 border-bottom align-items-end p-0">
                                                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/water-level.png'} alt="water-level" className="w-100 img__sea_lever" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 px-0 row mx-0">
                                                            <p className="font-14 col-12 fw-bold text-success mb-0">Lưu lượng xả qua tràn (m3/s)</p>
                                                            <div className="row mx-0 col-sm-6 px-0">
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-9 px-0 fw-bold text-13">Q_min(m3/s):</div>
                                                                    <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                </div>
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-9 px-0 fw-bold text-13">Q_max(m3/s):</div>
                                                                    <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                </div>
                                                            </div>
                                                            <div className="row mx-0 col-sm-6 px-0">
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-12 px-0 fw-bold text-13">Q_hiện tại(m3/s):</div>
                                                                    <input type="text" className="form-control form-control-sm col-12" value="40" readOnly />
                                                                </div>
                                                                <div className="row col-6 col-sm-12 mx-auto mx-sm-0 border-bottom align-items-center p-0">
                                                                    <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/sea-level-2.png'} alt="sea-level-2" className="w-100 img__sea_lever" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*  */}
                                                    <p className="font-14 col-12 mb-0 fw-bold text-danger">Hình thức giám sát</p>
                                                    <div className="row mx-0">
                                                        <div className="col-sm-4 px-0 row mx-0 border-right">
                                                            <p className="font-14 col-12 fw-bold text-success text-center mb-0">Tự động, tực tuyến (m)</p>
                                                            <div className="row mx-0 col-sm-9 px-0">
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-12 px-0 fw-bold text-13">
                                                                        <div className="row col-lg-12 mx-0 align-items-center py-1">
                                                                            <div className="col-6 px-0 text-13 d-flex align-items-center justify-content-center ">
                                                                                <input type="checkbox" className="mx-1" /> <span>Có</span>
                                                                            </div>
                                                                            <div className="col-6 px-0 text-13 d-flex align-items-center justify-content-center ">
                                                                                <input type="checkbox" className="mx-1" /> <span>Không</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mx-0 col-6 mx-auto col-sm-3 p-1 border-bottom">
                                                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/automatic.png'} alt="automatic" className="w-100" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4 px-0 row mx-0 border-right">
                                                            <p className="font-14 col-12 fw-bold text-success text-center mb-0">Giám sát bằng camera</p>
                                                            <div className="row mx-0 col-sm-9 px-0">
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-12 px-0 fw-bold text-13">
                                                                        <div className="row col-lg-12 mx-0 align-items-center py-1">
                                                                            <div className="col-6 px-0 text-13 d-flex align-items-center justify-content-center ">
                                                                                <input type="checkbox" className="mx-1" /> <span>Có</span>
                                                                            </div>
                                                                            <div className="col-6 px-0 text-13 d-flex align-items-center justify-content-center ">
                                                                                <input type="checkbox" className="mx-1" /> <span>Không</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mx-0 col-6 mx-auto col-sm-3 p-1 border-bottom">
                                                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/cctv-camera.png'} alt="cctv-camera" className="w-100" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4 px-0 row mx-0">
                                                            <p className="font-14 col-12 fw-bold text-success text-center mb-0">Giám sát định kỳ</p>
                                                            <div className="row mx-0 col-sm-9 px-0">
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-12 px-0 fw-bold text-13">
                                                                        <div className="row col-lg-12 mx-0 align-items-center py-1">
                                                                            <div className="col-6 px-0 text-13 d-flex align-items-center justify-content-center ">
                                                                                <input type="checkbox" className="mx-1" /> <span>Có</span>
                                                                            </div>
                                                                            <div className="col-6 px-0 text-13 d-flex align-items-center justify-content-center ">
                                                                                <input type="checkbox" className="mx-1" /> <span>Không</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mx-0 col-6 mx-auto col-sm-3 p-1 border-bottom">
                                                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/report.png'} alt="report" className="w-100" />
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>}
                                            {/* end Ho Chua & Thuy Dien */}
                                            {/* Tram Bom */}
                                            {(this.state.pagename === "tram-bom") &&
                                                <div id="tram-bom">
                                                    <p className="font-14 col-12 mb-0 fw-bold text-danger">Thông số giám sát</p>
                                                    <div className="row mx-0">
                                                        <div className="col-sm-12 px-0">
                                                            <div className="col-sm-6 px-0 row mx-0">
                                                                <p className="font-14 col-12 fw-bold text-success mb-0">Lưu lượng khai thác(m3/s)</p>
                                                                <div className="row mx-0 col-sm-9 px-0">
                                                                    <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                        <div className="col-9 px-0 fw-bold text-13">HTNL(m3/s):</div>
                                                                        <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                    </div>
                                                                    <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                        <div className="col-9 px-0 fw-bold text-13">KTTT(m3/s):</div>
                                                                        <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                    </div>
                                                                </div>
                                                                <div className="row mx-0 col-3 px-1">
                                                                    <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/water-level.png'} alt="water-level" className="w-100" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mx-0">
                                                            <p className="font-14 col-12 fw-bold text-success mb-0">Chất lượng nước khai thác(m3/s)</p>
                                                            <div className="col-sm-2 px-0 row mx-0">
                                                                <div className="row mx-0 col-sm-12 px-0">
                                                                    <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                        <div className="col-9 px-0 fw-bold text-13">BOD5:</div>
                                                                        <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                    </div>
                                                                    <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                        <div className="col-9 px-0 fw-bold text-13">COD:</div>
                                                                        <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-5 px-0 row mx-0">
                                                                <div className="row mx-0 col-sm-12 px-0">
                                                                    <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                        <div className="col-9 px-0 fw-bold text-13">Amoni(NH₄ Tính theo N):</div>
                                                                        <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                    </div>
                                                                    <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                        <div className="col-9 px-0 fw-bold text-13">Nitrat(NO₃ Tính theo N):</div>
                                                                        <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-5 px-0 row mx-0">
                                                                <div className="row mx-0 col-sm-12 px-0">
                                                                    <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                        <div className="col-9 px-0 fw-bold text-13">Phosphat(PO43 Tính theo P):</div>
                                                                        <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                    </div>
                                                                    <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                        <div className="col-9 px-0 fw-bold text-13"> TSS:</div>
                                                                        <input type="text" className="form-control form-control-sm col-3" value="40" readOnly />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="font-14 col-12 mb-0 fw-bold text-danger">Hình thức giám sát</p>
                                                    <div className="row mx-0">
                                                        <div className="col-sm-4 px-0 row mx-0">
                                                            <p className="font-14 col-12 fw-bold text-success text-start mb-0">Giám sát định kỳ</p>
                                                            <div className="row mx-0 col-sm-9 px-0">
                                                                <div className="row col-lg-12 mx-0 border-bottom align-items-center py-1">
                                                                    <div className="col-12 px-0 fw-bold text-13">
                                                                        <div className="row col-lg-12 mx-0 align-items-center py-1">
                                                                            <div className="col-6 px-0 text-13 d-flex align-items-center justify-content-center ">
                                                                                <input type="checkbox" className="mx-1" /> <span>Có</span>
                                                                            </div>
                                                                            <div className="col-6 px-0 text-13 d-flex align-items-center justify-content-center ">
                                                                                <input type="checkbox" className="mx-1" /> <span>Không</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mx-0 col-6 mx-auto col-sm-3 p-1 border-bottom">
                                                                <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/automatic.png'} alt="automatic" className="w-100" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {/* end Tram Bom */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-5 px-0">
                                    <Map className="col-12 h-100" />
                                </div>  
                                <div className="col-sm-12 px-0">
                                        <div className="position-relative">
                                            <div className="exploit-surfacewater-title col-12 mb-0 p-2 fw-bold text-start row">
                                                <span className="d-block col-12 col-sm-4">Số liệu vận hành - Tên Công trình</span> 
                                                <div className="thao_tac_slvh px-3 d-flex col-12 col-sm-8 justify-content-end">
                                                    <div title="Tìm kiếm" className="mx-1 p-1 btn btn-primary btn-sm rounded-circle d-flex align-items-center"> <SearchOutlined /> </div>
                                                    <div title="Xuất file csv" className="mx-1 p-1 btn btn-primary btn-sm rounded-circle d-flex align-items-center"> <FileExcelOutlined /> </div>
                                                    <div title="In" className="mx-1 p-1 btn btn-primary btn-sm rounded-circle d-flex align-items-center"> <PrinterOutlined /> </div>
                                                    <div title="Chi tiết" className="mx-1 p-1 btn btn-primary btn-sm rounded-circle d-flex align-items-center"> <InfoCircleOutlined /> </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="table-responsive">
                                            <table className="table table-hover mx-auto table-bordered">
                                                <thead className="thead-inverse">
                                                    <tr>
                                                        <th className="align-middle text-center font-13 " rowSpan="2">LVH/HỒ CHỨA/NGÀY</th>
                                                        <th className="align-middle text-center font-13 " rowSpan="2">MỰC NƯƠC HỒ (M)</th>
                                                        <th className="align-middle text-center font-13 " rowSpan="2">LƯ LƯỢNG ĐẾN HỒ (M3/S)</th>
                                                        <th className="font-13 align-middle text-center" colSpan="3">TỔNG LƯU LƯỢNG XẢ(M3/S)</th>
                                                        <th className="font-13 align-middle text-center" colSpan="3">DÒNG CHẢY TỐI THIỂU(M3/S)</th>
                                                        <th className="font-13 align-middle text-center" colSpan="3">THỜI GIAN XẢ(GIỜ)</th>
                                                    </tr>
                                                    <tr>
                                                        <th className="font-13 align-middle text-center">YÊU CẦU</th>
                                                        <th className="font-13 align-middle text-center">THỰC TẾ</th>
                                                        <th className="font-13 align-middle text-center">+/-</th>
                                                        {/*  */}
                                                        <th className="font-13 align-middle text-center">YÊU CẦU</th>
                                                        <th className="font-13 align-middle text-center">THỰC TẾ</th>
                                                        <th className="font-13 align-middle text-center">+/-</th>
                                                        {/*  */}
                                                        <th className="font-13 align-middle text-center">YÊU CẦU</th>
                                                        <th className="font-13 align-middle text-center">THỰC TẾ</th>
                                                        <th className="font-13 align-middle text-center">+/-</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th className="font-13 align-middle text-center">TỔNG CỘNG TẤT CẢ LVS: 302</th>
                                                            <th className="font-13 align-middle text-center">3200</th>
                                                            <th className="font-13 align-middle text-center">3200</th>
                                                            <th className="font-13 align-middle text-center">3200</th>
                                                            <th className="font-13 align-middle text-center">3200</th>
                                                            <th className="font-13 align-middle text-center">3200</th>
                                                            <th className="font-13 align-middle text-center">3200</th>
                                                            <th className="font-13 align-middle text-center">3200</th>
                                                            <th className="font-13 align-middle text-center">3200</th>
                                                            <th className="font-13 align-middle text-center">3200</th>
                                                            <th className="font-13 align-middle text-center">50</th>
                                                            <th className="font-13 align-middle text-center">50</th>
                                                        </tr>
                                                        <tr>
                                                            <td className="font-13 align-middle d-flex">
                                                                <span className="d-block w-50">Suối lắp 1 </span>
                                                                <div className="float-right font-14 d-flex text-primary w-50 justify-content-end align-items-center"> 
                                                                    <div className="mx-1"><TongHopHoChua title="Tổng hợp hồ chứa" /></div>
                                                                    <div className="mx-1"><CapNhatSoLieuVanHanh title="Cập nhật số liệu vận hành" /> </div>
                                                                    <div className="mx-1"><XemHienTrang title="Xem hiện trạng" /> </div>
                                                                </div>
                                                            </td>
                                                            <td className="font-13 align-middle text-center">0</td>
                                                            <td className="font-13 align-middle text-center">1.3</td>
                                                            <td className="font-13 align-middle text-center">1.3</td>
                                                            <td className="font-13 align-middle text-center">0</td>
                                                            <td className="font-13 align-middle text-center">0</td>
                                                            <td className="font-13 align-middle text-center">__</td>
                                                            <td className="font-13 align-middle text-center">__</td>
                                                            <td className="font-13 align-middle text-center">__</td>
                                                            <td className="font-13 align-middle text-center">__</td>
                                                            <td className="font-13 align-middle text-center">__</td>
                                                            <td className="font-13 align-middle text-center">__</td>
                                                        </tr>
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