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
         +'<div><span>시간</span><span name="overtimestart">{{overtimestart}}</span> - <span name="overtimeend">{{overtimeend}}</span></span></div>'
         +'<div><span>업무</span><span name="overtimecontent">{{overtimecontent}}</span></div>'
     +'</div>'
   +'</div>'
   +'<div class="col-md-1>'
    +'<a  href="javascript:void(0)" class="w3-button" onclick="whenClickDailylog({{dailylogno}})"><i class="fa fa-pencil"></i></a>'
    +'<a  href="javascript:void(0)" class="w3-button" onclick="whenClickDailylog({{dailylogno}})"><i class="fa fa-pencil"></i></a>'
   +'</div>';

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

    this.date = date;

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
    $(".date-picker").attr('value',date.format('yyyy-MM-dd'));

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
       dailylog = dailylogList[i];
       html = template.replace('{{content1}}',dailylog.content1)
        .replace('{{dailylogno}}',dailylog.dailylogno)
        .replace('{{content2}}',dailylog.content2)
        .replace('{{overtimecontent}}',dailylog.overtimecontent)
        .replace('{{overtimestart}}',dailylog.overtimestart)
        .replace('{{overtimeend}}',dailylog.overtimeend);
       $("#date-"+dailylog.workingday).append(html);
    }
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


/******************** api **********************************
업무일지 상세보기 클릭시
JSON.stringify(obj)
*************************************************************/
function whenClickDailylog(dailylogno,datestr){

    $(".date-picker").attr('value',datestr);

    callOneDailylogApi(dailylogno);

    changeModalMode('view');

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
    $("[name=content1]").html(dailylog.content1);
    $("[name=content2]").html(dailylog.content2);
    $("[name=overtimestart]").html(dailylog.overtimestart);
    $("[name=overtimeend]").html(dailylog.overtimeend);
    $("[name=overtimecontent]").html(dailylog.overtimecontent);
    $("#dailylogModal").css('display','block');
}

function markWeekDailylog(data){
    var dailylogList = data.dailylogList;
    var dailylog;
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
}

function whenClickWeeklyForm(datestr){
    var date = new Date(datestr);

     changeInputDatePicker(date.format('yyyy-MM-dd'));
     openRightSideBar();
 }

