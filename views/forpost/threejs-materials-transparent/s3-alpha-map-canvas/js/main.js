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
    const al = new THREE.AmbientLight(0xffffff);
    al.intensity = 0.4;
    scene.add(al);
    //-------- ----------
    // HELPERS
    //-------- ----------
    const createCube = function (size, material, x, y, z) {
        const geometry = new THREE.BoxGeometry(size, size, size),
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        return cube;
    };
    const createCanvasTexture = function (draw, size) {
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = size || 64;
        canvas.height = size || 64;
        draw(ctx, canvas);
        return new THREE.CanvasTexture(canvas);
    };
    //-------- ----------
    // CREATE MESH OBJECTS WITH CANVAS ALPHA MAP TEXTURE
    //-------- ----------
    const alphaMap = createCanvasTexture(function (ctx, canvas) {
            // drawing gray scale areas
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, 32, 32);
            ctx.fillStyle = '#000000';
            ctx.fillRect(32, 0, 32, 32);
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 32, 32, 32);
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(32, 32, 32, 32);
        });
    const materials = {};
    materials.sand = new THREE.MeshStandardMaterial({
            color: 'yellow'
        });
    materials.glass = new THREE.MeshStandardMaterial({
            color: 'cyan',
            alphaMap: alphaMap, // using an alpha map
            side: THREE.DoubleSide,
            depthFunc: THREE.AlwaysDepth,
            transparent: true,
            opacity: 0.2
        });
    const glassCube = createCube(1, materials.glass, 0, 0, 2);
    const cube = createCube(1, materials.sand, 0, 0, 0);
    scene.add(glassCube);
    scene.add(cube);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
