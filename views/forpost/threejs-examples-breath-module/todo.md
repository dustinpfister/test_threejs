# threejs-examples-breath-module r146 demo todo list

## () r2 - After hook, Breath Helper
* () after hook option like before hook, only it is called after the current breath part hook
* () BreathMod.helper public Method that will create and return a Mesh Object

## ( done 04/10/2023 ) r1-1-updatehook
* (done) start a new demo for the new before hook feature

## ( done 04/10/2023 ) r1 - Removal of curves, focus more so on just alpha values
* (done) remove all code that adds curves
* (done) have it so that I can define just some hooks, and leave others to default
* (done) add a before hook method that will be called before the current breath part hook
* (done) gud.breathPartsString
* (done) gud.totalTimeString
* (done) gud.timeString
* (done) gud.rest bool, gud.breath bool, gud.low bool
* (done) changed alpha names to be more descriptive

## ( done 03/01/2023 ) - r0-3-hooks
* (done) demo of new hooks feature

## ( done 03/01/2023 ) - r0-1-default
* (done) have an r0-1-default that is a demo where I have a breath module with default options

## ( done 03/01/2023 ) r0-2-custom
* (done) start with an r0-2-custom that is just the demo from the r146 prototype

## ( done 03/01/ 2023 ) r0 - Starting with the r146 demo, add hooks
* (done) start with what I all ready have in the r146 demo
* (done) have a DEFAULT-HOOKS const
* (done) update api.update to use a HOOKS object
* (done) have a hooks create option
