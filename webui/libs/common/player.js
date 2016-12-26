/**
 *  Description:       Video Player
 *  Created Date:      2015-01-05
 *  Author:            zihan
 *  version:           1.0.0
 */


XLJ.player = window.XLJ.player = XLJ.player || function() {

    'use strict';

    // set default controls for iPhone/iPad
    var ua = navigator.userAgent;
    if (ua.indexOf('iPhone') != -1 ||ua.indexOf('iPad') != -1) {
        var media = document.getElementById('media');
        media.setAttribute('controls','true');

        var pbar = document.getElementById('playerBar');
        pbar.parentNode.removeChild(pbar);
        return false;
    }

    var barSize,
        myMovie,
        playerBar,
        progressWrap,
        playButton,
        bar,
        progressBar,
        progressControl,
        currentTime,
        endTime,
        updatedBar,
        readybar,
        tiptxt,
        t;

    // just for ID element
    var $ = function(id) {
        var id = id.replace('#','');
        return document.getElementById(id);
    }

    function doFisrt() {
        myMovie         = $('#media');
        playerBar       = $('#playerBar');
        progressWrap    = $('#progress_wrap');
        playButton      = $('#play');
        bar             = $('#progress');
        progressBar     = $('#progressBar');
        progressControl = $('#progressControl');
        barSize         = bar.clientWidth;
        currentTime     = $('#currentTime');
        endTime         = $('#endTime');

        readybar        = $('#readybar');
        tiptxt          = $('#tiptxt');

        if (!myMovie) return;

        myMovie.preload = "metadata";
        myMovie.onloadedmetadata = function () {
            //alert('ddd');
            onloadedmetadata();
        }
        myMovie.oncanplay = function() {
            //alert('sss');
            onloadedmetadata();
        }
        //myMovie.canPlayType('mp4');
        playButton.addEventListener('click',playOrPause,false);
        progressWrap.addEventListener('click',clickedBar,false);
        //bar.addEventListener('click',clickedBar,false);
        myMovie.addEventListener('click',showbar,false);
    }

    // movie controler
    function playOrPause() {
        if(!myMovie.paused && !myMovie.ended){
            myMovie.pause();
            //playButton.innerHTML='Play';
            playButton.className = playButton.className.replace(' pause', ' play');
            window.clearInterval(updatedBar);
            clearTimeout(t);
            playerBar.style.bottom = '0px';
        }else{
            myMovie.play();
            //playButton.innerHTML='pause';
            playButton.className = playButton.className.replace(' play', ' pause');
            updatedBar=setInterval(update,500);
            t = setTimeout(function() {
                playerBar.style.bottom = '-' + playerBar.clientHeight + 'px';
            },1500);
        }

        myMovie.onpause = function() {
            clearTimeout(t);
            playerBar.style.bottom = '0px';
            playButton.className = playButton.className.replace(' pause', ' play');
        }

        myMovie.onplaying = function() {
            playButton.className = playButton.className.replace(' play', ' pause');
            t = setTimeout(function() {
                playerBar.style.bottom = '-' + playerBar.clientHeight + 'px';
            },1500);
        }
    }

    // progress
    function update() {
        if(!myMovie.ended){
            var size = parseInt(myMovie.currentTime*barSize/myMovie.duration);
            var hour = parseInt(myMovie.currentTime / 60),
                second = Math.ceil(myMovie.currentTime % 60);

            progressBar.style.width=size+'px';
            progressControl.style.left=size-(progressControl.clientWidth/2)+'px';
            currentTime.innerHTML = hour + ':' + addZero(second);
        }else{
            progressBar.style.width='0px';
            //playButton.innerHTML='Play';
            playButton.className = playButton.className.replace(' stop', ' play');
            window.clearInterval(updatedBar);
        }
    }

    // click bar play progress
    function clickedBar(e) {
        if(!myMovie.paused && !myMovie.ended){
            var mouseX=e.pageX-(bar.offsetLeft + bar.offsetParent.offsetLeft + bar.offsetParent.offsetParent.offsetLeft);
            var newtime=mouseX*myMovie.duration/barSize; //new starting time

            myMovie.currentTime=newtime;
            progressBar.style.width=mouseX+'px';

            var size=parseInt(myMovie.currentTime*barSize/myMovie.duration);
            var hour = parseInt(myMovie.currentTime / 60),
                second = Math.ceil(myMovie.currentTime % 60);

            currentTime.innerHTML = hour + ':' + addZero(second);
            //window.clearInterval(updatedBar);
        }
    }

    // get movie duration
    function getAllDuration() {
        //onloadedmetadata();
    }
    function onloadedmetadata() {
        var vLength = myMovie.duration;
        var hour = parseInt(vLength / 60),
            second = Math.ceil(vLength % 60);
        endTime.innerHTML = hour + ':' + addZero(second);
    }

    // current time
    function currentTimeUpdate() {
        myMovie.addEventListener("timeupdate", function () {
            this.removeEventListener("timeupdate");
            //showinfo.html(this.currentTime + '+++----');
        }, false);
    }

    //add Zero
    function addZero(t) {
        return (t < 10 && t >= 0) ? '0' + t : t;
    }

    function showbar() {
        clearTimeout(t);
        playerBar.style.bottom = '0px';
        t = setTimeout(function() {
            playerBar.style.bottom = '-' + playerBar.clientHeight + 'px';
        },3000);
    }

    document.removeEventListener('DOMContentLoaded',doFisrt,false);
    document.addEventListener('DOMContentLoaded',doFisrt,false);
    //window.addEventListener('load',doFisrt,false);

}
