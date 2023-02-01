// SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SETTINGS
//-------- ----------
const GROUPSIZE = 9,
MAXDIST = 5,
PPS_MIN = 1,
PPS_MAX = 7;
// materials
const materials = [
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    }),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true
    }),
    new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        wireframe: true
    })
];
//-------- ----------
// HELPERS
//-------- ----------
// random angles helper
const randomAngles = function (mesh) {
    mesh.userData.pitch = Math.PI * 2 * Math.random();
    mesh.userData.heading = Math.PI * 2 * Math.random();
};
// random speed value
const randomSpeed = function (mesh) {
    mesh.userData.pitchPPS = PPS_MIN + (PPS_MAX - PPS_MIN) * Math.random();
    mesh.userData.headingPPS = PPS_MIN + (PPS_MAX - PPS_MIN) * Math.random();
};
// create a sphere group
const createSphereGroup = function () {
    const group = new THREE.Group();
    let i = 0;
    while (i < GROUPSIZE) {
        const mesh = new THREE.Mesh(
                new THREE.SphereGeometry(1, 20),
                materials[0]);
        // SETTING VALUES IN USER DATA OBJECT
        mesh.userData.materalIndex = i % materials.length;
        randomSpeed(mesh);
        randomAngles(mesh);
        group.add(mesh);
        i += 1;
    }
    return group;
};
// update a sphere group
const updateSphereGroup = function (group, secs) {
    group.children.forEach(function (mesh) {
        // USING VALUES IN USER DATA OBJECT
        const ud = mesh.userData;
        mesh.material = materials[ud.materalIndex];
        mesh.position.x += Math.cos(ud.pitch) * ud.pitchPPS * secs;
        mesh.position.y += Math.sin(ud.pitch) * ud.pitchPPS * secs;
        mesh.position.z += Math.cos(ud.heading) * ud.headingPPS * secs;
        const d = mesh.position.distanceTo(new THREE.Vector3(0, 0, 0));
        if (d >= MAXDIST) {
            mesh.position.set(0, 0, 0);
            randomAngles(mesh);
            randomSpeed(mesh);
        }
    });
};
//-------- ----------
// OBJECTS
//-------- ----------
const group = createSphereGroup();
updateSphereGroup(group, 0);
scene.add(group);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
let lt = new Date();
const fps = 24;
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        updateSphereGroup(group, secs);
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
