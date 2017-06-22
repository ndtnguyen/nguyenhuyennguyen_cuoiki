SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `DANHMUC`;
CREATE TABLE `DANHMUC`
(
	`MaDanhMuc` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`TenDanhMuc` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	`link` varchar(100),
	PRIMARY KEY (`MaDanhMuc`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



DROP TABLE IF EXISTS `SANPHAM`;
CREATE TABLE `SANPHAM`
(
	`MaSP` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`TenSP` varchar(20)  COLLATE utf8_unicode_ci NOT NULL,
	`GiaKhoiDiem` bigint(20),
	`BuocGia` int,
	`GiaHienTai` int,
	`GiaMuaNgay` int,
	`DanhMuc` int,
	`NguoiDang` int,
	`NgayDang` datetime,
	`ThoiGianHet` datetime,
	`NguoiThangCuoc` int,
	`QuanTri` int,
	PRIMARY KEY (`MaSP`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `MOTASANPHAM`;
CREATE TABLE `MOTASANPHAM`
(
	`MaSP` int(11),
	`LanMota` int,
	`NoiDung` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
	`NgayDang` datetime,
	primary key (`MaSP`, `LanMoTa`)
);

DROP TABLE IF EXISTS `NGUOIDUNG`;
CREATE TABLE `NGUOIDUNG`
(
	`MAKH` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`TenKH` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	`DiaChi` varchar(100)COLLATE utf8_unicode_ci,
	`SDT` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	`CMND` char(15) COLLATE utf8_unicode_ci NOT NULL,
	`DiemDanhGia` int,
	`LoaiNguoiDung` int,
	`userName` varchar(100) not null UNIQUE,
	`passWord` varchar(50) not null,
	PRIMARY KEY (`MAKH`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `DANHGIANGUOIDUNG`;
CREATE TABLE `DANHGIANGUOIDUNG`
(
	`ChuTK` int(11),
	`NguoiDanhGia` int,
	`ThoiGian` datetime,
	`DiemDangGia` int,
	`NoiDung` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY key (`ChuTK`, `NguoiDanhGia`)
);

DROP TABLE IF EXISTS `NGUOIDUNGBICAMSP`;
CREATE TABLE `NGUOIDUNGBICAMSP`
(
	`NguoiDung` int,
	SanPham int,
	ThoiGian datetime,
	LyDo varchar(100) COLLATE utf8_unicode_ci,
	PRIMARY KEY (`NguoiDung`)
);

DROP TABLE IF EXISTS `NGUOIDUNGDAUGIASP`;
CREATE TABLE `NGUOIDUNGDAUGIASP`
(
	`NguoiDung` int,
	`SanPham` int,
	`Gia` int,
	`ThoiGian` datetime,
	PRIMARY key (`NguoiDung`, `SanPham`, `ThoiGian`)
);

DROP TABLE IF EXISTS `NGUOIDUNGYEUTHICHSP`;
CREATE TABLE `NGUOIDUNGYEUTHICHSP`
(
	`NguoiDung` int,
	`SanPham` int,
	`ThoiGian` datetime,
	PRIMARY key (`NguoiDung`, `SanPham`)
);

DROP TABLE IF EXISTS `QUANTRI`;
CREATE TABLE `QUANTRI`
(
	`MaQTV` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`Ten` varchar(100),
	`DiaChi` varchar(100),
	`CMND` char(15),
	`TaiKhoan` varchar(100),
	`MatKhau` varchar(100),
	PRIMARY KEY (`MaQTV`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `NGUOIDUNGXINBAN`;
CREATE TABLE `NGUOIDUNGXINBAN`
(
	`MaKH` int,
	`Admin` int,
	`ThoiGianXin` datetime,
	`TinhTrang` varchar(50) COLLATE utf8_unicode_ci,
	PRIMARY KEY(`MaKH`)
);

DROP TABLE IF EXISTS `AnhNen`;
CREATE TABLE AnhNen
(
	MaAnh int PRIMARY KEY,
	tinhTrang int, 
	link varchar(100)
);


/*Đây là khóa ngoại*/
ALTER TABLE NGUOIDUNGXINBAN
ADD CONSTRAINT nxdb_KhachHang
FOREIGN KEY (MaKH)
REFERENCES NGUOIDUNG(MAKH);

ALTER TABLE NGUOIDUNGXINBAN
ADD CONSTRAINT nxdb_Admin
FOREIGN KEY (Admin)
REFERENCES QuanTri(MaQTV);

ALTER TABLE SANPHAM
ADD CONSTRAINT sp_danhmuc
FOREIGN KEY (DanhMuc)
REFERENCES DANHMUC(MaDanhMuc);

ALTER TABLE SANPHAM 
ADD CONSTRAINT sp_nguoiDang
FOREIGN KEY (NguoiDang)
REFERENCES NGUOIDUNG(MAKH);

ALTER TABLE SANPHAM 
ADD CONSTRAINT sp_nguoiThangCuoc
FOREIGN KEY (NguoiThangCuoc)
REFERENCES NGUOIDUNG(MAKH);

ALTER TABLE SANPHAM 
ADD CONSTRAINT sp_quanTri
FOREIGN KEY (QuanTri)
REFERENCES QUANTRI(MaQTV);

ALTER TABLE MOTASANPHAM 
ADD CONSTRAINT mt_cuaSanPham
FOREIGN KEY (MaSP)
REFERENCES SANPHAM(MaSP);

ALTER TABLE DANHGIANGUOIDUNG
ADD CONSTRAINT dgnd_DanhGia
FOREIGN KEY (ChuTk, NguoiDanhGia)
REFERENCES NGUOIDUNG(MAKH, MAKH);

ALTER TABLE NGUOIDUNGBICAMSP
ADD CONSTRAINT ndbc_CamSP
FOREIGN KEY (NguoiDung)
REFERENCES NGUOIDUNG(MAKH);

ALTER TABLE NGUOIDUNGBICAMSP
ADD CONSTRAINT ndbc_SanPhamCam
FOREIGN KEY (SanPham)
REFERENCES SANPHAM(MaSP);

ALTER TABLE NGUOIDUNGDAUGIASP
ADD CONSTRAINT nddgsp_NguoiDung
FOREIGN KEY (NguoiDung)
REFERENCES NGUOIDUNG(MAKH);

ALTER TABLE NGUOIDUNGDAUGIASP
ADD CONSTRAINT nddgsp_SanPham
FOREIGN KEY (SanPham)
REFERENCES SANPHAM(MaSP);

ALTER TABLE NGUOIDUNGYEUTHICHSP
ADD CONSTRAINT ndytsp_NguoiDung
FOREIGN KEY (NguoiDung)
REFERENCES NGUOIDUNG(MAKH);

ALTER TABLE NGUOIDUNGDAUGIASP
ADD CONSTRAINT ndytsp_SanPham
FOREIGN KEY (SanPham)
REFERENCES SANPHAM(MaSP);

