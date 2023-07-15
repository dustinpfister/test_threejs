# threejs-materials

This is what I have when it comes to the source code examples that I am writing about in my [blog post on materials in general threejs](https://dustinpfister.github.io/2018/04/30/threejs-materials/). This is one of the first blog posts that I wrote, however I have editened and expanded the post a lot of times thus far, and will likley continue to do so with this topic now that I know a whole lot more about materials compared to when I first wrote this post.

<div align="center">
      <a href="https://www.youtube.com/watch?v=EouYzHldZd8">
         <img src="https://img.youtube.com/vi/EouYzHldZd8/0.jpg" style="width:50%;">
      </a>
</div>

## Other posts on materials in general that are "Comprehensive"

When I do a google search for "threejs materials" I am showing up but I am getting out ranked by [this post](https://chriscourses.com/blog/a-comprehensive-guide-to-materials-in-threejs). It is not that bad of a post, well maybe a little, but what floors me is that the Author has titled it "A Comprehensive Guide to Materials in Three.js". The content piece does not even mention all of the mesh materials options, let alone the options for lines and points, features of the base material class, groups AKA arrays of materials and therefor material index values, so forth and so on. Oh and there is no talk at all about textures.

```
Let's refer to the docs once more for a strict definition: MeshStandardMaterial is a standard physically based material, using Metallic-Roughness workflow.

All I can say is... wtf?

There is no way anyone knows what this actually means. To help do away with ambiguous definitions, let's see what a MeshStandardMaterial looks like by default with the following code:
```

Okay so a quick google search for the term "physically based material" gaive me this: 

"A Physically Based Rendering (PBR) material is a material that closely approximates the way light reflects off of real-world objects"

So I would take it that what this means is that the standard material is a little more realistic when it comes to approximating light, however that might come at the expense of a little more processing overhead compared to other options like that of the LambertMaterial for example. That is of course speculation based on some quick research that took me about 5 seconds. However in order to really get to the bottom of it I will of course need to do more research, study some source code in the threejs repo, do some testing and so forth.

Anyway I guess it is easy to criticize, but it is not always so easy to create, research, grow. These things take time, and a whole lot of it when it comes to these kinds of subjects. I should focus more so on my own content and the shortcomings that I see with it though if I want to rank a little higher in search. So I think that I will make this post one of the posts that I will go the distance with.


