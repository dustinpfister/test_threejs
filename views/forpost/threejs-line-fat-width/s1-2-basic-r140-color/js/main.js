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
    // use the set colors method an pass an array of color channel values
    // in the from of 0 to 1 values for each color channel (rgb)
    geo.setColors([0,1,0, 0,1,1, 0,0.5,0, 0,0.5,0.5, 0,0.25,0, 0,0.25,0.25]);
    // use vertex colors when setting up the material
    const line_material = new THREE.LineMaterial({
        linewidth: 0.025, vertexColors: true
    });
    const line = new THREE.Line2(geo, line_material);
    scene.add(line)
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
