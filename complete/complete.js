var debug = require('./libc/debug')
var vsocheckout = require('./libc/index');
var tl = require('vsts-task-lib/task')

var taskStatus = tl.getBoolInput('status');

var overrideStatus = tl.getBoolInput('overridestatus');

var buildStatus;
if (overrideStatus){
  buildStatus = taskStatus ? "failure" : "success";    
}
else {
  buildStatus = process.env['build.status'];    
}

var url = tl.getInput('vsohelperurl', true);
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


