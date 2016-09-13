var context;
var slider;
var slider2;
var freqDisplay;
var freqDisplay2;
var filter;
var filter2;
var microphone;
var oscillator;
var gainNode;
var delay;
var source;
var merger;

var videoStream = null;
var video = document.getElementById("video");

var audio = new Audio();
audio.src = 'track2.mp3';
audio.controls = true;
audio.loop = true;
audio.autoplay = false;
audio.volume = 0.1;

window.addEventListener('load', init, false);

function init() {

 

//set the window audio context. 

var audioContext = new AudioContext();

document.getElementById('audio_box').appendChild(audio);

//DOM elements
slider = document.getElementById("slider");
freqDisplay = document.getElementById("freq-display");

slider2 = document.getElementById("slider2");
freqDisplay2 = document.getElementById("freq-display2");

// var videoStream = null;
// var video = document.getElementById("video");

// slider interaction
if(slider.addEventListener){
  slider.addEventListener("change",onChange);
} else {
  slider.attachEvent("onchange",onChange);
}

if(slider2.addEventListener){
  slider2.addEventListener("change",onChange2);
} else {
  slider2.attachEvent("onchange",onChange2);
}


 document.getElementById('button-play-gum').addEventListener('click', function() {
 
     oscillator = audioContext.createOscillator();
     source = audioContext.createMediaElementSource(audio); 

     merger = audioContext.createChannelMerger(2);

     oscillator.type = 'sawtooth';
     oscillator.frequency.value = 8000; // value in hertz

     gainNode= audioContext.createGain();
     gainNode.gain.value = 0.8;

     delay = audioContext.createDelay();
     delay.delayTime.value = 0.5;

     delay.connect(gainNode);
     gainNode.connect(delay);
     
     filter = audioContext.createBiquadFilter();
     filter.type = "lowpass";
     filter.frequency.value = 3000;
     filter.gain.value = 25;

     filter2 = audioContext.createBiquadFilter();
     filter2.type = "highpass";
     filter2.frequency.value = 3000;
     filter2.gain.value = 250;

     oscillator.start();
     
     source.connect(delay);

     delay.connect(merger,0,1);
     oscillator.connect(merger,0,0);
     merger.connect(audioContext.destination);

    
     
    

   })


 document.getElementById('button-stop-gum').addEventListener('click', function() {
   // Pause the video
   // video.pause();
   // // Stop the stream
   // videoStream.stop();
   merger.disconnect();
 });


function onChange(){
  oscillator.frequency.value = slider.value;
  freqDisplay.innerHTML = slider.value;
}

function onChange2(){
  filter2.frequency.value = slider2.value;
  freqDisplay2.innerHTML = slider2.value;
}



}






//need to add visualizer
// want to add a triangle wave oscillator and add the 2 waves together


