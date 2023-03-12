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
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 20;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 150;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const e = new THREE.Euler();
    e.y = Math.PI * 2 * a1;
    camera.position.set(100, 100, 100).applyEuler(e);
    camera.lookAt(0,0,0);
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
       //'/img/svg-test/test1.svg',
       //'/img/svg-test/test2.svg',
       '/img/svg-logo/logo_base.svg'
   ],
   opt_extrude: { depth: 5 },
   //processor: 'shape',
   //material: new THREE.MeshNormalMaterial({ side: THREE.DoubleSide })
   processor: (st, data, i_url, url) => {
        const svg_width = data.xml.width.baseVal.value;
        const svg_height = data.xml.height.baseVal.value;
        const depth = st.opt_extrude.depth;
        const count = st.urls.length;
        const zSpace = count + 2;
        const sz = zSpace * depth / 2 * -1;
        const a_data = i_url / count;
        st.dataToShape(data, (shape, si, pi) => {
            const geo = new THREE.ExtrudeGeometry(shape, st.opt_extrude);
            geo.translate(svg_width / 2 * -1, svg_height / 2 * -1, 0);
            const mesh = new THREE.Mesh(geo, st.material);
            mesh.position.z = sz + (zSpace * depth) * a_data;
            st.scene.add(mesh);
        });
   }
})
.then(() => {
    console.log('done loading')
    loop();
})