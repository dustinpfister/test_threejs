# threejs-examples-curves-module todo list

## () r2-1-create-geo
* () start a demo in which I am createing geometry over time

## () r2 - create geometry
* () at least one method that has to do with creating geometry with curves

## ( done 01/16/2022 ) r1-3-custom-types
* (done) demo the custom types feature

## ( done 01/16/2022 ) r1-2-alpha-update
* (done) start demo in which I am updating the state of a get alpha over time

## ( done 01/16/2022 ) r1-1-debug-alpha demo
* (done) start a new demo that has to do with looking at other get alpha methods

## ( done 01/16/2022 ) curves.js - r1 - Better get alpha methods
<!-- single main get alpha function -->
* (done) have a main curveMod.getAlphaFunction method to create an array of get alpha functions
* (done) make the two options for creating a curve alpha function the first two 'type' options for curveMod.getAlphaFunction
* (done) when calling a get alpha function I should be able to use it with one, two or three arguments
<!-- Have a few options for types of get alpha functions -->
* (done) have a plain old linear type alpha function
* (done) have a MapLinear alpha function
* (done) have a bias type alpha function
* (done) have a sinBias get alpha function
* (done) have a smoothStep get alpha function
<!-- ac points array in place of grc points -->
* (done) rename grc\_points to ac\_points \( Alpha Control Points \)
* (done) have it so that the ac points is a linear array of numbers
<!-- alpha function state objects -->
* (done) attach a state object to the function that is returned by the getAlphaFunction
* (done) this state object can be used as a way to tweak the state of a get alpha function over time
<!-- custom get alpha types -->
* (done) can pass a function in place of a string as a way to define a custom get alpha function

## ( done 11/18/2022 ) r0-x-qbalpha clean up
* (done) remove code that has to do more with the debug method

## ( done 11/17/2022 ) r0-3-qbalpha demo
* (done) start a demo of the alpha method
* (done) make a debug method for this
* (done) use built in form of get alpha method as well as the debug method

## ( done 11/17/2022 ) r0-2-qbcurvepath demo
* (done) demo of the qbcurvepath method

## ( done 11/17/2022 ) curvesjs - r0
* (done) have a common private helper used by both curveMod.QBCurvePath and curveMod.QBV3Array
* (done) have a curveMod.QBCurvePath method
* (done) build in the get alpha method
* (done) build in a debug method for the get alpha method

## ( done 11/17/2022 ) - start for post folder
* (done) for post folder started
