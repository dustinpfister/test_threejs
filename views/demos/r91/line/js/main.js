
(function () {

    var obj = new THREE.Object3D();

    // {"x":0,"y":0,"z":0}
    console.log(JSON.stringify(obj.position));

    obj.position.set(1, 2, 3);

    // {"x":1,"y":2,"z":3}
    console.log(JSON.stringify(obj.position));

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0, 0, -30);
    camera.lookAt(0, 0, 0);

    // Orbit Controls
    //var controls = new THREE.OrbitControls(camera);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(0, -10, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(0, 10, 0));

    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: 0x0000ff
            }));
    scene.add(line);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

    // loop
    /*
    var loop = function () {

    requestAnimationFrame(loop);
    //controls.update();
    renderer.render(scene, camera);

    };

    loop();
     */

}
    ());
