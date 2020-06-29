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

this.teamTemplate = 
    "<div class='row'>"
    + "<span class='col-3 label-style2'>{{name}}</span>"
    + "<span>"
    +  "<pre class='content1-style1 pre-style1'>{{content}}</pre>"
    + "</span>"
    +"</div>";

this.content1Template = '';
this.content2Template = '';
this.content3Template = '';

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
     "[{\"enterdate\":1593418151241,\"updatedate\":null,\"dailylogno\":1,\"deptcode\":\"00001\",\"user\":{\"enterdate\":1593418151235,\"updatedate\":null,\"userid\":\"R2020001\",\"username\":\"源��븘臾닿컻\",\"deptcode\":\"00001\",\"part\":null,\"userstatecode\":null,\"acceptadminyn\":\"N\",\"jumin1\":null,\"jumin2\":null,\"telnum\":null,\"hpnum\":null,\"email\":null,\"logindate\":null,\"loginip\":null,\"logincount\":null,\"loginfailcnt\":null,\"lockyn\":null,\"positioncode\":\"00004\",\"position\":{\"positioncode\":\"00004\",\"positionname\":\"��由�\"},\"enterid\":null,\"entername\":null,\"enterpgm\":null,\"updateid\":null,\"updatename\":null,\"updatepgm\":null},\"workerid\":\"R2020001\",\"workingday\":\"2020-05-06\",\"part\":\"H\",\"content1\":\"而⑦뀗痢�1\",\"content2\":\"而⑦뀗痢�2\",\"content3\":null,\"content4\":null,\"overtimestart\":null,\"overtimeend\":null,\"overtimecontent\":null,\"tag\":null,\"enterid\":null,\"entername\":null,\"enterpgm\":null,\"updateid\":null,\"updatename\":null,\"updatepgm\":null},{\"enterdate\":1593418151241,\"updatedate\":null,\"dailylogno\":2,\"deptcode\":\"00001\",\"user\":{\"enterdate\":1593418151235,\"updatedate\":null,\"userid\":\"R2020001\",\"username\":\"源��븘臾닿컻\",\"deptcode\":\"00001\",\"part\":null,\"userstatecode\":null,\"acceptadminyn\":\"N\",\"jumin1\":null,\"jumin2\":null,\"telnum\":null,\"hpnum\":null,\"email\":null,\"logindate\":null,\"loginip\":null,\"logincount\":null,\"loginfailcnt\":null,\"lockyn\":null,\"positioncode\":\"00004\",\"position\":{\"positioncode\":\"00004\",\"positionname\":\"��由�\"},\"enterid\":null,\"entername\":null,\"enterpgm\":null,\"updateid\":null,\"updatename\":null,\"updatepgm\":null},\"workerid\":\"R2020001\",\"workingday\":\"2020-05-07\",\"part\":\"H\",\"content1\":\"而⑦뀗痢�1\",\"content2\":\"而⑦뀗痢�2\",\"content3\":null,\"content4\":null,\"overtimestart\":null,\"overtimeend\":null,\"overtimecontent\":null,\"tag\":null,\"enterid\":null,\"entername\":null,\"enterpgm\":null,\"updateid\":null,\"updatename\":null,\"updatepgm\":null},{\"enterdate\":1593418151241,\"updatedate\":null,\"dailylogno\":3,\"deptcode\":\"00001\",\"user\":{\"enterdate\":1593418151235,\"updatedate\":null,\"userid\":\"R2020001\",\"username\":\"源��븘臾닿컻\",\"deptcode\":\"00001\",\"part\":null,\"userstatecode\":null,\"acceptadminyn\":\"N\",\"jumin1\":null,\"jumin2\":null,\"telnum\":null,\"hpnum\":null,\"email\":null,\"logindate\":null,\"loginip\":null,\"logincount\":null,\"loginfailcnt\":null,\"lockyn\":null,\"positioncode\":\"00004\",\"position\":{\"positioncode\":\"00004\",\"positionname\":\"��由�\"},\"enterid\":null,\"entername\":null,\"enterpgm\":null,\"updateid\":null,\"updatename\":null,\"updatepgm\":null},\"workerid\":\"R2020001\",\"workingday\":\"2020-05-08\",\"part\":\"H\",\"content1\":\"而⑦뀗痢�1\",\"content2\":\"而⑦뀗痢�2\",\"content3\":null,\"content4\":null,\"overtimestart\":null,\"overtimeend\":null,\"overtimecontent\":null,\"tag\":null,\"enterid\":null,\"entername\":null,\"enterpgm\":null,\"updateid\":null,\"updatename\":null,\"updatepgm\":null},{\"enterdate\":1593418151241,\"updatedate\":null,\"dailylogno\":4,\"deptcode\":\"00001\",\"user\":{\"enterdate\":1593418151235,\"updatedate\":null,\"userid\":\"R2020002\",\"username\":\"理쒖븘臾닿컻\",\"deptcode\":\"00001\",\"part\":null,\"userstatecode\":null,\"acceptadminyn\":\"Y\",\"jumin1\":null,\"jumin2\":null,\"telnum\":null,\"hpnum\":null,\"email\":null,\"logindate\":null,\"loginip\":null,\"logincount\":null,\"loginfailcnt\":null,\"lockyn\":null,\"positioncode\":\"00003\",\"position\":{\"positioncode\":\"00003\",\"positionname\":\"怨쇱옣\"},\"enterid\":null,\"entername\":null,\"enterpgm\":null,\"updateid\":null,\"updatename\":null,\"updatepgm\":null},\"workerid\":\"R2020002\",\"workingday\":\"2020-05-06\",\"part\":\"H\",\"content1\":\"而⑦뀗痢�1\",\"content2\":\"而⑦뀗痢�2\",\"content3\":null,\"content4\":null,\"overtimestart\":null,\"overtimeend\":null,\"overtimecontent\":null,\"tag\":null,\"enterid\":null,\"entername\":null,\"enterpgm\":null,\"updateid\":null,\"updatename\":null,\"updatepgm\":null},{\"enterdate\":1593418151241,\"updatedate\":null,\"dailylogno\":5,\"deptcode\":\"00001\",\"user\":{\"enterdate\":1593418151235,\"updatedate\":null,\"userid\":\"R2020002\",\"username\":\"理쒖븘臾닿컻\",\"deptcode\":\"00001\",\"part\":null,\"userstatecode\":null,\"acceptadminyn\":\"Y\",\"jumin1\":null,\"jumin2\":null,\"telnum\":null,\"hpnum\":null,\"email\":null,\"logindate\":null,\"loginip\":null,\"logincount\":null,\"loginfailcnt\":null,\"lockyn\":null,\"positioncode\":\"00003\",\"position\":{\"positioncode\":\"00003\",\"positionname\":\"怨쇱옣\"},\"enterid\":null,\"entername\":null,\"enterpgm\":null,\"updateid\":null,\"updatename\":null,\"updatepgm\":null},\"workerid\":\"R2020002\",\"workingday\":\"2020-05-07\",\"part\":\"H\",\"content1\":\"而⑦뀗痢�1\",\"content2\":\"而⑦뀗痢�2\",\"content3\":null,\"content4\":null,\"overtimestart\":null,\"overtimeend\":null,\"overtimecontent\":null,\"tag\":null,\"enterid\":null,\"entername\":null,\"enterpgm\":null,\"updateid\":null,\"updatename\":null,\"updatepgm\":null}]";
  }
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
