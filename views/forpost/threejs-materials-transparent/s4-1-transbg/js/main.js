(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(1.5, 1.25, 1.5);
    camera.lookAt(0, 0, 0);
    // setting alpha option to true, and then using set clear color as needed
    const renderer = new THREE.WebGL1Renderer( { alpha: true } );
    renderer.setClearColor( 0x0000ff, 0.25 );
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(3, 2, 1);
    scene.add(dl);
    //-------- ----------
    // CREATE MESH OBJECTS
    //-------- ----------
    const createCube = function (size, x, y, z, material ) {
        var geometry = new THREE.BoxGeometry(size, size, size),
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        return cube;
    };
    const material =  new THREE.MeshPhongMaterial({
        color: 'yellow',
        transparent: true,
        opacity: 0.5
    });
    const cube1 = createCube(1, 0, 0, 0, material);
    scene.add(cube1);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
