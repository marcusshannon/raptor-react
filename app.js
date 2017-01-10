var express = require('express');
var app = express();
var path = require('path');
var moment = require('moment');
require('dotenv').config();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/bundle.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'bundle.js'));
});
app.get('/style.css', function(req, res) {
  res.sendFile(path.join(__dirname, 'style.css'));
});

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  timezone: '-05:00'
});

var Day = sequelize.define('Day', {
  date: {type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW},
  A: {type: Sequelize.INTEGER, defaultValue: 0},
  B: {type: Sequelize.INTEGER, defaultValue: 0},
  C: {type: Sequelize.INTEGER, defaultValue: 0},
  D: {type: Sequelize.INTEGER, defaultValue: 0}
});

sequelize.sync();

function incrementDB(req, res, option) {
  Day.findOrCreate({
    where: {
      date: new Date()
    }
  })
  .spread(function(instance, created) {
    instance.increment(option);
    res.set('Access-Control-Allow-Origin', null);
    res.sendStatus(200);
  });
}

app.post('/a', function(req, res) {
  incrementDB(req, res, 'A');
});

app.post('/b', function(req, res) {
  incrementDB(req, res, 'B');
});

app.post('/c', function(req, res) {
  incrementDB(req, res, 'C');
});

app.post('/d', function(req, res) {
  incrementDB(req, res, 'D');
});

function calculateValue(obj) {
  return (obj.A * 3 + obj.B * 2 + obj.C) / (obj.A + obj.B + obj.C + obj.D) / 3;
}

app.get('/data', function(req, res) {
  Day.findAll({order: [['date', 'ASC']]}).then(function(data) {
    res.send(data.map(obj => { return {date: new moment(obj.date), A: obj.A, B: obj.B, C: obj.C, D: obj.D, value: calculateValue(obj)}}));
  });
});

app.listen(process.env.PORT || 3000);
