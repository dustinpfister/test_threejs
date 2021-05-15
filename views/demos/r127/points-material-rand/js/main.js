(function () {
    // scene
    var scene = new THREE.Scene();

    // geometry
    var i = 0,
    verts = [];
    while (i < 500) {
        var pt = new THREE.Vector3();
        pt.set(
            THREE.Math.randFloatSpread(45),
            THREE.Math.randFloatSpread(45),
            THREE.Math.randFloatSpread(45));
        verts.push(pt.x, pt.y, pt.z);
        i += 1;
    }
    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    scene.add(
        new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                color: 0x00afaf
            })));

    // renderer and camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(50, 50, 50);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
