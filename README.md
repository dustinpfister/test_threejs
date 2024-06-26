# test_threejs

This is a collection of work using the 3D computer graphics javaScript library called [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene). Many of these are very basic demos of features of the library itself, others progress beyond that into collections of code that may start to look like finished projects. However nothing here is really a kind of stand alone full project, as such this is a kind of threejs sketchpad of sorts.

I [write about the state of the source code examples worked out here in blog posts](https://dustinpfister.github.io/categories/three-js/) that I publish on my [github pages site](https://dustinpfister.github.io/2018/04/04/threejs-getting-started/). With that said there is a folder for each blog post that I have written thus far in the views folder. 

There are other folders of interest, one of which is the demos folder which is broken down on a reversion by revision basis. So every now and then when new revisions come out I start a new folder for a late revision and test out if things still work okay for me, and if not what kind of changes need to happen with my code style to stay current. This can also go the other way when it comes to the various concerns with keeping code working on older devices, as well as interest with the history of this library. The demos folder is also where I test out new ideas for projects, as well as features of threejs that I have just not yet covered yet.

<div align="center">
    <a href="https://www.youtube.com/watch?v=nQ0rDFbFwK0">
        <img src="https://img.youtube.com/vi/nQ0rDFbFwK0/0.jpg" style="width:50%;">
    </a><br>
    <p>
        <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-lines-sphere-circles">Lines Sphere Circles</a> Video for my <a href="https://dustinpfister.github.io/2022/06/03/threejs-examples-lines-sphere-circles/">threejs project example post</a>.
    </p>
</div>

## 1 - INSTALL

I do not have any intention to make this project an npm package or anything to that effect. So for now the best way to get things up and running with this on your end would be to clone it down with git, cd into the folder, and then do an npm install. This seems to work fine for me each time thus far with the various versions of nodejs and npm that I use at least. After that the main server script can be started as a way to navigate and view all the various demos, and post related source code examples.

```
$ git clone --depth 1 https://github.com/dustinpfister/test_threejs
$ cd test_threejs
$ npm install
```

## 2 - STARTING A SERVER

I now have a node folder with two options for starting a server both of which make use of [express](https://dustinpfister.github.io/2018/06/12/express/) and [ejs](https://dustinpfister.github.io/2017/12/07/nodejs-ejs-javascript-templates/) for the rendering of templates. Both the new and old scripts use the same ejs templates at the time of this writing, but the new script is thus far working a little better when it comes to fully exploring the demo and for post folders. These scripts are still very much an after thought, but for me at least they are working well enough.

### 2.1 - Start the new server by calling index script directly

Once all dependencies are installed, call the main index.js file at the root name space by one way or another, such as directly calling it when the current working directory is the root name space of the project.

```
$ node index 8080
```

If all goes well starting the server, one can then go to http://localhost:8080 to view the demos. Optionally the first argument is the desired port you want the sever to run on. It will default to a PORT environment variable, or hard coded value of 3000 if there is no argument or environment variable. 

### 2.2 - Use the start.sh or start.bat files

I also have a start.sh file that should work well for starting the sever in most Linux systems, and I assume most other POSIX like systems. For windows users there is also a start.bat that should work for windows users.

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


## 3 - THE VIEWS FOLDER

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

## 4 - CODE STYLE

Threejs is a very fast moving project in terms of development compared to many other libraries out on the open web. There is a whole lot to say about what has all ready broke, and will continue to break as things move forward with each new revision that comes out. As such many of us that use threejs will end up sticking with a certain given revision number of threejs for a while, maybe even indefinitely for various reasons. With that said as of this writing there are two general style rules that I am following as I write posts for new demos, and edit old ones.

### 4.1 - The Draft r162 style rules

As of this writing I am starting to test out r162, and with that I MIGHT make some updates to my style rules. If not they will remain the same as with r152.

### 4.2 - The r152 style rules

My [r152 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) is what I am following when it comes to writing new blog posts at this time. At this point I am now using module type script tags, which means that you will see the use of import and export in code examples. 

### 4.3 - The r146 style rules

For now the [r146 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) are the default style rules that I use when editing older demos, and will most likley remain so for a while to say the least. The very next revision after this one is the last revision where js file versions of add on files can be found in the github repo of threejs. So this revision marks the end of the use of text/javaScript mimie type script tags as part of the over all code style.

## 5 - DEEP DIVE CONTENT

I have by trying all kinds of ways by which I should go about improving content that is all ready in place rather than writing new content. For a long time I was stuck in this process of just doing a little touch up work on every post I have wrote thus far, a little each day, over the course of months until I then get to the point that I loop around again. To some extent that might need to continue, but as of late I am more interested in exploring the polar opposite of that by making at least a few posts what some might call Deep Dive content posts. There might be some other terms for this kind of content, such as long form content and so forth. In any case the general idea is to not just write a really long blog post that is say 5,000 words or more, but rather put in a whole lot of time in terms of doing research, writing demos, and so forth so that it is not just a whole lot of padding.

### 5.1 - The post on materials in general in threejs

The blog post: https://dustinpfister.github.io/2018/04/30/threejs-materials/

The for post folder here: https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-materials

I have a post on materials in general that is now over 13k words, and even so I would say that it is still not even scratching the surface with this subject. I could in theory expand it even more so way beyond that if I do end up completely going off the rails with this one, but I am not so sure at this time as there are still at least a few subjects that I think deserve this level of detail.

When it comes to materials there is also a whole lot of overlap with many other topics. For example there is the subject of normal maps which involves the use of textures, and many various advanced subjects with geometry naturally including position, normal, uv, and tangent attributes. Then there is also the subject of custom shaders using the THREE.ShaderMaterial which involves getting into openGL Shader Language GLSL. In other words even when it comes to writing about everything of concern when it comes to the various abstractions of things in threejs, there is then a whole language to be aware of that is used for matreials.

### 5.2 - The Main blog post on Buffer Geometry

The blog post: https://dustinpfister.github.io/2021/04/22/threejs-buffer-geometry/

The for post folder here: https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry

The main post on buffer geometry is another post that I aim to turn into a Deep Dive content subject. I have wrote many posts on buffer geometry thus far, but I think it would be a good idea to expand the main post by at least touching base on all subjects that come up with geometry, which is of course a lot. As of this writing I am only just now just starting to look into tangent attributes, and with that the subject of normal maps that can be used with various mesh materials that work with that feature. That alone is not even a drop in the bucket, so yes in time this is going to be a lengthy sucker if I do say in my lane with this one for a while.


