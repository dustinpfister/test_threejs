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
// Get Bias Helper
//-------- ----------
const getBias = function(per, count){
    count = count === undefined ? 1 : count;
    const b = Math.abs(0.5 - ( per * count % 1) ) / 0.5;
    return b;
};
//-------- ----------
// APP LOOP
//-------- ----------
camera.position.set(1.8, 1.8, 1.8);
camera.lookAt(0, 0.25, 0);
let sObj = {}; // source objects
let mesh1, mesh2, mesh3, mesh4, mesh5;
let lt = new Date();
let f = 0, fm = 300;
const loop = function () {
    const now = new Date();
    const secs = (now - lt) / 1000 ;
    requestAnimationFrame(loop);
    if(secs >= 1 / 30){
        const p = f / fm;
        // using tween with many object transitions
        tweenMany.tween(mesh1.geometry, [
            [ sObj.box_1.geometry, sObj.box_2.geometry, getBias(p, 1) ],
            [ sObj.box_1.geometry, sObj.box_3.geometry, getBias(p, 8) ],
            [ sObj.box_1.geometry, sObj.box_4.geometry, getBias(p, 32) ]
        ]);
        //!!! should use dae normals
        mesh1.geometry.computeVertexNormals();
        // rotation
        mesh1.rotation.y = Math.PI * 2 * p;
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
    mesh1 = tweenMany.createMesh(sObj, 'box_1');
    scene.add(mesh1);
    mesh2 = tweenMany.createMesh(sObj, 'box_1');
    mesh2.position.set(-6, 0, -2);
    scene.add(mesh2);
    mesh3 = tweenMany.createMesh(sObj, 'box_2');
    mesh3.position.set(-4, 0, -2);
    scene.add(mesh3);
    mesh4 = tweenMany.createMesh(sObj, 'box_3');
    mesh4.position.set(-2, 0, -2);
    scene.add(mesh4);
    mesh5 = tweenMany.createMesh(sObj, 'box_4');
    mesh5.position.set(0, 0, -2);
    scene.add(mesh5);
    // start loop
    loop();
})
.catch((e)=>{
    console.warn(e.message);
});

