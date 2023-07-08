# proto object grid wrap - todo

<!-- r3 and JSM version of module -->

I am sure that I will want the next revision of this module to be in JSM format. I all ready have a work in progress for this that I started in my examples-tri12-scene r152 demo. So be sure to start with that source code as a good start point for this to say the least.

## () - r3 - JSM module format
* () start with the source code that you all ready have in the examples-tri12-scene demo

<!-- DONE -->

## ( done 07/12/2022 ) - r2 - plug in system, spaceW + spaceH
* (done) have a spaceW and spaceH option in place of just space option
* (done) the 'b' value should be part of the data object used in effects
* (done) ud argument for effects
* (done) start a plug in system for loading effects for now

## ( done 05/23/2022 ) - first revision r1 - materials array fix, blank objects, trans effect optional
* (done) update build in clone method to work with array of materials ( see revised file for threejs-plane video)
* (done) Have it so that values like -1 for source object index values will result in no object for that tile index
* (done) can disable trans effect by giving an empty array for new effects create method option
* (done) have a ud.center
* (done) have a ud.distMax
* (done) renamed opt.aOpacity to opt.dAdjust
* (done) have d and da props for objectData
* (done) Have a scale effect

## ( done 05/20/2022 ) - first version r0
* (done) crude start working
* (done) fix issues with setOpacity
* (done) need to go by adjusted position when working out opacity
* (done) have an option for adjusting the opacity effect with respect to the point where it reaches zero
* (done) have a better way to deep clone source objects, add an option for custom deep clone method
* (done) files for main and module
* (done) set position public method