(function () {
    // SCENE, CAMERA, RENDERER, LIGHT
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 0.5, 3);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(1, 1, 1)
    scene.add(dl);
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

console.log(geometry);

    // data texture
var width = 16, height = 16;
var size = width * height;
var data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    var stride = i * 4;
    var v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
    data[ stride ] = v;
    data[ stride + 1 ] = v;
    data[ stride + 2 ] = v;
    data[ stride + 3 ] = 255;
}
var texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
    var mesh1 = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({
                map: texture,
                side: THREE.FrontSide
            }));
    mesh1.rotateY(Math.PI * 0.15);
    mesh1.position.x  = -0.50;
    scene.add(mesh1);
    // vertex helper
    var vertHelper = new THREE.VertexNormalsHelper(mesh1, 0.5, 0x00ff00);
    scene.add(vertHelper)
 
    // RENDER
    renderer.render(scene, camera);
}());