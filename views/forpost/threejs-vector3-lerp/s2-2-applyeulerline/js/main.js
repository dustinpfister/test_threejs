(function () {
    // SCENE, CAMERA, RENDERER, LIGHT
    let scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
    let camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(-8, 8, 8);
    camera.lookAt(0, 0, 0);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    scene.add(camera);
    // createing an array of Vector3 instances
    // using clone, LERP, and add methods
    var points = [];
    let v1 = new THREE.Vector3(5, 0, 5),
    v2 = new THREE.Vector3(-5, 0, -5);
    let i = 0, len = 100;
    while(i < len){
        let per = i / ( len - 1 ),
        e1 = new THREE.Euler();
        e1.x = Math.PI * 8 * per;
        e1.z = Math.PI * 8 * per;
        // vector3
        let v3 = new THREE.Vector3();
        v3.y = Math.pow(2, 2 * per)
        points.push( v1.clone().lerp(v2, per).applyEuler(e1).add( v3 ) );
        i += 1;
    }
    // geometry from points array
    let geometry = new THREE.BufferGeometry().setFromPoints( points );
    // line object
    let line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: 0x0000ff,
                linewidth: 6
            }));
    scene.add(line)
    // render
    renderer.render(scene, camera);
}
    ());