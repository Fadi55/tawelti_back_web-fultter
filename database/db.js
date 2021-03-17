const Sequelize = require("sequelize")
const db={}

const sequelize = new Sequelize("tawelti_test","root","",{
host:"localhost",
dialect:"mysql",
operatorsAliases:false,
pool:{
    maw :5,
    min: 0,
    acquire: 30000,
    idle: 10000
}

})

db.Sequelize=sequelize

module.exports = db