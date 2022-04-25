(function () {
    // SCENE, CAMERA
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 0.5, 3);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // MESH with GEOMETRY, and Normal MATERIAL
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                0,0,0,
                1,0,0,
                1,1,0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // compute vertex normals
    geometry.computeVertexNormals();
    var mesh1 = new THREE.Mesh(
            geometry,
            new THREE.MeshNormalMaterial({
                side: THREE.FrontSide
            }));
    mesh1.rotateY(Math.PI * 0.15);
    mesh1.position.x  = 0.50;
    scene.add(mesh1);
    var mesh2 = new THREE.Mesh(
            geometry,
            new THREE.MeshNormalMaterial({
                side: THREE.BackSide
            }));
    mesh2.rotateY(Math.PI * 0.75);
    mesh2.position.x  = -0.50;
    scene.add(mesh2);
    // vertex helper
    var vertHelper = new THREE.VertexNormalsHelper(mesh1, 0.5, 0x00ff00);
    scene.add(vertHelper)
    var vertHelper = new THREE.VertexNormalsHelper(mesh2, 0.5, 0x00ff00);
    scene.add(vertHelper) 
 
    // RENDER
    renderer.render(scene, camera);
}());