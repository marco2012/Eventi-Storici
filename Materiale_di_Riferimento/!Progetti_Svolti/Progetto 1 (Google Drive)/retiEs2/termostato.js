var stato=0;

module.exports.accendi = function(){
  stato=1
};

module.exports.spegni = function(){
  stato=0;
};

module.exports.whatStato = function(){
  return stato;
};
