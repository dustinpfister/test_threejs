
(function () {

    // SCENE
    var scene = new THREE.Scene();

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(0, 0, 3);
    camera.lookAt(0, 0, 0);

    var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0x0f0f0f,
                wireframe: true
            }));

    scene.add(sphere);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    var v = new THREE.Vector3(1, 0, 0);

    // drawing a square with lines
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(0, 0, 0), v);

    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: 0x0000ff
            }));

    scene.add(line);

    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            }));

    cube.scale.set(.1, .1, .1);
    scene.add(cube);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    var frame = 0,
    maxFrame = 100,
    per = 0,
	bias = 0;
    var loop = function () {

        requestAnimationFrame(loop);

        var r = Math.PI * 2 * per;
        var x = Math.cos(r) * 1;
        var y = Math.sin(r) * 1;
		var z = .25 + .75 * bias;
		var s = v.length();
		
        geometry.verticesNeedUpdate = true;

        //sphere.geometry.verticesNeedUpdate = true;
		sphere.geometry.normalize();
        sphere.geometry.scale(s, s, s);

        v.set(x, y,z);
        controls.update();

        renderer.render(scene, camera);

        frame += 1;
        frame = frame % maxFrame;
        per = frame / maxFrame;
		bias = Math.abs(.5 - per) / .5;

    };

    loop();
}
    ());
