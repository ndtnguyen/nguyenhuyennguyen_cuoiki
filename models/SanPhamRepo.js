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
    
    Q.all(promises).spread(function(rowsSP, rowsND, rowsMT,rowsYT) {
        var data = {
            product: rowsSP,
            saler: rowsND,
            description: rowsMT,
            liked : rowsYT[0].total
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

