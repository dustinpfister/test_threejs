# threejs-normal-material

This is a collection of source code examples that I have together for [my blog post on the normal material in threejs](https://dustinpfister.github.io/2021/06/23/threejs-normal-material/).


<div align="center">
      <a href="https://www.youtube.com/watch?v=G5bD_dXg2M4">
         <img src="https://img.youtube.com/vi/G5bD_dXg2M4/0.jpg" style="width:50%;">
      </a>
</div>


## Vertex Position Order and Normals

For a long time I thought that the normal where used to set what side of a triangle is 'the front side', however I now know that it is in fact the order of the points in the position attribute that are used to set this actually. It turns out the the normal just come into play when it comes to the shading of materials. This became apparent to me when I was working out the sphere mutate demo for this post. As I invert the normal of the sphere it is just the shading that changes, and not what side is being rendered. Looks like I have a whole lot of editing to do when it comes to my posts on normals.

https://discourse.threejs.org/t/indexed-buffergeometry-front-and-back-side-assignment-normals-or-order-of-indices/36380/3

