var async = require('async');
var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/dao".length).replace(/\\/g, "/"));

var dbUtil = dependencyUtil.global.utils.databaseUtil;


//--------------查询全部提现信息------------------------
exports.findAllWithdrawInfo = function(callback) {
    dbUtil.query('select * from bullup_bankcard_info', [], function (err, results){
        if (err) throw err;
        callback(results);
    });
}
//--------------处理同意提现，将状态改为TRUE------------------------
exports.setStatusTrue = function(data,callback) {
    dbUtil.query("update bullup_bankcard_info set bullup_bank_state='已完成' where bullup_withdraw_id=?",[data.payId],function (err, results){
        if (err) throw err;
        callback(results);
    });
}
//--------------处理驳回提现，将状态改为FALSE------------------------
exports.setStatusFalse = function(data,callback) {
    async.parallel([
        function(done){
            dbUtil.query("update bullup_bankcard_info set bullup_bank_state='已驳回' where bullup_withdraw_id=?",[data.payId],function (err, results){
                if (err) throw err;
                done(null,results);
            });
        },
        function(done){
            dbUtil.query("update bullup_wealth set bullup_currency_amount=bullup_currency_amount+? where user_id=?",[data.money,data.userId],function (err, results){
                if (err) throw err;
                done(null,results);
            }); 
        }
    ],function(err,res){
        if (err) throw err;
        callback(res);
    });
}

exports.findUserWealthByUserId = function(userId, callback) {
    dbUtil.query('select bullup_currency_amount from bullup_wealth where user_id = ? and bullup_currency_type = ?',  [userId, 'score'], function(err, row) {
        if (err) throw err;
        callback(row[0]);
    });
}


/**
 * 通过userId查询余额
 * @param userId 
 */
exports.getBalance = function(data,callback){
    dbUtil.query('select bullup_currency_amount from bullup_wealth where user_id=?',[data.userId],function(err,result){
        if (err) throw err;
        callback(result[0]);
    });
}

/**
 * 通过userId查询资金流动记录
 * @param userId 
 */
exports.searchCashFlow = function(data,callback){
    async.waterfall([
        function(callback){
            var tempInfo = {};
            dbUtil.query('select * from bullup_payment_history where user_id=?',[data.userId],function(err,result){
                if (err) throw err;
                tempInfo.rechargeInfo = result;
                callback(null,tempInfo);
            });
        },
        function(tempInfo,callback){
            //var tempInfo = {};
            dbUtil.query('select bullup_bank_money,bullup_bank_cardnumber,bullup_withdraw_id,bullup_bank_wdtime,bullup_bank_state from bullup_bankcard_info where user_id=?',[data.userId],function(err,result){
                if (err) throw err;
                tempInfo.withdrawInfo = result;
                callback(null,tempInfo);
            });
        },
    ],function(err,res){
        if(err) throw err;
        callback(res);
    });
}

/**
 * 将用户充值金额加入数据库,注意，这里只能增加
 * 这里要分别插入两个表
 * @param userId
 */
exports.userRecharge = function(data, callback) {
    async.parallel([
        function(done) {
            dbUtil.query('update bullup_wealth set bullup_currency_amount=bullup_currency_amount+? where user_id=?', [data.money,data.userId], function (err, results){
                if (err) throw err;
                done(err,results);
            });
        },
        function(done){
            dbUtil.query('insert into bullup_payment_history(user_id, bullup_payment_account_id, bullup_bill_value,bullup_bill_type) values (?,?,?,?)', [data.userId, 0, data.money, data.currency], function (err, results){
                if (err) throw err;
                done(err,results);
            });
        }
    ],function(err,results){
        if(!err)
            callback(results);
        else
            callback(null);
    });
    
}


/**
 * 收集银行信息,提现申请入库
 * @param getBankInfo 收集信息
 */
exports.insertBankInfo = function(bankInfo, callback) {
    async.parallel([
        function(done){
            dbUtil.query('insert into bullup_bankcard_info(user_id,bullup_bank_cardnumber,bullup_bank_firstname,bullup_bank_lastname,bullup_bank_areacode,bullup_bank_phone,bullup_bank_money,bullup_bank_email,bullup_bank_streetaddress,bullup_bank_apt_suite_bldg,bullup_bank_zipcode) values (?,?,?,?,?,?,?,?,?,?,?)',
            [bankInfo.userId,bankInfo.cardnumber,bankInfo.firstname,bankInfo.lastname,bankInfo.areacode,bankInfo.phone,bankInfo.money,bankInfo.email,bankInfo.streetaddress,bankInfo.apt_suite_bldg,bankInfo.zipcode], function (err, results){
               if (err) throw err;                                                                                                                                                                                                                             
               done(err,results);
           });
        },
        function(done){
            dbUtil.query('update bullup_wealth set bullup_currency_amount=bullup_currency_amount-? where user_id=?',[bankInfo.money,bankInfo.userId],function(err,results){
                if (err) throw err;
                done(err,results);
            });
        }
    ],function(err,res){
        if(!err)
            callback(null,res);
        else
            callback(err,null);
    });
    
}