# threejs-examples-svg-movement todo list

## () - r1 - revision 1 of the module
* () have an SVGMove.createCamera movement
* () have a scale useString that can set scale of objects
* () maybe path data for perspective camera values like zoom?

## () - r0 - lines demo
* () demo of create lines feature

## ( done 09/23/2022) - r0 - lookat demo
* (done) start a r0 demo of the lookat feature

## () - r0 - objects demo
* () mesh object created by just calling createMesh
* () mesh object created by passing a mesh object
* () mesh object created with geo and material given

## () - r0 of module
* (done) have an SVGMove.createMesh method
* (done) have an SVGMove.setToAlpha method
* (done) SVGMove.setToAlpha will set x,y, and z for position
* (done) SVGMove.setToAlpha will also set rotation based on look at values
* (done) have a general SVGMove.useObj method where I can just pass any object I want to use

* (done) update SVGMove.createMesh so that I can give an options object
* (done) SVGMove.createMesh options object can be given a geometry || conName and arguments array
* (done) SVGMove.createMesh options object can be given a material, default can be normal material


* () SVGMove.createLines to get a vishual idea of what is going on

## ( done 09/23/2022 ) - basic example changes
* (done) change box1-xz to box1-pos-xz, and do the same for y values
* (done) change all basic examples to work with new stanard for svg element ids
* (done) new helpers for basic-lerp example

## ( done 09/22/2022 ) - basic-lerp example
* (done) addtional basic example where I am working out lerp points between vector2 values
* (done) in this example I should also set the y value

## ( done 09/22/2022 ) - basic-xz example
* (done) have a basic xz only movement example