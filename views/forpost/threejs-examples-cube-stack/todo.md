# threejs-examples-cube-stack todo list

## () - s2 - groups for each stack, new effects
* (done) rename EFFECTS.scaleCubes to EFFECTS.scaleCubeGroup
* (done) new EFFECTS.scaleCubes effect that will scale each cube in one or more stacks
* (done) opt.gx should be opt.gw, and opt.gy should be opt.gh
* (done) new system where there is a group for each tile location
* (done) can scale cubes in a way in which the scale changes with stack height
* (done) add hard coded 'get position methods' with a getPOS object like that of effects
* (done) have current getPos method with Math.random be called getPos.random
* (done) have a getPos.seededRandom method
* (done) let getPos.seededRandom be the default getPos method
* (done) have an opt.getPos option for the create method
* (done) have an opt.posArray option that can be used to set positions that way with an array of index values
* (done) getPos can be used as a fallback for any undefined elements in posArray
* (done) posArray can default to an empty array

* main id for a stack object
* uname for groups (with main id)
* uname for mesh obejcts (with main id)

* better control over textures for the plane
* better control over textures for each mesh


* start at least one more effect

## ( done 04/29/2022 ) - s1-first
* (done) start with the source code from camera-orthographic
* (done) have cubes added to a new cubes group that is a child of the main group
* (done) have a CubeStack.applyEffect method that will apply an effect to the state of the cube stack
* (done) have cube stack module use datatex.js
* (done) colors array option

