# threejs-canvas-texture

These are the source code examples for my [post on using canvas elements to create textures](https://dustinpfister.github.io/2018/04/17/threejs-canvas-texture/) that can then be used for the various maps used in the various materials in threejs. 

The basic process is to create a canvas element, draw to it, and then pass the canvas element to a constructor function like THREE.CanvasTexture to create a texture with canvas. This texture can then be used link any other when creating or updating one or more materials for a mesh. Alternatively the canvas element can be passed to THREE.Texture, it is just that I will need to make use that I set the needs update property of the texture to true. Speaking of the needs update property, just making sure that the needs update keeps getting set back to true in a loop is what I need to do in order to have animated textures using canvas elements.

<div align="center">
      <a href="https://www.youtube.com/watch?v=wy5cQ_cwqEo">
         <img src="https://img.youtube.com/vi/wy5cQ_cwqEo/0.jpg" style="width:50%;">
      </a>
</div>

