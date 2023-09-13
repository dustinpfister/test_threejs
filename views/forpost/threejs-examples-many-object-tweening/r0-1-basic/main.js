//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('cyan');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.render(scene, camera);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, 1, 3);
scene.add(dl);
//-------- ----------
// APP LOOP
//-------- ----------
camera.position.set(1.4, 1.4, 1.4);
camera.lookAt(0, 0, 0);
let sObj = {}; // source objects
let mesh;
let lt = new Date();
let f = 0, fm = 300;
const loop = function () {
    const now = new Date();
    const secs = (now - lt) / 1000 ;
    requestAnimationFrame(loop);
    if(secs >= 1 / 30){
        const p = f / fm;
        const b1 = Math.abs(0.5 - ( p * 4 % 1) ) / 0.5;
        tweenMany.tween(mesh.geometry, [
            [ sObj.box_1.geometry, sObj.box_2.geometry, b1 ]
        ]);
        //!!! should use dae normals
        mesh.geometry.computeVertexNormals();
        // rotation
        mesh.rotation.y = Math.PI * 2 * p;
        mesh.rotation.x = Math.PI * 4 * p;
        lt = new Date();
        f += 1;
        f %= fm;
    }
    renderer.render(scene, camera);
};
//-------- ----------
// LOAD DAE - start loop when done
//-------- ----------
tweenMany.load("/dae/many-object-tweening/many-object-tweening-1a.dae")
.then( (sourceObj) => {
    sObj = sourceObj;
    // can create a new mesh like this now
    mesh = tweenMany.createMesh(sObj, 'box_1');
    scene.add(mesh);
    // start loop
    loop();
})
.catch((e)=>{
    console.warn(e.message);
});

