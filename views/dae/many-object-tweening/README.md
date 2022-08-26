# many-object-tweening

What I want to do with this DAE as well as additional javaScript code is to make a system where I have many geometry states, each with names, and I can transition from one to another. Also there is transitioning to another state, while all ready doing so from one or more other states. For example say I have an object where I start out with the geometry of a cube, and then start transitioning into the geometry of a sphere, then about half way stop doing that, and start going into the direction of yet another state such as a cone for example.

I will want to do the following then.

* have many objects in the dae that all have a name.
* have sets of objects like box_1, box_2, ect
* have javaScript that can transition a geometry from one state to another
* have javaScript where one state, can transition to another state, while transitioning to another state

## The r140 prototype

This folder is just the DAE assets, when it comes to javascript code examples I started out with [the r140 proto](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r140/proto-many-object-tweening). The main goal there was just to get the basic proof of concept that I had in mind working.

## The for post folder

Once I got the basic proof of concept working I then as usual wanted to start a for post folder as I will be writing a blog post on this of course. There are a lot of things that I would want to add on beyond just the core idea of transitioning just the position attribute of geometries as I did in the r140 proto. I am going to want to do the same with normal, and also the uv attributes. With that said I might also want to see about transitioning things with textures on top of this.
