(function () {
    // Scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // MESH OF A BOX GEOMETRY AND THE LAMBERT MATERIAL
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(100, 100, 100),
            new THREE.MeshLambertMaterial({
                color: 0xff0000
            }));
    cube.position.set(0, 100, 0);
    scene.add(cube);
    // MESH OF A PLANE GEOMETRY AND THE LAMBERT MATERIAL
    var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1500, 1500, 8, 8),
            new THREE.MeshLambertMaterial({
                color: 0x00afaf,
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
    // SPOTLIGHT
    var spotLight = new THREE.SpotLight(0xffffff, 1, 300, Math.PI / 180 * 40, 1, 0),
    spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLight.add(spotLightHelper);
    scene.add(spotLight);
    spotLight.position.set(150, 200, -100);
    spotLightHelper.update();
    // render
    renderer.render(scene, camera);
}
    ());