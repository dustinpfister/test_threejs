# threejs-examples-breath-module r146 demo todo list

## () r1 - Removal of curves, add plugins
* () gud.a-breathCycle alpha
* () start a plugin system
* () create a breath-curve-collection.js plugin that will be the same functionality of the curve groups built into breath.js
* () remove update curve and update method methods as they should now be pulled out into an optional plugin
* () have a main, generic update hook in place of update curves and update method options

## ( done 03/01/2023 ) - r0-3-hooks
* (done) demo of new hooks feature

## ( done 03/01/2023 ) - r0-1-default
* () have an r0-1-default that is a demo where I have a breath module with default options

## ( done 03/01/2023 ) r0-2-custom
* (done) start with an r0-2-custom that is just the demo from the r146 prototype

## ( done 03/01/ 2023 ) r0 - Starting with the r146 demo, add hooks
* (done) start with what I all ready have in the r146 demo
* (done) have a DEFAULT-HOOKS const
* (done) update api.update to use a HOOKS object
* (done) have a hooks create option
