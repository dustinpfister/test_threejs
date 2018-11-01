
(function () {

    function exportVid(blob) {
        const vid = document.createElement('video');
        vid.src = URL.createObjectURL(blob);
        vid.controls = true;
        document.body.appendChild(vid);
        const a = document.createElement('a');
        a.download = 'myvid.webm';
        a.href = vid.src;
        a.textContent = 'download the video';
        document.body.appendChild(a);
    }

    // SCENE
    var scene = new THREE.Scene();

    // I will need an camera to look at objects in the scene
    camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000),

    // I will need a geometry, in this case BoxGeometery
    geometry = new THREE.BoxGeometry(200, 200, 200),

    // I will need a material for the cube
    material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        });

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);

    // I need a mesh that will tie a geometry and material together
    mesh = new THREE.Mesh(geometry, material),

    // In order to see anything I will also need a renderer
    // to use with my scene, and camera
    renderer = new THREE.WebGLRenderer();

    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);

    // now that I have everything I need I can call some methods
    // of what I have to set up my scene, camera, and renderer.
    // I must at least add the mesh to the scene, and position the camera
    // in a way so that it is looking at the mesh
    scene.add(mesh);

    // set the position of the camera away from the cube, and
    // look at the origin.
    camera.position.set(250, 200, 250);
    camera.lookAt(0, 0, 0);
    renderer.setSize(320, 240);


    var i = 0,
    maxI = 100;
    // loop
    function animate() {

        var per = i / maxI,
        r = Math.PI * 2 * per;

        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        camera.position.set(Math.cos(r) * 200, Math.sin(r) * 200, 250);
        camera.lookAt(0, 0, 0);

        i += 1;
        i %= maxI;

    };

    animate();

}
    ());
