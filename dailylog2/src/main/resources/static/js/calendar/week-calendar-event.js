function WeeklyCalendar(){

    this.mode = "list";
    this.calendarType1 = "one"; //one
    this.monday = '';
    this.sunday = '';

    this.listTemplate = 
'<li class="row" id="date-{{yyyyMMdd}}">'
  +'<div class="col-md-1 w3-rightbar">'
    +'<div><h3 class="yoil-style1">{{yoil}}</h3></div>'
    +'<div>{{mmdd}}</div>'
    +'<a href="javascript:void(0)" class="w3-button" onclick="whenClickAddButton(\'{{yyyyMMdd}}\')"><i class="material-icons">add_circle_outline</i></a>'
  +'</div>'
+'</li>';

/* 내용*/
 this.listContentTemplate =
 '<div class="col-md-4 col-left-border">'
     +'<div class="label-style1"> 실시사항 </div>'
     +'<hr>'
     +'<div>'
       +'<pre class="content1-style1 pre-style1" name="content1">{{content1}}</pre>'
     +'</div>'
   +'</div>'
   +'<div class="col-md-4 col-left-border">'
     +'<div class="label-style1"> 기타사항(교육,출장,회의,휴가,특이사항) </div>'
     +'<hr>'
     +'<div><pre class="content1-style1 pre-style1" name="content2">{{content2}}</pre></div>'
   +'</div>'
   +'<div class="col-md-2 col-left-border">'
     +'<div class="label-style1"> 특근 </div>'
     +'<hr>'
     +'<div class="content1-style1">'
         +'<div><span name="overtimestart">{{overtimestart}}</span> - <span name="overtimeend">{{overtimeend}}</span></span></div>'
         +'<div><pre name="overtimecontent">{{overtimecontent}}</pre></div>'
     +'</div>'
   +'</div>'
   +'<div class="col-md-1">'
      +'<a href="javascript:void(0)" class="w3-button" onclick="whenClickModifyButton(\'{{workingday}}\',{{dailylogno}})"><i class="material-icons">edit</i></a>'
      +'<a href="javascript:void(0)" class="w3-button" onclick="whenClickDeleteButton(\'{{workingday}}\',{{dailylogno}})"><i class="material-icons">delete</i></a>'
   +'<div>';

this.cardTemplate = 
              "<div class='col-md-4 card-style1'>"
                +"<div class='w3-margin-top'>"
                  +"<span>{{yoil}}</span><span>{{mmdd}}</span><span class='w3-right'><button class='btn-style1' onclick='whenClickModifyBtn(\"{{yyyyMMdd}}\")'><i class='fa fa-pencil'></i></button></span>"
                +"</div>"
                +"<hr class='hr-style1'>"
                +"<div class='label-style2'>"
                  +"실시사항"
                +"</div>"
                +"<hr class='hr-style1'>"
                +"<div><pre class='content2-style2 pre-style1'>{{content1}}</pre></div>"
                +"<hr class='hr-style1'>"
                +"<div class='label-style2'>"
                 +"기타사항(교육,출장,회의,휴가,특이사항)"
                +"</div>"
                +"<hr class='hr-style1'>"
                +"<div> <pre class='content2-style2 pre-style1'>{{content2}}</pre></div>"
                +"<hr class='hr-style1'>"
                +"<div class='label-style2'>"
                 +"특근"
                +"</div>"
                +"<hr class='hr-style1'>"
                +"<div class='content2-style2  w3-margin-bottom'>"
                  +"<div><span>시간</span><span>12:00 - 14:00</span></div>"
                  +"<div><span>업무</span><span>물품검수 개발</span></div>"
                +"</div>"
               +"</div>";
    
    this.teamContent = 
    "<div class='row'>"
    + "<span class='col-3 label-style2'>{{name}}</span>"
    + "<span>"
    +  "<pre class='content1-style1 pre-style1'>{{content}}</pre>"
    + "</span>"
    +"</div>";

    this.id = 'calendar';
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
    if(this.mode == "card"){
        //카드형
        contentTemplate = this.cardTemplate;
        for(var i = 0, day = monday ; i < 7  ; i++, day = this.nextDay(year,month,date)){
            year = day.getFullYear();
            month = day.getMonth();
            date = day.getDate();
            if(i%3 == 0){
                html+="<div class='row'>";
            }

            mmdd = (month + 1) +'.'+date;
            yyyyMMdd = day.format('yyyy-MM-dd');
            newContentTemplate = contentTemplate.replace('{{yoil}}', yoils[i])
                                    .replace('{{mmdd}}',mmdd)
                                    .replace(/{{yyyyMMdd}}/gi, yyyyMMdd );
            
            html+=newContentTemplate;

            if(i%3 == 2){
                html+="</div>";
            }
        }
    }else if(this.mode == "list"){
        html = '';
        //리스트형 
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
    }
    document.querySelector('#'+id).innerHTML = html;

    //yyyy-mm setting
    document.getElementById('yyyy').innerHTML = year;
    document.getElementById('mm').innerHTML = month + 1 ;

    this.callWeekDailylogApi(curdate);
}

WeeklyCalendar.prototype.nextDay = function(year,month,date){
    return new Date(year,month,date +1);
}


/******************** api **********************************
일주일 업무일지 가져오기
JSON.stringify(obj)
*************************************************************/
WeeklyCalendar.prototype.callWeekDailylogApi = function(curdate){
    var obj = new Object();
    //세션으로부터 가져오도록 변경 필요

    /*
    var yoil = curdate.getDay() == 0 ? 7 : curdate.getDay() ;
    var date = curdate.getDate();
    var month = curdate.getMonth();
    var year = curdate.getFullYear();
    var diff = ( yoil -1 );

    var monday = new Date(year, month, date - diff  );
    var sunday = new Date(year, month, date - diff + 6 ); */

    var startdate = this.monday.format('yyyy-MM-dd');
    var enddate = this.sunday.format('yyyy-MM-dd');

    obj.userid = "R2020001";
    obj.startdate = startdate;
    obj.enddate = enddate;

    $.ajax({
        url: "/api/search/dailylog/one/week",
        dataType:"json",
        method:"POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify( obj ),
        success : function(data) {
            //weekCalendar: 전역변수
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
    var template =  this.listContentTemplate;

    var html = '';

    for(var i = 0 ; i < dailylogList.length ; i++){
       dailylog = removeNull(dailylogList[i]);

       html = template.replace('{{content1}}',removeNull(dailylog.content1))
        .replace(/{{dailylogno}}/g,removeNull(dailylog.dailylogno)) //not null
        .replace(/{{workingday}}/g,removeNull(dailylog.workingday)) // not null
        .replace('{{content2}}', removeNull(dailylog.content2))
        .replace('{{overtimecontent}}',removeNull(dailylog.overtimecontent))
        .replace('{{overtimestart}}', removeNull(dailylog.overtimestart))
        .replace('{{overtimeend}}', removeNull(dailylog.overtimeend));

       $("#date-"+dailylog.workingday).append(html);
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

    changeModalMode('write');
    $("#dailylogModal").css('display','block');
}

/******************** api **********************************
업무일지 상세보기 api 호출
JSON.stringify(obj)
*************************************************************/
function callOneDailylogApi(dailylogno){

    var obj = new Object();
    obj.dailylogno = dailylogno;

    $.ajax({
        url: "/api/search/dailylog/one/detail",
        dataType:"json",
        method:"POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify( obj ),
        success : function(data) {
            var dailylog = data.dailylog;
            setOneDailylog(dailylog);

        },
        fail : function(error){
          alert("error..");
      }
    });
}

function setOneDailylog(dailylog){
    //변경
    $("#dailylogModal").find("[name=dailylogno]").val(dailylog.dailylogno);
    $("#dailylogModal").find("[name=content1]").val(dailylog.content1);
    $("#dailylogModal").find("[name=content2]").val(dailylog.content2);
    $("#dailylogModal").find("[name=overtimestart]").val(dailylog.overtimestart);
    $("#dailylogModal").find("[name=overtimeend]").val(dailylog.overtimeend);
    $("#dailylogModal").find("[name=overtimecontent]").val(dailylog.overtimecontent);

    changeModalMode('write');
    $("#dailylogModal").css('display','block');
}

/* unused
function markWeekDailylog(data){
    var dailylogList = data.dailylogList;
    var dailylog;
    var username;
    var workingday;
    var dailylogno;
    var id;
    for(var i = 0 ; i < dailylogList.length ; i++){
        dailylog = dailylogList[i];
        workingday = dailylog.workingday;
        username = dailylog.user.username;
        dailylogno = dailylog.dailylogno;
        id = '#date-'+workingday;
    }
}


function drawWeekCalendar(date){
    calendar = new WeeklyCalendar();
    //1. render
    calendar.render(date,'calendar');
    calendar.callHolidayApi(date);

    $(".date-picker").attr('value',date.format('yyyy-MM-dd'));
}
*/

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


/******************** api **********************************
공휴일 달력에 마킹하기
JSON.stringify(obj)
*************************************************************/
WeeklyCalendar.prototype.markHoliday = function(holidays){
    var title = '';
    var element;
    var cday = 24 * 60 * 60 * 1000;
    var diff = 0;
    var day;
    var startday ;
    var endday ;
    // h3

    for(var i = 0 ; i < holidays.length ; i++){
       startday = new Date(holidays[i].startday);
       endday = new Date(holidays[i].endday);
       diff = ( endday - startday ) / cday;

       for (var j= 0 , day = startday ,  title = holidays[i].title ; j <= diff ; j++ ){
            element = document.querySelector("#date-"+day.format('yyyy-MM-dd') );
            if(element != null && element != undefined){
               element.firstChild.firstChild.classList.add("w3-text-red");
            }
            day.setDate(day.getDate()+1);
       }
    }
}
