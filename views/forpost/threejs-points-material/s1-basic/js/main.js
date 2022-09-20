
(function () {
    // scene
    var scene = new THREE.Scene();
    // geometry
    var geometry = new THREE.SphereGeometry(1, 10, 60);
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    var pt = new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                color: 0x00afaf,
                size: 0.025
            }));
    scene.add(pt);
    // camera and renderer
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000); // camera
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer(); // render
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
