# todo list for test_threejs

General todo list for this test_threejs repo in general. This is where I will write down notes when it comes to what I want to do with this project as a whole, such as adding new folders for various kinds of projects that have to do with threejs. I will not write down everything that I want to do here of course, I have additional files like this where I am planing things out when it comes to additions to the forpost folder in general, as well as for each nested forpost folder for example. So then in other words this is just a kind of global todo list, but not a todo list for a collection of examples, or a single example.

## () make index.js use server-old in node folder
* () have main index start server-old index file ( for now )

## () node/server-new
* () start a new nodejs sub folder called server-new
* () start out with a server that will default to the use of server-static for files like js files and so forth

## ( done 02/07/2023 ) - NEW FOLDER: NODE folder
* (done) start a /node folder
* (done) make a copy of the main index.js as /node/server-old/index.js
* (done) just make changes to this copy of the main server file to get it to work in the new location

## ( done 02/07/2023 ) - remove links to VIDEO and SPRITE SHEET SECTIONS
* (done) remove link to VIDEO Section in nav as I am using videoground to make video projects
* (done) remove link to sprite sheet section as I am just not developing that

## ( done 11/14/2021 ) /views/sprite-sheets
* (done) new sprite sheets folder where each end result is a sprite sheet using THREE.js

## (done 06/26/2021 ) NEW FOLDER: /views/forpost folder
    * (done) start a /forpost folder to start creating collections of demos for specific blog posts
    * (done) a forpost folder can also contain a todo list for additional demos to create for a post
    * (done) a README file can be placed in the for post folder that will contain a link to the blog post
    * (done) I will want to have nested folders in a for post folder for example in need the main index.js file to
      work with a situation such as this:
        /views/forpost/threejs-normal-material/s2_basic/index.ejs
        /views/forpost/threejs-normal-material/s3_mutate_points/index.ejs