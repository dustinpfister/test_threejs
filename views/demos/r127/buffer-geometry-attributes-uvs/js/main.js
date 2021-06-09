
(function () {

    // creating a simple canvas generated texture
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = '#004040'; // fill
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'red';
    ctx.beginPath(); // draw red and white circle
    ctx.arc(10, 10, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath(); // draw white square
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    // scene
    var scene = new THREE.Scene();

    // GEOMETRY - starting with a plane
    var geometry = new THREE.PlaneGeometry(1, 1);
    var uv = geometry.getAttribute('uv');
    // MUTATING THE UV VALUES
    uv.array[0] = 0.27;
    uv.array[1] = 0.73;

    uv.array[2] = 0.73;
    uv.array[3] = 0.73;

    uv.array[4] = 0.27;
    uv.array[5] = 0.27;

    uv.array[6] = 0.73;
    uv.array[7] = 0.27;

    // use the geometry with a mesh
    var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));
    mesh.position.set(1, 0, 0);
    scene.add(mesh);

    // another mesh where I am not doing anything to the uv values
    var geometry = new THREE.PlaneGeometry(1, 1);
    var mesh2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));
    mesh2.position.set(-1, 0, 0);
    scene.add(mesh2);

    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    renderer.render(scene, camera);

}
    ());
