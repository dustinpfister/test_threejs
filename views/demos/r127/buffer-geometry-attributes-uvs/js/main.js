
(function () {

    // creating a simple canvas generated texture
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(16, 16, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    	ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    // scene
    var scene = new THREE.Scene();

    // GEOMETRY - starting with a plane
    var geometry = new THREE.PlaneGeometry(1, 1);

    console.log(geometry.getAttribute('uv').array);

    // use the geometry with a mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));

    scene.add(mesh);

    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    renderer.render(scene, camera);

}
    ());
