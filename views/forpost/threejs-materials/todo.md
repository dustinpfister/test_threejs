# threejs-materials todo list



<!-- MATERAL ARRAY SECTION -->

It would be nice to have a section where I get into material arrays, and groups of buffer geometry. If so I should have at least one demo in which I am using the Phong for metal surfaces, and Lambert for wood surfaces.

## sx-1-matarray-cube
* () a mesh that uses the cube geometry is a good start for this kind of subject as always
* () start with code from the mesh-material-index post if need be

## sx-2-matarray-plane
* () a mesh using a plane might be a good start when it comes to the add group method
* () see about making a custom one where we have an area that is a 'lake'
* () use the phong matreial for the lake area, and lambert for the rest

<!-- SHADER MATERIAL SECTION -->

## sx-1-shader-white
* () This will be a very basic hello word type example where I just have a blob of white area

<!-- TEXTURES SECTION -->

Start a textures section where the focus is on textures and the various map options of materials. This is also where I can adress in detail much about subjects that overlap the use of textures such as the uv attributes of geometry.

<!-- LOADERS SECTION -->

There are of course a lot of options when it comes to loading in material data. The main loader of intereset with materials alone would be the MaterialLoader of course. However I think that I should also use this section to write a thing or two about the THREE.ObjectLoader also as this is the more general kind of loader that can eb used to load a whole scene.

## () s7-1-loader-material-parse
* () a demo in which I parse json as hard coded text
* () the json text can just be some data for the MeshBasicMaterial

## () s7-2-loader-material-file
* () load a single json file of a materail demo

## () s7-3-loader-object-parse
* () parse json txt, but now in the object format

## () s7-4-loader-many
* () load many files demo
* () use material, texture, and buffergeometry loaders

<!-- BLENDING SECTION -->

At this time I do have one demo on the subject of blending and materials, but I can see that this is a subject that should have its own section. This is not a situation in which there are just a few constants for one property and that is it. Some of the constants for the blending property enabled other properties as well.

## () s6-1-blending-none
* () start a demo where we are using canvas2d rendering and drawing to that canvas with the renderer
* () this will be a comparision demo with normal blending, and no blending

## () s6-2-blending-additive
* () demo about additive compared to normal

<!-- BASIC SECTION -->

## () - s1-5-basic-uvmapping
* () simular to that of texture demo but doing uv edits

## () - s1-6-basic-light
* () use a material like phong
* () add a direcitonal light source
* () both map and emissive maps used
* () color, emissive, and emissive intesnity options used

## () - s1-7-basic-common
* () basic common options demo
* () this can start out the same as s1-2-basic-objects only add a color attribute
* () set the use vertex colors boolen for all of the materials used
* () might also choose to use other common material class features such as blending, opacity, ect keep in basic though

<!-- MESH SECTION -->

## () - s2-9-mesh-matcap
* () I should start a mesh matcap section when I have a post on this material option.

<!-- POINTS SECTION -->

<!-- LINES SECTION -->

<!-- COMMON ( BASE MATERIAL CLASS ) SECTION -->

## () - sx-3-common-vertexcolor
* () vertex color examples

## () - sx-4-common-depthfunc
* () depth function demo

<!-- DONE -->

## ( done 07/17/2023 ) - s2-8-mesh-toon - gradient map
* (done) see about adding a gradient map
* (done) write more about this demo

## ( done 07/17/2023 ) - sx-2-common-blending
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