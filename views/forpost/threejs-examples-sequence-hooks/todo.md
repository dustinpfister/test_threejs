# threejs-examples-sequence-hooks todo list

## Known problems
* ( fixed in r1 ) - #0 partPer values end up being 1 which cuases undesired effects 

## () - r2-x-lookat
* () example in which I am using v3Paths for position and lookat for a camera

## () - r2-3-curve
* () start a curve example
* () make the starting control point value a lerp point half way between start and end
* () I can then just have an addtional vector3 that is a delta from this mid point

## ( done 10/19/2022 ) - r2-2-numbers
* (done) start a demo of using raw number
* (done) use number literal arrays for camera movement

## ( done 10/16/2022 ) - r2-1-literal
* (done) a demo where I am defining arrays of Vector3 objects with array literals and directly calling THREE.Vector3

## ( done 10/19/2022 ) - r2 - v3Paths
* (done) Make all other public methods private helpers 
* (done) use new way of setting global \( this\[\'seqHooks\'\] = \{\} \)
* (done) use let and const in place of var
* (done) start a new 'v3Paths' system that is a way to define the movement of objects by way of Vector3 arrays
* (done) get v3Paths working for objects
* (done) get v3Paths working for main seq object
* (done) lerp mode only if array length is less than max frame
* (done) default key names if none given
* (done) calling set frame method for first time in create method
* (done) can give an array of numbers that will be parses into an array of vector3 objects
* (done) might want a seq.getPos helper rather than using mesh2.position.copy(seq.v3Paths.paths\[\'m2pos\'\] )

## ( done 08/16/2022 ) - r1 - have an r1 of the module with getBias, getPer methods, bugs fixed, ect
* (done) I want a seq.getPer
* (done) have a public getPer method that will take n, d, and count value
* (done) see about fixing bug with partPer values getting a 1 value
* (done) worked out a complex solution for #0, but it will allow for old, new, and custom values for seq.partFrame
* (done) I will want a seq.getBias methods
* (done) have a public getBias method like the getPer method
* (done) see about having a getSinBias method

## ( done 08/16/2022 ) - new r0 basic example
* (done) rename current basic r0 example to s1-3-many
* (done) start new s1-1-basic that is just a basic starting example

## ( done 08/16/2022 ) - new r0-bug example
* (done) start an s1-2-part-per example

## ( done 05/12/2022 ) - first state of for post folder
* (done) start an r0 folder for this example using the source code from the r135 prototype demo
* (done) seqHooks.setFrame method will now take a seq, frame, and maxFrame arguments as a way to update
* (done) add a seqHooks.setPerValues method that can be used to set per values from secs values
* (done) I will want a create method for this
* (done) see about adding data objects that can be created for each seq object
* (done) in the demo have an effect where I am using nested seq objects
* (done) I will want an option where I can disable setPerValues for the create method
