# threejs-canvas-texture

These are the source code examples for my [post on using canvas elements to create textures](https://dustinpfister.github.io/2018/04/17/threejs-canvas-texture/) that can then be used for the various materials in threejs. The basic process is to create a canvas element, draw to it, and then pass the canvas element to a constructor function like THREE.CanvasTexture. Alternatively the canvas element can be passed to THREE.Texture, it is just that I will need to make use that I set the needs update property of the texture to true. Speaking of the needs update property just making sure that the needs update keeps getting set back to true i a loop is all I should need to do in order to have animated textures using canvas elements.

## Needed Files

* threejs r127

## Videos for this post

none

