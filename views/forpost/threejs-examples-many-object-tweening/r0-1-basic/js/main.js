(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1.4, 1.4, 1.4);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
    //-------- ----------
    // LIGHT
    //-------- ----------
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3);
    scene.add(dl);
    //-------- ----------
    // APP LOOP
    //-------- ----------
    // source object
    var sourceObj = {};
    var mesh;
    var lt = new Date();
    var f = 0, fm = 300;
    var loop = function () {
        var now = new Date();
        var secs = (now - lt) / 1000 ;
        requestAnimationFrame(loop);
        if(secs >= 1 / 30){
            var p = f / fm;
            var b1 = Math.abs(0.5 - ( p * 4 % 1) ) / 0.5;
            tweenMany.tween(mesh.geometry, [
                [ sourceObj.box_1.geometry, sourceObj.box_2.geometry, b1 ]
            ]);
            //!!! should use dae normals
            mesh.geometry.computeVertexNormals();
            // rotation
            mesh.rotation.y = Math.PI * 2 * p;
            mesh.rotation.x = Math.PI * 4 * p;
            lt = new Date();
            f += 1;
            f %= fm;
        }
        renderer.render(scene, camera);
    };
    // load dae, start loop
    var loader = new THREE.ColladaLoader();
    loader.load("/dae/many-object-tweening/many-object-tweening-1a.dae", function (result) {
        // get objects by name
        [ 'box_1', 'box_2', 'box_3', 'box_4' ].forEach(function(objName, i, arr){
            // get the source object and change position to 0, 0, 0
            var obj = result.scene.getObjectByName(objName);
            obj.position.set(0, 0, 0);
            // add ref to sourceObj
            sourceObj[objName] = obj;
        });
        // can now make new mesh objects by cloning a source object
        mesh = sourceObj.box_1.clone();
        mesh.geometry = sourceObj.box_1.geometry.clone();
        scene.add(mesh);
        // start loop
        loop();
    });
}
    ());
