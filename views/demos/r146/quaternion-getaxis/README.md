# quaternion-getaxis r146 demo

It would seem that there is no method to get an axis vector and angle from a quaternion in the event that such values are not known. So for this demo I am looking into this subject. I have found a stack overflow post on this subject that was very helpful and I should link to it in any post in which I might use what I worked out here.


## Resources

I found this stack overflow that is relavent to this topic:

https://stackoverflow.com/questions/62457529/how-do-you-get-the-axis-and-angle-representation-of-a-quaternion-in-three-js

The user posted this as what they are using for this kind of situation

```
export function getAxisAndAngelFromQuaternion(q: Quaternion) {
  const axis = [0, 0, 0];
  const angle = 2 * Math.acos(q.w);
  if (1 - q.w * q.w < 0.000001) {
    // test to avoid divide by zero, s is always positive due to sqrt
    // if s close to zero then direction of axis not important
    axis[0] = q.x;
    axis[1] = q.y;
    axis[2] = q.z;
  } else {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/
    const s = Math.sqrt(1 - q.w * q.w);
    axis[0] = q.x / s;
    axis[1] = q.y / s;
    axis[2] = q.z / s;
  }
  return { axis: new Vector3().fromArray(axis), angle };
}
```

After checking out the other solutions, and reading the comments I starting making somehting in plane javaScript rather than typescript

```js
const getAxisAndAngelFromQuaternion = (q) => {
  let s = 1;
  if ( !(1 - q.w * q.w < Number.MIN_VALUE) ) {
    s = Math.sqrt(1 - q.w * q.w);
  }
  return { axis: new THREE.Vector3(q.x / s, q.y / s, q.z / s), radian: 2 * Math.acos( q.w ) };
};
```

## Break Down into two functions

Seems to me that it might be best to have two funcitons here then. One to get the axis vector in the event that it is not known, and another to get the angle.

```js
const getAxisFromQuaternion = (q) => {
  let s = 1;
  if ( !(1 - q.w * q.w < Number.MIN_VALUE) ) {
    s = Math.sqrt(1 - q.w * q.w);
  }
  return new THREE.Vector3(q.x / s, q.y / s, q.z / s);
};
const getRadianFromQuaternion = (q) => {
    return 2 * Math.acos( q.w );
};
```