import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './Shared/Register';
import Login from './Shared/Login';

// Authenticated login
import ProtectedRoute from './Shared/protectedRoute'

// Home page
import Home from './TrangChu/Home';

// Quan ly cap phep
import QuanLyCapPhep from './QuanLyCapPhep/QuanLyCapPhep';

// Quan ly cap phep nuoc mat
import QuanLyCapPhepNuocMatCongTrinhThuyDien from './QuanLyCapPhep/NuocMat/CongTrinhThuyDien';
import QuanLyCapPhepNuocMatCongTrinhHoChua from './QuanLyCapPhep/NuocMat/CongTrinhHoChua';
import QuanLyCapPhepNuocMatCongTrinhTramBom from './QuanLyCapPhep/NuocMat/CongTrinhTramBom';
import QuanLyCapPhepNuocMatCongTrinhDap from './QuanLyCapPhep/NuocMat/CongTrinhDap';
import QuanLyCapPhepNuocMatCongTrinhCong from './QuanLyCapPhep/NuocMat/CongTrinhCong';
import QuanLyCapPhepNuocMatCongTrinhTramCapNuoc from './QuanLyCapPhep/NuocMat/CongTrinhTramCapNuoc';
import QuanLyCapPhepNuocMatCongTrinhNhaMayNuoc from './QuanLyCapPhep/NuocMat/CongTrinhNhaMayNuoc';

// Xem thong tin cong trinh nuoc mat
import QuanLyCapPhepNuocMatThongTinXemThongTinChung from './QuanLyCapPhep/NuocMat/ThongTinCongTrinh/XemThongTinChung';
import QuanLyCapPhepNuocMatThongTinXemThongTinCongTrinh from './QuanLyCapPhep/NuocMat/ThongTinCongTrinh/ThongTinCongTrinh';
import QuanLyCapPhepNuocMatThongTinThongTinCongTrinhChiTiet from './QuanLyCapPhep/NuocMat/ThongTinCongTrinh/ThongTinCongTrinhChiTiet';
import QuanLyCapPhepNuocMatThongTinGiamSatKhaiThacSuDung from './QuanLyCapPhep/NuocMat/ThongTinCongTrinh/GiamSatKhaiThacSuDung';
import QuanLyCapPhepNuocMatThongTinChatLuongNuocMat from './QuanLyCapPhep/NuocMat/ThongTinCongTrinh/ChatLuongNuocMat';
import QuanLyCapPhepNuocMatThongTinHoSoCapPhep from './QuanLyCapPhep/NuocMat/ThongTinCongTrinh/HoSoCapPhep';

// Quan ly cap phep khai thac nuoc duoi dat
import QuanLyCapPhepNuocDuoiDatKhaiThacGiaHanDieuChinh from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/GiaHanDieuChinh';
import QuanLyCapPhepNuocDuoiDatKhaiThac from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/KhaiThac';
import QuanLyCapPhepNuocDuoiDatKhaiThacCapMoi from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/CapMoi';
import QuanLyCapPhepNuocDuoiDatKhaiThacQuanLyGiayPhep from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/QuanLyCapPhep';
import QuanLyCapPhepNuocDuoiDatKhaiThacSuaGiayPhep from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/SuaGiayPhep';
import QuanLyCapPhepNuocDuoiDatKhaiThacTheoDoiGiayPhep from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/TheoDoi';


// Quan ly cap phep tham do nuoc duoi dat
import QuanLyCapPhepThamDoGiaHanDieuChinhNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/GiaHanDieuChinh';
import QuanLyCapPhepThamDoNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/ThamDo';
import QuanLyCapPhepThamDoCapMoiNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/CapMoi';
import QuanLyCapPhepThamDoQuanLyGiayPhepNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/QuanLyCapPhep';
import QuanLyCapPhepThamDoSuaGiayPhepNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepThamDoNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/TheoDoi';

// Quan ly cap phep nuoc duoi dat cong trinh khac
import QuanLyCapPhepNuocDuoiDatCongTrinhKhac from './QuanLyCapPhep/NuocDuoiDat/CongTrinhKhac';

// Quanly cap phep hanh nghe khoan nuoc duoi dat
import QuanLyCapPhepKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/HanhNgheKhoan';
import QuanLyCapPhepGiaHanDieuChinhKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/CapMoi';
import QuanLyCapPhepQuanLyCapMoiKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/TheoDoi';

// Gioi thieu chung
import GioiThieuChung from './GioiThieuChung/GioiThieuChung';

// He thong giam sat
import HeThongGiamSat from './HeThongGiamSat/HeThongGiamSat';

// Bao cao bieu mau
import BaoCaoBieuMau from './BaoCaoBieuMau/BaoCaoBieuMau';


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
				
				{/* Xem Thong Tin GP Nuoc Mat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/xem-thong-tin-chung/:id" component={QuanLyCapPhepNuocMatThongTinXemThongTinChung} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/xem-thong-tin-cong-trinh/:id" component={QuanLyCapPhepNuocMatThongTinXemThongTinCongTrinh} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/xem-thong-tin-cong-trinh/chi-tiet/:id" component={QuanLyCapPhepNuocMatThongTinThongTinCongTrinhChiTiet} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/giam-sat-khai-thac-su-dung/:id" component={QuanLyCapPhepNuocMatThongTinGiamSatKhaiThacSuDung} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/chat-luong-nuoc-mat/:id" component={QuanLyCapPhepNuocMatThongTinChatLuongNuocMat} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-so-cap-phep/:id" component={QuanLyCapPhepNuocMatThongTinHoSoCapPhep} />

				{/* Nuoc Duoi Dat */}





				{/* khai thac */}

				{/* Dieu Chinh Khai Thac Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/gia-han-dieu-chinh" component={QuanLyCapPhepNuocDuoiDatKhaiThacGiaHanDieuChinh} />

				{/* Khai Thac Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac" component={QuanLyCapPhepNuocDuoiDatKhaiThac} />

				{/* Cap Moi Khai Thac Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/cap-moi" component={QuanLyCapPhepNuocDuoiDatKhaiThacCapMoi} />

				{/* Quan Ly Cap Moi Khai Thac Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/quan-ly-cap-moi" component={QuanLyCapPhepNuocDuoiDatKhaiThacQuanLyGiayPhep} />

				{/* Quan Ly Cap Moi Chinh Sua Giay Phep Khai Thac Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/chinh-sua/:id_gp" component={QuanLyCapPhepNuocDuoiDatKhaiThacSuaGiayPhep} />

				{/* Quan Ly Cap Moi Theo Doi Giay Phep Khai Thac Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/theo-doi/:id_gp" component={QuanLyCapPhepNuocDuoiDatKhaiThacTheoDoiGiayPhep} />
				






				{/* Tham Do */}
				
				{/* Dieu Chinh Tham Do Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/gia-han-dieu-chinh" component={QuanLyCapPhepThamDoGiaHanDieuChinhNDD} />

				{/* Tham Do Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do" component={QuanLyCapPhepThamDoNDD} />

				{/* Cap Moi Tham Do Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/cap-moi" component={QuanLyCapPhepThamDoCapMoiNDD} />

				{/* Quan Ly Cap Moi Tham Do Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/quan-ly-cap-moi" component={QuanLyCapPhepThamDoQuanLyGiayPhepNDD} />
				
				{/* Quan Ly Cap Moi Chinh Sua Giay Phep Tham Do Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/chinh-sua/:id_gp" component={QuanLyCapPhepThamDoSuaGiayPhepNDD} />

				{/* Quan Ly Cap Moi Theo Doi Giay Phep Tham Do Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepThamDoNDD} />






				{/* Hanh Nghe Khoan */}

				{/* Gia Han Dieu Chinh Hanh Nghe Khoan Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhKhoanNDD} />

				{/* Hanh Nghe Khoan Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan" component={QuanLyCapPhepKhoanNDD} />

				{/* Cap Moi Hanh Nghe Khoan Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/cap-moi" component={QuanLyCapPhepCapMoiKhoanNDD} />

				{/* Quan Ly Cap Moi Hanh Nghe Khoan Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiKhoanNDD} />

				{/* Quan Ly Cap Moi Chinh Sua Giay Phep Tham Do Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepKhoanNDD} />

				{/* Quan Ly Cap Moi Theo Doi Giay Phep Khai Thac Nuoc Duoi Dat */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepKhoanNDD} />







				{/* Nuoc Duoi Dat Cong Trinh Khac*/}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac" component={QuanLyCapPhepNuocDuoiDatCongTrinhKhac} />








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
