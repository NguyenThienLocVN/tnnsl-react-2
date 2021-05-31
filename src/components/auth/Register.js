import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { trackPromise } from 'react-promise-tracker';
import { Alert } from 'antd';
import { UserOutlined, LockOutlined, BankOutlined, IdcardOutlined, PhoneOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import configData from "../../config.json";

export default class Login extends React.Component{
	constructor(props)
    {
        super(props)
        this.state = {
            checkOrganization: true,
			errorMsg: '',
			successMsg: '',
			signupData: {
				name: '',
				email: '',
				password: '',
				organization_name: '',
				organization_code: '',
				address: '',
				organization_address: '',
				phone: '',
			},
			type: ''
        }
    }

	componentDidMount(){
        document.title = "Đăng ký | Giám sát tài nguyên nước Sơn La";
    }

	onChangehandler = (e, key) => {
		const { signupData } = this.state;
		signupData[e.target.name] = e.target.value;
		this.setState({ signupData });
	  };

	onChangeTypehandler = (e) => {
		this.setState({
			checkOrganization: !this.state.checkOrganization,
			type: e.target.value
		})
	}

	onSubmitHandler = (e) => {
		trackPromise(
			axios
		  	.post(configData.API_URL + "/register", {
				name: this.state.signupData.name,
				email: this.state.signupData.email,
				password: this.state.signupData.password,
				organization_name: this.state.signupData.organization_name,
				organization_code: this.state.signupData.organization_code,
				address: this.state.signupData.address,
				organization_address: this.state.signupData.organization_address,
				phone: this.state.signupData.phone,
				type: this.state.type,
			})
		  	.then((response) => {
				if (response.status === 200) {
					this.setState({
						successMsg: response.data.success_message,
						signupData: {
							name: '',
							email: '',
							password: '',
							organization_name: '',
							organization_code: '',
							address: '',
							organization_address: '',
							phone: '',
						},
						type: '',
						redirect: true
					});
				}
			})
			.catch((error) => {console.log(error);
                this.setState({errorMsg: error.response.data.error_message});
            })
		);
	};

    render(){
        return (
            <div>
				<img src={process.env.PUBLIC_URL + '/images/screenshot-tai-nguyen-nuoc.png'} className="background-login" alt="screenshot-tai-nguyen-nuoc" />
				<div className="form-register position-absolute">
					<img className="w-100 banner-tnmt" src={process.env.PUBLIC_URL + '/images/ANHSOTNMT.png'} alt="banner-tnmt" />
					<main className="d-flex flex-column flex-md-row">
						<div className="col-lg-6 col-md-6 px-0 pt-md-0 pb-md-0 align-items-center d-none d-md-block">
							<img className="w-100 h-100" src={process.env.PUBLIC_URL + '/images/ban-do-dia-hinh-son-la.png'} alt="ban-do-dia-hinh-son-la" />
						</div>
						<div className="bg-lightgray col-lg-6 col-sm-12 col-md-6 text-center py-1 py-lg-0">
							<div className="p-0 text-center">
								<h6 className="text-primary font-weight-bold d-block py-2">HỆ THỐNG QUẢN LÝ,  GIÁM SÁT, KHAI THÁC SỬ DỤNG TÀI NGUYÊN NƯỚC </h6>
							</div>
							<div className="d-flex align-items-center">
								<p className="col-4 p-0 m-0 font-weight-bold text-left font-14">Đối tượng <span className="text-danger">*</span></p>
								<select onChange={this.onChangeTypehandler} className="col-7 d-flex ml-3 pl-2 pr-0 custom-select input-group mb-1 font-14" >
									<option defaultValue="0">Tổ chức</option>
									<option defaultValue="1">Cá nhân</option>
								</select>
							</div>

							<div className="d-flex align-items-center">
								<p className="col-4 p-0 m-0 font-weight-bold text-left font-14">Tên đăng nhập <span className="text-danger">*</span></p>
								<div className="col-8 d-flex pr-0 form-group input-group mb-1">
									<div className="input-group-prepend">
										<span className="input-group-text justify-content-center"><UserOutlined /></span>
									</div>
									<input name="name" value={this.state.name} onChange={this.onChangehandler} className="form-control font-14" placeholder="Tên đăng nhập" type="text" required />
								</div>
							</div>

							<div className="d-flex align-items-center">
								<p className="col-4 p-0 m-0 font-weight-bold text-left font-14">Mật khẩu <span className="text-danger">*</span></p>
								<div className="col-8 d-flex pr-0 form-group input-group mb-1">
									<div className="input-group-prepend">
										<span className="input-group-text justify-content-center"><LockOutlined /></span>
									</div>
									<input name="password" value={this.state.password} onChange={this.onChangehandler} className="form-control font-14" placeholder="Mật khẩu" type="password" required />
								</div>
							</div>

							{this.state.checkOrganization && 
							<div className="d-flex align-items-center">
								<p className="col-4 p-0 m-0 font-weight-bold text-left font-14">Tên doanh nghiệp <span className="text-danger">*</span></p>
								<div className="col-8 d-flex pr-0 form-group input-group mb-1">
									<div className="input-group-prepend">
										<span className="input-group-text justify-content-center"><BankOutlined /></span>
									</div>
									<input name="organization_name" value={this.state.organization_name} onChange={this.onChangehandler} className="form-control font-14" placeholder="Tên doanh nghiệp" type="text" required />
								</div>
							</div>
							}

							{this.state.checkOrganization && 
							<div className="d-flex align-items-center">
								<p className="col-4 p-0 m-0 font-weight-bold text-left font-14">Mã doanh nghiệp</p>
								<div className="col-8 d-flex pr-0 form-group input-group mb-1">
									<div className="input-group-prepend">
										<span className="input-group-text justify-content-center"><IdcardOutlined /></span>
									</div>
									<input name="organization_code" value={this.state.organization_code} onChange={this.onChangehandler} className="form-control font-14" placeholder="Mã doanh nghiệp" type="text" />
								</div>
							</div>
							}

							{!this.state.checkOrganization && 
							<div className="d-flex align-items-center">
								<p className="col-4 p-0 m-0 font-weight-bold text-left font-14">Địa chỉ <span className="text-danger">*</span></p>
								<div className="col-8 d-flex pr-0 form-group input-group mb-1">
									<div className="input-group-prepend">
										<span className="input-group-text justify-content-center"><HomeOutlined /></span>
									</div>
									<input name="address" value={this.state.address} onChange={this.onChangehandler} className="form-control font-14" placeholder="Địa chỉ" type="text" required/>
								</div>
							</div>
							}

							{this.state.checkOrganization && 
							<div className="d-flex align-items-center">
								<p className="col-4 p-0 m-0 font-weight-bold text-left font-14">Trụ sở chính</p>
								<div className="col-8 d-flex pr-0 form-group input-group mb-1">
									<div className="input-group-prepend">
										<span className="input-group-text justify-content-center"><HomeOutlined /></span>
									</div>
									<input name="organization_address" value={this.state.organization_address} onChange={this.onChangehandler} className="form-control font-14" placeholder="Trụ sở chính" type="text" />
								</div>
							</div>
							}

							<div className="d-flex align-items-center">
								<p className="col-4 p-0 m-0 font-weight-bold text-left font-14">Số điện thoại <span className="text-danger">*</span></p>
								<div className="col-8 d-flex pr-0 form-group input-group mb-1">
									<div className="input-group-prepend">
										<span className="input-group-text justify-content-center"><PhoneOutlined /></span>
									</div>
									<input name="phone" value={this.state.phone} onChange={this.onChangehandler} className="form-control font-14" placeholder="Số điện thoại" type="text" required />
								</div>
							</div>

							<div className="d-flex align-items-center">
								<p className="col-4 p-0 m-0 font-weight-bold text-left font-14">Email <span className="text-danger">*</span></p>
								<div className="col-8 d-flex pr-0 form-group input-group mb-1">
									<div className="input-group-prepend">
										<span className="input-group-text justify-content-center"> <MailOutlined /></span>
									</div>
									<input name="email" value={this.state.email} onChange={this.onChangehandler} className="form-control font-14" placeholder="Email" type="text" required/>
								</div>
							</div>

							{this.state.errorMsg ? 
							<Alert className="mt-3" message={this.state.errorMsg} type="error" showIcon /> : "" }

							{this.state.successMsg ? 
								<Alert className="mt-3" message={this.state.successMsg} type="success" showIcon />
							: "" }

							<div className="text-center d-flex pt-2 pb-3">
								<button onClick={this.onSubmitHandler} className="col-5 btn btn-success">Đăng ký</button>

								<Link to="/login" className="btn font-13 col-6">Đăng nhập</Link>
							</div>
						</div>
					</main>
				</div>
			</div>
        )
    }
}