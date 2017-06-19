var express = require('express');

var r = express.Router();

r.get('/', function(req, res) {
    var vm = {
    	layoutVM: res.locals.layoutVM
    };
    res.render('home/index', vm);
});



module.exports = r;