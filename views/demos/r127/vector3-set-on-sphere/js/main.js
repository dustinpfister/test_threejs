
(function () {

    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };

    // set on sphere helper
    var setOnSphereFromPos = function(mesh, x, y, z, alt){
         var dir = new THREE.Vector3(x, y, z).normalize();
         var pos = new THREE.Vector3();
         pos.x = dir.x * alt;
         pos.y = dir.y * alt;
         pos.z = dir.z * alt;
         mesh.position.copy(pos);
    };

    var setOnSphere = function(mesh, lat, long, alt){
        var latBias = Math.abs(lat - 0.5) / 0.5;
        var radian = Math.PI * 2 * long,
        x = Math.cos(radian) * (alt - alt * latBias),
        z = Math.sin(radian) * (alt - alt * latBias),
        y = alt * latBias * (lat > 0.5 ? -1 : 1);
        setOnSphereFromPos(cube, x, y, z, alt);
    };

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));

    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 30, 30),
        new THREE.MeshNormalMaterial({wireframe:true}));
    scene.add(sphere);

    var cube = createCube();
    scene.add(cube);

    //setOnSphereFromPos(cube, 5, 0, 0, 2);
    setOnSphere(cube, 0.1, 0.3, 2);


    cube.lookAt(0, 0, 0);


    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
