var express = require('express'),
    SanPhamRepo = require('../models/SanPhamRepo');

var r = express.Router();

r.get('/theodanhmuc/:id', function(req, res) {
    var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    SanPhamRepo.loadPageByCat(req.params.id, rec_per_page, offset)
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

            res.render('sanpham/theodanhmuc', {
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

r.get('/chitiet/:id', function(req, res) {

    var maSP = req.params.id;
    if (!maSP) {
        res.redirect('/');
    }
    var userid = -1;
    if (req.session.isLogged)
        userid = req.session.user.id;
    SanPhamRepo.loadDetail(maSP)
        .then(function(data) {
        var bool;
        if(data.liked>0)
            bool = true;
            res.render('sanpham/chitiet',
            {
                layoutVM: res.locals.layoutVM,
                sanpham: data.product,
                nguoiban : data.saler,
                mota : data.description,
                liked : bool
            });

        });
});

r.post('/themyeuthich/:id', restrict, function(req, res) {
    
    var entity = {
        id : req.session.user.id,
        sanpham : req.params.id,
        ngay : new Date().toISOString().slice(0, 19).replace('T', ' '),
    }
    SanPhamRepo.themYeuThich(entity).then(function(message) {
        res.redirect(req.headers.referer);
        });
});

r.post('/huyyeuthich/:id', restrict, function(req, res) {
    var entity = {
        id : req.session.user.id,
        sanpham : req.params.id
    }
    SanPhamRepo.huyYeuThich(entity).then(function(message) {
        res.redirect(req.headers.referer);
        });
});

module.exports = r;
