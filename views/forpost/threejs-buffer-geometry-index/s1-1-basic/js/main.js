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
    // CUSTOM GEO WITH JUST A POSITION, AND NORMAL ATTRIBUTES
    //-------- ----------
    const geometry = new THREE.BufferGeometry();
    // position array of 4 points
    const pos = new THREE.BufferAttribute(
        new Float32Array([
            0,-3, 0,  // 0
            0, 3, 0,  // 1
           -5, 0, 0,  // 2
            0, 0,-5   // 3
        ]),
        3    // 3 numbers for every item in the buffer attribute ( x, y, z)
    );
    geometry.setAttribute('position', pos);
    // using computeVertexNormals to create normal attribute
    geometry.computeVertexNormals();
    //-------- ----------
    // CREATING AN INDEX BY USING THE setIndex METHOD AND PASSING AN ARRAY
    //-------- ----------
    // drawing 2 trangles with just 4 points in the position attribute by giving an
    // array of index values for points in the position attribute to the setIndex method
    geometry.setIndex( [0,1,2,0,1,3] );
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