
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(55, 320 / 240, .5, 1000);
    camera.position.set(1.2, 1.2, 1.2);
    camera.lookAt(0, 0, 0);

    // GEOMETRY
    var geometry = new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry(1, 1, 1));

    // add GEOMETRY to SCENE in MESH, with Normal MATERIAL
    scene.add(new THREE.Mesh(

            // buffered Geometry
            geometry,

            // Material
            new THREE.MeshNormalMaterial()));

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
