# threejs-examples-sphere-mutate todo list

## () - r3 - non indexed example
* () make the geometry a non indexed geometry
* () have a multi step animation process
* () step 1: have a spheres radius go from zero to a certain target unit length
* () step 2: have a whole bunch of triangles explode outward from the center of the sphere

## () - r2 - seam
* (done) start with the r1 example
* (done) see about having a way to find out if a vertex index is at a seam or not
* (done) make sure that all seam index share a common value for new unit length
* () start a helper function for updating geo based on what I have working this far
* () see about having an option for the update method where I can pass a custom function for creating deltas for each point
* () I may need to functions for options for the update method, one for the polls and the other for everything else
* () start a module form of what I have here as I am thinking that is what I want to have moving forward with this project

## ( done 10/10/2022 ) r1 - buffer attribute methods
* (done) new example in which I am using the buffer Attribute methods

## ( done 06/10/2022 ) - r0 of sphere mutation example
* (done) first version of the example done