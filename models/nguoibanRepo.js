var Q = require('q');
var mustache = require('mustache');
var db = require('../fn/db');
var moment = require('moment');
var mail = require('../fn/mailtouser');
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
    console.log(sql);
    Q.all(promises).spread(function(totalRow, rows) {
        console.log(rows);
        var data = {
            total: totalRow[0].total,
            list: rows
        }
        deferred.resolve(data);
    });
    return deferred.promise;
}

exports.loadIDbyNameProduct= function(entity)
{
    var deferred = Q.defer();
    var promises = [];
    var sql = mustache.render('select MaSP from sanpham where TenSP = {{name}} ', entity);
    promises.push(db.load(sql));
    return deferred.promise;

}
exports.insertDetailProduct = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'insert into motasanpham(MaSP, LanMoTa, NoiDung, NgayDang) values ("{{id}}", "1", "{{describe}}", {{time}}})',
            entity
        );

    db.insert(sql).then(function(insertId) {
        deferred.resolve(insertId);
    });

    return deferred.promise;
}
exports.kick = function(entity) {

    var deferred = Q.defer();
    var promises=[];
    
    var sql5 = mustache.render (
            'select * from nguoidung where MaKH={{nguoimua}}',
            entity);
    promises.push(db.load(sql5));
    
    var sql6= mustache.render (
            'select * from sanpham where MaSP={{sanpham}}',
            entity);
    promises.push(db.load(sql6));

    var sql1 =
        mustache.render(
            'delete from nguoidungdaugiasp where NguoiDung={{nguoimua}} and SanPham={{sanpham}}',
            entity
        );
    promises.push(db.delete(sql1));

    var sql2 = 
        mustache.render(
            'update sanpham set GiaHienTai=(select MAX(Gia) from nguoidungdaugiasp where SanPham={{sanpham}}) where MaSP={{sanpham}}',
            entity);
    promises.push(db.update(sql2));

    var sql3 = 
        mustache.render(
            'update sanpham set NguoiThangCuoc=(select NguoiDung from nguoidungdaugiasp where SanPham={{sanpham}} and Gia=(select MAX(Gia) from nguoidungdaugiasp) where MaSP={{sanpham}}',
            entity);
    
    var sql4 = mustache.render (
            'insert into nguoidungbicamsp (NguoiDung,SanPham,ThoiGian,LyDo) values ("{{nguoimua}}","{{sanpham}}","{{ngay}}","{{lido}}")',
            entity);
    promises.push(db.insert(sql4));
    
    
    
    Q.all(promises).spread(function(nguoimua,sp,deleteID,updateID1,updateID2,insertID) {
        
        var mailinfo = {
                email : nguoimua[0].DiaChi,
                subject : 'Bạn đã bị chặn khỏi đấu giá',
                htmltext : 'Chào bạn <b>'+nguoimua[0].TenKH+'</b>,'
                            +'<br><br>Auction.com xin được thông báo bạn đã bị người mua loại khỏi cuộc đấu giá'
                            +'<br> cho sản phẩm '+sp[0].TenSP+' vào lúc '+ entity.ngay
                            +'<br><br>Lý do:'+entity.lido
            }
        mail.mailtouser(mailinfo);
        deferred.resolve(1);
    });
    
    
    return deferred.promise;
}

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
exports.insertTocommentWinner = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'insert into danhgianguoidung (ChuTK,NguoiDanhGia,ThoiGian,DiemDangGia,NoiDung) values ("{{idNguoiThang}}",  "{{idNguoiBan}}", "{{ngay}}", "{{point}}",  "{{comment}}")',
            entity
        );

    db.insert(sql).then(function(insertId) {
        deferred.resolve(insertId);
    });
    return deferred.promise;
}
exports.loadCommentWinner = function(idNguoiThang, idNguoiBan)
{
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
    console.log(sql);
    Q.all(promises).spread(function(totalRow, rows) {
        console.log(rows);
        var data = {
            total: totalRow[0].total,
            list: rows
        }
        deferred.resolve(data);
    });
    return deferred.promise;
}
