# server-new nodejs script

The goal here is to just make an updated server script for this test threejs project. I would like to fix problems that I have noticed as well as add a few features as needed.

Some things that have been done thus far.

* Can explore the contents of nested folders in for post folders without getting a nasty error
* displaying readme file text in forpost/postname folders
* the build index function was pulled into a stand alone javaScript file
* path-demo.js file that exports a router that is used for the demo path
* path-forpost file that exports a router that is used for the forpost path
* fixed a bug with the built index method would not reject a promise resulting in server crash