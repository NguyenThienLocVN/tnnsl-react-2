import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import configData from "../config.json";

import { apiClient, getUser, setUserSession } from '../Shared/Auth';

import './Auth.css';


export default class Login extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            username: '',
            password: '',
            redirect: false,
            error: false,
            msg: ''
        }
    }
    
    componentDidMount(){
        document.title = "Đăng nhập | Giám sát tài nguyên nước Sơn La";
    }

    onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    };

    onSignInHandler = (e) => {
        e.preventDefault();
            apiClient.get('/sanctum/csrf-cookie')
            .then(response => {
                trackPromise(        apiClient.post(configData.API_URL + "/login", {
                        username: this.state.username,
                        password: this.state.password,
                    })
                    .then((response) => {
                        if(response.status === 200)
                        {
                            setUserSession(response.data.remember_token, response.data.user)
                            this.setState({redirect: true})
                        }
                    })
                    .catch((error) => {
                        this.setState({msg: error.response.data.message})
                    })
                )
            })
    };

    render(){
        const login = getUser();
        if(login || this.state.redirect)
        {
            return <Redirect to="/"/>
        }
        return (
            <div>
                <img src={process.env.PUBLIC_URL + '/images/screenshot-tai-nguyen-nuoc.png'} className="background-login" alt="screenshot-tai-nguyen-nuoc" />
                <form onSubmit={this.onSignInHandler} className="form-login position-absolute">
        
                    <img src={process.env.PUBLIC_URL + '/images/ANHSOTNMT.png'} className="w-100 mb-3" alt="ANHSOTNMT" />
        
                    <div>
                        <div className="d-flex">
                            <span className="input-group-text"><UserOutlined /></span>
                            <input id="username" onChange={this.onChangehandler} className="form-control block w-full font-13 rounded-left" type="text" name="username" required autoFocus placeholder="Tên đăng nhập" />
                        </div>
                    </div>
    
                    <div className="mt-4">
                        <div className="d-flex">
                            <span className="input-group-text"><LockOutlined /></span>
                            <input id="password" onChange={this.onChangehandler} className="form-control block w-full font-13 rounded-left" type="password" name="password" required autoComplete="current-password" placeholder="Mật khẩu" />
                        </div>
                    </div>
                    {this.state.msg ? 
                    <Alert className="mt-3" message={this.state.msg} type="error" showIcon /> : "" }

                    <div className="text-center row mx-0 mt-4">
                        <input type="submit" className="col-12 btn font-13 button-login text-white" value="Đăng nhập" />
                        <a className="underline my-2 text-sm font-15" href="{{ route('password.request') }}">Quên mật khẩu ?</a>
                        <div className="col-12" style={{borderTop:"1px solid rgb(175 175 175)"}}></div>
                        <div className="mt-3 d-flex justify-content-between">
                            <Link to="register" className="font-13 btn button-login p-1 col-4 text-white">Đăng ký</Link>
                            <span> Hoặc </span>
                            <Link to="#" className="font-13 col-6 btn button-login p-1 text-white">Xem không cần đăng nhập</Link>
                        </div>
                    </div>
                </form> 
            </div>
        )
    }
}
