var debug = require('./debug')

///superagent setup...
var request = require('superagent');
var PullRequest = require( './pullRequest.js');

///locals
var _url;

var RepoHelper = function (url) {
    _url = url;
};

RepoHelper.prototype.get = function (buildId, callback) {
    debug('inside of get');
    var rv;
    request
        .get(_url + '/' + buildId)
        .use(setnocache)
        .end(function (err, res) {
            // Do something
            if (err) {
                debug('got an ERROR');
                callback(err);
            }
            else {
                debug('got a response with status code...');
                debug(res.statusCode);

                rv = PullRequest.parse(res.body);
                debug('done parsing response');
                if (callback) callback(null, rv);
            }
        });
}

RepoHelper.prototype.set = function(buildId, status, callback){
    debug('inside of set');
    
    request
        .put( _url + '/' + buildId)
        .use(setnocache)
        .send({ 'status' : status })
        .end(function(err, res){
            if (err) {
                debug('got an ERROR');
                callback(err);
            }
            else {
                debug('got a response with status code...');
                debug(res.statusCode);
                if (callback) callback(null, res);
            }
        });
    
}

var setnocache = function setNoCache(request) {
    request.set('X-API-Key', 'foobar')
    request.set('Accept', 'application/json')
    request.set('X-Requested-With', 'XMLHttpRequest')
    request.set('Expires', '-1')
    request.set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private');

    return request;
}

module.exports = RepoHelper

