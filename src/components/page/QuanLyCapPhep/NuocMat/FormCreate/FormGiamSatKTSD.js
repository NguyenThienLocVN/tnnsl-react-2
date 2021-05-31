import React from 'react';

export default class FormGiamSatKTSD extends React.Component {
    componentDidMount(){
        document.title = "Tạo mới giấy phép nước mặt | Giám sát tài nguyên nước Sơn La";
    }
    render(){
        return(
                <>
                    <div className="exploit-surfacewater mb-2">
                        <div className="py-2 mx-0">
                            <div className="row mx-0">
                                <div className="form-group col-sm-6">
                                    <label className="font-13 font-weight-bold" htmlFor="ngay_lay_mau">Ngày lấy mẫu</label>
                                    <input type="date" className="form-control font-13" id="ngay_lay_mau" />
                                </div>
                                <div className="form-group col-sm-6">
                                    <label className="font-13 font-weight-bold" htmlFor="dia_diem_lay_mau">Địa điểm lấy mẫu</label>
                                    <input type="text" className="form-control font-13" id="dia_diem_lay_mau" placeholder="Địa điểm lấy mẫu" />
                                </div>
                            </div>
                            <div className="form-group col-sm-12">
                                <label htmlFor="my-select">Giám sát theo thông tư</label>
                                <select  className="form-control form-control-sm w-25 bg-white" name="">
                                    <option>47/2017/TT-BTNMT</option>
                                </select>
                            </div>
                        </div>
                        <div className="pb-2 mx-0">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr className="text-center">
                                    <th className="font-13">#</th>
                                    <th className="font-13">Quan trắc tự động</th>
                                    <th className="font-13 text-nowrap">Thông số</th>
                                    <th className="font-13 text-nowrap">Đơn vị đo</th>
                                    <th className="font-13">Giá trị giới hạn nhỏ nhất</th>
                                    <th className="font-13">Giá trị giới hạn lớn nhất</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-left">
                                    <td className="font-13 text-center">1</td>
                                    <td className="text-center"><input type="checkbox" /></td>
                                    <td className="text-wrap">Mực nước hồ</td>
                                    <td>
                                        <div className="form-group">
                                            <select  className="form-control  form-control-sm bg-white" name="don_vi">
                                                <option defaultValue="m" className="text-center">m</option>
                                                <option defaultValue="mm" className="text-center">mm</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td><input className="form-control form-control-sm" type="number" /></td>
                                    <td><input className="form-control form-control-sm" type="number" /></td>
                                </tr>
                                <tr className="text-left">
                                    <td className="font-13 text-center">2</td>
                                    <td className="text-center"><input type="checkbox" /></td>
                                    <td className="text-wrap">Lưu lượng xả duy trì dòng chảy tối thiểu</td>
                                    <td>
                                        <div className="form-group">
                                            <select  className="form-control  form-control-sm bg-white" name="don_vi">
                                                <option defaultValue="m" className="text-center">m</option>
                                                <option defaultValue="mm" className="text-center">mm</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td><input className="form-control form-control-sm" type="number" /></td>
                                    <td><input className="form-control form-control-sm" type="number" /></td>
                                </tr>
                                <tr className="text-left">
                                    <td className="font-13 text-center">3</td>
                                    <td className="text-center"><input type="checkbox" /></td>
                                    <td className="text-wrap">Lưu lượng xả qua nhà máy</td>
                                    <td>
                                        <div className="form-group">
                                            <select  className="form-control  form-control-sm bg-white" name="don_vi">
                                                <option defaultValue="m" className="text-center">m</option>
                                                <option defaultValue="mm" className="text-center">mm</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td><input className="form-control form-control-sm" type="number" /></td>
                                    <td><input className="form-control form-control-sm" type="number" /></td>
                                </tr>
                                <tr className="text-left">
                                    <td className="font-13 text-center">4</td>
                                    <td className="text-center"><input type="checkbox" /></td>
                                    <td className="text-wrap">Lưu lượng xả qua tràn</td>
                                    <td>
                                        <div className="form-group">
                                            <select  className="form-control  form-control-sm bg-white" name="don_vi">
                                                <option defaultValue="m" className="text-center">m</option>
                                                <option defaultValue="mm" className="text-center">mm</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td><input className="form-control form-control-sm" type="number" /></td>
                                    <td><input className="form-control form-control-sm" type="number" /></td>
                                </tr>
                                <tr className="text-left">
                                    <td className="font-13 text-center">5</td>
                                    <td className="text-center"><input type="checkbox" /></td>
                                    <td className="text-wrap">Giám sát bằng camera</td>
                                    <td>
                                        <div className="form-group">
                                            <select  className="form-control  form-control-sm bg-white" name="don_vi">
                                                <option defaultValue="m" className="text-center">m</option>
                                                <option defaultValue="mm" className="text-center">mm</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td><input className="form-control form-control-sm" type="number" /></td>
                                    <td><input className="form-control form-control-sm" type="number" /></td>
                                </tr>
                                <tr className="text-left">
                                    <td className="font-13 text-center">6</td>
                                    <td className="text-center"><input type="checkbox" /></td>
                                    <td className="text-wrap">Chất lượng nước trong quá trình khai thác theo quy định</td>
                                    <td>
                                        <div className="form-group">
                                            <select  className="form-control  form-control-sm bg-white" name="don_vi">
                                                <option defaultValue="m" className="text-center">m</option>
                                                <option defaultValue="mm" className="text-center">mm</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td><input className="form-control form-control-sm" type="number" /></td>
                                    <td><input className="form-control form-control-sm" type="number" /></td>
                                </tr>
                                <tr className="text-left">
                                    <td className="font-13 text-center">7</td>
                                    <td className="text-center"><input type="checkbox" /></td>
                                    <td className="text-wrap">Lưu lượng khai thác</td>
                                    <td>
                                        <div className="form-group">
                                            <select  className="form-control  form-control-sm bg-white" name="don_vi">
                                                <option defaultValue="m" className="text-center">m</option>
                                                <option defaultValue="mm" className="text-center">mm</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td><input className="form-control form-control-sm" type="number" /></td>
                                    <td><input className="form-control form-control-sm" type="number" /></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>

                </>
        )
    }
}