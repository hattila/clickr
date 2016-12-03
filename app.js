var express = require('express');

var app = express();

/**
 * All static files served throught this middleware
 */
app.use(express.static('web'));

/**
 * Serve index.html
 */
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/web/index.html');
// });

app.listen(8080, function(){
    console.log('Running Express');
});