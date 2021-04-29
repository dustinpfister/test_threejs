
(function () {

    // THE CANVAS ELEMENT
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    // size of the canvas
    canvas.width = 32;
    canvas.height = 32;
    // drawing to the canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ff00ff';
    ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // CREATING A TEXTURE FROM THE CANVAS
    var texture = new THREE.CanvasTexture(canvas);

    // USING THE CANVAS TEXTURE WITH A BASIC MATERIAL COLOR MAP
    var material = new THREE.MeshBasicMaterial({
            map: texture
        });

    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xafafaf);

    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);

    // geometry
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    // USING THE MATERIAL TO CREATE A MESH
    var mesh = new THREE.Mesh(geometry, material);
    // adding the mesh to the scene
    scene.add(mesh);

    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
