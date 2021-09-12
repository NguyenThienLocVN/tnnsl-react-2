/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';

import Header from '../Shared/Header';
import '../Shared/Page.css';
import { getUser, getToken } from '../Shared/Auth';

import { Link } from 'react-router-dom';

import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import configData from "../config.json";
import { Form } from "react-bootstrap";
import { ConfigProvider, Table, Input, Button } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, UserOutlined, FormOutlined } from '@ant-design/icons';
import vnVN from 'antd/lib/locale/vi_VN';

const user = getUser();

export default class UserProfile extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            pagename: this.props.match.params.pagename,
            dataNewLicenseManagement: [],
            activeModal: null,
            status: '',
            id_gp: '',
            pagination: {},
            search: '',
            filter: '',
            nameUser: '',
        }
    }
    clickHandler = (e, index) => {
        this.setState({ activeModal: index })
    }
    
    hideModal = () => {
        this.setState({ activeModal: null })
    }
    
    componentDidMount(){
        document.title = "Thông tin tài khoản | Giám sát tài nguyên nước Sơn La";
        this.fetch(this.state.pagination, 'all');
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
        this.fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
          });
    };

    fetch = (params = {}, filter) => {
        this.setState({ loading: true });
        user ?
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-mat/yeu-cau/"+user.id+"/"+filter, {
                headers: {'Authorization': 'Bearer ' + getToken()}
            })
            .then((response) => {
                if(response.status === 200)
                {
                    this.setState({
                        loading: false,
                        dataNewLicenseManagement: response.data,
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
        this.fetch(this.state.pagination, e.target.value);   
    }

    // Function search
    onSearchHandle = (value) => {
        if(!value)
        {   
            this.fetch(this.state.pagination, 'all');
        }
        const filterResult = this.state.dataNewLicenseManagement.filter(o =>
            Object.keys(o).some(k =>
                String(o[k])
                .toLowerCase()
                .includes(value.toLowerCase())
            )
        );

        this.setState({ dataNewLicenseManagement : filterResult });
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
        const user = getUser();
        const columns = [
            {
              title: 'Số GP',
              dataIndex: 'gp_sogiayphep',
              key: 'gp_sogiayphep',
              width: 150,
              render: (text, record, index) => (
                <p className="cursor_pointer m-0">{record.gp_sogiayphep ? record.gp_sogiayphep : "--"}</p>
              ),
            },
            {
                title: 'Tên công trình',
                dataIndex: 'congtrinh_ten',
                key: 'congtrinh_ten',
                sorter: (a, b) => a.congtrinh_ten.localeCompare(b.congtrinh_ten),
                render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.congtrinh_ten ? record.congtrinh_ten : "--"} </p>
                )
            },
            {
                title: 'Loại công trình',
                dataIndex: 'congtrinh_loaihinh_ktsd',
                width: 150,
                render: (text, record, i) => (
                    <>
                        {record.congtrinh_loaihinh_ktsd === "thuy-dien" ? "Thủy điện" : record.congtrinh_loaihinh_ktsd === "tram-bom" ? "Trạm bơm" : record.congtrinh_loaihinh_ktsd === "ho-chua" ? "Hồ chứa" : record.congtrinh_loaihinh_ktsd === "nha-may-nuoc" ? "Nhà máy nước" : record.congtrinh_loaihinh_ktsd === "tram-cap-nuoc" ? "Trạm cấp nước" : ""}
                    </>
                )
            },
            {
                title: 'Trạng thái',
                dataIndex: 'hieulucgiayphep',
                key: 'hieulucgiayphep',
                width: 210,
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
                title: 'Ngày ký',
                dataIndex: 'gp_ngayky',
                width: 100,
                key: 'gp_ngayky',render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.gp_ngayky ? this.formatDate(record.gp_ngayky) : "--"} </p>
                )
            },
            {
                title: 'Ngày hết hạn',
                dataIndex: 'gp_ngayhethan',
                width: 100,
                key: 'gp_ngayhethan',render: (text, record) => (
                    <p className="cursor_pointer text-2-wrap m-0">{record.gp_ngayhethan ? this.formatDate(record.gp_ngayhethan) : "--"} </p>
                )
            },
            {
                title: '',
                key: '',
                width: 130,
                render: (text, record, i) => (
                    <>
                        <div className="d-flex justify-content-center">
                            <Link className="btn text-primary" to={"/quan-ly-cap-phep/nuoc-mat/thuy-dien/xem/"+record.id} title="Theo Dõi"><EyeOutlined /></Link>
                            <Link className="btn text-primary" to={"/quan-ly-cap-phep/nuoc-mat/thuy-dien/chinh-sua/"+record.id} title="Chỉnh Sửa"><EditOutlined /></Link>
                            {user.role === 'admin' &&
                                <Link onClick={() => {if(window.confirm('Bạn có chắc muốn xóa giấy phép '+record.gp_sogiayphep+' chứ ?')){ this.destroyLicenseHandler(record.id)};}} to="#" className="btn text-danger" title="Xóa"><DeleteOutlined /></Link>
                            }
                        </div>
                    </>
                )
            },
        ];
        return(
            <div>
                <Header headTitle="THÔNG TIN TÀI KHOẢN" previousLink="/" showHeadImage={true} layout210={true} />
                <div className="profile-page">
                    <div className="page-content page-container" id="page-content">
                        <div className="p-2">
                            <div className="col-12">
                                <div className="card user-card-full mb-0">
                                    <div className="row m-l-0 m-r-0">
                                        <div className="col-sm-2 bg-c-lite-green user-profile position-relative">
                                            <div className="card-block text-center text-white">
                                                <div className="m-b-25"> <UserOutlined className="img-radius p-2 border rounded-circle font-45" /> </div>
                                                <h6 className="f-w-600 d-flex align-items-center justify-content-center"> {user.name} </h6>
                                                <p> {user.role === "admin" ? "Quản trị viên" : user.role === "client" ? "Khách" : user.role === "license_owner" ? "Chủ giấy phép" : user.role === "chairperson" ? "Lãnh đạo" :"" } </p> 
                                                <FormOutlined className="text-warning ms-2" title="Chỉnh sửa thông tin" />
                                            </div>
                                            <div className="footer-tainguyenmoitruongsonla">
                                                2021 © tainguyenmoitruongsonla.vn
                                            </div>
                                        </div>
                                        <div className="col-sm-10 p-0">
                                            <div className="card-block">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}