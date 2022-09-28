(function () {
 
    // set location of a vert given an index value in geometry.index
    const setVert = function(geometry, vertIndex, pos){
        pos = pos || {};
        const posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
    };
    // scene
    const scene = new THREE.Scene();
 
    // GEOMETRY
    const geometry = new THREE.BoxGeometry(1, 1, 1);
 
    const pos = {
       x: 1,
       y: 0.25,
       z: 1.25
    };
    setVert(geometry, 0, pos);
    setVert(geometry, 16, pos);
    setVert(geometry, 26, pos);
 
    const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);
 
    // CAMERA
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);
 
    // RENDER
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
 
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    const loop = function(){
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
 
}
    ());