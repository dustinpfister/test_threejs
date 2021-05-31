# test_threejs

This is a collection of work using three.js to create simple demos of threejs features, simple project examples, and videos. I then I intend to write about the state of the source code worked out here in blog posts that I will then publish on my [github pages site](https://dustinpfister.github.io/2018/04/04/threejs-getting-started/). 

In the views folder there is the demos folder, and in that folder I have folders for each revision number that I have made demos for. Whenever I need to update the source code for one or more examples on a blog post, I will just copy a demo from one revision folder to another and make any changes that need to be made. I have also started ad additional folder that has to do with the creation of simple video projects that make use of my video ui script that I worked out here.

## 1 - Install

Like all of these projects I do not intend to pollute the npmjs name space with this, so if you want to check these out, you will have to clone it in with git, and do a npm install

```
$ git clone --depth 1 https://github.com/dustinpfister/test_threejs
$ cd test_threejs
$ npm install
```

## 2 - Starting the server

Like many of my test projects like this in which I am making many demos that make use of one framework, library, ect I have made this a full stack application. I did this as a means of exercising how to go about making such applications, as well as laying support for demos that make use of a back end of some kind.

Once all dependency are installed, call the main index.js file at the root name space by one way or another, such as directly calling it when the current working directory is the root name space of the project.

```
$ node index 8080
```

Optionally the first argument is the desired port you want the sever to run on. it will default to a PORT environment variable, or hard coded value of 3000 if not given.

## 3 - Notes on the back end

I am using express.js as a server side framework, and ejs as a template language. As of this writing I do not have a well thought out plain on how to structure the app, but I am not loosing sleep over it, this project is more about the demos anyway. Still for my own sanity I thought it would be a good idea to maintain some notes on how I am building this system.

### 3.1 - How demos are structured

I have thought about making some complex system for this, but for now all the demos fall in a path that follows a /demos/r\[XXX\]/\[demoName\] pattern in the views folder.

### 3.2 - How front end \*.js files are delivered

I have a /js path where \*.js files can be fetched with an absolute path. When doing so the variable r is the currently set revision number that is to be used for a threejs demo, or project which can be used with urls.

```html
<!-- loading three.js -->
<script src="/js/threejs/0.<%= r %>.0/three.min.js" ></script>
```

When it comes to working out the main index.ejs file realtive paths can be used for scripts local to the demo

```html
<!-- load demo script -->
<script src="<%= demoName %>/js/main.js"></script>
```

### 3.3 - How the r (revision) variable is determined

As of this writing it is determined by the folder that the demo is in as that structuring follows a /demos/rXXX pattern where XXX is the revision number that is used for the demos in that path.

### 3.4 - Generating index of demos

I am using [klaw](https://github.com/jprichardson/node-klaw), and [through2](https://www.npmjs.com/package/through2) to help with building lists of links for demos.
