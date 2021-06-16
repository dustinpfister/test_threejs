# todo list for beta_world.js

### 0.x.0 - Ray-casting for getting position on sphere

A major part of the beta world has to do with just positioning objects relative to the surface of the world sphere. The position object method that I have thus far seems to work okay, but there may be other ways of doing the same thing that might have some kind of advantage. Ray-casting might prove to be a better way to go about doing this when it comes to surfaces of Mesh objects in general. I touched based on this subject, but it might be something that I will want to explore more.

* When it comes to other ways to position something on a sphere, another solution might involve ray casting
    https://stackoverflow.com/questions/54491088/wrap-threejs-mesh-on-another-mesh

### 0.2.0 - Create Object wrapper method

One problem that I seem to be running into so far has to do with setting the orientation of a Mesh, or group in relation to the world. One way might be to rethink how I am making my models to begin with, but I think a better solution might be to have a kind of object wrapper method that creates and returns a special kind of group. One function of this special kind of group would be that I can always call the look at method of the group to have the group point to the center of the world. It is then just a question of setting the proper orientation of what is inside the group as a child, just once, or as needed, independent of the object wrapper group.

* see about creating an object wrapper method

### (6/16/21) 0.1.0 - method for position objects

When it comes to making this project something more than a fancy way to create and return a Sphere, one majot method that I am going to want to have is a position object method. In time I might want to have a few options and abstractions when it comes to this, but I have to start somewhere.

* (done) create a method that can be used to position objects relative to the surface of the beta world
* create a ref to worldSphere in userData of main world group

### (6/11/21) 0.0.0 - Just create and return a sphere

Just a crude starting point for now nothing fancy, so just create and return a sphere. However design things in a way in which there is room for expanding a public API of course.

* (done) For now I will just want a model that will create and return a sphere that is a given set size