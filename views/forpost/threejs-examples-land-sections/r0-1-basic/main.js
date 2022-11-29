(function () {
    //-------- ----------
    // Scene
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // Create Sections object
    //-------- ----------
    const mainGroup = Sections.create(game);
    scene.add(mainGroup);
    Sections.update(game, mainGroup);
    //-------- ----------
    // LOOP
    //-------- ----------
    if(THREE.OrbitControls){
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
    }
    function loop() {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
}());
