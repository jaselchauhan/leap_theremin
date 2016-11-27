# leap_theremin

>#### A basic theremin developed for use with the leap motion controller.

![Alt text](/img/profile.png)

###How does it work?:
The leap motion controller measures your hand's x, y and z co-ordinates. The initial oscillated note has been run through a series of audio processors. Specifically, movement change on the x-axis changes the frequency of the note, y-axis adjusts the gain and z-axis adjusts the delay. The frequency response of the sound is also relayed to a canvas to create a visualiser.

###Instructions:
  
* Ensure leap motion controller is connected to computer
* Clone this repo to your local storage
* Start an instance of localhost in root of cloned repo and go to browser
* Guide your hand over the leap motion to begin.
* Guide your hand over the leap motion controller to mould the sound
* To pause sound make a fist with your hand.

###Technologies Used:

* Leap Motion Controller
* Leap JS
* Angular JS
* Web Audio API
* HTML5 Canvas
* Vanilla JavaScript

Please note that this is an MVP designed primarily to test the leap motion controller and experiment around with the awesome API that is Web Audio!


<a href="http://www.youtube.com/watch?feature=player_embedded&v=2AfzzZpq57o
" target="_blank"><img src="http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>
