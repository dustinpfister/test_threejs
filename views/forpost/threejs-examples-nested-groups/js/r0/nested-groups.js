// nested-groups.js - r0 - from threejs-examples-nested-groups
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
    var createWorldObjects = function(nud, opt){
        var worldObjects = new THREE.Group();
        // grid helper
        var gridHelper = new THREE.GridHelper(10, 10);
        worldObjects.add(gridHelper);
        var data = opt.data || [ [[225, 315, 135, 45], [0, 0, 0], [0,0,0] ] ];
        // nested cube group one
        let i = 0;
        while(i < data.length){
            var cubes = nud['cubes' + i] = CubeGroupMod.create({
                materials: opt.MATERIALS_CUBE || MATERIALS_CUBE,
                anglesA: data[i][0],
                rotations: data[i][1]
            });
            cubes.position.fromArray( data[i][2] );
            worldObjects.add(cubes);
            i += 1;
        }
        return worldObjects;
    };
    // create nested groups
    api.create = function(opt = {} ) {
        var nested = new THREE.Group(),
        nud = nested.userData;
        nud.frame = 0;
        nud.maxFrame = opt.maxFrame === undefined ? 600: opt.maxFrame;
        // Camera
        var camera = nud.camera = new THREE.PerspectiveCamera(45, 4 / 3, 5, 60);
        camera.position.set(0, 10, 10);
        camera.lookAt(0, 0, 0);
        nud.cameraRadian = 0;
        // add camera to nested
        nested.add(camera);
        // lights
        var lightGroup = nud.lightGroup = createPointLightGroup();
        nested.add(lightGroup);
        // world objects
        nud.worldObjects = createWorldObjects(nud, opt);
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
       nud.camera.position.y = 15 * Math.sin(nud.cameraRadian);
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
}(this['NestedGroupsMod'] = {}));
