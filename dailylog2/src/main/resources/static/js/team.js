

    this.addEventListener('DOMContentLoaded', function(){
        this.init();
    });

    function init(){
        this.initComponent();
        this.loadCalendar();
        this.addClickEvent();
    }

    function initComponent(){
        /* init #date-picker */
        var date = new Date().format('yyyy-MM-dd');
        //var datePickers = document.querySelectorAll('.date-picker');
        $('.date-picker').attr('value',date);
    }

    /* event 관련 */
    function addClickEvent(){
        this.addRightsideopenbarClickEvent();
        document.querySelector('#month-btn').addEventListener('click',this.whenClickMonthBtn);
        document.querySelector('#week-btn').addEventListener('click',this.whenClickWeekBtn);
        document.querySelector('#next-btn').addEventListener('click',this.whenClickNextBtn);
        document.querySelector('#before-btn').addEventListener('click',this.whenClickBeforeBtn);
      }

    function addRightsideopenbarClickEvent(){
        var bar = document.querySelector('#right-side-open-bar');

        bar.addEventListener('click', function(event){
            var element = document.querySelector('#right-side');
            var form = document.querySelector('#form');
            if( element.classList.contains('close') ) {
                element.classList.remove('close');
                element.classList.add('open');
                form.classList.remove('hidden');
            }else{
                element.classList.add('close');
                element.classList.remove('open');
                form.classList.add('hidden');
            }
        });
    }

    //첫 화면 로드시
    function loadCalendar(){
        //현재 날짜를 기준으로 로드
        var date = new Date();
        //drawTeamMonthCalendar(date);
        drawMonthCalendar(date);
    }

    function whenClickMonthBtn(){
        var datestr = document.querySelector('.date-picker').getAttribute('value');
        var date = new Date(datestr);
        drawTeamMonthCalendar(date);
    }

    function whenClickWeekBtn(){
        var datestr = document.querySelector('.date-picker').getAttribute('value');
        var date = new Date(datestr);

        drawWeekCalendar(date);
    }

    function whenClickBeforeBtn(){
        var monthCalendarId = document.querySelector('#month-calendar');
        var weekCalendarId = document.querySelector('#week-calendar');

        if(monthCalendarId != null){
            var newdate = getBeforeMonth();
            drawTeamMonthCalendar(newdate);
            changeInputDatePicker(newdate.format('yyyy-MM-dd'));
        }

        if(weekCalendarId != null){
            var newdate = getBeforeWeek();
            drawWeekCalendar(newdate);
            changeInputDatePicker(newdate.format('yyyy-MM-dd'));
        }
    }

    function whenClickNextBtn(){
        var monthCalendarId = document.querySelector('#month-calendar');
        var weekCalendarId = document.querySelector('#week-calendar');

        if(monthCalendarId != null){
            var newdate = getNextMonth();
            drawTeamMonthCalendar(newdate);
            changeInputDatePicker(newdate.format('yyyy-MM-dd'));
        }

        if(weekCalendarId != null){
            var newdate = getNextWeek();
            drawWeekCalendar(newdate);
            changeInputDatePicker(newdate.format('yyyy-MM-dd'));
        }
    }