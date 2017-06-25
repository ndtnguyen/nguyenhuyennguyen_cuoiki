var Q = require('q');
var mustache = require('mustache');
var db = require('../fn/db');
var moment = require('moment');
exports.insert = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'insert into sanpham (TenSP,GiaKhoiDiem,BuocGia,DanhMuc,NguoiDang,NgayDang,ThoiGianHet,NguoiThangCuoc,QuanTri,GiaHienTai, GiaMuaNgay) values ("{{name}}",  "{{cost}}", {{step}}, "{{type}}", "{{id}}", "{{time}}", "{{timetodie}}", "0", "1", "{{cost}}", "{{costtobuy}}")',
            entity
        );

    db.insert(sql).then(function(insertId) {
        deferred.resolve(insertId);
    });

    return deferred.promise;
}

exports.loadPageByProduct_Sell = function(id,limit, offset) {

    var deferred = Q.defer();

    var promises = [];
    var view = {
        id: id,
        limit: limit,
        offset: offset,
        time: moment().format('YYYY-MM-DD')
    };
    console.log( moment().format('YYYY-MM-DD'));
    
     var sqlCount = mustache.render('select count(*) as total from sanpham s where s.NguoiDang = {{id}} and "{{time}}" < s.ThoiGianHet ', view);
    promises.push(db.load(sqlCount));
   var sql = mustache.render('select * from sanpham s where s.NguoiDang = {{id}} and "{{time}}" < s.ThoiGianHet limit {{limit}} offset {{offset}}', view);
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
exports.loadPageByProduct_Sold = function(id,limit, offset) {

    var deferred = Q.defer();

    var promises = [];
    var view = {
        id: id,
        limit: limit,
        offset: offset,
        time: moment().format('YYYY-MM-DD')
    };
    console.log( moment().format('YYYY-MM-DD'));
    
     var sqlCount = mustache.render('select count(*) as total from sanpham s, nguoidung ng where s.NguoiDang = {{id}} and s.NguoiThangCuoc != 0 and s.NguoiThangCuoc = ng.MaKH ', view);
    promises.push(db.load(sqlCount));
   var sql = mustache.render('select * from sanpham s, nguoidung ng where s.NguoiDang = {{id}} and ng.MAKH = s.NguoiThangCuoc and s.NguoiThangCuoc !=0 limit {{limit}} offset {{offset}}', view);
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
