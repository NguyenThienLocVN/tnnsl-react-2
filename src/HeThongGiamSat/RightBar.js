import React from 'react';
import { Pie } from "react-chartjs-2";

export default class RightBar extends React.Component {
    render(){
        const pieData = {
            maintainAspectRatio: false,
            responsive: false,
            labels: ["(30) Mất kết nối", "(20) Bình thường", "(10) Chưa gửi dữ liệu"],
            datasets: [
              {
                data: [30, 20, 10],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 3
              }
            ]
        };
        const pieOptions = {
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    align:'start',
                },
            },
            elements: {
              arc: {
                borderWidth: 0
              }
            },
            
          };
        return(
            <div className="px-1">
                <div className="bg-greenyellow">
                    <p className="mb-0 p-2 fw-bold text-center text-violet font-12">THỐNG KÊ  CÔNG TRÌNH</p>
                    <p className="fw-bold font-12 row mx-0"><span className="d-block col-8">Tổng số </span><span className="d-block col-4">60</span></p>
                    <p className="fw-bold font-12 row mx-0"><span className="d-block col-8">Khai thác nước mặt  </span><span className="d-block col-4">30</span></p>
                    <p className="fw-bold font-12 row mx-0"><span className="d-block col-8">Khai thác NDD  </span><span className="d-block col-4">20</span></p>
                    <p className="fw-bold font-12 row mx-0 mb-2 pb-3"><span className="d-block col-8">Xả thải vào NN </span><span className="d-block col-4">10</span></p>
                </div>
                <div className="pb-2 row mx-0 mb-2 bg-greenyellow">
                    <p className="exploit-surfacewater-title mb-0 p-2 fw-bold text-center text-violet font-12">Khai thác nước mặt</p>
                    <div className="col-sm-6 pt-2">
                        <Pie
                            data={pieData}
                            options={pieOptions}
                        />
                    </div>
                    <div className="col-sm-6 row m-0 align-items-center">
                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATRAN.png'} alt="HE_THONG_GIAM_SAT/ANH_QXATRAN" width="100%" />
                    </div>
                </div>
                <div className="pb-2 row mx-0 mb-2 bg-greenyellow">
                    <p className="exploit-surfacewater-title mb-0 p-2 fw-bold text-center text-violet font-12">Khai thác nước dưới đất</p>
                    <div className="col-sm-6 pt-2">
                        <Pie
                            data={pieData}
                            options={pieOptions}
                        />
                    </div>
                    <div className="col-sm-6 row m-0 align-items-center">
                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATRAN.png'} alt="HE_THONG_GIAM_SAT/ANH_QXATRAN" width="100%" />
                    </div>
                </div>
                <div className="pb-2 row mx-0 bg-greenyellow">
                    <p className="exploit-surfacewater-title mb-0 p-2 fw-bold text-center text-violet font-12">Xả thải vào nguồn nước</p>
                    <div className="col-sm-6 pt-2">
                        <Pie
                            data={pieData}
                            options={pieOptions}
                        />
                    </div>
                    <div className="col-sm-6 row m-0 align-items-center">
                        <img src={process.env.PUBLIC_URL + '/images/HE_THONG_GIAM_SAT/ANH_QXATRAN.png'} alt="HE_THONG_GIAM_SAT/ANH_QXATRAN" width="100%" />
                    </div>
                </div>
            </div>
        )
    }
}