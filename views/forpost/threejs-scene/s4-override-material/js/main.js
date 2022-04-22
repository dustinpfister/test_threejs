(function () {
    // create a Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xafafaf);
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 100);
    camera.position.set(2.5, 2.5, 2.5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // can set an override material for everything
    scene.overrideMaterial = new THREE.MeshDepthMaterial();
    // just adding a 1x1x1 cube with the default
    // MeshBasicMaterial and random color for faces
    // when added to the scene like this
    scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)));
    // adding another 1x1x1 cube but this time I am giving
    // and instance of MeshBasicMaterial in which I am setting
    // the face color of the faces to red
    var cube2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0x00ff00
            }));
    cube2.position.set(-2, 0, 0);
    scene.add(cube2);
    // a sphere using the lamber material in wire frame mode
    var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 20, 20),
            new THREE.MeshLambertMaterial({
                emissive: 0x00004a
            }));
    sphere.position.set(0, 0, -2);
    scene.add(sphere);
    // render the scene with the camera
    renderer.render(scene, camera);
}
    ());