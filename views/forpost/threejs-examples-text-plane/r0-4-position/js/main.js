//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.75, 0.75, 0.75);
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const setLinesStyle = (lines, lw, fs, f) => {
   lines.forEach((lObj)=>{
       lObj.lw = lw;
       lObj.fs = fs + 'px';
       lObj.f = f;
   });
};
// update position attribute
const updatePlaneGeoPosition = (plane, alpha, opt) => {
    opt = opt || {};
    opt.m = opt.m || new THREE.Vector3(6, 4, 0.2);
    opt.xWaves = opt.xWaves === undefined ? 8 : opt.xWaves;
    opt.yWaves = opt.yWaves === undefined ? 0.5 : opt.yWaves;
    const geo = plane.geometry;
    const pos = geo.getAttribute('position');
    let i = 0;
    const w = geo.parameters.widthSegments + 1;
    const h = geo.parameters.heightSegments + 1;
    while(i < pos.count){
        const x = i % w;
        const y = Math.floor(i / w);
        const px = x / ( w - 1 ) * opt.m.x - ( w - 1 ) *  opt.m.x / 2 / (w - 1 ) ;
        const py = y / ( h - 1 ) * opt.m.y * -1 + ( h - 1 ) *  opt.m.y / 2 / (h - 1);
        //let pz = 0;
        //let pz = Math.sin(i / pos.count * 8 * Math.PI * 2) * 0.2;
        //let pz = Math.sin(i / pos.count * 8 * (Math.PI * (x * 0.6 / w)) * 2) * 0.2;
        let xWaves = opt.xWaves * alpha;
        let yWaves = Math.PI * 2 * (y / h) * opt.yWaves;
        let pz = Math.sin(x / w * xWaves * ( Math.PI + yWaves) * 2) * opt.m.z;
        pos.setXYZ(i, px, py, pz);
        i += 1;
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
};
//-------- ----------
// CANVAS OBJECT
//-------- ----------
// canvas object 1 will be used for text
const canObj1 = TextPlane.createCanObj({
    rows: 12, size: 256,
    palette: ['rgba(0,0,0,0)', '#8f8f8f', '#ffffff']
});
setLinesStyle( canObj1.state.lines, 1, 31, 'arial');
// canvas object 2 will use the 'rnd' built in draw method
// as a way to create a background a little more interesting
// than just a static background
let canObj2 = canvasMod.create({
    draw: 'rnd',
    size: 256,
    update_mode: 'canvas',
    state: {
        gSize: 16
    },
    palette: ['red', 'lime', 'cyan', 'purple', 'orange', 'green', 'blue']
});
// canvas object 3 will be the final background use for the material
let canObj3 = canvasMod.create({
    draw: function(canObj, ctx, canvas, state){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw down the back canvas
        ctx.globalAlpha = 1;
        ctx.drawImage(canObj2.canvas, 0, 0);
        // black overlay
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        // draw the text
        ctx.globalAlpha = 1;
        ctx.drawImage(canObj1.canvas, 0, 0);
    },
    size: 256,
    update_mode: 'canvas',
    state: {
    },
    palette: ['black', 'white']
});
//-------- ----------
// MESH
//-------- ----------
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(3.75, 2, 20, 20),
    new THREE.MeshBasicMaterial({
        map: canObj3.texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    })
);
plane.position.set(0, 0, 0);
scene.add(plane);
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(30, 30, 30),
    new THREE.MeshBasicMaterial({
         wireframe: true
    })
);
scene.add(sphere);
//-------- ----------
// TEXT and textLines
//-------- ----------
const text2 = '\n\n\n\n\nThe idea with this demo is to make an example where I am not just using the text plane module but also some additional code that has to do with mutating the position attribute of the buffer geometry instance that is created with the plane geometry constructor. \n\n\nThis is then something that I will want to back into future revisions maybe as I would like to turn the project into something that is not just used to create a texture, but also update the geometry of the mesh object that is used to display the texture as well. \n\n\nHowever for now this is something that I will have to just do with example code until I fine a good way to abstract it away into the module. \n';
const textLines = TextPlane.createTextLines(text2, 17);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(3, 3, 7);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    let a = frame / frameMax;
    let b = 1 - Math.abs(0.5 - a) / 0.5;
    // UPDATE
    updatePlaneGeoPosition(plane, a, {
        xWaves : 8 * b,
        yWaves: 0.15 * a,
        m: new THREE.Vector3(10 + 2 * b,6 + 4 * b,1.5)
    });
    TextPlane.moveTextLines(canObj1.state.lines, textLines, b * 1, 0, 40);
    // update canvas
    canvasMod.update(canObj1);
    canvasMod.update(canObj2);
    canvasMod.update(canObj3);
    // camera
    camera.position.x = 3 - 6 * b;
    camera.lookAt(0, 0, 0);
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
