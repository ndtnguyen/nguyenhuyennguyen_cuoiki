var Q = require('q');
var danhmuc = require('../models/danhmucRepo');
var cart = require('../models/cart');

module.exports = function(req, res, next) {
    if (req.session.isLogged === undefined) {
        req.session.isLogged = false;
    }

    Q.all([
        danhmuc.loadAll()
    ]).spread(function(data) {
        res.locals.layoutVM = {
            danhmuc: data,
            isLogged: req.session.isLogged,
            curUser: req.session.user,
            //nguoimua: req.session.user.permission === 0, 
            //nguoiban: req.session.user.permission === 1, 
            //quantri: req.session.user.permission === 2, 
            amucdautien: data[0].MaDanhMuc,
            cartSumQ: cart.sumQ(req.session.cart)
        };
        next();
    });

};