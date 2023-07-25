# threejs-data-texture 

This is what I have together for my [blog post on data textures](https://dustinpfister.github.io/2022/04/15/threejs-data-texture/). This is a way to create a texture by way of raw color channel data in the form of a typed array.

<div align="center">
      <a href="https://www.youtube.com/watch?v=gvLwa6vgesM">
         <img src="https://img.youtube.com/vi/gvLwa6vgesM/0.jpg" style="width:50%;">
      </a>
</div>

## THREEJS DOCS AND SOURCE CODE

* THREEJS DOCS

https://threejs.org/docs/#api/en/textures/DataTexture
https://threejs.org/docs/#api/en/textures/Texture

* source code \( r146 \) for DataTexture and Base Texture Class

https://github.com/mrdoob/three.js/blob/r146/src/textures/DataTexture.js
https://github.com/mrdoob/three.js/blob/r146/src/textures/Texture.js

## Other Blog Posts On Data Textures

Last I checked it looks like this post on data Textures is often showing up just behind the threejs docs when I search "data textures in threejs", so for the most part I just need to hold my ground with this one it would seem. Still I will want to check out what some other top posts are writing about when it comes to this subject to see if any of them bring up good points that I might want to expand on also.

### DEV Community post on data textures

https://dev.to/nicolasrannou/create-textures-from-data-in-threejs-5bap

The author says that the type argument of the base texture class is confusing them. I have not ran into the problem as the default type for a texture is UnsignedByteType and default format is RGBAFormat. So there is just working with the defaults with this and moving on. Still this does bring up a good point, not with data textures mind you but with the Base Texture class to which data textures extend from. So I might want to write a thing or two about types in the basic section, I might even go so far as to have a stand alone section on this topic but for now that might be a good start to say the least. I might also want to write down some notes with this when it comes to my blog post on the base texture class also.