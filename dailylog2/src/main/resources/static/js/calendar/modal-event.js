/*
* 업무일지 쓰기 modal 관련 이벤트
*/

function changeModalMode(mode){
    if(mode == 'write'){
        $(".write-input").attr("readonly",false);
        $(".write-mode").css('display','block');
        $(".view-mode").css('display','none');
    }else if(mode == "view"){
        $(".write-input").attr("readonly",true);
        $(".view-mode").css('display','block');
        $(".wirt-mode").css('display','none');
    }
}

//Modal에 있는 수정버튼 클릭시
function whenClickModalModifyBtn(){
  changeModalMode('write');
}
