# threejs-examples-text-plane todo list

## () - rx - TextPlane.load
* () have a TextPlane.load text method than can be used to load one or more raw text files
* () TextPlane.load creates an array of textLines, one for each file.

## () - rx - Control Over Wrapping
* () I should be able to turn wrapping off and on 

## () - rx - canvas layers, more than one map
* () adding methods that help to abstract things that have to do with having not just text, but also one or more background layers
* () I will want to have some kind of system where I have more than one canvas object for an addtional background texture
* () can set up canvas objects for map, emissveMap, alphaMap
* () default material should now be phong

### () - r2-x-transtext
* () demo where I amm adjusting the trans state value use in the draw method
* () I will want to have maybe to planes one in which the effect is disabled and the other showing this difference

## () - r2 - Position attribute, main update method, smoothV2 helper
<!-- canvas and tween many-->
* () I might want to see what I need to improve with the canvas module first and if so use the latest revision for that
* () I will want the latest revision of tween many as well for this
<!-- update geometry -->
* () I will want a system for updating the position attribute of a plane geometry over time
* () I will want to use tween many with the position attribute update system
* () I would like to have an option for waves
* () I would like to have an option that involves going from a plan state to an 'over the surface of a sphere state'
<!-- new main update method -->
* () The move text lines method should take a canObj or plane as the first argument
* () updating of the canvas object should happen in the update method
* () TextPlane.update should just take a canObj or mesh as the first argument, and then an alpha value as the second
* () TextPlane update should also be able to update the state of the text lines that are used
<!-- move text lines method -->
* () move text lines method should just be an TextPlane.update method
<!-- new smoothV2 helper -->
* () Updated smoothV2 helper to replace smoothY helper
* () smoothV2 helper can still move text along up and down just as before
* () smoothV2 helper can also move text left and right of course as well as any direction depending on dx and dy values
<!-- create plane -->
* () can pass plane section options to the create plane method
* () can change what material is used from that of basic
<!-- draw method-->
* () update the draw method used to allow for a state value that can be used to adjust a transparency effect



## r1 - Varible text size
* () I will need a new smoothY method that will work well with varible font size
* () new createTextLines method that will return an array that also contains style info for each line



## ( done 10/15/2022 ) - r0-3-customdraw
* (done) have an example in which I am using a plane geomerty but outside the module
* (done) the reason why is becuase I am using a custom canvas object and draw method for this plane

## ( done 10/15/2022 ) - r0-2-sphere
* (done) try out creating a can object directly and use it with a sphere

## ( done 10/14/2022 ) - r0-1-textplane
* (done) just one test demo for r0 that shows it working okay

## ( done 10/14/2022 ) - r0 of module
* (done) I will want a method that will break text down into lines
* (done) EOL conversion
* (done) wrap method does not work with long words, see about using chunk and flatten like methods maybe?
* (done) have a text-plane-r0.js file
* (done) palette can be used to set colors
* (done) clean rect and then fill so that I can have a transparent background
* (done) can set canvas update mode when creating canvas object
* (done) fix up make plane method so that I can just call that to set up a plane mesh with canvas object 

## ( done 10/14/2022 ) - for post folder started
* (done) started for post folder with the canvas texture module example
