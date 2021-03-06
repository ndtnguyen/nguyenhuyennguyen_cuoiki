var express = require('express');
var crypto = require('crypto');
var moment = require('moment');

var restrict = require('../middle-wares/restrict');
var taikhoan = require('../models/taikhoanRepo');
var lastUrl = '/';
var mail = require('../fn/mailtouser');
var r = express.Router();


r.get('/dangnhap', function(req, res) {
    if(req.headers.referer!='http://localhost:3000/taikhoan/dangnhap')
        lastUrl = req.headers.referer;
    if (req.session.isLogged === true) {
        res.redirect(lastUrl);
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
                 
                var url = '/';
                
               if (lastUrl) {
                    url = lastUrl;
                }
                res.redirect(lastUrl);
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
                    var mailinfo = {
                        email : entity.email,
                        subject : 'Chào mừng bạn đến với Auction.com',
                        htmltext : 'Chào bạn <b>'+entity.name+'</b>,'
                                    +'<br>Cảm ơn bạn đã đăng kí tham gia Auction'
                                    +'<br>Hãy truy cập ngay trang web của chúng tôi để tham gia đấu giá sản phẩm đầu tiên'
                    }
                    mail.mailtouser(mailinfo);
                    res.render('taikhoan/dangki', {
                        layoutVM: res.locals.layoutVM,
                        showError: true,
                        errorMsg: 'Đăng ký thành công.'
                    });
                    console.log('render');
                });
 
      
});

r.get('/thongtin', restrict, function(req, res) {
    res.render('taikhoan/thongtin', {
        layoutVM: res.locals.layoutVM
    });
});

module.exports = r;
