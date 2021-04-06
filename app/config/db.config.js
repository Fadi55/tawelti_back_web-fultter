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
db.users = require('../models/User.js')(sequelize, Sequelize);
db.restaurants = require('../models/Restaurant.js')(sequelize, Sequelize);
db.tables = require('../models/Table.js')(sequelize, Sequelize);
db.clients  = require('../models/Client.js')(sequelize, Sequelize);
db.tablestimes  = require('../models/Tablestimes.js')(sequelize, Sequelize);
db.reservations  = require('../models/Reservation.js')(sequelize, Sequelize);
db.tablereservations  = require('../models/Tablereservations.js')(sequelize, Sequelize);

db.users.hasMany(db.restaurants, { as: "restaurant" });
db.restaurants.belongsTo(db.users, {
  foreignKey: "UserId",
  as: "user",
});



db.restaurants.hasMany(db.tables, { as: "table" });
db.tables.belongsTo(db.restaurants, {
  foreignKey: "RestaurantId",
  as: "restaurant",
});


db.clients.hasMany(db.reservations, { as: "reservation" });
db.reservations.belongsTo(db.clients, {
  foreignKey: "ClientId",
  as: "client",
});


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

db.users.hasMany(db.reservations, { as: "reservationGerant" });
db.reservations.belongsTo(db.users, {
  foreignKey: "UserId",
  as: "user",
});



module.exports = db;