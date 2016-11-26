var express = require('express');

var app = express();

app.get('/locations', function(request, response){
    var cityNames = ['Caspiana', 'Indigo', 'Paradise'];
    response.send(cityNames);
    response.end();
});

app.listen(3001, function(){
    console.log('Running Express');
});