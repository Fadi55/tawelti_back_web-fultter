
const cors = require('cors');
const express = require('express');
const app = express();
module.exports = function (app) {
    app.use(cors());
    app.options('*', cors());
    const auth = require('../controller/authentification.js');
    const restaurant = require('../controller/restaurant.js');
    const user = require('../controller/user.js');
    const table = require('../controller/table.js');
    const reservation = require('../controller/reservation.js');
  

    //user
    app.get('/user/FindRestoUSer', user.findRestaurantlByIdUser);

    //tables
    
    app.put('/table/UpdateNbrPxTable/:id', table.UpdateNbrPxTable);



    app.post('/table/createTables', table.CreateTable);
    app.get('/table/turnover', table.TurnOver);
    //Restaurant
    app.get('/user/RestaurantWithTable', restaurant.findRestaurantlwithTables);
    app.post('/restaurant/AddRestaurant', restaurant.CreateRestaurant);
    app.put('/restaurant/UpdateRestaurant/:id', restaurant.UpdateRestaurent);


    //Reservation
  //  app.post('/reservation/AddReservation22', reservation.CreateReservation22);
    app.post('/reservation/AddReservation', reservation.CreateReservation);
    app.post('/reservation/GetClientReservation', reservation.findReservationWithIdClient);

    app.post('/reservation/GetReservationRestaurant', reservation.findReservationRestaurant);
    app.post('/reservation/GetReservationGerant', reservation.findReservationWithIdGerant);

    //app.get('/restaurant/add', restaurant.findTutorialById);

    //app.get('/restaurant/show', restaurant.showResto);


    //authentification
    app.post('/users/login', auth.login);
    app.post('/users/register', auth.register);
    app.get('/users/profile', auth.profile);
}