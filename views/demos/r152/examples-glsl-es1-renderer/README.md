# examples-glsl-es1-renderer

So it looks like the threejs devs are going to remove the WebGl1 renderer in a future revision \( r163 \) which means that I will have to stick with r162 from that point forward \( assuming that it will work with my Raspberry PI 4 to begin with \). However the idea has occurred to me that a good idea for a threejs project would be to start my own webgl renderer. I am not sure what to call it just yet, but often I think I should call it by the GLSL spec rather than WebGl1. So then something like THREE.GLSLES1Renderer rather than THREE.WebGL1Renderer. In any case this would be a major project that might go beyond what I can manage as a solo dev at least. That is unless I maybe take it on with a proper mindset as to what this kind of project needs to be.


## Start From the ground up

If I am going to start from the ground up then I will need to make a whole lot of sacrifices. I am thinking that I would just use the basic material only with projects that use this rendere. So no light would be used, depth will have to be expresses purely by way of textures, or the use of vertex colors if one is not happy with a solid mass of a single color for a mesh.

* use the source code of r152 WebGLRenderer as a Guide for getting core features work such as setSize, render, ect
* I will like to start my own GLSL lib, but I will want to use the GLSL code of r152 to start
* start by just supporting the Basic Material Only
* I will like to get solid color working first
* Get plain old color maps working
* vertex colors should work also
* Do what can be done to keep getting this project to work with r163+ when it comes out

## Start with a fork of threejs idea

If I want something that will work just like THREE.WebGl1Renderer I think the best way to get started with this would  be to just fork what is all ready working okay. From there I just need to learn more about GLSL and maintain as needed.

* I might have to start this off as a fork of THREEJS when looking at the source for THREE.WebGl1Renderer
* I can then rip out everything that does not have to do with THREE.WebGl1Renderer
* Do what can be done to keep getting this project to work with r163+ when it comes out

