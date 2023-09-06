// demo of r0 of aplerp.js for threejs-examples-aplerp
// making a few groups with the pow1 built in
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('black');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add(new THREE.GridHelper(10, 10));
//-------- ----------
// USING POW1 GET ALPHA METHOD
//-------- ----------
let i = 0, len = 25;
while(i < len){
    const per = i / len;
    const v1 = new THREE.Vector3(-5, 0, 0);
    const v2 = new THREE.Vector3(5, 0, 0);
    const group = apLerp.createSpheresGroup({
        v1: v1,
        v2: v2,
        count: 60 - Math.floor(50 * per),
        include: true,
        getAlpha: 'pow1',
        gaParam: {
            base: 10,
            e: 1.75 + 8 * per
        }
    });
    group.position.z = -5 + 10 * per;
    scene.add(group);
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 4, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

