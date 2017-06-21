var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');

exports.loadAll = function() {
    var sql = 'select * from danhmuc';
    return db.load(sql);
}

