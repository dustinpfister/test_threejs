//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 30, 30),
    new THREE.MeshNormalMaterial());
scene.add(mesh2);
//-------- ----------
// SEQUENCE HOOKS OBJECT
//-------- ----------
const seq = {
    objectIndex: 0,
    per: 0,
    bias: 0,
    frame: 0,
    frameMax: 300,
    beforeObjects: function(seq){
        const r = Math.PI * 2 * seq.per;
        const x = Math.cos(r) * 4;
        const z = Math.sin(r) * 4;
        mesh2.position.set(x, 0, z);
    },
    afterObjects: function(seq){
        camera.lookAt(mesh.position);
    },
    objects: [
        {
            per: 0,
            update: function(seq, partPer, partBias){
                camera.position.set(10, 10, 10);
            }
        },
        {
            per: 0.25,
            update: function(seq, partPer, partBias){
               camera.position.set(10 - 20 * partPer, 10, 10);
            }
        },
        {
            per: 0.30,
            update: function(seq, partPer, partBias){
                camera.position.set(-10, 10 - 7 * partPer, 10);
            }
        },
        {
            per: 0.35,
            update: function(seq, partPer, partBias){
                camera.position.set(-10, 3, 10);
                const x = 10 * partBias;
                camera.lookAt(mesh.position.clone().add(new THREE.Vector3(x, 0, 0)));
            }
        },
        {
            per: 0.75,
            update: function(seq, partPer, partBias){
                camera.position.set(-10, 3 - 10 * partPer, 10 - 30 * partPer);
            }
        }
    ]
};
//-------- ----------
// APP LOOP
//-------- ----------
let secs = 0,
fps_update = 10,
fps_movement = 30,
lt = new Date();
const loop = function () {
    let now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        seqHooks.setFrame(seq, seq.frame)
        renderer.render(scene, camera);
        seq.frame += fps_movement * secs;
        seq.frame %= seq.frameMax;
        lt = now;
    }
};
loop();
