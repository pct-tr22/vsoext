//FROm: https://github.com/hitautodestruct/gityup

var exec = require('child_process').execSync;

module.exports = (function () {

  var REPO = '';

  // Setup repo name so we can access outside of the folder
  var setup = function ( repo_path ) {
    REPO = repo_path;
  };

  // Returns the git path with the command
  // Allows us to access the git repo outside of the given directory
  var get_git_path = function () {
    return 'git --git-dir='+ REPO +'/.git --work-tree='+ REPO;
  };

  // Outputs result to log
  var log_result = function(error, stdout, stderr) {
    console.log(stdout);
  };

  // Excutes given command and outputs result
  var execute = function ( command ) {
      exec( command );
  };

  // Clone the directory via http url
  var clone = function ( url ) {
    var command = 'git clone ' + url;
    execute( command );
  };

  // Checkout branch
  var checkout = function ( branch_name ) {
    var git_path = get_git_path(),
        command = git_path + ' checkout ' + branch_name;

    execute( command );
  };

  // Show git status
  var status = function () {
    var git_path = get_git_path(),
        command = git_path + ' status';

    execute( command );
  };

  // Pull from repo on current branch
  var pull = function () {
    var git_path = get_git_path(),
        command = git_path + ' pull';

    execute( command );
  };

  return {
    setup,
    clone,
    checkout,
    status,
    pull
  };

})();
