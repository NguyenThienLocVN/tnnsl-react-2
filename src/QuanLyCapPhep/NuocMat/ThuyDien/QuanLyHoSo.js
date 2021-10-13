import React from 'react';
import Header from '../../../Shared/Header';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import configData from "../../../config.json";
import { Form } from "react-bootstrap";
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
            newLicense: [],
            extendLicense: [],
            recallLicense: [],
            activeModal: null,
            status: '',
            id_gp: '',
            grantedLicensePagination: {},
            newLicensePagination: {},
            extendLicensePagination: {},
            recallLicensePagination: {},
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
        document.title = "Quản lý hồ sơ giấy phép nước mặt - Thủy điện";
        this.fetchGrantedLicense(this.state.grantedLicensePagination);
        this.fetchNewLicense(this.state.newLicensePagination);
        this.fetchExtendLicense(this.state.extendLicensePagination);
        this.fetchRecallLicense(this.state.recallLicensePagination);
    }

    handleStatusChange = (event) => {
        this.setState({
            status: event.target.value,
        });
    }

    handlerDestroyLicense = (id_gp) =>{
        trackPromise(
            axios.get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/thuy-dien/xoa-giay-phep/"+id_gp, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if (response.status === 200) {
                    window.location.reload();
                }
            })
        );
    }

    handleTableChange = (grantedLicensePagination, filters, sorter) => {
        this.fetchGrantedLicense({
            sortField: sorter.field,
            sortOrder: sorter.order,
            grantedLicensePagination,
            ...filters,
          });
    };

    fetchGrantedLicense = (params = {}) => {
        this.setState({ loading: true });
        user ?
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/thuy-dien/ho-so-da-cap/"+user.id, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        loading: false,
                        grantedLicense: response.data,
                        grantedLicensePagination: {
                            ...params.grantedLicensePagination,
                            total: response.data.length
                        },
                    });
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            }) : window.location.reload(); 
    };

    // Hien thi danh sach ho so cap moi Nuoc Mat / Thuy dien
    fetchNewLicense = (params = {}) => {
        this.setState({ loading: true });
        user ?
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/thuy-dien/ho-so-cap-moi/"+user.id, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        loading: false,
                        newLicense: response.data,
                        newLicensePagination: {
                            ...params.newLicensePagination,
                            total: response.data.length
                        },
                    });
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            }) : window.location.reload(); 
    };

    // Hien thi danh sach ho so gia han Nuoc Mat / Thuy dien
    fetchExtendLicense = (params = {}) => {
        this.setState({ loading: true });
        user ?
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/thuy-dien/ho-so-gia-han/"+user.id, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        loading: false,
                        extendLicense: response.data,
                        extendLicensePagination: {
                            ...params.extendLicensePagination,
                            total: response.data.length
                        },
                    });
                }
            })
            .catch((error) => {
                this.setState({msg: error.response})
            }) : window.location.reload(); 
    };

    // Hien thi danh sach ho so thu hoi Nuoc Mat / Thuy dien
    fetchRecallLicense = (params = {}) => {
        this.setState({ loading: true });
        user ?
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/thuy-dien/ho-so-thu-hoi/"+user.id, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        loading: false,
                        recallLicense: response.data,
                        recallLicensePagination: {
                            ...params.recallLicensePagination,
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
        this.fetchGrantedLicense(this.state.grantedLicensePagination, e.target.value);   
    }

    // Function search
    onSearchHandle = (value) => {
        if(!value)
        {   
            this.fetchGrantedLicense(this.state.grantedLicensePagination, 'all');
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

    formatDateWithTime(date) {
        if(date === null){
            return "--";
        }else if(date === "0000-00-00"){
            return "--";
        }else{
            var date_format = new Date(date);
            var d = date_format.getDate();
            var m = date_format.getMonth()+1;
            var y = date_format.getFullYear();
            var hour = date_format.getHours();
            var min = date_format.getMinutes();
            var sec = date_format.getSeconds();
            return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y + ' ' + hour + ':' + min + ':' + sec;
        }
    }

    displayRole = (role) => {
        if(role === 'admin'){
            return <div className="btn btn-sm btn-outline-success"> Quản trị viên </div>;
        } else if(role === 'lanh-dao'){
            return <div className="btn btn-sm btn-outline-success"> Lãnh đạo </div>;
        } else if(role === 'chu-giay-phep'){
            return <div className="btn btn-sm btn-outline-success"> Chủ giấy phép </div>;
        } else {
            return <div className="btn btn-sm btn-outline-success"> Khách </div>;
        }
    }

    render(){
        const grantedLicenseColumns = [
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
                                <Form.Control disabled size="sm" as="select" defaultValue={record.status}>
                                    <option value={0}>Nộp hồ sơ</option>
                                    <option value={2}>Đang lấy ý kiến thẩm định</option>
                                    <option value={3}>Hoàn thành hồ sơ cấp phép</option>
                                    <option value={1}>Đã được cấp phép</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </>
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

        const requestColumns = [
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
                title: 'Tổ chức đề nghị cấp phép',
                dataIndex: 'chugiayphep_ten',
                key: 'chugiayphep_ten',render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.chugiayphep_ten ? record.chugiayphep_ten : "--"} </p>
                )
            },
            {
                title: 'Email',
                dataIndex: 'chugiayphep_email',
                key: 'chugiayphep_email',render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.chugiayphep_email ? record.chugiayphep_email : "--"} </p>
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
                                <Form.Control disabled size="sm" as="select" defaultValue={record.status}>
                                    <option value={0}>Nộp hồ sơ</option>
                                    <option value={2}>Đang lấy ý kiến thẩm định</option>
                                    <option value={3}>Hoàn thành hồ sơ cấp phép</option>
                                    <option value={1}>Đã được cấp phép</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </>
                )
            },
            {
                title: 'Ghi chú',
                dataIndex: 'gp_ghichu',
                key: 'gp_ghichu',render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.gp_ghichu ? record.gp_ghichu : "--"} </p>
                )
            },
            {
                title: 'Thời gian gửi',
                dataIndex: 'created_at',
                key: 'created_at',render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.created_at ? this.formatDateWithTime(record.created_at) : "--"} </p>
                )
            },
            {
                title: '',
                key: 'action',
                render: (text, record, i) => (
                    <>
                        <div className="d-flex justify-content-center">
                        <Link className="p-1" to={"/quan-ly-cap-phep/nuoc-mat/thuy-dien/xem/"+record.id} title="Xem"><EyeOutlined /></Link>
                        {user.id === record.user_id || user.role === 'admin' || user.role === 'lanh-dao' ?
                            <Link className="p-1" to={"/quan-ly-cap-phep/nuoc-mat/thuy-dien/chinh-sua/"+record.id} title="Chỉnh Sửa"><EditOutlined /></Link> : ""
                        }
                        {user.role === 'admin' ?
                            <Link className="p-1" to={"/quan-ly-cap-phep/nuoc-mat/thuy-dien/theo-doi/"+record.id} title="Theo Dõi"><SearchOutlined/></Link> : ""
                        }
                        {user.id === record.user_id || user.role === 'admin' ?
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
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <h6 class="px-2 pt-2 d-flex align-items-center d-flex"><span class="col-2">DANH SÁCH HỒ SƠ</span> </h6>
                        <div className="col-6 px-2">
                            <hr className="my-1" />
                        </div>
                        <p class="px-2 m-0 d-flex font-14"><span class="col-1">Tên tổ chức: </span><span class="fw-bold">{user.name}</span></p>
                        <p class="px-2 mt-1 mb-3 d-flex font-14 align-items-center"><span class="col-1">Phân quyền: </span><span class="fw-bold">{this.displayRole(user.role)}</span></p>
                        <Tabs type="card" className="col-12 py-1 px-1">
                            <TabPane tab={<span className="d-flex align-items-center"><span>Hồ sơ đã cấp </span>&nbsp;<span className="text-white bg-danger p-1 font-13 rounded-circle d-flex text-center justify-content-center align-items-center license-number-badge">{this.state.grantedLicense.length}</span></span>} key="1">
                                <div className="menu-home col-12 p-0">
                                    <div className="col-12 p-0 ">
                                        <div className="col-12 row align-items-center my-1 px-0 mx-0 justify-content-center">
                                            <div className="my-1 col-lg-6 ">
                                                <Input.Search allowClear name="search" placeholder="--Tìm kiếm giấy phép--" onSearch={this.onSearchHandle} />
                                            </div>
                                        </div>
                                        <div className="table-responsive px-2">
                                            <ConfigProvider locale={vnVN}>
                                                <Table  className="table table-sm table-bordered col-12 table-hover text-center" 
                                                    columns={grantedLicenseColumns} 
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
                            <TabPane tab={<span className="d-flex align-items-center"><span>Hồ sơ cấp mới</span>&nbsp;<span className="text-white bg-danger p-1 font-13 rounded-circle d-flex text-center justify-content-center align-items-center license-number-badge">{this.state.newLicense.length}</span></span>} key="2">
                                <div className="menu-home col-12 p-0">
                                    <div className="col-12 p-0 ">
                                        <div className="col-12 row align-items-center my-1 px-0 mx-0 justify-content-center">
                                            <div className="my-1 col-lg-6 ">
                                                <Input.Search allowClear name="search" placeholder="--Tìm kiếm giấy phép--" onSearch={this.onSearchHandle} />
                                            </div>
                                        </div>
                                        <div className="table-responsive px-2">
                                            <ConfigProvider locale={vnVN}>
                                                <Table  className="table table-sm table-bordered col-12 table-hover text-center" 
                                                    columns={requestColumns} 
                                                    loading={this.state.loading}
                                                    onChange={() => this.handleTableChange}
                                                    dataSource={this.state.newLicense}
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
                            <TabPane tab={<span className="d-flex align-items-center"><span>Hồ sơ gia hạn</span>&nbsp;<span className="text-white bg-danger p-1 font-13 rounded-circle d-flex text-center justify-content-center align-items-center license-number-badge">{this.state.extendLicense.length}</span></span>} key="3">
                                <div className="menu-home col-12 p-0">
                                    <div className="col-12 p-0 ">
                                        <div className="col-12 row align-items-center my-1 px-0 mx-0 justify-content-center">
                                            <div className="my-1 col-lg-6 ">
                                                <Input.Search allowClear name="search" placeholder="--Tìm kiếm giấy phép--" onSearch={this.onSearchHandle} />
                                            </div>
                                        </div>
                                        <div className="table-responsive px-2">
                                            <ConfigProvider locale={vnVN}>
                                                <Table  className="table table-sm table-bordered col-12 table-hover text-center" 
                                                    columns={requestColumns} 
                                                    loading={this.state.loading}
                                                    onChange={() => this.handleTableChange}
                                                    dataSource={this.state.extendLicense}
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
                            <TabPane tab={<span className="d-flex align-items-center"><span>Hồ sơ thu hồi</span>&nbsp;<span className="text-white bg-danger p-1 font-13 rounded-circle d-flex text-center justify-content-center align-items-center license-number-badge">{this.state.recallLicense.length}</span></span>} key="4">
                                <div className="menu-home col-12 p-0">
                                    <div className="col-12 p-0 ">
                                        <div className="col-12 row align-items-center my-1 px-0 mx-0 justify-content-center">
                                            <div className="my-1 col-lg-6 ">
                                                <Input.Search allowClear name="search" placeholder="--Tìm kiếm giấy phép--" onSearch={this.onSearchHandle} />
                                            </div>
                                        </div>
                                        <div className="table-responsive px-2">
                                            <ConfigProvider locale={vnVN}>
                                                <Table  className="table table-sm table-bordered col-12 table-hover text-center" 
                                                    columns={requestColumns} 
                                                    loading={this.state.loading}
                                                    onChange={() => this.handleTableChange}
                                                    dataSource={this.state.recallLicense}
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
                        </Tabs>
                    </div>
                    
                </main>
            </div>
        )
    }
}