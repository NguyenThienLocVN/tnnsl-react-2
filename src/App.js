import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// Authenticated login
import ProtectedRoute from './components/common/protectedRoute'
// Home page
import Home from './components/page/Home';
// Quanly cap phep page
import QuanLyCapPhep from './components/page/QuanLyCapPhep/QuanLyCapPhep';
// Quanly cap phep / cong trinh
import QuanLyCapPhepNuocMatCongTrinhThuyDien from './components/page/QuanLyCapPhep/NuocMat/CongTrinhThuyDien';
import QuanLyCapPhepNuocMatCongTrinhHoChua from './components/page/QuanLyCapPhep/NuocMat/CongTrinhHoChua';
import QuanLyCapPhepNuocMatCongTrinhTramBom from './components/page/QuanLyCapPhep/NuocMat/CongTrinhTramBom';
import QuanLyCapPhepNuocMatCongTrinhDap from './components/page/QuanLyCapPhep/NuocMat/CongTrinhDap';
import QuanLyCapPhepNuocMatCongTrinhCong from './components/page/QuanLyCapPhep/NuocMat/CongTrinhCong';
import QuanLyCapPhepNuocMatCongTrinhTramCapNuoc from './components/page/QuanLyCapPhep/NuocMat/CongTrinhTramCapNuoc';
import QuanLyCapPhepNuocMatCongTrinhNhaMayNuoc from './components/page/QuanLyCapPhep/NuocMat/CongTrinhNhaMayNuoc';

import QuanLyCapPhepTaoGiayPhepNuocMat from './components/page/QuanLyCapPhep/NuocMat/TaoMoiGiayPhep';

import QuanLyCapPhepNuocMatXemThongTinChung from './components/page/QuanLyCapPhep/NuocMat/ThongTinCongTrinh/XemThongTinChung';
import QuanLyCapPhepNuocMatXemThongTinCongTrinh from './components/page/QuanLyCapPhep/NuocMat/ThongTinCongTrinh/ThongTinCongTrinh';
import QuanLyCapPhepNuocMatThongTinCongTrinhChiTiet from './components/page/QuanLyCapPhep/NuocMat/ThongTinCongTrinh/ThongTinCongTrinhChiTiet';
import QuanLyCapPhepNuocMatGiamSatKhaiThacSuDung from './components/page/QuanLyCapPhep/NuocMat/ThongTinCongTrinh/GiamSatKhaiThacSuDung';
import QuanLyCapPhepNuocMatChatLuongNuocMat from './components/page/QuanLyCapPhep/NuocMat/ThongTinCongTrinh/ChatLuongNuocMat';
import QuanLyCapPhepNuocMatHoSoCapPhep from './components/page/QuanLyCapPhep/NuocMat/ThongTinCongTrinh/HoSoCapPhep';

// import Gioi thieu chung pages
import GioiThieuChung from './components/page/GioiThieuChung/GioiThieuChung';

import HeThongGiamSat from './components/page/HeThongGiamSat/HeThongGiamSat';

import BaoCaoBieuMau from './components/page/BaoCaoBieuMau/BaoCaoBieuMau';

function App() {
  return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<ProtectedRoute exact path="/" component={Home} />
				

				{/* Quan ly cap phep */}
				<ProtectedRoute exact path="/quan-ly-cap-phep" component={QuanLyCapPhep} />

				{/* Nuoc Mat */}

				{/* Tao Moi GP NuocMat */}
				<Route exact path="/quan-ly-cap-phep/nuoc-mat/tao-moi" component={QuanLyCapPhepTaoGiayPhepNuocMat} />
				

				{/* Cong Trinh Thuy Dien */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien" component={QuanLyCapPhepNuocMatCongTrinhThuyDien} />

				{/* Cong Trinh Ho Chua */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-chua" component={QuanLyCapPhepNuocMatCongTrinhHoChua} />

				{/* Cong Trinh Tram Bom */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-bom" component={QuanLyCapPhepNuocMatCongTrinhTramBom} />

				{/* Cong Trinh Dap */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi" component={QuanLyCapPhepNuocMatCongTrinhDap} />

				{/* Cong Trinh Cong */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong" component={QuanLyCapPhepNuocMatCongTrinhCong} />

				{/* Cong Trinh Tram Cap Nuoc */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc" component={QuanLyCapPhepNuocMatCongTrinhTramCapNuoc} />

				{/* Cong Trinh Nha May Nuoc */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc" component={QuanLyCapPhepNuocMatCongTrinhNhaMayNuoc} />

				{/* Xem Thong Tin GP */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/:pagename/xem-thong-tin-chung/:id" component={QuanLyCapPhepNuocMatXemThongTinChung} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/:pagename/xem-thong-tin-cong-trinh/:id" component={QuanLyCapPhepNuocMatXemThongTinCongTrinh} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/:pagename/xem-thong-tin-cong-trinh/chi-tiet/:id" component={QuanLyCapPhepNuocMatThongTinCongTrinhChiTiet} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/:pagename/giam-sat-khai-thac-su-dung/:id" component={QuanLyCapPhepNuocMatGiamSatKhaiThacSuDung} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/:pagename/chat-luong-nuoc-mat/:id" component={QuanLyCapPhepNuocMatChatLuongNuocMat} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/:pagename/ho-so-cap-phep/:id" component={QuanLyCapPhepNuocMatHoSoCapPhep} />


				{/* Gioi thieu chung */}
				<ProtectedRoute exact path="/gioi-thieu-chung" component={GioiThieuChung} />

				<ProtectedRoute exact path="/he-thong-giam-sat" component={HeThongGiamSat} />

				{/* Bao Cao Bieu Mau */}
				<ProtectedRoute exact path="/bao-cao-bieu-mau" component={BaoCaoBieuMau} />
			</Switch>
		</BrowserRouter>
  );
}

export default App;
