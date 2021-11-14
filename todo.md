# todo list for test_three.js

General todo list for this test_threejs repo in general. This is where I will write down notes when it comes to what I want to do with this project as a whole, such as adding new folders for various kinds of projects that have to do with threejs. I will not write down everything that I want to do here of course, I have additional files like this where I am planing things out when it comes to additions to the forpost folder in general, as well as for each nested forpost folder for example. So then in other words this is just a kind of global todo list, but not a todo list for a collection of examples, or a single example.


## NEW FOLDER: /views/sprite-sheets
    * new sprite sheets folder where each end result is a sprite sheet using THREE.js

## NEW FOLDER: /views/js/modules_group_dae
    * I will want to have a modules\_group\_dae folder in the js folder
    * this modules\_group\_dae folder will contain modules like the ones in modules\_group only they depend on one or more dae files 

## NEW FOLDER: NODE folder
    * start a /node folder
    * make index.js /node/server/index.js
    * start a /node/make-pkg folder that will be a build tool to help create pkg.js files to use in a web page



## INFO: Check out the Migration-Guide when it comes to making choices about what to work on
```
https://github.com/mrdoob/three.js/wiki/Migration-Guide#r128--r129
```

## PROBLEM: find out what they deal is with Object3d.localToWorld

The localToWorld method of Object3d does not seem to do anything in r127 of three.js. If I pass a vector that is relative to an object rather than world space to this method I would expect a new vector that is the equivalent location in world space. However the result is the same vector that was passed to the method. In other words the method seems to do absolutely nothing.



## (done) NEW FOLDER: /views/forpost folder
    * (done) start a /forpost folder to start creating collections of demos for specific blog posts
    * (done) a forpost folder can also contain a todo list for additional demos to create for a post
    * (done) a README file can be placed in the for post folder that will contain a link to the blog post
    * (done) I will want to have nested folders in a for post folder for example in need the main index.js file to
      work with a situation such as this:
        /views/forpost/threejs-normal-material/s2_basic/index.ejs
        /views/forpost/threejs-normal-material/s3_mutate_points/index.ejs


