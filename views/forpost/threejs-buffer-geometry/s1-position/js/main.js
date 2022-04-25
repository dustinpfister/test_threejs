(function () {

    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 1, 3);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // GEOMETRY, MESH
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                -1, 0, 0,
                1, 0, 0,
                1, 1.25, 0
            ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    var mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide
            }));
    scene.add(mesh);
    camera.lookAt(mesh.position)
 
    // RENDER
    renderer.render(scene, camera);
 
}
    ());