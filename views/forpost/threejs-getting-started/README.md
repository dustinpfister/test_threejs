# threejs-getting-started

This is what I have together for source code examples that I aim t write about in [my getting started with threejs post](https://dustinpfister.github.io/2018/04/04/threejs-getting-started/). When it comes to first starting out with threejs the very first thing that I wanted to do is to just have that simple static box example up and running. So the of course the first main source code example that I have here is just that, a very simple hello world style example that is just a single fixed image of a view of a cube.

<div align="center">
      <a href="https://www.youtube.com/watch?v=ClD09l-Fu-I">
         <img src="https://img.youtube.com/vi/ClD09l-Fu-I/0.jpg" style="width:50%;">
      </a>
</div>

### Starting Code Standards

The starting code standards that I observe will of course change from time to time. However as of this writing in January of 2023 I am doing the following for each of my code examples.

* Use r146 of threejs
* Use the WebGL1 renderer
* Use let and const, over var
* Pass false when calling renderer.setSize method to allow for use of custom CSS
* Default to document.body for the container element to attach to
* Have comment blocks the clearly indicate what long blocks of top level code do.

So I start out an example with some code that might look something like this

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
```


