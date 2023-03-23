(function(){
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 640 / 480, 1, 1000);
    camera.position.set(14, 6, 14);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.domElement.width = 640;
    renderer.domElement.height = 480;
    renderer.setViewport(0, 0, 640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // CREATING A CUBE TEXTURE WITH CANVAS
    //-------- ----------
    const texture = canvasTextureMod.basicSquare(['r1', 'r1', 'r1'], 256, 1, 'black', 32, 64).image;
    // same texture for all sides
    cubeTexture = new THREE.CubeTexture(new Array(6).fill(texture));
    cubeTexture.needsUpdate = true;
    scene.background = cubeTexture;
    //-------- ----------
    // CONTROLS
    //-------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    //-------- ----------
    // LOOP
    //-------- ----------
    const loop = function () {
        requestAnimationFrame(loop);
        controls.update();
        renderer.render(scene, camera);
    };
    loop();
}());