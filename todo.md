# todo list for test_three.js

## threejs-object3d-get-world-position
    * basic world position example that gets the world position of a mesh in a group

## threejs-object3d-parent
    * start a basic parent example of a mesh
    * start an example that involves raycaster and getting the group of a mesh

## threejs-object3d-visible ( 5/24/2021 )
    * (done) start a basic r127 example of object3d-visible
    * start an example that makes use of object3d visible and transparency
    * start an example that makes use of distance from a point for a mesh that moves

## - find out what they deal is with Object3d.localToWorld
The localToWorld method of Object3d does not seem to do anything in r127 of three.js. If I pass a vector that is relative to an object rather than world space to this method I would expect a new vector that is the equivalent location in world space. However the result is the same vector that was passed to the method. In other words the method seems to do absolutely nothing.