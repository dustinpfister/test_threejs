# proto object grid wrap - todo

## () - rx - CLONERS OBJECT, Plugin system
* () start a CLONERS Object that wlll be a collection of cloner methods

## () - rx -
* () have a demo in which I am using a box geometry, cone geometry, and extrude geometry to create base objects that can then be used to create a mounties scene

## () - r2 - plug in system, spaceW + spaceH
* have a spaceW and spaceH option in place of just space option
* start a plug in system for effects

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