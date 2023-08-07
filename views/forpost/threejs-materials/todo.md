# threejs-materials todo list

<!-- S1 - BASIC SECTION -->



## () - s1-9-basic-shader
* () very simple hello world demo of the shader material

<!-- S2 - MESH SECTION -->

## () - s2-9-mesh-matcap
* () I should start a mesh matcap section when I have a post on this material option.

## () -s2-10-mesh-distance
* () see about making a demo of the distance material

<!-- S3 - POINTS SECTION -->

<!-- S4 - LINES SECTION -->

<!-- S5 - SPRITES SECTION -->

<!-- S6 - COMMON ( BASE MATERIAL CLASS ) SECTION -->

## () - s06-6-common-depthfunc
* () depth function demo

## () - s06-7-common-clip-intersection
* () I am going to want to have at least one demo on the subject of cliping here

<!-- S7 - BLENDING SECTION -->

## () s07-2-blending-additive
* () demo about additive compared to normal

<!-- S8 - LOADERS SECTION -->

## () s08-4-loader-many
* () load many files demo
* () use material, texture, and buffergeometry loaders

<!-- S9 - TEXTURES SECTION -->

## ( ) - s09-4-texture-minimap - uvmap status rects
* () the main element to render to should be a plain old 2d context canvas
* () draw to the 2d canvas with the domElement of the renderer
* () I would like to have a uv map status rect for the map texture
* () I would like to have a uv map status rect for the emissive map

<!-- S10 - LIGHT  -->

## () s10-3-light-map-emissivemap
* () I will of course want to get into the subject of the map, and emissiveMap options

## () s10-4-light-lambert-phong
* () demo in which the lambert and phong materials are compared

<!-- S11 - SHADOWS  -->


<!-- s12 - MATERAL ARRAY SECTION -->

## () s12-2-matarray-plane
* () a mesh using a plane might be a good start when it comes to the add group method
* () see about making a custom one where we have an area that is a 'lake'
* () use the phong material for the lake area, and Lambert for the rest


<!-- s13 - Fog -->

<!-- s14 - SHADER MATERIAL SECTION -->

## () - s14-3-shader-functions
* () I would like to have a demo of functions

## () - s14-4-shader-lib
* () demo in which I make use of features of the shader lib to quickly add vertex colors

<!-- s15 - RAW SHADER MATERIAL SECTION -->

When I get to it I should have at least one demo on the use of the raw shader material.

## () s15-1-rawshader-points
* () I would like to make a raw shader that will work with just points
* () draw points with a feature other than what is used with the points material as I am having problems with that on RPI OS


<!-- s16 - PREFORMANCE TESTING SECTION -->

If I get to this subject there is writing at leasr a few demos where the goal is to find out what materials preform the best in terms of processing overhead. For examples there is testing out what the FPS is for the movement of a whole bunch of objects each of which are using the MeshBasicMaterial, and then seeing how that compares to the use of the MeshPhongMaterial with one or more light sources. I would assume that I would get higher FPS with the Basic Material, but still I would assume nothing until some final testing is done.

One really interesting test with this would be comparing the standard to lambert to see if lambert is faster when it comes to light. From what I gathered I think Lambert will be faster, but still need to test first and to be sure.


<!-- DONE -->

## ( done 08/06/2023 ) - s1-8-basic-common
* (done) basic common options demo
* (done) this can start out the same as s1-2-basic-objects only add a color attribute
* (done) set the use vertex colors boolean for all of the materials used

## ( done 08/05/2023 ) s08-3-loader-object-load-and-textures
* (done) have an object format demo that shows that image data can be baked in

## ( done 08/04/2023 ) - s1-7-basic-textue
* (done) very basic texture example
* (done) start with the source from the MeshBasicMaterial example from the mesh section
* (done) go with canvas textures over that of data textures

## ( done 08/03/2023) - Add depth demo code for s2-1-mesh-basic
* (done) I want to fix up the s2-1-mesh-basic demo to show some ways to add depth so that it is not just a solid color

## ( done 08/03/2023 ) - s06-5-common-depthtest
* (done) should have one on depth test like with the sprite demo

## ( done 08/02/2023 ) s05-1-sprites-crosshairs
* (done) have a crosshairs demo based on the code I used in my position editor electionjs app

## ( done 08/02/2023 ) - s03-2-points-size-attenuation
* (done) demo where I have two materials one with sizeAttenuation option set to false

## ( done 08/01/2023 ) - s8-3-texture-rotation - loop, rotation
* (done) work out some logic for rotation of uv attributes by looking at the position attribute
* (done) make a helper function
* (done) I want to add a loop for this demo

## ( done 07/30/2023 ) s9-2-light-ambient-emissive
* (done) demo of just the use of ambient light alone

## ( done 07/30/2023 ) - s5-4-common-side
* (done) side demo of the base material class

## ( done 07/29/2023 ) - s1-6-basic-light
* (done) use a material like phong
* (done) add a directional light source
* (done) both map and emissive maps used
* (done) color, emissive, and emissive intensity options used

## ( done 07/28/2023 ) - s5-3-common-vertexcolor
* (done) vertex color examples

## ( done 07/27/2023 ) s7-2-loader-object-parse
* (done) parse json txt, but now in the object format

## ( done 07/26/2023 ) - s13-2-shader-uniforms
* (done) start a basic demo on the use of uniforms and custom shaders
* (done) have a baseColor uniform
* (done) see about adding a depth value by studying shader lib code on depth material

## ( done 07/25/2023 ) sx-1-shader-white
* (done) This will be a very basic hello word type example where I just have a blob of white area

## ( done 07/24/2023 ) s11-1-matarray-cube
* (done) a mesh that uses the cube geometry is a good start for this kind of subject as always
* (done) start with the basic section example
* (done) this time mutate the material index values and use just two materials
* (done) make this demo a loop also

## ( done 07/21/2023 ) s10-1-shadow
* (done) start a first basic example on shadows
* (done) use a spot light as the light source

## ( done 07/21/2023 ) s9-1-light
* (done) first light demo should make use of directional light

## ( done 07/20/2023 ) - s8-1-texture-wrapS-wrapT
* (done) start a basic demo of wrapS and WrapT
* (done) I will want a simple canvas texture for the map option
* (done) I will want to go with the plane geometry for this one
* (done) mutate the uv attributes so that the values go into the negative range
* (done) set the wrapS and wrapT properties to get a desired outcome

## ( done 07/19/2023 ) s8-1-texture-emissive
* (done) start with the source code of s1-5-basic-uvmap
* (done) have a light source
* (done) I will want to use the standard material
* (done) have a color map
* (done) helper function for creating a canvas texture
* (done) work out a better helper function for setting an area of a texture to the box
* (done) The helper function should also allow for offset values to scroll the area over time
* (done) have an emissive map

## ( done 07/18/2023 ) - s1-5-basic-uvmapping
* (done) similar to that of texture demo but doing uv edits

## ( done 07/17/2023 ) s6-1-blending-none
* (done) start a demo where we are using canvas2d rendering and drawing to that canvas with the renderer
* (done) this will be a comparison demo with normal blending, and no blending

## ( done 07/17/2023 ) s7-1-loader-material-parse
* (done) a demo in which I parse json as hard coded text
* (done) the json text can just be some data for the MeshBasicMaterial

## ( done 07/17/2023 ) - s2-8-mesh-toon - gradient map
* (done) see about adding a gradient map
* (done) write more about this demo

## ( done 07/17/2023 ) - s5-2-common-blending
* ( done ) have a box geometry and a grid
* ( done ) use THREE.NoBlending for materials used for mesh and grid

## ( done 07/15/2023 ) - s1-4-basic-matarray
* (done) basic demo that involved the use of an array of materials

## ( done 07/16/2023 ) - s1-3-basic-texture
* (done) basic demo that involves a canvas texture

## ( done 07/16/2023 ) - s1-2-basic-objects
* (done) demo in which there is more than one kind of object used
* (done) use a single box geometry
* (done) add lines and points as children of the mesh

## ( done 07/15/2023 ) - s1-1-basic-meshnormal
* (done) very simple mesh normal material example
* (done) make the normal material for the mesh options section not so simple then

## ( done 06/28/2023 ) - s11-1-common-opacity
* (done) opaciy demo using a lot of differing materials

## ( done 06/20/2023 ) - s10-1-lines-edge
* (done) section folder for this and first demo
* (done) I went with the a demo I worked out for box geometry post, just hacked over it a little

## ( done 06/20/2023 ) - update all demos to r146 style
* (done) s1-1-meshbasic updated to r146 style
* (done) s2-1-meshdepth updated to r146 style
* (done) s3-1-meshlambert demo updated to r146 style
* (done) all demos updated to r146 style rules

## ( done 06/19/2023 ) - rename demo folders
* (done) rename demo folders
* (done) js files now at rot of each demo folder

## ( done 04/28/2022 ) - s8-points
* (done) section folder for this

## ( done 04/28/2022 ) - s7-mesh-physical-toon
* (done) section folder for this

## ( done 04/28/2022 ) - s6-mesh-standard
* (done) section folder for this

## ( done 04/28/2022 ) - s5-mesh-phong
* (done) section folder for this

## ( done 04/28/2022 ) - s4-mesh-normal
* (done) section folder for this

## ( done 04/28/2022 ) - s3-mesh-lambert folder
* (done) section folder for this

## ( done 04/28/2022 ) - s2-mesh-depth material
* (done) section folder for this

## ( done 04/28/2022 ) - basic material section folder
* (done) the basic material section folder
