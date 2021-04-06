
this.addEventListener('DOMContentLoaded', function(){
    this.init();
});

var weekCalendar;

function init(){
  var openInbox = document.getElementById("myBtn");
  openInbox.click();

  //callWeekDailylogApi(new Date());
  weekCalendar = new WeeklyCalendar();
  weekCalendar.calendarType1 = "one";
  weekCalendar.drawCalendar(new Date(),'calendar');

  /* init #date-picker */
  var date = new Date().format('yyyy-MM-dd');
  $('.date-picker').attr('value',date);

}

function reload(workingday){
  var openInbox = document.getElementById("myBtn");
  openInbox.click();

  //callWeekDailylogApi(new Date());
  weekCalendar.drawCalendar(new Date(workingday),'calendar');

  /* init #date-picker */
  var date = new Date(workingday).format('yyyy-MM-dd');
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

function getWeekCalendar(){
  if(weekCalendar === null || weekCalendar === undefined){
    weekCalendar = new WeeklyCalendar();
    var calendarType1 = $('#calendarType1').attr('value');
    weekCalendar.calendarType1 = calendarType1;
  }
  return weekCalendar;
}

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

function changeMonthCalendar(){
  var calendarType2 = 'month';
  $('#calendarType2').attr('value', calendarType2 );

  var date = $('.date-picker').attr('value');

  getMonthCalendar().drawCalendar(new Date(date),'calendar');

  //mode button 숨김
  $('.mode').css('display','none');
}

//주 달력으로 변경
function changeWeekCalendar(){

  var date = $('.date-picker').attr('value');

  $('#calendarType2').attr('value','week');

  getWeekCalendar().drawCalendar(new Date(date),'calendar');

  //mode 버튼 활성화
  $('.mode').css('display','inline-block');
}

function changeCalendar(date){
  var calendarType2 = $('#calendarType2').attr('value'); //month, week
  if(date != null && typeof(date) == "string"){
    date = new Date(date);
  }

  if(calendarType2 != null && calendarType2 != undefined && calendarType2 != ""){
    if(calendarType2 == 'month'){
        getMonthCalendar().drawCalendar(new Date(date),'calendar');

      }else if(calendarType2 == 'week'){

        getWeekCalendar().drawCalendar(new Date(date),'calendar');
      }
  }
}

// 다음달
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

// 전달
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

//다음주 구하기
function getNextWeek(){
    var curdate = $(".date-picker").attr('value');
    var date = new Date(curdate);
    var dd = date.getDate();
    var mm = date.getMonth();
    var yyyy = date.getFullYear();

    var newdate = new Date(yyyy,mm,dd + 7);

    return newdate;
}

//전주 구하기
function getBeforeWeek(){
    var curdate = $(".date-picker").attr('value');
    var date = new Date(curdate);
    var dd = date.getDate();
    var mm = date.getMonth();
    var yyyy = date.getFullYear();

    var newdate = new Date(yyyy,mm,dd - 7);
    return newdate;
}

//Weekly 캘린더의 리스트형, 카드형 템플릿의 수정아이콘 클릭 이벤트
function whenClickModifyBtn(yyyyMMdd){

  var date = new Date(yyyyMMdd);
  if(date == null || date == undefined || date == ""){
    date = new Date();
  }

  //1. 날짜 받아오기
  $(".date-picker").attr('value',date.format('yyyy-MM-dd'));

  //2. ajax 실행 detail 정보 가져오기

  //3. modal 글쓰기 모드로 변경
  changeModalMode('write');

  //4. modal띄우기
  $('#dailylogModal').css('display','block');
}


//날짜를 클릭했을 때 -> 수정모드로 모달 띄움
function whenClickDay(datestr){
  var date = new Date(datestr);

  //1. 날짜 받아오기 (클릭한 날짜 기준)
  $(".date-picker").attr('value',date.format('yyyy-MM-dd'));

  //2. ajax 실행 detail

  //3. modal 보기모드로 변경
  changeModalMode('view');

  //4.글쓰기 모달 팝업
  //$('#dailylogModal').css('display','block');
}

//주간 캘린더 리스트모드변경
function changeWeekCalendarListMode(){
    var curdate = $(".date-picker").attr('value');
    getWeekCalendar().mode = "list";
    getWeekCalendar().render(new Date(curdate),'calendar');
}

//주간 캘린더 카드모드로 변경
function changeWeekCalendarCardMode(){
    var curdate = $(".date-picker").attr('value');

    getWeekCalendar().mode = "card";
    getWeekCalendar().render(new Date(curdate),'calendar');

}

