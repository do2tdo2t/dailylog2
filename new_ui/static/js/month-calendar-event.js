/** prototype으로 구현 */
function CommonCalendar(){
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

CommonCalendar.prototype.format = function(date, format){
    
    /* 매칭되는 부분 */
    

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
    if(date === undefined || date === null || date === ''){
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
    var calendarMain ="<div class='calendar-main' id='month-calendar'>";
    var rowHeadHtml = "<div class='row'>";

    //첫번째 주에는 요일을 표기
    var firstColHeadHtml =  "<a class='col alink' href='javascript:void(0)' onclick='whenClickDay(\"{{yyyyMMdd}}\")' >"
                            +"<div class='day {{validation}}'>"
                            +"<div id='yoil'>{{hangulYoil}}</div>"
                            +"<div class='dd'>{{day}}</div></div>"
                            +"</a>";
    var colHeadHtml = "<a class='col alink' href='javascript:void(0)' onclick='whenClickDay(\"{{yyyyMMdd}}\" )' >"
                    +"<div class='col day {{validation}}' id='date-{{yyyyMMdd}}'>"
                    +"<div class='dd'>{{day}}</div></div>"
                    +"</a>";
    var divEndHtml = "</div>";
    
    var startDay = ( firstYoil == 0 ? 1 : lastDateOfBeforeMonth - firstYoil + 1 ) ;

    //*calendar reder*//
    //첫주
    var day = startDay;
    var yyyyMMdd ='';
    var validation = day == 1 ? "valid" : "invalid"; //해당 월의 날짜:valid, 아니면 invlid
    //0:일 1:월 2:화 3:수 4:목 5:금 6:토
    calendarHtml += calendarMain + rowHeadHtml;
    for(var i = 1 ; i <= 7  ; i++, day ++){
        //순서 중요
        if(day > lastDateOfBeforeMonth){
            day = 1;
            validation = "valid";
        }
        yyyyMMdd = new Date(yyyy,mm,day).format('yyyy-MM-dd');
        calendarHtml += this.handleCol(firstColHeadHtml.replace('{{hangulYoil}}',hangulYoil[i-1]), yyyyMMdd , day , validation);
    }
    calendarHtml += divEndHtml;
    
    //둘째주 ~ 마지막주  -1
    validation = "valid";
    for(var i = 1  ; day <= lastDate  ; day++, i++ ){

        if(i % 7 == 1){
            calendarHtml += rowHeadHtml;
        }
        yyyyMMdd = new Date(yyyy,mm,day).format('yyyy-MM-dd');
        calendarHtml += this.handleCol(colHeadHtml, yyyyMMdd, day, validation);
        if (i % 7 == 0){
            calendarHtml += divEndHtml;
        }
    }

    //마지막주 
    //0:일 1:월 2:화 3:수 4:목 5:금 6:토
    validation = "invalid";
    for(var i = lastYoil + 1 ,day = 1  ;  i < 7 ; day++, i++ ){
        yyyyMMdd = new Date(yyyy,mm,day).format('yyyy-MM-dd');
        calendarHtml += this.handleCol(colHeadHtml,  yyyyMMdd , day ,validation);
    }
    calendarHtml += divEndHtml + divEndHtml;

    //calendarBody에 붙이기
    var calendarBody = document.getElementById(id);
    calendarBody.innerHTML = "";
    calendarBody.insertAdjacentHTML('beforeend',calendarHtml);

    //yyyy-mm setting
    document.getElementById('yyyy').innerHTML = yyyy;
    document.getElementById('mm').innerHTML = mm + 1 ;
}

CommonCalendar.prototype.handleCol = function(colHeadHtml, yyyyMMdd, day, validation){
    var newColHeadHtml = colHeadHtml.replace(/{{yyyyMMdd}}/gi, yyyyMMdd )
                    .replace(/{{day}}/gi, day)
                    .replace(/{{validation}}/gi, validation);

    return newColHeadHtml;
}

CommonCalendar.prototype.markTodate = function(){
    var date = new Date();

    var element = document.getElementById("date-"+date);

    if (element != undefined){
        element.classList.add('today');
    }
}


CommonCalendar.prototype.markHoliday = function(){
    var holiday = '공휴일';
    var exdate = 'date-2020-3-20';
    var element = document.getElementById(exdate);
    var holidayHtml =  "<button class='btn btn-danger holiday' type='button'>{{holiday}}</button> ";
    holidayHtml = holidayHtml.replace("{{holiday}}", holiday);

    if(element != null && element != undefined){
        element.insertAdjacentHTML('beforeend',holidayHtml);
    }
}

CommonCalendar.prototype.markDailylog = function(){
    //type 1) 모든사람들 표시
    var dailylogHtml = 
    "<button class='btn btn-secondary dailylog' onclick='whenClickDailylog(event);' type='button'>김아무개, 박아무개, 이아무개, 홍길동, 가나다, 라마바, 사아자, 차카타, 파하가, 갸거겨,고교구 (11) </button> ";
    var exdate = 'date-2020-4-12';
    var element = document.getElementById(exdate);

    if(element != null && element != undefined){
        element.insertAdjacentHTML('beforeend',dailylogHtml);
    } 
}

CommonCalendar.prototype.markTeamDailylog = function(){
    //type 1) 모든사람들 표시
    var dailylogHtml = 
    "<button class='btn btn-secondary dailylog' onclick='whenClickTeamDailylog(event);' type='button'>김아무개, 박아무개, 이아무개, 홍길동, 가나다, 라마바, 사아자, 차카타, 파하가, 갸거겨,고교구 (11) </button> ";
    var exdate = 'date-2020-4-12';
    var element = document.getElementById(exdate);

    if(element != null && element != undefined){
        element.insertAdjacentHTML('beforeend',dailylogHtml);
    }
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

    if(this.calendarType1 != null && this.calendarType1 != undefined && this.calendarType1 != ""){
        if(this.calendarType1 == 'team'){
            //1. render
            this.render(date,id);
        }

        if(this.calendarType1 == 'one'){
            //1. render
            this.render(date, id);
        }
    }

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

//현재달의 1일
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
    //calendar.markTodate(date.getDate());
    //calendar.markDailylog();
    //calendar.markHoliday();
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

/* dailylog 클릭 시 
    1. datepicker update
    2. ajax 데이터 가져오기
    3. open side bar - 상세보기바
*/
function whenClickDailylog(event){
    var target = event.target;
    var parentId = target.parentElement.getAttribute('id');

    var datestr = parentId.replace('date-','').split('-');
    
    var date = new Date(datestr[0],datestr[1]-1, datestr[2]);

    changeInputDatePicker(date.format('yyyy-MM-dd'));
    //open right side
    openRightSideBar();
}

function whenClickTeamDailylog(event){
    var target = event.target;
    var parentId = target.parentElement.getAttribute('id');

    var datestr = parentId.replace('date-','').split('-');
    
    var date = new Date(datestr[0],datestr[1]-1, datestr[2]);


    changeInputDatePicker(date.format('yyyy-MM-dd'));
    openRightSideBar();
    callTeamDailylogApi();
}

function callTeamDailylogApi(){
    $.ajax({
        url: "json/team.json",
        dataType:"json",
        method:"GET",
        success : function(data) {
            
            setTeamDailylog(data);
        },
        fail : function(error){
          alert("error..");
      }
    });
}

function setTeamDailylog(data){
    console.log(data);
    var name;
    var content1;
    var content2Type;
    var content2;
    var content3;
    var starttime;
    var endtime;

    var template1 = document.querySelector('#content1-template').innerHTML;
    var template2 = document.querySelector('#content2-template').innerHTML;
    var template3 = document.querySelector('#content3-template').innerHTML;

    $("#content1-table").innerHTML = "";
    $("#content2-table").innerHTML = "";
    $("#content3-table").innerHTML = "";
    
    for(var i = 0 ; i< data.arr.length ; i ++){
        name = data.arr[i].name;
        content1 = data.arr[i].content1;
        content2Type = data.arr[i].content2Type;
        content2 = data.arr[i].content2;
        content3 = data.arr[i].content3;
        starttime = data.arr[i].starttime;
        endtime = data.arr[i].endtime;

        if(content1 != "" && content1 != null){
            // content1
            document.querySelector("#content1-table").insertAdjacentHTML('beforeend',
            template1
            .replace('{{content1}}',content1)
            .replace('{{name}}',name)
            );
        }
        
        if(content2 != "" && content2 != null){
            // content2
            document.querySelector("#content2-table").insertAdjacentHTML('beforeend',
                template2.replace('{{content2}}',content2)
                .replace('{{content2Type}}',content2Type)
                .replace('{{name}}',name)
            );
        }

        if(content3 != "" && content3 != null){
            // content3
            document.querySelector("#content3-table").insertAdjacentHTML('beforeend',
                template3.replace('{{content3}}',content3)
                .replace('{{starttime}}',starttime)
                .replace('{{endtime}}',endtime)
                .replace('{{name}}',name)
            );
        }
    }
}
