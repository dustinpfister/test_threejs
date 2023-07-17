# threejs-materials

This is what I have when it comes to the source code examples that I am writing about in my [blog post on materials in general threejs](https://dustinpfister.github.io/2018/04/30/threejs-materials/). This is one of the first blog posts that I wrote, however I have made a whole lot of edits thus far, and will likely continue to do so with this topic now that I know a whole lot more about materials compared to when I first wrote this post way back in the day.

<div align="center">
      <a href="https://www.youtube.com/watch?v=EouYzHldZd8">
         <img src="https://img.youtube.com/vi/EouYzHldZd8/0.jpg" style="width:50%;">
      </a>
</div>

## What the plan is for future edits

I am going to make this post on materials in general one of the posts that I will keep working on a little each day for at least a week or longer until it starts to become a Deep Dive kind of post if that makes any sense. One vague feature of this kind of post I would say is at least 5,000+ words, however I would also say that the bulk of that writing is NOT Padding. I could just go on and on and on about things sure, but what I really want to do is make this post a lengthy content piece of substance.

I have started the following, but will be expanding and refineing the demos in these sections

* A Basic section in which I touch base on every key detail about materials at least
* A Mesh Section in which I have just one decent example of each mesh material
* Sections for Line Materials, and the Points Material
* A common section with mnay demos on features that are sharded for all materials

I will want to start sections on a lot of topics also though
* () the shader material, and with that the ShaderLib
* () the Raw Shader material and with that RAW Shader GLSL code examples
* () Loaders, THREE.MaterialLoader, THREE.ObjectLoader, ect
* () Blending deep dive section
* () Textures and UV mapping Deep dive section
* () geometry.groups and material index deep dive section

## Other posts on materials in general that are "Comprehensive"

When I do a google search for "threejs materials" I am showing up but I am getting out ranked by [this post](https://chriscourses.com/blog/a-comprehensive-guide-to-materials-in-threejs). It is not that bad of a post, well maybe a little, but what floors me is that the author has titled it "A Comprehensive Guide to Materials in Three.js". The content piece does not even mention all of the mesh materials options, let alone the options for lines and points, features of the base material class, use of arrays of materials, so forth and so on. Oh and there is no talk at all about textures, uv mapping, and the various options that make use of textures, or much of any other base material class options, or options for specific materials. No mention at all of the Shader Material, Raw Shader Material, you get the idea. The post is in no way at all comprehensive, not even close, but there is more.

This bit of text also sticks out for me:

>Let's refer to the docs once more for a strict definition: MeshStandardMaterial is a standard physically based material, using Metallic-Roughness workflow.
>
>All I can say is... wtf?
>
>There is no way anyone knows what this actually means. To help do away with ambiguous definitions, let's see what a MeshStandardMaterial looks like by default with the following code:


Okay so a quick google search for the term "physically based material" gaive me this: 

"A Physically Based Rendering (PBR) material is a material that closely approximates the way light reflects off of real-world objects"

So I would take it that what this means is that the standard material is a little more realistic when it comes to approximating light, however that might come at the expense of a little more processing overhead compared to other options like that of the LambertMaterial maybe? That is of course speculation based on some quick research that took me about 5 seconds. However in order to really get to the bottom of it I will of course need to do more research, study some source code in the threejs repo, do some testing and so forth.

### What I take from this Post

It is easy to criticize, but it is not always so easy to create, research, and grow. These things take time, and a whole lot of it when it comes to these kinds of subjects. I should focus more so on my own content and the shortcomings that I see with it though if I want to rank a little higher in search. So I think that I will make this post one of the posts that I will go the distance with as it would seem that this is needed here.

### Going the distance

So I have found that I am getting out ranked by posts that are saying they are Comprehensive in the title, but of course the post is in no way Comprehensive. However maybe I should not be so quick to judge sense my main blog post on materials here is far from comprehensive as well. Sure I am not saying that the content is Comprehensive in the title, but I could start going in that direction, and maybe some day earn the right to put that word in the title rather than just putting it there without much thought about what that word means. So I can start working on the code examples at least a little each day, for a few days, for at least maybe a week or longer to start going further in that direction. With that said I have worked out some things in the todo list, and also think I should write down some notes here as well.

## Consolation of mesh material demos into a “Mesh Options” Section

When I started this post I have a section for  each mesh material option, that is one section for the BasicMaterial, another for PhongMaterial, and so forth. This might make sense if I am going to have many demos for each material, however thus far that is not the case at this time. When it comes to many of the plans that I have for future edits I am going to start to have a lot of sections that apply to materials in general, and also subjects where there are some overlap with many other threejs features in the geometry class, textures, and so forth. So I am thinking that I should consolidate all of the simple mesh material demos into a single mesh options section. If I do start to write deep dive sections I can have a Basic Material Deep Dive Section, Phong Deep Dive Section, and so forth.

## Proper Basic Section

I think it might be good to have a proper basic section with a few very simple demos for what I will expand more on in additional sections. For example I can have a basic example of using an map option with a canvas texture, but then have a far more advanced section where the main focus is on getting started with textures, and with that also UV mapping.

## Shader Materials

I have wrote a single blog post on the shader material, but sense then I have not got around to exploring more with this and the shader lib of threejs. This is without question a must have section for this post at this time, and I would like to have a simple demo, as well as a whole lot more moving forward from there.




