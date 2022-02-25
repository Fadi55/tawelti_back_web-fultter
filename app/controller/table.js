var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');

const Table = db.tables;
const Salle = db.Salles;
const Zone = db.Zones;
 
const Restaurant = db.restaurants;
//Creation Number of table to restaurant

exports.CreateTable = (req, res) => {

    var h;

    const today = new Date()
    var container = [];
    var h = req.body.number
    for (i = 0; i < h; i++) {
        const tableData = {
            etat: 0,
            RestaurantId: req.body.RestaurantId,
            dateFin: 0000 - 00 - 00,
            dateDebut: 0000 - 00 - 00,
            heureDebut: "00:00",
            heureFin: "00:00",
            createdAt: today

        }
        container.push(tableData);
    }


    // console.log("assbaton",container)

    Table.bulkCreate(container)
        .then(table => {

            if (table) {
                res.status(200).json(table)

            } else {
                res.send('table dont create ')

            }

        }).catch(err => {
            res.send('errror: ')

        })
}



exports.TurnOver = (req, res) => {
    var date = new Date();
    var current_hour = date.getTime();
    var current_minute = date.getMinutes();

    console.log("heure", current_hour)
    console.log("minute", current_minute)
    return Table.findAll()
        .then(table => {

            if (table) {
                res.status(200).json(table)

            } else {
                res.send('table deos not exist')

            }
        }).catch(err => {
            res.send('table: ' + err)
        })
}
//update Nomber personne table


exports.UpdateNbrPxTable = (req, res) => {

    const id = req.params.id;

    Table.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Table was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update table with id=${id}. Maybe Restaurant was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Restaurant with id=" + id
            });
        });
}


//Creation 1 Table 


exports.CreateTable1 = (req, res) => {
    var container = [];
    var container2 = [];
    var container3 = [];
    var container4 = [];
    var containerup = [];
    var containerids = [];
    const tableData = req.body.map(
        table => {
            return {
                top: table.top,
                description: table.description,
                left: table.left,
                class: table.class,
                class2: table.class2,
                text: table.text,
                RestaurantId: table.RestaurantId,
                ZoneId: table.ZoneId,
                SalleId: table.SalleId,
                id: table.id,
                classIdtable: table.classIdtable,
                typeTable: table.typeTable,
                price:table.price,
                tolerance:table.tolerance
            }
        });


    Table.findAll()

        .then(table => {


            table.forEach((value2) => {
                container.push(value2.id);
            })
            req.body.forEach((value) => {
                container3.push(value);

                container2.push(parseInt(value.id));
            })

            var filtered = container2.filter(
                function (e) {
                    return this.indexOf(e) < 0;
                },
                container
            );
            console.log("create", filtered);
            console.log(container3);
            container3.forEach((value4) => {

                var i
                for (i = 0; i < filtered.length; i++) {


                    if (value4.id == filtered[i]) {
                        container4.push(value4);

                    }





                }


            })
            var filteredup = container2.filter(
                function (e) {
                    return this.indexOf(e) >= 0;
                },
                container
            );
            console.log("wahed", filteredup)
            container3.forEach((value5) => {
                var j
                for (j = 0; j < filteredup.length; j++) {


                    if (value5.id == filteredup[j]) {
                        containerup.push(value5);
                        break;
                    }

                }

            })
            console.log("updateeeee", containerup)
            console.log("rrr", container4);

            containerup.forEach((value2ids) => {
                containerids.push(value2ids.id);
            })

            var promises = [];
            var promises = [];
            containerup.forEach(function (valueups) {
                promises.push(Table.update({
                    class: valueups.class, text: valueups.text, price: valueups.price

                    , etat: valueups.etat, description: valueups.description, RestaurantId: valueups.RestaurantId, tableNbrPx: valueups.tableNbrPx, top: valueups.top,
                    left: valueups.left, ZoneId: valueups.ZoneId, class2: valueups.class2, SalleId: valueups.SalleId, classIdtable: valueups.classIdtable, typeTable: valueups.typeTable, tolerance: valueups.tolerance



                }, { where: { id: valueups.id } }));
            });
            Promise.all(promises).then(function () {
                console.log("ok")
            }, function (err) {
                console.log("non")
            });


            Table.bulkCreate(container4)
                .then(container4 => {

                    if (container4) {
                        res.status(200).json(container4)

                    } else {
                        res.send('table dont create ')

                    }
                }).catch(err => {
                    res.send('errror: ')

                })

        })
}


exports.findZonelwithtables = (req, res) => {
    const ZoneId = req.params.id;

    return Zone.findByPk(ZoneId, { include: ["tables"] })
        .then(zone => {

            if (zone) {


                res.send(zone)

            } else {
                res.send('tables deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}




exports.findsallelwithtables = (req, res) => {
    const SalleId = req.params.id;

    return Salle.findByPk(SalleId, { include: ["tables"] })
        .then(salle => {

            if (salle) {


                res.send(salle)

            } else {
                res.send('tables deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}

exports.findsallelwithtablesCount = (req, res) => {
    const RestaurantId = req.params.id;

    return Restaurant.findByPk(RestaurantId, { include: ["table"] })
        .then(table => {

            if (table) {


                res.send(table)

            } else {
                res.send('tables deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}

//delete tables
exports.deleteTables = (req, res) => {
    const id = req.params.id;
 
    Table.destroy( {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Table was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Table with id=${id}. Maybe event was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Table with id=" + id
            });
        });
}

