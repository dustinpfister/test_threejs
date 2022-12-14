(function(){
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, -2, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPER FUNCTION
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
        geo.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        geo.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
        geo.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
        //-------- ----------
        // THE BUFFER GEOMETRY INDEX DATA, and the BufferGeometry setIndex method
        //-------- ----------
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
        // UISNG THE SET INDEX METHOD TO CREATE THE INDEX FOR THE BUFFER GEOMETRY
        // PASSING AN ARRAY, AND NOT A BUFFER ATTRIBUTE. IF A BUFFER ATTRIBUTE IS PASSED
        // MAKE SURE IT IS NOT A Uint8 TYPED ARRAY AS INDEX VALUES CAN GO BEYOND 255
        //--------
        // YES
        geo.setIndex(indices);
        // geo.setIndex( new THREE.Float32BufferAttribute( indices, 1) );
        //--------
        // NO!!
        // geo.setIndex( new THREE.BufferAttribute( new Uint8Array(indices), 1) );
        // geo.setIndex( new THREE.Uint8BufferAttribute( indices, 1) );
        return geo;
    };
    //-------- ----------
    // GEO, MATERIAL, MESH
    //-------- ----------
    const geo = PlaneGeo(10, 10, 20, 20);
    const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0, 1, 0),
        wireframe: true,
        wireframeLinewidth: 3
    });
    const mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
