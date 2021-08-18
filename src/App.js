import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './Shared/Register';
import Login from './Shared/Login';

// Authenticated login
import ProtectedRoute from './Shared/protectedRoute'

// Home page
import Home from './TrangChu/Home';

// QUAN LY CAP PHEP
import QuanLyCapPhep from './QuanLyCapPhep/QuanLyCapPhep';

// <==================================================QUAN LY CAP PHEP NUOC MAT=================================================================================>

// <==================================================QUAN LY CAP PHEP NUOC MAT - THUY DIEN=================================================================================>
import QuanLyCapPhepNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/ThuyDien';
import QuanLyCapPhepGiaHanDieuChinhNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/TheoDoi';

// <==================================================QUAN LY CAP PHEP NUOC MAT - HO CHUA=================================================================================>
import QuanLyCapPhepNuocMatHoChua from './QuanLyCapPhep/NuocMat/HoChua/HoChua';
import QuanLyCapPhepGiaHanDieuChinhNuocMatHoChua from './QuanLyCapPhep/NuocMat/HoChua/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatHoChua from './QuanLyCapPhep/NuocMat/HoChua/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatHoChua from './QuanLyCapPhep/NuocMat/HoChua/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatHoChua from './QuanLyCapPhep/NuocMat/HoChua/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatHoChua from './QuanLyCapPhep/NuocMat/HoChua/TheoDoi';

// <==================================================QUAN LY CAP PHEP NUOC MAT - TRAM BOM=================================================================================>
import QuanLyCapPhepNuocMatTramBom from './QuanLyCapPhep/NuocMat/TramBom/TramBom';
import QuanLyCapPhepGiaHanDieuChinhNuocMatTramBom from './QuanLyCapPhep/NuocMat/TramBom/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatTramBom from './QuanLyCapPhep/NuocMat/TramBom/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatTramBom from './QuanLyCapPhep/NuocMat/TramBom/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatTramBom from './QuanLyCapPhep/NuocMat/TramBom/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatTramBom from './QuanLyCapPhep/NuocMat/TramBom/TheoDoi';

// <==================================================QUAN LY CAP PHEP NUOC MAT - DAP THUY LOI=================================================================================>
import QuanLyCapPhepNuocMatDapThuyLoi from './QuanLyCapPhep/NuocMat/DapThuyLoi/DapThuyLoi';
import QuanLyCapPhepGiaHanDieuChinhNuocMatDapThuyLoi from './QuanLyCapPhep/NuocMat/DapThuyLoi/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatDapThuyLoi from './QuanLyCapPhep/NuocMat/DapThuyLoi/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatDapThuyLoi from './QuanLyCapPhep/NuocMat/DapThuyLoi/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatDapThuyLoi from './QuanLyCapPhep/NuocMat/DapThuyLoi/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatDapThuyLoi from './QuanLyCapPhep/NuocMat/DapThuyLoi/TheoDoi';

// <==================================================QUAN LY CAP PHEP NUOC MAT - CONG=================================================================================>
import QuanLyCapPhepNuocMatCong from './QuanLyCapPhep/NuocMat/Cong/Cong';
import QuanLyCapPhepGiaHanDieuChinhNuocMatCong from './QuanLyCapPhep/NuocMat/Cong/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatCong from './QuanLyCapPhep/NuocMat/Cong/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatCong from './QuanLyCapPhep/NuocMat/Cong/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatCong from './QuanLyCapPhep/NuocMat/Cong/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatCong from './QuanLyCapPhep/NuocMat/Cong/TheoDoi';

// <==================================================QUAN LY CAP PHEP NUOC MAT - TRAM CAP NUOC=================================================================================>
import QuanLyCapPhepNuocMatTramCapNuoc from './QuanLyCapPhep/NuocMat/TramCapNuoc/TramCapNuoc';
import QuanLyCapPhepGiaHanDieuChinhNuocMatTramCapNuoc from './QuanLyCapPhep/NuocMat/TramCapNuoc/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatTramCapNuoc from './QuanLyCapPhep/NuocMat/TramCapNuoc/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatTramCapNuoc from './QuanLyCapPhep/NuocMat/TramCapNuoc/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatTramCapNuoc from './QuanLyCapPhep/NuocMat/TramCapNuoc/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatTramCapNuoc from './QuanLyCapPhep/NuocMat/TramCapNuoc/TheoDoi';

// <==================================================QUAN LY CAP PHEP NUOC MAT - NHA MAY NUOC=================================================================================>
import QuanLyCapPhepNuocMatNhaMayNuoc from './QuanLyCapPhep/NuocMat/NhaMayNuoc/NhaMayNuoc';
import QuanLyCapPhepGiaHanDieuChinhNuocMatNhaMayNuoc from './QuanLyCapPhep/NuocMat/NhaMayNuoc/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatNhaMayNuoc from './QuanLyCapPhep/NuocMat/NhaMayNuoc/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatNhaMayNuoc from './QuanLyCapPhep/NuocMat/NhaMayNuoc/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatNhaMayNuoc from './QuanLyCapPhep/NuocMat/NhaMayNuoc/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatNhaMayNuoc from './QuanLyCapPhep/NuocMat/NhaMayNuoc/TheoDoi';

// <==================================================QUAN LY CAP PHEP NUOC MAT - CONG TRINH KHAC=================================================================================>
import QuanLyCapPhepNuocMatCongTrinhKhac from './QuanLyCapPhep/NuocMat/CongTrinhKhac/CongTrinhKhac';
import QuanLyCapPhepGiaHanDieuChinhNuocMatCongTrinhKhac from './QuanLyCapPhep/NuocMat/CongTrinhKhac/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatCongTrinhKhac from './QuanLyCapPhep/NuocMat/CongTrinhKhac/CapMoi';
import QuanLyCapPhepQuanLyCapMoiNuocMatCongTrinhKhac from './QuanLyCapPhep/NuocMat/CongTrinhKhac/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepNuocMatCongTrinhKhac from './QuanLyCapPhep/NuocMat/CongTrinhKhac/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatCongTrinhKhac from './QuanLyCapPhep/NuocMat/CongTrinhKhac/TheoDoi';



// <==================================================QUAN LY CAP PHEP KHAI THAC NUOC DUOI DAT=================================================================================>
import QuanLyCapPhepKhaiThacGiaHanDieuChinhNDD from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/GiaHanDieuChinh';
import QuanLyCapPhepKhaiThacNDD from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/KhaiThac';
import QuanLyCapPhepKhaiThacCapMoiNDD from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/CapMoi';
import QuanLyCapPhepKhaiThacQuanLyGiayPhepNDD from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/QuanLyCapPhep';
import QuanLyCapPhepKhaiThacSuaGiayPhepNDD from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/SuaGiayPhep';
import QuanLyCapPhepKhaiThacTheoDoiGiayPhepNDD from './QuanLyCapPhep/NuocDuoiDat/KhaiThac/TheoDoi';

// <==================================================QUAN LY CAP PHEP THAM DO NUOC DUOI DAT=================================================================================>
import QuanLyCapPhepThamDoGiaHanDieuChinhNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/GiaHanDieuChinh';
import QuanLyCapPhepThamDoNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/ThamDo';
import QuanLyCapPhepThamDoCapMoiNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/CapMoi';
import QuanLyCapPhepThamDoQuanLyGiayPhepNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/QuanLyCapPhep';
import QuanLyCapPhepThamDoSuaGiayPhepNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepThamDoNDD from './QuanLyCapPhep/NuocDuoiDat/ThamDo/TheoDoi';

// <==================================================QUAN LY CAP PHEP HANH NGHE KHOAN NUOC DUOI DAT=================================================================================>
import QuanLyCapPhepKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/HanhNgheKhoan';
import QuanLyCapPhepGiaHanDieuChinhKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/CapMoi';
import QuanLyCapPhepQuanLyCapMoiKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepKhoanNDD from './QuanLyCapPhep/NuocDuoiDat/HanhNgheKhoan/TheoDoi';

// <==================================================QUAN LY CAP PHEP CONG TRINH KHAC NUOC DUOI DAT=================================================================================>
import QuanLyCapPhepCongTrinhKhacNDD from './QuanLyCapPhep/NuocDuoiDat/CongTrinhKhac/CongTrinhKhac';
import QuanLyCapPhepGiaHanDieuChinhCongTrinhKhacNDD from './QuanLyCapPhep/NuocDuoiDat/CongTrinhKhac/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiCongTrinhKhacNDD from './QuanLyCapPhep/NuocDuoiDat/CongTrinhKhac/CapMoi';
import QuanLyCapPhepQuanLyCapMoiCongTrinhKhacNDD from './QuanLyCapPhep/NuocDuoiDat/CongTrinhKhac/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepCongTrinhKhacNDD from './QuanLyCapPhep/NuocDuoiDat/CongTrinhKhac/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepCongTrinhKhacNDD from './QuanLyCapPhep/NuocDuoiDat/CongTrinhKhac/TheoDoi';


// <==================================================XA THAI=================================================================================>

// <==================================================QUAN LY CAP PHEP XA THAI KHU - CUM CN TAP TRUNG=================================================================================>
import QuanLyCapPhepXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/KhuCumCNTapTrung';
import QuanLyCapPhepGiaHanDieuChinhXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/CapMoi';
import QuanLyCapPhepQuanLyCapMoiXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepXaThaiKhuCumCNTapTrung from './QuanLyCapPhep/XaThai/KhuCumCNTapTrung/TheoDoi';

// <==================================================QUAN LY CAP PHEP XA THAI CSSX KINH DOANH DICH VU=================================================================================>
import QuanLyCapPhepXaThaiCSSXKinhDoanhDichVu from './QuanLyCapPhep/XaThai/CSSXKinhDoanhDichVu/CSSXKinhDoanhDichVu';
import QuanLyCapPhepGiaHanDieuChinhXaThaiCSSXKinhDoanhDichVu from './QuanLyCapPhep/XaThai/CSSXKinhDoanhDichVu/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiXaThaiCSSXKinhDoanhDichVu from './QuanLyCapPhep/XaThai/CSSXKinhDoanhDichVu/CapMoi';
import QuanLyCapPhepQuanLyCapMoiXaThaiCSSXKinhDoanhDichVu from './QuanLyCapPhep/XaThai/CSSXKinhDoanhDichVu/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepXaThaiCSSXKinhDoanhDichVu from './QuanLyCapPhep/XaThai/CSSXKinhDoanhDichVu/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepXaThaiCSSXKinhDoanhDichVu from './QuanLyCapPhep/XaThai/CSSXKinhDoanhDichVu/TheoDoi';

// <==================================================QUAN LY CAP PHEP XA THAI CSSX TIEU THU CN=================================================================================>
import QuanLyCapPhepXaThaiCSSXTieuThuCN from './QuanLyCapPhep/XaThai/CSSXTieuThuCN/CSSXTieuThuCN';
import QuanLyCapPhepGiaHanDieuChinhXaThaiCSSXTieuThuCN from './QuanLyCapPhep/XaThai/CSSXTieuThuCN/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiXaThaiCSSXTieuThuCN from './QuanLyCapPhep/XaThai/CSSXTieuThuCN/CapMoi';
import QuanLyCapPhepQuanLyCapMoiXaThaiCSSXTieuThuCN from './QuanLyCapPhep/XaThai/CSSXTieuThuCN/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepXaThaiCSSXTieuThuCN from './QuanLyCapPhep/XaThai/CSSXTieuThuCN/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepXaThaiCSSXTieuThuCN from './QuanLyCapPhep/XaThai/CSSXTieuThuCN/TheoDoi';

// <==================================================QUAN LY CAP PHEP XA THAI CS BENH VIEN=================================================================================>
import QuanLyCapPhepXaThaiCSBenhVien from './QuanLyCapPhep/XaThai/CSBenhVien/CSBenhVien';
import QuanLyCapPhepGiaHanDieuChinhXaThaiCSBenhVien from './QuanLyCapPhep/XaThai/CSBenhVien/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiXaThaiCSBenhVien from './QuanLyCapPhep/XaThai/CSBenhVien/CapMoi';
import QuanLyCapPhepQuanLyCapMoiXaThaiCSBenhVien from './QuanLyCapPhep/XaThai/CSBenhVien/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepXaThaiCSBenhVien from './QuanLyCapPhep/XaThai/CSBenhVien/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepXaThaiCSBenhVien from './QuanLyCapPhep/XaThai/CSBenhVien/TheoDoi';

// <==================================================QUAN LY CAP PHEP XA THAI KHU DAN CU=================================================================================>
import QuanLyCapPhepXaThaiKhuDanCu from './QuanLyCapPhep/XaThai/KhuDanCu/KhuDanCu';
import QuanLyCapPhepGiaHanDieuChinhXaThaiKhuDanCu from './QuanLyCapPhep/XaThai/KhuDanCu/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiXaThaiKhuDanCu from './QuanLyCapPhep/XaThai/KhuDanCu/CapMoi';
import QuanLyCapPhepQuanLyCapMoiXaThaiKhuDanCu from './QuanLyCapPhep/XaThai/KhuDanCu/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepXaThaiKhuDanCu from './QuanLyCapPhep/XaThai/KhuDanCu/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepXaThaiKhuDanCu from './QuanLyCapPhep/XaThai/KhuDanCu/TheoDoi';

// <==================================================QUAN LY CAP PHEP XA THAI CHAN NUOI - NUOI TRONG THUY SAN=================================================================================>
import QuanLyCapPhepXaThaiChanNuoi from './QuanLyCapPhep/XaThai/ChanNuoi/ChanNuoi';
import QuanLyCapPhepGiaHanDieuChinhXaThaiChanNuoi from './QuanLyCapPhep/XaThai/ChanNuoi/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiXaThaiChanNuoi from './QuanLyCapPhep/XaThai/ChanNuoi/CapMoi';
import QuanLyCapPhepQuanLyCapMoiXaThaiChanNuoi from './QuanLyCapPhep/XaThai/ChanNuoi/QuanLyCapPhep';
import QuanLyCapPhepSuaGiayPhepXaThaiChanNuoi from './QuanLyCapPhep/XaThai/ChanNuoi/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepXaThaiChanNuoi from './QuanLyCapPhep/XaThai/ChanNuoi/TheoDoi';








// <==================================================Gioi thieu chung=================================================================================>
import GioiThieuChung from './GioiThieuChung/GioiThieuChung';


// <==================================================HE THONG QUAN TRAC=================================================================================>
import HeThongQuanTrac from './HeThongQuanTrac/HeThongQuanTrac';

// <==================================================HE THONG QUAN TRAC - GIAM SAT MUA=================================================================================>
import HeThongQuanTracNuocMatMua from './HeThongQuanTrac/QuanTracMua/Mua';

// <==================================================HE THONG QUAN TRAC - GIAM SAT HO CHUA=================================================================================>
import HeThongQuanTracNuocMatHoChua from './HeThongQuanTrac/QuanTracHo/Ho';

// <==================================================HE THONG QUAN TRAC - LUU LUONG DEN HO=================================================================================>
import HeThongQuanTracNuocMatLuuLuongDenHo from './HeThongQuanTrac/QuanTracLuuLuongDenHo/LuuLuongDenHo';

// <==================================================HE THONG QUAN TRAC - LUU LUONG XA QUA NHA MAY=================================================================================>
import HeThongQuanTracNuocMatLuuLuongXaQuaNhaMay from './HeThongQuanTrac/QuanTracLuuLuongXaQuaNhaMay/LuuLuongXaQuaNhaMay';

// <==================================================HE THONG QUAN TRAC - LUU LUONG XA TRAN=================================================================================>
import HeThongQuanTracNuocMatLuuLuongXaTran from './HeThongQuanTrac/QuanTracLuuLuongXaTran/LuuLuongXaTran';

// <==================================================HE THONG QUAN TRAC - LUU LUONG XA TOI THIEU=================================================================================>
import HeThongQuanTracNuocMatLuuLuongXaToiThieu from './HeThongQuanTrac/QuanTracLuuLuongXaToiThieu/LuuLuongXaToiThieu'

// <==================================================HE THONG GIAM SAT=================================================================================>
import HeThongGiamSat from './HeThongGiamSat/HeThongGiamSat';

// <==================================================HE THONG GIAM SAT PHAT DIEN LON HON 2mw=================================================================================>
import HeThongGiamSatPhatDienLonHon2MW from './HeThongGiamSat/QuanLyGiamSat/PhatDienLonHon2MW/PhatDienLonHon2MW';

// <==================================================HE THONG GIAM SAT lichsu PHAT DIEN LON HON 2mw=================================================================================>
import HeThongGiamSatLichSuPhatDienLonHon2MW from './HeThongGiamSat/QuanLyGiamSat/PhatDienLonHon2MW/LichSuPhatDienLonHon2MW/LichSuPhatDienLonHon2MW';

// <==================================================HE THONG GIAM SAT SXNN nho hon 2m3s=================================================================================>
import HeThongGiamSatSXNNNhoHon2m3s from './HeThongGiamSat/QuanLyGiamSat/SXNNNhoHon2m3s/SXNNNhoHon2m3s';

// <==================================================HE THONG GIAM SAT KHAI THAC NDD=================================================================================>
import HeThongGiamSatKhaiThacNDD from './HeThongGiamSat/QuanLyGiamSat/KhaiThacNDD/KhaiThacNDD'

// <==================================================HE THONG GIAM SAT MUC DICH KHAC > 50.000m3/ngdem=================================================================================>
import HeThongGiamSatMucDichKhacLonHon50000m3ngdem from './HeThongGiamSat/QuanLyGiamSat/MucDichKhacLonHon50000m3ngdem/MucDichKhacLonHon50000m3ngdem';

// <==================================================HE THONG GIAM SAT XA THAI LON HON 3000m3ngdem=================================================================================>
import HeThongGiamSatXaThaiLonHon3000m3ngdem from './HeThongGiamSat/QuanLyGiamSat/XaThaiLonHon3000m3ngdem/XaThaiLonHon3000m3ngdem';

// <==================================================HE THONG GIAM SAT XA THAI LON HON 3000m3ngdem=================================================================================>
import HeThongGiamSatXaThaiNTTSLonHon3000m3ngdem from './HeThongGiamSat/QuanLyGiamSat/XaThaiNTTSLonHon3000m3ngdem/XaThaiNTTSLonHon3000m3ngdem';

// <==================================================BAO CAO BIEU MAU=================================================================================>
import BaoCaoBieuMau from './BaoCaoBieuMau/BaoCaoBieuMau';



function App() {
  return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<ProtectedRoute exact path="/" component={Home} />
				

				{/* ==================================================QUAN LY CAP PHEP================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep" component={QuanLyCapPhep} />

				{/* ==================================================NUOC MAT================================================== */}

				{/* ==================================================CONG TRINH THUY DIEN================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien" component={QuanLyCapPhepNuocMatThuyDien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatThuyDien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/cap-moi" component={QuanLyCapPhepCapMoiNuocMatThuyDien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatThuyDien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatThuyDien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatThuyDien} />


				{/* ==================================================CONG TRINH HO CHUA================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-chua" component={QuanLyCapPhepNuocMatHoChua} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-chua/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatHoChua} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-chua/cap-moi" component={QuanLyCapPhepCapMoiNuocMatHoChua} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-chua/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatHoChua} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-chua/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatHoChua} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/ho-chua/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatHoChua} />


				{/* ==================================================CONG TRINH TRAM BOM================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-bom" component={QuanLyCapPhepNuocMatTramBom} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-bom/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatTramBom} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-bom/cap-moi" component={QuanLyCapPhepCapMoiNuocMatTramBom} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-bom/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatTramBom} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-bom/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatTramBom} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-bom/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatTramBom} />


				{/* ==================================================CONG TRINH DAP THUY LOI================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi" component={QuanLyCapPhepNuocMatDapThuyLoi} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatDapThuyLoi} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi/cap-moi" component={QuanLyCapPhepCapMoiNuocMatDapThuyLoi} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatDapThuyLoi} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatDapThuyLoi} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/dap-thuy-loi/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatDapThuyLoi} />


				{/* ==================================================CONG TRINH Cong================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong" component={QuanLyCapPhepNuocMatCong} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatCong} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong/cap-moi" component={QuanLyCapPhepCapMoiNuocMatCong} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatCong} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatCong} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatCong} />

				{/* ==================================================CONG TRINH TRAM CAP NUOC================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc" component={QuanLyCapPhepNuocMatTramCapNuoc} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatTramCapNuoc} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc/cap-moi" component={QuanLyCapPhepCapMoiNuocMatTramCapNuoc} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatTramCapNuoc} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatTramCapNuoc} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/tram-cap-nuoc/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatTramCapNuoc} />

				{/* ==================================================CONG TRINH NHA MAY NUOC================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc" component={QuanLyCapPhepNuocMatNhaMayNuoc} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatNhaMayNuoc} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc/cap-moi" component={QuanLyCapPhepCapMoiNuocMatNhaMayNuoc} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatNhaMayNuoc} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatNhaMayNuoc} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/nha-may-nuoc/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatNhaMayNuoc} />

				{/* ==================================================CONG TRINH CONG TRINH KHAC================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong-trinh-khac" component={QuanLyCapPhepNuocMatCongTrinhKhac} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong-trinh-khac/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhNuocMatCongTrinhKhac} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong-trinh-khac/cap-moi" component={QuanLyCapPhepCapMoiNuocMatCongTrinhKhac} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong-trinh-khac/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiNuocMatCongTrinhKhac} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong-trinh-khac/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatCongTrinhKhac} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/cong-trinh-khac/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatCongTrinhKhac} />



				{/* ==================================================NUOC DUOI DAT================================================== */}

				{/* ==================================================KHAI THAC================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/gia-han-dieu-chinh" component={QuanLyCapPhepKhaiThacGiaHanDieuChinhNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac" component={QuanLyCapPhepKhaiThacNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/cap-moi" component={QuanLyCapPhepKhaiThacCapMoiNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/quan-ly-cap-moi" component={QuanLyCapPhepKhaiThacQuanLyGiayPhepNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/chinh-sua/:id_gp" component={QuanLyCapPhepKhaiThacSuaGiayPhepNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/khai-thac/theo-doi/:id_gp" component={QuanLyCapPhepKhaiThacTheoDoiGiayPhepNDD} />

				{/* ==================================================THAM DO================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/gia-han-dieu-chinh" component={QuanLyCapPhepThamDoGiaHanDieuChinhNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do" component={QuanLyCapPhepThamDoNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/cap-moi" component={QuanLyCapPhepThamDoCapMoiNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/quan-ly-cap-moi" component={QuanLyCapPhepThamDoQuanLyGiayPhepNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/chinh-sua/:id_gp" component={QuanLyCapPhepThamDoSuaGiayPhepNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/tham-do/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepThamDoNDD} />

				{/* ==================================================HANH NGHE KHOAN================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhKhoanNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan" component={QuanLyCapPhepKhoanNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/cap-moi" component={QuanLyCapPhepCapMoiKhoanNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiKhoanNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepKhoanNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/hanh-nghe-khoan/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepKhoanNDD} />

				{/* ==================================================NUOC DUOI DAT CONG TRINH KHAC================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhCongTrinhKhacNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac" component={QuanLyCapPhepCongTrinhKhacNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac/cap-moi" component={QuanLyCapPhepCapMoiCongTrinhKhacNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiCongTrinhKhacNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepCongTrinhKhacNDD} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-duoi-dat/cong-trinh-khac/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepCongTrinhKhacNDD} />




				{/* ==================================================XA THAI================================================== */}

				{/* ==================================================XA THAI KHU CUM VN TAP TRUNG================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-cum-cong-nghiep-tap-trung/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhXaThaiKhuCumCNTapTrung} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-cum-cong-nghiep-tap-trung" component={QuanLyCapPhepXaThaiKhuCumCNTapTrung} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-cum-cong-nghiep-tap-trung/cap-moi" component={QuanLyCapPhepCapMoiXaThaiKhuCumCNTapTrung} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-cum-cong-nghiep-tap-trung/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiXaThaiKhuCumCNTapTrung} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-cum-cong-nghiep-tap-trung/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepXaThaiKhuCumCNTapTrung} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-cum-cong-nghiep-tap-trung/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepXaThaiKhuCumCNTapTrung} />

				{/* ==================================================XA THAI CSSX KINH DOANH DICH VU================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cssx-kinh-doanh-dich-vu/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhXaThaiCSSXKinhDoanhDichVu} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cssx-kinh-doanh-dich-vu" component={QuanLyCapPhepXaThaiCSSXKinhDoanhDichVu} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cssx-kinh-doanh-dich-vu/cap-moi" component={QuanLyCapPhepCapMoiXaThaiCSSXKinhDoanhDichVu} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cssx-kinh-doanh-dich-vu/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiXaThaiCSSXKinhDoanhDichVu} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cssx-kinh-doanh-dich-vu/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepXaThaiCSSXKinhDoanhDichVu} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cssx-kinh-doanh-dich-vu/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepXaThaiCSSXKinhDoanhDichVu} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cssx-kinh-doanh-dich-vu/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhXaThaiCSSXKinhDoanhDichVu} />

				{/* ==================================================XA THAI CSSX TIEU THU CONG NGHIEP================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cssx-tieu-thu-cn" component={QuanLyCapPhepXaThaiCSSXTieuThuCN} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cssx-tieu-thu-cn/cap-moi" component={QuanLyCapPhepCapMoiXaThaiCSSXTieuThuCN} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cssx-tieu-thu-cn/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiXaThaiCSSXTieuThuCN} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cssx-tieu-thu-cn/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepXaThaiCSSXTieuThuCN} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cssx-tieu-thu-cn/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepXaThaiCSSXTieuThuCN} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cssx-tieu-thu-cn/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhXaThaiCSSXTieuThuCN} />

				{/* ==================================================XA THAI CS BENH VIEN================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cs-benh-vien" component={QuanLyCapPhepXaThaiCSBenhVien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cs-benh-vien/cap-moi" component={QuanLyCapPhepCapMoiXaThaiCSBenhVien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cs-benh-vien/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiXaThaiCSBenhVien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cs-benh-vien/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepXaThaiCSBenhVien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cs-benh-vien/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepXaThaiCSBenhVien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-cs-benh-vien/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhXaThaiCSBenhVien} />

				{/* ==================================================XA THAI KHU DAN CU - LANG NGHE================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-dan-cu" component={QuanLyCapPhepXaThaiKhuDanCu} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-dan-cu/cap-moi" component={QuanLyCapPhepCapMoiXaThaiKhuDanCu} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-dan-cu/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiXaThaiKhuDanCu} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-dan-cu/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepXaThaiKhuDanCu} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-dan-cu/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepXaThaiKhuDanCu} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-khu-dan-cu/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhXaThaiKhuDanCu} />

				{/* ==================================================XA THAI CHAN NUOI - NUOI TRONG THUY SAN================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-chan-nuoi" component={QuanLyCapPhepXaThaiChanNuoi} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-chan-nuoi/cap-moi" component={QuanLyCapPhepCapMoiXaThaiChanNuoi} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-chan-nuoi/quan-ly-cap-moi" component={QuanLyCapPhepQuanLyCapMoiXaThaiChanNuoi} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-chan-nuoi/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepXaThaiChanNuoi} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-chan-nuoi/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepXaThaiChanNuoi} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/xa-thai-chan-nuoi/gia-han-dieu-chinh" component={QuanLyCapPhepGiaHanDieuChinhXaThaiChanNuoi} />











				{/* ==================================================GIOI THIEU CHUNG================================================== */}
				<ProtectedRoute exact path="/gioi-thieu-chung" component={GioiThieuChung} />


				{/* ==================================================HE THONG QUAN TRAC================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac" component={HeThongQuanTrac} />

				{/* ==================================================HE THONG QUAN TRAC MUA================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/mua" component={HeThongQuanTracNuocMatMua} />

				{/* ==================================================HE THONG QUAN TRAC HO CHUA================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/ho-chua" component={HeThongQuanTracNuocMatHoChua} />

				{/* ==================================================HE THONG QUAN TRAC LUU LUONG DEN HO================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-den-ho" component={HeThongQuanTracNuocMatLuuLuongDenHo} />

				{/* ==================================================HE THONG QUAN TRAC LUU LUONG XA THAI QUA NHA MAY================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-qua-nha-may" component={HeThongQuanTracNuocMatLuuLuongXaQuaNhaMay} />

				{/* ==================================================HE THONG QUAN TRAC XA TRAN================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-tran" component={HeThongQuanTracNuocMatLuuLuongXaTran} />

				{/* ==================================================HE THONG QUAN TRAC XA TOI THIEU================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-toi-thieu" component={HeThongQuanTracNuocMatLuuLuongXaToiThieu} />




				{/* ==================================================HE THONG GIAM SAT================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat" component={HeThongGiamSat} />

				{/* ==================================================HE THONG GIAM SAT PHAT DIEN LON HON 2mw================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/phat-dien-lon-hon-2mw" component={HeThongGiamSatPhatDienLonHon2MW} />

				{/* ==================================================HE THONG GIAM SAT LICH SU PHAT DIEN LON HON 2mw================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/phat-dien-lon-hon-2mw/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuPhatDienLonHon2MW} />

				{/* ==================================================HE THONG GIAM SAT SXNN NHO HON 2M3/S================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/san-xuat-nong-nghiep" component={HeThongGiamSatSXNNNhoHon2m3s} />

				{/* ==================================================HE THONG GIAM SAT KHAI THAC NUOC DUOI DAT================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/khai-thac-nuoc-duoi-dat" component={HeThongGiamSatKhaiThacNDD} />

				{/* ==================================================HE THONG GIAM SAT MUC DICH KHAC LON HON 50.000 m3/ngdem================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/muc-dich-khac-lon-hon-50000-m3ngdem" component={HeThongGiamSatMucDichKhacLonHon50000m3ngdem} />

				{/* ================================================== HE THONG GIAM SAT XA THAI LON HON 3000M3/NGAYDEM================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/xa-thai-lon-hon-3000-m3ngdem" component={HeThongGiamSatXaThaiLonHon3000m3ngdem} />

				{/* ================================================== HE THONG GIAM SAT XA THAI NUOI TRONG THUY SAN LON HON 3000M3/NGAYDEM================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/xa-thai-nuoi-trong-thuy-san-lon-hon-3000-m3ngdem" component={HeThongGiamSatXaThaiNTTSLonHon3000m3ngdem} />

				{/* ==================================================BAO CAO BIEU MAU================================================== */}
				<ProtectedRoute exact path="/bao-cao-bieu-mau" component={BaoCaoBieuMau} />
			</Switch>
		</BrowserRouter>
  );
}

export default App;
