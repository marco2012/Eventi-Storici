var HomeController = require('./controllers/HomeController');

// Routes
module.exports = function(app){
    
    // Main Routes
    
    app.get('/', HomeController.Index);
    app.get('/other', HomeController.Other);   
    
};
