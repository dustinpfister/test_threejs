
(function () {

    // a scene is needed to place objects in
    var scene = new THREE.Scene(),

    // I will need an camera to look at objects in the scene
    camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);

    // I need a mesh that will tie a geometry and material together
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 200),
            new THREE.MeshLambertMaterial({
                color: 0xff0000
            }));
    cube.position.set(0, 100, 0);
    scene.add(cube);

    // set up a render
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    console.log(renderer.shadowMap.enabled);

    // I must append the dom element used by the renderer to the html
    // that I am using.
    document.getElementById('demo').appendChild(renderer.domElement);

    // background
    scene.background = new THREE.Color(0x0f0f0f);

    // spotlight
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 350, 0);
    // add a cube that will serve at showing me where
    // the spotlight is
    spotLight.add(new THREE.Mesh(
            new THREE.BoxGeometry(10, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            })));
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    spotLight.position.set(0, 500, 500);
	
	spotLight.target = cube;
	console.log(spotLight.target);

    spotLight.add(new THREE.CameraHelper(spotLight.shadow.camera));
    //spotLight.target = cube;
    //spotLight.lookAt(cube.position.x, cube.position.y, cube.position.z);
    scene.add(spotLight);

    // add plane to the scene
    var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1500, 1500, 8, 8),
            new THREE.MeshBasicMaterial({
                color: 0x00afaf,
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    // set the position of the camera away from the cube, and
    // look at the cube.
    camera.position.set(1000, 1000, 1000);
    camera.lookAt(cube.position);
    renderer.setSize(320, 240);

    // render what we have
    renderer.render(scene, camera);

}
    ());
