//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
//scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3.0, 3.0, 3.0);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') ||  document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    new THREE.MeshNormalMaterial({wireframe: true})
);
scene.add(sphere1);
const box1 =  new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshNormalMaterial()
);
scene.add(box1);


//-------- ----------
// RAYCASTER
//-------- ----------
const raycaster = new THREE.Raycaster();

// SET the Raycaster
const angle1 = Math.PI / 180 * -120;
const angle2 = Math.PI / 180 * 0;
const origin_radius = 3;

// using applyEuler and multiplyScalar to set origin for rayster
const origin = new THREE.Vector3(1, 0, 0);
origin.applyEuler( new THREE.Euler( 0, angle1, angle2) ).multiplyScalar(origin_radius);
// using vector3 clone, lerp, negate, and normalize methods to get a dir
const dir = origin.clone().lerp(sphere1.position, 0.5).negate().normalize();
raycaster.set( origin, dir );

const arr = raycaster.intersectObjects([ sphere1 ]);

console.log(origin)
console.log(raycaster)
console.log(arr)

if(arr.length === 1){
    // copy position
    box1.position.copy(arr[0].point);
    box1.position.setLength( box1.position.length() + 0.25 )
    box1.lookAt(sphere1.position)
}


const h1 = new THREE.ArrowHelper(dir, origin);
scene.add(h1);

//-------- ----------
// LOOP
//-------- ----------

//SphereWrap.positionToSphere1(sphere1, box1, 0.5, 0.75, 0.25);
//box1.lookAt(sphere1.position);
renderer.render(scene, camera);




/*
let lt = new Date(),
frame = 0;
const maxFrame = 100,
fps = 30;
const loop = function () {
    const now = new Date(),
    per = frame / maxFrame,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // position to sphere
        const p = per * 6 % 1,
        b = 1 - Math.abs(0.5 - p) / 0.5;
        SphereWrap.positionToSphere1(sphere1, box1, 0.75 - 0.5 * b, per, 0.25);
        // using lookAt method to set box rotation
        box1.lookAt(sphere1.position);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();
*/
