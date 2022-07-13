var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { restaurants } = require('../config/db.config.js');
const User = db.users;
var Sequelize = require('sequelize');
const Restaurant = db.restaurants;
const BookWait = db.bookwaitseats;
var moment = require('moment');
const BookWaitSeat = require('../models/BookWaitSeat.js');
const await = require('await');
const Turnover = require('../models/Turnover.js');
const { relativeTimeRounding } = require('moment');
const { oneOf } = require('express-validator');
const { copyFile } = require('fs');
const Daysworks = require('../models/Daysworks.js');
const { time } = require('console');
const Op = Sequelize.Op;
var fs = require('fs');
const nodemailer = require("nodemailer");
var handlebars = require('handlebars');
//get Restaurant with bookwaitseat
exports.findRestaurantlwithBookWaitSeat = (req, res) => {
    console.log("tunis",req.body);
    const RestaurantId = req.body.RestaurantId;
    var data =[]
    const waitBook = "1"
    const datedefault = ""
    var datestart = moment(req.body.starttime).format("YYYY-MM-DD") 
   
    var timestart = moment(req.body.starttime).format("HH:mm:ss")
    var datestartSQL = datestart+"%"
    // console.log("datestartdatestart",datestart+"%");
    return Restaurant.findByPk(RestaurantId, { include: [{ model: BookWait, as: 'bookwaitseat', where: { waitBook: waitBook ,debut: {
        [Op.like]: datestartSQL
 } } }] })
        .then(restaurant => {
        
          
         
           
            restaurant.bookwaitseat.forEach((value) => {
                var timestartBook = moment(value.debut).format("HH:mm:ss")
                console.log("TIMESS",timestartBook);
                console.log("TIMESS11",timestart);
                if( timestartBook >= timestart){
               
                data.push(value)
            }
            })
            //  result = data.reduce(function (r, a) {
            //     r[a.IdReservation] = r[a.IdReservation] || [];
            //     r[a.IdReservation].push(a);
            //     return r;
            // }, Object.create(null));
            
          
            
            if (restaurant) {
                res.status(200).json(data)

            } else {
                res.send('restaurant deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
 
}

//Create Bookwaitseat
// exports.CreateBookwaitseat = (req, res) => {
//     var container = [];
//     var i
//     for (i = 0; i < req.body.length; i++) {
//         const book = {
//             id: req.body[i].id,
//             RestaurantId: req.body[i].RestaurantId,
//             debut: moment("1990-01-01 00:00:00", "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"),
//             fin: moment("1990-01-01 00:00:00", "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"),

//         }
//         container.push(book);
//     }
//     console.log("rania", container)

//     BookWait.bulkCreate(container)
//         .then(container => {

//             if (container) {
//                 res.status(200).json(container)

//             } else {
//                 res.send('container dont create ')

//             }
//         }).catch(err => {
//             res.send('errror: ')

//         })
// }

//Create Turnover
exports.CreateBookwaitseatTRUE = (req, res) => {

    // const book = [{
    //     id: req.body[0].id,
    //     RestaurantId: req.body[0].RestaurantId,
    //     debut: req.body[0].debut,
    //     fin: req.body[0].fin,
    //     guestName: req.body[0].guestName,
    //     confResv: req.body[0].confResv,
    //     cancResv: req.body[0].cancResv,
    //     UserId: req.body[0].UserId,
    //     random: req.body[0].random,
    //     other:req.body[0].other
    // }]
 
    var container = [];
    var i
    var  EmailCLient
    var  EmailRestaurantName
    var  EmailguestName
    var   EmailDateSTARTResv
    var  EmailTimeSTARTResv
    var EmailRestaurantAdresse
    const RestaurantId = req.body[0].RestaurantId;

    return Restaurant.findByPk(RestaurantId)
    .then(restaurant => {

        if (restaurant) {
            console.log('5555555emaaaailsss',restaurant)
EmailRestaurantName = restaurant.NomResto
EmailRestaurantAdresse =restaurant.adresse
            
        } else {
         

        }
   

     
     EmailCLient=req.body[0].EmailCLient
     EmailguestName=req.body[0].guestName
     EmailDateSTARTResv=   moment(req.body[0].debut).format("YYYY-MM-DD") 
     EmailTimeSTARTResv=  moment(req.body[0].debut).format("HH:MM:SS") 
    
     


     console.log('emaaaailsss',EmailCLient)
     console.log('emaaaailsss',EmailRestaurantName)
     console.log('emaaaailsss',EmailguestName)
     console.log('emaaaailsss',EmailDateSTARTResv)
     console.log('emaaaailsss',EmailDateSTARTResv)

    for (i = 0; i < req.body.length; i++) {
        const book = {
            id: req.body[i].id,
            RestaurantId: req.body[i].RestaurantId,
            debut: req.body[i].startTime,
            fin: req.body[i].endTime,
            guestName: req.body[i].guestName,
            confResv: req.body[i].confResv,
            cancResv: req.body[i].cancResv,
            tableNbrPx: req.body[i].guestnumber,
      
            ClienteId: req.body[i].ClienteId,
          
            IdReservation: req.body[i].id_reservation,

            waitBook: req.body[i].waitBook,
            // UserId: req.body[i].UserId,
            // random: req.body[i].random,
            // other:req.body[i].other,
            block: req.body[i].block

        }
        container.push(book);
    }
    console.log("book", container)
    BookWait.bulkCreate(container)
        .then(container => {

            if (container) {
                res.status(200).json(container)

            } else {
                res.send('book dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
       
      
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'taweltitest@gmail.com',
              pass: 'benzbenz55'
            }
          });
          fs.readFile('mail.html', {encoding: 'utf-8'}, function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                
                EmailRestaurantName:EmailRestaurantName,
                EmailguestName:EmailguestName,
                EmailDateSTARTResv:EmailDateSTARTResv,
                EmailTimeSTARTResv:EmailTimeSTARTResv,
                EmailRestaurantAdresse:EmailRestaurantAdresse
                 
            };
            var htmlToSend = template(replacements);
            if (err) {
              console.log(err);
            } else {
                
              var mailOptions = {

                attachments: [{
                    filename: 'logo.png',
                    path: 'logo.png',
                    cid: 'logo'
                }],

                from: 'taweltitest@gmail.com',
                to: EmailCLient,
                subject: 'Tawelti Service Mail..',
                html: htmlToSend
              };
              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            }
          });

    
       
        })
}

/*exports.CreateBookwaitseatTRUE = (req, res) => {

    const book = {
        id: req.body.id,
        RestaurantId: req.body.RestaurantId,
        debut: req.body.debut,
        fin: req.body.fin,
        guestName: req.body.guestName,
        confResv: req.body.confResv,
        cancResv: req.body.cancResv
    }
    console.log("book", book)
    BookWait.create(book)
        .then(book => {

            if (book) {
                res.status(200).json(book)

            } else {
                res.send('book dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}*/


//UpdateConfBookWaitandSeat
exports.UpdateConfBookWaitandSeat = (req, res) => {

    const id = req.params.id;
    console.log("updatedata", req.body)
    BookWait.update(req.body, {
        where: { ids: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "BookWaitSeat was updated successfully."
                });
            } else {
                res.send({
                    message: `BookWaitSeat update table with ids=${ids}. Maybe BookWaitSeat was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Restaurant with id=" + id
            });
        });
}

//get Restaurant with bookwaitseat Seated
exports.findRestaurantlwithBookWaitSeatSeated = (req, res) => {
    var data =[]
    const waitBook = "1"
    const datedefault = ""
    var datestart = moment(req.body.starttime).format("YYYY-MM-DD")  
   
    var timestart = moment(req.body.starttime).format("HH:mm")
    const RestaurantId = req.params.id;
    return Restaurant.findByPk(RestaurantId, { include: [{ model: BookWait, as: 'bookwaitseat', where: { waitBook: waitBook ,debut: {
        [Op.like]: datestart
 } } }] })
        .then(restaurant => {
        
   
            // data.push(restaurant.bookwaitseat)
         
           
            restaurant.bookwaitseat.forEach((value) => {
                var timestartBook = moment(value.debut).format("HH:mm:ss")
                console.log("TIMESSS",timestartBook);
                if( Date.parse(timestartBook) >= Date.parse(timestart)){
                console.log("TIMESSBOOK",timestart);
                data.push(value)
            }
            })
             result = data.reduce(function (r, a) {
                r[a.IdReservation] = r[a.IdReservation] || [];
                r[a.IdReservation].push(a);
                return r;
            }, Object.create(null));
            
          
            
            if (restaurant) {
                res.status(200).json(result)

            } else {
                res.send('restaurant deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}


//get Restaurant with bookwaitseat Seated Cancel
exports.findRestaurantlwithBookWaitSeatSeatedCancel = (req, res) => {
    const confResvs = "2"
    const datedefault = ""
    const RestaurantId = req.params.id;
    return Restaurant.findByPk(RestaurantId, { include: [{ model: BookWait, as: 'bookwaitseat', where: { confResv: confResvs } }] })
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
//UpdateCancelBookWaitandSeat
exports.UpdateCancelBookWaitandSeat = (req, res) => {

    const id = req.params.id;
    console.log("updatedata", req.body)
    BookWait.update(req.body, {
        where: { ids: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "BookWaitSeat was updated successfully."
                });
            } else {
                res.send({
                    message: `BookWaitSeat update table with ids=${ids}. Maybe BookWaitSeat was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Restaurant with id=" + id
            });
        });
}


//get Restaurant with table blocked
exports.findRestaurantlwithTableBlocked = (req, res) => {
    const block = 1

    const RestaurantId = req.params.id;
    return Restaurant.findByPk(RestaurantId, { include: [{ model: BookWait, as: 'bookwaitseat', where: { block: block } }] })
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
//


//delete tableBlocked
exports.deleteTableBlocked = (req, res) => {
    const id = req.params.id;

    BookWait.destroy({
        where: { ids: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "tableBlocked was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update tableBlocked with id=${id}. Maybe event was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating tableBlocked with id=" + id
            });
        });
}
//
exports.FinalSansTolerance = async (req, res) => {
    containerExisteTables = [{}]
    containerTurnoverReservations = []
    containerOpenClose = []
    containerGetTurnoverRestaurant = []
    containerTablesblocked = []
    containergetTuronversReservationRestaurents = []
    containerTables = []
    containerTableNbrPx = []
    containerTableNbrPx11 = []
    resultTablesAvaible = [];
    containerTableNbrPxvar = [];
    ObjecTTablesdispo = [{}]
    var arraytbalesSnasTolernace = []
    var FianlarraytbalesSansTolernace = []
    var arraytbalesWithTolernacePlus = []
    var FinalarraytbalesWithTolernacePlus=[]
    var arraytbalesWithTolernaceMinus = []
    var FinalarraytbalesWithTolernaceMinus = []
    var arraytablesCollageSansTolerance = []
    var FinalarraytablesCollageSansTolerance = []
    var arraytablesCollageWithTolerancePlus = []
    var arraytablesCollageWithToleranceMinus = []
    var arraytablesCollageWithTolerancePlusMinus = []
     var checkDayopenClose = []
    var arrayTurnvoers =[]
    var arrayTurnoverReservations = []
    var TablesInBook =[]
    var FinalarraywithCompmeteSansTolerance= []
    var FinalarraywithCompmeteToleranceplus = []
    var FinalarraywithCompmeteToleranceminus = []
    var out = []
    var timeend
    var TablesInBookfilterByDate=[]
    var testtttt = []
    var timeNOTok =[]
    var timeNOTokCollageSansTolerance =[]
    var timeNOTokCollagePlusTolerance =[]
    var timeNOTokCollageMinusTolerance =[]
    var timeNOTokCollagePlusMinusTolerance =[]
    var timeok=[]
     var array3=[]
     var finalcollagze=[]
    var endtimefinal
    var idReservation
    const book = {

        RestaurantId: req.body.RestaurantId,
        guestnumber: req.body.guestnumber,
        timebook: req.body.timebook,
        startTime:req.body.startTime
    }
    
    idReservation=makeid(8)
    async function getRestaurantOpenClose() {
       
        
        try {
            let date = new Date(req.body.startTime);
            let day = date.toLocaleString('en-us', {weekday: 'long'});
            // console.log("ffffffffff",day);
            const OpenClose = await Restaurant.findByPk(RestaurantId = req.body.RestaurantId, { include: 'daysworks'})
            // res.status(200).json(tablesblocked);
          
            // TablesInBook= containerOpenClose
            // res.status(200).json(containerExisteTables);
            containerOpenClose = OpenClose.daysworks
            containerOpenClose.forEach((value) => {

           if(value.day === day ){
            checkDayopenClose = value
     
           }

            })
                // console.log("asynco", req.body.startTime)
               //  console.log("containerOpenClose", containerOpenClose)
               // console.log("existeTables",containerExisteTables)
        } catch (err) {
            if (err)
                res.status(404).send("Cannot retrieve data");
        }


    }

    async function getTurnoversRestraunts() {

        if (!req.body.RestaurantId) return res.status(400).json({ 'message': 'RestaurantId ID required.' });

        try {

            const TurnoversRestraunts = await Restaurant.findByPk(RestaurantId = req.body.RestaurantId, { include: 'turnovers' })
            // res.status(200).json(tablesblocked);
            containerGetTurnoverRestaurant = TurnoversRestraunts.turnovers

            // res.status(200).json(containerGetTurnoverRestaurant);
arrayTurnvoers =containerGetTurnoverRestaurant
      
         arrayTurnvoers.forEach((value) => {

      if (value.taille === req.body.guestnumber){
     timeend =   moment(req.body.startTime)
     .add(value.minutes, 'minutes')


      console.log("marco ",timeend)
  
      }
      
        })
      
        } catch (err) {
            if (err)
                res.status(404).send("Cannot retrieve data");
        }
    }
    async function getTurnoversReservations() {
       
        
        try {
            // let date = new Date(req.body.startTime);
            // let day = date.toLocaleString('en-us', {weekday: 'long'});
            // // console.log("ffffffffff",day);
            const TurnoverReservations = await Restaurant.findByPk(RestaurantId = req.body.RestaurantId, { include: 'tolerancereservations'})
            // res.status(200).json(tablesblocked);
          
            // TablesInBook= containerOpenClose
            // res.status(200).json(containerExisteTables);
            // containerOpenClose = OpenClose.daysworks
     
                // console.log("asynco", req.body.startTime)
           
   
   containerTurnoverReservations = TurnoverReservations.tolerancereservations
   arrayTurnoverReservations = containerTurnoverReservations

   arrayTurnoverReservations.forEach((value) => {
 

    console.log("arrayTurnoverReservations ",value.minutes)
endtimefinal = moment(timeend)
.add(value.minutes, 'minutes').format("YYYY-MM-DD HH:mm:ss")
 
 
    
      })
              
        } catch (err) {
            if (err)
                res.status(404).send("Cannot retrieve data");
        }


    } 
    async function getExistesTables() {
       
        if (!req.body.RestaurantId) return res.status(400).json({ 'message': 'RestaurantId ID required.' });

        try {
          
            const ExistesTables = await Restaurant.findByPk(RestaurantId = req.body.RestaurantId, { include: 'table' })
            // res.status(200).json(tablesblocked);


            containerExisteTables = ExistesTables.table
            containerExisteTables.forEach((value) => {

                containerTableNbrPx.push({'id': value.id, 'ids': value.ids, 'tableNbrPx': value.tableNbrPx, 'tolerance': value.tolerance,  RestaurantId: req.body.RestaurantId,
                guestnumber: req.body.guestnumber,
                timebook: req.body.timebook,
                startTime:req.body.startTime,
                endTime:endtimefinal  ,id_reservation:idReservation  });

            })
            containerExisteTables.forEach((value) => {

                var iz
                var hh = []
                out.push({ 'id': value.id,'ids': value.ids, 'tolerance': Array.from(Array(value.tolerance), (_, x) => x + 1), 'tableNbrPx': value.tableNbrPx,  RestaurantId: req.body.RestaurantId,
                guestnumber: req.body.guestnumber,
                timebook: req.body.timebook,
                startTime:req.body.startTime,
                endTime:endtimefinal ,id_reservation:idReservation  });

            })
            // // res.status(200).json(ObjecTTablesdispo);

            out.forEach((value) => {
                var i
              

                    FinalarraywithCompmeteSansTolerance.push({ 'id': value.id,'ids': value.ids, 'tableNbrPx':  value.tableNbrPx,  RestaurantId: req.body.RestaurantId,
                    guestnumber: req.body.guestnumber,
                    timebook: req.body.timebook,
                    startTime:req.body.startTime,
                    endTime:endtimefinal ,id_reservation:idReservation  })

                
            })
            out.forEach((value) => {
                var i
                for (i = 0; i < value.tolerance.length; i++) {

                    FinalarraywithCompmeteToleranceplus.push({ 'id': value.id,'ids': value.ids, 'tableNbrPx': value.tolerance[i] + value.tableNbrPx,  RestaurantId: req.body.RestaurantId,
                    guestnumber: req.body.guestnumber,
                    timebook: req.body.timebook,
                    startTime:req.body.startTime,
                    endTime:endtimefinal ,id_reservation:idReservation  })

                }
            })
            out.forEach((value) => {
                var im
                for (im = 0; im < value.tolerance.length; im++) {


                    FinalarraywithCompmeteToleranceminus.push({ 'id': value.id,'ids': value.ids, 'tableNbrPx': value.tableNbrPx - value.tolerance[im],  RestaurantId: req.body.RestaurantId,
                    guestnumber: req.body.guestnumber,
                    timebook: req.body.timebook,
                    startTime:req.body.startTime,
                    endTime:endtimefinal,id_reservation:idReservation })
                }
            })

            // console.log("FinalarraywithCompmeteTolerance",FinalarraywithCompmeteTolerance)

    


                //     var i
                // var iz
                //        out .push( Array.from(Array( value.tolerance), (_, x) => x));

                //    for (i = 0; i < out.length;i++) {
                //     console.log("out[i][iz] out[i][iz]",value.ids, out[i])
                //     for (iz = 0; iz < out[i].length;iz++) {
                    FinalarraywithCompmeteSansTolerance.forEach((value115) => {
                if (req.body.guestnumber == value115.tableNbrPx) {

                    try {

                        arraytbalesSnasTolernace.push(value115)

                        // var arraytbalesSnasTolernace =[]
                        // arraytbalesSnasTolernace.push(value)
                        // res.status(200).json(tablesblocked);

                        // // res.status(200).json(ObjecTTablesdispo);
                        console.log("sans tolerrnace", value115.ids)
                 


                    } catch (err) {
                        if (err)

                            res.status(404).send("Cannot retrieve Sans Tolernace");
                    }






                    // } else
                    // console.log("FinalarraywithCompmeteToleranceFinalarraywithCompmeteTolerance",FinalarraywithCompmeteTolerance)
                    // var is
                    //     for (is = 0; is < FinalarraywithCompmeteTolerance.length;is++) {
                    //     console.log("FinalarraywithCompmeteTolerance",FinalarraywithCompmeteTolerance[is])

                }
            })
        
            FinalarraywithCompmeteToleranceplus.forEach((value11) => {
                // console.log("valuevaluevalue", value11)


                if (req.body.guestnumber == value11.tableNbrPx) {

                    try {
                        arraytbalesWithTolernacePlus.push(value11)
                        // console.log("+ tolerrnace", value11)


                    } catch (err) {
                        if (err)
                            res.status(404).send("Cannot retrieve Sans Tolernace");
                    }
                }



            })
            FinalarraywithCompmeteToleranceminus.forEach((value12) => {
                // console.log("valuevaluevalueMinus", value12.tableNbrPx)
                if

                    (req.body.guestnumber == value12.tableNbrPx) {
                    try {
                        arraytbalesWithTolernaceMinus.push(value12)
                        // console.log("- tolerrnace", value12.ids)
                    }


                    catch (err) {
                        if (err)
                            res.status(404).send("Cannot retrieve Sans Tolernace");
                    }



                    // }
                }
            })





            function CollageSansTolerance() {
                var datacollage =[]
                datacollage = subsetSum(containerTableNbrPx, req.body.guestnumber);
             

                datacollage.forEach((element, index, array) => {
                   if(element.length >1 ){

                    arraytablesCollageSansTolerance.push(element)

                   }

                    // testelemnt.push(element)

                })
                // console.log("cha3ab",arraytablesCollageSansTolerance)
                return arraytablesCollageSansTolerance
            }


            function CollageTolerancePlus() {
                // console.log("111111outoutoutoutoutoutout", out)
                var dd = []
                var ddfinal = []
                var dataplus
                var test = []
                out.forEach((element, index, array) => {
                    var ih
                    for (ih = 0; ih < element.tolerance.length; ih++) {
                        // console.log("11111", element.tolerance[ih] + element.tableNbrPx, "id", element.ids, "nbrpersonne", element.tableNbrPx); // 100, 200, 300
                        dd.push({ 'id': element.id,  'ids': element.ids, 'tableNbrPx': element.tolerance[ih] + element.tableNbrPx,  RestaurantId: req.body.RestaurantId,
                        guestnumber: req.body.guestnumber,
                        timebook: req.body.timebook,
                        startTime:req.body.startTime,
                        endTime:endtimefinal
                        ,id_reservation:idReservation  });
                        // console.log("22222",index); // 0, 1, 2
                        // same myArray object 3 times
                    }
                });
                // console.log("+++++++++++dddd",subsetSum(dd, req.body.guestnumber));
                dataplus = subsetSum(dd, req.body.guestnumber)
                dataplus.forEach((element, index, array) => {


                    test.push(element)

                })
                var ihd
                var testelemnt = []
                for (ihd = 0; ihd < test.length; ihd++) {

                    // console.log("eeeeeeeee",test[ihd])
                    test[ihd].forEach((element, index, array) => {
                        //  console.log(element.ids )

                        testelemnt.push(element)

                    })
                    var valueArr = testelemnt.map(function (item) { return item.ids });
                    var isDuplicate = valueArr.some(function (item, idx) {
                        return valueArr.indexOf(item) != idx
                    });

                    if ((!isDuplicate) && (testelemnt.length > 1)) {
                        // console.log("oups", isDuplicate, testelemnt.length);
                        arraytablesCollageWithTolerancePlus.push(testelemnt)
                    }
                    testelemnt = []

                

                }

         
                return arraytablesCollageWithTolerancePlus
            }

            function CollageToleranceMinus() {
                // console.log("111111outoutoutoutoutoutout", out)
                var dd = []
                var ddfinal = []
                var dataminus
                var test = []
                var dataclean = []
                out.forEach((element, index, array) => {
                    var ih
                    for (ih = 0; ih < element.tolerance.length; ih++) {
                        // console.log("11111", element.tableNbrPx - element.tolerance[ih], "id", element.ids, "nbrpersonne", element.tableNbrPx); // 100, 200, 300
                        dd.push({ 'id': element.id,   'ids': element.ids, 'tableNbrPx': element.tableNbrPx - element.tolerance[ih], RestaurantId: req.body.RestaurantId,
                        guestnumber: req.body.guestnumber,
                        timebook: req.body.timebook,
                        startTime:req.body.startTime,
                        endTime:endtimefinal ,id_reservation:idReservation  });
                        // console.log("22222",index); // 0, 1, 2
                        // same myArray object 3 times
                    }
                });
                // console.log("+++++++++++dddd",subsetSum(dd, req.body.guestnumber));


                var ihc
                for (ihc = 0; ihc < dd.length; ihc++) {
                    // console.log("karak", dd[ihc].tableNbrPx === 0)
                    if (dd[ihc].tableNbrPx != 0) {

                        dataclean.push(dd[ihc])
                    }

                }

                dataminus = subsetSum(dataclean, req.body.guestnumber)
                dataminus.forEach((element, index, array) => {


                    test.push(element)

                })
                var ihd
                var testelemnt = []
                for (ihd = 0; ihd < test.length; ihd++) {

                    // console.log("eeeeeeeee",test[ihd])
                    test[ihd].forEach((element, index, array) => {
                        //  console.log(element.ids )

                        testelemnt.push(element)

                    })
                    var valueArr = testelemnt.map(function (item) { return item.ids });
                    var isDuplicate = valueArr.some(function (item, idx) {
                        return valueArr.indexOf(item) != idx
                    });

                    if ((!isDuplicate) && (testelemnt.length > 1)) {
                        // console.log("oupsMinus", isDuplicate, testelemnt);
                        arraytablesCollageWithToleranceMinus.push(testelemnt)
                    }
                    testelemnt = []

                    // console.log("eeeeeeeee",test[ihd+1])
                    // test[ihd+1].forEach((element, index, array) => {
                    //     testelemnt = []
                    //     testelemnt.push(element)


                    //                 })


                    //                 var valueArr = testelemnt.map(function(item){ return item.ids });
                    //                 var isDuplicate = valueArr.some(function(item, idx){ 
                    //                     return valueArr.indexOf(item) != idx 
                    //                 });
                    //                 console.log(isDuplicate);


                }


                return arraytablesCollageWithToleranceMinus;
            }
            function CollageTolerancePlusMinus() {
                // console.log("111111outoutoutoutoutoutout", out)
                var ddplus = []
                var ddminus = []
                var ddfinal = []
                var dataplus
                var dataclean = []
                var test = []
                out.forEach((element, index, array) => {
                    var ih
                    for (ih = 0; ih < element.tolerance.length; ih++) {
                        // console.log("11111", element.tolerance[ih] + element.tableNbrPx, "id", element.ids, "nbrpersonne", element.tableNbrPx); // 100, 200, 300
                        ddplus.push({'id': element.id,    'ids': element.ids, 'tableNbrPx': element.tolerance[ih] + element.tableNbrPx ,  RestaurantId: req.body.RestaurantId,
                        guestnumber: req.body.guestnumber,
                        timebook: req.body.timebook,
                        startTime:req.body.startTime,
                        endTime:endtimefinal  ,id_reservation:idReservation });
                        // console.log("22222",index); // 0, 1, 2
                        // same myArray object 3 times
                    }
                });

                out.forEach((element, index, array) => {
                    var ih
                    for (ih = 0; ih < element.tolerance.length; ih++) {
                        // console.log("22222", element.tableNbrPx - element.tolerance[ih], "id", element.ids, "nbrpersonne", element.tableNbrPx); // 100, 200, 300
                        ddminus.push({  'id': element.id,   'ids': element.ids, 'tableNbrPx': element.tableNbrPx - element.tolerance[ih], RestaurantId: req.body.RestaurantId,
                        guestnumber: req.body.guestnumber,
                        timebook: req.body.timebook,
                        startTime:req.body.startTime,
                        endTime:endtimefinal  ,id_reservation:idReservation });
                        // console.log("22222",index); // 0, 1, 2
                        // same myArray object 3 times
                    }
                });
                // console.log("+++++++++++dddd",subsetSum(dd, req.body.guestnumber));

                var arr3 = [...ddplus, ...ddminus];


                var ihc
                for (ihc = 0; ihc < arr3.length; ihc++) {
                    //    console.log("karak", arr3[ihc].tableNbrPx === 0)
                    if (arr3[ihc].tableNbrPx != 0) {

                        dataclean.push(arr3[ihc])
                    }

                }

                // console.log("oups",dataclean);
                // console.log("datacleandatacleandatacleandataclean",dataclean)
                dataplus = subsetSum(dataclean, req.body.guestnumber)

                dataplus.forEach((element, index, array) => {


                    test.push(element)

                })
                var ihd
                var testelemnt = []
                for (ihd = 0; ihd < test.length; ihd++) {

                    // console.log("eeeeeeeee",test[ihd])
                    test[ihd].forEach((element, index, array) => {
                        //  console.log(element.ids )

                        testelemnt.push(element)

                    })
                    var valueArr = testelemnt.map(function (item) { return item.ids });
                    var isDuplicate = valueArr.some(function (item, idx) {
                        return valueArr.indexOf(item) != idx
                    });

                    if ((!isDuplicate) && (testelemnt.length > 1)) {
                        // console.log("oups", isDuplicate, testelemnt);
                        arraytablesCollageWithTolerancePlusMinus.push(testelemnt)
                    }
                    testelemnt = []
                }


                return arraytablesCollageWithTolerancePlusMinus;
            }
            await CollageSansTolerance();
            await CollageTolerancePlus();
            await CollageToleranceMinus();
            await CollageTolerancePlusMinus();
           
            var sss = []
            var sss2 = []
            var ttt = []
            var ttt2 = []

            // for (let re = 0; re <arraytablesCollageWithTolerancePlus.length; re++) {
            //     if(arraytablesCollageWithTolerancePlus[re].length > 1){
            //       sss.push( arraytablesCollageWithTolerancePlus[re] );

            //     }
            //       }
            //       for (let r1e = 0; r1e < 5; r1e++) {
            //         sss2.push(sss[r1e])
            //           }


            //  for (let r = 0; r <arraytablesCollageWithTolerancePlusMinus.length; r++) {
            // if(arraytablesCollageWithTolerancePlusMinus[r].length > 1){
            //   ttt .push( arraytablesCollageWithTolerancePlusMinus[r] );

            // }
            //   }
            //   for (let r1 = 0; r1 < 5; r1++) {
            //   ttt2.push(ttt[r1])
            //       }




            //       for (let i = 0; i < ttt2.length; ++i)
            //     for (let j = 0; j < ttt2.length; ++j)
            //         if (i !== j && ttt2[i].ids === ttt2[j].ids  )
            //         ttt2.splice(j, 1);            
            // console.log("frrr",ttt2);


            // ObjecTTablesdispo = {
            //     "1TableWithOutTolenace": arraytbalesSnasTolernace, "TolerancePlus": arraytbalesWithTolernacePlus,

            //     "ToleranceMinus": arraytbalesWithTolernaceMinus, "CollageSansTolerance": arraytablesCollageSansTolerance,
            //     "CollageWithTolerancePlus": arraytablesCollageWithTolerancePlus, "CollageWithToleranceMinus": arraytablesCollageWithToleranceMinus,
            //     "CollageWithTolerancePlusMinus": arraytablesCollageWithTolerancePlusMinus
            // }
            // // ObjecTTablesdispo = Object.assign({}, arraytbalesSnasTolernace,arraytbalesWithTolernacePlus);
            // res.status(200).json(ObjecTTablesdispo);
        } catch (err) {
            if (err)
                res.status(404).send("Cannot retrieve data");

        }

    }


    async function getExistesTablesInBook() {
      
                try {
        
                    const ExistesTables = await Restaurant.findByPk(RestaurantId = req.body.RestaurantId, { include: [{ model: BookWait, as: 'bookwaitseat' }] })
                    // res.status(200).json(tablesblocked);
                    containerExisteTables = ExistesTables.bookwaitseat
                    TablesInBook= containerExisteTables
                    // res.status(200).json(containerExisteTables);
                    if (Object.keys(containerExisteTables).length === 0) {
                        
            ObjecTTablesdispo = {
                "1TableWithOutTolenace": arraytbalesSnasTolernace, "TolerancePlus": arraytbalesWithTolernacePlus,

                "ToleranceMinus": arraytbalesWithTolernaceMinus, "CollageSansTolerance": arraytablesCollageSansTolerance,
                "CollageWithTolerancePlus": arraytablesCollageWithTolerancePlus, "CollageWithToleranceMinus": arraytablesCollageWithToleranceMinus,
                "CollageWithTolerancePlusMinus": arraytablesCollageWithTolerancePlusMinus
            }
            // ObjecTTablesdispo = Object.assign({}, arraytbalesSnasTolernace,arraytbalesWithTolernacePlus);
            res.status(200).json(ObjecTTablesdispo);
                        // console.log("ajouter")
        
                        // BookWait.create(book)
                        //     .then(book => {
        
                        //         if (book) {
                        //             res.status(200).json(book)
                        //            console.log("asynco", arrayTurnvoers)
                        //         } else {
                        //             res.send('book dont create ')
        
                        //         }
                        //     }).catch(err => {
                        //         res.send('errror: ')
        
                        //     })
        
                    } else {
                     
                        // console.log("asynco", req.body.startTime)
        
                        TablesInBook.forEach((value) => {
                            // console.log("checkfff",arraytbalesWithTolernacePlus)
                          
        if (moment( value.debut).format("YYYY-MM-DD") === moment( req.body.startTime).format("YYYY-MM-DD") ){
        
            TablesInBookfilterByDate.push(value);
        
        }
         
                        })

                   
    // console.log("11seif", arraytbalesSnasTolernace)

            // console.log("111gabon",value.id)
     
            function FinalSansTolerance(){
                TablesInBookfilterByDate.forEach((value) => {
                    arraytbalesSnasTolernace.forEach((valueSansTol) => {
                        
                  
                        // console.log("222gabon",valueSansTol.id)
                        
                        if(value.id === valueSansTol.id ){
                            var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                            var timeend = moment(valueSansTol.endTime).format("YYYY-MM-DD HH:mm:ss")
                            var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                            var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                           
                            // console.log("****1111", qq)
                            // console.log("****22", tt)
                            // console.log("****3333", dd)
                            // console.log("****44444", ff)
                            if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
            
                                console.log(timestart, timeend, 'SAS------------*******is between', valueSansTol.id, beforeTime, afterTime)
              
                                FianlarraytbalesSansTolernace.push(valueSansTol)
                             
                              } else {
              
                                console.log(timestart, timeend, 'SAS--------------********is not between', valueSansTol.id, beforeTime, afterTime)
                                // FianlarraytbalesSansTolernace.push(valueSansTol)
                                // console.log("FianlarraytbalesSansTolernace", FianlarraytbalesSansTolernace)
              
                              }
                            // console.log("bizerte",valueSansTol.id)
                        } 
                        // else if (value.id != valueSansTol.id ){
            
                        //     FianlarraytbalesSansTolernace.push(valueSansTol)
                        // }

                        if (FianlarraytbalesSansTolernace.length != 0){
                        for (let i = 0; i < FianlarraytbalesSansTolernace.length; ++i){
              
                            for (let j = 0; j < arraytbalesSnasTolernace.length; ++j){
                                console.log("arraytbaleytbalesWithTolernacePlusi",   FianlarraytbalesSansTolernace[i].id )
                                console.log("arraytbaleytbalesWithTolernacePlusj",   arraytbalesSnasTolernace[j].id )
                                if (JSON.stringify(FianlarraytbalesSansTolernace[i].id) == JSON.stringify(arraytbalesSnasTolernace[j].id)) {
                                    arraytbalesSnasTolernace.splice(j, 1)
                                    console.log("arraytbalesWithTolernacePlusarraytbalesWithTolernacePlus",  arraytbalesSnasTolernace )
                              
                                    break; 
                                }
            
                      }}
                    }else{

                        arraytbalesSnasTolernace = arraytbalesSnasTolernace
                    }
            
            
                    })
            
                              })
          
                            }
                            function FinalToelrancePlus(){
                                TablesInBookfilterByDate.forEach((value) => {
                                arraytbalesWithTolernacePlus.forEach((valueTolPlus) => {
                                      
                                    console.log("222gabon",valueTolPlus.id)
                                    
                                    if(value.id === valueTolPlus.id ){
                                        var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                                        var timeend = moment(valueTolPlus.endTime).format("YYYY-MM-DD HH:mm:ss")
                                        var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                                        var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                                       
                                        // console.log("****1111", qq)
                                        // console.log("****22", tt)
                                        // console.log("****3333", dd)
                                        // console.log("****44444", ff)
                                        if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
                            
                                            console.log(timestart, timeend, 'OOOOO------------*******is between', valueTolPlus.id, beforeTime, afterTime)
                            
                                            FinalarraytbalesWithTolernacePlus.push(valueTolPlus)
                                       
                                          } else {
                            
                                            console.log(timestart, timeend, '+OOOO--------------********is not between', valueTolPlus.id, beforeTime, afterTime)
                                            // FinalarraytbalesWithTolernacePlus.push(valueTolPlus)
                                          
                            
                                          }
                            
                                  
                                          if (FinalarraytbalesWithTolernacePlus.length != 0){
                                          for (let i = 0; i < FinalarraytbalesWithTolernacePlus.length; ++i){
                                              
                                            for (let j = 0; j < arraytbalesWithTolernacePlus.length; ++j){
                                                console.log("arraytbaleytbalesWithTolernacePlusi",   FinalarraytbalesWithTolernacePlus[i].id )
                                                console.log("arraytbaleytbalesWithTolernacePlusj",   arraytbalesWithTolernacePlus[j].id )
                                                if (JSON.stringify(FinalarraytbalesWithTolernacePlus[i].id) == JSON.stringify(arraytbalesWithTolernacePlus[j].id)) {
                                                    arraytbalesWithTolernacePlus.splice(j, 1)
                                                    console.log("arraytbalesWithTolernacePlusarraytbalesWithTolernacePlus",  arraytbalesWithTolernacePlus )
                                              
                                                    break; 
                                                }
                            
                                      }}
                            
                                    }else{
                                        arraytbalesWithTolernacePlus=arraytbalesWithTolernacePlus
                            
                                    }
                                        // console.log("bizerte",valueTolPlus.id)
                                    } 
                                    // else if (value.id != valueTolPlus.id ){
                            
                                    //     FinalarraytbalesWithTolernacePlus.push(valueTolPlus)
                                    // }
                            
                            
                            
                                })
                                  
                                          })
                                      
                            
                            }
                            
       
            function FinalToelranceMinus(){
                // console.log("11122valueTolMinus2gabon",arraytbalesWithTolernaceMinus)
                TablesInBookfilterByDate.forEach((value) => {
                  arraytbalesWithTolernaceMinus.forEach((valueTolMinus) => {
                    console.log("222211122valueTolMinus2gabon",valueTolMinus)
            
                    
                    if(value.id === valueTolMinus.id ){
                        var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                        var timeend = moment(valueTolMinus.endTime).format("YYYY-MM-DD HH:mm:ss")
                        var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                        var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                       
                        // console.log("****1111", qq)
                        // console.log("****22", tt)
                        // console.log("****3333", dd)
                        // console.log("****44444", ff)
                        if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
        
                            console.log(timestart, timeend, '------------*******is between', valueTolMinus.id, beforeTime, afterTime)
          
                            FinalarraytbalesWithTolernaceMinus.push(valueTolMinus)
                            console.log("FinalarraytbalesWithTolernaceMinus",  FinalarraytbalesWithTolernaceMinus )
                          } else {
          
                            console.log(timestart, timeend, '--------------********is not between', valueTolMinus.id, beforeTime, afterTime)
                    
                      
          
                     
                        
                    } 
                    if (FinalarraytbalesWithTolernaceMinus.length != 0){
                        for (let i = 0; i < FinalarraytbalesWithTolernaceMinus.length; ++i){
                            
                          for (let j = 0; j < arraytbalesWithTolernaceMinus.length; ++j){
                              console.log("arraytbaleytbalesWithTolernacePlusi",   FinalarraytbalesWithTolernaceMinus[i].id )
                              console.log("arraytbaleytbalesWithTolernacePlusj",   arraytbalesWithTolernaceMinus[j].id )
                              if (JSON.stringify(FinalarraytbalesWithTolernaceMinus[i].id) == JSON.stringify(arraytbalesWithTolernaceMinus[j].id)) {
                                arraytbalesWithTolernaceMinus.splice(j, 1)
                                  console.log("arraytbalesWithTolernacePlusarraytbalesWithTolernacePlus",  arraytbalesWithTolernaceMinus )
                            
                                  break; 
                              }
          
                    }}
          
                  }else{
                    arraytbalesWithTolernaceMinus=arraytbalesWithTolernaceMinus
          
                  }
                    // else if (value.id != valueTolMinus.id ){
        
                    //     FinalarraytbalesWithTolernaceMinus.push(valueTolMinus)
                     }
        
        
        
        
                          })

                   
              
        
                })
            }

              
             function Finalcollages (){
                 var testDD=[]
                 var testVV=[]
                // console.log("testtttt",TablesInBookfilterByDate)   
//console.log("arraytablesCollageSansTolerance",arraytablesCollageSansTolerance)  
          TablesInBookfilterByDate.forEach((value) => {
                    // arraytablesCollageSansTolerance.forEach((element) => {
                    
                     
                    //     testtttt.push(element);
                     
                    // })

                    for (let i = 0; i < arraytablesCollageSansTolerance.length; ++i){
                        // console.log("testtttt[i]testtttt[i]",testtttt[i])
                        arraytablesCollageSansTolerance[i].forEach((element15555, index1, array) => {
                   
                            testDD=array
                         
                      
                        
                        })

                         
                        testDD.forEach((element15, index1, array55) => {
                            // console.log("vvvvvvvvvv",element15);  
                            if(element15.id === value.id){
                                var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                                            var timeend = moment(element15.endTime).format("YYYY-MM-DD HH:mm:ss")
                                            var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                                            var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                                           
                                            // console.log("****1111", qq)
                                            // console.log("****22", tt)
                                            // console.log("****3333", dd)
                                            // console.log("****44444", ff)
                                            if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
                                
                                                console.log(timestart, timeend, 'kadha*********/*/*/Collage------------*******is between',   array55      ,"1551115555",index1, beforeTime, afterTime)
                                // console.log("***************************/*/*/*/0,",testtttt[i].splice(i, 1))
                                
                                timeNOTokCollageSansTolerance.push(array55)
                                
                                //  console.log("dali",timeNOTokCollageSansTolerance);             // FinalarraytablesCollageSansTolerance.push( testtttt[i].splice(i, 1))
                                           
                                              } else {
                                
                                                console.log(timestart, timeend, 'flousARRmenFFFEstbded**************Collage--------------********is not between',array55 ,"good@@@@@index" , beforeTime, afterTime)
                                                // FinalarraytablesCollageSansTolerance.push(testtttt[i])
                                          
                                
                                              }

                                // console.log("valuevaluevalue",value.debut);
                                // console.log("ddddd",element15.startTime,array55);
                                // testVV.push(array55)
 
 }
                             })
                  
                       
                            
// if (timeNOTokCollageSansTolerance.length != 0){
//     // console.log("11timeNOTokCollageSansTolerancetimeNOTokCollageSansTolerance",timeNOTokCollageSansTolerance)
//                   for (let i = 0; i < timeNOTokCollageSansTolerance.length; ++i){
//                 for (let j = 0; j < arraytablesCollageSansTolerance.length; ++j){
//                     if (JSON.stringify(timeNOTokCollageSansTolerance[i]) == JSON.stringify(arraytablesCollageSansTolerance[j])) {
//                         arraytablesCollageSansTolerance.splice(j, 1);
//                         console.log("nouwaeb",arraytablesCollageSansTolerance)
                        
//                     }

//           }}
//         }else{
         
//         }
 



                    }
                  
               
// for (let i = 0; i < testtttt.length; ++i){
//     // console.log("testtttt[i]testtttt[i]",testtttt[i])
   

//     testtttt[i].forEach((element15, index1, array) => {

                
//         if(value.id === element15.id ){
//             var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
//             var timeend = moment(element15.endTime).format("YYYY-MM-DD HH:mm:ss")
//             var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
//             var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
           
//             // console.log("****1111", qq)
//             // console.log("****22", tt)
//             // console.log("****3333", dd)
//             // console.log("****44444", ff)
//             if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {

//                 console.log(timestart, timeend, 'kadha*********/*/*/Collage------------*******is between',   array      ,"1551115555",index1, beforeTime, afterTime)
// // console.log("***************************/*/*/*/0,",testtttt[i].splice(i, 1))

// timeNOTokCollageSansTolerance.push(array)

//                 // FinalarraytablesCollageSansTolerance.push( testtttt[i].splice(i, 1))
           
//               } else {

//                 console.log(timestart, timeend, 'flousARRmenFFFEstbded**************Collage--------------********is not between',array ,"good@@@@@index",i, beforeTime, afterTime)
//                 // FinalarraytablesCollageSansTolerance.push(testtttt[i])
          

//               }
            
//         }
      
//         // else if (value.id != element15.id ){

//         //     FinalarraytablesCollageSansTolerance.push(element15)
//         // }




              

       
       
//     })

// }



                })
                console.log("cameroojun",timeNOTokCollageSansTolerance); 


                if (timeNOTokCollageSansTolerance.length != 0){
    // console.log("11timeNOTokCollageSansTolerancetimeNOTokCollageSansTolerance",timeNOTokCollageSansTolerance)
                  for (let i = 0; i < timeNOTokCollageSansTolerance.length; ++i){
                for (let j = 0; j < arraytablesCollageSansTolerance.length; ++j){
                    if (JSON.stringify(timeNOTokCollageSansTolerance[i]) == JSON.stringify(arraytablesCollageSansTolerance[j])) {
                        arraytablesCollageSansTolerance.splice(j, 1);
                        console.log("wledna",arraytablesCollageSansTolerance)
                        
                    }

          }}
        }else{
            arraytablesCollageSansTolerance=arraytablesCollageSansTolerance
        }
 
            }
          
            function FinalcollagesPlus (){
                var testDDplus=[]
                var testVV=[]
    
         TablesInBookfilterByDate.forEach((value) => {
            // arraytablesCollageWithTolerancePlus.forEach((element) => {
                   
                    
            //            testttttplus.push(element);
                    
            //        })

                   for (let i = 0; i < arraytablesCollageWithTolerancePlus.length; ++i){
                        
                    arraytablesCollageWithTolerancePlus[i].forEach((element15555, index1, array) => {
                  
                        testDDplus=array
                        
                     
                       
                       })

                        
                       testDDplus.forEach((element15, index1, array55) => {
                         
                           if(element15.id === value.id){
                               var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                                           var timeend = moment(element15.endTime).format("YYYY-MM-DD HH:mm:ss")
                                           var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                                           var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                                   
                                           if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
                               
                                               console.log(timestart, timeend, 'kadha*********/*/*/Collage------------*******is between',   array55      ,"1551115555",index1, beforeTime, afterTime)
                              
                               
                                               timeNOTokCollagePlusTolerance.push(array55)
                               
                                           
                                             } else {
                               
                                               console.log(timestart, timeend, 'flousARRmenFFFEstbded**************Collage--------------********is not between',array55 ,"good@@@@@index" , beforeTime, afterTime)
                                               // FinalarraytablesCollageSansTolerance.push(testtttt[i])
                                         
                               
                                             }

                              
}
                            })
                 
                      
    


                   }
                 
        

 


               })
         


               if (timeNOTokCollagePlusTolerance.length != 0){
   // console.log("11timeNOTokCollageSansTolerancetimeNOTokCollageSansTolerance",timeNOTokCollageSansTolerance)
                 for (let i = 0; i < timeNOTokCollagePlusTolerance.length; ++i){
               for (let j = 0; j < arraytablesCollageWithTolerancePlus.length; ++j){
                   if (JSON.stringify(timeNOTokCollagePlusTolerance[i]) == JSON.stringify(arraytablesCollageWithTolerancePlus[j])) {
                    arraytablesCollageWithTolerancePlus.splice(j, 1);
                       console.log("wledna",arraytablesCollageWithTolerancePlus)
                       
                   }

         }}
       }else{
        arraytablesCollageWithTolerancePlus=arraytablesCollageWithTolerancePlus
       }

           }
           
           function FinalcollagesMinus (){
            var testDDMinus=[]
            var testVV=[]

     TablesInBookfilterByDate.forEach((value) => {
       

               for (let i = 0; i < arraytablesCollageWithToleranceMinus.length; ++i){
                    
                arraytablesCollageWithToleranceMinus[i].forEach((element15555, index1, array) => {
              
                    testDDMinus=array
                    
                 
                   
                   })

                    
                   testDDMinus.forEach((element15, index1, array55) => {
                     
                       if(element15.id === value.id){
                           var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                                       var timeend = moment(element15.endTime).format("YYYY-MM-DD HH:mm:ss")
                                       var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                                       var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                               
                                       if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
                           
                                           console.log(timestart, timeend, 'kadha*********/*/*/Collage------------*******is between',   array55      ,"1551115555",index1, beforeTime, afterTime)
                          
                           
                                           timeNOTokCollageMinusTolerance.push(array55)
                           
                                       
                                         } else {
                           
                                           console.log(timestart, timeend, 'flousARRmenFFFEstbded**************Collage--------------********is not between',array55 ,"good@@@@@index" , beforeTime, afterTime)
                                           // FinalarraytablesCollageSansTolerance.push(testtttt[i])
                                     
                           
                                         }

                          
}
                        })
             
                  



               }
             
    




           })
        


           if (timeNOTokCollageMinusTolerance.length != 0){
// console.log("11timeNOTokCollageSansTolerancetimeNOTokCollageSansTolerance",timeNOTokCollageSansTolerance)
             for (let i = 0; i < timeNOTokCollageMinusTolerance.length; ++i){
           for (let j = 0; j < arraytablesCollageWithToleranceMinus.length; ++j){
               if (JSON.stringify(timeNOTokCollageMinusTolerance[i]) == JSON.stringify(arraytablesCollageWithToleranceMinus[j])) {
                arraytablesCollageWithToleranceMinus.splice(j, 1);
                   console.log("wledna",arraytablesCollageWithToleranceMinus)
                   
               }

     }}
   }else{
    arraytablesCollageWithToleranceMinus=arraytablesCollageWithToleranceMinus
   }

       }
        
       function FinalcollagesPlusMinus (){
        var testDDPlusMinus=[]
        var testVV=[]

 TablesInBookfilterByDate.forEach((value) => {
           
           for (let i = 0; i < arraytablesCollageWithTolerancePlusMinus.length; ++i){
                
            arraytablesCollageWithTolerancePlusMinus[i].forEach((element15555, index1, array) => {
          
                testDDPlusMinus=array
                
             
               
               })

                
               testDDPlusMinus.forEach((element15, index1, array55) => {
                 
                   if(element15.id === value.id){
                       var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                                   var timeend = moment(element15.endTime).format("YYYY-MM-DD HH:mm:ss")
                                   var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                                   var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                           
                                   if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
                       
                                       console.log(timestart, timeend, 'kadha*********/*/*/Collage------------*******is between',   array55      ,"1551115555",index1, beforeTime, afterTime)
                      
                       
                       timeNOTokCollagePlusMinusTolerance.push(array55)
                       
                                   
                                     } else {
                       
                                       console.log(timestart, timeend, 'flousARRmenFFFEstbded**************Collage--------------********is not between',array55 ,"good@@@@@index" , beforeTime, afterTime)
                                       // FinalarraytablesCollageSansTolerance.push(testtttt[i])
                                 
                       
                                     }

                      
}
                    })
         
              



           }
         





       })
   


       if (timeNOTokCollagePlusMinusTolerance.length != 0){
// console.log("11timeNOTokCollageSansTolerancetimeNOTokCollageSansTolerance",timeNOTokCollageSansTolerance)
         for (let i = 0; i < timeNOTokCollagePlusMinusTolerance.length; ++i){
       for (let j = 0; j < arraytablesCollageWithTolerancePlusMinus.length; ++j){
           if (JSON.stringify(timeNOTokCollagePlusMinusTolerance[i]) == JSON.stringify(arraytablesCollageWithTolerancePlusMinus[j])) {
            arraytablesCollageWithTolerancePlusMinus.splice(j, 1);
               console.log("wledna",arraytablesCollageWithTolerancePlusMinus)
               
           }

 }}
}else{
    arraytablesCollageWithTolerancePlusMinus=arraytablesCollageWithTolerancePlusMinus
}

   }
    
                    }
                        
            function FinalSansTolerance(){
                TablesInBookfilterByDate.forEach((value) => {
                    arraytbalesSnasTolernace.forEach((valueSansTol) => {
                        
                  
                        // console.log("222gabon",valueSansTol.id)
                        
                        if(value.id === valueSansTol.id ){
                            var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                            var timeend = moment(valueSansTol.endTime).format("YYYY-MM-DD HH:mm:ss")
                            var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                            var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                           
                            // console.log("****1111", qq)
                            // console.log("****22", tt)
                            // console.log("****3333", dd)
                            // console.log("****44444", ff)
                            if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
            
                                console.log(timestart, timeend, 'SAS------------*******is between', valueSansTol.id, beforeTime, afterTime)
              
                                FianlarraytbalesSansTolernace.push(valueSansTol)
                             
                              } else {
              
                                console.log(timestart, timeend, 'SAS--------------********is not between', valueSansTol.id, beforeTime, afterTime)
                                // FianlarraytbalesSansTolernace.push(valueSansTol)
                                // console.log("FianlarraytbalesSansTolernace", FianlarraytbalesSansTolernace)
              
                              }
                            // console.log("bizerte",valueSansTol.id)
                        } 
                        // else if (value.id != valueSansTol.id ){
            
                        //     FianlarraytbalesSansTolernace.push(valueSansTol)
                        // }

                        if (FianlarraytbalesSansTolernace.length != 0){
                        for (let i = 0; i < FianlarraytbalesSansTolernace.length; ++i){
              
                            for (let j = 0; j < arraytbalesSnasTolernace.length; ++j){
                                console.log("arraytbaleytbalesWithTolernacePlusi",   FianlarraytbalesSansTolernace[i].id )
                                console.log("arraytbaleytbalesWithTolernacePlusj",   arraytbalesSnasTolernace[j].id )
                                if (JSON.stringify(FianlarraytbalesSansTolernace[i].id) == JSON.stringify(arraytbalesSnasTolernace[j].id)) {
                                    arraytbalesSnasTolernace.splice(j, 1)
                                    console.log("arraytbalesWithTolernacePlusarraytbalesWithTolernacePlus",  arraytbalesSnasTolernace )
                              
                                    break; 
                                }
            
                      }}
                    }else{

                        arraytbalesSnasTolernace = arraytbalesSnasTolernace
                    }
            
            
                    })
            
                              })
          
                            }
                    await  FinalSansTolerance();
                

                    ObjecTTablesdispo = {
                        arraytbalesSnasTolernace
                           
                        }
                        // ObjecTTablesdispo = Object.assign({}, arraytbalesSnasTolernace,arraytbalesWithTolernacePlus);
                        res.status(200).json(ObjecTTablesdispo);
          
       
                    // console.log("existeTables",containerExisteTables)
                } catch (err) {
                    if (err)
                        res.status(404).send("Cannot retrieve data");
                }
        
        
            }
        
 
        TablesInBookfilterByDate.forEach((value) => {
            arraytbalesSnasTolernace.forEach((valueSansTol) => {
                
          
                // console.log("222gabon",valueSansTol.id)
                
                if(value.id === valueSansTol.id ){
                    var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                    var timeend = moment(valueSansTol.endTime).format("YYYY-MM-DD HH:mm:ss")
                    var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                    var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                   
                    // console.log("****1111", qq)
                    // console.log("****22", tt)
                    // console.log("****3333", dd)
                    // console.log("****44444", ff)
                    if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
    
                        console.log(timestart, timeend, 'SAS------------*******is between', valueSansTol.id, beforeTime, afterTime)
      
                        FianlarraytbalesSansTolernace.push(valueSansTol)
                     
                      } else {
      
                        console.log(timestart, timeend, 'SAS--------------********is not between', valueSansTol.id, beforeTime, afterTime)
                        // FianlarraytbalesSansTolernace.push(valueSansTol)
                        // console.log("FianlarraytbalesSansTolernace", FianlarraytbalesSansTolernace)
      
                      }
                    // console.log("bizerte",valueSansTol.id)
                } 
                // else if (value.id != valueSansTol.id ){
    
                //     FianlarraytbalesSansTolernace.push(valueSansTol)
                // }

                if (FianlarraytbalesSansTolernace.length != 0){
                for (let i = 0; i < FianlarraytbalesSansTolernace.length; ++i){
      
                    for (let j = 0; j < arraytbalesSnasTolernace.length; ++j){
                        console.log("arraytbaleytbalesWithTolernacePlusi",   FianlarraytbalesSansTolernace[i].id )
                        console.log("arraytbaleytbalesWithTolernacePlusj",   arraytbalesSnasTolernace[j].id )
                        if (JSON.stringify(FianlarraytbalesSansTolernace[i].id) == JSON.stringify(arraytbalesSnasTolernace[j].id)) {
                            arraytbalesSnasTolernace.splice(j, 1)
                            console.log("arraytbalesWithTolernacePlusarraytbalesWithTolernacePlus",  arraytbalesSnasTolernace )
                      
                            break; 
                        }
    
              }}
            }else{

                arraytbalesSnasTolernace = arraytbalesSnasTolernace
            }
    
    
            })
    
                      })
       
    
                      await   getRestaurantOpenClose();
                      await   getTurnoversRestraunts();
                      await   getTurnoversReservations();
                      await   getExistesTables();
                      await   getExistesTablesInBook();

                      
    function subsetSum(numbers, target) {

        function iter(index, right, delta) {


            if (!delta) return result.push(right);

            if (index >= numbers.length) return;
            if (delta - numbers[index].tableNbrPx >= 0)

                iter(index + 1, [...right, numbers[index]], delta - numbers[index].tableNbrPx);

            iter(index + 1, right, delta);

        }

        var result = [];
        iter(0, [], target);

        //    console.log("results",result)
        return result;
    }
 
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
            


}


//Create Reservation
exports.CreateReservation = async (req, res) => {
    console.log('nidaaaa',req.body.guestnumber)
    containerExisteTables = [{}]
    containerTurnoverReservations = []
    containerOpenClose = []
    containerGetTurnoverRestaurant = []
    containerTablesblocked = []
    containergetTuronversReservationRestaurents = []
    containerTables = []
    containerTableNbrPx = []
    containerTableNbrPx11 = []
    resultTablesAvaible = [];
    containerTableNbrPxvar = [];
    ObjecTTablesdispo = [{}]
    var arraytbalesSnasTolernace = []
    var FianlarraytbalesSansTolernace = []
    var arraytbalesWithTolernacePlus = []
    var FinalarraytbalesWithTolernacePlus=[]
    var arraytbalesWithTolernaceMinus = []
    var FinalarraytbalesWithTolernaceMinus = []
    var arraytablesCollageSansTolerance = []
    var FinalarraytablesCollageSansTolerance = []
    var arraytablesCollageWithTolerancePlus = []
    var arraytablesCollageWithToleranceMinus = []
    var arraytablesCollageWithTolerancePlusMinus = []
     var checkDayopenClose = []
    var arrayTurnvoers =[]
    var arrayTurnoverReservations = []
    var TablesInBook =[]
    var FinalarraywithCompmeteSansTolerance= []
    var FinalarraywithCompmeteToleranceplus = []
    var FinalarraywithCompmeteToleranceminus = []
    var out = []
    var timeend
    var TablesInBookfilterByDate=[]
    var testtttt = []
    var timeNOTok =[]
    var timeNOTokCollageSansTolerance =[]
    var timeNOTokCollagePlusTolerance =[]
    var timeNOTokCollageMinusTolerance =[]
    var timeNOTokCollagePlusMinusTolerance =[]
    var timeok=[]
     var array3=[]
     var finalcollagze=[]
    var endtimefinal
    var idReservation
    const book = {

        RestaurantId: req.body.RestaurantId,
        guestnumber: req.body.guestnumber,
        timebook: req.body.timebook,
        startTime:req.body.startTime
    }
    
    idReservation=makeid(8)
    async function getRestaurantOpenClose() {
       
        
        try {
            let date = new Date(req.body.startTime);
            let day = date.toLocaleString('en-us', {weekday: 'long'});
            // console.log("ffffffffff",day);
            const OpenClose = await Restaurant.findByPk(RestaurantId = req.body.RestaurantId, { include: 'daysworks'})
            // res.status(200).json(tablesblocked);
          
            // TablesInBook= containerOpenClose
            // res.status(200).json(containerExisteTables);
            containerOpenClose = OpenClose.daysworks
            containerOpenClose.forEach((value) => {

           if(value.day === day ){
            checkDayopenClose = value
     
           }

            })
                // console.log("asynco", req.body.startTime)
               //  console.log("containerOpenClose", containerOpenClose)
               // console.log("existeTables",containerExisteTables)
        } catch (err) {
            if (err)
                res.status(404).send("Cannot retrieve data");
        }


    }

    async function getTurnoversRestraunts() {

        if (!req.body.RestaurantId) return res.status(400).json({ 'message': 'RestaurantId ID required.' });

        try {

            const TurnoversRestraunts = await Restaurant.findByPk(RestaurantId = req.body.RestaurantId, { include: 'turnovers' })
            // res.status(200).json(tablesblocked);
            containerGetTurnoverRestaurant = TurnoversRestraunts.turnovers

            // res.status(200).json(containerGetTurnoverRestaurant);
arrayTurnvoers =containerGetTurnoverRestaurant
      
         arrayTurnvoers.forEach((value) => {

      if (value.taille === req.body.guestnumber){
     timeend =   moment(req.body.startTime)
     .add(value.minutes, 'minutes')


      console.log("marco ",timeend)
  
      }
      
        })
      
        } catch (err) {
            if (err)
                res.status(404).send("Cannot retrieve data");
        }
    }
    async function getTurnoversReservations() {
       
        
        try {
            // let date = new Date(req.body.startTime);
            // let day = date.toLocaleString('en-us', {weekday: 'long'});
            // // console.log("ffffffffff",day);
            const TurnoverReservations = await Restaurant.findByPk(RestaurantId = req.body.RestaurantId, { include: 'tolerancereservations'})
            // res.status(200).json(tablesblocked);
          
            // TablesInBook= containerOpenClose
            // res.status(200).json(containerExisteTables);
            // containerOpenClose = OpenClose.daysworks
     
                // console.log("asynco", req.body.startTime)
           
   
   containerTurnoverReservations = TurnoverReservations.tolerancereservations
   arrayTurnoverReservations = containerTurnoverReservations

   arrayTurnoverReservations.forEach((value) => {
 

    console.log("arrayTurnoverReservations ",value.minutes)
endtimefinal = moment(timeend)
.add(value.minutes, 'minutes').format("YYYY-MM-DD HH:mm:ss")
 
 
    
      })
              
        } catch (err) {
            if (err)
                res.status(404).send("Cannot retrieve data");
        }


    } 
    async function getExistesTables() {
       
        if (!req.body.RestaurantId) return res.status(400).json({ 'message': 'RestaurantId ID required.' });

        try {
          
            const ExistesTables = await Restaurant.findByPk(RestaurantId = req.body.RestaurantId, { include: 'table' })
            // res.status(200).json(tablesblocked);


            containerExisteTables = ExistesTables.table
            containerExisteTables.forEach((value) => {

                containerTableNbrPx.push({'id': value.id, 'ids': value.ids, 'tableNbrPx': value.tableNbrPx, 'tolerance': value.tolerance,  RestaurantId: req.body.RestaurantId,
                guestnumber: req.body.guestnumber,
                timebook: req.body.timebook,
                startTime:req.body.startTime,
                endTime:endtimefinal  ,id_reservation:idReservation  });

            })
            containerExisteTables.forEach((value) => {

                var iz
                var hh = []
                out.push({ 'id': value.id,'ids': value.ids, 'tolerance': Array.from(Array(value.tolerance), (_, x) => x + 1), 'tableNbrPx': value.tableNbrPx,  RestaurantId: req.body.RestaurantId,
                guestnumber: req.body.guestnumber,
                timebook: req.body.timebook,
                startTime:req.body.startTime,
                endTime:endtimefinal ,id_reservation:idReservation  });

            })
            // // res.status(200).json(ObjecTTablesdispo);

            out.forEach((value) => {
                var i
              

                    FinalarraywithCompmeteSansTolerance.push({ 'id': value.id,'ids': value.ids, 'tableNbrPx':  value.tableNbrPx,  RestaurantId: req.body.RestaurantId,
                    guestnumber: req.body.guestnumber,
                    timebook: req.body.timebook,
                    startTime:req.body.startTime,
                    endTime:endtimefinal ,id_reservation:idReservation  })

                
            })
            out.forEach((value) => {
                var i
                for (i = 0; i < value.tolerance.length; i++) {

                    FinalarraywithCompmeteToleranceplus.push({ 'id': value.id,'ids': value.ids, 'tableNbrPx': value.tolerance[i] + value.tableNbrPx,  RestaurantId: req.body.RestaurantId,
                    guestnumber: req.body.guestnumber,
                    timebook: req.body.timebook,
                    startTime:req.body.startTime,
                    endTime:endtimefinal ,id_reservation:idReservation  })

                }
            })
            out.forEach((value) => {
                var im
                for (im = 0; im < value.tolerance.length; im++) {


                    FinalarraywithCompmeteToleranceminus.push({ 'id': value.id,'ids': value.ids, 'tableNbrPx': value.tableNbrPx - value.tolerance[im],  RestaurantId: req.body.RestaurantId,
                    guestnumber: req.body.guestnumber,
                    timebook: req.body.timebook,
                    startTime:req.body.startTime,
                    endTime:endtimefinal,id_reservation:idReservation })
                }
            })

            // console.log("FinalarraywithCompmeteTolerance",FinalarraywithCompmeteTolerance)

    


                //     var i
                // var iz
                //        out .push( Array.from(Array( value.tolerance), (_, x) => x));

                //    for (i = 0; i < out.length;i++) {
                //     console.log("out[i][iz] out[i][iz]",value.ids, out[i])
                //     for (iz = 0; iz < out[i].length;iz++) {
                    FinalarraywithCompmeteSansTolerance.forEach((value115) => {
                if (req.body.guestnumber == value115.tableNbrPx) {

                    try {

                        arraytbalesSnasTolernace.push(value115)

                        // var arraytbalesSnasTolernace =[]
                        // arraytbalesSnasTolernace.push(value)
                        // res.status(200).json(tablesblocked);

                        // // res.status(200).json(ObjecTTablesdispo);
                        console.log("sans tolerrnace", value115.ids)
                 


                    } catch (err) {
                        if (err)

                            res.status(404).send("Cannot retrieve Sans Tolernace");
                    }






                    // } else
                    // console.log("FinalarraywithCompmeteToleranceFinalarraywithCompmeteTolerance",FinalarraywithCompmeteTolerance)
                    // var is
                    //     for (is = 0; is < FinalarraywithCompmeteTolerance.length;is++) {
                    //     console.log("FinalarraywithCompmeteTolerance",FinalarraywithCompmeteTolerance[is])

                }
            })
        
            FinalarraywithCompmeteToleranceplus.forEach((value11) => {
                // console.log("valuevaluevalue", value11)


                if (req.body.guestnumber == value11.tableNbrPx) {

                    try {
                        arraytbalesWithTolernacePlus.push(value11)
                        // console.log("+ tolerrnace", value11)


                    } catch (err) {
                        if (err)
                            res.status(404).send("Cannot retrieve Sans Tolernace");
                    }
                }



            })
            FinalarraywithCompmeteToleranceminus.forEach((value12) => {
                // console.log("valuevaluevalueMinus", value12.tableNbrPx)
                if

                    (req.body.guestnumber == value12.tableNbrPx) {
                    try {
                        arraytbalesWithTolernaceMinus.push(value12)
                        // console.log("- tolerrnace", value12.ids)
                    }


                    catch (err) {
                        if (err)
                            res.status(404).send("Cannot retrieve Sans Tolernace");
                    }



                    // }
                }
            })





            function CollageSansTolerance() {
                var datacollage =[]
                datacollage = subsetSum(containerTableNbrPx, req.body.guestnumber);
             

                datacollage.forEach((element, index, array) => {
                   if(element.length >1 ){

                    arraytablesCollageSansTolerance.push(element)

                   }

                    // testelemnt.push(element)

                })
                // console.log("cha3ab",arraytablesCollageSansTolerance)
                return arraytablesCollageSansTolerance
            }


            function CollageTolerancePlus() {
                // console.log("111111outoutoutoutoutoutout", out)
                var dd = []
                var ddfinal = []
                var dataplus
                var test = []
                out.forEach((element, index, array) => {
                    var ih
                    for (ih = 0; ih < element.tolerance.length; ih++) {
                        // console.log("11111", element.tolerance[ih] + element.tableNbrPx, "id", element.ids, "nbrpersonne", element.tableNbrPx); // 100, 200, 300
                        dd.push({ 'id': element.id,  'ids': element.ids, 'tableNbrPx': element.tolerance[ih] + element.tableNbrPx,  RestaurantId: req.body.RestaurantId,
                        guestnumber: req.body.guestnumber,
                        timebook: req.body.timebook,
                        startTime:req.body.startTime,
                        endTime:endtimefinal
                        ,id_reservation:idReservation  });
                        // console.log("22222",index); // 0, 1, 2
                        // same myArray object 3 times
                    }
                });
                // console.log("+++++++++++dddd",subsetSum(dd, req.body.guestnumber));
                dataplus = subsetSum(dd, req.body.guestnumber)
                dataplus.forEach((element, index, array) => {


                    test.push(element)

                })
                var ihd
                var testelemnt = []
                for (ihd = 0; ihd < test.length; ihd++) {

                    // console.log("eeeeeeeee",test[ihd])
                    test[ihd].forEach((element, index, array) => {
                        //  console.log(element.ids )

                        testelemnt.push(element)

                    })
                    var valueArr = testelemnt.map(function (item) { return item.ids });
                    var isDuplicate = valueArr.some(function (item, idx) {
                        return valueArr.indexOf(item) != idx
                    });

                    if ((!isDuplicate) && (testelemnt.length > 1)) {
                        // console.log("oups", isDuplicate, testelemnt.length);
                        arraytablesCollageWithTolerancePlus.push(testelemnt)
                    }
                    testelemnt = []

                

                }

         
                return arraytablesCollageWithTolerancePlus
            }

            function CollageToleranceMinus() {
                // console.log("111111outoutoutoutoutoutout", out)
                var dd = []
                var ddfinal = []
                var dataminus
                var test = []
                var dataclean = []
                out.forEach((element, index, array) => {
                    var ih
                    for (ih = 0; ih < element.tolerance.length; ih++) {
                        // console.log("11111", element.tableNbrPx - element.tolerance[ih], "id", element.ids, "nbrpersonne", element.tableNbrPx); // 100, 200, 300
                        dd.push({ 'id': element.id,   'ids': element.ids, 'tableNbrPx': element.tableNbrPx - element.tolerance[ih], RestaurantId: req.body.RestaurantId,
                        guestnumber: req.body.guestnumber,
                        timebook: req.body.timebook,
                        startTime:req.body.startTime,
                        endTime:endtimefinal ,id_reservation:idReservation  });
                        // console.log("22222",index); // 0, 1, 2
                        // same myArray object 3 times
                    }
                });
                // console.log("+++++++++++dddd",subsetSum(dd, req.body.guestnumber));


                var ihc
                for (ihc = 0; ihc < dd.length; ihc++) {
                    // console.log("karak", dd[ihc].tableNbrPx === 0)
                    if (dd[ihc].tableNbrPx != 0) {

                        dataclean.push(dd[ihc])
                    }

                }

                dataminus = subsetSum(dataclean, req.body.guestnumber)
                dataminus.forEach((element, index, array) => {


                    test.push(element)

                })
                var ihd
                var testelemnt = []
                for (ihd = 0; ihd < test.length; ihd++) {

                    // console.log("eeeeeeeee",test[ihd])
                    test[ihd].forEach((element, index, array) => {
                        //  console.log(element.ids )

                        testelemnt.push(element)

                    })
                    var valueArr = testelemnt.map(function (item) { return item.ids });
                    var isDuplicate = valueArr.some(function (item, idx) {
                        return valueArr.indexOf(item) != idx
                    });

                    if ((!isDuplicate) && (testelemnt.length > 1)) {
                        // console.log("oupsMinus", isDuplicate, testelemnt);
                        arraytablesCollageWithToleranceMinus.push(testelemnt)
                    }
                    testelemnt = []

                    // console.log("eeeeeeeee",test[ihd+1])
                    // test[ihd+1].forEach((element, index, array) => {
                    //     testelemnt = []
                    //     testelemnt.push(element)


                    //                 })


                    //                 var valueArr = testelemnt.map(function(item){ return item.ids });
                    //                 var isDuplicate = valueArr.some(function(item, idx){ 
                    //                     return valueArr.indexOf(item) != idx 
                    //                 });
                    //                 console.log(isDuplicate);


                }


                return arraytablesCollageWithToleranceMinus;
            }
            function CollageTolerancePlusMinus() {
                // console.log("111111outoutoutoutoutoutout", out)
                var ddplus = []
                var ddminus = []
                var ddfinal = []
                var dataplus
                var dataclean = []
                var test = []
                out.forEach((element, index, array) => {
                    var ih
                    for (ih = 0; ih < element.tolerance.length; ih++) {
                        // console.log("11111", element.tolerance[ih] + element.tableNbrPx, "id", element.ids, "nbrpersonne", element.tableNbrPx); // 100, 200, 300
                        ddplus.push({'id': element.id,    'ids': element.ids, 'tableNbrPx': element.tolerance[ih] + element.tableNbrPx ,  RestaurantId: req.body.RestaurantId,
                        guestnumber: req.body.guestnumber,
                        timebook: req.body.timebook,
                        startTime:req.body.startTime,
                        endTime:endtimefinal  ,id_reservation:idReservation });
                        // console.log("22222",index); // 0, 1, 2
                        // same myArray object 3 times
                    }
                });

                out.forEach((element, index, array) => {
                    var ih
                    for (ih = 0; ih < element.tolerance.length; ih++) {
                        // console.log("22222", element.tableNbrPx - element.tolerance[ih], "id", element.ids, "nbrpersonne", element.tableNbrPx); // 100, 200, 300
                        ddminus.push({  'id': element.id,   'ids': element.ids, 'tableNbrPx': element.tableNbrPx - element.tolerance[ih], RestaurantId: req.body.RestaurantId,
                        guestnumber: req.body.guestnumber,
                        timebook: req.body.timebook,
                        startTime:req.body.startTime,
                        endTime:endtimefinal  ,id_reservation:idReservation });
                        // console.log("22222",index); // 0, 1, 2
                        // same myArray object 3 times
                    }
                });
                // console.log("+++++++++++dddd",subsetSum(dd, req.body.guestnumber));

                var arr3 = [...ddplus, ...ddminus];


                var ihc
                for (ihc = 0; ihc < arr3.length; ihc++) {
                    //    console.log("karak", arr3[ihc].tableNbrPx === 0)
                    if (arr3[ihc].tableNbrPx != 0) {

                        dataclean.push(arr3[ihc])
                    }

                }

                // console.log("oups",dataclean);
                // console.log("datacleandatacleandatacleandataclean",dataclean)
                dataplus = subsetSum(dataclean, req.body.guestnumber)

                dataplus.forEach((element, index, array) => {


                    test.push(element)

                })
                var ihd
                var testelemnt = []
                for (ihd = 0; ihd < test.length; ihd++) {

                    // console.log("eeeeeeeee",test[ihd])
                    test[ihd].forEach((element, index, array) => {
                        //  console.log(element.ids )

                        testelemnt.push(element)

                    })
                    var valueArr = testelemnt.map(function (item) { return item.ids });
                    var isDuplicate = valueArr.some(function (item, idx) {
                        return valueArr.indexOf(item) != idx
                    });

                    if ((!isDuplicate) && (testelemnt.length > 1)) {
                        // console.log("oups", isDuplicate, testelemnt);
                        arraytablesCollageWithTolerancePlusMinus.push(testelemnt)
                    }
                    testelemnt = []
                }


                return arraytablesCollageWithTolerancePlusMinus;
            }
            await CollageSansTolerance();
            await CollageTolerancePlus();
            await CollageToleranceMinus();
            await CollageTolerancePlusMinus();
           
            var sss = []
            var sss2 = []
            var ttt = []
            var ttt2 = []

            // for (let re = 0; re <arraytablesCollageWithTolerancePlus.length; re++) {
            //     if(arraytablesCollageWithTolerancePlus[re].length > 1){
            //       sss.push( arraytablesCollageWithTolerancePlus[re] );

            //     }
            //       }
            //       for (let r1e = 0; r1e < 5; r1e++) {
            //         sss2.push(sss[r1e])
            //           }


            //  for (let r = 0; r <arraytablesCollageWithTolerancePlusMinus.length; r++) {
            // if(arraytablesCollageWithTolerancePlusMinus[r].length > 1){
            //   ttt .push( arraytablesCollageWithTolerancePlusMinus[r] );

            // }
            //   }
            //   for (let r1 = 0; r1 < 5; r1++) {
            //   ttt2.push(ttt[r1])
            //       }




            //       for (let i = 0; i < ttt2.length; ++i)
            //     for (let j = 0; j < ttt2.length; ++j)
            //         if (i !== j && ttt2[i].ids === ttt2[j].ids  )
            //         ttt2.splice(j, 1);            
            // console.log("frrr",ttt2);


            // ObjecTTablesdispo = {
            //     "1TableWithOutTolenace": arraytbalesSnasTolernace, "TolerancePlus": arraytbalesWithTolernacePlus,

            //     "ToleranceMinus": arraytbalesWithTolernaceMinus, "CollageSansTolerance": arraytablesCollageSansTolerance,
            //     "CollageWithTolerancePlus": arraytablesCollageWithTolerancePlus, "CollageWithToleranceMinus": arraytablesCollageWithToleranceMinus,
            //     "CollageWithTolerancePlusMinus": arraytablesCollageWithTolerancePlusMinus
            // }
            // // ObjecTTablesdispo = Object.assign({}, arraytbalesSnasTolernace,arraytbalesWithTolernacePlus);
            // res.status(200).json(ObjecTTablesdispo);
        } catch (err) {
            if (err)
                res.status(404).send("Cannot retrieve data");

        }

    }


    async function getExistesTablesInBook() {
      
                try {
        
                    const ExistesTables = await Restaurant.findByPk(RestaurantId = req.body.RestaurantId, { include: [{ model: BookWait, as: 'bookwaitseat' }] })
                    // res.status(200).json(tablesblocked);
                    containerExisteTables = ExistesTables.bookwaitseat
                    TablesInBook= containerExisteTables
                    // res.status(200).json(containerExisteTables);
                    if (Object.keys(containerExisteTables).length === 0) {
                        
            ObjecTTablesdispo = {
                "1TableWithOutTolenace": arraytbalesSnasTolernace, "TolerancePlus": arraytbalesWithTolernacePlus,

                "ToleranceMinus": arraytbalesWithTolernaceMinus, "CollageSansTolerance": arraytablesCollageSansTolerance,
                "CollageWithTolerancePlus": arraytablesCollageWithTolerancePlus, "CollageWithToleranceMinus": arraytablesCollageWithToleranceMinus,
                "CollageWithTolerancePlusMinus": arraytablesCollageWithTolerancePlusMinus
            }
            // ObjecTTablesdispo = Object.assign({}, arraytbalesSnasTolernace,arraytbalesWithTolernacePlus);
            res.status(200).json(ObjecTTablesdispo);
                        // console.log("ajouter")
        
                        // BookWait.create(book)
                        //     .then(book => {
        
                        //         if (book) {
                        //             res.status(200).json(book)
                        //            console.log("asynco", arrayTurnvoers)
                        //         } else {
                        //             res.send('book dont create ')
        
                        //         }
                        //     }).catch(err => {
                        //         res.send('errror: ')
        
                        //     })
        
                    } else {
                     
                        // console.log("asynco", req.body.startTime)
        
                        TablesInBook.forEach((value) => {
                            // console.log("checkfff",arraytbalesWithTolernacePlus)
                          
        if (moment( value.debut).format("YYYY-MM-DD") === moment( req.body.startTime).format("YYYY-MM-DD") ){
        
            TablesInBookfilterByDate.push(value);
        
        }
         
                        })

                   
    // console.log("11seif", arraytbalesSnasTolernace)

            // console.log("111gabon",value.id)
     
            function FinalSansTolerance(){
                TablesInBookfilterByDate.forEach((value) => {
                    arraytbalesSnasTolernace.forEach((valueSansTol) => {
                        
                  
                        // console.log("222gabon",valueSansTol.id)
                        
                        if(value.id === valueSansTol.id ){
                            var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                            var timeend = moment(valueSansTol.endTime).format("YYYY-MM-DD HH:mm:ss")
                            var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                            var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                           
                            // console.log("****1111", qq)
                            // console.log("****22", tt)
                            // console.log("****3333", dd)
                            // console.log("****44444", ff)
                            if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
            
                                console.log(timestart, timeend, 'SAS------------*******is between', valueSansTol.id, beforeTime, afterTime)
              
                                FianlarraytbalesSansTolernace.push(valueSansTol)
                             
                              } else {
              
                                console.log(timestart, timeend, 'SAS--------------********is not between', valueSansTol.id, beforeTime, afterTime)
                                // FianlarraytbalesSansTolernace.push(valueSansTol)
                                // console.log("FianlarraytbalesSansTolernace", FianlarraytbalesSansTolernace)
              
                              }
                            // console.log("bizerte",valueSansTol.id)
                        } 
                        // else if (value.id != valueSansTol.id ){
            
                        //     FianlarraytbalesSansTolernace.push(valueSansTol)
                        // }

                        if (FianlarraytbalesSansTolernace.length != 0){
                        for (let i = 0; i < FianlarraytbalesSansTolernace.length; ++i){
              
                            for (let j = 0; j < arraytbalesSnasTolernace.length; ++j){
                                console.log("arraytbaleytbalesWithTolernacePlusi",   FianlarraytbalesSansTolernace[i].id )
                                console.log("arraytbaleytbalesWithTolernacePlusj",   arraytbalesSnasTolernace[j].id )
                                if (JSON.stringify(FianlarraytbalesSansTolernace[i].id) == JSON.stringify(arraytbalesSnasTolernace[j].id)) {
                                    arraytbalesSnasTolernace.splice(j, 1)
                                    console.log("arraytbalesWithTolernacePlusarraytbalesWithTolernacePlus",  arraytbalesSnasTolernace )
                              
                                    break; 
                                }
            
                      }}
                    }else{

                        arraytbalesSnasTolernace = arraytbalesSnasTolernace
                    }
            
            
                    })
            
                              })
          
                            }
                            function FinalToelrancePlus(){
                                TablesInBookfilterByDate.forEach((value) => {
                                arraytbalesWithTolernacePlus.forEach((valueTolPlus) => {
                                      
                                    console.log("222gabon",valueTolPlus.id)
                                    
                                    if(value.id === valueTolPlus.id ){
                                        var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                                        var timeend = moment(valueTolPlus.endTime).format("YYYY-MM-DD HH:mm:ss")
                                        var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                                        var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                                       
                                        // console.log("****1111", qq)
                                        // console.log("****22", tt)
                                        // console.log("****3333", dd)
                                        // console.log("****44444", ff)
                                        if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
                            
                                            console.log(timestart, timeend, 'OOOOO------------*******is between', valueTolPlus.id, beforeTime, afterTime)
                            
                                            FinalarraytbalesWithTolernacePlus.push(valueTolPlus)
                                       
                                          } else {
                            
                                            console.log(timestart, timeend, '+OOOO--------------********is not between', valueTolPlus.id, beforeTime, afterTime)
                                            // FinalarraytbalesWithTolernacePlus.push(valueTolPlus)
                                          
                            
                                          }
                            
                                  
                                          if (FinalarraytbalesWithTolernacePlus.length != 0){
                                          for (let i = 0; i < FinalarraytbalesWithTolernacePlus.length; ++i){
                                              
                                            for (let j = 0; j < arraytbalesWithTolernacePlus.length; ++j){
                                                console.log("arraytbaleytbalesWithTolernacePlusi",   FinalarraytbalesWithTolernacePlus[i].id )
                                                console.log("arraytbaleytbalesWithTolernacePlusj",   arraytbalesWithTolernacePlus[j].id )
                                                if (JSON.stringify(FinalarraytbalesWithTolernacePlus[i].id) == JSON.stringify(arraytbalesWithTolernacePlus[j].id)) {
                                                    arraytbalesWithTolernacePlus.splice(j, 1)
                                                    console.log("arraytbalesWithTolernacePlusarraytbalesWithTolernacePlus",  arraytbalesWithTolernacePlus )
                                              
                                                    break; 
                                                }
                            
                                      }}
                            
                                    }else{
                                        arraytbalesWithTolernacePlus=arraytbalesWithTolernacePlus
                            
                                    }
                                        // console.log("bizerte",valueTolPlus.id)
                                    } 
                                    // else if (value.id != valueTolPlus.id ){
                            
                                    //     FinalarraytbalesWithTolernacePlus.push(valueTolPlus)
                                    // }
                            
                            
                            
                                })
                                  
                                          })
                                      
                            
                            }
                            
       
            function FinalToelranceMinus(){
                // console.log("11122valueTolMinus2gabon",arraytbalesWithTolernaceMinus)
                TablesInBookfilterByDate.forEach((value) => {
                  arraytbalesWithTolernaceMinus.forEach((valueTolMinus) => {
                    console.log("222211122valueTolMinus2gabon",valueTolMinus)
            
                    
                    if(value.id === valueTolMinus.id ){
                        var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                        var timeend = moment(valueTolMinus.endTime).format("YYYY-MM-DD HH:mm:ss")
                        var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                        var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                       
                        // console.log("****1111", qq)
                        // console.log("****22", tt)
                        // console.log("****3333", dd)
                        // console.log("****44444", ff)
                        if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
        
                            console.log(timestart, timeend, '------------*******is between', valueTolMinus.id, beforeTime, afterTime)
          
                            FinalarraytbalesWithTolernaceMinus.push(valueTolMinus)
                            console.log("FinalarraytbalesWithTolernaceMinus",  FinalarraytbalesWithTolernaceMinus )
                          } else {
          
                            console.log(timestart, timeend, '--------------********is not between', valueTolMinus.id, beforeTime, afterTime)
                    
                      
          
                     
                        
                    } 
                    if (FinalarraytbalesWithTolernaceMinus.length != 0){
                        for (let i = 0; i < FinalarraytbalesWithTolernaceMinus.length; ++i){
                            
                          for (let j = 0; j < arraytbalesWithTolernaceMinus.length; ++j){
                              console.log("arraytbaleytbalesWithTolernacePlusi",   FinalarraytbalesWithTolernaceMinus[i].id )
                              console.log("arraytbaleytbalesWithTolernacePlusj",   arraytbalesWithTolernaceMinus[j].id )
                              if (JSON.stringify(FinalarraytbalesWithTolernaceMinus[i].id) == JSON.stringify(arraytbalesWithTolernaceMinus[j].id)) {
                                arraytbalesWithTolernaceMinus.splice(j, 1)
                                  console.log("arraytbalesWithTolernacePlusarraytbalesWithTolernacePlus",  arraytbalesWithTolernaceMinus )
                            
                                  break; 
                              }
          
                    }}
          
                  }else{
                    arraytbalesWithTolernaceMinus=arraytbalesWithTolernaceMinus
          
                  }
                    // else if (value.id != valueTolMinus.id ){
        
                    //     FinalarraytbalesWithTolernaceMinus.push(valueTolMinus)
                     }
        
        
        
        
                          })

                   
              
        
                })
            }

              
             function Finalcollages (){
                 var testDD=[]
                 var testVV=[]
                // console.log("testtttt",TablesInBookfilterByDate)   
//console.log("arraytablesCollageSansTolerance",arraytablesCollageSansTolerance)  
          TablesInBookfilterByDate.forEach((value) => {
                    // arraytablesCollageSansTolerance.forEach((element) => {
                    
                     
                    //     testtttt.push(element);
                     
                    // })

                    for (let i = 0; i < arraytablesCollageSansTolerance.length; ++i){
                        // console.log("testtttt[i]testtttt[i]",testtttt[i])
                        arraytablesCollageSansTolerance[i].forEach((element15555, index1, array) => {
                   
                            testDD=array
                         
                      
                        
                        })

                         
                        testDD.forEach((element15, index1, array55) => {
                            // console.log("vvvvvvvvvv",element15);  
                            if(element15.id === value.id){
                                var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                                            var timeend = moment(element15.endTime).format("YYYY-MM-DD HH:mm:ss")
                                            var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                                            var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                                           
                                            // console.log("****1111", qq)
                                            // console.log("****22", tt)
                                            // console.log("****3333", dd)
                                            // console.log("****44444", ff)
                                            if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
                                
                                                console.log(timestart, timeend, 'kadha*********/*/*/Collage------------*******is between',   array55      ,"1551115555",index1, beforeTime, afterTime)
                                // console.log("***************************/*/*/*/0,",testtttt[i].splice(i, 1))
                                
                                timeNOTokCollageSansTolerance.push(array55)
                                
                                //  console.log("dali",timeNOTokCollageSansTolerance);             // FinalarraytablesCollageSansTolerance.push( testtttt[i].splice(i, 1))
                                           
                                              } else {
                                
                                                console.log(timestart, timeend, 'flousARRmenFFFEstbded**************Collage--------------********is not between',array55 ,"good@@@@@index" , beforeTime, afterTime)
                                                // FinalarraytablesCollageSansTolerance.push(testtttt[i])
                                          
                                
                                              }

                                // console.log("valuevaluevalue",value.debut);
                                // console.log("ddddd",element15.startTime,array55);
                                // testVV.push(array55)
 
 }
                             })
                  
                       
                            
// if (timeNOTokCollageSansTolerance.length != 0){
//     // console.log("11timeNOTokCollageSansTolerancetimeNOTokCollageSansTolerance",timeNOTokCollageSansTolerance)
//                   for (let i = 0; i < timeNOTokCollageSansTolerance.length; ++i){
//                 for (let j = 0; j < arraytablesCollageSansTolerance.length; ++j){
//                     if (JSON.stringify(timeNOTokCollageSansTolerance[i]) == JSON.stringify(arraytablesCollageSansTolerance[j])) {
//                         arraytablesCollageSansTolerance.splice(j, 1);
//                         console.log("nouwaeb",arraytablesCollageSansTolerance)
                        
//                     }

//           }}
//         }else{
         
//         }
 



                    }
                  
               
// for (let i = 0; i < testtttt.length; ++i){
//     // console.log("testtttt[i]testtttt[i]",testtttt[i])
   

//     testtttt[i].forEach((element15, index1, array) => {

                
//         if(value.id === element15.id ){
//             var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
//             var timeend = moment(element15.endTime).format("YYYY-MM-DD HH:mm:ss")
//             var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
//             var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
           
//             // console.log("****1111", qq)
//             // console.log("****22", tt)
//             // console.log("****3333", dd)
//             // console.log("****44444", ff)
//             if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {

//                 console.log(timestart, timeend, 'kadha*********/*/*/Collage------------*******is between',   array      ,"1551115555",index1, beforeTime, afterTime)
// // console.log("***************************/*/*/*/0,",testtttt[i].splice(i, 1))

// timeNOTokCollageSansTolerance.push(array)

//                 // FinalarraytablesCollageSansTolerance.push( testtttt[i].splice(i, 1))
           
//               } else {

//                 console.log(timestart, timeend, 'flousARRmenFFFEstbded**************Collage--------------********is not between',array ,"good@@@@@index",i, beforeTime, afterTime)
//                 // FinalarraytablesCollageSansTolerance.push(testtttt[i])
          

//               }
            
//         }
      
//         // else if (value.id != element15.id ){

//         //     FinalarraytablesCollageSansTolerance.push(element15)
//         // }




              

       
       
//     })

// }



                })
                console.log("cameroojun",timeNOTokCollageSansTolerance); 


                if (timeNOTokCollageSansTolerance.length != 0){
    // console.log("11timeNOTokCollageSansTolerancetimeNOTokCollageSansTolerance",timeNOTokCollageSansTolerance)
                  for (let i = 0; i < timeNOTokCollageSansTolerance.length; ++i){
                for (let j = 0; j < arraytablesCollageSansTolerance.length; ++j){
                    if (JSON.stringify(timeNOTokCollageSansTolerance[i]) == JSON.stringify(arraytablesCollageSansTolerance[j])) {
                        arraytablesCollageSansTolerance.splice(j, 1);
                        console.log("wledna",arraytablesCollageSansTolerance)
                        
                    }

          }}
        }else{
            arraytablesCollageSansTolerance=arraytablesCollageSansTolerance
        }
 
            }
          
            function FinalcollagesPlus (){
                var testDDplus=[]
                var testVV=[]
    
         TablesInBookfilterByDate.forEach((value) => {
            // arraytablesCollageWithTolerancePlus.forEach((element) => {
                   
                    
            //            testttttplus.push(element);
                    
            //        })

                   for (let i = 0; i < arraytablesCollageWithTolerancePlus.length; ++i){
                        
                    arraytablesCollageWithTolerancePlus[i].forEach((element15555, index1, array) => {
                  
                        testDDplus=array
                        
                     
                       
                       })

                        
                       testDDplus.forEach((element15, index1, array55) => {
                         
                           if(element15.id === value.id){
                               var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                                           var timeend = moment(element15.endTime).format("YYYY-MM-DD HH:mm:ss")
                                           var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                                           var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                                   
                                           if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
                               
                                               console.log(timestart, timeend, 'kadha*********/*/*/Collage------------*******is between',   array55      ,"1551115555",index1, beforeTime, afterTime)
                              
                               
                                               timeNOTokCollagePlusTolerance.push(array55)
                               
                                           
                                             } else {
                               
                                               console.log(timestart, timeend, 'flousARRmenFFFEstbded**************Collage--------------********is not between',array55 ,"good@@@@@index" , beforeTime, afterTime)
                                               // FinalarraytablesCollageSansTolerance.push(testtttt[i])
                                         
                               
                                             }

                              
}
                            })
                 
                      
    


                   }
                 
        

 


               })
         


               if (timeNOTokCollagePlusTolerance.length != 0){
   // console.log("11timeNOTokCollageSansTolerancetimeNOTokCollageSansTolerance",timeNOTokCollageSansTolerance)
                 for (let i = 0; i < timeNOTokCollagePlusTolerance.length; ++i){
               for (let j = 0; j < arraytablesCollageWithTolerancePlus.length; ++j){
                   if (JSON.stringify(timeNOTokCollagePlusTolerance[i]) == JSON.stringify(arraytablesCollageWithTolerancePlus[j])) {
                    arraytablesCollageWithTolerancePlus.splice(j, 1);
                       console.log("wledna",arraytablesCollageWithTolerancePlus)
                       
                   }

         }}
       }else{
        arraytablesCollageWithTolerancePlus=arraytablesCollageWithTolerancePlus
       }

           }
           
           function FinalcollagesMinus (){
            var testDDMinus=[]
            var testVV=[]

     TablesInBookfilterByDate.forEach((value) => {
       

               for (let i = 0; i < arraytablesCollageWithToleranceMinus.length; ++i){
                    
                arraytablesCollageWithToleranceMinus[i].forEach((element15555, index1, array) => {
              
                    testDDMinus=array
                    
                 
                   
                   })

                    
                   testDDMinus.forEach((element15, index1, array55) => {
                     
                       if(element15.id === value.id){
                           var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                                       var timeend = moment(element15.endTime).format("YYYY-MM-DD HH:mm:ss")
                                       var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                                       var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                               
                                       if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
                           
                                           console.log(timestart, timeend, 'kadha*********/*/*/Collage------------*******is between',   array55      ,"1551115555",index1, beforeTime, afterTime)
                          
                           
                                           timeNOTokCollageMinusTolerance.push(array55)
                           
                                       
                                         } else {
                           
                                           console.log(timestart, timeend, 'flousARRmenFFFEstbded**************Collage--------------********is not between',array55 ,"good@@@@@index" , beforeTime, afterTime)
                                           // FinalarraytablesCollageSansTolerance.push(testtttt[i])
                                     
                           
                                         }

                          
}
                        })
             
                  



               }
             
    




           })
        


           if (timeNOTokCollageMinusTolerance.length != 0){
// console.log("11timeNOTokCollageSansTolerancetimeNOTokCollageSansTolerance",timeNOTokCollageSansTolerance)
             for (let i = 0; i < timeNOTokCollageMinusTolerance.length; ++i){
           for (let j = 0; j < arraytablesCollageWithToleranceMinus.length; ++j){
               if (JSON.stringify(timeNOTokCollageMinusTolerance[i]) == JSON.stringify(arraytablesCollageWithToleranceMinus[j])) {
                arraytablesCollageWithToleranceMinus.splice(j, 1);
                   console.log("wledna",arraytablesCollageWithToleranceMinus)
                   
               }

     }}
   }else{
    arraytablesCollageWithToleranceMinus=arraytablesCollageWithToleranceMinus
   }

       }
        
       function FinalcollagesPlusMinus (){
        var testDDPlusMinus=[]
        var testVV=[]

 TablesInBookfilterByDate.forEach((value) => {
           
           for (let i = 0; i < arraytablesCollageWithTolerancePlusMinus.length; ++i){
                
            arraytablesCollageWithTolerancePlusMinus[i].forEach((element15555, index1, array) => {
          
                testDDPlusMinus=array
                
             
               
               })

                
               testDDPlusMinus.forEach((element15, index1, array55) => {
                 
                   if(element15.id === value.id){
                       var timestart = moment(req.body.startTime).format("YYYY-MM-DD HH:mm:ss")
                                   var timeend = moment(element15.endTime).format("YYYY-MM-DD HH:mm:ss")
                                   var beforeTime = moment(value.debut).format("YYYY-MM-DD HH:mm:ss")
                                   var afterTime = moment(value.fin).format("YYYY-MM-DD HH:mm:ss")
                           
                                   if (((timestart >= beforeTime) && (timestart <= afterTime)) || ((timeend >= beforeTime) && (timeend <= afterTime))) {
                       
                                       console.log(timestart, timeend, 'kadha*********/*/*/Collage------------*******is between',   array55      ,"1551115555",index1, beforeTime, afterTime)
                      
                       
                       timeNOTokCollagePlusMinusTolerance.push(array55)
                       
                                   
                                     } else {
                       
                                       console.log(timestart, timeend, 'flousARRmenFFFEstbded**************Collage--------------********is not between',array55 ,"good@@@@@index" , beforeTime, afterTime)
                                       // FinalarraytablesCollageSansTolerance.push(testtttt[i])
                                 
                       
                                     }

                      
}
                    })
         
              



           }
         





       })
   


       if (timeNOTokCollagePlusMinusTolerance.length != 0){
// console.log("11timeNOTokCollageSansTolerancetimeNOTokCollageSansTolerance",timeNOTokCollageSansTolerance)
         for (let i = 0; i < timeNOTokCollagePlusMinusTolerance.length; ++i){
       for (let j = 0; j < arraytablesCollageWithTolerancePlusMinus.length; ++j){
           if (JSON.stringify(timeNOTokCollagePlusMinusTolerance[i]) == JSON.stringify(arraytablesCollageWithTolerancePlusMinus[j])) {
            arraytablesCollageWithTolerancePlusMinus.splice(j, 1);
               console.log("wledna",arraytablesCollageWithTolerancePlusMinus)
               
           }

 }}
}else{
    arraytablesCollageWithTolerancePlusMinus=arraytablesCollageWithTolerancePlusMinus
}

   }
    
                    }
                    await  FinalSansTolerance();
                    await  FinalToelrancePlus();
                    await FinalToelranceMinus();
                    await  Finalcollages();
                    await  FinalcollagesPlus();
                    await  FinalcollagesMinus();
                    await  FinalcollagesPlusMinus();


                    
                    ObjecTTablesdispo = {
                        "SansTolerance":arraytbalesSnasTolernace,    "TolerancePlus": arraytbalesWithTolernacePlus,"ToleranceMinus":arraytbalesWithTolernaceMinus,
                     "CollageSansTolerance": arraytablesCollageSansTolerance, "CollageWithTolerancePlus": arraytablesCollageWithTolerancePlus, "CollageWithToleranceMinus": arraytablesCollageWithToleranceMinus,
                       "CollageWithTolerancePlusMinus": arraytablesCollageWithTolerancePlusMinus
                           
                        }
                        // ObjecTTablesdispo = Object.assign({}, arraytbalesSnasTolernace,arraytbalesWithTolernacePlus);
                        
                        res.status(200).json(ObjecTTablesdispo.filter(value => Object.keys(value).length !== 0));
          
       
                    // console.log("existeTables",containerExisteTables)
                } catch (err) {
                    if (err)
                        res.status(404).send("Cannot retrieve data");
                }
        
        
            }
        
          
    async function getExistesTolranceRestaruants() {
        // console.log("asynco",book)
        if (!req.body.RestaurantId) return res.status(400).json({ 'message': 'RestaurantId ID required.' });

        try {

            const TuronversReservationRestaurents = await Restaurant.findByPk(RestaurantId = req.body.RestaurantId, { include: 'tolerancereservations' })
            // res.status(200).json(tablesblocked);


            containergetTuronversReservationRestaurents = TuronversReservationRestaurents.tolerancereservations
            // res.status(200).json(containerGetTurnoverRestaurant);

            // console.log("toltol",containergetTuronversReservationRestaurents)
        } catch (err) {
            if (err)
                res.status(404).send("Cannot retrieve data");
        }
    }
 

     
    
    await   getRestaurantOpenClose();
    await   getTurnoversRestraunts();
    await   getTurnoversReservations();
    await   getExistesTables();
    await   getExistesTablesInBook();
   
   
    // getExistesTablesInBook();
   
    // console.log("TurnoverReservations",containerTurnoverReservations )
    // console.log("checkDate",checkDayopenClose)



    function subsetSum(numbers, target) {

        function iter(index, right, delta) {


            if (!delta) return result.push(right);

            if (index >= numbers.length) return;
            if (delta - numbers[index].tableNbrPx >= 0)

                iter(index + 1, [...right, numbers[index]], delta - numbers[index].tableNbrPx);

            iter(index + 1, right, delta);

        }

        var result = [];
        iter(0, [], target);

        //    console.log("results",result)
        return result;
    }
 
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
    
    // console.log(makeid(8))
    
}