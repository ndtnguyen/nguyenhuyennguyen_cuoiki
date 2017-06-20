var mustache = require('mustache'),
    db = require('../fn/db');

exports.loadAllByCat = function(catId) {
    var obj = {
        CatID: catId
    };
    var sql = mustache.render(
        'select * from products where CatID = {{CatID}}',
        obj
    );
    return db.load(sql);
}

exports.loadSanPham = function(maSP) {
    var obj = {
       MaSP: maSP
    };
    var sql = mustache.render(
        'select * from sanpham where MaSP = {{MaSP}}',
        obj
    );
    return db.load(sql);
}