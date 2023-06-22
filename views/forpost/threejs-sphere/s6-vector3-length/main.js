(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER SETUP
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10))
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var light = new THREE.PointLight(0xffffff, 1.5); // point light
    light.position.set(1, 2, 3);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xafafaf, 0.15));
    // ---------- ----------
    // MESH OBJECTS USING SPHERE GEOMERTY
    // ---------- ----------
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 30,30), new THREE.MeshStandardMaterial());
    scene.add(sphere);
    var sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 30,30), new THREE.MeshStandardMaterial({color: 0xff0000}));
    scene.add(sphere2);
    // ---------- ----------
    // Vector3
    // ---------- ----------
    // using apply Euler method to change direction and length
    var setMeshPos = function(mesh, deg1, deg2, vecLength){
        deg1 = deg1 === undefined ? 0 : deg1;
        deh2 = deg2 === undefined ? 0 : deg2;
        vecLength = vecLength === undefined ? 1.1: vecLength;
        var homeVec = new THREE.Vector3(vecLength, 0, 0);
        var a = THREE.MathUtils.degToRad(deg1),
        b = THREE.MathUtils.degToRad(deg2);
        mesh.position.copy(homeVec).applyEuler( new THREE.Euler(0, a, b) );
    };
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // loop
    var deg1 = 0,
    deg2 = 45,
    degPerSec = 90,
    a = 0,
    aMax = 30,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = ( now - lt ) / 1000;
        requestAnimationFrame(loop);
        deg2 = Math.sin(Math.PI * 2 * ( a / aMax )) / Math.PI * 90;
        setMeshPos(sphere2, deg1, deg2, 1.1);
        deg1 += degPerSec * secs;
        deg1 %= 360;
        a += 1;
        a %= aMax;
        // UPDATE CONTROLS
        controls.update();
        renderer.render(scene, camera);
        lt = now;
    };
 
    loop();
}());