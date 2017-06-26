var Q = require('q');
var db = require('../fn/db');

exports.loadTrangChu = function() {
    console.log('load trang chu');

    var deferred = Q.defer();
    var promises =[];
    
    var sql1 = 'SELECT DG.SanPham, SP.TenSP, SP.GiaKhoiDiem, SP.BuocGia, SP.GiaHienTai, Sp.GiaMuaNgay, SP.DanhMuc, SP.NguoiDang, SP.NgayDang, TIMESTAMPDIFF(SECOND,NOW(),SP.ThoiGianHet) AS Giay, SP.NguoiThangCuoc, SP.QuanTri, COUNT(*) AS SoLuotDat FROM SANPHAM SP, NGUOIDUNGDAUGIASP DG WHERE SP.ThoiGianHet >= NOW() AND SP.MaSP = DG.SanPham  GROUP BY DG.SanPham, SP.TenSP, SP.GiaKhoiDiem, SP.BuocGia, SP.GiaHienTai, Sp.GiaMuaNgay, SP.DanhMuc, SP.NguoiDang, SP.NgayDang, SP.ThoiGianHet, SP.NguoiThangCuoc, SP.QuanTri ORDER BY COUNT(*) DESC LIMIT 5;';
	promises.push(db.load(sql1));
    var sql2= 'select *, TIMESTAMPDIFF(SECOND,NOW(),ThoiGianHet) AS Giay from SanPham WHERE ThoiGianHet > NOW() order by GiaHienTai desc Limit 5;';
    promises.push(db.load(sql2));
    var sql3 = 'select * from AnhNen where tinhTrang = 1;';
    promises.push(db.load(sql3));
    var sql4 = 'SELECT*, TIMESTAMPDIFF(SECOND,NOW(),ThoiGianHet) AS Giay FROM SANPHAM WHERE ThoiGianHet > NOW() ORDER BY ThoiGianHet ASC LIMIT 5;'
    promises.push(db.load(sql4));
    
 	Q.all(promises).spread(function(rowsSP, rowsSPCao,rowsAN,rowsSPHet) {
        
        var data = {
            SPNhieu : rowsSP,
            SPCao : rowsSPCao,
            anhnen : rowsAN,
            SPHet : rowsSPHet
        }
        console.log(data.SPCao);
        deferred.resolve(data);
    });
    return deferred.promise;
}

