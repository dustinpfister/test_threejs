
The idea I have here is to make use of a group of objects that resembale and object with a clear top, bottom, left side, right side, and back. There is then just creating a collection of these objects, and then using vector3 apply euler to positon them in a spherical way around a center point, and calling the lookAt method for each object having it point to the center. 

For each object I am calling lookAt with the same set of arguments lookAt(0, 0, 0), however the idea here is to approce the full function domain when it comes to the apply euler method of the vector3 class. The end goal then is to just get a vishual idea of how the lookAt method will set rotation of an object to show how it works, and also why it is not a golden hammer of a method when it comes to setting object3d rotaiton property values.

