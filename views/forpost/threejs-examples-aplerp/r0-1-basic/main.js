// demo of r0 of aplerp.js for threejs-examples-aplerp
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
// TESTING OUT apLerp.lerp
//-------- ----------
const v1 = new THREE.Vector3(1, 1, 1),
v2 = new THREE.Vector3(2, 1, 1),
alpha = 0.5;
// testing 'simp' get alpha method 
const opt1 = { getAlpha: 'simp'};
console.log( apLerp.lerp(v1, v2, alpha, opt1) ); // {x: 1.5, y: 1, z: 1}
// testing out pow2 get alpha method
const opt2 = { 
    getAlpha: 'pow1',
    gaParam: {base: 1.25, e: 14}
};
console.log( apLerp.lerp(v1, v2, alpha, opt2) ); // {x: 1.2097152, y: 1, z: 1}
//-------- ----------
// POINTS 1 EXAMPLE USING SIMP GET ALPHA METHOD
//-------- ----------
const v3 = new THREE.Vector3(-5, 0, 0);
const v4 = new THREE.Vector3(5, 0, 0);
const group1 = apLerp.createSpheresGroup({
    v1: v3,
    v2: v4,
    count: 40,
    include: true,
    getAlpha: 'simp'
});
scene.add(group1);
//-------- ----------
// POINTS 2 EXAMPLE USING POW1 GET ALPHA METHOD
//-------- ----------
const v5 = new THREE.Vector3(-5, 0, 0);
const v6 = new THREE.Vector3(5, 0, 0);
const group2 = apLerp.createSpheresGroup({
    v1: v5,
    v2: v6,
    count: 40,
    include: true,
    getAlpha: 'pow1',
    gaParam: {
        base: 6,
        e: 3
    }
});
group2.position.z = 1;
scene.add(group2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 4, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

