window.addEventListener('load', init, false);

  //declare in global scope otherwise wont be able to read hand info
  var handExport = {};

  function init() {

    var oscillator;
    var oscGain;
    var gainNode;
    var delay;
    var source;
    var merger;
    var compressor;
    var canvas;
    var ctx;
    var oscOptions;
    var analyser;
    var leapController;
    var audioContext;
    
    oscOptions= document.getElementById("oscOptions");

    canvas = document.getElementById('visualizer');
    ctx = canvas.getContext('2d');
    gradient = ctx.createLinearGradient(0,0,0,300);
       gradient.addColorStop(1,'#000000');
       gradient.addColorStop(0.75,'#970fe0');
       gradient.addColorStop(0.25,'#64efaa');
       gradient.addColorStop(0,'#ffffff');
     
    audioContext = new AudioContext();

    oscillator = audioContext.createOscillator();
    oscGain = audioContext.createGain();
    oscillator.type = 'sine';
    oscGain.gain.value = 0.5;
    oscillator.frequency.value = 8000;

    gainNode= audioContext.createGain();
    gainNode.gain.value = 0.8;
    delay = audioContext.createDelay();
    delay.delayTime.value = 0.5;

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;

    compressor = audioContext.createDynamicsCompressor();
      compressor.threshold.value = -50;
      compressor.knee.value = 40;
      compressor.ratio.value = 12;
      compressor.reduction.value = -20;
      compressor.attack.value = 0;
      compressor.release.value = 0.25;


//every 100ms run setInterval to check if hand is detected and is open then run openHand function, else (if closed) run closeHand function


setInterval(function(){

  if(handExport.grabStrength < 0.8){
    openHand();
    animateVisualizer();

  } else if(handExport.grabStrength >= 0.8){
    
      // oscillator.frequency.value = oscillator.frequency.value - 1000
      // oscGain.gain.value = oscGain.gain.value * 0.5
      closeHand();
  }

},500)

  function openHand(){
    setInterval(function(){
      oscillator.frequency.value = Math.abs(handExport.palmPosition[0]*25);
      oscGain.gain.value = handExport.palmPosition[1]/500;//DO NOT CHANGE DIVISION FACTOR TO BELOW 300
      delay.delayTime.value = Math.abs(handExport.palmPosition[2]/500);
    }, 50)

    delay.connect(gainNode);
    gainNode.connect(delay);
    
    oscillator.start();
    
    oscillator.connect(delay);
    delay.connect(oscGain);
    oscillator.connect(oscGain);
    oscGain.connect(compressor);
    compressor.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  function closeHand(){
      analyser.disconnect();
      // oscillator.stop();
      oscillator = audioContext.createOscillator();
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

