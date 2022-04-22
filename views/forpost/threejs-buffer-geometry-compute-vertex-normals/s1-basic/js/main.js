(function () {
     // SCENE, CAMERA, RENDERER, and LIGHT
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(3, 0, 3);
    scene.add(dl);
    scene.add(new THREE.AmbientLight(0xffffff, 0.1));
    // GEOMETRY
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                -1.0, 0.0, 0.0,
                1.5, 0.0, 0.0,
                1.0, 1.0, 0.0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // COMPUTE VERTEX NORMALS FOR THE GEMOERTY
    geometry.computeVertexNormals();
    // MESH with GEOMETRY, and STANDARD MATERIAL
    var custom = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                side: THREE.DoubleSide
            }));
    scene.add(custom);
    // RENDER
    renderer.render(scene, camera);
}
    ());