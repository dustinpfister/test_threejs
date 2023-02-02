# proto lines deterministic todo list

## () - r1 of project
* (done) new line-group-sin-grid.js started
* (done) sin grid is an array of lines for two axis where Math.sin is what is used to change the position of the lines over time
* (done) fuller range of values to work with when making a functio to update line style
* (done) create frameData object helper

* () new frameData.biasExp prop
* () frameData.getPer(times) method
* () frameData.getBias(times) method
* () frameData.getBiasExp(times) method

* () new line-group-delta-grid.js file
* () base values of delta-grid include the width count, height count, and width and height size of each tile
* () base values include an array of deltas for each point in each line

## () - update to r146 code style
* (done) update all demos to r146 style
* (done) update r0 and r1 to r146 style
* (done) update r0 plugins to r146 style
* () update r1 plugins to r146 style

## ( done 02/02/2023 ) - main js folder, rename folders
* (done) have a main js folder
* (done) have line-group-r0.js and line-group-r1.js in main js folder
* (done) have plugins-r0 and plugins-r1 folders with all plug in there
* (done) rename demo folders

## ( done 06/10/2022 ) - r0 of project
* (done) start lineGroup module
* (done) cretaing lines from group points array
* (done) forFrame method of rnd3 type working in loop of main.js
* (done) make rnd3 a stand alone file and load it 
* (done) rename startState to soemthing else that makes more sense such as baseData
* (done) have an array of vectors to lerp to for baseData in rnd3
* (done) have a baseData object for a typeObj that can be used to set default values for baseData values for the typeObj
* (done) fix loss of context bug by updating position attribute array rather than calling set by points
* (done) simple built in 'tri' type for line-group.js
* (done) start a new line-group-sphere-circles typeObj plug in
* (done) forline style method