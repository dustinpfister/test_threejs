(function () {
    // LERP GEO FUNCTION
    var lerpGeo = function(geo, geoA, geoB, alpha){
        alpha = alpha || 0;
        // pos, and new pos
        let pos = geo.getAttribute('position');
        let norm = geo.getAttribute('normal');
        // positions for a and b
        let posA = geoA.getAttribute('position');
        let posB = geoB.getAttribute('position');
        // normals for a and b
        let normA = geoA.getAttribute('normal');
        let normB = geoB.getAttribute('normal');
        var i = 0, len = pos.array.length;
        while(i < len){
            // update position
            var v = new THREE.Vector3(posA.array[i], posA.array[i + 1], posA.array[i + 2]);
            var v2 = new THREE.Vector3(posB.array[i], posB.array[i + 1], posB.array[i + 2]);
            v.lerp(v2, alpha);
            pos.array[i] = v.x;
            pos.array[i + 1] = v.y;
            pos.array[i + 2] = v.z;      
            i += 3;
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();
    };
    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(2, 1, 2);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // LIGHT
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3);
    scene.add(dl);
    // GEO AND MESH
    var g0 = new THREE.ConeGeometry(1, 1, 20, 18);
    var g1 = new THREE.SphereGeometry(1, 20, 20);
    console.log( g0.getAttribute('position').count ); // trying to get simular counts
    console.log( g1.getAttribute('position').count );
    var mesh = new THREE.Mesh(g0.clone(), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide}));
    scene.add(mesh);
    // CONTROL
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // APP LOOP
    var frame = 0, frameMax = 300;
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        var per = frame / frameMax,
        bias = 1 - Math.abs( per - 0.5) / 0.5;
        lerpGeo(mesh.geometry, g0, g1, bias);
        frame += 1;
        frame %= frameMax;
    };
    loop();
}
    ());
