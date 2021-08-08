import React from 'react';
import Header from "../../Shared/Header";
import Table from 'react-bootstrap/Table'
import { MoreOutlined } from "@ant-design/icons";
import { Modal, Tabs } from 'antd';

import { Line } from 'react-chartjs-2';


import Map from '../../Shared/Map';


const { TabPane } = Tabs;

export default class HeThongQuanTracNuocMatLuuLuongXaToiThieu extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            visible: false,
            activeModal: null,
        };
        
    }

    clickHandler = (e, index) => {
        this.setState({ activeModal: index })
    }
    
    hideModal = () => {
        this.setState({ activeModal: null })
    }
    
    render(){
        const data = {
            labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00','00:06', '07:00', '08:00', '09:00', '10:00', '11:00','12:00', '13:00', '14:00', '15:00', '16:00', '17:00','18:00','19:00','20:00','21:00','22:00','23:00',],
            datasets: [
              {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3,],
                backgroundColor: [
                  'green',
                ],
                borderColor: [
                    'green',
                ],
                borderWidth: 1,
              },
            ],
          };
          
          const options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };
        return(
            <div className="p-0">
                <Header headTitle="HỆ THỐNG QUAN TRẮC/ NƯỚC MẶT / LƯU LƯỢNG XẢ TỐI THIỂU " previousLink="/he-thong-quan-trac" showHeadImage={true} layoutfull={true} />
                <main className="row m-0 p-0">
                    <div className="col-12 col-lg-3 px-0 menu-home">
                        <div className="row justify-content-between mx-0">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="loai_ho" className="fw-bold" >Loại hồ</label>
                                    <select className="form-select form-select-sm" id="loai_ho">
                                        <option>Tất cả</option>
                                        <option>Hồ thủy điện</option>
                                        <option>Hồ thủy lợi</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <label className="fw-bold form-label" htmlFor="from_date">Từ ngày</label>
                                <input id="from_date" type="date" className="form-control form-control-sm" />
                            </div>
                            <div className="col-sm-4">
                                <label className="fw-bold form-label" htmlFor="to_date">Đến ngày</label>
                                <input id="to_date" type="date" className="form-control form-control-sm" />
                            </div>
                        </div>
                        <div className="row m-0 p-0 surfacewater-usage">
                        <Table striped bordered hover responsive>
                            <thead className="bg-lightblue">
                                <tr>
                                    <th className="text-center text-nowrap align-center">Tên Hồ</th>
                                    <th className="text-center text-nowrap align-center">Q <sub>đến</sub></th>
                                    <th className="text-center text-nowrap align-center">Q <sub>xả tối thiểu</sub></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="cursor_pointer">
                                    <td>
                                        <div className="m-0 fw-bold">
                                            <span className="stt_table_quantrac">1. </span>
                                            <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" />
                                            <p className="text-primary">
                                                Nà Bó
                                                <span className="d-inline-block">
                                                    <span className="p-1 d-flex align-items-center justify-content-center" onClick={(e) => this.clickHandler(e, 1)}>
                                                        <MoreOutlined />
                                                    </span>
                                                    <Modal
                                                        className="modal-quantrac"
                                                        scrollableBody={true}
                                                        title="THÔNG TIN QUAN TRẮC"
                                                        width={1500}
                                                        visible={this.state.activeModal === 1} 
                                                        onCancel={this.hideModal}
                                                        footer={null}
                                                    >
                                                        <div className="modal_quantrac">
                                                            <Tabs defaultActiveKey="1" type="card">
                                                                <TabPane tab="Biểu Đồ" key="1">
                                                                    <div className="row m-0">
                                                                        <span className="fw-bold col-sm-4">SỐ LIỆU QUAN TRẮC LƯU LƯỢNG XẢ QUA HỒ --TÊN HỒ--</span> 
                                                                        <div className="col-sm-8">
                                                                            <div className="row justify-content-end mx-0">
                                                                                <div className="col-sm-4 row jistify-content-end align-items-center m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-label text-end" htmlFor="from_date">Từ ngày: </label>
                                                                                    <input id="from_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                                <div className="col-sm-4 row jistify-content-end m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-labe text-end" htmlFor="to_date">Đến ngày: </label>
                                                                                    <input id="to_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <Line width={600} height={200} data={data} options={options} />      
                                                                </TabPane>
                                                                <TabPane tab="Bảng Biểu" key="2">
                                                                    <div className="row m-0">
                                                                        <span className="fw-bold col-sm-4">SỐ LIỆU QUAN TRẮC LƯU LƯỢNG XẢ QUA HỒ --TÊN HỒ--</span> 
                                                                        <div className="col-sm-8">
                                                                            <div className="row justify-content-end mx-0">
                                                                                <div className="col-sm-4 row jistify-content-end align-items-center m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-label text-end" htmlFor="from_date">Từ ngày: </label>
                                                                                    <input id="from_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                                <div className="col-sm-4 row jistify-content-end m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-labe text-end" htmlFor="to_date">Đến ngày: </label>
                                                                                    <input id="to_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <Table className="table_quantrac" striped bordered hover>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th>Thời gian</th>
                                                                                <th>Q<sub>đến</sub> (m³/s)</th>
                                                                                <th>Q<sub>xả tối thiểu</sub> (m³/s)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td> </td>
                                                                                <td> </td>
                                                                                <td> </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>
                                                                </TabPane>
                                                                <TabPane tab="Cập nhật" key="3">
                                                                    <p className="fw-bold m-0"> THÊM MỚI SỐ LIỆU QUAN TRẮC </p>
                                                                    <div className="row col-sm-12 mx-0 p-0 mb-2">
                                                                        <div className="col-sm-12 row justufy-content-start m-0 p-0">
                                                                            <div>
                                                                                <button className="btn btn-sm btn-success col-sm-1 mx-1" type="button"> Nhập file XLS </button>
                                                                                <button className="btn btn-sm btn-danger col-sm-1 mx-1" type="reset"> Xóa </button>
                                                                                <button className="btn btn-sm btn-primary col-sm-1 mx-1" type="button"> Cập nhật </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <Table className="table_quantrac" striped bordered hover>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th>Thời gian</th>
                                                                                <th>Q<sub>đến</sub> (m³/s)</th>
                                                                                <th>Q<sub>xả tối thiểu</sub> (m³/s)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        <tr>
                                                                                <td>1</td>
                                                                                <td>00:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>01:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>3</td>
                                                                                <td>02:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>4</td>
                                                                                <td>03:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>5</td>
                                                                                <td>04:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>6</td>
                                                                                <td>05:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>7</td>
                                                                                <td>06:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>8</td>
                                                                                <td>07:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>9</td>
                                                                                <td>08:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>10</td>
                                                                                <td>09:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>11</td>
                                                                                <td>10:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>12</td>
                                                                                <td>11:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>13</td>
                                                                                <td>12:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>14</td>
                                                                                <td>13:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>15</td>
                                                                                <td>14:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>16</td>
                                                                                <td>15:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>17</td>
                                                                                <td>16:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>18</td>
                                                                                <td>17:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>19</td>
                                                                                <td>18:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>20</td>
                                                                                <td>19:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>21</td>
                                                                                <td>20:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>22</td>
                                                                                <td>21:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>23</td>
                                                                                <td>22:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>24</td>
                                                                                <td>23:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>     
                                                                </TabPane>
                                                            </Tabs>
                                                        </div>
                                                    </Modal>
                                                </span>
                                            </p>
                                        </div>
                                        <p className="m-0 text-warning">
                                            Nguồn: Author
                                        </p>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="text-center text-nowrap fw-bold mb-0"> - </p>
                                            <p className="text-center text-nowrap mb-0">(m³/s)</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="text-center text-nowrap fw-bold mb-0"> - </p>
                                            <p className="text-center text-nowrap mb-0">(m³/s)</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="cursor_pointer">
                                <td>
                                        <div className="m-0 fw-bold">
                                            <span className="stt_table_quantrac">2. </span>
                                            <img src={process.env.PUBLIC_URL + '/images/QUAN_LY_CAP_PHEP/earth.png'} alt="earth" className="table-icon" />
                                            <p className="text-primary">
                                                Nà Bó
                                                <span className="d-inline-block">
                                                    <span className="p-1 d-flex align-items-center justify-content-center" onClick={(e) => this.clickHandler(e, 2)}>
                                                        <MoreOutlined />
                                                    </span>
                                                    <Modal
                                                        className="modal-quantrac"
                                                        scrollableBody={true}
                                                        title="THÔNG TIN QUAN TRẮC"
                                                        width={1500}
                                                        visible={this.state.activeModal === 2} 
                                                        onCancel={this.hideModal}
                                                        footer={null}
                                                    >
                                                        <div className="modal_quantrac">
                                                            <Tabs defaultActiveKey="1" type="card">
                                                                <TabPane tab="Biểu Đồ" key="1">
                                                                    <div className="row m-0">
                                                                        <span className="fw-bold col-sm-4">SỐ LIỆU QUAN TRẮC MỰC NƯỚC HỒ</span> 
                                                                        <div className="col-sm-8">
                                                                            <div className="row justify-content-end mx-0">
                                                                                <div className="col-sm-4 row jistify-content-end align-items-center m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-label text-end" htmlFor="from_date">Từ ngày: </label>
                                                                                    <input id="from_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                                <div className="col-sm-4 row jistify-content-end m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-labe text-end" htmlFor="to_date">Đến ngày: </label>
                                                                                    <input id="to_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <Line width={600} height={200} data={data} options={options} />      
                                                                </TabPane>
                                                                <TabPane tab="Bảng Biểu" key="2">
                                                                    <div className="row m-0">
                                                                        <span className="fw-bold col-sm-4">SỐ LIỆU QUAN TRẮC MỰC NƯỚC HỒ</span> 
                                                                        <div className="col-sm-8">
                                                                            <div className="row justify-content-end mx-0">
                                                                                <div className="col-sm-4 row jistify-content-end align-items-center m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-label text-end" htmlFor="from_date">Từ ngày: </label>
                                                                                    <input id="from_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                                <div className="col-sm-4 row jistify-content-end m-0 p-1">
                                                                                    <label className="fw-bold w-50 form-labe text-end" htmlFor="to_date">Đến ngày: </label>
                                                                                    <input id="to_date" type="date" className="form-control form-control-sm w-50" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <Table className="table_quantrac" striped bordered hover>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th>Thời gian</th>
                                                                                <th>Q<sub>đến</sub> (m³/s)</th>
                                                                                <th>Q<sub>xả tối thiểu</sub> (m³/s)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td> </td>
                                                                                <td> </td>
                                                                                <td> </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>
                                                                </TabPane>
                                                                <TabPane tab="Cập nhật" key="3">
                                                                    <p className="fw-bold m-0"> THÊM MỚI SỐ LIỆU QUAN TRẮC </p>
                                                                    <div className="row col-sm-12 mx-0 p-0 mb-2">
                                                                        <div className="col-sm-12 row justufy-content-start m-0 p-0">
                                                                            <div>
                                                                                <button className="btn btn-sm btn-success col-sm-1 mx-1" type="button"> Nhập file XLS </button>
                                                                                <button className="btn btn-sm btn-danger col-sm-1 mx-1" type="reset"> Xóa </button>
                                                                                <button className="btn btn-sm btn-primary col-sm-1 mx-1" type="button"> Cập nhật </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <Table className="table_quantrac" striped bordered hover>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th>Thời gian</th>
                                                                                <th>Q<sub>đến</sub> (m³/s)</th>
                                                                                <th>Q<sub>xả tối thiểu</sub> (m³/s)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        <tr>
                                                                                <td>1</td>
                                                                                <td>00:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>01:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>3</td>
                                                                                <td>02:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>4</td>
                                                                                <td>03:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>5</td>
                                                                                <td>04:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>6</td>
                                                                                <td>05:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>7</td>
                                                                                <td>06:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>8</td>
                                                                                <td>07:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>9</td>
                                                                                <td>08:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>10</td>
                                                                                <td>09:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>11</td>
                                                                                <td>10:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>12</td>
                                                                                <td>11:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>13</td>
                                                                                <td>12:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>14</td>
                                                                                <td>13:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>15</td>
                                                                                <td>14:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>16</td>
                                                                                <td>15:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>17</td>
                                                                                <td>16:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>18</td>
                                                                                <td>17:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>19</td>
                                                                                <td>18:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>20</td>
                                                                                <td>19:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>21</td>
                                                                                <td>20:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>22</td>
                                                                                <td>21:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>23</td>
                                                                                <td>22:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>24</td>
                                                                                <td>23:00</td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                                <td><input type="text" className="form-control form-control-sm" value="0" /></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>     
                                                                </TabPane>
                                                            </Tabs>
                                                        </div>
                                                    </Modal>
                                                </span>
                                            </p>
                                        </div>
                                        <p className="m-0 text-warning">
                                            Nguồn: Author
                                        </p>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="text-center text-nowrap fw-bold mb-0"> - </p>
                                            <p className="text-center text-nowrap mb-0">(m³/s)</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="text-center text-nowrap fw-bold mb-0"> - </p>
                                            <p className="text-center text-nowrap mb-0">(m³/s)</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="col-12 col-lg-9 map-container px-md-0 position-relative">
                        <Map />
                    </div>
                </main>
            </div>
        )
    }

}