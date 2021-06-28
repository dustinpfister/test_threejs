## x - what to finish that is in Process, random notes

* When it comes to other ways to position something on a sphere, another solution might involve ray casting
    https://stackoverflow.com/questions/54491088/wrap-threejs-mesh-on-another-mesh

* see about finishing /r127/sphere-move-point demo
* update post on Vector3 class to include what was worked out in the post on arrow helpers when moving a mesh

## x - A series of examples on the raycaster class

Onw idea that comes to mind would be to write a collection of posts where I am expanding on the raycaster class and how this class can prove to be very useful. I have all ready wrote one post on this subject, but that was just a general overview type post. In any case what I would work out with this is to write new posts that will explore more use case examples of the raycaster. This can include projects that are composed of objects with custom geometry.

### x.x - threejs-examples-raycaster-world
    * in this example there is having a sphere, and using raucaster as a way to position objects on the sphere
    * there is also haveing an object that moves along the surface of there sphere.
    * raycaster can also be used to set the alt of the object.
    * moving object will gain alt if it raycatser alt is higher by just setting the hight higher
    * moving object will loose alt alowly over time when the raycaster hight is lower


## x - More on the various types of loaders to work with

I have wrote some posts on the various loaders there are to work with in threejs. However there are still a number of additional loaders to write about bolth built in loaders as well as the many type of loaders in the examples folder.

### x.x - ( for 6/21/21 ) threejs-texture-loader
    * load an external image that can be used for the various maps of a material

### x.x - threejs-loader
    * the base loader class


## x - More on the various options when it comes to maps

I have wrote a number of posts on the various types of maps that can be used with one or more materials, but there are a number of additional maps that I have not wrote content on just yet.

### x.1 - ( for 6/22/21 ) threejs-emissive-map
    * start a basic example on the use of an emissive map

### x.x - threejs-ambient-occlusion-map

### x.x - threejs-environment-map

### x.x - threejs-light-map

### x.x - threejs-specular-map

### x.x - (for 6/23/21 ) threejs-normal-map

### x.x - threejs-bump-map

### x.x - threejs-metalness-map

### x.x - threejs-roughness-map

### x.x - threejs-clearcoat-map



## x - More on materials and maps in threejs

I have wrote a number of posts on various options when it comes to materials in threejs, but there is still a few more than I have not wrote posts on

### x.x - (for 6/24/21 ) threejs-normal-material

### x.x - threejs-phong-material

### x.x - threejs-toon-material

### x.x - threejs-matcap-material

### x.x - threejs-physical-material




## x - More on shapes, extrude Gemoerty

There is maybe a git more to cover when it comes to using the extrude geometry constructor. This can also involve example type posts.

## x.1 - threejs-extrude-geometry
    * start a basic example of THREE.ExtrudeGeometry




## x - Bones, Animation, and External Files

In order to create a collection of posts on animation it might have to involve creating external files in blender.

### x.1 - threejs-animation-mixer
    * basic animation mixer example

### x.2 - threejs-animation-clip
    * basic animation clip example

### x.3 - threejs-skinned-mesh
    * see about making a basic example of a skinned mesh

### x.4 - threejs-skeleton
    * basic skeleton example

### x.5 - threejs-bones
    * (done) see about starting a basic example of a bones created from the examples on the threejs website
    * (done) rename bones demo folder to bones-threejs-site-example.
    * make an actually working basic example of THREE.Bone




## x - New example posts

I can always just make more example posts using my current understating of threejs, and JavaScript alone, as well as expand into other libraries and new concepts when it comes to making modules, videos, and applications with threejs as part of the stack. I am thinking that I should mainly stick to just using threejs and vanilla javaScript, however I might want to make use or other libraries on the open web too now and then when doing so is called for.

### x.1 - threejs-examples-guy-two
    * start a new guy2 model that will have a few more mesh objects compared to guy1
    * guy2 will have 3 mesh objects for each arm rather than just one
    * guy2 will have 3 mesh objects for each leg rather than just one
    * have a Guy2Mod.setWalk method but have it so that it will just move the legs, or that the movement of arms is an option
    * have a method that can be used to move a single arm in many different ways within set range limits
    * do some reading an animation clips and see if they can be used to help with tweening from one state to another

### x.2 - threejs-examples-unit-vector-system
    * start an example that is based off of the concept of a unit vector 
    * ( see moving a mesh example in post on arrow helpers )

### x.3 - ( for 6/25/21 ) threej-examples-dae-file-lib
    * start a dea file lib