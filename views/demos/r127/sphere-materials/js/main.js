
(function () {

    // creating a scene
    var scene = new THREE.Scene();

    var materials = [
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x404040
        })];

    var geometry = new THREE.SphereGeometry(0.5, 15, 15);

    var position = geometry.attributes.position,
    len = position.array.length,
    mi = 0,
    i = 0;
    while (i < len) {
        geometry.addGroup(i, 3, mi);
        i += 3;
    }

    // mesh
    var mesh = new THREE.Mesh(
            // USING A SPHERE GEOMETRY
            geometry,
            // PASSING AN ARRAY OF MATERIALS
            materials);
    scene.add(mesh); // add the mesh to the scene

    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(0.75, 1, 0.75);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.x = 1;
    light.position.y = 1;
    camera.add(light);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
    ());
