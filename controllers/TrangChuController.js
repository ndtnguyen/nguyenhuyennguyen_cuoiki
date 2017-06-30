var express = require('express');
var trangchuRepo = require('../models/trangchuRepo');
var r = express.Router();

r.get('/', function(req, res) {
    trangchuRepo.loadTrangChu()
        .then(function(data) {
            res.render('trangchu/index',
            {
                layoutVM: res.locals.layoutVM,
                an: data.anhnen,
            	top5NhieuNhat:  data.SPNhieu, 
            	top5CaoNhat: data.SPCao, 
            	top5SapHet :data.SPHet,
            });
            
        });   
});
r.post('/timkiem', function(req, res){
    trangchuRepo.TimKiem(req.body).then(function(rows){
        if (rows === null)
        {
            res.render('trangchu/timkiem',
            {
                layoutVM: res.locals.layoutVM,
                showError: true,
                errorMsg: 'Không tìm thấy sản phẩm nào. Mời bạn tiếp tục tìm kiếm.'
                
            });
        }
        else
        {
            res.render('trangchu/timkiem',
            {
                layoutVM: res.locals.layoutVM,
                dssp: rows.SanPham                
            });
        }
    });    
});
r.get('/timkiem', function(req, res){
    /*trangchuRepo.TimKiem(req.body).then(function(rows){
        if (rows === null)
        {
            res.render('trangchu/timkiem',
            {
                layoutVM: res.locals.layoutVM,
                showError: true,
                errorMsg: 'Không tìm thấy sản phẩm nào. Mời bạn tiếp tục tìm kiếm.'
                
            });
        }
        else
        {
            res.render('trangchu/timkiem',
            {
                layoutVM: res.locals.layoutVM,
                dssp: rows.SanPham                
            });
        }
    });  */
       res.render('trangchu/timkiemTenDM',
            {
                layoutVM: res.locals.layoutVM,
               
            });

});

r.get('/timkiem/TenDanhMuc', function(req, res){
    trangchuRepo.TimKiemTenDanhMuc(req.body).then(function(rows){
        if (rows === null)
        {
            res.render('trangchu/timkiemTenDM',
            {
                layoutVM: res.locals.layoutVM,
                showError: true,
                errorMsg: 'Không tìm thấy sản phẩm nào. Mời bạn tiếp tục tìm kiếm.'
                
            });
        }
        else
        {
            res.render('trangchu/timkiemTenDM',
            {
                layoutVM: res.locals.layoutVM,
                dssp: rows.SanPham                
            });
        }
    });

    
});

r.get('/timkiem/TenSanPham', function(req, res){
    trangchuRepo.TimKiemTenSanPham(req.body).then(function(rows){
        if (rows === null)
        {
            res.render('trangchu/timkiemTenSP',
            {
                layoutVM: res.locals.layoutVM,
                showError: true,
                errorMsg: 'Không tìm thấy sản phẩm nào. Mời bạn tiếp tục tìm kiếm.'
                
            });
        }
        else
        {
            res.render('trangchu/timkiemTenSP',
            {
                layoutVM: res.locals.layoutVM,
                dssp: rows.SanPham                
            });
        }
    });

    
});

r.get('/timkiem/NguoiDang', function(req, res){
    trangchuRepo.TimKiemTenUser(req.body).then(function(rows){
        if (rows === null)
        {
            res.render('trangchu/timkiemNguoiDang',
            {
                layoutVM: res.locals.layoutVM,
                showError: true,
                errorMsg: 'Không tìm thấy sản phẩm nào. Mời bạn tiếp tục tìm kiếm.'
                
            });
        }
        else
        {
            res.render('trangchu/timkiemNguoiDang',
            {
                layoutVM: res.locals.layoutVM,
                dssp: rows.SanPham                
            });
        }
    });

    
});

module.exports = r;