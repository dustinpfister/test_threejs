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
// wrap text method
const wrapText = function (str, width) {
    const patt = new RegExp('(?![^\\n]{1,' + width + ')([^\\n]{1,' + width + '})\\s', 'g');
    return str.replace(patt, '$1\n');
};
// EOL CONVERSION - replace all /r/n and /r with /n
const EOLConvert = (text) => {
   return text.replace(/\r\n/g,'\n').replace(/\r/g,'\n')
}
// create text lines
const createTextLines = (text, cols) => {
    let arr = wrapText(EOLConvert(text), cols).split('\n');
    return arr;
};
// create an array of text objects to use with the drawText method
// this is a reusable set of objects
const createLines = (rows) => {
    let i = 0;
    const lines = [];
    while(i < rows){
        lines.push({
            text: '',
            x: 10, y : 30 + 60 * i,
            lw: 2, fc: '#888888', sc: 'white',
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
    ctx.fillStyle = '#101010';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    state.lines.forEach((li)=>{
        ctx.lineWidth = li.lw;
        ctx.textAlign = li.a;
        ctx.textBaseline = li.bl;
        ctx.font = li.fs + ' ' + li.f;
        ctx.fillStyle = li.fc;
        ctx.strokeStyle = li.sc;
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
    update_mode: 'dual',
    state: {
       lines : createLines(9)
    },
    palette: ['black', 'white', 'cyan', 'lime', 'red', 'blue', 'yellow', 'orange', 'purple']
});
 
canObj2.texture_data.flipY = true;
//canObj2.texture_data.center = new THREE.Vector2(0.5, 0.5);
//canObj2.texture_data.rotation = Math.PI / 180 * 0;
//canObj2.texture_data.needsUpdate = true;
//-------- ----------
// MESH
//-------- ----------
let plane = makePlane(canObj2.texture_data, 2);
plane.position.set(0, 2, 0);
scene.add(plane);
//-------- ----------
// TEXT and textLines
//-------- ----------
const text = '\r\n\r\nHello there how are you today? \r\n\r\nThis is some text that could be some raw text from a file or somehting like that maybe. \r\n\r\nI would like to see about doing what I can to make this work with just about all kinds of raw text formats. \r\n\r\nWith that said I have this wrap text method that seems to work okay, but I am having a few problems with it when it comes to words that are longer than the max width of a line. \r\n\r\n';

const text2 = 'abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.abcdefghigklmnopqrstuvwxyz.0123456789.'

const textLines = createTextLines(text2, 35);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
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
