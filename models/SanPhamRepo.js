var mustache = require('mustache'),
    db = require('../fn/db'),
    Q = require('q');

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

exports.loadAllByCat = function(id) {
    var deferred = Q.defer();

    var sql = 'select * from sanpham where DanhMuc = ' + id;
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}

exports.loadDetail = function(id) {
    var deferred = Q.defer();

    var promises = [];

    var sql1 = 'select * from sanpham where MaSP = ' + id;
    promises.push(db.load(sql1));

    var sql2 = 'select * from sanpham s,nguoidung nd where s.NguoiDang=nd.MAKH and s.MaSP='+id;
    promises.push(db.load(sql2));

    var sql3 = 'select * from sanpham s,motasanpham mt where s.MaSP=mt.maSP and s.MaSP='+id;
    promises.push(db.load(sql3));

    Q.all(promises).spread(function(rowsSP, rowsND, rowsMT) {
        var data = {
            product: rowsSP,
            saler: rowsND,
            description: rowsMT
        }
        deferred.resolve(data);
    });
    return deferred.promise;
}
