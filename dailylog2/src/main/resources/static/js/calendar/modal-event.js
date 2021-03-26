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

    var obj = new Object();
    var dailylogno = $("#dailylogModal").find("[name=dailylogno]").val();
    var content1 = $("#dailylogModal").find("[name=content1]").val();
    var content2 = $("#dailylogModal").find("[name=content2]").val();
    var overtimestart = $("#dailylogModal").find("[name=overtimestart]").val();
    var overtimeend = $("#dailylogModal").find("[name=overtimeend]").val();
    var overtimecontent = $("#dailylogModal").find("[name=overtimecontent]").val();
    var workingday = $("#dailylogModal").find("[name=workingday]").val();

    obj.dailylogno = dailylogno;
    obj.workerid = 'R2020001';
    obj.workingday = workingday;
    obj.content1 = content1;
    obj.content2 = content2;
    obj.overtimestart = overtimestart;
    obj.overtimeend = overtimeend;
    obj.overtimecontent = overtimecontent;

    $.ajax({
        url: "/api/dailylog",
        dataType:"json",
        method:"PUT",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify( obj ),
        success : function(data) {
            alert('저장 완료되었습니다.');
            document.getElementById('dailylogModal').style.display='none';

            var dailylog = data.dailylog;
            var workingday = dailylog.workingday;

            reload(workingday);
        },
        fail : function(error){
          alert("error..");
      }
    });
}

function deleteDailylog(){
    var dailylogno =  $("#dailylogModal").find("[name=dailylogno]").val();
    callDeleteDailylogApi(dailylogno);
    document.getElementById('dailylogModal').style.display='none';
}
function callDeleteDailylogApi(dailylogno){
    // temp
    var obj = new Object();
    obj.dailylogno = dailylogno;

    $.ajax({
        url: "/api/dailylog",
        dataType:"json",
        method:"DELETE",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify( obj ),
        success : function(data) {
            alert('삭제 완료되었습니다.');
        },
        fail : function(error){
          alert("error..");
      }
    });
}