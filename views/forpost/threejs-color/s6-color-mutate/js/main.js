// SCENE, CAMERA, RENDERER
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(8,8))
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
// Mesh
var color = new THREE.Color(1, 0, 0);
var material = new THREE.MeshStandardMaterial({
    color: color
})
var mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    material
);
scene.add(mesh);
// LOOP
var lt = new Date(),
frame = 0,
maxFrame = 200,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
		
		material.color.setRGB(bias, 1 - bias, 0);
		
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }

};
loop();
