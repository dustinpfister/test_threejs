(function () {
    //-------- ----------
    // CREATING A WEBL RENDER, SCENE, AND CAMERA
    //-------- ----------
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 320 / 240, .5, 1000);
    camera.position.set(2, 3, 1);
    camera.lookAt(0, 0, 0);
    //-------- ----------
    // add something to the scene
    //-------- ----------
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial()));
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
