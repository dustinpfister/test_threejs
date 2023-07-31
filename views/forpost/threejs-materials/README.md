# threejs-materials

This is what I have when it comes to the source code examples that I am writing about in my [blog post on materials in general threejs](https://dustinpfister.github.io/2018/04/30/threejs-materials/). This is one of the first blog posts that I wrote, however I have made a whole lot of edits thus far, and will likely continue to do so with this topic now that I know a whole lot more about materials compared to when I first wrote this post way back in the day.

<div align="center">
      <a href="https://www.youtube.com/watch?v=EouYzHldZd8">
         <img src="https://img.youtube.com/vi/EouYzHldZd8/0.jpg" style="width:50%;">
      </a>
</div>

## What the plan is for future edits

I am going to make this post on materials in general one of the posts that I will keep working on a little each day for at least a week or longer until it starts to become a Deep Dive kind of post if that makes any sense. One vague feature of this kind of post I would say is at least 5,000+ words, however I would also say that the bulk of that writing is NOT Padding. I could just go on and on and on about things sure, but what I really want to do is make this post a lengthy content piece of substance.

I have started the following, but will be expanding and refining the demos in these sections

* s01    - A Basic section in which I touch base on every key detail about materials at least
* s02    - A Mesh Section in which I have just one decent example of each mesh material
* s03    - Sections for Line Materials
* s04    - The Points Material
* s05    - A common section with mnay demos on features that are sharded for all materials
* s06    - Blending deep dive section
* s07    - Loaders, THREE.MaterialLoader, THREE.ObjectLoader, ect
* s08    - Textures and UV mapping Deep dive section
* s09    - Light
* s10    - Shadows
* s11    - Arrays of materials
* s12    - Fog
* s13    - THREE.ShaderMaterial

I will want to start sections on a lot of topics also though

* the Raw Shader material and with that RAW Shader GLSL code examples
* A section on FPS testing of various materials
* One or more sections on 'user-style' that is just going with certain features and being done with materials


### Going the distance

So I have found that I am getting out ranked by posts that are saying they are Comprehensive in the title, but of course the post is in no way Comprehensive. However maybe I should not be so quick to judge sense my main blog post on materials here is far from comprehensive as well. Sure I am not saying that the content is Comprehensive in the title, but I could start going in that direction, and maybe some day earn the right to put that word in the title rather than just putting it there without much thought about what that word means.

So I can start working on the code examples at least a little each day, for a few days, for at least maybe a week or longer to start going further in that direction. With that said I have worked out some things in the todo list, and also think I should write down some notes here as well.

### Threejs DOCS and Directly studying source code

Of course there is just looking over what the DOCS have to say about each mesh, point, and line materials as well as other related features such as the base material class that all of these extend from. However the DOCS are a bit lacking with a lot of things, which is good for people like be that aim to write deep dive style content on subjects such as this.

THREEJS DOCS for Base class, constants, core specific Mesh materials

https://threejs.org/docs/#api/en/materials/Material
https://threejs.org/docs/#api/en/constants/Materials
https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
https://threejs.org/docs/#api/en/materials/MeshLambertMaterial
https://threejs.org/docs/#api/en/materials/MeshStandardMaterial

Source code ( r146 ) for the base material class, as well as some to the usual suspects for mesh materials

https://github.com/mrdoob/three.js/blob/r146/src/materials/Material.js
https://github.com/mrdoob/three.js/blob/r146/src/materials/MeshBasicMaterial.js
https://github.com/mrdoob/three.js/blob/r146/src/materials/MeshLambertMaterial.js
https://github.com/mrdoob/three.js/blob/r146/src/materials/MeshStandardMaterial.js

Source code ( r146 ) for the Points Material, and the Line materials
https://github.com/mrdoob/three.js/blob/r146/src/materials/LineBasicMaterial.js
https://github.com/mrdoob/three.js/blob/r146/src/materials/LineDashedMaterial.js


Source code ( r146 ) of the shader lib ( A good way to start to learn GLSL for THREE.ShaderMaterial, and THREE.RawShaderMaterial)
https://github.com/mrdoob/three.js/tree/r146/src/renderers/shaders/ShaderChunk
https://github.com/mrdoob/three.js/tree/r146/src/renderers/shaders/ShaderLib

## Other posts on materials in General

One major part of the process of writing a blog post on just on this topic but in general is to do research, and to not just start and end with the threejs DOCS and reading source code. There is of course studying the works of other developers that have wrote similar blog posts on this topic. In the process of doing so I will end up seeing what I should also write about, however there is also seeing what there is when it comes to things that are lacking as well. So far it would seem that A lot of the content that I have found searhing on google is very much lacking. However still the main aim of doing this is to learn a think or two.

### Chris Courses "Comprehensive" post on materials in threejs \( chriscourses.com \)

https://chriscourses.com/blog/a-comprehensive-guide-to-materials-in-threejs

When I do a Google search for "threejs materials" I am showing up but I am getting out ranked by [this post](https://chriscourses.com/blog/a-comprehensive-guide-to-materials-in-threejs). It is not that bad of a post when it comes to a beginners introduction to the subject, but what floors me is that the author has titled it "A Comprehensive Guide to Materials in Three.js". The content piece does not even mention all of the mesh materials to work with, let alone the options for lines and points, features of the base material class, use of arrays of materials. There is no talk at all about textures, uv mapping, and the various options of materials that make use of textures, or much of any other base material class options, or options for specific materials. No mention at all of the Shader Material, Raw Shader Material, and with that the shader lib as well as raw GLSL code, you get the idea. The post is in no way at all even remotely comprehensive, but there is more.

This bit of text also sticks out for me:

>Let's refer to the docs once more for a strict definition: MeshStandardMaterial is a standard physically based material, using Metallic-Roughness workflow.
>
>All I can say is... wtf?
>
>There is no way anyone knows what this actually means. To help do away with ambiguous definitions, let's see what a MeshStandardMaterial looks like by default with the following code:


Okay so a quick Google search for the term "physically based material" gave me this: 

"A Physically Based Rendering (PBR) material is a material that closely approximates the way light reflects off of real-world objects"

So I would take it that what this means is that the standard material is a little more realistic when it comes to approximating light, however that might come at the expense of a little more processing overhead compared to other options like that of the LambertMaterial maybe? That is of course speculation based on some quick research that took me about 5 seconds. However in order to really get to the bottom of it I will of course need to do more research, study some source code in the threejs repo, do some testing and so forth. In other words what needs to happen here is doing research on what it is that I aim to write about which is a very important part of any topic that one will write about, and not just with tech topics of course. 

Speaking of research when it comes to materials in threejs, I have found that I can never to enough research. Just when I think I have a comprehensive magnitude of understanding on materials I end up fining out just how much more I have to learn about it still. It is however easy to criticize, but it is not always so easy to create, research, and grow. These things take time, and a whole lot of it when it comes to these kinds of subjects. I should focus more so on my own content and the shortcomings that I see with it though. So I am taking the time to actually turn this post into a comprehensive post on materials in general, and thus far I have to say that although I have over  25 demos spanning 13 sections I still can not say with confidence that this is a comprehensive post on materials in threejs. I have not even scratched the surface on the THREE.ShaderMaterial class when it comes to opening that can of worms, and with that one I have the shader lib to work with of course, as if this writing I have not even started my section on the THREE.RawShaderMaterial class.

### log rocket

https://blog.logrocket.com/three-js-geometries-and-materials/

I have also check out another top ranking post on 'threejs materials' here on [the site log rocket](https://blog.logrocket.com/three-js-geometries-and-materials/). This post has a lot of problems the first of which is that the author suggests to use Github as a CDN it would seem which I would say is a bad idea for a number of reasons but in any case the link given is now a 404 anyway. I think what it should link to is the raw.githubusercontent if you are going to do it that way but that is not the only problem with this. Another glaring issue is that there is no version number given in the link, and also there is no mentine of what version the author was using at this time. So with that said even if a reader of this content was to follow this, and fix that the link isshue, they would run into another problem with the next major issue that I found.

With that said another thing that stuck out right away was the use of THREE.CubeGeometry which was removed from threejs somewhere between r111, and r125. So in late revisions that example will break as that will result in calling undefined if they where to just grab whatever the lateset version is at this time, or any any other time moving forward. 

### tutorialspoint

https://www.tutorialspoint.com/threejs/threejs_materials.htm

>
>MeshBasicMateria
>
>It is the very basic material in Three.js.
>

So the Basic "Materia" is Basic, thanks helps a lot.

I am sure that there are other great posts on materials on threejs, but I think this right here really proves that quality of content alone will only get one so far.

## Additional Notes

This is just a place where I am parking additional ideas that apply to future edits of this post, as well as choices that where made in the past. When I get ideas I will want to write them down somewhere of course and this seems like a good place to park that.

### Consolation of mesh material demos into a “Mesh Options” Section

When I started this post I have a section for  each mesh material option, that is one section for the BasicMaterial, another for PhongMaterial, and so forth. This might make sense if I am going to have many demos for each material, however thus far that is not the case at this time. When it comes to many of the plans that I have for future edits I am going to start to have a lot of sections that apply to materials in general, and also subjects where there are some overlap with many other threejs features in the geometry class, textures, and so forth. So I am thinking that I should consolidate all of the simple mesh material demos into a single mesh options section. If I do start to write deep dive sections I can have a Basic Material Deep Dive Section, Phong Deep Dive Section, and so forth.

### Proper Basic Section

I think it might be good to have a proper basic section with a few very simple demos for what I will expand more on in additional sections. For example I can have a basic example of using an map option with a canvas texture, but then have a far more advanced section where the main focus is on getting started with textures, and with that also UV mapping.

### Shader Materials

I have wrote a single blog post on the shader material, but sense then I have not got around to exploring more with this and the shader lib of threejs. This is without question a must have section for this post at this time, and I would like to have a simple demo, as well as a whole lot more moving forward from there.

### Having Some Sections on 'user style'

The aim these days is to turn this post into a major deep dive post on the subject of materials in threejs. That is to just really dive down deep when it comes to this subject and just keep going. However that might not be the best idea when it comes to learning about materials, or any subject in general actually. What really needs to happen here of course is to figure out what one needs to know about materials, and then move on with ones life and start to study other subjects. This is where the idea of user styles comes into play, where there is just going with a certain material, and with that just using a few options of that material, and that is it.

### 'N64Like' style - Basic Material with low res map texture

One user style that I think I can move forward with is an N64Like style where I am just using the THREE.MeshBasicMaterial alone. On top of that I am also just using the map option of the material and with that very low res textures say maybe 128 x 128. So then I am doing nothing at all with light sources with this, and thus it is the textures alone that will be used to help show some depth. This in turn will also be used with geometry that has a very low count of points.

