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
    var sObj = {}; // source objects
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
                [ sObj.box_1.geometry, sObj.box_2.geometry, b1 ]
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

    tweenMany.load("/dae/many-object-tweening/many-object-tweening-1a.dae")
    .then( (sourceObj) => {
        sObj = sourceObj;
        mesh = sObj.box_1.clone();
        mesh.geometry = sObj.box_1.geometry.clone();
        scene.add(mesh);
        // start loop
        loop();
    })
    .catch((e)=>{
        conosole.warn(e.message);
    });

}
    ());
