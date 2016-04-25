var debug = require('./libc/debug');

var vsocheckout = require('./libc/index');
var t1 = require('vsts-task-lib/task')

var url = t1.getInput('vsohelperurl', true); // process.env.VSOHELPER_URL;
var buildNumber = process.env['build.buildNumber'];

debug('from env: url and buildid: ')
debug('url: %s', url);
debug('build #: %s', buildNumber);

if (! url ) throw "no url found in ENV";
if (! buildNumber) throw "no buildnumber found in ENV";

vsocheckout.getStatus(url, buildNumber, function(err, result){
    if (err) console.error(err);
    else {
        debug('got data to work with..');
        vsocheckout.checkout(result);
    }
});


