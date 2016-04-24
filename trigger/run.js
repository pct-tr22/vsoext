var debug = require('debug')('vsocheckout:run');

var vsocheckout = require('./libc/vsocheckout');


var url = process.env.VSOHELPER_URL;
var buildNumber = process.env.BUILD_BUILDNUMBER;

debug('from env: url and buildid: ')
debug(url);
debug(buildNumber);

if (! url ) throw "no url found in ENV";
if (! buildNumber) throw "no buildnumber found in ENV";

vsocheckout.getStatus(url, buildNumber, function(err, result){
    if (err) console.error(err);
    else {
        debug('got data to work with..');
        vsocheckout.checkout(result);
    }
});


