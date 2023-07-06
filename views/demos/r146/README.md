## threejs r146 Style Rules

Looks like this will be the last revision of threejs in which I use plain classic javaScript tags when working out new demos and updating old ones to the style rules for this revision.

So with r146 the following is what I will need to observe:

* I observe that the examples/js folder exists in the threejs Github repo
* Use old type="text/javascript" style script tags and NOT JSM
* Use let and const over var as it is time to do that, it has been time for a while actually.
* Loose IIFEs in examples in favor of just having top level code, will be doing that later anyway when using JSM in future style updates
* Have comment blocks that help clearly indicate differing blocks of code
* Use of the WebGL 1 renderer as the default go to renderer unless I must use WebGL 2
* Indent with four spaces

### r146 style outline

This revision of threejs still has a [js folder in the repo](https://github.com/mrdoob/three.js/tree/r146/examples/js), and with that plain old text/javascript mime type scripts that will work fine with three.min.js. This js folder was removed in later revisions of threejs starting with r148, and in time three.min.js will no longer be rendered in the repo as well. However as long as I stick with this style all of these files are still there to work with. In future revisions of threejs code styles I will have to use module script tags and with that add on files that work with such tags as well.

With r146 I have finally stopped doing things like typing var over that of let and const. I am the kind of person that does lag behind a fair amount when it comes to things like that. However it has been around eight years all ready, so it is time to just start doing this and not worry so much about code breaking because of it. It is true that just simply using var would not be enough anyway when it comes to using late revisions of threejs.

In older code styles I would often wrap all of the code into an IIFE as a way to not define to many global. For this style I am just not worrying to much about that, but also getting the code examples in better shape for JSM, as for the most part I will just need to add the use of import and some times export to get these code examples up to date with future JSM only revisions.

I have found that I like to use comments to create large blocks of text to define major typical areas of a threejs code demo. For the example there is the typical task of setting up the scene object, camera, and renderer to use with the demo that I like to group together into one section of the over all code.

I like to work on a Raspberry PI 4 actually for an array of reasons that I do not care to get into detail here. Amway this is why I have come to prefer using the WebGL 1 renderer first and foremost. This is the default but not the rule with my r146 style, if I do write a blog post on a threejs feature in which WebGL 2 must be used so be it.

A good example of what code examples should look like as of r146 would be the getting started demo I made. I will park that here in this readme file as well.

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