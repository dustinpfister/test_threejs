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
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    const e = new THREE.Euler();
    e.y = THREE.MathUtils.degToRad(-45 + 90 * a2);
    camera.position.set(100, 50, 100).applyEuler(e);
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
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set( 0, 1, 2 );
scene.add(dl);
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
   opt_extrude: { depth: 1 },
   zDepth: 5,
   material: new THREE.MeshPhongMaterial(),
   processor: (st, data, i_url, url) => {
        const svg_width = data.xml.width.baseVal.value;
        const svg_height = data.xml.height.baseVal.value;
        st.dataToShape(data, (shape, si, pi, svgNode) => {
            const zindex = parseFloat( svgNode.getAttribute('svgtools:zindex') || st.zIndex);
            const zDepth = parseFloat( svgNode.getAttribute('svgtools:zDepth') || st.zDepth);
            const geo = new THREE.ExtrudeGeometry(shape, st.opt_extrude);
            geo.rotateX(Math.PI * 1);
            geo.translate( svg_width / 2 * -1, svg_height / 2 * 1, zindex * zDepth);
            const material = st.material.clone();
            material.color = new THREE.Color( svgNode.getAttribute('fill') );
            const mesh = new THREE.Mesh(geo, material);
            st.scene.add(mesh);
        });
   }
})
.then(() => {
    console.log('done loading')
    loop();
})