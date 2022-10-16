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
const updatePlaneGeoPosition = (plane, alpha) => {
	const geo = plane.geometry;
	const pos = geo.getAttribute('position');
	let i = 0;
	const w = geo.parameters.widthSegments + 1;
	//const h = geo.parameters.heightSegments;
	while(i < pos.count){
		
		const x = i % w;
		const y = Math.floor(i / w);
		
		console.log(x, y)
		
		//console.log(i);
		i += 1;
	}
	
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
const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.75, 2, 2, 2),
    new THREE.MeshBasicMaterial({
        map: canObj3.texture,
        transparent: true
    })
);
mesh.position.set(0, 1, 0);
scene.add(mesh);

updatePlaneGeoPosition(mesh, 0);

//-------- ----------
// TEXT and textLines
//-------- ----------
const text2 = '\n\n888888888-888888888-88***\n\n\nThis is the custom draw method demo.\n\nThe idea here is that the canvas object that I am using for the text is just being used to update the canvas element. I then use that canvas element with the draw image method when drawing to another canvas element that is actauly used to to skin a geometry of a mesh object. \n\n'
const textLines = TextPlane.createTextLines(text2, 14);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(0, 1, 2);
camera.lookAt(0, 1, 0);
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
    TextPlane.moveTextLines(canObj1.state.lines, textLines, b * 0.85, 0, 40);
    // update canvas
    canvasMod.update(canObj1);
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
