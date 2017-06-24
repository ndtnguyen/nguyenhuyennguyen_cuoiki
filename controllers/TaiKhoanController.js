var express = require('express');
var crypto = require('crypto');
var moment = require('moment');

var restrict = require('../middle-wares/restrict');
var taikhoan = require('../models/taikhoanRepo');

var r = express.Router();


r.get('/dangnhap', function(req, res) {
    if (req.session.isLogged === true) {
        res.redirect('/trangchu');
    } else {
        res.render('taikhoan/dangnhap', {
            layoutVM: res.locals.layoutVM,
            showError: false,
            errorMsg: ''
        });
    }
});

r.post('/dangnhap', function(req, res) {

    var ePWD = crypto.createHash('md5').update(req.body.rawPWD).digest('hex');
    var entity = {
        username: req.body.username,
        password: ePWD,
    };

    var remember = req.body.remember ? true : false;

    taikhoan.dangnhap(entity)
        .then(function(user) {
            if (user === null) {
                res.render('taikhoan/dangnhap', {
                    layoutVM: res.locals.layoutVM,
                    showError: true,
                    errorMsg: 'Thông tin đăng nhập không đúng.'
                });
            } else {
                req.session.isLogged = true;
                req.session.user = user;
                req.session.cart = [];

                if (remember === true) {
                    var hour = 1000 * 60 * 60 * 24;
                    req.session.cookie.expires = new Date(Date.now() + hour);
                    req.session.cookie.maxAge = hour;
                }

                var url = '/trangchu';
                
                if (req.query.retUrl) {
                    url = req.query.retUrl;
                }
                res.redirect(url);
            }
        });
});

r.post('/dangxuat', restrict, function(req, res) {
    req.session.isLogged = false;
    req.session.user = null;
    req.session.cart = null;
    req.session.cookie.expires = new Date(Date.now() - 1000);

    res.redirect(req.headers.referer);
});

r.get('/dangki', function(req, res) {
    res.render('taikhoan/dangki', {
        layoutVM: res.locals.layoutVM,
        showError: false,
        errorMsg: ''
    });
});

r.post('/dangki', function(req, res) {

    var ePWD = crypto.createHash('md5').update(req.body.rawPWD).digest('hex');
    var nDOB = moment(req.body.dob, 'D/M/YYYY').format('YYYY-MM-DDTHH:mm');

    var entity = {
        username: req.body.username,
        password: ePWD,
        name: req.body.name,
        email: req.body.email,
        dob: nDOB,
        permission: 0
    };

    taikhoan.insert(entity)
        .then(function(insertId) {
            res.render('taikhoan/dangki', {
                layoutVM: res.locals.layoutVM,
                showError: true,
                errorMsg: 'Đăng ký thành công.'
            });
        });
});

r.get('/thongtin', restrict, function(req, res) {
    res.render('taikhoan/thongtin', {
        layoutVM: res.locals.layoutVM
    });
});

module.exports = r;