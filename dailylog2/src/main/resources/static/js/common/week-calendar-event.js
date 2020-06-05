function WeeklyCalendar(){
    this.headerHtml = 
    '<div class="weekly-calendar-header-style1">'
    + ' <span id="startyyyymmdd" class="display-none">{{startyyyymmdd}}</span>'
    +    '<span id = "yyyy">{{yyyy}}</span>년 &nbsp; &nbsp;' 
    +    '<span id = "mm">{{mm}}</span>월'
    + '</div>';
    this.contentTemplate = 
    '<div class="list-group weekly-content-form-style1">'
    +   '<div class="list-group-item list-item-style2 common-label">실시사항</div>'
    +   '<div class="list-group-item list-item-style2">'
    +       '<pre id="dailylog-content1" class="nanum-font normal-content weekly-content-style1">{{content1}}</pre>'
    +   '</div>'
    +   '<div class="list-group-item list-item-style2 common-label"><span>일정</span></div>'
    +   '<div class="list-group-item list-item-style2">'
    +       '<div>'
    +           '<div class="normal-content nanum-font  weekly-content-style1">{{content2-type}}</div>'
    +           '<div><pre class="nanum-font weekly-content-style1">{{content2}}</pre></div>'
    +       '</div>'
    +   '</div>'
    +   '<div class="list-group-item list-item-style2 common-label">특근</div>'
    +   '<div class="list-group-item list-item-style2">'
    +       '<div class="normal-content nanum-font">'
    +           '<div>'
    +               '<span><img src="./img/access_time-24px.svg" alt="시간" width="20px" height="20px" /></span>'
    +               '<span class="weekly-content-style1" >{{starttime}}</span><span class="weekly-content-style1">~</span><span class="weekly-content-style1">{{endtime}}</span>'
    +           '</div>'
    +           '<div><pre class="normal-content nanum-font weekly-content-style1">{{content3}}</pre></div>'
    +       '</div>'
    +   '</div>'
    +'<div>';

}

WeeklyCalendar.prototype.render = function(curdate, data ,id){
    this.date = date;
    //0:일 1:월 2:화 3:수 4:목 5:금 6:토
    var yoil = curdate.getDay() == 0 ? 7 : curdate.getDay() ;
    var date = curdate.getDate();
    var month = curdate.getMonth();
    var year = curdate.getFullYear();
    var diff = ( yoil -1 );
    var contentTemplate;

    var monday = new Date(year, month, date - diff  );
    var sunday = new Date(year, month, date - diff + 6 );
    var startyyyymmdd = monday.format('yyyy-MM-dd');
    var endyyyymmdd = sunday.format('yyyy-MM-dd');

    var yoils = ['월','화','수','목','금','토','일'];
    
    var headerHtml = this.headerHtml.replace('{{startyyyymmdd}}', startyyyymmdd)
                                    .replace('{{yyyy}}', year)
                                    .replace('{{mm}}', month+1);

    var html = headerHtml + "<table class='weekly-calendar-style1' id='week-calendar'>";
    var backHtml = "</table>";
    var frontTr = "<tr>";
    var backTr = "</tr>";
    var headerTh = "<th class='weekly-calendar-border-style2'>"
            +"<div>{{yoil}} </div><div> {{mmdd}}</div>";
            +"</th>";
    var bodyTh = "<th class='weekly-calendar-border-style1 weekly-calendar-th-style1' onclick='whenClickWeeklyForm(\"{{yyyymmdd}}\")'>{{content-template}}</th>";
    
    html +=frontTr;
    
    //7일 표시
    for(var i = 0, day = monday ; i < 7  ; i++, day = this.nextDay(year,month,date)){
        year = day.getFullYear();
        month = day.getMonth();
        date = day.getDate();

        var mmdd = (month + 1) +'.'+date;
        
        html+=headerTh.replace('{{yoil}}', yoils[i])
                    .replace('{{mmdd}}',mmdd);
                  //  .replace('{{content-template}}', contentTemplate);
    }

    html +=backTr;
    //7일 표시
    for(var i = 0, day = monday ; i < 7  ; i++ ,  day = this.nextDay(year,month,date)){
        year = day.getFullYear();
        month = day.getMonth();
        date = day.getDate();

        var mmdd = (month + 1) +'-'+date;
        var yyyymmdd = year+'-'+mmdd;

        html+=bodyTh
        .replace('{{yyyymmdd}}',yyyymmdd)
        .replace('{{content-template}}',this.contentTemplate);
    
    }
    html +=backTr;
    html +=backHtml;

    document.querySelector('#'+id).innerHTML = html;
}

WeeklyCalendar.prototype.nextDay = function(year,month,date){
    return new Date(year,month,date +1);
}


function nextWeek(){
    var datestr = document.querySelector('#startyyyymmdd').innerHTML;
    var date = new Date(datestr);
    var dd = date.getDate();
    var mm = date.getMonth();
    var yyyy = date.getFullYear();

    var newdate = new Date(yyyy,mm,dd + 7);

    changeInputDatePicker(newdate.format('yyyy-MM-dd'));

    drawWeekCalendar(newdate);
    
}

function getNextWeek(){
    var datestr = document.querySelector('#startyyyymmdd').innerHTML;
    var date = new Date(datestr);
    var dd = date.getDate();
    var mm = date.getMonth();
    var yyyy = date.getFullYear();

    var newdate = new Date(yyyy,mm,dd + 7);
    
    return newdate;
}

function beforeWeek(){
    var datestr = document.querySelector('#startyyyymmdd').innerHTML;
    var date = new Date(datestr); 
    var dd = date.getDate();
    var mm = date.getMonth();
    var yyyy = date.getFullYear();

    var newdate = new Date(yyyy,mm,dd - 7);

    changeInputDatePicker(newdate.format('yyyy-MM-dd'));
    drawWeekCalendar(newdate); 
}

function getBeforeWeek(){
    var datestr = document.querySelector('#startyyyymmdd').innerHTML;
    var date = new Date(datestr); 
    var dd = date.getDate();
    var mm = date.getMonth();
    var yyyy = date.getFullYear();

    var newdate = new Date(yyyy,mm,dd - 7);
    return newdate;
}

function drawWeekCalendar(date){
    console.log('call ajax');
    var month = date.getMonth();
    var year = date.getFullYear();
    //0:일 1:월 2:화 3:수 4:목 5:금 6:토
    var yoil = date.getDay() == 0 ? 7 : date.getDay() ;
    var diff = ( yoil -1 );

    var startdate = new Date(year, month, date - diff  ); //그 주의 월요일
    var enddate = new Date(year, month, date - diff + 6 ); // 그 주의 일요일

    var sendData = {'deptcode' : '00001' , 'startdate' : startdate, 'enddate' : enddate };

    //ajax 호출
    $.ajax({
        url: "/api/search/dailylog/team/week",
        type: "POST",
        dataType: "JSON",
        data: sendData,
        contentType: 'application/json;charset=UTF-8',
        success: function(data){
            console.log(data);

           // calendar = new WeeklyCalendar();
            //1. render
           // calendar.render(date, data ,'calendar');

        },
        error: function (request, status, error){
            alert(error);
            console.log(error);
        }
      });


}

function whenClickWeeklyForm(datestr){
    var date = new Date(datestr);

     changeInputDatePicker(date.format('yyyy-MM-dd'));
     openRightSideBar();
 }
