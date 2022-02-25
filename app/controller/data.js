var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { restaurants } = require('../config/db.config.js');
const User = db.users;
const Restaurant = db.restaurants;
const Etablissement = db.etablissement;
const Cuisine = db.cuisine;
const Ambiance = db.ambiance;
const General = db.general;

exports.CreateListRestaurant = (req, res) => {
    var container = [];
    var list = [
        "  The border Nabeul",
        "Le bar by Dar Zarrouk",
        "Le petit Tunis",
        "Le Jasmin de Tunis",
        "Le Soleil de Tunis",
        "L'entracte Café Restaurant",
        "Chez BOB de Tunis",
        "Ibis Restaurant Tunis",
        "Moun of Tunis",
        "La rose de Tunis",
        "El Ali",
        "Foundouk El Attarine",
        "Il ritrovo degli Artisti",
        "El Walima",
        "Chez Slah",
        "Restaurant Dar Slah",
        "Le Grand café du theatre",
        "Restaurant café El Mrabet",
        "La focaccia",
        "L'astragale",
        "Sultan Ahmet",
        "Restauran Ghassen",
        "Romanesca",
        "Via Mercato",
        "Momenti Italiani",
        "Chez Nous",
        "Insomnia",
        "La suite de Farfalle",
        "Le paradiso",
        "Biwa",
        "La farfalle Berges du lac",
        "Al Abed",
        "Gusto del Mare",
        "le Carnot",
        "Origami Sushi Bar Ennasr",
        "Chilli's American Grill",
        "Frash K Salad Shop",
        "L'orient ",
        "Ristorante Nonna Carmela",
        "Le petit Tunis",
        "Le Baroque",
        "La falaise",
        "Club Grill Citroen",
        "Coté Jardin",
        "Aquatic",
        "Restaurant Lemdina",
        "Capitole",
        "COCOTT ' sandwich café",
        "L'ardoise",
        "La trattoria Italiana",
        "Circolo Italiano Tunisi",
        "L'antica Pizzeria Da Pietro",
        "The Big Apple Coffee Shop",
        "Al Mazar",
        "Dar Tej",
        "La cuisine au 4ième",
        "The Big Dip",
        "La norma Ristorante",
        "Restaurant le Caire",
        "Peppico",
        "La tavolata",
        "La mamma",
        "Spago",
        "Boeuf sur le toit / TAURUS",
        "Steak Haus",
        "Goomba's",


    ]


    var adresse = [
        "   Résidence la Croisette, Sidi Mahrsi(3, 08 km) 8000 Nabeul",
        "Rue Hédi Zarrouk(58, 02 km) 2026 Sidi Bou Saïd",
        "6, rue d’Alger(63, 07 km)1000 Tunis",
        "3 Rue Breteuil, 13001 Marseille, France",
        "24 Rue Merlin de Douai, 59500 Douai, France",
        "09 Rue Alger(63, 08 km) 1000 Tunis",
        "10 Rue Richer, 75009 Paris, France",
        "Rue de Syrie(63, 54 km) 1002 Tunis",
        "7445 1 / 2 Sunset Blvd, Los Angeles, CA 90046, Etats - Unis",
        "5 Rue Maurice Paillard(1 549, 60 km) 93430 Villetaneuse",
        "45 Bis Rue Jemaâ Zitouna La Médina Tunis(63, 38 km) 1006 Tunis",
        "9 bis souk el attarine, Tunis médina(63, 47 km) 1006 Tunis",
        "Rue Mohamed Triki, Ennasr 2(69, 15 km) 2037 Ariana",
        "Rue du Lyban, Tunis",
        "14bis, r.Pierre de Coubertin, Tunis",
        "14 bis rue Pierre Coubertin(66, 60 km) 1002 Tunis",
        "Avenue Habib Bourguiba, Tunis",

        "12 rue l'indépendance (59,77 km) 2078 La Marsa",
        "17, ave Charles Nicolle(64, 86 km) 1082 Tunis",
        "5 impasse azzouz rebaï manar 2 1004 Mutuelleville, Aryanah, Tunisia",
        "75 rue de palestine 1002 el belvédère(64, 18 km) 1002 Tunis",
        "29 Avenue Ahmed Tlili, El Menzah 5(66, 75 km) 1000 Tunis",
        "rue de la bourse(60, 65 km) 1053 Tunis",
        "Résidence La Coupole, , 92 Avenue Hédi Nouira Ennasr 2, Ennasr 2 2037",
        "11, Rue de Marseille(62, 91 km) Tunis",
        "Avenue Hedi Nouira immeuble Amina(68, 68 km) 2037 Tunis",
        "Immeuble Majd, Rue Lac de Constance, les berges du lac  1053 Tunis",
        "16, Rue des États Unis d'Amérique, Tunis Belvédère 1002 Tunis",
        "Rue du Lac Biwa, Tunisie 1053 Tunis",
        "Immeuble Majd, Rue Lac de Constance, les berges du lac 1053 Tunis",
        "Tunis",
        "Avenue Farhat Hached Mégrine Sidi rezig, Megrine",
        "20 - 22 Avenue de Paris - 1080 Tunis 1080 Tunis",
        "28, Av.Habib Bourguiba - Marsa Ville 2070 La Marsa",
        "1 Avenue principale, Tunis",
        "Rue du lac de Côme  1053 Tunis",
        "Leman Industrie Connectique - Tunisia, Avenue Elmghira, Tunis",
        "1 - Bis Moussa Ibn Noussair - Menzah 5(66, 48 km) Tunis",

        "28 bis rue de l'inde (63,82 km) 1002 Tunis",
        "monji slim(67, 84 km)2042 Le Bardo",
        "Les berges du lac à côté du top happiness 1053 Tunis",
        "Résidence du Golf, les Berges du Lac 2 1053 Tunis",
        "RUE DU LAC BIWA(61, 65 km) 1053 Tunis",
        "Les Berges du Lac, Tunis",
        "75, Avenue de l’indépendance(66, 83 km) 2000 Le Bardo",
        "Rue Colonel Guarnaoui Khezama - est(67, 64 km) 4051 Sousse",
        "Rue du Lac Balbina, Tunis, Tunisie(61, 10 km) 1053 Tunis",
        "Avenue Taher Ben Ammar, Ariana",
        "102, Avenue de la Liberté 1002 Tunis",
        "Cité des Jardins d'El Menzah (70,17 km) 2094 Tunis",
        "Zahret el Bouhaira.LAC II(60, 39 km) 1053 Tunis",
        "1 Rue de Marseille, Tunis",
        "Rue du Maroc, Carthage, Site archéologique de Carthage",
        "1 Rue Mohamed Beyrem V(59, 41 km) 2046 Sidi Daoud, Tunis, Tunisia",
        "Lac 2, Tunis(60, 14 km) 1053 Tunis",
        "6, Rue Hannibal(61, 70 km) 1075 Gammarth",
        "6 Rue du Caire, Tunis 1000",
        "Rue de la bourse, Rosalys Building(60, 85 km) 1053 Tunis",
        "La Tavolata, Avenue Hédi Nouira, Ariana, Gouvernorat de Tunis, 2037 Tunis",
        "11 Bis, Rue de Marseille(66, 70 km) 1000 Tunis",
        "Complexes esplanade monastir(75, 84 km) 5000 Monastir",
        "3 Avenue Fatouma Bourguiba(64, 40 km) 2036 Soukra, Aryanah, Tunisia",
        "rue de Marseille(63, 02 km) Tunis",
        "80.avenue de carthage.les jardins de carthage.ain zaghouane 2046 Tunis"

    ]
    var i
    for (i = 0; i < list.length; i++) {
        const restData = {
            NomResto: list[i],
            Description: "",
            adresse: adresse[i],
            NBzone: '2',
            temps_ouverture: req.body.temps_ouverture,
            temps_fermeture: req.body.temps_ouverture,
            heureDebut: "00:00",
            heureFin: "00:00",
            UserId: 0,

        }
        container.push(restData);
    }


    Restaurant.bulkCreate(container)
        .then(container => {

            if (container) {
                res.status(200).json(container)

            } else {
                res.send('container dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}


exports.addEtablissement = (req, res) => {
    var container = [];
    var list = [
        "Restaurant à la carte",
        "Restaurant",
        "Bar / Lounge",
        "Bar / Lounge",
        "Restaurant",

    ]

    var i
    var j = 314
    for (i = 0; i < list.length; i++) {
        const etablissement = {
            type: list[i],
            RestaurantId: j,
            //published: req.body.published ? req.body.published : false
        };
        j++;
        container.push(etablissement);
    }


    Etablissement.bulkCreate(container)
        .then(container => {

            if (container) {
                res.status(200).json(container)

            } else {
                res.send('container dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}


exports.addCuisine = (req, res) => {
    var container = [];
    var list = [
        "DIVERS",
        "TUNISIENNE",
        "TUNISIENNE",
        "TUNISIENNE ",
        "ITALIENNE",
        "TUNISIENNE",
        "TUNISIENNE",
        "TUNISIENNE",
        "TUNISIENNE",
        "TUNISIENNE",
        "TUNISIENNE ",
        "ITALIENNE",
        "TUNISIENNE ",
        "TUNISIENNE ",
        "DIVERS",
        "DIVERS",
        "ITALIENNE",
        "DIVERS",
        "TURQUE",
        "TUNISIENNE",
        "ITALIENNE",
        "FRUITS DE MER / POISSON",
        "ITALIENNE",
        "FRANCAISE",
        "ITALIENNE",
        "ITALIENNE",
        "MEDITERANIENNE",
        "MEDITERANIENNE",
        "ITALIENNE",
        "TUNISIENNE",
        "FRUITS DE MER / POISSON",
        "TUNISIENNE",
        "ASIATIQUE",
        "MEXICAINE",
        "TUNISIENNE ",
        "TUNISIENNE",
        "ITALIENNE",
        "TUNISIENNE ",
        "TUNISIENNE ",
        "EUROPEENE",
        "TUNISIENNE",
        "MEDITERANIENNE",
        "TUNISIENNE",
        "TUNISIENNE",
        "ITALIENNE",
        "TUNISIENNE",
        "ITALIENNE",
        "ITALIENNE", ,
        "ITALIENNE",
        "ITALIENNE",
        "TUNISIENNE",
        "TUNISIENNE",
        "DIVERS",
        "MEDITERANIENNE",
        "ITALIENNE",
        "TUNISIENNE",
        "ITALIENNE", ,
        "ITALIENNE",
        "ITALIENNE",
        "DIVERS",
        "DIVERS",
        "DIVERS",
        "ITALIENNE",
    ]

    var i
    var j = 253
    for (i = 0; i < list.length; i++) {
        const cuisine = {
            type: list[i],
            RestaurantId: j,
            //published: req.body.published ? req.body.published : false
        };
        j++;
        container.push(cuisine);
    }


    Cuisine.bulkCreate(container)
        .then(container => {

            if (container) {
                res.status(200).json(container)

            } else {
                res.send('container dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}


exports.addAmbiance = (req, res) => {
    var container = [];
    var list = [
        "Calme",
        "Familiale",
        "Familiale",
        "Familiale",
        "Familiale",
        "Calme",
        "Live Music",
        "Calme",
        "Calme",
        "Familiale",
        "Familiale",
        "Familiale",
        "Familiale",
        "Live Music",
        "Familiale",
        "Familiale",
        "Familiale",
        "Calme",
        "Familiale",
        "Calme",
        "Calme",
        "Familiale",
        "Calme",
        "Calme",
        "Familiale",
        "Familiale",
        "Live Music",
        "Live Music",
        "Familiale",
        "Familiale",
        "Familiale",
        "Calme",
        "Familiale",
        "Familiale",
        "Familiale",
        "Familiale",
        "Familiale",
        "Familiale",
        "Familiale",
        "Familiale",
        "Familiale",
        "Familiale",
        "Calme",
        "Familiale",
        "Familiale",
        "Familiale",
        "Familiale",
        "Familiale",
        "Familiale",
        "Familiale",
        "Live Music",
        "Calme",
        "Familiale",
        "Familiale",
        "Calme",
        "Familiale",
        "Familiale",
        "Live Music",
        "Familiale",
        "Familiale",
        "Live Music",
        "Live Music",
        "Familiale",
    ]

    var i
    var j = 253
    for (i = 0; i < list.length; i++) {
        const ambiance = {
            type: list[i],
            RestaurantId: j,
            //published: req.body.published ? req.body.published : false
        };
        j++;
        container.push(ambiance);
    }


    Ambiance.bulkCreate(container)
        .then(container => {

            if (container) {
                res.status(200).json(container)

            } else {
                res.send('container dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}

exports.addParking = (req, res) => {
    var container = [];
    var list = [
        "oui",
        "non",
        "non",
        "non",
        "non",
        "non",
        "oui",
        "oui",
        "non",
        "non",
        "oui",
        "non",
        "non",
        "oui",
        "non",
        "non",
        "non",
        "non",
        "non",
        "oui",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "oui",
        "oui",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "oui",
        "oui",
        "non",
        "oui",
        "oui",
        "oui",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "oui",
        "oui",
        "non",
        "oui",
        "oui",
        "non", ,
        "non",
        "non",
        "non",
        "non",
        "oui",
        "oui",
        "non",

    ]

    var i
    var j = 253
    for (i = 0; i < list.length; i++) {
        if (list[i] == "oui") {
            const parking = {
                type: "parking",
                RestaurantId: j,
                //published: req.body.published ? req.body.published : false
            };
            j++;
            container.push(parking);
        } else {
            j++;
        }

    }


    General.bulkCreate(container)
        .then(container => {

            if (container) {
                res.status(200).json(container)

            } else {
                res.send('container dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}

exports.addGeneral = (req, res) => {
    var container = [];
    var list = [
        "oui",
        "non",
        "non",
        "non",
        "non",
        "non",
        "oui",
        "oui",
        "non",
        "non",
        "non",
        "non",
        "non",
        "oui",
        "non",
        "non",
        "non",
        "oui",
        "non",
        "oui",
        "oui",
        "non",
        "non",
        "oui",
        "non",
        "non",
        "oui",
        "oui",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "oui",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "non",
        "oui",
        "non",
        "non",
        "oui",
        "non",
        "non",
        "oui",
        "non",
        "non",
        "oui",
        "oui",
        "non",

    ]

    var i
    var j = 253
    for (i = 0; i < list.length; i++) {
        if (list[i] == "oui") {
            const parking = {
                type: "exige reservation",
                RestaurantId: j,
                //published: req.body.published ? req.body.published : false
            };
            j++;
            container.push(parking);
        } else {
            j++;
        }

    }


    General.bulkCreate(container)
        .then(container => {

            if (container) {
                res.status(200).json(container)

            } else {
                res.send('container dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}