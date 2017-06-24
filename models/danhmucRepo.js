var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');

exports.loadAll = function() {
    var deferred = q.defer();
    var sql = 'select * from danhmuc';
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });
    return deferred.promise;
}

