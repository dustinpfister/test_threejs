
// create a THREE.Group of face marks for each hour
var createFaceCubes = function (material) {
    var group = new THREE.Group();
    clock.createFacePoints(0, 0, 0, 10).map(function (facePoints) {
        var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
        cube.position.set(facePoints[0], facePoints[1], facePoints[2]);
        cube.lookAt(0, 0, 0);
        group.add(cube);
        return cube;
    });
    return group;
};

createHandCubes = function (material) {
    var group = new THREE.Group();
    group.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material),
        new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material),
        new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material))

    var update = function (clockObj) {
        clockObj = clockObj || clock.get();
        clock.createHandPoints(clockObj,0,0,0,10).forEach(function (point, i) {
            var cube = group.children[i];
            cube.position.set(point[0], point[1], point[2]);
        });
    };
    update();

    return {
        group: group,
        update: update
    }

};

(function () {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    var materials = [
        new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true
        }),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })];

    //var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials[1]);
    //scene.add(cube);

    camera.position.set(11, 11, 11);
    camera.lookAt(0, 0, 0);
    renderer.setSize(320, 240);

    scene.add(createFaceCubes(materials[0]));

    //console.log(clock.createHandPoints(clock.get(new Date(2019, 11, 25, 1, 1, 30, 500)), 0, 0, 0, 10));

    var hands = createHandCubes(materials[1]);
	scene.add(hands.group);

    // loop
    var loop = function () {
        //var c = clock.get(new Date()),
        //rad = Math.PI * 2 * c.minPer,
        //x = Math.cos(rad) * 8,
        //y = Math.sin(rad) * 8;
        //cube.position.set(x, y, 0);
        //cube.lookAt(0, 0, 0);
		hands.update(clock.get(new Date(2019,0,1, 0,12,30,500)));
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();

}
    ());
