# threejs-object3d-position todo list

<!-- RAYCASTER SECTION -->

## s6-3-raycaster-world
* () I will want a custom geometry that is like a sphere but with unit lengths adjust to get bumps
* () use rayster to move one or more mesh objects around on the surface of this world

<!-- STOCHASTIC SECTION -->

If I am to make this kind of section many of these will be demos that involve human input.

<!-- BOX3 SECTION -->

## s7-2-box3-getsize
* () use set size methd to get the size of various mesh objects
* () use the size box3 objects in the process of setting, use guessed it position

<!-- LOOP SECTION -->

## () s8-6-loop-world-local
* () this will be an animation in which I have two groups
* () the two groups will be in motion
* () the children of both groups will be in motion
* () I will then have at least one 'free' mesh that is just a child of scene
* () use the getWorldPositon method to get the world space location of a current group
* () move the mesh object to a location relative to groups, children of groups, and the scene object

<!-- DONE -->

## ( done 06/07/2023 ) s7-1-box3-seedrandom
* (done) start with the relevant demo from the post on box3

## ( done 06/27/2023 ) s6-2-raycaster-mouseover
* (done) start with the demo from the post
* (done) I would like to just use the pointer move event for this one 

## ( done 06/27/2023 ) s6-1-raycaster-torus
* (done) start a raycaster section with at least one basic example with say a torus geometry
* (done) just start with a demo from the post on raycatser for this one

## ( done 05/30/2023 ) sx-2-bounds-wrap
* (done) animation involving wrap

## ( done 05/27/2023 ) s5-1-bounds-clamp
* (done) animation involving the use of clamp

## ( done 05/27/2023 ) s4-2-geometry-lerp
* (done) same as before but now allow for lerp points between them with low polly geo

## ( done 05/27/2023 ) style fix for basic section
* (done) files should be in roots of each folder
* (done) remove IIFEs from demos

## ( done 12/05/2022 ) s4-1-geometry
* (done) rename all loop examples to sx-* for now as that section will get shiften down a few times
* (done) start new s4-1-geometry example where I am just getting a Vector3 from position 
* (done) have both a sphere, and torus mesh objects
* (done) create a count of pointer mesh objects for both
* (done) cone geometry as well

## ( done 11/28/2022  ) s4-5-loop-video2
* (done) have some groups os mesh objects that are updated by position attributes of geomerty
* (done) have another mesh object moving along a curve

## ( done 11/28/2022 ) s4-4-loop-video1
* (done) start new section on the source code of video projects for this post
* (done) new example based on the source code for video1 in videoground-blog-posts

## ( done 11/27/2022 ) s3-3-curve-getalpha
* (done) have an example in which I at least touch base on get alpha methods
* (done) use at least some math util functions for this

## ( done 11/27/2022 ) have all loop examples use r146
* (done) update all loop exmaples to r146

## ( done 11/27/2022 ) have all children examples use r146
* (done 11/27/2022 ) update all children exmaples to r146

## ( done 11/27/2022 ) expand basic even more
* ( done ) s1-6-apply-euler

## ( done 11/27/2022 ) - update source of basic examples for r146
* (done) use r146 for all basic examples
* (done) make renderer changes

## ( done 11/27/2022 ) s1-1-curve-basic
* (done) new basic curve example

## ( done 10/31/2022 ) s4-3-loop-curve
* (done) new loop based on curve example

## ( done 10/31/2022 ) s3-1-curve
* (done) start a new section 3 on using curves to set the position of objects
* (done) base this first cuve example off of the example from mesh pos threejs-curve-quadratic-bezier-curve3
* (done) rename ani section folder

## ( done 09/29/2022 ) expand basic even more 
* (done) s1-5-normalize-multiply

## ( done 09/28/2022 ) expand children section
* (done) get world position example

## ( done 09/27/2022 ) sx-ani section
* (done) loop example where I am just moving mesh objects along the x axis at differing rates
* (done) lerp centered animation

## ( done 09/26/2022 ) expand basic section
* (done) rename s1-basic to s1-2-set
* (done) s1-1-props example where setting the position by x, y, z props
* (done) s1-3-copy
* (done) s1-4-lerp

## ( done 04/04 2022 ) s2-children
* (done) have an example that involves a group of mesh objects
* (done) set the position of each child
* (done) set the position of the group

## ( done 04/04/2022 ) first s1-basic section
* (done) just have a static scene example where a single mesh is being positioned
