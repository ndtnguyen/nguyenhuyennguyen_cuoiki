var express = require('express');
var nguoimua = require('../models/nguoimua');
var crypto = require('crypto');
var moment = require('moment');
var restrict = require('../middle-wares/restrict');
var sanpham = require('../models/sanphamRepo');
var r = express.Router();
var taikhoanRepo = require('../models/taikhoanRepo');
var nguoiban = require('../models/nguoibanRepo');
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
        permission: 1
    };
    taikhoanRepo.updateProfile(entity);
    req.session.user = entity;
    res.render('nguoiban/ketquacapnhat', {
        layoutVM: res.locals.layoutVM,
        showError: true,
        errorMsg: 'Cập nhật thông tin thành công!!!!'
    });
});
r.get('/dangsanphamlenban',function(req,res) {
    res.render('nguoiban/dangsanphamlenban',{
        layoutVM:res.locals.layoutVM,
    });
});
r.post('/dangsanphamlenban', function(req, res) {
    console.log(req.body);
    var nTOD = moment(req.body.timetodie, 'D/M/YYYY').format('YYYY-MM-DDTHH:mm');
    var nTD = moment(req.body.time, 'D/M/YYYY').format('YYYY-MM-DDTHH:mm');
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
                errorMsg: 'Đăng ký thành công. Vui lòng đăng nhập để tiếp tục. Cảm ơn'
            });
        });
});

r.post('/danhsachsanphamdadanglen', function(req, res) {
   var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    nguoiban.loadPageByProduct_Sell(req.body.id, rec_per_page, offset)
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
r.post('/danhsachsanphamconguoimua', function(req, res) {
   var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    nguoiban.loadPageByProduct_Sold(req.body.id, rec_per_page, offset)
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
module.exports = r;
