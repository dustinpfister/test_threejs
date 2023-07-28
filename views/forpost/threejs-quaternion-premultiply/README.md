# threejs-quaternion-premultiply

These are the demos for my post on the [premultiply method of the quaternion](https://dustinpfister.github.io/2023/03/31/threejs-quaternion-premultiply/) class. This premultiply method seems to be one of a few core, must know methods for getting started with roations using quaternion objects rather than Euler objects. The premultiply method comes into play when I want to prefrom more than one rotaiton with a quaternion object. For example say I want to rotate a sphere to change the direciton of the axis on which it rotates, and then also rotate that sphere on the axis as well.

## Future Edit Plans

## The Loop Section break down

When it comes to getting into more complex topics like quaternion objects I am starting to think that I might want to break down my ushual animation loop sections into deterministic and stochastic sections. This is somthing that I might need to refine on more before going ahead with it though. Aside from this there is just improving the quality of the exmaples that are all ready in place, these days I am thinking less is more with these demos. Still I do have two demos in the current loop section that are good start points for each of these.


### Threejs DOCS and Directly studying source code


https://threejs.org/docs/#api/en/math/Quaternion

https://github.com/mrdoob/three.js/blob/r146/src/math/Quaternion.js

