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

// <==================================================Quan ly cap phep nuoc mat=================================================================================>

// <==================================================Quan ly cap phep nuoc mat - Thuy Dien=================================================================================>

import QuanLyCapPhepNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/ThuyDien';
import QuanLyCapPhepGiaHanDieuChinhNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/TheoDoi';



// <==================================================Quan ly cap phep nuoc mat - Thuy Dien=================================================================================>
import QuanLyCapPhepNuocMatCongTrinhHoChua from './QuanLyCapPhep/NuocMat/CongTrinhHoChua';
import QuanLyCapPhepNuocMatCongTrinhTramBom from './QuanLyCapPhep/NuocMat/CongTrinhTramBom';
import QuanLyCapPhepNuocMatCongTrinhDap from './QuanLyCapPhep/NuocMat/CongTrinhDap';
import QuanLyCapPhepNuocMatCongTrinhCong from './QuanLyCapPhep/NuocMat/CongTrinhCong';
import QuanLyCapPhepNuocMatCongTrinhTramCapNuoc from './QuanLyCapPhep/NuocMat/CongTrinhTramCapNuoc';
import QuanLyCapPhepNuocMatCongTrinhNhaMayNuoc from './QuanLyCapPhep/NuocMat/CongTrinhNhaMayNuoc';

// <==================================================Xem thong tin cong trinh nuoc mat=================================================================================>

import QuanLyCapPhepNuocMatThongTinXemThongTinChung from './QuanLyCapPhep/NuocMat/ThongTinCongTrinh/XemThongTinChung';
import QuanLyCapPhepNuocMatThongTinXemThongTinCongTrinh from './QuanLyCapPhep/NuocMat/ThongTinCongTrinh/ThongTinCongTrinh';
import QuanLyCapPhepNuocMatThongTinThongTinCongTrinhChiTiet from './QuanLyCapPhep/NuocMat/ThongTinCongTrinh/ThongTinCongTrinhChiTiet';
import QuanLyCapPhepNuocMatThongTinGiamSatKhaiThacSuDung from './QuanLyCapPhep/NuocMat/ThongTinCongTrinh/GiamSatKhaiThacSuDung';
import QuanLyCapPhepNuocMatThongTinChatLuongNuocMat from './QuanLyCapPhep/NuocMat/ThongTinCongTrinh/ChatLuongNuocMat';
import QuanLyCapPhepNuocMatThongTinHoSoCapPhep from './QuanLyCapPhep/NuocMat/ThongTinCongTrinh/HoSoCapPhep';

// <==================================================Quan ly cap phep khai thac nuoc duoi dat=================================================================================>

import QuanLyCapPhepKhaiThacGiaHanDieuChinhNDD from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/GiaHanDieuChinh';
import QuanLyCapPhepKhaiThacNDD from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/KhaiThac';
import QuanLyCapPhepKhaiThacCapMoiNDD from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/CapMoi';
import QuanLyCapPhepKhaiThacQuanLyGiayPhepNDD from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/QuanLyCapPhep';
import QuanLyCapPhepKhaiThacSuaGiayPhepNDD from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/SuaGiayPhep';
import QuanLyCapPhepKhaiThacTheoDoiGiayPhepNDD from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/TheoDoi';

// <==================================================Quan ly cap phep tham do nuoc duoi dat=================================================================================>

import QuanLyCapPhepThamDoGiaHanDieuChinhNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/GiaHanDieuChinh';
import QuanLyCapPhepThamDoNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/ThamDo';
import QuanLyCapPhepThamDoCapMoiNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/CapMoi';
import QuanLyCapPhepThamDoQuanLyGiayPhepNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/QuanLyCapPhep';
import QuanLyCapPhepThamDoSuaGiayPhepNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepThamDoNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/TheoDoi';

// <==================================================Quanly cap phep hanh nghe khoan nuoc duoi dat=================================================================================>

import QuanLyCapPhepKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/HanhNgheKhoan';
import QuanLyCapPhepGiaHanDieuChinhKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/CapMoi';
import QuanLyCapPhepQuanLyCapMoiKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/TheoDoi';

// <==================================================Quanly cap phep cong trinh khac nuoc duoi dat=================================================================================>

import QuanLyCapPhepCongTrinhKhacNDD from './QuanLyCapPhep/NuocDuoiDat/CongTrinhKhac/CongTrinhKhac';
import QuanLyCapPhepGiaHanDieuChinhCongTrinhKhacNDD from './QuanLyCapPhep/NuocDuoiDat/CongTrinhKhac/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiCongTrinhKhacNDD from './QuanLyCapPhep/NuocDuoiDat/CongTrinhKhac/CapMoi';
import QuanLyCapPhepQuanLyCapMoiCongTrinhKhacNDD from './QuanLyCapPhep/NuocDuoiDat/CongTrinhKhac/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepCongTrinhKhacNDD from './QuanLyCapPhep/NuocDuoiDat/CongTrinhKhac/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepCongTrinhKhacNDD from './QuanLyCapPhep/NuocDuoiDat/CongTrinhKhac/TheoDoi';

// <==================================================Quanly cap phep xathai khu/cum cn tap trung=================================================================================>

import QuanLyCapPhepXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/NuocMat/ThuyDien/ThuyDien';
import QuanLyCapPhepGiaHanDieuChinhXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/CapMoi';
import QuanLyCapPhepQuanLyCapMoiXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/TheoDoi';








// <==================================================Gioi thieu chung=================================================================================>

import GioiThieuChung from './GioiThieuChung/GioiThieuChung';

// <==================================================He thong giam sat=================================================================================>

import HeThongGiamSat from './HeThongGiamSat/HeThongGiamSat';

// <==================================================Bao cao bieu mau=================================================================================>

import BaoCaoBieuMau from './BaoCaoBieuMau/BaoCaoBieuMau';


function App() {
  return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<ProtectedRoute exact path="/" component={Home} />
				

				{/* ==================================================Quan ly cap phep================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep" component={QuanLyCapPhep} />

				{/* ==================================================Nuoc Mat================================================== */}

				{/* ==================================================Cong Trinh Thuy Dien================================================== */}

				{/* ==================================================Gia Han Dieu Chinh Nuoc Mat - Thuy Dien================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien" component={QuanLyCapPhepNuocMatThuyDien} />

				{/* ==================================================Nuoc Mat - Thuy Dien================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatThuyDien} />

				{/* ==================================================Cap Moi Nuoc Mat - Thuy Dien================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/cap-moi" component={QuanLyCapPhepCapMoiNuocMatThuyDien} />

				{/* ==================================================Quan Ly Cap Moi Nuoc Mat - Thuy Dien================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatThuyDien} />

				{/* ==================================================Quan Ly Cap Moi Chinh Sua Giay Phep Nuoc Mat - Thuy Dien================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatThuyDien} />

				{/* ==================================================Quan Ly Cap Moi Theo Doi Giay Phep Nuoc Mat - Thuy Dien================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatThuyDien} />




				{/* ==================================================Cong Trinh Ho Chua================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-chua" component={QuanLyCapPhepNuocMatCongTrinhHoChua} />

				{/* ==================================================Cong Trinh Tram Bom================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-bom" component={QuanLyCapPhepNuocMatCongTrinhTramBom} />

				{/* ==================================================Cong Trinh Dap================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi" component={QuanLyCapPhepNuocMatCongTrinhDap} />

				{/* ==================================================Cong Trinh Cong================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong" component={QuanLyCapPhepNuocMatCongTrinhCong} />

				{/* ==================================================Cong Trinh Tram Cap Nuoc================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc" component={QuanLyCapPhepNuocMatCongTrinhTramCapNuoc} />

				{/* ==================================================Cong Trinh Nha May Nuoc================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc" component={QuanLyCapPhepNuocMatCongTrinhNhaMayNuoc} />
				
				{/* ==================================================Xem Thong Tin GP Nuoc Mat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/xem-thong-tin-chung/:id" component={QuanLyCapPhepNuocMatThongTinXemThongTinChung} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/xem-thong-tin-cong-trinh/:id" component={QuanLyCapPhepNuocMatThongTinXemThongTinCongTrinh} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/xem-thong-tin-cong-trinh/chi-tiet/:id" component={QuanLyCapPhepNuocMatThongTinThongTinCongTrinhChiTiet} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/giam-sat-khai-thac-su-dung/:id" component={QuanLyCapPhepNuocMatThongTinGiamSatKhaiThacSuDung} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/chat-luong-nuoc-mat/:id" component={QuanLyCapPhepNuocMatThongTinChatLuongNuocMat} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-so-cap-phep/:id" component={QuanLyCapPhepNuocMatThongTinHoSoCapPhep} />




				{/* ==================================================Nuoc Duoi Dat================================================== */}

				{/* ==================================================khai thac================================================== */}

				{/* ==================================================Dieu Chinh Khai Thac Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/gia-han-dieu-chinh" component={QuanLyCapPhepKhaiThacGiaHanDieuChinhNDD} />

				{/* ==================================================Khai Thac Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac" component={QuanLyCapPhepKhaiThacNDD} />

				{/* ==================================================Cap Moi Khai Thac Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/cap-moi" component={QuanLyCapPhepKhaiThacCapMoiNDD} />

				{/* ==================================================Quan Ly Cap Moi Khai Thac Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/quan-ly-cap-moi" component={QuanLyCapPhepKhaiThacQuanLyGiayPhepNDD} />

				{/* ==================================================Quan Ly Cap Moi Chinh Sua Giay Phep Khai Thac Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/chinh-sua/:id_gp" component={QuanLyCapPhepKhaiThacSuaGiayPhepNDD} />

				{/* ==================================================Quan Ly Cap Moi Theo Doi Giay Phep Khai Thac Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/theo-doi/:id_gp" component={QuanLyCapPhepKhaiThacTheoDoiGiayPhepNDD} />
				






				{/* ==================================================Tham Do================================================== */}
				
				{/* ==================================================Dieu Chinh Tham Do Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/gia-han-dieu-chinh" component={QuanLyCapPhepThamDoGiaHanDieuChinhNDD} />

				{/* ==================================================Tham Do Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do" component={QuanLyCapPhepThamDoNDD} />

				{/* ==================================================Cap Moi Tham Do Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/cap-moi" component={QuanLyCapPhepThamDoCapMoiNDD} />

				{/* ==================================================Quan Ly Cap Moi Tham Do Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/quan-ly-cap-moi" component={QuanLyCapPhepThamDoQuanLyGiayPhepNDD} />
				
				{/* ==================================================Quan Ly Cap Moi Chinh Sua Giay Phep Tham Do Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/chinh-sua/:id_gp" component={QuanLyCapPhepThamDoSuaGiayPhepNDD} />

				{/* ==================================================Quan Ly Cap Moi Theo Doi Giay Phep Tham Do Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepThamDoNDD} />






				{/* ==================================================Hanh Nghe Khoan================================================== */}

				{/* ==================================================Gia Han Dieu Chinh Hanh Nghe Khoan Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhKhoanNDD} />

				{/* ==================================================Hanh Nghe Khoan Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan" component={QuanLyCapPhepKhoanNDD} />

				{/* ==================================================Cap Moi Hanh Nghe Khoan Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/cap-moi" component={QuanLyCapPhepCapMoiKhoanNDD} />

				{/* ==================================================Quan Ly Cap Moi Hanh Nghe Khoan Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiKhoanNDD} />

				{/* ==================================================Quan Ly Cap Moi Chinh Sua Giay Phep Khoan Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepKhoanNDD} />

				{/* ==================================================Quan Ly Cap Moi Theo Doi Giay Phep Khoan Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepKhoanNDD} />







				{/* ==================================================Nuoc Duoi Dat Cong Trinh Khac================================================== */}
				{/* ==================================================Gia Han Dieu Chinh Cong Trinh Khac Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhCongTrinhKhacNDD} />

				{/* ==================================================Cong Trinh Khac Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac" component={QuanLyCapPhepCongTrinhKhacNDD} />

				{/* ==================================================Cap Moi Cong Trinh Khac Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac/cap-moi" component={QuanLyCapPhepCapMoiCongTrinhKhacNDD} />

				{/* ==================================================Quan Ly Cap Moi Cong Trinh Khac Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiCongTrinhKhacNDD} />

				{/* ==================================================Quan Ly Cap Moi Chinh Sua Giay Phep Cong Trinh Khac Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepCongTrinhKhacNDD} />

				{/* ==================================================Quan Ly Cap Moi Theo Doi Giay Phep Cong Trinh Khac Nuoc Duoi Dat================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepCongTrinhKhacNDD} />




				{/* ==================================================Xa Thai================================================== */}

				{/* ==================================================Gia Han Dieu Chinh Xa Thai Khu / Cum CN Tap Chung================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-cum-cong-nghiep-tap-trung/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhXaThaiKhuCumCNTapTrung} />

				{/* ==================================================Xa Thai Khu / Cum CN Tap Chung================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-cum-cong-nghiep-tap-trung" component={QuanLyCapPhepXaThaiKhuCumCNTapTrung} />

				{/* ==================================================Cap Moi Xa Thai Khu / Cum CN Tap Chung================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-cum-cong-nghiep-tap-trung/cap-moi" component={QuanLyCapPhepCapMoiXaThaiKhuCumCNTapTrung} />

				{/* ==================================================Quan Ly Cap Moi Xa Thai Khu / Cum CN Tap Chung================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-cum-cong-nghiep-tap-trung/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiXaThaiKhuCumCNTapTrung} />

				{/* ==================================================Quan Ly Cap Moi Chinh Sua Giay Phep Xa Thai Khu / Cum CN Tap Chung================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-cum-cong-nghiep-tap-trung/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepXaThaiKhuCumCNTapTrung} />

				{/* ==================================================Quan Ly Cap Moi Theo Doi Giay Phep Xa Thai Khu / Cum CN Tap Chung================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-cum-cong-nghiep-tap-trung/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepXaThaiKhuCumCNTapTrung} />




				{/* ==================================================Gioi thieu chung================================================== */}
				<ProtectedRoute exact path="/gioi-thieu-chung" component={GioiThieuChung} />

				<ProtectedRoute exact path="/he-thong-giam-sat" component={HeThongGiamSat} />

				{/* ==================================================Bao Cao Bieu Mau================================================== */}
				<ProtectedRoute exact path="/bao-cao-bieu-mau" component={BaoCaoBieuMau} />
			</Switch>
		</BrowserRouter>
  );
}

export default App;
