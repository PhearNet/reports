var env = process.env.NODE_ENV || 'development';
//console.log(process.env);
//var ghost = require('ghost');
var favicon = require('favicon');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var _io = require('socket.io');
//var passport = require('passport');
//var d3 = require('d3');
//var cradle = require('cradle');
//cradle.setup({
//    host: 'localhost',
//    cache: true,
//    raw: false,
//    forceSave: true
//});
var app = express();

// all environments
var appPort = process.argv[2];
// print process.argv
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
}); 
app.set('port', process.env.PORT ||3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
//    app.use(express.errorHandler());
}
//var jsdom = require("jsdom");


app.get('/', routes.index);
app.get('/users', user.list);

//var dbconnection = new(cradle.Connection)('http://localhost', 5984, {
//    cache: true,
//    raw: false,
//   forceSave: true
//});
//var db = dbconnection.database('funkytown');
//db.exists(function(err, exists) {
//    if (err) {
//        console.log('error', err);
//    } else if (exists) {
//        console.log('the force is with you.');
//    } else {
//        console.log('database does not exists.');
//        db.create();
//    }
//});


//db.view('visitors/headers', function (err, res) {
//    jsdom.env(
//        "http://localhost", ["http://code.jquery.com/jquery.js"],/
//        function (errors, window) {
//        console.log("Getting the Page", window.$("h1").length);
//        res.forEach(function (row) {
//console.log("%s is on the %s side of the force.", row.host, row['user-agent']);
//       });
// }
//);
//});

var server = http.createServer(app);
server.listen(app.get('port'), function(thing) {
    console.log(thing);
    console.log('Express server listening on port ' + app.get('port'));
});
var io = _io.listen(server);
//var geoip = require('geoip-lite');
io.on('connection', function(socket) {
    // console.log('a user connected');
    //var address = socket.handshake.address;
    //var geo = geoip.lookup(address.address);
    // console.log(address)
    // console.log(geo);
    socket.emit('news', {
        hello: 'world'
    });

    socket.on('windowEvent', function(event) {
       // db.save({
       //     headers: socket.client.request.headers,
       //     ip: socket.handshake.address,
       //     event: event
       // }, function(err, res) {
            // Handle response
       // });
        socket.on('disconect', function() {

            console.log('disconnected');
        });

        console.log(event.type);
    });
});
//ghost();
