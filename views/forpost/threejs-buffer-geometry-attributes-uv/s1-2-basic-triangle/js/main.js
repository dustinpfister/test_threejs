(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10))
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1, 0.5, 1);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // CANVAS TEXTURE
    //-------- ----------
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 8;
    canvas.height = 8;
    ctx.fillStyle = '#004040';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(2, 2, 2, 2);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    //-------- ----------
    // GEOMETRY - Custom Triangle
    //-------- ----------
    // position attribuite
    const geometry = new THREE.BufferGeometry();
    const vertices1 = new Float32Array([
                0, -0.5, -0.75,
                0, 0.5, 0.25,
                0, -0.5, 0.25
            ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices1, 3));
    // normals
    geometry.computeVertexNormals();
    // uv attribute
    const vertices2 = new Float32Array([
                0.2, 0.2,
                0.9, 0.9,
                0.2, 0.9
            ]);
    geometry.setAttribute('uv', new THREE.BufferAttribute(vertices2, 2));
    //-------- ----------
    // MESH
    //-------- ----------
    // use the geometry with a mesh
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));
    scene.add(mesh);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
