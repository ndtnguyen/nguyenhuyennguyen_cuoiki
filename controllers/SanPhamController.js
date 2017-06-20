var express = require('express'),
    SanPhamRepo = require('../models/SanPhamRepo');

var r = express.Router();

r.get('/chitiet/:id', function(req, res) {

    var maSP = req.params.id;
    if (!maSP) {
        res.redirect('/');
    }

    SanPhamRepo.loadSanPham(maSP)
        .then(function(pRows) {
            var vm = {
                layoutVM: res.locals.layoutVM,
                sanpham: pRows
            };
            
            res.render('sanpham/chitiet', vm);

        });
});

module.exports = r;