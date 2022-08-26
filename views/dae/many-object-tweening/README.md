# many-object-tweening

What I want to do with this DAE as well as addtional javaScript code is to make a system where I have many geometry states, each with names, and I can transiation from one to another. Also there is transitioning to another state, while all ready doing so from one or more other states. For example say I have an object where I start out with the geometry of a cube, and then start transitioning into the geometry of a sphere, then about half way stop doing that, and start going into the direction of yet another state such as a cone for example.

I will want to do the following then.

* have many objects in the dae that all have a name.
* have sets of objects like box_1, box_2, ect
* have javaScript that can transition a geometry from one state to another
* have javaScript where one state, can transation to another state, while transitioning to another state

This folder is just the DAE assets, when it comes to havascript code examples I started out with [the r140 proto](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r140/proto-many-object-tweening)