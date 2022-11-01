(function () {
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(1.25, 1.25, 1.25);
    camera.lookAt(0,0,0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // URLS, TEXTURE OBJECT
    //-------- ----------
    const URLS = [
        '/img/smile-face/smile_sheet_128.png'
    ];
    const textureObj = {};
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    //-------- ----------
    // MANAGER
    //-------- ----------
    const manager = new THREE.LoadingManager();
    // starting
    manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
        console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };
    // done
    manager.onLoad = function ( ) {
        console.log( 'Loading complete!');
        // ---------- ---------- ----------
        // CREATE AND UPDATE MESH
        // ---------- ---------- ----------
        // create the mesh object
        let mesh = uvMapCube.create({
            pxa: 1.42,
            images: [
                textureObj['smile_sheet_128'].image
            ]
        });
        scene.add(mesh);
        uvMapCube.drawFace(mesh, 'front', {i:0, sx: 0, sy: 0, sw: 32, sh: 32});
        uvMapCube.drawFace(mesh, 'back', {i:0, sx: 64, sy: 0, sw: 32, sh: 32});

        uvMapCube.drawFace(mesh, 'top', {i:0, sx: 0, sy: 32, sw: 32, sh: 32});
        uvMapCube.drawFace(mesh, 'bottom', {i:0, sx: 32, sy: 32, sw: 32, sh: 32});

        uvMapCube.drawFace(mesh, 'left', {i:0, sx: 32, sy: 0, sw: 32, sh: 32});
        uvMapCube.drawFace(mesh, 'right', {i:0, sx: 96, sy: 0, sw: 32, sh: 32});


        // ---------- ---------- ----------
        // START THE LOOP
        // ---------- ---------- ----------
        loop()
    };
    // progress
    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };
    // ERROR
    manager.onError = function ( url ) {
        console.log( 'There was an error loading ' + url );
    };
    //-------- ----------
    // TEXTURE LOADER
    //-------- ----------
    const loader = new THREE.TextureLoader(manager);
    URLS.forEach((url) => {
        loader.load(url, (texture) => {
            const file_name = url.split('/').pop().split('.')[0];
            // keying the textureObj by using file name as the key
            textureObj[file_name] = texture;
        });
    });
}());