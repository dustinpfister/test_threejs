(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER SETUP
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10))
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(0.75, 0.50, 0.75);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff, 1.5); // point light
    light.position.set(1, 1, 0);
    camera.add(light);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // THE SPHERE
    // ---------- ----------
    var materials = [
        new THREE.MeshPhongMaterial({
            color: 0x880000,
            emissive: 0x181818
        }),
        new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            emissive: 0x1f1f1f
        }),
        new THREE.MeshPhongMaterial({
            color: 0x008800,
            emissive: 0x181818
        }),
        new THREE.MeshPhongMaterial({
            color: 0xff0000,
            emissive: 0x1f1f1f
        })
    ];
    var geometry = new THREE.SphereGeometry(0.5, 15, 15);
    var position = geometry.attributes.position,
    //len = position.array.length * 2, //!!! this is not a good way to get len it would seem
    len = 256 * 4, // this seems to work for now, but I should still look into this more
    mi = 0,
    i = 0;
// looking at the state of things here
console.log(geometry);
    while (i < len) {
        mi = i / 3 % 4;
        geometry.addGroup(i, 3, mi);
        i += 3;
    }
    var mesh = new THREE.Mesh(
            geometry, // USING A SPHERE GEOMETRY
            materials // PASSING AN ARRAY OF MATERIALS
    );
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}());