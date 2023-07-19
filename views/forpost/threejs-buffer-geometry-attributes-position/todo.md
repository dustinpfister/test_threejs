# threejs-buffer-geometry-attributes-position todo list

<!-- EXTENDS SECTION -->

## () - sx-1-extends-lathegeometry
* () start a section on the subject of extending built in geometry, starting with lathe geometry

## () - sx-2-extends-buffergeometry
* () demo in which I am making a whole new geometry function by extending the base buffer geometry class

<!-- MORPH ATTRIBUTES SECTION -->

## () - sx-1-morph-basic
* () start a new section on using morph attributes to update position

<!-- V2 ARRAY SECTION -->

## () - sx-1-v2array-shape
* () start a v2array section using shape, and shape geometry

## () - sx-2-v2array-extrude
* () extrude geometry demo

## () - sx-2-v2array-lathe
* () lathe geometry demo

<!-- s1 - CUSTOM TRIANGLE SECTION -->

## s1-4-customtri-index
* () the focus here with this one should be on the use of an index

<!-- s2 - BOX GEOMETRY SECTION -->

<!-- s3 - V3 ARRAY SECTION -->

<!-- s4 - CURVES SECTION -->

<!-- s5 - FROM JSON SECTION -->

<!-- s6 - LOOP SECTION -->

<!-- DONE -->

## ( done 07/19/2023 ) s1-3-customtri-vertexorder
* (done) This should be a demo where the focus is on the vertex order
* (done) have a single triangle with set values for x,y,z of all three points
* (done) have another triangle with the same point values, but a different order of them resulting in the other side being rendered
* (done) for each geometry I will want to change the order of the points in the position array
* (done) I will want for this to be a loop

## ( done 06/04/2023 ) - s5-1-fromjson-customtri
* (done) start a new section on loading from external json file

## ( done 06/04/2023 ) - s4-3-curves-update
* (done) curves demo in which I update the curve and geometry over time
* (done) can do so with a single quadratic curve
* (done) move the start and end points around in a circle
* (done) set setfrompoints to create the geo, but directly mutate the position attribute to update

## ( done 06/04/2023 ) - s4-1-curves-setfrompoints
* (done) rename s1-1-curves t0 s1-2-curves-setattribute
* (done) I think I should start out this section with a demo that makes use of the set from points demo

## ( done 05/30/2023 ) - s4-1-curves
* (done) start an example where I create a curve to use as a way to create a position attribute
* (done) rename loop example folders

## ( done 05/09/2023 ) - move files, r146 style
* (done) move js file to root of demo folders
* (done) r146 style

## ( done 10/06/2022 ) - s2-4-boxgeometry-nonindexed
* (done) start a n example where I pull apart a geometry that is non indexed and thus has an array size of 108.
* (done) have two mesh objects one indexed and the other not
* (done) see about break all the triangles out into space 

## ( done 10/05/2022 ) - s4-3-loop-boxgeometry-vert
* (done) animation example based on the vert helper example

## ( done 10/04/2022 ) - s4-2-loop-lerpgeo
* (done) lerp all points example based off of lerpgeo function

## ( done 10/02/2022 ) - expand s3-4-v3array-applyeuler
* (done) start example that makes use of apply Euler

## ( done 10/01/2022 ) s3-points - section on vector3 arrays
* (done) geometry from v3array with set from points
* (done) v3array from geometry example
* (done) update from v3array example

## ( done 09/28/2022 ) new basic section
* (done) start a new basic section that will be about making a geometry from the ground up.
* (done) for first demo just use the points constructor
* (done) have a mesh example and use compute vertex normals, and set clean defaults for uv attribute

## ( done 09/28/2022 ) clean up and combine examples
* (done) update all examples to use cont and let
* (done) update all examples to use document.body as default for attachment element
* (done) update comments for all examples
* (done) combine s1 - s3 as s2-box-geometry section examples
* (done) rename s4-loop to s3-1-box-geometry

## ( done 08/23/2022 ) - start for post folder from demos
* (done) start the for ppst folder from the demos in the r127 folder
