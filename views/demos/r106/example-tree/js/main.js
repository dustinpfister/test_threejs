
var Tree = function (opt) {

    opt = opt || {};

    this.group = new THREE.Group();

    var cone = new THREE.ConeGeometry(1, 7, 32);
    var coneMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
    this.group.add(new THREE.Mesh(
            cone,
            coneMaterial));

};

(function () {
    // SCENE
    var scene = new THREE.Scene();
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    var tree = new Tree();
	scene.add(tree.group);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    // CONTROLS
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // LOOP
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
}
    ());
