/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import Header from '../../../layout/Header';
import { Steps, Button, message } from 'antd';
import Map from '../../../layout/Map';
import { SolutionOutlined, BankOutlined, BarChartOutlined, StarFilled, RightOutlined, LeftOutlined,SaveOutlined } from '@ant-design/icons';
import FormThongTinChung from "./FormCreate/FormThongTinChung";
import FormThongTinCongTrinh from "./FormCreate/FormThongTinCongTrinh";
import FormGiamSatKTSD from "./FormCreate/FormGiamSatKTSD";
import FormChatLuongNuocMat from "./FormCreate/FormChatLuongNuocMat";

const { Step } = Steps;

const FormCreate1 = () => {
    return (
      <>
        <FormThongTinChung />
      </>
    );
};
const FormCreate2 = () => {
return (
    <>
        <FormThongTinCongTrinh />
    </>
);
};
const FormCreate3 = () => {
    return (
      <>
        <FormGiamSatKTSD />
      </>
    );
};
const Step4Form = () => {
    return (
      <>
        <FormChatLuongNuocMat />
      </>
    );
};

const steps = [
    {
      title: 'Thông tin chung',
      content: < FormCreate1 />,
      icon: <SolutionOutlined />,
      ct: '<div>ok</div>'
    },
    {
      title: 'Thông tin công trình',
      content: < FormCreate2 />,
      icon: <BankOutlined />,
    },
    {
      title: 'Giám sát KT/SD',
      content: < FormCreate3 />,
      icon: <BarChartOutlined />,
    },
    {
        title: 'Chất lượng nước mặt',
        content: < Step4Form />,
        icon: <StarFilled />,
      },
];


export default class QuanLyCapPhepNuocMat extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            current: 0,
        }
    }
    state = {
        current: 0,
    };
    
      onChange = current => {
        this.setState({ current });
      };

    componentDidMount(){
        document.title = "Tạo mới giấy phép nước mặt | Giám sát tài nguyên nước Sơn La";
    }

    next = () => {
        this.setState({current: this.state.current + 1});
      };
    
      prev = () => {
        this.setState({current: this.state.current - 1});
      };

    render(){
          const { current } = this.state;
        return(
			<div className="p-0">
                
                <Header headTitle="CẤP MỚI GIẤY PHÉP NƯỚC MẶT" previousLink="/quan-ly-cap-phep/nuoc-mat/thuy-dien" showHeadImage={true} />
                <main className="d-flex flex-column flex-lg-row">
                    <div className="col-12 col-lg-6 px-0 menu-home discharge-water">
                        <form className="pb-5">
                        <div className="col-sm-12 px-0 pb-3 step__button">
                            <Steps responsive={true} type="default" size="small" current={current} onChange={this.onChange} className="site-navigation-steps text-left" >
                                {steps.map(item => (
                                    <Step key={item.title} icon={item.icon}  title={item.title} />
                                ))}
                            </Steps>
                        </div>
                        <div className="steps-content"> {steps[current].content} </div>
                            <div className="steps-action d-flex justify-content-end">
                            
                                {current > 0 && (
                                    <div className="col-6 d-flex justify-content-start align-items-center">
                                        <Button className="mx-3 d-flex justify-content-center align-items-center" onClick={this.prev}>
                                            <LeftOutlined /> Trước
                                        </Button>
                                    </div>
                                )}
                                
                            
                                {current < steps.length - 1 && (
                                    <div className="col-6 d-flex justify-content-end align-items-center">
                                        <Button type="primary" className="mx-3 d-flex justify-content-center align-items-center" onClick={this.next}>
                                            Tiếp <RightOutlined />
                                        </Button>
                                    </div>
                                )}
                                
                                {current === steps.length - 1 && (
                                    <div className="col-6 d-flex justify-content-end align-items-center">
                                        <Button type="primary" className="mx-3 d-flex justify-content-center align-items-center" onClick={() => message.success('Processing complete!')}>
                                            Xong <SaveOutlined />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </form> 
                    </div>
                    <div className="col-12 col-lg-6 menu-home px-md-1">
                        <Map />
                    </div>
                </main>
            </div>
        )
    }
}