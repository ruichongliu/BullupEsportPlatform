var mysql = require('mysql');
var async = require('async');

var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/util".length).replace(/\\/g, "/"));


var logUtil = dependencyUtil.global.utils.logUtil;
var socketService = dependencyUtil.global.service.socketService;

var mysqlServerConfig = {
<<<<<<< HEAD
    host:'127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'test',
=======
    host:'18.221.98.48',
    user: 'root',
    password: '123456',
    database: 'bullup',
>>>>>>> c72e607ad3f8e0bd5095ee82c7d046c8a3497ff8
    useConnectionPooling: true
};

var connection = mysql.createConnection(mysqlServerConfig);

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Mysql connected as id ' + connection.threadId);
});

exports.query = function(sql, values, callback){
    connection.query(sql, values, function(err, res){
        callback(err, res);
    });
};