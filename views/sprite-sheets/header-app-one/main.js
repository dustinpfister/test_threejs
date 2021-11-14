(function () {
 
    // GEOMETRY
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                0, 0, 0,
                1, 0, 0,
                1, 1, 0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
 
    // MESH with GEOMETRY, and Basic MATERIAL
    var custom = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide
            }));
 
    // SCENE
    var scene = new THREE.Scene();
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 0.5, 3);
 
    // add custom to the scene
    scene.add(custom);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('sheet').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());