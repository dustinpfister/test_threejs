(function () {
    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) ); 
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ARRAY OF MATERIALS, AND GROUPS
    var materials = [
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00
        }),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff
        })
    ];
    var geometry = new THREE.BoxGeometry(1, 1, 1); // Box geometry with groups set up
    // SET THE INDEX VALUES FOR EACH FACE
    geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % materials.length);
    });
    // MESH
    var mesh = new THREE.Mesh(
            // geometry as first argument
            geometry,
            // array of materials as the second argument
            materials);
    scene.add(mesh);
    // RENDER
    renderer.render(scene, camera);
}
    ());