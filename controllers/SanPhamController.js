var express = require('express'),
    SanPhamRepo = require('../models/SanPhamRepo');

var r = express.Router();

r.get('/theodanhmuc/:id', function(req, res) {
    var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    sanphamRepo.loadPageByCat(req.params.id, rec_per_page, offset)
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

    SanPhamRepo.loadDetail(maSP)
        .then(function(data) {
            res.render('sanpham/chitiet',
            {
                layoutVM: res.locals.layoutVM,
                sanpham: data.product,
                nguoiban : data.saler,
                mota : data.description
            });

        });
});

module.exports = r;
