# threejs-canvas-texture todo list

## () - sx-x-cigrid section
* () start a color index grid section

## () - s2-3-loop-uv
* () loop example that involves static canvas texture, but updating uv attribute over time

## () sx-texture section
* () I will want to stat a section on TEXTURE class features such as flip warp ect

## () canvasjs - r2
* () willReadFrequently bool to true
* () add palette_grid method from threejs-examples-uvmap-cube-canvas-update as built in draw method.
* () default values for translate that can be adjusted as needed see 'pxa' from r0 of uvmap-cube.js
* () no text select event for what this is used to create and inject canvas directly as dom elements

* () update curent examples to work with r2

## ( done 10/14/2022 ) - s3-3-canvasjs-textplane
* (done) have a textplane demo

## ( done 10/14/2022 ) - s3-2-canvasjs-rnd
* (done) start a demo that makes use of the rnd built in draw method

## ( done 10/14/2022 ) - s3-1-canvasjs-basic
* (done) This just needs to be a functioning hello world example of r1 of canvas.js
* (done) make this one on the square built in draw function

## ( done 10/14/2022 ) - canvasjs - r1
* (done) start the file based off of the example in the basic section
* (done) have a 'canvas', and 'dual' update mode
* (done) 'canvas' update mode will just update the canvas texture
* (done) 'dual' update mode will update the canvas texture AND the data texture 
* (done) refine the square method so that I can have more than one square in the canvas
* (done) have it so that I can set linewidth, cx, cy, size, and strokeColor, and fillColor for each square

## ( done 10/11/2022 ) - fix up basic canvas module example
* (done) have no function for createing a mesh, make that a helper in the demo
* (done) have an update funciton for the module
* (done) canObj.palette for setting colors
* (done) more than one built in option for draw methods
* (done) can give a string value for draw method as a way to choose built in methods

## ( done 10/10/2022 ) - s2-3-datatexture-rotate
* (done) example that has to do with rotation of data texture source by copying to a canvas element, and then using ctx.drawImage

## ( done 10/09/2022 ) - new s2-x-datatexture section
* (done) rename loop examples
* (done) s2-1-datatexture-from - canvas texture from data texture
* (done) s2-2-datatexture-to   - canvas texture to data texture

## ( done 10/04/2022 ) combine animation examples
* (done) combine both animaiton examples into one section
* (done) have examples all as one file
* (done) doc body default
* (done) use let and const
* (done) comments

## ( done 10/03/2022 ) new basic section of three examples
* (done) combine helper function example and current basic example into new section
* (done) have a s1-1-basic example

## ( done 10/03/2022 ) - animation and material index
* (done) start another example based off of the animation example but now have more than one texture for the same cube

## ( done 06/28/2021 ) - needed improvements of s3, and s4 examples
* (done) The create canvas helper function in s3 should return an object that contains references to the canvas, and context.
* (done) s3 example should show a basic example of the state object
* (done) The s4 example should also make use of a canvas helper function.

## ( done 06/27/2021 ) - first state of for post folder
* (done) copy over current source code examples to new section folders for them
* (done) just make some quick simple changes to current section examples
* (done) update post to reflect current state of this forpost folder