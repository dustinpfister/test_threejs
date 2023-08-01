# test_threejs

This is a collection of work using the 3D computer graphics javaScript library called [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene). Many of these are very basic demos of features of the library itself, others progress beyond that into collections of code that at least start to look like finished projects working on top of the library. However nothing here is really a kind of stand alone project, thus this is a kind of threejs sketchpad of sorts.

I [write about the state of the source code examples worked out here in blog posts](https://dustinpfister.github.io/categories/three-js/) that I publish on my [github pages site](https://dustinpfister.github.io/2018/04/04/threejs-getting-started/). With that said there is a folder for each blog post that I have written thus far on threejs in the view folder. 

Another folder of interest is the demos folder which is broken down on a reversion by revision basis. So every now and then when new revisions come out I start a new folder for a late revision and test out if things still work okay for me, and if not what kind of changes need to happen with my code style to stay current. This can also go the other way when it comes to the various concerns with keeping code working on older devices. I test out new features, as well as ideas for basic projects and so forth here in the demos folder.



<div align="center">
    <a href="https://www.youtube.com/watch?v=nQ0rDFbFwK0">
        <img src="https://img.youtube.com/vi/nQ0rDFbFwK0/0.jpg" style="width:50%;">
    </a><br>
    <p>
        <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-lines-sphere-circles">Lines Sphere Circles</a> Video for my <a href="https://dustinpfister.github.io/2022/06/03/threejs-examples-lines-sphere-circles/">threejs project example post</a>.
    </p>
</div>

## 1 - Install

I do not have any intention to make this project an npm package or anything to that effect. So for now the best way to get things up and running with this on your end would be to clone it down with git, cd into the folder, and then do an npm install. This seems to work fine for me each time thus far with the various versions of nodejs and npm that I use at least. After that the main server script can be started as a way to navigate and view all the various demos, and post related source code examples.

```
$ git clone --depth 1 https://github.com/dustinpfister/test_threejs
$ cd test_threejs
$ npm install
```

## 2 - Starting a server

I now have a node folder with two options for starting a server both of which make use of [express](https://dustinpfister.github.io/2018/06/12/express/) and [ejs](https://dustinpfister.github.io/2017/12/07/nodejs-ejs-javascript-templates/) for the rendering of templates. Both the new and old scripts use the same ejs templates at the time of this writing, but the new script is thus far working a little better when it comes to fully exploring the demo and for post folders. These scripts are still very much an after thought, but for me at least they are working well enough.

### 2.1 - Start the new server by calling index script directly

Once all dependencies are installed, call the main index.js file at the root name space by one way or another, such as directly calling it when the current working directory is the root name space of the project.

```
$ node index 8080
```

Optionally the first argument is the desired port you want the sever to run on. It will default to a PORT environment variable, or hard coded value of 3000 if not given.

### 2.2 - Use the start.sh or start.bat files

I also have a start.sh file that should work well for starting the sever in a Linux system and I assume most other POSIX like systems. For windows users there is also a start.bat file that works well for me for starting the server when I want to get this up and running on a windows system.

```
$ ./start.sh
```

### 2.3 - If for some reason you want to run the older server script

I have the current state of the older server file parked in the server-old folder in the main node folder. Thus far I just made a few changes that have to do with getting the script to work from the new location, but also fixed a few bugs as well. Still I can not say that I will be doing much more work on this when I do get around to working on nodejs scripts for this project. If for some reason you want to run it though there is using the npm script, or calling the script directly.

```
$ npm run start_old
```

```
$ node ./node/server-old/index.js
```

<div align="center">
    <a href="https://www.youtube.com/watch?v=AzuB6ExUE64">
        <img src="https://img.youtube.com/vi/AzuB6ExUE64/0.jpg" style="width:50%;">
    </a><br>
    <p>
        <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-weird-face-1">Weird Face one</a> from my 
        <a href="https://dustinpfister.github.io/2021/02/19/threejs-examples/">threejs example Project Collection</a>
    </p>
</div>


## 3 - The views folder

As I have stated in the opening of this readme the views folder is where I have all the source code examples for all the blog posts on threejs that I have wrote thus far as well as all the draft demos I have made as well. However this is also the public folder where I store all kinds of additional assets that I am using for the various demos. This included copies of threejs itself, as well as additional add on files. I also have a number of additional assets in terms of textures, external geometry, and so forth.

### 3.1 - The DAE folder

When it comes to working out geometry in a program like blender, and then exporting from there thus far I have come to like the DAE or Collada file format. So in this folder I have DAE files, as well as the blender files that I use to export such files from. This also has textures that I use with such files as well.

<div align="center">
      <a href="https://www.youtube.com/watch?v=8aEF1H5nlYA">
         <img src="https://img.youtube.com/vi/8aEF1H5nlYA/0.jpg" style="width:50%;">
      </a>
    <p>
        <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-house-two">House Two</a>
    </p>
</div>


### 3.2 -  The demos folder

In the [demos folder](https://github.com/dustinpfister/test_threejs/tree/master/views/demos) I have folders for each revision number of three.js that I have worked with thus far going back to r91. This demos folder is then for testing out new features, and also figuring out how to fix things when older examples break when code breaking changes are made in a new revision of threejs, which is something that seems to happen fairly often. 

<div align="center">
      <a href="https://www.youtube.com/watch?v=JPZL4wPPuCg">
         <img src="https://img.youtube.com/vi/JPZL4wPPuCg/0.jpg" style="width:50%;">
      </a>
    <p>
        <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-edges-geometry">Edges Geometry</a>
    </p>
</div>


This demo folder is also a place where I have drafts, or prototypes for project ideas that might end up being one of my [threejs examples](https://dustinpfister.github.io/2021/02/19/threejs-examples/) projects. Eah time I get a new idea for some kind of project with threejs be it a module, demo of a core threejs feature, or so forth the idea will start here. If I do write a post about it I will then copy over what I worked out into a new for post folder, and expand and refine there.

### 3.3 -  The for post folder

I have a [for post folder](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost) that is where I am parking source code examples that will be embedded into each blog post that I write about on my website on threejs. When it comes to this I have got into the habit of sticking with a certain revision number, and making sure to always mention what that version is in the content of the blog post. Each time I come around to edit an older post I will revise, and extend the source code examples a little.

<div align="center">
    <a href="https://www.youtube.com/watch?v=IXwmoSKA8dA">
        <img src="https://img.youtube.com/vi/IXwmoSKA8dA/0.jpg" style="width:50%;">
    </a><br>
    <p>
        <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-phong-material">Video for my post on the Phong Material</a> I am also making use of my <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-sphere-mutate">sphere mutate threejs project examples</a> here as well.
    </p>
</div>

### 3.4 - The JSON folder

The json folder contains various kinds of JSON files in various kinds of formats that are used with threejs feature such as THREE.BufferGeometryLoader. However there are of course a number of formats to be aware of when it comes to JSON data that will work with many other features such as THREE.FontLoader, and THREE.ObjectLoader just to name a few.

## 4 - Code Style

Threejs is a very fast moving project in terms of development compared to many other libraries out on the open web. There is a whole lot to say about what has all ready broke, and will continue to break as things move forward with each new revision that comes out. As such many of us that use threejs will end up sticking with a certain given revision number of threejs for a while, maybe even indefinitely for various reasons. With that said as of this writing there are two general style rules that I am following as I write posts for new demos, and edit old ones.

### The r152 style rules

My [r152 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) is what I am following when it comes to writing new blog posts at this time. At this point I am now using module type script tags, which means that you will see the use of import and export in code examples. 

### The r146 style rules

For now the [r146 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) are the default style rules that I use when editing older demos, and will most likley remain so for a while to say the least. The very next revision after this one is the last revision where js file versions of add on files can be found in the github repo of threejs. So this revision marks the end of the use of text/javaScript mimie type script tags as part of the over all code style.

