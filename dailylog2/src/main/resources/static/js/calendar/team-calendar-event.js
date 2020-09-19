function TeamCalendar(){

    this.mode = "list";
    this.calendarType1 = "team"; //one, team

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
      +'{{team-content1}}'
    +'</div>'
  +'</div>'
  +'<div class="col-md-3 col-left-border">'
    +'<div class="label-style1"> 기타사항(교육,출장,회의,휴가,특이사항) </div>'
    +'<hr>'
    +'<div>{{team-content2}}</div>'                 
  +'</div>'
  +'<div class="col-md-3 col-left-border">'
    +'<div class="label-style1"> 특근 </div>'
    +'<hr>'
    +'<div class="content1-style1">'
        +'{{team-content3}}'
    +'</div>'
  +'</div>'
+'</div>';

this.teamTemplate = 
    "<div class='row'>"
    + "<span class='col-3 label-style2'>{{name}}</span>"
    + "<span>"
    +  "<pre class='content1-style1 pre-style1'>{{content}}</pre>"
    + "</span>"
    +"</div>";

this.content1Template = 
     "<div class='row'>"
    + "<span class='col-3 label-style2'>{{name}}</span>"
    + "<span>"
    +  "<pre class='content1-style1 pre-style1'>{{content1}}</pre>"
    + "</span>"
    +"</div>"
    +"<div class='row'>"
    + "<span class='col-3 label-style2'>{{name}}</span>"
    + "<span>"
    +  "<pre class='content1-style1 pre-style1'>{{content1}}</pre>"
    + "</span>"
    +"</div>"    
;

this.content2Template = 
    "<div class='row'>"
    + "<span class='col-3 label-style2'>{{name}}</span>"
    + "<span>"
    +  "<pre class='content1-style1 pre-style1'>{{content2}}</pre>"
    + "</span>"
    +"</div>"
;
this.content3Template = 
  "<div class='row'>"
    + "<span class='col-3 label-style2'>{{name}}</span>"
    + "<span>"
    +'<div><span>시간</span><span>12:00 - 14:00</span></div>'
    +'<div><span>업무</span><span>{{content3}}</span></div>'
    + "</span>"
    +"</div>";

this.id = 'calendar';

}

//date type to id
TeamCalendar.prototype.buildId = function(date){
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

TeamCalendar.prototype.parseData = function(jsonString){
  if(jsonString == null || jsonString == undefined || jsonString == ""){
     jsonString = 
      '{"name":"John"}';
    }
    jsonString = 
    '{"name":"John"}';
  var jsonData = JSON.parse(jsonString);
  console.log(jsonData);

}

TeamCalendar.prototype.render = function(curdate,id){
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
    /** test data */

    var html ='';
    var mmdd;
    var id;
    var yyyyMMdd;

    var contentTemplate = '';

    //test
    this.parseData();
    
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
                                  .replace(/{{yyyyMMdd}}/gi, yyyyMMdd )
                                  .replace('{{team-content1}}',this.content1Template)
                                  .replace('{{team-content2}}',this.content2Template)
                                  .replace('{{team-content3}}',this.content3Template);
                
        html+=newContentTemplate;                
    }
      
    var newContentTemplate ='';
    document.querySelector('#'+id).innerHTML = html;

    //yyyy-mm setting
    document.getElementById('yyyy').innerHTML = year;
    document.getElementById('mm').innerHTML = month + 1 ;
}

TeamCalendar.prototype.nextDay = function(year,month,date){
    return new Date(year,month,date +1);
}

/*calendarType1 = [team,one] */
TeamCalendar.prototype.drawCalendar = function(date, jsonData, id){
    if(id == null || id =="" || id == undefined ){
        id = this.id;
    }

    if(typeof(date) ==="string"){
        date = new Date(date);
    }

    if(date == null || date == undefined){
        date = new Date();
    }
    
    this.parseData(jsonData);

    this.render(date, id);

    $(".date-picker").attr('value',date.format('yyyy-MM-dd'));

}
