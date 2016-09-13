var context;
var slider;
var slider2;
var freqDisplay;
var freqDisplay2;
var filter;
var filter2;
var microphone;
var oscillator;
var oscGain;
var gainNode;
var delay;
var source;
var merger;
var compressor;

var canvas;
var ctx;

var analyser;


var leapController;
var handPositionExport =[];


window.addEventListener('load', init, false);

function init() {

  canvas = document.getElementById('visualizer');
  ctx = canvas.getContext('2d');

 gradient = ctx.createLinearGradient(0,0,0,300);
   gradient.addColorStop(1,'#000000');
   gradient.addColorStop(0.75,'#970fe0');
   gradient.addColorStop(0.25,'#64efaa');
   gradient.addColorStop(0,'#ffffff');

//set the window audio context. 

var audioContext = new AudioContext();

//DOM elements
slider = document.getElementById("slider");
freqDisplay = document.getElementById("freq-display");

slider2 = document.getElementById("slider2");
freqDisplay2 = document.getElementById("freq-display2");

oscillator = audioContext.createOscillator();
oscGain = audioContext.createGain();
oscillator.type = 'sawtooth';
oscGain.gain.value = 0.5;
oscillator.frequency.value = 8000;

gainNode= audioContext.createGain();
gainNode.gain.value = 0.8;
delay = audioContext.createDelay();
delay.delayTime.value = 0.5;

analyser = audioContext.createAnalyser();
// analyser.smoothingTimeConstant = 0.5;
analyser.fftSize = 512;

compressor = audioContext.createDynamicsCompressor();
  compressor.threshold.value = -50;
  compressor.knee.value = 40;
  compressor.ratio.value = 12;
  compressor.reduction.value = -20;
  compressor.attack.value = 0;
  compressor.release.value = 0.25;


 document.getElementById('button-play-gum').addEventListener('click', function() {


  // setInterval(function(){ console.log(handPositionExport[0]); }, 1000);  

      // var negative = -23, 
      // positive = -negative>0 ? -negative : negative;


     merger = audioContext.createChannelMerger(2);


     setInterval(function(){
      // if(handPositionExport[0] === !null ){
        oscillator.frequency.value = Math.abs(handPositionExport[0]*25);
        // console.log(handPositionExport[1]);
      
      },50)

     setInterval(function(){
        //DO NOT CHANGE DIVISION FACTOR TO BELOW 300
            oscGain.gain.value = handPositionExport[1]/500;
     },50)

     setInterval(function(){
        
            delay.delayTime.value = Math.abs(handPositionExport[2]/500);
     },50)
     

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
     
     oscillator.connect(delay);
     delay.connect(oscGain);
     oscillator.connect(oscGain);
     oscGain.connect(merger,0,0);
     merger.connect(compressor);
     compressor.connect(analyser);
     analyser.connect(audioContext.destination);

    animateVisualizer();
     
    
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

function animateVisualizer(){
  window.requestAnimationFrame(animateVisualizer);
  data_array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data_array);
  clearCanvas();

  ctx.fillStyle = gradient; // Color of the bars change the math below to tweak number of bars.
  bars = 200;
    for (var i = 0; i < bars; i++) {
    bar_x = i * 2;
    bar_width = 1;

    //below line sets the height of the bar
    bar_height = -(data_array[i] / 2);
    //  fillRect( x, y, width, height ) // Explanation of the parameters below
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    }
}

function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}



}

