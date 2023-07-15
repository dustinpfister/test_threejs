# threejs-materials

This is what I have when it comes to the source code examples that I am writing about in my [blog post on materials in general threejs](https://dustinpfister.github.io/2018/04/30/threejs-materials/). This is one of the first blog posts that I wrote, however I have editened and expanded the post a lot of times thus far, and will likley continue to do so with this topic now that I know a whole lot more about materials compared to when I first wrote this post.

<div align="center">
      <a href="https://www.youtube.com/watch?v=EouYzHldZd8">
         <img src="https://img.youtube.com/vi/EouYzHldZd8/0.jpg" style="width:50%;">
      </a>
</div>

## Other posts on materials in general that are "Comprehensive"

When I do a google search for "threejs materials" I am showing up but I am getting out ranked by [this post](https://chriscourses.com/blog/a-comprehensive-guide-to-materials-in-threejs). It is not that bad of a post, well maybe a little, but what floors me is that the Author has titled it "A Comprehensive Guide to Materials in Three.js". The content piece does not even mention all of the mesh materials options, let alone the options for lines and points, features of the base material class, groups AKA arrays of materials and therefor material index values, so forth and so on. Oh and there is no talk at all about textures, and the various options that make use of textures, or much of any other base options, or options for specific materials. No mention at all of the Shader Material, Raw Shader Material, so forth and so on, you get the idea. The post is on no way at all  comprehensive, but there is more.

This bit of text also sticks out for me:


>Let's refer to the docs once more for a strict definition: MeshStandardMaterial is a standard physically based material, using Metallic-Roughness workflow.
>
>All I can say is... wtf?
>
>There is no way anyone knows what this actually means. To help do away with ambiguous definitions, let's see what a MeshStandardMaterial looks like by default with the following code:


Okay so a quick google search for the term "physically based material" gaive me this: 

"A Physically Based Rendering (PBR) material is a material that closely approximates the way light reflects off of real-world objects"

So I would take it that what this means is that the standard material is a little more realistic when it comes to approximating light, however that might come at the expense of a little more processing overhead compared to other options like that of the LambertMaterial for example. That is of course speculation based on some quick research that took me about 5 seconds. However in order to really get to the bottom of it I will of course need to do more research, study some source code in the threejs repo, do some testing and so forth.

Anyway I guess it is easy to criticize, but it is not always so easy to create, research, grow. These things take time, and a whole lot of it when it comes to these kinds of subjects. I should focus more so on my own content and the shortcomings that I see with it though if I want to rank a little higher in search. So I think that I will make this post one of the posts that I will go the distance with.

## Going the distance


So I have found that I am getting out ranked by posts that are saying they are Comprehensive in the title, but of course the post is in no way Comprehensive. However maybe I should not be so quick to judge sense my main blog post on materials is far from Comprehensive as well. Still I guess I could start working on this post at least a little each day, for a few days, for at least maybe a week or longer to start going further in that direction at least. So I have worked out some things in the todo list for this one, and also think I should write down some notes here as well.

### Consolation of mesh material demos into a “Mesh Options” Section

When I started this post I have a section for  each mesh material option, that is one section for the BasicMaterial, another for PhongMaterial, and so forth. This might make sense if I am going to have many demos for each material, however thus far that is not the case at this time. When it comes to many of the plans that I have for future edits I am going to start to have a lot of sections that apply to materials in general, and also subjects where there are some overlap. So I am thinking that I should consolidate all of the simple mesh material demos into a single mesh options section. If I do start to wrote deep dive sections I can have a Basic Material Deep Dive Section, Phong Deep Dive Section, and so forth

### Proper Basic Section

I think it might be good to have a proper basic section with a few very simple demos for what I will expand more on in additional sections. For example I can have a basic example of using an map option with a canvas texture, but then have a far more advanced section where the main focus is on getting started with textures, and with that also UV mapping.

### Shader Materials

I have wrote a single blog post on the shader material, but sense then I have not got around to exploring more with this and the shader lib of threejs. This is without question a must have section for this post at this time, and I would like to have a simple demo, as well as a whole lot more moving forward from there.




