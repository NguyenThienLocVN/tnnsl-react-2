import React from 'react';
import Header from '../../../Shared/Header';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import configData from "../../../config.json";
import { Form, Button } from "react-bootstrap";
import { getUser, getToken } from '../../../Shared/Auth';
import { ConfigProvider, Table, Input } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import vnVN from 'antd/lib/locale/vi_VN';
import DemGiayPhep from './DemGiayPhep';

const user = getUser();
export default class QuanLyCapPhepKhaiThacQuanLyGiayPhepNDD extends React.Component {
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
        }
    }
    clickHandler = (e, index) => {
        this.setState({ activeModal: index })
    }
    
    hideModal = () => {
        this.setState({ activeModal: null })
    }
    
    componentDidMount(){
        document.title = "Quản lý cấp mới giấy phép nước dưới đất";
        this.fetch(this.state.pagination, 'all');
    }

    handleStatusChange = (event) => {
        this.setState({
            status: event.target.value,
        });
    }
    handlerDestroyLicense = (id_gp) =>{
        trackPromise(
            axios.get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac/xoa-giay-phep/"+id_gp, {
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
        axios
            .get(configData.API_URL + "/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/danh-sach-cap-moi-giay-phep-ktndd/"+user.id+"/"+filter, {
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
            })
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
                title: '',
                key: 'action',
                render: (text, record, i) => (
                    <>
                        <div className="d-flex">
                            <Link className="btn text-primary" to={"/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac/theo-doi/"+record.id} title="Theo Dõi"><EyeOutlined /></Link>
                            <Link className="btn text-primary" to={"/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac/chinh-sua/"+record.id} title="Chỉnh Sửa"><EditOutlined /></Link>
                            <Button onClick={() => {if(window.confirm('Bạn có chắc muốn xóa giấy phép '+record.gp_sogiayphep+' chứ ?')){ this.destroyLicenseHandler(record.id)};}} variant="link" className="text-danger" title="Xóa"><DeleteOutlined /></Button>
                        </div>
                    </>
                )
            },
        ];
        return(
			<div className="p-0">
                <Header headTitle="QUẢN LÝ CẤP MỚI GIẤY PHÉP CÔNG TRÌNH KHÁC NƯỚC DƯỚI ĐẤT" previousLink="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac" showHeadImage={true} layoutfull={true} />
                <main className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3 px-0 menu-home discharge-water text-center">
                    <DemGiayPhep />
                    </div>
                    <div className="menu-home col-12 p-0 col-lg-9 discharge-water">
                        <div className="col-12 p-0 ">
                            <div className="col-12 row align-items-center my-1 px-0 mx-0">
                                <div className=" mb-1 col-lg-9 ">
                                    <Input.Search allowClear name="search" placeholder="--Tìm kiếm giấy phép--" onSearch={this.onSearchHandle} />
                                </div>
                                <div className="col-lg-3 mb-2">
                                <select name="filter" id="filter" onChange={this.onFilterHandle} className="form-select font-13" defaultValue="all">
                                        <option value="all">Tất cả</option>
                                        <option value={0}>Nộp hồ sơ</option>
                                        <option value={2}>Đang lấy ý kiến thẩm định</option>  
                                        <option value={3}>Hoàn thành hồ sơ cấp phép</option>
                                        <option value={1}>Đã được cấp phép</option>
                                    </select>
                                </div>
                            </div>
                            <div className="table-responsive px-2">
                                <ConfigProvider locale={vnVN}>
                                    <Table  className="table table-sm table-bordered col-12 table-hover text-center" 
                                        columns={columns} 
                                        loading={this.state.loading}
                                        onChange={() => this.handleTableChange}
                                        dataSource={this.state.dataNewLicenseManagement}
                                        rowKey="id"
                                        bordered                                        pagination={{
                                        showTotal: (total, range) => `Tất cả ${total} bản ghi`,
                                            current: this.state.currentPage,
                                            pageSize: 10
                                        }}
                                        />
                                </ConfigProvider>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}