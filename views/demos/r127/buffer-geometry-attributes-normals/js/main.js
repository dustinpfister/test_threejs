
(function () {

    // scene
    var scene = new THREE.Scene();

    // GEOMETRY - starting with a cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    // check out the normal attribute of a cube
    var normal = geometry.getAttribute('normal');
    console.log(normal);

    // use the geometry with a mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide
            }));
    // Vertex Normals Helper
    var helper = new THREE.VertexNormalsHelper(mesh, 2, 0x00ff00, 1);

    scene.add(mesh);
    scene.add(helper);

    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    renderer.render(scene, camera);

}
    ());
