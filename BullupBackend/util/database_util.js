var mysql = require('mysql');
var async = require('async');

var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/util".length).replace(/\\/g, "/"));


var logUtil = dependencyUtil.global.utils.logUtil;
var socketService = dependencyUtil.global.service.socketService;

var mysqlServerConfig = {
    host:'192.168.2.163',
    user: 'root',
    password: '1234',
    database: 'bullup',
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