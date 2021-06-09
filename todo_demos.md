# todo list for test_three.js demos

This is a todo list where I am drafting out ideas for demos that I will include in blog posts on three.js on my website here at github pages.




## 1 - Bones, Animation, and External Files

In order to create a collection of posts on animation it might have to involve creating external files in blender.

### 1.1 - threejs-animation-mixer
    * basic animation mixer example

### 1.2 - threejs-animation-clip
    * basic animation clip example

### 1.3 - threejs-skinned-mesh
    * see about making a basic example of a skinned mesh

### 1.4 - threejs-skeleton
    * basic skeleton example

### 1.5 - threejs-bones
    * (done) see about starting a basic example of a bones created from the examples on the threejs website
    * (done) rename bones demo folder to bones-threejs-site-example.
    * make an actually working basic example of THREE.Bone


## 2 - New example posts

I can always just make more example posts using my current understating of threejs, and JavaScript alone, as well as expand into other libraries and new concepts when it comes to making modules, videos, and applications with threejs as part of the stack.

### 2.1 - threejs-examples-guy-two
    * start a new guy2 model that will have a few more mesh objects compared to guy1
    * guy2 will have 3 mesh objects for each arm rather than just one
    * guy2 will have 3 mesh objects for each leg rather than just one
    * have a Guy2Mod.setWalk method but have it so that it will just move the legs, or that the movement of arms is an option
    * have a method that can be used to move a single arm in many different ways within set range limits
    * do some reading an animation clips and see if they can be used to help with tweening from one state to another




## 4 - More on shapes, extrude Gemoerty

There is maybe a git more to cover when it comes to using the extrude geometry constructor. This can also involve example type posts.

## 4.1 - threejs-extrude-geometry
    * start a basic example of THREE.ExtrudeGeometry




## 3 - More on the Buffer Geometry Constructor.

I should make a series of posts where I am covering more about the buffer geometry class in detail when it comes to attributes, and
various additional features of the class. So the focus here should be on making custom geometry from the ground up, as well as 
messing around with built in geometries such as the THREE.BoxGeomerty, and THREE.Plane geometry

### (started 6/07/2021 ) 3.1 - threejs-buffer-geometry-attributes-position
    * (done) start a basic example on the position property
    * (done) vert helper demo
    * (done) tri helper demo
    * (done) animation loop example using tri helper and position.needsUpdate

### (started 6/08/2021 ) 3.2 - threejs-buffer-geometry-attributes-normals
    * (done) basic example of the normals attribute
    * (done) make a setNormalArrow, and setNormal helper function and create an animation loop
    * example that has to do with light and improved helper methods for attaching arrows for all normals

### (started 6/09/2021 ) 3.3 - threejs-buffer-geometry-attributes-uvs
    * (done) basic example of uvs using a canvas generated texture
    * (done) basic loop example of mutation of uvs

### 3.4 - threejs-examples-sphere-mutate
    * create an example where I am just mutating the positions of a sphere geometry
    * have some texture maps for the sphere

### 3.5 - threejs-examples-plane-mutate
    * create an example where I am mutating the positions of a plane geometry
    * have some texture maps for the plane(s)




## - Random new content

From this point back I was not planing things out on a week by week, or subject basis

### (started 6/04/2021 ) threejs-object3d-layers
    * (done) basic example with just a grid and single mesh
    * (done) example with one camera and two mesh objects, where layers are being switched for the camera
    * basic example of object3d layers using 2 cameras, and 2 mesh objects

### (started 6/03/2021 ) threejs-object3d-traverse
    * (done) basic example of traverse
```
https://discourse.threejs.org/t/to-get-array-of-all-meshes/17458/2
https://threejs.org/docs/index.html#api/en/core/Object3D.traverse
```

### (started 6/02/2021 ) threejs-object3d-parent
    * (done) start a basic parent example of a mesh object added to the scene
    * (done) start an example that involves a function that creates a group of mesh objects
    * (done) start an example that involves raycaster and getting the group of a mesh

### (started 6/01/2021 ) threejs-shape
    * (done) start an example of THREE.Shape that makes use of THREE.ShapeGeometry
    * (done) start an example of THREE.Shape that makes use of THREE.ExtrudeGeometry
    * (done) have a heart example of Shape
    * (done) shape holes demo
    * (done) Group object that contains shapes
    * make a tri force animation example with Shape and THREE.ExtrudeGeometry

### (started 5/31/2021 ) threejs-edges-geometry
    * (done) start a basic demo on the EdgesGeometry constructor
    * (done) start a edges geometry loop example
    * (done) start a new example with sphere geometry, and play around with that second argument
    * (done) start a box-edges-geometry demo, and update post threejs-box-geometry

### (started 5/28/2021 ) threejs-clock
    * (done) start a basic demo of THREE.Clock
    * (done) start an example for elapsed time

### (started 5/27/2021 ) TorusGeometry
    * (done) start a basic TorusGeometry demo
    * (done) start a group example where I increase segment counts as child index goes up
    * (done) make an example that is a bunch of TorusGeometry mesh objects in a ring like position, and have a camera move threw the holes

### (started 5/26/2021 ) threejs-sphere
    * (done) start a basic example on the sphere geometry
    * (done) start and example on width and height segments
    * (done) start an example of a dome
    * (done) start and example that makes use of the circle geometry to cap a dome created with the sphere geometry
    * (done) start and example that has to do with using more than one material with the sphere geometry
    * start a demo that makes use of bounding sphere

### (started 5/25/2021 ) threejs-object3d-get-world-position
    * (done) basic world position example that gets the world position of a mesh in a group

### ( started 5/24/2021 ) threejs-object3d-visible
    * (done) start a basic r127 example of object3d-visible
    * start an example that makes use of object3d visible and transparency
    * start an example that makes use of distance from a point for a mesh that moves
