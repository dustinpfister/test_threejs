(function () {
    // scene
    var scene = new THREE.Scene();
 
    // THE MESH
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
 
    // camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(4, 2, 4);
    camera.lookAt(0, 0, 0);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // loop
    var frame = 0,
    maxFrame = 200,
    fps = 30,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        r = Math.PI * 2 * per;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
 
            // MOVE the mesh with Object3D.position property that is an instance of Vector3
            mesh.position.set(Math.cos(r) * 2, 0, Math.sin(r) * 2);
 
            // ROTATE the mesh with the Object3d.rotation property that is an instance of Euler
            mesh.rotation.set(0, r, r * 2);
 
            // render the scene with the camera
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    }
 
    loop();
 
}
    ());