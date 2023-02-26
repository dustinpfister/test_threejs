## threejs r150 notes

looks like threejs r150 is broken I get this error:

```
Program Info Log: Vertex shader is not compiled.
```

I might have to give up with r150 as the next revision to work with as it does not work on any computer that I have thus far. The isshue might be with the webgl renderer alone, but still that is a big problem.

### Last Working build

DATE: 02/13/2023 - 31e7b1fc7abb9c0933002e6c80a10d67c6e4cf3d <== works
DATE: 02/14/2023 - 9a0ea14aec7eac8c22370d681fa0a4b85b6a7c3d <== DOES NOT WORK

I looks like the changes that where made to common.glsl.js are what cased it to break for me.

So I might be able to create a custom r150 build that works my taking the up to date source code of r150, but reverting to the state of common.glsl.js in the last working build [found here](https://github.com/mrdoob/three.js/blob/31e7b1fc7abb9c0933002e6c80a10d67c6e4cf3d/src/renderers/shaders/ShaderChunk/common.glsl.js)

### Using a custom build of r150 to get it working with raspberry pi 4

I have made a custom build of threejs in which I am using an older state of the common.glsl.js file in the shader chunk lib. So far that seems to be working.

