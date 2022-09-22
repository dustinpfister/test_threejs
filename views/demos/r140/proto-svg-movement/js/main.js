// Basic load SVG DEMO
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    let SVGMove = {};

    // create an Mesh based object with the given
    // svg data and id prefix
    SVGMove.createMesh = (data, id_prefix, ) => {

        const obj = new THREE.Mesh( 
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshNormalMaterial());
        const ud = obj.userData;

        data.paths.forEach((path)=>{
            // get id of the path
            const id = path.userData.node.id;
            const idParts = id.split('_');
            if(idParts[0] === id_prefix){
                // get points
                const points = path.subPaths[0].getPoints();
                ud[idParts[1]] = points;
                console.log(points.length)
            }
        });
        return obj;
    };

    // set an object by an alpha value of 0 - 1
    SVGMove.setToAlpha = (obj, alpha) => {

        const ud = obj.userData;
        let len = 0, i = 0;

        // get current xz Vector2
        len = ud.xz.length;
        i = Math.floor( ( len - 1) * alpha);
        const v2_xz = ud.xz[i];

        //console.log(v2_xz);

        obj.position.set(v2_xz.x, 0, v2_xz.y);

    }


    //-------- ----------
    // GRID
    //-------- ----------
    const grid = new THREE.GridHelper(10, 10, 0xffffff, 0xff0000);
    grid.material.linewidth = 3;
    grid.material.transparent = true;
    grid.material.opacity = 0.25;;
    scene.add(grid);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 300;
    let secs = 0,
    frame = 0,
    lt = new Date();

    let mesh;

    // update
    const update = function(frame, frameMax){
 
        SVGMove.setToAlpha(mesh, frame / frameMax);
 
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
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/demos/r140/proto-svg-movement/svg/move1.svg',
        // called when the resource is loaded
        function ( data ) {

            mesh = SVGMove.createMesh(data, 'box1', { } )
            scene.add(mesh);


            loop();

        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
