
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .5, 1000);
    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);

    // MESH with Buffered Geometry, and Basic Material
    scene.add(new THREE.Mesh(

            // buffered Geometry
            new THREE.BufferGeometry()
            .addAttribute('position',
                new THREE.BufferAttribute(
                    new Float32Array([
                            0, 0, 0,
                            1, 1, 0,
                            1, 0, 0
                        ]), 3)),

            // Material
            new THREE.MeshBasicMaterial({
                color: 0xff0000,
                side: THREE.DoubleSide
            })));

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
