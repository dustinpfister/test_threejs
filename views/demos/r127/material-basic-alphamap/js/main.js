
(function () {

    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x002a2a);

    // ALPHA MAP CANVAS
    var alphaCanvas = document.createElement('canvas'),
    ctx = alphaCanvas.getContext('2d');
    // set canvas native size
    alphaCanvas.width = 32;
    alphaCanvas.height = 32;
    // draw to canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, alphaCanvas.width, alphaCanvas.height);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeRect(3, 3, alphaCanvas.width - 6, alphaCanvas.height - 6);

    // mesh using BASIC MATERIAL with an alpha map
    var cube = new THREE.Mesh(
            // box GEOMETRY
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0.5,
                color: 0xffffff,
                alphaMap: new THREE.CanvasTexture(alphaCanvas),
                side: THREE.FrontSide
            }));
    scene.add(cube);

    // camera
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
