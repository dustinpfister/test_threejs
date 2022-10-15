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
// canvas object 1 will be used for text
const canObj1 = TextPlane.createCanObj({
    rows: 12, size: 256,
    palette: ['rgba(0,0,0,0)', 'black', 'black']
});
// canvas object 2 will use the 'rnd' built in draw method
// as a way to create a background a little more interesting
// than just a static background
let canObj2 = canvasMod.create({
    draw: 'rnd',
    size: 256,
    update_mode: 'canvas',
    state: {
        gSize: 10
    },
    palette: ['#00ff00','#008800','#004400']
});
// canvas object 3 will be the final background use for the material
let canObj3 = canvasMod.create({
    draw: function(canObj, ctx, canvas, state){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.3;
        ctx.drawImage(canObj2.canvas, 0, 0);
        ctx.globalAlpha = 1;
        ctx.save();
        ctx.translate(128, 128);
        let d = state.rStart + state.rDelta * state.rAlpha;
        ctx.rotate(Math.PI / 180 * d);
        ctx.drawImage(canObj1.canvas, -128, -128);
        ctx.restore();
    },
    size: 256,
    update_mode: 'canvas',
    state: {
        rStart: -90,
        rDelta: 180,
        rAlpha: 0
    },
    palette: ['red','white','blue']
});
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.75, 2),
    new THREE.MeshBasicMaterial({
        map: canObj3.texture,
        transparent: true
    })
);
mesh.position.set(0, 1, 0);
scene.add(mesh);
//-------- ----------
// TEXT and textLines
//-------- ----------
const text2 = '\n\n888888888-888888888-88***\n\n\nThis is the custom draw method demo.\n\nThe idea here is that the canvas object that I am using for the text is just being used to update the canvas element. I then use that canvas element with the draw image method when drawing to another canvas element that is actauly used to to skin a geometry of a mesh object. \n\n'
const textLines = TextPlane.createTextLines(text2, 22);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(0, 1, 2);
camera.lookAt(0, 1, 0);
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
    TextPlane.moveTextLines(canObj1.state.lines, textLines, b * 0.5, 0, 30);
    // update canvas
    canvasMod.update(canObj1);
    canvasMod.update(canObj2);
    canObj3.state.rAlpha = b;
    canvasMod.update(canObj3);
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
