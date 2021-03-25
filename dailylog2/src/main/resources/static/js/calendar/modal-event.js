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
        $(".write-mode").css('display','none');
    }
}

//Modal에 있는 수정버튼 클릭시
function whenClickModalModifyBtn(){
  changeModalMode('write');
}

//네비게이션의 글쓰기 버튼 클릭시
function whenClickWriteBtn(){
  //1. 날짜 받아오기
  var date = $('#date-picker1').attr('value');

  //2.
  $("#dailylogModal").find("[name=dailylogno]").val('');
  $("#dailylogModal").find("[name=content1]").val('');
  $("#dailylogModal").find("[name=content2]").val('');
  $("#dailylogModal").find("[name=overtimestart]").val('');
  $("#dailylogModal").find("[name=overtimeend]").val('');
  $("#dailylogModal").find("[name=overtimecontent]").val('');

  //3. modal 글쓰기 모드로 변경
  changeModalMode('write');

  //4. modal띄우기
  $('#dailylogModal').css('display','block');
}

function callSaveDailylogApi(){
    console.log("callSaveDailylogApi...");

    var obj = new Object();
    var dailylogno = $("#dailylogModal").find("[name=content1]").val();
    var content1 = $("#dailylogModal").find("[name=content1]").val();
    var content2 = $("#dailylogModal").find("[name=content2]").val();
    var overtimestart = $("#dailylogModal").find("[name=overtimestart]").val();
    var overtimeend = $("#dailylogModal").find("[name=overtimeend]").val();
    var overtimecontent = $("#dailylogModal").find("[name=overtimecontent]").val();

    obj.dailylogno = dailylogno;
    obj.content1 = content1;
    obj.content2 = content2;
    obj.overtimestart = overtimestart;
    obj.overtimeend = overtimeend;
    obj.overtimecontent = overtimecontent;

    $.ajax({
        url: "/api/save/dailylog",
        dataType:"json",
        method:"POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify( obj ),
        success : function() {
            console.log("글이 등록되었습니다.");
            //window.location.href= "/dailylog2/month";
        },
        fail : function(error){
          alert("error..");
      }
    });

}