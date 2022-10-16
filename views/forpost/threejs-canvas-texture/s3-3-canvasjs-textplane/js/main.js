//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// TEXT LINES
//-------- ----------
const textLines = [
    '',
    '',
    '',
    'This is just some demo text',
    'for a kind of text plane module',
    'idea that I might get into',
    'it will work with this canvas.js',
    'module that I made.',
    '',

    'It might prove to be a cool',
    'Little project that I will then',
    'start to use in future video projects',
    'as I seem to like to make videos',
    'using threejs.',
    '',
    'I hope that getting this to work does',
    'not end up eating up to much time',
    'as I have way to many ideas for',
    'projects such as this one.',
    '',
    'So far it looks like I need to',
    'figure out how to go about adjusting',
    'some things that have to do with',
    'the rate at which the text is moved',
    ''
];

//-------- ----------
// HELPERS
//-------- ----------
// make plane helper function
const makePlane = (texture, size) => {
    return new THREE.Mesh(
        new THREE.PlaneGeometry(6, 4, 1, 1),
        new THREE.MeshBasicMaterial({
            map: texture || null,
            side: THREE.DoubleSide
        })
    );
};
// create an array of text objects to use with the drawText method
// this is a reusable set of objects
const createLines = (rows) => {
    let i = 0;
    const lines = [];
    while(i < rows){
        lines.push({
            text: '#' + i,
            x: 10, y : 30 + 60 * i,
            lw: 2, fc: '', sc: '',
            a: 'left', f: 'arial', fs: '30px', bl: 'top'
        });
        i += 1;
    }
    return lines;
};
// smooth move of lines on the Y
const smoothY = (lines, alpha, sy, dy) => {
    let i = 0;
    const len = lines.length;
    while(i < len){
        const li = lines[i];
        li.y = sy + dy * i - dy * alpha * 1;
        i += 1;
    }
};
// move full set of text lines
const moveTextLines = (lines, textLines, alpha) => {
    linesLen = lines.length;
    const tli = Math.floor( textLines.length * alpha);
    textLines.slice(tli, tli + linesLen).forEach( (text, i) => {
        lines[i].text = text;
    });
    smoothY(lines, alpha * textLines.length % 1, 30, 60);
};
// The custom draw text method to be used with canvas.js
const drawText = (canObj, ctx, canvas, state) => {
    ctx.fillStyle = canObj.palette[0];
    ctx.fillRect(0,0, canvas.width, canvas.height);
    state.lines.forEach((li)=>{
        ctx.lineWidth = li.lw;
        ctx.textAlign = li.a;
        ctx.textBaseline = li.bl;
        ctx.font = li.fs + ' ' + li.f;
        ctx.fillStyle = li.fc || canObj.palette[1] || 'white';
        ctx.strokeStyle = li.sc || canObj.palette[2] || 'white';
        ctx.fillText(li.text, li.x, li.y);
        ctx.strokeText(li.text, li.x, li.y);
    });
};
//-------- ----------
// CANVAS OBJECT
//-------- ----------
let canObj2 = canvasMod.create({
    draw: drawText,
    size: 512,
    update_mode: 'canvas',
    state: {
       lines : createLines(9)
    },
    palette: ['#002a2a', '#afafaf', '#ffffff']
});
//-------- ----------
// MESH
//-------- ----------
let plane = makePlane(canObj2.texture, 2);
plane.position.set(0, 2, 0);
scene.add(plane);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 60, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 60;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 600;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    let a = frame / frameMax;
    let b = 1 - Math.abs(0.5 - a) / 0.5;
    // using move text lines helper
    moveTextLines(canObj2.state.lines, textLines, b);
    // update canvas
    canvasMod.update(canObj2);
    // update camera
    camera.position.set(-4 * b, 1, 5);
    camera.lookAt(0, 1, 0);
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
