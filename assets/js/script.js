//show menu responsive
(function(){

    var bars=document.querySelector('.icon-bars');
    bars.addEventListener('click',()=>{
        var listMenu=document.querySelector('.list-menu');
        listMenu.classList.toggle('max-height');
    })
})();


// show submenu 
(function(){
    var i ='<i class="fas fa-plus"></i>';
    var plus=document.querySelector('.icon-plus');
    plus.innerHTML = '<i class="fas fa-plus"></i>';
    plus.addEventListener('click',()=>{
        var submenu=document.querySelector('.submenu');
        submenu.classList.toggle('max-height');
        

        if (plus.innerHTML === '<i class="fas fa-plus"></i>') {
            plus.innerHTML = '<i class="fas fa-minus"></i>';
        }
        else {
            plus.innerHTML = '<i class="fas fa-plus"></i>';
        }
        
    })

    
})();


//player
(function(){

    var allAudio=document.querySelectorAll('.playlist a');
    var k=0;

    var time=document.querySelector('.time');
    var audio = document.querySelector('audio');
    var play=document.querySelector('.play');
    var stop=document.querySelector('.stop');
    play.style.backgroundImage ='url(/assets/img/play.png)';
    var i=true;

    function formatSecondsAsTime(secs, format) {
        var hr = Math.floor(secs / 3600);
        var min = Math.floor((secs - (hr * 3600)) / 60);
        var sec = Math.floor(secs - (hr * 3600) - (min * 60));

        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }

        return min + ':' + sec;
    }

    var run=document.querySelector('.run');

    audio.addEventListener('timeupdate',(e)=>{

        if (isNaN(audio.duration)) {
            time.innerHTML = '00:00';
        }
        else {
            time.innerHTML = formatSecondsAsTime(Math.floor(audio.currentTime)) + ' / ' + formatSecondsAsTime(Math.floor(audio.duration));
        }
        
        var percent=(audio.currentTime/audio.duration)*100;
        if (audio.currentTime === audio.duration) run.style.width='0%';
        run.style.width=percent+'%';
    })
    
    play.addEventListener('click',()=>{
        if (i){
            play.style.backgroundImage = 'url(/assets/img/pause.png)';
            audio.play();
            i=false;
        }
        else{
            play.style.backgroundImage = 'url(/assets/img/play.png)';
            audio.pause();
            i=true;
        }
    });

    stop.addEventListener('click',()=>{
        audio.load();
        play.style.backgroundImage = 'url(/assets/img/play.png)';
    })

    var next=document.querySelector('.next');
    var prev=document.querySelector('.prev');
    next.addEventListener('click',()=>{
        k=k+1;
        if (k === allAudio.length){
            k = 0;
            allAudio[11].parentElement.classList.remove('active');
            allAudio[k].parentElement.classList.add('active');
        } 
        else{
            allAudio[k - 1].parentElement.classList.remove('active');
            allAudio[k].parentElement.classList.add('active');
        }
        audio.src = allAudio[k].href;
        play.style.backgroundImage = 'url(/assets/img/pause.png)';
        audio.play();
        
    });
    prev.addEventListener('click',()=>{
        k=k-1;
        if (k<0) {
            k = allAudio.length - 1;
            allAudio[0].parentElement.classList.remove('active');
            allAudio[k].parentElement.classList.add('active');
        }else{
            allAudio[k + 1].parentElement.classList.remove('active');
            allAudio[k].parentElement.classList.add('active');
        }
        audio.src = allAudio[k].href;
        audio.play();
        play.style.backgroundImage = 'url(/assets/img/pause.png)';
    });

    var level=document.querySelector('.level');
    var levelCurrent=document.querySelector('.current-level');
    level.addEventListener('mousedown',(e)=>{
        var x=e.offsetX;
        levelCurrent.style.width=x+'%';
        audio.volume=x/100;
    });
   
    var progressbar=document.querySelector('.progressbar');
    var y = progressbar.offsetWidth;
    progressbar.addEventListener('dragover',(e)=>{
        var x=e.offsetX;
        run.style.width=x+'px';
        audio.currentTime=Math.floor(audio.duration*(x/y));
    })


    //back top to
    var scroll=document.querySelector('.scroll');
    scroll.addEventListener('click',()=>{
        window.scrollTo(0,0);
    })


})();