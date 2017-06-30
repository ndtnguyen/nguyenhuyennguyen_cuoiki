var Q = require('q');
var mustache = require('mustache');
var db = require('../fn/db');
var moment = require('moment');
var mail = require('../fn/mailtouser');
exports.loadAllComment = function(id) {
        var deferred = Q.defer();
        var promises=[];
        var sql = 'select * from danhgianguoidung dg , nguoidung nd where dg.NguoiDanhGia = nd.MaKH and dg.ChuTK =' + id;
        promises.push(db.load(sql));
        console.log(sql);
        Q.all(promises).spread(function(rows) {
            var data = {
                list: rows,
            }
            console.log(data);
            deferred.resolve(data);
        });
        return deferred.promise;
}
exports.LoadNguoiMuaXinBan = function(entity)
{
    var deferred = Q.defer();
    
    var sql = mustache.render('select* from nguoidungxinban where MaKH = {{id}} and TinhTrang is null ;', entity);
    
    db.load(sql).then(function(rows)
    {
        if (rows.length > 0)
        {
            var xinban = 
            {
                id: rows[0].MaKH
            }
            deferred.resolve(xinban)
        }
        else
        {
            deferred.resolve(null);
        }
    });
    return deferred.promise;
}

exports.DangKyNangQuyenBan = function(entity)
{
    var sql = mustache.render('insert into nguoidungxinban(MaKH, ThoiGianXin) values ({{id}}, now());', entity);
    console.log(sql);
    return db.insert(sql);
}