this.addEventListener('DOMContentLoaded', function(){
    this.init();
});

var weekCalendar;

function init(){
  var openInbox = document.getElementById("myBtn");
  openInbox.click();

  //callWeekDailylogApi(new Date());
  weekCalendar = new WeeklyCalendar();
  weekCalendar.calendarType1 = "team";
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

// 다음달
function nextMonth(){
  var calendarType2 = $('#calendarType2').attr('value'); // month, week
  var newdate;

  newdate = getNextWeek();
  getWeekCalendar().drawCalendar(new Date(newdate),'calendar');

  $('.date-picker').attr('value',newdate.format('yyyy-MM-dd'));
}

// 전달
function beforeMonth(){
  var calendarType2 = $('#calendarType2').attr('value');
  var newdate;

  newdate = getBeforeWeek();

  getWeekCalendar().drawCalendar(new Date(newdate),'calendar');

  $('.date-picker').attr('value',newdate.format('yyyy-MM-dd'));
}

//다음달 구하기
function getNextMonth(){
    var curdate = $(".date-picker").attr('value');
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


