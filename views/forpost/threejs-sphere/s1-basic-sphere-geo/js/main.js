(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    // creating a scene
    var scene = new THREE.Scene();
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // ADDING A MESH WITH SPHERE GEOMOTY TO THE SCENE
    // ---------- ----------
    var mesh = new THREE.Mesh(
            // USING A SPHERE GEOMETRY WITH A RADIUS OF 0.5
            new THREE.SphereGeometry(0.5),
           // Using the Depth Material
            new THREE.MeshDepthMaterial() );
    scene.add(mesh); // add the mesh to the scene
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());