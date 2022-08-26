(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1.8, 1.8, 1.8);
    camera.lookAt(0, 0.25, 0);
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
    // Get Bias Helper
    //-------- ----------
    var getBias = function(per, count){
        count = count === undefined ? 1 : count;
        var b = Math.abs(0.5 - ( per * count % 1) ) / 0.5;
        return b;
    };
    //-------- ----------
    // APP LOOP
    //-------- ----------
    var sObj = {}; // source objects
    var mesh1, mesh2, mesh3, mesh4, mesh5;
    var lt = new Date();
    var f = 0, fm = 300;
    var loop = function () {
        var now = new Date();
        var secs = (now - lt) / 1000 ;
        requestAnimationFrame(loop);
        if(secs >= 1 / 30){
            var p = f / fm;
            // using tween with many object transitions
            tweenMany.tween(mesh1.geometry, [
                [ sObj.box_1.geometry, sObj.box_2.geometry, getBias(p, 1) ],
                [ sObj.box_1.geometry, sObj.box_3.geometry, getBias(p, 8) ],
                [ sObj.box_1.geometry, sObj.box_4.geometry, getBias(p, 32) ]
            ]);
            //!!! should use dae normals
            mesh1.geometry.computeVertexNormals();
            // rotation
            mesh1.rotation.y = Math.PI * 2 * p;
            lt = new Date();
            f += 1;
            f %= fm;
        }
        renderer.render(scene, camera);
    };
    //-------- ----------
    // LOAD DAE - start loop when done
    //-------- ----------
    tweenMany.load("/dae/many-object-tweening/many-object-tweening-1a.dae")
    .then( (sourceObj) => {
        sObj = sourceObj;
        mesh1 = tweenMany.createMesh(sObj, 'box_1');
        scene.add(mesh1);

        mesh2 = tweenMany.createMesh(sObj, 'box_1');
        mesh2.position.set(-6, 0, -2);
        scene.add(mesh2);

        mesh3 = tweenMany.createMesh(sObj, 'box_2');
        mesh3.position.set(-4, 0, -2);
        scene.add(mesh3);

        mesh4 = tweenMany.createMesh(sObj, 'box_3');
        mesh4.position.set(-2, 0, -2);
        scene.add(mesh4);

        mesh5 = tweenMany.createMesh(sObj, 'box_4');
        mesh5.position.set(0, 0, -2);
        scene.add(mesh5);


        // start loop
        loop();
    })
    .catch((e)=>{
        console.warn(e.message);
    });

}
    ());
