(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(2, 4, 8);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // MESH OBJECTS
    // ---------- ----------
    var mkCone = function(){
        var cone = new THREE.Mesh(
            new THREE.ConeGeometry(0.25, 1, 30, 30),
            new THREE.MeshNormalMaterial());
        // Rotating the geometry of each cone once
        cone.geometry.rotateX(1.57);
        return cone;
    };
    // get position helper
    var getPos = function(i, len){
        var p = i / (len - 1 ),
        x = -3 + 6 * p,
        y = -1.5 + 3 * p,
        z = -4 + Math.sin(Math.PI * p) * 6;
        return new THREE.Vector3(x, y, z);
    };
    // creating and positioning mesh objects
    var theCones = new THREE.Group();
    scene.add(theCones);
    var i = 0, len = 7;
    while(i < len){
        var cone = mkCone();
        //cone.position.set(x, y, z);
        cone.position.copy(getPos(i , len))
        theCones.add(cone);
        i += 1;
    }
    // using look at for each cube to set rotation of each cube
    theCones.children.forEach(function(cone, i, arr){
        var i2 = i + 1, cone2;
        if(i === 0){
            i2 = 1;
        }
        if(i >= arr.length - 1){
            i2 = arr.length - 2;
        }
        cone2 = arr[i2];
        cone.lookAt(cone2.position);
    });
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
 
}
    ());