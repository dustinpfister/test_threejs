# threejs-lathe-geometry todo list

<!-- LOOP DEMOS -->
## () s3-1-loop-morph
* () have a few geometry objects made from lathe geometry
* () see about using morph attributes to transition between them

<!-- EXTEND LATHE GEOMETRY DEMOS -->

## () s2-2-extend-jefferson
    https://www.monticello.org/research-education/thomas-jefferson-encyclopedia/jefferson-cups/
* () make a jefferson cup geometry constructor
* () default height 6.7 ( 1810 )
* () default rim 8.1 ( 1810 )
* () use cubic bezier curve and linecurve
* () have argumnets for bottom diamater
* () have argumnets to change control points if need be

## () s2-1-extend-capsule
* () start a section on extending lathe geometry starting with capsule geometry
* () even though this is a built in geometry, make a custom class anyway based on the capsule geometry source code

<!-- EXPAND BASIC -->

## () s1-5-basic-path
* () demo using a curve path

## () s1-4-basic-cubic
* () demo using a cubic bezier curve

<!-- DONE -->

## ( done 06/07/2023 ) s1-1-basic-v2array
* (done) new s1-1-basic-v2arary demo to replace the current first basic example
* (done) just have an array of three Vector2 Objects to define the points
* (done) the points can just be from 0,1 to 1,0 to 0,-1
* (done) rename all other basic examples as needed

## ( done 06/07/2023 ) s1-2-basic-ellipse
* (done) use an ellipse directly rather than ArcCurve
* (done) use Mesh Phong Matreial
* (done) use a light source

## ( done 06/07/2023 ) s1-1-basic-arccurve
* (done) start a simple 2dcurve in the form of an ArcCurve
* (done) make a lathe geometry using the curve
* (done) use the mesh normal matreial