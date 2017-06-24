var q = require('q'),
    danhmucRepo = require('../models/danhmucRepo');

module.exports = function(req, res, next) {
    if (req.session.isLogged === undefined) {
        req.session.isLogged = false;
    }
	q.all([
    	danhmucRepo.loadAll()
	]).spread(function(cRows) {
		res.locals.layoutVM = {
			danhmuc: cRows,
			isLogged: req.session.isLogged,
            		curUser: req.session.user
		};
    	next();
    });
}
