# threejs-object-loader todo list

<!-- S4 - MANAGER -->

I should have a section in which I am using the loading manager to load many files

## () s1-2-manager-many
* () basic many files example using the loading manager


<!-- S3 MATRIX4 -->

Looks like the toJSON method of the object3d class will export matrix values in the JSON, but not position, rotation, scale, or quaternion keys. So I might want to start a section on the use of matrix4 objects to see if I can address some issues with this.

## () s3-1-matrix4-compose
* () start with the source code of the s1-2-basic-json-create demo
* () see about using the matrix4 compose method to fix this

<!-- S2 - TRI12 -->

I would like to have a section on my tri12 butterfly. I can write about the state of the 0.json file of set1-object, as well as additional code that makes use of it. This allows for branching off into a whole lot of other topics that have to do with animation and so forth which would prove to be a great advanced subject for this post.

## () s1-1-tri12-butterfly
* () first demo in which I which I write about butterfly demo


<!-- S1 - BASIC SECTION -->

<!-- DONE -->

## ( done 07/20/2023 ) - s1-3-basic-load-one file
* (done) demo in which I load one external json file of an object

## (done 07/20/2023 ) - s1-2-basic-json-create
* (done) demo in which I create a json string from an object
* (done) this time I would like to do so with a geometry created from THREE.BufferGeometry
* (done) try using the copy method of buffer geometry from a built in one to see if it ill get the result I think it will
* (done) In any case I would like the type for the geometry to be BufferGoenetry for this one

## ( done 07/19/2023 ) - s1-1-basic-json-string
* (done) start for post folder
* (done) start first demo for this post that has to do with creating an object from a hard coded json string