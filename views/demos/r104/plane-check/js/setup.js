var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);

// standard checker
var check = mkChecker({
        w: 5,
        h: 5
    });
scene.add(check);

// odd checker
var oddCheck = mkChecker({
        w: 4,
        h: 5,
        sw: 3,
        sh: 5
    });
oddCheck.position.set(8, 0, 0);
scene.add(oddCheck);

renderer.render(scene, camera);
