var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

// standard checker
var check = mkChecker({
        w: 10,
        h: 10,
        sw: 12,
        sh: 12
    });
scene.add(check);

renderer.render(scene, camera);
