
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
    

    function changeInputShowMode(event){
        if(event == null) return;
        var id = event.target.id;

        if(id == 'save-btn'){
            //1. component 변경
            console.log('click save');
            document.querySelectorAll('.input-mode').forEach(function(element){
                if(!element.classList.contains('display-none')){
                    element.classList.add('display-none');
                }
            });
            document.querySelectorAll('.show-mode').forEach(function(element){
                if(element.classList.contains('display-none')){
                    element.classList.remove('display-none');
                }
            });
            //ajax
        }

        if(id == 'modify-btn'){
            document.querySelectorAll('.input-mode').forEach(function(element){
                if(element.classList.contains('display-none')){
                    element.classList.remove('display-none');
                }
            });
            document.querySelectorAll('.show-mode').forEach(function(element){
                if(!element.classList.contains('display-none')){
                    element.classList.add('display-none');
                }
            });
        }
        
    }
