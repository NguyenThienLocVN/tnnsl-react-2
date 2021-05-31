import React from 'react';


export default class FormGiamSatKTSD extends React.Component {
    componentDidMount(){
        document.title = "Tạo mới giấy phép nước mặt | Giám sát tài nguyên nước Sơn La";
    }
    render(){
        return(
                <>
                   <div className="exploit-surfacewater mb-2">
                        <div className="row py-2 mx-0">
                            <div className="form-group col-sm-4">
                                <label htmlFor="my-select">Vị trí quan trắc</label>
                                <input type="text" className="form-control form-control-sm" placeholder=" -- Vị trí quan trắc -- " />
                            </div>
                            <div className="form-group col-sm-4">
                                <label htmlFor="my-select">Quy chuẩn Việt Nam</label>
                                <select  className="form-control form-control-sm bg-white" name="">
                                    <option>QCVN 08-MT:2015/BTNMT</option>
                                </select>
                            </div>
                            <div className="form-group col-sm-4">
                                <label htmlFor="my-select">Mục đích sử dụng</label>
                                <select  className="form-control form-control-sm bg-white" name="">
                                    <option>A1</option>
                                    <option>A2</option>
                                    <option>B1</option>
                                    <option>B2</option>
                                </select>
                            </div>
                        </div>
                        <div className="pb-2 mx-0">
                        <table className="table table-bordered table_overflow">
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
                                    <td className="font-13 text-center">...</td>
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
                                    <td className="font-13 text-center">32</td>
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
                                
                                
                                
                            </tbody>
                        </table>
                        </div>
                    </div>

                </>
        )
    }
}