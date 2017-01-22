var express = require('express');

var app = express();

/**
 * All static files served through this middleware
 */
app.use(express.static('web'));

/**
 * Serve index.html
 */
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/web/index.html');
// });

var monsters = require('./routes/monsters');
var items = require('./routes/items');

app.use('/monsters', monsters);
app.use('/items', items);

app.listen(8080, function(){
    console.log('Running Express');
});
