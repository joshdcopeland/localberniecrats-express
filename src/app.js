'use strict';

var express = require('express'),
    profiles = require('./storage/profile.json');

var app = express();

app.get('/', function(req, res) {

    res.send("<h1>Local Berniecrats!!</h1>");
})

app.get('/profile/:profileName?', function(req, res) {
    var profileName = req.params.profileName;
    if (profileName === undefined || profiles.states[profileName] === undefined) {
        res.status(503);
        res.send("This page is under construction!");    
    } else {
        var profile = profiles.states[profileName];
        res.send(profile);
    }

});

app.listen(3000, function() {
    console.log('The frontend server is listening on port 3000');
});


