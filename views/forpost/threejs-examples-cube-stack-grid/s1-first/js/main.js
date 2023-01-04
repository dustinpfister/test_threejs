(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.1, 0.1, 0.1);
    const camera = new THREE.PerspectiveCamera(40, 640 / 480, 0.05, 1000);
    camera.position.set(25, 25, 25);
    camera.lookAt(0, -5, 0);
    scene.add(camera);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // CUBE STACK GRID
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(5, 10, 1);
    scene.add(dl);
    //-------- ----------
    // CUBE STACK GRID
    //-------- ----------
    const soPalette = [
        { boxCount: 3, colors: [ [0,1,0, [64, 255]], [0,1,1, [64, 255]] ], planeColor: 1 },
        { boxCount: 20 },
        { boxCount: 60 },
        { boxCount: 120, colors: [ [1,0,0, [64, 255]], [1,1,0, [64, 255]] ] },
        { boxCount: 80, colors: [ [1,0,0, [64, 255]], [1,1,0, [64, 255]] ] }
    ];
    const sopArray = [
        4,4,4,4,4,4,4,4,4,4,
        2,2,2,2,2,3,2,2,2,2,
        1,1,1,1,1,2,1,1,1,1,
        0,0,0,0,1,1,1,1,0,0,
        0,0,0,0,1,1,1,1,1,0,
        0,0,0,0,1,2,2,2,1,0,
        0,1,0,0,1,2,3,2,1,0,
        0,1,1,1,0,2,2,2,1,0,
        0,0,0,0,1,1,1,0,1,0,
        0,0,0,0,0,1,0,0,0,0,
        0,0,0,0,1,1,0,0,0,0,
        0,1,1,1,2,1,0,0,0,0,
        1,1,1,2,1,1,1,0,0,0,
        1,1,2,2,2,1,1,0,0,0,
        1,1,2,3,2,1,1,0,0,0
    ];
    const csg = CubeStackGrid.create({
        gw: 4, gh: 4,
        stackGW: 5, stackGH: 5, 
        stackOptionPalette: soPalette,
        sopArray: sopArray
    });
    scene.add(csg);
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    if(THREE.OrbitControls){
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
    }
    let frame = 0,
    lt = new Date();
    const maxFrame = 300;
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            // draw
            renderer.render(scene, camera);
            frame += 20 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
