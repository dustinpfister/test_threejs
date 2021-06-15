
(function () {

    // simple create cube helper
    var createCube = function () {
        var cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
        return cube;
    };

    // move cube by difference and percent
    var moveObjByDiff = function (obj, pos, per) {
        per = per === undefined ? 1 : per;
        per = per > 1 ? per % 1 : per;
        var diff = obj.position.clone().sub(pos);
        obj.position.sub(diff.multiplyScalar(per));
    };

    var moveObjByDistDiff = function (obj, pos, maxDist, maxPer) {
        maxDist = maxDist === undefined ? 5 : maxDist;
        maxPer = maxPer === undefined ? 0.25 : maxPer;
        var d = obj.position.distanceTo(pos),
        per = maxPer;
        if (d <= maxDist) {
            per = d / maxDist * maxPer;
        }
        moveObjByDiff(obj, pos, per);
    };

    var minDistCheck = function (obj, pos, minDist) {
        minDist = minDist === undefined ? 0.125 : minDist;
        var d = obj.position.distanceTo(pos);
        if (d < minDist) {
            return true;
        }
        return false;
    };

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7));

    // cubes
    var cube1 = createCube();
    cube1.position.set(0.001, 0, 0);
    scene.add(cube1);
    var cube2 = createCube();
    cube2.position.set(0, 0, 1.8);
    scene.add(cube2);

    //moveObjByDiff(cube2, cube1.position, 1);

    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(8, 10, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var update = function () {

        moveObjByDistDiff(cube2, cube1.position, 2);

        if (minDistCheck(cube2, cube1.position, 0.0625)) {
            cube2.position.set(5, 0, 0);
        }

    };

    var lt = new Date(),
    fps = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;

        requestAnimationFrame(loop);

        if (secs > 1 / fps) {
            update();
            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();

}
    ());
