
const cors = require('cors');

const express = require('express');
const { CreateTurnover } = require('../controller/turnover.js');
const app = express();
const passport = require('passport')
const passportConf = require('../config/passport.js')

module.exports = function (app) {

   app.use(cors());
   app.options('*', cors());
   app.use(passport.initialize());
app.use(passport.session());
const clientreservations = require('../controller/clientsreservations');
const parametremodes = require('../controller/paramtersmode');
   const auth = require('../controller/authentification.js');
   const restaurant = require('../controller/restaurant.js');
   const user = require('../controller/user.js');
   const table = require('../controller/table.js');
   const tableblocked = require('../controller/tableblocked');

   const reservation = require('../controller/reservation.js');
   const canvas = require('../controller/canvas.js');
   const zone = require('../controller/zone.js');
   const turnover = require('../controller/turnover.js');
   const event = require('../controller/event.js');
   const evenement = require('../controller/evenement.js');
   const worker = require('../controller/worker.js');
   const salle = require('../controller/salle.js');
   const BWS = require('../controller/bookwaitseat.js');
   const TOL = require('../controller/tolerancereservation.js');
   const SelectTableReservation = require('../controller/SelectTableResv.js');
   const cuisine = require('../controller/cuisine.js');
   const etablissement = require('../controller/etablissement.js');
   const ambiance = require('../controller/ambiance.js');
   const general = require('../controller/general.js');
   
   const eventdays = require('../controller/eventdays');
   //const adresse = require('../controller/adresse.js');
   const upload = require('../config/multer.config.js');
   const fileWorker = require('../controller/file.js');
   const fileWorker2 = require('../controller/fileEvent.js');
   const invoice = require('../controller/invoice.js');
   const data = require('../controller/data.js');
   const daysworkss = require('../controller/daysworks');
   const avis=require('../controller/avis.js');
   const favorite = require('../controller/favorite.js');
   const evaluation=require('../controller/evaluation.js');
   const parametre=require('../controller/parametre');
   const picturePrincipCtrl=require('../controller/Pictureprincip');
  const uploadFileEvent =require("../middleware/uploadevent");
   const uploadprofile = require("../middleware/uploadprofile");

//find avis for each user
app.get('/users/avis/:id', user.findAvisByIdUser);
app.get('/restaurants/evaluations/:id',restaurant.findEvaluation);
     //avis
     app.post("/avis/create", avis.create);
     app.get('/avis', avis.findAll);
     app.get('/avis/:id', avis.findOne);
     app.put('/avis/update/:id', avis.update);
     app.delete("/avis/:id", avis.delete);
     app.delete("/avis", avis.deleteAll);
      //evaluation
     app.post("/evaluation/create", evaluation.create);
     app.get('/evaluation', evaluation.findAll);
     app.get('/evaluation/:id', evaluation.findOne);
     app.put('/evaluation/update/:id', evaluation.update);
     app.delete("/evaluation/:id", evaluation.delete);
     app.delete("/evaluation", evaluation.deleteAll);
     //favoris
     app.post("/favorite/create", favorite.create);
     app.get('/favorites', favorite.findAll);
     app.get('/favoriteByUser/:id',favorite.findFavorisByUserId);
     app.get('/favorite/:id', favorite.findOne);
     app.put('/favorite/update/:id', favorite.update);
     app.delete("/favorite/:id", favorite.delete);
     app.delete("/favorites", favorite.deleteAll);
   //daysworks
   app.post('/daysworks/hours', daysworkss.CreateUpdateDays);
   app.get('/restaurants/avis/:id',restaurant.findAvis);
   app.get('/Getdaysworks/hours/:id', daysworkss.findRestaurantlwithDayWorks);
   //tableblocked
   app.post('/table/tableblocked', tableblocked.CreateTableBlocked);

   //user
   app.get('/user/FindRestoUSer/:UserId', user.findRestaurantlByIdUser);

   //zone
   app.post('/zone/createZone', zone.CreateZone);
   app.get('/zone/getZones/:id', zone.findRestaurantlwithZones);
   app.get('/zone/getZonesCanvas/:id', zone.findZonelwithCanvas);

   //salle
   app.post('/salle/createSalle', salle.CreateSalle);
   app.get('/salle/getSalles/:id', salle.findRestaurantlwithSalles);
   //tables
   app.get('/table/findSallelwithtablesCount/:id', table.findsallelwithtablesCount);
   app.get('/table/findSallelwithtables/:id', table.findsallelwithtables);
   app.get('/table/findZonelwithtables/:id', table.findZonelwithtables);
   app.put('/table/UpdateNbrPxTable/:id', table.UpdateNbrPxTable);
   app.post('/table/create1Tables', table.CreateTable1);
   app.delete('/table/deleteTables/:id', table.deleteTables);

   //Canvas
   app.post('/canvas/createCanvas', canvas.CreateCanvas);
   app.get('/canvas/getcanvas', canvas.findRestaurantlwithCanvas);
   //
   app.post('/table/createTables', table.CreateTable);
   app.get('/table/turnover', table.TurnOver);
   //Restaurant

   app.get('/GetMAxIDTable/:id', restaurant.GetMAxIDTable);
   app.get('/user/RestaurantWithTable/:id', restaurant.findRestaurantlwithTables);
   app.post('/restaurant/AddRestaurant', restaurant.CreateRestaurant);
   app.put('/restaurant/UpdateRestaurant/:id', restaurant.UpdateRestaurent);
   app.get('/restaurants', restaurant.findAll);
   app.get('/restaurants/:id', restaurant.findOne);
   app.get('/restaurants/evenement/:id', restaurant.findOne2);
   // app.get('/restaurants/etage/:id', restaurant.findOne3);
   // app.get('/restaurants/reservationResto/:id', restaurant.findOne4);
   // app.get('/restaurants/serveur/:id', restaurant.findOne5);
   app.get('/restaurants/ambiance/:id', restaurant.findAmbiance);
   app.get('/restaurants/etablissement/:id', restaurant.findEtablissement);
   app.get('/restaurants/general/:id', restaurant.findGenerals);
   app.get('/restaurants/cuisine/:id', restaurant.findCuisine);
   app.get('/restaurants/evenement/:id', restaurant.findOne2);



   //evenement
   // app.post("/evenements/create", evenement.create);
   // app.get("/evenements", evenement.findAll);
   // app.get("/evenements/:id", evenement.findOne);
   // app.put("/evenements/:id", evenement.update);
   // app.delete("/evenements/:id", evenement.delete);
   // app.delete("/evenements", evenement.deleteAll);
   //cuisine
   app.post("/cuisines/create", cuisine.create);
   app.get('/cuisines', cuisine.findAll);
   app.get('/cuisines/:id', cuisine.findOne);
   app.put('/cuisines/UpdateCuisine/:id', cuisine.update);
   app.delete("/cuisines/:id", cuisine.delete);
   app.delete("/cuisines", cuisine.deleteAll);
   //etablissement
   app.post("/etablissements/create", etablissement.create);
   app.get('/etablissements', etablissement.findAll);
   app.get('/etablissements/:id', etablissement.findOne);
   app.put('/etablissements/UpdateEtablissement/:id', etablissement.update);
   app.delete("/etablissements/:id", etablissement.delete);
   app.delete("/etablissements", etablissement.deleteAll);
   //ambiance
   app.post("/ambiances/create", ambiance.create);
   app.get('/ambiances', ambiance.findAll);
   app.get('/ambiances/:id', ambiance.findOne);
   app.put('/ambiances/UpdateAmbiance/:id', ambiance.update);
   app.delete("/ambiances/:id", ambiance.delete);
   app.delete("/ambiances", ambiance.deleteAll);
   //general
   app.post("/generals/create", general.create);
   app.get('/generals', general.findAll);
   
   
   app.get('/Restaurant_generals/:id', general.findRestaurantlwithGenerale);
   app.get('/generals/:id', general.findOne);
   app.put('/generals/UpdateGeneral/:id', general.update);
   app.delete("/generals/:id", general.delete);
   app.delete("/generals", general.deleteAll);
   //photo-files
   app.post('/file/upload', upload.single("file"), fileWorker.uploadFile);
   app.post('/fileEvent/upload', upload.single("file"), fileWorker2.uploadFile);

   app.post('/file/multiple/upload', upload.array('files', 4), fileWorker.uploadMultipleFiles);
   app.post('/fileEvent/multiple/upload', upload.array('files', 4), fileWorker2.uploadMultipleFiles);


   app.get('/file/info/:id', fileWorker.listAllFiles);
   app.get('/fileEvent/info/:id', fileWorker2.listAllFiles);


   app.get('/file/:id', fileWorker.downloadFile);
   app.get('/Eventfile/:id', fileWorker2.downloadFile);
   //evenement
   app.post("/evenements/create", evenement.create);
   app.get("/evenements", evenement.findAll);
   app.get("/evenements/:id", evenement.findOne);
   app.put("/evenements/:id", evenement.update);
   app.delete("/evenements/:id", evenement.delete);
   app.delete("/evenements", evenement.deleteAll);

   //Reservation
   //  app.post('/reservation/AddReservation22', reservation.CreateReservation22);
   app.post('/reservation/AddReservation', reservation.CreateReservation);
   app.post('/reservation/GetClientReservation', reservation.findReservationWithIdClient);

   app.post('/reservation/GetReservationRestaurant', reservation.findReservationRestaurant);
   app.post('/reservation/GetReservationGerant', reservation.findReservationWithIdGerant);

   //app.get('/restaurant/add', restaurant.findTutorialById);

   //app.get('/restaurant/show', restaurant.showResto);

//USer
app.post('/users/createUser', user.CreateUser);
   //authentification
   app.post('/users/login', auth.login);
   app.post('/users/register', auth.register);
   app.get('/users/profile', auth.profile);
app.post("/forgetPassword/:mail",auth.updatePassword);
    app.post("/api/auth/check", auth.checkUser);
//app.post('/oauth/google', auth.googleOAuth);
app.route('/oauth/google')
  .post(passport.authenticate('googleToken', { session: false }), auth.googleOAuth);
app.route('/oauth/facebook')
  .post(passport.authenticate('facebookToken', { session: false }), auth.facebookOAuth);

   app.get('/users/:id', user.findOne);
   app.put('/users/update/:id', user.update);
   app.get('/users', user.findAll);
   app.get('/users/restaurant/:id', restaurant.findOne1);
   app.get('/users/BWS/:id', user.findBWSByIdUser);
   //app.get('/users/reservation/:id', reservation.findOne1);
   //invoice
   app.post('/invoice/create', invoice.CreateBon);
   app.get('/invoice/:id', invoice.Bonwithclient);
   app.get('/PrintInvoice/:id' + '.pdf', invoice.PrintBons);
//Client Reservations
app.post('/Client/createClientReservations', clientreservations.CreateClientReservations);
app.get('/Client/getClientName/:id', clientreservations.findClientWithName);

   //turnover
   app.post('/turnvoer/createTurnover', turnover.CreateTurnover);
   app.get('/turnvoer/getturnover/:id', turnover.findRestaurantlwithTurnover);
   app.delete('/turnvoer/deleteTurnover/:id', turnover.deleteTurnover);

   //event
   
   app.post('/event/eventDays', eventdays.CreateEventdays);

   app.post("/event/createEvent", uploadFileEvent.single("name"), event.CreateEvent);
   app.get('/event/getEvent/:id', event.findRestaurantlwithEvent);
   app.delete('/event/deleteEvent/:id', event.deleteEvent);


   //worker
   app.post('/worker/createWorker', worker.CreateWorker);
   app.get('/worker/getWorkers/:id', worker.findRestaurantlwithWorkers);

   //SelectTableReservation
   app.post('/SelectTableReservation/createTable', SelectTableReservation.CreateSelectTableReservation);
   app.get('/SelectTableReservation/getTableSelected/:id', SelectTableReservation.findRestaurantlwithTablesSelected);


    //BookWaitSeat
    app.delete('/BWS/deleteTableBlocked/:id', BWS.deleteTableBlocked);
    app.get('/BWS/GetALlTableBlocked/:id', BWS.findRestaurantlwithTableBlocked);      
    app.post('/BWS/GetALlBookWaitSeat', BWS.findRestaurantlwithBookWaitSeat);
   //  app.post('/BWS/createBookWaitSeat', BWS.CreateBookwaitseat);
    app.post('/BWS/CreateBookwaitseatTRUE', BWS.CreateBookwaitseatTRUE);
    app.put('/BWS/UpdateConfBookWaitandSeats/:id', BWS.UpdateConfBookWaitandSeat);
    app.put('/BWS/UpdateCancelBookWaitandSeats/:id', BWS.UpdateCancelBookWaitandSeat);
    app.post('/BWS/CreateReservation', BWS.CreateReservation);
    app.post('/BWS/FinalSansTolerance', BWS.FinalSansTolerance);
    app.post('/BWS/GetALlBookWaitSeatSeated/:id', BWS.findRestaurantlwithBookWaitSeatSeated);
    app.get('/BWS/GetALlBookWaitSeatSeatedCancel/:id', BWS.findRestaurantlwithBookWaitSeatSeatedCancel);
   //toleranceReservation


   app.get('/toleranceReservation/GetALltoleranceReservation/:id', TOL.findRestaurantlwithToleranceReservations);
   app.post('/toleranceReservation/createtoleranceReservation', TOL.CreateToleranceReservations);
   //insert data

   app.post('/data', data.CreateListRestaurant);
   app.post('/data/etablissement', data.addEtablissement);
   app.post('/data/cuisine', data.addCuisine);
   app.post('/data/ambiance', data.addAmbiance);
   app.post('/data/parking', data.addParking);
   app.post('/data/reservation', data.addGeneral);
   
//smart
   app.put('/reservation/mode/:id', parametre.update);
   app.post('/reservation/mode/:id', parametre.create);
   
   app.get("/getParms/:id", parametre.getParam);
   //mode
   app.put('/reservation/parametremodes/:id', parametremodes.update);
   app.get("/getModes/:id", parametremodes.getModes);
   
   
   //ProfileImg
   app.post("/uploadProfileImg", uploadprofile.single("name"), picturePrincipCtrl.uploadFiles);
   app.get("/getPicturePrincipal/:id", picturePrincipCtrl.getPicturePrincipal);

}