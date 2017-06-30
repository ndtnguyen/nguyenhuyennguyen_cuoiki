var express = require('express');
var nguoimua = require('../models/nguoimua');
var crypto = require('crypto');
var moment = require('moment');
var restrict = require('../middle-wares/restrict');
var sanpham = require('../models/SanPhamRepo');
var r = express.Router();
var taikhoanRepo = require('../models/taikhoanRepo');
var nguoiban = require('../models/nguoibanRepo');
var multer =  require('multer');
var images =[];
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/Imgs/');
  },
  filename: function (req, file, callback) {
    images.push("/"+file.originalname);
    callback(null,  file.originalname);
  }

});


var upload = multer({ storage : storage });
r.get('/profile', function(req, res) {
    res.render('nguoiban/profile', {
        layoutVM: res.locals.layoutVM,
    });
});
r.get('/chinhsuathongtincanhan', function(req, res) {
    res.render('nguoiban/chinhsuathongtincanhan', {
        layoutVM: res.locals.layoutVM,
    });
});
r.post('/chinhsuathongtincanhan', function(req, res) {
    console.log(req.body);

 var ePWD = crypto.createHash('md5').update(req.body.rawPWD).digest('hex');
    var nDOB = moment(req.body.dob, 'D/M/YYYY').format('YYYY-MM-DDTHH:mm');
    var entity = {
        id: req.body.id,
        username: req.body.username,
        password: ePWD,
        name: req.body.name,
        email: req.body.email,
        dob: nDOB,
        permission: 0
    };
    taikhoanRepo.updateProfile(entity);
    req.session.user = entity;
    res.render('nguoiban/ketquacapnhat', {
        layoutVM: res.locals.layoutVM,
        showError: true,
        errorMsg: 'Cập nhật thông tin thành công!!!!'
    });
});
r.get('/dangsanphamlenban', function(req, res) {
   
            res.render('nguoiban/dangsanphamlenban', {
                layoutVM: res.locals.layoutVM,
                showError: false,
                errorMsg: 'Đăng sản phẩm lên bán thành công. Cảm ơn!!!!'
            });

});

r.post('/dangsanphamlenban', upload.any(), function(req, res) {
    console.log(req.body);
    var nTOD = moment(req.body.timetodie, 'D/M/YYYY').format('YYYY-MM-DDTHH:mm');
    var nTD = moment(req.body.time, 'D/M/YYYY').format('YYYY-MM-DDTHH:mm');
    console.log(images.length);
    var entity = {
        name: req.body.name,
        cost: req.body.cost,
        step: req.body.step,
        type: req.body.type,
        id: req.body.id,
        time: nTD,
        timetodie: nTOD,
        costtobuy: req.body.costtobuy,
    };
    nguoiban.insert(entity)
        .then(function(insertId) {
            res.render('nguoiban/dangsanphamlenban', {
                layoutVM: res.locals.layoutVM,
                showError: true,
                errorMsg: 'Đăng sản phẩm lên bán thành công. Cảm ơn!!!!'
            });
        });


});

r.post('/danhsachsanphamconguoimua', function(req, res) {
   var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;
    console.log(req.body);

    nguoiban.loadPageByProduct_Sold(req.session.user.id, rec_per_page, offset)
        .then(function(data) {

            var number_of_pages = data.total / rec_per_page;
            if (data.total % rec_per_page > 0) {
                number_of_pages++;
            }

            var pages = [];
            for (var i = 1; i <= number_of_pages; i++) {
                pages.push({
                    pageValue: i,
                    isActive: i === +curPage
                });
            }

            res.render('nguoiban/danhsachsanphamconguoimua', {
                layoutVM: res.locals.layoutVM,
                sanpham: data.list,
                isEmpty: data.total === 0,
                pages: pages,
                curPage: curPage,
                prevPage: curPage - 1,
                nextPage: curPage + 1,
                showPrevPage: curPage > 1,
                showNextPage: curPage < number_of_pages - 1,
            });
        });

});
r.get('/danhsachsanphamconguoimua', function(req, res) {
   var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    nguoiban.loadPageByProduct_Sold(req.session.user.id, rec_per_page, offset)
        .then(function(data) {

            var number_of_pages = data.total / rec_per_page;
            if (data.total % rec_per_page > 0) {
                number_of_pages++;
            }

            var pages = [];
            for (var i = 1; i <= number_of_pages; i++) {
                pages.push({
                    pageValue: i,
                    isActive: i === +curPage
                });
            }

            res.render('nguoiban/danhsachsanphamconguoimua', {
                layoutVM: res.locals.layoutVM,
                sanpham: data.list,
                isEmpty: data.total === 0,
                pages: pages,
                curPage: curPage,
                prevPage: curPage - 1,
                nextPage: curPage + 1,
                showPrevPage: curPage > 1,
                showNextPage: curPage < number_of_pages - 1,
            });
        });

});
r.get('/danhsachsanphamconguoimua', function(req, res) {
   var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    nguoiban.loadPageByProduct_Sold(req.session.user.id, rec_per_page, offset)
        .then(function(data) {

            var number_of_pages = data.total / rec_per_page;
            if (data.total % rec_per_page > 0) {
                number_of_pages++;
            }

            var pages = [];
            for (var i = 1; i <= number_of_pages; i++) {
                pages.push({
                    pageValue: i,
                    isActive: i === +curPage
                });
            }

            res.render('nguoiban/danhsachsanphamconguoimua', {
                layoutVM: res.locals.layoutVM,
                sanpham: data.list,
                isEmpty: data.total === 0,
                pages: pages,
                curPage: curPage,
                prevPage: curPage - 1,
                nextPage: curPage + 1,
                showPrevPage: curPage > 1,
                showNextPage: curPage < number_of_pages - 1,
            });
        });

});
r.post('/kick', function(req, res) {
    var entity ={
        nguoimua : req.body.nguoimua,
        sanpham : req.body.sanpham,
        lido : req.body.lido,
        ngay: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    nguoiban.kick(entity).then(function(rows) {
        res.redirect(req.headers.referer);
        });
});

r.post('/xemdanhgia', function(req, res) {
    nguoimua.loadAllComment(req.session.user.id)
        .then(function(data) {
            res.render('nguoiban/xemdanhgia', {
                comments: data.list,
            });
        });

});
r.get('/xemdanhgia', function(req, res) {
    nguoimua.loadAllComment(req.session.user.id)
        .then(function(data) {
            res.render('nguoiban/xemdanhgia', {
                comments: data.list,
            });
        });

});

r.post('/danhgianguoithang', function(req, res) {
   console.log(req.body);

    var entity = {
        idNguoiThang : req.body.idNguoiThang,
        idNguoiBan: req.body.idNguoiBan,
        ngay : new Date().toISOString().slice(0, 19).replace('T', ' '),
        point: req.body.point,
        comment: req.body.comment,

    }

    nguoiban.insertTocommentWinner(entity).then(function(rows) {
      nguoimua.loadAllComment(req.body.idNguoiBan)
        .then(function(data) {
            res.render('nguoiban/xemdanhgia', {
                comments: data.list,
            });
        });
});
});

r.post('/danhsachsanphamdadanglen', function(req, res) {
   var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    nguoiban.loadPageByProduct_Sell(req.session.user.id, rec_per_page, offset)
        .then(function(data) {

            var number_of_pages = data.total / rec_per_page;
            if (data.total % rec_per_page > 0) {
                number_of_pages++;
            }

            var pages = [];
            for (var i = 1; i <= number_of_pages; i++) {
                pages.push({
                    pageValue: i,
                    isActive: i === +curPage
                });
            }

            res.render('nguoiban/danhsachsanphamdadanglen', {
                layoutVM: res.locals.layoutVM,
                sanpham: data.list,
                isEmpty: data.total === 0,
                pages: pages,
                curPage: curPage,
                prevPage: curPage - 1,
                nextPage: curPage + 1,
                showPrevPage: curPage > 1,
                showNextPage: curPage < number_of_pages - 1,
            });
        });

});
r.get('/danhsachsanphamdadanglen', function(req, res) {
   var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    nguoiban.loadPageByProduct_Sell(req.session.user.id, rec_per_page, offset)
        .then(function(data) {

            var number_of_pages = data.total / rec_per_page;
            if (data.total % rec_per_page > 0) {
                number_of_pages++;
            }

            var pages = [];
            for (var i = 1; i <= number_of_pages; i++) {
                pages.push({
                    pageValue: i,
                    isActive: i === +curPage
                });
            }

            res.render('nguoiban/danhsachsanphamdadanglen', {
                layoutVM: res.locals.layoutVM,
                sanpham: data.list,
                isEmpty: data.total === 0,
                pages: pages,
                curPage: curPage,
                prevPage: curPage - 1,
                nextPage: curPage + 1,
                showPrevPage: curPage > 1,
                showNextPage: curPage < number_of_pages - 1,
            });
        });

});
module.exports = r;