(function () {
    //******** **********
    // scene, camera, render
    //******** **********
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //******** **********
    // GEOMETRY, MESH - starting with a cube and looking at position attribute
    //******** **********
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    // check out the position attribute of a cube
    var position = geometry.getAttribute('position');
    console.log( position.count ); // 24
    console.log( position.array.length ); // 72
    console.log( position.count * 3 === position.array.length); // true
    var index = geometry.getIndex();
    console.log( index.count );      // 36
    console.log( 2 * 6 );            // 12 ( number of triangles )
    console.log( index.count / 3);   /* 12 (index.count / 3 === number of triangles ) */
    // mutating a position
    var vertIndex = index.array[0] * 3;
    position.array[vertIndex] = 1;
    position.needsUpdate = true;
    // use the geometry with a mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);
    camera.lookAt(mesh.position);
    //******** **********
    // RENDER
    //******** **********
    renderer.render(scene, camera);
}
    ());