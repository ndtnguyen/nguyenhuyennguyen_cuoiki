var express = require('express'),
    danhmuc = require('../models/danhmucRepo');

var r = express.Router();

r.get('/', function(req, res) {
    danhmuc.loadAll()
        .then(function(rows) {
            var vm = {
                layout: false,
                categories: rows
            };
            res.render('category/index', vm);
        }).fail(function(err) {
            console.log(err);
            res.end('fail');
        });
});

r.get('/add', function(req, res) {
    var vm = {
        layout: false,
    };
    res.render('category/add', vm);
});

r.post('/add', function(req, res) {

    danhmuc.insert(req.body).then(function(data) {
        var vm = {
            layout: false,
        };
        res.render('category/add', vm);
    }).catch(function(err) {
        console.log(err);
        res.end('insert fail');
    });
});

r.get('/edit', function(req, res) {
    var id = req.query.id;
    danhmuc.loadDetail(id).then(function(cat) {
        var vm = {
            layout: false,
            category: cat
        };
        res.render('category/edit', vm);
    });
});

r.post('/edit', function(req, res) {
    danhmuc.update(req.body).then(function(changedRows) {
        res.redirect('/category');
    })
});

r.post('/delete', function(req, res) {
    danhmuc.delete(req.body).then(function(affectedRows) {
        res.redirect('/category');
    })
});

module.exports = r;