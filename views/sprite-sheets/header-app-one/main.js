(function () {
 
    // SCENE
    var scene = new THREE.Scene();
 
    var ship = new THREE.Mesh(
        new THREE.ConeGeometry(1, 4, 3, 1),
        new THREE.MeshNormalMaterial()
        //new THREE.MeshBasicMaterial({wireframe: true})
    );
    ship.geometry.rotateX(Math.PI / 180 * 90);
    //ship.geometry.rotateZ(Math.PI * 1.5);

    ship.lookAt(1, 0, 1);

    scene.add(ship);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 2, 4);
    camera.lookAt(ship.position);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);


    renderer.render(scene, camera);


    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 128 * 8;
    canvas.height = 128;
    document.getElementById('sheet').appendChild(canvas);

    ctx.fillRect(0,0, canvas.width, canvas.height);
 
    ctx.drawImage(renderer.domElement, 0, 0, 640, 480, 0, 0, 128, 128);

}
    ());