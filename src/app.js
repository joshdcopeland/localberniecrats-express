'use strict';
var http = require('http');
var express = require('express'),
    data = require('./storage/profile.json'),
    stateNames = Object.keys(data.states),
    states = Object.keys(data.states).map(function(value){
        return data.states[value];
    });
    var chapterTotal = 0;
    var chapters = Object.keys(data.states).map(function(value){
        chapterTotal += Object.keys(data.states[value].chapters).length;
        return {state: value, count: Object.keys(data.states[value].chapters).length}
    });
    


//chapterTotal: chapterTotal,


var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'jade');
app.set('views', __dirname  + '/views'); 

app.get('/', function(req, res) {
    res.render('index', {chapterTotal: chapterTotal,chapters: chapters, stateNames: stateNames, states: states, data: data});
}) 


app.get('/profile/:profileName?', function(req, res) {
    var profileName = req.params.profileName;

    if (profileName === undefined || data.states[profileName] === undefined) {
        res.status(503);  
        res.send("This page is under construction!");     
    } else {
        var profile = data.states[profileName];
        var profileAbbrev = data.states[profileName].abbrev;
        var noChapter = false;
        noChapter = Object.keys(profile.chapters).length === 0 ? true : false;

        res.render('profile', {chapterTotal: chapterTotal, chapters: chapters, data: profile, profileName: profileName, profileAbbrev: profileAbbrev, noChapter: noChapter});
    }

});

app.get('/article/:articleName/:profileName?', function(req, res) {
    var articleName = req.params.articleName;
    var profileName = req.params.profileName;

    if (articleName === undefined || data.articles[articleName] === undefined) {
        res.status(503);  
        res.send("This article page is under construction!");    
    } else {
        res.render('./articles/' + articleName, {chapterTotal: chapterTotal, chapters: chapters, profileName: profileName, data:data});
    }

});


http.createServer(app).listen(app.get('port'), function(){
  console.log('The Frontend server listening on port ' + app.get('port'));
});

