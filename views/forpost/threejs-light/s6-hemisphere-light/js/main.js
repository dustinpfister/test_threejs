(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    // creating a scene
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(6, 6));
    var camera = new THREE.PerspectiveCamera(40, 640 / 480, 0.6, 100);
    camera.position.set(5, 4, 5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // Hemisphere Light
    // ---------- ----------
    const light = new THREE.HemisphereLight( 0x00afff, 0xffaf00, 1 );
    scene.add( light );
    // ---------- ----------
    // ADDING MESH OBJECT TO THE SCENE
    // ---------- ----------
    var mesh1 = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshPhongMaterial( { color: new THREE.Color('white') } )
    );
    mesh1.rotation.set(0, Math.PI * 1.95, Math.PI * 0.35)
    scene.add(mesh1);
    // ---------- ----------
    // RENDER static scene
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());