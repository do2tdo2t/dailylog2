/******************** api **********************************
로그인
JSON.stringify(obj)
*************************************************************/

this.addEventListener('DOMContentLoaded', function(){
    this.init();
});


function init(){
    var loginSuccessYN = getParameterByName( location.search ,'loginSuccessYN');
    if(loginSuccessYN == "N"){
        $("#msg-login").css("display","block");
    }
}

function getParameterByName(paramString, searchName ){
   var name;
   var paramString = paramString.replace('?','');
   var paramArray = paramString.split('&');
   for(var i = 0 ; i < paramArray.length ; i++){
        name = paramArray[i].split("=")[0];
         console.log(paramArray[i]);
        if(name == searchName){
            return paramArray[i].split("=")[1];
        }
    }
    return '';
}

function checkIdPassword(){
    var userid = $("#dailylog2_userid").val();
    var password = $("#dailylog2_password").val();

    if( userid == null ){
        $("#msg-id").css("display","block");
        return false;
    }else if(password == null){
        $("#msg-pw").css("display","block");
        return false;
    }
    return true;
}
