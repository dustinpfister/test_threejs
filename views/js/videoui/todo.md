# todo list for test_three.js

## () - 0.1.0 - Fix for ui.js
* see about fidning a fix for using whammy again

## ( done 05/30/2021 ) 0.0.0 - Basic idea working with VIDEOS PATH and videoUI
    * ( done 5/25/2021 ) start a /views/videos/\[videoName\] path
    * ( done 5/25/2021 ) I can choose what version of three.js I want to use in the index.ejs file
    * ( done 5/25/2021 ) update /index.js so that I can view projects that are videos
    * ( done 5/25/2021 ) add a videos link in nav bar
    * ( done 5/25/2021 ) making first video project based off of my hamster-wheel example
    * ( done 5/26/2021 ) have simple frame forward button working
    * ( done 5/26/2021 ) have simple frame backward button working
    * ( done 5/26/2021 ) whammy.js will always be part of the stack for each index.ejs file
    * ( done 5/26/2021 ) have a 'create video' button as part of the video ui
    * ( done 5/26/2021 ) projects in /views/videos folder will be designed in a way to make use of whammy to create webm files
    * ( done 5/27/2021 ) get play button working
    * ( done 5/27/2021 ) main setFrame method in ui.js
    * ( done 5/27/2021 ) display fame/maxFrame in ui
    * ( done 5/28/2021 ) forFrame as an array does not make sense it should just be a single main object
    * ( done 5/29/2021 ) rename main ForFrame object to LoadedVideo
    * ( done 5/29/2021 ) I am going to want to have some way to have more than one sequence, so there should be a sequence array
    * ( done 5/29/2021 ) setFrame needs to set the current sequence index, and then the correct sequence frame index
    * ( done 5/30/2021 ) have a todo_videoui.md file
    * ( done 5/30/2021 ) start and use a /js/videoui/0.0.0/ui.js path for this version of videoui
    * ( done 5/30/2021 ) forFrame method of current sequence gets the sequence object passed to it as the first argument
    * ( done 5/30/2021 ) have a sequence.secsTotal value that is just maxFrame / FPS;
    * ( done 5/30/2021 ) have a sequence.secs value that is sequence.totalSecs * sequence.per
    * ( done 5/30/2021 ) per, bias should be part of sequence object


