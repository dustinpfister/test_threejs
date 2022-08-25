
(function () {

    // LERP GEO FUNCTION based off the method from threejs-examples-lerp-geo
    var lerpGeo = function(geo, geoA, geoB, alpha){
        alpha = alpha || 0;
        // pos, and new pos
        let pos = geo.getAttribute('position');
        // positions for a and b
        let posA = geoA.getAttribute('position');
        let posB = geoB.getAttribute('position');
        // loop over pos and lerp between posA and posB
        var i = 0, len = pos.array.length;
        while(i < len){
            // creating Vector3 instances for current posA and PosB vertices
            var v = new THREE.Vector3(posA.array[i], posA.array[i + 1], posA.array[i + 2]);
            var v2 = new THREE.Vector3(posB.array[i], posB.array[i + 1], posB.array[i + 2]);
            // lerping between v and v2 with given alpha value
            v.lerp(v2, alpha);
            // set pos vertex to state of v
            pos.array[i] = v.x;
            pos.array[i + 1] = v.y;
            pos.array[i + 2] = v.z;
            i += 3;
        }
        // the needs update bool of pos should be set true
        pos.needsUpdate = true;

        geo.computeVertexNormals();

    };

    // scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

    // light
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 3, 1);
    scene.add(dl);

    // controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // source object
    var sourceObj = {};
    var mesh;

    // app loop
    var lt = new Date();
    var loop = function () {

        var now = new Date();
        var secs = (now - lt) / 1000 ;

        requestAnimationFrame(loop);

        if(secs >= 1 / 30){
            lerpGeo(mesh.geometry, sourceObj.box_1.geometry, sourceObj.box_2.geometry, 1 );
            lt = new Date();
        }

        controls.update();
        renderer.render(scene, camera);
    };

    // load dae, start loop
    var loader = new THREE.ColladaLoader();
    loader.load("/dae/many-object-tweening/many-object-tweening-1a.dae", function (result) {
        // get objects by name
        [ 'box_1', 'box_2' ].forEach(function(objName, i, arr){
            // get the source object and change position to 0, 0, 0
            var obj = result.scene.getObjectByName(objName);
            obj.position.set(0, 0, 0);
            // log name and count of position attribute
            console.log( obj.name, obj.geometry.attributes.position.count );
            // add ref to sourceObj
            sourceObj[objName] = obj;
        });
        // can now make new mesh objects by cloning a source object
        mesh = sourceObj.box_1.clone();
        mesh.geometry = sourceObj.box_1.geometry.clone();
        scene.add(mesh);

        loop();
    });

}
    ());
