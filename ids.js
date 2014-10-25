var cradle = require('cradle');
var netstat = require('netstat');
cradle.setup({
    host: 'localhost',
    cache: true,
    raw: false,
    forceSave: true
});
var dbconnection = new(cradle.Connection)('http://localhost', 5984, {
    cache: true,
    raw: false,
    forceSave: true
});
var ids = dbconnection.database('ids');
var errors = dbconnection.database('error');
var dbArray = [ids, errors];
checkAllDatabases(dbArray);
var INSTANCE = {
    processVerisons: process.versions,
    processTitle: process.title,
    processPID: process.pid,
    startTime: process.hrtime(),
    platform: process.platform,
    arch: process.arch,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    network: require('os').networkInterfaces()
};
console.log(INSTANCE);
var env = process.env.NODE_ENV || 'development';

function checkAllDatabases(arrayOfDataBases){
    console.log(arrayOfDataBases);
    arrayOfDataBases.forEach(checkDatabase);

    loadWatchDog();
};

function checkDatabase(db, index, array){
    db.exists(function(err, exists) {
        if (err) {
            console.log('error', err);
        } else if (exists) {
           console.log('the force is with you.');
        } else {
            console.log('database does not exists. creating now');
            db.create();
        }
    });
}

function loadWatchDog(){
    netstat.on( 'stdout', function( data ){
        var jsonData = JSON.parse(JSON.stringify( netstat.parse( data )));
            jsonData.forEach(function(item){
                item.dateCreated = new Date().getTime(),
                ids.save( item, function(err){
                    if(err){
                        console.log(err);
                    }
                });
            });
    });
    netstat.on( 'stderr', function( err ) {
        if(err){
//            console.log(err);
            var error = JSON.parse(JSON.stringify( err ));
            errors.save( {"err":error} , function(err){
                if(err){
                    console.log(err);
                }
            });
        }
    });
}