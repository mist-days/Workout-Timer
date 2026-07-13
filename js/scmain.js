// This is a JavaScript file
'use strict';

let count = 0;
let timeID = null;//Flag
let time; //Display count2Time-ed time;
let minutes, seconds;
let dom;
let sounds;
let first;
let timespend;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

//set initial preface. No effect to other functions
function init() {
    if(timeID !== null){
        clearTimeout(timeID);
        timeID = null;
    }
    setTime();

    // Creat Object sounds;
    sounds = {
        start:new Audio('sound/start.mp3'),
        s60:new Audio('sound/s60.mp3'),
        s30:new Audio('sound/s30.mp3'),
        s10:new Audio('sound/s10.mp3'),
        s06:new Audio('sound/s06.mp3'),
        end:new Audio('sound/end.mp3'),
    }
}

//set total time by setting "時間を設置してください:"
function setTime(){
    let minSet = document.getElementById("min-select").value;
    count = parseInt(minSet, 10) * 60;
    // let timespend = minSet;
    timespend = minSet;
    dom = document.getElementById("count"); 
    dom.textContent = count2time(count);
    return count;
}
//change count to return String"00:00";
function count2time(count) {                            
    minutes = Math.floor(count / 60);
    minutes = ("0" + minutes).slice(-2);
    seconds = count % 60;
    seconds = ("0" + seconds).slice(-2);
    time = minutes + ":" + seconds;
    return time;
}
//press the start button to execute function runCountdown();
function startTimer() {
    if(count <= 0){
        setTime();
    }else if(count >0 && timeID == null){
        sounds.start.play();
    }
    
    if(timeID !== null){
        return;
    }
    if(count <= 0){ 
        return;
    }
    runCountdown(count);
}
//receive "count" from setTime ,
// to do the countdown inside function runCountdown()
function runCountdown(){
    if(count <= 0){
        dom.textContent = "00:00";
        clearTimeout(timeID);
        timeID = null;

        //call function to write into the textarea
        recordLog();

        //reset 時間を設置してください to 00;
        document.getElementById("min-select").value = "00";

        return;
        
        //alert("Time Out"):just this line, aler will show repeatedly!
        // alert("Time Out");
        // startTimer(true);
        
    }
    if(count == 30){
        sounds.s30.play();
        count--;
    }else if(count == 9){
        sounds.s06.play();
        count--;
    }else if(count == 1){
        sounds.end.play();
        count--;
        
    }else {
        count--;
    }
    dom = document.getElementById("count");
    dom.textContent = count2time(count);
    timeID = setTimeout(runCountdown, 1000);
}
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedOptions
function recordLog(){
    
        let sportSelect = document.getElementById("sport-select");
        let sportName = sportSelect.options[sportSelect.selectedIndex].text;
        let minSet = document.getElementById("min-select").value;

        if(sportSelect.value ==""){
            return;
        }

        let logTextarea = document.getElementById("record");
        logTextarea.value += sportName + " : " + timespend + "分" + "\n";
        
}

//stop the countdown temorarily.And then press the start button to resume the countdown process
function stopTimer(){
    if(timeID != null){
        clearTimeout(timeID);
        timeID = null; 
    }
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);

// document.getElementById('start').addEventListener('click', e =>{e.start()});



