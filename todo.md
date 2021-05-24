# todo list for test_three.js

## threejs-object3d-get-world-position

## threejs-object3d-parent

## threejs-object3d-visible ( 5/24/2021 )
    * (done) start a basic r127 example of object3d-visible

## - find out what they deal is with Object3d.localToWorld
The localToWorld method of Object3d does not seem to do anything in r127 of three.js. If I pass a vector that is relative to an object rather than world space to this method I would expect a new vector that is the equivalent location in world space. However the result is the same vector that was passed to the method. In other words the method seems to do absolutely nothing.