var express = require('express');
var crypto = require('crypto');
var moment = require('moment');
var restrict = require('../middle-wares/restrict');
var sanpham = require('../models/SanPhamRepo');
var r = express.Router();
var taikhoanRepo = require('../models/taikhoanRepo');
r.get('/profile', function(req, res) {
    res.render('nguoimua/profile', {
        layoutVM: res.locals.layoutVM,
    });
});
r.get('/chinhsuathongtincanhan', function(req, res) {
    res.render('nguoimua/chinhsuathongtincanhan', {
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
    res.render('nguoimua/ketquacapnhat', {
        layoutVM: res.locals.layoutVM,
        showError: true,
        errorMsg: 'Cập nhật thông tin thành công!!!!'
    });
});

r.get('/danhsachsanphamdathang', function(req, res) {
    console.log("-------------------------");
    console.log(req.body);
   var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    sanpham.loadPageByUser(37, rec_per_page, offset)
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

            res.render('nguoimua/danhsachsanphamdathang', {
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
r.post('/danhsachsanphamdathang', function(req, res) {
   var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    sanpham.loadPageByUser(req.body.id, rec_per_page, offset)
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

            res.render('nguoimua/danhsachsanphamdathang', {
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

r.post('/danhsachsanphamyeuthich', function(req, res) {
   var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    sanpham.loadPageByUserFavorite(req.body.id, rec_per_page, offset)
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

            res.render('nguoimua/danhsachsanphamyeuthich', {
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
r.post('/dsspthamgiadaugia', function(req, res) {
   var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    sanpham.loadPageByUserToAuction(req.body.id, rec_per_page, offset)
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

            res.render('nguoimua/DSSP_Thamgiadaugia', {
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