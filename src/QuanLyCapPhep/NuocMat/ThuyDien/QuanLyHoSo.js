import React from 'react';
import Header from '../../../Shared/Header';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import configData from "../../../config.json";
import { Form, Button } from "react-bootstrap";
import { getUser, getToken } from '../../../Shared/Auth';
import { ConfigProvider, Table, Input, Tabs } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import vnVN from 'antd/lib/locale/vi_VN';
import DemGiayPhep from './DemGiayPhep';

const user = getUser();
const { TabPane } = Tabs;

export default class QuanLyCapPhepQuanLyYeuCauNuocMatThuyDien extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            pagename: this.props.match.params.pagename,
            grantedLicense: [],
            activeModal: null,
            status: '',
            id_gp: '',
            pagination: {},
            search: '',
            filter: '',
        }
    }
    clickHandler = (e, index) => {
        this.setState({ activeModal: index })
    }
    
    hideModal = () => {
        this.setState({ activeModal: null })
    }
    
    componentDidMount(){
        document.title = "Quản lý cấp mới giấy phép nước mặt - Thủy điện";
        this.fetchGrantedLicense(this.state.pagination, 1);
    }

    handleStatusChange = (event) => {
        this.setState({
            status: event.target.value,
        });
    }
    handlerDestroyLicense = (id_gp) =>{
        trackPromise(
            axios.get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/xoa-giay-phep/"+id_gp, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if (response.status === 200) {
                    window.location.reload();
                }
            })
        );
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.fetchGrantedLicense({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
          });
    };

    fetchGrantedLicense = (params = {}) => {
        this.setState({ loading: true });
        user ?
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/thuy-dien/danh-sach/"+user.id+"/1", {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        loading: false,
                        grantedLicense: response.data,
                        pagination: {
                            ...params.pagination,
                            total: response.data.length
                        },
                    });
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            }) : window.location.reload(); 
    };

    // Function handle filter feature
    onFilterHandle = (e) => {
        this.fetchGrantedLicense(this.state.pagination, e.target.value);   
    }

    // Function search
    onSearchHandle = (value) => {
        if(!value)
        {   
            this.fetchGrantedLicense(this.state.pagination, 1);
        }
        const filterResult = this.state.grantedLicense.filter(o =>
            Object.keys(o).some(k =>
                String(o[k])
                .toLowerCase()
                .includes(value.toLowerCase())
            )
        );

        this.setState({ grantedLicense : filterResult });
    }

    formatDate(date) {
        if(date === null){
            return "--";
        }else if(date === "0000-00-00"){
            return "--";
        }else{
            var date_format = new Date(date);
            var d = date_format.getDate();
            var m = date_format.getMonth()+1;
            var y = date_format.getFullYear();
            return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
        }
    }

    render(){
        const columns = [
            {
              title: 'Số GP',
              dataIndex: 'gp_sogiayphep',
              key: 'gp_sogiayphep',
              width: '10%',
              render: (text, record, index) => (
                <p className="cursor_pointer m-0">{record.gp_sogiayphep ? record.gp_sogiayphep : "--"}</p>
              ),
            },
            {
                title: 'Tên công trình',
                dataIndex: 'congtrinh_ten',
                key: 'congtrinh_ten',
                width: '30%',
                sorter: (a, b) => a.congtrinh_ten.localeCompare(b.congtrinh_ten),
                render: (text, record) => (
                    <p className="cursor_pointer m-0">{record.congtrinh_ten ? record.congtrinh_ten : "--"} </p>
                )
            },
            {
                title: 'Tổ chức được cấp phép',
                dataIndex: 'chugiayphep_ten',
                key: 'chugiayphep_ten',render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.chugiayphep_ten ? record.chugiayphep_ten : "--"} </p>
                )
            },
            {
                title: 'Trạng thái',
                dataIndex: 'hieulucgiayphep',
                key: 'hieulucgiayphep',
                render: (text, record, i) => (
                    <>
                        <Form>
                            <Form.Group controlId={record.id}>
                                <select disabled defaultValue={record.status} className="py-1 px-2 license-status-select rounded">
                                    <option value={0}>Chưa được duyệt</option>
                                    <option value={2}>Đang xem xét, chỉnh sửa</option>
                                    <option value={3}>Hoàn thành hồ sơ cấp phép</option>
                                    <option value={1}>Đã được cấp phép</option>
                                </select>
                            </Form.Group>
                        </Form>
                    </>
                )
            },
            {
                title: 'Ghi chú',
                dataIndex: 'gp_ghichu',
                key: 'gp_ghichu',render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.gp_ghichu} </p>
                )
            },
            {
                title: 'Ngày hết hạn',
                dataIndex: 'gp_ngayhethan',
                key: 'gp_ngayhethan',render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.gp_ngayhethan ? this.formatDate(record.gp_ngayhethan) : "--"} </p>
                )
            },
            {
                title: '',
                key: 'action',
                render: (text, record, i) => (
                    <>
                        <div className="d-flex justify-content-center">
                        <Link className="p-1" to={"/quan-ly-cap-phep/nuoc-mat/thuy-dien/xem/"+record.id} title="Xem"><EyeOutlined /></Link>
                        {user.id === record.user_id || user.role === 'admin' ?
                            <Link className="p-1" to={"/quan-ly-cap-phep/nuoc-mat/thuy-dien/chinh-sua/"+record.id} title="Chỉnh Sửa"><EditOutlined /></Link> : ""
                        }
                        {user.role === 'admin' ?
                            <Link className="p-1" to={"/quan-ly-cap-phep/nuoc-mat/thuy-dien/theo-doi/"+record.id} title="Theo Dõi"><SearchOutlined/></Link> : ""
                        }
                        {user.id === record.user_id || user.role === 'admin' ?
                            <Link className="p-1 pl-md-0" to="/quan-ly-cap-phep/nuoc-mat/thuy-dien/gia-han-dieu-chinh" title="Gia hạn"><ClockCircleOutlined /></Link> : ""
                        }
                        {user.role === 'admin' ?
                            <Link className="p-1 text-danger" onClick={() => {if(window.confirm('Bạn có chắc muốn xóa giấy phép '+record.gp_sogiayphep+' chứ ?')){ this.destroyLicenseHandler(record.id)};}} variant="link" title="Xóa"><DeleteOutlined /></Link> : ''
                        }
                        </div>
                    </>
                )
            },
        ];
        
        return(
			<div className="p-0">
                <Header headTitle="QUẢN LÝ CẤP MỚI GIẤY PHÉP KHAI THÁC SỬ DỤNG NƯỚC MẶT CHO CÔNG TRÌNH THỦY ĐIỆN" previousLink="/quan-ly-cap-phep/nuoc-mat/thuy-dien" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                        <DemGiayPhep />
                    </div>
                    <Tabs type="card" className="col-9 py-1 px-1">
                        <TabPane tab={<span className="d-flex align-items-center"><span>Hồ sơ đã cấp </span>&nbsp;<span className="text-white bg-danger p-1 font-13 rounded-circle d-flex text-center justify-content-center align-items-center license-number-badge">{this.state.grantedLicense.length}</span></span>} key="1">
                            <div className="menu-home col-12 p-0 discharge-water">
                                <div className="col-12 p-0 ">
                                    <div className="col-12 row align-items-center my-1 px-0 mx-0 justify-content-center">
                                        <div className="my-1 col-lg-6 ">
                                            <Input.Search allowClear name="search" placeholder="--Tìm kiếm giấy phép--" onSearch={this.onSearchHandle} />
                                        </div>
                                    </div>
                                    <div className="table-responsive px-2">
                                        <ConfigProvider locale={vnVN}>
                                            <Table  className="table table-sm table-bordered col-12 table-hover text-center" 
                                                columns={columns} 
                                                loading={this.state.loading}
                                                onChange={() => this.handleTableChange}
                                                dataSource={this.state.grantedLicense}
                                                rowKey="id"
                                                bordered                                        
                                                pagination={{
                                                showTotal: (total, range) => `Tất cả ${total} bản ghi`,
                                                    current: this.state.currentPage,
                                                    pageSize: 10
                                                }}
                                                />
                                        </ConfigProvider>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Hồ sơ cấp mới" key="2">
                            <div className="menu-home col-12 p-0 discharge-water">
                                <div className="col-12 p-0 ">
                                    <div className="col-12 row align-items-center my-1 px-0 mx-0">
                                        <div className="my-1 col-lg-6">
                                            <Input.Search allowClear name="search" placeholder="--Tìm kiếm giấy phép--" onSearch={this.onSearchHandle} />
                                        </div>
                                        <div className="col-lg-3 my-1">
                                            <select name="filter" id="filter" onChange={this.onFilterHandle} className="form-select font-13" defaultValue="all">
                                                <option value="" disabled>--Trạng thái--</option>
                                                <option value="all">Tất cả</option>
                                                <option value={0}>Nộp hồ sơ</option>
                                                <option value={2}>Đang lấy ý kiến thẩm định</option>  
                                                <option value={3}>Hoàn thành hồ sơ cấp phép</option>
                                                <option value={1}>Đã được cấp phép</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Hồ sơ gia hạn" key="3">
                            <div className="menu-home col-12 p-0 discharge-water">
                                <div className="col-12 p-0 ">
                                    <div className="col-12 row align-items-center my-1 px-0 mx-0">
                                        <div className="my-1 col-lg-6">
                                            <Input.Search allowClear name="search" placeholder="--Tìm kiếm giấy phép--" onSearch={this.onSearchHandle} />
                                        </div>
                                        <div className="col-lg-3 my-1">
                                            <select name="filter" id="filter" onChange={this.onFilterHandle} className="form-select font-13" defaultValue="all">
                                                <option value="" disabled>--Trạng thái--</option>
                                                <option value="all">Tất cả</option>
                                                <option value={0}>Chưa được duyệt</option>
                                                <option value={2}>Đang xem xét, chỉnh sửa</option>
                                                <option value={3}>Hoàn thành hồ sơ cấp phép</option>
                                                <option value={1}>Đã được cấp phép</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Hồ sơ thu hồi" key="4">
                            <div className="menu-home col-12 p-0 discharge-water">
                                <div className="col-12 p-0 ">
                                    <div className="col-12 row align-items-center my-1 px-0 mx-0">
                                        <div className="my-1 col-lg-6">
                                            <Input.Search allowClear name="search" placeholder="--Tìm kiếm giấy phép--" onSearch={this.onSearchHandle} />
                                        </div>
                                        <div className="col-lg-3 my-1">
                                            <select name="filter" id="filter" onChange={this.onFilterHandle} className="form-select font-13" defaultValue="all">
                                                <option value="" disabled>--Trạng thái--</option>
                                                <option value="all">Tất cả</option>
                                                <option value={0}>Nộp hồ sơ</option>
                                                <option value={2}>Đang lấy ý kiến thẩm định</option>  
                                                <option value={3}>Hoàn thành hồ sơ cấp phép</option>
                                                <option value={1}>Đã được cấp phép</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                    
                </main>
            </div>
        )
    }
}