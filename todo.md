# todo list for test_three.js

General todo list for test_threejs

## NODE folder
    * start a /node folder
    * make index.js /node/server/index.js
    * start a /node/make-pkg folder that will be a build tool to help create pkg.js files to use in a web page

## VIDEOS PATH and videoUi
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

    * forFrame as an array does not make sense it should just be a single main object
    * per, bias, and logBias should be part of ffObj
    * play button
    * ffObj.perObj method

### vuejs client for videos path
    * make vuejs part of the stack ( /views/js/vuejs/x.x.x/vue.min.js )
    * start a /views/js/videos/forframe.js file
    * start a /views/js/videos/ui.js file and use vuejs to help move things along.
    * vuejs, forframe.js, and ui.js should provide a standard interface that allows for me to set the number of frames and to loop forward and backward when it comes to setting the current frame index.
    * the front end ui should also provide a way to create a webm file and save it to a location on the local file system.

## PROBLEM: find out what they deal is with Object3d.localToWorld

The localToWorld method of Object3d does not seem to do anything in r127 of three.js. If I pass a vector that is relative to an object rather than world space to this method I would expect a new vector that is the equivalent location in world space. However the result is the same vector that was passed to the method. In other words the method seems to do absolutely nothing.
