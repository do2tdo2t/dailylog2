
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

function reload(workingday){

  var openInbox = document.getElementById("myBtn");
  openInbox.click();

  commonCalendar.drawCalendar(new Date(workingday),'calendar');

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

