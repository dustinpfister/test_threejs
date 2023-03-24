# s1-2-basic-xyzw

This is then a demo in which I am directly setting the x,y,z, and w values of a quaternion in a effort to gain a better sense of how to mutate these kinds of objects this way. For now it would seem that the best way to work with these is in fact to use the setFromAxis angle method. Still when it comes to Euler objects I know what the deal is with the value range of the tree components, and I would like to do the same when it comes to quaternions. I made some progress on how to work with this by taking a look at the source code for the Quaternion class. 

This demo is based off of quaternion-xyzw r146 demo, and thus far I can not say I have made many changes

### Threejs source code

What I worked out for this demo is based heavily on the [source code of the set from axis angle method of the quaternion src module](https://github.com/mrdoob/three.js/blob/r146/src/math/Quaternion.js) There is checking out the file directly but I can also save you a trip here as well.

```js
    setFromAxisAngle( axis, angle ) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
        // assumes axis is normalized
        const halfAngle = angle / 2, s = Math.sin( halfAngle );
        this._x = axis.x * s;
        this._y = axis.y * s;
        this._z = axis.z * s;
        this._w = Math.cos( halfAngle );
        this._onChangeCallback();
        return this;
    }
```