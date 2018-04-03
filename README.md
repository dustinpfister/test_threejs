# test_threejs

These are my three.js demos

## install

Like all of these projects I do not intend to pollute the npmjs name space with this, so if you want to check these out, you will have to clone it in with git, and do a npm install

```
$ git clone https://github.com/dustinpfister/test_threejs
$ cd test_threejs
$ npm install
```

## Starting the server

Like many of my test projects like this in which I am making many demos that make use of one framework, library, ect I have made this a full stack application. I did this as a means of exercising how to go about making such applications, as well as laying support for demos that make use of a back end of some kind.

Once all dependency are installed, call the main index.js file at the root name space by one way or another, such as directly calling it when the current working directory is the root name space of the project.

```
$ node index 8080
```

Optionally the first argument is the desired port you want the sever to run on. it will default to a PORT environment variable, or hard coded value of 3000 if not given.