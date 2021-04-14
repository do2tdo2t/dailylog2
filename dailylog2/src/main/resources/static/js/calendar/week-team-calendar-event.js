function WeeklyCalendar(){
    this.mode = "list";
    this.calendarType1 = "team"; //one
    this.monday = '';
    this.sunday = '';

    this.listTemplate = 
'<li class="row" id="date-{{yyyyMMdd}}">'
  +'<div class="col-md-1 w3-rightbar">'
    +'<div><h3 class="yoil-style1">{{yoil}}</h3></div>'
    +'<div>{{mmdd}}</div>'
    +'<a href="javascript:void(0)" class="w3-button" onclick="whenClickAddButton(\'{{yyyyMMdd}}\')"><i class="material-icons">add_circle_outline</i></a>'
  +'</div>'
 + '<table class="col-md-11 w3-table w3-bordered">'
  + '<thead>'
    +'<tr class="w3-row">'
            + '<th class="w3-col l1 w3-center">'
                + '이름'
            + '</th>'
            + '<th class="w3-col l4 w3-center">'
                + '실시사항'
            + '</th>'
            + '<th class="w3-col l3 w3-center">'
                + '기타사항(교육,출장,회의,휴가,특이사항)'
            + '</th>'
            + '<th class="w3-col l3 w3-center">'
                + '특근'
            + '</th>'
            + '<th name="approval" class="w3-col l1 w3-center">'
            + '</th>'
        +'</tr>'
+   '<thead>'
+   '<tbody>'
+   '</tbody>'
+  '</table>'
+'</li>';

 this.contentTemplate =
            '<tr class="w3-row">'
                + '<th class="w3-col l1 w3-center">'
                    + '{{username}}'
                + '</th>'
                + '<th class="w3-col l4">'
                    + '{{content1}}'
                + '</th>'
                + '<th class="w3-col l3">'
                    + '{{content2}}'
                + '</th>'
                + '<th class="w3-col l3 w3-center">'
                    + '{{overtimestart}} ~ {{overtimeend}}'
                    + '<br>'
                    + '{{overtimecontent}}'
                + '</th>'
                + '<th class="w3-col l1 w3-center">'
                + '</th>'
            +'</tr>';

    this.id = 'calendar';

    this.approvalButtonTemplate =
    '<button class="w3-button w3-blue w3-padding-small w3-round">승인</button>';
}

/*calendarType1 = [team,one] */
WeeklyCalendar.prototype.drawCalendar = function(date, id, data){
    if(id == null || id =="" || id == undefined ){
        id = this.id;
    }

    if(typeof(date) ==="string"){
        date = new Date(date);
    }

    if(date == null || date == undefined){
        date = new Date();
    }

    //team일떄와 one일때 분기 필요
    this.render(date, id, data);
    this.callHolidayApi(date);
    $(".date-picker").attr('value',date.format('yyyy-MM-dd'));

}

//date type to id
WeeklyCalendar.prototype.buildId = function(date){
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

WeeklyCalendar.prototype.render = function(curdate,id){

    this.date = curdate;

    //0:일 1:월 2:화 3:수 4:목 5:금 6:토
    var yoil = curdate.getDay() == 0 ? 7 : curdate.getDay() ;
    var date = curdate.getDate();
    var month = curdate.getMonth();
    var year = curdate.getFullYear();
    var diff = ( yoil -1 );

    var monday = new Date(year, month, date - diff  );
    var sunday = new Date(year, month, date - diff + 6 );
    var startyyyymmdd = monday.format('yyyy-MM-dd');
    var endyyyymmdd = sunday.format('yyyy-MM-dd');

    this.monday = monday;
    this.sunday= sunday;

    var yoils = ['월','화','수','목','금','토','일'];
    var dailylog;

    var html ='';
    var mmdd;
    var id;
    var yyyyMMdd;

    var contentTemplate = '';
    document.querySelector('#'+id).innerHTML = '';

   html = '';
   template = this.listTemplate;
   var newtemplate ='';
   //7일 표시
   for(var i = 0, day = monday ; i < 7  ; i++, day = this.nextDay(year,month,date)){
       year = day.getFullYear();
       month = day.getMonth();
       date = day.getDate();

       var mmdd = (month + 1) +'.'+date;

       yyyyMMdd = day.format('yyyy-MM-dd');
       newtemplate = template.replace('{{yoil}}', yoils[i])
                             .replace('{{mmdd}}',mmdd)
                             .replace(/{{yyyyMMdd}}/gi, yyyyMMdd );
       html+=newtemplate;
   }

    document.querySelector('#'+id).innerHTML = html;

    //yyyy-mm setting
    document.getElementById('yyyy').innerHTML = year;
    document.getElementById('mm').innerHTML = month + 1 ;

    this.callWeekTeamDailylogApi(curdate);
}

WeeklyCalendar.prototype.nextDay = function(year,month,date){
    return new Date(year,month,date +1);
}


/******************** api **********************************
일주일 업무일지 가져오기
JSON.stringify(obj)
*************************************************************/
WeeklyCalendar.prototype.callWeekTeamDailylogApi = function(){
    var obj = new Object();
    //세션으로부터 가져오도록 변경 필요

    var startdate = this.monday.format('yyyy-MM-dd');
    var enddate = this.sunday.format('yyyy-MM-dd');

    obj.deptcode = $("#deptcode-select:selected").val();
    obj.startdate = startdate;
    obj.enddate = enddate;

    $.ajax({
        url: "/api/search/dailylog/team/week",
        dataType:"json",
        method:"POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify( obj ),
        success : function(data) {
            //weekCalendar: 전역변수
            console.log(data);
            weekCalendar.renderContent(data);
        },
        fail : function(error){
          alert("error..");
      }
    });
}

WeeklyCalendar.prototype.renderContent = function(data)
{
    var startyyyymmdd = this.monday.format('yyyy-MM-dd');
    var endyyyymmdd = this.sunday.format('yyyy-MM-dd');
    var dailylogList = data.dailylogList;
    var dailylog ;
    var template =  this.contentTemplate;

    var html = '';

    for(var i = 0 ; i < dailylogList.length ; i++){

       dailylog = dailylogList[i];

       html = template.replace('{{content1}}',removeNull(dailylog.content1))
        .replace('{{username}}',removeNull(dailylog.user.username))
        .replace(/{{workingday}}/g,removeNull(dailylog.workingday)) // not null
        .replace('{{content2}}', removeNull(dailylog.content2))
        .replace('{{overtimecontent}}',removeNull(dailylog.overtimecontent))
        .replace('{{overtimestart}}', removeNull(dailylog.overtimestart))
        .replace('{{overtimeend}}', removeNull(dailylog.overtimeend));

       $("#date-"+dailylog.workingday).find('tbody').append(html);
       $("#date-"+dailylog.workingday).find('th[name=approval]').html(this.approvalButtonTemplate);
    }
}

/****/
function removeNull(value){
    if(value == null || value == undefined)
    {
        return '';
    }
    return value;
}

/******************** api **********************************
업무일지 수정 클릭시
*************************************************************/
function whenClickModifyButton(workingday,dailylogno){
    $(".date-picker").attr('value',workingday);
    callOneDailylogApi(dailylogno);
}

/******************** api **********************************
업무일지 삭제 클릭시
*************************************************************/
function whenClickDeleteButton(workingday,dailylogno){
    callDeleteDailylogApi(dailylogno);
}


/******************** api **********************************
업무일지 추가 클릭시
*************************************************************/
function whenClickAddButton(yyyyMMdd){
    //1. 날짜 변경
    $(".date-picker").attr('value',yyyyMMdd);
     //변경
    $("#dailylogModal").find("[name=dailylogno]").val('');
    $("#dailylogModal").find("[name=content1]").val('');
    $("#dailylogModal").find("[name=content2]").val('');
    $("#dailylogModal").find("[name=overtimestart]").val('');
    $("#dailylogModal").find("[name=overtimeend]").val('');
    $("#dailylogModal").find("[name=overtimecontent]").val('');
    $("#dailylogModal").find("[name=userid]").val($("dailylog2_userid").val());

    changeModalMode('write');
    $("#dailylogModal").css('display','block');
}

/******************** api **********************************
공휴일 api 호출
JSON.stringify(obj)
*************************************************************/
WeeklyCalendar.prototype.callHolidayApi = function(curdate){
    var obj = new Object();

    //0:일 1:월 2:화 3:수 4:목 5:금 6:토
    var yoil = curdate.getDay() == 0 ? 7 : curdate.getDay() ;
    var date = curdate.getDate();
    var month = curdate.getMonth();
    var year = curdate.getFullYear();
    var diff = ( yoil -1 );

    var monday = new Date(year, month, date - diff  );
    var sunday = new Date(year, month, date - diff + 6 );

    obj.startday = monday.format("yyyy-MM-dd") ;
    obj.endday = sunday.format("yyyy-MM-dd");

    $.ajax({
        url: "/api/search/holiday/month",
        dataType:"json",
        method:"POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify( obj ),
        success : function(jsonData) {
            weekCalendar.markHoliday(jsonData.holidayList);
        },
        fail : function(error){
          alert("error..");
      }
    });
}


/************************** api **********************************
공휴일 달력에 마킹하기
JSON.stringify(obj)
*****************************************************************/
WeeklyCalendar.prototype.markHoliday = function(holidays){
    var title = '';
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
               element.firstChild.firstChild.classList.add("w3-text-red");
            }
            day.setDate(day.getDate()+1);
       }
    }
}

/************************** function *****************************
날짜 변경 시
Date
******************************************************************/
function whenChangeDate(date){
    if(weekCalendar == null ){
        weekCalendar = new WeeklyCalendar();
    }

    weekCalendar.drawCalendar(date,'calendar');
}
