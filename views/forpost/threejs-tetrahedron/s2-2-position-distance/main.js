(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0 ,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // CHECKING OUT THE POSITION ATTRIBUTE
    // ---------- ----------
    const geo = new THREE.TetrahedronGeometry(1, 0);
    // getting position attribute
    const pos = geo.getAttribute('position');
    // it has a count of 12 becuase it is not indexed
    console.log(pos.count); // 12 ?!
    console.log(geo.index); // null
    // ---------- ----------
    // NEW POSITION ATTRIBUTE FROM THE FIRST 4
    // ---------- ----------
    const geo2 = new THREE.BufferGeometry();
    console.log( pos.array.slice(0, 4 * 3) );
    const posB = new THREE.BufferAttribute( pos.array.slice(0, 4 * 3), 3);
    geo2.setAttribute('position', posB);
    // making an index for it
    const data = new Uint8Array([1,2,0,  3,1,0,  2,3,0,  1,3,2]);
    const index = new THREE.BufferAttribute(data, 1)

    geo2.setIndex(index);

    geo2.computeVertexNormals();

    console.log(geo2.getAttribute('position').count); // 4



    // ---------- ----------
    // MESH 
    // ---------- ----------
    const mesh1 = new THREE.Mesh( geo, new THREE.MeshNormalMaterial() );
    mesh1.position.set(-2,0,0)
    scene.add(mesh1);

    const mesh2 = new THREE.Mesh( geo2, new THREE.MeshNormalMaterial() );
    scene.add(mesh2);
    // ---------- ----------
    // CONTROLS
    // ---------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    // loop
    const loop = () => {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();

}());