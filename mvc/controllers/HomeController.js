exports.Index = function(request, response){
    response.pageInfo = {};
    response.pageInfo.title = 'Hello World';
    response.render('home/Index', response.pageInfo);
};

exports.Other = function(request, response){
    response.pageInfo = {};
    response.pageInfo.title = 'Other';
    response.render('home/Other', response.pageInfo);
};