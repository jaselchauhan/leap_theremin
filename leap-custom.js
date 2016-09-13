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

                            var xPos = hand.palmPosition[0] * 50;
                            var yPos = hand.palmPosition[1] * 50;
                            var zPos = hand.palmPosition[2] * 50;

                            // console.log(xPos);

                            handPositionExport = [xPos,yPos,zPos];
                            
                            // return handPositionExport;
                        };

                });