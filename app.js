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

app.get('/monsters', function (req, res) {
    res.json({
        status: 'success',
        data: [
            {
                name: 'Jhon',
                hp: 10
            },
            {
                name: 'Steve',
                hp: 12
            }
        ]
    });
});

app.listen(8080, function(){
    console.log('Running Express');
});