if(bullup == null){
    var bullup = {};
}

bullup.alert = function(text, title = "提示") {
    $('#modalpopo .modal-content  h4').text(title);
    $('#modalpopo .ceneter_w').html(text);
    //$('#modalpopo').modal('open'); 
    $('#modalpopo').modal('open');
    if(text=="登陆失败!"){
        $('#modalpopo').css("z-index","1010");
    } 
};