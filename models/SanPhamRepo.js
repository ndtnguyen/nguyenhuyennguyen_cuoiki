var Q = require('q');
var mustache = require('mustache');
var db = require('../fn/db');

exports.loadPageByCat = function(id, limit, offset) {

    var deferred = Q.defer();

    var promises = [];

    var view = {
        id: id,
        limit: limit,
        offset: offset
    };

    var sqlCount = mustache.render('select count(*) as total from sanpham where DanhMuc = {{id}}', view);
    promises.push(db.load(sqlCount));

    var sql = mustache.render('select * from sanpham where DanhMuc = {{id}} limit {{limit}} offset {{offset}}', view);
    promises.push(db.load(sql));

    Q.all(promises).spread(function(totalRow, rows) {
        var data = {
            total: totalRow[0].total,
            list: rows
        }
        deferred.resolve(data);
    });

    return deferred.promise;
}

exports.loadPageByUser = function(id, limit, offset) {

    var deferred = Q.defer();

    var promises = [];

    var view = {
        id: id,
        limit: limit,
        offset: offset
    };

    var sqlCount = mustache.render('select count(*) as total from sanpham where NguoiThangCuoc = {{id}}', view);
    promises.push(db.load(sqlCount));

    var sql = mustache.render('select * from sanpham where NguoiThangCuoc = {{id}} limit {{limit}} offset {{offset}}', view);
    promises.push(db.load(sql));

    Q.all(promises).spread(function(totalRow, rows) {
        var data = {
            total: totalRow[0].total,
            list: rows
        }
        deferred.resolve(data);
    });

    return deferred.promise;
}
exports.loadPageByUserFavorite = function(id,limit, offset) {

    var deferred = Q.defer();

    var promises = [];

    var view = {
        id: id,
        limit: limit,
        offset: offset
    };
     var sqlCount = mustache.render('select count(*) as total from sanpham s, nguoidungyeuthichsp ng where ng.NguoiDung = {{id}} and ng.SanPham = s.MaSP', view);
    promises.push(db.load(sqlCount));
   var sql = mustache.render('select * from sanpham s,nguoidungyeuthichsp ng where ng.NguoiDung = {{id}} and ng.SanPham = s.MaSP limit {{limit}} offset {{offset}}', view);
    promises.push(db.load(sql));

    Q.all(promises).spread(function(totalRow, rows) {
        var data = {
            total: totalRow[0].total,
            list: rows
        }
        deferred.resolve(data);
    });
    return deferred.promise;
}
exports.loadPageByUserToAuction = function(id,limit, offset) {

    var deferred = Q.defer();

    var promises = [];

    var view = {
        id: id,
        limit: limit,
        offset: offset
    };
     var sqlCount = mustache.render('select count(*) as total from sanpham s, nguoidungdaugiasp ng where ng.NguoiDung = {{id}} and s.NguoiThangCuoc = 0 and ng.SanPham = s.MaSP', view);
    promises.push(db.load(sqlCount));
   var sql = mustache.render('select * from sanpham s,nguoidungdaugiasp ng where ng.NguoiDung = {{id}} and s.NguoiThangCuoc = 0 and ng.SanPham = s.MaSP limit {{limit}} offset {{offset}}', view);
    promises.push(db.load(sql));

    Q.all(promises).spread(function(totalRow, rows) {
        var data = {
            total: totalRow[0].total,
            list: rows
        }
        deferred.resolve(data);
    });
    return deferred.promise;
}




exports.loadAllByCat = function(id) {

    var deferred = Q.defer();

    var sql = 'select * from sanpham where DanhMuc = ' + id;
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}

exports.loadDetail = function(idSP, idUser) {

    var deferred = Q.defer();

    var promises = [];

    var sql1 = 'select * from sanpham,danhmuc dm where MaSP = ' + idSP+' and s.DanhMuc=dm.MaDanhMuc';
    promises.push(db.load(sql1));

    var sql2 = 'select * from sanpham s,nguoidung nd where s.NguoiDang=nd.MAKH and s.MaSP='+idSP;
    promises.push(db.load(sql2));

    var sql3 = 'select * from sanpham s,motasanpham mt where s.MaSP=mt.maSP and s.MaSP='+idSP;
    promises.push(db.load(sql3));

    var sql4 = 'select count(*) as total from nguoidungyeuthichsp where NguoiDung='+idUser+' and SanPham='+idSP;
    promises.push(db.load(sql4));
    
    var sql5 = 'select count(*) as total from nguoidungbicamsp where NguoiDung='+idUser+' and SanPham='+idSP;
    promises.push(db.load(sql5));
    Q.all(promises).spread(function(rowsSP, rowsND, rowsMT,rowsYT,rowsC) {
        var data = {
            product: rowsSP,
            saler: rowsND,
            description: rowsMT,
            liked : rowsYT[0].total,
            banned : rowsC[0].total
        }
        deferred.resolve(data);
    });
    return deferred.promise;
}
exports.themYeuThich = function(entity) {
    var deferred = Q.defer();
    var sql = mustache.render('insert into nguoidungyeuthichsp (NguoiDung,SanPham,ThoiGian) values ("{{id}}","{{sanpham}}","{{ngay}}")',
                entity);
            db.insert(sql).then(function(insertId) {
            deferred.resolve(insertId);
            });

    return deferred.promise;
}

exports.huyYeuThich = function(entity) {
    var deferred = Q.defer();
    var sql = mustache.render('delete from nguoidungyeuthichsp where NguoiDung={{id}} and SanPham={{sanpham}}',
                entity);
            db.delete(sql).then(function(deletedId) {
            deferred.resolve(deletedId);
            });
      
    return deferred.promise;
}
exports.daugia = function(entity) {
    var deferred = Q.defer();
    var promises =[];
    var sql = 'select MAX(Gia) as maxgia,sp.BuocGia from nguoidungdaugiasp dg,sanpham sp where dg.SanPham='+entity.sanpham+' and sp.MaSP=dg.SanPham';
    db.load(sql).then(function(rows) {
            var giaCaoNhat = rows[0].maxgia;
            var buocgia = rows[0].buocgia;
            console.log(rows);
            if (entity.gia > giaCaoNhat) {
                var sql1 = mustache.render('insert into nguoidungdaugiasp (NguoiDung,SanPham,Gia,ThoiGian) values ("{{id}}","{{sanpham}}","{{gia}}","{{ngay}}")',
                entity);
                promises.push(db.load(sql1));
                var sql2 = mustache.render('update sanpham set GiaHienTai={{gia}},NguoiThangCuoc={{id}} where MaSP={{sanpham}}',
                    entity);
                promises.push(db.load(sql2));
                console.log(sql2);
                Q.all(promises).spread(function(insertId,updateId) {
                    deferred.resolve(1);
                });    
            }
            else
                deferred.resolve(0);
    });
    
return deferred.promise;
    
}

exports.lichsudaugia = function(id) {

    var deferred = Q.defer();
    var promises=[];
    
    var sql3 = 'select * from nguoidungdaugiasp dg,nguoidung nd where dg.SanPham = ' + id+' and dg.NguoiDung=nd.MAKH';
    promises.push(db.load(sql3));

    var sql4 = 'select * from danhmuc dm,sanpham sp where sp.MaSP='+id+' and sp.DanhMuc=dm.MaDanhMuc';
    promises.push(db.load(sql4));
    
    Q.all(promises).spread(function(rowsLS, rowsSP) {
        var data = {
            lichsu : rowsLS,
            sanpham : rowsSP
        }

        deferred.resolve(data);
    });
    return deferred.promise;
}
