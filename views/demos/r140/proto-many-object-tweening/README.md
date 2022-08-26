# many-object-tweening proto folder

The idea here is to use the alerp geo method I worked out from my threejs example on the subject to work out a new system for animation that has to do with many objects in a DAE file and tweening between them. 

The many objects in the DAE file will contain differing states of the same geometry, and by same geometry what I really mean is a collection of different geometries that all have the same count of vertices actually. So then when I load all of these objects into a project I can use them as source objects to create new objects by cloning the mesh objects, and also geometry and if need be the materials as well. I will then want some javaScript code to transition one state of geometry to another, and also do so in a way in which I can do more than one transition at a time.

The main goal in this prototype then is to just work out the most basic proof of concept before starting the for post folder on this project.

## The DAE file folder

The DAE file used for this proto is [many-object-tweening-1a.dae which can be found in the DAE folder of this repo](https://github.com/dustinpfister/test_threejs/tree/master/views/dae/many-object-tweening).

## The for post folder

Once I got the basic proof of concept working I then as usual wanted to start a for post folder as I will be writing a blog post on this of course. There are a lot of things that I would want to add on beyond just the core idea of transitioning just the position attribute of geometries as I did in the r140 proto. I am going to want to do the same with normal, and also the uv attributes. With that said I might also want to see about transitioning things with textures on top of this.
