var debug  = require('./debug')
var git    = require('git-controller');
var exec   = require('child_process').execSync;

var theRepo = git('.');

var PullRequest = require('./pullRequest.js');
var RepoHelper = require( './repohelper.js');

var t1 = require('vsts-task-lib/task');

/**
 * https://github.com/Microsoft/vsts-task-lib/blob/master/node/docs/vsts-task-lib.md#taskcheckPath
 */


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
    
    // TODO: change to just the PR# 
    
    var prnumber = pullRequest.id;
//     git fetch origin +refs/pull/5/merge:
// git checkout -qf FETCH_HEAD

    var repoDir = process.env['build.repository.localpath'];
    debug('repo dir reported as: %s', repoDir);
    
    t1.cd(repoDir);
    //var command0 = 'cd ' + repoDir;
    //exec('pwd');
    var command1 = 'git fetch origin +refs/pull/' + prnumber + '/merge:';
    var command2 = 'git checkout -qf FETCH_HEAD';
    
    debug('running fetch: %s', command1);
    exec( command1 );
    debug('running checkout: %s', command2);
    exec( command2 );
    
    debug('done with git prep');
}


module.exports = new Vsocheckout()

