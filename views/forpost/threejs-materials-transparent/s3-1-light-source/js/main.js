(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(1, 0, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const pl = new THREE.PointLight(0xffffff);
    pl.position.set(2, -5, 5);
    scene.add(pl);
    //-------- ----------
    // CREATE MESH OBJECTS
    //-------- ----------
    const createCube = function (size, material, x, y, z) {
        const geometry = new THREE.BoxGeometry(size, size, size),
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        return cube;
    };
    const materials = {};
    materials.sand = new THREE.MeshStandardMaterial({
        color: 'yellow'
    });
    materials.glass = new THREE.MeshStandardMaterial({
        color: 'cyan',
        transparent: true,
        opacity: 0.4
    });
    const glassCube = createCube(1, materials.glass, 0, 0, 2);
    const cube = createCube(1, materials.sand, 0, 0, 0);
    scene.add(glassCube);
    scene.add(cube);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
