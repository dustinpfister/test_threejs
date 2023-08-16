# threejs-buffer-geometry

These are the source code examples that I am writing about in my [blog post on buffer geometry](https://dustinpfister.github.io/2021/04/22/threejs-buffer-geometry/) in general. The goal here is to have a post that is a nice general overview of making custom geometry with the buffer geometry constructor, but also just about everything else that has to do with geometry.

There is a lot to cover when it comes to buffer geometry, there are the various attributes of a geometry and now to create them with a little javaScript code, prototype methods, and other topics that are related to geometry when it comes to Mesh objects and materials. Attempting to cover everything that needs to be known in a single blog post would have to be done by writing a post that would end up being pretty lengthy. As such this post is one of my Deep dive content pieces where the aim is to have a post that if over 5000+ words, but the mian aim is to just to try to be comprehensive, or at least half way there if possible.

<div align="center">
      <a href="https://www.youtube.com/watch?v=l0CkGHtllxw">
         <img src="https://img.youtube.com/vi/l0CkGHtllxw/0.jpg" style="width:50%;">
      </a>
</div>


## Threejs Docs and Source

There is of course the main Doc on the Base Buffer geometry class. However there is also a whole lot of other built in class that extend from the class as well. In addition when it comes to making a custom geometry a major part of doing so involves the use of the buffer attribute class as well.

THREEJS DOCS:

Buffer geometry, and buffer attribute
https://threejs.org/docs/#api/en/core/BufferGeometry
https://threejs.org/docs/#api/en/core/BufferAttribute

various built in geometries
https://threejs.org/docs/#api/en/geometries/CapsuleGeometry
https://threejs.org/docs/#api/en/geometries/BoxGeometry
https://threejs.org/docs/#api/en/geometries/LatheGeometry


THREEJS SOURCE:

of course there is the source code for the the buffer geometry base class, and also buffer attribute

https://github.com/mrdoob/three.js/blob/r146/src/core/BufferGeometry.js
https://github.com/mrdoob/three.js/blob/r146/src/core/BufferAttribute.js

There are a number of built in geometry classes that extend from the buffer geometry class. Also there are some that extend from those as well such as the capsule geometry that extends from lathe geometry, which in turn extends from buffer geometry.

https://github.com/mrdoob/three.js/blob/r146/src/geometries/LatheGeometry.js
https://github.com/mrdoob/three.js/blob/r146/src/geometries/CapsuleGeometry.js

## Other Posts on Buffer Geometry 

Part of the process of making a deep dive post is to do a whole lot o research, and not just with the threejs DOCS and source code. There are two general reasons for this one of which is to get more ideas for sections, and learn a few new things now and then from other authors on this kind of content. The other reason why is to not repeat the same mistakes that I see over and over again as well.

### sbcode.net - THREE.Geometry and THREE.BufferGeometry

https://sbcode.net/threejs/geometry-to-buffergeometry/

searched "three js buffergeometry" at google

This post does bring up a good point, or at least it was as this is no longer a major concern for people that are using late revisions of threejs as they will of course have to use Buffer Geometry to begin with rather than update older code. However it might still be a concern for people that are new given that I am still seeing a loot of posts use the old THREE.Geometry class

### http://mtc-m21b.sid.inpe.br/ - General overview

http://mtc-m21b.sid.inpe.br/col/sid.inpe.br/mtc-m21b/2015/07.13.13.08/doc/evs-0.6.0/var/www/html/webgl/evs3d/preview/lib/three.js/r71-5/docs/api/core/BufferGeometry.html

Looks like an okay type post on buffer geometry, makes mention of a 'tangent attribute' which I should know about by now. Will have to look into that one more for sure.

>
>tangent (itemSize: 3)
>Stores the x, y, and z components of the tangent vector of each vertex in this geometry. Set by .computeTangents().
>

