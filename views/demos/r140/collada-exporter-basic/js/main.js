// Extrude Geo
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // OBJECTS
    //-------- ----------
    // a mesh object
    const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 1, 1, 30),
        new THREE.MeshNormalMaterial()
    );
    // can set a name for it
    mesh.name = 'my_cylinder';
    // be sure to add it to the scene
    scene.add(mesh);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(mesh, camera);
    //-------- ----------
    // EXPORT
    //-------- ----------
    const exporter = new THREE.ColladaExporter();
    const result = exporter.parse( scene, null, { version: '1.5.0'} );
    document.getElementById('dae_output').value = result.data;
}());
