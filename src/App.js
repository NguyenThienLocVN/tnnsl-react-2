import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './Shared/Register';
import Login from './Shared/Login';

// Authenticated login
import ProtectedRoute from './Shared/protectedRoute'

// Home page
import Home from './TrangChu/Home';
import UserProfile from './TrangChu/Profile';


// QUAN LY CAP PHEP
import QuanLyCapPhep from './QuanLyCapPhep/QuanLyCapPhep';

// <==================================================QUAN LY CAP PHEP NUOC MAT=================================================================================>

// <==================================================QUAN LY CAP PHEP NUOC MAT - THUY DIEN=================================================================================>
import QuanLyCapPhepNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/ThuyDien';
import QuanLyCapPhepGiaHanDieuChinhNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/GiaHanDieuChinh';
import QuanLyCapPhepCapMoiNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/CapMoi';
import QuanLyCapPhepQuanLyHoSoNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/QuanLyHoSo';
import QuanLyCapPhepSuaGiayPhepNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/SuaGiayPhep';
import QuanLyCapPhepTheoDoiGiayPhepNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/TheoDoi';
import QuanLyCapPhepXemGiayPhepNuocMatThuyDien from './QuanLyCapPhep/NuocMat/ThuyDien/Xem';

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

// <==================================================HE THONG QUAN TRAC - NUOC MAT=================================================================================>

// <==================================================HE THONG QUAN TRAC - GIAM SAT MUA=================================================================================>
import HeThongQuanTracNuocMatMua from './HeThongQuanTrac/NuocMat/QuanTracMua/Mua';

// <==================================================HE THONG QUAN TRAC - GIAM SAT HO CHUA=================================================================================>
import HeThongQuanTracNuocMatHoChua from './HeThongQuanTrac/NuocMat/QuanTracHo/Ho';
import HeThongQuanTracNuocMatTheoDoiQuanTracHo from './HeThongQuanTrac/NuocMat/QuanTracHo/TheoDoiQuanTrac';

// <==================================================HE THONG QUAN TRAC - LUU LUONG DEN HO=================================================================================>
import HeThongQuanTracNuocMatLuuLuongDenHo from './HeThongQuanTrac/NuocMat/QuanTracLuuLuongDenHo/LuuLuongDenHo';
import HeThongQuanTracNuocMatTheoDoiQuanTracLuuLuongDenHo from './HeThongQuanTrac/NuocMat/QuanTracLuuLuongDenHo/TheoDoiQuanTrac';

// <==================================================HE THONG QUAN TRAC - LUU LUONG XA QUA NHA MAY=================================================================================>
import HeThongQuanTracNuocMatLuuLuongXaQuaNhaMay from './HeThongQuanTrac/NuocMat/QuanTracLuuLuongXaQuaNhaMay/LuuLuongXaQuaNhaMay';
import HeThongQuanTracNuocMatTheoDoiLuuLuongXaQuaNhaMay from './HeThongQuanTrac/NuocMat/QuanTracLuuLuongXaQuaNhaMay/TheoDoiQuanTrac';

// <==================================================HE THONG QUAN TRAC - LUU LUONG XA TRAN=================================================================================>
import HeThongQuanTracNuocMatLuuLuongXaQuaTran from './HeThongQuanTrac/NuocMat/QuanTracLuuLuongXaTran/LuuLuongXaTran';
import HeThongQuanTracNuocMatTheoDoiLuuLuongXaQuaTran from './HeThongQuanTrac/NuocMat/QuanTracLuuLuongXaTran/TheoDoiQuanTrac';

// <==================================================HE THONG QUAN TRAC - LUU LUONG KHAI THAC=================================================================================>
import HeThongQuanTracNuocMatLuuLuongKhaiThac from './HeThongQuanTrac/NuocMat/QuanTracLuuLuongKhaiThac/LuuLuongKhaiThac';
import HeThongQuanTracNuocMatTheoDoiLuuLuongKhaiThac from './HeThongQuanTrac/NuocMat/QuanTracLuuLuongKhaiThac/TheoDoiQuanTrac';

// <==================================================HE THONG QUAN TRAC - LUU LUONG XA TOI THIEU=================================================================================>
import HeThongQuanTracNuocMatLuuLuongXaToiThieu from './HeThongQuanTrac/NuocMat/QuanTracLuuLuongXaToiThieu/LuuLuongXaToiThieu';
import HeThongQuanTracNuocMatTheoDoiLuuLuongXaToiThieu from './HeThongQuanTrac/NuocMat/QuanTracLuuLuongXaToiThieu/TheoDoiQuanTrac';

// <==================================================HE THONG QUAN TRAC - LUU LUONG NUOC KHAI THAC=================================================================================>
import HeThongQuanTracNuocMatChatLuongNuocKhaiThac from './HeThongQuanTrac/NuocMat/QuanTracChatLuongNuocKhaiThac/ChatLuongNuocKhaiThac';
// import HeThongQuanTracNuocMatTheoDoiChatLuongNuocKhaiThac from './HeThongQuanTrac/NuocMat/QuanTracChatLuongNuocKhaiThac/TheoDoiQuanTrac';

// <==================================================HE THONG QUAN TRAC - NUOC DUOI DAT=================================================================================>

// <==================================================HE THONG QUAN TRAC - LUU LUONG NUOC KHAI THAC=================================================================================>
import HeThongQuanTracNuocDuoiDatLuuLuongKhaiThac from './HeThongQuanTrac/NuocDuoiDat/QuanTracLuuLuongKhaiThac/LuuLuongKhaiThac';
import HeThongQuanTracNuocDuoiDatTheoDoiLuuLuongKhaiThac from './HeThongQuanTrac/NuocDuoiDat/QuanTracLuuLuongKhaiThac/TheoDoiQuanTrac';

// <==================================================HE THONG QUAN TRAC - MUC NUOC TRONG GIENG KHAI THAC=================================================================================>
import HeThongQuanTracNuocDuoiDatMucNuocTrongGiengKhaiThac from './HeThongQuanTrac/NuocDuoiDat/QuanTracMucNuocTrongGiengKhaiThac/MucNuocTrongGiengKhaiThac';
import HeThongQuanTracNuocDuoiDatTheoDoiMucNuocTrongGiengKhaiThac from './HeThongQuanTrac/NuocDuoiDat/QuanTracMucNuocTrongGiengKhaiThac/TheoDoiQuanTrac';

// <==================================================HE THONG QUAN TRAC - MUC NUOC TRONG GIENG QUAN TRAC=================================================================================>
import HeThongQuanTracNuocDuoiDatMucNuocTrongGiengQuanTrac from './HeThongQuanTrac/NuocDuoiDat/QuanTracMucNuocTrongGiengQuanTrac/MucNuocTrongGiengQuanTrac';
import HeThongQuanTracNuocDuoiDatTheoDoiMucNuocTrongGiengQuanTrac from './HeThongQuanTrac/NuocDuoiDat/QuanTracMucNuocTrongGiengQuanTrac/TheoDoiQuanTrac';

// <==================================================HE THONG QUAN TRAC - LUU LUONG NUOC KHAI THAC=================================================================================>
import HeThongQuanTracNuocDuoiDatChatLuongNuocKhaiThac from './HeThongQuanTrac/NuocDuoiDat/QuanTracChatLuongNuocKhaiThac/ChatLuongNuocKhaiThac';


// <==================================================HE THONG QUAN TRAC - XA THAI=================================================================================>

// <==================================================HE THONG QUAN TRAC - LUU LUONG NUOC KHAI THAC=================================================================================>
import HeThongQuanTracXaThaiLuuLuongXaThai from './HeThongQuanTrac/XaThai/QuanTracLuuLuongXaThai/LuuLuongXaThai';
import HeThongQuanTracXaThaiTheoDoiQuanTracLuuLuongXaThai from './HeThongQuanTrac/XaThai/QuanTracLuuLuongXaThai/TheoDoiQuanTrac';

// <==================================================HE THONG QUAN TRAC - CHAT LUONG NUOC XA THAI=================================================================================>
import HeThongQuanTracXaThaiChatLuongNuoc from './HeThongQuanTrac/XaThai/QuanTracChatLuongNuoc/ChatLuongNuocThai';


// <==================================================HE THONG GIAM SAT=================================================================================>
import HeThongGiamSat from './HeThongGiamSat/HeThongGiamSat';

// <==================================================HE THONG GIAM SAT PHAT DIEN LON HON 2mw=================================================================================>
import HeThongGiamSatPhatDienLonHon2MW from './HeThongGiamSat/QuanLyGiamSat/PhatDienLonHon2MW/PhatDienLonHon2MW';
import HeThongGiamSatLichSuPhatDienLonHon2MW from './HeThongGiamSat/QuanLyGiamSat/PhatDienLonHon2MW/LichSuPhatDienLonHon2MW/LichSuPhatDienLonHon2MW';

// <==================================================HE THONG GIAM SAT PHAT DIEN NHO HON 2mw=================================================================================>
import HeThongGiamSatPhatDienNhoHon2MW from './HeThongGiamSat/QuanLyGiamSat/PhatDienNhoHon2MW/PhatDienNhoHon2MW';
import HeThongGiamSatLichSuPhatDienNhoHon2MW from './HeThongGiamSat/QuanLyGiamSat/PhatDienNhoHon2MW/LichSuPhatDienNhoHon2MW/LichSuPhatDienNhoHon2MW';

// <==================================================HE THONG GIAM SAT SXNN lon hon 2m3s=================================================================================>
import HeThongGiamSatSanXuatNongNghiepLonHon2m3s from './HeThongGiamSat/QuanLyGiamSat/SanXuatNongNghiepLonHon2m3s/SanXuatNongNghiepLonHon2m3s';
import HeThongGiamSatLichSuSanXuatNongNghiepLonHon2m3s from './HeThongGiamSat/QuanLyGiamSat/SanXuatNongNghiepLonHon2m3s/SanXuatNongNghiepLonHon2m3s/LichSuSanXuatNongNghiepLonHon2m3s';

// <==================================================HE THONG GIAM SAT SXNN Nh??? hon 2m3s=================================================================================>
import HeThongGiamSatSanXuatNongNghiepNhoHon2m3s from './HeThongGiamSat/QuanLyGiamSat/SanXuatNongNghiepnNhoHon2m3s/SanXuatNongNghiepNhoHon2m3s';
import HeThongGiamSatLichSuSanXuatNongNghiepNhoHon2m3s from './HeThongGiamSat/QuanLyGiamSat/SanXuatNongNghiepnNhoHon2m3s/SanXuatNongNghiepNhoHon2m3s/LichSuSanXuatNongNghiepNhoHon2m3s';

// <==================================================HE THONG GIAM SAT KHAI THAC NDD=================================================================================>
import HeThongGiamSatKhaiThacNuocDuoiDatLonHon from './HeThongGiamSat/QuanLyGiamSat/KhaiThacNuocDuoiDatLonHon/KhaiThacNuocDuoiDatLonHon';
import HeThongGiamSatLichSuKhaiThacNuocDuoiDatLonHon from './HeThongGiamSat/QuanLyGiamSat/KhaiThacNuocDuoiDatLonHon/KhaiThacNuocDuoiDatLonHon/LichSuKhaiThacNuocDuoiDatLonHon';

// <==================================================HE THONG GIAM SAT KHAI THAC NDD NHO HON=================================================================================>
import HeThongGiamSatKhaiThacNuocDuoiDatNhoHon from './HeThongGiamSat/QuanLyGiamSat/KhaiThacNuocDuoiDatNhoHon/KhaiThacNuocDuoiDatNhoHon';
import HeThongGiamSatLichSuKhaiThacNuocDuoiDatNhoHon from './HeThongGiamSat/QuanLyGiamSat/KhaiThacNuocDuoiDatNhoHon/KhaiThacNuocDuoiDatNhoHon/LichSuKhaiThacNuocDuoiDatNhoHon';

// <==================================================HE THONG GIAM SAT MUC DICH KHAC > 50.000m3/ngdem=================================================================================>
import HeThongGiamSatMucdichkhaclonhon from './HeThongGiamSat/QuanLyGiamSat/Mucdichkhaclonhon/Mucdichkhaclonhon';
import HeThongGiamSatLichSuMucdichkhaclonhon from './HeThongGiamSat/QuanLyGiamSat/Mucdichkhaclonhon/Mucdichkhaclonhon/Mucdichkhaclonhon';

// <==================================================HE THONG GIAM SAT MUC DICH KHAC < 50.000m3/ngdem=================================================================================>
import HeThongGiamSatMucdichkhacnhohon from './HeThongGiamSat/QuanLyGiamSat/Mucdichkhacnhohon/Mucdichkhacnhohon';
import HeThongGiamSatLichSuMucdichkhacnhohon from './HeThongGiamSat/QuanLyGiamSat/Mucdichkhacnhohon/Mucdichkhacnhohon/Mucdichkhacnhohon';

// <==================================================HE THONG GIAM SAT XA THAI LON HON 3000m3ngdem=================================================================================>
import HeThongGiamSatXaThaiLonHon from './HeThongGiamSat/QuanLyGiamSat/XaThaiLonHon/XaThaiLonHon';
import HeThongGiamSatLichSuXaThaiLonHon from './HeThongGiamSat/QuanLyGiamSat/XaThaiLonHon/XaThaiLonHon/LichSuXaThaiLonHon';

// <==================================================HE THONG GIAM SAT XA THAI NH??? HON 3000m3ngdem=================================================================================>
import HeThongGiamSatXaThaiNhoHon from './HeThongGiamSat/QuanLyGiamSat/XaThaiNhoHon/XaThaiNhoHon';
import HeThongGiamSatLichSuXaThaiNhoHon from './HeThongGiamSat/QuanLyGiamSat/XaThaiNhoHon/XaThaiNhoHon/LichSuXaThaiNhoHon';



// <==================================================HE THONG GIAM SAT XA THAI NU??I TR???NG TH???Y S???N > 30.000m3ngdem=================================================================================>
import HeThongGiamSatXaThaiNuoiTrongThuySanLonHon from './HeThongGiamSat/QuanLyGiamSat/XaThaiNuoiTrongThuySanLonHon/XaThaiNuoiTrongThuySanLonHon';
import HeThongGiamSatLichSuNuoiTrongThuySanLonHon from './HeThongGiamSat/QuanLyGiamSat/XaThaiNuoiTrongThuySanLonHon/XaThaiNuoiTrongThuySanLonHon/LichSuXaThaiNuoiTrongThuySanLonHon';

// <==================================================HE THONG GIAM SAT XA THAI NU??I TR???NG TH???Y S???N < 30.000m3ngdem=================================================================================>
import HeThongGiamSatXaThaiNuoiTrongThuySanNhoHon from './HeThongGiamSat/QuanLyGiamSat/XaThaiNuoiTrongThuySanNhoHon/XaThaiNuoiTrongThuySanNhoHon';
import HeThongGiamSatLichSuNuoiTrongThuySanNhoHon from './HeThongGiamSat/QuanLyGiamSat/XaThaiNuoiTrongThuySanNhoHon/XaThaiNuoiTrongThuySanNhoHon/LichSuXaThaiNuoiTrongThuySanNhoHon';


// <==================================================HE THONG GIAM SAT TRUC TUYEN MUC NUOC HO=================================================================================>
import HeThongGiamSatTrucTuyenMucNuocHo from './HeThongGiamSat/QuanLyGiamSat/TrucTuyenMucNuocHo/TrucTuyenMucNuocHo';
import HeThongGiamSatLichSuTrucTuyenMucNuocHo from './HeThongGiamSat/QuanLyGiamSat/TrucTuyenMucNuocHo/TrucTuyenMucNuocHo/LichSuTrucTuyenMucNuocHo';


// <==================================================HE THONG GIAM XA DONG CHAY TOI THIEU=================================================================================>
import HeThongGiamSatTrucTuyenXaDongChayToiThieu from './HeThongGiamSat/QuanLyGiamSat/TrucTuyenXaToiThieu/TrucTuyenXaToiThieu';
import HeThongGiamSatLichSuTrucTuyenXaDongChayToiThieu from './HeThongGiamSat/QuanLyGiamSat/TrucTuyenXaToiThieu/TrucTuyenXaToiThieu/LichSuTrucTuyenXaToiThieu';


// <==================================================HE THONG GIAM SAT TRUC TUYEN XA DONG CHAY QUA NHA MAY=================================================================================>
import HeThongGiamSatTrucTuyenXaDongChayQuaNhaMay from './HeThongGiamSat/QuanLyGiamSat/TrucTuyenXaQuaNhaMay/TrucTuyenXaQuaNhaMay';
import HeThongGiamSatLichSuTrucTuyenXaDongChayQuaNhaMay from './HeThongGiamSat/QuanLyGiamSat/TrucTuyenXaQuaNhaMay/TrucTuyenXaQuaNhaMay/LichSuTrucTuyenTrucTuyenXaQuaNhaMay';


// <==================================================HE THONG GIAM SAT TR???C TUYENS XA TR??N=================================================================================>
import HeThongGiamSatTrucTuyenXaQuaTran from './HeThongGiamSat/QuanLyGiamSat/TrucTuyenXaTran/TrucTuyenXaTran';
import HeThongGiamSatLichSuTrucTuyenXaQuaTran from './HeThongGiamSat/QuanLyGiamSat/TrucTuyenXaTran/TrucTuyenXaTran/LichSuTrucTuyenXaTran';

// <==================================================HE THONG GIAM SAT TR??C TUYEN HO CH??A SAN XUAT NONG NGHIEP=================================================================================>
import HeThongGiamSatTrucTuyenKhaiThacSXNN from './HeThongGiamSat/QuanLyGiamSat/TrucTuyenKhaiThacSXNN/TrucTuyenKhaiThacSXNN';
import HeThongGiamSatLichSuTrucTuyenKhaiThacSXNN from './HeThongGiamSat/QuanLyGiamSat/TrucTuyenKhaiThacSXNN/TrucTuyenKhaiThacSXNN/LichSuTrucTuyenKhaiThacSXNN';

// <==================================================HE THONG GIAM SAT TR??C TUYEN MUC NUOC GIENG QUAN TRAC=================================================================================>
import HeThongGiamSatTrucTuyenMucNuocGiengQuanTrac from './HeThongGiamSat/QuanLyGiamSat/TrucTuyenMucNuocGiengQuanTrac/TrucTuyenMucNuocGiengQuanTrac';
import HeThongGiamSatLichSuTrucTuyenMucNuocGiengQuanTracN from './HeThongGiamSat/QuanLyGiamSat/TrucTuyenMucNuocGiengQuanTrac/TrucTuyenMucNuocGiengQuanTrac/LichSuTrucTuyenMucNuocGiengQuanTrac';


// <==================================================HE THONG GIAM SAT CAMERA VAN HANH XA NUOC=================================================================================>
import HeThongGiamSatCameraXaDCTT from './HeThongGiamSat/QuanLyGiamSat/CameraXaDCTT/CameraXaDCTT';
import HeThongGiamSatLichSuCameraXaDCTT from './HeThongGiamSat/QuanLyGiamSat/CameraXaDCTT/CameraXaDCTT/LichSuCameraXaDCTT';

// <==================================================HE THONG GIAM SAT CAMERA VAN HANH XA NUOC=================================================================================>
import HeThongGiamSatCameraXaNuocQuaTran from './HeThongGiamSat/QuanLyGiamSat/CameraXaNuocQuaTran/CameraXaNuocQuaTran';
import HeThongGiamSatLichSuCameraXaNuocQuaTran from './HeThongGiamSat/QuanLyGiamSat/CameraXaNuocQuaTran/CameraXaNuocQuaTran/LichSuCameraXaDCTT';
// <==================================================HE THONG GIAM SAT DINH KY XA TRAN HO NHO=================================================================================>
import HeThongGiamSatDinhKyXaTranHoNho from './HeThongGiamSat/QuanLyGiamSat/DinhKyXaTranHoNho/DinhKyXaTranHoNho';
import HeThongGiamSatLichSuDinhKyXaTranHoNho from './HeThongGiamSat/QuanLyGiamSat/DinhKyXaTranHoNho/DinhKyXaTranHoNho/LichSuDinhKyXaTran';

// <==================================================HE THONG GIAM SAT DINH KY sn xuat nong nghiep=================================================================================>
import HeThongGiamSatDinhKyKhaiThacSXNN from './HeThongGiamSat/QuanLyGiamSat/DinhKyKhaiThacSXNN/DinhKyKhaiThacSXNN';
import HeThongGiamSatLichSuDinhKyKhaiThacSXNN from './HeThongGiamSat/QuanLyGiamSat/DinhKyKhaiThacSXNN/DinhKyKhaiThacSXNN/LichSuDinhKyKhaiThacSXNN1s';

// <==================================================HE THONG GIAM SAT D???NH K??? MUC NUOC GIENG QUAN TRAC=================================================================================>
import HeThongGiamSatDinhKyMucNuocGiengQuanTrac from './HeThongGiamSat/QuanLyGiamSat/DinhKyMucNuocGiengQuanTrac/DinhKyMucNuocGiengQuanTrac';
import HeThongGiamSatLichSuDinhKyMucNuocGiengQuanTracN from './HeThongGiamSat/QuanLyGiamSat/DinhKyMucNuocGiengQuanTrac/DinhKyMucNuocGiengQuanTrac/LichSuDinhKyMucNuocGiengQuanTrac';


// <==================================================BAO CAO BIEU MAU=================================================================================>
import BaoCaoBieuMau from './BaoCaoBieuMau/BaoCaoBieuMau';
// import HeThongGiamSatLichSuDinhKyKhaiThacSXNN from './HeThongGiamSat/QuanLyGiamSat/DinhKyKhaiThacSXNN/DinhKyKhaiThacSXNN/LichSuDinhKyKhaiThacSXNN';




function App() {
  return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<ProtectedRoute exact path="/" component={Home} />
				<ProtectedRoute exact path="/thong-tin-tai-khoan" component={UserProfile} />
				
				

				{/* ==================================================QUAN LY CAP PHEP================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep" component={QuanLyCapPhep} />

				{/* ==================================================NUOC MAT================================================== */}

				{/* ==================================================CONG TRINH THUY DIEN================================================== */}
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien" component={QuanLyCapPhepNuocMatThuyDien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/cap-moi" component={QuanLyCapPhepCapMoiNuocMatThuyDien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/quan-ly-ho-so" component={QuanLyCapPhepQuanLyHoSoNuocMatThuyDien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/chinh-sua/:id_gp" component={QuanLyCapPhepSuaGiayPhepNuocMatThuyDien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/theo-doi/:id_gp" component={QuanLyCapPhepTheoDoiGiayPhepNuocMatThuyDien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/xem/:id_gp" component={QuanLyCapPhepXemGiayPhepNuocMatThuyDien} />
				<ProtectedRoute exact path="/quan-ly-cap-phep/nuoc-mat/thuy-dien/gia-han-dieu-chinh/:id_gp" component={QuanLyCapPhepGiaHanDieuChinhNuocMatThuyDien} />


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

				{/* ==================================================HE THONG QUAN TRAC - NUOC MAT================================================== */}

				{/* ==================================================HE THONG QUAN TRAC MUA================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/mua" component={HeThongQuanTracNuocMatMua} />

				{/* ==================================================HE THONG QUAN TRAC HO CHUA================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/ho-chua" component={HeThongQuanTracNuocMatHoChua} />
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/ho-chua/theo-doi-quan-trac/:id_congtrinh" component={HeThongQuanTracNuocMatTheoDoiQuanTracHo} />

				{/* ==================================================HE THONG QUAN TRAC LUU LUONG DEN HO================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-den-ho" component={HeThongQuanTracNuocMatLuuLuongDenHo} />
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-den-ho/theo-doi-quan-trac/:id_congtrinh" component={HeThongQuanTracNuocMatTheoDoiQuanTracLuuLuongDenHo} />

				{/* ==================================================HE THONG QUAN TRAC LUU LUONG XA THAI QUA NHA MAY================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-qua-nha-may" component={HeThongQuanTracNuocMatLuuLuongXaQuaNhaMay} />
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-qua-nha-may/theo-doi-quan-trac/:id_congtrinh" component={HeThongQuanTracNuocMatTheoDoiLuuLuongXaQuaNhaMay} />

				{/* ==================================================HE THONG QUAN TRAC XA TRAN================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-qua-tran" component={HeThongQuanTracNuocMatLuuLuongXaQuaTran} />
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-qua-tran/theo-doi-quan-trac/:id_congtrinh" component={HeThongQuanTracNuocMatTheoDoiLuuLuongXaQuaTran} />

				{/* ==================================================HE THONG QUAN TRAC KHAI THAC================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-khai-thac" component={HeThongQuanTracNuocMatLuuLuongKhaiThac} />
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-khai-thac/theo-doi-quan-trac/:id_congtrinh" component={HeThongQuanTracNuocMatTheoDoiLuuLuongKhaiThac} />

				{/* ==================================================HE THONG QUAN TRAC XA TOI THIEU================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-toi-thieu" component={HeThongQuanTracNuocMatLuuLuongXaToiThieu} />
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/luu-luong-xa-toi-thieu/theo-doi-quan-trac/:id_congtrinh" component={HeThongQuanTracNuocMatTheoDoiLuuLuongXaToiThieu} />

				{/* ==================================================HE THONG QUAN TRAC CHAT LUONG NUOC KHAI THAC================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/chat-luong-nuoc-khai-thac" component={HeThongQuanTracNuocMatChatLuongNuocKhaiThac} />
				{/* <ProtectedRoute exact path="/he-thong-quan-trac/nuoc-mat/chat-luong-nuoc-khai-thac/theo-doi-quan-trac/:id_congtrinh" component={HeThongQuanTracNuocMatTheoDoiChatLuongNuocKhaiThac} /> */}

				{/* ==================================================HE THONG QUAN TRAC - NUOC DUOI DAT================================================== */}

				{/* ==================================================HE THONG QUAN TRAC CHAT LUONG NUOC KHAI THAC================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-duoi-dat/luu-luong-khai-thac" component={HeThongQuanTracNuocDuoiDatLuuLuongKhaiThac} />
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-duoi-dat/luu-luong-khai-thac/theo-doi-quan-trac/:id_congtrinh" component={HeThongQuanTracNuocDuoiDatTheoDoiLuuLuongKhaiThac} />
				
				{/* ==================================================HE THONG QUAN TRAC MUC NUOC TRONG GIENG KHAI THAC================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-duoi-dat/muc-nuoc-trong-gieng-khai-thac" component={HeThongQuanTracNuocDuoiDatMucNuocTrongGiengKhaiThac} />
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-duoi-dat/muc-nuoc-trong-gieng-khai-thac/theo-doi-quan-trac/:id_congtrinh" component={HeThongQuanTracNuocDuoiDatTheoDoiMucNuocTrongGiengKhaiThac} />

				{/* ==================================================HE THONG QUAN TRAC MUC NUOC TRONG GIENG QUAN TRAC================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-duoi-dat/muc-nuoc-trong-gieng-quan-trac" component={HeThongQuanTracNuocDuoiDatMucNuocTrongGiengQuanTrac} />
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-duoi-dat/muc-nuoc-trong-gieng-quan-trac/theo-doi-quan-trac/:id_congtrinh" component={HeThongQuanTracNuocDuoiDatTheoDoiMucNuocTrongGiengQuanTrac} />

				{/* ==================================================HE THONG QUAN TRAC CHAT LUONG NUOC KHAI THAC================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/nuoc-duoi-dat/chat-luong-nuoc-khai-thac" component={HeThongQuanTracNuocDuoiDatChatLuongNuocKhaiThac} />


				{/* ==================================================HE THONG QUAN TRAC - XA THAI================================================== */}

				{/* ==================================================HE THONG QUAN TRAC CHAT LUONG NUOC KHAI THAC================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/xa-thai/luu-luong-xa-thai" component={HeThongQuanTracXaThaiLuuLuongXaThai} />
				<ProtectedRoute exact path="/he-thong-quan-trac/xa-thai/luu-luong-xa-thai/theo-doi-quan-trac/:id_congtrinh" component={HeThongQuanTracXaThaiTheoDoiQuanTracLuuLuongXaThai} />

				{/* ==================================================HE THONG QUAN TRAC CHAT LUONG NUOC================================================== */}
				<ProtectedRoute exact path="/he-thong-quan-trac/xa-thai/chat-luong-nuoc" component={HeThongQuanTracXaThaiChatLuongNuoc} />



				{/* ==================================================HE THONG GIAM SAT================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat" component={HeThongGiamSat} />

				{/* ==================================================HE THONG GIAM SAT PHAT DIEN LON HON 2mw================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/phat-dien-lon-hon-2mw" component={HeThongGiamSatPhatDienLonHon2MW} />
				<ProtectedRoute exact path="/he-thong-giam-sat/phat-dien-lon-hon-2mw/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuPhatDienLonHon2MW} />

				{/* ==================================================HE THONG GIAM SAT PHAT DIEN NHO HON 2mw================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/phat-dien-nho-hon-2mw" component={HeThongGiamSatPhatDienNhoHon2MW} />
				<ProtectedRoute exact path="/he-thong-giam-sat/phat-dien-nho-hon-2mw/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuPhatDienNhoHon2MW} />

				{/* ==================================================HE THONG GIAM SAT SXNN LON HON 2M3/S================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/san-xuat-nong-nghiep" component={HeThongGiamSatSanXuatNongNghiepLonHon2m3s} />
				<ProtectedRoute exact path="/he-thong-giam-sat/san-xuat-nong-nghiep-lon-hon-2m3s/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuSanXuatNongNghiepLonHon2m3s} />
			  
	           {/* ==================================================HE THONG GIAM SAT SXNN NHO HON 2M3/S================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/san-xuat-nong-nghiep-nho-hon" component={HeThongGiamSatSanXuatNongNghiepNhoHon2m3s} />
				<ProtectedRoute exact path="/he-thong-giam-sat/san-xuat-nong-nghiep-nho-hon-2m3s/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuSanXuatNongNghiepNhoHon2m3s} />
			  
				
			  
				{/* ==================================================HE THONG GIAM SAT MUC DICH KHAC LON HON 50.000 m3/ngdem================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/muc-dich-khac-lon-hon" component={HeThongGiamSatMucdichkhaclonhon} />
				<ProtectedRoute exact path="/he-thong-giam-sat/muc-dich-khac-hon-hon/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuMucdichkhaclonhon} />

				{/* ==================================================HE THONG GIAM SAT MUC DICH KHAC NHO HON 50.000 m3/ngdem================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/muc-dich-khac-nho-hon" component={HeThongGiamSatMucdichkhacnhohon} />
			  	<ProtectedRoute exact path="/he-thong-giam-sat/muc-dich-khac-nho-hon/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuMucdichkhacnhohon} />

				{/* ==================================================HE THONG GIAM SAT KHAI THAC NUOC DUOI DAT================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/khai-thac-nuoc-duoi-dat-lon-hon" component={HeThongGiamSatKhaiThacNuocDuoiDatLonHon} />
			  	<ProtectedRoute exact path="/he-thong-giam-sat/khai-thac-nuoc-duoi-dat-lon-hon/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuKhaiThacNuocDuoiDatLonHon} />

			  			{/* ==================================================HE THONG GIAM SAT KHAI THAC NUOC DUOI DAT NHO HON ================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/khai-thac-nuoc-duoi-dat-nho-hon" component={HeThongGiamSatKhaiThacNuocDuoiDatNhoHon} />
			  	<ProtectedRoute exact path="/he-thong-giam-sat/khai-thac-nuoc-duoi-dat-nho-hon/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuKhaiThacNuocDuoiDatNhoHon} />


				{/* ================================================== HE THONG GIAM SAT XA THAI LON HON 3000M3/NGAYDEM================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/xa-thai-lon-hon-3000m3ngaydem" component={HeThongGiamSatXaThaiLonHon} />
			  	<ProtectedRoute exact path="/he-thong-giam-sat/xa-thai-lon-hon-3000m3ngaydem/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuXaThaiLonHon} />

			  {/* ================================================== HE THONG GIAM SAT XA THAI NHO HON 3000M3/NGAYDEM================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/xa-thai-nho-hon-3000m3ngaydem" component={HeThongGiamSatXaThaiNhoHon} />
			  <ProtectedRoute exact path="/he-thong-giam-sat/xa-thai-nho-hon-3000m3ngaydem/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuXaThaiNhoHon} />
			  

				{/* ================================================== HE THONG GIAM SAT XA THAI NUOI TRONG THUY SAN LON HON 3000M3/NGAYDEM================================================== */}
				<ProtectedRoute exact path="/he-thong-giam-sat/xa-thai-NTTS-lon-hon-30.000m3ngaydem" component={HeThongGiamSatXaThaiNuoiTrongThuySanLonHon} />
			  	<ProtectedRoute exact path="/he-thong-giam-sat/xa-thai-NTTS-lon-hon-30.000m3ngaydem/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuNuoiTrongThuySanLonHon} />

			  
{/* ================================================== HE THONG GIAM SAT XA THAI NUOI TRONG THUY SAN LON HON 3000M3/NGAYDEM================================================== */}
 				<ProtectedRoute exact path="/he-thong-giam-sat/xa-thai-NTTS-nho-hon-30.000m3ngaydem" component={HeThongGiamSatXaThaiNuoiTrongThuySanNhoHon} />
			  <ProtectedRoute exact path="/he-thong-giam-sat/xa-thai-NTTS-nho-hon-30.000m3ngaydem/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuNuoiTrongThuySanNhoHon} />
			  
{/* ================================================== HE THONG GIAM SAT TRUC TUYEN MUC NUOC HO================================================== */}
			<ProtectedRoute exact path="/he-thong-giam-sat/truc-tuyen-muc-nuoc-ho-chua" component={HeThongGiamSatTrucTuyenMucNuocHo} />
			  <ProtectedRoute exact path="/he-thong-giam-sat/truc-tuyen-muc-nuoc-ho/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuTrucTuyenMucNuocHo} />
			  
			  {/* ================================================== HE THONG GIAM SAT TRUC TUYEN XA DONG CHAY TOI THIEU================================================== */}
			<ProtectedRoute exact path="/he-thong-giam-sat/truc-tuyen-xa-dong-chay-toi-thieu" component={HeThongGiamSatTrucTuyenXaDongChayToiThieu} />
			<ProtectedRoute exact path="/he-thong-giam-sat/truc-tuyen-xa-dong-chay-toi-thieu/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuTrucTuyenXaDongChayToiThieu} />

				  {/* ================================================== HE THONG GIAM SAT TRUC TUYEN XA DONG CHAY QUA NHA MAY================================================== */}
				  <ProtectedRoute exact path="/he-thong-giam-sat/truc-tuyen-xa-dong-chay-qua-nha-may" component={HeThongGiamSatTrucTuyenXaDongChayQuaNhaMay} />
			<ProtectedRoute exact path="/he-thong-giam-sat/truc-tuyen-xa-dong-chay-qua-nha-may/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuTrucTuyenXaDongChayQuaNhaMay} />
			
			
			  {/* ================================================== HE THONG GIAM SAT TRUC TUYEN XA TR??N================================================== */}
				  <ProtectedRoute exact path="/he-thong-giam-sat/truc-tuyen-xa-tr??n" component={HeThongGiamSatTrucTuyenXaQuaTran} />
			<ProtectedRoute exact path="/he-thong-giam-sat/truc-tuyen-xa-tr??n/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuTrucTuyenXaQuaTran} />
		
		  {/* ================================================== HE THONG GIAM SAT TRUC TUYEN H??? CH???A ????? S???N XU???T N??NG NGHI??P================================================== */}
		  <ProtectedRoute exact path="/he-thong-giam-sat/truc-tuyen-ho-chua-san-xuat-nong-nghiep" component={HeThongGiamSatTrucTuyenKhaiThacSXNN} />
			<ProtectedRoute exact path="/he-thong-giam-sat/truc-tuyen-ho-chua-san-xuat-nong-nghiep/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuTrucTuyenKhaiThacSXNN} />
		
			  	  {/* ================================================== HE THONG GIAM SAT TRUC TUYEN MUC NUOC GIENG QUAN TRAC================================================== */}
		  <ProtectedRoute exact path="/he-thong-giam-sat/truc-tuyen-muc-muoc-gieng-quan-trac" component={HeThongGiamSatTrucTuyenMucNuocGiengQuanTrac} />
			  <ProtectedRoute exact path="/he-thong-giam-sat/truc-tuyen-muc-muoc-gieng-quan-trac/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuTrucTuyenMucNuocGiengQuanTracN} />
			  
 	  {/* ================================================== HE THONG GIAM SAT CAMERA VAN HANH XA DCTT ================================================== */}
	   <ProtectedRoute exact path="/he-thong-giam-sat/camera-van-hanh-xa-dctt" component={HeThongGiamSatCameraXaDCTT} />
			  <ProtectedRoute exact path="/he-thong-giam-sat/camera-van-hanh-xa-dctt/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuCameraXaDCTT} />

		 {/* ================================================== HE THONG GIAM SAT CAMERA VAN HANH XA NUOC QUA TRAN ================================================== */}
		 <ProtectedRoute exact path="/he-thong-giam-sat/camera-van-hanh-xa-nuoc-qua-tran" component={HeThongGiamSatCameraXaNuocQuaTran} />
			  <ProtectedRoute exact path="/he-thong-giam-sat/camera-van-hanh-xa-nuoc-qua-tran/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuCameraXaNuocQuaTran} />
			  

			    {/* ================================================== HE THONG GIAM SAT DINH KY XA TRAN HO================================================== */}
		  <ProtectedRoute exact path="/he-thong-giam-sat/dinh-ky-xa-tran-ho-nho" component={HeThongGiamSatDinhKyXaTranHoNho} />
			<ProtectedRoute exact path="/he-thong-giam-sat/dinh-ky-xa-tran-ho-nho/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuDinhKyXaTranHoNho} />


			  		    {/* ================================================== HE THONG GIAM SAT DINH KY KHAI THAC SAN XUAT NONG NGHIEP NHO HON================================================== */}
		  <ProtectedRoute exact path="/he-thong-giam-sat/dinh-ky-khai-thac-luu-luong" component={HeThongGiamSatDinhKyKhaiThacSXNN} />
			<ProtectedRoute exact path="/he-thong-giam-sat/dinh-ky-khai-thac-luu-luong/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuDinhKyKhaiThacSXNN} />

	  	  {/* ================================================== HE THONG GIAM SAT dinh ky MUC NUOC GIENG QUAN TRAC================================================== */}
			<ProtectedRoute exact path="/he-thong-giam-sat/dinh-ky-muc-muoc-gieng-quan-trac" component={HeThongGiamSatDinhKyMucNuocGiengQuanTrac} />
			  <ProtectedRoute exact path="/he-thong-giam-sat/dinh-ky-muc-muoc-gieng-quan-trac/lich-su/:id_hangmuc" component={HeThongGiamSatLichSuDinhKyMucNuocGiengQuanTracN} />


				{/* ==================================================BAO CAO BIEU MAU================================================== */}
				<ProtectedRoute exact path="/bao-cao-bieu-mau" component={BaoCaoBieuMau} />
			</Switch>
		</BrowserRouter>
  );
}

export default App;
