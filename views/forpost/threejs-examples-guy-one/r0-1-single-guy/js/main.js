(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.05, 100);
    const renderer = new THREE.WebGL1Renderer();
    camera.position.set(10, 10, 10);
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
    // ADDING GUY OBJECT TO SCENE
    //-------- ----------
    const guy1 = new Guy();
    guy1.group.position.set(0, 3, 0)
    scene.add(guy1.group);
    guy1.moveArm('arm_right', 0, 1.25);
    guy1.moveArm('arm_left', 0.1, 1.25);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
