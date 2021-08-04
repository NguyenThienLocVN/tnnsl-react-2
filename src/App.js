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

// <==================================================Quan ly cap phep nuoc mat - Ho Chua=================================================================================>

import QuanLyCapPhepNuocMatHoChua from './QuanLyCapPhep/NuocMat/HoChua/HoChua';
import QuanLyCapPhepGiaHanDieuChinhNuocMatHoChua from './QuanLyCapPhep/NuocMat/HoChua/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatHoChua from './QuanLyCapPhep/NuocMat/HoChua/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatHoChua from './QuanLyCapPhep/NuocMat/HoChua/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatHoChua from './QuanLyCapPhep/NuocMat/HoChua/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatHoChua from './QuanLyCapPhep/NuocMat/HoChua/TheoDoi';

// <==================================================Quan ly cap phep nuoc mat - Tram Bom=================================================================================>

import QuanLyCapPhepNuocMatTramBom from './QuanLyCapPhep/NuocMat/TramBom/TramBom';
import QuanLyCapPhepGiaHanDieuChinhNuocMatTramBom from './QuanLyCapPhep/NuocMat/TramBom/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatTramBom from './QuanLyCapPhep/NuocMat/TramBom/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatTramBom from './QuanLyCapPhep/NuocMat/TramBom/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatTramBom from './QuanLyCapPhep/NuocMat/TramBom/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatTramBom from './QuanLyCapPhep/NuocMat/TramBom/TheoDoi';

// <==================================================Quan ly cap phep nuoc mat - Dap Thuy Loi=================================================================================>

import QuanLyCapPhepNuocMatDapThuyLoi from './QuanLyCapPhep/NuocMat/DapThuyLoi/DapThuyLoi';
import QuanLyCapPhepGiaHanDieuChinhNuocMatDapThuyLoi from './QuanLyCapPhep/NuocMat/DapThuyLoi/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatDapThuyLoi from './QuanLyCapPhep/NuocMat/DapThuyLoi/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatDapThuyLoi from './QuanLyCapPhep/NuocMat/DapThuyLoi/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatDapThuyLoi from './QuanLyCapPhep/NuocMat/DapThuyLoi/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatDapThuyLoi from './QuanLyCapPhep/NuocMat/DapThuyLoi/TheoDoi';

// <==================================================Quan ly cap phep nuoc mat - Cong=================================================================================>

import QuanLyCapPhepNuocMatCong from './QuanLyCapPhep/NuocMat/Cong/Cong';
import QuanLyCapPhepGiaHanDieuChinhNuocMatCong from './QuanLyCapPhep/NuocMat/Cong/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatCong from './QuanLyCapPhep/NuocMat/Cong/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatCong from './QuanLyCapPhep/NuocMat/Cong/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatCong from './QuanLyCapPhep/NuocMat/Cong/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatCong from './QuanLyCapPhep/NuocMat/Cong/TheoDoi';

// <==================================================Quan ly cap phep nuoc mat - Tram Cap Nuoc=================================================================================>

import QuanLyCapPhepNuocMatTramCapNuoc from './QuanLyCapPhep/NuocMat/TramCapNuoc/TramCapNuoc';
import QuanLyCapPhepGiaHanDieuChinhNuocMatTramCapNuoc from './QuanLyCapPhep/NuocMat/TramCapNuoc/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatTramCapNuoc from './QuanLyCapPhep/NuocMat/TramCapNuoc/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatTramCapNuoc from './QuanLyCapPhep/NuocMat/TramCapNuoc/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatTramCapNuoc from './QuanLyCapPhep/NuocMat/TramCapNuoc/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatTramCapNuoc from './QuanLyCapPhep/NuocMat/TramCapNuoc/TheoDoi';

// <==================================================Quan ly cap phep nuoc mat - Nha May Nuoc=================================================================================>

import QuanLyCapPhepNuocMatNhaMayNuoc from './QuanLyCapPhep/NuocMat/NhaMayNuoc/NhaMayNuoc';
import QuanLyCapPhepGiaHanDieuChinhNuocMatNhaMayNuoc from './QuanLyCapPhep/NuocMat/NhaMayNuoc/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatNhaMayNuoc from './QuanLyCapPhep/NuocMat/NhaMayNuoc/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatNhaMayNuoc from './QuanLyCapPhep/NuocMat/NhaMayNuoc/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatNhaMayNuoc from './QuanLyCapPhep/NuocMat/NhaMayNuoc/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatNhaMayNuoc from './QuanLyCapPhep/NuocMat/NhaMayNuoc/TheoDoi';



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

import QuanLyCapPhepXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/KhuCumCNTapTrung';
import QuanLyCapPhepGiaHanDieuChinhXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/CapMoi';
import QuanLyCapPhepQuanLyCapMoiXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/TheoDoi';








// <==================================================Gioi thieu chung=================================================================================>

import GioiThieuChung from './GioiThieuChung/GioiThieuChung';


// <==================================================He thong quan trac=================================================================================>

import HeThongQuanTrac from './HeThongQuanTrac/HeThongQuanTrac';

// <==================================================He thong quan trac - giam sat mua=================================================================================>

import HeThongQuanTracNuocMatMua from './HeThongQuanTrac/QuanTracMua/Mua';

// <==================================================He thong quan trac - giam sat ho chua=================================================================================>

import HeThongQuanTracNuocMatHoChua from './HeThongQuanTrac/QuanTracHo/Ho';

// <==================================================He thong quan trac - luu luong den ho=================================================================================>

import HeThongQuanTracNuocMatLuuLuongDenHo from './HeThongQuanTrac/QuanTracLuuLuongDenHo/LuuLuongDenHo';

// <==================================================He thong quan trac - luu luong xa qua nha may=================================================================================>

import HeThongQuanTracNuocMatLuuLuongXaQuaNhaMay from './HeThongQuanTrac/QuanTracLuuLuongXaQuaNhaMay/LuuLuongXaQuaNhaMay';

// <==================================================He thong quan trac - luu luong xa tran=================================================================================>

import HeThongQuanTracNuocMatLuuLuongXaTran from './HeThongQuanTrac/QuanTracLuuLuongXaTran/LuuLuongXaTran';

// <==================================================He thong quan trac - luu luong xa toi thieu=================================================================================>
import HeThongQuanTracNuocMatLuuLuongXaToiThieu from './HeThongQuanTrac/QuanTracLuuLuongXaToiThieu/LuuLuongXaToiThieu';

// <==================================================He thong giam sat=================================================================================>

import HeThongGiamSat from './HeThongGiamSat/HeThongGiamSat';

// <==================================================He thong giam sat phat dienlon hon 2mw=================================================================================>

import HeThongGiamSatPhatDienLonHon2MW from './HeThongGiamSat/PhatDienLonHon2MW/PhatDienLonHon2MW';

// <==================================================He thong giam sat phat dienlon hon 2mw=================================================================================>

import HeThongGiamSatKhaiThacNDD from './HeThongGiamSat/KhaiThacNDD/KhaiThacNDD';

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

				{/* ==================================================Gia Han Dieu Chinh Nuoc Mat - Ho Chua================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-chua" component={QuanLyCapPhepNuocMatHoChua} />

				{/* ==================================================Nuoc Mat - Ho Chua================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-chua/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatHoChua} />

				{/* ==================================================Cap Moi Nuoc Mat - Ho Chua================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-chua/cap-moi" component={QuanLyCapPhepCapMoiNuocMatHoChua} />

				{/* ==================================================Quan Ly Cap Moi Nuoc Mat - Ho Chua================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-chua/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatHoChua} />

				{/* ==================================================Quan Ly Cap Moi Chinh Sua Giay Phep Nuoc Mat - Ho Chua================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-chua/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatHoChua} />

				{/* ==================================================Quan Ly Cap Moi Theo Doi Giay Phep Nuoc Mat - Ho Chua================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-chua/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatHoChua} />


				{/* ==================================================Cong Trinh Tram Bom================================================== */}

				{/* ==================================================Gia Han Dieu Chinh Nuoc Mat - Tram Bom================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-bom" component={QuanLyCapPhepNuocMatTramBom} />

				{/* ==================================================Nuoc Mat - Tram Bom================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-bom/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatTramBom} />

				{/* ==================================================Cap Moi Nuoc Mat - Tram Bom================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-bom/cap-moi" component={QuanLyCapPhepCapMoiNuocMatTramBom} />

				{/* ==================================================Quan Ly Cap Moi Nuoc Mat - Tram Bom================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-bom/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatTramBom} />

				{/* ==================================================Quan Ly Cap Moi Chinh Sua Giay Phep Nuoc Mat - Tram Bom================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-bom/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatTramBom} />

				{/* ==================================================Quan Ly Cap Moi Theo Doi Giay Phep Nuoc Mat - Tram Bom================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-bom/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatTramBom} />


				{/* ==================================================Cong Trinh Dap Thuy Loi================================================== */}

				{/* ==================================================Gia Han Dieu Chinh Nuoc Mat - Dap Thuy Loi================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi" component={QuanLyCapPhepNuocMatDapThuyLoi} />

				{/* ==================================================Nuoc Mat - Dap Thuy Loi================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatDapThuyLoi} />

				{/* ==================================================Cap Moi Nuoc Mat - Dap Thuy Loi================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi/cap-moi" component={QuanLyCapPhepCapMoiNuocMatDapThuyLoi} />

				{/* ==================================================Quan Ly Cap Moi Nuoc Mat - Dap Thuy Loi================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatDapThuyLoi} />

				{/* ==================================================Quan Ly Cap Moi Chinh Sua Giay Phep Nuoc Mat - Dap Thuy Loi================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatDapThuyLoi} />

				{/* ==================================================Quan Ly Cap Moi Theo Doi Giay Phep Nuoc Mat - Dap Thuy Loi================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatDapThuyLoi} />


				{/* ==================================================Cong Trinh Cong================================================== */}

				{/* ==================================================Gia Han Dieu Chinh Nuoc Mat - Cong================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong" component={QuanLyCapPhepNuocMatCong} />

				{/* ==================================================Nuoc Mat - Cong================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatCong} />

				{/* ==================================================Cap Moi Nuoc Mat - Cong================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong/cap-moi" component={QuanLyCapPhepCapMoiNuocMatCong} />

				{/* ==================================================Quan Ly Cap Moi Nuoc Mat - Cong================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatCong} />

				{/* ==================================================Quan Ly Cap Moi Chinh Sua Giay Phep Nuoc Mat - Cong================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatCong} />

				{/* ==================================================Quan Ly Cap Moi Theo Doi Giay Phep Nuoc Mat - Cong================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatCong} />

				{/* ==================================================Cong Trinh Tram Cap Nuoc================================================== */}

				{/* ==================================================Gia Han Dieu Chinh Nuoc Mat - Tram Cap Nuoc================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc" component={QuanLyCapPhepNuocMatTramCapNuoc} />

				{/* ==================================================Nuoc Mat - Tram Cap Nuoc================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatTramCapNuoc} />

				{/* ==================================================Cap Moi Nuoc Mat - Tram Cap Nuoc================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc/cap-moi" component={QuanLyCapPhepCapMoiNuocMatTramCapNuoc} />

				{/* ==================================================Quan Ly Cap Moi Nuoc Mat - Tram Cap Nuoc================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatTramCapNuoc} />

				{/* ==================================================Quan Ly Cap Moi Chinh Sua Giay Phep Nuoc Mat - Tram Cap Nuoc================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatTramCapNuoc} />

				{/* ==================================================Quan Ly Cap Moi Theo Doi Giay Phep Nuoc Mat - Tram Cap Nuoc================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatTramCapNuoc} />

				{/* ==================================================Cong Trinh Nha May Nuoc================================================== */}

				{/* ==================================================Gia Han Dieu Chinh Nuoc Mat - Nha May Nuoc================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc" component={QuanLyCapPhepNuocMatNhaMayNuoc} />

				{/* ==================================================Nuoc Mat - Nha May Nuoc================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatNhaMayNuoc} />

				{/* ==================================================Cap Moi Nuoc Mat - Nha May Nuoc================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc/cap-moi" component={QuanLyCapPhepCapMoiNuocMatNhaMayNuoc} />

				{/* ==================================================Quan Ly Cap Moi Nuoc Mat - Nha May Nuoc================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatNhaMayNuoc} />

				{/* ==================================================Quan Ly Cap Moi Chinh Sua Giay Phep Nuoc Mat - Nha May Nuoc================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatNhaMayNuoc} />

				{/* ==================================================Quan Ly Cap Moi Theo Doi Giay Phep Nuoc Mat - Nha May Nuoc================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatNhaMayNuoc} />



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


				{/* ==================================================He Thong Quan Trac================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac" component={HeThongQuanTrac} />

				{/* ==================================================He Thong Quan Trac Mua================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/mua" component={HeThongQuanTracNuocMatMua} />

				{/* ==================================================He Thong Quan Trac Ho Chua================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/ho-chua" component={HeThongQuanTracNuocMatHoChua} />

				{/* ==================================================He Thong Quan Trac Ho Chua================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-den-ho" component={HeThongQuanTracNuocMatLuuLuongDenHo} />

				{/* ==================================================He Thong Quan Trac Ho Chua================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-qua-nha-may" component={HeThongQuanTracNuocMatLuuLuongXaQuaNhaMay} />

				{/* ==================================================He Thong Quan Trac Xa Tran================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-tran" component={HeThongQuanTracNuocMatLuuLuongXaTran} />

				{/* ==================================================He Thong Quan Trac Xa Toi Thieu================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-toi-thieu" component={HeThongQuanTracNuocMatLuuLuongXaToiThieu} />




				{/* ==================================================He Thong Giam Sat================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat" component={HeThongGiamSat} />

				{/* ==================================================He Thong Giam Sat phat dien lon hon 2mw================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/phat-dien-lon-hon-2mw" component={HeThongGiamSatPhatDienLonHon2MW} />

				{/* ==================================================He Thong Giam Sat phat dien lon hon 2mw================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/khai-thac-nuoc-duoi-dat" component={HeThongGiamSatKhaiThacNDD} />

				{/* ==================================================Bao Cao Bieu Mau================================================== */}
				<ProtectedRoute exact path="/bao-cao-bieu-mau" component={BaoCaoBieuMau} />
			</Switch>
		</BrowserRouter>
  );
}

export default App;
