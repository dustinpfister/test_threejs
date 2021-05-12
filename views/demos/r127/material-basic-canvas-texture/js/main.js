
(function () {

    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xafafaf);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 10);
    camera.position.set(1.25, 1.25, 1.25);
    camera.lookAt(0, 0, 0);

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
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 14, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.rect(0,0,canvas.height,canvas.height)
    ctx.stroke();

    // CUBE
    var cube = new THREE.Mesh(
        // box GEOMETRY
        new THREE.BoxGeometry(1, 1, 1),
        // BASIC MATERIAL WITH A COLOR MAP
        new THREE.MeshBasicMaterial({
            map: new THREE.CanvasTexture(canvas)
        })
    );
    scene.add(cube);

    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
