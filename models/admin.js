var mustache = require('mustache');
var db = require('../fn/db');
var Q = require('q');
exports.LoadTatCaDanhMuc = function()
{
	var sql = 'select* from DanhMuc;'
	return db.load(sql);
}

exports.ThemDanhMucMoi = function(entity)
{
	var sql = mustache.render("insert into danhmuc(TenDanhMuc) VALUES('{{TenDanhMucMoi}}');", entity);
	return db.insert(sql);
}

exports.XoaDanhMuc = function(entity)
{
	var sql = mustache.render("DELETE from danhmuc where MaDanhMuc = {{MaDanhMucXoa}};", entity);
	return db.delete(sql);
}
exports.LoadDanhMucTheoID = function(id)
{
	var d = Q.defer();

	var entity =
	{
		MaDanhMuc: id
	};
	var sql = mustache.render("select* from danhmuc where MaDanhMuc = {{MaDanhMuc}};", entity);
	db.load(sql).then(function(rows){
		d.resolve(rows[0]);
	});

	return d.promise;
}

exports.LoadSanPhamTheoDanhMuc = function(entity)
{
	var deferred = Q.defer();
	var sql= mustache.render("select* from sanpham where DanhMuc = {{MaDanhMucXoa}};", entity);

	db.load(sql).then(function(rows){
		if (rows.length > 0 )
		{
			var sp = 
			{
				masp: rows[0].MaSP,
				tensp: rows[0].TenSP
			}
			console.log(sp);
			deferred.resolve(sp);
		}
		else
		{
			deferred.resolve(null);
		}
	});
	return deferred.promise;
}

exports.CapNhatDanhMucTheoID = function(entity)
{
	var sql = mustache.render("update DanhMuc set TenDanhMuc = N'{{catName}}' where MaDanhMuc = {{catId}};", entity);
	return db.update(sql);
}

exports.LoadSanPhamChoDuyet = function()
{
	var sql = 'SELECT sp.*, nd.TenKH, dm.TenDanhMuc from sanpham sp, nguoidung nd, danhmuc dm where dm.MaDanhMuc = sp.DanhMuc and sp.QuanTri is null and sp.ThoiGianHet > now() and sp.NguoiDang= nd.MAKH;';
	return db.load(sql);
}

exports.DuyetSanPhamDuocBan = function(entity)
{
	var sql = mustache.render(
	'update SanPham set QuanTri = 1 where MaSP = {{MaSP}};', 
	entity);
	return db.update(sql);
}

exports.LoadNguoiDungXinNangQuyenBan = function()
{
	var sql = 'select x.*, nd.TenKH, nd.UserName, nd.DiaChi from nguoidungxinban x, nguoidung nd  WHERE x.TinhTrang is null and nd.MAKH = x.MaKH;';
	return db.load(sql);
}
exports.DuyetNguoiDungXinNangQuyenBan = function(entity)
{
	var deferred = Q.defer();
    var promises =[];
	var sql1 = mustache.render(
	'update NguoiDung set LoaiNguoiDung = 1 WHERE MAKH = {{MaKH}};', entity);
	promises.push(db.update(sql1));

	var sql2 = mustache.render(
	"update nguoidungxinban set TinhTrang = N'Đã duyệt' where MaKH = {{MaKH}};",
	entity);
	promises.push(db.update(sql2));

		Q.all(promises).spread(function(s1, s1){
        
        var data = {
            rc1 : s1,
            rc2 : s2
        }
        deferred.resolve(data);
    });

	return deferred.promises;
}

exports.LoadNguoiDungResetMatKhau = function()
{
	var sql = 'select r.*, nd.TenKH, nd.UserName, nd.DiaChi from nguoidungresetmk r, nguoidung nd where r.TinhTrang is null and nd.MAKH = r.MaKH;';
	return db.load(sql);
}

exports.NguoiDungResetMatKhau = function(entity)
{
	var deferred = Q.defer();
    var promises =[];
	var sql = mustache.render("update nguoidung set PassWord = '{{MatKhau}}' where MAKH = {{MaKH}};", entity);
	promises.push(db.update(sql));
	console.log(sql);

	var sql2 = mustache.render("update nguoidungresetmk set TinhTrang = N'Đã reset' where MaKH = {{MaKH}} and ThoiGian = '{{ThoiGian}}';", entity);
	promises.push(db.update(sql2));

	Q.all(promises).spread(function(s1, s1){
        
        var data = {
            rc1 : s1,
            rc2 : s2
        }
        deferred.resolve(data);
    });

	return deferred.promises;
}

