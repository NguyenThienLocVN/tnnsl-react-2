/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, HomeFilled } from '@ant-design/icons';

export default class Header extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            headTitle: this.props.headTitle,
            isHomepage: this.props.isHomepage,
            previousLink: this.props.previousLink,
            showHeadImage: this.props.showHeadImage,
            layout48: this.props.layout48,
            layout39: this.props.layout39,
            leftBarClass: '',
            rightBarClass: ''
        }
    }

    componentDidMount(){
        if(this.state.layout48)
        {
            this.setState({leftBarClass: "col-lg-4 col-sm-12 col-md-12 px-0 pt-md-0 pb-md-0 d-flex align-items-center"});
            this.setState({rightBarClass: "bg-lightgray col-lg-8 col-sm-12 col-md-12 text-center py-1 py-lg-0"});
        }
        else
        {
            this.setState({leftBarClass: "col-lg-3 col-sm-12 col-md-12 px-0 pt-md-0 pb-md-0 d-flex align-items-center"});
            this.setState({rightBarClass: "bg-lightgray col-lg-9 col-sm-12 col-md-12 text-center py-1 py-lg-0"});
        }
    }

    render(){
        return(
            
            <header>
                {this.state.showHeadImage &&
                    <Link to="/"><img className="w-100 banner-tnmt" src={process.env.PUBLIC_URL + '/images/ANHSOTNMT.png'} alt="banner-tnmt" /></Link>
                }
                
                {this.state.isHomepage ?
                    <div className="bg-header-bar d-flex flex-column flex-lg-row top-bar">
                        <div className="col-lg-4 col-sm-12 col-md-12 px-0 pt-md-0 pb-md-0 d-flex align-items-center">
                            <a href="http://tainguyenmoitruongsonla.vn" title="Về trang chủ" className="font-weight-bold text-white btn-home-top d-flex justify-content-center align-items-center">
                                <HomeFilled />
                            </a>
                            <div className="font-weight-bold text-white d-block pl-2">{this.state.headTitle}</div>
                        </div>
                        <div className="bg-lightgray col-lg-8 col-sm-12 col-md-12 text-center py-1 py-lg-0">
                            <span className="text-header-bar font-weight-bold">HỆ THỐNG QUẢN LÝ,  GIÁM SÁT, KHAI THÁC SỬ DỤNG TÀI NGUYÊN NƯỚC </span>
                        </div>
                    </div>
                :
                    <div className="bg-header-bar d-flex flex-column flex-lg-row top-bar">
                        <div className={this.state.leftBarClass}>
                            <Link to={this.state.previousLink} id="btn_back_page" className="font-weight-bold text-white btn-home-top d-flex justify-content-center align-items-center">
                                <ArrowLeftOutlined />
                            </Link>
                            <div className="font-weight-bold text-white d-block pl-2">{this.state.headTitle}</div>
                        </div>
                        <div className={this.state.rightBarClass}>
                            <span className="text-header-bar font-weight-bold">HỆ THỐNG QUẢN LÝ,  GIÁM SÁT, KHAI THÁC SỬ DỤNG TÀI NGUYÊN NƯỚC </span>
                        </div>
                    </div>
                }
                        
            </header>
        )
    }
}