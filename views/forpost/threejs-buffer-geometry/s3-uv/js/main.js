(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 0.5, 3);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(1, 3, 2)
    scene.add(dl);
    //-------- ----------
    // GEOMETRY
    //-------- ----------
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
                0, 0, 0,
                1, 0, 0,
                1, 1, 0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // compute vertex normals
    geometry.computeVertexNormals();
    // creating a uv
    const uvs = new Float32Array([
                0, 0,
                1, 0,
                1, 1
            ]);
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    //-------- ----------
    // TEXTURE
    //-------- ----------
    const width = 4,
    height = 4;
    const size = width * height;
    const data = new Uint8Array(4 * size);
    for (let i = 0; i < size; i++) {
        const stride = i * 4;
        const v = Math.floor(THREE.MathUtils.seededRandom() * 255);
        data[stride] = v;
        data[stride + 1] = v;
        data[stride + 2] = v;
        data[stride + 3] = 255;
    }
    const texture = new THREE.DataTexture(data, width, height);
    texture.needsUpdate = true;
    const mesh1 = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({
                map: texture,
                side: THREE.FrontSide
            }));
    //-------- ----------
    // MESH
    //-------- ----------
    mesh1.rotateY(Math.PI * 0.15);
    mesh1.position.x = -0.50;
    scene.add(mesh1);
    // vertex helper
    const vertHelper = new THREE.VertexNormalsHelper(mesh1, 0.5, 0x00ff00);
    scene.add(vertHelper)
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
