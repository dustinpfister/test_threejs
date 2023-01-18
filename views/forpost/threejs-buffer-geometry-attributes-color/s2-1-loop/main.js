// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, -1.25, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// just make a color array
const make_color_array = (geo, a1, a2, a3) => {
    a1 = a1 === undefined ? 1 : a1;
    a2 = a2 === undefined ? 1 : a2;
    a3 = a3 === undefined ? 1 : a3;
    const len = geo.getAttribute('position').count;
    const color_array = [];
    let i = 0;
    while(i < len){
        const a_index = i / len;
        const a_indexbias = 1 - Math.abs(0.5 - a_index) / 0.5;
        color_array.push(a1, a_indexbias * a2, 1 - a_indexbias * a3);
        i += 1;
    }
    return color_array;
};
// update color attribute
const update_color_attribute = (geo, a1, a2, a3) => {
    const color_array = make_color_array(geo, a1, a2, a3);
    const color_attribute = geo.getAttribute('color');
    if(color_attribute){
        color_attribute.array = color_attribute.array.map((n, i) => {
            return color_array[i];
        });
        color_attribute.needsUpdate = true;
    }else{
        const new_color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
        geo.setAttribute('color', new_color_attribute);
    }
};
// get bias alpha helper
const getBias = (a1, count) => {
    return 1 - Math.abs(0.5 - a1 * count % 1) / 0.5;
};
// ---------- ----------
// GEOMETRY, MATERIAL, MESH
// ---------- ----------
const geo = new THREE.TorusGeometry( 4.00, 1.75, 80, 80 );
geo.rotateX(Math.PI * 0.55)
update_color_attribute(geo, 1, 1, 1);
const material1 = new THREE.MeshPhongMaterial({
    vertexColors: true,
    shininess: 15,
    specular: new THREE.Color(0.75, 0.75, 0.75)
});
const mesh1 = new THREE.Mesh(geo, material1);
scene.add(mesh1);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.95);
dl.position.set(5, 3, 1);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(al);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = getBias(a1, 1);
    const a3 = getBias(a1, 8);
    const a4 = getBias(a1, 16);
    update_color_attribute(geo, a2, a3, a4);
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

