// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GRID
// ---------- ----------
scene.add( new THREE.GridHelper(10,10) );
//-------- ----------
// camera group
//-------- ----------
const group_camera = cameraPlanes.create({
    planeScale: 0.9,
    camera: camera,
    zMax: 3,
    count: 5,
    effect: (group, mesh_plane, gud, mud, a_plane, alpha) => {
        const z = gud.zMax - gud.zMax * a_plane * alpha;
        mesh_plane.position.set(0, 0, z);
        mesh_plane.material.opacity = alpha * 0.25;
    }
});
scene.add(group_camera);
// ---------- ----------
// RENDER
// ---------- ----------
// it is then the group that I would want to move and rotate rather than the camera
group_camera.position.set(0,1,-3);
group_camera.lookAt( 0, 0, 0 );
renderer.render(scene, group_camera.userData.camera);
