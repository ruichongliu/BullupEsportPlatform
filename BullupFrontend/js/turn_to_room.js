$(document).ready(function(){
    $("#turn_to_room_btn").click(function(){
        if(battleInfo != null){
            socket.emit('getFlipClock',{
                battleName:battleInfo.battleName
            });
        }
        console.log('this is battleInfo:',JSON.stringify(battleInfo));
        setTimeout(function(){
            if(battleInfo != null){
                //判断是否是房主
                if(userInfo.userId==battleInfo.blueSide.captain.userId){
                    handleTimeout(battleInfo.flipClock * 1000);
                    //alert(battleInfo.flipClock);
                }
                //回到对战页面
                var battleRoomHtml = bullup.loadSwigView("./swig_fight.html", {
                    blueSide: battleInfo.blueSide,
                    redSide: battleInfo.redSide,
                });
                $('#main-view').html(battleRoomHtml);
                $('#waiting-modal').css('display', 'none');    
                $('#team-detail-modal').css('display', 'none');    
                $('.modal-overlay').remove();
    
                var bluePts = battleInfo.blueSide.participants;
                var redPts = battleInfo.redSide.participants;
                var own;
                var enemy;
                for(key in bluePts){
                    if(bluePts[key].name==userInfo.nickname){
                        own = bluePts;
                        enemy = redPts;
                    }else{
                        own = redPts;
                        enemy = bluePts;
                    }
                }
                var o = getRadarData(own);
                var e = getRadarData(enemy);

                var labelArray = ['击杀', '死亡', '助攻','治疗', '造成伤害', '承受伤害'];
                var dataArray1 = e;
                var dataArray2 = o;
                bullup.generateRadar(dataArray1, dataArray2, labelArray, "战力对比", "teams-radar-chart");
                var clock = $('.countdown-clock').FlipClock(battleInfo.flipClock, {
                    clockFace: 'MinuteCounter',
                    countdown: true
                });
                $('#my_collapsible').collapsible('open', 0);
                $('#my_collapsible').collapsible('open', 1);
                $('#my_collapsible').collapsible('open', 2);
                $('#component_collapsible').collapsible('open', 0);
                $('#component_collapsible').collapsible('open', 1);
                $('#component_collapsible').collapsible('open', 2);
                $('#my_collapsible').collapsible('open', 3);
                $('#my_collapsible').collapsible('open', 4);
                $('#component_collapsible').collapsible('open', 3);
                $('#component_collapsible').collapsible('open', 4);
    
            }else if(teamInfo != null){
                page(formedTeams,1);//此函数在initial_pagination.js
            }else if(roomInfo != null){
                //回到房间页面
                //处理空值
                for(var index in roomInfo.participants){
                    if(roomInfo.participants[index] == null){
                        delete roomInfo.participants[index];
                        roomInfo.participants.length -= 1;
                    }
                }
                var roomInfoFrameHtml = bullup.loadSwigView('swig_myroom_frame.html', {});
                var roomInfoHtml = bullup.loadSwigView('swig_myroom_info.html', {
                    room: roomInfo
                });
                var teamates = [];
                for(var participantIndex in roomInfo.participants){
                    teamates.push(roomInfo.participants[participantIndex]);
                }
                var teamatesHtml = bullup.loadSwigView('swig_myroom_teamate.html', {
                    teamates : teamates
                });
                $('.content').html(roomInfoFrameHtml);
                $('#team_info').html(roomInfoHtml);
                $('#teamates_info').html(teamatesHtml);
                $('#create_room_modall').modal('close');
                $.getScript('/js/invite_friend.js');
            
                $('#invite_friend_btn').sideNav({
                    menuWidth: 400, // Default is 300
                    edge: 'right', // Choose the horizontal origin
                    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                    draggable: true, // Choose whether you can drag to open on touch screens,
                    onOpen: function(el) {},
                    onClose: function(el) {}
                });
            
                $("#confirm_create_team_btn").click(function(){
                    if( roomInfo != null){
                            alert("您已经创建队伍,不能重复创建队伍");
                    }else{
                        
                        console.log(roomInfo);
                        if(roomInfo.gameMode == 'match'){
                            if(roomInfo.captain.name != roomInfo.participants.name){
                            //bullup.alert("匹配中，请等待！");
                            bullup.loadTemplateIntoTarget('swig_fightfor.html', {
                                'participants': roomInfo.participants
                            }, 'main-view');
                            var labelArray = ['战力', '击杀', '死亡', '助攻', '造成伤害', '承受伤害'];
                            var dataArray1 = [50,50,50,50,50,50];
                            bullup.generateRadar(dataArray1, null, labelArray, "我方战力", "team-detail-chart");
                            }
                        }
                        var teamStrengthScore = 0;
                        var teamParticipantsNum = 0;
                        for(var index in roomInfo.participants){
                            teamStrengthScore += roomInfo.participants[index].strength.score;
                            teamParticipantsNum++;
                        }
                        teamStrengthScore /= teamParticipantsNum;
                        roomInfo.teamStrengthScore = teamStrengthScore;
                        roomInfo.teamParticipantsNum = teamParticipantsNum;
                        socket.emit('establishTeam', roomInfo);
                            }
                    
            });
    
            }
        },1000);


    });
});