(function(){
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 640 / 480, 1, 1000);
    camera.position.set(14, 6, 14);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.domElement.width = 640;
    renderer.domElement.height = 480;
    renderer.setViewport(0, 0, 640, 480);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // CREATING A CUBE TEXTURE WITH CANVAS
    //-------- ----------
    // square
    const grid1 = {
        w: 16,
        pxData: [
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
            0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,
            0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,
            0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,
            0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,
            0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,
            0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,
            0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        ],
        pal: [ [1,1,1], [0,0,0] ]
    };
    // mutated square

    const grid2 = {
        w: 16,
        pxData: [
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,
            0,0,1,0,1,1,1,0,0,1,1,1,0,1,0,0,
            0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,0,
            0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,
            0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,
            0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,
            0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,
            0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,
            0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,
            0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,0,
            0,0,1,0,1,1,1,0,0,1,1,1,0,1,0,0,
            0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        ],
        pal: [ [1,1,1], [0,0,0] ]
    };

 
    const getTextureFromGrid = (grid, canvasSize) => {
        canvasSize = canvasSize === undefined ? 64 : canvasSize;
        return canvasTextureMod.createCanvasTexture((ctx, canvas) => {
            ctx.fillStyle='white';
            ctx.fillRect(0,0,canvas.width, canvas.height);
            let i = 0, len = grid.pxData.length;
            while(i < len){
                let pX = i % grid.w;
                let pY = Math.floor(i / grid.w);
                let c = grid.pal[ grid.pxData[i] ];
                let color = new THREE.Color(c[0], c[1], c[2]);
                ctx.fillStyle = color.getStyle();
                let pxW = canvas.width / grid.w;
                let pxH = canvas.height / grid.w;
                ctx.fillRect(pX * pxW, pY * pxH, pxW, pxH);
                i += 1;
            }
        }, canvasSize);
    };
    //-------- ----------
    // BACKGROUND
    //-------- ----------
    const texture =  getTextureFromGrid(grid2, 256);
    // same texture for all sides
    cubeTexture = new THREE.CubeTexture(new Array(6).fill(texture.image));
    cubeTexture.needsUpdate = true;
    scene.background = cubeTexture;
    //-------- ----------
    // SPHERE
    //-------- ----------
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 30, 30), 
        new THREE.MeshBasicMaterial({
           envMap: texture
        }) 
    );
    scene.add(sphere);
    //-------- ----------
    // CONTROLS
    //-------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    //-------- ----------
    // LOOP
    //-------- ----------
    const loop = function () {
        requestAnimationFrame(loop);
        controls.update();
        renderer.render(scene, camera);
    };
    loop();
}());