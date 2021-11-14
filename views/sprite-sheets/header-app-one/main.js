(function () {
 
    // SCENE
    var scene = new THREE.Scene();
 
    var ship = new THREE.Mesh(
        new THREE.ConeGeometry(1, 4, 6, 1),
        new THREE.MeshNormalMaterial()
        //new THREE.MeshBasicMaterial({wireframe: true})
    );
    ship.geometry.rotateX(Math.PI / 180 * 90);
    ship.geometry.rotateZ(Math.PI * 1.2);

    scene.add(ship);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.5, 1000);
    camera.position.set(0, 5, 5);
    camera.lookAt(ship.position);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);



    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    document.getElementById('sheet').appendChild(canvas);

    var cellSize = 32,
    cellCount = 8;
    canvas.width = cellSize * cellCount;
    canvas.height = cellSize;


    ctx.fillRect(0,0, canvas.width, canvas.height);
 

    var cellIndex = 0;
    while(cellIndex < cellCount){

        var d = 360 / cellCount * cellIndex,
        radian = Math.PI / 180 * d, 
        x = Math.cos(radian) * 5,
        z = Math.sin(radian) * 5;
        ship.lookAt(x, 0, z);
        renderer.render(scene, camera);
        ctx.drawImage(renderer.domElement, 0, 0, 640, 480, cellIndex * cellSize, 0, cellSize, cellSize);

        cellIndex += 1;
    }

}
    ());