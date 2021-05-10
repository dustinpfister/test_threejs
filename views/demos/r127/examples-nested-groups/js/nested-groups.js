
(function (api) {

    var MATERIALS_CUBE = new THREE.MeshStandardMaterial({color: 'white'});


    var createPointLight = function(color){
        color = color || new THREE.Color('white');
        var light = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 30, 30), 
            new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 1
            })
        );
        light.userData.pointLight = new THREE.PointLight(color, 0.25);
        light.add(light.userData.pointLight);
        return light;
    };

    var createPointLightGroup = function(){
        var lightGroup = new THREE.Group();
        // lights
        var light = createPointLight(new THREE.Color('lime'));
        light.position.set(0, 8, 0);
        lightGroup.add(light);
        var light = createPointLight(new THREE.Color('blue'));
        light.position.set(0, -8, 0);
        lightGroup.add(light);
        var light = createPointLight(new THREE.Color('red'));
        light.position.set(8, 0, 0);
        lightGroup.add(light);
        var light = createPointLight(new THREE.Color('white'));
        light.position.set(0, 0, 0);
        lightGroup.add(light);
        return lightGroup;
    };


    var createWorldObjects = function(nud){
        var worldObjects = new THREE.Group();
        // grid helper
        var gridHelper = new THREE.GridHelper(10, 10);
        worldObjects.add(gridHelper);
        // nested cube group one
        var cubes1 = nud.cubes1 = CubeGroupMod.create({
            materials: MATERIALS_CUBE,
            rotations: [0, 0, 0]
        });
        worldObjects.add(cubes1);
        var cubes2 = nud.cubes2 = CubeGroupMod.create({
            materials: MATERIALS_CUBE,
            anglesA: [180, 180, 90, 90],
            rotations: [0, 1, 0]
        });
        cubes2.position.set(5, 0, 5);
        worldObjects.add(cubes2);
        var cubes3 = nud.cubes3 = CubeGroupMod.create({
            materials: MATERIALS_CUBE,
            anglesA: [180, 0, 0, 0],
            rotations: [2, 0, 1]
        });
        cubes3.position.set(-5, 0, -5);
        worldObjects.add(cubes3);
        return worldObjects;
    };

    // create nested groups
    api.create = function(opt) {
        var nested = new THREE.Group(),
        nud = nested.userData;
        nud.frame = 0;
        nud.maxFrame = 600;
        // Camera
        var camera = nud.camera = new THREE.PerspectiveCamera(45, 4 / 3, 5, 40);
        camera.position.set(0, 10, 10);
        camera.lookAt(0, 0, 0);
        nud.cameraRadian = 0;
        // add camera to nested
        nested.add(camera);
        // lights
        var lightGroup = nud.lightGroup = createPointLightGroup();
        nested.add(lightGroup);

        // world objects
        nud.worldObjects = createWorldObjects(nud);
        nested.add(nud.worldObjects);
        return nested;

    };

  
    // update the nested groups
    api.update = function(nested, secs) {
       var nud = nested.userData,
       per = nud.frame / nud.maxFrame,
       bias = 1 - Math.abs(per - 0.5) / 0.5;
       // camera
       nud.cameraRadian = Math.PI * 2 * per;
       nud.camera.position.x = Math.cos(nud.cameraRadian) * 15;
       nud.camera.position.y = 15;
       nud.camera.position.z = Math.sin(nud.cameraRadian) * 15;
       nud.camera.lookAt(0,0,0);
       // update cube group
       nud.worldObjects.children.forEach(function(obj){
           if(obj.userData.type){
               if(obj.userData.type === 'cubegroup'){
                   CubeGroupMod.update(obj, secs);
               }
           }
       });
       // lights
       nud.lightGroup.rotation.x = Math.PI * 8 * per;
       nud.lightGroup.children.forEach(function(light){
           var pointLight = light.userData.pointLight,
           intensity = 0.05 + 0.95 * bias;
           pointLight.intensity = intensity;
           light.material.opacity = intensity;
       });
       // step frame
       nud.frame += 30 * secs;
       nud.frame %= nud.maxFrame;
    };

}
    (this['NestedGroupsMod'] = {}));
