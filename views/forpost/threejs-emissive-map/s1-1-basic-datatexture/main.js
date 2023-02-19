//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(40, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const light = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.25);
light.position.set(8, 10, 2);
scene.add(light);
//-------- ----------
// HELPERS
//-------- ----------
// create data texture helper
const createDataTexture = (rPer, gPer, bPer) => {
    rPer = rPer || 0;
    gPer = gPer || 0;
    bPer = bPer || 0;
    const width = 16, height = 16;
    const size = width * height;
    const data = new Uint8Array(4 * size);
    for (let i = 0; i < size; i++) {
        const stride = i * 4;
        const v = Math.floor(THREE.MathUtils.seededRandom() * 255);
        data[stride] = v * rPer;
        data[stride + 1] = v * gPer;
        data[stride + 2] = v * bPer;
        data[stride + 3] = 255;
    }
    const texture = new THREE.DataTexture(data, width, height);
    texture.needsUpdate = true;
    return texture;
};
// create emissive cube helper
const createCube = (emissiveMap, map, emissiveIntensity) => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            map: map || null,
            emissiveIntensity: emissiveIntensity || 0,
            emissive: new THREE.Color(1, 1, 1),
            emissiveMap: emissiveMap || null
        }));
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
[ 
 [[1,1,1], 1], 
 [[0,0,1], 0.25], 
 [[0,1,0], 0.1] 
].forEach( (cubeArgs, i, arr) => {
    const emissiveMap = createDataTexture.apply(null, cubeArgs[0]);
    const map = null;
    const box = createCube(emissiveMap, map, cubeArgs[1]);
    box.position.x = -5 + 10 * (i / arr.length);
    scene.add(box);
});
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
