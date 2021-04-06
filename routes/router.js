 
module.exports = function(app) {

    
 
    const restaurant = require('../controller/restaurant.js');

	app.post('/api/resto/add', restaurant.addResto);
 
}