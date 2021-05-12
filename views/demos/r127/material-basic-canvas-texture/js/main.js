
(function () {

    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    var controls = new THREE.OrbitControls(camera);

    // CANVAS
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    // set canvas native size
    canvas.width = 32;
    canvas.height = 32;

    // draw to canvas
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 16, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    // CUBE
    var cube = new THREE.Mesh(

            // box GEOMETRY
            new THREE.BoxGeometry(1, 1, 1),

            new THREE.MeshBasicMaterial({
            map: new THREE.CanvasTexture(canvas)
        }));
    scene.add(cube);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var loop = function () {

        requestAnimationFrame(loop);

        renderer.render(scene, camera);

    };

    loop();

}
    ());
