# todo list for test_three.js

## VDEOS FOLDER
    * start a /views/videos/[videoName] path
    * projects in /views/videos folder will be designed in a way to make use of whammy to create webm files
    * whammy.js will always be part of the stack for each index.ejs file
    * make vuejs part of the stack ( /views/js/vuejs/x.x.x/vue.min.js )
    * start a /views/js/videos/forframe.js file
    * start a /views/js/videos/ui.js file and use vuejs to help move things along.
    * vuejs, forframe.js, and ui.js should provide a standard interface that allows for me to set the number of frames and to loop forward and backward when it comes to setting the current frame index.
    * the front end ui should also provide a way to create a webm file and save it to a location on the local file system.
    * I can choose what version of three.js I want to use in the index.ejs file
    * update /index.js so that I can view projects that are videos

## DEMOS: threejs-object3d-get-world-position
    * basic world position example that gets the world position of a mesh in a group

## DEMOS: threejs-object3d-parent ( 5/25/2021 )
    * start a basic parent example of a mesh
    * start an example that involves raycaster and getting the group of a mesh

## ( started 5/24/2021 ) DEMOS: threejs-object3d-visible
    * (done) start a basic r127 example of object3d-visible
    * start an example that makes use of object3d visible and transparency
    * start an example that makes use of distance from a point for a mesh that moves

## - find out what they deal is with Object3d.localToWorld
The localToWorld method of Object3d does not seem to do anything in r127 of three.js. If I pass a vector that is relative to an object rather than world space to this method I would expect a new vector that is the equivalent location in world space. However the result is the same vector that was passed to the method. In other words the method seems to do absolutely nothing.