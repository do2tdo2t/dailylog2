
this.addEventListener('DOMContentLoaded', function(){
    this.init();
});

var commonCalendar;

function init(){
  var openInbox = document.getElementById("myBtn");
  openInbox.click();

  commonCalendar = new CommonCalendar();
  commonCalendar.calendarType1 = "one";
  commonCalendar.drawCalendar(new Date(),'calendar');

  /* init #date-picker */
  var date = new Date().format('yyyy-MM-dd');
  $('.date-picker').attr('value',date);

}

function getMonthCalendar(){
  if(commonCalendar === null || commonCalendar === undefined){
      commonCalendar = new CommonCalendar();
      var calendarType1 = $('#calendarType1').attr('value');
      commonCalendar.calendarType1 = calendarType1;
  }
  return commonCalendar;
}



function changeMonthCalendar(){
  var calendarType2 = 'month';
  $('#calendarType2').attr('value', calendarType2 );

  var date = $('.date-picker').attr('value');

  getMonthCalendar().drawCalendar(new Date(date),'calendar');

  //mode button 숨김
  $('.mode').css('display','none');
}


/******************** api **********************************
다음달로 이동하기
JSON.stringify(obj)
*************************************************************/
function nextMonth(){
  var calendarType2 = $('#calendarType2').attr('value'); // month, week
  var newdate;

  if(calendarType2 != null && calendarType2 != undefined && calendarType2 != ""){
      if(calendarType2 == 'month'){

         newdate = getNextMonth();
         getMonthCalendar().drawCalendar(new Date(newdate),'calendar');

      }else if(calendarType2 == 'week'){
        newdate = getNextWeek();
        getWeekCalendar().drawCalendar(new Date(newdate),'calendar');
      }
      $('.date-picker').attr('value',newdate.format('yyyy-MM-dd'));
  }
}

//다음달 구하기
function getNextMonth(){
    var curdate = $(".date-picker").attr('value');
    //var yyyy = document.getElementById('yyyy').innerHTML;
    //var mm = document.getElementById('mm').innerHTML;
    var yyyy = new Date(curdate).getFullYear();
    var month = new Date(curdate).getMonth() + 1;

    var nextyyyy = Number(month) == 12 ? Number(yyyy) + 1  : yyyy ;
    var nextmonth = Number(month) == 12 ? 1 : month ;
    var newdate = new Date( nextyyyy ,nextmonth  , 1 );//다음달의 1일

    return newdate;
}


/******************** api **********************************
이전달로 이동하기
JSON.stringify(obj)
*************************************************************/
function beforeMonth(){
  var calendarType2 = $('#calendarType2').attr('value');
  var newdate;
  if(calendarType2 != null && calendarType2 != undefined && calendarType2 != ""){
      if(calendarType2 == 'month'){

         newdate = getBeforeMonth();
         getMonthCalendar().drawCalendar(new Date(newdate),'calendar');

      }else if(calendarType2 == 'week'){
        newdate = getBeforeWeek();

        getWeekCalendar().drawCalendar(new Date(newdate),'calendar');
      }
      $('.date-picker').attr('value',newdate.format('yyyy-MM-dd'));
  }
}



// 전달 구하기
function getBeforeMonth(){
    var curdate = $(".date-picker").attr('value');
    //var yyyy = document.getElementById('yyyy').innerHTML;
    //var mm = document.getElementById('mm').innerHTML;
    var yyyy = new Date(curdate).getFullYear();
    var month = new Date(curdate).getMonth() + 1;

    var beforeyyyy = Number(month-2) == 0 ? Number(yyyy) - 1 : yyyy ;
    var beforemonth = Number(month-2) == 0 ? 11 : (Number(month)-1) -1 ;

    var newdate = new Date( beforeyyyy ,beforemonth  , 1 );//현재 현재달의 1일 -1 1

    return newdate;
}

//네비게이션의 글쓰기 버튼 클릭시
function whenClickWriteBtn(){
  //1. 날짜 받아오기
  var date = $('#date-picker1').attr('value');

  //2. ajax 실행 detail 정보 가져오기

  //3. modal 글쓰기 모드로 변경
  changeModalMode('write');

  //4. modal띄우기
  $('#dailylogModal').css('display','block');
}

/***********************************************************
네비게이션 효과
JSON.stringify(obj)
*************************************************************/
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

//왼편 네비게이션바 부분 소메뉴펼치기
function showMenuDetail(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-red";
  } else {
    x.className = x.className.replace(" w3-show", "");
    x.previousElementSibling.className = x.previousElementSibling.className.replace(" w3-red", "");
  }
}