/** prototype으로 구현 */
function CommonCalendar(){
    this.calendarMain ="<div class='calendar-main' id='month-calendar'>";
    this.rowHeadHtml = "<div class='row'>";

    this.dailylogHtml = "<button class='btn btn-secondary dailylog w3-hover-black' id='{{dailylogno}}' onclick='whenClickDailylog(event);' type='button'>{{username}}</button> ";

    //첫번째 주에는 요일을 표기
    this.firstColHeadHtml =  "<div class='col day {{validation}}'  id='date-{{yyyyMMdd}}'>"
                                +"<div id='yoil'>{{hangulYoil}}</div>"
                                +"<div class='dd'>{{day}}</div></div>";

    this.colHeadHtml = "<div class='col day {{validation}}' id='date-{{yyyyMMdd}}'>"
                        +"<div class='dd'>{{day}}</div></div>";

    this.divEndHtml = "</div>";

    this.content1Template = '<tr class="w3-row">'
                             + '<th class="w3-col l2" name="name">'
                             +  '{{name}}'
                             + '</th>'
                             + '<th class="w3-col l10" name="content1">'
                             + '{{content1}}'
                             + '</th>'
                             +'</tr>';
    this.content2Template = '<tr class="w3-row">'
                                 + '<th class="w3-col l2" name="name">'
                                 +  '{{name}}'
                                 + '</th>'
                                 + '<th class="w3-col l10" name="content2">'
                                 + '{{content2}}'
                                 + '</th>'
                                 +'</tr>';
     this.overtimeTemplate = '<tr class="w3-row">'
                                 + '<th class="w3-col l2" name="name">'
                                 +  '{{name}}'
                                 + '</th>'
                                 + '<th class="w3-col l3">'
                                 + '{{overstarttime}} ~ {{overendtime}}'
                                 + '</th>'
                                 + '<th class="w3-col l10">'
                                 +  '{{overtimecontent}}'
                                 + '</th>'
                                 +'</tr>';

    this.currentdate ;
    this.currentyyyy ;
    this.currentmm ;
    this.currentmonth;
    this.currentdd ;
    this.currentyoil ;
    this.id = 'calendar';
    this.calendarType1 = "one";

    this.reg1 = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g //yyyy-MM-DD ex) 2020-01-01
    this.reg2 = /^\d{4}-[1]?[0-9]{1}-[1-3]?[0-9]{1}$/g //yyyy-mm-dd ex) 2020-1-1
    this.reg3 = /^\d{4}[0-1]{1}[0-9]{1}[0-3]{1}[0-9]{1}$/g //yyyyMMDD ex) 20200101
}

CommonCalendar.prototype.init = function(date){
    this.setCurrentDate(date);
}

CommonCalendar.prototype.setCurrentDate = function(date){
    if(date === undefined || date === '' || date === null){
        console.log('Null error !');
        return;
    }
    
    if(typeof date == 'string'){
        date = date.replace(/-/g,'');
        date = new Date(date);
    }

    this.currentdate = date;
    this.currentyyyy = date.getFullYear();
    this.currentmm = date.getMonth();
    this.currentmonth = date.getMonth() + 1;
    this.currentdd = date.getDate();
    this.currentyoil = date.getDay();

}

//다음달
CommonCalendar.prototype.nextMonth = function(){
    var yyyy = currentyyyy;
    var mm = currentmm;

    var nextyyyy = Number(mm) == 12 ? Number(yyyy) + 1  : yyyy ;
    var nextmm = Number(mm) == 12 ? 1 : mm ;
    var newdate = new Date( nextyyyy ,nextmm  , 1 );//다음달의 1일
    
    this.setCurrentDate(newdate);
}

//이전달
CommonCalendar.prototype.beforeMonth = function(){
    var yyyy = currentyyyy;
    var mm = currentmm;

    var beforeyyyy = Number(mm-2) == 0 ? Number(yyyy) - 1 : yyyy ;
    var beforemm = Number(mm-2) == 0 ? 11 : (Number(mm)-1) -1 ;
    var newdate = new Date( beforeyyyy ,beforemm  , 1 );//현재 현재달의 1일 -1 1

    this.setCurrentDate(newdate);
}

//date type to id
CommonCalendar.prototype.buildId = function(date){
    if(date === undefined || date === '' || date === null){
        console.log('Null error !');
        return;
    }
    if(typeof date === 'string'){
        date = new Date(date);
    }

    var id = date.format('yyyy-mm-dd');
    return id;
}

CommonCalendar.prototype.render = function(date, id){
    if(date == null || date == ''){
        date = new Date();
        
    }

    this.setCurrentDate(date);
    var yyyy = date.getFullYear();
    var mm = date.getMonth(); // month : 실제 월보다 1이 적음. 
    
    //0이 일요일
    var firstDay = new Date(yyyy,mm ,1);
    var firstDate = firstDay.getDate();
    var lastDay = new Date(yyyy,mm + 1,0);
    var lastDate = lastDay.getDate();
    var lastYoil = lastDay.getDay();
    var firstYoil = firstDay.getDay(); //현재 월이 1일의 요일
    var lastDateOfBeforeMonth = new Date(firstDay -1 ).getDate();
    var hangulYoil = ['일','월','화','수','목','금','토'];
    var calendarHtml = "";

    var startDay = ( firstYoil == 0 ? 1 : lastDateOfBeforeMonth - firstYoil + 1 ) ;

    //*calendar reder*//
    //첫주
    var day = startDay;
    var yyyyMMdd ='';
    var validation = day == 1 ? "valid" : "invalid"; //해당 월의 날짜:valid, 아니면 invlid
    //0:일 1:월 2:화 3:수 4:목 5:금 6:토
    // 1번째 행 (1번째 주)
    calendarHtml += this.calendarMain + this.rowHeadHtml;
    for(var i = 1 ; i <= 7  ; i++, day ++){
        //순서 중요
        if(day > lastDateOfBeforeMonth){
            day = 1;
            validation = "valid";
        }
        yyyyMMdd = new Date(yyyy,mm,day).format('yyyy-MM-dd');
        calendarHtml += this.handleCol(this.firstColHeadHtml.replace('{{hangulYoil}}',hangulYoil[i-1]), yyyyMMdd , day , validation);
    }
    calendarHtml += this.divEndHtml;
    
    //둘째주 ~ 마지막주  -1
    validation = "valid";
    for(var i = 1  ; day <= lastDate  ; day++, i++ ){

        if(i % 7 == 1){
            calendarHtml += this.rowHeadHtml;
        }
        yyyyMMdd = new Date(yyyy,mm,day).format('yyyy-MM-dd');
        calendarHtml += this.handleCol(this.colHeadHtml, yyyyMMdd, day, validation);
        if (i % 7 == 0){
            calendarHtml += this.divEndHtml;
        }
    }

    //마지막주 
    //0:일 1:월 2:화 3:수 4:목 5:금 6:토
    validation = "invalid";
    mm = mm + 1;
    for(var i = lastYoil + 1 ,day = 1;  i < 7 ; day++, i++ ){

        yyyyMMdd = new Date(yyyy,mm,day).format('yyyy-MM-dd');
                                        //컬럼HTML, 일자, 일, 표기활성화 여부
        calendarHtml += this.handleCol(this.colHeadHtml, yyyyMMdd , day ,validation);
    }
    calendarHtml += this.divEndHtml + this.divEndHtml;

    //calendarBody에 붙이기
    var calendarBody = document.getElementById(id);
    calendarBody.innerHTML = "";
    calendarBody.insertAdjacentHTML('beforeend',calendarHtml);

    //yyyy-mm setting
    document.getElementById('yyyy').innerHTML = yyyy;
    document.getElementById('mm').innerHTML = mm;
}

CommonCalendar.prototype.handleCol = function( colHeadHtml ,yyyyMMdd, day, validation){
    var newColHeadHtml = colHeadHtml.replace(/{{yyyyMMdd}}/gi, yyyyMMdd )
                    .replace(/{{day}}/gi, day)
                    .replace(/{{validation}}/gi, validation);

    return newColHeadHtml;
}

// calendarType1 = ['team','one']
CommonCalendar.prototype.drawCalendar = function(date,id ){
    if(id == null || id == "" || id == undefined){
        id = this.id;
    }

    if(typeof(date) ==="string"){
        date = new Date(date);
    }

    if(date == null || date == undefined){
        date = new Date();
    }

     //1. render
     this.render(date,id);
     this.callMonthTeamDailylogApi();
     this.callHolidayApi();

   $(".date-picker").attr('value',date.format('yyyy-MM-dd'));
}

//다음달의 1일
CommonCalendar.prototype.getNextMonth = function(){
    var yyyy = document.getElementById('yyyy').innerHTML;
    var mm = document.getElementById('mm').innerHTML;

    var nextyyyy = Number(mm) == 12 ? Number(yyyy) + 1  : yyyy ;
    var nextmm = Number(mm) == 12 ? 1 : mm ;
    var newdate = new Date( nextyyyy ,nextmm  , 1 );//다음달의 1일

    return newdate;
}

//현재 달의 1일
CommonCalendar.prototype.getBeforeMonth = function(){
    var yyyy = document.getElementById('yyyy').innerHTML;
    var mm = document.getElementById('mm').innerHTML;
 
    var beforeyyyy = Number(mm-2) == 0 ? Number(yyyy) - 1 : yyyy ;
    var beforemm = Number(mm-2) == 0 ? 11 : (Number(mm)-1) -1 ;
 
    var newdate = new Date( beforeyyyy ,beforemm  , 1 );//현재 현재달의 1일 -1 1

    return newdate;
}

/** 개인 업무일지 캘린더 그리기 */
function drawMonthCalendar(date){
    if(commonCalendar === undefined || commonCalendar === null){

        commonCalendar = new CommonCalendar();
    }
    //1. render
    commonCalendar.render(date,'calendar');
    commonCalendar.callTeamDailylogApi();
    calendar.callHoliydayApi();
}

/** 팀 업무일지 캘린더 그리기 */
function drawTeamMonthCalendar(date){
    calendar = new CommonCalendar();
    //1. render
    calendar.render(date,'calendar');
    calendar.markTodate(date.getDate());
    calendar.markTeamDailylog();
    calendar.markHoliday();
}


/******************** api **********************************
한달 공휴일 가져오기
JSON.stringify(obj)
*************************************************************/
CommonCalendar.prototype.callHolidayApi = function(){
    var obj = new Object();

    var firstday = new Date(this.currentyyyy,this.currentmm, 1 );
    var startday = firstday.setDate(firstday.getDate() - 7);
    var lastday = new Date(this.currentyyyy,this.currentmm + 1, 0 );
    var endday = lastday.setDate(lastday.getDate() + 7);

    obj.startday = new Date(startday).format("yyyy-MM-dd") ;
    obj.endday = new Date(endday).format("yyyy-MM-dd");

    $.ajax({
        url: "/api/search/holiday/month",
        dataType:"json",
        method:"POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify( obj ),
        success : function(jsonData) {
            commonCalendar.markHoliday(jsonData.holidayList);
        },
        fail : function(error){
          alert("error..");
      }
    });
}

/* 공휴일 달력에 마킹하기 */
CommonCalendar.prototype.markHoliday = function(holidays){
    var title = '';
    var holidayHtml =  "<button class='btn btn-danger holiday' type='button'>{{title}}</button> ";
    var element;
    var cday = 24 * 60 * 60 * 1000;
    var diff = 0;
    var day;
    var startday ;
    var endday ;

    for(var i = 0 ; i < holidays.length ; i++){
       startday = new Date(holidays[i].startday);
       endday = new Date(holidays[i].endday);
       diff = ( endday - startday ) / cday;

       for (var j= 0 , day = startday ,  title = holidays[i].title ; j <= diff ; j++ ){
            element = document.querySelector("#date-"+day.format('yyyy-MM-dd'));
            if(element != null && element != undefined){
               element.insertAdjacentHTML('beforeend',holidayHtml.replace("{{title}}", title));
            }
            day.setDate(day.getDate()+1);
       }
    }
}

/*************************************************
 dailylog 클릭 시
    1. datepicker update
    2. ajax 데이터 가져오기
    3. open side bar - 상세보기바
**************************************************/

function whenClickTeamDailylog(workingday,deptcode){

    var date = new Date(workingday).format('yyyy-MM-dd')
    changeInputDatePicker(date);
    callTeamDailylogDetailApi(date,deptcode);
}

/******************** api **********************************
한달 업무일지 가져오기(팀)
JSON.stringify(obj)
*************************************************************/
CommonCalendar.prototype.callMonthTeamDailylogApi = function(){
    var obj = new Object();
    //세션으로부터 가져오도록 변경 필요
    obj.deptcode = "00001";

    var firstday = new Date(this.currentyyyy,this.currentmm, 1 );
    var lastday = new Date(this.currentyyyy,this.currentmm + 1, 0 );

    obj.startdate = firstday.format("yyyy-MM-dd") ;
    obj.enddate = lastday.format("yyyy-MM-dd") ;

    $.ajax({
        url: "/api/search/dailylog/team/month",
        dataType:"json",
        method:"POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify( obj ),
        success : function(data) {
            console.log(data);
            markMonthTeamDailylog(data);
        },
        fail : function(error){
          alert("error..");
      }
    });
}

/************** 업무일지 달력에 마킹 *********************/
function markMonthTeamDailylog(data){
     var html =
        "<button class='btn btn-secondary dailylog w3-hover-black' id='{{dailylogno}}' onclick='whenClickTeamDailylog(\"{{workingday}}\",\"{{deptcode}}\");' type='button'>{{username}}</button> ";
    var teamDailylogList = data.teamDailylogList;
    var dailylog;
    var username;
    var workingday;
    var dailylogno;
    var element;
    var deptcode;
    for(var i = 0 ; i < teamDailylogList.length ; i++){
        dailylog = teamDailylogList[i];
        workingday = dailylog.workingday;
        username = dailylog.username;
        dailylogno = dailylog.dailylogno;
        deptcode = dailylog.deptcode;
        element = document.querySelector('#date-'+workingday);
        html = html.replace('{{username}}',username)
                    .replace('{{workingday}}',workingday)
                    .replace('{{deptcode}}',deptcode);
        if(element != null && element != undefined){
                element.insertAdjacentHTML('beforeend',html);
        }
    }
}

/******************** api **********************************
업무일지 상세보기(팀)
JSON.stringify(obj)
*************************************************************/
function callTeamDailylogDetailApi(workingday, deptcode){

    var obj = new Object();
    obj.workingday = workingday;
    obj.deptcode = deptcode;

    $.ajax({
        url: "/api/search/dailylog/team/detail",
        dataType:"json",
        method:"POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify( obj ),
        success : function(data) {
            setTeamDailylog(data.dailylogList);
        },
        fail : function(error){
          alert("error..");
      }
    });
}


function setTeamDailylog(dailylogList){
    var content1Template = commonCalendar.content1Template;
    var content2Template = commonCalendar.content2Template;
    var overtimeTemplate = commonCalendar.overtimeTemplate;

    var content1Html = '';
    var content2Html = '';
    var overtimeHtml = '';

    var dailylog;

    $('#content1-table').find('tbody').html('');
    $('#content2-table').find('tbody').html('');
    $('#overtime-table').find('tbody').html('');

    for(var i = 0 ; i < dailylogList.length ; i++){
        dailylog = dailylogList[i];
        if(dailylog.content1 != null){
            content1Html += content1Template.replace("{{content1}}", removeNull(dailylog.content1))
                                               .replace("{{name}}", removeNull(dailylog.user.username));
        }

        if(dailylog.content2 != null){
            content2Html += content2Template.replace("{{content2}}", removeNull(dailylog.content2))
                                                     .replace("{{name}}", removeNull(dailylog.user.username));
        }

        if(dailylog.overstarttime != null || dailylog.overendtime != null || dailylog.overtimecontent != null ){
        overtimeHtml = overtimeTemplate.replace("{{overstarttime}}", removeNull(dailylog.overstarttime))
                                       .replace("{{overendtime}}", removeNull(dailylog.overendtime))
                                       .replace("{{overtimecontent}}", removeNull(dailylog.overtimecontent))
                                       .replace("{{name}}", removeNull(dailylog.user.username));
        }
    }   //변경
    $('#content1-table').find('tbody').append(content1Html);
    $('#content2-table').find('tbody').append(content2Html);
    $('#overtime-table').find('tbody').append(overtimeHtml);

    changeModalMode('view');
    $("#dailylogModal").css('display','block');
}

function removeNull(value){
    if(value == null || value == undefined)
    {
        return '';
    }
    return value;
}