(function(){
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 2000);
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);
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
        // YES - Just give an array and let setIndex figure out what Attribute Type to use
        geo.setIndex(indices);
        //--------
        // MAYBE - There is passing a BufferAttribute to make things explicit. 
        //         Just be mindful of the number range limits.
        // geo.setIndex( new THREE.Uint32BufferAttribute( indices, 1) );
        // geo.setIndex( new THREE.Float64BufferAttribute( indices, 1) );
        //--------
        // NO!! - limit of Unit8Array is 255
        // geo.setIndex( new THREE.BufferAttribute( new Uint8Array(indices), 1) );
        // geo.setIndex( new THREE.Uint8BufferAttribute( indices, 1) );
        return geo;
    };
    //-------- ----------
    // GEO
    //-------- ----------
    // geo1 is a 1000 x 1000 size with a 1 * 1 with segment size
    // that results in 4 points which results in a Uint16Array
    const geo1 = PlaneGeo(1000, 1000, 1, 1);
    console.log(geo1.getAttribute('position').count); // 4
    console.log(geo1.index.array.constructor.name);   // Uint16Array
    // geo2 is a 1000 x 1000 size with a 100 * 100 with segment size
    // that results in 10201 points which results in a Uint16Array
    const geo2 = PlaneGeo(1000, 1000, 100, 100);
    console.log(geo2.getAttribute('position').count); // 10201
    console.log(geo2.index.array.constructor.name);   // Uint16Array
    // geo3 is a 1000 x 1000 size with a 280 * 280 with segment size
    // that results in a total of 78961 points which results in a Uint32Array
    const geo3 = PlaneGeo(1000, 1000, 280, 280);
    console.log(geo3.getAttribute('position').count); // 78961
    console.log(geo3.index.array.constructor.name);   // Uint32Array
    //-------- ----------
    // MATERIAL, MESH
    //-------- ----------
    const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0, 1, 0),
        wireframe: true,
        wireframeLinewidth: 1
    });
    const mesh = new THREE.Mesh(geo2, material);
    scene.add(mesh);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
