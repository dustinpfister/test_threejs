# matcap-material demo for r152

I might write a full blog post on this mesh material option, but in any case I will at the very least want to expand my main blog post on matreials with a nice getting started type example of this mesh matreial option. In ither case I will want at least one, basic, getting started typpe demo of it. With that said this demo aims to be a good starting point involving a canvas texture and the use of the matcap option of the material.


## Other Posts, and Resources

### StackOverflow - how to shade a circle in canvas

Doing some quick reserach on how to darw a shaded sphere with the 2d canvas drawing content brought up the fact that this can be quickly done with the create Radial Gradient method

https://stackoverflow.com/questions/35518381/how-to-shade-the-circle-in-canvas

### StackOverflow - the color of meshmatcapmaterial looks very light

This popped up when searching just "threejs matcap material". The post brought up that like always there are a few texture object properties that I will want to tweak when making a map for this kind of material. An accepted answer for this suggested to set the encoding property of the texture used which has now been replaced with the color space property.

https://stackoverflow.com/questions/72179891/the-color-of-meshmatcapmaterial-looks-very-light

### Mozilla - CanvasRenderingContext2D

The Mozilla Docs on the use of the create Radial Gradient are a helpful way to refresh with this one as always.

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
