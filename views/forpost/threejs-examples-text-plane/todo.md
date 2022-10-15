# threejs-examples-text-plane todo list

## () - r2 - TextPlane.load
* () have a TextPlane.load text method than can be used to load one or more raw text files
* () TextPlane.load creates an array of textLines, one for each file.

## () - r1 - Canvas state object, smoothV2 Method
* () A canObj should have textLines as part of the state
* () The move text lines method should take a canObj or plane as the first argument
* () Updated smoothV2 helper to replace smoothY helper

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
