var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { restaurants } = require('../config/db.config.js');
const User = db.users;
const Invoice = db.invoices;
const BookWaitSeat = db.bookwaitseats;
//const Client = db.clients;
const { NumberToLetter } = require("convertir-nombre-lettre");
//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");

// Read HTML index
var html = fs.readFileSync("app/html/invoice.html", "utf8");
var options = {
    format: "A4",
    orientation: "portrait",
    border: "4mm",
    base: 'file:///' + __dirname + '/img/',
    footer: {
        height: "14mm",
        contents: {
            first: '<hr> <div id="textbox"> <span class="alignleft">Tel: 31 403 628/ 220 06 215</span><span class="alignright">E-mail: emm.nabeul@gmail.com</span> </div>',

        }
    }

};

exports.CreateBon = (req, res) => {

    const bnData = {

        UserId: req.body.UserId,
        codeInvoice: req.body.codeInvoice,


    }

    Invoice.create(bnData)
        .then(bnData => {

            if (bnData) {
                res.status(200).json(bnData)

            } else {
                res.send('bnData dont cr ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}


exports.Bonwithclient = (req, res) => {




    console.log("imggggggggggggggg", options)
    const UserId = req.params.id;

    return User.findByPk(UserId, { include: ["invoice", "bookwaitseat"] })
        .then(data => {

            if (data) {
                res.status(200).json(data)

            } else {
                res.send('data deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}


exports.PrintBons = (req, res) => {

    const BwsId = req.params.id;
    User.findOne({

        include: [{
            model: BookWaitSeat, as: "bookwaitseat",
            where: { random: BwsId },
            required: true,
        }],
        raw: true, // <----- HERE
        nest: true
    }).then(data => {
        console.log("haotun", data)




        var document = {
            html: html,
            data: data,
            path: "C:\\Users\\Administrateur\\Downloads\\Tawelti-BackEnd-master\\Tawelti-BackEnd-master" + '/Bon_pdf/' + "_" + data.id + "_" + data.bookwaitseat.id + ".pdf",
            type: "",
            url: "http://localhost:3000/invoice/" + data.BwsId,
        };

        if (data) {
            pdf
                .create(document, options)
                .then((ffff) => {
                    var file = fs.createReadStream("C:\\Users\\Administrateur\\Downloads\\Tawelti-BackEnd-master\\Tawelti-BackEnd-master" + '/Bon_pdf/' + "_" + data.id + "_" + data.bookwaitseat.id + ".pdf");
                    var stat = fs.statSync("C:\\Users\\Administrateur\\Downloads\\Tawelti-BackEnd-master\\Tawelti-BackEnd-master" + '/Bon_pdf/' + "_" + data.id + "_" + data.bookwaitseat.id + ".pdf");
                    res.setHeader('Content-Length', stat.size);
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
                    file.pipe(res);
                })
                .catch((error) => {
                    console.error(error);
                });


        } else {
            res.send('data deos not exist')

        }
    }).catch(err => {
        res.send('errror: ' + err)
    })
}