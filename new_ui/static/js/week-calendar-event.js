function WeeklyCalendar(){

    this.mode = "list";
    this.calendarType1 = "one"; //one, team

    this.listTemplate = 
'<div class="row row-style1">'
  +'<div class="col-md-1">'
    +'<div class="label-style1">'
      +'<button class="btn-style1" onclick="whenClickModifyBtn(\'{{yyyyMMdd}}\')"><i class="fa fa-pencil"></i></button>'
    +'</div>'
    +'<hr>'
    +'<div><h3 class="yoil-style1">{{yoil}}</h3></div>'
    +'<div>{{mmdd}}</div>'
  +'</div>'
  +'<div class="col-md-5 col-left-border">'
    +'<div class="label-style1"> 실시사항 </div>'
    +'<hr>'
    +'<div>'
      +'<pre class="content1-style1 pre-style1">{{content1}}</pre>'
    +'</div>'
  +'</div>'
  +'<div class="col-md-4 col-left-border">'
    +'<div class="label-style1"> 기타사항(교육,출장,회의,휴가,특이사항) </div>'+
    +'<hr>'
    +'<div><pre class="content1-style1 pre-style1">{{content2}}</pre></div>'                 
  +'</div>'
  +'<div class="col-md-2 col-left-border">'
    +'<div class="label-style1"> 특근 </div>'
    +'<hr>'
    +'<div class="content1-style1">'
        +'<div><span>시간</span><span>12:00 - 14:00</span></div>'
        +'<div><span>업무</span><span>{{content3}}</span></div>'
    +'</div>'
  +'</div>'
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

    var yoils = ['월','화','수','목','금','토','일'];
    
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
        //리스트형 
        contentTemplate = this.listTemplate;
        //7일 표시
        for(var i = 0, day = monday ; i < 7  ; i++, day = this.nextDay(year,month,date)){
            year = day.getFullYear();
            month = day.getMonth();
            date = day.getDate();

            var mmdd = (month + 1) +'.'+date;
            yyyyMMdd = day.format('yyyy-MM-dd');
            newContentTemplate = contentTemplate.replace('{{yoil}}', yoils[i])
                                    .replace('{{mmdd}}',mmdd)
                                    .replace(/{{yyyyMMdd}}/gi, yyyyMMdd );
            
            html+=newContentTemplate;
                    
        }
    }
    
    var newContentTemplate ='';
    
    

    document.querySelector('#'+id).innerHTML = html;

    //yyyy-mm setting
    document.getElementById('yyyy').innerHTML = year;
    document.getElementById('mm').innerHTML = month + 1 ;
}

WeeklyCalendar.prototype.nextDay = function(year,month,date){
    return new Date(year,month,date +1);
}

/*calendarType1 = [team,one] */
WeeklyCalendar.prototype.drawCalendar = function(date, id){
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
    this.render(date, id);

    $(".date-picker").attr('value',date.format('yyyy-MM-dd'));

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
