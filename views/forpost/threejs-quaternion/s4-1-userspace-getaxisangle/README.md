# userspace-getaxisangle

This demo is to have a method that I can use to get the axis angle of a quaternion in the event that it is not known.

```js
const getAxisRadianFromQuaternion = (q) => {
    return 2 * Math.acos( q.w );
};
```

There is a lot of great methods to work with in the built in prototype. However often I have found that there might be one or more methods that might be missing. Maybe they should be baked into the actual prototype, or maybe they should remain as user space additions in the various little projects that people such as me make when writing additional code that runs on top of threejs. 
