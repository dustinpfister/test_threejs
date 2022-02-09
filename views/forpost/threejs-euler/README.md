# threejs-euler

This is the current set of source code examples that I have together for my [blog post on the Euler class in threejs](https://dustinpfister.github.io/2021/04/28/threejs-euler/). The Euler class is used to create and store a set of Euler angles that can be used for things like setting the orientation of an object in a scene. In fact the rotation property of any kind of object in threejs that is based off of the Object3d class such as a Mesh is an instance of this Euler class. Like that of the Vector3 class which is often used for position rather than orientation, there is an x, y and z value for a Euler class instance but these values are radian values rather than a number value in general.

