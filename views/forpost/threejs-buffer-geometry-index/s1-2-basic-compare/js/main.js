(function(){
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // INDEX GEO
    //-------- ----------
    const geo_indexed = new THREE.BufferGeometry();
    // position array of 4 points to draw two triangles, by using an index
    geo_indexed.setAttribute('position',
        new THREE.BufferAttribute(new Float32Array([0,0,0, 0,2,0, -2,0,0, 0,0,-2]), 3)
    );
    const index = new THREE.BufferAttribute( new Uint8Array([0,1,2,0,1,3]), 1);
    geo_indexed.setIndex(index)
    geo_indexed.computeVertexNormals();
    //-------- ----------
    // INDEX GEO
    //-------- ----------
    const geo_non_indexed = new THREE.BufferGeometry();
    // position array of 6 points for two triangles ( no index )
    geo_non_indexed.setAttribute('position',
        new THREE.BufferAttribute(new Float32Array([0,0,0, 0,2,0, -2,0,0, 0,0,0, 0,2,0, 0,0,-2]), 3)
    );
    geo_non_indexed.computeVertexNormals();
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh_indexed = new THREE.Mesh(geo_indexed, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }) );
    mesh_indexed.position.x = -1;
    scene.add(mesh_indexed);
    const mesh_non_indexed = new THREE.Mesh(geo_non_indexed, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }) );
    mesh_non_indexed.position.x = 2;
    scene.add(mesh_non_indexed);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());