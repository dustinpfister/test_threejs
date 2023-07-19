# threejs-materials todo list

<!-- S1 - BASIC SECTION -->

## () - s1-6-basic-light
* () use a material like phong
* () add a directional light source
* () both map and emissive maps used
* () color, emissive, and emissive intensity options used

## () - s1-7-basic-common
* () basic common options demo
* () this can start out the same as s1-2-basic-objects only add a color attribute
* () set the use vertex colors boolean for all of the materials used
* () might also choose to use other common material class features such as blending, opacity, ect keep in basic though

## () - s1-8-basic-shader
* () very simple hello world demo of the shader material

<!-- S2 - MESH SECTION -->

## () - s2-9-mesh-matcap
* () I should start a mesh matcap section when I have a post on this material option.

<!-- S3 - POINTS SECTION -->

<!-- S4 - LINES SECTION -->

<!-- S5 - COMMON ( BASE MATERIAL CLASS ) SECTION -->

## () - s5-3-common-vertexcolor
* () vertex color examples

## () - s5-4-common-depthfunc
* () depth function demo

<!-- S6 - BLENDING SECTION -->

At this time I do have one demo on the subject of blending and materials, but I can see that this is a subject that should have its own section. This is not a situation in which there are just a few constants for one property and that is it. Some of the constants for the blending property enabled other properties as well.

## () s6-2-blending-additive
* () demo about additive compared to normal

<!-- S7 - LOADERS SECTION -->

There are of course a lot of options when it comes to loading in material data. The main loader of interest with materials alone would be the MaterialLoader of course. However I think that I should also use this section to write a thing or two about the THREE.ObjectLoader also as this is the more general kind of loader that can be used to load a whole scene.

## () s7-2-loader-material-file
* () load a single json file of a materail demo

## () s7-3-loader-object-parse
* () parse json txt, but now in the object format

## () s7-4-loader-many
* () load many files demo
* () use material, texture, and buffergeometry loaders

<!-- S8 - TEXTURES SECTION -->

I would like to make my current s8-1-texture-emissive demo a real solid over all demo of the use of texture and uv mapping. However at some point I am going to want to rename this demo to something else that will be a more advanced demo later in the section. New demos should then just be more basic demos of various texture features that are must know features such as the filters and wrapping values.

## ( ) s8-1-texture-emissive - loop, rotation
* () I want to add a loop for this demo
* () work out a rotation feature for the setUVFace Helper
* () I think I might want to also have an order array for this helper as well, be sure to check out code on older demos for this

## ( ) s8-1-texture-emissive - uvmap status rects
* () the main element to render to should be a plain old 2d context canvas
* () draw to the 2d canvas with the domElement of the renderer
* () I would like to have a uv map status rect for the map texture
* () I would like to have a uv map status rect for the emissive map

<!-- S9 - LIGHT  -->

I should have a section on the subject of light

## () s9-1-light
* () first light demo should make use of ambient and directional light

<!-- S10 - SHADOWS  -->

Shadows should have there own section

## () s10-1-shadow
* () start a first basic example on shadows
* () use a spot light as the light source

<!-- s11 - Fog -->

<!-- s12 - MATERAL ARRAY SECTION -->

It would be nice to have a section where I get into material arrays, and groups of buffer geometry. If so I should have at least one demo in which I am using the Phong for metal surfaces, and Lambert for wood surfaces.

## sx-1-matarray-cube
* () a mesh that uses the cube geometry is a good start for this kind of subject as always
* () start with code from the mesh-material-index post if need be

## sx-2-matarray-plane
* () a mesh using a plane might be a good start when it comes to the add group method
* () see about making a custom one where we have an area that is a 'lake'
* () use the phong material for the lake area, and Lambert for the rest

<!-- s13 - SHADER MATERIAL SECTION -->

## () sx-1-shader-white
* () This will be a very basic hello word type example where I just have a blob of white area


<!-- s14 - RAW SHADER MATERIAL SECTION -->

When I get to it I should have at least one demo on the use of the raw shader material.

## () s13-1-rawshader-points
* () I would like to make a raw shader that will work with just points
* () draw points with a feature other than what is used with the points material as I am having problems with that on RPI OS

<!-- DONE -->

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