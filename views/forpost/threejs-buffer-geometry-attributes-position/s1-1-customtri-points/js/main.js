(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, GRID
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(3, 3, 3);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    scene.add( new THREE.GridHelper(10, 10));
    //-------- ----------
    // GEOMETRY
    //-------- ----------
    const geometry = new THREE.BufferGeometry();
   // create data as Float32Array
    const data = new Float32Array( [
        -1.0, 0.0,  0.0,
        1.0, 0.0,  0.0,
        0.0, 2.0,  0.0,
    ]);
    // create new instance of BufferAttribute with Float3sArray and set as 'position'
    geometry.setAttribute('position', new THREE.BufferAttribute( data, 3 ));
    // can now call methods like translate, center, rotateX, ect
    geometry.center();
    //-------- ----------
    // POINTS
    //-------- ----------
    const points = new THREE.Points(geometry, new THREE.PointsMaterial({size: 0.5}));
    camera.lookAt(points.position);
    scene.add(points);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());