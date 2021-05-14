(function () {

    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7));

    var group = new THREE.Group();
    scene.add(group)
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    group.add(box);

    // using localToWorld method but the function does
    // not seem to work as it should. if the group is positioned
    // to 2,0,0 and I pass the vector 0,0,0 to the localToWorld
    // method I would expect 2,0,0 returned, but the result is 0,0,0
    group.position.set(2, 0, 0);
    var v = new THREE.Vector3(0, 0, 0);
    console.log(box.localToWorld(v));
    console.log(v.x);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
    camera.position.set(9, 12, 9);
    camera.lookAt(box.position);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
