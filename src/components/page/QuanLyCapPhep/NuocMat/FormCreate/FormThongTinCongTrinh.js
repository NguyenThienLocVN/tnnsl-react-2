/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import {Button, } from 'antd';
import { Modal} from 'react-bootstrap';

function ToaDoCongTrinh() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button className="btn-primary btn-sm" onClick={handleShow}>
          Thêm dữ liệu
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tọa độ công trình</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="ky_hieu_ct">Ký hiêu CT</label>
                    <input type="text" className="form-control font-13" id="ky_hieu_ct" placeholder="Ký hiêu CT" />
                </div>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="toa_do_x_ct">Tọa độ X</label>
                    <input type="text" className="form-control font-13" id="toa_do_x_ct" placeholder="Tọa độ X" />
                </div>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="toa_do_y_ct">Tọa Độ Y</label>
                    <input type="text" className="form-control font-13" id="toa_do_y_ct" placeholder="Tọa Độ Y" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>   
            </Modal.Footer>
        </Modal>
      </>
    );
  }

  function LuuTheoLuongMucDichKTSD() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button className="btn-primary btn-sm" onClick={handleShow}>
            Thêm dữ liệu
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Lưu lượng theo mục đích KTSD</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="muc_dich">Mục đích</label>
                    <input type="text" className="form-control font-13" id="muc_dich" placeholder="Mục đích" />
                </div>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="luu_luong">Lưu lượng</label>
                    <input type="text" className="form-control font-13" id="luu_luong" placeholder="Lưu lượng" />
                </div>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="dv_do">Đơn vị đo</label>
                    <input type="text" className="form-control font-13" id="dv_do" placeholder="Đơn vị đo" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>   
            </Modal.Footer>
        </Modal>
        </>
    );
}

function HangMucCongTrinh() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button className="btn-primary btn-sm" onClick={handleShow}>
            Thêm dữ liệu
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Hạng mục công trình</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="ten_hang_muc_ct">Tên hạng mục</label>
                    <input type="text" className="form-control font-13" id="ten_hang_muc_ct" placeholder="Ký hiêu CT" />
                </div>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="toa_do_x_hang_muc_ct">Tọa độ X</label>
                    <input type="text" className="form-control font-13" id="toa_do_x_hang_muc_ct" placeholder="Tọa độ X" />
                </div>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="toa_do_y_hang_muc_ct">Tọa Độ Y</label>
                    <input type="text" className="form-control font-13" id="toa_do_y_hang_muc_ct" placeholder="Tọa Độ Y" />
                </div>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="muc_dich_hang_muc_vt">Mục đích</label>
                    <input type="text" className="form-control font-13" id="muc_dich_hang_muc_vt" placeholder="Mục đích" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>   
            </Modal.Footer>
        </Modal>
        </>
    );
}



export default class FormThongTinCongTrinh extends React.Component {
    componentDidMount(){
        document.title = "Tạo mới giấy phép nước mặt | Giám sát tài nguyên nước Sơn La";
    }
    render(){
        return(
                <>
                   <div className="exploit-surfacewater">
                        <div className="row pb-2 mx-0">
                            <label htmlFor="construction_name" className="col-sm-12 col-form-label font-weight-bold font-13">Tên công trình</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="construction_name" name="construction_name" placeholder=" -- Tên công trình --"  />
                            </div>
                        </div>
                        <div className="row pb-2 mx-0">
                            <label htmlFor="construction_type" className="col-sm-12 col-form-label font-weight-bold font-13"> Ký hiệu công trình </label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="construction_type" name="construction_type" placeholder=" -- Ký hiệu công trình --" />
                            </div>
                        </div>
                        <div className="row pb-2 mx-0">
                            <label htmlFor="contruction_address" className="col-sm-12 col-form-label font-weight-bold font-13"> Địa điểm công trình</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="contruction_address" name="contruction_address" placeholder=" --  Địa điểm công trình --" />
                            </div>
                        </div>
                        <div className="row pb-2 px09 mx-0">
                            <div className="col-sm-6 pb-2 px-0 mx-0">
                                <label htmlFor="huyen" className="col-sm-12 col-form-label font-weight-bold font-13">Huyện </label>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <select id="huyen" className="form-control form-control-sm bg-white" name="huyen">
                                            <option defaultValue="0">-- Huyện --</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 pb-2 px-0 mx-0">
                                <label htmlFor="xa" className="col-sm-12 col-form-label font-weight-bold font-13">Xã </label>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <select id="xa" className="form-control form-control-sm bg-white" name="xa">
                                            <option defaultValue="0">-- Xã --</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-2 px-0 mx-0">
                            <label htmlFor="muc_dich_sd" className="col-sm-12 col-form-label font-weight-bold font-13">Mục đích sử dụng </label>
                            <div className="col-sm-12">
                            <textarea name="muc_dich_sd" id="muc_dich_sd" className="form-control form-control-sm" cols="30" rows="4" placeholder=" -- Mục đích sử dụng--" ></textarea>
                            </div>
                        </div>
                        <div className="pb-2 px-0 mx-0">
                            <label htmlFor="nguon_nuoc_kt_sd" className="col-sm-12 col-form-label font-weight-bold font-13">Nguồn nước khai thác sử dụng</label>
                            <div className="col-sm-12">
                                <textarea name="nguon_nuoc_kt_sd" id="nguon_nuoc_kt_sd" className="form-control form-control-sm" cols="30" rows="4" placeholder=" -- Nguồn nước khai thác sử dụng--" ></textarea>
                            </div>
                        </div>
                        <div className="row pb-2 mx-0">
                            <label htmlFor="thuoc_song" className="col-sm-12 col-form-label font-weight-bold font-13"> Thuộc sông</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="thuoc_song" name="thuoc_song" placeholder=" -- Thuộc sông --" />
                            </div>
                        </div>
                        <div className="row pb-2 mx-0">
                            <label htmlFor="thuoc_luu_vuc_song" className="col-sm-12 col-form-label font-weight-bold font-13"> Thuộc lưu vực sông</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="thuoc_luu_vuc_song" name="thuoc_luu_vuc_song" placeholder=" -- Thuộc lưu vực sông --" />
                            </div>
                        </div>
                        <div className="row pb-2 mx-0">
                            <label htmlFor="che_do_kt" className="col-sm-12 col-form-label font-weight-bold font-13"> Chế độ khai thác</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="che_do_kt" name="che_do_kt" placeholder=" -- Chế độ khai thác --" />
                            </div>
                        </div>
                        <div className="pb-2 mx-0 px-0">
                            <label htmlFor="luong_nuoc_kt_sd" className="col-sm-12 col-form-label font-weight-bold font-13"> Lượng nước khai thác, sử dụng</label>
                            <div className="col-sm-12">
                                <textarea className="form-control form-control-sm" id="luong_nuoc_kt_sd" name="luong_nuoc_kt_sd" placeholder=" -- Lượng nước khai thác, sử dụng --" cols="30" rows="4"></textarea>
                            </div>
                        </div>
                        <div className="pb-2 mx-0">
                            <label htmlFor="phuong_thuc_kt" className="col-sm-12 col-form-label font-weight-bold font-13"> Phương thức khai thác</label>
                            <div className="col-sm-12">
                                <textarea className="form-control form-control-sm" id="phuong_thuc_kt" name="phuong_thuc_kt" placeholder=" -- Phương thức khai thác --" cols="30" rows="4"></textarea>
                            </div>
                        </div>
                        <div className="row pb-2 mx-0">
                            <label htmlFor="nam_sd" className="col-sm-12 col-form-label font-weight-bold font-13"> Năm sử dụng</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="nam_sd" name="nam_sd" placeholder=" -- Năm sử dụng --" />
                            </div>
                        </div>
                        <div className="pb-2 mx-0">
                            <label htmlFor="ghi_chu_ct" className="col-sm-12 col-form-label font-weight-bold font-13"> Ghi chú CT</label>
                            <div className="col-sm-12">
                                <textarea className="form-control form-control-sm" id="ghi_chu_ct" name="ghi_chu_ct" placeholder=" -- Ghi chú CT --" cols="30" rows="4"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="exploit-surfacewater mb-2">
                        <div className="row pb-2 mx-0">
                            <label htmlFor="cong_suat_lap_may" className="col-sm-12 col-form-label font-weight-bold font-13"> Công suất lắp máy(MW)</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="cong_suat_lap_may" name="cong_suat_lap_may" placeholder=" -- Công suất lắp máy(MW) --" />
                            </div>
                        </div>
                        <div className="row pb-2 mx-0">
                            <label htmlFor="q_max_thuy_dien" className="col-sm-12 col-form-label font-weight-bold font-13"> Lưu lượng lớn nhất qua nhà máy thủy điện (m3/s)</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="q_max_thuy_dien" name="q_max_thuy_dien" placeholder=" -- Lưu lượng lớn nhất qua nhà máy thủy điện (m3/s) --" />
                            </div>
                        </div>
                        <div className="row pb-2 mx-0">
                            <label htmlFor="q_xa_tt" className="col-sm-12 col-form-label font-weight-bold font-13"> Lưu lượng xả dòng chảy tối thiểu (m3/s)</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="q_xa_tt" name="q_xa_tt" placeholder=" -- Lưu lượng xả dòng chảy tối thiểu (m3/s) --" />
                            </div>
                        </div>
                        <div className="row pb-2 mx-0">
                            <label htmlFor="dung_tich_huu_ich" className="col-sm-12 col-form-label font-weight-bold font-13"> Dung tích hữu ích (triệu m3)</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="dung_tich_huu_ich" name="dung_tich_huu_ich" placeholder=" -- Dung tích hữu ích (triệu m3) --" />
                            </div>
                        </div>
                        <div className="row pb-2 mx-0">
                            <label htmlFor="dung_tich_toan_bo" className="col-sm-12 col-form-label font-weight-bold font-13"> Dung tích toàn bộ (triệu m3)</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="dung_tich_toan_bo" name="dung_tich_toan_bo" placeholder=" -- Dung tích toàn bộ (triệu m3) --" />
                            </div>
                        </div>
                        <div className="row pb-2 mx-0">
                            <label htmlFor="muc_nuoc_chet" className="col-sm-12 col-form-label font-weight-bold font-13"> Mực nước chết (m)</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="muc_nuoc_chet" name="muc_nuoc_chet" placeholder=" -- Mực nước chết (m) --" />
                            </div>
                        </div>
                        <div className="row pb-2 mx-0">
                            <label htmlFor="muc_nuoc_dang_bt" className="col-sm-12 col-form-label font-weight-bold font-13"> Mực nước dâng bình thường (m)</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="muc_nuoc_dang_bt" name="muc_nuoc_dang_bt" placeholder=" -- Mực nước dâng bình thường (m) --" />
                            </div>
                        </div>
                        <div className="row pb-2 mx-0">
                            <label htmlFor="muc_nuoc_max_truoc_lu" className="col-sm-12 col-form-label font-weight-bold font-13"> Mực nước cao nhất trước lũ (m)</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="muc_nuoc_max_truoc_lu" name="muc_nuoc_max_truoc_lu" placeholder=" -- Mực nước cao nhất trước lũ (m) --" />
                            </div>
                        </div>
                        <div className="row pb-2 mx-0">
                            <label htmlFor="muc_nuoc_don_lu" className="col-sm-12 col-form-label font-weight-bold font-13"> Mực nước đón lũ (m)</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm" id="muc_nuoc_don_lu" name="muc_nuoc_don_lu" placeholder=" -- Mực nước đón lũ (m) --" />
                            </div>
                        </div>
                    </div>
                    <div className="exploit-surfacewater mb-2">
                        <p className="col-12 py-1 px-2 exploit-surfacewater-title font-weight-bold mb-2">Lưu lượng theo mục đích khai thác sử dụng</p>
                        <div className="pb-2 mx-0">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                            <tr className="text-center">
                                    <td colSpan="6" className="p-1">
                                        <div className="col-12 d-flex justify-content-end">
                                            {/* <!-- LuuLuongMucDichSD --> */}
                                            <LuuTheoLuongMucDichKTSD />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="text-center">
                                    <th className="font-13">#</th>
                                    <th className="font-13">Mục đích</th>
                                    <th className="font-13">Lưu lượng</th>
                                    <th className="font-13">Đơn vị đo</th>
                                    <th className="font-13">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center">
                                    <td colSpan="5"><p className="text-secondary font-12">Không có dữ liệu</p></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className="exploit-surfacewater mb-2">
                        <p className="col-12 py-1 px-2 exploit-surfacewater-title font-weight-bold mb-2">Tọa độ công trình</p>
                        <div className="pb-2 mx-0">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                    <tr className="text-center">
                                    <td colSpan="6" className="p-1">
                                        <div className="col-12 d-flex justify-content-end">
                                            {/* <!-- ToaDoCongTrinh --> */}
                                            <ToaDoCongTrinh />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="text-center">
                                    <th className="font-13">#</th>
                                    <th className="font-13">Ký hiệu</th>
                                    <th className="font-13">Tọa Độ X</th>
                                    <th className="font-13">Tọa Độ Y</th>
                                    <th className="font-13">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center">
                                    <td colSpan="5"><p className="text-secondary font-12">Không có dữ liệu</p></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className="exploit-surfacewater mb-2">
                        <p className="col-12 py-1 px-2 exploit-surfacewater-title font-weight-bold mb-2">Hạng mục công trình</p>
                        <div className="pb-2 mx-0">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                    <tr className="text-center">
                                    <td colSpan="6" className="p-1">
                                        <div className="col-12 d-flex justify-content-end">
                                            {/* <!-- HangMucCongTrinh --> */}
                                            <HangMucCongTrinh />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="text-center">
                                    <th className="font-13" rowSpan="2">#</th>
                                    <th className="font-13" rowSpan="2">Tên hạng mục</th>
                                    <th className="font-13" colSpan="2">Tọa Độ</th>
                                    <th className="font-13" rowSpan="2">Mô tả</th>
                                    <th className="font-13" rowSpan="2">Thao tác</th>
                                </tr>
                                <tr className="text-center">
                                        <th className="font-13">X</th>
                                        <th className="font-13">Y</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center">
                                    <td colSpan="6"><p className="text-secondary font-12">Không có dữ liệu</p></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>

                </>
        )
    }
}