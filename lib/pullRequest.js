var debug = require('debug')('vsocheckout:pullrequest');

var PullRequest = function(){};

PullRequest.prototype.parse = function(gitPullRequest){
  if ( ! gitPullRequest.pullRequest){
    debug('this is not a pull request... bailing');
    return undefined;//throw new Error('invalid pull request format');    
  }

  var root = gitPullRequest.pullRequest;

  /// TODO: some checking...
  //head is the commit 'source' of the new code asking to be merged into the base...
  var rv = {
    id: root.id,
    action: root.action,
    url: root.url,
    branch : root.branch,    
    sha: root.sha,
    statuses_url : root.statuses_url,
    head : {
      label : root.head.label,
      ref : root.head.ref,
      sha : root.head.sha,
      repo : root.head.repo,
      url : root.head.url
    },
    base : {
      label: root.base.label,
      ref : root.base.ref,
      sha : root.base.sha
    }
  }
  
  return rv;
}

module.exports = new PullRequest();