(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(4, 7, 4);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // GEOMETRY AND GROUPS
    //-------- ----------
    // new plane geometry
    const geometry = new THREE.PlaneGeometry(5, 5, 2, 2);
    geometry.rotateX(Math.PI * 1.5);
    // adding groups
    // give a start vertex index, count of vertex and material index for each call
    geometry.addGroup(0, 6, 0);
    geometry.addGroup(6, 6, 1);
    geometry.addGroup(12, 6, 1);
    geometry.addGroup(18, 6, 0);
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh = new THREE.Mesh(
        // geometry as first argument
        geometry,
        // array of materials as the second argument
        [
            new THREE.MeshBasicMaterial({
                color: 0xff0000
            }),
            new THREE.MeshBasicMaterial({
                color: 0x00ff00
            })
        ]
    );
    scene.add(mesh);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());