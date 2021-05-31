import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// Home page
import Home from './components/page/Home';
// Quanly cap phep page
import QuanLyCapPhep from './components/page/QuanLyCapPhep/QuanLyCapPhep';
// Quanly cap phep / cong trinh
import QuanLyCapPhepNuocMatTongQuanCongTrinh from './components/page/QuanLyCapPhep/NuocMat/TongQuanCongTrinh';
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
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />

				{/* Quan ly cap phep */}
				<Route exact path="/quan-ly-cap-phep" component={QuanLyCapPhep} />

				{/* Nuoc Mat */}

				{/* Tao Moi GP NuocMat */}
				<Route exact path="/quan-ly-cap-phep/nuoc-mat/tao-moi" component={QuanLyCapPhepTaoGiayPhepNuocMat} />

				{/* Tong Quan Cong Trinh */}
				<Route exact path="/quan-ly-cap-phep/nuoc-mat/:pagename" component={QuanLyCapPhepNuocMatTongQuanCongTrinh} />				

				{/* Xem Thong Tin GP */}
				<Route exact path="/quan-ly-cap-phep/nuoc-mat/:pagename/xem-thong-tin-chung" component={QuanLyCapPhepNuocMatXemThongTinChung} />
				<Route exact path="/quan-ly-cap-phep/nuoc-mat/:pagename/xem-thong-tin-cong-trinh" component={QuanLyCapPhepNuocMatXemThongTinCongTrinh} />
				<Route exact path="/quan-ly-cap-phep/nuoc-mat/:pagename/xem-thong-tin-cong-trinh/chi-tiet" component={QuanLyCapPhepNuocMatThongTinCongTrinhChiTiet} />
				<Route exact path="/quan-ly-cap-phep/nuoc-mat/:pagename/giam-sat-khai-thac-su-dung" component={QuanLyCapPhepNuocMatGiamSatKhaiThacSuDung} />
				<Route exact path="/quan-ly-cap-phep/nuoc-mat/:pagename/chat-luong-nuoc-mat" component={QuanLyCapPhepNuocMatChatLuongNuocMat} />
				<Route exact path="/quan-ly-cap-phep/nuoc-mat/:pagename/ho-so-cap-phep" component={QuanLyCapPhepNuocMatHoSoCapPhep} />


				{/* Gioi thieu chung */}
				<Route exact path="/gioi-thieu-chung" component={GioiThieuChung} />

				<Route exact path="/he-thong-giam-sat" component={HeThongGiamSat} />

				{/* Bao Cao Bieu Mau */}
				<Route exact path="/bao-cao-bieu-mau" component={BaoCaoBieuMau} />
			</Switch>
		</BrowserRouter>
  );
}

export default App;
