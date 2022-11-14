(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(1.25, 1, 1.75);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    const createCube = (size, material, x, y, z) => {
        const geometry = new THREE.BoxGeometry(size, size, size),
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        return cube;
    };
    const createCanvasTexture = (draw, size) => {
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = size || 64;
        canvas.height = size || 64;
        draw(ctx, canvas);
        return new THREE.CanvasTexture(canvas);
    };
    //-------- ----------
    // TEXTURE
    //-------- ----------
    const texture_map = createCanvasTexture( (ctx, canvas) => {
        // USING rgba TO SET STYLE
        ctx.fillStyle = 'rgba(64,64,64,1)';
        ctx.fillRect(0,0, canvas.width, canvas.height);
        // CLEAR RECT CAN BE USED TO SET AN AREA AS TRANSPARENT
        // THEN FILL WITH AN rgba STYLE
        ctx.clearRect(6, 6, 24, 24);
        ctx.fillStyle = 'rgba(0,255,255,0.4)';
        ctx.fillRect(6, 6, 24, 24);
        // can also rotate
        ctx.save();
        ctx.translate(34 + 7, 34 + 7);
        ctx.rotate( Math.PI / 180 * 45 );
        ctx.clearRect(-12, -12, 24, 24);
        ctx.fillStyle = 'rgba(0,255,255,0.4)';
        ctx.fillRect(-12, -12, 24, 24);
        ctx.restore();
        // FRAME
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4)
    });
    //-------- ----------
    // MATERIAL
    //-------- ----------
    const material =  new THREE.MeshBasicMaterial({
        color: new THREE.Color(1, 1, 1),
        map: texture_map,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });
    //-------- ----------
    // MESH
    //-------- ----------
    const cube = createCube(1, material, 0, 0, 0);
    scene.add(cube);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
