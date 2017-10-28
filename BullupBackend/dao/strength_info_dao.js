var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/dao".length).replace(/\\/g, "/"));

var dbUtil = dependencyUtil.global.utils.databaseUtil;

exports.updateStrengthInfo = function(bindInfo, callback){
    connection.query("update bullup_strength set bullup_strength_score = ? where user_id = ?", [bindInfo.oriStrengthScore, bindInfo.userId], function(err, res){
        callback(res);
    });
}

exports.findStrengthInfoByUserId = function(userId, callback) {
    connection.query('select * from bullup_strength where user_id=?',  [userId], function(err, row) {
        if (err) throw err;
        callback(row[0]);
    });
}