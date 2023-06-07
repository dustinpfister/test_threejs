# vertcolor-trees

The idea here is to just make some hand coded tree models using vertex color attributes. I started this to just have some content to load when working on my buffer geometry loader abstraction method demos for my buffer-geometry-loader blog post, but I could also use them for any other relevant post such as the main buffer-geometry post, the post on color attributes and so forth.

## 6tri

As the name of this folder suggrest these are models that are just composed of six trangles. Keep in mind that I am hand coding these suckers in a text editor, so less is very much more when it comes to making these. Sense many of the parts of these kinds of trees will just be single triangles, and therefore will need to be used with the THREE.DoubleSide option, I am also not even bothering with normal attributes with these.

* 6 triangles for each json file
* indexed geometry
* vertex color attribute
* do not have to have all triangles form solid shapes

## 6tri-morph

Same as with 6tri, but now I am adding in morph attributes. I would also like to have morph attributes for the color attribute, but saidly it would seem that [this is not possible](https://github.com/mrdoob/three.js/issues/20057) at least [not with webgl1](https://github.com/mrdoob/three.js/pull/22293). Looking at the source code for the webgl renerer though it does look like color attributes are being updated, it is just that it will not work for me if I want to stick with webgl1. So as far as I can tell I have to just be happy with updating position and normals only.

* one or more more attributes for 'position'


## 12tri-plus

With this collection of trees I am bumping up the number of triangles to at least 12, and if I want to I can add even more if need be. The aim is to make all of the parts solid, so I will want to have normal attributes with these.

* 12 or more triangles for each json file
* indexed geometry
* vertex color attribute
* all triangles must form solid shapes
* must have a normal attribute, and must look okay with THREE.FrontSide material option