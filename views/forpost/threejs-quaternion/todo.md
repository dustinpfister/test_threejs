# threejs-quaternion todo list


<!-- stochastic loop section -->

## () s6-1-stochastic-premultiply
* () start a stochastic loop example that allows for me to use input to change rotation
* () I will want three mesh objects two of which can be controlled by user input
* () mesh1 object can be used to set a first rotation
* () mesh2 object can be used to set another rotation
* () mesh3 will then be a the first two rotations.

<!-- DONE -->

## ( done 04/03/2023) s2-4-methods-setfromunitvectors
* (done) start a demo on the setfromunitvectors method

## ( done 03/29/2023 ) s4-2-userspace-getaxisvector
* (done) have a get axis demo that is about how to get the axis vector of a quaternion when it is not known

## ( done 03/29/2023 ) s4-1-userspace-getaxisangle
* (done) rename s4-1-loop-sphererotation to s5-1-loop-sphererotation
* (done) much of this can be based on the quaternion-getaxis r146 demo

## ( done 03/28/2023 ) s3-x-euler-gimballock
* (done) have a basic euler to quaternion and back again demo
* (done) have a gimbal lock demo based on the demo that I made for threejs-object3d-rotation

## ( done 03/26/2023 ) s2-3-methods-premultiply
* (done) start a demo on the premultiply method
* (done) make this a loop example
* (done) update axis angle for just q2, while keeping q1 axis angle fixed 
* (done) update axis vector3 only for q1

## ( done 03/25/2023 ) s3-1-loop-sphererotation demo
* (done) start this demo based on the code from my quaternion-rotate-sphere r146 demo
* (done) clean up the code removing stuff that is not used, an add comments

## ( done 03/24/2023 ) s2-1-methods-setfromaxisangle - improve for video1
* (done) Do not rotate the geometry
* (done) see about using just the quaternion and rotation props to get the same outcome
* (done) use rotation to adjust the axis angle, and the quaternion angle to rotate on the axis

## ( done 03/24/2023 ) - start for post folder
* (done) start the post with the current basic, and methods r146 demos