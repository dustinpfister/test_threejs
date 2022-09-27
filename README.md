# test_threejs

This is a collection of work using the javaScript library called [three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) to create simple demos of threejs features, and project examples. In other words I am just simply testing out threejs, along with a little extra vanilla javaScript code. I [write about the state of the source code examples worked out here in blog posts](https://dustinpfister.github.io/categories/three-js/) that I publish on my [github pages site](https://dustinpfister.github.io/2018/04/04/threejs-getting-started/).

<div align="center">
    <a href="https://www.youtube.com/watch?v=AzuB6ExUE64">
        <img src="https://img.youtube.com/vi/AzuB6ExUE64/0.jpg" style="width:50%;">
    </a><br>
    <p>
        <a href="https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-weird-face-1">Weird Face one</a> from my 
        <a href="https://dustinpfister.github.io/2021/02/19/threejs-examples/">threejs example Project Collection</a>
    </p>
</div>

## The views folder

The views folder is where I have all the draft prototypes, final for post source code examples, and additional assets like DAE files and textures. 

### The demos folder

In the [demos folder](https://github.com/dustinpfister/test_threejs/tree/master/views/demos) I have folders for each revision number of three.js that I have worked with thus far going back to r91. This demos folder is then for testing out new features, and also figuring out how to fix things when they break each time code breaking changes are made in a new revision. 

<div align="center">
      <a href="https://www.youtube.com/watch?v=JPZL4wPPuCg">
         <img src="https://img.youtube.com/vi/JPZL4wPPuCg/0.jpg" style="width:50%;">
      </a>
</div>

This demo folder is also a place where I have drafts, or prototypes for project ideas that might end up being one of my [threejs examples](https://dustinpfister.github.io/2021/02/19/threejs-examples/) projects.

### The for post folder

I have a [for post folder](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost) folder that is serving as the standard location for final source code examples for each blog post that I write about on my website. When it comes to this I have got into the habit of sticking with a certain revision number, and making sure to always mention what that version is in the content of the blog post. Each time I come around to edit an older post I will revise, and extend the source code examples a little and make sure things are working in the latest revision of threejs that I am  working with at the moment.

## 1 - Install

I do not have any intention to make this project an npm package or anything to that effect. So for now the best way to set things up and running with this on your end would be to clone it down with git, cd into the folder, and then do an npm install. This seems to work fine for me each time thus far with the various versions of nodejs and npm that I use at least. After that the main server script can be started as a way to navigate and view all the various demos, videos, and post related source code examples.

```
$ git clone --depth 1 https://github.com/dustinpfister/test_threejs
$ cd test_threejs
$ npm install
```

## 2 - Starting the server

I made the server script a long time ago, and as long as it still works okay I can not say that I have much interest to sit down and write a new one. It is just a single index javaScript file at the root of this folder, and it runs on top of [express](https://dustinpfister.github.io/2018/06/12/express/) using [ejs](https://dustinpfister.github.io/2017/12/07/nodejs-ejs-javascript-templates/) for rendering of templates.

### 2.1 - Start by calling index script directly

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

## 3 - Notes on the back end

I am using express.js as a server side framework, and ejs as a template language. As of this writing I do not have a well thought out plain on how to structure the app, but I am not loosing sleep over it. This project is more about the demos themselves rarer than how I am serving them up anyway. Still for my own sanity I thought it would be a good idea to maintain some notes on how I am building this system.

### 3.1 - How demos are structured

I have thought about making some complex system for this, but for now all the demos fall in a path that follows a /demos/r\[XXX\]/\[demoName\] pattern in the views folder.

### 3.2 - How front end \*.js files are delivered

I have a /js path where \*.js files can be fetched with an absolute path. When doing so the variable r is the currently set revision number that is to be used for a threejs demo, or project which can be used with urls.

```html
<!-- loading three.js -->
<script src="/js/threejs/0.<%= r %>.0/three.min.js" ></script>
```

When it comes to working out the main index.ejs file relative paths can be used for scripts local to the demo

```html
<!-- load demo script -->
<script src="<%= demoName %>/js/main.js"></script>
```

### 3.3 - How the r (revision) variable is determined

As of this writing it is determined by the folder that the demo is in as that structuring follows a /demos/rXXX pattern where XXX is the revision number that is used for the demos in that path.

### 3.4 - Generating index of demos

I am using [klaw](https://github.com/jprichardson/node-klaw), and [through2](https://www.npmjs.com/package/through2) to help with building lists of links for demos.

