/******************** api **********************************
로그인
JSON.stringify(obj)
*************************************************************/

this.addEventListener('DOMContentLoaded', function(){
    this.init();
});


function init(){
    var loginSuccess = sessionStorage.getItem("dailylog2_loginsuccess");

    console.log("loginSuccess..." + loginSuccess);

    if(loginSuccess == "N"){
        console.log(loginSuccess);
        $("#msg-login").css("visibility","visible");
    }
}

function checkIdPassword(){
    var userid = $("#dailylog2_userid").val();
    var password = $("#dailylog2_password").val();

    if( userid == null ){
        $("#msg-id").css("visiblity","visible");
        return false;
    }else if(password == null){
        $("#msg-pw").css("visiblity","visible");
        return false;
    }
    return true;
}
