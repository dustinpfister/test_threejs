(function (api) {
 
    var ANGLES_A = [225, 315, 135, 45];
 
    var toRadians = function (array) {
        return array.map(function(deg){
            return Math.PI / 180 * deg;
        });
    };
 
    // create a single cube mesh
    var createCube = function (rotationCounts, position) {
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
        // USER DATA OBJECT FOR A SINGLE CUBE
        var ud = cube.userData;
        ud.rotationCounts = rotationCounts || [0, 0, 0];
        cube.position.copy(position || new THREE.Vector3(0, 0, 0));
        return cube;
    };
 
    // update a single cube
    var updateCube = function (cube, per) {
        var ud = cube.userData,
        rc = ud.rotationCounts,
        pi2 = Math.PI * 2;
        cube.rotation.x = pi2 * rc[0] * per;
        cube.rotation.y = pi2 * rc[1] * per;
        cube.rotation.z = pi2 * rc[2] * per;
    };
 
    // public method to create a cube group
    api.create = function(opt) {
        opt = opt || {};
        opt.cubeRotations = opt.cubeRotations || [];
        var cubes = new THREE.Group(),
        // USER DATA OBJECT FOR A GROUP OF CUBES
        gud = cubes.userData;
        gud.frame = 0;
        gud.maxFrame = opt.maxFrame || 180;
        gud.fps = opt.fps || 30;
        gud.anglesA = toRadians(opt.anglesA || ANGLES_A);
        gud.yDelta = opt.yDelta === undefined ? 2 : opt.yDelta;
        gud.xzDelta = opt.xzDelta === undefined ? 2 : opt.xzDelta;
        gud.secs = 0;
        var i = 0;
        while(i < 8){
            var cubeRotations = opt.cubeRotations[i] || [0.00, 0.00, 0.00];
            var cube = createCube(
                cubeRotations, 
                new THREE.Vector3(0, 0, 0));
            cubes.add(cube);
            i += 1;
        };        
        return cubes;
    };
 
    var setCubesRotation = function(cubes, per){
        var x = Math.PI * 0 * per,
        y = Math.PI * 0 * per,
        z = Math.PI * 0 * per;
        cubes.rotation.set(x, y, z);
    };
 
    // update the group
    api.update = function(cubes, secs) {
        // GROUP USER DATA OBJECT
        var gud = cubes.userData;
        var per = gud.frame / gud.maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
        // update cubes
        cubes.children.forEach(function (cube, i) {
            // start values
            var sx = i % 2 - 0.5,
            sz = Math.floor(i / 2) - Math.floor(i / 4) * 2 - 0.5,
            sy = Math.floor(i / (2 * 2)) - 0.5;
            // adjusted
            var aIndex = i % 4,
            bIndex = Math.floor(i / 4),
            r1 = gud.anglesA[aIndex],
            x = sx + Math.cos(r1) * gud.xzDelta * bias,
            y = sy + gud.yDelta * bias * (bIndex === 0 ? -1 : 1),
            z = sz + Math.sin(r1) * gud.xzDelta * bias;
            // set position of cube
            cube.position.set(x, y, z);
            // call cube update method
            updateCube(cube, per);
        });
        // whole group rotation
        setCubesRotation(cubes, per);
        // step frame
        gud.secs += secs;
        if(gud.secs >= 1 / gud.fps){
            gud.frame += 1; // gud.fps * secs;
            gud.frame %= gud.maxFrame;
            gud.secs %= 1 / gud.fps; 
        }
    };
 
}
    (this['CubeGroupMod'] = {}));

(function () {
 
    var scene = new THREE.Scene();
 
    var gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
 
    var cubes1 = CubeGroupMod.create({maxFrame: 50, fps: 30});
    cubes1.position.set(4,0,4);
    scene.add(cubes1);
 
    var cubes2 = CubeGroupMod.create({maxFrame: 50, fps: 1});
    cubes2.position.set(-4,0,4);
    scene.add(cubes2);
 
    var cubes3 = CubeGroupMod.create({
       anglesA:[180, 270, 90, 0],
       yDelta: 1.25,
       xzDelta: 0.75,
       maxFrame: 60,
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
    scene.add(cubes3);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0, 10, 10);
    camera.lookAt(0, 0, 0);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
   
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    // loop
    var lt = new Date(),
    fps = 24;
    function loop() {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            CubeGroupMod.update(cubes1, secs);
            CubeGroupMod.update(cubes2, secs);
            CubeGroupMod.update(cubes3, secs);
            renderer.render(scene, camera);
            lt = now;
        }
    };
 
    loop();
 
}
    ());