
(function () {

    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);

    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    // CANVAS

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    canvas.width = 8;
    canvas.height = 8;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ff00ff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    // MATERIAL
    var material = new THREE.MeshBasicMaterial({
            map: texture
        });

    //var material = new THREE.MeshLambertMaterial({
    //        emissive: new THREE.Color(0xffffff),
    //        emissiveMap: texture
    //    });

    // MESH
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    renderer.render(scene, camera);
}
    ());
