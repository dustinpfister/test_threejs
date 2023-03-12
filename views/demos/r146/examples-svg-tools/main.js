// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.01, 10000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);


// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 20;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 60;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){

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
// ---------- ----------
// LOAD SVG, OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(100, 10));
SVGTools.load({
   scene: scene,
   urls: [
       '/img/svg-test/test1.svg',
       '/img/svg-test/test2.svg'
   ],
   opt_extrude: { depth: 5 },
   processor: (opt_load, data, i_url, url) => {
        let pi = 0;
        while(pi < data.paths.length){
            const shapes = THREE.SVGLoader.createShapes( data.paths[pi] );
            let si = 0;
            while(si < shapes.length){
                const geo = new THREE.ExtrudeGeometry(shapes[si], opt_load.opt_extrude || { depth: 1 } );
                const mesh = new THREE.Mesh(geo, opt_load.material || new THREE.MeshNormalMaterial());
                mesh.position.z = -50 + 95 * (i_url / (opt_load.urls.length - 1));
                opt_load.scene.add(mesh);
                si += 1;
            }
            pi += 1;
        }
   }
})
.then(() => {
    console.log('done loading')
    loop();
})