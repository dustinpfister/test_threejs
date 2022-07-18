# object grid wrap land - todo

## () - r3 - Generate from alt option
* () generate object opt.objectIndices based on opt.altitude
* () have it so that I can just give an altitude array and tw and th are figured from that
* () addObjects method

## ( done 07/18/2022 ) - r2 - setDataTextures
* (done) built in data textures method that can be used to quickly add data textures for land tiles
* (done) data textures for built in material
* (done) start a set data textures public method
* (done) can generate more than one texture to use for land
* (done) use seeded random method for texture index values

## ( done 07/18/2022 ) - r1 - new land-grid.js module, corner mesh objects, custom land material, addAt method
* (done) new object-grid-land.js file that will create and return a new grid set up with mesh objects
* (done) create method for land grid module started
* (done) opt object for create method of land module
* (done) have additional source objects for corners
* (done) looks like I will need another kind of inverted corner mesh that is one low point rather than one high point
* (done) MATERIAL_LAND create option
* (done) use data textures for grass for main.js
* (done) fix texture isshue with uvs for slopes
* (done) crackSize option
* (done) demo of adding mesh to cube using boundig box to height of tile
* (done) isSlope bool for userData of each mesh object
* (done) have public addAt method for object-grid-wrap-land that helps with the process of adding any object as a child of a grid location

## ( done 07/14/2022 ) - first version r0 based off of the prototype
* ( done ) start r0 based off of the prototype
