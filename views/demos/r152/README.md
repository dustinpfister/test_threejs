## threejs r152 Style Rules

Looks like the use of javaScript modules over that of plain old text\/javaScript mime type script tags is what will be the standard in future revisions of threejs. The removal of the js folder in the examples folder of the repo has all ready happened, so in order to use up to date add ons  need to start using javaScript modules anyway. Although three.js, and three.module.js are still being rendered in builds of threejs at this point, it is only a matter of time until they will be placed on the chopping block as well.

With r152 I will need to follow these guidelines then:

* The type="module" attribute will be used for script tags in html
* The use of import and export will then be used in the demos
* An import map will be used so that I do not have to give paths in the demos when using import

## Using Module Script Tags, and Import maps

I will be using import maps, and module type script tags for demos that follow these style rules. So then in my html I have at least two script tags, one to define the import map, and another to load the main module script.

```html
<script type="importmap">
    {
        "imports": {
            "three": "/js/threejs/0.152.0/three.module.js",
            "OrbitControls": "/js/threejs/0.152.0/controls/OrbitControls.js"
        }
    }
</script>

<script type="module" src="/demos/r152/getting-started-loop/main.js"></script>
```


## Main.mjs file example

The Style rules for r152 are then similar to what [I was doing for r146](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md).

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
// ---------- ----------
// CONTROLS
// ---------- ----------
let controls = null;
try {
    controls = new OrbitControls(camera, renderer.domElement);
}catch(e){
    console.warn('OrbitControls was not imported');
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
// constant values and state for main app loop
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120,
CLOCK = new THREE.Clock(true); // USING THREE.Clock in place of new Date() or Date.now()
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const update = (frame, frameMax) => {
    // alpha values come up all the time. I have started getting in the habbit of having
    // a Naming pattern for them like this:
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1 ) / 0.5;
    const a3 = THREE.MathUtils.smoothstep(a2, 0, 1);
    // update content
    const degree = 360 * a3
    mesh.rotation.x = THREE.MathUtils.degToRad(degree);
};
// loop
const loop = () => {
    const now = CLOCK.getElapsedTime(),
    secs = (now - lt);
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```