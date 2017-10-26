var pathUtil = require("./path_util.js");

exports.init = function(){
    pathUtil.init();
    exports.global = {};
    exports.global.service = {};
    exports.global.utils = {};
    exports.global.listener = {};
    exports.global.dao = {};
    
    exports.global.dao.baseInfoDao = require(pathUtil.paths.daoPaths.baseInfoDaoPath);
    exports.global.dao.wealthInfoDao = require(pathUtil.paths.daoPaths.wealthInfoDaoPath);
    exports.global.dao.rankInfoDao = require(pathUtil.paths.daoPaths.rankInfoDaoPath);
    exports.global.dao.battleRecordDao = require(pathUtil.paths.daoPaths.battleRecordDaoPath);
    exports.global.dao.lolInfoDao = require(pathUtil.paths.daoPaths.lolInfoDaoPath);

    exports.global.service.userService = require(pathUtil.paths.servicePaths.userServicePath);
    exports.global.service.battleService = require(pathUtil.paths.servicePaths.battleServicePath);
    exports.global.service.chatService = require(pathUtil.paths.servicePaths.chatServicePath);
    exports.global.service.administratorService = require(pathUtil.paths.servicePaths.administratorServicePath);
    exports.global.service.competitonService = require(pathUtil.paths.servicePaths.competitonServicePath);
    exports.global.service.feedbackService = require(pathUtil.paths.servicePaths.feedbackServicePath);
    exports.global.service.lolKeyService = require(pathUtil.paths.servicePaths.lolKeyServicePath);
    exports.global.service.matchService = require(pathUtil.paths.servicePaths.matchServicePath);
    exports.global.service.paymentService = require(pathUtil.paths.servicePaths.paymentServicePath);
    exports.global.service.socketService = require(pathUtil.paths.servicePaths.socketServicePath);
    exports.global.service.stripeService = require(pathUtil.paths.servicePaths.stripeServicePath);
    exports.global.service.teamService = require(pathUtil.paths.servicePaths.teamServicePath);

    exports.global.utils.databaseUtil = require(pathUtil.paths.servicePaths.databaseUtilPath);
    exports.global.utils.pathUtil = pathUtil;
    exports.global.utils.dependencyUtil = require(pathUtil.paths.servicePaths.dependencyUtilPath);
    exports.global.utils.logUtil = require(pathUtil.paths.servicePaths.logUtilPath);
    exports.global.utils.lolUtil = require(pathUtil.paths.servicePaths.lolUtilPath);

    exports.global.listener.connectionListener = require(pathUtil.paths.listenerPaths.connectionListenerPath);
    exports.global.listener.userListener = require(pathUtil.paths.listenerPaths.userListenerPath);
    exports.global.listener.battleListener = require(pathUtil.paths.listenerPaths.battleListenerPath);
    exports.global.listener.chatListener = require(pathUtil.paths.listenerPaths.chatListenerPath);
    exports.global.listener.administratorListener = require(pathUtil.paths.listenerPaths.administratorListenerPath);
    exports.global.listener.competitionListener = require(pathUtil.paths.listenerPaths.competitionListenerPath);
    exports.global.listener.feedbackListener = require(pathUtil.paths.listenerPaths.feedbackListenerPath);
    exports.global.listener.lolkeyListener = require(pathUtil.paths.listenerPaths.lolKeyListenerPath);
    exports.global.listener.matchListener = require(pathUtil.paths.listenerPaths.matchListenerPath);
    exports.global.listener.paymentListener = require(pathUtil.paths.listenerPaths.paymentListenerPath);
    exports.global.listener.socketListener = require(pathUtil.paths.listenerPaths.socketListenerPath);
    exports.global.listener.stripeListener = require(pathUtil.paths.listenerPaths.stripeListenerPath);
    exports.global.listener.teamListener = require(pathUtil.paths.listenerPaths.teamListenerPath);

}