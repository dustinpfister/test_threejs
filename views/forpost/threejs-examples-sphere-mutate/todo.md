# threejs-examples-sphere-mutate todo list

## () - r3 - non indexed example
* () make the geometry a non indexed geometry
* () have a multi step animation process
* () step 1: have a spheres radius go from zero to a certain target unit length
* () step 2: have a whole bunch of triangles explode outward from the center of the sphere
* () fixed seam normals in r2, but I might also want to fix the pole normals

## () - r2 - seam
* (done) start with the r1 example
* (done) see about having a way to find out if a vertex index is at a seam or not
* (done) make sure that all seam index share a common value for new unit length
* (done) start a helper function for updating geo based on what I have working this far
* (done) start a module form of what I have here as I am thinking that is what I want to have moving forward with this project
* (done) see about having an option for the update method where I can pass a custom function for creating deltas for each point
* (done) if I have a module from I will want to make a few demos actually one will be just like the r1 demo, but without the seam!
* (done) I may need two functions for update method options, one for the poles and the other for everything else
* (done) I will want more options for the create method
* (done) see about fixing bug with normals along the seam



* () have a get point helper function
* () use get point helper in update method

* () I will want to be able to set the type of material used for the create option
* () might want to go with an object form for the create options

* () have another demo of the module that is a sin wave effect
* () maybe have another demo that makes use of curves?

## ( done 10/10/2022 ) r1 - buffer attribute methods
* (done) new example in which I am using the buffer Attribute methods

## ( done 06/10/2022 ) - r0 of sphere mutation example
* (done) first version of the example done