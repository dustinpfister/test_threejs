# threejs-extrude-geometry todo list

<!-- LOOPS -->

## () - sx-1-loops-hole
* () just create a shape with many holes
* () create a few of these shapes
* () rotate the shapes around in the scene

<!-- SVG -->

## () - sx-1-svg-fromnodes
* () I would like to have a basic example of parsing shapes from svg to use with extrude geometry
* () this demo should be using nodes hard coded into html

<!-- CUSTOM UV GENERATOR SECTION -->

## ( ) - s2-3-uvgen-wall
* () start with the code from s2-2-uvgen-top
* () work out more logic to help with the process of what to do with wall uvs

## ( ) - s2-4-uvgen-scalepos
* () start with code for s2-3-uvgen-wall
* () add features to help with setting the scale for top parts
* () use z vertex values to find out if it is a top or bottom part
* () set the positions of top parts
* () set scale and position for wall parts also

## () - s2-5-uvgen-updatecanvas
* () I should be able to find a way to use the same vector2 objects as a way to darw to the canvas element



<!-- EXPAND BASIC SECTION -->

## () - s1-5-basic-curvepath
* () create a 2d curve path
* () call getPoints or getSpacedPoints to create a v2array
* () pass the v2arary to THREE.Shape.

## () - s1-4-basic-options
* () I should have at least one basic example of the options object
* () this can just be an example in which I adjust bevel settings

## () - s1-3-basic-hole
* () have a hole in a shape.

<!-- DONE -->

## ( done 06/14/2023 ) - s2-2-uvgen-top
* (done) I should be able to find a way to get the trianges of the topuvs both front and back position in a good way
* (done) I will want to create a helper funciton that will return a UV Generator Object
* (done) this helper function should take the Shape object as an argument
* (done) use the shape object to get the min and max axis values
* (done) make a new shape object

## ( done 06/14/2023 ) - s2-1-uvgen-start - custom options
* (done) do away with the bevel for these demos

## ( done 06/13/2023 ) - s2-1-uvgen-start
* (done) I would like to start a Basic uv generator section
* (done) start with a uv mini map demo that I made for threejs-buffer-geometry-attributes-uv
* (done) work out a start point for the custom UV Generator option.

## ( done 06/13/2023 ) - s1-2-basic-path
* (done) basic demo in which I use a 2d path in place of passing a v2array to THREE.Shape

## ( done 06/13/2023 ) - s1-1-basic
* (done) start a basic example of the extrude geometry