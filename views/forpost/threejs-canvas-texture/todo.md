# threejs-canvas-texture todo list

<!-- SX - Object Loader Section -->
I think it would be a good idea to have a section on the Object Loader and the JSON format used for that and the subject of data urls as the values for images in such a data format.

## () sx-1-objectloader-images
* () basi demo of adding images with canvas and then creating JSON data to be used with the Object Loader.


<!-- S4 - LOOP SECTION -->

## () - s2-3-loop-uv
* () loop example that involves static canvas texture, but updating uv attribute over time

<!-- S3 - CANVAS MODULE SECTION -->

## () - canvasjs - r3
* () texture.magFilter and texture.minFilter = THREE.NearestFilter, should be the default
* () default values for translate that can be adjusted as needed see 'pxa' from r0 of uvmap-cube.js
* () no text select event for what this is used to create and inject canvas directly as dom elements
* () DRAW.grid\_rgb method that will use an rgb data array rather than palette array

<!-- S2 - DATA TEXTURE SECTION -->

<!-- S1 - BASIC SECTION -->

<!-- r146 update -->

## () - update all remaining demos to r146 style
* () all demos after basic section updated to r146 style

<!-- DONE -->

## ( done 12/20/2022 ) update basic examples to r146
* (done) have all basic examples use r146
* (done) use setSize\(x,y, false\)
* (done) use webgl 1 renderer
* (done) use magFilter and minFilter for all basic examples
* (done) new arguments for size for helper functions basic example
* (done) draw functions section for helper functions example

## ( done 12/17/2022 ) - s3-4-canvasjs-grid-palette
* (done) start new grid-palette demo to test out new palette draw feature of r2

## ( done 12/17/2022 ) canvasjs - r2
* (done) DRAW.grid\_palette added from palette\_grid method from threejs-examples-uvmap-cube-canvas-update.
* (done) base draw grid helper function for DRAW.grid\_palette and draw_rnd
* (done) willReadFrequently bool to true
* (done) using ctx ref in UPDATE.dual and toDataTexture
* (done) parse state data helper for create method
* (done) can use lz-string if there to work with

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