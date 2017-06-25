var express = require('express');
var nguoimua = require('../models/nguoimua');
var crypto = require('crypto');
var moment = require('moment');
var restrict = require('../middle-wares/restrict');
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
module.exports = r;