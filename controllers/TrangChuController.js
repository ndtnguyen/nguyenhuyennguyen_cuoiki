var express = require('express');
var trangchuRepo = require('../models/trangchuRepo');
var r = express.Router();

r.get('/', function(req, res) {
	
    
    trangchuRepo.loadTrangChu()
        .then(function(data) {
            res.render('trangchu/index',
            {
                layoutVM: res.locals.layoutVM,
                an: data.anhnen,
            	top5NhieuNhat:  data.SPNhieu, 
            	top5CaoNhat: data.SPCao, 
            	top5SapHet :data.SPHet
            });
            
        });   

      
});

module.exports = r;