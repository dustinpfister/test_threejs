(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 3);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // GEOMETRY, MESH - starting with a cube and looking at position attribute
    //-------- ----------
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // check out the position attribute of a cube
    const position = geometry.getAttribute('position');
    console.log( position.count ); // 24
    console.log( position.array.length ); // 72
    console.log( position.count * 3 === position.array.length); // true
    // get the index for all the trangles
    const index = geometry.getIndex();
    console.log( index.count );      // 36
    console.log( index.count / 3);   /* 12 (index.count / 3 === number of triangles ) */
    // mutating a position
    const vertIndex = index.array[0];
    position.array[vertIndex] = 0.8;
    position.array[vertIndex + 1] = 0.5;
    position.array[vertIndex + 2] = 0.5;
    position.needsUpdate = true;
    // use the geometry with a mesh
    const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);
    camera.lookAt(mesh.position);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());