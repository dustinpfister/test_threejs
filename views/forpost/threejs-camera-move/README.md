# threejs-camera-move

I have a number of examples worked out here that just have to do with the subject of moving a camera around in threejs. These examples are then something to which I am writing about in greater detail in my [blog post on this subject of camera movement in threejs](https://dustinpfister.github.io/2019/12/17/threejs-camera-move/).

### Camera Objects and the Object3d class

The camera object is one of many objects based off of the object3d class, so by learning to move a camera, one also learns how to move objects in general. The main property of interest with this would be the position property of the object3d class based camera object that contains an instance of the Vector3 class. The x, y, and z values of this vector3 class can then be directly mutated as one way to go about moving the camera around. However there are also a wide range of vector3 class property methods that come in handy for this sort of thing as well of course.



