//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LINES
//-------- ----------
const opt = {
    maxRadius: 8,
    pointsPerCircle: 100,
    circleCount: 40,
    linewidth: 4,
    colors: ['red', 'lime', 'blue', 'yellow', 'green', 'cyan', 'orange', 'pink', 'purple'],
    forPoint: function(v, s, opt){
        v.x = v.x + -0.5 + 1 * Math.random();
        v.z = v.z + -0.5 + 1 * Math.random();
        return v;
    }
}
const g1 = LinesSphereCircles.create(opt);
scene.add(g1);

// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax * 4 % 1;
    const a2 = 1 - Math.abs( 0.5 - a1 * 8 % 1 ) / 0.5;
    g1.children.forEach( (line, i, arr) => {
        // rotate
        const count = Math.floor(i + 1);
        line.rotation.z = Math.PI * 2 * count * a1;
        // scale
        const s = 1 - (i / arr.length * 0.5 * a2);
        line.scale.set(s, s, s);
        // material
        const m = line.material;
        m.transparent = true;
        m.opacity = 0.85 - 0.80 * ( i / arr.length);
    });
    LinesSphereCircles.setByFrame(g1, frame, frameMax, opt);
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
