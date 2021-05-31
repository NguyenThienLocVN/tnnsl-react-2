/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Modal} from 'react-bootstrap';

function ModalThanhTraKiemTra() {
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
                <Modal.Title>Thanh tra - Kiểm tra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="ten_dot_tt">Tên đợt</label>
                    <input type="text" className="form-control font-13" id="ten_dot_tt" placeholder="Tên đợt thanh tra" />
                </div>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="ten_don_vi_tt">Tên đơn vị thực hiện</label>
                    <input type="text" className="form-control font-13" id="ten_don_vi_tt" placeholder="Tên đơn vị thực hiện" />
                </div>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="ten_truong_doan_tt">Tên trưởng đoàn</label>
                    <input type="text" className="form-control font-13" id="ten_truong_doan_tt" placeholder="Tên trưởng đoàn" />
                </div>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="nam_tt">Năm thực hiện</label>
                    <input type="text" className="form-control font-13" id="nam_tt" placeholder="Năm thực hiện" />
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

  function TienCapQuyen() {
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
                <Modal.Title>Tiền cấp quyền khai thác sử dụng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="so_quyet_dinh">Số quyết định</label>
                    <input type="text" className="form-control font-13" id="so_quyet_dinh" placeholder="Số quyết định" />
                </div>
                <div className="form-group">
                    <label className="font-13 font-weight-bold" htmlFor="tong_tien">Tổng tiền</label>
                    <input type="text" className="form-control font-13" id="tong_tien" placeholder="Tổng tiền" />
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


export default class FormThongTinChung extends React.Component {
    componentDidMount(){
        document.title = "Tạo mới giấy phép nước mặt | Giám sát tài nguyên nước Sơn La";
    }
    render(){
        return(
                <>
                    <div className="exploit-surfacewater">
                        <div className="pb-2 mx-0">
                            <label htmlFor="organization_name" className="col-sm-12 col-form-label font-weight-bold font-13">Tên tổ chức/cá nhân  được CP</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm font-13" id="organization_name" name="organization_name" placeholder=" -- Tên tổ chức/cá nhân  được CP --"  />
                            </div>
                        </div>
                        <div className="pb-2 mx-0">
                            <label htmlFor="organization_address" className="col-sm-12 col-form-label font-weight-bold font-13"> Địa chỉ tổ chức/cá nhân được CP </label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm font-13" id="organization_address" name="organization_address" placeholder=" -- Địa chỉ tổ chức/cá nhân được CP --" />
                            </div>
                        </div>
                        <div className="pb-2 mx-0">
                            <label htmlFor="license_num" className="col-sm-12 col-form-label font-weight-bold font-13"> Số GP </label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm font-13" id="license_num" name="license_num" placeholder=" -- Số GP --" />
                            </div>
                        </div>
                        <div className="pb-2 mx-0">
                            <label htmlFor="license_name" className="col-sm-12 col-form-label font-weight-bold font-13"> Tên văn bản GP</label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm font-13" id="license_name" name="license_name" placeholder=" -- Tên văn bản --" />
                            </div>
                        </div>
                        <div className="pb-2 mx-0">
                            <label htmlFor="co_quan_cp" className="col-sm-12 col-form-label font-weight-bold font-13"> Cơ quan cấp phép </label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm font-13" id="co_quan_cp" name="co_quan_cp" placeholder=" -- Cơ quan cấp phép --" />
                            </div>
                        </div>
                        <div className="pb-2 mx-0">
                            <label htmlFor="dv_tham_dinh" className="col-sm-12 col-form-label font-weight-bold font-13"> Đơn vị thẩm định </label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm font-13" id="dv_tham_dinh" name="dv_tham_dinh" placeholder=" -- Đơn vị thẩm định --" />
                            </div>
                        </div>
                        <div className="row mx-0">
                            <div className="pb-2 mx-0 col-sm-6 px-0">
                                <label htmlFor="cap_tham_quyen" className="col-sm-12 col-form-label font-weight-bold font-13">Cấp thẩm quyền </label>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <select id="cap_tham_quyen" className="form-control form-control-sm font-13 bg-white" name="cap_tham_quyen">
                                            <option defaultValue="0">-- Cấp thẩm quyền --</option>
                                            <option defaultValue="1">Cấp trung ương</option>
                                            <option defaultValue="2">Cấp địa phương</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-2 mx-0 col-sm-6 px-0">
                                <label htmlFor="license_type" className="col-sm-12 col-form-label font-weight-bold font-13">Loại hình GP </label>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <select id="license_type" className="form-control form-control-sm font-13 bg-white" name="license_type">
                                            <option defaultValue="0">-- Loại hình GP --</option>
                                            <option defaultValue="1">Cấp mới GP</option>
                                            <option defaultValue="2">Cấp lại GP</option>
                                            <option defaultValue="2">Gia hạn/Điều chỉhh GP</option>
                                            <option defaultValue="2">Thu hồi GP</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row m-0">
                            <div className="col-sm-4 px-0 pb-2 mx-0">
                                <label htmlFor="nguoi_ky_gp" className="col-sm-12 col-form-label font-weight-bold font-13"> Người ký GP </label>
                                <div className="col-sm-12">
                                    <input type="text" className="form-control form-control-sm font-13" id="nguoi_ky_gp" name="nguoi_ky_gp" placeholder=" -- Người ký GP --" />
                                </div>
                            </div>
                            <div className="col-sm-4 px-0 pb-2 mx-0">
                                <label htmlFor="chuc_vu_nguoi_ky_gp" className="col-sm-12 col-form-label font-weight-bold font-13"> Chức vụ </label>
                                <div className="col-sm-12">
                                    <input type="text" className="form-control form-control-sm font-13" id="chuc_vu_nguoi_ky_gp" name="chuc_vu_nguoi_ky_gp" placeholder=" -- Chức vụ --" />
                                </div>
                            </div>
                            <div className="col-sm-4 px-0 pb-2 mx-0">
                                <label htmlFor="ngay_ky_gp" className="col-sm-12 col-form-label font-weight-bold font-13">Ngày ký </label>
                                <div className="col-sm-12">
                                    <input type="date" className="form-control form-control-sm font-13" id="ngay_ky_gp" name="ngay_ky_gp" placeholder=" -- Ngày ký --" />
                                </div>
                            </div>
                        </div>
                        <div className="row m-0">
                            <div className="col-sm-6 pb-2 px-0 px-0 mx-0">
                                <label htmlFor="ngay_hieu_luc_dp" className="col-sm-12 col-form-label font-weight-bold font-13">Ngày hiệu lực GP</label>
                                <div className="col-sm-12">
                                    <input type="date" className="form-control form-control-sm font-13" id="ngay_hieu_luc_dp" name="ngay_hieu_luc_dp" placeholder=" -- Ngày hiệu lực--" />
                                </div>
                            </div>
                            <div className="col-sm-6 pb-2 px-0 mx-0">
                                <label htmlFor="han_hieu_luc_dp" className="col-sm-12 col-form-label font-weight-bold font-13">Hạn hiệu lực GP </label>
                                <div className="col-sm-12">
                                    <input type="date" className="form-control form-control-sm font-13" id="han_hieu_luc_dp" name="han_hieu_luc_dp" placeholder=" -- Hạn hiệu lực GP --" />
                                </div>
                            </div>
                        </div>
                        <div className="pb-2 mx-0">
                            <label htmlFor="noi_nhan_gp" className="col-sm-12 col-form-label font-weight-bold font-13">Nơi nhận GP </label>
                            <div className="col-sm-12">
                                <input type="text" className="form-control form-control-sm font-13" id="noi_nhan_gp" name="noi_nhan_gp" placeholder=" -- Nơi nhận GP --" />
                            </div>
                        </div>
                        <div className="pb-2 mx-0">
                            <label htmlFor="ghi_chu_gp" className="col-sm-12 col-form-label font-weight-bold font-13">Ghi chú GP</label>
                            <div className="col-sm-12">
                                <textarea name="ghi_chu_gp" id="ghi_chu_gp" className="form-control form-control-sm font-13" cols="30" rows="4" placeholder=" -- Ghi chú--" ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="exploit-surfacewater mb-2">
                        <p className="col-12 py-1 px-2 exploit-surfacewater-title font-weight-bold mb-2">Thanh tra - Kiểm tra</p>
                        <div className="pb-2 mx-0">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr className="text-center">
                                    <td colSpan="6" className="p-1">
                                        <div className="col-12 d-flex justify-content-end">
                                            {/* <!-- ModalThanhTraKiemTra --> */}
                                            <ModalThanhTraKiemTra />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="text-center">
                                    <th className="font-13">#</th>
                                    <th className="font-13">Tên đợt</th>
                                    <th className="font-13">Tên đơn vị thực hiện</th>
                                    <th className="font-13">Tên trưởng đoàn</th>
                                    <th className="font-13">Năm thực hiện</th>
                                    <th className="font-13">Thao tác</th>
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
                    <div className="exploit-surfacewater mb-2">
                        <p className="col-12 py-1 px-2 exploit-surfacewater-title font-weight-bold mb-2">Tiền cấp quyền khai thác sử dụng</p>
                        <div className="pb-2 mx-0">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                    <tr className="text-center">
                                    <td colSpan="6" className="p-1">
                                        <div className="col-12 d-flex justify-content-end">
                                                {/* <!-- ModalThanhTraKiemTra --> */}
                                                <TienCapQuyen />
                                            </div>
                                        </td>
                                </tr>
                                <tr className="text-center">
                                    <th className="font-13">#</th>
                                    <th className="font-13">Số quyết định</th>
                                    <th className="font-13">Tổng tiền</th>
                                    <th className="font-13">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center">
                                    <td colSpan="4"><p className="text-secondary font-12">Không có dữ liệu</p></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    <div className="exploit-surfacewater mb-2">
                        <p className="col-12 py-1 px-2 exploit-surfacewater-title font-weight-bold mb-2">Thông tin tài liệu đính kèm</p>
                        <div className="pb-2 mx-0">
                            <div className="d-flex justify-content-start align-items-center mb-2 px-2">
                                <label htmlFor="don_xin_cp" className="col-6 font-13">Đơn xin cấp phép</label>
                                <label className="btn btn-default btn-sm center-block btn-file border my-0 mx-2" id="don_xin_cp">
                                    <UploadOutlined /> File tài liệu
                                    <input type="file" required accept=".pdf"  className="d-none" />
                                </label>
                            </div>
                            <div className="d-flex justify-content-start align-items-center mb-2 px-2">
                                <label htmlFor="don_xin_cp" className="col-6 font-13">...</label>
                                <label className="btn btn-default btn-sm center-block btn-file border my-0 mx-2" id="don_xin_cp">
                                    <UploadOutlined /> File tài liệu
                                    <input type="file" required accept=".pdf"  className="d-none" />
                                </label>
                            </div>
                            <div className="d-flex justify-content-start align-items-center mb-2 px-2">
                                <label htmlFor="don_xin_cp" className="col-6 font-13">Đơn xin cấp phép</label>
                                <label className="btn btn-default btn-sm center-block btn-file border my-0 mx-2" id="don_xin_cp">
                                    <UploadOutlined /> File tài liệu
                                    <input type="file" required accept=".pdf"  className="d-none" />
                                </label>
                            </div>
                        </div>
                    </div>
                    </div>

                </>
        )
    }
}