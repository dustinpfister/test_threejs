
(function(api){

    api.create = function(){
        var box = new THREE.Group();
            var bottom = new THREE.Mesh(
                new THREE.BoxGeometry(7.25, 0.75, 24.25),
                new THREE.MeshNormalMaterial({
                    side: THREE.DoubleSide
                })
            );
        box.add(bottom);
        return box;
    };

}(this['buildBox'] = {}));

var scene = new THREE.Scene();
scene.add(buildBox.create());

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(15, 15, 15);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

// controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// loop
var lt = new Date(),
frame = 0,
maxFrame = 600,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();
