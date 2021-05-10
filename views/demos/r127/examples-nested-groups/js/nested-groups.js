
(function (api) {

    var MATERIALS_CUBE = new THREE.MeshStandardMaterial({color: 'white'});


    var createPointLight = function(color){
        color = color || new THREE.Color('white');
        var light = new THREE.Mesh(new THREE.SphereGeometry(1,30,30), new THREE.MeshBasicMaterial({color: color}));
        light.add(new THREE.PointLight(color, 1));
        return light;
    };


    var createShakeObjects = function(nud){
        var shakeObjects = new THREE.Group();
        // grid helper
        var gridHelper = new THREE.GridHelper(10, 10);
        shakeObjects.add(gridHelper);
        // nested cube group one
        var cubes1 = nud.cubes1 = CubeGroupMod.create({
            materials: MATERIALS_CUBE,
            anglesA:[180, 270, 90, 0],
            yDelta: 1.25,
            xzDelta: 0.75,
            maxFrame: 180,
            fps: 30,
            cubeRotations: [],
            rotations: [1, 1, 1]
        });
        shakeObjects.add(cubes1);
        return shakeObjects;
    };

    // create nested groups
    api.create = function(opt) {
        var nested = new THREE.Group(),
        nud = nested.userData;
        // Camera
        var camera = nud.camera = new THREE.PerspectiveCamera(45, 4 / 3, 5, 40);
        camera.position.set(0, 10, 10);
        camera.lookAt(0, 0, 0);
        nud.cameraRadian = 0;
        // add camera to nested
        nested.add(camera);
        // lights
        var light = createPointLight(new THREE.Color('lime'));
        light.position.set(5, 5, 5);
        nested.add(light);
        // shake objects
        nud.shakeObjects = createShakeObjects(nud);
        nested.add(nud.shakeObjects);
        // shake object
        nud.shake = ShakeMod.create({
           pos: 0.125,
           deg: 0.00
        });
        return nested;

    };

  
    // update the nested groups
    api.update = function(nested, secs) {
       var nud = nested.userData;
       nud.cameraRadian += Math.PI / 180 * 10 * secs;
       nud.cameraRadian %= Math.PI * 2;
       nud.camera.position.x = Math.cos(nud.cameraRadian) * 15;
       nud.camera.position.y = 15;
       nud.camera.position.z = Math.sin(nud.cameraRadian) * 15;
       nud.camera.lookAt(0,0,0);
       // update shake
       nud.shake.active = true;
       ShakeMod.roll(nud.shake);
       ShakeMod.applyToObject3d(nud.shake, nud.shakeObjects);
       // update cube group
       CubeGroupMod.update(nud.cubes1, secs);
    };

}
    (this['NestedGroupsMod'] = {}));
