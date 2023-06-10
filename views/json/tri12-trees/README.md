# tri6-trees

I want to work out what a good over all standard will be for making external JSON assets in the buffer geometry fromat by way of hand coding data. So I am thinking that I should go with vertex coloring rather than bothering with textures, keep the number of triangles very low, and so forth.

## deciduous-one-full

The world full means these have all of the core attributes (posiiton, normal, and uv). As with all the other examples these also of course have color attributes as well. The uv attributes can be set up in such a way that all triangles will use the top or bottom half of a texture as I am thinking that is how I would want to set up the textures for these if I where to make any of them.

* They have a position, normal, and uv attribute
* They are indexed geometry
* They have a color attribute
* They are composed of at least 1, but no more that 12 triangles.
* These are to be used with the BufferGeometry loader
* They look like the kind of trees that one would see in a deciduous forest
* there should also be a number of morph attributes to allow for animation that way