const env = require('./env.js');
var mysql = require('mysql');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;

db.pictureprincips = require('../models/PicturePrincip.js')(sequelize, Sequelize);
db.pictureevents = require('../models/Pictureevent.js')(sequelize, Sequelize);
db.Clientsreservations = require('../models/ClientsReservations.js')(sequelize, Sequelize);
db.daysworks = require('../models/Daysworks.js')(sequelize, Sequelize);
db.events = require('../models/Event.js')(sequelize, Sequelize);
db.workers = require('../models/Worker.js')(sequelize, Sequelize);
db.turnovers = require('../models/Turnover.js')(sequelize, Sequelize);
db.tolerancereservations = require('../models/Tolerancereservation.js')(sequelize, Sequelize);
db.Zones = require('../models/Zone.js')(sequelize, Sequelize);
db.Salles = require('../models/Salle.js')(sequelize, Sequelize);
db.Canvases = require('../models/Canvas.js')(sequelize, Sequelize);
db.users = require('../models/User.js')(sequelize, Sequelize);
db.restaurants = require('../models/Restaurant.js')(sequelize, Sequelize);
db.files = require('../models/File.js')(sequelize, Sequelize);
db.fileevents = require('../models/FileEvent.js')(sequelize, Sequelize);
db.cuisine = require('../models/Cuisine.js')(sequelize, Sequelize);
db.etablissement = require('../models/Etablissement.js')(sequelize, Sequelize);
db.general = require('../models/General.js')(sequelize, Sequelize);
db.ambiance = require('../models/Ambiance.js')(sequelize, Sequelize);
db.tables = require('../models/Table.js')(sequelize, Sequelize);
db.clients = require('../models/Client.js')(sequelize, Sequelize);
db.tablestimes = require('../models/Tablestimes.js')(sequelize, Sequelize);
db.reservations = require('../models/Reservation.js')(sequelize, Sequelize);
db.tablereservations = require('../models/Tablereservations.js')(sequelize, Sequelize);
db.selecttableresvs = require('../models/SelectTableResv.js')(sequelize, Sequelize);
db.bookwaitseats = require('../models/BookWaitSeat.js')(sequelize, Sequelize);
db.evenements = require('../models/Evenement.js')(sequelize, Sequelize);
db.invoices = require('../models/Invoice.js')(sequelize, Sequelize);
db.tableblockeds = require('../models/TableBlocked.js')(sequelize, Sequelize);
db.favorites= require('../models/Favorite.js')(sequelize, Sequelize);
db.avis=require('../models/Avis.js')(sequelize, Sequelize);
db.evaluations=require('../models/evaluation.js')(sequelize,Sequelize);


db.paramtersreservations=require('../models/ParamtersReservations.js')(sequelize,Sequelize);
db.aramterscollages=require('../models/ParamtersCollages.js')(sequelize,Sequelize);
db.paramtersmodes=require('../models/ParamtersMode.js')(sequelize,Sequelize);

db.restaurants.hasMany(db.bookwaitseats, { as: "bookwaitseat" });
db.bookwaitseats.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});
db.users.hasMany(db.bookwaitseats, { as: "bookwaitseat" });
db.bookwaitseats.belongsTo(db.users, {
  foreignKey: "UserId",
  as: "user",
});

db.users.hasMany(db.invoices, { as: "invoice" });
db.invoices.belongsTo(db.users, {
  foreignKey: "UserId",
  as: "user",
});
db.users.hasMany(db.restaurants, { as: "restaurant" });
db.restaurants.belongsTo(db.users, {
  foreignKey: "UserId",
  as: "user",
});
db.users.hasMany(db.favorites, { as: "favoris" });
db.favorites.belongsTo(db.users, {
  foreignKey: "UserId",
  as: "user",
});

db.restaurants.hasMany(db.cuisine, { as: "cuisine" });
db.cuisine.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});
db.users.hasMany(db.avis, { as: "avis" });
db.avis.belongsTo(db.users, {
  foreignKey: "UserId",
  as: "user",
});
db.restaurants.hasMany(db.avis, { as: "avis" });
db.avis.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});

db.users.hasMany(db.evaluations, { as: "evaluations" });
db.evaluations.belongsTo(db.users, {
  foreignKey: "UserId",
  as: "user",
});
db.restaurants.hasMany(db.evaluations, { as: "evaluations" });
db.evaluations.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});

db.restaurants.hasMany(db.etablissement, { as: "etablissement" });
db.etablissement.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});

db.restaurants.hasMany(db.ambiance, { as: "ambiance" });
db.ambiance.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});

db.restaurants.hasMany(db.general, { as: "general" });
db.general.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});
db.restaurants.hasMany(db.files, { as: "restofile" });
db.files.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});

/*db.evenements.hasMany(db.fileevents, { as: "filesEvent" });
db.files.belongsTo(db.restaurants, {
  foreignKey: "EvenementId",
  as: "evenement",
});*/

db.restaurants.hasMany(db.tables, { as: "table" });
db.tables.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});


db.users.hasMany(db.reservations, { as: "reservation" });
db.reservations.belongsTo(db.users, {
  foreignKey: "UserId",
  as: "user",
});
/*db.users.hasMany(db.restaurants, { as: "restaurant" });
db.restaurants.belongsTo(db.users, {
  foreignKey: "UserId",
  as: "user",
});*/

db.restaurants.hasMany(db.reservations, { as: "reservationResto" });
db.reservations.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});

db.tables.hasMany(db.reservations, { as: "table" });
db.reservations.belongsTo(db.tables, {
  foreignKey: "TableId",
  as: "Table",
});

/*db.users.hasMany(db.reservations, { as: "reservationGerant" });
db.reservations.belongsTo(db.users, {
  foreignKey: "UserId",
  as: "user",
});*/


db.restaurants.hasMany(db.Canvases, { as: "canvas" });
db.Canvases.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});

db.restaurants.hasMany(db.Zones, { as: "zones" });
db.Zones.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});

db.restaurants.hasMany(db.Salles, { as: "salles" });
db.Salles.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});

db.Zones.hasMany(db.Canvases, { as: "canvas" });
db.Canvases.belongsTo(db.Zones, {
  foreignKey: "ZoneId",
  as: "zones",
});

db.restaurants.hasMany(db.events, { as: "events" });
db.events.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});

db.restaurants.hasMany(db.evenements, { as: "evenement" });
db.evenements.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});


db.restaurants.hasMany(db.turnovers, { as: "turnovers" });
db.turnovers.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});


db.restaurants.hasMany(db.tolerancereservations, { as: "tolerancereservations" });
db.tolerancereservations.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});

db.Zones.hasMany(db.tables, { as: "tables" });
db.tables.belongsTo(db.Zones, {
  foreignKey: "ZoneId",
  as: "zones",
});

db.Salles.hasMany(db.tables, { as: "tables" });
db.tables.belongsTo(db.Salles, {
  foreignKey: "SalleId",
  as: "salles",
});



db.restaurants.hasMany(db.workers, { as: "workers" });
db.workers.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});


db.Zones.hasMany(db.workers, { as: "workers" });
db.workers.belongsTo(db.Zones, {
  foreignKey: "ZoneId",
  as: "zones",
});


db.restaurants.hasMany(db.selecttableresvs, { as: "tablesSelected" });
db.selecttableresvs.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});


db.restaurants.hasMany(db.tableblockeds, { as: "tableblockeds" });
db.tableblockeds.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});

db.restaurants.hasMany(db.Clientsreservations, { as: "clientsreservations" });
db.Clientsreservations.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});

db.restaurants.hasMany(db.daysworks, { as: "daysworks" });
db.daysworks.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});

db.users.hasMany(db.daysworks, { as: "daysworks" });
db.daysworks.belongsTo(db.users, {
  foreignKey: "UserId",
  as: "user",
});
module.exports = db;