
    function openRightSideBar(){
        var element =document.querySelector('#right-side');
        if( element.classList.contains('close') ) {
                element.classList.remove('close');
                element.classList.add('open');
                form.classList.remove('hidden');
        }
    }
