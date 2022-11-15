(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.05, 100);
    const renderer = new THREE.WebGL1Renderer();
    camera.position.set(10, 5, 7);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const pl = new THREE.PointLight(0xffffff, 1);
    pl.position.set(3, 2, 1);
    scene.add(pl);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // set to plain surface by subtracting by known values
    // for legSize, bodSize, and space that work well
    const setYToPlainSurface = (guy, scale) => {
        scale = scale === undefined ? 1 : scale;
        const legSize = 2 * scale;
        const bodSize = 2 * scale;
        const space = 0.1 * scale;
        guy.group.position.y = legSize + bodSize / 2 + space * 2;
    };
    //-------- ----------
    // ADDING GUY OBJECT TO SCENE
    //-------- ----------
    const guy1 = new Guy();
    guy1.group.scale.set(0.5, 0.5, 0.5);
    scene.add(guy1.group);
    // using set to plain surface
    setYToPlainSurface(guy1, 0.5);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
