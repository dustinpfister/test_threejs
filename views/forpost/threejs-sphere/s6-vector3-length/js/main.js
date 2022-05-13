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
    // A MESH USING SPHERE GEOMERTY
    // ---------- ----------
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 30,30), new THREE.MeshStandardMaterial());
    scene.add(sphere);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // loop
    var loop = function () {
        requestAnimationFrame(loop);
        // UPDATE CONTROLS
        controls.update();
        renderer.render(scene, camera);
    };
 
    loop();
}());