//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CUBE GROUP MODULE
//-------- ----------
(function (api) {
    // CONST
    const ANGLES_A = [225, 315, 135, 45];
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    // to radians helper
    const toRadians = function (array) {
        return array.map(function(deg){
            return Math.PI / 180 * deg;
        });
    };
    // create a single cube mesh
    const createCube = function (rotationCounts, position) {
        const cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshPhongMaterial({
                    color: 0xff0000,
                    specular: 0xffffff
                })
        );
        // USER DATA OBJECT FOR A SINGLE CUBE
        const ud = cube.userData;
        ud.rotationCounts = rotationCounts || [0, 0, 0];
        cube.position.copy(position || new THREE.Vector3(0, 0, 0));
        return cube;
    };
    // update a single cube
    const updateCube = function (cube, per) {
        const ud = cube.userData,
        rc = ud.rotationCounts,
        pi2 = Math.PI * 2;
        cube.rotation.x = pi2 * rc[0] * per;
        cube.rotation.y = pi2 * rc[1] * per;
        cube.rotation.z = pi2 * rc[2] * per;
    };
    const setCubesRotation = function(cubes, per){
        const x = Math.PI * 0 * per,
        y = Math.PI * 0 * per,
        z = Math.PI * 0 * per;
        cubes.rotation.set(x, y, z);
    };
    const setCubes = api.setCubes = function(cubes, frame, maxFrame){
        const gud = cubes.userData;
        gud.frame = frame === undefined ? gud.frame: frame;
        gud.maxFrame = maxFrame === undefined ? gud.maxFrame: maxFrame;
        const per = gud.frame / gud.maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
        // update cubes
        cubes.children.forEach(function (cube, i) {
            // start values
            const sx = i % 2 - 0.5,
            sz = Math.floor(i / 2) - Math.floor(i / 4) * 2 - 0.5,
            sy = Math.floor(i / (2 * 2)) - 0.5;
            // adjusted
            const aIndex = i % 4,
            bIndex = Math.floor(i / 4),
            r1 = gud.anglesA[aIndex],
            x = sx + Math.cos(r1) * (gud.xzStart + gud.xzDelta * bias),
            y = sy + (gud.yStart + gud.yDelta * bias) * (bIndex === 0 ? -1 : 1),
            z = sz + Math.sin(r1) * (gud.xzStart + gud.xzDelta * bias);
            // set position of cube
            cube.position.set(x, y, z);
            // call cube update method
            updateCube(cube, per);
        });
        // whole group rotation
        setCubesRotation(cubes, per);
    };
    //-------- ----------
    // PUBLIC FUNCTIONS
    //-------- ----------
    // public method to create a cube group
    api.create = function(opt) {
        opt = opt || {};
        opt.cubeRotations = opt.cubeRotations || [];
        const cubes = new THREE.Group(),
        // USER DATA OBJECT FOR A GROUP OF CUBES
        gud = cubes.userData;
        gud.frame = 0;
        gud.maxFrame = opt.maxFrame || 180;
        gud.fps = opt.fps || 30;
        gud.anglesA = toRadians(opt.anglesA || ANGLES_A);
        gud.yDelta = opt.yDelta === undefined ? 2 : opt.yDelta;
        gud.xzDelta = opt.xzDelta === undefined ? 2 : opt.xzDelta;
        gud.yStart = gud.yStart === undefined ? 0.1 : gud.yStart;
        gud.xzStart = gud.xzStart === undefined ? 0.1 : gud.xzStart;
        gud.secs = 0;
        let i = 0;
        while(i < 8){
            const cubeRotations = opt.cubeRotations[i] || [0.00, 0.00, 0.00];
            const cube = createCube(
                cubeRotations, 
                new THREE.Vector3(0, 0, 0));
            cubes.add(cube);
            i += 1;
        };        
        return cubes;
    };
    // update the group
    api.update = function(cubes, secs) {
        // GROUP USER DATA OBJECT
        const gud = cubes.userData;
        const per = gud.frame / gud.maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
        // step frame
        gud.secs += secs;
        if(gud.secs >= 1 / gud.fps){
            gud.frame += 1; // gud.fps * secs;
            gud.frame %= gud.maxFrame;
            gud.secs %= 1 / gud.fps; 
        }
        setCubes(cubes);
    };
}(this['CubeGroupMod'] = {}));
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1, 3, 2);
scene.add(dl);
const pl = new THREE.PointLight(0xffffff, 1);
scene.add(pl);
//-------- ----------
// CUBE GROUPS
//-------- ----------
const cubes3 = CubeGroupMod.create({
   anglesA:[180, 270, 90, 0],
   yDelta: 0.5,
   xzDelta: 0.75,
   fps: 30,
   cubeRotations: [
      [0, 0, 1],
      [0, 1, 0],
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 1],
      [1, 1, 0],
      [1, 1, 1],
      [0, 0, 1]
   ]
});
cubes3.position.y = 2;
scene.add(cubes3);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(4, 4, 4);
const update = (frame, frameMax) => {
    CubeGroupMod.setCubes(cubes3, frame, frameMax);
    camera.lookAt(cubes3.position);
};
let lt = new Date();
let frame = 0;
const frameMax = 180;
const fps = 20;
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(frame, frameMax);
        renderer.render(scene, camera);
        lt = now;
        frame += 1;
        frame %= frameMax;
    }
};
loop();
