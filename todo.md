# todo list for test_three.js

General todo list for this test_threejs repo.


## Check out the Migration-Guide when it comes to making choices about what to work on

```
https://github.com/mrdoob/three.js/wiki/Migration-Guide#r128--r129
```

## /views/forpost folder
    * (done) start a /forpost folder to start creating collections of demos for specific blog posts
    * (done) a forpost folder can also contain a todo list for additional demos to create for a post
    * (done) a README file can be placed in the for post folder that will contain a link to the blog post

    * I will want to have nested folders in a for post folder for example in need the main index.js file to
      work with a situation such as this:

        /views/forpost/threejs-normal-material/s2_basic/index.ejs
        /views/forpost/threejs-normal-material/s3_mutate_points/index.ejs

    * in the text of the blog post I can also link to the read me file
    * when creating a video for a post I can have references to the video in the readme and todo list

## NODE folder
    * start a /node folder
    * make index.js /node/server/index.js
    * start a /node/make-pkg folder that will be a build tool to help create pkg.js files to use in a web page

## PROBLEM: find out what they deal is with Object3d.localToWorld

The localToWorld method of Object3d does not seem to do anything in r127 of three.js. If I pass a vector that is relative to an object rather than world space to this method I would expect a new vector that is the equivalent location in world space. However the result is the same vector that was passed to the method. In other words the method seems to do absolutely nothing.
