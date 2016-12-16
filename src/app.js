'use strict';

var express = require('express'),
    data = require('./storage/profile.json'),
    stateNames = Object.keys(data.states),
    states = Object.keys(data.states).map(function(value){
        return data.states[value];
    });


// Object.keys(data).map(function(value){return data[value]})



var app = express();

app.use(express.static(__dirname + '/public'))

app.set('view engine', 'jade');
app.set('views', __dirname  + '/views'); 

app.get('/', function(req, res) {
    res.render('index', {stateNames: stateNames, states: states, data: data});
}) 


app.get('/profile/:profileName?', function(req, res) {
    var profileName = req.params.profileName;
    if (profileName === undefined || data.states[profileName] === undefined) {
        res.status(503);  
        res.send("This page is under construction!");    
    } else {
        var profile = data.states[profileName];
        var noChapter = false;
        noChapter = Object.keys(profile.chapters).length === 0 ? true : false;

        res.render('profile', {data: profile, profileName: profileName, noChapter: noChapter});
    }

});

app.get('/article/:articleName/:profileName?', function(req, res) {
    var articleName = req.params.articleName;
    var profileName = req.params.profileName;

    if (articleName === undefined || data.articles[articleName] === undefined) {
        res.status(503);  
        res.send("This article page is under construction!");    
    } else {
        res.render('./articles/' + articleName, {profileName: profileName, data:data});
    }

});


app.listen(8080, function() {
    console.log('The frontend server is listening on port 8080');
});


