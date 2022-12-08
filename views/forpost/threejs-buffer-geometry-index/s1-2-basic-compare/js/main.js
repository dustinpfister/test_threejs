(function(){
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(2, 5, 5);
    camera.lookAt(-2, 0, -2);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // INDEX GEO
    //-------- ----------
    const geometry = new THREE.BufferGeometry();
    // position array of 4 points
    const pos = new THREE.BufferAttribute(new Float32Array([0,-3,0,0,3,0,-5,0,0,0,0,-5]), 3);
    geometry.setAttribute('position', pos);
    // using 4 points to draw two trangles by adding an index
    const index = new THREE.BufferAttribute( new Uint8Array([0,1,2,0,1,3]) , 1);
    geometry.setIndex(index)
    // using this to create normal attribute
    geometry.computeVertexNormals();
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }) );
    scene.add(mesh);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());