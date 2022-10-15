//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.75, 0.75, 0.75);
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS OBJECT
//-------- ----------
const canObj = TextPlane.createCanObj({
    rows: 12, size: 512,
    palette: ['rgba(0,255,255,0.2)', 'black', 'black']
});
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 80, 80),
    new THREE.MeshBasicMaterial({
        map: canObj.texture
    })
);
scene.add(mesh);
//-------- ----------
// TEXT and textLines
//-------- ----------
const text2 = '\n\n\nThe main idea that I had with this involved just plane geometry.\n\nHowever I am going to want to have two create methods for this module, one of which I can use to create just a canvas object rather than a mesh. There are a lot of reasons why, one of which would be to use the texture of the canvas object with a whole other mesh object with geometry other than that of a plane. \n\n'
const textLines = TextPlane.createTextLines(text2, 30);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(0, 0.75, 1.25);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 600;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    let a = frame / frameMax;
    let b = 1 - Math.abs(0.5 - a) / 0.5;
    // UPDATE
    TextPlane.moveTextLines(canObj.state.lines, textLines, b * 0.4, 0, 30);
    // update canvas
    canvasMod.update(canObj);
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
