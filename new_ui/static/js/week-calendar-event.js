function WeeklyCalendar(){
    /*
    this.headerHtml = 
    '<div class="weekly-calendar-header-style1">'
    + ' <span id="startyyyymmdd" class="display-none">{{startyyyymmdd}}</span>'
    +    '<span id = "yyyy">{{yyyy}}</span>년 &nbsp; &nbsp;' 
    +    '<span id = "mm">{{mm}}</span>월'
    + '</div>'; */

    this.headerHtml = 
    '<div class="weekly-calendar-header-style1">'
    + ' <span id="startyyyymmdd" class="display-none">{{startyyyymmdd}}</span>'
    + '</div>';

    this.contentTemplate = 
'<div class="row row-style1">'+
    '<div class="col-md-1">' +
        '<button class="w3-button w3-circle w3-light-grey w3-margin-top"><h3  class="yoil-style1">{{yoil}}</h3></button>'+
        '<div>{{mmdd}}</div>'+
    '</div>'+
    '<div class="col-md-5 col-left-border">'+
        '<div class="label-style1"> 실시사항 </div>'+
        '<hr>'+
        '<div><pre class="content1-style1 pre-style1">o FIS\n'+
'1. 전산수정요청 및 문의 처리 8건 \n'+
'2.  간호물품 관련 화면 수정 반영 완료 \n'+
' - 조건추가(검수대상물품여부, 검수상태) \n'+
' 3. (공급,품질,제제,헌혈섭외,혈장) 입출고 장소 조회 쿼리 수정 및 입출고 장소코드 변경 \n'+
'4. 제조사 코드 입력 \n'+
                    '</pre></div>'+
                '</div>'+
                '<div class="col-md-4 col-left-border">'+
                    '<div class="label-style1"> 기타사항(교육,출장,회의,휴가,특이사항) </div>'+
                    '<hr>'+
                    '<div><pre class="content1-style1 pre-style1"> [출장]전자증빙 사업 착수보고회 사전협의 및  요구사항 공유\n'+
'- 일시: 2020.6.16.(화) 10:00~\n'+
'-  장소: 서울사무소\n'+
                         '</pre>'+
                    '</div>'+                    
                '</div>'+
                '<div class="col-md-2 col-left-border">'+
                    '<div class="label-style1"> 특근 </div>'+
                    '<hr>'+
                    '<div class="content1-style1">'+
                        '<div><span>시간</span><span>12:00 - 14:00</span></div>'+
                        '<div><span>업무</span><span>물품검수 개발</span></div>'+
                    '</div>'+
                '</div>'+
            '</div>';
    this.id = 'calendar';
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

    var yoils = ['월','화','수','목','금','토','일'];
    
    var headerHtml = this.headerHtml.replace('{{startyyyymmdd}}', startyyyymmdd)
                                    .replace('{{yyyy}}', year)
                                    .replace('{{mm}}', month+1);

    var html = '';
    var newContentTemplate ='';
    
    //7일 표시
    for(var i = 0, day = monday ; i < 7  ; i++, day = this.nextDay(year,month,date)){
      
        year = day.getFullYear();
        month = day.getMonth();
        date = day.getDate();

        var mmdd = (month + 1) +'.'+date;
        newContentTemplate = this.contentTemplate.replace('{{yoil}}', yoils[i])
                                .replace('{{mmdd}}',mmdd);
        
        html+=newContentTemplate;
                  
    }
    
    document.querySelector('#'+id).innerHTML = html;

    //yyyy-mm setting
    document.getElementById('yyyy').innerHTML = year;
    document.getElementById('mm').innerHTML = month + 1 ;
}

WeeklyCalendar.prototype.nextDay = function(year,month,date){
    return new Date(year,month,date +1);
}

/*calendarType1 = [team,one] */
WeeklyCalendar.prototype.drawCalendar =function(calendarType1 ,date, id){
    if(id == null || id =="" || id == undefined ){
        id = this.id;
    }
    //team일떄와 one일때 분기 필요
    this.render(date, id);
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