# todo list for test_three.js demos

This is a todo list where I am drafting out ideas for demos that I will include in blog posts on three.js on my website here at github pages.

## (6/21/21 - 6/25/21) - new posts on texures and maps

I have not wrote a post on the texture loader, maybe mainly because I prefer to create textures with canvas up to this point. I think that will be changing for me now it I am going to continue with threejs though. So this week I think I will be writing posts on the texture loader, and a whole bunch of additional kinds of maps that can be used with various materials. 

### x.1 - (done 6/21/2021 ) threejs-texture-loader
    * (done) create a basic example of the texture loader
    * (done) have an example that involves loading more than one texture
    * have an example that makes use of the additional call backs of the loader
    * have a canvas texture example, or make use to link to the post on canvas textures
    * an example where I am using the Texture constructor directly and loading an image by some other means

### x.2 - (done 6/22/2021 ) threejs-emissive-map
    * (done) start a basic emissive map demo

### x.3 - threejs-normal-map
    * just a basic normal material example

### x.4 - threejs-normal-material

### x.5 - threej-examples-dae-file-lib


## x - Expand on the Vector3 class just like with Object3d

The Vector3 class is also a major part of working with theejs, as there is the position property of the Object3d class that is a bug deal when it comes to setting the position of objects. However a Vector can also be used as a way to store direction in the from of a set of numbers between 0, and one for each axis. This normalized vector as it is often called can then be scaled up to any value that is along that direction. There is a lot more than can be written when it comes to just the Vector3 class, and not just with the prototype methods, but all kinds of use case examples involving direction and magnitude.

### ( started 6/14/2021 ) x.1 - threejs-vector3-normalize
    * (done) start a basic example of vector3-normalize
    * (done) another example that has to do with length
    * (done) place on sphere example
    * (done) example that allows for change of direction by euler

### ( started 6/15/2021 ) x.2 - threejs-vector3-distance-to
    * (done) start a basic distance to example of the method
    * (done) start a basic example that involves distance to, and a move object method

### ( started 6/16/2021 ) x.3 - threejs-vector3-clamp
    * (done) start a basic example of vector3 clamp
    * start a basic wrap length example

    * create a wrap example
    * create a simple animation example

### ( started 6/16/2021 ) x.4 - threejs-vector3-apply-axis-angle
    * (done) basic example of threejs apply axis angle
    * (done) start an animation for this

### ( started 6/17/2021 ) x.5 - threejs-vector3-apply-euler
    * (done) start a basic example of vector3 apply euler method
    * (done) start an animation example for apply euler




## 3 - More on the Buffer Geometry Constructor.

I should make a series of posts where I am covering more about the buffer geometry class in detail when it comes to attributes, and
various additional features of the class. So the focus here should be on making custom geometry from the ground up, as well as 
messing around with built in geometries such as the THREE.BoxGeomerty, and THREE.Plane geometry

### ( started 6/07/2021 ) 3.1 - threejs-buffer-geometry-attributes-position
    * (done) start a basic example on the position property
    * (done) vert helper demo
    * (done) tri helper demo
    * (done) animation loop example using tri helper and position.needsUpdate

### ( started 6/08/2021 ) 3.2 - threejs-buffer-geometry-attributes-normals
    * (done) basic example of the normals attribute
    * (done) make a setNormalArrow, and setNormal helper function and create an animation loop
    * example that has to do with light and improved helper methods for attaching arrows for all normals

### ( started 6/09/2021 ) 3.3 - threejs-buffer-geometry-attributes-uvs
    * (done) basic example of uvs using a canvas generated texture
    * (done) basic loop example of mutation of uvs

### ( started 6/10/2021 ) 3.4 - threejs-examples-sphere-mutate
    * (done) start an example where I am just mutating the positions of a sphere geometry
    * have some texture maps for the sphere

### ( started 6/11/2021 ) 3.5 - threejs-examples-plane-mutate
    * (done) create an example where I am mutating the positions of a plane geometry

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
