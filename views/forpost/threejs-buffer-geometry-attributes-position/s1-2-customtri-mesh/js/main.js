(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, GRID
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    scene.add( new THREE.GridHelper(10, 10));
    //-------- ----------
    // GEOMETRY
    //-------- ----------
    const geometry = new THREE.BufferGeometry();
    // ATTRIBUTE 'position' 
    const dataPOS = new Float32Array( [
        -1.0, 0.0,  0.0,
        1.0, 0.0,  0.0,
        0.0, 2.0,  0.0,
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute( dataPOS, 3 ));
    // ATTRIBUTE 'normal'
    // compute vertex normals method can some times make quick work of setting up the normals attribute
    geometry.computeVertexNormals();
    // ATTRIBUTE 'uv'
    const dataUV = new Float32Array( [
        1.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,
    ]);
    geometry.setAttribute('uv', new THREE.BufferAttribute( dataUV, 2 ));
    geometry.center();
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight();
    dl.position.set(0,1,2)
    scene.add(dl);
    //-------- ----------
    // TEXTURE
    //-------- ----------
    // create data texture method
    const createDataTexture = function(opt){
        opt = opt || {};
        opt.width = opt.width === undefined ? 16: opt.width; 
        opt.height = opt.height === undefined ? 16: opt.height;
        // default for pix method
        opt.forPix = opt.forPix || function(color, x, y, i, opt){
            let v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
            color.r = v;
            color.g = v;
            color.b = v;
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
        let texture = new THREE.DataTexture( data, opt.width, opt.height );
        texture.needsUpdate = true;
        return texture;
    };
    const tex1 = createDataTexture();
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
    camera.lookAt(mesh1.position);
    mesh1.position.x = -2;
    scene.add(mesh1);
    const mesh2 = new THREE.Mesh(geometry, 
        new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
            map: tex1
    }));
    scene.add(mesh2);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());