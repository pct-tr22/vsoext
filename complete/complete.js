var debug = require('./libc/debug')
var vsocheckout = require('./libc/index');
var t1 = require('vsts-task-lib/task')

var taskStatus = t1.getBoolInput('status');

var buildStatus = taskStatus ? "failure" : "success";

var url = t1.getInput('vsohelperurl', true); // process.env.VSOHELPER_URL;
var buildNumber = process.env['build.buildNumber'];

debug('from env: url and buildid: ')
debug(url);
debug(buildNumber);
debug(buildStatus);

if (! url ) throw "no url found in ENV";
if (! buildNumber) throw "no buildnumber found in ENV";
if (! buildStatus) {
    debug("no build status found")
    buildStatus = 'error';
}

vsocheckout.setStatus(url, buildNumber, buildStatus, function(err, result){
    if (err) console.error(err);
    else {
        debug('done setting status...');
    }
});


