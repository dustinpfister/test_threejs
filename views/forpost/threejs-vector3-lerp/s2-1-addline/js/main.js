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
    var v1 = new THREE.Vector3(5, 0, 5),
    v2 = new THREE.Vector3(-5, 0, -5);
    var i = 0, len = 100;
    while(i < len){
        var per = i / ( len - 1 ),
        x = Math.cos( Math.PI * 6 * per ),
        y = -2 + 4 * per;
        points.push( v1.clone().lerp(v2, per).add( new THREE.Vector3(x, y ,0) ) );
        i += 1;
    }
    // geometry from points array
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    // line object
    var line = new THREE.Line(
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