(function () {
 
    var createConeGroup = function (coneRotation) {
        coneRotation = coneRotation === undefined ? Math.PI * 1.5 : coneRotation;
        var group = new THREE.Group();
        var i = 0,
        radius = 2,
        count = 8;
        while (i < count) {
            // creating a mesh
            var geo = new THREE.ConeGeometry(0.5, 1, 10, 10);
            // ROTATING THE CONE GEOMERTY
            geo.rotateX(coneRotation);
            var bx = new THREE.Mesh(
                    geo,
                    new THREE.MeshNormalMaterial()),
            r = Math.PI * 2 / count * i;
            // set position of mesh
            bx.position.set(
                Math.cos(r) * radius,
                0,
                Math.sin(r) * radius);
            bx.lookAt(0, 0, 0);
            // add mesh to the group
            group.add(bx);
            i += 1;
        }
        return group;
    };
 
    // Scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
 
    // add groups
    var group1 = createConeGroup();
    group1.position.set(-4, 0, -4);
    group1.rotation.z = Math.PI / 180 * 90;
    scene.add(group1);
 
    var group2 = createConeGroup(Math.PI * 0.5);
    group2.position.set(2, 0, 2);
    scene.add(group2);
 
    // Camera and Render
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 50);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());