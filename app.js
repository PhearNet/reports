//require('newrelic');
var INSTANCE = {
    processVerisons: process.versions,
    processTitle: process.title,
    processPID: process.pid,
    startTime: process.hrtime(),
    platform: process.platform,
    arch: process.arch,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    network: require('os').networkInterfaces(),
};
console.log(INSTANCE);

//ENV Vars and application arguments
var env = process.env.NODE_ENV || 'development';
//console.log(process.env);
// all environments
var appPort = process.argv[2];
// print process.argv
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

//DEPENDS Vars
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


//DB config
//cradle.setup({
//    host: 'localhost',
//    cache: true,
//    raw: false,
//    forceSave: true
//});
//var dbconnection = new(cradle.Connection)('http://localhost', 5984, {
//    cache: true,
//    raw: false,
//    forceSave: true
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

//Application config
var app = express();
app.set('port', process.env.PORT ||3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(favicon());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


//Application routing
app.get('/', routes.index);
app.get('/users', user.list);

//Maybe use ghost as a blog?
//ghost();

//Create the server instance
var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});


//Bind to the websocket
//var io = _io.listen(server);
//
////var geoip = require('geoip-lite');
//
//io.on('connection', function(socket) {
//    console.log('a user connected');
//    //var address = socket.handshake.address;
//    //var geo = geoip.lookup(address.address);
//    // console.log(address)
//    // console.log(geo);
//    socket.emit('news', {
//        hello: 'world'
//    });
//
//    socket.on('windowEvent', function(event) {
//        console.log("Event");
////        db.save({
////            dateCreated: new Date().getTime(),
////            headers: socket.client.request.headers,
////            ip: socket.handshake.address,
////            event: event
////        }, function(err, res) {
////            // Handle response
////            console.log(err);
////        });
//
//        console.log(event.type);
//    });
//    socket.on('disconnect', function() {
//        db.save({
//            headers: socket.client.request.headers,
//            ip: socket.handshake.address,
//            event: "disconnect"
//        }, function(err, res) {
//            // Handle response
//        });
//
//        console.log('disconnected');
//    });
//
//});
