var Q = require('q');
var mustache = require('mustache');

var db = require('../fn/db');

exports.insert = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'insert into nguoidung (TenKH,DiaChi,LoaiNguoiDung,Username,Password,NgaySinh) values ("{{name}}",  "{{email}}", {{permission}}, "{{username}}", "{{password}}", "{{dob}}")',
            entity
        );

    db.insert(sql).then(function(insertId) {
        deferred.resolve(insertId);
    });

    return deferred.promise;
}

exports.dangnhap = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'select * from nguoidung where Username = "{{username}}" and Password = "{{password}}"',
            entity
        );

    db.load(sql).then(function(rows) {
        if (rows.length > 0) {
            var user = {
                id: rows[0].MAKH,
                username: rows[0].Username,
                name: rows[0].TenKH,
                email: rows[0].DiaChi,
                dob: rows[0].NgaySinh,
                permission: rows[0].LoaiNguoiDung
            }
            deferred.resolve(user);
        } else {
            deferred.resolve(null);
        }
    });

    return deferred.promise;
}