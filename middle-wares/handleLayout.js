var q = require('q'),
    danhmucRepo = require('../models/danhmucRepo');

module.exports = function(req, res, next) {
    q.all([
    	danhmucRepo.loadAll()
	]).spread(function(cRows) {
		res.locals.layoutVM = {
			danhmuc: cRows
		};
    	next();
    });
}