/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
//var url = 'mongodb://root:secure@ds161483.mlab.com:61483/asefall17';
var url = 'mongodb://gani:gani@ds115219.mlab.com:15219/gani_db'
//var url = 'mongodb://marmik:2621@ds051923.mlab.com:51923/demo';
//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8080)

var id = 1;
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        debugger;
        
        var dbo = db.db("gani_db");
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var data = {
            userId:id++,
            firstName:"gani",
            lastName:"Syed",
            mobileNum:8162174183,
            city:"kansas"
        };

        insertDocument(dbo, data, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
})

app.get('/search', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("gani_db");
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        dbo.collection("gani_collection").findOne({userId:1}, function(err, result) {
            if (err) throw err;
            console.log("users data retrieved",result);
            db.close();
            res.status(200).json(result);
        })
    });
})

var insertDocument = function(db, data, callback) {
    db.collection('gani_collection').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the asedemo collection.", data);
        callback();
    });
};
