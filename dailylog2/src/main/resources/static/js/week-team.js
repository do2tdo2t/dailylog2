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

  //depetcode-select
  var deptcode = $("#dailylog2_deptcode").val();
  $("#deptcode-select").val(deptcode);

}

function reload(workingday){
  var openInbox = document.getElementById("myBtn");

  weekCalendar.drawCalendar(new Date(workingday),'calendar');

  /* init #date-picker */
  var date = new Date(workingday).format('yyyy-MM-dd');
  $('.date-picker').attr('value',date);

}

function getWeekCalendar(){
  if(weekCalendar === null || weekCalendar === undefined){
    weekCalendar = new WeeklyCalendar();
    var calendarType1 = $('#calendarType1').attr('value');
    weekCalendar.calendarType1 = calendarType1;
  }
  return weekCalendar;
}

/******************** function ******************************
다음주 이동하기
*************************************************************/
function nextWeek(){
  var calendarType2 = $('#calendarType2').attr('value'); // month, week
  var newdate;

  newdate = getNextWeek();
  getWeekCalendar().drawCalendar(new Date(newdate),'calendar');

  $('.date-picker').attr('value',newdate.format('yyyy-MM-dd'));
}

/******************** function ******************************
전주 이동하기
*************************************************************/
function beforeWeek(){
  var calendarType2 = $('#calendarType2').attr('value');
  var newdate;

  newdate = getBeforeWeek();

  getWeekCalendar().drawCalendar(new Date(newdate),'calendar');

  $('.date-picker').attr('value',newdate.format('yyyy-MM-dd'));
}

/******************** function ******************************
다음주 구하기
*************************************************************/
function getNextMonth(){
    var curdate = $(".date-picker").attr('value');
    var yyyy = new Date(curdate).getFullYear();
    var month = new Date(curdate).getMonth() + 1;

    var nextyyyy = Number(month) == 12 ? Number(yyyy) + 1  : yyyy ;
    var nextmonth = Number(month) == 12 ? 1 : month ;
    var newdate = new Date( nextyyyy ,nextmonth  , 1 );//다음달의 1일

    return newdate;
}

/******************** function ******************************
전주 구하기
*************************************************************/
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

/******************** function ******************************
다음주 이동하기
*************************************************************/
function getNextWeek(){
    var curdate = $(".date-picker").attr('value');
    var date = new Date(curdate);
    var dd = date.getDate();
    var mm = date.getMonth();
    var yyyy = date.getFullYear();

    var newdate = new Date(yyyy,mm,dd + 7);

    return newdate;
}

/******************** function ******************************
전주 구하기
*************************************************************/
function getBeforeWeek(){
    var curdate = $(".date-picker").attr('value');
    var date = new Date(curdate);
    var dd = date.getDate();
    var mm = date.getMonth();
    var yyyy = date.getFullYear();

    var newdate = new Date(yyyy,mm,dd - 7);
    return newdate;
}


/******************** api **********************************
deptcode Select 박스 변경 이벤트
JSON.stringify(obj)
*************************************************************/
function whenChageDeptcode(){
    var workingday = $('.date-picker').val();
    reload(workingday);
}


