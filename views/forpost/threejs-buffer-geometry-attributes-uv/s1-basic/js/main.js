(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // CANVAS TEXTURE
    //-------- ----------
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = '#004040'; // fill
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'red';
    ctx.beginPath(); // draw red and white circle
    ctx.arc(10, 10, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath(); // draw white square
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    //-------- ----------
    // GEOMETRY - Mutation of a plane
    //-------- ----------
    const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    const uv = geometry.getAttribute('uv'),
    position = geometry.getAttribute('position');
    // the position attribute
    console.log(position.count); // 4 ( the are points or vertices )
    console.log(position.array.length); // 12 ( x, y, and z for each point )
    // THE UV ATTRIBUTE
    console.log(uv.count); // 4 ( the are points or vertices )
    console.log(uv.array.length); // 8 ( there is a u and v value for each point )
    // MUTATING THE UV VALUES
    uv.array[0] = 0.27;
    uv.array[1] = 0.73;
    uv.array[2] = 0.73;
    uv.array[3] = 0.73;
    uv.array[4] = 0.27;
    uv.array[5] = 0.27;
    uv.array[6] = 0.73;
    uv.array[7] = 0.27;
    //-------- ----------
    // MESH
    //-------- ----------
    // use the geometry with a mesh
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));
    mesh.position.set(1, 0, 0);
    scene.add(mesh);
    // another mesh where I am not doing anything to the uv values
    const geometry2 = new THREE.PlaneGeometry(1, 1, 1, 1);
    const mesh2 = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));
    mesh2.position.set(-1, 0, 0);
    scene.add(mesh2);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
