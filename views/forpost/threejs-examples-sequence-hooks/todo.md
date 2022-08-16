# threejs-examples-sequence-hooks todo list

## Known problems
* () - #0 partPer values end up being 1 which cuases undesired effects 

## () - r2 - 
* () see about having a getSinBias method
* () see about making some of the public methods private helpers

## () - r1 - have an r1 of the module with getBias, getPer methods, bugs fixed, ect
* (done) I want a seq.getPer
* (done) have a public getPer method that will take n, d, and count value
* () see about fixing bug with partPer values getting a 1 value
* () I will want a seq.getBias methods
* () have a public getBias method like the getPer method

## ( done 08/16/2022 ) - new r0 basic example
* (done) rename current basic r0 example to s1-3-many
* (done) start new s1-1-basic that is just a basic starting example

## ( done 08/16/2022 ) - new r0-bug example
* (done) start an s1-2-part-per example

## ( done 05/12/2022 ) - first state of for post folder
* (done) start an r0 folder for this example using the source code from the r135 prototype demo
* (done) seqHooks.setFrame method will now take a seq, frame, and maxFrame arguments as a way to update
* (done) add a seqHooks.setPerValues method that can be used to set per values from secs values
* (done) I will want a create method for this
* (done) see about adding data objects that can be created for each seq object
* (done) in the demo have an effect where I am using nested seq objects
* (done) I will want an option where I can disable setPerValues for the create method
