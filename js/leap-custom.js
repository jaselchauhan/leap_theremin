
leapController = Leap.loop({enableGestures:true}, function(frame){

                        var handsLength = frame.hands.length;
                        var hand1 = frame.hands[0];
                        var hand2 = frame.hands[1];

                        // if(handsLength === 2) 
                        //   {console.log("both hands recognised", frame.hands);}

                        // tell if left or right hand. 1 hand only
                        if(handsLength === 1){
                            var hand = frame.hands[0];

                            // console.log(hand.type, hand.palmPosition);}

                            //these are available to other files becuase on global scope
                            xPos = hand.palmPosition[0];
                            yPos = hand.palmPosition[1];
                            zPos = hand.palmPosition[2];

                            // console.log(xPos);

                            handPositionExport = [xPos,yPos,zPos];
                            
                            // return handPositionExport;
                        };



                });

//set up for a theremin
//right hand y axis for gain, left hand x-axis for frequency
//change scale so more powerful gain on top and bottom end.
