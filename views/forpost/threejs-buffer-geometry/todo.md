# threejs-buffer-geometry todo list

<!-------- ----------
  // START NEW SECTIONS?
---------- --------->
## () - sx-1-builtin
* () start a section on built in geometry functions
* () the first example might be on using the plane geometry class

## () - sx-1-uvmapping
* () start an in depth section of uv mapping

## () - sx-1-vertcolors
* () start a section on vertex colors

## () - sx-1-morph
* () start a full seciton on the subject of morph attributes

<!-- S01 BASIC SECTION -->

## () - s01-6-basic-vertcolors
* () start a section on vertex colors

## () - s01-7-basic-tangents
* () start a section on tangents and normal maps

## () - s01-8-basic-morph
* () start a section on morph attributes

<!-- S02 LIGHT SECTION -->

## ( ) - s02-2-light-uv-indexed
* work out better code for setting the RGB values of a normal map


<!-- S03 METHODS SECTION -->

## () - s03-8-methods-clone
* () - have a demo on the copy method of buffer geometry


<!-- S05 LOADER SECTION -->

## () - s05-3-loader-object
* () have a demo that focus on the use of the toJSON method used on the object level

<!-- S06 MORPH ATTRIBUTES SECTION -->

<!-- DONE -->

## ( done 08/24/2023 ) - s03-7-methods-frompoints
* ( done ) basic from points demo

## ( done 08/23/2023 ) - s03-6-methods-translate
* (done) start with the center demo code
* (done) use translate in place of center

## ( done 08/22/2023 ) - s02-2-light-uv-indexed
* (done) add a uv to the geometry that is used
* (done) add an index
* (done) add texture
* (done) create a non indexed geometry from this for comparison

## ( done 08/21/2023 ) - s03-5-methods-center
* (done) just have a simple center demo

## ( done 08/16/2023 ) - s3-4-methods-apply-quaternion
* (demo) demo of the apply quaternion method

## ( done 08/15/2023 ) - s3-3-methods-compute-vertex-normals
* (done) demo of the use of compute vertex normals method

## ( done 08/13/2023 ) - s02-1-light-two-triangles
* (done) rename demo
* (done) remove loop
* (done) use just one material

## ( done 08/12/2023 ) - made tojson demo part of methods section
* (done) tojson demo now part of methods section

## ( done 08/12/2023 ) - s01-2-basic-normal - manual creation
* (done) make the normal attribute in the same way as position

## ( done 06/07/2023 ) - index and names for s5-2-loader-many-promise
* (done) index values passed when buffer on load method called
* (done) set names for the mesh objects

## ( done 06/05/2023 ) - s1-5-basic-index
* (done) have a basic example of an index
* (done) just use one from the post on this subject

## ( done 06/05/2023 ) - s5-2-loader-many-promise
* (done) demo using the promise helper function I worked out in in threejs-buffer-geometry-loader

## ( done 06/05/2023 ) - update all demos to r146 style
* (done) update all demos to r146 style
* (done) consolidate the first few demos that have to do with buffer attributes into a basic section

## ( done 06/04/2023 ) - update s8-1-loader to r146 style
* (done) updated s8-1-loader to r146 style

## ( done 02/06/2023 ) - new section on morph attributes
* (done) started a new section on morph attributes with a code example from my new post on the subject

## ( done 11/14/2022 ) - fixed uv demo
* (done) fixed the uv demo

## ( done 08/09/2022 ) - update s6-rotation example
* (done) - update s6-rotation example to showcase what the deal is for the video on buffer-geometry-rotation

## ( done 08/09/2022 ) - s8-from-json
* (done) basic example of the buffer geometry loader

## ( done 08/09/2022 ) - s7-to-json
* (done) example based on what I worked out for my post on the buffer-geometry-loader for this

## ( done 04/25/2022 ) - new s3 section on uv attribute
* (done) I am going to want a section on creating a uv attribute for a custom geometry
* (done) use a data texture solution to generate the texture to use for the uv example

## ( done 06/29/2021 ) - new s6 section on rotation of geometry
* (done) start a new s6 section that has to do with rotation of a buffer geometry
* (done) the example should make use of one of the buffer geometry proto methods that have to do with rotation of geometry

## ( done 06/29/2021 ) - look into use the threejs normal helper for s3 and any other demos
* (done) see about just using the threejs normal helper in the threejs github repo
* (done) use normal helper in s3 demo

## ( done 06/29/2021 ) - first state of for post folder
* (done) just start a forpost folder that reflects the current state of the post for s2, s3, s4, and s5