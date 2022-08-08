(function () {
    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(6, 8, 6);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // GEOMETRY AND MESH
    var geometry = new THREE.ConeGeometry(1.5, 10, 30, 30);
    var cone = new THREE.Mesh(
            geometry,
            new THREE.MeshNormalMaterial());
    // USING BUFFER GEOMERTY rotateX, rotateY, and rotateX METHODS
    cone.geometry.rotateX(Math.PI * 0.5);
    cone.geometry.rotateY(Math.PI * 0.25);
    cone.geometry.rotateZ(Math.PI * 0.75);
    scene.add(cone)
    // RENDER
    renderer.render(scene, camera);
}
    ());