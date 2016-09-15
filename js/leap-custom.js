leapController = Leap.loop({enableGestures:true}, function(frame){

                        var hands       = frame.hands
                        var handsLength = hands.length;

                        if(handsLength === 1){
                            var hand = hands[0];

                            //these are available to other files becuase on global scope
                            xPos = hand.palmPosition[0];
                            yPos = hand.palmPosition[1];
                            zPos = hand.palmPosition[2];

                            handPositionExport = [xPos,yPos,zPos];

                            handExport = hand;

                            // console.log(handExport)
                         
                        };

                });

