(function () {
    //-------- ----------
    // SCENE, RENDER, CAMERA
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10))
    const camera = new THREE.PerspectiveCamera(40, 320 / 240, 1, 1000);
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // LINE2
    //-------- ----------
    const geo = new THREE.LineGeometry();
    geo.setPositions([0,0,0, 0,3,0, -3,3,-5, -3,3,5, 0,0,5, 0,0,0]);
    const line_material = new THREE.LineMaterial({
        linewidth: 0.025,
        color: 0xff0000
    });
    const line = new THREE.Line2(geo, line_material);
    scene.add(line)
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
