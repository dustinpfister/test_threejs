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
    // HELPER FUNCTIONS
    //-------- ----------
    // custom plane geo function based off of THREE.PlaneGeometry source code found at:
    // https://github.com/mrdoob/three.js/blob/r146/src/geometries/PlaneGeometry.js
    const PlaneGeo = ( width = 1, depth = 1, widthSegments = 1, depthSegments = 1) => {
        const geo = new THREE.BufferGeometry();
        const width_half = width / 2;
        const depth_half = depth / 2;
        const gridX = Math.floor( widthSegments );
        const gridZ = Math.floor( depthSegments );
        const gridX1 = gridX + 1;
        const gridZ1 = gridZ + 1;
        const segment_width = width / gridX;
        const segment_depth = depth / gridZ;
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        // position, normal, and uv data arrays
        for ( let iz = 0; iz < gridZ1; iz ++ ) {
            const z = iz * segment_depth - depth_half;
            for ( let ix = 0; ix < gridX1; ix ++ ) {
                const x = ix * segment_width - width_half;
                vertices.push( x, 0, z );
                normals.push( 0, 0, 1 );
                uvs.push( ix / gridX );
                uvs.push( 1 - ( iz / gridZ ) );
             }
        }
        // THE BUFFER GEOMETRY INDEX DATA
        for ( let iz = 0; iz < gridZ; iz ++ ) {
            for ( let ix = 0; ix < gridX; ix ++ ) {
                const a = ix + gridX1 * iz;
                const b = ix + gridX1 * ( iz + 1 );
                const c = ( ix + 1 ) + gridX1 * ( iz + 1 );
                const d = ( ix + 1 ) + gridX1 * iz;
                indices.push( a, b, d );
                indices.push( b, c, d );
            }
        }
        geo.setIndex( indices );
        geo.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        geo.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
        geo.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
        return geo;
    };
    //-------- ----------
    // GEO, MATERIAL, MESH
    //-------- ----------
    const geo = PlaneGeo();
    const material = new THREE.MeshNormalMaterial({ side: THREE.FrontSide });
    const mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());