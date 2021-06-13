
(function () {

    // length
    var r = Math.PI / 180 * 45,
    x = Math.cos(r),
    y = Math.sin(r),

    vec = new THREE.Vector3(x, y, 0);

    console.log(vec.isVector3); // true
    console.log(vec.x, vec.y, vec.z); // 0.70... 0.70... 0
    console.log(vec.length()); // 1

    // addScalar
    var vec = new THREE.Vector3(3, 3, 7);
    vec.addScalar(10);

    console.log(vec.x, vec.y, vec.z); // 13 13 17

    // distance
    var a = new THREE.Vector3(10, 10, 10),
    b = new THREE.Vector3(10, 5, 10);
    console.log(a.distanceTo(b)); // 5

    // clone
    var original = new THREE.Vector3(10, 10, 10),
    copy = original.clone();

    copy.x += 5;

    console.log(copy.x); // 15
    console.log(original.x); // 10

    // copy
    var a = new THREE.Vector3(1, 2, 1),
    copy = new THREE.Vector3().copy(a);

    copy.z += 2;

    console.log(a.z); // 1
    console.log(copy.z); // 3

    // normalize
    var vec = new THREE.Vector3(7, 7, 7);

    console.log(vec.length()); // 12.12...

    vec.normalize();

    console.log(vec.x, vec.y, vec.z); // 0.57... 0.57... 0.57...
    console.log(vec.length()); // 1

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);

    /*
    var a = new THREE.Vector3(5, 5, 5),
    b = new THREE.Vector3(-5, -5, -5);

    var geometry = new THREE.Geometry();

    geometry.vertices.push(a, b);
    geometry.normalize();

    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color: 0x0000ff
    }));

    scene.add(line);

     */

    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true
            }));
    scene.add(cube);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    var loop = function () {
        requestAnimationFrame(loop);
        controls.update();
        renderer.render(scene, camera);
    };

    loop();
}
    ());
