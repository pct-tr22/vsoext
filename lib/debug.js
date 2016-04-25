
module.exports = function(){
  if(this.console){
    console.log.apply(null, arguments);
  }
}

