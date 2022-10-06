(function () {
    //-------- ----------
    // HELPERS
    //-------- ----------
    // set location of a vert given an index value in geometry.index
    const setVert = function(geometry, vertIndex, pos){
        pos = pos || {};
        const posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
    };
    // set triangle
    const setTri = function(geometry, triIndex, pos){
        pos = pos || {};
        const vertIndex = triIndex * 3;
        setVert(geometry, vertIndex, pos);
        setVert(geometry, vertIndex + 1, pos);
        setVert(geometry, vertIndex + 2, pos);
    };
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // GEOMETRY
    //-------- ----------
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // example 2 on set tri helper
    setTri(geometry, 0, {x: 1});
    setTri(geometry, 1, {x: 1});
    setTri(geometry, 2, {x: -1});
    setTri(geometry, 3, {x: -1});
    setTri(geometry, 4, {y: 1});
    setTri(geometry, 5, {y: 1});
    setTri(geometry, 6, {y: -1});
    setTri(geometry, 7, {y: -1});
    setTri(geometry, 8, {z: 1});
    setTri(geometry, 9, {z: 1});
    setTri(geometry, 10, {z: -1});
    setTri(geometry, 11, {z: -1});
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);
    camera.lookAt(mesh.position);
    //-------- ----------
    // LOOP
    //-------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    const loop = function(){
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
}());
