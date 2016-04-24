var debug = require('debug')('vsocheckout:index');
var git    = require('git-controller');

var theRepo = git('.');

var PullRequest = require('./pullRequest.js');
var RepoHelper = require( './repohelper.js');


/* This module
*/
var Vsocheckout = function () {};

Vsocheckout.prototype.getStatus = function(url, buildId, callback){
    var agent = new RepoHelper(url);
        agent.get(buildId, function (err, result) {
        if (err) {
            debug('error: ' + err);
            if (callback) callback(err);
        }
        else {
            debug('got a result.. ');
            if (callback) callback(null, result);
        }
    });
}

Vsocheckout.prototype.setStatus = function(url, buildId, status, callback){
        var agent = new RepoHelper(url);
        agent.set(buildId, status, function (err, result) {
        if (err) {
            debug('error: ' + err);
            if (callback) callback(err);
        }
        else {
            debug('got a result.. ');
            if (callback) callback(null, result);
        }
    });
}

/**
 * this prepares the workspace 
 */
Vsocheckout.prototype.checkout = function(pullRequest){
    debug(pullRequest);
    
    var tempBranch = pullRequest.head.label.toString().replace(':', '-');
    var startingPoint = pullRequest.base.ref;
    
    var checkoutResult = theRepo.checkoutPullRequestSync(tempBranch, startingPoint);
    debug('created a temp branch to checkout');
    
    var headUrl = pullRequest.head.url;
    var headRef = pullRequest.head.ref;
    var rebaseResult = theRepo.pullRebaseOursSync(headUrl, headRef);
    debug('pull with rebase and ready for build');
    
}


module.exports = new Vsocheckout()

