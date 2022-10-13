(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(6, 6, 6);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPER FUNCTIONS - based off of what I have in my threejs-data-texture post
    //                    https://dustinpfister.github.io/2022/04/15/threejs-data-texture/
    //-------- ----------
    const createData = function(opt){
        opt = opt || {};
        opt.width = opt.width === undefined ? 16: opt.width; 
        opt.height = opt.height === undefined ? 16: opt.height;
        // DEFAULT FOR PIX METOD IS A CHECKER PATTERN HERE
        opt.forPix = opt.forPix || function(color, x, y, i, opt){
            color.setRGB(255, 255, 255);
            if(y % 2 === 0 && x % 2 === 0){
               color.setRGB(32, 32, 32);
            }
            if(y % 2 != 0 && x % 2 != 0){
               color.setRGB(64, 64, 64);
            }
            return color;
        };
        let size = opt.width * opt.height;
        let data = new Uint8Array( 4 * size );
        for ( let i = 0; i < size; i ++ ) {
            let stride = i * 4,
            x = i % opt.width,
            y = Math.floor(i / opt.width),
            color = opt.forPix( new THREE.Color(), x, y, i, opt);
            data[ stride ] = color.r;
            data[ stride + 1 ] = color.g;
            data[ stride + 2 ] = color.b;
            data[ stride + 3 ] = 255;
        }
        return data;
    };
    // create data texture
    const createDataTexture = function(opt){
        opt = opt || {};
        opt.width = opt.width === undefined ? 16: opt.width; 
        opt.height = opt.height === undefined ? 16: opt.height;
        const data = createData(opt);
        let texture = new THREE.DataTexture( data, opt.width, opt.height );
        texture.needsUpdate = true;
        return texture;
    };
    // update a texture
    /*
    const updateTexture = (texture, opt) => {
        // just updating data array only
        const data = createData(opt);
        texture.image.data = data;
        texture.needsUpdate = true;
    };
    */
    // ---------- ----------
    // TEXTURE
    // ---------- ----------
    const texture_checker = createDataTexture();
    // ---------- ----------
    // MESH - 
    // ---------- ----------
    // material
    const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture_checker
    });
    const mesh1 = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10, 1, 1),
        material);
    mesh1.geometry.rotateX( Math.PI * 0.5 );
    mesh1.position.set(0, 0, 0);
    scene.add(mesh1);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());