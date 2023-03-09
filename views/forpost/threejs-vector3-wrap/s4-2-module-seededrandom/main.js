//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create group
const createGroup = function (count, spread, ppsMin, ppsMax, meshSize, boundSize, gitDir) {
    spread = spread === undefined ? 5 : spread;
    count = count === undefined ? 50 : count;
    ppsMin = ppsMin === undefined ? 0.5 : ppsMin;
    ppsMax = ppsMax === undefined ? 2 : ppsMax;
    meshSize = meshSize === undefined ? 1 : meshSize;
    boundSize = boundSize === undefined ? 4 : boundSize;
    const group = new THREE.Group();
    const gud = group.userData;
    gud.meshSize = meshSize;
    gud.boundSize = boundSize;
    let i = 0;
    while (i < count) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(gud.meshSize, gud.meshSize, gud.meshSize), 
            new THREE.MeshNormalMaterial({
                transparent: true,
                opacity: 0.60
            })
        );
        // start position
        mesh.position.x = spread * THREE.MathUtils.seededRandom();
        mesh.position.y = spread * THREE.MathUtils.seededRandom();
        mesh.position.z = spread * THREE.MathUtils.seededRandom();
        // user data values, pps and direction
        const ud = mesh.userData;
        ud.pps = ppsMin + (ppsMax - ppsMin) * THREE.MathUtils.seededRandom();
        ud.dir = gitDir ? gitDir(group, mesh, i) : new THREE.Vector3(0, 1, 0).normalize();
        group.add(mesh);
        i += 1;
    }
    return group;
};
// update a group
const updateGroup = function (group, secs, bias) {
   const gud = group.userData;
   const bs = gud.boundSize / 2;
   const ms = gud.meshSize / 2;
   const a = bs * -1 + ms;
   const b = bs - ms;
   const vMin = new THREE.Vector3(a, a, a);
   const vMax = new THREE.Vector3(b, b, b);
   group.children.forEach(function(mesh){
        const ud = mesh.userData;
        mesh.position.x += ud.dir.x * ud.pps * secs;
        mesh.position.y += ud.dir.y * ud.pps * secs;
        mesh.position.z += ud.dir.z * ud.pps * secs;
        wrapVector(
            mesh.position,
            vMin,
            vMax);
    });
};
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
if(THREE.OrbitControls){
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
}
// group1 uses default values
const group1 = createGroup();
scene.add(group1);
// group2 uses custom values
const group2 = createGroup(100, 5, 0.125, 0.25, 0.25, 4, () => {
    return new THREE.Vector3(
        -5 + 10 * THREE.MathUtils.seededRandom(),
        -5 + 10 * THREE.MathUtils.seededRandom(),
        -5 + 10 * THREE.MathUtils.seededRandom());
});
group2.position.set(-7, 0, 0);
scene.add(group2);
let frame = 0, lt = new Date();
const maxFrame = 300, fps = 20;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        updateGroup(group1, secs, bias);
        updateGroup(group2, secs, bias);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
