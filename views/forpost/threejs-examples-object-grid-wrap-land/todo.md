# object grid wrap land - todo

## () - rx - Generate from alt option
* () generate object opt.objectIndices based on opt.altitude
* () have it so that I can just give an altitude array and tw and th are figured from that
* () addObjects method

## () - r3 - scaleAndRotateLandObject helper
* () the scaleAndRotateLandObject method in my basic r3 demo should be built into r3 as a helper

## ( done 08/30/2022) - update folders to align with current state of blog post
* (done) rename sections folders to rx-sectionNumber-sectionName pattern

## (done 08/30/2022 ) - r3 - scaleAndRotateLandObject helper in module as it should be
* (done) can define custom logic for adjusting y values when calling addAt

## ( done 08/27/2022 ) - r3 - DAE asset land-set-one, createSourceObj, load
* (done) start new revision that works with dae file asset
* (done) The standard should be underscores rather than dashes in the dae file like in tween-many example
* (done) have a stanard simular to that of what I made for my tween-many example when it comes to the create source object module
* (done) have a createMesh method like that of what I have in my tween-many example

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
