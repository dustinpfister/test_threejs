# threejs-curves-cubicbeziercurve3 todo list

## () - s2-3-tracks-full
* () make a full example of tracks now that I have the rotation thing worked out

## () - s1-4-basic-lines
* () start a basic example where the goal is to make a line with a curve object
* () use CubicBezierCurve3 for one curve object with 0.25 and 0.5 alpha lerp for control point locations
* () use QuadraticBezierCurve3 for a curve object with a 0.5 alpha lerp location for the control point
* () use LineCurve3 for one

## ( done 02/11/2023 ) - Control point fix for s1-3-basic-position
* (done) Using 0.25, and 0.75 for alpha values for lerp call in s1-3-basic-position 

## ( done 02/10/2023 ) - s3-1-loop-mesh-pointers
* (done) start a loop section with an example that will be used for video1 for the blog post
* (done) this first loop example will involve having a mesh object for the start point, end point, and control points
* (done) can also have a collecton of mesh objects to place along the curve

## ( done 02/09/2023 ) s2-2-tracks-rotate
* (done) start a simple demo where I just check if I can mutate the vectors of a curve

## ( done 02/09/2023 ) s2-1-tracks
* (done) start an example where I have a few source object options
* (done) each source object is a group with a mesh
* (done) a curve can be set to the userData object of the group of a source object
* (done) the curve of a tack object can be used with the get get world position method of the group to create a curve path
* (done) the curve path can funciton as a track by moving a mesh object that will be a train along the curve path
* (done) create a whole bunch clones of these source objects to create a track
* (done) I will want a helper method for creating track objects from source objects
* (done) array of data for making track objects

## ( done 02/09/2023 ) s1-3-basic-position
* (done) basic example where a curve is used to position objects

## ( done 02/09/2023 ) s1-2-basic-curvepaths
* (done) a path of these curves example

## ( done 02/09/2023 ) - for post folder started
* (done) for post folder started with the r146 demo as the first basic example