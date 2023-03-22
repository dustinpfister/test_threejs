# quaternion-euler-gimbal-lock r146 demo

For this demo I would like to explore what the deal is with gimbal lock when it comes to using the Euler class to rotate objects, and how the use of quaternion helps with this. I followed a description from a Wikipedia article and have found what the deal is with eulers. As a mesh object that is like that of an airplane pitches up to 90 degrees, changes in yaw are lost. In other words it would seem that yaw becomes a new kind of roll.

### RESOURCES

```
https://en.wikipedia.org/wiki/Gimbal_lock
```

```
Consider a case of a level-sensing platform on an aircraft flying due north with its three gimbal axes mutually perpendicular (i.e., roll, pitch and yaw angles each zero). If the aircraft pitches up 90 degrees, the aircraft and platform's yaw axis gimbal becomes parallel to the roll axis gimbal, and changes about yaw can no longer be compensated for.
```