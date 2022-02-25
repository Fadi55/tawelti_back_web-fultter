var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
 
const Daysworks = db.daysworks;
const Restaurant = db.restaurants;

//create and Update Days Of works
exports.CreateUpdateDays = (req, res) => {
  
    console.log("objectDays",req.body)
    Daysworks.findAll()
    .then(dayworks1 => {
                if (dayworks1.length === 0){
 
            Daysworks.bulkCreate(req.body)
            .then(event => {
    
                if (event) {
                    res.status(200).json(event)
     
                } else {
                    res.send('event dont Daysworks ')
    
                }
            }).catch(err => {
                res.send('errror: ')
    
            })

        }
        var containerdayworks1 = [];
        var test 
        var containerupdate = [];
        var containerFront = [];
        dayworks1.forEach((value2) => {
            req.body.forEach((value3) => {
                // console.log("value2",value2)
                // console.log("value3",value3)
if(value2.RestaurantId===value3.RestaurantId){
 

test =2

        
       
}else  if(value2.RestaurantId != value3.RestaurantId){
 
test = 1

}





            })})

if(test==2){
            var promises = [];
        req.body.forEach(function (valueups) {
            promises.push(Daysworks.update({
                switchopen: valueups.switchopen,
                timeStart: valueups.timeStart,
                timeEnd: valueups.timeEnd
           



            }, { where: { RestaurantId: valueups.RestaurantId,day:valueups.day } }));
        });
        Promise.all(promises).then(function () {
            res.send({
                message: "Daysworks was updated successfully."
            });
        }, function (err) {
            res.send({
                message: `Cannot update Daysworks with id=${id}. Maybe General was not found or req.body is empty!`
            });
        });
}
            if(test==1){
                Daysworks.bulkCreate(req.body)
                            .then(event => {
                    
                                if (event) {
                                    res.status(200).json(event)
                     
                                } else {
                                    res.send('event dont Daysworks ')
                    
                                }
                            }).catch(err => {
                                res.send('errror: ')
                    
                            })

            }
            console.log("insert,",test)
//         if (dayworks1.length === 0){
 
//             Daysworks.bulkCreate(req.body)
//             .then(event => {
    
//                 if (event) {
//                     res.status(200).json(event)
     
//                 } else {
//                     res.send('event dont Daysworks ')
    
//                 }
//             }).catch(err => {
//                 res.send('errror: ')
    
//             })

//         }
//         dayworks1.forEach((value2) => {
//             req.body.forEach((value3) => {
      
//       if (value2.RestaurantId===value3.RestaurantId){

       

//         var promises = [];
//         req.body.forEach(function (valueups) {
//             promises.push(Daysworks.update({
//                 switchopen: valueups.switchopen,
//                 timeStart: valueups.timeStart,
//                 timeEnd: valueups.timeEnd
           



//             }, { where: { RestaurantId: valueups.RestaurantId,day:valueups.day } }));
//         });
//         Promise.all(promises).then(function () {
//             res.send({
//                 message: "Daysworks was updated successfully."
//             });
//         }, function (err) {
//             res.send({
//                 message: `Cannot update Daysworks with id=${id}. Maybe General was not found or req.body is empty!`
//             });
//         });

        
        
       

//     }  


//     })
//     })
    
//     dayworks1.forEach((value12) => {
//         req.body.forEach((value13) => {
//     if (value12.RestaurantId != value13.RestaurantId){


//         console.log("dayworks1dayworks1dayworks1",dayworks1)
        
//        Daysworks.bulkCreate(req.body)
//            .then(dayworks => {
   
//                if (dayworks) {
//                    res.status(200).json(dayworks)
    
//                } else {
//                    res.send('dayworks dont Daysworks ')
   
//                }
//            }).catch(err => {
//                res.send('errror: ')
   
//            })
//        }
//     })
// })


}).catch(err => {
    res.send('errror: ' + err)
})

}

//get daysworks with resto
exports.findRestaurantlwithDayWorks = (req, res) => {
    const RestaurantId = req.params.id;
    
    return Restaurant.findByPk(RestaurantId, { include: ["daysworks"] })
        .then(dayswork => {

            if (dayswork) {
       
 
                res.send(dayswork)
               
            } else {
                res.send('dayswork deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}
