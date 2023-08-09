# threejs-materials

This is what I have when it comes to the source code examples that I am writing about in my [blog post on materials in general threejs](https://dustinpfister.github.io/2018/04/30/threejs-materials/). This is one of the first blog posts that I wrote on threejs, however I have made a whole lot of edits thus far sense then, and will likely continue to do so with this topic. Now that I know a whole lot more about materials compared to when I first wrote this post way back in the day as of late I am starting to make this a kind of 5k+ word count Deep dive content piece. As of this writing the post is tactfully at the 10k+ mark and I still have way more to write about when it comes to every little detail about materials.

<div align="center">
      <a href="https://www.youtube.com/watch?v=EouYzHldZd8">
         <img src="https://img.youtube.com/vi/EouYzHldZd8/0.jpg" style="width:50%;">
      </a>
</div>

## What the plan is for future edits

The plan now is to keep expanding with even more sections on materials as there is still a great deal of ground to cover even when it comes to superficial level detail about various materials related topics. However I am now also taking a moment now and then to improve the demos that are all ready in place as well. I was at one point thinking I would just work on this a little each day for about a week, then move on to another post that I will start to get up to this level of quality. However I am thinking that I might want to still stay in my lane with this one for at least a little while longer.

I have started the following, but will be expanding and refining the demos in these sections

* s01    - A Basic section in which I touch base on every key detail about materials at least
* s02    - A Mesh Section in which I have just one decent example of each mesh material
* s03    - The Line Materials
* s04    - The Points Material
* s05    - The Sprite Material
* s06    - A common section on features that are shared for most if not all materials ( Base Material Class )
* s07    - Blending deep dive section
* s08    - Loaders, THREE.MaterialLoader, THREE.ObjectLoader, ect
* s09    - Textures and UV mapping Deep dive section
* s10    - Light
* s11    - Shadows
* s12    - Arrays of materials
* s13    - Fog
* s14    - THREE.ShaderMaterial

I will want to start sections on a lot of topics also though

* The Raw Shader material and with that RAW Shader GLSL code examples
* A section on node materials than can be found in the /examples/jsm/nodes folder
* A section on working directly with webgl alone
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

One major part of the process of writing a blog post not just on this topic but in general is to do research, and to not just start and end with the threejs DOCS and reading source code in the threejs repo on Github. There is of course studying the works of other developers that have wrote similar blog posts on this topic. In the process of doing so I will end up seeing what I should also write about, however there is also seeing what there is when it comes to things that are lacking as well. That is that there is getting inspired by reading great content of course, but there is also seeing all the not so great content as well, that often ends up out ranking the great stuff and seeing all the mistakes that I would like to not repeat myself. So then this is a collection of links to various resources that I have found, many of which popped up when searing the keyword "threejs materials" on Google.

### CANVAS TEXTURES - www.packtpub.com

https://hub.packtpub.com/threejs-materials-and-texture/

Not a post on materials in general, but does write about using canvas textures as a way to show depth. This is somehting that I like to do all the time as a way to create tetxures that can then be used with the various map options of materials.

### NODE MATERIALS - www.donmccurdy.com

https://www.donmccurdy.com/2019/03/17/three-nodematerial-introduction/

This is a good post that pointeded out somehting new that I was not aware of before. So for that reason alone this is a great post. It is not on materials in general mind you, but it is a nice little piece on the subject of NodeMaterials. The link that is given is broken becuase it links to the js folder that was removed in r148. This is a simple fix though as they are now in the JSM folder when it comes to late revison numbers, else you just need to make sure you are linking to the right revision like this:

https://github.com/mrdoob/three.js/tree/r155/examples/jsm/nodes

This is something I will want to look into more

### NICE COLLECTION OF SHADER MATERIAL DEMOS - github.com/MasatoMakino 

https://github.com/MasatoMakino/threejs-shader-materials

This looks like a nice collection of shader material demos. At some point I might want to take a closer look at the source code in an effor to learn more about GLSL.

### SHADER MATERIALS and varying GLSL variables jameshfisher

https://jameshfisher.com/2017/10/19/glsl-varying/

This was a nice, simple post on the subject of varying GLSL variables

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

Speaking of research when it comes to materials in threejs, I have found that I can never to enough research. Just when I think I have a comprehensive magnitude of understanding on materials I end up finding out just how much more I have to learn about it still. It is however easy to criticize, but it is not always so easy to create, research, and grow. These things take time, and a whole lot of it when it comes to these kinds of subjects. I should focus more so on my own content and the shortcomings that I see with it though. So I am taking the time to actually turn my post into a comprehensive post on materials in general, or rather I am trying to go that way at least. Thus far I have to say that although I have over 39 demos spanning 14 sections I still can not say with confidence that this is a comprehensive post on materials in threejs. I have not even scratched the surface on the THREE.ShaderMaterial class when it comes to opening that can of worms alone. That section could just keep getting expanded over and over again as there is so much to write about with that when it comes to the shader lib. Also at the time of this writing I have not even started a section on the THREE.RawShaderMaterial and when it comes to that there is a whole langugae to write about.

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

### medium.com/geekculture

https://medium.com/geekculture/threejs-tutorial-comparing-the-most-common-materials-424eef8942a4

This post started out not so bad, but then started writing about the Baisc Material.

>
>MeshBasicMaterial
>This is the most basic material of all. Meshes that apply this material usually show only a single colour. Lighting does not affect this material at all. When you look at an object using MeshBasicMaterial at different angles, at some point you just can’t figure out what you’re looking at!

>This material is a good choice if you want to render your model in a simple wireframe.
>

Once again we have the basic material is basic type line. However there is more than just that which bothers me with this as the author leads people reading this to believe that the basic material is just good for using write frame mode, otherwise you just have a solid mass of color. The basic material can sill be used with textures by way of the map option which is one way to go about showing depth. Another option is the common vertexColor option and adding a color attribute to the buffer geometry. The Basic material is a great over all final choice for certain projects actually and the post failed to make that clear.

### voskan.host

https://voskan.host/2023/02/02/materials-in-three-js-an-overview-with-examples-and-parameters/

Another post that does a disservice with the MeshBasicMaterial, fails to mention the map option that can be used to set texture and thus show depth. Fails to mention that the base material class is still there to work with as the Basic Material extends from that. Says that a list of options for the basic material that it gives is a "Complete list of parameters" when many are missing including the map option. Like other posts it looks like this post is to suggesting that the only way to show depth with the basic material is to set it in wireframe mode.

>
> The MeshNormalMaterial is a simple material that is used to visualize the normals of a mesh.
>

The normal attribute is a feature of buffer geometry objects, not the mesh object alone.

>
> The MeshNormalMaterial does not have any parameters
>

Again totaly wrong as with any mesh material there are all the options that are in the base material class that can be used. However I do not even know where this is coming from at all becuase there are a whole lot of options for the mesh normal material alone as well such as normalMap, fog, flatShading, not to mentine that wireframe that so many of these authors seem to like.

### blog.cjgammon.com

https://blog.cjgammon.com/threejs-materials/

Oh Boy here we go again...

>
> The most basic material is the MeshBasicMaterial. You can pass a color in as a parameter to get a solid colored object, which has no shading. You can also adjust the opacity by passing in the opacity as a parameter with a value from 0 to 1 and setting transparent to true.
>

I am noticing a pattern with this. Seems like a lot of these authors are just copying what is in other blog posts on this subject without adding or changing much. At least this time they mentioned a common base material class option, but sadly one that does not help show depth.

This is now solid for me when it comes to future edits, in my main section on mesh material options I made sure to feature the use of the map option. I am not sure if I will start having sections in which I expand more on each mesh material as I think that is something that I should do in stand alone blog posts for each material option, but maybe I should do so in this post also..


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

