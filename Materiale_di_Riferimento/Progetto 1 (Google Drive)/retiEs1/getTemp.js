var cheerio = require('cheerio');

module.exports = function(pagina){
  var $ = cheerio.load(pagina);
  $ = $('ul[id=daytabs]');
  $ = $.find('li[class=active]')
  var tmin = $.find('span[class=tmin]').html();
  var tmax = $.find('span[class=tmax]').html();
  tmin = tmin.substring(0,tmin.length-"&#xB0;".length);
  tmax = tmax.substring(0,tmax.length-"&#xB0;".length);
  var temp={
    min: tmin,
    max: tmax
  };
  return temp;
}


