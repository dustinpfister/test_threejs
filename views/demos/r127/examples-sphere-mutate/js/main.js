
(function () {

    // set location of a vert given an index value in geometry.index
    var setVert = function(geometry, vertIndex, pos){
        pos = pos || {};
        var posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
    };

    // set pos for tri index
    var setTri = function(geometry, triIndex, pos){
        pos = pos || {};
        var vertIndex = triIndex * 3;
        setVert(geometry, vertIndex, pos);
        setVert(geometry, vertIndex + 1, pos);
        setVert(geometry, vertIndex + 2, pos);
    };

    // scene
    var scene = new THREE.Scene();

    // GEOMETRY
    var geometry = new THREE.SphereGeometry(0.5, 15, 15);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1, 1, 1);
    camera.lookAt(mesh.position);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var per = 0,
    lt = new Date(),
    maxFrames = 300,
    FPS = 30;
    var loop = function(){
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS){
            per += 1 / (maxFrames / FPS) * secs;
            per %= 1;
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();

}
    ());
