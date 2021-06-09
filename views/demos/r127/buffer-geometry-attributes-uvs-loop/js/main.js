
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
    ctx.arc(16, 16, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath(); // draw white square
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    // scene
    var scene = new THREE.Scene();

    // GEOMETRY - using a plane and getting the uv attribute
    var geometry = new THREE.PlaneGeometry(1, 1);
    var uv = geometry.getAttribute('uv');
    var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));
    mesh.position.set(0, 0, 0);
    scene.add(mesh);

    // camera, render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var frame = 0,
    maxFrame = 300;
    var loop = function(){
        var per = frame / maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
        requestAnimationFrame(loop);
        // MUTATING UV VALUES IN THE LOOP MAKING SURE TO SET
        // uv.needsUpdate to true
        uv.array[0] = -2 + 2 * bias;
        uv.array[1] = 2 - 1 * bias;
        uv.needsUpdate = true;
        renderer.render(scene, camera);
        frame += 1;
        frame %= maxFrame;
    };
    loop();

}
    ());
