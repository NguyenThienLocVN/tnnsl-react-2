import React from 'react';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { Alert } from 'antd';
import { UserOutlined, LockOutlined, BankOutlined, IdcardOutlined, PhoneOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import configData from "../config.json";

import { apiClient } from '../Shared/Auth';

export default class Login extends React.Component{
	constructor(props)
    {
        super(props)
        this.state = {
            checkOrganization: true,
			errorMsg: '',
			successMsg: '',
			signupData: {
				username: '',
				email: '',
				password: '',
				organization_name: '',
				organization_code: '',
				address: '',
				organization_address: '',
				phone: '',
			},
			type: "to-chuc"
        }
    }

	componentDidMount(){
        document.title = "Đăng ký | Giám sát tài nguyên nước Sơn La";
		(function () {
		  
			// Fetch all the forms we want to apply custom Bootstrap validation styles to
			var forms = document.querySelectorAll('.needs-validation')
		  
			// Loop over them and prevent submission
			Array.prototype.slice.call(forms)
			  .forEach(function (form) {
				form.addEventListener('submit', function (event) {
				  if (!form.checkValidity()) {
					event.preventDefault()
					event.stopPropagation()
				  }
		  
				  form.classList.add('was-validated')
				}, false)
			  })
		  })()
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
		e.preventDefault();
		apiClient.get('/sanctum/csrf-cookie')
            .then(response => {
                trackPromise(
					apiClient.post(configData.API_URL + "/register", {
						username: this.state.signupData.username,
						email: this.state.signupData.email,
						password: this.state.signupData.password,
						name: this.state.signupData.name,
						organization_code: this.state.signupData.organization_code,
						address: this.state.signupData.address,
						phone: this.state.signupData.phone,
						type: this.state.type,
					})
					.then((response) => {
						if (response.status === 200) {
							this.setState({
								successMsg: response.data.success_message,
								signupData: {
									username: '',
									name: '',
									email: '',
									password: '',
									organization_code: '',
									address: '',
									phone: '',
								},
								type: '',
								redirect: true
							});
						}
					})
					.catch((error) => {console.log(error);
						setTimeout(this.setState({errorMsg: error.response.data.error_message}), 3000);
					})
				)
            })
	};

    render(){
        return (
            <div>
				<img src={process.env.PUBLIC_URL + '/images/screenshot-tai-nguyen-nuoc.png'} className="background-login" alt="screenshot-tai-nguyen-nuoc" />
				<form onSubmit={this.onSubmitHandler} className="form-register position-absolute needs-validation" noValidate>
					<img className="w-100 banner-tnmt" src={process.env.PUBLIC_URL + '/images/ANHSOTNMT.png'} alt="banner-tnmt" />
					<main className="d-flex flex-column flex-md-row">
						<div className="col-lg-6 col-md-6 px-0 pt-md-0 pb-md-0 align-items-center d-none d-md-block">
							<img className="w-100 h-100" src={process.env.PUBLIC_URL + '/images/ban-do-dia-hinh-son-la.png'} alt="ban-do-dia-hinh-son-la" />
						</div>
						<div className="bg-lightgray col-lg-6 col-sm-12 col-md-6 text-center py-1 py-lg-0 px-2">
							<div className="p-0 text-center">
								<h6 className="text-primary fw-bold d-block py-2">HỆ THỐNG QUẢN LÝ,  GIÁM SÁT, KHAI THÁC SỬ DỤNG TÀI NGUYÊN NƯỚC </h6>
							</div>
							<div className="input-group mb-2 d-flex mx-0 align-items-center">
								<div className="me-2 col-4 fw-bold text-start">Đối tượng <span className="text-danger">*</span></div>
								<select name="type" onChange={this.onChangeTypehandler} defaultValue="to-chuc" value={this.state.type} className="form-select font-14 rounded-0">
									<option value="to-chuc">Tổ chức</option>
									<option value="ca-nhan">Cá nhân</option>
								</select>
							</div>

							<div className="input-group mb-2 d-flex mx-0 align-items-center">
								<div className="me-2 col-4 fw-bold text-start">Tên cá nhân/Tổ chức <span className="text-danger">*</span></div>
								<span className="input-group-text font-20"><BankOutlined /></span>
								<input name="name" value={this.state.name} onChange={this.onChangehandler} className="form-control font-13 rounded-0" placeholder="VD: Công ty A hoặc Nguyễn Văn A" type="text" required />
							</div>

							<div className="input-group mb-2 d-flex mx-0 align-items-center">
								<div className="me-2 col-4 fw-bold text-start">Tên đăng nhập <span className="text-danger">*</span></div>
								<span className="input-group-text font-20"><UserOutlined /></span>
								<input name="username" value={this.state.username} onChange={this.onChangehandler} className="form-control font-13 rounded-0" placeholder="Tên đăng nhập" type="text" required />
							</div>

							<div className="input-group mb-2 d-flex mx-0 align-items-center">
								<div className="me-2 col-4 fw-bold text-start">Mật khẩu <span className="text-danger">*</span></div>
								<span className="input-group-text font-20"><LockOutlined /></span>
								<input name="password" value={this.state.password} onChange={this.onChangehandler} className="form-control font-13 rounded-0" placeholder="Mật khẩu" type="password" required />
							</div>
							{this.state.checkOrganization && 
								<div className="input-group mb-2 d-flex mx-0 align-items-center">
									<div className="me-2 col-4 fw-bold text-start">Mã doanh nghiệp</div>
									<span className="input-group-text font-20"><IdcardOutlined /></span>
									<input name="organization_code" value={this.state.organization_code} onChange={this.onChangehandler} className="form-control font-13 rounded-0" placeholder="Mã doanh nghiệp" type="text" />
								</div>
							}

							<div className="input-group mb-2 d-flex mx-0 align-items-center">
								<div className="me-2 col-4 fw-bold text-start">Địa chỉ <span className="text-danger">*</span></div>
								<span className="input-group-text font-20"><HomeOutlined /></span>
								<input name="address" value={this.state.address} onChange={this.onChangehandler} className="form-control font-13 rounded-0" placeholder="Địa chỉ" type="text" required/>
							</div>

							<div className="input-group mb-2 d-flex mx-0 align-items-center">
								<div className="me-2 col-4 fw-bold text-start">Số điện thoại <span className="text-danger">*</span></div>
								<span className="input-group-text font-20"><PhoneOutlined /></span>
								<input name="phone" value={this.state.phone} onChange={this.onChangehandler} className="form-control font-13 rounded-0" placeholder="Số điện thoại" type="text" required />
							</div>

							<div className="input-group mb-2 d-flex mx-0 align-items-center">
								<div className="me-2 col-4 fw-bold text-start">Email <span className="text-danger">*</span></div>
								<span className="input-group-text font-20"><MailOutlined /></span>
								<input name="email" value={this.state.email} onChange={this.onChangehandler} className="form-control font-13 rounded-0" placeholder="Email" type="text" required/>
							</div>

							{this.state.errorMsg ? 
							<Alert className="mt-3" message={this.state.errorMsg} type="error" showIcon /> : "" }

							{this.state.successMsg ? 
								<Alert className="mt-3" message={this.state.successMsg} type="success" showIcon />
							: "" }

							<div className="text-center d-flex pt-2 pb-3 justify-content-center align-items-center">
								<input type="submit" className="col-4 btn btn-success" value="Đăng ký" />

								<span className="px-2">hoặc</span> <Link to="/login">Đăng nhập</Link>
							</div>
						</div>
					</main>
				</form>
			</div>
			
        )
    }
}