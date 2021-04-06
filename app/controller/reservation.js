var express = require('express');
const cors = require("cors")
var moment = require('moment'); // require
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
let mysql = require('mysql');
//const Reservation = require('../models/Reservation.js');
const Reservation = db.reservations;
const Table = db.tables;

const User = db.users;

const Restaurant = db.restaurants;
const Tablereservations = db.tablereservations;
const Tablestimes = db.tablestimes;
const Client = db.clients;
const dbs = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tawelti_test'
});
//ADD Reservation 




//Get Reservation With RestaurantId
exports.findReservationRestaurant = (req, res) => {

    RestaurantId = req.body.RestaurantId
    return Restaurant.findByPk(RestaurantId, { include: ["reservationResto"] })
        .then(restaurant => {

            if (restaurant) {
                res.status(200).json(restaurant)

            } else {
                res.send('restaurant deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}

//Get Reservation With Id Client
exports.findReservationWithIdClient = (req, res) => {

    ClientId = req.body.ClientId
    return Client.findByPk(ClientId, { include: ["reservation"] })
        .then(client => {

            if (client) {
                res.status(200).json(client)

            } else {
                res.send('client deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}


//Get Reservation With GerantId

exports.findReservationWithIdGerant = (req, res) => {

    UserId = req.body.UserId
    return User.findByPk(UserId, { include: ["reservationGerant"] })
        .then(user => {

            if (user) {
                res.status(200).json(user)

            } else {
                res.send('client deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}

/*
var interval = setInterval(function () {
    console.log("iheb miboun")
}, 1000);*/

let myfunc = (req, res) => {

    return new Promise((Resolve, Rejevt) => {
        setTimeout(() => {
            Table.findOne({
                where: {
                    id: 488
                }
            }).then(user => {


                heureDebut1 = heureDebut1 + ''
                heurefin1 = heurefin1 + ''
                let sql = `UPDATE tables SET etat = 1,heureDebut = "${heureDebut1}",heureFin= "${heurefin1}" WHERE id = 488`;
                let query = dbs.query(sql, (err, result) => {
                    if (err) throw err;


                });
                if (user) {
                    res.status(200).json(user)

                } else {
                    res.send('user deos not exist')

                }
            }).catch(err => {

            })
            Resolve()
        }, 2000);
    });
}
exports.CreateReservation = async (req, res) => {
    try {
        const resvData = {
            description: req.body.description,
            ClientId: req.body.ClientId,
            RestaurantId: req.body.RestaurantId,
            TableId: req.body.TableId,
            heureDebut: req.body.heureDebut,
            UserId: req.body.UserId,

        }


        Table.findOne({ where: { id: resvData.TableId } })
            .then(table => {
                tableNbrPx = table.tableNbrPx
                console.log("za3maa", table.tableNbrPx)
                Tablestimes.findOne({ where: { timeNbrPx: tableNbrPx } })
                    .then(tabletimes => {
                        console.log("heuredorigine", resvData.heureDebut)
                        console.log("heure", tabletimes.heure)
                        d = resvData.heureDebut
                        f = tabletimes.heure
                        heurefin1 = moment(d, "hh:mm").add(f, 'h:m')
                        heurefin = moment(heurefin1, "HH:mm:ss").format("hh:mm:ss");
                        var container = [];
                        Tablereservations.findAll({ where: { TableId: resvData.TableId } })
                        .then(tablereservations => {
         

                        if (tablereservations != 0){
                            var container = [];
                            var container2 = [];
                            var container3 = [];
                            var container4 = [];
                            var container5 = [];
                            var container6 = [];  
                              var container7 = [];
                          
console.log("atttend")
tablereservations.forEach(function(value){

  

    container.push(value.dateDebut);
    container2.push(value.dateFin);
  
  
  });  

   
var i
var j
var h
var z





for (i = 1; i < container.length; i++) {
      
        container3.push(container[i]);
       
}

for (j = 0; j < container2.length; j++) {
    
    container4.push(container2[j]);
    
   
}
 
for (n = 0; n < container3.length; n++) {
   console.log("table dispo dans",container4[n],container3[n]);
}
console.log("**************************")
var p
for (p = 0; p < container.length; p++) {
   
    console.log("heure non dispo  ",container[p],container4[p]);
}
 
  
var squares = container3.map((a, i) => a - container4[i]);

container6.push(squares);
 var q
 var n
 var b
 
for (q = 0; q < squares.length; q++) {
// console.log("info",moment(squares[0]).utc())
    var y = moment(squares[q]).utc();//now
    
   squares1 = moment(y, "HH:mm:ss").format("hh:mm:ss");
   // console.log("table dispo sleon paramter ok ?  (l'heure)",squares1);
   
    container7.push(squares1);

}
for (h = 0; h < container3.length; h++) {
    for (z = 0; z < container4.length; z++) {
    container5.push(container3[h],container4[z]);
}

 
}
 console.log("**************************")
 var d
 
for (d = 0; d < container7.length; d++)

{
console.log("table dispo sleon paramter ok ?  (l'heure)",container7[d],)
 
if (container7[d] >= tabletimes.heure){
    console.log("reserve")
}else{
    console.log("no reerve")
}
}
                        }



else{

                        Reservation.create(resvData)
                            .then(resvData => {
                                console.log("za3maa", resvData.TableId)
                                console.log("heurefin", heurefin)
                                heurefin1 = heurefin
                                idtable1 = resvData.TableId
                                heureDebut1 = resvData.heureDebut
                                console.log("asbaaaaaaaaaaaaaaaaa", idtable1)

                                if (resvData) {
                                    res.status(200).json(resvData)

                                } else {
                                    res.send('reservation dont create ')

                                }
                            }).catch(err => {
                                res.send('errror: ')

                            })}
                        })
                    })
            })
        


        await myfunc()

    } catch (e) {
        throw e

    }
}




