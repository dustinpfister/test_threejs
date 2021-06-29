(function () {
 
    // SCENE
    var scene = new THREE.Scene();
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 0.5, 3);
 
    // GEOMETRY
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

console.log(geometry.attributes);
 
    // MESH with GEOMETRY, and Normal MATERIAL
var mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide
            }));
mesh.rotateY(Math.PI * 0.25);
    scene.add(mesh);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());