# buffer-geometry-attributes-tangent r152 demo

There is a tangent attribute that can also be an attribute of interest of a geometry. This is then an aim at making a demo for a basic section of a post on this subject. However maybe even the basic example for this will not be so basic, or there are a bunch of steps before getting into this one.


There are a bunch of additional things that I will need to look into more, even for just a basic example it would seem.

* normal maps
* The computeMikkTSpaceTangents of the buffer geometry utils
* using tangent space or object space normal mapping


## normal map type

Looks like this can turn int a full blown rabbit hole if I let it turn into one. There are a lot of these with threejs, but yes the use of this tangent attribute does seem to very much go hand in hand with normal maps

normalMapType: THREE.ObjectSpaceNormalMap

https://3dkingdoms.com/tutorial.htm