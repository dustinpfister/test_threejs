# threejs-examples-count-down todo list

## () r1 of count-down.js, dae loader removed, scene object for source
* (done) use a scene object for source objects rather than a plain old javaScript object
* (done) update default source object to new default scene object
* (done) DEFAULT WIDTH const
* (done) digits option renamed to digitCount
* () DEFAULT DIGIT COUNT const
* (done) default time strng and be an empty string, the first call of the set method in the create methid will deal with that

* () remove the built in dae loader

* () I will still want to have a custom cloner method to use, but this should maybe be indemo code

```
  see the temp fix version of r0 in the js folder of videoground-beta-world
```

## ( done 01/19/2023 ) using cd4-nums.dae for dae-many demo
* (done) using the cd4-nums.dae file for dae-many demo
* (done) placing the colon object in the scene

## ( done 12/23/2022 ) r0-3-many-files
* (done) demo in which I am loading a dae file for just numbers
* (done) loding another dae file for the reast of the scene

## ( done 12/23/2022 ) - final r0 form
* (done) DAE loader method built in
* (done) I want to bake in the core funciton of DAE\_on\_loaded\_item as part of the load DAE Process
* (done) So then DAE\_loader should PARSE A SOURCE\_OBJECTS
* (done) remove calls of add lines, and make it a public method
* (done) I want to be able to load more than one DAE File
* (done) DAE\_on\_loaded\_item method can loop children and set objects that way
* (done) test out that textures work out okay with DAE Files by making a demo that loads one DAE each for numbers and other objects

## ( done 12/21/2022 ) - r0-2-dae-uvmap-canvas - add ground mesh
* (done) add ground mesh object
* (done) other texture for ground mesh object

## ( done 12/20/2022 ) - r0-2-dae-uvmap-canvas
* (done) use r2 of canvas module for this one
* (done) make textures to worm with uv maps of numbers

## ( done 12/20/2022 ) - r0 - from demos
* (done) start for post folder with state of count-down.js used for r146 demos
