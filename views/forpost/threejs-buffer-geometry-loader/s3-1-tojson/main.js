
(function () {
    //******** *********
    // Scene, Camera, renderer
    //******** *********
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(65, 4 / 3, .5, 10);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //******** *********
    // BUFFER GEOMETRY TO TEXT
    //******** *********
    var geo = new THREE.SphereGeometry(1, 10, 10);
    // make sure to use to non indexed before calling to json
    var buffObj = geo.toNonIndexed().toJSON();
    var text = JSON.stringify(buffObj);
    //******** *********
    // TEXT TO BUFFER GEOMETRY
    //******** *********
    const loader = new THREE.BufferGeometryLoader();
    var obj = JSON.parse(text);
    var geo2 = loader.parse( obj );
    var mesh = new THREE.Mesh(geo2)
    scene.add(mesh)
    renderer.render(scene, camera)
}
    ());
