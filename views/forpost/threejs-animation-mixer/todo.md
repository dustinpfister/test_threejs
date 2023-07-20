# threejs-animation-mixer todo list

<!-- TRI12 SECTION -->

## () s3-2-tri12-butterfly-object
* () If I have an object format version of the butterfly model used that for this demo

## () s3-3-tri12-scene
* () demo in which I am loading many files to create an over all scene

<!-- BASIC SECTION -->

## () s1-3-basic-quaternion
* () basic quaternion demo for local local rotation of objects over time

<!-- TRINAGLE SECTION -->
  The idea that I have with this section is that I will create a custom geometry that is just a single triangle in space.
  To help keep things simple this geometry can just have a position attribute, and THREE.Points can be used in place of mesh
  I would also like to to use strings that follow the JSON Object Scene format 4
  https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4
  
## () s2-2-tri-multi
* () this demo should have more than one animation clip
* () at least one animation clip should have more than one track

<!-- DONE -->

## ( done 07/20/2023 ) - s3-1-tri12-butterfly - JSON text
* (done) updated code to spit out JSON with animations in it

## ( done 07/14/2023 ) s2-1-tri-object
* (done) start with a demo that is just the object and geometry values
* (done) the parse method of THREE.ObjectLoader should work for this
* (done) I just want to work out the basic core idea with this, so just one clip and one track
* (done) the single track of the single clip should mutate the morph target influences

## ( done 07/14/2023 ) s1-2-basic-parse-clip-json
* (done) parse json demo using AnimationClip.parse method

## (done 07/14/2023 ) - s2-1-tri12-butterfly - revise
* (done) remove the canvas texture in favor of using vertex color attribute
* (done) update url to new name with fixed typo 

## ( done 07/13/2023 ) - s2-1-tri12-butterfly
* (done) use the buffer geometry of the bufferfly that has a morph attribute

## ( done 07/13/2023 ) - s1-1-basic-vector
* (done) start a basic example using a single vector keyframe track