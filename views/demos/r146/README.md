## threejs r146 notes

Looks like this will be the last revision of threejs in which I use plain classic javaScript tags when working out my demos, and updating the for post folders.

* I observe that the examples/js folder exists in the threejs Github repo
* Use old type="text/javascript" style script tags and NOT JSM
* use let and const over var as it is time to do that, it has been time for a while actually.
* loose IIFEs in examples in favor of just having top level code, will be doing that later anyway when using JSM
* Have comment blocks that help clearly indicate differing blocks of code

### r146 style outline

Starting with r146 I have finally stopped doing things like typing var over that of let and const. I am the kind of person that does lag behind a far amount when it comes to things like that however it has been over eight years all ready, so it is time to just start doing this and not worry so much about code breaking because of it. It is true that just simply using var would not be enough anyway when it comes to using late revisions of threejs anyway.

A good example of what code examples should look like as of r146 would be the getting started demo I made, ill park that here in this readme too.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(box);
// render
renderer.render(scene, camera);
// ---------- ----------
// CONTROLS
// ---------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const degree = 360 * (frame / frameMax);
    box.rotation.x = THREE.MathUtils.degToRad(degree);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
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