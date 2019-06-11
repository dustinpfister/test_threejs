var isWebGL = function (ctxNum) {
    ctxNum = ctxNum === undefined ? '' : ctxNum;
    try {
        var canvas = document.createElement('canvas');
        return !!(window['WebGL' + ctxNum + 'RenderingContext'] &&
            (canvas.getContext('webgl' + ctxNum) ||
                canvas.getContext('experimental-webgl' + ctxNum)));
    } catch (e) {
        return false;
    }
};

var container = document.getElementById('demo');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

var mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 30, 30),
        [
            new THREE.MeshBasicMaterial({
                color: 0xff0000
            }),
            new THREE.MeshStandardMaterial({
                color: 0xff0000
            }),
        ]);
scene.add(mesh);

if (isWebGL()) {

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    container.appendChild(renderer.domElement);

    // Can use light with Web GL
    mesh.geometry.faces.forEach(function (face) {
        face.materialIndex = 1;
    });
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0, 2, 2);
    scene.add(light);

    renderer.render(scene, camera);

} else {

    container.innerText = 'No WebGL 1 support'

}
